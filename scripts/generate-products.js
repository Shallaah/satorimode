/*
=========================================================
 SATORII
 GENERADOR AUTOMÁTICO DE PÁGINAS DE PRODUCTO
=========================================================

 GENERA:

    productos/anime/*.html
    productos/streetwear/*.html
    productos/accesorios/*.html
    productos/otros/*.html

 CARACTERÍSTICAS:

 - Máximo 3 imágenes
 - Galería cuadrada
 - Diseño superior estilo SATORII
 - Color / talla / cantidad
 - Carrito integrado
 - Compatibilidad con:
       satorimode_cart
       satoriCart
 - Recomendaciones aleatorias
 - Banner editorial SATORII
 - Bloque de detalles
 - Guía de cuidado
 - Banner final
 - Header global
 - Footer global

 IMPORTANTE:

 La página de producto NO carga carrito.js
 porque el botón utiliza su propio sistema
 para evitar agregar el producto dos veces.

 El carrito principal es:

    satorimode_cart

 Se mantiene también:

    satoriCart

 para compatibilidad con versiones anteriores
 del header.
=========================================================
*/


const fs =
    require("fs");

const path =
    require("path");

const vm =
    require("vm");


/* =====================================================
   RUTAS
===================================================== */

const ROOT =
    path.resolve(
        __dirname,
        ".."
    );


const PRODUCTS_FILE =
    path.join(
        ROOT,
        "js",
        "products.js"
    );


const OUTPUT_DIR =
    path.join(
        ROOT,
        "productos"
    );


/* =====================================================
   CARGAR PRODUCTOS
===================================================== */

function loadProducts() {

    if (
        !fs.existsSync(
            PRODUCTS_FILE
        )
    ) {

        throw new Error(
            "No se encontró js/products.js"
        );

    }


    const source =
        fs.readFileSync(
            PRODUCTS_FILE,
            "utf8"
        );


    const context = {
        console
    };


    vm.createContext(
        context
    );


    vm.runInContext(
        source +
        "\n;globalThis.__SATORII_PRODUCTS__ = PRODUCTS;",
        context
    );


    if (
        !Array.isArray(
            context.__SATORII_PRODUCTS__
        )
    ) {

        throw new Error(
            "PRODUCTS no es un arreglo válido."
        );

    }


    return context.__SATORII_PRODUCTS__;

}


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escapeHTML(
    value
) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(
        value
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
   PRECIO
===================================================== */

function formatPrice(
    value
) {

    return "$" +
        Number(
            value || 0
        )
        .toLocaleString(
            "es-CL"
        );

}


/* =====================================================
   SLUG
===================================================== */

function slugify(
    value
) {

    return String(
        value || ""
    )
        .normalize(
            "NFD"
        )
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


/* =====================================================
   CATEGORÍA
===================================================== */

function normalizeCategory(
    category
) {

    const value =
        String(
            category ||
            "otros"
        )
        .normalize(
            "NFD"
        )
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();


    if (
        value === "anime" ||
        value === "streetwear" ||
        value === "accesorios"
    ) {

        return value;

    }


    return "otros";

}


/* =====================================================
   IMÁGENES
===================================================== */

function getImages(
    product
) {

    if (
        Array.isArray(
            product.images
        ) &&
        product.images.length
    ) {

        return product.images.slice(
            0,
            3
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
   RUTA DE IMAGEN
===================================================== */

function getImagePath(
    image,
    outputDirectory
) {

    if (!image) {

        return "";

    }


    const absolute =
        path.resolve(
            ROOT,
            String(image)
        );


    const relative =
        path.relative(
            outputDirectory,
            absolute
        );


    return relative
        .split(
            path.sep
        )
        .join("/");

}


/* =====================================================
   CLASE DE COLOR
===================================================== */

function getColorClass(
    color
) {

    const value =
        String(
            color || ""
        )
        .normalize(
            "NFD"
        )
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase();


    if (
        value.includes("blanco") ||
        value.includes("white")
    ) {

        return "satori-color-white";

    }


    if (
        value.includes("rojo") ||
        value.includes("red")
    ) {

        return "satori-color-red";

    }


    if (
        value.includes("azul") ||
        value.includes("blue")
    ) {

        return "satori-color-blue";

    }


    if (
        value.includes("verde") ||
        value.includes("green")
    ) {

        return "satori-color-green";

    }


    return "satori-color-black";

}


/* =====================================================
   GALERÍA
===================================================== */

function generateGallery(
    product,
    outputDirectory
) {

    const images =
        getImages(
            product
        );


    if (
        !images.length
    ) {

        return `

            <div class="satori-main-image">

                <div class="satori-image-placeholder">
                    SATORII
                </div>

            </div>

        `;

    }


    const prepared =
        images.map(
            function (
                image
            ) {

                return getImagePath(
                    image,
                    outputDirectory
                );

            }
        );


    const main =
        prepared[0];


    const thumbnails =
        prepared.map(
            function (
                image,
                index
            ) {

                return `

                    <button
                        type="button"
                        class="
                            satori-thumbnail
                            ${
                                index === 0
                                    ? "active"
                                    : ""
                            }
                        "
                        data-image="${escapeHTML(
                            image
                        )}"
                        aria-label="Imagen ${
                            index + 1
                        }"
                    >

                        <img
                            src="${escapeHTML(
                                image
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
        .join("");


    return `

        <div class="satori-main-image">

            <img
                id="satoriMainImage"
                src="${escapeHTML(
                    main
                )}"
                alt="${escapeHTML(
                    product.name
                )}"
            >

        </div>


        <div class="satori-thumbnails">

            ${thumbnails}

        </div>

    `;

}


/* =====================================================
   COLORES
===================================================== */

function generateColors(
    product
) {

    if (
        !Array.isArray(
            product.colors
        ) ||
        !product.colors.length
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

                ${
                    product.colors
                        .map(
                            function (
                                color,
                                index
                            ) {

                                return `

                                    <button
                                        type="button"
                                        class="
                                            satori-color-button
                                            ${
                                                index === 0
                                                    ? "active"
                                                    : ""
                                            }
                                        "
                                        data-color="${escapeHTML(
                                            color
                                        )}"
                                    >

                                        <span
                                            class="
                                                satori-color-dot
                                                ${getColorClass(
                                                    color
                                                )}
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
                        .join("")
                }

            </div>

        </section>

    `;

}


/* =====================================================
   TALLAS
===================================================== */

function generateSizes(
    product
) {

    if (
        !Array.isArray(
            product.sizes
        ) ||
        !product.sizes.length
    ) {

        return "";

    }


    return `

        <section class="satori-option">

            <div class="satori-option-header">

                <span>
                    TALLA
                </span>

                <a
                    href="../../guia-tallas.html"
                >
                    GUÍA DE TALLAS
                </a>

            </div>


            <div class="satori-size-options">

                ${
                    product.sizes
                        .map(
                            function (
                                size,
                                index
                            ) {

                                return `

                                    <button
                                        type="button"
                                        class="
                                            satori-size-button
                                            product-size
                                            ${
                                                index === 0
                                                    ? "active"
                                                    : ""
                                            }
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
                        .join("")
                }

            </div>

        </section>

    `;

}


/* =====================================================
   BLOQUE DE CONFIANZA
===================================================== */

function generateTrustBlocks(
    product
) {

    const details =
        product.details ||
        {};


    const shipping =
        details.shipping ||
        "Envíos a todo Chile.";


    const warranty =
        details.warranty ||
        "Compra protegida frente a fallas de fabricación.";


    return `

        <div class="satori-trust-grid">

            <div class="satori-trust-item">

                <div class="satori-trust-icon">
                    ↗
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
                    ✓
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
                    ★
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

    `;

}


/* =====================================================
   DETALLES
===================================================== */

function generateDetails(
    product
) {

    const details =
        product.details ||
        {};


    const description =
        details.description ||
        product.description ||
        "Producto creado para representar el estilo SATORII.";


    const shipping =
        details.shipping ||
        "Enviamos a todo Chile.";


    const warranty =
        details.warranty ||
        "Compra protegida frente a fallas de fabricación.";


    const care =
        details.care ||
        "";


    return `

        <section class="satori-details">

            <div class="satori-tabs">

                <button
                    type="button"
                    class="
                        satori-tab
                        active
                    "
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
                class="
                    satori-panel
                    active
                "
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


                ${
                    care
                        ? `
                            <p class="satori-product-care">

                                <strong>
                                    Cuidados:
                                </strong>

                                ${escapeHTML(
                                    care
                                )}

                            </p>
                          `
                        : ""
                }

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

    `;

}


/* =====================================================
   RECOMENDACIONES
===================================================== */

function shuffle(
    array
) {

    const result =
        array.slice();


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }


    return result;

}


function generateRecommendations(
    currentProduct,
    allProducts,
    outputDirectory
) {

    const currentId =
        String(
            currentProduct.id
        );


    const currentCategory =
        normalizeCategory(
            currentProduct.category
        );


    const available =
        allProducts.filter(
            function (
                product
            ) {

                return (
                    product &&
                    String(
                        product.id
                    ) !== currentId &&
                    product.available !== false
                );

            }
        );


    const sameCategory =
        available.filter(
            function (
                product
            ) {

                return (
                    normalizeCategory(
                        product.category
                    ) === currentCategory
                );

            }
        );


    const otherCategory =
        available.filter(
            function (
                product
            ) {

                return (
                    normalizeCategory(
                        product.category
                    ) !== currentCategory
                );

            }
        );


    const related =
        shuffle(
            sameCategory
        )
        .concat(
            shuffle(
                otherCategory
            )
        )
        .slice(
            0,
            4
        );


    if (
        !related.length
    ) {

        return "";

    }


    const cards =
        related
            .map(
                function (
                    item
                ) {

                    const images =
                        getImages(
                            item
                        );


                    const image =
                        images.length
                            ? getImagePath(
                                images[0],
                                outputDirectory
                            )
                            : "";


                    const category =
                        String(
                            item.collection ||
                            item.category ||
                            "SATORII"
                        )
                        .toUpperCase();


                    const categoryPath =
                        normalizeCategory(
                            item.category
                        );


                    const filename =
                        `${slugify(
                            item.id ||
                            item.name
                        )}.html`;


                    const url =
                        `../${categoryPath}/${filename}`;


                    return `

                        <a
                            href="${escapeHTML(
                                url
                            )}"
                            class="
                                satori-related-card
                            "
                        >

                            <div
                                class="
                                    satori-related-image
                                "
                            >

                                ${
                                    image
                                        ? `
                                            <img
                                                src="${escapeHTML(
                                                    image
                                                )}"
                                                alt="${escapeHTML(
                                                    item.name
                                                )}"
                                                loading="lazy"
                                            >
                                          `
                                        : `
                                            <span>
                                                SATORII
                                            </span>
                                          `
                                }

                                <div
                                    class="
                                        satori-related-overlay
                                    "
                                >
                                    VER PRODUCTO →
                                </div>

                            </div>


                            <div
                                class="
                                    satori-related-info
                                "
                            >

                                <span>
                                    ${escapeHTML(
                                        category
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
            .join("");


    return `

        <section
            class="satori-related"
        >

            <div
                class="
                    satori-related-heading
                "
            >

                <span>
                    SATORII · DESCUBRE MÁS
                </span>


                <h2>
                    TAMBIÉN TE PUEDE
                    <em>GUSTAR.</em>
                </h2>


                <p>
                    Descubre otros diseños que podrían
                    convertirse en parte de tu universo.
                </p>

            </div>


            <div
                class="
                    satori-related-grid
                "
            >

                ${cards}

            </div>

        </section>

    `;

}


/* =====================================================
   BANNER EDITORIAL
===================================================== */

function generateEditorialBanner(
    product,
    mainImage
) {

    const category =
        String(
            product.collection ||
            product.category ||
            "SATORII"
        )
        .toUpperCase();


    return `

        <section
            class="satori-editorial"
        >

            <div
                class="
                    satori-editorial-content
                "
            >

                <span
                    class="
                        satori-editorial-label
                    "
                >
                    SATORII / ${escapeHTML(
                        category
                    )}
                </span>


                <h2>
                    NO VISTAS
                    <span>UN PERSONAJE.</span>
                    <br>
                    VISTE TU UNIVERSO.
                </h2>


                <p>
                    Diseños inspirados en anime, manga y cultura
                    japonesa para quienes quieren llevar algo
                    más que una simple polera.
                </p>


                <a
                    href="../../anime.html"
                    class="
                        satori-editorial-button
                    "
                >
                    EXPLORAR COLECCIÓN →
                </a>

            </div>


            <div
                class="
                    satori-editorial-image
                "
            >

                ${
                    mainImage
                        ? `
                            <img
                                src="${escapeHTML(
                                    mainImage
                                )}"
                                alt="${escapeHTML(
                                    product.name
                                )}"
                                loading="lazy"
                            >
                          `
                        : ""
                }

            </div>

        </section>

    `;

}


/* =====================================================
   BLOQUE DETALLES SATORII
===================================================== */

function generateBrandDetails(
    product
) {

    const details =
        product.details ||
        {};


    const care =
        details.care ||
        "Revisa nuestra guía para conservar tu prenda.";


    return `

        <section
            class="satori-brand-details"
        >

            <div
                class="
                    satori-brand-heading
                "
            >

                <span>
                    SATORII · DETALLE
                </span>


                <h2>
                    HECHO PARA
                    <em>FORMAR PARTE DE TU ESTILO.</em>
                </h2>

            </div>


            <div
                class="
                    satori-brand-grid
                "
            >

                <article>

                    <span>
                        01
                    </span>

                    <h3>
                        MATERIAL
                    </h3>

                    <p>
                        Una prenda pensada para acompañarte
                        en el día a día.
                    </p>

                </article>


                <article>

                    <span>
                        02
                    </span>

                    <h3>
                        DISEÑO
                    </h3>

                    <p>
                        Arte inspirado en anime, manga y
                        cultura japonesa.
                    </p>

                </article>


                <article>

                    <span>
                        03
                    </span>

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

        </section>

    `;

}


/* =====================================================
   GUÍA DE CUIDADO
===================================================== */

function generateCareGuide() {

    return `

        <section
            class="satori-care-guide"
        >

            <div
                class="
                    satori-care-icon
                "
            >
                🧺
            </div>


            <div
                class="
                    satori-care-content
                "
            >

                <span>
                    SATORII · CUIDADO
                </span>


                <h2>
                    CUIDA TU
                    <strong>SATORII.</strong>
                </h2>


                <p>
                    Queremos que tu diseño siga contigo
                    por mucho tiempo. Revisa nuestras
                    recomendaciones para conservar
                    correctamente tu prenda y estampado.
                </p>

            </div>


            <a
                href="../../cuidado.html"
                class="
                    satori-care-button
                "
            >
                VER GUÍA DE CUIDADO →
            </a>

        </section>

    `;

}


/* =====================================================
   BANNER FINAL
===================================================== */

function generateFinalBanner() {

    return `

        <section
            class="satori-final-banner"
        >

            <div>

                <span>
                    SATORII · TU UNIVERSO
                </span>


                <h2>
                    LLEVA TU
                    <strong>UNIVERSO.</strong>
                </h2>


                <p>
                    Explora más diseños y encuentra
                    la próxima pieza que te represente.
                </p>


                <a
                    href="../../productos.html"
                >
                    VER TODA LA COLECCIÓN →
                </a>

            </div>

        </section>

    `;

}


/* =====================================================
   FOOTER
===================================================== */

function generateFooter() {

    return `

        <div
            id="satori-footer"
        ></div>

    `;

}


/* =====================================================
   CSS
===================================================== */

function generateProductCSS() {

    return `

        :root {
            --satori-red: #f31218;
            --satori-black: #111827;
            --satori-muted: #777;
            --satori-border: #e6e6e6;
        }


        * {
            box-sizing: border-box;
        }


        body {
            margin: 0;
            background: #fff;
            color: var(--satori-black);
        }


        /* =================================================
           CONTENEDOR
        ================================================= */

        .satori-product-page {

            width:
                min(
                    1800px,
                    calc(100% - 60px)
                );

            margin:
                0 auto;

        }


        /* =================================================
           PRODUCTO PRINCIPAL
        ================================================= */

        .satori-product-layout {

            display: grid;

            grid-template-columns:
                minmax(0, 1.2fr)
                minmax(440px, .8fr);

            gap:
                clamp(
                    45px,
                    5vw,
                    90px
                );

            padding:
                70px 0 85px;

            align-items:
                start;

        }


        /* =================================================
           GALERÍA
        ================================================= */

        .satori-gallery {
            min-width: 0;
        }


        .satori-main-image {

            width: 100%;

            aspect-ratio: 1 / 1;

            display: flex;

            align-items: center;
            justify-content: center;

            overflow: hidden;

            background: #f7f7f7;

            border-radius: 12px;

        }


        .satori-main-image img {

            width: 100%;
            height: 100%;

            display: block;

            object-fit: contain;

            transition:
                transform .35s ease;

        }


        .satori-main-image:hover img {

            transform:
                scale(1.015);

        }


        .satori-image-placeholder {

            color: #aaa;

            font-size: 20px;

            font-weight: 900;

            letter-spacing: 4px;

        }


        /* =================================================
           MINIATURAS
        ================================================= */

        .satori-thumbnails {

            display: grid;

            grid-template-columns:
                repeat(3, minmax(0, 1fr));

            gap: 12px;

            margin-top: 14px;

        }


        .satori-thumbnail {

            width: 100%;

            aspect-ratio: 1 / 1;

            padding: 0;

            overflow: hidden;

            border:
                1px solid #ddd;

            border-radius: 8px;

            background: #f7f7f7;

            cursor: pointer;

            transition:
                border-color .2s ease,
                transform .2s ease;

        }


        .satori-thumbnail.active {

            border:
                2px solid #111;

        }


        .satori-thumbnail:hover {

            transform:
                translateY(-2px);

        }


        .satori-thumbnail img {

            width: 100%;
            height: 100%;

            object-fit: contain;

            display: block;

        }


        /* =================================================
           INFORMACIÓN
        ================================================= */

        .satori-product-info {

            max-width:
                700px;

        }


        .satori-product-category {

            display: block;

            margin-bottom: 9px;

            color:
                #777;

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 2px;

        }


        .satori-product-info h1 {

            margin: 0;

            color:
                #111827;

            font-size:
                clamp(
                    38px,
                    4vw,
                    58px
                );

            line-height:
                .95;

            letter-spacing:
                -2.5px;

            font-weight:
                900;

        }


        .satori-product-price {

            margin-top: 18px;

            color:
                #111827;

            font-size: 24px;

            font-weight: 900;

        }


        .satori-product-divider {

            width: 100%;

            height: 1px;

            margin:
                22px 0 25px;

            background:
                #e6e6e6;

        }


        /* =================================================
           OPCIONES
        ================================================= */

        .satori-option {

            margin-top: 22px;

        }


        .satori-option-header {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-bottom: 11px;

        }


        .satori-option-header span {

            color:
                #111827;

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 1px;

        }


        .satori-option-header a {

            color:
                #111827;

            font-size: 8px;

            font-weight: 800;

            text-decoration:
                underline;

        }


        .satori-size-options,
        .satori-color-options {

            display: flex;

            flex-wrap: wrap;

            gap: 9px;

        }


        .satori-size-button {

            min-width: 45px;

            min-height: 40px;

            padding:
                0 13px;

            border:
                1px solid #ddd;

            border-radius: 6px;

            background:
                #fff;

            color:
                #111827;

            font-size: 10px;

            font-weight: 800;

            cursor: pointer;

            transition:
                .2s ease;

        }


        .satori-size-button.active {

            background:
                #111827;

            border-color:
                #111827;

            color:
                #fff;

        }


        .satori-color-button {

            min-height: 40px;

            display: inline-flex;

            align-items: center;

            gap: 8px;

            padding:
                0 13px;

            border:
                1px solid #ddd;

            border-radius: 22px;

            background:
                #fff;

            color:
                #111827;

            font-size: 10px;

            font-weight: 700;

            cursor: pointer;

        }


        .satori-color-button.active {

            border-color:
                #111827;

            background:
                #111827;

            color:
                #fff;

        }


        .satori-color-dot {

            width: 13px;
            height: 13px;

            border-radius: 50%;

            display: block;

            border:
                1px solid #bbb;

        }


        .satori-color-black {
            background: #111;
        }


        .satori-color-white {
            background: #fff;
        }


        .satori-color-red {
            background: #f31218;
        }


        .satori-color-blue {
            background: #3568c8;
        }


        .satori-color-green {
            background: #3b9a5c;
        }


        /* =================================================
           CANTIDAD
        ================================================= */

        .satori-quantity-row {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-top: 26px;

        }


        .satori-quantity-label {

            color:
                #111827;

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 1px;

        }


        .satori-quantity {

            display: flex;

            align-items: center;

            border:
                1px solid #ddd;

            border-radius: 6px;

            overflow: hidden;

        }


        .satori-quantity button {

            width: 38px;

            height: 38px;

            border: 0;

            background:
                #fff;

            cursor: pointer;

            font-size: 14px;

        }


        .satori-quantity span {

            min-width: 34px;

            text-align: center;

            font-size: 10px;

            font-weight: 800;

        }


        .satori-quantity-input {

            position: absolute;

            width: 1px;
            height: 1px;

            opacity: 0;

            pointer-events: none;

        }


        /* =================================================
           BOTÓN CARRITO
        ================================================= */

        .satori-add-to-cart {

            width: 100%;

            min-height: 54px;

            margin-top: 18px;

            border: 0;

            border-radius: 6px;

            background:
                var(--satori-red);

            color: #fff;

            font-size: 10px;

            font-weight: 900;

            letter-spacing: .5px;

            cursor: pointer;

            transition:
                transform .2s ease,
                background .2s ease;

        }


        .satori-add-to-cart:hover {

            background:
                #d90d12;

            transform:
                translateY(-1px);

        }


        .satori-add-to-cart.is-added {

            background:
                #111827;

        }


        /* =================================================
           CONFIANZA
        ================================================= */

        .satori-trust-grid {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            margin-top: 8px;

            border:
                1px solid #e6e6e6;

            border-radius: 8px;

            overflow: hidden;

        }


        .satori-trust-item {

            min-height: 64px;

            display: flex;

            align-items: center;

            gap: 9px;

            padding:
                10px 12px;

        }


        .satori-trust-item + .satori-trust-item {

            border-left:
                1px solid #e6e6e6;

        }


        .satori-trust-icon {

            width: 25px;
            height: 25px;

            display: flex;

            align-items: center;
            justify-content: center;

            border:
                1px solid #ddd;

            border-radius: 50%;

            font-size: 10px;

        }


        .satori-trust-item strong {

            display: block;

            font-size: 8px;

            font-weight: 900;

        }


        .satori-trust-item span {

            display: block;

            margin-top: 3px;

            color: #777;

            font-size: 7px;

            line-height: 1.35;

        }


        /* =================================================
           DETALLES
        ================================================= */

        .satori-details {

            margin-top: 18px;

            border:
                1px solid #e6e6e6;

            border-radius: 8px;

            overflow: hidden;

        }


        .satori-tabs {

            display: grid;

            grid-template-columns:
                1fr 1fr;

            border-bottom:
                1px solid #e6e6e6;

        }


        .satori-tab {

            min-height: 48px;

            border: 0;

            background:
                #fafafa;

            color:
                #777;

            font-size: 9px;

            font-weight: 800;

            cursor: pointer;

        }


        .satori-tab + .satori-tab {

            border-left:
                1px solid #e6e6e6;

        }


        .satori-tab.active {

            background:
                #fff;

            color:
                #111827;

        }


        .satori-panel {

            display: none;

            padding: 22px;

        }


        .satori-panel.active {

            display: block;

        }


        .satori-panel h3 {

            margin:
                0 0 12px;

            color:
                #111827;

            font-size: 13px;

        }


        .satori-panel p {

            margin:
                0 0 12px;

            color:
                #666;

            font-size: 11px;

            line-height: 1.7;

        }


        .satori-product-care {

            padding-top:
                12px;

            border-top:
                1px solid #eee;

        }


        .satori-detail-item + .satori-detail-item {

            margin-top: 18px;

            padding-top: 18px;

            border-top:
                1px solid #eee;

        }


        .satori-detail-item strong {

            display: block;

            margin-bottom: 6px;

            font-size: 10px;

        }


        /* =================================================
           RECOMENDACIONES
        ================================================= */

        .satori-related {

            padding:
                65px 0 90px;

            border-top:
                1px solid #e5e5e5;

        }


        .satori-related-heading {

            margin-bottom:
                28px;

        }


        .satori-related-heading > span {

            display: block;

            margin-bottom: 9px;

            color:
                var(--satori-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 2px;

        }


        .satori-related-heading h2 {

            margin: 0;

            color:
                #111827;

            font-size:
                clamp(
                    30px,
                    4vw,
                    52px
                );

            line-height:
                .9;

            letter-spacing:
                -2.5px;

            font-weight:
                900;

        }


        .satori-related-heading h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-related-heading p {

            margin:
                10px 0 0;

            color:
                #777;

            font-size:
                12px;

        }


        .satori-related-grid {

            display: grid;

            grid-template-columns:
                repeat(4, 1fr);

            gap: 20px;

        }


        .satori-related-card {

            position: relative;

            display: block;

            min-width: 0;

            color: inherit;

            text-decoration: none;

        }


        .satori-related-image {

            position: relative;

            width: 100%;

            aspect-ratio: 1 / 1;

            overflow: hidden;

            background:
                #f6f6f6;

            border-radius: 8px;

        }


        .satori-related-image img {

            width: 100%;
            height: 100%;

            display: block;

            object-fit: contain;

            transition:
                transform .35s ease;

        }


        .satori-related-card:hover
        .satori-related-image img {

            transform:
                scale(1.035);

        }


        .satori-related-overlay {

            position: absolute;

            left: 12px;
            bottom: 12px;

            padding:
                8px 10px;

            background:
                #111827;

            color: #fff;

            font-size: 8px;

            font-weight: 900;

            letter-spacing: .5px;

            opacity: 0;

            transform:
                translateY(5px);

            transition:
                .25s ease;

        }


        .satori-related-card:hover
        .satori-related-overlay {

            opacity: 1;

            transform:
                translateY(0);

        }


        .satori-related-info {

            padding-top:
                12px;

        }


        .satori-related-info > span {

            display: block;

            color:
                var(--satori-red);

            font-size: 8px;

            font-weight: 900;

            letter-spacing:
                1.3px;

        }


        .satori-related-info h3 {

            margin:
                5px 0 0;

            color:
                #111827;

            font-size:
                13px;

            line-height:
                1.35;

            font-weight:
                700;

        }


        .satori-related-info strong {

            display: block;

            margin-top:
                6px;

            color:
                #111827;

            font-size:
                13px;

        }


        /* =================================================
           BANNER EDITORIAL
        ================================================= */

        .satori-editorial {

            position: relative;

            display: grid;

            grid-template-columns:
                1fr 1fr;

            min-height:
                440px;

            margin:
                20px 0 110px;

            overflow:
                hidden;

            background:
                #0d0d0d;

            color:
                #fff;

            border-radius:
                10px;

        }


        .satori-editorial-content {

            position: relative;

            z-index: 2;

            display: flex;

            flex-direction: column;

            justify-content: center;

            padding:
                70px;

        }


        .satori-editorial-label {

            margin-bottom:
                18px;

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                4px;

        }


        .satori-editorial h2 {

            max-width:
                650px;

            margin:
                0;

            font-size:
                clamp(
                    38px,
                    5vw,
                    70px
                );

            line-height:
                .88;

            letter-spacing:
                -3px;

            font-weight:
                900;

        }


        .satori-editorial h2 span {

            color:
                var(--satori-red);

        }


        .satori-editorial p {

            max-width:
                520px;

            margin:
                24px 0 0;

            color:
                #aaa;

            font-size:
                14px;

            line-height:
                1.7;

        }


        .satori-editorial-button {

            align-self:
                flex-start;

            margin-top:
                30px;

            padding:
                14px 20px;

            background:
                var(--satori-red);

            color:
                #fff;

            text-decoration:
                none;

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                .7px;

        }


        .satori-editorial-image {

            position:
                relative;

            min-height:
                440px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            overflow:
                hidden;

            background:
                linear-gradient(
                    135deg,
                    #111 0%,
                    #250000 100%
                );

        }


        .satori-editorial-image::before {

            content:
                "SATORII";

            position:
                absolute;

            right:
                -30px;

            bottom:
                -30px;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .035
                );

            font-size:
                130px;

            font-weight:
                900;

            transform:
                rotate(-8deg);

        }


        .satori-editorial-image img {

            position:
                relative;

            z-index:
                2;

            width:
                92%;

            height:
                92%;

            object-fit:
                contain;

            filter:
                drop-shadow(
                    0 30px 35px
                    rgba(
                        0,
                        0,
                        0,
                        .5
                    )
                );

        }


        /* =================================================
           DETALLES DE MARCA
        ================================================= */

        .satori-brand-details {

            margin:
                0 0 100px;

            padding:
                70px 0;

            border-top:
                1px solid #e5e5e5;

            border-bottom:
                1px solid #e5e5e5;

        }


        .satori-brand-heading > span {

            display: block;

            margin-bottom:
                10px;

            color:
                var(--satori-red);

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                3px;

        }


        .satori-brand-heading h2 {

            max-width:
                800px;

            margin:
                0;

            font-size:
                clamp(
                    30px,
                    4vw,
                    50px
                );

            line-height:
                .95;

            letter-spacing:
                -2px;

        }


        .satori-brand-heading h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-brand-grid {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap:
                30px;

            margin-top:
                45px;

        }


        .satori-brand-grid article {

            padding-top:
                20px;

            border-top:
                2px solid #111;

        }


        .satori-brand-grid article > span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

        }


        .satori-brand-grid h3 {

            margin:
                18px 0 9px;

            font-size:
                14px;

            letter-spacing:
                1px;

        }


        .satori-brand-grid p {

            margin:
                0;

            max-width:
                320px;

            color:
                #777;

            font-size:
                11px;

            line-height:
                1.7;

        }


        /* =================================================
           GUÍA DE CUIDADO
        ================================================= */

        .satori-care-guide {

            display:
                grid;

            grid-template-columns:
                auto 1fr auto;

            align-items:
                center;

            gap:
                25px;

            margin:
                0 0 90px;

            padding:
                28px 32px;

            border:
                1px solid #ddd;

            background:
                #fafafa;

            border-radius:
                8px;

        }


        .satori-care-icon {

            width:
                52px;

            height:
                52px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border:
                1px solid #ddd;

            border-radius:
                50%;

            background:
                #fff;

            font-size:
                22px;

        }


        .satori-care-content > span {

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
                2px;

        }


        .satori-care-content h2 {

            margin:
                0;

            font-size:
                25px;

            letter-spacing:
                -1px;

        }


        .satori-care-content h2 strong {

            color:
                var(--satori-red);

        }


        .satori-care-content p {

            max-width:
                650px;

            margin:
                8px 0 0;

            color:
                #777;

            font-size:
                11px;

            line-height:
                1.6;

        }


        .satori-care-button {

            display:
                inline-flex;

            align-items:
                center;

            justify-content:
                center;

            padding:
                14px 18px;

            border:
                1px solid #111;

            color:
                #111;

            background:
                #fff;

            text-decoration:
                none;

            font-size:
                9px;

            font-weight:
                900;

            white-space:
                nowrap;

            transition:
                .2s ease;

        }


        .satori-care-button:hover {

            background:
                #111;

            color:
                #fff;

        }


        /* =================================================
           BANNER FINAL
        ================================================= */

        .satori-final-banner {

            position:
                relative;

            overflow:
                hidden;

            margin:
                0 0 100px;

            padding:
                75px;

            background:
                linear-gradient(
                    110deg,
                    #080808 0%,
                    #180000 55%,
                    #520000 100%
                );

            color:
                #fff;

            border-radius:
                10px;

        }


        .satori-final-banner::after {

            content:
                "SATORII";

            position:
                absolute;

            right:
                -30px;

            bottom:
                -60px;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .04
                );

            font-size:
                150px;

            font-weight:
                900;

            transform:
                rotate(-6deg);

        }


        .satori-final-banner div {

            position:
                relative;

            z-index:
                2;

        }


        .satori-final-banner span {

            display:
                block;

            margin-bottom:
                12px;

            color:
                var(--satori-red);

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                3px;

        }


        .satori-final-banner h2 {

            margin:
                0;

            font-size:
                clamp(
                    40px,
                    5vw,
                    70px
                );

            line-height:
                .9;

            letter-spacing:
                -3px;

        }


        .satori-final-banner h2 strong {

            color:
                var(--satori-red);

        }


        .satori-final-banner p {

            max-width:
                500px;

            margin:
                20px 0 25px;

            color:
                #aaa;

            font-size:
                13px;

            line-height:
                1.7;

        }


        .satori-final-banner a {

            display:
                inline-flex;

            padding:
                14px 20px;

            background:
                var(--satori-red);

            color:
                #fff;

            text-decoration:
                none;

            font-size:
                9px;

            font-weight:
                900;

        }


        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (
            max-width: 1200px
        ) {

            .satori-product-layout {

                grid-template-columns:
                    minmax(0, 1fr)
                    minmax(360px, .85fr);

                gap:
                    45px;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(3, 1fr);

            }

        }


        @media (
            max-width: 900px
        ) {

            .satori-product-layout {

                grid-template-columns:
                    1fr;

            }


            .satori-product-info {

                max-width:
                    760px;

            }


            .satori-editorial {

                grid-template-columns:
                    1fr;

            }


            .satori-editorial-image {

                min-height:
                    380px;

            }


            .satori-brand-grid {

                grid-template-columns:
                    1fr 1fr;

            }


            .satori-care-guide {

                grid-template-columns:
                    auto 1fr;

            }


            .satori-care-button {

                grid-column:
                    2;

                justify-self:
                    start;

            }

        }


        @media (
            max-width: 700px
        ) {

            .satori-product-page {

                width:
                    calc(100% - 30px);

            }


            .satori-product-layout {

                padding:
                    35px 0 55px;

            }


            .satori-product-info h1 {

                font-size:
                    34px;

            }


            .satori-trust-grid {

                grid-template-columns:
                    1fr;

            }


            .satori-trust-item + .satori-trust-item {

                border-left:
                    0;

                border-top:
                    1px solid #e6e6e6;

            }


            .satori-related {

                padding:
                    45px 0 65px;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(2, 1fr);

                gap:
                    15px;

            }


            .satori-editorial {

                margin-bottom:
                    70px;

            }


            .satori-editorial-content {

                padding:
                    45px 30px;

            }


            .satori-editorial-image {

                min-height:
                    330px;

            }


            .satori-brand-details {

                margin-bottom:
                    70px;

                padding:
                    50px 0;

            }


            .satori-brand-grid {

                grid-template-columns:
                    1fr;

                gap:
                    25px;

            }


            .satori-care-guide {

                grid-template-columns:
                    1fr;

                margin-bottom:
                    65px;

                padding:
                    25px;

            }


            .satori-care-button {

                grid-column:
                    auto;

            }


            .satori-final-banner {

                margin-bottom:
                    65px;

                padding:
                    50px 30px;

            }

        }


        @media (
            max-width: 430px
        ) {

            .satori-product-page {

                width:
                    calc(100% - 20px);

            }


            .satori-thumbnails {

                gap:
                    7px;

            }


            .satori-product-info h1 {

                font-size:
                    30px;

            }


            .satori-related-grid {

                gap:
                    12px;

            }

        }

    `;

}


/* =====================================================
   JAVASCRIPT DEL PRODUCTO
===================================================== */

function generateProductJS(
    product,
    price
) {

    const firstSize =
        product.sizes &&
        product.sizes.length
            ? JSON.stringify(
                product.sizes[0]
            )
            : "null";


    const firstColor =
        product.colors &&
        product.colors.length
            ? JSON.stringify(
                product.colors[0]
            )
            : "null";


    const productName =
        JSON.stringify(
            product.name || ""
        );


    const productImage =
        JSON.stringify(
            product.image ||
            (
                Array.isArray(
                    product.images
                ) &&
                product.images.length
                    ? product.images[0]
                    : ""
            )
        );


    return `

        <script>

        document.addEventListener(
            "DOMContentLoaded",
            function () {


                /* =====================================
                   GALERÍA
                ====================================== */

                const mainImage =
                    document.getElementById(
                        "satoriMainImage"
                    );


                document
                    .querySelectorAll(
                        ".satori-thumbnail"
                    )
                    .forEach(
                        function (
                            thumbnail
                        ) {

                            thumbnail.addEventListener(
                                "click",
                                function () {

                                    const image =
                                        this.dataset.image;


                                    if (
                                        mainImage &&
                                        image
                                    ) {

                                        mainImage.src =
                                            image;

                                    }


                                    document
                                        .querySelectorAll(
                                            ".satori-thumbnail"
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


                                    this.classList.add(
                                        "active"
                                    );

                                }
                            );

                        }
                    );


                /* =====================================
                   TALLAS
                ====================================== */

                let selectedSize =
                    ${firstSize};


                document
                    .querySelectorAll(
                        ".satori-size-button"
                    )
                    .forEach(
                        function (
                            button
                        ) {

                            button.addEventListener(
                                "click",
                                function () {

                                    selectedSize =
                                        this.dataset.size ||
                                        this.textContent.trim();


                                    document
                                        .querySelectorAll(
                                            ".satori-size-button"
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


                                    this.classList.add(
                                        "active"
                                    );

                                }
                            );

                        }
                    );


                /* =====================================
                   COLORES
                ====================================== */

                let selectedColor =
                    ${firstColor};


                document
                    .querySelectorAll(
                        ".satori-color-button"
                    )
                    .forEach(
                        function (
                            button
                        ) {

                            button.addEventListener(
                                "click",
                                function () {

                                    selectedColor =
                                        this.dataset.color ||
                                        this.textContent.trim();


                                    document
                                        .querySelectorAll(
                                            ".satori-color-button"
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


                                    this.classList.add(
                                        "active"
                                    );

                                }
                            );

                        }
                    );


                /* =====================================
                   CANTIDAD
                ====================================== */

                let quantity = 1;


                const quantityDisplay =
                    document.getElementById(
                        "satoriQuantity"
                    );


                const quantityInput =
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


                function updateQuantity() {

                    if (
                        quantityDisplay
                    ) {

                        quantityDisplay.textContent =
                            quantity;

                    }


                    if (
                        quantityInput
                    ) {

                        quantityInput.value =
                            quantity;

                    }

                }


                minus?.addEventListener(
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


                plus?.addEventListener(
                    "click",
                    function () {

                        quantity += 1;


                        updateQuantity();

                    }
                );


                updateQuantity();


                /* =====================================
                   CARRITO SATORII
                   
                   IMPORTANTE:
                   No utilizamos carrito.js aquí.
                   
                   Esta página guarda directamente
                   en la clave principal:
                   
                       satorimode_cart
                   
                   y mantiene:
                   
                       satoriCart
                   
                   para compatibilidad con headers
                   antiguos.
                ====================================== */

                const addButton =
                    document.getElementById(
                        "satoriAddToCart"
                    );


                function readCart(
                    key
                ) {

                    try {

                        const saved =
                            localStorage.getItem(
                                key
                            );


                        if (!saved) {

                            return [];

                        }


                        const parsed =
                            JSON.parse(
                                saved
                            );


                        return Array.isArray(
                            parsed
                        )
                            ? parsed
                            : [];

                    }

                    catch (
                        error
                    ) {

                        console.error(
                            "SATORII · Error leyendo carrito:",
                            error
                        );


                        return [];

                    }

                }


                function saveCart(
                    cart
                ) {

                    const json =
                        JSON.stringify(
                            cart
                        );


                    /*
                     * CLAVE PRINCIPAL
                     */

                    localStorage.setItem(
                        "satorimode_cart",
                        json
                    );


                    /*
                     * COMPATIBILIDAD CON
                     * HEADER ANTIGUO
                     */

                    localStorage.setItem(
                        "satoriCart",
                        json
                    );


                    /*
                     * Compatibilidad con una
                     * versión todavía más antigua.
                     */

                    localStorage.setItem(
                        "satorimode-cart",
                        json
                    );


                    /*
                     * Avisar al header actual.
                     */

                    document.dispatchEvent(
                        new CustomEvent(
                            "satorii:cart-updated",
                            {
                                detail: {
                                    cart: cart
                                }
                            }
                        )
                    );


                    /*
                     * Algunos headers antiguos
                     * solamente actualizan cuando
                     * reciben storage.
                     */

                    window.dispatchEvent(
                        new StorageEvent(
                            "storage",
                            {
                                key:
                                    "satorimode_cart",
                                newValue:
                                    json,
                                storageArea:
                                    localStorage
                            }
                        )
                    );


                    window.dispatchEvent(
                        new StorageEvent(
                            "storage",
                            {
                                key:
                                    "satoriCart",
                                newValue:
                                    json,
                                storageArea:
                                    localStorage
                            }
                        )
                    );

                }


                if (
                    addButton
                ) {

                    addButton.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();


                            /*
                             * Obtener talla.
                             */

                            const activeSize =
                                document.querySelector(
                                    ".satori-size-button.active"
                                );


                            /*
                             * Si el producto tiene
                             * tallas, obligamos
                             * a seleccionar una.
                             */

                            const hasSizes =
                                document.querySelectorAll(
                                    ".satori-size-button"
                                ).length > 0;


                            if (
                                hasSizes &&
                                !activeSize
                            ) {

                                alert(
                                    "Selecciona una talla antes de continuar."
                                );


                                return;

                            }


                            const activeColor =
                                document.querySelector(
                                    ".satori-color-button.active"
                                );


                            const productId =
                                document.body
                                    .dataset
                                    .productId;


                            const productData = {

                                id:
                                    productId,

                                productId:
                                    productId,

                                name:
                                    ${productName},

                                price:
                                    Number(
                                        document.body
                                            .dataset
                                            .productPrice ||
                                        0
                                    ),

                                image:
                                    document.body
                                        .dataset
                                        .productImage ||
                                    ${productImage},

                                size:
                                    activeSize
                                        ? (
                                            activeSize.dataset.size ||
                                            activeSize.textContent.trim()
                                        )
                                        : "",

                                color:
                                    activeColor
                                        ? (
                                            activeColor.dataset.color ||
                                            activeColor.textContent.trim()
                                        )
                                        : "",

                                quantity:
                                    Math.max(
                                        1,
                                        Number(
                                            quantityInput
                                                ?.value ||
                                            quantity ||
                                            1
                                        )
                                    )

                            };


                            /*
                             * Leer carrito principal.
                             */

                            const cart =
                                readCart(
                                    "satorimode_cart"
                                );


                            /*
                             * Buscar misma variante.
                             */

                            const existing =
                                cart.find(
                                    function (
                                        item
                                    ) {

                                        return (
                                            String(
                                                item.id ||
                                                item.productId
                                            ) ===
                                            String(
                                                productData.id
                                            ) &&

                                            String(
                                                item.size ||
                                                ""
                                            ) ===
                                            String(
                                                productData.size ||
                                                ""
                                            ) &&

                                            String(
                                                item.color ||
                                                ""
                                            ) ===
                                            String(
                                                productData.color ||
                                                ""
                                            )
                                        );

                                    }
                                );


                            if (
                                existing
                            ) {

                                existing.quantity =
                                    Number(
                                        existing.quantity ||
                                        0
                                    ) +
                                    productData.quantity;


                                /*
                                 * Normalizar campos
                                 */

                                existing.id =
                                    productData.id;

                                existing.productId =
                                    productData.id;

                                existing.name =
                                    productData.name;

                                existing.price =
                                    productData.price;

                                existing.image =
                                    productData.image;

                                existing.size =
                                    productData.size;

                                existing.color =
                                    productData.color;

                            }

                            else {

                                cart.push(
                                    productData
                                );

                            }


                            /*
                             * GUARDAR
                             */

                            saveCart(
                                cart
                            );


                            /*
                             * Actualizar botón.
                             */

                            addButton.classList.add(
                                "is-added"
                            );


                            addButton.textContent =
                                "✓ AGREGADO AL CARRITO";


                            /*
                             * Toast.
                             */

                            showCartToast(
                                productData
                            );


                            /*
                             * Abrir carrito NO automáticamente.
                             *
                             * El usuario puede seguir
                             * comprando.
                             */

                            setTimeout(
                                function () {

                                    addButton.classList.remove(
                                        "is-added"
                                    );


                                    addButton.textContent =
                                        "AGREGAR AL CARRITO · ${escapeHTML(
                                            price
                                        )}";

                                },
                                2200
                            );


                            console.log(
                                "SATORII · carrito actualizado:",
                                cart
                            );

                        }
                    );

                }


                /* =====================================
                   TOAST
                ====================================== */

                function showCartToast(
                    product
                ) {

                    let toast =
                        document.getElementById(
                            "satoriProductToast"
                        );


                    if (
                        !toast
                    ) {

                        toast =
                            document.createElement(
                                "div"
                            );


                        toast.id =
                            "satoriProductToast";


                        toast.className =
                            "satori-product-toast";


                        document.body.appendChild(
                            toast
                        );

                    }


                    toast.innerHTML = `

                        <div
                            class="
                                satori-toast-title
                            "
                        >

                            <span>
                                ✓
                            </span>

                            PRODUCTO AGREGADO

                        </div>


                        <div
                            class="
                                satori-toast-product
                            "
                        >

                            ${escapeHTML(
                                product.name
                            )}

                            ${
                                product.size
                                    ? ` · Talla ${escapeHTML(
                                        product.size
                                    )}`
                                    : ""
                            }

                        </div>


                        <a
                            href="../../carrito.html"
                        >
                            VER CARRITO →
                        </a>

                    `;


                    toast.classList.add(
                        "is-visible"
                    );


                    clearTimeout(
                        window.satoriProductToastTimer
                    );


                    window.satoriProductToastTimer =
                        setTimeout(
                            function () {

                                toast.classList.remove(
                                    "is-visible"
                                );

                            },
                            4500
                        );

                }


                /* =====================================
                   PESTAÑAS
                ====================================== */

                document
                    .querySelectorAll(
                        ".satori-tab"
                    )
                    .forEach(
                        function (
                            tab
                        ) {

                            tab.addEventListener(
                                "click",
                                function () {

                                    const target =
                                        this.dataset.tab;


                                    document
                                        .querySelectorAll(
                                            ".satori-tab"
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


                                    document
                                        .querySelectorAll(
                                            ".satori-panel"
                                        )
                                        .forEach(
                                            function (
                                                panel
                                            ) {

                                                panel.classList.remove(
                                                    "active"
                                                );

                                            }
                                        );


                                    this.classList.add(
                                        "active"
                                    );


                                    document
                                        .querySelector(
                                            `[data-panel="${target}"]`
                                        )
                                        ?.classList.add(
                                            "active"
                                        );

                                }
                            );

                        }
                    );


            }
        );

        </script>

    `;

}


/* =====================================================
   HTML COMPLETO
===================================================== */

function generateProductHTML(
    product,
    outputDirectory,
    allProducts
) {

    const name =
        escapeHTML(
            product.name
        );


    const category =
        escapeHTML(
            String(
                product.collection ||
                product.category ||
                "SATORII"
            )
            .toUpperCase()
        );


    const price =
        formatPrice(
            product.price
        );


    const description =
        product.details?.description ||
        product.description ||
        `${product.name} · SATORII`;


    const images =
        getImages(
            product
        );


    const mainImage =
        images.length
            ? getImagePath(
                images[0],
                outputDirectory
            )
            : "";


    const gallery =
        generateGallery(
            product,
            outputDirectory
        );


    const colors =
        generateColors(
            product
        );


    const sizes =
        generateSizes(
            product
        );


    const trust =
        generateTrustBlocks(
            product
        );


    const details =
        generateDetails(
            product
        );


    const recommendations =
        generateRecommendations(
            product,
            allProducts,
            outputDirectory
        );


    const editorial =
        generateEditorialBanner(
            product,
            mainImage
        );


    const brandDetails =
        generateBrandDetails(
            product
        );


    const careGuide =
        generateCareGuide();


    const finalBanner =
        generateFinalBanner();


    const javascript =
        generateProductJS(
            product,
            price
        );


    return `

<!DOCTYPE html>

<html
    lang="es"
>

<head>

    <meta
        charset="UTF-8"
    >


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


    <title>
        ${name} | SATORII
    </title>


    <link
        rel="icon"
        type="image/png"
        href="../../img/logo.png"
    >


    <link
        rel="stylesheet"
        href="../../css/style.css"
    >


    <style>

        ${generateProductCSS()}

    </style>

</head>


<body

    data-product-id="${escapeHTML(
        product.id
    )}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(
        product.price
    )}"

    data-product-image="${escapeHTML(
        mainImage
    )}"

>


    <!-- =================================================
         HEADER
    ================================================== -->

    <div
        id="satori-header"
    ></div>


    <!-- =================================================
         PRODUCTO
    ================================================== -->

    <main>

        <div
            class="satori-product-page"
        >


            <section
                class="
                    satori-product-layout
                "
            >


                <!-- =====================================
                     GALERÍA
                ====================================== -->

                <div
                    class="
                        satori-product-gallery
                    "
                >

                    ${gallery}

                </div>


                <!-- =====================================
                     INFORMACIÓN
                ====================================== -->

                <div
                    class="
                        satori-product-info
                    "
                    data-product
                    data-product-id="${escapeHTML(
                        product.id
                    )}"
                    data-product-name="${name}"
                    data-product-price="${escapeHTML(
                        product.price
                    )}"
                    data-product-image="${escapeHTML(
                        mainImage
                    )}"
                >


                    <span
                        class="
                            satori-product-category
                        "
                    >

                        ${category}

                    </span>


                    <h1>
                        ${name}
                    </h1>


                    <div
                        class="
                            satori-product-price
                        "
                    >

                        ${price}

                    </div>


                    <div
                        class="
                            satori-product-divider
                        "
                    ></div>


                    ${colors}


                    ${sizes}


                    <!-- =================================
                         CANTIDAD
                    ================================== -->

                    <div
                        class="
                            satori-quantity-row
                        "
                    >

                        <span
                            class="
                                satori-quantity-label
                            "
                        >
                            CANTIDAD
                        </span>


                        <div
                            class="
                                satori-quantity
                            "
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

                        </div>


                        <input
                            type="hidden"
                            id="quantity"
                            class="
                                satori-quantity-input
                                quantity-input
                            "
                            value="1"
                        >

                    </div>


                    <!-- =================================
                         CARRITO
                    ================================== -->

                    <button
                        type="button"
                        id="satoriAddToCart"
                        class="
                            satori-add-to-cart
                        "
                    >

                        AGREGAR AL CARRITO
                        · ${price}

                    </button>


                    <!-- =================================
                         CONFIANZA
                    ================================== -->

                    ${trust}


                    <!-- =================================
                         DESCRIPCIÓN
                    ================================== -->

                    ${details}


                </div>


            </section>


            <!-- =========================================
                 RECOMENDACIONES
            ========================================== -->

            ${recommendations}


            <!-- =========================================
                 EDITORIAL
            ========================================== -->

            ${editorial}


            <!-- =========================================
                 DETALLES SATORII
            ========================================== -->

            ${brandDetails}


            <!-- =========================================
                 GUÍA DE CUIDADO
            ========================================== -->

            ${careGuide}


            <!-- =========================================
                 BANNER FINAL
            ========================================== -->

            ${finalBanner}


        </div>

    </main>


    <!-- =================================================
         FOOTER
    ================================================== -->

    ${generateFooter()}


    <!-- =================================================
         JAVASCRIPT GLOBAL
    ================================================== -->

    <script
        src="../../js/products.js"
    ></script>


    <script
        src="../../js/main.js"
    ></script>


    <script
        src="../../js/header.js"
    ></script>


    <script
        src="../../js/footer.js"
    ></script>


    <!-- =================================================
         JAVASCRIPT DEL PRODUCTO
    ================================================== -->

    ${javascript}


</body>

</html>

`;

}


/* =====================================================
   GENERAR TODOS LOS PRODUCTOS
===================================================== */

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


    const products =
        loadProducts();


    console.log(
        `Productos encontrados: ${products.length}`
    );


    products.forEach(
        function (
            product
        ) {


            if (
                !product ||
                !product.id ||
                !product.name
            ) {

                console.warn(
                    "Producto ignorado: falta id o name."
                );

                return;

            }


            const category =
                normalizeCategory(
                    product.category
                );


            const folder =
                path.join(
                    OUTPUT_DIR,
                    category
                );


            fs.mkdirSync(
                folder,
                {
                    recursive: true
                }
            );


            const filename =
                `${slugify(
                    product.id ||
                    product.name
                )}.html`;


            const outputFile =
                path.join(
                    folder,
                    filename
                );


            const html =
                generateProductHTML(
                    product,
                    folder,
                    products
                );


            fs.writeFileSync(
                outputFile,
                html,
                "utf8"
            );


            console.log(
                `✓ productos/${category}/${filename}`
            );

        }
    );


    console.log(
        "========================================"
    );


    console.log(
        "SATORII · generación completada."
    );


    console.log(
        "========================================"
    );

}


/* =====================================================
   EJECUTAR
===================================================== */

try {

    generateProducts();

}

catch (
    error
) {

    console.error(
        "========================================"
    );


    console.error(
        "SATORII · ERROR"
    );


    console.error(
        error
    );


    console.error(
        "========================================"
    );


    process.exit(
        1
    );

}
