const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const SOURCE_EXTENSIONS = [
    ".html",
    ".htm",
    ".css",
    ".js"
];

const IMAGE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg"
];

function getAllFiles(directory) {

    if (!fs.existsSync(directory)) {
        return [];
    }

    const files = [];

    for (
        const item of fs.readdirSync(
            directory,
            { withFileTypes: true }
        )
    ) {

        if (
            item.name === ".git" ||
            item.name === "node_modules"
        ) {
            continue;
        }

        const fullPath =
            path.join(
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

function isSourceFile(file) {

    return SOURCE_EXTENSIONS.includes(
        path.extname(file).toLowerCase()
    );

}

function isImageReference(reference) {

    return IMAGE_EXTENSIONS.includes(
        path.extname(
            reference.split(/[?#]/)[0]
        ).toLowerCase()
    );

}

function resolveImagePath(
    sourceFile,
    reference
) {

    const clean =
        reference
            .split(/[?#]/)[0]
            .replace(/\\/g, "/");

    if (
        !clean ||
        /^data:/i.test(clean) ||
        /^https?:/i.test(clean) ||
        /^\/\//.test(clean)
    ) {
        return null;
    }

    if (
        clean.startsWith("img/")
    ) {

        return path.resolve(
            ROOT,
            clean
        );

    }

    return path.resolve(
        path.dirname(sourceFile),
        clean
    );
}

function getWebpPath(
    imagePath
) {

    return path.join(
        path.dirname(imagePath),
        path.basename(
            imagePath,
            path.extname(imagePath)
        ) + ".webp"
    );
}

function updateReferences() {

    const files =
        getAllFiles(ROOT)
            .filter(isSourceFile);

    let filesChanged = 0;
    let replacements = 0;

    /*
     * Busca referencias dentro de:
     *
     * "imagen.png"
     * 'imagen.jpg'
     * url("imagen.png")
     * url(imagen.png)
     */

    const pattern =
        /(["'])([^"'\r\n]+?\.(?:png|jpe?g))\1|url\(\s*(["']?)([^"'\s)]+?\.(?:png|jpe?g))\3\s*\)/gi;

    for (
        const file of files
    ) {

        let content =
            fs.readFileSync(
                file,
                "utf8"
            );

        const original =
            content;

        content =
            content.replace(
                pattern,
                (
                    match,
                    quote1,
                    reference1,
                    quote2,
                    reference2
                ) => {

                    const reference =
                        reference1 ||
                        reference2;

                    if (
                        !reference ||
                        !isImageReference(
                            reference
                        )
                    ) {
                        return match;
                    }

                    const imagePath =
                        resolveImagePath(
                            file,
                            reference
                        );

                    if (
                        !imagePath ||
                        !fs.existsSync(
                            imagePath
                        )
                    ) {
                        return match;
                    }

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

                    const extension =
                        path.extname(
                            reference
                        );

                    const webpReference =
                        reference.slice(
                            0,
                            -extension.length
                        ) + ".webp";

                    replacements++;

                    if (reference1) {

                        return (
                            quote1 +
                            webpReference +
                            quote1
                        );

                    }

                    return (
                        "url(" +
                        quote2 +
                        webpReference +
                        quote2 +
                        ")"
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

            filesChanged++;

            console.log(
                `✓ ${path.relative(
                    ROOT,
                    file
                )}`
            );
        }
    }

    console.log("");
    console.log(
        `Referencias actualizadas: ${replacements}`
    );
    console.log(
        `Archivos modificados: ${filesChanged}`
    );
}

console.log("");
console.log(
    "========================================"
);
console.log(
    " SATORII · ACTUALIZADOR DE REFERENCIAS"
);
console.log(
    "========================================"
);
console.log("");

updateReferences();

console.log("");
console.log(
    "Actualización terminada."
);
