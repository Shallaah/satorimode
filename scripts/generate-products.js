/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 10 · BOLD COMMERCE / SATORII PREMIUM

   - Genera automáticamente:
     productos/{categoria}/{id}.html

   - Usa js/products.js como fuente inicial.
   - Actualiza datos desde Supabase cuando corresponde.
   - Escucha cambios Realtime de Supabase.
   - Mantiene polling de respaldo cada 30 segundos.
   - Mantiene Header, Footer, Carrito y Animaciones globales.
   - Fondo blanco.
   - Diseño inspirado en la OPCIÓN 4 · BOLD COMMERCE.
   - Banner editorial SATORII debajo del producto.
   - Banner preparado para personaje / ilustración / detalle
     característico de la prenda.

   - PRODUCTOS RELACIONADOS:
     "TAMBIÉN TE PUEDE GUSTAR"
   - Prioriza POLERAS.
   - Excluye el producto actual.
   - Excluye productos agotados/inactivos.
   - Selección aleatoria.
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

/*
 * COLOR OFICIAL DEL FOOTER + TICKER
 */
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
    "DISEÑO 10 · BOLD COMMERCE / SATORII";


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
   IMAGEN EDITORIAL DEL BANNER
========================================================= */

function getBannerImage(
    product
) {

    /*
     * Prioridad:
     *
     * 1. bannerImage
     * 2. featureImage
     * 3. characterImage
     * 4. editorialImage
     * 5. details.bannerImage
     * 6. segunda imagen del producto
     * 7. primera imagen
     */

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


/* =========================================================
   TEXTO DEL BANNER
========================================================= */

function getBannerLabel(
    product
) {

    return (
        product.bannerLabel ||
        product.details?.bannerLabel ||
        "SATORII · CHARACTER / DESIGN"
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
   DISPONIBILIDAD
========================================================= */

function isProductAvailable(
    product
) {

    if (
        !product ||
        typeof product !== "object"
    ) {

        return false;

    }


    if (
        product.available === false
    ) {

        return false;

    }


    if (
        product.active === false
    ) {

        return false;

    }


    if (
        product.stock !== undefined &&
        product.stock !== null
    ) {

        const stock =
            Number(
                product.stock
            );


        if (
            Number.isFinite(
                stock
            ) &&
            stock <= 0
        ) {

            return false;

        }

    }


    return true;

}


/* =========================================================
   DETECTAR POLERA
========================================================= */

function isTshirt(
    product
) {

    if (
        !product ||
        typeof product !== "object"
    ) {

        return false;

    }


    /*
     * Revisamos múltiples campos para que la detección
     * funcione aunque products.js use distintas convenciones.
     */

    const values = [

        product.type,

        product.productType,

        product.product_type,

        product.category,

        product.collection,

        product.subcategory,

        product.subCategory,

        product.garment,

        product.garmentType,

        product.kind,

        product.name,

        product.title,

        product.tags,

        product.tag,

        product.details?.type,

        product.details?.productType,

        product.details?.category,

        product.details?.garment

    ];


    const text =
        values
            .flatMap(
                function (
                    value
                ) {

                    if (
                        Array.isArray(
                            value
                        )
                    ) {

                        return value;

                    }

                    return [
                        value
                    ];

                }
            )
            .filter(
                function (
                    value
                ) {

                    return (
                        value !== undefined &&
                        value !== null
                    );

                }
            )
            .join(" ")
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase();


    /*
     * Palabras que identifican una polera.
     */

    const tshirtWords = [

        "polera",

        "poleras",

        "tshirt",

        "t-shirt",

        "tee",

        "tees",

        "shirt",

        "shirts",

        "camiseta",

        "camisetas",

        "remera",

        "remeras"

    ];


    return tshirtWords.some(
        function (
            word
        ) {

            return text.includes(
                word
            );

        }
    );

}


/* =========================================================
   MEZCLAR ARRAY
========================================================= */

function shuffleArray(
    array
) {

    const result =
        Array.isArray(
            array
        )
            ? [...array]
            : [];


    /*
     * Fisher-Yates.
     *
     * Esto permite que las recomendaciones cambien
     * realmente cada vez que se ejecuta el generador.
     */

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        const temporary =
            result[i];


        result[i] =
            result[randomIndex];


        result[randomIndex] =
            temporary;

    }


    return result;

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

</section>
`;

}


/* =========================================================
   PRODUCTOS RELACIONADOS
========================================================= */

function getRelatedProducts(
    product,
    products
) {

    /*
     * =====================================================
     * OBJETIVO
     * =====================================================
     *
     * Mostrar 4 productos recomendados.
     *
     * PRIORIDAD:
     *
     * 1. POLERAS disponibles.
     * 2. Si faltan, otros productos disponibles.
     *
     * SIEMPRE:
     *
     * - Excluir producto actual.
     * - Excluir agotados.
     * - Excluir inactivos.
     * - Mezclar aleatoriamente.
     */

    const currentId =
        String(
            product.id
        );


    const availableProducts =
        products.filter(
            function (
                item
            ) {

                if (
                    !item ||
                    String(
                        item.id
                    ) ===
                    currentId
                ) {

                    return false;

                }


                return isProductAvailable(
                    item
                );

            }
        );


    /*
     * Primero buscamos exclusivamente POLERAS.
     */

    const tshirts =
        shuffleArray(
            availableProducts.filter(
                function (
                    item
                ) {

                    return isTshirt(
                        item
                    );

                }
            )
        );


    /*
     * Luego dejamos preparados otros productos
     * para completar si no hay suficientes poleras.
     */

    const others =
        shuffleArray(
            availableProducts.filter(
                function (
                    item
                ) {

                    return !isTshirt(
                        item
                    );

                }
            )
        );


    const selected = [];


    /*
     * Agregar primero las poleras.
     */

    tshirts.forEach(
        function (
            item
        ) {

            if (
                selected.length >= 4
            ) {

                return;

            }


            selected.push(
                item
            );

        }
    );


    /*
     * Completar con otros productos si faltan.
     */

    others.forEach(
        function (
            item
        ) {

            if (
                selected.length >= 4
            ) {

                return;

            }


            selected.push(
                item
            );

        }
    );


    /*
     * Última mezcla para evitar que una polera siempre
     * quede en la misma posición.
     */

    return shuffleArray(
        selected
    ).slice(
        0,
        4
    );

}


/* =========================================================
   BANNER EDITORIAL SATORII
========================================================= */

function buildProductRelatedBanner(
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
    class="satori-editorial-banner"
    aria-label="Contenido editorial del producto"
>

    <div class="satori-editorial-copy">

        <span class="satori-editorial-kicker">

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


        <div class="satori-editorial-line"></div>


        <span class="satori-editorial-product">

            ${escapeHTML(
                product.name
            )}

        </span>

    </div>


    <div class="satori-editorial-image">

        <div class="satori-editorial-image-grid"></div>


        <span class="satori-editorial-number">
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


        <span class="satori-editorial-mark">
            SATORII
        </span>

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

    const related =
        getRelatedProducts(
            product,
            products
        );


    if (
        !related.length
    ) {

        return "";

    }


    return `
<section
    class="satori-related"
    aria-label="También te puede gustar"
>

    <div class="satori-section-heading">

        <div>

            <span>
                SATORII
            </span>

            <h2>
                TAMBIÉN TE PUEDE GUSTAR
            </h2>

        </div>


        <p>
            POLERAS SELECCIONADAS
            PARA TI.
        </p>

    </div>


    <div class="satori-related-grid">

        ${related
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

        <span class="satori-related-number">
            ${String(
                index + 1
            ).padStart(
                2,
                "0"
            )}
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
   CSS · DISEÑO 10
========================================================= */

function buildDesignCSS() {

    return `

/* =========================================================
   SATORII · PRODUCT PAGE
   DISEÑO 10 · BOLD COMMERCE
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
            1420px,
            calc(
                100% - 90px
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

    flex-wrap:
        wrap;

    gap:
        8px;

    padding:
        20px 0 18px;

    color:
        #8A8A8A;

    font-size:
        9px;

    font-weight:
        700;

    letter-spacing:
        .02em;

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
        var(--product-red);

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
        minmax(0, 1.2fr)
        minmax(390px, .68fr);

    gap:
        clamp(
            50px,
            7vw,
            115px
        );

    align-items:
        start;

    padding:
        5px 0 45px;

}


/* =========================================================
   GALERÍA
========================================================= */

.satori-gallery {

    display:
        grid;

    grid-template-columns:
        78px
        minmax(0, 1fr);

    gap:
        16px;

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
        78px;

    height:
        88px;

    padding:
        4px;

    border:
        1px solid #D7D7D7;

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
        #999999;

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

    aspect-ratio:
        1 / 1;

    background:
        #F7F7F7;

    overflow:
        hidden;

}


.satori-main-visual::before {

    content:
        "SATORII";

    position:
        absolute;

    left:
        18px;

    top:
        14px;

    color:
        rgba(0,0,0,.08);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        clamp(
            45px,
            7vw,
            105px
        );

    font-weight:
        900;

    letter-spacing:
        -.06em;

    line-height:
        .8;

    pointer-events:
        none;

}


.satori-main-visual::after {

    content:
        "SATORII";

    position:
        absolute;

    right:
        16px;

    bottom:
        10px;

    color:
        rgba(0,0,0,.06);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        40px;

    font-weight:
        900;

    transform:
        rotate(-90deg);

    transform-origin:
        right bottom;

    pointer-events:
        none;

}


.satori-main-image {

    position:
        relative;

    z-index:
        2;

    display:
        block;

    width:
        100%;

    height:
        100%;

    padding:
        35px;

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


.satori-main-zoom {

    position:
        absolute;

    z-index:
        4;

    right:
        16px;

    bottom:
        16px;

    width:
        38px;

    height:
        38px;

    border:
        1px solid #D8D8D8;

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
        10px;

}


.satori-eyebrow {

    display:
        inline-flex;

    margin-bottom:
        13px;

    padding:
        4px 8px;

    background:
        var(--product-red);

    color:
        #FFFFFF;

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .1em;

}


.satori-product-title {

    margin:
        0;

    max-width:
        620px;

    color:
        #111111;

    font-family:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        clamp(
            42px,
            5vw,
            72px
        );

    line-height:
        .86;

    font-weight:
        900;

    letter-spacing:
        -.045em;

    text-transform:
        uppercase;

}


.satori-price {

    margin-top:
        18px;

    color:
        var(--product-red);

    font-size:
        20px;

    font-weight:
        900;

}


.satori-tax {

    margin-top:
        6px;

    padding-bottom:
        20px;

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
        .09em;

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

}


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
        27px;

    height:
        27px;

    padding:
        3px;

    border:
        1px solid #D5D5D5;

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
        1px solid rgba(0,0,0,.12);

    border-radius:
        50%;

}


.satori-color.active {

    border:
        2px solid #111111;

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
        42px;

    height:
        36px;

    padding:
        0 11px;

    border:
        1px solid #CCCCCC;

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
   CANTIDAD
========================================================= */

.satori-quantity-row {

    display:
        grid;

    grid-template-columns:
        110px
        minmax(0, 1fr);

    gap:
        10px;

    margin-top:
        25px;

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
        34px;

    height:
        100%;

    border:
        0;

    background:
        transparent;

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
        .08em;

    cursor:
        pointer;

}


.satori-add:hover {

    background:
        #111111;

    border-color:
        #111111;

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
        repeat(3,1fr);

    gap:
        15px;

    margin-top:
        20px;

    padding:
        18px 0;

    border-top:
        1px solid var(--product-border);

    border-bottom:
        1px solid var(--product-border);

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
        26px;

    height:
        26px;

    flex:
        0 0 26px;

    border:
        1px solid #D8D8D8;

    border-radius:
        50%;

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
        28px;

    border-bottom:
        1px solid #DADADA;

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


/* =========================================================
   BANNER EDITORIAL
========================================================= */

.satori-editorial-banner {

    display:
        grid;

    grid-template-columns:
        minmax(0, .82fr)
        minmax(0, 1.18fr);

    min-height:
        330px;

    margin:
        0 0 55px;

    background:
        var(--product-dark);

    color:
        #FFFFFF;

    overflow:
        hidden;

}


.satori-editorial-copy {

    position:
        relative;

    z-index:
        3;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    padding:
        45px 50px;

}


.satori-editorial-copy::before {

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
        var(--product-red);

}


.satori-editorial-kicker {

    display:
        block;

    margin-bottom:
        13px;

    color:
        var(--product-red);

    font-size:
        9px;

    font-weight:
        900;

    letter-spacing:
        .14em;

}


.satori-editorial-copy h2 {

    max-width:
        490px;

    margin:
        0;

    font-family:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;

    font-size:
        clamp(
            38px,
            5vw,
            67px
        );

    line-height:
        .84;

    font-weight:
        900;

    letter-spacing:
        -.045em;

    text-transform:
        uppercase;

}


.satori-editorial-copy p {

    max-width:
        430px;

    margin:
        18px 0 0;

    color:
        #C9CED6;

    font-size:
        10px;

    line-height:
        1.7;

}


.satori-editorial-line {

    width:
        55px;

    height:
        2px;

    margin:
        25px 0 13px;

    background:
        var(--product-red);

}


.satori-editorial-product {

    color:
        #FFFFFF;

    font-size:
        8px;

    font-weight:
        900;

    letter-spacing:
        .12em;

}


.satori-editorial-image {

    position:
        relative;

    min-height:
        330px;

    background:
        #151D2D;

    overflow:
        hidden;

}


.satori-editorial-image::before {

    content:
        "";

    position:
        absolute;

    inset:
        0;

    background:
        linear-gradient(
            90deg,
            #101727 0%,
            rgba(16,23,39,.65) 20%,
            rgba(16,23,39,0) 60%
        );

    z-index:
        2;

    pointer-events:
        none;

}


.satori-editorial-image-grid {

    position:
        absolute;

    inset:
        0;

    background-image:
        linear-gradient(
            rgba(255,255,255,.045) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,.045) 1px,
            transparent 1px
        );

    background-size:
        34px 34px;

    opacity:
        .45;

}


.satori-editorial-image img {

    position:
        absolute;

    inset:
        0;

    z-index:
        1;

    width:
        100%;

    height:
        100%;

    object-fit:
        cover;

    object-position:
        center;

}


.satori-editorial-number {

    position:
        absolute;

    z-index:
        4;

    left:
        25px;

    top:
        20px;

    color:
        rgba(255,255,255,.15);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        90px;

    font-weight:
        900;

    line-height:
        .8;

}


.satori-editorial-mark {

    position:
        absolute;

    z-index:
        4;

    right:
        20px;

    bottom:
        18px;

    color:
        rgba(255,255,255,.18);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        25px;

    font-weight:
        900;

    letter-spacing:
        -.03em;

    transform:
        rotate(-90deg);

    transform-origin:
        right bottom;

}


/* =========================================================
   RELACIONADOS
========================================================= */

.satori-related {

    padding:
        0 0 85px;

}


.satori-section-heading {

    display:
        flex;

    align-items:
        flex-end;

    justify-content:
        space-between;

    gap:
        30px;

    margin-bottom:
        23px;

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
        38px;

    line-height:
        .9;

    font-weight:
        900;

    text-transform:
        uppercase;

}


.satori-section-heading p {

    max-width:
        250px;

    margin:
        0;

    color:
        #888888;

    font-size:
        8px;

    line-height:
        1.5;

    text-align:
        right;

    font-weight:
        700;

}


.satori-related-grid {

    display:
        grid;

    grid-template-columns:
        repeat(4,1fr);

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

    position:
        relative;

    aspect-ratio:
        1 / 1.04;

    background:
        #F7F7F7;

    overflow:
        hidden;

}


.satori-related-number {

    position:
        absolute;

    z-index:
        2;

    left:
        10px;

    top:
        9px;

    color:
        rgba(0,0,0,.18);

    font-family:
        "Barlow Condensed",
        Arial,
        sans-serif;

    font-size:
        30px;

    font-weight:
        900;

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
        scale(1.045);

}


.satori-related-info {

    padding:
        11px 2px 0;

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
    max-width: 1100px
) {

    .satori-product-wrap {

        width:
            min(
                100%,
                calc(100% - 55px)
            );

    }


    .satori-product-hero {

        grid-template-columns:
            minmax(0,1fr)
            minmax(340px,.72fr);

        gap:
            38px;

    }


    .satori-editorial-banner {

        grid-template-columns:
            minmax(0,.9fr)
            minmax(0,1.1fr);

    }


    .satori-related-grid {

        grid-template-columns:
            repeat(3,1fr);

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
            680px;

    }


    .satori-editorial-banner {

        grid-template-columns:
            1fr;

    }


    .satori-editorial-image {

        min-height:
            300px;

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
            calc(100% - 28px);

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
            1 / 1.04;

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
                36px,
                12vw,
                52px
            );

    }


    .satori-price {

        font-size:
            18px;

    }


    .satori-quantity-row {

        grid-template-columns:
            92px
            minmax(0,1fr);

    }


    .satori-benefits {

        grid-template-columns:
            1fr;

        gap:
            12px;

    }


    .satori-editorial-banner {

        margin:
            0 0 40px;

    }


    .satori-editorial-copy {

        padding:
            38px 25px;

    }


    .satori-editorial-copy h2 {

        font-size:
            42px;

    }


    .satori-editorial-copy p {

        font-size:
            9px;

    }


    .satori-editorial-image {

        min-height:
            260px;

    }


    .satori-section-heading {

        align-items:
            flex-start;

        flex-direction:
            column;

        gap:
            10px;

    }


    .satori-section-heading p {

        max-width:
            100%;

        text-align:
            left;

    }


    .satori-related {

        padding-bottom:
            55px;

    }


    .satori-related-grid {

        grid-template-columns:
            repeat(
                2,
                minmax(0,1fr)
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
            calc(100% - 20px);

    }


    .satori-product-title {

        font-size:
            33px;

    }


    .satori-tabs {

        gap:
            17px;

    }


    .satori-tab {

        font-size:
            8px;

    }


    .satori-editorial-copy {

        padding:
            32px 20px;

    }


    .satori-editorial-copy h2 {

        font-size:
            35px;

    }


    .satori-editorial-image {

        min-height:
            220px;

    }


    .satori-section-heading h2 {

        font-size:
            33px;

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
                >
                    AGREGAR AL CARRITO
                </button>

            </div>


            ${buildBenefits()}


            <div class="satori-description-box">

                <div
                    class="s
