/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 2 · SATORII ANIME STREETWEAR

   ESTRUCTURA:

   HEADER
   ↓
   GALERÍA + INFORMACIÓN PRODUCTO
   ↓
   COMPRA
   ↓
   BENEFICIOS
   ↓
   TABS
   ↓
   BANNER ANIME / EDITORIAL
   ↓
   RECOMENDACIONES ALEATORIAS
   ↓
   FOOTER

   Responsive:
   Desktop + Tablet + Mobile

   Fuente:
   js/products.js

   Salida:
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

    /*
     * Banner SATORII por defecto.
     *
     * Se utiliza banner-02.webp porque
     * ya existe dentro del repositorio.
     */

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


    /*
     * Primero intentamos utilizar
     * productos de la misma colección.
     */

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

                <button
                    class="satori-gallery-arrow left"
                    type="button"
                    data-gallery-prev
                    aria-label="Imagen anterior"
                >
                    ‹
                </button>

                <img
                    id="satoriMainProductImage"
                    src="${escapeHTML(mainImage)}"
                    alt="${escapeHTML(product.name)}"
                >

                <button
                    class="satori-gallery-arrow right"
                    type="button"
                    data-gallery-next
                    aria-label="Imagen siguiente"
                >
                    ›
                </button>

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


    const sizes =
        getSizeGuide(
            product
        );


    const sizeRows =
        sizes
            .map(
                item => `

                    <tr>

                        <td>
                            ${escapeHTML(
                                item.size
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                item.width || "-"
                            )} cm
                        </td>

                        <td>
                            ${escapeHTML(
                                item.length || "-"
                            )} cm
                        </td>

                        <td>
                            ${escapeHTML(
                                item.sleeve || "-"
                            )} cm
                        </td>

                    </tr>

                `
            )
            .join("");


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
                    data-tab="sizes"
                >
                    GUÍA DE TALLAS
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


            <div
                class="satori-tab-panel active"
                data-panel="description"
            >

                <h2>
                    Sobre esta pieza
                </h2>

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


            <div
                class="satori-tab-panel"
                data-panel="sizes"
            >

                <div class="satori-size-guide">

                    <div class="satori-size-guide-head">

                        <div>
                            <strong>
                                GUÍA DE TALLAS
                            </strong>

                            <span>
                                Medidas aproximadas en centímetros
                            </span>
                        </div>

                        <a
                            href="${getRootPrefix(
                                product.url ||
                                normalizeProductUrl(
                                    product
                                )
                            )}guia-tallas.html"
                        >
                            VER GUÍA COMPLETA →
                        </a>

                    </div>


                    <div class="satori-table-wrap">

                        <table>

                            <thead>

                                <tr>
                                    <th>TALLA</th>
                                    <th>ANCHO</th>
                                    <th>LARGO</th>
                                    <th>MANGA</th>
                                </tr>

                            </thead>

                            <tbody>

                                ${sizeRows}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            <div
                class="satori-tab-panel"
                data-panel="shipping"
            >

                <h2>
                    Envíos y devoluciones
                </h2>

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
                            Revisa nuestras condiciones antes de realizar tu compra.
                        </span>
                    </div>

                    <div>
                        <strong>
                            PAGO SEGURO
                        </strong>

                        <span>
                            Compra mediante nuestros medios de pago disponibles.
                        </span>
                    </div>

                </div>

            </div>


            <div
                class="satori-tab-panel"
                data-panel="care"
            >

                <h2>
                    Cuidados de la prenda
                </h2>

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

                    return `

                        <a
                            class="satori-recommendation"
                            href="${getRootPrefix(
                                productUrl
                            )}${url.replace(
                                /^productos\//,
                                "productos/"
                            )}"
                        >

                            <div class="satori-rec-image">

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

                            <div class="satori-rec-info">

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

        <section class="satori-recommendations">

            <div class="satori-section-heading">

                <div>

                    <span>
                        SATORII / SELECCIÓN
                    </span>

                    <h2>
                        TAMBIÉN TE PUEDE GUSTAR
                    </h2>

                </div>

                <a
                    href="${getRootPrefix(
                        productUrl
                    )}anime.html"
                >
                    VER COLECCIÓN →
                </a>

            </div>


            <div class="satori-recommendation-grid">

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
            recursive: true
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

<html
    lang="es"
>

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


    <!-- FUENTES -->

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


    <!-- CSS GLOBAL -->

    <link
        rel="stylesheet"
        href="${root}css/style.css"
    >


    <!-- CSS PRODUCTO -->

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

        }


        * {
            box-sizing:
                border-box;
        }


        body {

            margin:
                0;

            background:
                #fff;

            color:
                var(--s-black);

            font-family:
                "Inter",
                sans-serif;

        }


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


        .satori-breadcrumb {

            display:
                flex;

            gap:
                8px;

            margin:
                0 0 28px;

            font-size:
                11px;

            font-weight:
                700;

            letter-spacing:
                .08em;

            text-transform:
                uppercase;

            color:
                #888;

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
                minmax(0, 1.15fr)
                minmax(390px, .85fr);

            gap:
                58px;

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

            position:
                relative;

            width:
                100%;

            aspect-ratio:
                1 / 1;

            background:
                #f7f7f7;

            overflow:
                hidden;

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

            mix-blend-mode:
                multiply;

            transition:
                opacity .25s ease,
                transform .45s ease;

        }


        .satori-main-image:hover img {

            transform:
                scale(1.025);

        }


        .satori-gallery-arrow {

            position:
                absolute;

            top:
                50%;

            transform:
                translateY(-50%);

            z-index:
                2;

            width:
                42px;

            height:
                42px;

            border:
                1px solid rgba(
                    0,
                    0,
                    0,
                    .12
                );

            background:
                rgba(
                    255,
                    255,
                    255,
                    .92
                );

            cursor:
                pointer;

            font-size:
                25px;

            line-height:
                1;

        }


        .satori-gallery-arrow.left {

            left:
                15px;

        }


        .satori-gallery-arrow.right {

            right:
                15px;

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

            object-fit:
                cover;

        }


        /* ==========================================
           INFO
        ========================================== */

        .satori-product-info {

            padding:
                2px 0 0;

        }


        .satori-product-category {

            margin-bottom:
                12px;

            font-size:
                10px;

            font-weight:
                800;

            letter-spacing:
                .14em;

            text-transform:
                uppercase;

            color:
                #777;

        }


        .satori-product-title {

            margin:
                0;

            font-family:
                "Barlow Condensed",
                sans-serif;

            font-size:
                clamp(
                    42px,
                    4.5vw,
                    70px
                );

            line-height:
                .9;

            font-weight:
                900;

            text-transform:
                uppercase;

            letter-spacing:
                -.025em;

        }


        .satori-product-subtitle {

            margin:
                8px 0 18px;

            font-family:
                "Barlow Condensed",
                sans-serif;

            font-size:
                18px;

            color:
                #777;

        }


        .satori-price {

            margin:
                0 0 22px;

            color:
                var(--s-red);

            font-size:
                25px;

            font-weight:
                900;

        }


        .satori-tax {

            display:
                block;

            margin-top:
                -17px;

            margin-bottom:
                26px;

            color:
                #888;

            font-size:
                11px;

        }


        .satori-option {

            margin:
                0 0 23px;

        }


        .satori-option-label {

            display:
                flex;

            justify-content:
                space-between;

            align-items:
                center;

            margin-bottom:
                10px;

            font-size:
                11px;

            font-weight:
                800;

            letter-spacing:
                .06em;

            text-transform:
                uppercase;

        }


        .satori-option-label a {

            color:
                var(--s-black);

            text-decoration:
                underline;

        }


        .satori-size-list {

            display:
                flex;

            gap:
                7px;

            flex-wrap:
                wrap;

        }


        .satori-size {

            min-width:
                48px;

            height:
                42px;

            border:
                1px solid
                #d5d5d5;

            background:
                white;

            cursor:
                pointer;

            font-size:
                12px;

            font-weight:
                800;

        }


        .satori-size.active {

            border-color:
                var(--s-black);

            background:
                var(--s-black);

            color:
                white;

        }


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
                #ccc;

            background:
                white;

            border-radius:
                50%;

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
                #aaa;

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
                44px;

            border:
                1px solid
                #ccc;

        }


        .satori-quantity button {

            width:
                40px;

            border:
                0;

            background:
                white;

            cursor:
                pointer;

            font-size:
                18px;

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
                13px;

            font-weight:
                700;

        }


        /* ==========================================
           CTA
        ========================================== */

        .satori-buy-row {

            display:
                grid;

            grid-template-columns:
                124px
                1fr;

            gap:
                10px;

            margin-top:
                5px;

        }


        .satori-add-to-cart {

            min-height:
                52px;

            border:
                0;

            background:
                var(--s-red);

            color:
                white;

            cursor:
                pointer;

            font-size:
                12px;

            font-weight:
                900;

            letter-spacing:
                .05em;

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
                46px;

            margin-top:
                10px;

            border:
                1px solid
                #ccc;

            background:
                white;

            cursor:
                pointer;

            font-size:
                11px;

            font-weight:
                800;

            text-transform:
                uppercase;

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

            border-top:
                1px solid
                var(--s-border);

            border-bottom:
                1px solid
                var(--s-border);

            margin-top:
                26px;

        }


        .satori-benefit {

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

            font-weight:
                900;

        }


        .satori-benefit span {

            display:
                block;

            color:
                #777;

            font-size:
                8px;

            line-height:
                1.3;

        }


        /* ==========================================
           TABS
        ========================================== */

        .satori-information {

            margin:
                65px 0 0;

            border-top:
                1px solid
                var(--s-border);

        }


        .satori-tabs {

            display:
                flex;

            overflow-x:
                auto;

            scrollbar-width:
                none;

            border-bottom:
                1px solid
                var(--s-border);

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
                18px 21px;

            border:
                0;

            background:
                white;

            cursor:
                pointer;

            color:
                #888;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .04em;

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

            bottom:
                -1px;

            left:
                0;

            right:
                0;

            height:
                3px;

            background:
                var(--s-red);

        }


        .satori-tab-panel {

            display:
                none;

            padding:
                30px 5px 10px;

            max-width:
                900px;

        }


        .satori-tab-panel.active {

            display:
                block;

        }


        .satori-tab-panel h2 {

            margin:
                0 0 15px;

            font-family:
                "Barlow Condensed",
                sans-serif;

            font-size:
                28px;

            text-transform:
                uppercase;

        }


        .satori-tab-panel p {

            max-width:
                800px;

            margin:
                0 0 14px;

            color:
                #555;

            font-size:
                13px;

            line-height:
                1.8;

        }


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

            background:
                var(--s-border);

            border:
                1px solid
                var(--s-border);

        }


        .satori-detail-grid div {

            padding:
                18px;

            background:
                white;

        }


        .satori-detail-grid span {

            display:
                block;

            margin-bottom:
                7px;

            color:
                #888;

            font-size:
                9px;

            font-weight:
                800;

            letter-spacing:
                .08em;

        }


        .satori-detail-grid strong {

            display:
                block;

            font-size:
                12px;

        }


        .satori-size-guide-head {

            display:
                flex;

            justify-content:
                space-between;

            gap:
                20px;

            margin-bottom:
                20px;

        }


        .satori-size-guide-head strong {

            display:
                block;

            font-size:
                13px;

        }


        .satori-size-guide-head span {

            display:
                block;

            margin-top:
                5px;

            color:
                #888;

            font-size:
                11px;

        }


        .satori-size-guide-head a {

            color:
                var(--s-red);

            font-size:
                10px;

            font-weight:
                900;

            white-space:
                nowrap;

        }


        .satori-table-wrap {

            overflow-x:
                auto;

        }


        .satori-table-wrap table {

            width:
                100%;

            border-collapse:
                collapse;

            min-width:
                500px;

        }


        .satori-table-wrap th,
        .satori-table-wrap td {

            padding:
                14px;

            border-bottom:
                1px solid
                var(--s-border);

            text-align:
                left;

            font-size:
                11px;

        }


        .satori-table-wrap th {

            font-size:
                9px;

            letter-spacing:
                .07em;

        }


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

        }


        .satori-info-list span {

            color:
                #777;

            font-size:
                11px;

        }


        .satori-tab-panel ul {

            padding-left:
                20px;

            color:
                #555;

            font-size:
                13px;

            line-height:
                2;

        }


        /* ==========================================
           BANNER ANIME
        ========================================== */

        .satori-editorial {

            position:
                relative;

            min-height:
                310px;

            margin:
                65px 0 0;

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

            object-fit:
                cover;

            opacity:
                .55;

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
                        .72
                    ) 45%,
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
                310px;

            max-width:
                650px;

            padding:
                55px;

            display:
                flex;

            justify-content:
                center;

            flex-direction:
                column;

            color:
                white;

        }


        .satori-editorial-content span {

            margin-bottom:
                10px;

            color:
                var(--s-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .14em;

        }


        .satori-editorial-content h2 {

            margin:
                0 0 12px;

            font-family:
                "Barlow Condensed",
                sans-serif;

            font-size:
                clamp(
                    40px,
                    5vw,
                    65px
                );

            line-height:
                .9;

            text-transform:
                uppercase;

        }


        .satori-editorial-content p {

            max-width:
                460px;

            margin:
                0;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .78
                );

            font-size:
                12px;

            line-height:
                1.7;

        }


        /* ==========================================
           RECOMENDACIONES
        ========================================== */

        .satori-recommendations {

            padding:
                65px 0;

        }


        .satori-section-heading {

            display:
                flex;

            justify-content:
                space-between;

            align-items:
                end;

            gap:
                20px;

            margin-bottom:
                25px;

        }


        .satori-section-heading span {

            display:
                block;

            margin-bottom:
                6px;

            color:
                var(--s-red);

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                .12em;

        }


        .satori-section-heading h2 {

            margin:
                0;

            font-family:
                "Barlow Condensed",
                sans-serif;

            font-size:
                38px;

            line-height:
                .9;

            text-transform:
                uppercase;

        }


        .satori-section-heading a {

            color:
                var(--s-black);

            font-size:
                10px;

            font-weight:
                900;

        }


        .satori-recommendation-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    4,
                    1fr
                );

            gap:
                16px;

        }


        .satori-recommendation {

            display:
                block;

            color:
                inherit;

            text-decoration:
                none;

        }


        .satori-rec-image {

            position:
                relative;

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
                transform .4s ease;

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
                4px;

            padding:
                13px 2px;

        }


        .satori-rec-info strong {

            font-size:
                12px;

            font-weight:
                800;

        }


        .satori-rec-info span {

            color:
                var(--s-red);

            font-size:
                12px;

            font-weight:
                900;

        }


        /* ==========================================
           MOBILE
        ========================================== */

        @media (
            max-width: 900px
        ) {

            .satori-product-page {

                padding:
                    25px 18px 0;

            }


            .satori-product-layout {

                grid-template-columns:
                    1fr;

                gap:
                    28px;

            }


            .satori-product-title {

                font-size:
                    52px;

            }


            .satori-main-image {

                aspect-ratio:
                    1 / 1.04;

            }


            .satori-information {

                margin-top:
                    40px;

            }


            .satori-recommendation-grid {

                grid-template-columns:
                    repeat(
                        2,
                        1fr
                    );

                gap:
                    14px;

            }


            .satori-detail-grid {

                grid-template-columns:
                    repeat(
                        2,
                        1fr
                    );

            }

        }


        @media (
            max-width: 600px
        ) {

            .satori-product-page {

                padding:
                    17px 12px 0;

            }


            .satori-breadcrumb {

                margin-bottom:
                    15px;

                font-size:
                    8px;

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


            .satori-gallery-arrow {

                width:
                    34px;

                height:
                    34px;

                font-size:
                    20px;

            }


            .satori-product-title {

                font-size:
                    44px;

            }


            .satori-product-subtitle {

                font-size:
                    15px;

            }


            .satori-price {

                font-size:
                    22px;

            }


            .satori-benefits {

                grid-template-columns:
                    repeat(
                        3,
                        1fr
                    );

            }


            .satori-benefit {

                padding:
                    14px 4px;

            }


            .satori-benefit strong {

                font-size:
                    8px;

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
                    5px;

            }


            .satori-tab {

                padding:
                    16px 12px;

                font-size:
                    8px;

            }


            .satori-tab-panel {

                padding:
                    24px 0 5px;

            }


            .satori-detail-grid {

                grid-template-columns:
                    1fr 1fr;

            }


            .satori-detail-grid div {

                padding:
                    13px;

            }


            .satori-size-guide-head {

                display:
                    block;

            }


            .satori-size-guide-head a {

                display:
                    inline-block;

                margin-top:
                    12px;

            }


            .satori-editorial {

                min-height:
                    330px;

                margin-top:
                    42px;

            }


            .satori-editorial-content {

                min-height:
                    330px;

                padding:
                    30px 23px;

                justify-content:
                    end;

            }


            .satori-editorial-content h2 {

                font-size:
                    46px;

            }


            .satori-recommendations {

                padding:
                    45px 0;

            }


            .satori-section-heading {

                display:
                    block;

            }


            .satori-section-heading h2 {

                font-size:
                    32px;

            }


            .satori-section-heading a {

                display:
                    inline-block;

                margin-top:
                    12px;

            }


            .satori-buy-row {

                grid-template-columns:
                    110px
                    1fr;

            }


            .satori-quantity {

                width:
                    110px;

            }

        }

    </style>

</head>


<body>


    <!-- HEADER -->

    <script
        src="${root}js/header.js"
    ></script>


    <main
        class="satori-product-page"
    >

        <div class="satori-breadcrumb">

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


        <!-- =========================================
             PRODUCTO
        ========================================== -->

        <section
            class="satori-product-layout"
        >


            ${gallery}


            <div
                class="satori-product-info"
            >

                <div class="satori-product-category">

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


                <!-- TALLA -->

                <div class="satori-option">

                    <div
                        class="satori-option-label"
                    >

                        <span>
                            TALLA
                        </span>

                        <a
                            href="${root}guia-tallas.html"
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


                <!-- COLOR -->

                <div class="satori-option">

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


                <!-- CANTIDAD -->

                <div class="satori-option">

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
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- COMPRA -->

                <div class="satori-buy-row">

                    <div class="satori-quantity">

                        <button
                            type="button"
                            data-quantity-minus
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


                <!-- BENEFICIOS -->

                <div class="satori-benefits">

                    <div class="satori-benefit">

                        <strong>
                            🚚 ENVÍOS A TODO CHILE
                        </strong>

                        <span>
                            Despachamos a todo el país.
                        </span>

                    </div>

                    <div class="satori-benefit">

                        <strong>
                            ↻ CAMBIOS
                        </strong>

                        <span>
                            Cambios y devoluciones.
                        </span>

                    </div>

                    <div class="satori-benefit">

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


        <!-- =========================================
             BANNER
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

        ${recommendations}


    </main>


    <!-- FOOTER -->

    <div
        id="satori-footer"
    ></div>


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

                    index = 0;

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


            document
                .querySelector(
                    "[data-gallery-prev]"
                )
                ?.addEventListener(
                    "click",
                    function () {

                        changeImage(
                            currentImage - 1
                        );

                    }
                );


            document
                .querySelector(
                    "[data-gallery-next]"
                )
                ?.addEventListener(
                    "click",
                    function () {

                        changeImage(
                            currentImage + 1
                        );

                    }
                );


            /* =========================================
               TALLAS
            ========================================= */

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
            ========================================= */

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
            ========================================= */

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
            ========================================= */

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
            ========================================= */

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


                            document
                                .querySelector(
                                    '[data-panel="' +
                                    target +
                                    '"]'
                                )
                                ?.classList.add(
                                    "active"
                                );

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


    if (!availableProducts.length) {

        console.warn(
            "No hay productos disponibles."
        );

        return;

    }


    fs.mkdirSync(
        PRODUCTS_DIR,
        {
            recursive: true
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
