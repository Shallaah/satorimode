/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 9 · EDITORIAL STREETWEAR / PREMIUM E-COMMERCE

   - Genera automáticamente:
     productos/{categoria}/{id}.html

   - Usa js/products.js como fuente inicial.
   - Actualiza datos desde Supabase cuando corresponde.
   - Escucha cambios Realtime de Supabase.
   - Mantiene polling de respaldo cada 30 segundos.
   - Mantiene Header, Footer, Carrito y Animaciones globales.
   - Diseño basado en la propuesta visual DISEÑO 9.
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


/*
 * Colores oficiales SATORII.
 */

const SATORII_RED =
    "#EF0930";

const SATORII_BLACK =
    "#080808";

const SATORII_HEADER =
    "#000000";

const SATORII_DARK =
    "#101727";

const SATORII_DARK_SECONDARY =
    "#151D2D";

const SATORII_WHITE =
    "#FFFFFF";

const SATORII_LIGHT =
    "#F5F5F5";

const SATORII_BORDER =
    "#DDDDDD";

const SATORII_TEXT =
    "#777777";


const DESIGN_NAME =
    "DISEÑO 9 · EDITORIAL STREETWEAR";


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
        "satorii"
    );

}


/* =========================================================
   LABEL CATEGORÍA
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
   URL PRODUCTO
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
   PREFIJO RAÍZ
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

    const collection =
        slugify(
            product.collection ||
            product.category ||
            ""
        );


    let page =
        "productos.html";


    if (
        collection === "anime"
    ) {

        page =
            "anime.html";

    }

    else if (
        collection === "yokai"
    ) {

        page =
            "yokai.html";

    }


    return (
        getRootPrefix(
            productUrl
        ) +
        page
    );

}


/* =========================================================
   RUTA IMAGEN
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
   IMÁGENES
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
   RUTA SALIDA
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


            const id =
                String(
                    product.id
                );


            if (
                ids.has(
                    id
                )
            ) {

                throw new Error(
                    `ID duplicado: ${id}`
                );

            }


            ids.add(
                id
            );


            if (
                !product.name
            ) {

                throw new Error(
                    `Producto ${id} sin name.`
                );

            }


            if (
                product.price === undefined ||
                product.price === null
            ) {

                throw new Error(
                    `Producto ${id} sin price.`
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
                    `Producto ${id} sin image/images.`
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
            "#080808",

        black:
            "#080808",

        rojo:
            "#EF0930",

        red:
            "#EF0930",

        blanco:
            "#FFFFFF",

        white:
            "#FFFFFF",

        gris:
            "#B8B8B8",

        gray:
            "#B8B8B8",

        grey:
            "#B8B8B8",

        azul:
            "#4B72C9",

        blue:
            "#4B72C9",

        verde:
            "#5B8D6B",

        green:
            "#5B8D6B",

        rosa:
            "#E56B8C",

        pink:
            "#E56B8C",

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
        )} — imagen ${
            index + 1
        }"
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
    aria-label="Color ${
        escapeHTML(
            color
        )
    }"
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
   TALLAS
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
    aria-label="Talla ${
        escapeHTML(
            size
        )
    }"
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
   BENEFICIOS
========================================================= */

function buildBenefits() {

    return `
<section class="satori-benefits">

    <div class="satori-benefit">

        <span class="satori-benefit-icon">
            ♢
        </span>

        <div>

            <strong>
                ENVÍOS A TODO CHILE
            </strong>

            <small>
                Rápidos y seguros.
            </small>

        </div>

    </div>


    <div class="satori-benefit">

        <span class="satori-benefit-icon">
            ↻
        </span>

        <div>

            <strong>
                CAMBIOS Y DEVOLUCIONES
            </strong>

            <small>
                Hasta 30 días.
            </small>

        </div>

    </div>


    <div class="satori-benefit">

        <span class="satori-benefit-icon">
            ✓
        </span>

        <div>

            <strong>
                PAGO 100% SEGURO
            </strong>

            <small>
                Compra protegida.
            </small>

        </div>

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

    const collection =
        String(
            product.collection ||
            product.category ||
            ""
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


    const sameCollection =
        related.filter(
            function (
                item
            ) {

                return (
                    String(
                        item.collection ||
                        item.category ||
                        ""
                    ) ===
                    collection
                );

            }
        );


    if (
        sameCollection.length
    ) {

        related =
            sameCollection;

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

    <div class="satori-section-heading">

        <span>
            SATORII
        </span>

        <h2>
            COMPLETA TU LOOK
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


                    const itemImages =
                        getProductImages(
                            item
                        );


                    const image =
                        getImagePath(
                            itemImages[0],
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
            CLP
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
   PROMOCIÓN SATORII
========================================================= */

function buildPromoSection(
    product,
    productUrl
) {

    const root =
        getRootPrefix(
            productUrl
        );


    return `
<section class="satori-promo">

    <div class="satori-promo-copy">

        <span>
            SATORII · EXPERIENCIA
        </span>

        <h2>
            MÁS QUE UNA PRENDA.
        </h2>

        <p>
            Cada producto SATORII forma parte
            de una identidad que mezcla Japón,
            anime y streetwear.
        </p>

        <a
            href="${escapeHTML(
                root +
                "satorii-pack.html"
            )}"
        >
            DESCUBRE SATORII PACK →
        </a>

    </div>


    <div class="satori-promo-mark">

        悟

    </div>

</section>
`;

}


/* =========================================================
   CSS · DISEÑO 9
========================================================= */

function buildDesignCSS() {

    return `

/* =========================================================
   SATORII · PRODUCT PAGE · DESIGN 9
========================================================= */

.satori-product-page {

    --product-red:
        #EF0930;

    --product-black:
        #080808;

    --product-dark:
        #101727;

    --product-dark-2:
        #151D2D;

    --product-white:
        #FFFFFF;

    --product-soft:
        #F5F5F5;

    --product-border:
        #DDDDDD;

    --product-text:
        #777777;

    background:
        #FFFFFF;

    color:
        var(--product-black);

    font-family:
        Inter,
        Arial,
        Helvetica,
        sans-serif;

    -webkit-font-smoothing:
        antialiased;

}


.satori-product-page *,
.satori-product-page *::before,
.satori-product-page *::after {

    box-sizing:
        border-box;

}


/* =========================================================
   CONTENEDOR
========================================================= */

.satori-product-wrap {

    width:
        min(
            1380px,
            calc(
                100% - 80px
            )
        );

    margin:
        0 auto;

}


/* =========================================================
   BREADCRUMB
========================================================= */

.satori-breadcrumbs {

    display:
        flex;

    align-items:
        center;

    flex-wrap:
        wrap;

    gap:
        7px;

    padding:
        20px 0;

    color:
        #8A8A8A;

    font-size:
        9px;

    font-weight:
        700;

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
        #222222;

}


/* =========================================================
   HERO
========================================================= */

.satori-product-hero {

    display:
        grid;

    grid-template-columns:
        minmax(
            0,
            1.15fr
        )
        minmax(
            360px,
            .72fr
        );

    gap:
        clamp(
            45px,
            7vw,
            105px
        );

    align-items:
        start;

    padding:
        5px 0 65px;

}


/* =========================================================
   GALERÍA
========================================================= */

.satori-gallery {

    display:
        grid;

    grid-template-columns:
        72px
        minmax(
            0,
            1fr
        );

    gap:
        15px;

}


.satori-product-thumbnails {

    display:
        flex;

    flex-direction:
        column;

    gap:
        10px;

}


.satori-product-thumb {

    width:
        72px;

    height:
        82px;

    padding:
        4px;

    border:
        1px solid
        #D9D9D9;

    background:
        #FFFFFF;

    cursor:
        pointer;

    transition:
        border-color .2s ease,
        transform .2s ease;

}


.satori-product-thumb:hover {

    transform:
        translateY(-1px);

}


.satori-product-thumb.active {

    border:
        2px solid
        var(--product-red);

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
   IMAGEN PRINCIPAL
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

    aspect-ratio:
        1 / 1.04;

    background:
        #F7F7F7;

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
        28px;

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
        scale(
            .985
        );

}


.satori-main-zoom {

    position:
        absolute;

    right:
        14px;

    bottom:
        14px;

    width:
        34px;

    height:
        34px;

    border:
        1px solid
        #D8D8D8;

    border-radius:
        50%;

    background:
        #FFFFFF;

    color:
        #222222;

    cursor:
        pointer;

}


/* =========================================================
   INFORMACIÓN
========================================================= */

.satori-product-info {

    padding-top:
        8px;

}


.satori-eyebrow {

    display:
        inline-block;

    margin-bottom:
        10px;

    padding:
        4px 7px;

    background:
        var(--product-red);

    color:
        #FFFFFF;

    font-size:
        8px;

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

    max-width:
        560px;

    color:
        #111111;

    font-family:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        clamp(
            34px,
            4vw,
            56px
        );

    line-height:
        .92;

    font-weight:
        900;

    letter-spacing:
        -.035em;

    text-transform:
        uppercase;

}


.satori-price {

    margin-top:
        14px;

    color:
        #111111;

    font-size:
        17px;

    font-weight:
        900;

}


.satori-tax {

    margin-top:
        6px;

    padding-bottom:
        18px;

    border-bottom:
        1px solid
        var(--product-border);

    color:
        #888888;

    font-size:
        9px;

}


/* =========================================================
   OPCIONES
========================================================= */

.satori-option {

    margin-top:
        20px;

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

    color:
        #111111;

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .08em;

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
        3px;

}


/* =========================================================
   COLORES
========================================================= */

.satori-colors {

    display:
        flex;

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
        #D5D5D5;

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
            .12
        );

    border-radius:
        50%;

}


.satori-color.active {

    border:
        2px solid
        #111111;

}


.satori-selected-color,
.satori-selected-size {

    display:
        block;

    min-height:
        12px;

    margin-top:
        6px;

    color:
        #888888;

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
        40px;

    height:
        35px;

    padding:
        0 10px;

    border:
        1px solid
        #CCCCCC;

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
        grid;

    grid-template-columns:
        105px
        minmax(
            0,
            1fr
        );

    gap:
        9px;

    margin-top:
        24px;

}


.satori-quantity {

    display:
        flex;

    align-items:
        center;

    justify-content:
        space-between;

    height:
        50px;

    border:
        1px solid
        #CCCCCC;

}


.satori-quantity button {

    width:
        32px;

    height:
        100%;

    border:
        0;

    background:
        transparent;

    font-size:
        17px;

    cursor:
        pointer;

}


.satori-quantity span {

    font-size:
        11px;

    font-weight:
        900;

}


.satori-add {

    min-height:
        50px;

    border:
        1px solid
        var(--product-red);

    background:
        var(--product-red);

    color:
        #FFFFFF;

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .07em;

    cursor:
        pointer;

    transition:
        background .2s ease,
        transform .2s ease;

}


.satori-add:hover {

    background:
        #111111;

    border-color:
        #111111;

    transform:
        translateY(-1px);

}


.satori-add:disabled {

    opacity:
        .45;

    cursor:
        not-allowed;

}


/* =========================================================
   BENEFICIOS
========================================================= */

.satori-benefits {

    display:
        grid;

    grid-template-columns:
        repeat(
            3,
            1fr
        );

    gap:
        15px;

    margin-top:
        20px;

    padding:
        18px 0;

    border-top:
        1px solid
        var(--product-border);

    border-bottom:
        1px solid
        var(--product-border);

}


.satori-benefit {

    display:
        flex;

    gap:
        9px;

    align-items:
        flex-start;

}


.satori-benefit-icon {

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

    border:
        1px solid
        #D8D8D8;

    border-radius:
        50%;

    font-size:
        11px;

}


.satori-benefit strong {

    display:
        block;

    color:
        #222222;

    font-size:
        8px;

    font-weight:
        900;

}


.satori-benefit small {

    display:
        block;

    margin-top:
        3px;

    color:
        #888888;

    font-size:
        8px;

}


/* =========================================================
   DESCRIPCIÓN
========================================================= */

.satori-description-box {

    margin-top:
        25px;

}


.satori-tabs {

    display:
        flex;

    gap:
        26px;

    border-bottom:
        1px solid
        #DADADA;

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
        var(--product-red);

}


.satori-panel {

    padding:
        18px 0 0;

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
        5px;

}


/* =========================================================
   PROMOCIÓN
========================================================= */

.satori-promo {

    display:
        grid;

    grid-template-columns:
        minmax(
            0,
            1fr
        )
        180px;

    min-height:
        180px;

    margin:
        15px 0 70px;

    background:
        var(--product-dark);

    color:
        #FFFFFF;

    overflow:
        hidden;

}


.satori-promo-copy {

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    padding:
        30px 35px;

}


.satori-promo-copy > span {

    color:
        var(--product-red);

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .12em;

}


.satori-promo-copy h2 {

    margin:
        7px 0 8px;

    font-family:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        34px;

    line-height:
        .95;

    text-transform:
        uppercase;

}


.satori-promo-copy p {

    max-width:
        540px;

    margin:
        0;

    color:
        #C8CDD4;

    font-size:
        10px;

    line-height:
        1.6;

}


.satori-promo-copy a {

    align-self:
        flex-start;

    margin-top:
        17px;

    padding:
        10px 14px;

    border:
        1px solid
        #FFFFFF;

    color:
        #FFFFFF;

    font-size:
        8px;

    font-weight:
        900;

    text-decoration:
        none;

}


.satori-promo-mark {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    background:
        var(--product-dark-2);

    color:
        var(--product-red);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        105px;

    font-weight:
        900;

}


/* =========================================================
   RELACIONADOS
========================================================= */

.satori-related {

    padding:
        0 0 80px;

}


.satori-section-heading {

    margin-bottom:
        22px;

}


.satori-section-heading span {

    display:
        block;

    margin-bottom:
        6px;

    color:
        var(--product-red);

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .1em;

}


.satori-section-heading h2 {

    margin:
        0;

    font-family:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        34px;

    line-height:
        .95;

    font-weight:
        900;

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

    aspect-ratio:
        1 / 1.05;

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
        transform .3s ease;

}


.satori-related-card:hover
.satori-related-image img {

    transform:
        scale(
            1.04
        );

}


.satori-related-info {

    padding:
        10px 2px 0;

}


.satori-related-info h3 {

    margin:
        0 0 5px;

    color:
        #222222;

    font-size:
        10px;

    line-height:
        1.3;

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
   TABLET
========================================================= */

@media (
    max-width: 1000px
) {

    .satori-product-wrap {

        width:
            min(
                100%,
                calc(
                    100% - 45px
                )
            );

    }


    .satori-product-hero {

        grid-template-columns:
            minmax(
                0,
                1fr
            )
            minmax(
                320px,
                .72fr
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
   MOBILE
========================================================= */

@media (
    max-width: 700px
) {

    .satori-product-wrap {

        width:
            calc(
                100% - 28px
            );

    }


    .satori-breadcrumbs {

        padding:
            14px 0;

        font-size:
            8px;

    }


    .satori-product-hero {

        display:
            block;

        padding-bottom:
            45px;

    }


    .satori-gallery {

        display:
            flex;

        flex-direction:
            column;

    }


    .satori-main-visual {

        order:
            1;

        aspect-ratio:
            1 / 1.08;

    }


    .satori-main-image {

        padding:
            12px;

    }


    .satori-product-thumbnails {

        order:
            2;

        flex-direction:
            row;

        gap:
            8px;

        padding:
            9px 0 3px;

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
            65px;

    }


    .satori-product-info {

        padding-top:
            26px;

    }


    .satori-product-title {

        font-size:
            clamp(
                31px,
                10vw,
                45px
            );

    }


    .satori-price {

        font-size:
            17px;

    }


    .satori-quantity-row {

        grid-template-columns:
            92px
            minmax(
                0,
                1fr
            );

    }


    .satori-add {

        font-size:
            8px;

    }


    .satori-benefits {

        grid-template-columns:
            1fr;

        gap:
            12px;

    }


    .satori-promo {

        grid-template-columns:
            1fr;

        min-height:
            0;

    }


    .satori-promo-copy {

        padding:
            27px 22px;

    }


    .satori-promo-copy h2 {

        font-size:
            30px;

    }


    .satori-promo-mark {

        display:
            none;

    }


    .satori-related {

        padding-bottom:
            55px;

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

}


/* =========================================================
   MOBILE PEQUEÑO
========================================================= */

@media (
    max-width: 420px
) {

    .satori-product-wrap {

        width:
            calc(
                100% - 20px
            );

    }


    .satori-product-title {

        font-size:
            29px;

    }


    .satori-tabs {

        gap:
            17px;

    }


    .satori-tab {

        font-size:
            8px;

    }


    .satori-promo-copy {

        padding:
            25px 18px;

    }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (
    prefers-reduced-motion: reduce
) {

    .satori-product-page *,
    .satori-product-page *::before,
    .satori-product-page *::after {

        scroll-behavior:
            auto !important;

        transition:
            none !important;

        animation:
            none !important;

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
        aria-label="Ruta de navegación"
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


    <section
        class="satori-product-hero"
        aria-label="Producto"
    >


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
                    fetchpriority="high"
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

                NUEVO

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


            ${buildColorOptions(
                product
            )}


            ${buildSizeOptions(
                product,
                productUrl
            )}


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
                    aria-label="Agregar ${escapeHTML(
                        product.name
                    )} al carrito"
                >

                    AGREGAR AL CARRITO

                </button>

            </div>


            ${buildBenefits()}


            <div class="satori-description-box">


                <div
                    class="satori-tabs"
                    role="tablist"
                >

                    <button
                        type="button"
                        class="satori-tab active"
                        data-tab="description"
                        role="tab"
                        aria-selected="true"
                    >
                        DESCRIPCIÓN
                    </button>


                    <button
                        type="button"
                        class="satori-tab"
                        data-tab="shipping"
                        role="tab"
                        aria-selected="false"
                    >
                        ENVÍOS
                    </button>


                    <button
                        type="button"
                        class="satori-tab"
                        data-tab="care"
                        role="tab"
                        aria-selected="false"
                    >
                        CUIDADOS
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

                    Cambios y devoluciones
                    según las condiciones de SATORII.

                </div>


                <div
                    class="satori-panel"
                    data-tab-panel="care"
                    hidden
                >

                    ${escapeHTML(
                        getCare(
                            product
                        )
                    )}

                </div>

            </div>

        </div>

    </section>


    ${buildPromoSection(
        product,
        productUrl
    )}

</div>
`;

}


/* =========================================================
   JAVASCRIPT PRODUCTO
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


    let pollTimer =
        null;


    let realtimeChannel =
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
            /^(https?:)?\\\\/\\\\//i.test(
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
                /^\\\\/+ /,
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
       GALERÍA
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
            zoom &&
            !zoom.dataset.bound
        ) {

            zoom.dataset.bound =
                "true";


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
       GALERÍA DINÁMICA
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
                visual
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
                "#080808",

            black:
                "#080808",

            rojo:
                "#EF0930",

            red:
                "#EF0930",

            blanco:
                "#FFFFFF",

            white:
                "#FFFFFF",

            gris:
                "#B8B8B8",

            gray:
                "#B8B8B8",

            grey:
                "#B8B8B8",

            azul:
                "#4B72C9",

            blue:
                "#4B72C9",

            verde:
                "#5B8D6B",

            green:
                "#5B8D6B"

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

                    if (
                        button.dataset.bound
                    ) {

                        return;

                    }


                    button.dataset.bound =
                        "true";


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
                    "Color " +
                    String(
                        color
                    )
                );


                const span =
                    document.createElement(
                        "span"
                    );


                span.style.background =
                    colorValue(
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

                    if (
                        button.dataset.bound
                    ) {

                        return;

                    }


                    button.dataset.bound =
                        "true";


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
       INFORMACIÓN
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


        const description =
            document.getElementById(
                "tab-description"
            );


        if (
            description &&
            product.description
        ) {

            const firstText =
                Array.from(
                    description.childNodes
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
                firstText
            ) {

                firstText.textContent =
                    product.description;

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


        const stock =
            product.stock == null
                ? null
                : Number(
                    product.stock
                );


        const available =
            product.available !== false &&
            product.active !== false &&
            (
                stock === null ||
                stock > 0
            );


        button.disabled =
            !available;


        button.textContent =
            available
                ? "AGREGAR AL CARRITO"
                : "AGOTADO";

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
       SUPABASE
    ====================================================== */

    async function fetchProduct() {

        if (
            typeof satoriSupabase ===
            "undefined"
        ) {

            return false;

        }


        try {

            const result =
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
                result.error
            ) {

                console.error(
                    "SATORII · Supabase:",
                    result.error
                );


                return false;

            }


            if (
                result.data
            ) {

                updateProductPage(
                    result.data
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
       REALTIME
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
                        PRODUCT_ID
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
                                PRODUCT_ID
                        },
                        function (
                            payload
                        ) {

                            if (
                                payload.eventType ===
                                "DELETE"
                            ) {

                                updateProductPage(
                                    {
                                        id:
                                            PRODUCT_ID,

                                        available:
                                            false
                                    }
                                );

                                return;

                            }


                            if (
                                payload.new
                            ) {

                                updateProductPage(
                                    payload.new
                                );

                            }

                        }
                    )
                    .subscribe();

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
       POLLING
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


        const panels =
            document.querySelectorAll(
                "[data-tab-panel]"
            );


        tabs.forEach(
            function (
                tab
            ) {

                if (
                    tab.dataset.bound
                ) {

                    return;

                }


                tab.dataset.bound =
                    "true";


                tab.onclick =
                    function () {

                        tabs.forEach(
                            function (
                                item
                            ) {

                                item.classList.remove(
                                    "active"
                                );

                                item.setAttribute(
                                    "aria-selected",
                                    "false"
                                );

                            }
                        );


                        tab.classList.add(
                            "active"
                        );


                        tab.setAttribute(
                            "aria-selected",
                            "true"
                        );


                        panels.forEach(
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


    const images =
        getProductImages(
            product
        );


    const image =
        getImagePath(
            images[0],
            productUrl
        );


    const related =
        buildRelatedProducts(
            product,
            products,
            productUrl
        );


    return `<!DOCTYPE html>

<html
    lang="es"
>

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
        content="${SATORII_DARK}"
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


    <!-- =================================================
         GOOGLE FONTS
    ================================================== -->

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    >


    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >


    <link
        href="
            https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap
        "
        rel="stylesheet"
    >


    <!-- =================================================
         CSS GLOBAL
    ================================================== -->

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


    <link
        rel="stylesheet"
        href="${escapeHTML(
            root +
            "css/footer.css"
        )}"
    >


    <!-- =================================================
         CSS PRODUCTO
    ================================================== -->

    <style>

        ${buildDesignCSS()}

    </style>

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


    <!-- =================================================
         HEADER GLOBAL
    ================================================== -->

    <div
        id="satori-header"
    ></div>


    <!-- =================================================
         PRODUCTO
    ================================================== -->

    <main
        class="
            satori-page-animate
            satori-product-page
        "
    >

        ${buildHero(
            product,
            productUrl
        )}


        ${related}

    </main>


    <!-- =================================================
         FOOTER GLOBAL
    ================================================== -->

    <div
        id="satori-footer"
    ></div>


    <!-- =================================================
         SUPABASE
    ================================================== -->

    <script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    ></script>


    <script
        src="${escapeHTML(
            root +
            "js/supabase.js"
        )}"
    ></script>


    <!-- =================================================
         JAVASCRIPT GLOBAL
    ================================================== -->

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


    <!-- =================================================
         JAVASCRIPT PRODUCTO
    ================================================== -->

    ${buildProductScript(
        product,
        productUrl
    )}

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
        "=============================================="
    );

    console.log(
        "SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS"
    );

    console.log(
        DESIGN_NAME
    );

    console.log(
        "=============================================="
    );

    console.log("");


    /* =====================================================
       CARGAR PRODUCTOS
    ====================================================== */

    const products =
        loadProducts();


    console.log(
        `✓ Productos cargados: ${products.length}`
    );


    /* =====================================================
       VALIDAR
    ====================================================== */

    validateProducts(
        products
    );


    console.log(
        "✓ Catálogo validado"
    );


    /* =====================================================
       GENERAR
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
        "=============================================="
    );

    console.log(
        `✓ Páginas generadas: ${generated}`
    );

    console.log(
        "✓ Diseño 9 aplicado"
    );

    console.log(
        "✓ Fondo blanco"
    );

    console.log(
        "✓ Rojo SATORII #EF0930"
    );

    console.log(
        "✓ Header global"
    );

    console.log(
        "✓ Footer global #101727"
    );

    console.log(
        "✓ Footer.css incluido"
    );

    console.log(
        "✓ Galería dinámica"
    );

    console.log(
        "✓ Colores dinámicos"
    );

    console.log(
        "✓ Tallas dinámicas"
    );

    console.log(
        "✓ Cantidad"
    );

    console.log(
        "✓ Carrito global"
    );

    console.log(
        "✓ Supabase"
    );

    console.log(
        "✓ Supabase Realtime"
    );

    console.log(
        "✓ Polling de respaldo"
    );

    console.log(
        "✓ Responsive"
    );

    console.log(
        "✓ prefers-reduced-motion"
    );

    console.log(
        "=============================================="
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
        "=============================================="
    );

    console.error(
        "SATORII · ERROR"
    );

    console.error(
        "=============================================="
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
