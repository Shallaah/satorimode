/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 3 · MINIMALISTA / E-COMMERCE

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

const fs =
    require("fs");

const path =
    require("path");

const vm =
    require("vm");


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
    "MINIMALISTA E-COMMERCE";


/* =========================================================
   UTILIDADES
========================================================= */

function escapeHTML(
    value
) {

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

function slugify(
    value
) {

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

        url +=
            ".html";

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


    let depth =
        0;

    let quote =
        null;

    let escaped =
        false;

    let arrayEnd =
        -1;


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

            escaped =
                false;

            continue;

        }


        if (
            char === "\\"
        ) {

            escaped =
                true;

            continue;

        }


        if (
            quote
        ) {

            if (
                char === quote
            ) {

                quote =
                    null;

            }

            continue;

        }


        if (
            char === "\"" ||
            char === "'" ||
            char === "`"
        ) {

            quote =
                char;

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

                arrayEnd =
                    i;

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

        negro:
            "#111111",

        black:
            "#111111",

        rojo:
            "#EF0930",

        red:
            "#EF0930",

        blanco:
            "#FFFFFF",

        white:
            "#FFFFFF",

        rosa:
            "#E56B8C",

        pink:
            "#E56B8C",

        azul:
            "#4B72C9",

        blue:
            "#4B72C9",

        verde:
            "#5B8D6B",

        green:
            "#5B8D6B",

        gris:
            "#A9A9A9",

        gray:
            "#A9A9A9",

        grey:
            "#A9A9A9",

        morado:
            "#8664B9",

        purple:
            "#8664B9",

        amarillo:
            "#E9C64B",

        yellow:
            "#E9C64B"

    };


    return (
        map[value] ||
        "#D9D9D9"
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
<div
    class="satori-product-thumbnails"
    aria-label="Galería de imágenes"
>

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

    <div class="satori-option-head">

        <span class="satori-option-label">
            COLOR
        </span>

    </div>


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
            4
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
            TAMBIÉN TE PUEDE GUSTAR
        </span>

        <h2>
            DESCUBRE MÁS
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
   CSS · DISEÑO 3
========================================================= */

function buildDesignCSS() {

    return `

/* =========================================================
   VARIABLES
========================================================= */

:root {

    --satori-red:
        #EF0930;

    --satori-black:
        #111111;

    --satori-ink:
        #17202B;

    --satori-muted:
        #737373;

    --satori-line:
        #E7E7E7;

    --satori-soft:
        #F7F7F7;

}


/* =========================================================
   BODY
========================================================= */

body.satori-design-3 {

    margin:
        0;

    background:
        #FFFFFF;

    color:
        var(--satori-black);

    font-family:
        Inter,
        Arial,
        Helvetica,
        sans-serif;

    -webkit-font-smoothing:
        antialiased;

}


.satori-design-3-page {

    background:
        #FFFFFF;

    overflow:
        hidden;

}


/* =========================================================
   CONTENEDOR
========================================================= */

.satori-product-wrap {

    width:
        min(
            1240px,
            calc(100% - 48px)
        );

    margin:
        0 auto;

}


/* =========================================================
   BREADCRUMBS
========================================================= */

.satori-breadcrumbs {

    display:
        flex;

    align-items:
        center;

    gap:
        7px;

    padding:
        22px 0 18px;

    color:
        #8A8A8A;

    font-size:
        9px;

    font-weight:
        700;

    letter-spacing:
        .04em;

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

    max-width:
        260px;

    overflow:
        hidden;

    color:
        #222;

    font-weight:
        800;

    text-overflow:
        ellipsis;

    white-space:
        nowrap;

}


/* =========================================================
   HERO
========================================================= */

.satori-product-hero {

    display:
        grid;

    grid-template-columns:
        minmax(0, 1.05fr)
        minmax(360px, .75fr);

    gap:
        clamp(
            45px,
            7vw,
            95px
        );

    align-items:
        start;

    padding:
        8px 0 75px;

}


/* =========================================================
   GALERÍA
========================================================= */

.satori-gallery {

    display:
        grid;

    grid-template-columns:
        62px
        minmax(0, 1fr);

    gap:
        14px;

    min-width:
        0;

}


/* =========================================================
   MINIATURAS
========================================================= */

.satori-product-thumbnails {

    display:
        flex;

    flex-direction:
        column;

    gap:
        9px;

}


.satori-product-thumb {

    width:
        62px;

    height:
        70px;

    padding:
        3px;

    border:
        1px solid
        #E5E5E5;

    background:
        #FFFFFF;

    cursor:
        pointer;

    transition:
        border-color .2s ease,
        opacity .2s ease;

}


.satori-product-thumb:hover {

    opacity:
        .75;

}


.satori-product-thumb.active {

    border-color:
        #111111;

}


.satori-product-thumb img {

    display:
        block;

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

}


/* =========================================================
   VISUAL PRINCIPAL
========================================================= */

.satori-main-visual {

    position:
        relative;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        100%;

    aspect-ratio:
        1 / 1.04;

    background:
        #F8F8F8;

    overflow:
        hidden;

}


.satori-main-image {

    display:
        block;

    width:
        100%;

    height:
        100%;

    padding:
        24px;

    box-sizing:
        border-box;

    object-fit:
        contain;

    transition:
        opacity .2s ease,
        transform .35s ease;

}


.satori-main-image.is-changing {

    opacity:
        .35;

    transform:
        scale(.985);

}


/* =========================================================
   ZOOM
========================================================= */

.satori-main-zoom {

    position:
        absolute;

    right:
        14px;

    bottom:
        14px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        34px;

    height:
        34px;

    padding:
        0;

    border:
        1px solid
        #E1E1E1;

    border-radius:
        50%;

    background:
        rgba(
            255,
            255,
            255,
            .94
        );

    color:
        #222;

    font-size:
        15px;

    cursor:
        pointer;

}


/* =========================================================
   INFORMACIÓN
========================================================= */

.satori-product-info {

    min-width:
        0;

    padding-top:
        3px;

}


.satori-eyebrow {

    display:
        block;

    margin-bottom:
        9px;

    color:
        var(--satori-red);

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .1em;

    text-transform:
        uppercase;

}


.satori-product-title {

    margin:
        0;

    color:
        #111111;

    font-family:
        "Arial Narrow",
        "Roboto Condensed",
        Arial,
        Helvetica,
        sans-serif;

    font-size:
        clamp(
            30px,
            3.3vw,
            48px
        );

    line-height:
        .98;

    font-weight:
        900;

    letter-spacing:
        -.04em;

    text-transform:
        uppercase;

}


.satori-price {

    margin-top:
        12px;

    color:
        #111111;

    font-size:
        18px;

    font-weight:
        800;

}


.satori-tax {

    margin-top:
        5px;

    padding-bottom:
        18px;

    border-bottom:
        1px solid
        var(--satori-line);

    color:
        #888888;

    font-size:
        9px;

    line-height:
        1.4;

}


/* =========================================================
   OPCIONES
========================================================= */

.satori-option {

    margin-top:
        21px;

}


.satori-option-head {

    display:
        flex;

    align-items:
        center;

    justify-content:
        space-between;

    margin-bottom:
        10px;

}


.satori-option-label {

    display:
        block;

    color:
        #222222;

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .1em;

}


.satori-option-head a {

    color:
        #555555;

    font-size:
        9px;

    font-weight:
        700;

    text-decoration:
        underline;

    text-underline-offset:
        2px;

}


/* =========================================================
   COLORES
========================================================= */

.satori-colors {

    display:
        flex;

    flex-wrap:
        wrap;

    gap:
        10px;

}


.satori-color {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        25px;

    height:
        25px;

    padding:
        3px;

    border:
        1px solid
        #D8D8D8;

    border-radius:
        50%;

    background:
        #FFFFFF;

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

    border:
        1px solid
        rgba(
            0,
            0,
            0,
            .08
        );

    border-radius:
        50%;

}


.satori-color.active {

    border:
        2px solid
        #111111;

    box-shadow:
        0 0 0 1px
        #FFFFFF,
        0 0 0 2px
        #111111;

}


.satori-selected-color,
.satori-selected-size {

    display:
        block;

    min-height:
        12px;

    margin-top:
        7px;

    color:
        #858585;

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
        7px;

}


.satori-size {

    min-width:
        42px;

    height:
        34px;

    padding:
        0 10px;

    border:
        1px solid
        #D5D5D5;

    background:
        #FFFFFF;

    color:
        #222222;

    font-size:
        9px;

    font-weight:
        800;

    cursor:
        pointer;

    transition:
        background .18s ease,
        color .18s ease,
        border-color .18s ease;

}


.satori-size:hover {

    border-color:
        #111111;

}


.satori-size.active {

    border-color:
        #111111;

    background:
        #111111;

    color:
        #FFFFFF;

}


/* =========================================================
   CANTIDAD + CARRITO
========================================================= */

.satori-quantity-row {

    display:
        flex;

    align-items:
        stretch;

    gap:
        9px;

    margin-top:
        25px;

}


.satori-quantity {

    display:
        flex;

    flex:
        0 0 108px;

    align-items:
        center;

    justify-content:
        space-between;

    height:
        48px;

    box-sizing:
        border-box;

    border:
        1px solid
        #D7D7D7;

    background:
        #FFFFFF;

}


.satori-quantity button {

    width:
        34px;

    height:
        100%;

    padding:
        0;

    border:
        0;

    background:
        transparent;

    color:
        #222222;

    font-size:
        17px;

    cursor:
        pointer;

}


.satori-quantity span {

    width:
        30px;

    color:
        #111111;

    font-size:
        11px;

    font-weight:
        800;

    text-align:
        center;

}


/* =========================================================
   BOTÓN CARRITO
========================================================= */

.satori-add {

    flex:
        1;

    min-height:
        48px;

    padding:
        0 20px;

    border:
        1px solid
        var(--satori-ink);

    background:
        var(--satori-ink);

    color:
        #FFFFFF;

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .06em;

    cursor:
        pointer;

    transition:
        transform .2s ease,
        background .2s ease,
        opacity .2s ease;

}


.satori-add:hover {

    background:
        #222D39;

    transform:
        translateY(-1px);

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
        repeat(
            3,
            1fr
        );

    gap:
        12px;

    margin-top:
        20px;

    padding:
        17px 0;

    border-top:
        1px solid
        var(--satori-line);

    border-bottom:
        1px solid
        var(--satori-line);

}


.satori-trust-item {

    display:
        flex;

    align-items:
        flex-start;

    gap:
        7px;

    color:
        #777777;

    font-size:
        8px;

    line-height:
        1.4;

}


.satori-trust-item strong {

    color:
        #222222;

    font-weight:
        800;

}


/* =========================================================
   DESCRIPCIÓN
========================================================= */

.satori-description-box {

    margin-top:
        22px;

}


.satori-tabs {

    display:
        flex;

    gap:
        24px;

    border-bottom:
        1px solid
        var(--satori-line);

}


.satori-tab {

    position:
        relative;

    padding:
        0 0 11px;

    border:
        0;

    background:
        transparent;

    color:
        #888888;

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .04em;

    cursor:
        pointer;

}


.satori-tab.active {

    color:
        #111111;

}


.satori-tab.active::after {

    content:
        "";

    position:
        absolute;

    left:
        0;

    right:
        0;

    bottom:
        -1px;

    height:
        2px;

    background:
        var(--satori-red);

}


.satori-panel {

    padding:
        17px 0 0;

    color:
        #5F5F5F;

    font-size:
        10px;

    line-height:
        1.7;

}


.satori-panel[hidden] {

    display:
        none;

}


.satori-panel ul {

    margin:
        12px 0 0;

    padding-left:
        17px;

}


.satori-panel li {

    margin-bottom:
        4px;

}


/* =========================================================
   RELACIONADOS
========================================================= */

.satori-related {

    padding:
        50px 0 85px;

    border-top:
        1px solid
        #EEEEEE;

}


.satori-related-heading {

    margin-bottom:
        23px;

}


.satori-related-heading span {

    display:
        block;

    margin-bottom:
        7px;

    color:
        var(--satori-red);

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .1em;

}


.satori-related-heading h2 {

    margin:
        0;

    color:
        #111111;

    font-family:
        "Arial Narrow",
        Arial,
        Helvetica,
        sans-serif;

    font-size:
        29px;

    line-height:
        1;

    font-weight:
        900;

    letter-spacing:
        -.03em;

    text-transform:
        uppercase;

}


.satori-related-grid {

    display:
        grid;

    grid-template-columns:
        repeat(
            4,
            1fr
        );

    gap:
        18px;

}


.satori-related-card {

    display:
        block;

    color:
        #111111;

    text-decoration:
        none;

}


.satori-related-image {

    width:
        100%;

    aspect-ratio:
        1 / 1.08;

    background:
        #F7F7F7;

    overflow:
        hidden;

}


.satori-related-image img {

    display:
        block;

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
        scale(
            1.035
        );

}


.satori-related-info {

    padding:
        10px 1px 0;

}


.satori-related-info h3 {

    margin:
        0 0 5px;

    color:
        #222222;

    font-size:
        10px;

    line-height:
        1.35;

    font-weight:
        800;

    text-transform:
        uppercase;

}


.satori-related-info strong {

    color:
        #111111;

    font-size:
        10px;

    font-weight:
        900;

}


/* =========================================================
   RESPONSIVE · TABLET
========================================================= */

@media (
    max-width: 1050px
) {

    .satori-product-hero {

        grid-template-columns:
            minmax(0, 1fr)
            minmax(
                330px,
                .7fr
            );

        gap:
            35px;

    }


    .satori-related-grid {

        grid-template-columns:
            repeat(
                3,
                1fr
            );

    }

}


/* =========================================================
   RESPONSIVE · MÓVIL
========================================================= */

@media (
    max-width: 760px
) {

    .satori-product-wrap {

        width:
            calc(
                100% - 28px
            );

    }


    .satori-breadcrumbs {

        padding:
            15px 0 13px;

        font-size:
            8px;

    }


    .satori-product-hero {

        display:
            block;

        padding:
            0 0 45px;

    }


    .satori-gallery {

        display:
            flex;

        flex-direction:
            column;

        gap:
            9px;

    }


    .satori-main-visual {

        order:
            1;

        aspect-ratio:
            1 / 1.08;

    }


    .satori-main-image {

        padding:
            15px;

    }


    .satori-product-thumbnails {

        order:
            2;

        flex-direction:
            row;

        width:
            100%;

        padding:
            1px 0 3px;

        overflow-x:
            auto;

        scrollbar-width:
            none;

    }


    .satori-product-thumbnails::-webkit-scrollbar {

        display:
            none;

    }


    .satori-product-thumb {

        flex:
            0 0 58px;

        width:
            58px;

        height:
            64px;

    }


    .satori-main-zoom {

        right:
            10px;

        bottom:
            10px;

        width:
            32px;

        height:
            32px;

    }


    .satori-product-info {

        padding-top:
            25px;

    }


    .satori-eyebrow {

        margin-bottom:
            7px;

        font-size:
            8px;

    }


    .satori-product-title {

        font-size:
            clamp(
                28px,
                9vw,
                40px
            );

        line-height:
            .96;

    }


    .satori-price {

        margin-top:
            10px;

        font-size:
            17px;

    }


    .satori-tax {

        padding-bottom:
            15px;

    }


    .satori-option {

        margin-top:
            18px;

    }


    .satori-quantity-row {

        gap:
            8px;

        margin-top:
            22px;

    }


    .satori-quantity {

        flex:
            0 0 94px;

        height:
            48px;

    }


    .satori-add {

        min-width:
            0;

        padding:
            0 10px;

        font-size:
            8px;

    }


    .satori-trust {

        grid-template-columns:
            1fr;

        gap:
            10px;

        padding:
            15px 0;

    }


    .satori-trust-item {

        font-size:
            8px;

    }


    .satori-description-box {

        margin-top:
            19px;

    }


    .satori-tabs {

        gap:
            20px;

    }


    .satori-tab {

        font-size:
            8px;

    }


    .satori-panel {

        font-size:
            10px;

    }


    .satori-related {

        padding:
            38px 0 60px;

    }


    .satori-related-heading h2 {

        font-size:
            26px;

    }


    .satori-related-grid {

        grid-template-columns:
            repeat(
                2,
                minmax(
                    0,
                    1fr
                )
            );

        gap:
            22px 12px;

    }


    .satori-related-image {

        aspect-ratio:
            1 / 1.08;

    }


    .satori-related-info {

        padding-top:
            8px;

    }


    .satori-related-info h3 {

        font-size:
            9px;

    }


    .satori-related-info strong {

        font-size:
            9px;

    }

}


/* =========================================================
   RESPONSIVE · MÓVIL PEQUEÑO
========================================================= */

@media (
    max-width: 390px
) {

    .satori-product-wrap {

        width:
            calc(
                100% - 22px
            );

    }


    .satori-product-title {

        font-size:
            27px;

    }


    .satori-quantity {

        flex-basis:
            88px;

    }


    .satori-add {

        font-size:
            7.5px;

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

    <!-- BREADCRUMBS -->

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


        <span>
            /
        </span>


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


        <span>
            /
        </span>


        <strong>
            ${escapeHTML(
                product.name
            )}
        </strong>

    </nav>


    <!-- HERO -->

    <section class="satori-product-hero">


        <!-- =============================================
             GALERÍA
        ============================================== -->

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


        <!-- =============================================
             INFORMACIÓN
        ============================================== -->

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

                ${price}
                ${String(
                    product.currency ||
                    "CLP"
                ).toUpperCase()}

            </div>


            <div class="satori-tax">

                Impuestos incluidos.
                Envío calculado en el checkout.

            </div>


            <!-- OPCIONES -->

            <div class="satori-options">

                ${buildColorOptions(
                    product
                )}

                ${buildSizeOptions(
                    product,
                    productUrl
                )}

            </div>


            <!-- =========================================
                 CANTIDAD + CARRITO
            ========================================== -->

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

                    AGREGAR AL CARRITO

                </button>

            </div>


            <!-- =========================================
                 CONFIANZA
            ========================================== -->

            <div class="satori-trust">


                <div class="satori-trust-item">

                    <span>
                        🚚
                    </span>

                    <span>

                        <strong>
                            Envíos a todo Chile
                        </strong>

                        <br>

                        Despacho rápido y seguro.

                    </span>

                </div>


                <div class="satori-trust-item">

                    <span>
                        ◈
                    </span>

                    <span>

                        <strong>
                            Compra segura
                        </strong>

                        <br>

                        Tus datos protegidos.

                    </span>

                </div>


                <div class="satori-trust-item">

                    <span>
                        ✓
                    </span>

                    <span>

                        <strong>
                            Garantía SATORII
                        </strong>

                        <br>

                        Calidad asegurada.

                    </span>

                </div>


            </div>


            <!-- =========================================
                 DESCRIPCIÓN
            ========================================== -->

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
                            Estampado de alta definición.
                        </li>


                        <li>
                            Diseño exclusivo SATORII.
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
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(
        value
    ) {

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


    /* =====================================================
       IMÁGENES
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


                window.requestAnimationFrame(
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


        if (!main) {

            return;

        }


        document
            .querySelectorAll(
                ".satori-product-thumb"
            )
            .forEach(
                function (
                    thumb
                ) {

                    thumb.onclick =
                        function () {

                            const src =
                                thumb.dataset.galleryImage;


                            if (!src) {

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

                        };

                }
            );


        const zoom =
            document.getElementById(
                "satoriZoom"
            );


        if (
            zoom
        ) {

            zoom.onclick =
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

                };

        }

    }


    /* =====================================================
       ACTUALIZAR GALERÍA
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
                )
                .filter(
                    Boolean
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


        if (
            !gallery
        ) {

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
            "";


        images.forEach(
            function (
                src,
                index
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "satori-product-thumb" +
                    (
                        index === 0
                            ? " active"
                            : ""
                    );


                button.dataset.galleryImage =
                    src;


                button.setAttribute(
                    "aria-label",
                    "Ver imagen " +
                    (
                        index + 1
                    )
                );


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    src;


                image.alt =
                    product.name ||
                    "";


                image.loading =
                    "lazy";


                button.appendChild(
                    image
                );


                gallery.appendChild(
                    button
                );

            }
        );


        bindGallery();

    }


    /* =====================================================
       COLORES
    ====================================================== */

    function getColorValue(
        color
    ) {

        const value =
            String(
                color || ""
            )
                .toLowerCase()
                .trim();


        const map = {

            negro:
                "#111111",

            black:
                "#111111",

            rojo:
                "#EF0930",

            red:
                "#EF0930",

            blanco:
                "#FFFFFF",

            white:
                "#FFFFFF",

            rosa:
                "#E56B8C",

            pink:
                "#E56B8C",

            azul:
                "#4B72C9",

            blue:
                "#4B72C9",

            verde:
                "#5B8D6B",

            green:
                "#5B8D6B",

            gris:
                "#A9A9A9",

            gray:
                "#A9A9A9",

            grey:
                "#A9A9A9",

            morado:
                "#8664B9",

            purple:
                "#8664B9",

            amarillo:
                "#E9C64B",

            yellow:
                "#E9C64B"

        };


        return (
            map[value] ||
            "#D9D9D9"
        );

    }


    function bindColors() {

        document
            .querySelectorAll(
                ".satori-color"
            )
            .forEach(
                function (
                    button
                ) {

                    button.onclick =
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

                        };

                }
            );

    }


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


        container.innerHTML =
            "";


        colors.forEach(
            function (
                color,
                index
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "satori-color" +
                    (
                        index === 0
                            ? " active"
                            : ""
                    );


                button.dataset.color =
                    String(
                        color
                    );


                button.setAttribute(
                    "aria-label",
                    String(
                        color
                    )
                );


                button.title =
                    String(
                        color
                    );


                const span =
                    document.createElement(
                        "span"
                    );


                span.style.background =
                    getColorValue(
                        color
                    );


                button.appendChild(
                    span
                );


                container.appendChild(
                    button
                );

            }
        );


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

                    button.onclick =
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

                        };

                }
            );

    }


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
            "";


        sizes.forEach(
            function (
                size,
                index
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "satori-size" +
                    (
                        index === 0
                            ? " active"
                            : ""
                    );


                button.dataset.size =
                    String(
                        size
                    );


                button.textContent =
                    String(
                        size
                    );


                container.appendChild(
                    button
                );

            }
        );


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


            const ul =
                descriptionPanel.querySelector(
                    "ul"
                );


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
                ? "AGREGAR AL CARRITO"
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


        minus.onclick =
            function () {

                setQuantity(
                    Number(
                        input.value
                    ) - 1
                );

            };


        plus.onclick =
            function () {

                setQuantity(
                    Number(
                        input.value
                    ) + 1
                );

            };

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

                tab.onclick =
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

                    };

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


    <!-- ================================================
         CSS GLOBAL
    ================================================= -->

    <link
        rel="stylesheet"
        href="${escapeHTML(
            root +
            "css/style.css"
        )}"
    >


    <!-- ================================================
         ANIMACIONES
    ================================================= -->

    <link
        rel="stylesheet"
        href="${escapeHTML(
            root +
            "css/animations.css"
        )}"
    >


    <!-- ================================================
         DISEÑO PRODUCTO
    ================================================= -->

    <style>

        ${buildDesignCSS()}

    </style>

</head>


<body
    class="satori-design-3"
    data-product-id="${escapeHTML(
        product.id
    )}"
>


    <!-- ================================================
         HEADER
    ================================================= -->

    <div
        id="satori-header"
    ></div>


    <!-- ================================================
         CONTENIDO
    ================================================= -->

    <main
        class="
            satori-page-animate
            satori-design-3-page
        "
    >

        ${buildHero(
            product,
            productUrl
        )}


        ${related}

    </main>


    <!-- ================================================
         FOOTER
    ================================================= -->

    <div
        id="satori-footer"
    ></div>


    <!-- ================================================
         SUPABASE
    ================================================= -->

    <script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    ></script>


    <script
        src="${escapeHTML(
            root +
            "js/supabase.js"
        )}"
    ></script>


    <!-- ================================================
         JAVASCRIPT GLOBAL
    ================================================= -->

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


    <!-- ================================================
         JAVASCRIPT DEL PRODUCTO
    ================================================= -->

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
        "✓ Diseño minimalista e-commerce aplicado"
    );


    console.log(
        "✓ Galería corregida"
    );


    console.log(
        "✓ Colores dinámicos corregidos"
    );


    console.log(
        "✓ Tallas dinámicas corregidas"
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
