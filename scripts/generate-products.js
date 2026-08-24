/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 12 · SATORII ANIME COMMERCE

   BASE VISUAL:
   OPCIÓN 5 · HORIZONTAL GALLERY + ANIME BANNER

   CARACTERÍSTICAS:

   - Genera automáticamente:
     productos/{categoria}/{id}.html

   - Usa js/products.js como fuente inicial.
   - Actualiza datos desde Supabase.
   - Supabase Realtime.
   - Polling de respaldo cada 30 segundos.
   - Header global.
   - Footer global.
   - Carrito global.
   - Animaciones globales.
   - Fondo blanco.
   - Rojo SATORII #EF0930.
   - Footer / ticker #101727.

   SECCIONES DEL PRODUCTO:

   01 · DESCRIPCIÓN
   02 · DETALLES
   03 · GUÍA DE TALLAS
   04 · ENVÍOS Y DEVOLUCIONES
   05 · CUIDADOS

   RECOMENDACIONES:

   - 4 poleras aleatorias.
   - Se generan al azar por página.
   - Se excluye el producto actual.
   - Se priorizan productos identificados
     como poleras / camisetas / t-shirts.
   - Si no hay suficientes, completa con
     otros productos del catálogo.

   RESPONSIVE:

   - Desktop
   - Tablet
   - Mobile
   - Mobile pequeño
   - prefers-reduced-motion
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
    "DISEÑO 12 · SATORII ANIME COMMERCE";


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
            )
            .replace(
                /\\/g,
                "/"
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
   BANNER ANIME / EDITORIAL
========================================================= */

function getBannerImage(
    product
) {

    const images =
        getProductImages(
            product
        );


    return (
        product.bannerImage ||
        product.featureImage ||
        product.characterImage ||
        product.editorialImage ||
        product.details?.bannerImage ||
        images[1] ||
        images[0] ||
        ""
    );

}


function getBannerLabel(
    product
) {

    return (
        product.bannerLabel ||
        product.details?.bannerLabel ||
        "SATORII · ANIME SERIES"
    );

}


function getBannerTitle(
    product
) {

    return (
        product.bannerTitle ||
        product.details?.bannerTitle ||
        "EL UNIVERSO DETRÁS DE LA PRENDA"
    );

}


function getBannerText(
    product
) {

    return (
        product.bannerText ||
        product.details?.bannerText ||
        "Una pieza creada para llevar la identidad de este universo directamente contigo."
    );

}


/* =========================================================
   INFORMACIÓN
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


function getMaterial(
    product
) {

    return (
        product.details?.material ||
        product.material ||
        "Material de alta calidad."
    );

}


function getShipping(
    product
) {

    return (
        product.details?.shipping ||
        "Envíos a todo Chile."
    );

}


function getCare(
    product
) {

    return (
        product.details?.care ||
        "Seguir las instrucciones de cuidado del producto."
    );

}


function getOrigin(
    product
) {

    return (
        product.details?.origin ||
        product.origin ||
        "Diseñado en Chile."
    );

}


function getCollection(
    product
) {

    return (
        product.collection ||
        product.category ||
        "SATORII"
    );

}


function getSeason(
    product
) {

    return (
        product.details?.season ||
        product.season ||
        "DROP 01 / 2026"
    );

}


function getPrint(
    product
) {

    return (
        product.details?.print ||
        product.print ||
        "Diseño SATORII."
    );

}


/* =========================================================
   TALLAS
========================================================= */

function getSizes(
    product
) {

    if (
        Array.isArray(
            product.sizes
        )
    ) {

        return product.sizes.filter(
            Boolean
        );

    }


    return [];

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
            SATORII_BLACK,

        black:
            SATORII_BLACK,

        rojo:
            SATORII_RED,

        red:
            SATORII_RED,

        blanco:
            SATORII_WHITE,

        white:
            SATORII_WHITE,

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
    aria-label="Color ${escapeHTML(
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
   TALLAS
========================================================= */

function buildSizeOptions(
    product
) {

    const sizes =
        getSizes(
            product
        );


    if (
        !sizes.length
    ) {

        return "";

    }


    return `
<div class="satori-option">

    <div class="satori-option-head">

        <span class="satori-option-label">
            TALLA
        </span>

        <button
            type="button"
            class="satori-inline-link"
            data-open-tab="size-guide"
        >
            GUÍA DE TALLAS
        </button>

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
   BENEFICIOS
========================================================= */

function buildBenefits() {

    return `
<div class="satori-benefits">

    <div class="satori-benefit">

        <span class="satori-benefit-icon">
            ◇
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

</div>
`;

}


/* =========================================================
   SECCIONES INFORMACIÓN
========================================================= */

function buildInformationSections(
    product
) {

    const sizes =
        getSizes(
            product
        );


    return `
<section
    class="satori-information"
    aria-label="Información del producto"
>

    <div
        class="satori-information-nav"
        role="tablist"
        aria-label="Información"
    >

        <button
            type="button"
            class="satori-info-tab active"
            data-info-tab="description"
            aria-selected="true"
        >
            <span>01</span>
            DESCRIPCIÓN
        </button>


        <button
            type="button"
            class="satori-info-tab"
            data-info-tab="details"
            aria-selected="false"
        >
            <span>02</span>
            DETALLES
        </button>


        <button
            type="button"
            class="satori-info-tab"
            data-info-tab="size-guide"
            aria-selected="false"
        >
            <span>03</span>
            GUÍA DE TALLAS
        </button>


        <button
            type="button"
            class="satori-info-tab"
            data-info-tab="shipping"
            aria-selected="false"
        >
            <span>04</span>
            ENVÍOS Y DEVOLUCIONES
        </button>


        <button
            type="button"
            class="satori-info-tab"
            data-info-tab="care"
            aria-selected="false"
        >
            <span>05</span>
            CUIDADOS
        </button>

    </div>


    <div
        class="satori-information-content"
    >

        <!-- DESCRIPCIÓN -->

        <article
            class="satori-info-panel active"
            data-info-panel="description"
        >

            <div class="satori-info-copy">

                <span class="satori-info-kicker">
                    SATORII · DESCRIPTION
                </span>


                <h2>
                    INSPIRADA EN EL UNIVERSO.
                    CREADA PARA HOY.
                </h2>


                <p>
                    ${escapeHTML(
                        getDescription(
                            product
                        )
                    )}
                </p>


                <ul>

                    <li>
                        Estampado de alta definición.
                    </li>

                    <li>
                        ${escapeHTML(
                            getMaterial(
                                product
                            )
                        )}
                    </li>

                    <li>
                        Diseño exclusivo SATORII.
                    </li>

                    <li>
                        Diseñado en Chile.
                    </li>

                </ul>

            </div>


            <div class="satori-info-image">

                <span class="satori-info-image-number">
                    01
                </span>

                ${
                    getProductImages(
                        product
                    )[1]
                        ? `
                        <img
                            src="${escapeHTML(
                                getImagePath(
                                    getProductImages(
                                        product
                                    )[1],
                                    normalizeProductUrl(
                                        product
                                    )
                                )
                            )}"
                            alt="${escapeHTML(
                                product.name
                            )}"
                            loading="lazy"
                        >
                        `
                        :
                        `
                        <div class="satori-info-placeholder">
                            SATORII
                        </div>
                        `
                }

            </div>

        </article>


        <!-- DETALLES -->

        <article
            class="satori-info-panel"
            data-info-panel="details"
            hidden
        >

            <div class="satori-specification">

                <span class="satori-info-kicker">
                    PRODUCT SPECIFICATIONS
                </span>


                <h2>
                    DETALLES DEL PRODUCTO
                </h2>


                <div class="satori-spec-grid">

                    <div>
                        <small>
                            COLECCIÓN
                        </small>

                        <strong>
                            ${escapeHTML(
                                getCollection(
                                    product
                                )
                            )}
                        </strong>
                    </div>


                    <div>
                        <small>
                            TEMPORADA
                        </small>

                        <strong>
                            ${escapeHTML(
                                getSeason(
                                    product
                                )
                            )}
                        </strong>
                    </div>


                    <div>
                        <small>
                            MATERIAL
                        </small>

                        <strong>
                            ${escapeHTML(
                                getMaterial(
                                    product
                                )
                            )}
                        </strong>
                    </div>


                    <div>
                        <small>
                            ESTAMPADO
                        </small>

                        <strong>
                            ${escapeHTML(
                                getPrint(
                                    product
                                )
                            )}
                        </strong>
                    </div>


                    <div>
                        <small>
                            ORIGEN
                        </small>

                        <strong>
                            ${escapeHTML(
                                getOrigin(
                                    product
                                )
                            )}
                        </strong>
                    </div>


                    <div>
                        <small>
                            PRODUCT ID
                        </small>

                        <strong>
                            ${escapeHTML(
                                product.id
                            )}
                        </strong>
                    </div>

                </div>

            </div>

        </article>


        <!-- GUÍA DE TALLAS -->

        <article
            class="satori-info-panel"
            data-info-panel="size-guide"
            hidden
        >

            <div class="satori-size-guide">

                <span class="satori-info-kicker">
                    SATORII · SIZE GUIDE
                </span>


                <h2>
                    ENCUENTRA TU TALLA
                </h2>


                <p>
                    Todas las medidas están expresadas
                    en centímetros. Las medidas pueden
                    variar aproximadamente ±1–2 cm.
                </p>


                ${
                    sizes.length
                        ? `
                        <div class="satori-size-table-wrap">

                            <table class="satori-size-table">

                                <thead>

                                    <tr>

                                        <th>
                                            TALLA
                                        </th>

                                        <th>
                                            ANCHO
                                        </th>

                                        <th>
                                            LARGO
                                        </th>

                                        <th>
                                            MANGA
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${sizes
                                        .map(
                                            function (
                                                size,
                                                index
                                            ) {

                                                const width =
                                                    52 +
                                                    index *
                                                    2;


                                                const length =
                                                    70 +
                                                    index *
                                                    2;


                                                const sleeve =
                                                    21 +
                                                    index;


                                                return `
<tr>

    <td>
        ${escapeHTML(
            size
        )}
    </td>

    <td>
        ${width}
    </td>

    <td>
        ${length}
    </td>

    <td>
        ${sleeve}
    </td>

</tr>
`;

                                            }
                                        )
                                        .join("\n")}

                                </tbody>

                            </table>

                        </div>
                        `
                        :
                        `
                        <div class="satori-size-empty">
                            Consulta disponibilidad de tallas
                            para este producto.
                        </div>
                        `
                }

            </div>


            <div class="satori-shirt-diagram">

                <div class="satori-shirt-outline">

                    <span class="measure width">
                        ANCHO
                    </span>

                    <span class="measure length">
                        LARGO
                    </span>

                    <span class="measure sleeve">
                        MANGA
                    </span>

                </div>

            </div>

        </article>


        <!-- ENVÍOS -->

        <article
            class="satori-info-panel"
            data-info-panel="shipping"
            hidden
        >

            <div class="satori-shipping-panel">

                <span class="satori-info-kicker">
                    SATORII · DELIVERY
                </span>


                <h2>
                    ENVÍOS Y DEVOLUCIONES
                </h2>


                <div class="satori-service-grid">

                    <div>

                        <span class="satori-service-icon">
                            01
                        </span>

                        <h3>
                            ENVÍOS A TODO CHILE
                        </h3>

                        <p>
                            ${escapeHTML(
                                getShipping(
                                    product
                                )
                            )}
                        </p>

                    </div>


                    <div>

                        <span class="satori-service-icon">
                            02
                        </span>

                        <h3>
                            CAMBIOS
                        </h3>

                        <p>
                            Cambios y devoluciones
                            según las condiciones
                            de SATORII.
                        </p>

                    </div>


                    <div>

                        <span class="satori-service-icon">
                            03
                        </span>

                        <h3>
                            COMPRA SEGURA
                        </h3>

                        <p>
                            Pago protegido mediante
                            nuestros medios disponibles
                            en checkout.
                        </p>

                    </div>

                </div>

            </div>

        </article>


        <!-- CUIDADOS -->

        <article
            class="satori-info-panel"
            data-info-panel="care"
            hidden
        >

            <div class="satori-care-panel">

                <span class="satori-info-kicker">
                    SATORII · CARE
                </span>


                <h2>
                    CUIDA TU PRENDA.
                    CONSERVA EL DISEÑO.
                </h2>


                <p>
                    ${escapeHTML(
                        getCare(
                            product
                        )
                    )}
                </p>


                <div class="satori-care-grid">

                    <div>
                        <strong>
                            01
                        </strong>

                        <span>
                            LAVAR AL REVÉS
                        </span>
                    </div>


                    <div>
                        <strong>
                            02
                        </strong>

                        <span>
                            AGUA FRÍA
                        </span>
                    </div>


                    <div>
                        <strong>
                            03
                        </strong>

                        <span>
                            NO USAR CLORO
                        </span>
                    </div>


                    <div>
                        <strong>
                            04
                        </strong>

                        <span>
                            NO PLANCHAR EL ESTAMPADO
                        </span>
                    </div>

                </div>

            </div>

        </article>

    </div>

</section>
`;

}


/* =========================================================
   BANNER ANIME
========================================================= */

function buildAnimeBanner(
    product,
    productUrl
) {

    const bannerImage =
        getBannerImage(
            product
        );


    if (
        !bannerImage
    ) {

        return "";

    }


    const image =
        getImagePath(
            bannerImage,
            productUrl
        );


    return `
<section
    class="satori-anime-banner"
    aria-label="Banner editorial SATORII"
>

    <div class="satori-anime-copy">

        <span class="satori-anime-kicker">
            ${escapeHTML(
                getBannerLabel(
                    product
                )
            )}
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


        <div class="satori-anime-line"></div>


        <strong>
            ${escapeHTML(
                product.name
            )}
        </strong>

    </div>


    <div class="satori-anime-image">

        <div class="satori-anime-grid"></div>


        <span class="satori-anime-number">
            01
        </span>


        <img
            src="${escapeHTML(
                image
            )}"
            alt="${escapeHTML(
                getBannerTitle(
                    product
                )
            )}"
            loading="lazy"
        >


        <span class="satori-anime-mark">
            SATORII
        </span>

    </div>

</section>
`;

}


/* =========================================================
   LOOKBOOK
========================================================= */

function getLookbookImages(
    product
) {

    if (
        Array.isArray(
            product.lookbook
        )
    ) {

        return product.lookbook.filter(
            Boolean
        );

    }


    if (
        Array.isArray(
            product.details?.lookbook
        )
    ) {

        return product.details.lookbook.filter(
            Boolean
        );

    }


    return [];

}


function buildLookbook(
    product,
    productUrl
) {

    const images =
        getLookbookImages(
            product
        );


    if (
        images.length < 1
    ) {

        return "";

    }


    return `
<section
    class="satori-lookbook"
>

    <div class="satori-lookbook-heading">

        <div>

            <span>
                SATORII · LOOKBOOK
            </span>

            <h2>
                VISTE TU UNIVERSO
            </h2>

        </div>


        <p>
            LA PRENDA EN SU ELEMENTO.
        </p>

    </div>


    <div class="satori-lookbook-grid">

        ${images
            .slice(
                0,
                3
            )
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
<div class="satori-lookbook-card">

    <div class="satori-lookbook-number">
        ${String(
            index + 1
        ).padStart(
            2,
            "0"
        )}
    </div>


    <img
        src="${escapeHTML(
            src
        )}"
        alt="${escapeHTML(
            product.name
        )} — look ${
            index + 1
        }"
        loading="lazy"
    >


    <div class="satori-lookbook-label">
        SATORII / LOOK ${String(
            index + 1
        ).padStart(
            2,
            "0"
        )}
    </div>

</div>
`;

                }
            )
            .join("\n")}

    </div>

</section>
`;

}


/* =========================================================
   RANDOM
   RECOMENDACIONES DE POLERAS
========================================================= */

function shuffleArray(
    array
) {

    const copy =
        [...array];


    for (
        let i =
            copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (
                    i + 1
                )
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
   DETECTAR POLERAS
========================================================= */

function isShirtProduct(
    product
) {

    const text =
        [
            product.name,
            product.type,
            product.productType,
            product.category,
            product.collection,
            product.tags
        ]
            .flat()
            .join(" ")
            .toLowerCase();


    return (
        text.includes("polera") ||
        text.includes("camiseta") ||
        text.includes("t-shirt") ||
        text.includes("tshirt") ||
        text.includes("tee") ||
        text.includes("shirt")
    );

}


/* =========================================================
   RECOMENDACIONES
========================================================= */

function getRandomRecommendations(
    product,
    products
) {

    const available =
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


    const shirts =
        available.filter(
            isShirtProduct
        );


    let pool =
        shirts.length >= 4
            ? shirts
            : available;


    pool =
        shuffleArray(
            pool
        );


    return pool.slice(
        0,
        4
    );

}


/* =========================================================
   RECOMENDACIONES HTML
========================================================= */

function buildRecommendations(
    product,
    products,
    productUrl
) {

    const recommendations =
        getRandomRecommendations(
            product,
            products
        );


    if (
        !recommendations.length
    ) {

        return "";

    }


    return `
<section
    class="satori-recommendations"
    aria-label="Productos recomendados"
>

    <div class="satori-recommendation-heading">

        <div>

            <span>
                SELECCIÓN SATORII
            </span>


            <h2>
                TAMBIÉN TE PUEDE GUSTAR
            </h2>

        </div>


        <p>
            POLERAS SELECCIONADAS
            PARA DESCUBRIR MÁS DEL UNIVERSO SATORII.
        </p>

    </div>


    <div class="satori-recommendation-grid">

        ${recommendations
            .map(
                function (
                    item,
                    index
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


                    const images =
                        getProductImages(
                            item
                        );


                    const image =
                        getImagePath(
                            images[0],
                            productUrl
                        );


                    return `
<a
    href="${escapeHTML(
        relativeUrl
    )}"
    class="satori-recommendation-card"
>

    <div class="satori-recommendation-image">

        <span class="satori-recommendation-number">
            ${String(
                index + 1
            ).padStart(
                2,
                "0"
            )}
        </span>


        <span class="satori-recommendation-arrow">
            →
        </span>


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


    <div class="satori-recommendation-info">

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
   CSS
========================================================= */

function buildDesignCSS() {

    return `

/* =========================================================
   SATORII · DESIGN 12
   ANIME COMMERCE
========================================================= */

.satori-product-page {

    --satori-red:
        #EF0930;

    --satori-black:
        #080808;

    --satori-dark:
        #101727;

    --satori-dark-2:
        #151D2D;

    --satori-white:
        #FFFFFF;

    --satori-soft:
        #F5F5F5;

    --satori-border:
        #DDDDDD;

    --satori-gray:
        #777777;

    background:
        #FFFFFF;

    color:
        #080808;

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
            1420px,
            calc(
                100% - 70px
            )
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
        8px;

    flex-wrap:
        wrap;

    padding:
        18px 0 16px;

    color:
        #888888;

    font-size:
        8px;

    font-weight:
        800;

    letter-spacing:
        .05em;

    text-transform:
        uppercase;

}


.satori-breadcrumbs a {

    color:
        inherit;

    text-decoration:
        none;

}


.satori-breadcrumbs a:hover {

    color:
        var(--satori-red);

}


.satori-breadcrumbs strong {

    color:
        #111111;

}


/* =========================================================
   HERO
========================================================= */

.satori-product-hero {

    display:
        grid;

    grid-template-columns:
        minmax(0,1.18fr)
        minmax(390px,.72fr);

    gap:
        clamp(
            45px,
            6vw,
            95px
        );

    padding:
        0 0 50px;

    align-items:
        start;

}


/* =========================================================
   GALERÍA
========================================================= */

.satori-gallery {

    display:
        grid;

    grid-template-columns:
        72px
        minmax(0,1fr);

    gap:
        15px;

}


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
        72px;

    height:
        82px;

    padding:
        3px;

    border:
        1px solid #D8D8D8;

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
        translateY(-2px);

    border-color:
        #888888;

}


.satori-product-thumb.active {

    border:
        2px solid
        var(--satori-red);

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

    min-width:
        0;

    aspect-ratio:
        1 / 1;

    background:
        #F6F6F6;

    overflow:
        hidden;

}


.satori-main-visual::before {

    content:
        "SATORII";

    position:
        absolute;

    left:
        20px;

    top:
        14px;

    color:
        rgba(
            0,
            0,
            0,
            .065
        );

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        clamp(
            60px,
            9vw,
            140px
        );

    font-weight:
        900;

    line-height:
        .8;

    letter-spacing:
        -.06em;

}


.satori-main-visual::after {

    content:
        "SATORII";

    position:
        absolute;

    right:
        18px;

    bottom:
        20px;

    color:
        rgba(
            0,
            0,
            0,
            .055
        );

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        42px;

    font-weight:
        900;

    transform:
        rotate(
            -90deg
        );

    transform-origin:
        right bottom;

}


.satori-main-image {

    position:
        relative;

    z-index:
        2;

    width:
        100%;

    height:
        100%;

    display:
        block;

    padding:
        25px;

    object-fit:
        contain;

    transition:
        opacity .2s ease,
        transform .3s ease;

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

    z-index:
        5;

    right:
        15px;

    bottom:
        15px;

    width:
        38px;

    height:
        38px;

    border:
        1px solid #D0D0D0;

    border-radius:
        50%;

    background:
        #FFFFFF;

    cursor:
        pointer;

}


/* =========================================================
   INFO PRODUCTO
========================================================= */

.satori-product-info {

    padding-top:
        10px;

}


.satori-eyebrow {

    display:
        inline-flex;

    margin-bottom:
        13px;

    padding:
        5px 8px;

    background:
        var(--satori-red);

    color:
        #FFFFFF;

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .12em;

}


.satori-product-title {

    margin:
        0;

    color:
        #0A0A0A;

    font-family:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        clamp(
            45px,
            5.3vw,
            76px
        );

    line-height:
        .82;

    font-weight:
        900;

    letter-spacing:
        -.05em;

    text-transform:
        uppercase;

}


.satori-price {

    margin-top:
        18px;

    color:
        var(--satori-red);

    font-size:
        21px;

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
        var(--satori-border);

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

    justify-content:
        space-between;

    align-items:
        center;

    margin-bottom:
        9px;

}


.satori-option-label {

    color:
        #111111;

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .1em;

}


.satori-inline-link {

    padding:
        0;

    border:
        0;

    background:
        transparent;

    color:
        #555555;

    font-size:
        8px;

    font-weight:
        800;

    text-decoration:
        underline;

    cursor:
        pointer;

}


.satori-colors {

    display:
        flex;

    gap:
        9px;

}


.satori-color {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    width:
        28px;

    height:
        28px;

    padding:
        3px;

    border:
        1px solid #D4D4D4;

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
        43px;

    height:
        36px;

    padding:
        0 11px;

    border:
        1px solid #CCCCCC;

    background:
        #FFFFFF;

    color:
        #111111;

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
        minmax(0,1fr);

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
        52px;

    border:
        1px solid #CCCCCC;

}


.satori-quantity button {

    width:
        32px;

    height:
        100%;

    padding:
        0;

    border:
        0;

    background:
        transparent;

    font-size:
        16px;

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
        52px;

    border:
        1px solid
        var(--satori-red);

    background:
        var(--satori-red);

    color:
        #FFFFFF;

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .08em;

    cursor:
        pointer;

    transition:
        background .2s ease,
        border-color .2s ease;

}


.satori-add:hover {

    background:
        #080808;

    border-color:
        #080808;

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
        13px;

    margin-top:
        19px;

    padding:
        17px 0;

    border-top:
        1px solid
        var(--satori-border);

    border-bottom:
        1px solid
        var(--satori-border);

}


.satori-benefit {

    display:
        flex;

    gap:
        8px;

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

    flex:
        0 0 25px;

    border:
        1px solid #D5D5D5;

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
        7px;

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
        7px;

}


/* =========================================================
   INFORMACIÓN
========================================================= */

.satori-information {

    margin:
        10px 0 55px;

    border-top:
        1px solid #DADADA;

}


.satori-information-nav {

    display:
        flex;

    border-bottom:
        1px solid #DADADA;

}


.satori-info-tab {

    position:
        relative;

    display:
        flex;

    align-items:
        center;

    gap:
        8px;

    min-height:
        58px;

    padding:
        0 16px;

    border:
        0;

    border-right:
        1px solid #E4E4E4;

    background:
        #FFFFFF;

    color:
        #888888;

    font-size:
        8px;

    font-weight:
        900;

    cursor:
        pointer;

}


.satori-info-tab span {

    color:
        #C0C0C0;

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        15px;

}


.satori-info-tab.active {

    color:
        #111111;

}


.satori-info-tab.active::after {

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
        var(--satori-red);

}


.satori-information-content {

    min-height:
        330px;

}


.satori-info-panel {

    display:
        grid;

    grid-template-columns:
        minmax(0,1fr)
        minmax(0,1fr);

    min-height:
        330px;

}


.satori-info-panel[hidden] {

    display:
        none;

}


.satori-info-copy,
.satori-specification,
.satori-size-guide,
.satori-shipping-panel,
.satori-care-panel {

    padding:
        50px;

}


.satori-info-kicker {

    display:
        block;

    margin-bottom:
        12px;

    color:
        var(--satori-red);

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .13em;

}


.satori-info-copy h2,
.satori-specification h2,
.satori-size-guide h2,
.satori-shipping-panel h2,
.satori-care-panel h2 {

    max-width:
        600px;

    margin:
        0;

    font-family:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        clamp(
            35px,
            4vw,
            58px
        );

    line-height:
        .87;

    font-weight:
        900;

    letter-spacing:
        -.04em;

    text-transform:
        uppercase;

}


.satori-info-copy p,
.satori-size-guide p,
.satori-shipping-panel p,
.satori-care-panel p {

    max-width:
        600px;

    margin:
        18px 0 0;

    color:
        #666666;

    font-size:
        10px;

    line-height:
        1.8;

}


.satori-info-copy ul {

    margin:
        20px 0 0;

    padding:
        0;

    list-style:
        none;

}


.satori-info-copy li {

    position:
        relative;

    padding:
        6px 0 6px 15px;

    color:
        #555555;

    font-size:
        9px;

}


.satori-info-copy li::before {

    content:
        "";

    position:
        absolute;

    left:
        0;

    top:
        13px;

    width:
        5px;

    height:
        5px;

    background:
        var(--satori-red);

}


.satori-info-image {

    position:
        relative;

    min-height:
        330px;

    background:
        #F5F5F5;

    overflow:
        hidden;

}


.satori-info-image img {

    width:
        100%;

    height:
        100%;

    display:
        block;

    object-fit:
        cover;

}


.satori-info-image-number {

    position:
        absolute;

    z-index:
        3;

    top:
        18px;

    left:
        20px;

    color:
        rgba(
            0,
            0,
            0,
            .14
        );

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        80px;

    font-weight:
        900;

    line-height:
        .8;

}


.satori-info-placeholder {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    height:
        100%;

    color:
        rgba(
            0,
            0,
            0,
            .08
        );

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        100px;

    font-weight:
        900;

}


/* =========================================================
   ESPECIFICACIONES
========================================================= */

.satori-info-panel[data-info-panel="details"] {

    display:
        block;

}


.satori-spec-grid {

    display:
        grid;

    grid-template-columns:
        repeat(
            2,
            minmax(0,1fr)
        );

    margin-top:
        30px;

    border-top:
        1px solid #DADADA;

    border-left:
        1px solid #DADADA;

}


.satori-spec-grid > div {

    min-height:
        82px;

    padding:
        16px;

    border-right:
        1px solid #DADADA;

    border-bottom:
        1px solid #DADADA;

}


.satori-spec-grid small {

    display:
        block;

    margin-bottom:
        8px;

    color:
        #999999;

    font-size:
        7px;

    font-weight:
        900;

    letter-spacing:
        .08em;

}


.satori-spec-grid strong {

    color:
        #222222;

    font-size:
        9px;

    line-height:
        1.4;

}


/* =========================================================
   GUÍA TALLAS
========================================================= */

.satori-info-panel[data-info-panel="size-guide"] {

    display:
        grid;

    grid-template-columns:
        minmax(0,1fr)
        350px;

}


.satori-size-table-wrap {

    margin-top:
        25px;

    overflow-x:
        auto;

}


.satori-size-table {

    width:
        100%;

    min-width:
        400px;

    border-collapse:
        collapse;

}


.satori-size-table th {

    padding:
        11px;

    background:
        #111111;

    color:
        #FFFFFF;

    font-size:
        7px;

    font-weight:
        900;

    text-align:
        left;

}


.satori-size-table td {

    padding:
        12px 11px;

    border-bottom:
        1px solid #E0E0E0;

    color:
        #555555;

    font-size:
        9px;

}


.satori-size-table td:first-child {

    color:
        #111111;

    font-weight:
        900;

}


.satori-size-empty {

    margin-top:
        25px;

    padding:
        20px;

    border:
        1px solid #DDDDDD;

    color:
        #777777;

    font-size:
        9px;

}


.satori-shirt-diagram {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    min-height:
        330px;

    background:
        #F7F7F7;

}


.satori-shirt-outline {

    position:
        relative;

    width:
        190px;

    height:
        220px;

    border:
        2px solid #CCCCCC;

    clip-path:
        polygon(
            25% 0,
            0 15%,
            12% 36%,
            25% 25%,
            25% 100%,
            75% 100%,
            75% 25%,
            88% 36%,
            100% 15%,
            75% 0
        );

}


.satori-shirt-outline::before {

    content:
        "";

    position:
        absolute;

    left:
        25%;

    right:
        25%;

    top:
        46%;

    border-top:
        1px dashed
        var(--satori-red);

}


.satori-shirt-outline::after {

    content:
        "";

    position:
        absolute;

    top:
        25%;

    bottom:
        0;

    left:
        50%;

    border-left:
        1px dashed
        var(--satori-red);

}


.satori-shirt-outline .measure {

    position:
        absolute;

    z-index:
        5;

    color:
        var(--satori-red);

    font-size:
        7px;

    font-weight:
        900;

    white-space:
        nowrap;

}


.satori-shirt-outline .width {

    left:
        50%;

    top:
        43%;

    transform:
        translate(
            -50%,
            -50%
        );

}


.satori-shirt-outline .length {

    left:
        53%;

    top:
        68%;

    transform:
        rotate(
            90deg
        );

}


.satori-shirt-outline .sleeve {

    right:
        -42px;

    top:
        17%;

    transform:
        rotate(
            25deg
        );

}


/* =========================================================
   ENVÍOS
========================================================= */

.satori-info-panel[data-info-panel="shipping"] {

    display:
        block;

}


.satori-service-grid {

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
        30px;

}


.satori-service-grid > div {

    padding:
        22px;

    border:
        1px solid #DDDDDD;

}


.satori-service-icon {

    display:
        block;

    margin-bottom:
        25px;

    color:
        var(--satori-red);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        35px;

    font-weight:
        900;

}


.satori-service-grid h3 {

    margin:
        0;

    font-size:
        10px;

    font-weight:
        900;

}


.satori-service-grid p {

    margin-top:
        9px;

}


/* =========================================================
   CUIDADOS
========================================================= */

.satori-info-panel[data-info-panel="care"] {

    display:
        block;

}


.satori-care-grid {

    display:
        grid;

    grid-template-columns:
        repeat(
            4,
            1fr
        );

    gap:
        10px;

    margin-top:
        30px;

}


.satori-care-grid > div {

    min-height:
        115px;

    padding:
        18px;

    background:
        #F6F6F6;

}


.satori-care-grid strong {

    display:
        block;

    color:
        var(--satori-red);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        30px;

    line-height:
        .8;

}


.satori-care-grid span {

    display:
        block;

    margin-top:
        25px;

    color:
        #222222;

    font-size:
        8px;

    font-weight:
        900;

}


/* =========================================================
   BANNER ANIME
========================================================= */

.satori-anime-banner {

    display:
        grid;

    grid-template-columns:
        minmax(0,.78fr)
        minmax(0,1.22fr);

    min-height:
        330px;

    margin:
        0 0 65px;

    background:
        var(--satori-dark);

    color:
        #FFFFFF;

    overflow:
        hidden;

}


.satori-anime-copy {

    position:
        relative;

    z-index:
        4;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    padding:
        45px 50px;

}


.satori-anime-copy::before {

    content:
        "";

    position:
        absolute;

    left:
        0;

    top:
        0;

    bottom:
        0;

    width:
        4px;

    background:
        var(--satori-red);

}


.satori-anime-kicker {

    margin-bottom:
        12px;

    color:
        var(--satori-red);

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .14em;

}


.satori-anime-copy h2 {

    max-width:
        520px;

    margin:
        0;

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        clamp(
            40px,
            5vw,
            70px
        );

    line-height:
        .82;

    font-weight:
        900;

    letter-spacing:
        -.05em;

    text-transform:
        uppercase;

}


.satori-anime-copy p {

    max-width:
        450px;

    margin:
        18px 0 0;

    color:
        #C9CED6;

    font-size:
        10px;

    line-height:
        1.7;

}


.satori-anime-line {

    width:
        55px;

    height:
        2px;

    margin:
        22px 0 12px;

    background:
        var(--satori-red);

}


.satori-anime-copy strong {

    color:
        #FFFFFF;

    font-size:
        8px;

    letter-spacing:
        .12em;

}


.satori-anime-image {

    position:
        relative;

    min-height:
        330px;

    background:
        var(--satori-dark-2);

    overflow:
        hidden;

}


.satori-anime-grid {

    position:
        absolute;

    inset:
        0;

    background-image:
        linear-gradient(
            rgba(
                255,
                255,
                255,
                .045
            ) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(
                255,
                255,
                255,
                .045
            ) 1px,
            transparent 1px
        );

    background-size:
        32px 32px;

    opacity:
        .5;

}


.satori-anime-image::after {

    content:
        "";

    position:
        absolute;

    z-index:
        3;

    inset:
        0;

    background:
        linear-gradient(
            90deg,
            var(--satori-dark) 0%,
            rgba(
                16,
                23,
                39,
                .55
            ) 20%,
            rgba(
                16,
                23,
                39,
                0
            ) 62%
        );

    pointer-events:
        none;

}


.satori-anime-image img {

    position:
        absolute;

    z-index:
        1;

    inset:
        0;

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

}


.satori-anime-number {

    position:
        absolute;

    z-index:
        4;

    left:
        25px;

    top:
        20px;

    color:
        rgba(
            255,
            255,
            255,
            .15
        );

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        100px;

    font-weight:
        900;

    line-height:
        .8;

}


.satori-anime-mark {

    position:
        absolute;

    z-index:
        4;

    right:
        20px;

    bottom:
        20px;

    color:
        rgba(
            255,
            255,
            255,
            .2
        );

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        28px;

    font-weight:
        900;

    transform:
        rotate(
            -90deg
        );

    transform-origin:
        right bottom;

}


/* =========================================================
   LOOKBOOK
========================================================= */

.satori-lookbook {

    margin:
        0 0 65px;

}


.satori-lookbook-heading {

    display:
        flex;

    align-items:
        flex-end;

    justify-content:
        space-between;

    gap:
        25px;

    margin-bottom:
        22px;

}


.satori-lookbook-heading span,
.satori-recommendation-heading span {

    display:
        block;

    margin-bottom:
        7px;

    color:
        var(--satori-red);

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .12em;

}


.satori-lookbook-heading h2,
.satori-recommendation-heading h2 {

    margin:
        0;

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        42px;

    line-height:
        .85;

    font-weight:
        900;

    letter-spacing:
        -.04em;

}


.satori-lookbook-heading p,
.satori-recommendation-heading p {

    max-width:
        260px;

    margin:
        0;

    color:
        #888888;

    font-size:
        8px;

    font-weight:
        800;

    line-height:
        1.5;

    text-align:
        right;

}


.satori-lookbook-grid {

    display:
        grid;

    grid-template-columns:
        repeat(
            3,
            1fr
        );

    gap:
        15px;

}


.satori-lookbook-card {

    position:
        relative;

    aspect-ratio:
        1 / 1.15;

    background:
        #EEEEEE;

    overflow:
        hidden;

}


.satori-lookbook-card img {

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


.satori-lookbook-card:hover img {

    transform:
        scale(
            1.04
        );

}


.satori-lookbook-number {

    position:
        absolute;

    z-index:
        3;

    top:
        12px;

    left:
        14px;

    color:
        var(--satori-red);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        45px;

    font-weight:
        900;

}


.satori-lookbook-label {

    position:
        absolute;

    z-index:
        4;

    left:
        14px;

    bottom:
        12px;

    color:
        #FFFFFF;

    font-size:
        7px;

    font-weight:
        900;

    letter-spacing:
        .1em;

    text-shadow:
        0 1px 4px
        rgba(
            0,
            0,
            0,
            .5
        );

}


/* =========================================================
   RECOMENDACIONES
========================================================= */

.satori-recommendations {

    padding:
        0 0 85px;

}


.satori-recommendation-heading {

    display:
        flex;

    align-items:
        flex-end;

    justify-content:
        space-between;

    gap:
        30px;

    margin-bottom:
        22px;

}


.satori-recommendation-grid {

    display:
        grid;

    grid-template-columns:
        repeat(
            4,
            minmax(0,1fr)
        );

    gap:
        15px;

}


.satori-recommendation-card {

    display:
        block;

    color:
        #111111;

    text-decoration:
        none;

}


.satori-recommendation-image {

    position:
        relative;

    aspect-ratio:
        1 / 1.04;

    background:
        #F6F6F6;

    overflow:
        hidden;

}


.satori-recommendation-image img {

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


.satori-recommendation-card:hover
.satori-recommendation-image img {

    transform:
        scale(
            1.05
        );

}


.satori-recommendation-number {

    position:
        absolute;

    z-index:
        3;

    top:
        10px;

    left:
        10px;

    color:
        rgba(
            0,
            0,
            0,
            .16
        );

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        38px;

    font-weight:
        900;

}


.satori-recommendation-arrow {

    position:
        absolute;

    z-index:
        4;

    right:
        12px;

    top:
        12px;

    width:
        27px;

    height:
        27px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    border:
        1px solid
        rgba(
            0,
            0,
            0,
            .15
        );

    border-radius:
        50%;

    background:
        rgba(
            255,
            255,
            255,
            .85
        );

    font-size:
        12px;

}


.satori-recommendation-info {

    padding:
        11px 2px 0;

}


.satori-recommendation-info h3 {

    margin:
        0 0 5px;

    color:
        #222222;

    font-size:
        10px;

    line-height:
        1.3;

    font-weight:
        900;

    text-transform:
        uppercase;

}


.satori-recommendation-info strong {

    color:
        var(--satori-red);

    font-size:
        10px;

    font-weight:
        900;

}


/* =========================================================
   TABLET
========================================================= */

@media (
    max-width: 1100px
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
            minmax(0,1fr)
            minmax(330px,.7fr);

        gap:
            35px;

    }


    .satori-information {

        margin-bottom:
            45px;

    }


    .satori-info-tab {

        padding:
            0 11px;

    }


    .satori-info-tab span {

        display:
            none;

    }


    .satori-recommendation-grid {

        grid-template-columns:
            repeat(
                3,
                1fr
            );

    }

}


/* =========================================================
   TABLET PEQUEÑO
========================================================= */

@media (
    max-width: 900px
) {

    .satori-product-hero {

        grid-template-columns:
            1fr;

    }


    .satori-product-info {

        max-width:
            700px;

    }


    .satori-info-copy,
    .satori-specification,
    .satori-size-guide,
    .satori-shipping-panel,
    .satori-care-panel {

        padding:
            38px;

    }


    .satori-info-panel[data-info-panel="size-guide"] {

        grid-template-columns:
            1fr;

    }


    .satori-shirt-diagram {

        min-height:
            280px;

    }


    .satori-anime-banner {

        grid-template-columns:
            1fr;

    }


    .satori-anime-image {

        min-height:
            300px;

    }


    .satori-care-grid {

        grid-template-columns:
            repeat(
                2,
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
                100% - 24px
            );

    }


    .satori-breadcrumbs {

        padding:
            13px 0;

        font-size:
            7px;

    }


    .satori-product-hero {

        display:
            block;

        padding-bottom:
            35px;

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
            1 / 1.03;

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
            7px;

        padding:
            8px 0 3px;

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
            0 0 57px;

        width:
            57px;

        height:
            64px;

    }


    .satori-product-info {

        padding-top:
            26px;

    }


    .satori-product-title {

        font-size:
            clamp(
                39px,
                12vw,
                55px
            );

    }


    .satori-price {

        font-size:
            18px;

    }


    .satori-quantity-row {

        grid-template-columns:
            88px
            minmax(0,1fr);

    }


    .satori-quantity {

        height:
            50px;

    }


    .satori-add {

        min-height:
            50px;

    }


    .satori-benefits {

        grid-template-columns:
            1fr;

        gap:
            12px;

    }


    /* =====================================================
       INFORMACIÓN MOBILE
    ====================================================== */

    .satori-information {

        margin:
            5px 0 40px;

        border-top:
            1px solid #DADADA;

    }


    .satori-information-nav {

        display:
            block;

        border-bottom:
            0;

    }


    .satori-info-tab {

        display:
            flex;

        width:
            100%;

        min-height:
            52px;

        padding:
            0 13px;

        border-right:
            0;

        border-bottom:
            1px solid #DDDDDD;

        justify-content:
            space-between;

        text-align:
            left;

    }


    .satori-info-tab::before {

        content:
            "+";

        order:
            3;

        color:
            #888888;

        font-size:
            18px;

        font-weight:
            300;

    }


    .satori-info-tab.active::before {

        content:
            "−";

        color:
            var(--satori-red);

    }


    .satori-info-tab span {

        display:
            inline;

        width:
            22px;

        font-size:
            12px;

    }


    .satori-info-tab.active::after {

        left:
            0;

        right:
            auto;

        bottom:
            0;

        width:
            3px;

        height:
            100%;

    }


    .satori-information-content {

        min-height:
            0;

    }


    .satori-info-panel {

        display:
            block !important;

        min-height:
            0;

    }


    .satori-info-copy,
    .satori-specification,
    .satori-size-guide,
    .satori-shipping-panel,
    .satori-care-panel {

        padding:
            30px 15px;

    }


    .satori-info-copy h2,
    .satori-specification h2,
    .satori-size-guide h2,
    .satori-shipping-panel h2,
    .satori-care-panel h2 {

        font-size:
            37px;

    }


    .satori-info-image {

        min-height:
            260px;

    }


    .satori-info-image-number {

        font-size:
            65px;

    }


    /* =====================================================
       ESPECIFICACIONES MOBILE
    ====================================================== */

    .satori-spec-grid {

        grid-template-columns:
            1fr;

    }


    /* =====================================================
       TALLAS MOBILE
    ====================================================== */

    .satori-size-table {

        min-width:
            350px;

    }


    .satori-shirt-diagram {

        min-height:
            250px;

    }


    /* =====================================================
       ENVÍOS MOBILE
    ====================================================== */

    .satori-service-grid {

        grid-template-columns:
            1fr;

        gap:
            9px;

    }


    .satori-service-grid > div {

        padding:
            18px;

    }


    .satori-service-icon {

        margin-bottom:
            18px;

        font-size:
            28px;

    }


    /* =====================================================
       CUIDADOS MOBILE
    ====================================================== */

    .satori-care-grid {

        grid-template-columns:
            1fr 1fr;

    }


    /* =====================================================
       BANNER MOBILE
    ====================================================== */

    .satori-anime-banner {

        margin:
            0 0 42px;

    }


    .satori-anime-copy {

        padding:
            36px 22px;

    }


    .satori-anime-copy h2 {

        font-size:
            43px;

    }


    .satori-anime-copy p {

        font-size:
            9px;

    }


    .satori-anime-image {

        min-height:
            250px;

    }


    .satori-anime-number {

        font-size:
            70px;

    }


    /* =====================================================
       LOOKBOOK MOBILE
    ====================================================== */

    .satori-lookbook {

        margin-bottom:
            45px;

    }


    .satori-lookbook-heading {

        align-items:
            flex-start;

        flex-direction:
            column;

        gap:
            9px;

    }


    .satori-lookbook-heading h2,
    .satori-recommendation-heading h2 {

        font-size:
            37px;

    }


    .satori-lookbook-heading p,
    .satori-recommendation-heading p {

        max-width:
            100%;

        text-align:
            left;

    }


    .satori-lookbook-grid {

        grid-template-columns:
            1fr;

        gap:
            10px;

    }


    .satori-lookbook-card {

        aspect-ratio:
            1 / 1.08;

    }


    /* =====================================================
       RECOMENDACIONES MOBILE
    ====================================================== */

    .satori-recommendations {

        padding-bottom:
            55px;

    }


    .satori-recommendation-heading {

        align-items:
            flex-start;

        flex-direction:
            column;

        gap:
            9px;

    }


    .satori-recommendation-grid {

        grid-template-columns:
            repeat(
                2,
                minmax(0,1fr)
            );

        gap:
            25px 11px;

    }


    .satori-recommendation-number {

        font-size:
            30px;

    }


    .satori-recommendation-info h3 {

        font-size:
            8px;

    }


    .satori-recommendation-info strong {

        font-size:
            9px;

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
                100% - 18px
            );

    }


    .satori-product-title {

        font-size:
            34px;

    }


    .satori-price {

        font-size:
            17px;

    }


    .satori-info-copy h2,
    .satori-specification h2,
    .satori-size-guide h2,
    .satori-shipping-panel h2,
    .satori-care-panel h2 {

        font-size:
            33px;

    }


    .satori-care-grid {

        grid-template-columns:
            1fr;

    }


    .satori-recommendation-grid {

        gap:
            22px 9px;

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
   HERO HTML
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


        <span>/</span>


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


        <span>/</span>


        <strong>
            ${escapeHTML(
                product.name
            )}
        </strong>

    </nav>


    <section
        class="satori-product-hero"
    >

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
                ${formatPrice(
                    product.price
                )}
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
                product
            )}


            <div class="satori-quantity-row">

                <div
                    class="satori-quantity"
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


            ${buildBenefits()}

        </div>

    </section>


    ${buildInformationSections(
        product
    )}


    ${buildAnimeBanner(
        product,
        productUrl
    )}


    ${buildLookbook(
        product,
        productUrl
    )}


    ${buildRecommendations(
        product,
        [],
        productUrl
    )}

</div>
`;

}


/* =========================================================
   REEMPLAZAR RECOMENDACIONES
   EN HERO COMPLETO
========================================================= */

function buildHeroComplete(
    product,
    products,
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


        <span>/</span>


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


        <span>/</span>


        <strong>
            ${escapeHTML(
                product.name
            )}
        </strong>

    </nav>


    <!-- =====================================================
         PRODUCTO
    ====================================================== -->

    <section
        class="satori-product-hero"
        aria-label="Producto"
    >

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
                ${formatPrice(
                    product.price
                )}
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
                product
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
                >
                    AGREGAR AL CARRITO
                </button>

            </div>


            ${buildBenefits()}

        </div>

    </section>


    <!-- =====================================================
         INFORMACIÓN
    ====================================================== -->

    ${buildInformationSections(
        product
    )}


    <!-- =====================================================
         BANNER ANIME
    ====================================================== -->

    ${buildAnimeBanner(
        product,
        productUrl
    )}


    <!-- =====================================================
         LOOKBOOK
    ====================================================== -->

    ${buildLookbook(
        product,
        productUrl
    )}


    <!-- =====================================================
         RECOMENDACIONES
    ====================================================== -->

    ${buildRecommendations(
        product,
        products,
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
       IMAGEN
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
            )
                .replace(
                    /\\\\/g,
                    "/"
                )
                .trim();


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
       BANNER
    ====================================================== */

    function getBannerImage(
        product
    ) {

        const images =
            getImages(
                product
            );


        return (
            product.bannerImage ||
            product.featureImage ||
            product.characterImage ||
            product.editorialImage ||
            product.details?.bannerImage ||
            images[1] ||
            images[0] ||
            ""
        );

    }


    function getBannerLabel(
        product
    ) {

        return (
            product.bannerLabel ||
            product.details?.bannerLabel ||
            "SATORII · ANIME SERIES"
        );

    }


    function getBannerTitle(
        product
    ) {

        return (
            product.bannerTitle ||
            product.details?.bannerTitle ||
            "EL UNIVERSO DETRÁS DE LA PRENDA"
        );

    }


    function getBannerText(
        product
    ) {

        return (
            product.bannerText ||
            product.details?.bannerText ||
            "Una pieza creada para llevar la identidad de este universo directamente contigo."
        );

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

                    if (
                        thumb.dataset.bound
                    ) {

                        return;

                    }


                    thumb.dataset.bound =
                        "true";


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


            gallery.setAttribute(
                "aria-label",
                "Galería de imágenes"
            );


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
       TABS / SECCIONES
    ====================================================== */

    function openInformationTab(
        name
    ) {

        const tabs =
            document.querySelectorAll(
                ".satori-info-tab"
            );


        const panels =
            document.querySelectorAll(
                "[data-info-panel]"
            );


        tabs.forEach(
            function (
                tab
            ) {

                const active =
                    tab.dataset.infoTab ===
                    name;


                tab.classList.toggle(
                    "active",
                    active
                );


                tab.setAttribute(
                    "aria-selected",
                    String(
                        active
                    )
                );

            }
        );


        panels.forEach(
            function (
                panel
            ) {

                const active =
                    panel.dataset.infoPanel ===
                    name;


                panel.hidden =
                    !active;


                panel.classList.toggle(
                    "active",
                    active
                );

            }
        );


        const information =
            document.querySelector(
                ".satori-information"
            );


        if (
            window.innerWidth <= 700 &&
            information
        ) {

            const rect =
                information.getBoundingClientRect();


            if (
                rect.top <
                0
            ) {

                information.scrollIntoView(
                    {
                        behavior:
                            "smooth",
                        block:
                            "start"
                    }
                );

            }

        }

    }


    function bindInformationTabs() {

        document
            .querySelectorAll(
                ".satori-info-tab"
            )
            .forEach(
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

                            const name =
                                tab.dataset.infoTab;


                            const currentlyActive =
                                tab.classList.contains(
                                    "active"
                                );


                            if (
                                window.innerWidth <= 700 &&
                                currentlyActive
                            ) {

                                const panel =
                                    document.querySelector(
                                        '[data-info-panel="' +
                                        name +
                                        '"]'
                                    );


                                if (
                                    panel
                                ) {

                                    panel.hidden =
                                        true;

                                }


                                tab.classList.remove(
                                    "active"
                                );


                                tab.setAttribute(
                                    "aria-selected",
                                    "false"
                                );


                                return;

                            }


                            openInformationTab(
                                name
                            );

                        };

                }
            );


        document
            .querySelectorAll(
                "[data-open-tab]"
            )
            .forEach(
                function (
                    trigger
                ) {

                    if (
                        trigger.dataset.bound
                    ) {

                        return;

                    }


                    trigger.dataset.bound =
                        "true";


                    trigger.onclick =
                        function () {

                            const tab =
                                trigger.dataset.openTab;


                            openInformationTab(
                                tab
                            );


                            const information =
                                document.querySelector(
                                    ".satori-information"
                                );


                            if (
                                information
                            ) {

                                information.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",
                                        block:
                                            "start"
                                    }
                                );

                            }

                        };

                }
            );

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
       UPDATE COMPLETO
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
       INICIALIZACIÓN
    ====================================================== */

    function initializeProductPage() {

        bindGallery();

        bindColors();

        bindSizes();

        bindQuantity();

        bindInformationTabs();


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


    return `<!DOCTYPE html>

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


    <!-- =====================================================
         GOOGLE FONTS
    ====================================================== -->

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


    <!-- =====================================================
         CSS GLOBAL
    ====================================================== -->

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


    <!-- =====================================================
         CSS PRODUCTO
    ====================================================== -->

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
            satori-product-page
        "
    >

        ${buildHeroComplete(
            product,
            products,
            productUrl
        )}

    </main>


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <div
        id="satori-footer"
    ></div>


    <!-- =====================================================
         SUPABASE
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
         JAVASCRIPT GLOBAL
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


    <!-- =====================================================
         JAVASCRIPT PRODUCTO
    ====================================================== -->

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
        "SATORII · GENERADOR DE PRODUCTOS"
    );

    console.log(
        DESIGN_NAME
    );

    console.log(
        "=============================================="
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
        "✓ Catálogo validado"
    );


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
        "✓ Diseño 12 aplicado"
    );

    console.log(
        "✓ Opción 5 · Horizontal Gallery"
    );

    console.log(
        "✓ Fondo blanco"
    );

    console.log(
        "✓ Rojo SATORII #EF0930"
    );

    console.log(
        "✓ Footer / Ticker #101727"
    );

    console.log(
        "✓ Header global"
    );

    console.log(
        "✓ Footer global"
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
        "✓ Descripción"
    );

    console.log(
        "✓ Detalles"
    );

    console.log(
        "✓ Guía de tallas"
    );

    console.log(
        "✓ Envíos y devoluciones"
    );

    console.log(
        "✓ Cuidados"
    );

    console.log(
        "✓ Banner Anime / Editorial"
    );

    console.log(
        "✓ Lookbook configurable"
    );

    console.log(
        "✓ 4 recomendaciones aleatorias"
    );

    console.log(
        "✓ Prioridad a poleras"
    );

    console.log(
        "✓ Responsive mobile"
    );

    console.log(
        "✓ Tablet"
    );

    console.log(
        "✓ Desktop"
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
