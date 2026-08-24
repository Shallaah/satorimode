/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
========================================================= */

"use strict";


/* =========================================================
   DEPENDENCIAS
========================================================= */

const fs = require("fs");
const path = require("path");
const vm = require("vm");


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const ROOT_DIR =
    path.resolve(
        __dirname,
        ".."
    );


const PRODUCTS_JS =
    path.join(
        ROOT_DIR,
        "js",
        "products.js"
    );


const PRODUCTS_DIR =
    path.join(
        ROOT_DIR,
        "productos"
    );


const TEMPLATE_FILE =
    path.join(
        PRODUCTS_DIR,
        "anime",
        "kid-buu.html"
    );


const DEFAULT_TEMPLATE =
    path.join(
        PRODUCTS_DIR,
        "anime",
        "goku.html"
    );


const SITE_RED =
    "#EF0930";


/* =========================================================
   UTILIDADES
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function slugify(value) {

    return String(
        value ?? ""
    )
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim()
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            "");

}


function formatPrice(value) {

    return (
        "$" +
        (
            Number(value) || 0
        ).toLocaleString(
            "es-CL"
        )
    );

}


function displayCategory(product) {

    return String(
        product.collection ||
        product.category ||
        "SATORII"
    ).toUpperCase();

}


/* =========================================================
   RUTAS
========================================================= */

function normalizeProductUrl(product) {

    let url =
        String(
            product.url ||
            ""
        )
            .replace(
                /^\/+/,
                ""
            )
            .replace(
                /\\/g,
                "/"
            );


    if (!url) {

        const category =
            slugify(
                product.category ||
                "productos"
            );


        const id =
            slugify(
                product.id ||
                product.name
            );


        url =
            `productos/${category}/${id}.html`;

    }


    if (
        !url.toLowerCase().endsWith(
            ".html"
        )
    ) {

        url += ".html";

    }


    return url;

}


function getRootPrefix(productUrl) {

    const directory =
        path.posix.dirname(
            productUrl
        );


    if (
        !directory ||
        directory === "."
    ) {

        return "./";

    }


    const depth =
        directory
            .split("/")
            .filter(Boolean)
            .length;


    return "../".repeat(
        depth
    );

}


function getOutputPath(product) {

    const url =
        normalizeProductUrl(
            product
        );


    return path.join(
        ROOT_DIR,
        ...url.split("/")
    );

}


function getRelativeProductUrl(
    currentUrl,
    targetUrl
) {

    return path.posix.relative(
        path.posix.dirname(
            currentUrl
        ),
        normalizeProductUrl({
            url: targetUrl
        })
    );

}


function imagePathForPage(
    image,
    productUrl
) {

    if (!image) {

        return "";

    }


    const clean =
        String(image)
            .replace(
                /^\/+/,
                ""
            );


    return (
        getRootPrefix(
            productUrl
        ) +
        clean
    );

}


/* =========================================================
   CARGAR PRODUCTS
========================================================= */

function loadProducts() {

    if (
        !fs.existsSync(
            PRODUCTS_JS
        )
    ) {

        throw new Error(
            `No existe: ${PRODUCTS_JS}`
        );

    }


    const source =
        fs.readFileSync(
            PRODUCTS_JS,
            "utf8"
        );


    const marker =
        "const PRODUCTS =";


    const start =
        source.indexOf(
            marker
        );


    if (
        start === -1
    ) {

        throw new Error(
            "No se encontró 'const PRODUCTS =' en products.js."
        );

    }


    const arrayStart =
        source.indexOf(
            "[",
            start
        );


    if (
        arrayStart === -1
    ) {

        throw new Error(
            "No se encontró el array PRODUCTS."
        );

    }


    let depth = 0;
    let quote = null;
    let escaped = false;
    let arrayEnd = -1;


    for (
        let i = arrayStart;
        i < source.length;
        i++
    ) {

        const char =
            source[i];


        if (escaped) {

            escaped = false;

            continue;

        }


        if (
            char === "\\"
        ) {

            escaped = true;

            continue;

        }


        if (quote) {

            if (
                char === quote
            ) {

                quote = null;

            }

            continue;

        }


        if (
            char === "\"" ||
            char === "'" ||
            char === "`"
        ) {

            quote = char;

            continue;

        }


        if (
            char === "["
        ) {

            depth++;

        }


        else if (
            char === "]"
        ) {

            depth--;


            if (
                depth === 0
            ) {

                arrayEnd = i;

                break;

            }

        }

    }


    if (
        arrayEnd === -1
    ) {

        throw new Error(
            "No se pudo cerrar el array PRODUCTS."
        );

    }


    const arraySource =
        source.slice(
            arrayStart,
            arrayEnd + 1
        );


    try {

        const products =
            vm.runInNewContext(
                "(" +
                arraySource +
                ")",
                {}
            );


        if (
            !Array.isArray(
                products
            )
        ) {

            throw new Error(
                "PRODUCTS no es un array."
            );

        }


        return products;

    }
    catch (error) {

        throw new Error(
            "Error leyendo PRODUCTS:\n" +
            error.message
        );

    }

}


/* =========================================================
   VALIDACIÓN
========================================================= */

function validateProducts(
    products
) {

    const ids =
        new Set();


    products.forEach(
        function (
            product,
            index
        ) {

            if (
                !product ||
                typeof product !== "object"
            ) {

                throw new Error(
                    `Producto inválido #${index + 1}.`
                );

            }


            if (!product.id) {

                throw new Error(
                    `Producto #${index + 1} sin id.`
                );

            }


            if (
                ids.has(
                    String(
                        product.id
                    )
                )
            ) {

                throw new Error(
                    `ID duplicado: ${product.id}`
                );

            }


            ids.add(
                String(
                    product.id
                )
            );


            if (!product.name) {

                throw new Error(
                    `Producto ${product.id} sin name.`
                );

            }


            if (
                product.price === undefined ||
                product.price === null
            ) {

                throw new Error(
                    `Producto ${product.id} sin price.`
                );

            }


            if (!product.image) {

                throw new Error(
                    `Producto ${product.id} sin image.`
                );

            }

        }
    );

}


/* =========================================================
   PLANTILLA
========================================================= */

function findTemplate() {

    const candidates = [

        TEMPLATE_FILE,

        DEFAULT_TEMPLATE

    ];


    for (
        const file of candidates
    ) {

        if (
            fs.existsSync(
                file
            )
        ) {

            return file;

        }

    }


    throw new Error(
        "No se encontró una plantilla de producto."
    );

}


function extractTemplateStyles(
    template
) {

    const matches =
        template.match(
            /<style[\s\S]*?<\/style>/gi
        );


    if (
        !matches
    ) {

        return "";

    }


    return matches.join(
        "\n"
    );

}


/* =========================================================
   SCRIPTS GLOBALES
========================================================= */

function buildGlobalScripts(
    productUrl,
    template
) {

    const root =
        getRootPrefix(
            productUrl
        );


    /*
     * Los scripts que TODAS las páginas
     * individuales necesitan.
     */

    const scripts = [

        "main.js",

        "header.js",

        "footer.js",

        "cart.js",

        "animations.js"

    ];


    const result = [];


    scripts.forEach(
        function (
            script
        ) {

            result.push(

                `<script src="${escapeHTML(
                    root +
                    "js/" +
                    script
                )}" defer></script>`

            );

        }
    );


    /*
     * Si la plantilla tiene scripts inline
     * específicos del producto, conservarlos.
     *
     * No copiamos scripts externos de la
     * plantilla para evitar rutas rotas.
     */

    const inlineScripts =
        template.match(
            /<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi
        );


    if (
        inlineScripts
    ) {

        inlineScripts.forEach(
            function (
                script
            ) {

                if (
                    script.includes(
                        "SUPABASE"
                    ) ||
                    script.includes(
                        "satoriQuantity"
                    ) ||
                    script.includes(
                        "satoriMainImage"
                    ) ||
                    script.includes(
                        "satori-tab"
                    )
                ) {

                    result.push(
                        script
                    );

                }

            }
        );

    }


    return result.join(
        "\n\n"
    );

}


/* =========================================================
   GALERÍA
========================================================= */

function buildGallery(
    product,
    productUrl
) {

    const images =
        Array.isArray(
            product.images
        ) &&
        product.images.length
            ? product.images
            : [
                product.image
            ];


    const mainImage =
        imagePathForPage(
            images[0],
            productUrl
        );


    return `

<div class="satori-main-image">

    <img
        id="satoriMainImage"
        src="${escapeHTML(
            mainImage
        )}"
        alt="${escapeHTML(
            product.name
        )}"
    >

</div>


<div class="satori-thumbnails">

    ${images
        .map(
            function (
                image,
                index
            ) {

                const src =
                    imagePathForPage(
                        image,
                        productUrl
                    );


                return `

<button
    type="button"
    class="satori-thumbnail ${
        index === 0
            ? "active"
            : ""
    }"
    data-image="${escapeHTML(
        src
    )}"
    aria-label="Imagen ${
        index + 1
    }"
>

    <img
        src="${escapeHTML(
            src
        )}"
        alt="${escapeHTML(
            product.name
        )}"
        loading="${
            index === 0
                ? "eager"
                : "lazy"
        }"
    >

</button>

                `;

            }
        )
        .join("\n")}

</div>

`;

}


/* =========================================================
   COLORES
========================================================= */

function buildColors(
    product
) {

    const colors =
        Array.isArray(
            product.colors
        )
            ? product.colors
            : [];


    if (
        !colors.length
    ) {

        return "";

    }


    return `

<section class="satori-option">

    <div class="satori-option-header">

        <span>
            COLOR
        </span>

    </div>


    <div class="satori-color-options">

        ${colors
            .map(
                function (
                    color,
                    index
                ) {

                    return `

<button
    type="button"
    class="satori-color-button ${
        index === 0
            ? "active"
            : ""
    }"
    data-color="${escapeHTML(
        color
    )}"
>

    <span
        class="satori-color-dot"
    ></span>

    <span>
        ${escapeHTML(
            color
        )}
    </span>

</button>

                    `;

                }
            )
            .join("\n")}

    </div>

</section>

`;

}


/* =========================================================
   TALLAS
========================================================= */

function buildSizes(
    product,
    productUrl
) {

    const sizes =
        Array.isArray(
            product.sizes
        )
            ? product.sizes
            : [];


    if (
        !sizes.length
    ) {

        return "";

    }


    const root =
        getRootPrefix(
            productUrl
        );


    return `

<section class="satori-option">

    <div class="satori-option-header">

        <span>
            TALLA
        </span>

        <a
            href="${escapeHTML(
                root +
                "guia-tallas.html"
            )}"
        >
            GUÍA DE TALLAS
        </a>

    </div>


    <div class="satori-size-options">

        ${sizes
            .map(
                function (
                    size,
                    index
                ) {

                    return `

<button
    type="button"
    class="satori-size-button ${
        index === 0
            ? "active"
            : ""
    }"
    data-size="${escapeHTML(
        size
    )}"
>

    ${escapeHTML(
        size
    )}

</button>

                    `;

                }
            )
            .join("\n")}

    </div>

</section>

`;

}


/* =========================================================
   PRODUCTO PRINCIPAL
========================================================= */

function buildProductSection(
    product,
    productUrl
) {

    const image =
        imagePathForPage(
            product.image,
            productUrl
        );


    const price =
        formatPrice(
            product.price
        );


    const category =
        displayCategory(
            product
        );


    const description =
        product.description ||
        product.details?.description ||
        "Producto SATORII.";


    const shipping =
        product.details?.shipping ||
        "Enviamos a todo Chile.";


    const warranty =
        product.details?.warranty ||
        "Garantía frente a fallas de fabricación.";


    const care =
        product.details?.care ||
        "Seguir las instrucciones de cuidado del producto.";


    return `

<section
    class="
        satori-product-layout
        satori-content-animate
    "
    id="producto"
>

    <div class="satori-product-gallery">

        ${buildGallery(
            product,
            productUrl
        )}

    </div>


    <div
        class="satori-product-info"
        data-product
        data-product-id="${escapeHTML(
            product.id
        )}"
        data-product-name="${escapeHTML(
            product.name
        )}"
        data-product-price="${escapeHTML(
            product.price
        )}"
        data-product-image="${escapeHTML(
            image
        )}"
    >

        <span class="satori-product-category">

            ${escapeHTML(
                category
            )}

        </span>


        <h1>

            ${escapeHTML(
                product.name
            )}

        </h1>


        <div class="satori-product-price">

            ${price}

        </div>


        <div class="satori-product-divider"></div>


        ${buildColors(
            product
        )}


        ${buildSizes(
            product,
            productUrl
        )}


        <div class="satori-quantity-row">

            <span class="satori-quantity-label">

                CANTIDAD

            </span>


            <div class="satori-quantity">

                <button
                    type="button"
                    id="satoriQuantityMinus"
                >
                    −
                </button>


                <span id="satoriQuantity">
                    1
                </span>


                <button
                    type="button"
                    id="satoriQuantityPlus"
                >
                    +
                </button>

            </div>


            <input
                type="hidden"
                id="quantity"
                value="1"
            >

        </div>


        <button
            type="button"
            id="addToCart"
            class="
                satori-add-to-cart
                add-to-cart
                add-to-cart-button
            "
            data-add-to-cart
            data-product-id="${escapeHTML(
                product.id
            )}"
            data-product-name="${escapeHTML(
                product.name
            )}"
            data-product-price="${escapeHTML(
                product.price
            )}"
            data-product-image="${escapeHTML(
                image
            )}"
        >

            AGREGAR AL CARRITO · ${price}

        </button>


        <div class="satori-trust-grid">

            <div class="satori-trust-item">

                <div class="satori-trust-icon">
                    🚚
                </div>

                <div>

                    <strong>
                        ENVÍOS
                    </strong>

                    <span>
                        ${escapeHTML(
                            shipping
                        )}
                    </span>

                </div>

            </div>


            <div class="satori-trust-item">

                <div class="satori-trust-icon">
                    🔒
                </div>

                <div>

                    <strong>
                        COMPRA SEGURA
                    </strong>

                    <span>
                        Compra protegida.
                    </span>

                </div>

            </div>


            <div class="satori-trust-item">

                <div class="satori-trust-icon">
                    ✦
                </div>

                <div>

                    <strong>
                        CALIDAD SATORII
                    </strong>

                    <span>
                        ${escapeHTML(
                            warranty
                        )}
                    </span>

                </div>

            </div>

        </div>


        <section class="satori-details">

            <div class="satori-tabs">

                <button
                    type="button"
                    class="satori-tab active"
                    data-tab="description"
                >
                    DESCRIPCIÓN
                </button>


                <button
                    type="button"
                    class="satori-tab"
                    data-tab="shipping"
                >
                    ENVÍOS Y GARANTÍA
                </button>

            </div>


            <div
                class="satori-panel active"
                data-panel="description"
            >

                <h3>
                    Sobre este producto
                </h3>

                <p>
                    ${escapeHTML(
                        description
                    )}
                </p>

                <p class="satori-product-care">

                    <strong>
                        Cuidados:
                    </strong>

                    ${escapeHTML(
                        care
                    )}

                </p>

            </div>


            <div
                class="satori-panel"
                data-panel="shipping"
            >

                <div class="satori-detail-item">

                    <strong>
                        ENVÍOS
                    </strong>

                    <p>
                        ${escapeHTML(
                            shipping
                        )}
                    </p>

                </div>


                <div class="satori-detail-item">

                    <strong>
                        GARANTÍA
                    </strong>

                    <p>
                        ${escapeHTML(
                            warranty
                        )}
                    </p>

                </div>

            </div>

        </section>

    </div>

</section>

`;

}


/* =========================================================
   PRODUCTOS RELACIONADOS
========================================================= */

function buildRelatedProducts(
    product,
    products,
    productUrl
) {

    let related =
        products.filter(
            function (
                item
            ) {

                return (
                    item.id !==
                    product.id
                );

            }
        );


    if (
        product.category
    ) {

        const sameCategory =
            related.filter(
                function (
                    item
                ) {

                    return (
                        item.category ===
                        product.category
                    );

                }
            );


        if (
            sameCategory.length
        ) {

            related =
                sameCategory;

        }

    }


    related =
        related.slice(
            0,
            5
        );


    if (
        !related.length
    ) {

        return "";

    }


    return `

<section class="satori-related">

    <div class="satori-related-heading">

        <span>
            SATORII · DESCUBRE MÁS
        </span>

        <h2>
            TAMBIÉN TE PUEDE
            <em>
                GUSTAR.
            </em>
        </h2>

        <p>
            Descubre otros diseños
            que podrían convertirse
            en parte de tu universo.
        </p>

    </div>


    <div class="satori-related-grid">

        ${related
            .map(
                function (
                    item
                ) {

                    const itemUrl =
                        normalizeProductUrl(
                            item
                        );


                    const relativeUrl =
                        getRelativeProductUrl(
                            productUrl,
                            itemUrl
                        );


                    const image =
                        imagePathForPage(
                            item.image,
                            productUrl
                        );


                    return `

<a
    href="${escapeHTML(
        relativeUrl
    )}"
    class="satori-related-card"
>

    <div class="satori-related-image">

        <img
            src="${escapeHTML(
                image
            )}"
            alt="${escapeHTML(
                item.name
            )}"
            loading="lazy"
        >

    </div>


    <div class="satori-related-info">

        <span>
            ${escapeHTML(
                displayCategory(
                    item
                )
            )}
        </span>


        <h3>
            ${escapeHTML(
                item.name
            )}
        </h3>


        <strong>
            ${formatPrice(
                item.price
            )}
        </strong>

    </div>

</a>

                    `;

                }
            )
            .join("\n")}

    </div>

</section>

`;

}


/* =========================================================
   EDITORIAL
========================================================= */

function buildEditorial(
    product,
    productUrl
) {

    const images =
        Array.isArray(
            product.images
        ) &&
        product.images.length
            ? product.images
            : [
                product.image
            ];


    const editorialImage =
        imagePathForPage(
            images[
                Math.min(
                    1,
                    images.length - 1
                )
            ],
            productUrl
        );


    return `

<section class="satori-style-banner no-image">

    <div class="satori-style-content">

        <span>
            SATORII · CUIDADO
        </span>


        <h2>

            CUIDA TU

            <em>
                SATORII.
            </em>

        </h2>


        <p>

            Una buena prenda merece durar.
            Aprende a cuidar el estampado,
            el tejido y la apariencia
            de tu Satorii.

        </p>


        <a
            href="${escapeHTML(
                getRootPrefix(
                    productUrl
                ) +
                "guia-tallas.html"
            )}"
        >
            VER GUÍA →
        </a>

    </div>

</section>


<section class="satori-editorial">

    <div class="satori-editorial-content">

        <span>
            SATORII · ${escapeHTML(
                displayCategory(
                    product
                )
            )}
        </span>


        <h2>

            NO VISTAS UN

            <em>
                PERSONAJE.
            </em>

            <br>

            VISTE TU

            <strong>
                UNIVERSO.
            </strong>

        </h2>


        <p>

            Tu estilo no necesita
            explicaciones.
            Es una forma de mostrar
            aquello que realmente
            te representa.

        </p>


        <a href="#producto">
            VER LA PRENDA →
        </a>

    </div>


    <div class="satori-editorial-image">

        <img
            src="${escapeHTML(
                editorialImage
            )}"
            alt="${escapeHTML(
                product.name
            )}"
        >

    </div>

</section>

`;

}


/* =========================================================
   PÁGINA COMPLETA
========================================================= */

function buildPage(
    product,
    products,
    template
) {

    const productUrl =
        normalizeProductUrl(
            product
        );


    const root =
        getRootPrefix(
            productUrl
        );


    const image =
        imagePathForPage(
            product.image,
            productUrl
        );


    const description =
        product.description ||
        product.details?.description ||
        `Producto ${product.name} de SATORII.`;


    const title =
        `${product.name} | Satorii`;


    const styles =
        extractTemplateStyles(
            template
        );


    const productSection =
        buildProductSection(
            product,
            productUrl
        );


    const related =
        buildRelatedProducts(
            product,
            products,
            productUrl
        );


    const editorial =
        buildEditorial(
            product,
            productUrl
        );


    const scripts =
        buildGlobalScripts(
            productUrl,
            template
        );


    return `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">


    <meta
        name="viewport"
        content="
            width=device-width,
            initial-scale=1.0
        "
    >


    <meta
        name="description"
        content="${escapeHTML(
            description
        )}"
    >


    <meta
        name="theme-color"
        content="${SITE_RED}"
    >


    <title>
        ${escapeHTML(
            title
        )}
    </title>


    <link
        rel="icon"
        type="image/png"
        href="${escapeHTML(
            root +
            "img/logo.webp"
        )}"
    >


    <link
        rel="stylesheet"
        href="${escapeHTML(
            root +
            "css/style.css"
        )}"
    >


    <link
        rel="stylesheet"
        href="${escapeHTML(
            root +
            "css/animations.css"
        )}"
    >


    ${styles}

</head>


<body

    data-product-id="${escapeHTML(
        product.id
    )}"

    data-product-name="${escapeHTML(
        product.name
    )}"

    data-product-price="${escapeHTML(
        product.price
    )}"

    data-product-image="${escapeHTML(
        image
    )}"

>


    <div
        id="satori-header"
    ></div>


    <main
        class="satori-page-animate"
    >

        <div
            class="satori-product-page"
        >

            ${productSection}

            ${editorial}

            ${related}

        </div>

    </main>


    <div
        id="satori-footer"
    ></div>


    ${scripts}


</body>

</html>
`;

}


/* =========================================================
   GENERAR
========================================================= */

function generateProducts() {

    console.log("");
    console.log(
        "========================================"
    );
    console.log(
        "SATORII · GENERADOR DE PRODUCTOS"
    );
    console.log(
        "========================================"
    );
    console.log("");


    const products =
        loadProducts();


    console.log(
        `✓ Productos cargados: ${products.length}`
    );


    validateProducts(
        products
    );


    console.log(
        "✓ Catálogo validado."
    );


    const templateFile =
        findTemplate();


    const template =
        fs.readFileSync(
            templateFile,
            "utf8"
        );


    console.log(
        `✓ Plantilla: ${path.relative(
            ROOT_DIR,
            templateFile
        )}`
    );


    let generated = 0;


    products.forEach(
        function (
            product
        ) {

            const outputPath =
                getOutputPath(
                    product
                );


            const productUrl =
                path.relative(
                    ROOT_DIR,
                    outputPath
                )
                .replace(
                    /\\/g,
                    "/"
                );


            const html =
                buildPage(
                    product,
                    products,
                    template
                );


            fs.mkdirSync(
                path.dirname(
                    outputPath
                ),
                {
                    recursive: true
                }
            );


            fs.writeFileSync(
                outputPath,
                html,
                "utf8"
            );


            generated++;


            console.log(
                `✓ Generado: ${productUrl}`
            );

        }
    );


    console.log("");
    console.log(
        "========================================"
    );
    console.log(
        `✓ Páginas generadas: ${generated}`
    );
    console.log(
        "✓ animations.js incluido"
    );
    console.log(
        "✓ Rutas relativas corregidas"
    );
    console.log(
        "========================================"
    );
    console.log("");

}


/* =========================================================
   EJECUCIÓN
========================================================= */

try {

    generateProducts();

}
catch (
    error
) {

    console.error("");
    console.error(
        "========================================"
    );
    console.error(
        "SATORII · ERROR"
    );
    console.error(
        "========================================"
    );
    console.error("");
    console.error(
        error.message
    );
    console.error("");

    process.exit(
        1
    );

}
