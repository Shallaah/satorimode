/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 2 · SATORII ANIME STREETWEAR

   VERSIÓN ACTUALIZADA

   ESTRUCTURA:

   HEADER
   ↓
   GALERÍA + INFORMACIÓN PRODUCTO
   ↓
   COMPRA
   ↓
   BENEFICIOS
   ↓
   INFORMACIÓN / TABS
   ↓
   BANNER FULL WIDTH
   ↓
   RECOMENDACIONES ALEATORIAS
   ↓
   FOOTER

   RESPONSIVE:
   DESKTOP
   TABLET
   MOBILE

   FUENTES:
   Barlow Condensed
   Inter

   SALIDA:
   productos/{categoria}/{producto}.html
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


/* =========================================================
   COLORES OFICIALES SATORII
========================================================= */

const SATORII_RED =
    "#EF0930";

const SATORII_BLACK =
    "#080808";

const SATORII_DARK =
    "#101727";

const SATORII_DARK_2 =
    "#151D2D";

const SATORII_WHITE =
    "#FFFFFF";

const SATORII_LIGHT =
    "#F5F5F5";

const SATORII_BORDER =
    "#DDDDDD";

const SATORII_TEXT =
    "#777777";


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
        ) +
        " CLP"
    );

}


/* =========================================================
   URL PRODUCTO
========================================================= */

function normalizeProductUrl(product) {

    let url =
        String(
            product.url || ""
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

        url =
            `productos/${slugify(
                product.category ||
                product.collection ||
                "anime"
            )}/${slugify(
                product.id ||
                product.name
            )}.html`;

    }

    if (
        !url
            .toLowerCase()
            .endsWith(".html")
    ) {

        url += ".html";

    }

    return url;

}


/* =========================================================
   PREFIJO
========================================================= */

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

    return "../".repeat(
        directory
            .split("/")
            .filter(Boolean)
            .length
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
        String(image)
            .replace(
                /^\/+/,
                ""
            )
            .replace(
                /\\/g,
                "/"
            );

    if (
        /^(https?:)?\/\//i.test(
            clean
        ) ||
        clean.startsWith("data:") ||
        clean.startsWith("blob:")
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

function getProductImages(product) {

    if (
        Array.isArray(
            product.images
        ) &&
        product.images.length
    ) {

        return product.images
            .filter(Boolean);

    }

    if (product.image) {

        return [
            product.image
        ];

    }

    return [];

}


/* =========================================================
   DESCRIPCIÓN
========================================================= */

function getDescription(product) {

    return (
        product.description ||
        product.details?.description ||
        "Diseño exclusivo SATORII."
    );

}


/* =========================================================
   DETALLES
========================================================= */

function getDetails(product) {

    const details =
        product.details || {};

    return {

        collection:
            product.collection ||
            product.category ||
            "SATORII",

        material:
            details.material ||
            product.material ||
            "Algodón premium.",

        print:
            details.print ||
            product.print ||
            "Estampado de alta definición.",

        fit:
            details.fit ||
            product.fit ||
            "Regular / Oversized",

        origin:
            details.origin ||
            product.origin ||
            "Diseñado en Chile",

        weight:
            details.weight ||
            product.weight ||
            "240 GSM"

    };

}


/* =========================================================
   GUÍA DE TALLAS
========================================================= */

function getSizeGuide(product) {

    if (
        Array.isArray(
            product.sizeGuide
        ) &&
        product.sizeGuide.length
    ) {

        return product.sizeGuide;

    }

    if (
        Array.isArray(
            product.details?.sizeGuide
        ) &&
        product.details.sizeGuide.length
    ) {

        return product.details.sizeGuide;

    }

    return [

        {
            size: "S",
            width: "52",
            length: "70",
            sleeve: "21"
        },

        {
            size: "M",
            width: "54",
            length: "72",
            sleeve: "22"
        },

        {
            size: "L",
            width: "56",
            length: "74",
            sleeve: "23"
        },

        {
            size: "XL",
            width: "58",
            length: "76",
            sleeve: "24"
        }

    ];

}


/* =========================================================
   ENVÍOS
========================================================= */

function getShipping(product) {

    return (
        product.details?.shipping ||
        product.shipping ||
        "Enviamos a todo Chile. Los tiempos y costos de despacho dependen del destino y método de envío seleccionado."
    );

}


/* =========================================================
   CUIDADOS
========================================================= */

function getCare(product) {

    return (
        product.details?.care ||
        product.care ||
        "Lavar con agua fría. No utilizar cloro. No planchar directamente sobre el estampado. Preferir secado natural."
    );

}


/* =========================================================
   BANNER
========================================================= */

function getBannerImage(
    product,
    productUrl
) {

    const root =
        getRootPrefix(
            productUrl
        );

    const banner =
        product.bannerImage ||
        product.featureImage ||
        product.editorialImage ||
        product.characterImage ||
        product.details?.bannerImage;

    if (banner) {

        return getImagePath(
            banner,
            productUrl
        );

    }

    return (
        root +
        "img/banner-02.webp"
    );

}


function getBannerTitle(product) {

    return (
        product.bannerTitle ||
        product.details?.bannerTitle ||
        "EL UNIVERSO DETRÁS DE LA PRENDA"
    );

}


function getBannerText(product) {

    return (
        product.bannerText ||
        product.details?.bannerText ||
        "Una pieza creada para llevar la identidad del anime y la cultura urbana contigo."
    );

}


/* =========================================================
   DETECTAR POLERAS
========================================================= */

function isTshirt(product) {

    const text =
        [
            product.type,
            product.productType,
            product.category,
            product.collection,
            product.subcategory,
            product.name
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

    return (
        /polera|t-shirt|tshirt|tee|shirt|oversize/
            .test(text)
    );

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const copy =
        array.slice();

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];

    }

    return copy;

}


/* =========================================================
   RECOMENDACIONES
========================================================= */

function getRecommendedProducts(
    product,
    products
) {

    const candidates =
        products.filter(
            item => {

                if (
                    String(item.id) ===
                    String(product.id)
                ) {

                    return false;

                }

                if (
                    item.available === false
                ) {

                    return false;

                }

                return (
                    isTshirt(item) &&
                    getProductImages(
                        item
                    ).length
                );

            }
        );


    const sameCollection =
        candidates.filter(
            item => {

                return (
                    String(
                        item.collection ||
                        item.category ||
                        ""
                    ).toLowerCase() ===
                    String(
                        product.collection ||
                        product.category ||
                        ""
                    ).toLowerCase()
                );

            }
        );


    const pool =
        sameCollection.length >= 4
            ? sameCollection
            : candidates;


    return shuffle(
        pool
    ).slice(
        0,
        4
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


    const sandbox = {};


    vm.runInNewContext(
        source +
        "\nthis.__SATORII_PRODUCTS = PRODUCTS;",
        sandbox
    );


    if (
        !Array.isArray(
            sandbox.__SATORII_PRODUCTS
        )
    ) {

        throw new Error(
            "No se pudo cargar PRODUCTS desde products.js"
        );

    }


    return sandbox.__SATORII_PRODUCTS;

}


/* =========================================================
   HTML · GALERÍA
========================================================= */

function renderGallery(
    product,
    productUrl
) {

    const images =
        getProductImages(
            product
        );


    if (!images.length) {

        return `
            <div class="satori-product-image-empty">
                <span>SATORII.</span>
            </div>
        `;

    }


    const mainImage =
        getImagePath(
            images[0],
            productUrl
        );


    const thumbs =
        images
            .slice(0, 6)
            .map(
                (
                    image,
                    index
                ) => {

                    const src =
                        getImagePath(
                            image,
                            productUrl
                        );

                    return `
                        <button
                            class="satori-thumb ${
                                index === 0
                                    ? "active"
                                    : ""
                            }"
                            type="button"
                            data-image="${escapeHTML(src)}"
                            aria-label="Ver imagen ${index + 1}"
                        >
                            <img
                                src="${escapeHTML(src)}"
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
            .join("");


    return `

        <div class="satori-gallery">

            <div class="satori-main-image">

                <img
                    id="satoriMainProductImage"
                    src="${escapeHTML(mainImage)}"
                    alt="${escapeHTML(product.name)}"
                >

            </div>


            <div class="satori-thumbnails">

                ${thumbs}

            </div>

        </div>

    `;

}


/* =========================================================
   HTML · TALLAS
========================================================= */

function renderSizes(product) {

    const sizes =
        Array.isArray(
            product.sizes
        ) &&
        product.sizes.length
            ? product.sizes
            : [
                "S",
                "M",
                "L",
                "XL"
            ];


    return sizes
        .map(
            (
                size,
                index
            ) => `

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
                    ${escapeHTML(size)}
                </button>

            `
        )
        .join("");

}


/* =========================================================
   HTML · COLORES
========================================================= */

function renderColors(product) {

    const colors =
        Array.isArray(
            product.colors
        ) &&
        product.colors.length
            ? product.colors
            : [
                "Negro"
            ];


    return colors
        .map(
            (
                color,
                index
            ) => {

                const normalized =
                    String(color)
                        .toLowerCase();


                let colorValue =
                    "#111111";


                if (
                    normalized.includes(
                        "rojo"
                    )
                ) {

                    colorValue =
                        SATORII_RED;

                }

                else if (
                    normalized.includes(
                        "blanco"
                    )
                ) {

                    colorValue =
                        "#FFFFFF";

                }

                else if (
                    normalized.includes(
                        "gris"
                    )
                ) {

                    colorValue =
                        "#888888";

                }


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
                        title="${escapeHTML(
                            color
                        )}"
                    >

                        <span
                            style="background:${colorValue}"
                        ></span>

                    </button>

                `;

            }
        )
        .join("");

}


/* =========================================================
   HTML · TABS
========================================================= */

function renderTabs(
    product
) {

    const details =
        getDetails(
            product
        );


    return `

        <section
            class="satori-information"
            id="informacion-producto"
        >

            <div class="satori-tabs">

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
                    data-tab="details"
                >
                    DETALLES
                </button>

                <button
                    class="satori-tab"
                    type="button"
                    data-tab="shipping"
                >
                    ENVÍOS
                </button>

                <button
                    class="satori-tab"
                    type="button"
                    data-tab="care"
                >
                    CUIDADOS
                </button>

            </div>


            <!-- DESCRIPCIÓN -->

            <div
                class="satori-tab-panel active"
                data-panel="description"
            >

                <div class="satori-panel-intro">

                    <span>
                        SATORII / PRODUCT
                    </span>

                    <h2>
                        SOBRE ESTA PIEZA
                    </h2>

                </div>


                <p>
                    ${escapeHTML(
                        getDescription(
                            product
                        )
                    )}
                </p>


                <p>
                    En SATORII creemos que una polera
                    puede ser mucho más que una prenda.
                    Cada diseño busca representar una
                    historia, personaje o universo que
                    forma parte de nuestra cultura.
                </p>

            </div>


            <!-- DETALLES -->

            <div
                class="satori-tab-panel"
                data-panel="details"
            >

                <div class="satori-detail-grid">

                    <div>

                        <span>
                            COLECCIÓN
                        </span>

                        <strong>
                            ${escapeHTML(
                                details.collection
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            MATERIAL
                        </span>

                        <strong>
                            ${escapeHTML(
                                details.material
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            ESTAMPADO
                        </span>

                        <strong>
                            ${escapeHTML(
                                details.print
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            FIT
                        </span>

                        <strong>
                            ${escapeHTML(
                                details.fit
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            ORIGEN
                        </span>

                        <strong>
                            ${escapeHTML(
                                details.origin
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            PESO
                        </span>

                        <strong>
                            ${escapeHTML(
                                details.weight
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- ENVÍOS -->

            <div
                class="satori-tab-panel"
                data-panel="shipping"
            >

                <div class="satori-panel-intro">

                    <span>
                        SATORII / SHIPPING
                    </span>

                    <h2>
                        ENVÍOS Y CAMBIOS
                    </h2>

                </div>


                <p>
                    ${escapeHTML(
                        getShipping(
                            product
                        )
                    )}
                </p>


                <div class="satori-info-list">

                    <div>

                        <strong>
                            ENVÍOS A TODO CHILE
                        </strong>

                        <span>
                            Despachamos a regiones y Santiago.
                        </span>

                    </div>


                    <div>

                        <strong>
                            CAMBIOS Y DEVOLUCIONES
                        </strong>

                        <span>
                            Revisa nuestras condiciones antes
                            de realizar tu compra.
                        </span>

                    </div>


                    <div>

                        <strong>
                            PAGO SEGURO
                        </strong>

                        <span>
                            Compra mediante nuestros medios
                            de pago disponibles.
                        </span>

                    </div>

                </div>

            </div>


            <!-- CUIDADOS -->

            <div
                class="satori-tab-panel"
                data-panel="care"
            >

                <div class="satori-panel-intro">

                    <span>
                        SATORII / CARE
                    </span>

                    <h2>
                        CUIDADOS DE LA PRENDA
                    </h2>

                </div>


                <p>
                    ${escapeHTML(
                        getCare(
                            product
                        )
                    )}
                </p>


                <ul>

                    <li>
                        Lavar preferentemente con agua fría.
                    </li>

                    <li>
                        No utilizar cloro.
                    </li>

                    <li>
                        No planchar directamente sobre el estampado.
                    </li>

                    <li>
                        Evitar secadora a altas temperaturas.
                    </li>

                </ul>

            </div>

        </section>

    `;

}


/* =========================================================
   HTML · RECOMENDACIONES
========================================================= */

function renderRecommendations(
    product,
    products,
    productUrl
) {

    const recommended =
        getRecommendedProducts(
            product,
            products
        );


    if (!recommended.length) {

        return "";

    }


    const cards =
        recommended
            .map(
                item => {

                    const url =
                        normalizeProductUrl(
                            item
                        );


                    const image =
                        getImagePath(
                            getProductImages(
                                item
                            )[0],
                            url
                        );


                    const href =
                        getRootPrefix(
                            productUrl
                        ) +
                        url;


                    return `

                        <a
                            class="satori-recommendation"
                            href="${escapeHTML(
                                href
                            )}"
                        >

                            <div
                                class="satori-rec-image"
                            >

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


                            <div
                                class="satori-rec-info"
                            >

                                <strong>
                                    ${escapeHTML(
                                        item.name
                                    )}
                                </strong>

                                <span>
                                    ${formatPrice(
                                        item.price
                                    )}
                                </span>

                            </div>

                        </a>

                    `;

                }
            )
            .join("");


    return `

        <section
            class="satori-recommendations"
        >

            <div
                class="satori-section-heading"
            >

                <div>

                    <span>
                        SATORII / SELECCIÓN
                    </span>

                    <h2>
                        TAMBIÉN TE PUEDE GUSTAR
                    </h2>

                </div>


                <a
                    href="${escapeHTML(
                        getRootPrefix(
                            productUrl
                        ) +
                        "anime.html"
                    )}"
                >
                    VER COLECCIÓN
                </a>

            </div>


            <div
                class="satori-recommendation-grid"
            >

                ${cards}

            </div>

        </section>

    `;

}


/* =========================================================
   GENERAR PÁGINA
========================================================= */

function generateProductPage(
    product,
    products
) {

    const productUrl =
        normalizeProductUrl(
            product
        );


    const outputPath =
        path.join(
            ROOT_DIR,
            ...productUrl.split("/")
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


    const root =
        getRootPrefix(
            productUrl
        );


    const images =
        getProductImages(
            product
        );


    const firstImage =
        images.length
            ? getImagePath(
                images[0],
                productUrl
            )
            : "";


    const bannerImage =
        getBannerImage(
            product,
            productUrl
        );


    const category =
        String(
            product.category ||
            product.collection ||
            "anime"
        );


    const recommendations =
        renderRecommendations(
            product,
            products,
            productUrl
        );


    const gallery =
        renderGallery(
            product,
            productUrl
        );


    const sizes =
        renderSizes(
            product
        );


    const colors =
        renderColors(
            product
        );


    const tabs =
        renderTabs(
            product
        );


    const html = `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="theme-color"
        content="${SATORII_DARK}"
    >

    <meta
        name="description"
        content="${escapeHTML(
            getDescription(
                product
            )
        )}"
    >

    <meta
        property="og:title"
        content="${escapeHTML(
            product.name
        )} | SATORII"
    >

    <meta
        property="og:description"
        content="${escapeHTML(
            getDescription(
                product
            )
        )}"
    >

    <meta
        property="og:image"
        content="${escapeHTML(
            firstImage
        )}"
    >

    <title>
        ${escapeHTML(
            product.name
        )} | SATORII
    </title>


    <!-- =========================================
         FUENTES
    ========================================== -->

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
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
    >


    <!-- =========================================
         CSS GLOBAL
    ========================================== -->

    <link
        rel="stylesheet"
        href="${root}css/style.css"
    >


    <!-- =========================================
         CSS PRODUCTO
    ========================================== -->

    <style>

        :root {

            --s-red:
                ${SATORII_RED};

            --s-dark:
                ${SATORII_DARK};

            --s-black:
                ${SATORII_BLACK};

            --s-white:
                ${SATORII_WHITE};

            --s-light:
                ${SATORII_LIGHT};

            --s-border:
                ${SATORII_BORDER};

            --s-text:
                ${SATORII_TEXT};

            --s-heading:
                "Barlow Condensed",
                sans-serif;

            --s-body:
                "Inter",
                sans-serif;

        }


        /* ==========================================
           RESET LOCAL
        ========================================== */

        .satori-product-page *,
        .satori-editorial *,
        .satori-recommendations * {

            box-sizing:
                border-box;

        }


        /* ==========================================
           BASE
        ========================================== */

        body {

            margin:
                0;

            background:
                #ffffff;

            color:
                var(--s-black);

            font-family:
                var(--s-body);

        }


        button,
        input,
        select,
        textarea {

            font-family:
                var(--s-body);

        }


        /* ==========================================
           CONTENEDOR
        ========================================== */

        .satori-product-page {

            width:
                100%;

            max-width:
                1440px;

            margin:
                0 auto;

            padding:
                42px 42px 0;

        }


        /* ==========================================
           BREADCRUMB
        ========================================== */

        .satori-breadcrumb {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                8px;

            margin:
                0 0 30px;

            font-size:
                10px;

            line-height:
                1.4;

            font-weight:
                700;

            letter-spacing:
                .08em;

            text-transform:
                uppercase;

            color:
                #888888;

        }


        .satori-breadcrumb span:last-child {

            color:
                var(--s-black);

        }


        /* ==========================================
           PRODUCTO
        ========================================== */

        .satori-product-layout {

            display:
                grid;

            grid-template-columns:
                minmax(
                    0,
                    1.12fr
                )
                minmax(
                    380px,
                    .88fr
                );

            gap:
                64px;

            align-items:
                start;

        }


        /* ==========================================
           GALERÍA
        ========================================== */

        .satori-gallery {

            min-width:
                0;

        }


        .satori-main-image {

            width:
                100%;

            aspect-ratio:
                1 / 1;

            overflow:
                hidden;

            background:
                #f6f6f6;

        }


        .satori-main-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                contain;

            transition:
                opacity .25s ease,
                transform .45s ease;

        }


        .satori-main-image:hover img {

            transform:
                scale(1.02);

        }


        .satori-thumbnails {

            display:
                grid;

            grid-template-columns:
                repeat(
                    5,
                    1fr
                );

            gap:
                10px;

            margin-top:
                12px;

        }


        .satori-thumb {

            display:
                block;

            padding:
                0;

            border:
                1px solid
                transparent;

            background:
                #f5f5f5;

            aspect-ratio:
                1 / 1;

            overflow:
                hidden;

            cursor:
                pointer;

        }


        .satori-thumb.active {

            border-color:
                var(--s-red);

        }


        .satori-thumb img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

        }


        .satori-product-image-empty {

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            aspect-ratio:
                1 / 1;

            background:
                var(--s-light);

            color:
                var(--s-red);

            font-family:
                var(--s-heading);

            font-size:
                60px;

            font-weight:
                900;

        }


        /* ==========================================
           INFORMACIÓN PRODUCTO
        ========================================== */

        .satori-product-info {

            min-width:
                0;

            padding:
                2px 0 0;

        }


        .satori-product-category {

            margin-bottom:
                12px;

            color:
                #777777;

            font-size:
                10px;

            line-height:
                1.2;

            font-weight:
                800;

            letter-spacing:
                .14em;

            text-transform:
                uppercase;

        }


        .satori-product-title {

            margin:
                0;

            font-family:
                var(--s-heading);

            font-size:
                clamp(
                    46px,
                    5vw,
                    72px
                );

            line-height:
                .88;

            font-weight:
                900;

            letter-spacing:
                -.025em;

            text-transform:
                uppercase;

        }


        .satori-product-subtitle {

            margin:
                10px 0 20px;

            color:
                #777777;

            font-size:
                12px;

            line-height:
                1.4;

            font-weight:
                600;

            letter-spacing:
                .04em;

            text-transform:
                uppercase;

        }


        .satori-price {

            margin:
                0 0 5px;

            color:
                var(--s-red);

            font-size:
                25px;

            line-height:
                1.2;

            font-weight:
                900;

        }


        .satori-tax {

            display:
                block;

            margin:
                0 0 28px;

            color:
                #888888;

            font-size:
                10px;

            line-height:
                1.4;

        }


        /* ==========================================
           OPCIONES
        ========================================== */

        .satori-option {

            margin:
                0 0 24px;

        }


        .satori-option-label {

            display:
                flex;

            justify-content:
                space-between;

            align-items:
                center;

            gap:
                15px;

            margin-bottom:
                10px;

            color:
                var(--s-black);

            font-size:
                10px;

            line-height:
                1.3;

            font-weight:
                900;

            letter-spacing:
                .07em;

            text-transform:
                uppercase;

        }


        .satori-option-label a {

            color:
                var(--s-black);

            font-size:
                9px;

            text-decoration:
                underline;

            text-underline-offset:
                3px;

        }


        .satori-option-label a:hover {

            color:
                var(--s-red);

        }


        /* ==========================================
           TALLAS
        ========================================== */

        .satori-size-list {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                7px;

        }


        .satori-size {

            min-width:
                48px;

            height:
                42px;

            padding:
                0 12px;

            border:
                1px solid
                #d5d5d5;

            background:
                #ffffff;

            color:
                var(--s-black);

            cursor:
                pointer;

            font-size:
                11px;

            font-weight:
                800;

            transition:
                .2s ease;

        }


        .satori-size:hover {

            border-color:
                var(--s-black);

        }


        .satori-size.active {

            border-color:
                var(--s-black);

            background:
                var(--s-black);

            color:
                #ffffff;

        }


        /* ==========================================
           COLORES
        ========================================== */

        .satori-color-list {

            display:
                flex;

            gap:
                10px;

        }


        .satori-color {

            width:
                34px;

            height:
                34px;

            padding:
                3px;

            border:
                1px solid
                #cccccc;

            border-radius:
                50%;

            background:
                #ffffff;

            cursor:
                pointer;

            transition:
                .2s ease;

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
                #aaaaaa;

            border-radius:
                50%;

        }


        .satori-color.active {

            border:
                2px solid
                var(--s-red);

        }


        /* ==========================================
           CANTIDAD
        ========================================== */

        .satori-quantity {

            display:
                flex;

            width:
                124px;

            height:
                46px;

            border:
                1px solid
                #cccccc;

            background:
                #ffffff;

        }


        .satori-quantity button {

            width:
                40px;

            padding:
                0;

            border:
                0;

            background:
                #ffffff;

            color:
                var(--s-black);

            cursor:
                pointer;

            font-size:
                18px;

            line-height:
                1;

        }


        .satori-quantity button:hover {

            background:
                #f5f5f5;

        }


        .satori-quantity span {

            flex:
                1;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            font-size:
                12px;

            font-weight:
                800;

        }


        /* ==========================================
           COMPRA
        ========================================== */

        .satori-buy-row {

            display:
                grid;

            grid-template-columns:
                124px
                minmax(
                    0,
                    1fr
                );

            gap:
                10px;

            margin-top:
                6px;

        }


        .satori-add-to-cart {

            min-height:
                46px;

            padding:
                0 18px;

            border:
                0;

            background:
                var(--s-red);

            color:
                #ffffff;

            cursor:
                pointer;

            font-size:
                11px;

            line-height:
                1.2;

            font-weight:
                900;

            letter-spacing:
                .06em;

            text-transform:
                uppercase;

            transition:
                .2s ease;

        }


        .satori-add-to-cart:hover {

            background:
                #c90025;

            transform:
                translateY(-1px);

        }


        .satori-favorite {

            width:
                100%;

            min-height:
                44px;

            margin-top:
                10px;

            border:
                1px solid
                #cccccc;

            background:
                #ffffff;

            color:
                var(--s-black);

            cursor:
                pointer;

            font-size:
                10px;

            line-height:
                1.2;

            font-weight:
                800;

            letter-spacing:
                .05em;

            text-transform:
                uppercase;

            transition:
                .2s ease;

        }


        .satori-favorite:hover {

            border-color:
                var(--s-black);

        }


        .satori-favorite.active {

            border-color:
                var(--s-red);

            color:
                var(--s-red);

        }


        /* ==========================================
           BENEFICIOS
        ========================================== */

        .satori-benefits {

            display:
                grid;

            grid-template-columns:
                repeat(
                    3,
                    1fr
                );

            margin-top:
                26px;

            border-top:
                1px solid
                var(--s-border);

            border-bottom:
                1px solid
                var(--s-border);

        }


        .satori-benefit {

            min-width:
                0;

            padding:
                17px 8px;

            text-align:
                center;

            border-right:
                1px solid
                var(--s-border);

        }


        .satori-benefit:last-child {

            border-right:
                0;

        }


        .satori-benefit strong {

            display:
                block;

            margin-bottom:
                5px;

            font-size:
                9px;

            line-height:
                1.3;

            font-weight:
                900;

        }


        .satori-benefit span {

            display:
                block;

            color:
                #777777;

            font-size:
                9px;

            line-height:
                1.45;

        }


        /* ==========================================
           INFORMACIÓN / TABS
        ========================================== */

        .satori-information {

            margin:
                68px 0 0;

            border-top:
                1px solid
                var(--s-border);

        }


        .satori-tabs {

            display:
                flex;

            overflow-x:
                auto;

            border-bottom:
                1px solid
                var(--s-border);

            scrollbar-width:
                none;

        }


        .satori-tabs::-webkit-scrollbar {

            display:
                none;

        }


        .satori-tab {

            position:
                relative;

            flex:
                0 0 auto;

            padding:
                18px 22px;

            border:
                0;

            background:
                #ffffff;

            color:
                #888888;

            cursor:
                pointer;

            font-size:
                10px;

            line-height:
                1.2;

            font-weight:
                900;

            letter-spacing:
                .05em;

            text-transform:
                uppercase;

        }


        .satori-tab.active {

            color:
                var(--s-black);

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
                3px;

            background:
                var(--s-red);

        }


        .satori-tab-panel {

            display:
                none;

            max-width:
                900px;

            padding:
                34px 5px 10px;

        }


        .satori-tab-panel.active {

            display:
                block;

        }


        .satori-panel-intro {

            margin-bottom:
                18px;

        }


        .satori-panel-intro span {

            display:
                block;

            margin-bottom:
                6px;

            color:
                var(--s-red);

            font-size:
                9px;

            line-height:
                1.2;

            font-weight:
                900;

            letter-spacing:
                .12em;

        }


        .satori-tab-panel h2 {

            margin:
                0;

            font-family:
                var(--s-heading);

            font-size:
                30px;

            line-height:
                .95;

            font-weight:
                900;

            text-transform:
                uppercase;

        }


        .satori-tab-panel p {

            max-width:
                800px;

            margin:
                0 0 15px;

            color:
                #555555;

            font-size:
                13px;

            line-height:
                1.75;

        }


        /* ==========================================
           DETALLES
        ========================================== */

        .satori-detail-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    3,
                    1fr
                );

            gap:
                1px;

            border:
                1px solid
                var(--s-border);

            background:
                var(--s-border);

        }


        .satori-detail-grid div {

            padding:
                20px;

            background:
                #ffffff;

        }


        .satori-detail-grid span {

            display:
                block;

            margin-bottom:
                7px;

            color:
                #888888;

            font-size:
                9px;

            line-height:
                1.2;

            font-weight:
                800;

            letter-spacing:
                .08em;

        }


        .satori-detail-grid strong {

            display:
                block;

            color:
                var(--s-black);

            font-size:
                12px;

            line-height:
                1.4;

            font-weight:
                700;

        }


        /* ==========================================
           ENVÍOS
        ========================================== */

        .satori-info-list {

            display:
                grid;

            gap:
                10px;

            margin-top:
                25px;

        }


        .satori-info-list div {

            padding:
                17px;

            background:
                var(--s-light);

        }


        .satori-info-list strong {

            display:
                block;

            margin-bottom:
                5px;

            font-size:
                10px;

            line-height:
                1.3;

            font-weight:
                900;

        }


        .satori-info-list span {

            color:
                #777777;

            font-size:
                11px;

            line-height:
                1.5;

        }


        /* ==========================================
           CUIDADOS
        ========================================== */

        .satori-tab-panel ul {

            margin:
                20px 0 0;

            padding-left:
                20px;

            color:
                #555555;

            font-size:
                13px;

            line-height:
                2;

        }


        /* ==========================================
           BANNER FULL WIDTH
        ========================================== */

        .satori-editorial {

            position:
                relative;

            width:
                100%;

            min-height:
                360px;

            margin:
                72px 0 0;

            overflow:
                hidden;

            background:
                var(--s-dark);

        }


        .satori-editorial img {

            position:
                absolute;

            inset:
                0;

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

            opacity:
                .58;

        }


        .satori-editorial::after {

            content:
                "";

            position:
                absolute;

            inset:
                0;

            background:
                linear-gradient(
                    90deg,
                    rgba(
                        16,
                        23,
                        39,
                        .98
                    ) 0%,
                    rgba(
                        16,
                        23,
                        39,
                        .82
                    ) 38%,
                    rgba(
                        16,
                        23,
                        39,
                        .35
                    ) 70%,
                    rgba(
                        16,
                        23,
                        39,
                        .12
                    ) 100%
                );

        }


        .satori-editorial-content {

            position:
                relative;

            z-index:
                2;

            min-height:
                360px;

            width:
                100%;

            max-width:
                1440px;

            margin:
                0 auto;

            padding:
                55px 42px;

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            color:
                #ffffff;

        }


        .satori-editorial-content span {

            display:
                block;

            margin-bottom:
                10px;

            color:
                var(--s-red);

            font-size:
                10px;

            line-height:
                1.2;

            font-weight:
                900;

            letter-spacing:
                .14em;

        }


        .satori-editorial-content h2 {

            max-width:
                700px;

            margin:
                0 0 14px;

            font-family:
                var(--s-heading);

            font-size:
                clamp(
                    46px,
                    6vw,
                    78px
                );

            line-height:
                .87;

            font-weight:
                900;

            letter-spacing:
                -.02em;

            text-transform:
                uppercase;

        }


        .satori-editorial-content p {

            max-width:
                500px;

            margin:
                0;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .82
                );

            font-size:
                12px;

            line-height:
                1.7;

        }


        /* ==========================================
           CONTENEDOR RECOMENDACIONES
        ========================================== */

        .satori-recommendations-wrapper {

            width:
                100%;

        }


        /* ==========================================
           RECOMENDACIONES
        ========================================== */

        .satori-recommendations {

            padding:
                70px 0 75px;

        }


        .satori-section-heading {

            display:
                flex;

            align-items:
                flex-end;

            justify-content:
                space-between;

            gap:
                20px;

            margin-bottom:
                26px;

        }


        .satori-section-heading span {

            display:
                block;

            margin-bottom:
                7px;

            color:
                var(--s-red);

            font-size:
                9px;

            line-height:
                1.2;

            font-weight:
                900;

            letter-spacing:
                .12em;

        }


        .satori-section-heading h2 {

            margin:
                0;

            font-family:
                var(--s-heading);

            font-size:
                40px;

            line-height:
                .9;

            font-weight:
                900;

            letter-spacing:
                -.015em;

            text-transform:
                uppercase;

        }


        .satori-section-heading a {

            flex:
                0 0 auto;

            color:
                var(--s-black);

            font-size:
                10px;

            line-height:
                1.2;

            font-weight:
                900;

            text-decoration:
                none;

            text-transform:
                uppercase;

        }


        .satori-section-heading a:hover {

            color:
                var(--s-red);

        }


        .satori-recommendation-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    4,
                    minmax(
                        0,
                        1fr
                    )
                );

            gap:
                18px;

        }


        .satori-recommendation {

            display:
                block;

            min-width:
                0;

            color:
                inherit;

            text-decoration:
                none;

        }


        .satori-rec-image {

            position:
                relative;

            width:
                100%;

            aspect-ratio:
                1 / 1.08;

            overflow:
                hidden;

            background:
                #f5f5f5;

        }


        .satori-rec-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

            transition:
                transform .45s ease;

        }


        .satori-recommendation:hover
        .satori-rec-image img {

            transform:
                scale(1.035);

        }


        .satori-rec-info {

            display:
                flex;

            flex-direction:
                column;

            gap:
                5px;

            padding:
                13px 2px;

        }


        .satori-rec-info strong {

            overflow:
                hidden;

            color:
                var(--s-black);

            font-size:
                12px;

            line-height:
                1.35;

            font-weight:
                800;

            white-space:
                nowrap;

            text-overflow:
                ellipsis;

        }


        .satori-rec-info span {

            color:
                var(--s-red);

            font-size:
                12px;

            line-height:
                1.3;

            font-weight:
                900;

        }


        /* ==========================================
           TABLET
        ========================================== */

        @media (
            max-width: 1100px
        ) {

            .satori-product-page {

                padding:
                    34px 28px 0;

            }


            .satori-product-layout {

                grid-template-columns:
                    minmax(
                        0,
                        1fr
                    )
                    minmax(
                        330px,
                        .8fr
                    );

                gap:
                    35px;

            }


            .satori-product-title {

                font-size:
                    clamp(
                        42px,
                        5vw,
                        60px
                    );

            }


            .satori-recommendation-grid {

                grid-template-columns:
                    repeat(
                        4,
                        minmax(
                            0,
                            1fr
                        )
                    );

                gap:
                    12px;

            }


            .satori-editorial-content {

                padding:
                    50px 28px;

            }

        }


        /* ==========================================
           TABLET / MOBILE
        ========================================== */

        @media (
            max-width: 900px
        ) {

            .satori-product-page {

                padding:
                    28px 20px 0;

            }


            .satori-product-layout {

                grid-template-columns:
                    1fr;

                gap:
                    34px;

            }


            .satori-product-info {

                padding:
                    0;

            }


            .satori-product-title {

                font-size:
                    clamp(
                        48px,
                        10vw,
                        64px
                    );

            }


            .satori-information {

                margin-top:
                    48px;

            }


            .satori-recommendation-grid {

                grid-template-columns:
                    repeat(
                        2,
                        minmax(
                            0,
                            1fr
                        )
                    );

                gap:
                    18px 14px;

            }


            .satori-editorial {

                min-height:
                    340px;

            }


            .satori-editorial-content {

                min-height:
                    340px;

            }

        }


        /* ==========================================
           MOBILE
        ========================================== */

        @media (
            max-width: 600px
        ) {

            .satori-product-page {

                padding:
                    18px 12px 0;

            }


            .satori-breadcrumb {

                margin-bottom:
                    18px;

                gap:
                    6px;

                font-size:
                    8px;

            }


            .satori-main-image {

                aspect-ratio:
                    1 / 1.03;

            }


            .satori-thumbnails {

                grid-template-columns:
                    repeat(
                        4,
                        1fr
                    );

                gap:
                    7px;

            }


            .satori-product-category {

                margin-bottom:
                    9px;

                font-size:
                    8px;

            }


            .satori-product-title {

                font-size:
                    clamp(
                        42px,
                        14vw,
                        54px
                    );

                line-height:
                    .88;

            }


            .satori-product-subtitle {

                margin:
                    8px 0 17px;

                font-size:
                    10px;

            }


            .satori-price {

                font-size:
                    22px;

            }


            .satori-tax {

                margin-bottom:
                    23px;

                font-size:
                    9px;

            }


            .satori-option {

                margin-bottom:
                    21px;

            }


            .satori-option-label {

                font-size:
                    9px;

            }


            .satori-option-label a {

                font-size:
                    8px;

            }


            .satori-size {

                min-width:
                    45px;

                height:
                    40px;

                font-size:
                    10px;

            }


            .satori-color {

                width:
                    32px;

                height:
                    32px;

            }


            .satori-quantity {

                width:
                    108px;

                height:
                    46px;

            }


            .satori-buy-row {

                grid-template-columns:
                    108px
                    minmax(
                        0,
                        1fr
                    );

                gap:
                    8px;

            }


            .satori-add-to-cart {

                padding:
                    0 8px;

                font-size:
                    9px;

            }


            .satori-favorite {

                font-size:
                    9px;

            }


            .satori-benefit {

                padding:
                    14px 5px;

            }


            .satori-benefit strong {

                font-size:
                    7px;

            }


            .satori-benefit span {

                font-size:
                    7px;

            }


            .satori-tabs {

                margin-left:
                    -12px;

                margin-right:
                    -12px;

                padding-left:
                    4px;

            }


            .satori-tab {

                padding:
                    16px 12px;

                font-size:
                    8px;

            }


            .satori-tab-panel {

                padding:
                    26px 0 8px;

            }


            .satori-panel-intro {

                margin-bottom:
                    15px;

            }


            .satori-panel-intro span {

                font-size:
                    8px;

            }


            .satori-tab-panel h2 {

                font-size:
                    27px;

            }


            .satori-tab-panel p {

                font-size:
                    12px;

                line-height:
                    1.7;

            }


            .satori-detail-grid {

                grid-template-columns:
                    repeat(
                        2,
                        minmax(
                            0,
                            1fr
                        )
                    );

            }


            .satori-detail-grid div {

                padding:
                    14px;

            }


            .satori-detail-grid span {

                font-size:
                    8px;

            }


            .satori-detail-grid strong {

                font-size:
                    10px;

            }


            .satori-info-list {

                margin-top:
                    20px;

            }


            .satori-info-list div {

                padding:
                    14px;

            }


            .satori-info-list strong {

                font-size:
                    9px;

            }


            .satori-info-list span {

                font-size:
                    10px;

            }


            /* ======================================
               BANNER MOBILE
            ====================================== */

            .satori-editorial {

                min-height:
                    360px;

                margin-top:
                    48px;

            }


            .satori-editorial img {

                object-position:
                    center;

                opacity:
                    .48;

            }


            .satori-editorial::after {

                background:
                    linear-gradient(
                        180deg,
                        rgba(
                            16,
                            23,
                            39,
                            .32
                        ) 0%,
                        rgba(
                            16,
                            23,
                            39,
                            .88
                        ) 65%,
                        rgba(
                            16,
                            23,
                            39,
                            .98
                        ) 100%
                    );

            }


            .satori-editorial-content {

                min-height:
                    360px;

                padding:
                    30px 20px;

                justify-content:
                    flex-end;

            }


            .satori-editorial-content span {

                font-size:
                    8px;

            }


            .satori-editorial-content h2 {

                max-width:
                    100%;

                font-size:
                    clamp(
                        42px,
                        13vw,
                        58px
                    );

                line-height:
                    .88;

            }


            .satori-editorial-content p {

                max-width:
                    100%;

                font-size:
                    10px;

                line-height:
                    1.65;

            }


            /* ======================================
               RECOMENDACIONES MOBILE
            ====================================== */

            .satori-recommendations {

                padding:
                    45px 0 55px;

            }


            .satori-section-heading {

                display:
                    block;

                margin-bottom:
                    22px;

            }


            .satori-section-heading span {

                font-size:
                    8px;

            }


            .satori-section-heading h2 {

                font-size:
                    32px;

                line-height:
                    .9;

            }


            .satori-section-heading a {

                display:
                    inline-block;

                margin-top:
                    11px;

                font-size:
                    9px;

            }


            .satori-recommendation-grid {

                grid-template-columns:
                    repeat(
                        2,
                        minmax(
                            0,
                            1fr
                        )
                    );

                gap:
                    20px 10px;

            }


            .satori-rec-info {

                padding:
                    10px 1px;

            }


            .satori-rec-info strong {

                font-size:
                    10px;

            }


            .satori-rec-info span {

                font-size:
                    10px;

            }

        }


        /* ==========================================
           MOBILE MUY PEQUEÑO
        ========================================== */

        @media (
            max-width: 380px
        ) {

            .satori-product-page {

                padding-left:
                    10px;

                padding-right:
                    10px;

            }


            .satori-product-title {

                font-size:
                    40px;

            }


            .satori-buy-row {

                grid-template-columns:
                    94px
                    1fr;

            }


            .satori-quantity {

                width:
                    94px;

            }


            .satori-quantity button {

                width:
                    31px;

            }


            .satori-add-to-cart {

                font-size:
                    8px;

            }


            .satori-editorial-content {

                padding-left:
                    17px;

                padding-right:
                    17px;

            }


            .satori-section-heading h2 {

                font-size:
                    29px;

            }

        }

    </style>

</head>


<body>


    <!-- =========================================
         HEADER
    ========================================== -->

    <script
        src="${root}js/header.js"
    ></script>


    <!-- =========================================
         CONTENIDO PRINCIPAL
    ========================================== -->

    <main
        class="satori-product-page"
    >


        <!-- ======================================
             BREADCRUMB
        ======================================= -->

        <div
            class="satori-breadcrumb"
        >

            <span>
                INICIO
            </span>

            <span>
                /
            </span>

            <span>
                ${escapeHTML(
                    category
                )}
            </span>

            <span>
                /
            </span>

            <span>
                ${escapeHTML(
                    product.name
                )}
            </span>

        </div>


        <!-- ======================================
             PRODUCTO
        ======================================= -->

        <section
            class="satori-product-layout"
        >


            ${gallery}


            <div
                class="satori-product-info"
            >

                <div
                    class="satori-product-category"
                >
                    ${escapeHTML(
                        product.collection ||
                        product.category ||
                        "SATORII"
                    )}
                </div>


                <h1
                    class="satori-product-title"
                >
                    ${escapeHTML(
                        product.name
                    )}
                </h1>


                <div
                    class="satori-product-subtitle"
                >
                    SATORII · ANIME STREETWEAR
                </div>


                <div
                    class="satori-price"
                >
                    ${formatPrice(
                        product.price
                    )}
                </div>


                <span
                    class="satori-tax"
                >
                    Impuestos incluidos.
                </span>


                <!-- ==================================
                     TALLA
                =================================== -->

                <div
                    class="satori-option"
                >

                    <div
                        class="satori-option-label"
                    >

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


                    <div
                        class="satori-size-list"
                    >

                        ${sizes}

                    </div>

                </div>


                <!-- ==================================
                     COLOR
                =================================== -->

                <div
                    class="satori-option"
                >

                    <div
                        class="satori-option-label"
                    >

                        <span>
                            COLOR
                        </span>

                        <span
                            id="selectedColorLabel"
                        >
                            ${escapeHTML(
                                product.colors?.[0] ||
                                "NEGRO"
                            )}
                        </span>

                    </div>


                    <div
                        class="satori-color-list"
                    >

                        ${colors}

                    </div>

                </div>


                <!-- ==================================
                     CANTIDAD
                =================================== -->

                <div
                    class="satori-option"
                >

                    <div
                        class="satori-option-label"
                    >

                        <span>
                            CANTIDAD
                        </span>

                    </div>


                    <div
                        class="satori-quantity"
                    >

                        <button
                            type="button"
                            data-quantity-minus
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
                            data-quantity-plus
                            aria-label="Aumentar cantidad"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- ==================================
                     COMPRA
                =================================== -->

                <div
                    class="satori-buy-row"
                >

                    <div
                        class="satori-quantity"
                    >

                        <button
                            type="button"
                            data-quantity-minus
                            aria-label="Disminuir cantidad"
                        >
                            −
                        </button>

                        <span
                            id="satoriQuantityBottom"
                        >
                            1
                        </span>

                        <button
                            type="button"
                            data-quantity-plus
                            aria-label="Aumentar cantidad"
                        >
                            +
                        </button>

                    </div>


                    <button
                        id="addToCart"
                        class="satori-add-to-cart add-to-cart"
                        type="button"

                        data-product-id="${escapeHTML(
                            product.id
                        )}"

                        data-product-name="${escapeHTML(
                            product.name
                        )}"

                        data-product-price="${Number(
                            product.price
                        )}"

                        data-product-image="${escapeHTML(
                            firstImage
                        )}"

                        data-product-url="${escapeHTML(
                            productUrl
                        )}"
                    >
                        AGREGAR AL CARRITO
                    </button>

                </div>


                <button
                    type="button"
                    id="satoriFavorite"
                    class="satori-favorite"
                >
                    ♡ &nbsp; AGREGAR A FAVORITOS
                </button>


                <!-- ==================================
                     BENEFICIOS
                =================================== -->

                <div
                    class="satori-benefits"
                >

                    <div
                        class="satori-benefit"
                    >

                        <strong>
                            🚚 ENVÍOS A TODO CHILE
                        </strong>

                        <span>
                            Despachamos a todo el país.
                        </span>

                    </div>


                    <div
                        class="satori-benefit"
                    >

                        <strong>
                            ↻ CAMBIOS
                        </strong>

                        <span>
                            Cambios y devoluciones.
                        </span>

                    </div>


                    <div
                        class="satori-benefit"
                    >

                        <strong>
                            ◉ PAGO SEGURO
                        </strong>

                        <span>
                            Compra protegida.
                        </span>

                    </div>

                </div>

            </div>

        </section>


        <!-- =========================================
             INFORMACIÓN
        ========================================== -->

        ${tabs}

    </main>


    <!-- =========================================
         BANNER FULL WIDTH
    ========================================== -->

    <section
        class="satori-editorial"
    >

        <img
            src="${escapeHTML(
                bannerImage
            )}"
            alt=""
            loading="lazy"
        >


        <div
            class="satori-editorial-content"
        >

            <span>
                SATORII · ANIME ARCHIVE
            </span>


            <h2>
                ${escapeHTML(
                    getBannerTitle(
                        product
                    )
                )}
            </h2>


            <p>
                ${escapeHTML(
                    getBannerText(
                        product
                    )
                )}
            </p>

        </div>

    </section>


    <!-- =========================================
         RECOMENDACIONES
    ========================================== -->

    <main
        class="satori-product-page satori-recommendations-wrapper"
    >

        ${recommendations}

    </main>


    <!-- =========================================
         FOOTER
    ========================================== -->

    <div
        id="satori-footer"
    ></div>


    <!-- =========================================
         SCRIPTS
    ========================================== -->

    <script
        src="${root}js/products.js"
    ></script>


    <script
        src="${root}js/cart.js"
    ></script>


    <script
        src="${root}js/footer.js"
    ></script>


    <!-- =========================================
         INTERACCIONES PRODUCTO
    ========================================== -->

    <script>

        (function () {

            "use strict";


            /* =========================================
               GALERÍA
            ========================================== */

            const mainImage =
                document.getElementById(
                    "satoriMainProductImage"
                );


            const thumbnails =
                Array.from(
                    document.querySelectorAll(
                        ".satori-thumb"
                    )
                );


            let currentImage =
                0;


            function changeImage(index) {

                if (
                    !thumbnails.length ||
                    !mainImage
                ) {

                    return;

                }


                if (
                    index < 0
                ) {

                    index =
                        thumbnails.length - 1;

                }


                if (
                    index >=
                    thumbnails.length
                ) {

                    index =
                        0;

                }


                currentImage =
                    index;


                const button =
                    thumbnails[
                        currentImage
                    ];


                mainImage.style.opacity =
                    "0";


                setTimeout(
                    function () {

                        mainImage.src =
                            button.dataset.image;

                        mainImage.style.opacity =
                            "1";

                    },
                    120
                );


                thumbnails.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }


            thumbnails.forEach(
                function (
                    button,
                    index
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            changeImage(
                                index
                            );

                        }
                    );

                }
            );


            /* =========================================
               TALLAS
            ========================================== */

            document
                .querySelectorAll(
                    ".satori-size"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                document
                                    .querySelectorAll(
                                        ".satori-size"
                                    )
                                    .forEach(
                                        function (item) {

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


            /* =========================================
               COLORES
            ========================================== */

            document
                .querySelectorAll(
                    ".satori-color"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                document
                                    .querySelectorAll(
                                        ".satori-color"
                                    )
                                    .forEach(
                                        function (item) {

                                            item.classList.remove(
                                                "active"
                                            );

                                        }
                                    );


                                button.classList.add(
                                    "active"
                                );


                                const label =
                                    document.getElementById(
                                        "selectedColorLabel"
                                    );


                                if (label) {

                                    label.textContent =
                                        button.dataset.color;

                                }

                            }
                        );

                    }
                );


            /* =========================================
               CANTIDAD
            ========================================== */

            let quantity =
                1;


            const quantityDisplays =
                document.querySelectorAll(
                    "#satoriQuantity, #satoriQuantityBottom"
                );


            function updateQuantity() {

                quantityDisplays
                    .forEach(
                        function (element) {

                            element.textContent =
                                quantity;

                        }
                    );

            }


            document
                .querySelectorAll(
                    "[data-quantity-minus]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                quantity =
                                    Math.max(
                                        1,
                                        quantity - 1
                                    );

                                updateQuantity();

                            }
                        );

                    }
                );


            document
                .querySelectorAll(
                    "[data-quantity-plus]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                quantity =
                                    Math.min(
                                        20,
                                        quantity + 1
                                    );

                                updateQuantity();

                            }
                        );

                    }
                );


            /* =========================================
               FAVORITOS
            ========================================== */

            const favorite =
                document.getElementById(
                    "satoriFavorite"
                );


            if (favorite) {

                const key =
                    "satorii_favorites";


                let favorites =
                    [];


                try {

                    favorites =
                        JSON.parse(
                            localStorage.getItem(
                                key
                            )
                        ) || [];

                }

                catch (
                    error
                ) {

                    favorites = [];

                }


                const productId =
                    "${escapeHTML(
                        product.id
                    )}";


                if (
                    favorites.includes(
                        productId
                    )
                ) {

                    favorite.classList.add(
                        "active"
                    );

                    favorite.innerHTML =
                        "♥ &nbsp; EN FAVORITOS";

                }


                favorite.addEventListener(
                    "click",
                    function () {

                        const index =
                            favorites.indexOf(
                                productId
                            );


                        if (
                            index === -1
                        ) {

                            favorites.push(
                                productId
                            );

                            favorite.classList.add(
                                "active"
                            );

                            favorite.innerHTML =
                                "♥ &nbsp; EN FAVORITOS";

                        }

                        else {

                            favorites.splice(
                                index,
                                1
                            );

                            favorite.classList.remove(
                                "active"
                            );

                            favorite.innerHTML =
                                "♡ &nbsp; AGREGAR A FAVORITOS";

                        }


                        localStorage.setItem(
                            key,
                            JSON.stringify(
                                favorites
                            )
                        );

                    }
                );

            }


            /* =========================================
               TABS
            ========================================== */

            const tabs =
                document.querySelectorAll(
                    ".satori-tab"
                );


            const panels =
                document.querySelectorAll(
                    ".satori-tab-panel"
                );


            tabs.forEach(
                function (tab) {

                    tab.addEventListener(
                        "click",
                        function () {

                            const target =
                                tab.dataset.tab;


                            tabs.forEach(
                                function (item) {

                                    item.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            panels.forEach(
                                function (panel) {

                                    panel.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            tab.classList.add(
                                "active"
                            );


                            const targetPanel =
                                document.querySelector(
                                    '[data-panel="' +
                                    target +
                                    '"]'
                                );


                            if (
                                targetPanel
                            ) {

                                targetPanel.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }
            );


        })();

    </script>


</body>

</html>`;


    fs.writeFileSync(
        outputPath,
        html,
        "utf8"
    );


    console.log(
        `✓ Generado: ${productUrl}`
    );

}


/* =========================================================
   GENERAR TODO
========================================================= */

function generateAll() {

    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "SATORII · GENERADOR DE PRODUCTOS"
    );

    console.log(
        "DISEÑO 2 · ANIME STREETWEAR"
    );

    console.log(
        "=============================================="
    );

    console.log("");


    const products =
        loadProducts();


    const availableProducts =
        products.filter(
            product =>
                product.available !== false
        );


    if (
        !availableProducts.length
    ) {

        console.warn(
            "No hay productos disponibles."
        );

        return;

    }


    fs.mkdirSync(
        PRODUCTS_DIR,
        {
            recursive:
                true
        }
    );


    let generated =
        0;


    availableProducts.forEach(
        function (product) {

            try {

                generateProductPage(
                    product,
                    availableProducts
                );

                generated++;

            }

            catch (
                error
            ) {

                console.error(
                    `✗ Error generando ${product.id}:`,
                    error
                );

            }

        }
    );


    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        `✓ ${generated} páginas generadas`
    );

    console.log(
        "=============================================="
    );

    console.log("");

}


/* =========================================================
   EJECUTAR
========================================================= */

try {

    generateAll();

}

catch (
    error
) {

    console.error(
        "SATORII · Error fatal:",
        error
    );

    process.exit(
        1
    );

}
