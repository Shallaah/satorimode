/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   =========================================================

   Este script:

   1. Lee js/products.js
   2. Obtiene el catálogo PRODUCTS
   3. Valida los productos
   4. Utiliza una página existente como plantilla visual
   5. Genera las páginas individuales
   6. Mantiene header, footer, carrito y scripts globales
   7. Adapta automáticamente las rutas según profundidad
   8. Genera galerías, colores, tallas y productos relacionados

   Ejecutar:

       npm run generate-products

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


/**
 * Escapa texto para HTML.
 */
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


/**
 * Escapa texto para utilizarlo
 * dentro de una expresión regular.
 */
function escapeRegExp(value) {

    return String(value)
        .replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

}


/**
 * Convierte un valor a slug.
 */
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


/**
 * Formatea precios CLP.
 */
function formatPrice(
    value
) {

    const price =
        Number(value) || 0;

    return (
        "$" +
        price.toLocaleString(
            "es-CL"
        )
    );

}


/**
 * Convierte categoría a texto visual.
 */
function displayCategory(
    product
) {

    return String(
        product.collection ||
        product.category ||
        "SATORII"
    )
        .toUpperCase();

}


/**
 * Obtiene la profundidad de una URL.
 */
function getUrlDepth(
    productUrl
) {

    const normalized =
        String(productUrl)
            .replace(
                /^\/+/,
                ""
            )
            .replace(
                /\/+$/,
                ""
            );

    const directory =
        path.posix.dirname(
            normalized
        );

    if (
        !directory ||
        directory === "."
    ) {

        return 0;

    }

    return directory
        .split("/")
        .filter(Boolean)
        .length;

}


/**
 * Genera una ruta relativa desde
 * la carpeta de la página hacia la raíz.
 */
function getRootPrefix(
    productUrl
) {

    const depth =
        getUrlDepth(
            productUrl
        );

    if (depth <= 0) {

        return "./";

    }

    return "../".repeat(
        depth
    );

}


/**
 * Convierte una ruta de imagen
 * del catálogo en una ruta relativa
 * desde la página del producto.
 */
function imagePathForPage(
    imagePath,
    productUrl
) {

    if (!imagePath) {

        return "";

    }

    const cleanImage =
        String(imagePath)
            .replace(
                /^\/+/,
                ""
            );

    const rootPrefix =
        getRootPrefix(
            productUrl
        );

    return (
        rootPrefix +
        cleanImage
    );

}


/**
 * Convierte la URL de producto
 * en una ruta física.
 */
function getOutputPath(
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
        !url.endsWith(".html")
    ) {

        url += ".html";

    }

    return path.join(
        ROOT_DIR,
        ...url.split("/")
    );

}


/* =========================================================
   CARGAR PRODUCTS
========================================================= */


/**
 * Lee js/products.js y obtiene
 * exclusivamente const PRODUCTS.
 */
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


    const start =
        source.indexOf(
            "const PRODUCTS ="
        );


    if (start === -1) {

        throw new Error(
            "No se encontró 'const PRODUCTS =' en js/products.js"
        );

    }


    const arrayStart =
        source.indexOf(
            "[",
            start
        );


    if (arrayStart === -1) {

        throw new Error(
            "No se encontró el inicio del catálogo PRODUCTS."
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


    let products;


    try {

        products =
            vm.runInNewContext(
                "(" +
                arraySource +
                ")",
                {}
            );

    }
    catch (error) {

        throw new Error(
            "No se pudo interpretar PRODUCTS desde js/products.js.\n" +
            error.message
        );

    }


    if (
        !Array.isArray(products)
    ) {

        throw new Error(
            "PRODUCTS no contiene un array válido."
        );

    }


    return products;

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
                    `Producto inválido en posición ${index}.`
                );

            }


            if (!product.id) {

                throw new Error(
                    `El producto #${index + 1} no tiene id.`
                );

            }


            if (
                ids.has(
                    String(product.id)
                )
            ) {

                throw new Error(
                    `ID duplicado: ${product.id}`
                );

            }


            ids.add(
                String(product.id)
            );


            if (!product.name) {

                throw new Error(
                    `El producto ${product.id} no tiene name.`
                );

            }


            if (
                product.price === undefined ||
                product.price === null
            ) {

                throw new Error(
                    `El producto ${product.id} no tiene price.`
                );

            }


            if (!product.image) {

                throw new Error(
                    `El producto ${product.id} no tiene image.`
                );

            }


            if (
                !product.url
            ) {

                console.warn(
                    `⚠ ${product.id} no tiene url. Se generará automáticamente.`
                );

            }

        }
    );

}


/* =========================================================
   PLANTILLA
========================================================= */


/**
 * Busca una página existente
 * que pueda utilizarse como plantilla.
 */
function findTemplate() {

    const candidates = [
        TEMPLATE_FILE,
        DEFAULT_TEMPLATE
    ];


    for (
        const candidate of candidates
    ) {

        if (
            fs.existsSync(
                candidate
            )
        ) {

            return candidate;

        }

    }


    /*
     * Buscar cualquier HTML dentro
     * de productos.
     */

    if (
        fs.existsSync(
            PRODUCTS_DIR
        )
    ) {

        const files =
            findHTMLFiles(
                PRODUCTS_DIR
            );


        if (
            files.length
        ) {

            return files[0];

        }

    }


    throw new Error(
        "No se encontró ninguna página HTML para utilizar como plantilla."
    );

}


/**
 * Busca HTML recursivamente.
 */
function findHTMLFiles(
    directory
) {

    const result = [];


    if (
        !fs.existsSync(
            directory
        )
    ) {

        return result;

    }


    for (
        const entry of
        fs.readdirSync(
            directory,
            {
                withFileTypes: true
            }
        )
    ) {

        const fullPath =
            path.join(
                directory,
                entry.name
            );


        if (
            entry.isDirectory()
        ) {

            result.push(
                ...findHTMLFiles(
                    fullPath
                )
            );

            continue;

        }


        if (
            entry.isFile() &&
            entry.name
                .toLowerCase()
                .endsWith(".html")
        ) {

            result.push(
                fullPath
            );

        }

    }


    return result;

}


/**
 * Extrae todos los bloques <style>
 * de la plantilla.
 */
function extractStyles(
    template
) {

    const matches =
        template.match(
            /<style[\s\S]*?<\/style>/gi
        );


    if (
        !matches ||
        !matches.length
    ) {

        throw new Error(
            "La plantilla no contiene bloques <style>."
        );

    }


    return matches.join(
        "\n\n"
    );

}


/**
 * Extrae los scripts globales
 * desde SUPABASE hasta el final.
 */
function extractScripts(
    template
) {

    const marker =
        "<!-- SUPABASE -->";


    const index =
        template.indexOf(
            marker
        );


    if (
        index === -1
    ) {

        throw new Error(
            "No se encontró la sección de scripts globales en la plantilla."
        );

    }


    return template.slice(
        index
    );

}


/* =========================================================
   HTML · GALERÍA
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


    return `

        <div class="satori-main-image">

            <img
                id="satoriMainImage"
                src="${escapeHTML(
                    imagePathForPage(
                        images[0],
                        productUrl
                    )
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
                .join(
                    "\n"
                )}

        </div>

    `;

}


/* =========================================================
   HTML · COLORES
========================================================= */

function colorClass(
    color
) {

    const normalized =
        slugify(
            color
        );


    const known = [
        "black",
        "negro",
        "white",
        "blanco",
        "red",
        "rojo",
        "blue",
        "azul",
        "green",
        "verde",
        "yellow",
        "amarillo"
    ];


    if (
        known.includes(
            normalized
        )
    ) {

        const map = {

            negro: "black",
            blanco: "white",
            rojo: "red",
            azul: "blue",
            verde: "green",
            amarillo: "yellow"

        };


        return (
            "color-" +
            (
                map[
                    normalized
                ] ||
                normalized
            )
        );

    }


    return "";

}


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

                            const dotClass =
                                colorClass(
                                    color
                                );


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
                            class="
                                satori-color-dot
                                ${dotClass}
                            "
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
                    .join(
                        "\n"
                    )}

            </div>

        </section>

    `;

}


/* =========================================================
   HTML · TALLAS
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


    const rootPrefix =
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
                        rootPrefix +
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
                    .join(
                        "\n"
                    )}

            </div>

        </section>

    `;

}


/* =========================================================
   HTML · PRODUCTO PRINCIPAL
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
        "Todos nuestros productos cuentan con garantía frente a fallas de fabricación.";


    const care =
        product.details?.care ||
        "Seguir las instrucciones de cuidado del producto.";


    return `

<section
    class="satori-product-layout satori-content-animate"
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


                <span
                    id="satoriQuantity"
                >
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

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
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

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
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

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
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

    const related =
        products
            .filter(
                function (
                    item
                ) {

                    return (
                        item.id !==
                        product.id
                    );

                }
            )
            .filter(
                function (
                    item
                ) {

                    if (
                        product.category &&
                        item.category
                    ) {

                        return (
                            item.category ===
                            product.category
                        );

                    }

                    return true;

                }
            )
            .slice(
                0,
                5
            );


    /*
     * Si no encontramos productos
     * de la misma categoría,
     * utilizamos otros productos.
     */

    if (
        !related.length
    ) {

        related.push(
            ...products
                .filter(
                    item =>
                        item.id !==
                        product.id
                )
                .slice(
                    0,
                    5
                )
        );

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
                        item.url ||
                        `productos/${
                            slugify(
                                item.category ||
                                "productos"
                            )
                        }/${
                            slugify(
                                item.id ||
                                item.name
                            )
                        }.html`;


                    const relativeUrl =
                        path.posix.relative(
                            path.posix.dirname(
                                productUrl
                            ),
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

                <div
                    class="satori-related-image"
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
                    class="satori-related-info"
                >

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
            .join(
                "\n"
            )}

    </div>

</section>

    `;

}


/* =========================================================
   SECCIONES EDITORIALES
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


    const category =
        displayCategory(
            product
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
                category
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
   HTML COMPLETO
========================================================= */

function buildPage(
    product,
    products,
    styles,
    scripts
) {

    const productUrl =
        String(
            product.url ||
            ""
        )
            .replace(
                /^\/+/,
                ""
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


    const rootPrefix =
        getRootPrefix(
            productUrl
        );


    const mainSection =
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
            rootPrefix +
            "img/logo.png"
        )}"
    >


    <link
        rel="stylesheet"
        href="${escapeHTML(
            rootPrefix +
            "css/style.css"
        )}"
    >

    <link
        rel="stylesheet"
        href="${escapeHTML(
            rootPrefix +
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


    <main class="satori-page-animate">

        <div
            class="satori-product-page"
        >

            ${mainSection}

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
   GENERAR PRODUCTOS
========================================================= */

function generateProducts() {

    console.log(
        "========================================"
    );

    console.log(
        "SATORII · GENERADOR DE PRODUCTOS"
    );

    console.log(
        "========================================"
    );


    console.log(
        ""
    );


    /*
     * Cargar productos.
     */

    const products =
        loadProducts();


    console.log(
        `✓ Productos cargados: ${products.length}`
    );


    /*
     * Validar.
     */

    validateProducts(
        products
    );


    console.log(
        "✓ Catálogo validado."
    );


    /*
     * Buscar plantilla.
     */

    const templateFile =
        findTemplate();


    console.log(
        `✓ Plantilla: ${path.relative(
            ROOT_DIR,
            templateFile
        )}`
    );


    const template =
        fs.readFileSync(
            templateFile,
            "utf8"
        );


    /*
     * Extraer estilos y scripts.
     */

    const styles =
        extractStyles(
            template
        );


    const scripts =
        extractScripts(
            template
        );


    console.log(
        "✓ Estilos de plantilla cargados."
    );

    console.log(
        "✓ Scripts globales cargados."
    );


    /*
     * Generar cada producto.
     */

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
                path
                    .relative(
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
                    styles,
                    scripts
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


    console.log(
        ""
    );


    console.log(
        "========================================"
    );

    console.log(
        `✓ Páginas generadas: ${generated}`
    );

    console.log(
        "========================================"
    );

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

    console.error(
        ""
    );

    console.error(
        "========================================"
    );

    console.error(
        "SATORII · ERROR"
    );

    console.error(
        "========================================"
    );

    console.error(
        ""
    );

    console.error(
        error.message
    );

    console.error(
        ""
    );

    process.exit(
        1
    );

}
