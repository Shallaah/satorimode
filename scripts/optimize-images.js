const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(ROOT, "img");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];
const SOURCE_EXTENSIONS = [".html", ".htm", ".css", ".js"];

function isImage(file) {
    return IMAGE_EXTENSIONS.includes(
        path.extname(file).toLowerCase()
    );
}

function getWebpPath(file) {
    return path.join(
        path.dirname(file),
        path.basename(file, path.extname(file)) + ".webp"
    );
}

function getAllFiles(directory) {
    if (!fs.existsSync(directory)) return [];

    const files = [];

    for (const item of fs.readdirSync(directory, {
        withFileTypes: true
    })) {
        if (
            item.name === ".git" ||
            item.name === "node_modules"
        ) {
            continue;
        }

        const fullPath = path.join(
            directory,
            item.name
        );

        if (item.isDirectory()) {
            files.push(
                ...getAllFiles(fullPath)
            );
        } else {
            files.push(fullPath);
        }
    }

    return files;
}


/* =================================================
   CONVERTIR IMÁGENES
================================================= */

async function optimizeImages() {

    const files = getAllFiles(
        IMAGE_ROOT
    ).filter(isImage);

    console.log(
        `Imágenes encontradas: ${files.length}`
    );

    for (const input of files) {

        const output =
            getWebpPath(input);

        if (fs.existsSync(output)) {

            console.log(
                `↪ Ya existe: ${path.relative(
                    ROOT,
                    output
                )}`
            );

            continue;
        }

        await sharp(input)
            .webp({
                quality: 82,
                effort: 5
            })
            .toFile(output);

        const originalSize =
            fs.statSync(input).size;

        const webpSize =
            fs.statSync(output).size;

        const reduction =
            100 -
            (
                webpSize /
                originalSize
            ) *
            100;

        console.log(
            `✓ ${path.relative(
                ROOT,
                input
            )}`
        );

        console.log(
            `  → ${path.relative(
                ROOT,
                output
            )}`
        );

        console.log(
            `  Reducción: ${reduction.toFixed(
                1
            )}%`
        );
    }
}


/* =================================================
   ACTUALIZAR REFERENCIAS
================================================= */

function updateReferences() {

    const files =
        getAllFiles(ROOT).filter(
            file =>
                SOURCE_EXTENSIONS.includes(
                    path.extname(file).toLowerCase()
                )
        );

    let replacements = 0;

    for (const file of files) {

        let content =
            fs.readFileSync(
                file,
                "utf8"
            );

        const original =
            content;

        /*
         * Busca referencias como:
         *
         * "img/banner.png"
         * 'img/producto.jpg'
         */

        content =
            content.replace(
                /(["'])([^"'\r\n]+?\.(?:png|jpe?g))\1/gi,
                (
                    match,
                    quote,
                    imageReference
                ) => {

                    /*
                     * No tocar URLs externas.
                     */

                    if (
                        imageReference.startsWith(
                            "http://"
                        ) ||
                        imageReference.startsWith(
                            "https://"
                        ) ||
                        imageReference.startsWith(
                            "//"
                        ) ||
                        imageReference.startsWith(
                            "data:"
                        )
                    ) {

                        return match;

                    }

                    /*
                     * Resolver la ruta.
                     */

                    let imagePath;

                    if (
                        imageReference.startsWith(
                            "img/"
                        )
                    ) {

                        imagePath =
                            path.resolve(
                                ROOT,
                                imageReference
                            );

                    } else {

                        imagePath =
                            path.resolve(
                                path.dirname(file),
                                imageReference
                            );

                    }

                    /*
                     * Comprobar que la imagen existe.
                     */

                    if (
                        !fs.existsSync(
                            imagePath
                        )
                    ) {

                        return match;

                    }

                    /*
                     * Comprobar que existe
                     * su versión WebP.
                     */

                    const webpPath =
                        getWebpPath(
                            imagePath
                        );

                    if (
                        !fs.existsSync(
                            webpPath
                        )
                    ) {

                        return match;

                    }

                    /*
                     * Cambiar .png/.jpg/.jpeg
                     * por .webp.
                     */

                    const extension =
                        path.extname(
                            imageReference
                        );

                    const webpReference =
                        imageReference.slice(
                            0,
                            -extension.length
                        ) +
                        ".webp";

                    replacements++;

                    return (
                        quote +
                        webpReference +
                        quote
                    );
                }
            );

        if (
            content !== original
        ) {

            fs.writeFileSync(
                file,
                content,
                "utf8"
            );

            console.log(
                `✓ Referencias actualizadas: ${path.relative(
                    ROOT,
                    file
                )}`
            );
        }
    }

    console.log("");
    console.log(
        `Referencias WebP actualizadas: ${replacements}`
    );
}


/* =================================================
   EJECAR
================================================= */

async function main() {

    console.log("");
    console.log(
        "========================================"
    );
    console.log(
        " SATORII · OPTIMIZADOR DE IMÁGENES"
    );
    console.log(
        "========================================"
    );
    console.log("");

    await optimizeImages();

    console.log("");
    console.log(
        "Actualizando referencias..."
    );
    console.log("");

    updateReferences();

    console.log("");
    console.log(
        "========================================"
    );
    console.log(
        " Optimización terminada"
    );
    console.log(
        "========================================"
    );
    console.log("");
}

main().catch(error => {

    console.error("");
    console.error(
        "❌ Error durante la optimización:"
    );
    console.error(error);

    process.exit(1);
});const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(ROOT, "img");

const SUPPORTED_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg"
];

const SOURCE_EXTENSIONS = [
    ".html",
    ".htm",
    ".css",
    ".js"
];

const WEBP_QUALITY = 82;


/* =====================================================
   UTILIDADES
===================================================== */

function isSupportedImage(fileName) {

    return SUPPORTED_EXTENSIONS.includes(
        path.extname(fileName).toLowerCase()
    );

}


function getWebpName(fileName) {

    return (
        path.basename(
            fileName,
            path.extname(fileName)
        ) + ".webp"
    );

}


/* =====================================================
   BUSCAR IMÁGENES
===================================================== */

function findImages(directory) {

    if (!fs.existsSync(directory)) {
        return [];
    }

    const results = [];

    for (
        const entry of fs.readdirSync(
            directory,
            {
                withFileTypes: true
            }
        )
    ) {

        const fullPath =
            path.join(
                directory,
                entry.name
            );


        if (entry.isDirectory()) {

            results.push(
                ...findImages(fullPath)
            );

            continue;

        }


        if (
            entry.isFile() &&
            isSupportedImage(entry.name)
        ) {

            results.push(fullPath);

        }

    }

    return results;

}


/* =====================================================
   BUSCAR ARCHIVOS DEL SITIO
===================================================== */

function findSourceFiles(directory) {

    if (!fs.existsSync(directory)) {
        return [];
    }

    const results = [];

    for (
        const entry of fs.readdirSync(
            directory,
            {
                withFileTypes: true
            }
        )
    ) {

        const fullPath =
            path.join(
                directory,
                entry.name
            );


        if (entry.isDirectory()) {

            /*
             * No necesitamos revisar estas carpetas.
             */

            if (
                entry.name === ".git" ||
                entry.name === "node_modules"
            ) {

                continue;

            }


            results.push(
                ...findSourceFiles(fullPath)
            );

            continue;

        }


        if (
            entry.isFile() &&
            SOURCE_EXTENSIONS.includes(
                path.extname(
                    entry.name
                ).toLowerCase()
            )
        ) {

            results.push(fullPath);

        }

    }

    return results;

}


/* =====================================================
   CONVERTIR IMAGEN
===================================================== */

async function convertImage(
    inputPath
) {

    const sharp =
        require("sharp");


    const directory =
        path.dirname(
            inputPath
        );


    const outputPath =
        path.join(
            directory,
            getWebpName(
                path.basename(
                    inputPath
                )
            )
        );


    /*
     * Si ya existe el WebP,
     * no lo volvemos a generar.
     */

    if (
        fs.existsSync(
            outputPath
        )
    ) {

        console.log(
            `↪ Ya existe: ${path.relative(
                ROOT,
                outputPath
            )}`
        );

        return;

    }


    await sharp(inputPath)
        .webp({
            quality: WEBP_QUALITY,
            effort: 5
        })
        .toFile(outputPath);


    const originalSize =
        fs.statSync(
            inputPath
        ).size;


    const webpSize =
        fs.statSync(
            outputPath
        ).size;


    const reduction =
        originalSize > 0
            ? 100 -
              (
                  webpSize /
                  originalSize
              ) *
              100
            : 0;


    console.log(
        `✓ ${path.relative(
            ROOT,
            inputPath
        )}`
    );


    console.log(
        `  → ${path.relative(
            ROOT,
            outputPath
        )}`
    );


    console.log(
        `  ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(webpSize / 1024 / 1024).toFixed(2)} MB`
    );


    console.log(
        `  Reducción: ${reduction.toFixed(1)}%`
    );

}


/* =====================================================
   RESOLVER REFERENCIA DE IMAGEN
===================================================== */

function resolveImagePath(
    sourceFile,
    imageReference
) {

    let cleanReference =
        imageReference
            .split("?")[0]
            .split("#")[0]
            .replace(
                /\\/g,
                "/"
            );


    /*
     * No tocar:
     * - data:
     * - http://
     * - https://
     * - //cdn...
     */

    if (
        !cleanReference ||
        cleanReference.startsWith("data:") ||
        cleanReference.startsWith("http://") ||
        cleanReference.startsWith("https://") ||
        cleanReference.startsWith("//")
    ) {

        return null;

    }


    /*
     * products.js y otros archivos del proyecto
     * pueden utilizar rutas desde la raíz:
     *
     * img/productos/...
     */

    if (
        cleanReference.startsWith(
            "img/"
        )
    ) {

        return path.resolve(
            ROOT,
            cleanReference
        );

    }


    /*
     * Para HTML/CSS/JS utilizamos la ruta
     * relativa al archivo actual.
     */

    return path.resolve(
        path.dirname(
            sourceFile
        ),
        cleanReference.startsWith("/")
            ? cleanReference.slice(1)
            : cleanReference
    );

}


/* =====================================================
   OBTENER REFERENCIA WEBP
===================================================== */

function getWebpReference(
    sourceFile,
    imageReference
) {

    const imagePath =
        resolveImagePath(
            sourceFile,
            imageReference
        );


    if (
        !imagePath ||
        !isSupportedImage(
            imagePath
        )
    ) {

        return null;

    }


    const webpPath =
        path.join(
            path.dirname(
                imagePath
            ),
            getWebpName(
                path.basename(
                    imagePath
                )
            )
        );


    /*
     * MUY IMPORTANTE:
     *
     * Solo cambiamos la referencia si
     * el WebP realmente existe.
     */

    if (
        !fs.existsSync(
            webpPath
        )
    ) {

        return null;

    }


    const extension =
        path.extname(
            imageReference
        );


    return (
        imageReference.slice(
            0,
            imageReference.length -
            extension.length
        ) + ".webp"
    );

}


/* =====================================================
   ACTUALIZAR REFERENCIAS
===================================================== */

function updateReferences() {

    const sourceFiles =
        findSourceFiles(
            ROOT
        );


    let changedFiles = 0;

    let replacements = 0;


    /*
     * Busca referencias de imágenes
     * dentro de comillas.
     *
     * Ejemplos:
     *
     * "img/banner.png"
     * 'img/producto.jpg'
     * "01.PNG"
     */

    const quotedImagePattern =
        /(["'])([^"'\\r\\n]+?\\.(?:png|jpe?g))(\\1)/gi;


    for (
        const sourceFile of sourceFiles
    ) {

        let source =
            fs.readFileSync(
                sourceFile,
                "utf8"
            );


        const originalSource =
            source;


        source =
            source.replace(
                quotedImagePattern,
                (
                    fullMatch,
                    quote,
                    imageReference
                ) => {

                    const webpReference =
                        getWebpReference(
                            sourceFile,
                            imageReference
                        );


                    if (
                        !webpReference
                    ) {

                        return fullMatch;

                    }


                    replacements++;


                    return (
                        quote +
                        webpReference +
                        quote
                    );

                }
            );


        /*
         * Solamente escribimos el archivo
         * si realmente cambió.
         */

        if (
            source !==
            originalSource
        ) {

            fs.writeFileSync(
                sourceFile,
                source,
                "utf8"
            );


            changedFiles++;


            console.log(
                `✓ Referencias WebP: ${path.relative(
                    ROOT,
                    sourceFile
                )}`
            );

        }

    }


    console.log("");

    console.log(
        `Referencias actualizadas: ${replacements}`
    );

    console.log(
        `Archivos modificados: ${changedFiles}`
    );

}


/* =====================================================
   PROCESO PRINCIPAL
===================================================== */

async function main() {

    console.log("");

    console.log(
        "========================================"
    );

    console.log(
        " SATORII · OPTIMIZADOR GLOBAL DE IMÁGENES"
    );

    console.log(
        "========================================"
    );

    console.log("");


    if (
        !fs.existsSync(
            IMAGE_ROOT
        )
    ) {

        console.log(
            "❌ No existe la carpeta img/"
        );

        return;

    }


    /*
     * 1. Encontrar imágenes
     */

    const images =
        findImages(
            IMAGE_ROOT
        );


    if (
        images.length === 0
    ) {

        console.log(
            "No se encontraron imágenes PNG/JPG."
        );

        return;

    }


    console.log(
        `Encontradas: ${images.length} imagen(es)`
    );

    console.log("");


    /*
     * 2. Convertir imágenes
     */

    for (
        const image of images
    ) {

        await convertImage(
            image
        );

    }


    /*
     * 3. Actualizar referencias
     */

    console.log("");

    console.log(
        "Actualizando referencias del sitio..."
    );

    console.log("");


    updateReferences();


    console.log("");

    console.log(
        "========================================"
    );

    console.log(
        " Optimización terminada"
    );

    console.log(
        "========================================"
    );

    console.log("");

}


/* =====================================================
   MANEJO DE ERRORES
===================================================== */

main()
    .catch(
        error => {

            console.error("");

            console.error(
                "❌ Error durante la optimización:"
            );

            console.error(
                error
            );

            process.exit(1);

        }
    );
