const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(ROOT, "img");

const EXTENSIONS = [".png", ".jpg", ".jpeg"];

function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];

    let files = [];

    for (const item of fs.readdirSync(dir, {
        withFileTypes: true
    })) {
        if (
            item.name === ".git" ||
            item.name === "node_modules"
        ) continue;

        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            files.push(...getFiles(fullPath));
        } else {
            files.push(fullPath);
        }
    }

    return files;
}

async function main() {

    console.log("================================");
    console.log(" SATORII - OPTIMIZADOR WEBP");
    console.log("================================");

    const images = getFiles(IMAGE_ROOT)
        .filter(file =>
            EXTENSIONS.includes(
                path.extname(file).toLowerCase()
            )
        );

    console.log(`Imágenes encontradas: ${images.length}`);

    for (const input of images) {

        const output = path.join(
            path.dirname(input),
            path.basename(
                input,
                path.extname(input)
            ) + ".webp"
        );

        if (fs.existsSync(output)) {
            console.log(
                `↪ Ya existe: ${path.relative(ROOT, output)}`
            );
            continue;
        }

        await sharp(input)
            .webp({
                quality: 82,
                effort: 5
            })
            .toFile(output);

        const original = fs.statSync(input).size;
        const converted = fs.statSync(output).size;

        const reduction =
            100 - (converted / original) * 100;

        console.log(
            `✓ ${path.relative(ROOT, input)}`
        );

        console.log(
            `  → ${path.relative(ROOT, output)}`
        );

        console.log(
            `  Reducción: ${reduction.toFixed(1)}%`
        );
    }

    console.log("");
    console.log("Optimización terminada.");
}

main().catch(error => {

    console.error("❌ Error:");
    console.error(error);

    process.exit(1);
});
