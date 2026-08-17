const fs = require("fs");
const path = require("path");

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


/* =========================================================
   UTILIDADES
========================================================= */

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


function formatPrice(value) {

    return "$" +
        Number(value || 0)
            .toLocaleString("es-CL");

}


function slugify(value) {

    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}


function normalizeCategory(category) {

    const value =
        String(category || "otros")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();


    if (value === "anime") {

        return "anime";

    }


    if (value === "streetwear") {

        return "streetwear";

    }


    if (
        value === "accesorios" ||
        value === "accesorio"
    ) {

        return "accesorios";

    }


    return "otros";

}


/* =========================================================
   TIPO DE PRODUCTO
========================================================= */

function getProductType(product) {

    const category =
        normalizeCategory(
            product.category
        );


    if (
        category === "anime" ||
        category === "streetwear"
    ) {

        return "clothing";

    }


    return "accessory";

}


/* =========================================================
   IMÁGENES
========================================================= */

function getImages(product) {

    if (
        Array.isArray(product.images) &&
        product.images.length
    ) {

        return product.images.slice(0, 3);

    }


    if (product.image) {

        return [
            product.image
        ];

    }


    return [];

}


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


    return path
        .relative(
            outputDirectory,
            absolute
        )
        .split(path.sep)
        .join("/");

}


/* =========================================================
   CARGAR PRODUCTOS
========================================================= */

/*
 * IMPORTANTE:
 *
 * No usamos vm.
 *
 * products.js contiene:
 *
 * const PRODUCTS = [...]
 *
 * y además funciones.
 *
 * Para evitar ejecutar esas funciones dentro de un
 * entorno incompleto, extraemos solamente el arreglo
 * PRODUCTS.
 */

function loadProducts() {

    if (!fs.existsSync(PRODUCTS_FILE)) {

        throw new Error(
            "No se encontró js/products.js"
        );

    }


    let products;


    try {

        delete require.cache[
            require.resolve(PRODUCTS_FILE)
        ];


        products =
            require(PRODUCTS_FILE);

    }
    catch (error) {

        throw new Error(
            "No se pudo cargar js/products.js.\n" +
            error.message
        );

    }


    if (!Array.isArray(products)) {

        throw new Error(
            "PRODUCTS no es un arreglo válido."
        );

    }


    return products;

}


    /*
     * Busca el cierre real del arreglo.
     * Tiene en cuenta strings, objetos y corchetes.
     */

    let depth = 0;

    let inString = false;

    let stringChar = "";

    let escaped = false;

    let arrayEnd = -1;


    for (
        let i = arrayStart;
        i < source.length;
        i++
    ) {

        const char =
            source[i];


        if (inString) {

            if (escaped) {

                escaped = false;

                continue;

            }


            if (char === "\\") {

                escaped = true;

                continue;

            }


            if (char === stringChar) {

                inString = false;

                stringChar = "";

            }


            continue;

        }


        if (
            char === '"' ||
            char === "'" ||
            char === "`"
        ) {

            inString = true;

            stringChar = char;

            continue;

        }


        if (char === "[") {

            depth++;

            continue;

        }


        if (char === "]") {

            depth--;

            if (depth === 0) {

                arrayEnd = i;

                break;

            }

        }

    }


    if (arrayEnd === -1) {

        throw new Error(
            "No se pudo encontrar el cierre de PRODUCTS."
        );

    }


    const productsSource =
        source.slice(
            arrayStart,
            arrayEnd + 1
        );


    let PRODUCTS;


    try {

        PRODUCTS =
            Function(
                `"use strict"; return (${productsSource});`
            )();

    }
    catch (error) {

        throw new Error(
            "No se pudo leer PRODUCTS desde js/products.js.\n" +
            error.message
        );

    }


    if (!Array.isArray(PRODUCTS)) {

        throw new Error(
            "PRODUCTS no es un arreglo válido."
        );

    }


    return PRODUCTS;

}


/* =========================================================
   GALERÍA
========================================================= */

function generateGallery(
    product,
    outputDirectory
) {

    const images =
        getImages(product);


    if (!images.length) {

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
            image =>
                getImagePath(
                    image,
                    outputDirectory
                )
        );


    return `

        <div class="satori-main-image">

            <img
                id="satoriMainImage"
                src="${escapeHTML(prepared[0])}"
                alt="${escapeHTML(product.name)}"
            >

        </div>


        <div class="satori-thumbnails">

            ${prepared.map(
                (image, index) => `

                <button
                    type="button"
                    class="satori-thumbnail ${
                        index === 0
                            ? "active"
                            : ""
                    }"
                    data-image="${escapeHTML(image)}"
                    aria-label="Imagen ${index + 1}"
                >

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="${
                            index === 0
                                ? "eager"
                                : "lazy"
                        }"
                    >

                </button>

            `
            ).join("")}

        </div>

    `;

}


/* =========================================================
   COLORES
========================================================= */

function getColorClass(color) {

    const value =
        String(color || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();


    if (
        value.includes("blanco") ||
        value.includes("white")
    ) {

        return "white";

    }


    if (
        value.includes("rojo") ||
        value.includes("red")
    ) {

        return "red";

    }


    if (
        value.includes("azul") ||
        value.includes("blue")
    ) {

        return "blue";

    }


    if (
        value.includes("verde") ||
        value.includes("green")
    ) {

        return "green";

    }


    return "black";

}


function generateColors(product) {

    if (
        !Array.isArray(product.colors) ||
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

                ${product.colors.map(
                    (color, index) => `

                    <button
                        type="button"
                        class="satori-color-button ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-color="${escapeHTML(color)}"
                    >

                        <span
                            class="
                                satori-color-dot
                                color-${getColorClass(color)}
                            "
                        ></span>

                        <span>
                            ${escapeHTML(color)}
                        </span>

                    </button>

                `
                ).join("")}

            </div>

        </section>

    `;

}


/* =========================================================
   TALLAS
========================================================= */

function generateSizes(product) {

    if (
        !Array.isArray(product.sizes) ||
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

                ${product.sizes.map(
                    (size, index) => `

                    <button
                        type="button"
                        class="satori-size-button ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-size="${escapeHTML(size)}"
                    >

                        ${escapeHTML(size)}

                    </button>

                `
                ).join("")}

            </div>

        </section>

    `;

}


/* =========================================================
   DETALLES
========================================================= */

function getDetails(product) {

    return product.details || {};

}


/* =========================================================
   CONFIANZA
========================================================= */

function generateTrustBlocks(product) {

    const details =
        getDetails(product);


    return `

        <div class="satori-trust-grid">

            <div class="satori-trust-item">

                <div class="satori-trust-icon">
                    🚚
                </div>

                <div>

                    <strong>
                        ENVÍOS
                    </strong>

                    <span>
                        ${escapeHTML(
                            details.shipping ||
                            "Envíos a todo Chile."
                        )}
                    </span>

                </div>

            </div>


            <div class="satori-trust-item">

                <div class="satori-trust-icon">
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

                <div class="satori-trust-icon">
                    ✦
                </div>

                <div>

                    <strong>
                        CALIDAD SATORI
                    </strong>

                    <span>
                        ${escapeHTML(
                            details.warranty ||
                            "Calidad y atención SATORII."
                        )}
                    </span>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   DESCRIPCIÓN
========================================================= */

function generateDescription(
    product,
    type
) {

    const details =
        getDetails(product);


    const description =
        details.description ||
        product.description ||
        (
            type === "clothing"
                ? "Una prenda SATORII creada para formar parte de tu estilo."
                : "Un producto seleccionado para formar parte del universo SATORII."
        );


    const shipping =
        details.shipping ||
        "Envíos a todo Chile.";


    const warranty =
        details.warranty ||
        "Compra protegida frente a fallas de fabricación.";


    const care =
        details.care ||
        (
            type === "clothing"
                ? "Lavar con agua fría. No planchar directamente sobre el estampado."
                : "Revisar las indicaciones específicas del producto."
        );


    return `

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
                    ${escapeHTML(description)}
                </p>

                <p class="satori-product-care">

                    <strong>
                        ${
                            type === "clothing"
                                ? "Cuidados:"
                                : "Recomendación:"
                        }
                    </strong>

                    ${escapeHTML(care)}

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
                        ${escapeHTML(shipping)}
                    </p>

                </div>


                <div class="satori-detail-item">

                    <strong>
                        GARANTÍA
                    </strong>

                    <p>
                        ${escapeHTML(warranty)}
                    </p>

                </div>

            </div>

        </section>

    `;

}


/* =========================================================
   ESPECIFICACIONES
========================================================= */

function getAccessorySpecs(product) {

    const details =
        getDetails(product);


    const raw =
        product.specifications ||
        details.specifications ||
        {};


    if (Array.isArray(raw)) {

        return raw
            .filter(
                item =>
                    item &&
                    (
                        item.label ||
                        item.name
                    )
            )
            .map(
                item => ({
                    label:
                        item.label ||
                        item.name,

                    value:
                        item.value ||
                        ""
                })
            );

    }


    if (
        raw &&
        typeof raw === "object"
    ) {

        return Object.entries(raw)
            .filter(
                ([label, value]) =>
                    value !== undefined &&
                    value !== null &&
                    value !== ""
            )
            .map(
                ([label, value]) => ({
                    label,
                    value
                })
            );

    }


    return [];

}


function generateAccessorySpecs(product) {

    const specs =
        getAccessorySpecs(product);


    if (!specs.length) {

        return "";

    }


    return `

        <section class="satori-accessory-info">

            <div class="satori-section-label">
                DETALLES DEL PRODUCTO
            </div>


            <h2>
                CONOCE SUS
                <br>
                <em>
                    DETALLES.
                </em>
            </h2>


            <div class="satori-spec-grid">

                ${specs.map(
                    spec => `

                    <div class="satori-spec">

                        <span>
                            ${escapeHTML(
                                spec.label
                            )}
                        </span>

                        <strong>
                            ${escapeHTML(
                                spec.value
                            )}
                        </strong>

                    </div>

                `
                ).join("")}

            </div>

        </section>

    `;

}


/* =========================================================
   BANNER DE CUIDADO
========================================================= */

function generateCareBanner(
    product,
    outputDirectory
) {

    const careImage =
        product.careImage ||
        "";


    const image =
        careImage
            ? getImagePath(
                careImage,
                outputDirectory
            )
            : "";


    return `

        <section
            class="
                satori-style-banner
                ${
                    image
                        ? "has-image"
                        : "no-image"
                }
            "
        >

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
                    de tu SATORII.
                </p>


                <a href="../../cuidado.html">
                    VER GUÍA DE CUIDADO →
                </a>

            </div>


            ${
                image
                    ? `

                    <div class="satori-style-image">

                        <img
                            src="${escapeHTML(image)}"
                            alt="Cuidado de ${escapeHTML(product.name)}"
                        >

                    </div>

                    `
                    : ""
            }

        </section>

    `;

}


/* =========================================================
   EDITORIAL PRENDAS
========================================================= */

function generateClothingEditorial(
    product,
    outputDirectory
) {

    const images =
        getImages(product);


    const image =
        images.length
            ? getImagePath(
                images[1] ||
                images[0],
                outputDirectory
            )
            : "";


    return `

        <section class="satori-editorial">

            <div class="satori-editorial-content">

                <span>
                    SATORII · ${
                        escapeHTML(
                            String(
                                product.collection ||
                                product.category ||
                                "PRENDAS"
                            ).toUpperCase()
                        )
                    }
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
                    Tu estilo no necesita explicaciones.
                    Es una forma de mostrar aquello que
                    realmente te representa.
                </p>


                <a href="#producto">
                    VER LA PRENDA →
                </a>

            </div>


            <div class="satori-editorial-image">

                ${
                    image
                        ? `

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(product.name)}"
                        >

                        `
                        : ""
                }

            </div>

        </section>

    `;

}


/* =========================================================
   EDITORIAL ACCESORIOS
========================================================= */

function generateAccessoryEditorial(
    product,
    outputDirectory
) {

    const images =
        getImages(product);


    const image =
        images.length
            ? getImagePath(
                images[1] ||
                images[0],
                outputDirectory
            )
            : "";


    const type =
        product.type ||
        product.subcategory ||
        "ACCESORIO";


    return `

        <section class="satori-accessory-editorial">

            <div class="satori-accessory-editorial-image">

                ${
                    image
                        ? `

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(product.name)}"
                        >

                        `
                        : ""
                }

            </div>


            <div class="satori-accessory-editorial-content">

                <span>
                    SATORII · ${
                        escapeHTML(
                            String(type).toUpperCase()
                        )
                    }
                </span>


                <h2>
                    DETALLES QUE
                    <em>
                        COMPLETAN
                    </em>
                    TU ESTILO.
                </h2>


                <p>
                    Descubre productos que pueden
                    acompañar tu colección, tu espacio
                    o simplemente aquello que te gusta.
                </p>


                <a href="#producto">
                    VOLVER AL PRODUCTO →
                </a>

            </div>

        </section>

    `;

}


/* =========================================================
   RECOMENDACIONES
========================================================= */

function shuffle(array) {

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
        ] = [
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


    const available =
        allProducts.filter(
            product =>
                product &&
                String(product.id) !== currentId &&
                product.available !== false
        );


    const sameType =
        available.filter(
            product =>
                getProductType(product) ===
                getProductType(currentProduct)
        );


    const differentType =
        available.filter(
            product =>
                getProductType(product) !==
                getProductType(currentProduct)
        );


    const related =
        shuffle(sameType)
            .concat(
                shuffle(differentType)
            )
            .slice(0, 5);


    if (!related.length) {

        return "";

    }


    const cards =
        related.map(
            item => {

                const images =
                    getImages(item);


                const image =
                    images.length
                        ? getImagePath(
                            images[0],
                            outputDirectory
                        )
                        : "";


                const categoryPath =
                    normalizeCategory(
                        item.category
                    );


                const filename =
                    `${
                        slugify(
                            item.id ||
                            item.name
                        )
                    }.html`;


                const url =
                    `../${categoryPath}/${filename}`;


                return `

                    <a
                        href="${escapeHTML(url)}"
                        class="satori-related-card"
                    >

                        <div class="satori-related-image">

                            ${
                                image
                                    ? `

                                    <img
                                        src="${escapeHTML(image)}"
                                        alt="${escapeHTML(item.name)}"
                                        loading="lazy"
                                    >

                                    `
                                    : `
                                    <span>
                                        SATORII
                                    </span>
                                    `
                            }

                        </div>


                        <div class="satori-related-info">

                            <span>
                                ${
                                    escapeHTML(
                                        String(
                                            item.collection ||
                                            item.category ||
                                            "SATORII"
                                        ).toUpperCase()
                                    )
                                }
                            </span>


                            <h3>
                                ${escapeHTML(item.name)}
                            </h3>


                            <strong>
                                ${formatPrice(item.price)}
                            </strong>

                        </div>

                    </a>

                `;

            }
        ).join("");


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
                    Descubre otros diseños que podrían
                    convertirse en parte de tu universo.
                </p>

            </div>


            <div class="satori-related-grid">

                ${cards}

            </div>

        </section>

    `;

}


/* =========================================================
   JAVASCRIPT DEL PRODUCTO
========================================================= */

function generateProductJS() {

    return `

<script>

(function () {

    "use strict";


    function initSatoriProduct() {

        const mainImage =
            document.getElementById(
                "satoriMainImage"
            );


        document
            .querySelectorAll(
                ".satori-thumbnail"
            )
            .forEach(
                function (thumbnail) {

                    thumbnail.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();


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


        document.addEventListener(
            "click",
            function (event) {

                const color =
                    event.target.closest(
                        ".satori-color-button"
                    );


                if (!color) {

                    return;

                }


                event.preventDefault();


                document
                    .querySelectorAll(
                        ".satori-color-button"
                    )
                    .forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                color.classList.add(
                    "active"
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                const size =
                    event.target.closest(
                        ".satori-size-button"
                    );


                if (!size) {

                    return;

                }


                event.preventDefault();


                document
                    .querySelectorAll(
                        ".satori-size-button"
                    )
                    .forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                size.classList.add(
                    "active"
                );

            }
        );


        let quantity = 1;


        const quantityDisplay =
            document.getElementById(
                "satoriQuantity"
            );


        const quantityInput =
            document.getElementById(
                "quantity"
            );


        const minusButton =
            document.getElementById(
                "satoriQuantityMinus"
            );


        const plusButton =
            document.getElementById(
                "satoriQuantityPlus"
            );


        function updateQuantity() {

            if (quantityDisplay) {

                quantityDisplay.textContent =
                    quantity;

            }


            if (quantityInput) {

                quantityInput.value =
                    quantity;

            }

        }


        if (minusButton) {

            minusButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    quantity =
                        Math.max(
                            1,
                            quantity - 1
                        );


                    updateQuantity();

                }
            );

        }


        if (plusButton) {

            plusButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    quantity += 1;


                    updateQuantity();

                }
            );

        }


        updateQuantity();


        document.addEventListener(
            "click",
            function (event) {

                const tab =
                    event.target.closest(
                        ".satori-tab"
                    );


                if (!tab) {

                    return;

                }


                event.preventDefault();


                const target =
                    tab.dataset.tab;


                document
                    .querySelectorAll(
                        ".satori-tab"
                    )
                    .forEach(
                        function (item) {

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
                        function (panel) {

                            panel.classList.remove(
                                "active"
                            );

                        }
                    );


                tab.classList.add(
                    "active"
                );


                const panel =
                    document.querySelector(
                        '.satori-panel[data-panel="' +
                        target +
                        '"]'
                    );


                if (panel) {

                    panel.classList.add(
                        "active"
                    );

                }

            }
        );


        const addButton =
            document.getElementById(
                "addToCart"
            );


        let cartResetTimer = null;


        if (addButton) {

            const originalText =
                addButton.textContent.trim();


            function showAddedState() {

                if (cartResetTimer) {

                    clearTimeout(
                        cartResetTimer
                    );

                }


                addButton.classList.remove(
                    "added"
                );


                void addButton.offsetWidth;


                addButton.classList.add(
                    "added"
                );


                addButton.textContent =
                    "✓ AGREGADO AL CARRITO";


                cartResetTimer =
                    setTimeout(
                        function () {

                            addButton.classList.remove(
                                "added"
                            );


                            addButton.textContent =
                                originalText;

                        },
                        2200
                    );

            }


            addButton.addEventListener(
                "click",
                showAddedState
            );


            document.addEventListener(
                "satorii:cart-updated",
                showAddedState
            );

        }

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initSatoriProduct,
            {
                once: true
            }
        );

    }
    else {

        initSatoriProduct();

    }

})();

</script>

    `;

}


/* =========================================================
   HTML PRENDA
========================================================= */

function generateClothingHTML(
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
            ).toUpperCase()
        );


    const price =
        formatPrice(
            product.price
        );


    const description =
        product.details?.description ||
        product.description ||
        (
            product.name +
            " · SATORII"
        );


    const images =
        getImages(product);


    const mainImage =
        images.length
            ? getImagePath(
                images[0],
                outputDirectory
            )
            : "";


    return `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="${escapeHTML(description)}"
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

</head>


<body

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"

>


<div id="satori-header"></div>


<main>

<div
    class="satori-product-page"
>


<section
    class="satori-product-layout"
    id="producto"
>


<div
    class="satori-product-gallery"
>

${generateGallery(
    product,
    outputDirectory
)}

</div>


<div
    class="satori-product-info"

    data-product

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"
>


<span
    class="satori-product-category"
>
    ${category}
</span>


<h1>
    ${name}
</h1>


<div
    class="satori-product-price"
>
    ${price}
</div>


<div
    class="satori-product-divider"
></div>


${generateColors(product)}


${generateSizes(product)}


<div
    class="satori-quantity-row"
>

<span
    class="satori-quantity-label"
>
    CANTIDAD
</span>


<div
    class="satori-quantity"
>

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

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"
>

    AGREGAR AL CARRITO · ${price}

</button>


${generateTrustBlocks(product)}


${generateDescription(
    product,
    "clothing"
)}

</div>

</section>


${generateCareBanner(
    product,
    outputDirectory
)}


${generateRecommendations(
    product,
    allProducts,
    outputDirectory
)}


${generateClothingEditorial(
    product,
    outputDirectory
)}

</div>

</main>


<div id="satori-footer"></div>


<script src="../../js/products.js"></script>

<script src="../../js/main.js"></script>

<script src="../../js/header.js"></script>

<script src="../../js/footer.js"></script>

<script src="../../js/cart.js"></script>

${generateProductJS()}


</body>

</html>`;

}


/* =========================================================
   HTML ACCESORIOS
========================================================= */

function generateAccessoryHTML(
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
                "ACCESORIOS"
            ).toUpperCase()
        );


    const price =
        formatPrice(
            product.price
        );


    const description =
        product.details?.description ||
        product.description ||
        (
            product.name +
            " · SATORII"
        );


    const images =
        getImages(product);


    const mainImage =
        images.length
            ? getImagePath(
                images[0],
                outputDirectory
            )
            : "";


    return `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="${escapeHTML(description)}"
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

</head>


<body

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"
>


<div id="satori-header"></div>


<main>

<div
    class="satori-product-page"
>


<section
    class="satori-product-layout"
    id="producto"
>


<div
    class="satori-product-gallery"
>

${generateGallery(
    product,
    outputDirectory
)}

</div>


<div
    class="satori-product-info"

    data-product

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"
>


<span
    class="satori-product-category"
>
    ${category}
</span>


<h1>
    ${name}
</h1>


<div
    class="satori-product-price"
>
    ${price}
</div>


<div
    class="satori-product-divider"
></div>


<div
    class="satori-quantity-row"
>

<span
    class="satori-quantity-label"
>
    CANTIDAD
</span>


<div
    class="satori-quantity"
>

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

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"
>

    AGREGAR AL CARRITO · ${price}

</button>


${generateTrustBlocks(product)}


${generateDescription(
    product,
    "accessory"
)}


${generateAccessorySpecs(product)}

</div>

</section>


${generateRecommendations(
    product,
    allProducts,
    outputDirectory
)}


${generateAccessoryEditorial(
    product,
    outputDirectory
)}

</div>

</main>


<div id="satori-footer"></div>


<script src="../../js/products.js"></script>

<script src="../../js/main.js"></script>

<script src="../../js/header.js"></script>

<script src="../../js/footer.js"></script>

<script src="../../js/cart.js"></script>

${generateProductJS()}


</body>

</html>`;

}


/* =========================================================
   GENERAR PÁGINA
========================================================= */

function generateProductPage(
    product,
    allProducts
) {

    const type =
        getProductType(product);


    const category =
        normalizeCategory(
            product.category
        );


    const categoryDirectory =
        path.join(
            OUTPUT_DIR,
            category
        );


    fs.mkdirSync(
        categoryDirectory,
        {
            recursive: true
        }
    );


    const filename =
        `${
            slugify(
                product.id ||
                product.name
            )
        }.html`;


    const outputFile =
        path.join(
            categoryDirectory,
            filename
        );


    let html;


    if (
        type === "clothing"
    ) {

        html =
            generateClothingHTML(
                product,
                categoryDirectory,
                allProducts
            );

    }
    else {

        html =
            generateAccessoryHTML(
                product,
                categoryDirectory,
                allProducts
            );

    }


    fs.writeFileSync(
        outputFile,
        html,
        "utf8"
    );


    return outputFile;

}


/* =========================================================
   LIMPIAR PRODUCTOS GENERADOS
========================================================= */

function cleanGeneratedProducts() {

    const categories = [
        "anime",
        "streetwear",
        "accesorios",
        "otros"
    ];


    categories.forEach(
        function (category) {

            const directory =
                path.join(
                    OUTPUT_DIR,
                    category
                );


            if (
                fs.existsSync(
                    directory
                )
            ) {

                fs.rmSync(
                    directory,
                    {
                        recursive: true,
                        force: true
                    }
                );

            }

        }
    );

}


/* =========================================================
   MAIN
========================================================= */

function main() {

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


    fs.mkdirSync(
        OUTPUT_DIR,
        {
            recursive: true
        }
    );


    cleanGeneratedProducts();


    let generated = 0;


    products.forEach(
        function (product) {

            if (
                !product ||
                product.available === false
            ) {

                return;

            }


            const output =
                generateProductPage(
                    product,
                    products
                );


            generated++;


            console.log(
                `✓ ${output}`
            );

        }
    );


    console.log(
        "========================================"
    );

    console.log(
        `Páginas generadas: ${generated}`
    );

    console.log(
        "========================================"
    );

}


main();
