const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const IMAGE_ROOT = path.join(
    ROOT,
    "img",
    "productos"
);


/* =====================================================
   CONFIGURACIÓN
===================================================== */

const SUPPORTED_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg"
];


/*
 * Calidad WebP.
 *
 * 82 = muy buena calidad + bastante menos peso.
 */
const WEBP_QUALITY = 82;


/* =====================================================
   UTILIDADES
===================================================== */

function isSupportedImage(fileName) {

    const extension =
        path.extname(fileName)
            .toLowerCase();

    return SUPPORTED_EXTENSIONS
        .includes(extension);

}


function getWebpName(fileName) {

    return path.basename(
        fileName,
        path.extname(fileName)
    ) + ".webp";

}


/* =====================================================
   BUSCAR IMÁGENES
===================================================== */

function findImages(directory) {

    if (!fs.existsSync(directory)) {

        return [];

    }


    const results = [];


    const entries =
        fs.readdirSync(
            directory,
            {
                withFileTypes: true
            }
        );


    for (const entry of entries) {

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
   CONVERSIÓN
===================================================== */

async function convertImage(
    inputPath
) {

    /*
     * sharp se carga solamente cuando
     * ejecutamos el conversor.
     */

    const sharp =
        require("sharp");


    const directory =
        path.dirname(inputPath);


    const outputName =
        getWebpName(
            path.basename(inputPath)
        );


    const outputPath =
        path.join(
            directory,
            outputName
        );


    /*
     * Si ya existe WebP, no lo
     * sobrescribimos innecesariamente.
     */

    if (
        fs.existsSync(outputPath)
    ) {

        console.log(
            `↪ Ya existe: ${path.relative(ROOT, outputPath)}`
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
            ? (
                100 -
                (
                    webpSize /
                    originalSize
                ) *
                100
            )
            : 0;


    console.log(
        `✓ ${path.relative(ROOT, inputPath)}`
    );


    console.log(
        `  → ${path.relative(ROOT, outputPath)}`
    );


    console.log(
        `  ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(webpSize / 1024 / 1024).toFixed(2)} MB`
    );


    console.log(
        `  Reducción: ${reduction.toFixed(1)}%`
    );

}


/* =====================================================
   EJECUCIÓN
===================================================== */

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


    if (
        !fs.existsSync(
            IMAGE_ROOT
        )
    ) {

        console.log(
            "No existe la carpeta:"
        );

        console.log(
            path.relative(
                ROOT,
                IMAGE_ROOT
            )
        );

        return;

    }


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


    for (
        const image of images
    ) {

        await convertImage(
            image
        );

    }


    console.log("");
    console.log(
        "========================================"
    );
    console.log(
        " Conversión terminada"
    );
    console.log(
        "========================================"
    );
    console.log("");

}


main()
    .catch(
        error => {

            console.error("");
            console.error(
                "❌ Error durante la conversión:"
            );
            console.error(
                error
            );

            process.exit(1);

        }
    );
