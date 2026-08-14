/*
=========================================================
 SATORIMODE
 GENERADOR AUTOMÁTICO DE PÁGINAS DE PRODUCTOS
=========================================================

 Lee:
    js/products.js

 Genera automáticamente:

    productos/anime/...
    productos/streetwear/...
    productos/accesorios/...

 Cada producto utiliza información de products.js.

 La página utiliza una plantilla estándar.

 Información editable desde products.js:

    details.description
    details.shipping
    details.warranty
    details.measurements
    details.care
=========================================================
*/

const fs = require("fs");
const path = require("path");
const vm = require("vm");


/* =====================================================
   RUTAS
===================================================== */

const ROOT = path.resolve(__dirname, "..");

const PRODUCTS_FILE = path.join(
    ROOT,
    "js",
    "products.js"
);

const OUTPUT_DIR = path.join(
    ROOT,
    "productos"
);


/* =====================================================
   LEER PRODUCTS.JS
===================================================== */

function loadProducts() {

    if (!fs.existsSync(PRODUCTS_FILE)) {

        throw new Error(
            "No se encontró js/products.js"
        );

    }

    const code = fs.readFileSync(
        PRODUCTS_FILE,
        "utf8"
    );

    const context = {};

    vm.createContext(context);

    vm.runInContext(
        code + "\n;globalThis.PRODUCTS = PRODUCTS;",
        context
    );

    if (!Array.isArray(context.PRODUCTS)) {

        throw new Error(
            "PRODUCTS no es un arreglo válido."
        );

    }

    return context.PRODUCTS;
}


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   PRECIO
===================================================== */

function formatPrice(price) {

    return "$" +
        Number(price || 0)
            .toLocaleString("es-CL");

}


/* =====================================================
   SLUG
===================================================== */

function slugify(value) {

    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}


/* =====================================================
   CATEGORÍA
===================================================== */

function normalizeCategory(category) {

    const value = String(
        category || "productos"
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
   RUTA DE IMÁGENES
===================================================== */

function getImagePath(
    image,
    outputDirectory
) {

    if (!image) {

        return "";

    }


    const absoluteImagePath = path.join(
        ROOT,
        image
    );


    const relative = path.relative(
        outputDirectory,
        absoluteImagePath
    );


    return relative
        .split(path.sep)
        .join("/");

}


/* =====================================================
   GALERÍA
===================================================== */

function generateGallery(
    product,
    outputDirectory
) {

    const images =
        Array.isArray(product.images) &&
        product.images.length
            ? product.images
            : product.image
                ? [product.image]
                : [];


    if (!images.length) {

        return `

            <div class="product-main-image">

                <div class="image-placeholder">
                    SIN IMAGEN
                </div>

            </div>

        `;

    }


    const mainImage =
        getImagePath(
            images[0],
            outputDirectory
        );


    const thumbnails =
        images
            .map(function (image, index) {

                const imagePath =
                    getImagePath(
                        image,
                        outputDirectory
                    );


                return `

                    <button
                        type="button"
                        class="product-thumbnail ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-image="${escapeHTML(
                            imagePath
                        )}"
                    >

                        <img
                            src="${escapeHTML(
                                imagePath
                            )}"
                            alt="${escapeHTML(
                                product.name
                            )}"
                        >

                    </button>

                `;

            })
            .join("");


    return `

        <div class="product-main-image">

            <img
                id="productMainImage"
                src="${escapeHTML(
                    mainImage
                )}"
                alt="${escapeHTML(
                    product.name
                )}"
            >

        </div>


        <div class="product-thumbnails">

            ${thumbnails}

        </div>

    `;

}


/* =====================================================
   TALLAS
===================================================== */

function generateSizes(product) {

    if (
        !Array.isArray(product.sizes) ||
        !product.sizes.length
    ) {

        return "";

    }


    return `

        <div class="product-option">

            <div class="product-option-header">

                <span>
                    TALLA
                </span>

                <a href="../../guia-tallas.html">
                    GUÍA DE TALLAS
                </a>

            </div>


            <div class="product-options">

                ${product.sizes
                    .map(function (size, index) {

                        return `

                            <button
                                type="button"
                                class="product-size ${
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

                        `;

                    })
                    .join("")}

            </div>

        </div>

    `;

}


/* =====================================================
   COLORES
===================================================== */

function generateColors(product) {

    if (
        !Array.isArray(product.colors) ||
        !product.colors.length
    ) {

        return "";

    }


    return `

        <div class="product-option">

            <div class="product-option-title">
                COLOR
            </div>


            <div class="product-colors">

                ${product.colors
                    .map(function (color, index) {

                        return `

                            <button
                                type="button"
                                class="product-color ${
                                    index === 0
                                        ? "active"
                                        : ""
                                }"
                                data-color="${escapeHTML(
                                    color
                                )}"
                            >

                                <span></span>

                                ${escapeHTML(
                                    color
                                )}

                            </button>

                        `;

                    })
                    .join("")}

            </div>

        </div>

    `;

}


/* =====================================================
   DESCRIPCIÓN / ENVÍOS / GARANTÍA
===================================================== */

function generateDetails(product) {

    const details =
        product.details || {};


    const description =
        details.description ||
        product.description ||
        "Producto SatoriMode.";


    const shipping =
        details.shipping ||
        "Enviamos a todo Chile.";


    const warranty =
        details.warranty ||
        "Todos nuestros productos cuentan con garantía.";


    return `

        <!-- =========================================
             INFORMACIÓN DEL PRODUCTO
        ========================================== -->

        <section class="product-details-box">


            <!-- =====================================
                 PESTAÑAS
            ====================================== -->

            <div class="product-details-tabs">


                <button
                    type="button"
                    class="product-details-tab active"
                    data-tab="description"
                >
                    DESCRIPCIÓN
                </button>


                <button
                    type="button"
                    class="product-details-tab"
                    data-tab="shipping"
                >
                    ENVÍOS Y GARANTÍA
                </button>


            </div>


            <!-- =====================================
                 DESCRIPCIÓN
            ====================================== -->

            <div
                class="product-details-panel active"
                id="productDetailsDescription"
            >

                <h4>
                    DESCRIPCIÓN
                </h4>


                <p>
                    ${escapeHTML(
                        description
                    )}
                </p>

            </div>


            <!-- =====================================
                 ENVÍOS Y GARANTÍA
            ====================================== -->

            <div
                class="product-details-panel"
                id="productDetailsShipping"
            >

                <h4>
                    ENVÍOS
                </h4>


                <p>
                    ${escapeHTML(
                        shipping
                    )}
                </p>


                <h4>
                    GARANTÍA
                </h4>


                <p>
                    ${escapeHTML(
                        warranty
                    )}
                </p>

            </div>


        </section>

    `;

}


/* =====================================================
   HTML COMPLETO DEL PRODUCTO
===================================================== */

function generateProductHTML(
    product,
    outputDirectory
) {

    const name =
        escapeHTML(
            product.name
        );


    const category =
        escapeHTML(
            product.collection ||
            product.category ||
            "SatoriMode"
        );


    const price =
        formatPrice(
            product.price
        );


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


    const details =
        generateDetails(
            product
        );


    const categoryPath =
        normalizeCategory(
            product.category
        );


    return `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">


    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >


    <title>
        ${name} | SatoriMode
    </title>


    <link
        rel="stylesheet"
        href="../../css/style.css"
    >

</head>


<body>


    <!-- =================================================
         HEADER
    ================================================== -->

    <div id="satori-header"></div>


    <!-- =================================================
         PRODUCTO
    ================================================== -->

    <main>


        <section class="product-page">


            <!-- =========================================
                 GALERÍA
            ========================================== -->

            <div class="product-gallery">

                ${gallery}

            </div>


            <!-- =========================================
                 INFORMACIÓN
            ========================================== -->

            <div class="product-page-info">


                <span class="product-category">

                    ${category}

                </span>


                <h1 class="product-page-title">

                    ${name}

                </h1>


                <div class="product-page-price">

                    ${price}

                </div>


                ${colors}


                ${sizes}


                <!-- =====================================
                     CANTIDAD
                ====================================== -->

                <div class="product-option">

                    <div class="product-option-title">

                        CANTIDAD

                    </div>


                    <div class="quantity-selector">

                        <button
                            type="button"
                            id="quantityMinus"
                        >
                            −
                        </button>


                        <span id="quantity">
                            1
                        </span>


                        <button
                            type="button"
                            id="quantityPlus"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- =====================================
                     CARRITO
                ====================================== -->

                <button
                    type="button"
                    class="add-to-cart-button"
                    id="addToCart"
                    data-product-id="${escapeHTML(
                        product.id
                    )}"
                >

                    AGREGAR AL CARRITO

                </button>

<!-- =====================================================
     INFORMACIÓN DEL PRODUCTO
====================================================== -->

<div class="product-info-tabs">

    <div class="product-info-tabs-header">

        <button
            type="button"
            class="product-info-tab active"
            data-tab="description"
        >
            DESCRIPCIÓN
        </button>

        <button
            type="button"
            class="product-info-tab"
            data-tab="shipping"
        >
            ENVÍOS Y GARANTÍA
        </button>

    </div>


    <!-- ================================================
         DESCRIPCIÓN
    ================================================= -->

    <div
        class="product-info-tab-content active"
        data-content="description"
    >

        <h3>
            ${escapeHTML(
                product.details?.description ||
                product.description ||
                "Producto SatoriMode."
            )}
        </h3>

        <p>
            ${escapeHTML(
                product.details?.care ||
                ""
            )}
        </p>

    </div>


    <!-- ================================================
         ENVÍOS Y GARANTÍA
    ================================================= -->

    <div
        class="product-info-tab-content"
        data-content="shipping"
    >

        <div class="product-info-item">

            <strong>
                ENVÍOS
            </strong>

            <p>
                ${escapeHTML(
                    product.details?.shipping ||
                    "Enviamos a todo Chile."
                )}
            </p>

        </div>


        <div class="product-info-item">

            <strong>
                GARANTÍA
            </strong>

            <p>
                ${escapeHTML(
                    product.details?.warranty ||
                    "Todos nuestros productos cuentan con garantía."
                )}
            </p>

        </div>

    </div>

</div>
                <!-- =====================================
                     DESCRIPCIÓN / ENVÍOS / GARANTÍA
                ====================================== -->

                ${details}


            </div>

        </section>


        <!-- =================================================
             RECOMENDACIONES
        ================================================== -->

        <section class="related-products">

            <div class="related-heading">

                <span>
                    SATORIMODE · DESCUBRE MÁS
                </span>


                <h2>
                    TAMBIÉN TE PUEDE GUSTAR.
                </h2>


                <p>
                    Descubre más diseños de SatoriMode.
                </p>

            </div>


            <div
                class="products-grid"
                id="relatedProductsGrid"
                data-product-id="${escapeHTML(
                    product.id
                )}"
                data-category="${escapeHTML(
                    categoryPath
                )}"
            >

            </div>

        </section>


    </main>


    <!-- =================================================
         FOOTER
    ================================================== -->

    <footer class="site-footer">


        <div class="footer-main">


            <div class="footer-brand">

                <h3>
                    SATORIMODE
                </h3>


                <p>
                    Anime, cultura japonesa y streetwear.
                </p>

            </div>


            <div class="footer-column">

                <h4>
                    COLECCIONES
                </h4>


                <a href="../../anime.html">
                    Anime
                </a>


                <a href="../../streetwear.html">
                    Streetwear
                </a>


                <a href="../../accesorios.html">
                    Accesorios
                </a>

            </div>


            <div class="footer-column">

                <h4>
                    PRODUCTOS
                </h4>


                <a href="../../productos.html">
                    Todas las poleras
                </a>


                <a href="../../accesorios.html">
                    Accesorios
                </a>

            </div>


        </div>


        <div class="footer-bottom">

            <span>
                © 2026 SatoriMode
            </span>


            <span>
                Todos los derechos reservados.
            </span>

        </div>


    </footer>


    <!-- =================================================
         JAVASCRIPT
    ================================================== -->

    <script src="../../js/products.js"></script>

    <script src="../../js/main.js"></script>

    <script src="../../js/header.js"></script>

    <script src="../../js/products-page.js"></script>


    <!-- =================================================
         FUNCIONES DE LA PÁGINA
    ================================================== -->

    <script>

        document.addEventListener(
            "DOMContentLoaded",
            function () {

            /* =====================================
   INFORMACIÓN DEL PRODUCTO
====================================== */

const infoTabs =
    document.querySelectorAll(
        ".product-info-tab"
    );


const infoContents =
    document.querySelectorAll(
        ".product-info-tab-content"
    );


infoTabs.forEach(
    function (tab) {

        tab.addEventListener(
            "click",
            function () {

                const selectedTab =
                    this.dataset.tab;


                /* =========================
                   BOTONES
                ========================== */

                infoTabs.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                /* =========================
                   CONTENIDO
                ========================== */

                infoContents.forEach(
                    function (content) {

                        content.classList.remove(
                            "active"
                        );


                        if (
                            content.dataset.content ===
                            selectedTab
                        ) {

                            content.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );

    }
);


                /* =====================================
                   GALERÍA
                ====================================== */

                const mainImage =
                    document.getElementById(
                        "productMainImage"
                    );


                const thumbnails =
                    document.querySelectorAll(
                        ".product-thumbnail"
                    );


                thumbnails.forEach(
                    function (thumbnail) {

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


                                thumbnails.forEach(
                                    function (item) {

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

                const minus =
                    document.getElementById(
                        "quantityMinus"
                    );


                const plus =
                    document.getElementById(
                        "quantityPlus"
                    );


                const quantity =
                    document.getElementById(
                        "quantity"
                    );


                let amount = 1;


                if (minus) {

                    minus.addEventListener(
                        "click",
                        function () {

                            if (amount > 1) {

                                amount--;

                                quantity.textContent =
                                    amount;

                            }

                        }
                    );

                }


                if (plus) {

                    plus.addEventListener(
                        "click",
                        function () {

                            amount++;

                            quantity.textContent =
                                amount;

                        }
                    );

                }


                /* =====================================
                   PESTAÑAS DE INFORMACIÓN
                ====================================== */

                const detailTabs =
                    document.querySelectorAll(
                        ".product-details-tab"
                    );


                const detailPanels =
                    document.querySelectorAll(
                        ".product-details-panel"
                    );


                detailTabs.forEach(
                    function (tab) {

                        tab.addEventListener(
                            "click",
                            function () {


                                const target =
                                    this.dataset.tab;


                                /* -------------------------
                                   TAB ACTIVO
                                ------------------------- */

                                detailTabs.forEach(
                                    function (item) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                this.classList.add(
                                    "active"
                                );


                                /* -------------------------
                                   PANEL ACTIVO
                                ------------------------- */

                                detailPanels.forEach(
                                    function (panel) {

                                        panel.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                if (
                                    target ===
                                    "description"
                                ) {

                                    const descriptionPanel =
                                        document.getElementById(
                                            "productDetailsDescription"
                                        );


                                    if (
                                        descriptionPanel
                                    ) {

                                        descriptionPanel.classList.add(
                                            "active"
                                        );

                                    }

                                }


                                if (
                                    target ===
                                    "shipping"
                                ) {

                                    const shippingPanel =
                                        document.getElementById(
                                            "productDetailsShipping"
                                        );


                                    if (
                                        shippingPanel
                                    ) {

                                        shippingPanel.classList.add(
                                            "active"
                                        );

                                    }

                                }

                            }
                        );

                    }
                );


            }
        );

    </script>


</body>

</html>
`;

}


/* =====================================================
   GENERAR PRODUCTOS
===================================================== */

function generateProducts() {

    console.log(
        "SatoriMode · iniciando generación..."
    );


    const products =
        loadProducts();


    console.log(
        `Productos encontrados: ${products.length}`
    );


    products.forEach(
        function (product) {


            if (!product.id) {

                console.warn(
                    "Producto ignorado: falta id."
                );

                return;

            }


            if (!product.name) {

                console.warn(
                    `Producto ${product.id} ignorado: falta name.`
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


            const slug =
                slugify(
                    product.id
                );


            const filename =
                `${slug}.html`;


            const outputFile =
                path.join(
                    folder,
                    filename
                );


            const html =
                generateProductHTML(
                    product,
                    folder
                );


            fs.writeFileSync(
                outputFile,
                html,
                "utf8"
            );


            console.log(
                `✓ Generado: productos/${category}/${filename}`
            );

        }
    );


    console.log(
        "SatoriMode · generación completada."
    );

}


/* =====================================================
   EJECUTAR
===================================================== */

try {

    generateProducts();

} catch (error) {

    console.error(
        "ERROR:",
        error
    );

    process.exit(1);

}
