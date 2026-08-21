const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(ROOT, "img");

const SUPPORTED_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg"
];

const WEBP_QUALITY = 82;

function isSupportedImage(fileName) {

    return SUPPORTED_EXTENSIONS.includes(
        path.extname(fileName).toLowerCase()
    );

}

function getWebpName(fileName) {

    return path.basename(
        fileName,
        path.extname(fileName)
    ) + ".webp";

}

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

async function convertImage(inputPath) {

    const sharp =
        require("sharp");

    const directory =
        path.dirname(inputPath);

    const outputPath =
        path.join(
            directory,
            getWebpName(
                path.basename(inputPath)
            )
        );

    if (
        fs.existsSync(outputPath)
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
            "No existe la carpeta img/"
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
        " Optimización terminada"
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
