/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 2 · CLARO MINIMALISTA / EDITORIAL

   - Genera automáticamente productos/{categoria}/{id}.html
   - Usa js/products.js como fuente inicial
   - Actualiza título, precio, imágenes, colores, tallas y stock
     desde Supabase cuando la página está abierta
   - Escucha cambios Realtime de Supabase
   - Tiene polling de respaldo cada 30 segundos
   - Mantiene header, footer, carrito y animaciones globales
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


const SITE_RED =
    "#EF0930";


const DESIGN_NAME =
    "CLARO MINIMALISTA";


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


/* =========================================================
   SLUG
========================================================= */

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


/* =========================================================
   PRECIO
========================================================= */

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


/* =========================================================
   CATEGORÍA
========================================================= */

function getCategory(
    product
) {

    return String(
        product.category ||
        product.collection ||
        "SATORII"
    );

}


/* =========================================================
   CATEGORÍA LABEL
========================================================= */

function getCategoryLabel(
    product
) {

    return getCategory(
        product
    )
        .replace(
            /[-_]/g,
            " "
        )
        .toUpperCase();

}


/* =========================================================
   URL DEL PRODUCTO
========================================================= */

function normalizeProductUrl(
    product
) {

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
                getCategory(
                    product
                )
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
        !url
            .toLowerCase()
            .endsWith(
                ".html"
            )
    ) {

        url += ".html";

    }


    return url;

}


/* =========================================================
   PREFIJO A LA RAÍZ
========================================================= */

function getRootPrefix(
    productUrl
) {

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


/* =========================================================
   PÁGINA DE CATEGORÍA
========================================================= */

function getCategoryPagePath(
    product,
    productUrl
) {

    const category =
        slugify(
            getCategory(
                product
            )
        );


    return (
        getRootPrefix(
            productUrl
        ) +
        category +
        ".html"
    );

}


/* =========================================================
   RUTA DE IMAGEN
========================================================= */

function getImagePath(
    image,
    productUrl
) {

    if (!image) {

        return "";

    }


    const clean =
        String(
            image
        )
            .replace(
                /^\/+/,
                ""
            );


    if (
        /^(https?:)?\/\//i.test(
            clean
        ) ||
        clean.startsWith(
            "data:"
        ) ||
        clean.startsWith(
            "blob:"
        )
    ) {

        return clean;

    }


    return (
        getRootPrefix(
            productUrl
        ) +
        clean
    );

}


/* =========================================================
   IMÁGENES DEL PRODUCTO
========================================================= */

function getProductImages(
    product
) {

    if (
        Array.isArray(
            product.images
        ) &&
        product.images.length
    ) {

        return product.images.filter(
            Boolean
        );

    }


    if (
        product.image
    ) {

        return [
            product.image
        ];

    }


    return [];

}


/* =========================================================
   DESCRIPCIÓN
========================================================= */

function getDescription(
    product
) {

    return (
        product.description ||
        product.details?.description ||
        "Diseño exclusivo SATORII."
    );

}


/* =========================================================
   MATERIAL
========================================================= */

function getMaterial(
    product
) {

    return (
        product.details?.material ||
        product.material ||
        "Material de alta calidad."
    );

}


/* =========================================================
   ENVÍOS
========================================================= */

function getShipping(
    product
) {

    return (
        product.details?.shipping ||
        "Envíos a todo Chile."
    );

}


/* =========================================================
   CUIDADO
========================================================= */

function getCare(
    product
) {

    return (
        product.details?.care ||
        "Seguir las instrucciones de cuidado del producto."
    );

}


/* =========================================================
   RUTA DE SALIDA
========================================================= */

function getOutputPath(
    product
) {

    return path.join(
        ROOT_DIR,
        ...normalizeProductUrl(
            product
        ).split("/")
    );

}


/* =========================================================
   CARGAR PRODUCTS.JS
========================================================= */

function loadProducts() {

    if (
        !fs.existsSync(
            PRODUCTS_JS
        )
    ) {

        throw new Error(
            `No existe ${PRODUCTS_JS}`
        );

    }


    const source =
        fs.readFileSync(
            PRODUCTS_JS,
            "utf8"
        );


    const marker =
        "const PRODUCTS =";


    const markerPosition =
        source.indexOf(
            marker
        );


    if (
        markerPosition === -1
    ) {

        throw new Error(
            "No se encontró 'const PRODUCTS =' en js/products.js."
        );

    }


    const arrayStart =
        source.indexOf(
            "[",
            markerPosition
        );


    if (
        arrayStart === -1
    ) {

        throw new Error(
            "No se encontró el inicio del array PRODUCTS."
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


        if (
            escaped
        ) {

            escaped = false;
            continue;

        }


        if (
            char === "\\"
        ) {

            escaped = true;
            continue;

        }


        if (
            quote
        ) {

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


        if (
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
            "No se pudo encontrar el final de PRODUCTS."
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

    catch (
        error
    ) {

        throw new Error(
            "No se pudo interpretar PRODUCTS:\n" +
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
                    `Producto inválido en posición ${index + 1}.`
                );

            }


            if (
                !product.id
            ) {

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


            if (
                !product.name
            ) {

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


            if (
                !product.image &&
                !(
                    Array.isArray(
                        product.images
                    ) &&
                    product.images.length
                )
            ) {

                throw new Error(
                    `Producto ${product.id} sin image/images.`
                );

            }

        }
    );

}


/* =========================================================
   COLORES
========================================================= */

function colorValue(
    color
) {

    const value =
        String(
            color || ""
        )
            .toLowerCase()
            .trim();


    const map = {

        negro: "#111111",
        black: "#111111",

        rojo: "#ef0930",
        red: "#ef0930",

        blanco: "#ffffff",
        white: "#ffffff",

        rosa: "#e56b8c",
        pink: "#e56b8c",

        azul: "#4b72c9",
        blue: "#4b72c9",

        verde: "#5b8d6b",
        green: "#5b8d6b",

        gris: "#a9a9a9",
        gray: "#a9a9a9",
        grey: "#a9a9a9",

        morado: "#8664b9",
        purple: "#8664b9",

        amarillo: "#e9c64b",
        yellow: "#e9c64b"

    };


    return (
        map[value] ||
        "#d9d9d9"
    );

}


/* =========================================================
   MINIATURAS
========================================================= */

function buildThumbnails(
    product,
    productUrl
) {

    const images =
        getProductImages(
            product
        );


    if (
        images.length <= 1
    ) {

        return "";

    }


    return `
<div class="satori-product-thumbnails">

    ${images
        .map(
            function (
                image,
                index
            ) {

                const src =
                    getImagePath(
                        image,
                        productUrl
                    );


                return `
<button
    type="button"
    class="satori-product-thumb ${
        index === 0
            ? "active"
            : ""
    }"
    data-gallery-image="${escapeHTML(
        src
    )}"
    aria-label="Ver imagen ${
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
        loading="lazy"
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
   OPCIONES DE COLOR
========================================================= */

function buildColorOptions(
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
<div class="satori-option">

    <span class="satori-option-label">
        COLOR
    </span>


    <div
        class="satori-colors"
        data-product-colors
    >

        ${colors
            .map(
                function (
                    color,
                    index
                ) {

                    return `
<button
    type="button"
    class="satori-color ${
        index === 0
            ? "active"
            : ""
    }"
    data-color="${escapeHTML(
        color
    )}"
    aria-label="${escapeHTML(
        color
    )}"
    title="${escapeHTML(
        color
    )}"
>

    <span
        style="
            background:${escapeHTML(
                colorValue(
                    color
                )
            )}
        "
    ></span>

</button>
`;

                }
            )
            .join("\n")}

    </div>


    <small class="satori-selected-color">
        ${escapeHTML(
            colors[0] || ""
        )}
    </small>

</div>
`;

}


/* =========================================================
   OPCIONES DE TALLA
========================================================= */

function buildSizeOptions(
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
<div class="satori-option">

    <div class="satori-option-head">

        <span class="satori-option-label">
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


    <div
        class="satori-sizes"
        data-product-sizes
    >

        ${sizes
            .map(
                function (
                    size,
                    index
                ) {

                    return `
<button
    type="button"
    class="satori-size ${
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


    <small class="satori-selected-size">
        ${escapeHTML(
            sizes[0] || ""
        )}
    </small>

</div>
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

    const category =
        getCategory(
            product
        );


    let related =
        products.filter(
            function (
                item
            ) {

                return (
                    String(
                        item.id
                    ) !==
                    String(
                        product.id
                    )
                );

            }
        );


    const sameCategory =
        related.filter(
            function (
                item
            ) {

                return (
                    getCategory(
                        item
                    ) ===
                    category
                );

            }
        );


    if (
        sameCategory.length
    ) {

        related =
            sameCategory;

    }


    related =
        related.slice(
            0,
            3
        );


    if (
        !related.length
    ) {

        return "";

    }


    return `
<section class="satori-related">

    <div class="satori-section-heading">

        <span>
            TAMBIÉN TE PUEDE GUSTAR
        </span>

        <h2>
            DESCUBRE MÁS.
        </h2>

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
                        path.posix.relative(
                            path.posix.dirname(
                                productUrl
                            ),
                            itemUrl
                        ) ||
                        path.posix.basename(
                            itemUrl
                        );


                    const image =
                        getImagePath(
                            item.image ||
                            getProductImages(
                                item
                            )[0],
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
                getCategoryLabel(
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
   CSS · DISEÑO 2
========================================================= */

function buildDesignCSS() {

    return `

:root {

    --satori-red:
        #EF0930;

    --satori-black:
        #111111;

    --satori-ink:
        #17202b;

    --satori-muted:
        #777777;

    --satori-line:
        #dedede;

    --satori-soft:
        #f5f5f5;

}


/* =========================================================
   BODY
========================================================= */

body.satori-design-2 {

    margin:
        0;

    background:
        #ffffff;

    color:
        var(--satori-black);

    font-family:
        Inter,
        Arial,
        Helvetica,
        sans-serif;

}


.satori-design-2-page {

    overflow:
        hidden;

    background:
        #fff;

}


/* =========================================================
   CONTENEDOR
========================================================= */

.satori-product-wrap {

    width:
        min(
            1420px,
            calc(100% - 48px)
        );

    margin:
        0 auto;

}


/* =========================================================
   BREADCRUMBS
========================================================= */

.satori-breadcrumbs {

    padding:
        26px 0 18px;

    color:
        #777;

    font-size:
        10px;

    font-weight:
        700;

    letter-spacing:
        .08em;

    text-transform:
        uppercase;

}


.satori-breadcrumbs a {

    color:
        inherit;

    text-decoration:
        none;

}


.satori-breadcrumbs strong {

    color:
        #111;

}


/* =========================================================
   HERO PRODUCTO
========================================================= */

.satori-product-hero {

    display:
        grid;

    grid-template-columns:
        minmax(0, 1.08fr)
        minmax(390px, .92fr);

    gap:
        clamp(
            45px,
            6vw,
            100px
        );

    align-items:
        start;

    padding:
        10px 0 70px;

}


/* =========================================================
   GALERÍA
========================================================= */

.satori-gallery {

    display:
        grid;

    grid-template-columns:
        64px
        minmax(0, 1fr);

    gap:
        18px;

    min-width:
        0;

}


.satori-product-thumbnails {

    display:
        flex;

    flex-direction:
        column;

    gap:
        12px;

}


.satori-product-thumb {

    width:
        64px;

    height:
        72px;

    padding:
        5px;

    border:
        1px solid #e5e5e5;

    background:
        #f3f3f3;

    cursor:
        pointer;

    transition:
        border-color .2s ease,
        transform .2s ease;

}


.satori-product-thumb:hover {

    transform:
        translateY(-2px);

}


.satori-product-thumb.active {

    border-color:
        var(--satori-red);

}


.satori-product-thumb img {

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

}


/* =========================================================
   IMAGEN PRINCIPAL
========================================================= */

.satori-main-visual {

    position:
        relative;

    min-height:
        600px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    background:
        #f3f1f1;

    overflow:
        hidden;

}


.satori-main-visual::before {

    content:
        "";

    position:
        absolute;

    inset:
        0;

    background:
        radial-gradient(
            circle at 50% 50%,
            rgba(255,255,255,.9),
            transparent 62%
        );

    pointer-events:
        none;

}


.satori-main-image {

    position:
        relative;

    z-index:
        1;

    width:
        92%;

    height:
        600px;

    object-fit:
        contain;

    filter:
        drop-shadow(
            0 24px 28px
            rgba(0,0,0,.12)
        );

    transition:
        opacity .18s ease,
        transform .45s
        cubic-bezier(
            .2,
            .7,
            .2,
            1
        );

}


.satori-main-image.is-changing {

    opacity:
        .35;

    transform:
        scale(.985);

}


.satori-main-zoom {

    position:
        absolute;

    right:
        18px;

    bottom:
        18px;

    z-index:
        2;

    width:
        38px;

    height:
        38px;

    border:
        1px solid #ddd;

    border-radius:
        50%;

    background:
        #fff;

    cursor:
        pointer;

}


/* =========================================================
   INFORMACIÓN
========================================================= */

.satori-product-info {

    padding-top:
        2px;

}


.satori-eyebrow {

    display:
        block;

    margin-bottom:
        7px;

    color:
        var(--satori-red);

    font-size:
        10px;

    font-weight:
        900;

    letter-spacing:
        .08em;

    text-transform:
        uppercase;

}


.satori-product-title {

    margin:
        0;

    font-family:
        "Arial Narrow",
        "Roboto Condensed",
        Arial,
        sans-serif;

    font-size:
        clamp(
            38px,
            4vw,
            66px
        );

    line-height:
        .94;

    font-style:
        italic;

    font-weight:
        900;

    letter-spacing:
        -.045em;

    text-transform:
        uppercase;

}


.satori-price {

    margin-top:
        13px;

    font-size:
        18px;

    font-weight:
        900;

}


.satori-tax {

    margin-top:
        4px;

    padding-bottom:
        18px;

    border-bottom:
        1px solid #d8d8d8;

    color:
        #777;

    font-size:
        10px;

}


/* =========================================================
   OPCIONES
========================================================= */

.satori-option {

    margin-top:
        22px;

}


.satori-option-label {

    display:
        block;

    margin-bottom:
        10px;

    font-size:
        10px;

    font-weight:
        900;

    letter-spacing:
        .1em;

}


.satori-option-head {

    display:
        flex;

    align-items:
        center;

    justify-content:
        space-between;

}


.satori-option-head
.satori-option-label {

    margin-bottom:
        10px;

}


.satori-option-head a {

    color:
        #333;

    font-size:
        9px;

    font-weight:
        800;

    text-decoration:
        underline;

}


/* =========================================================
   COLORES
========================================================= */

.satori-colors {

    display:
        flex;

    gap:
        11px;

}


.satori-color {

    width:
        27px;

    height:
        27px;

    padding:
        3px;

    border:
        1px solid #cfcfcf;

    border-radius:
        50%;

    background:
        #fff;

    cursor:
        pointer;

}


.satori-color span {

    display:
        block;

    width:
        100%;

    height:
        100%;

    border-radius:
        50%;

    border:
        1px solid
        rgba(0,0,0,.08);

}


.satori-color.active {

    border:
        2px solid #111;

    box-shadow:
        0 0 0 2px #fff,
        0 0 0 3px #111;

}


.satori-selected-color,
.satori-selected-size {

    display:
        block;

    margin-top:
        7px;

    color:
        #777;

    font-size:
        9px;

}


/* =========================================================
   TALLAS
========================================================= */

.satori-sizes {

    display:
        flex;

    flex-wrap:
        wrap;

    gap:
        8px;

}


.satori-size {

    min-width:
        42px;

    height:
        34px;

    padding:
        0 10px;

    border:
        1px solid #cfcfcf;

    background:
        #fff;

    color:
        #111;

    font-size:
        10px;

    font-weight:
        800;

    cursor:
        pointer;

    transition:
        .2s ease;

}


.satori-size:hover,
.satori-size.active {

    border-color:
        #111;

    background:
        #111;

    color:
        #fff;

}


/* =========================================================
   CANTIDAD
========================================================= */

.satori-quantity-row {

    display:
        flex;

    gap:
        10px;

    margin-top:
        24px;

}


.satori-quantity {

    display:
        flex;

    align-items:
        center;

    height:
        48px;

    border:
        1px solid #cfcfcf;

}


.satori-quantity button {

    width:
        38px;

    height:
        100%;

    border:
        0;

    background:
        #fff;

    font-size:
        16px;

    cursor:
        pointer;

}


.satori-quantity span {

    width:
        30px;

    text-align:
        center;

    font-size:
        12px;

}


/* =========================================================
   BOTÓN
========================================================= */

.satori-add {

    flex:
        1;

    min-height:
        48px;

    border:
        1px solid
        var(--satori-red);

    background:
        var(--satori-red);

    color:
        #fff;

    font-size:
        10px;

    font-weight:
        900;

    letter-spacing:
        .05em;

    cursor:
        pointer;

    transition:
        transform .2s ease,
        filter .2s ease;

}


.satori-add:hover {

    transform:
        translateY(-2px);

    filter:
        brightness(1.04);

}


.satori-add:disabled {

    opacity:
        .45;

    cursor:
        not-allowed;

    transform:
        none;

}


/* =========================================================
   CONFIANZA
========================================================= */

.satori-trust {

    display:
        grid;

    grid-template-columns:
        repeat(3,1fr);

    gap:
        18px;

    margin-top:
        18px;

    padding-top:
        17px;

    border-top:
        1px solid #ddd;

}


.satori-trust-item {

    display:
        flex;

    gap:
        8px;

    align-items:
        center;

    color:
        #555;

    font-size:
        9px;

    line-height:
        1.3;

}


.satori-trust-item strong {

    color:
        #111;

}


/* =========================================================
   DESCRIPCIÓN
========================================================= */

.satori-description-box {

    margin-top:
        25px;

    padding-top:
        20px;

    border-top:
        1px solid #ddd;

}


.satori-tabs {

    display:
        flex;

    gap:
        0;

    border-bottom:
        1px solid #ddd;

}


.satori-tab {

    position:
        relative;

    padding:
        0 28px 12px 0;

    border:
        0;

    background:
        transparent;

    color:
        #777;

    font-size:
        9px;

    font-weight:
        900;

    cursor:
        pointer;

    text-transform:
        uppercase;

}


.satori-tab.active {

    color:
        #111;

}


.satori-tab.active::after {

    content:
        "";

    position:
        absolute;

    left:
        0;

    bottom:
        -1px;

    width:
        48px;

    height:
        2px;

    background:
        var(--satori-red);

}


.satori-panel {

    padding:
        18px 0 0;

    color:
        #555;

    font-size:
        11px;

    line-height:
        1.7;

}


.satori-panel[hidden] {

    display:
        none;

}


.satori-panel ul {

    margin:
        10px 0 0;

    padding-left:
        18px;

}


/* =========================================================
   RELACIONADOS
========================================================= */

.satori-related {

    padding:
        45px 0 90px;

    border-top:
        1px solid #eee;

}


.satori-section-heading span {

    color:
        var(--satori-red);

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .12em;

}


.satori-section-heading h2 {

    margin:
        7px 0 25px;

    font-family:
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        34px;

    font-style:
        italic;

    line-height:
        1;

    text-transform:
        uppercase;

}


.satori-related-grid {

    display:
        grid;

    grid-template-columns:
        repeat(3,1fr);

    gap:
        18px;

}


.satori-related-card {

    color:
        #111;

    text-decoration:
        none;

}


.satori-related-image {

    aspect-ratio:
        1 / 1.05;

    background:
        #f4f4f4;

    overflow:
        hidden;

}


.satori-related-image img {

    width:
        100%;

    height:
        100%;

    object-fit:
        contain;

    transition:
        transform .35s ease;

}


.satori-related-card:hover
.satori-related-image img {

    transform:
        scale(1.035);

}


.satori-related-info {

    padding:
        10px 2px;

}


.satori-related-info span {

    color:
        #777;

    font-size:
        8px;

    font-weight:
        800;

    letter-spacing:
        .1em;

}


.satori-related-info h3 {

    margin:
        5px 0;

    font-size:
        12px;

    text-transform:
        uppercase;

}


.satori-related-info strong {

    font-size:
        11px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (
    max-width: 1050px
) {

    .satori-product-hero {

        grid-template-columns:
            1fr;

        gap:
            35px;

    }


    .satori-product-info {

        max-width:
            720px;

        width:
            100%;

        margin:
            0 auto;

    }


    .satori-main-visual,
    .satori-main-image {

        min-height:
            520px;

        height:
            520px;

    }

}


@media (
    max-width: 700px
) {

    .satori-product-wrap {

        width:
            min(
                100% - 28px,
                600px
            );

    }


    .satori-breadcrumbs {

        padding-top:
            18px;

    }


    .satori-gallery {

        grid-template-columns:
            1fr;

    }


    .satori-product-thumbnails {

        order:
            2;

        flex-direction:
            row;

        overflow:
            auto;

        padding-bottom:
            4px;

    }


    .satori-product-thumb {

        flex:
            0 0 58px;

        width:
            58px;

        height:
            64px;

    }


    .satori-main-visual,
    .satori-main-image {

        min-height:
            420px;

        height:
            420px;

    }


    .satori-product-title {

        font-size:
            44px;

    }


    .satori-trust {

        grid-template-columns:
            1fr;

        gap:
            10px;

    }


    .satori-related-grid {

        grid-template-columns:
            1fr;

    }


    .satori-quantity-row {

        flex-wrap:
            wrap;

    }


    .satori-quantity {

        width:
            100%;

        justify-content:
            center;

    }


    .satori-add {

        width:
            100%;

    }

}

`;

}


/* =========================================================
   HTML · HERO
========================================================= */

function buildHero(
    product,
    productUrl
) {

    const images =
        getProductImages(
            product
        );


    const mainImage =
        getImagePath(
            images[0] ||
            product.image,
            productUrl
        );


    const category =
        getCategoryLabel(
            product
        );


    const price =
        formatPrice(
            product.price
        );


    return `
<div class="satori-product-wrap">

    <nav
        class="satori-breadcrumbs"
        aria-label="Breadcrumb"
    >

        <a
            href="${escapeHTML(
                getRootPrefix(
                    productUrl
                ) +
                "index.html"
            )}"
        >
            INICIO
        </a>

        <span> / </span>

        <a
            href="${escapeHTML(
                getCategoryPagePath(
                    product,
                    productUrl
                )
            )}"
        >
            ${escapeHTML(
                category
            )}
        </a>

        <span> / </span>

        <strong>
            ${escapeHTML(
                product.name
            )}
        </strong>

    </nav>


    <section class="satori-product-hero">

        <!-- GALERÍA -->

        <div class="satori-gallery">

            ${buildThumbnails(
                product,
                productUrl
            )}


            <div class="satori-main-visual">

                <img
                    id="satoriMainImage"
                    class="satori-main-image"
                    src="${escapeHTML(
                        mainImage
                    )}"
                    alt="${escapeHTML(
                        product.name
                    )}"
                >


                <button
                    type="button"
                    class="satori-main-zoom"
                    id="satoriZoom"
                    aria-label="Ampliar imagen"
                >
                    ⌕
                </button>

            </div>

        </div>


        <!-- INFORMACIÓN -->

        <div class="satori-product-info">

            <span class="satori-eyebrow">
                ${escapeHTML(
                    category
                )}
                COLLECTION
            </span>


            <h1
                class="satori-product-title"
                id="satoriProductTitle"
            >
                ${escapeHTML(
                    product.name
                )}
            </h1>


            <div
                class="satori-price"
                id="satoriProductPrice"
            >
                ${price} CLP
            </div>


            <div class="satori-tax">

                Impuestos incluidos.
                Envío calculado en el checkout.

            </div>


            <div class="satori-options">

                ${buildColorOptions(
                    product
                )}

                ${buildSizeOptions(
                    product,
                    productUrl
                )}

            </div>


            <!-- CANTIDAD / CARRITO -->

            <div class="satori-quantity-row">

                <div
                    class="satori-quantity"
                    aria-label="Cantidad"
                >

                    <button
                        type="button"
                        id="satoriQuantityMinus"
                        aria-label="Disminuir cantidad"
                    >
                        −
                    </button>


                    <span
                        id="satoriQuantity"
                    >
                        1
                    </span>


                    <button
                        type="button"
                        id="satoriQuantityPlus"
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>


                    <input
                        type="hidden"
                        id="quantity"
                        value="1"
                    >

                </div>


                <button
                    type="button"
                    class="satori-add"
                    id="addToCart"
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
                        mainImage
                    )}"
                >

                    🛒 AGREGAR AL CARRITO

                </button>

            </div>


            <!-- CONFIANZA -->

            <div class="satori-trust">

                <div class="satori-trust-item">

                    🚚

                    <span>
                        <strong>
                            Envíos a todo Chile
                        </strong>
                        <br>
                        Despacho rápido y seguro.
                    </span>

                </div>


                <div class="satori-trust-item">

                    ◈

                    <span>
                        <strong>
                            Compra segura
                        </strong>
                        <br>
                        Tus datos protegidos.
                    </span>

                </div>


                <div class="satori-trust-item">

                    ✓

                    <span>
                        <strong>
                            Garantía SATORII
                        </strong>
                        <br>
                        Calidad asegurada.
                    </span>

                </div>

            </div>


            <!-- DESCRIPCIÓN -->

            <div class="satori-description-box">

                <div
                    class="satori-tabs"
                    role="tablist"
                >

                    <button
                        class="satori-tab active"
                        type="button"
                        data-tab="description"
                    >
                        DESCRIPCIÓN
                    </button>


                    <button
                        class="satori-tab"
                        type="button"
                        data-tab="shipping"
                    >
                        ENVÍOS Y GARANTÍA
                    </button>

                </div>


                <div
                    class="satori-panel"
                    id="tab-description"
                    data-tab-panel="description"
                >

                    ${escapeHTML(
                        getDescription(
                            product
                        )
                    )}


                    <ul>

                        <li>
                            ${escapeHTML(
                                getMaterial(
                                    product
                                )
                            )}
                        </li>

                        <li>
                            Estampado de alta definición
                        </li>

                        <li>
                            Diseño exclusivo SATORII
                        </li>

                    </ul>

                </div>


                <div
                    class="satori-panel"
                    id="tab-shipping"
                    data-tab-panel="shipping"
                    hidden
                >

                    ${escapeHTML(
                        getShipping(
                            product
                        )
                    )}

                    <br>
                    <br>

                    ${escapeHTML(
                        getCare(
                            product
                        )
                    )}

                </div>

            </div>

        </div>

    </section>

</div>
`;

}


/* =========================================================
   JAVASCRIPT DEL PRODUCTO
========================================================= */

function buildProductScript(
    product,
    productUrl
) {

    const productId =
        JSON.stringify(
            String(
                product.id
            )
        );


    const rootPrefix =
        JSON.stringify(
            getRootPrefix(
                productUrl
            )
        );


    return `
<script>

(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const PRODUCT_ID =
        ${productId};


    const ROOT_PREFIX =
        ${rootPrefix};


    const SUPABASE_RETRY_LIMIT =
        40;


    const POLL_INTERVAL =
        30000;


    let supabaseAttempts =
        0;


    let realtimeChannel =
        null;


    let pollTimer =
        null;


    /* =====================================================
       PRECIO
    ====================================================== */

    function formatPrice(
        value
    ) {

        return (
            "$" +
            (
                Number(value) || 0
            ).toLocaleString(
                "es-CL"
            )
        );

    }


    /* =====================================================
       IMÁGENES REMOTAS
    ====================================================== */

    function normalizeImage(
        value
    ) {

        if (!value) {

            return "";

        }


        const original =
            String(
                value
            );


        if (
            /^(https?:)?\\/\\//i.test(
                original
            ) ||
            original.startsWith(
                "data:"
            ) ||
            original.startsWith(
                "blob:"
            )
        ) {

            return original;

        }


        return (
            ROOT_PREFIX +
            original.replace(
                /^\\/+/,
                ""
            )
        );

    }


    function getImages(
        product
    ) {

        if (
            Array.isArray(
                product.images
            ) &&
            product.images.length
        ) {

            return product.images.filter(
                Boolean
            );

        }


        if (
            product.image
        ) {

            return [
                product.image
            ];

        }


        return [];

    }


    /* =====================================================
       META
    ====================================================== */

    function setMeta(
        selector,
        value
    ) {

        const element =
            document.querySelector(
                selector
            );


        if (
            element &&
            value !== undefined &&
            value !== null
        ) {

            element.setAttribute(
                "content",
                String(
                    value
                )
            );

        }

    }


    /* =====================================================
       ANIMACIÓN DE IMAGEN
    ====================================================== */

    function animateImageChange(
        image,
        callback
    ) {

        if (!image) {

            return;

        }


        image.classList.add(
            "is-changing"
        );


        window.setTimeout(
            function () {

                callback();


                requestAnimationFrame(
                    function () {

                        image.classList.remove(
                            "is-changing"
                        );

                    }
                );

            },
            100
        );

    }


    /* =====================================================
       GALERÍA
    ====================================================== */

    function bindGallery() {

        const main =
            document.getElementById(
                "satoriMainImage"
            );


        document
            .querySelectorAll(
                ".satori-product-thumb"
            )
            .forEach(
                function (
                    thumb
                ) {

                    thumb.addEventListener(
                        "click",
                        function () {

                            const src =
                                thumb.dataset.galleryImage;


                            if (
                                !main ||
                                !src
                            ) {

                                return;

                            }


                            animateImageChange(
                                main,
                                function () {

                                    main.src =
                                        src;

                                }
                            );


                            document
                                .querySelectorAll(
                                    ".satori-product-thumb"
                                )
                                .forEach(
                                    function (
                                        item
                                    ) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            thumb.classList.add(
                                "active"
                            );

                        }
                    );

                }
            );


        const zoom =
            document.getElementById(
                "satoriZoom"
            );


        if (
            zoom &&
            main
        ) {

            zoom.addEventListener(
                "click",
                function () {

                    if (
                        main.requestFullscreen
                    ) {

                        main
                            .requestFullscreen()
                            .catch(
                                function () {}
                            );

                    }

                }
            );

        }

    }


    /* =====================================================
       ACTUALIZAR GALERÍA DESDE SUPABASE
    ====================================================== */

    function updateGallery(
        product
    ) {

        const main =
            document.getElementById(
                "satoriMainImage"
            );


        const images =
            getImages(
                product
            )
                .map(
                    normalizeImage
                );


        if (
            !main ||
            !images.length
        ) {

            return;

        }


        animateImageChange(
            main,
            function () {

                main.src =
                    images[0];


                main.alt =
                    product.name ||
                    main.alt;

            }
        );


        let gallery =
            document.querySelector(
                ".satori-product-thumbnails"
            );


        if (!gallery) {

            gallery =
                document.createElement(
                    "div"
                );


            gallery.className =
                "satori-product-thumbnails";


            const visual =
                document.querySelector(
                    ".satori-main-visual"
                );


            if (
                visual &&
                visual.parentNode
            ) {

                visual.parentNode.insertBefore(
                    gallery,
                    visual
                );

            }

        }


      gallery.innerHTML =
gallery.innerHTML =
    images
        .map(
            function (
                src,
                index
            ) {

                return \`
<button
    type="button"
    class="satori-product-thumb \${
        index === 0
            ? "active"
            : ""
    }"
    data-gallery-image="\\${src.replace(
        /&/g,
        "&amp;"
    ).replace(
        /"/g,
        "&quot;"
    )}"
>

    <img
        src="\\${src.replace(
            /"/g,
            "&quot;"
        )}"
        alt="\\${String(
            product.name || ""
        ).replace(
            /"/g,
            "&quot;"
        )}"
        loading="lazy"
    >

</button>
\`;

            }
        )
        .join("");

        bindGallery();

    }


    /* =====================================================
       COLORES
    ====================================================== */

    function bindColors() {

        document
            .querySelectorAll(
                ".satori-color"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            document
                                .querySelectorAll(
                                    ".satori-color"
                                )
                                .forEach(
                                    function (
                                        item
                                    ) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            button.classList.add(
                                "active"
                            );


                            const selected =
                                document.querySelector(
                                    ".satori-selected-color"
                                );


                            if (
                                selected
                            ) {

                                selected.textContent =
                                    button.dataset.color ||
                                    "";

                            }

                        }
                    );

                }
            );

    }


  /* =====================================================
   ACTUALIZAR COLORES
===================================================== */

function updateColors(
    product
) {

    const colors =
        Array.isArray(
            product.colors
        )
            ? product.colors
            : [];


    const container =
        document.querySelector(
            "[data-product-colors]"
        );


    if (!container) {

        return;

    }


    const map = {

        negro: "#111",
        black: "#111",

        rojo: "#ef0930",
        red: "#ef0930",

        blanco: "#fff",
        white: "#fff",

        rosa: "#e56b8c",
        pink: "#e56b8c",

        azul: "#4b72c9",
        blue: "#4b72c9",

        verde: "#5b8d6b",
        green: "#5b8d6b",

        gris: "#aaa",
        gray: "#aaa",
        grey: "#aaa",

        morado: "#8664b9",
        purple: "#8664b9",

        amarillo: "#e9c64b",
        yellow: "#e9c64b"

    };


    container.innerHTML =
        colors
            .map(
                function (
                    color,
                    index
                ) {

                    const value =
                        String(
                            color || ""
                        )
                            .toLowerCase();


                    const bg =
                        map[value] ||
                        "#d9d9d9";


                    return \`
<button
    type="button"
    class="satori-color \\${
        index === 0
            ? "active"
            : ""
    }"
    data-color="\\${String(
        color
    ).replace(
        /"/g,
        "&quot;"
    )}"
    title="\\${String(
        color
    ).replace(
        /"/g,
        "&quot;"
    )}"
>

    <span
        style="
            background:\\${bg}
        "
    ></span>

</button>
\`;

                }
            )
            .join("");


    const selected =
        document.querySelector(
            ".satori-selected-color"
        );


    if (
        selected
    ) {

        selected.textContent =
            colors[0] ||
            "";

    }


    bindColors();

}
    /* =====================================================
       TALLAS
    ====================================================== */

    function bindSizes() {

        document
            .querySelectorAll(
                ".satori-size"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            document
                                .querySelectorAll(
                                    ".satori-size"
                                )
                                .forEach(
                                    function (
                                        item
                                    ) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            button.classList.add(
                                "active"
                            );


                            const selected =
                                document.querySelector(
                                    ".satori-selected-size"
                                );


                            if (
                                selected
                            ) {

                                selected.textContent =
                                    button.dataset.size ||
                                    "";

                            }

                        }
                    );

                }
            );

    }


/* =====================================================
   ACTUALIZAR TALLAS
====================================================== */

function updateSizes(
    product
) {

    const sizes =
        Array.isArray(
            product.sizes
        )
            ? product.sizes
            : [];


    const container =
        document.querySelector(
            "[data-product-sizes]"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        sizes
            .map(
                function (
                    size,
                    index
                ) {

                    return \`
<button
    type="button"
    class="satori-size \\${
        index === 0
            ? "active"
            : ""
    }"
    data-size="\\${String(
        size
    ).replace(
        /"/g,
        "&quot;"
    )}"
>

    \\${String(
        size
    )}

</button>
\`;

                }
            )
            .join("");


    const selected =
        document.querySelector(
            ".satori-selected-size"
        );


    if (
        selected
    ) {

        selected.textContent =
            sizes[0] ||
            "";

    }


    bindSizes();

}

    /* =====================================================
       INFORMACIÓN DEL PRODUCTO
    ====================================================== */

    function updateProductInformation(
        product
    ) {

        const title =
            document.getElementById(
                "satoriProductTitle"
            );


        const price =
            document.getElementById(
                "satoriProductPrice"
            );


        const eyebrow =
            document.querySelector(
                ".satori-eyebrow"
            );


        if (
            title &&
            product.name
        ) {

            title.textContent =
                product.name;

        }


        if (
            price &&
            product.price !== undefined &&
            product.price !== null
        ) {

            price.textContent =
                formatPrice(
                    product.price
                ) +
                " " +
                String(
                    product.currency ||
                    "CLP"
                ).toUpperCase();

        }


        if (
            eyebrow
        ) {

            eyebrow.textContent =
                String(
                    product.collection ||
                    product.category ||
                    "SATORII"
                )
                    .replace(
                        /[-_]/g,
                        " "
                    )
                    .toUpperCase() +
                " COLLECTION";

        }


        if (
            product.name
        ) {

            document.title =
                product.name +
                " | SATORII";

        }


        setMeta(
            'meta[name="description"]',
            product.description ||
            product.name
        );


        setMeta(
            'meta[property="og:title"]',
            String(
                product.name ||
                ""
            ) +
            " | SATORII"
        );


        setMeta(
            'meta[property="og:description"]',
            product.description ||
            product.name
        );


        const descriptionPanel =
            document.getElementById(
                "tab-description"
            );


        if (
            descriptionPanel &&
            product.description
        ) {

            const ul =
                descriptionPanel.querySelector(
                    "ul"
                );


            const textNode =
                Array.from(
                    descriptionPanel.childNodes
                )
                    .find(
                        function (
                            node
                        ) {

                            return (
                                node.nodeType ===
                                Node.TEXT_NODE &&
                                node.textContent.trim()
                            );

                        }
                    );


            if (
                textNode
            ) {

                textNode.textContent =
                    product.description;

            }


            if (
                ul
            ) {

                const first =
                    ul.querySelector(
                        "li"
                    );


                if (
                    first
                ) {

                    first.textContent =
                        product.details?.material ||
                        product.material ||
                        "Material de alta calidad.";

                }

            }

        }

    }


    /* =====================================================
       CARRITO
    ====================================================== */

    function updateCartButton(
        product
    ) {

        const button =
            document.getElementById(
                "addToCart"
            );


        if (!button) {

            return;

        }


        button.dataset.productId =
            String(
                product.id ||
                PRODUCT_ID
            );


        button.dataset.productName =
            String(
                product.name ||
                ""
            );


        button.dataset.productPrice =
            String(
                product.price ||
                0
            );


        const images =
            getImages(
                product
            );


        if (
            images.length
        ) {

            button.dataset.productImage =
                normalizeImage(
                    images[0]
                );

        }


        const stockValue =
            product.stock == null
                ? null
                : Number(
                    product.stock
                );


        const available =
            product.available !== false &&
            (
                stockValue === null ||
                stockValue > 0
            ) &&
            product.active !== false;


        button.disabled =
            !available;


        button.textContent =
            available
                ? "🛒 AGREGAR AL CARRITO"
                : "AGOTADO";


        button.style.opacity =
            available
                ? ""
                : ".45";


        button.style.cursor =
            available
                ? ""
                : "not-allowed";

    }


    /* =====================================================
       ACTUALIZAR PÁGINA
    ====================================================== */

    function updateProductPage(
        product
    ) {

        if (!product) {

            return;

        }


        console.log(
            "SATORII · Producto actualizado:",
            product
        );


        updateProductInformation(
            product
        );


        updateGallery(
            product
        );


        updateColors(
            product
        );


        updateSizes(
            product
        );


        updateCartButton(
            product
        );


        window.dispatchEvent(
            new CustomEvent(
                "satorii:product-updated",
                {
                    detail: {
                        product:
                            product
                    }
                }
            )
        );

    }


    /* =====================================================
       CARGAR DESDE SUPABASE
    ====================================================== */

    async function fetchProduct() {

        if (
            typeof satoriSupabase ===
            "undefined"
        ) {

            return false;

        }


        try {

            const {
                data,
                error
            } =
                await satoriSupabase
                    .from(
                        "products"
                    )
                    .select(
                        "*"
                    )
                    .eq(
                        "id",
                        PRODUCT_ID
                    )
                    .maybeSingle();


            if (
                error
            ) {

                console.error(
                    "SATORII · Supabase:",
                    error
                );


                return false;

            }


            if (
                data
            ) {

                updateProductPage(
                    data
                );

            }


            return true;

        }

        catch (
            error
        ) {

            console.error(
                "SATORII · Error Supabase:",
                error
            );


            return false;

        }

    }


    /* =====================================================
       SUPABASE REALTIME
    ====================================================== */

    function subscribeRealtime() {

        if (
            typeof satoriSupabase ===
            "undefined" ||
            !satoriSupabase.channel
        ) {

            return;

        }


        try {

            realtimeChannel =
                satoriSupabase
                    .channel(
                        "satorii-product-" +
                        String(
                            PRODUCT_ID
                        )
                    )
                    .on(
                        "postgres_changes",
                        {
                            event:
                                "*",

                            schema:
                                "public",

                            table:
                                "products",

                            filter:
                                "id=eq." +
                                String(
                                    PRODUCT_ID
                                )

                        },
                        function (
                            payload
                        ) {

                            console.log(
                                "SATORII · Realtime:",
                                payload
                            );


                            if (
                                payload.eventType ===
                                "DELETE"
                            ) {

                                updateProductPage(
                                    Object.assign(
                                        {},
                                        payload.old ||
                                        {},
                                        {
                                            id:
                                                PRODUCT_ID,

                                            available:
                                                false
                                        }
                                    )
                                );

                            }

                            else if (
                                payload.new
                            ) {

                                updateProductPage(
                                    payload.new
                                );

                            }

                        }
                    )
                    .subscribe(
                        function (
                            status
                        ) {

                            console.log(
                                "SATORII · Supabase Realtime:",
                                status
                            );

                        }
                    );

        }

        catch (
            error
        ) {

            console.warn(
                "SATORII · Realtime no disponible:",
                error
            );

        }

    }


    /* =====================================================
       POLLING DE RESPALDO
    ====================================================== */

    function startPolling() {

        if (
            pollTimer
        ) {

            clearInterval(
                pollTimer
            );

        }


        pollTimer =
            setInterval(
                fetchProduct,
                POLL_INTERVAL
            );

    }


    /* =====================================================
       CANTIDAD
    ====================================================== */

    function bindQuantity() {

        const value =
            document.getElementById(
                "satoriQuantity"
            );


        const input =
            document.getElementById(
                "quantity"
            );


        const minus =
            document.getElementById(
                "satoriQuantityMinus"
            );


        const plus =
            document.getElementById(
                "satoriQuantityPlus"
            );


        if (
            !value ||
            !input ||
            !minus ||
            !plus
        ) {

            return;

        }


        function setQuantity(
            next
        ) {

            const quantity =
                Math.max(
                    1,
                    Math.min(
                        99,
                        Number(
                            next
                        ) || 1
                    )
                );


            value.textContent =
                quantity;


            input.value =
                quantity;

        }


        minus.addEventListener(
            "click",
            function () {

                setQuantity(
                    Number(
                        input.value
                    ) - 1
                );

            }
        );


        plus.addEventListener(
            "click",
            function () {

                setQuantity(
                    Number(
                        input.value
                    ) + 1
                );

            }
        );

    }


    /* =====================================================
       TABS
    ====================================================== */

    function bindTabs() {

        const tabs =
            document.querySelectorAll(
                ".satori-tab"
            );


        tabs.forEach(
            function (
                tab
            ) {

                tab.addEventListener(
                    "click",
                    function () {

                        tabs.forEach(
                            function (
                                item
                            ) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        tab.classList.add(
                            "active"
                        );


                        document
                            .querySelectorAll(
                                "[data-tab-panel]"
                            )
                            .forEach(
                                function (
                                    panel
                                ) {

                                    panel.hidden =
                                        panel.dataset.tabPanel !==
                                        tab.dataset.tab;

                                }
                            );

                    }
                );

            }
        );

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    function initializeProductPage() {

        bindGallery();

        bindColors();

        bindSizes();

        bindQuantity();

        bindTabs();


        function waitForSupabase() {

            if (
                typeof satoriSupabase ===
                "undefined"
            ) {

                supabaseAttempts++;


                if (
                    supabaseAttempts <
                    SUPABASE_RETRY_LIMIT
                ) {

                    setTimeout(
                        waitForSupabase,
                        250
                    );

                }


                return;

            }


            fetchProduct();

            subscribeRealtime();

            startPolling();

        }


        waitForSupabase();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeProductPage,
            {
                once:
                    true
            }
        );

    }

    else {

        initializeProductPage();

    }


})();

</script>
`;

}


/* =========================================================
   HTML COMPLETO
========================================================= */

function buildPage(
    product,
    products
) {

    const productUrl =
        normalizeProductUrl(
            product
        );


    const root =
        getRootPrefix(
            productUrl
        );


    const title =
        `${product.name} | SATORII`;


    const description =
        getDescription(
            product
        );


    const image =
        getImagePath(
            product.image ||
            getProductImages(
                product
            )[0],
            productUrl
        );


    const related =
        buildRelatedProducts(
            product,
            products,
            productUrl
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


    <meta
        property="og:title"
        content="${escapeHTML(
            title
        )}"
    >


    <meta
        property="og:description"
        content="${escapeHTML(
            description
        )}"
    >


    <meta
        property="og:image"
        content="${escapeHTML(
            image
        )}"
    >


    <title>
        ${escapeHTML(
            title
        )}
    </title>


    <!-- CSS GLOBAL -->

    <link
        rel="stylesheet"
        href="${escapeHTML(
            root +
            "css/style.css"
        )}"
    >


    <!-- ANIMACIONES -->

    <link
        rel="stylesheet"
        href="${escapeHTML(
            root +
            "css/animations.css"
        )}"
    >


    <!-- DISEÑO PRODUCTO -->

    <style>

        ${buildDesignCSS()}

    </style>

</head>


<body
    class="satori-design-2"
    data-product-id="${escapeHTML(
        product.id
    )}"
>


    <!-- HEADER -->

    <div
        id="satori-header"
    ></div>


    <!-- CONTENIDO -->

    <main
        class="
            satori-page-animate
            satori-design-2-page
        "
    >

        ${buildHero(
            product,
            productUrl
        )}


        ${related}

    </main>


    <!-- FOOTER -->

    <div
        id="satori-footer"
    ></div>


    <!-- SUPABASE -->

    <script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    ></script>


    <script
        src="${escapeHTML(
            root +
            "js/supabase.js"
        )}"
    ></script>


    <!-- JAVASCRIPT GLOBAL -->

    <script
        src="${escapeHTML(
            root +
            "js/main.js"
        )}"
        defer
    ></script>


    <script
        src="${escapeHTML(
            root +
            "js/header.js"
        )}"
        defer
    ></script>


    <script
        src="${escapeHTML(
            root +
            "js/footer.js"
        )}"
        defer
    ></script>


    <script
        src="${escapeHTML(
            root +
            "js/cart.js"
        )}"
        defer
    ></script>


    <script
        src="${escapeHTML(
            root +
            "js/animations.js"
        )}"
        defer
    ></script>


    <!-- JAVASCRIPT DEL PRODUCTO -->

    ${buildProductScript(
        product,
        productUrl
    )}

</body>

</html>
`;

}


/* =========================================================
   GENERAR PÁGINAS
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
        `DISEÑO: ${DESIGN_NAME}`
    );


    console.log(
        "========================================"
    );


    console.log("");


    /* =====================================================
       PRODUCTS
    ====================================================== */

    const products =
        loadProducts();


    console.log(
        `✓ Productos cargados: ${products.length}`
    );


    /* =====================================================
       VALIDACIÓN
    ====================================================== */

    validateProducts(
        products
    );


    console.log(
        "✓ Catálogo validado"
    );


    /* =====================================================
       GENERACIÓN
    ====================================================== */

    let generated =
        0;


    products.forEach(
        function (
            product
        ) {

            const outputPath =
                getOutputPath(
                    product
                );


            const productUrl =
                normalizeProductUrl(
                    product
                );


            const html =
                buildPage(
                    product,
                    products
                );


            fs.mkdirSync(
                path.dirname(
                    outputPath
                ),
                {
                    recursive:
                        true
                }
            );


            fs.writeFileSync(
                outputPath,
                html,
                "utf8"
            );


            generated++;


            console.log(
                `✓ ${productUrl}`
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
        "✓ Diseño claro minimalista aplicado"
    );


    console.log(
        "✓ animations.css incluido"
    );


    console.log(
        "✓ animations.js incluido"
    );


    console.log(
        "✓ Supabase incluido"
    );


    console.log(
        "✓ Supabase Realtime incluido"
    );


    console.log(
        "✓ Supabase polling de respaldo incluido"
    );


    console.log(
        "✓ Header global incluido"
    );


    console.log(
        "✓ Footer global incluido"
    );


    console.log(
        "✓ Carrito global incluido"
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
