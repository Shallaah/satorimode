const fs = require("fs");
const path = require("path");
const vm = require("vm");

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
   UTILIDADES
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


/*
 * Anime + Streetwear = PRENDA
 * Accesorios = FICHA FLEXIBLE
 * Otros = ficha flexible como respaldo.
 */

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

    const relative =
        path.relative(
            outputDirectory,
            absolute
        );

    return relative
        .split(path.sep)
        .join("/");

}


/* =====================================================
   PRODUCTOS
===================================================== */

function loadProducts() {

    if (!fs.existsSync(PRODUCTS_FILE)) {

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

    vm.createContext(context);

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
   GALERÍA
===================================================== */

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

    const main =
        prepared[0];

    const thumbnails =
        prepared
            .map(
                (image, index) => `

                    <button
                        type="button"
                        class="
                            satori-thumbnail
                            ${index === 0 ? "active" : ""}
                        "
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
            )
            .join("");

    return `

        <div class="satori-main-image">

            <img
                id="satoriMainImage"
                src="${escapeHTML(main)}"
                alt="${escapeHTML(product.name)}"
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

                ${product.colors
                    .map(
                        (color, index) => `

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
                                data-color="${escapeHTML(color)}"
                            >

                                <span
                                    class="
                                        satori-color-dot
                                        ${getColorClass(color)}
                                    "
                                ></span>

                                <span>
                                    ${escapeHTML(color)}
                                </span>

                            </button>

                        `
                    )
                    .join("")}

            </div>

        </section>

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

        <section class="satori-option">

            <div class="satori-option-header">

                <span>
                    TALLA
                </span>

                <a href="../../guia-tallas.html">
                    GUÍA DE TALLAS
                </a>

            </div>


            <div class="satori-size-options">

                ${product.sizes
                    .map(
                        (size, index) => `

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
                                data-size="${escapeHTML(size)}"
                            >
                                ${escapeHTML(size)}
                            </button>

                        `
                    )
                    .join("")}

            </div>

        </section>

    `;

}


/* =====================================================
   DETALLES
===================================================== */

function getDetails(product) {

    return product.details || {};

}


/* =====================================================
   CONFIANZA
===================================================== */

function generateTrustBlocks(product) {

    const details =
        getDetails(product);

    const shipping =
        details.shipping ||
        "Envíos a todo Chile.";

    const warranty =
        details.warranty ||
        "Compra protegida.";

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
                        ${escapeHTML(shipping)}
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
                        ${escapeHTML(warranty)}
                    </span>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   DESCRIPCIÓN
===================================================== */

function generateDescription(
    product,
    type
) {

    const details =
        getDetails(product);

    const description =
        details.description ||
        product.description ||
        `${product.name} · SATORII`;

    const shipping =
        details.shipping ||
        "Enviamos a todo Chile.";

    const warranty =
        details.warranty ||
        "Compra protegida frente a fallas de fabricación.";

    const care =
        details.care ||
        (
            type === "clothing"
                ? "Lavar con agua fría. No planchar directamente sobre el estampado."
                : "Revisa las indicaciones específicas del producto antes de utilizarlo o limpiarlo."
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


/* =====================================================
   ESPECIFICACIONES DE ACCESORIOS
===================================================== */

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

        return `

            <section
                class="satori-accessory-info"
            >

                <div
                    class="satori-section-label"
                >
                    DETALLES
                </div>


                <h2>
                    LO ESENCIAL,
                    <br>
                    <em>BIEN ELEGIDO.</em>
                </h2>


                <p>
                    Cada accesorio SATORII puede tener
                    características diferentes. Aquí podrás
                    encontrar los detalles específicos
                    de este producto.
                </p>

            </section>

        `;

    }

    return `

        <section
            class="satori-accessory-info"
        >

            <div
                class="satori-section-label"
            >
                DETALLES DEL PRODUCTO
            </div>


            <h2>
                CONOCE SUS
                <br>
                <em>DETALLES.</em>
            </h2>


            <div class="satori-spec-grid">

                ${specs
                    .map(
                        spec => `

                            <div
                                class="satori-spec"
                            >

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
                    )
                    .join("")}

            </div>

        </section>

    `;

}
