/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 2 · IMMERSIVE / FULL VISUAL
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
    "IMMERSIVE";


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


/* ---------------------------------------------------------
   SLUG
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   PRECIO
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   CATEGORÍA
--------------------------------------------------------- */

function getCategory(
    product
) {

    return String(
        product.category ||
        product.collection ||
        "SATORII"
    );

}


/* ---------------------------------------------------------
   NOMBRE DE CATEGORÍA
--------------------------------------------------------- */

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


    return (
        getRootPrefix(
            productUrl
        ) +
        clean
    );

}


/* =========================================================
   RUTA DE SALIDA
========================================================= */

function getOutputPath(
    product
) {

    const url =
        normalizeProductUrl(
            product
        );


    return path.join(
        ROOT_DIR,
        ...url.split("/")
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

        return product.images;

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

<div class="satori-immersive-thumbnails">

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
    class="
        satori-immersive-thumb
        ${index === 0 ? "active" : ""}
    "
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
        .join(
            "\n"
        )}

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

<div class="satori-immersive-option">

    <span class="satori-immersive-label">
        COLOR
    </span>


    <div class="satori-immersive-colors">

        ${colors
            .map(
                function (
                    color,
                    index
                ) {

                    return `

<button
    type="button"
    class="
        satori-immersive-color
        ${index === 0 ? "active" : ""}
    "
    data-color="${escapeHTML(
        color
    )}"
    aria-label="${escapeHTML(
        color
    )}"
>

    <span></span>

</button>

                    `;

                }
            )
            .join(
                "\n"
            )}

    </div>

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

<div class="satori-immersive-option">

    <div class="satori-immersive-option-title">

        <span class="satori-immersive-label">
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


    <div class="satori-immersive-sizes">

        ${sizes
            .map(
                function (
                    size,
                    index
                ) {

                    return `

<button
    type="button"
    class="
        satori-immersive-size
        ${index === 0 ? "active" : ""}
    "
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
            .join(
                "\n"
            )}

    </div>

</div>

`;

}


/* =========================================================
   DETALLES
========================================================= */

function buildDetails(
    product
) {

    const description =
        product.description ||
        product.details?.description ||
        "Diseño exclusivo SATORII.";


    const material =
        product.details?.material ||
        product.material ||
        "Material de alta calidad.";


    const care =
        product.details?.care ||
        "Seguir las instrucciones de cuidado del producto.";


    const shipping =
        product.details?.shipping ||
        "Envíos a todo Chile.";


    return `

<section class="satori-immersive-details">

    <div class="satori-immersive-details-heading">

        <span>
            SATORII · DETALLES
        </span>


        <h2>
            DISEÑADO PARA
            <em>
                DESTACAR.
            </em>
        </h2>

    </div>


    <div class="satori-immersive-detail-grid">

        <article>

            <div class="satori-detail-icon">
                ✦
            </div>

            <h3>
                CALIDAD PREMIUM
            </h3>

            <p>
                ${escapeHTML(
                    material
                )}
            </p>

        </article>


        <article>

            <div class="satori-detail-icon">
                ◇
            </div>

            <h3>
                DISEÑO EXCLUSIVO
            </h3>

            <p>
                Una pieza diseñada
                para formar parte
                de tu universo.
            </p>

        </article>


        <article>

            <div class="satori-detail-icon">
                ⌁
            </div>

            <h3>
                CUIDADO
            </h3>

            <p>
                ${escapeHTML(
                    care
                )}
            </p>

        </article>

    </div>


    <div class="satori-immersive-description">

        <div>

            <span>
                SOBRE EL PRODUCTO
            </span>

            <p>
                ${escapeHTML(
                    description
                )}
            </p>

        </div>


        <div>

            <span>
                ENVÍOS
            </span>

            <p>
                ${escapeHTML(
                    shipping
                )}
            </p>

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

    const currentCategory =
        getCategory(
            product
        );


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


    const sameCategory =
        related.filter(
            function (
                item
            ) {

                return (
                    getCategory(
                        item
                    ) ===
                    currentCategory
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
            5
        );


    if (
        !related.length
    ) {

        return "";

    }


    return `

<section class="satori-immersive-related">

    <div class="satori-related-header">

        <span>
            SATORII · MÁS PRODUCTOS
        </span>


        <h2>
            COMPLETA TU
            <em>
                UNIVERSO.
            </em>
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
                        );


                    const image =
                        getImagePath(
                            item.image,
                            productUrl
                        );


                    return `

<a
    href="${escapeHTML(
        relativeUrl
    )}"
    class="satori-immersive-related-card"
>

    <div class="satori-related-card-image">

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


    <div class="satori-related-card-info">

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
            .join(
                "\n"
            )}

    </div>

</section>

`;

}


/* =========================================================
   CSS · DISEÑO 2
========================================================= */

function buildDesignCSS() {

    return `

/* =========================================================
   SATORII · DESIGN 2 · IMMERSIVE
========================================================= */

:root {

    --satori-red: #EF0930;

    --satori-black: #050505;

    --satori-dark: #0b0b0b;

    --satori-white: #ffffff;

    --satori-muted: #9a9a9a;

    --satori-line:
        rgba(255,255,255,.14);

}


body.satori-design-2 {

    background:
        #050505;

    color:
        #ffffff;

}


/* =========================================================
   HERO
========================================================= */

.satori-immersive-hero {

    position:
        relative;

    min-height:
        calc(100vh - 100px);

    display:
        grid;

    grid-template-columns:
        minmax(0, 1fr)
        minmax(360px, .65fr);

    overflow:
        hidden;

    background:
        radial-gradient(
            circle at 68% 42%,
            rgba(239,9,48,.18),
            transparent 38%
        ),
        #050505;

}


/* =========================================================
   BACKGROUND
========================================================= */

.satori-immersive-background {

    position:
        absolute;

    inset:
        0;

    pointer-events:
        none;

    overflow:
        hidden;

}


.satori-immersive-background::before {

    content:
        "";

    position:
        absolute;

    inset:
        -20%;

    background:
        radial-gradient(
            ellipse at center,
            rgba(239,9,48,.20),
            transparent 45%
        );

    filter:
        blur(50px);

    opacity:
        .8;

}


.satori-immersive-grid {

    position:
        absolute;

    inset:
        0;

    opacity:
        .06;

    background-image:
        linear-gradient(
            rgba(255,255,255,.4) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,.4) 1px,
            transparent 1px
        );

    background-size:
        80px 80px;

}


/* =========================================================
   INFORMACIÓN
========================================================= */

.satori-immersive-info {

    position:
        relative;

    z-index:
        2;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    padding:
        clamp(40px, 7vw, 110px);

}


.satori-immersive-eyebrow {

    display:
        inline-block;

    margin-bottom:
        18px;

    color:
        var(--satori-red);

    font-size:
        11px;

    font-weight:
        800;

    letter-spacing:
        .18em;

}


.satori-immersive-title {

    margin:
        0;

    max-width:
        760px;

    font-size:
        clamp(48px, 7vw, 110px);

    line-height:
        .88;

    letter-spacing:
        -.055em;

    text-transform:
        uppercase;

    font-weight:
        900;

}


.satori-immersive-title span {

    display:
        block;

}


.satori-immersive-title .accent {

    color:
        var(--satori-red);

}


.satori-immersive-price {

    margin-top:
        30px;

    font-size:
        26px;

    font-weight:
        800;

}


.satori-immersive-tax {

    margin-top:
        5px;

    color:
        var(--satori-muted);

    font-size:
        11px;

}


/* =========================================================
   OPCIONES
========================================================= */

.satori-immersive-options {

    margin-top:
        32px;

    max-width:
        500px;

}


.satori-immersive-option {

    margin-top:
        22px;

}


.satori-immersive-label {

    display:
        block;

    margin-bottom:
        10px;

    color:
        #ffffff;

    font-size:
        10px;

    font-weight:
        800;

    letter-spacing:
        .16em;

}


.satori-immersive-option-title {

    display:
        flex;

    justify-content:
        space-between;

    align-items:
        center;

}


.satori-immersive-option-title a {

    color:
        var(--satori-red);

    font-size:
        10px;

    font-weight:
        700;

    text-decoration:
        none;

}


.satori-immersive-colors {

    display:
        flex;

    gap:
        10px;

}


.satori-immersive-color {

    width:
        34px;

    height:
        34px;

    padding:
        4px;

    border:
        1px solid
        rgba(255,255,255,.3);

    border-radius:
        50%;

    background:
        transparent;

    cursor:
        pointer;

}


.satori-immersive-color span {

    display:
        block;

    width:
        100%;

    height:
        100%;

    border-radius:
        50%;

    background:
        #111;

}


.satori-immersive-color:nth-child(2)
span {

    background:
        #e63b68;

}


.satori-immersive-color:nth-child(3)
span {

    background:
        #ffffff;

}


.satori-immersive-color.active {

    border-color:
        var(--satori-red);

    box-shadow:
        0 0 0 2px
        rgba(239,9,48,.2);

}


.satori-immersive-sizes {

    display:
        flex;

    flex-wrap:
        wrap;

    gap:
        8px;

}


.satori-immersive-size {

    min-width:
        48px;

    height:
        42px;

    padding:
        0 14px;

    border:
        1px solid
        rgba(255,255,255,.25);

    background:
        transparent;

    color:
        #ffffff;

    font-size:
        11px;

    font-weight:
        700;

    cursor:
        pointer;

    transition:
        .2s ease;

}


.satori-immersive-size:hover,
.satori-immersive-size.active {

    border-color:
        var(--satori-red);

    background:
        var(--satori-red);

}


/* =========================================================
   CANTIDAD
========================================================= */

.satori-immersive-buy-row {

    display:
        flex;

    align-items:
        center;

    gap:
        12px;

    margin-top:
        30px;

}


.satori-immersive-quantity {

    display:
        flex;

    align-items:
        center;

    height:
        52px;

    border:
        1px solid
        rgba(255,255,255,.22);

}


.satori-immersive-quantity button {

    width:
        42px;

    height:
        100%;

    border:
        0;

    background:
        transparent;

    color:
        #ffffff;

    font-size:
        18px;

    cursor:
        pointer;

}


.satori-immersive-quantity span {

    min-width:
        30px;

    text-align:
        center;

    font-size:
        13px;

}


/* =========================================================
   BOTONES
========================================================= */

.satori-immersive-buy {

    flex:
        1;

    min-height:
        52px;

    border:
        1px solid
        var(--satori-red);

    background:
        var(--satori-red);

    color:
        #ffffff;

    font-size:
        11px;

    font-weight:
        900;

    letter-spacing:
        .08em;

    cursor:
        pointer;

    transition:
        transform .2s ease,
        background .2s ease;

}


.satori-immersive-buy:hover {

    transform:
        translateY(-2px);

    background:
        #ff1640;

}


.satori-immersive-secondary {

    min-height:
        52px;

    padding:
        0 22px;

    border:
        1px solid
        rgba(255,255,255,.3);

    background:
        transparent;

    color:
        #ffffff;

    font-size:
        10px;

    font-weight:
        800;

    cursor:
        pointer;

}


/* =========================================================
   CONFIANZA
========================================================= */

.satori-immersive-trust {

    display:
        flex;

    flex-wrap:
        wrap;

    gap:
        20px;

    margin-top:
        28px;

}


.satori-immersive-trust-item {

    display:
        flex;

    align-items:
        center;

    gap:
        8px;

    color:
        #cccccc;

    font-size:
        10px;

}


.satori-immersive-trust-item strong {

    color:
        #ffffff;

}


/* =========================================================
   IMAGEN PRINCIPAL
========================================================= */

.satori-immersive-visual {

    position:
        relative;

    z-index:
        2;

    min-height:
        700px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    padding:
        40px;

}


.satori-immersive-image-glow {

    position:
        absolute;

    width:
        70%;

    aspect-ratio:
        1;

    border-radius:
        50%;

    background:
        radial-gradient(
            circle,
            rgba(239,9,48,.32),
            transparent 68%
        );

    filter:
        blur(35px);

}


.satori-immersive-main-image {

    position:
        relative;

    z-index:
        2;

    width:
        min(760px, 90%);

    max-height:
        760px;

    object-fit:
        contain;

    filter:
        drop-shadow(
            0 35px 45px
            rgba(0,0,0,.65)
        );

    transition:
        transform .5s ease;

}


.satori-immersive-main-image:hover {

    transform:
        scale(1.025)
        rotate(-1deg);

}


/* =========================================================
   INDICADOR
========================================================= */

.satori-immersive-scroll {

    position:
        absolute;

    right:
        30px;

    bottom:
        35px;

    z-index:
        5;

    display:
        flex;

    flex-direction:
        column;

    align-items:
        center;

    gap:
        8px;

    color:
        #ffffff;

    font-size:
        9px;

    letter-spacing:
        .15em;

    writing-mode:
        vertical-rl;

}


.satori-immersive-scroll::after {

    content:
        "";

    width:
        1px;

    height:
        55px;

    background:
        var(--satori-red);

}


/* =========================================================
   MINIATURAS
========================================================= */

.satori-immersive-thumbnails {

    position:
        absolute;

    left:
        25px;

    bottom:
        35px;

    z-index:
        5;

    display:
        flex;

    gap:
        8px;

}


.satori-immersive-thumb {

    width:
        58px;

    height:
        58px;

    padding:
        3px;

    border:
        1px solid
        rgba(255,255,255,.2);

    background:
        rgba(0,0,0,.7);

    cursor:
        pointer;

}


.satori-immersive-thumb img {

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

}


.satori-immersive-thumb.active {

    border-color:
        var(--satori-red);

}


/* =========================================================
   DETALLES
========================================================= */

.satori-immersive-details {

    position:
        relative;

    padding:
        110px
        clamp(30px, 7vw, 120px);

    background:
        #090909;

    border-top:
        1px solid
        var(--satori-line);

}


.satori-immersive-details-heading span {

    color:
        var(--satori-red);

    font-size:
        10px;

    font-weight:
        800;

    letter-spacing:
        .2em;

}


.satori-immersive-details-heading h2 {

    max-width:
        700px;

    margin:
        15px 0 55px;

    font-size:
        clamp(38px, 5vw, 75px);

    line-height:
        .9;

    letter-spacing:
        -.04em;

    text-transform:
        uppercase;

}


.satori-immersive-details-heading em {

    color:
        var(--satori-red);

    font-style:
        normal;

}


.satori-immersive-detail-grid {

    display:
        grid;

    grid-template-columns:
        repeat(3, 1fr);

    border-top:
        1px solid
        var(--satori-line);

    border-bottom:
        1px solid
        var(--satori-line);

}


.satori-immersive-detail-grid article {

    padding:
        35px;

    border-right:
        1px solid
        var(--satori-line);

}


.satori-immersive-detail-grid article:last-child {

    border-right:
        0;

}


.satori-detail-icon {

    color:
        var(--satori-red);

    font-size:
        24px;

}


.satori-immersive-detail-grid h3 {

    margin:
        20px 0 10px;

    font-size:
        12px;

    letter-spacing:
        .1em;

}


.satori-immersive-detail-grid p {

    margin:
        0;

    max-width:
        300px;

    color:
        #999;

    font-size:
        13px;

    line-height:
        1.7;

}


.satori-immersive-description {

    display:
        grid;

    grid-template-columns:
        2fr 1fr;

    gap:
        80px;

    margin-top:
        65px;

}


.satori-immersive-description span {

    color:
        var(--satori-red);

    font-size:
        10px;

    font-weight:
        800;

    letter-spacing:
        .15em;

}


.satori-immersive-description p {

    max-width:
        800px;

    margin-top:
        18px;

    color:
        #b5b5b5;

    font-size:
        15px;

    line-height:
        1.8;

}


/* =========================================================
   RELACIONADOS
========================================================= */

.satori-immersive-related {

    padding:
        100px
        clamp(25px, 7vw, 120px);

    background:
        #050505;

}


.satori-related-header span {

    color:
        var(--satori-red);

    font-size:
        10px;

    font-weight:
        800;

    letter-spacing:
        .18em;

}


.satori-related-header h2 {

    margin:
        15px 0 45px;

    font-size:
        clamp(36px, 5vw, 70px);

    line-height:
        .9;

    letter-spacing:
        -.04em;

}


.satori-related-header em {

    color:
        var(--satori-red);

    font-style:
        normal;

}


.satori-related-grid {

    display:
        grid;

    grid-template-columns:
        repeat(5, 1fr);

    gap:
        15px;

}


.satori-immersive-related-card {

    color:
        #ffffff;

    text-decoration:
        none;

}


.satori-related-card-image {

    aspect-ratio:
        1 / 1.15;

    overflow:
        hidden;

    background:
        #101010;

}


.satori-related-card-image img {

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

    transition:
        transform .35s ease;

}


.satori-immersive-related-card:hover
.satori-related-card-image img {

    transform:
        scale(1.05);

}


.satori-related-card-info {

    padding:
        14px 2px;

}


.satori-related-card-info span {

    color:
        var(--satori-red);

    font-size:
        8px;

    font-weight:
        800;

    letter-spacing:
        .12em;

}


.satori-related-card-info h3 {

    margin:
        7px 0;

    font-size:
        12px;

    line-height:
        1.3;

}


.satori-related-card-info strong {

    font-size:
        12px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (
    max-width: 1000px
) {

    .satori-immersive-hero {

        grid-template-columns:
            1fr;

        min-height:
            auto;

    }


    .satori-immersive-info {

        order:
            2;

        padding:
            55px 25px 70px;

    }


    .satori-immersive-visual {

        order:
            1;

        min-height:
            600px;

        padding:
            30px 20px;

    }


    .satori-immersive-title {

        font-size:
            clamp(48px, 15vw, 90px);

    }


    .satori-immersive-detail-grid {

        grid-template-columns:
            1fr;

    }


    .satori-immersive-detail-grid article {

        border-right:
            0;

        border-bottom:
            1px solid
            var(--satori-line);

    }


    .satori-immersive-detail-grid article:last-child {

        border-bottom:
            0;

    }


    .satori-immersive-description {

        grid-template-columns:
            1fr;

        gap:
            20px;

    }


    .satori-related-grid {

        grid-template-columns:
            repeat(2, 1fr);

    }

}


@media (
    max-width: 600px
) {

    .satori-immersive-visual {

        min-height:
            480px;

    }


    .satori-immersive-main-image {

        width:
            100%;

    }


    .satori-immersive-scroll {

        display:
            none;

    }


    .satori-immersive-thumbnails {

        left:
            15px;

        bottom:
            15px;

    }


    .satori-immersive-thumb {

        width:
            48px;

        height:
            48px;

    }


    .satori-immersive-buy-row {

        flex-direction:
            column;

        align-items:
            stretch;

    }


    .satori-immersive-quantity {

        width:
            100%;

        justify-content:
            center;

    }


    .satori-immersive-secondary {

        width:
            100%;

    }


    .satori-immersive-details {

        padding:
            70px 22px;

    }


    .satori-immersive-related {

        padding:
            70px 20px;

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


    const description =
        product.description ||
        product.details?.description ||
        "Diseño exclusivo SATORII.";


    return `

<section class="satori-immersive-hero">

    <div class="satori-immersive-background">

        <div class="satori-immersive-grid"></div>

    </div>


    <div class="satori-immersive-info">

        <span class="satori-immersive-eyebrow">

            ${escapeHTML(
                category
            )}

            · SATORII COLLECTION

        </span>


        <h1 class="satori-immersive-title">

            <span>
                ${escapeHTML(
                    product.name
                )}
            </span>

        </h1>


        <div class="satori-immersive-price">

            ${price} CLP

        </div>


        <div class="satori-immersive-tax">

            Impuestos incluidos.
            Envío calculado en el checkout.

        </div>


        <div class="satori-immersive-options">

            ${buildColorOptions(
                product
            )}

            ${buildSizeOptions(
                product,
                productUrl
            )}

        </div>


        <div class="satori-immersive-buy-row">

            <div
                class="satori-immersive-quantity"
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
                class="satori-immersive-buy"
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


        <div class="satori-immersive-trust">

            <span
                class="satori-immersive-trust-item"
            >

                🚚

                <strong>
                    Envíos a todo Chile
                </strong>

            </span>


            <span
                class="satori-immersive-trust-item"
            >

                ◇

                <strong>
                    Compra segura
                </strong>

            </span>


            <span
                class="satori-immersive-trust-item"
            >

                ✓

                <strong>
                    Garantía SATORII
                </strong>

            </span>

        </div>


        <p
            style="
                max-width:480px;
                margin-top:24px;
                color:#8d8d8d;
                font-size:12px;
                line-height:1.7;
            "
        >

            ${escapeHTML(
                description
            )}

        </p>

    </div>


    <div class="satori-immersive-visual">

        <div class="satori-immersive-image-glow"></div>


        <img
            id="satoriMainImage"
            class="satori-immersive-main-image"
            src="${escapeHTML(
                mainImage
            )}"
            alt="${escapeHTML(
                product.name
            )}"
        >


        ${buildThumbnails(
            product,
            productUrl
        )}


        <div class="satori-immersive-scroll">

            SCROLL

        </div>

    </div>

</section>

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


    let supabaseAttempts =
        0;


    /* =====================================================
       UTILIDADES
    ====================================================== */

    function formatProductPrice(
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


    function normalizeRemoteImage(
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
            /^(https?:)?\/\//i.test(
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


        const clean =
            original.replace(
                /^\/+/,
                ""
            );


        return (
            ROOT_PREFIX +
            clean
        );

    }


    function getRemoteImages(
        product
    ) {

        if (
            Array.isArray(
                product.images
            ) &&
            product.images.length
        ) {

            return product.images
                .filter(
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

    function bindGallery() {

        const mainImage =
            document.getElementById(
                "satoriMainImage"
            );


        const thumbnails =
            document.querySelectorAll(
                ".satori-immersive-thumb"
            );


        thumbnails.forEach(
            function (
                thumbnail
            ) {

                thumbnail.addEventListener(
                    "click",
                    function () {

                        const image =
                            thumbnail.dataset.galleryImage;


                        if (
                            !mainImage ||
                            !image
                        ) {

                            return;

                        }


                        mainImage.src =
                            image;


                        thumbnails.forEach(
                            function (
                                item
                            ) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        thumbnail.classList.add(
                            "active"
                        );

                    }
                );

            }
        );

    }


    function updateGallery(
        product
    ) {

        const images =
            getRemoteImages(
                product
            );


        const mainImage =
            document.getElementById(
                "satoriMainImage"
            );


        if (
            !mainImage ||
            !images.length
        ) {

            return;

        }


        const normalizedImages =
            images.map(
                normalizeRemoteImage
            );


        mainImage.src =
            normalizedImages[0];


        mainImage.alt =
            product.name ||
            mainImage.alt;


        const gallery =
            document.querySelector(
                ".satori-immersive-thumbnails"
            );


        if (!gallery) {

            return;

        }


        gallery.innerHTML =
            "";


        normalizedImages.forEach(
            function (
                image,
                index
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "satori-immersive-thumb" +
                    (
                        index === 0
                            ? " active"
                            : ""
                    );


                button.dataset.galleryImage =
                    image;


                button.setAttribute(
                    "aria-label",
                    "Ver imagen " +
                    (
                        index + 1
                    )
                );


                const imageElement =
                    document.createElement(
                        "img"
                    );


                imageElement.src =
                    image;


                imageElement.alt =
                    product.name ||
                    "";


                imageElement.loading =
                    "lazy";


                button.appendChild(
                    imageElement
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

    function bindColors() {

        document
            .querySelectorAll(
                ".satori-immersive-color"
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
                                    ".satori-immersive-color"
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

                        }
                    );

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
                ".satori-immersive-colors"
            );


        if (!container) {

            return;

        }


        if (!colors.length) {

            const option =
                container.closest(
                    ".satori-immersive-option"
                );


            if (option) {

                option.remove();

            }

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
                    "satori-immersive-color" +
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


                const dot =
                    document.createElement(
                        "span"
                    );


                button.appendChild(
                    dot
                );


                container.appendChild(
                    button
                );

            }
        );


        bindColors();

    }


    /* =====================================================
       TALLAS
    ====================================================== */

    function bindSizes() {

        document
            .querySelectorAll(
                ".satori-immersive-size"
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
                                    ".satori-immersive-size"
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

                        }
                    );

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
                ".satori-immersive-sizes"
            );


        if (!container) {

            return;

        }


        if (!sizes.length) {

            const option =
                container.closest(
                    ".satori-immersive-option"
                );


            if (option) {

                option.remove();

            }

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
                    "satori-immersive-size" +
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


        bindSizes();

    }


    /* =====================================================
       INFORMACIÓN DEL PRODUCTO
    ====================================================== */

    function updateProductInformation(
        product
    ) {

        const title =
            document.querySelector(
                ".satori-immersive-title span"
            );


        if (
            title &&
            product.name
        ) {

            title.textContent =
                product.name;

        }


        if (
            product.name
        ) {

            document.title =
                product.name +
                " | SATORII";

        }


        const price =
            document.querySelector(
                ".satori-immersive-price"
            );


        if (
            price &&
            product.price !== undefined &&
            product.price !== null
        ) {

            price.textContent =
                formatProductPrice(
                    product.price
                ) +
                " " +
                String(
                    product.currency ||
                    "CLP"
                ).toUpperCase();

        }


        const category =
            product.collection ||
            product.category;


        const eyebrow =
            document.querySelector(
                ".satori-immersive-eyebrow"
            );


        if (
            eyebrow &&
            category
        ) {

            eyebrow.textContent =
                String(
                    category
                )
                .replace(
                    /[-_]/g,
                    " "
                )
                .toUpperCase() +
                " · SATORII COLLECTION";

        }


        const description =
            product.description ||
            product.details?.description;


        if (description) {

            document
                .querySelectorAll(
                    ".satori-immersive-description > div"
                )
                .forEach(
                    function (
                        block
                    ) {

                        const label =
                            block.querySelector(
                                "span"
                            );


                        const paragraph =
                            block.querySelector(
                                "p"
                            );


                        if (
                            label &&
                            paragraph &&
                            label.textContent
                                .trim()
                                .toUpperCase() ===
                            "SOBRE EL PRODUCTO"
                        ) {

                            paragraph.textContent =
                                description;

                        }

                    }
                );


            const heroDescription =
                document.querySelector(
                    ".satori-immersive-info > p"
                );


            if (heroDescription) {

                heroDescription.textContent =
                    description;

            }

        }


        const material =
            product.details?.material ||
            product.material;


        if (material) {

            const detailParagraph =
                document.querySelector(
                    ".satori-immersive-detail-grid article p"
                );


            if (detailParagraph) {

                detailParagraph.textContent =
                    material;

            }

        }


        const shipping =
            product.details?.shipping;


        if (shipping) {

            document
                .querySelectorAll(
                    ".satori-immersive-description > div"
                )
                .forEach(
                    function (
                        block
                    ) {

                        const label =
                            block.querySelector(
                                "span"
                            );


                        const paragraph =
                            block.querySelector(
                                "p"
                            );


                        if (
                            label &&
                            paragraph &&
                            label.textContent
                                .trim()
                                .toUpperCase() ===
                            "ENVÍOS"
                        ) {

                            paragraph.textContent =
                                shipping;

                        }

                    }
                );

        }


        setMeta(
            'meta[name="description"]',
            description ||
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
            description ||
            product.name
        );

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
            getRemoteImages(
                product
            );


        if (
            images.length
        ) {

            button.dataset.productImage =
                normalizeRemoteImage(
                    images[0]
                );

        }


        if (
            product.available === false
        ) {

            button.disabled =
                true;


            button.textContent =
                "AGOTADO";


            button.setAttribute(
                "aria-disabled",
                "true"
            );


            button.style.opacity =
                ".45";


            button.style.cursor =
                "not-allowed";

        }

        else {

            button.disabled =
                false;


            button.textContent =
                "AGREGAR AL CARRITO";


            button.removeAttribute(
                "aria-disabled"
            );


            button.style.opacity =
                "";


            button.style.cursor =
                "";

        }

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
            "SATORII · Producto actualizado desde Supabase:",
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
       CARGAR PRODUCTO DESDE SUPABASE
    ====================================================== */

    async function loadProductFromSupabase() {

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
                    loadProductFromSupabase,
                    250
                );

            }


            return;

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


            if (error) {

                console.error(
                    "SATORII · Error cargando producto desde Supabase:",
                    error
                );

                return;

            }


            if (!data) {

                console.warn(
                    "SATORII · Producto no encontrado:",
                    PRODUCT_ID
                );

                return;

            }


            updateProductPage(
                data
            );

        }

        catch (
            error
        ) {

            console.error(
                "SATORII · Error inesperado:",
                error
            );

        }

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    function initializeProductPage() {

        bindGallery();

        bindColors();

        bindSizes();

        loadProductFromSupabase();

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
        product.description ||
        product.details?.description ||
        `Descubre ${product.name} en SATORII.`;


    const image =
        getImagePath(
            product.image,
            productUrl
        );


    const css =
        buildDesignCSS();


    const hero =
        buildHero(
            product,
            productUrl
        );


    const details =
        buildDetails(
            product
        );


    const related =
        buildRelatedProducts(
            product,
            products,
            productUrl
        );

   const productScript =
       buildProductScript(
           product,
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


    <style>

        ${css}

    </style>

</head>


<body
    class="satori-design-2"
    data-product-id="${escapeHTML(
        product.id
    )}"
>


    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div
        id="satori-header"
    ></div>


    <!-- =====================================================
         CONTENIDO
    ====================================================== -->

    <main
        class="
            satori-page-animate
            satori-design-2-page
        "
    >

        ${hero}

        ${details}

        ${related}

    </main>


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <div
        id="satori-footer"
    ></div>


<!-- =====================================================
     SATORII · SUPABASE
====================================================== -->

<script
    src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
></script>


<script
    src="${escapeHTML(
        root +
        "js/supabase.js"
    )}"
></script>


<!-- =====================================================
     SATORII · JAVASCRIPT GLOBAL
====================================================== -->

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


    ${productScript}


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


    /* -----------------------------------------------------
       PRODUCTS
    ----------------------------------------------------- */

    const products =
        loadProducts();


    console.log(
        `✓ Productos cargados: ${products.length}`
    );


    /* -----------------------------------------------------
       VALIDACIÓN
    ----------------------------------------------------- */

    validateProducts(
        products
    );


    console.log(
        "✓ Catálogo validado"
    );


    /* -----------------------------------------------------
       GENERACIÓN
    ----------------------------------------------------- */

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
        "✓ Diseño 2 aplicado"
    );

    console.log(
        "✓ animations.css incluido"
    );

    console.log(
        "✓ animations.js incluido"
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
