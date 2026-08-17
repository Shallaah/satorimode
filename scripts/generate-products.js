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

/* =====================================================
   BANNER DE CUIDADO
===================================================== */

function generateCareBanner(
    product,
    outputDirectory,
    type
) {

    if (type !== "clothing") {

        return "";

    }

    const careImage =
        product.careImage ||
        product.details?.careImage ||
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
                satori-care-banner
                ${image ? "has-image" : "no-image"}
            "
        >

            <div class="satori-care-content">

                <span>
                    SATORII · CUIDADO
                </span>


                <h2>
                    CUIDA TU
                    <em>SATORII.</em>
                </h2>


                <p>
                    Una buena prenda merece durar.
                    Aprende a cuidar correctamente el
                    estampado y el tejido para mantener
                    tu SATORII en las mejores condiciones.
                </p>


                <a
                    href="../../cuidado.html"
                >
                    VER GUÍA DE CUIDADO →
                </a>

            </div>


            ${
                image
                    ? `
                        <div class="satori-care-image">

                            <img
                                src="${escapeHTML(image)}"
                                alt="Cuidados para ${escapeHTML(product.name)}"
                                loading="lazy"
                            >

                        </div>
                    `
                    : ""
            }

        </section>

    `;

}


/* =====================================================
   BANNER EDITORIAL
===================================================== */

function generateEditorialBanner(
    product,
    outputDirectory,
    type
) {

    const images =
        getImages(product);

    const image =
        images.length
            ? getImagePath(
                images[0],
                outputDirectory
            )
            : "";

    /*
     * Para prendas mantenemos el concepto
     * de "No vistas un personaje..."
     *
     * Para accesorios usamos una frase más
     * amplia para que funcione con figuras,
     * peluches, blind boxes, etc.
     */

    if (type === "clothing") {

        return `

            <section
                class="satori-editorial"
            >

                <div
                    class="satori-editorial-content"
                >

                    <span>
                        SATORII · TU ESTILO
                    </span>


                    <h2>

                        NO VISTAS UN
                        <em>PERSONAJE.</em>

                        <br>

                        VISTE TU
                        <strong>UNIVERSO.</strong>

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


                <div
                    class="satori-editorial-image"
                >

                    ${
                        image
                            ? `
                                <img
                                    src="${escapeHTML(image)}"
                                    alt="${escapeHTML(product.name)}"
                                    loading="lazy"
                                >
                            `
                            : `
                                <div
                                    class="satori-editorial-placeholder"
                                >
                                    SATORII
                                </div>
                            `
                    }

                </div>

            </section>

        `;

    }


    return `

        <section
            class="
                satori-editorial
                satori-editorial-accessory
            "
        >

            <div
                class="satori-editorial-content"
            >

                <span>
                    SATORII · COLECCIÓN
                </span>


                <h2>

                    ENCUENTRA
                    <em>ESO.</em>

                    <br>

                    QUE TE
                    <strong>REPRESENTA.</strong>

                </h2>


                <p>
                    Figuras, peluches, coleccionables
                    y accesorios para quienes encuentran
                    algo especial en cada detalle.
                </p>


                <a href="#producto">
                    VER PRODUCTO →
                </a>

            </div>


            <div
                class="satori-editorial-image"
            >

                ${
                    image
                        ? `
                            <img
                                src="${escapeHTML(image)}"
                                alt="${escapeHTML(product.name)}"
                                loading="lazy"
                            >
                        `
                        : `
                            <div
                                class="satori-editorial-placeholder"
                            >
                                SATORII
                            </div>
                        `
                }

            </div>

        </section>

    `;

}


/* =====================================================
   RECOMENDACIONES
===================================================== */

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
    outputDirectory,
    type
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
            product =>
                product &&
                String(product.id) !== currentId &&
                product.available !== false
        );


    let related;


    if (type === "clothing") {

        /*
         * Anime + Streetwear se consideran
         * prendas y pueden recomendarse entre sí.
         */

        const clothing =
            available.filter(
                product => {

                    const productType =
                        getProductType(
                            product
                        );

                    return (
                        productType === "clothing"
                    );

                }
            );


        const sameCategory =
            clothing.filter(
                product =>
                    normalizeCategory(
                        product.category
                    ) === currentCategory
            );


        const otherClothing =
            clothing.filter(
                product =>
                    normalizeCategory(
                        product.category
                    ) !== currentCategory
            );


        related =
            shuffle(sameCategory)
                .concat(
                    shuffle(otherClothing)
                )
                .slice(0, 5);

    }
    else {

        /*
         * Los accesorios recomiendan otros accesorios.
         */

        const accessories =
            available.filter(
                product =>
                    getProductType(
                        product
                    ) === "accessory"
            );


        related =
            shuffle(accessories)
                .slice(0, 5);

    }


    if (!related.length) {

        return "";

    }


    const cards =
        related
            .map(
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
                        `${slugify(
                            item.id ||
                            item.name
                        )}.html`;


                    const url =
                        `../${categoryPath}/${filename}`;


                    return `

                        <a
                            href="${escapeHTML(url)}"
                            class="satori-related-card"
                        >

                            <div
                                class="satori-related-image"
                            >

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


                            <div
                                class="satori-related-info"
                            >

                                <span>

                                    ${escapeHTML(
                                        String(
                                            item.collection ||
                                            item.category ||
                                            "SATORII"
                                        ).toUpperCase()
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
                class="satori-related-heading"
            >

                <span>
                    SATORII · DESCUBRE MÁS
                </span>


                <h2>
                    TAMBIÉN TE PUEDE
                    <em>GUSTAR.</em>
                </h2>


                <p>
                    ${
                        type === "clothing"
                            ? `
                                Descubre otras prendas
                                para completar tu estilo.
                            `
                            : `
                                Descubre otros productos
                                que podrían acompañar tu colección.
                            `
                    }
                </p>

            </div>


            <div
                class="satori-related-grid"
            >

                ${cards}

            </div>

        </section>

    `;

}


/* =====================================================
   CSS
===================================================== */

function generateProductCSS() {

    return `

        :root {

            --satori-red:
                #f31218;

            --satori-black:
                #111827;

            --satori-border:
                #e5e5e5;

            --satori-muted:
                #666;

        }


        * {
            box-sizing:
                border-box;
        }


        html {
            scroll-behavior:
                smooth;
        }


        body {

            margin:
                0;

            background:
                #fff;

            color:
                var(--satori-black);

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size:
                16px;

            line-height:
                1.65;

        }


        button,
        input,
        a {
            font-family:
                inherit;
        }


        a {
            color:
                inherit;
        }


        .satori-product-page {

            width:
                min(
                    1500px,
                    calc(
                        100% - 48px
                    )
                );

            margin:
                0 auto;

        }


        /* =============================================
           PRODUCTO
        ============================================= */

        .satori-product-layout {

            display:
                grid;

            grid-template-columns:
                minmax(
                    0,
                    1.02fr
                )
                minmax(
                    470px,
                    .98fr
                );

            gap:
                clamp(
                    42px,
                    5vw,
                    75px
                );

            padding:
                58px 0 55px;

            align-items:
                start;

        }


        .satori-product-gallery {

            width:
                100%;

            max-width:
                620px;

        }


        .satori-main-image {

            width:
                100%;

            aspect-ratio:
                1 / 1;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            overflow:
                hidden;

            background:
                #f7f7f7;

            border-radius:
                10px;

        }


        .satori-main-image img {

            width:
                100%;

            height:
                100%;

            object-fit:
                contain;

            display:
                block;

            transition:
                transform .35s ease;

        }


        .satori-main-image:hover img {

            transform:
                scale(
                    1.018
                );

        }


        .satori-thumbnails {

            display:
                grid;

            grid-template-columns:
                repeat(
                    3,
                    1fr
                );

            gap:
                10px;

            margin-top:
                10px;

        }


        .satori-thumbnail {

            width:
                100%;

            aspect-ratio:
                1 / 1;

            padding:
                0;

            overflow:
                hidden;

            background:
                #f7f7f7;

            border:
                1px solid #ddd;

            border-radius:
                7px;

            cursor:
                pointer;

            transition:
                .2s ease;

        }


        .satori-thumbnail.active {

            border:
                2px solid #111;

        }


        .satori-thumbnail:hover {

            transform:
                translateY(
                    -2px
                );

        }


        .satori-thumbnail img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                contain;

        }


        /* =============================================
           INFORMACIÓN
        ============================================= */

        .satori-product-info {

            width:
                100%;

            max-width:
                720px;

        }


        .satori-product-category {

            display:
                block;

            margin-bottom:
                8px;

            font-size:
                12px;

            font-weight:
                900;

            letter-spacing:
                2px;

            color:
                #777;

        }


        .satori-product-info h1 {

            margin:
                0;

            font-size:
                clamp(
                    42px,
                    4.5vw,
                    68px
                );

            line-height:
                .98;

            letter-spacing:
                -2.5px;

            font-weight:
                900;

        }


        .satori-product-price {

            margin-top:
                18px;

            font-size:
                28px;

            font-weight:
                900;

        }


        .satori-product-divider {

            width:
                100%;

            height:
                1px;

            margin:
                25px 0;

            background:
                #e5e5e5;

        }


        /* =============================================
           OPCIONES
        ============================================= */

        .satori-option {

            margin-top:
                23px;

        }


        .satori-option-header {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            margin-bottom:
                10px;

        }


        .satori-option-header span {

            font-size:
                12px;

            font-weight:
                900;

            letter-spacing:
                1.5px;

        }


        .satori-option-header a {

            color:
                #111;

            font-size:
                11px;

            font-weight:
                800;

            text-decoration:
                underline;

        }


        .satori-size-options,
        .satori-color-options {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                8px;

        }


        .satori-size-button {

            min-width:
                48px;

            min-height:
                43px;

            padding:
                0 14px;

            border:
                1px solid #ddd;

            border-radius:
                7px;

            background:
                #fff;

            color:
                #111827;

            font-size:
                13px;

            font-weight:
                800;

            cursor:
                pointer;

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

            min-height:
                43px;

            display:
                inline-flex;

            align-items:
                center;

            gap:
                8px;

            padding:
                0 15px;

            border:
                1px solid #ddd;

            border-radius:
                22px;

            background:
                #fff;

            color:
                #111827;

            font-size:
                13px;

            font-weight:
                700;

            cursor:
                pointer;

        }


        .satori-color-button.active {

            background:
                #111827;

            border-color:
                #111827;

            color:
                #fff;

        }


        .satori-color-dot {

            width:
                14px;

            height:
                14px;

            display:
                block;

            border-radius:
                50%;

            border:
                1px solid #aaa;

        }


        .satori-color-black {
            background:
                #111;
        }


        .satori-color-white {
            background:
                #fff;
        }


        .satori-color-red {
            background:
                var(--satori-red);
        }


        .satori-color-blue {
            background:
                #3568c8;
        }


        .satori-color-green {
            background:
                #3b9a5c;
        }


        /* =============================================
           CANTIDAD
        ============================================= */

        .satori-quantity-row {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            margin-top:
                28px;

        }


        .satori-quantity-label {

            font-size:
                12px;

            font-weight:
                900;

            letter-spacing:
                1.5px;

        }


        .satori-quantity {

            display:
                flex;

            align-items:
                center;

            border:
                1px solid #ddd;

            border-radius:
                7px;

            overflow:
                hidden;

        }


        .satori-quantity button {

            width:
                42px;

            height:
                42px;

            border:
                0;

            background:
                #fff;

            cursor:
                pointer;

            font-size:
                17px;

        }


        .satori-quantity span {

            min-width:
                38px;

            text-align:
                center;

            font-size:
                13px;

            font-weight:
                700;

        }


      /* =========================================
   BOTÓN AGREGAR AL CARRITO
========================================= */

.satori-add-to-cart {

    width:
        100%;

    min-height:
        54px;

    margin-top:
        22px;

    border:
        0;

    border-radius:
        6px;

    background:
        #111827;

    color:
        #fff;

    font-size:
        12px;

    font-weight:
        900;

    letter-spacing:
        .7px;

    cursor:
        pointer;

    position:
        relative;

    overflow:
        hidden;

    transform:
        scale(1);

    transition:
        background-color .35s ease,
        color .25s ease,
        transform .18s ease,
        box-shadow .35s ease;

}


/* Al pasar el mouse */

.satori-add-to-cart:hover {

    background:
        #000;

    transform:
        translateY(-1px);

}


/* Efecto de presión */

.satori-add-to-cart:active {

    transform:
        scale(.97);

}


/* =========================================
   ESTADO AGREGADO
========================================= */

.satori-add-to-cart.added {

    background:
        #f31218 !important;

    color:
        #fff !important;

    box-shadow:
        0 8px 24px
        rgba(
            243,
            18,
            24,
            .22
        );

    animation:
        satoriCartAdded
        .55s
        cubic-bezier(
            .34,
            1.56,
            .64,
            1
        );

}


/* =========================================
   ANIMACIÓN
========================================= */

@keyframes satoriCartAdded {

    0% {

        transform:
            scale(.96);

    }

    45% {

        transform:
            scale(1.035);

    }

    70% {

        transform:
            scale(.985);

    }

    100% {

        transform:
            scale(1);

    }

}


/* =========================================
   BRILLO QUE PASA POR EL BOTÓN
========================================= */

.satori-add-to-cart.added::after {

    content:
        "";

    position:
        absolute;

    top:
        0;

    left:
        -120%;

    width:
        60%;

    height:
        100%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(
                255,
                255,
                255,
                .28
            ),
            transparent
        );

    transform:
        skewX(-20deg);

    animation:
        satoriCartShine
        .65s
        ease
        forwards;

}


@keyframes satoriCartShine {

    from {

        left:
            -120%;

    }

    to {

        left:
            140%;

    }

}
        /* =============================================
           TRUST
        ============================================= */

        .satori-trust-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    3,
                    1fr
                );

            margin-top:
                8px;

            border:
                1px solid #e2e2e2;

            border-radius:
                7px;

            overflow:
                hidden;

        }


        .satori-trust-item {

            min-height:
                74px;

            display:
                flex;

            align-items:
                center;

            gap:
                9px;

            padding:
                12px;

        }


        .satori-trust-item
        + .satori-trust-item {

            border-left:
                1px solid #e5e5e5;

        }


        .satori-trust-icon {

            width:
                24px;

            height:
                24px;

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

            font-size:
                11px;

        }


        .satori-trust-item strong {

            display:
                block;

            font-size:
                10px;

            font-weight:
                900;

        }


        .satori-trust-item span {

            display:
                block;

            margin-top:
                2px;

            color:
                #777;

            font-size:
                10px;

            line-height:
                1.35;

        }


        /* =============================================
           DESCRIPCIÓN
        ============================================= */

        .satori-details {

            margin-top:
                10px;

            border:
                1px solid #ddd;

            border-radius:
                7px;

            overflow:
                hidden;

        }


        .satori-tabs {

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

            border-bottom:
                1px solid #ddd;

        }


        .satori-tab {

            min-height:
                48px;

            border:
                0;

            background:
                #fff;

            font-size:
                11px;

            font-weight:
                900;

            cursor:
                pointer;

        }


        .satori-tab.active {

            background:
                #fafafa;

        }


        .satori-panel {

            display:
                none;

            padding:
                23px;

        }


        .satori-panel.active {

            display:
                block;

        }


        .satori-panel h3 {

            margin:
                0 0 10px;

            font-size:
                16px;

        }


        .satori-panel p {

            margin:
                0;

            color:
                #666;

            font-size:
                14px;

            line-height:
                1.75;

        }


        .satori-product-care {

            margin-top:
                17px !important;

        }


        .satori-detail-item
        + .satori-detail-item {

            margin-top:
                20px;

        }


        .satori-detail-item strong {

            font-size:
                12px;

            font-weight:
                900;

        }


        .satori-detail-item p {

            margin-top:
                6px;

        }


        /* =============================================
           CUIDA TU SATORII
        ============================================= */

        .satori-care-banner {

            width:
                100%;

            min-height:
                190px;

            display:
                flex;

            align-items:
                stretch;

            margin:
                5px 0 65px;

            overflow:
                hidden;

            border-radius:
                7px;

            background:
                linear-gradient(
                    100deg,
                    #090909,
                    #230407
                );

            color:
                #fff;

        }


        .satori-care-content {

            flex:
                1;

            padding:
                36px 45px;

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            position:
                relative;

            z-index:
                2;

        }


        .satori-care-content span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2.5px;

        }


        .satori-care-content h2 {

            margin:
                4px 0;

            font-size:
                clamp(
                    30px,
                    3.5vw,
                    48px
                );

            line-height:
                .9;

            letter-spacing:
                -2px;

            font-weight:
                900;

        }


        .satori-care-content h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-care-content p {

            max-width:
                650px;

            margin:
                10px 0 15px;

            color:
                #d0d0d0;

            font-size:
                13px;

            line-height:
                1.55;

        }


        .satori-care-content a {

            width:
                max-content;

            padding:
                9px 13px;

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


        .satori-care-image {

            width:
                38%;

            min-height:
                190px;

            overflow:
                hidden;

        }


        .satori-care-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

        }


        /* =============================================
           ESPECIFICACIONES ACCESORIOS
        ============================================= */

        .satori-accessory-info {

            margin:
                5px 0 65px;

            padding:
                45px;

            border:
                1px solid #e5e5e5;

            border-radius:
                7px;

            background:
                #fafafa;

        }


        .satori-section-label {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2.5px;

        }


        .satori-accessory-info h2 {

            margin:
                6px 0 12px;

            font-size:
                clamp(
                    34px,
                    4vw,
                    52px
                );

            line-height:
                .9;

            letter-spacing:
                -2px;

            font-weight:
                900;

        }


        .satori-accessory-info h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-accessory-info > p {

            max-width:
                650px;

            margin:
                0;

            color:
                #666;

            font-size:
                14px;

        }


        .satori-spec-grid {

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
                28px;

        }


        .satori-spec {

            min-height:
                105px;

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                space-between;

            padding:
                17px;

            background:
                #fff;

            border:
                1px solid #e5e5e5;

            border-radius:
                6px;

        }


        .satori-spec span {

            color:
                #888;

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                1.2px;

            text-transform:
                uppercase;

        }


        .satori-spec strong {

            font-size:
                14px;

            line-height:
                1.3;

        }


        /* =============================================
           RECOMENDACIONES
        ============================================= */

        .satori-related {

            padding:
                0 0 65px;

        }


        .satori-related-heading {

            margin-bottom:
                24px;

        }


        .satori-related-heading > span {

            display:
                block;

            margin-bottom:
                5px;

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2.2px;

        }


        .satori-related-heading h2 {

            margin:
                0;

            font-size:
                clamp(
                    30px,
                    3.8vw,
                    46px
                );

            line-height:
                .95;

            letter-spacing:
                -2px;

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
                9px 0 0;

            color:
                #777;

            font-size:
                14px;

        }


        .satori-related-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    5,
                    1fr
                );

            gap:
                16px;

        }


        .satori-related-card {

            text-decoration:
                none;

            color:
                #111;

        }


        .satori-related-image {

            width:
                100%;

            aspect-ratio:
                1 / 1;

            overflow:
                hidden;

            background:
                #f6f6f6;

            border-radius:
                6px;

            position:
                relative;

        }


        .satori-related-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                contain;

            transition:
                transform .3s ease;

        }


        .satori-related-card:hover
        .satori-related-image img {

            transform:
                scale(
                    1.04
                );

        }


        .satori-related-info {

            padding-top:
                9px;

        }


        .satori-related-info span {

            color:
                #888;

            font-size:
                8px;

            font-weight:
                900;

            letter-spacing:
                1.2px;

        }


        .satori-related-info h3 {

            margin:
                3px 0;

            font-size:
                12px;

            line-height:
                1.25;

            font-weight:
                800;

        }


        .satori-related-info strong {

            font-size:
                12px;

        }


        /* =============================================
           BANNER EDITORIAL
        ============================================= */

        .satori-editorial {

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

            min-height:
                470px;

            margin:
                0 0 70px;

            overflow:
                hidden;

            border-radius:
                7px;

            background:
                #090909;

            color:
                #fff;

        }


        .satori-editorial-content {

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            padding:
                55px;

        }


        .satori-editorial-content span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2.5px;

        }


        .satori-editorial h2 {

            margin:
                10px 0;

            font-size:
                clamp(
                    42px,
                    5vw,
                    72px
                );

            line-height:
                .88;

            letter-spacing:
                -3px;

            font-weight:
                900;

        }


        .satori-editorial h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-editorial h2 strong {

            color:
                #fff;

        }


        .satori-editorial-content p {

            max-width:
                470px;

            margin:
                10px 0 20px;

            color:
                #c9c9c9;

            font-size:
                14px;

        }


        .satori-editorial-content a {

            width:
                max-content;

            padding:
                10px 14px;

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


        .satori-editorial-image {

            position:
                relative;

            min-height:
                470px;

            overflow:
                hidden;

            background:
                radial-gradient(
                    circle,
                    #35090c,
                    #090909 70%
                );

        }


        .satori-editorial-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                contain;

            transform:
                scale(
                    1.08
                );

        }


        .satori-editorial-placeholder {

            width:
                100%;

            height:
                100%;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .15
                );

            font-size:
                50px;

            font-weight:
                900;

            letter-spacing:
                5px;

        }


        /* =============================================
           RESPONSIVE
        ============================================= */

        @media (
            max-width: 1100px
        ) {

            .satori-product-layout {

                grid-template-columns:
                    1fr;

            }


            .satori-product-gallery {

                max-width:
                    none;

            }


            .satori-product-info {

                max-width:
                    none;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(
                        4,
                        1fr
                    );

            }


            .satori-spec-grid {

                grid-template-columns:
                    repeat(
                        2,
                        1fr
                    );

            }

        }


        @media (
            max-width: 850px
        ) {

            .satori-related-grid {

                grid-template-columns:
                    repeat(
                        3,
                        1fr
                    );

            }


            .satori-editorial {

                grid-template-columns:
                    1fr;

            }


            .satori-editorial-image {

                min-height:
                    350px;

            }


            .satori-care-banner {

                display:
                    block;

            }


            .satori-care-image {

                width:
                    100%;

                min-height:
                    230px;

            }

        }


        @media (
            max-width: 650px
        ) {

            .satori-product-page {

                width:
                    calc(
                        100% - 22px
                    );

            }


            .satori-product-layout {

                padding:
                    35px 0 50px;

            }


            .satori-product-info h1 {

                font-size:
                    38px;

            }


            .satori-trust-grid {

                grid-template-columns:
                    1fr;

            }


            .satori-trust-item
            + .satori-trust-item {

                border-left:
                    0;

                border-top:
                    1px solid #e5e5e5;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(
                        2,
                        1fr
                    );

                gap:
                    14px;

            }


            .satori-editorial-content {

                padding:
                    38px 25px;

            }


            .satori-editorial h2 {

                font-size:
                    42px;

            }


            .satori-care-content {

                padding:
                    30px 25px;

            }


            .satori-accessory-info {

                padding:
                    30px 22px;

            }


            .satori-spec-grid {

                grid-template-columns:
                    1fr 1fr;

            }

        }

    `;

}

/* =====================================================
   JAVASCRIPT DE LA PÁGINA
===================================================== */

function generateProductJS() {

    return `

        <script>

        document.addEventListener(
            "DOMContentLoaded",
            function () {


                /* =========================================
                   GALERÍA
                ========================================= */

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
                                            item =>
                                                item.classList.remove(
                                                    "active"
                                                )
                                        );


                                    this.classList.add(
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
                        ".satori-color-button"
                    )
                    .forEach(
                        function (button) {

                            button.addEventListener(
                                "click",
                                function () {

                                    document
                                        .querySelectorAll(
                                            ".satori-color-button"
                                        )
                                        .forEach(
                                            item =>
                                                item.classList.remove(
                                                    "active"
                                                )
                                        );


                                    this.classList.add(
                                        "active"
                                    );

                                }
                            );

                        }
                    );


                /* =========================================
                   TALLAS
                ========================================= */

                document
                    .querySelectorAll(
                        ".satori-size-button"
                    )
                    .forEach(
                        function (button) {

                            button.addEventListener(
                                "click",
                                function () {

                                    document
                                        .querySelectorAll(
                                            ".satori-size-button"
                                        )
                                        .forEach(
                                            item =>
                                                item.classList.remove(
                                                    "active"
                                                )
                                        );


                                    this.classList.add(
                                        "active"
                                    );

                                }
                            );

                        }
                    );


                /* =========================================
                   CANTIDAD
                ========================================= */

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

                    if (quantityDisplay) {

                        quantityDisplay.textContent =
                            quantity;

                    }


                    if (quantityInput) {

                        quantityInput.value =
                            quantity;

                    }

                }


                if (minus) {

                    minus.addEventListener(
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


                if (plus) {

                    plus.addEventListener(
                        "click",
                        function () {

                            quantity += 1;

                            updateQuantity();

                        }
                    );

                }


                updateQuantity();


                /* =========================================
                   TABS
                ========================================= */

                document
                    .querySelectorAll(
                        ".satori-tab"
                    )
                    .forEach(
                        function (tab) {

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
                                            item =>
                                                item.classList.remove(
                                                    "active"
                                                )
                                        );


                                    document
                                        .querySelectorAll(
                                            ".satori-panel"
                                        )
                                        .forEach(
                                            panel =>
                                                panel.classList.remove(
                                                    "active"
                                                )
                                        );


                                    this.classList.add(
                                        "active"
                                    );


                                    const panel =
                                        document.querySelector(
                                            '[data-panel="' +
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

                        }
                    );


/* =========================================
   CARRITO · ANIMACIÓN
========================================= */

const addButton =
    document.getElementById(
        "addToCart"
    );


if (addButton) {

    const originalText =
        addButton.textContent.trim();


    let resetTimer = null;


    function showAddedAnimation() {

        /*
         * Evitamos que un segundo clic
         * deje varios temporizadores activos.
         */

        if (resetTimer) {

            clearTimeout(
                resetTimer
            );

        }


        /*
         * Reiniciamos la animación.
         */

        addButton.classList.remove(
            "added"
        );


        void addButton.offsetWidth;


        /*
         * Activamos el estado rojo.
         */

        addButton.classList.add(
            "added"
        );


        addButton.textContent =
            "✓ AGREGADO AL CARRITO";


        /*
         * Después de 2 segundos
         * vuelve al botón original.
         */

        resetTimer =
            setTimeout(
                function () {

                    addButton.classList.remove(
                        "added"
                    );


                    addButton.textContent =
                        originalText;

                },
                2000
            );

    }


    /*
     * IMPORTANTE:
     *
     * No usamos preventDefault().
     * No usamos stopPropagation().
     *
     * De esta manera cart.js puede
     * seguir agregando el producto.
     */

    addButton.addEventListener(
        "click",
        function () {

            /*
             * Esperamos un instante para
             * que cart.js procese primero
             * el producto.
             */

            setTimeout(
                function () {

                    showAddedAnimation();

                },
                80
            );

        }
    );

}

/* =====================================================
   HTML PRENDA
===================================================== */

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
        `${product.name} · SATORII`;


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


    <style>

        ${generateProductCSS()}

    </style>

</head>


<body

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"

>


    <div
        id="satori-header"
    ></div>


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
                            class="quantity-input"
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
                outputDirectory,
                "clothing"
            )}


            ${generateRecommendations(
                product,
                allProducts,
                outputDirectory,
                "clothing"
            )}


            ${generateEditorialBanner(
                product,
                outputDirectory,
                "clothing"
            )}


        </div>

    </main>


    <div
        id="satori-footer"
    ></div>


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


    <script
        src="../../js/cart.js"
    ></script>


    ${generateProductJS()}


</body>

</html>`;

}


/* =====================================================
   HTML ACCESORIOS
===================================================== */

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
        `${product.name} · SATORII`;


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


    <style>

        ${generateProductCSS()}

    </style>

</head>


<body

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"

>


    <div
        id="satori-header"
    ></div>


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
                            class="quantity-input"
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
                    >
                        AGREGAR AL CARRITO · ${price}
                    </button>


                    ${generateTrustBlocks(product)}


                    ${generateDescription(
                        product,
                        "accessory"
                    )}

                </div>

            </section>


            ${generateAccessorySpecs(
                product
            )}


            ${generateRecommendations(
                product,
                allProducts,
                outputDirectory,
                "accessory"
            )}


            ${generateEditorialBanner(
                product,
                outputDirectory,
                "accessory"
            )}


        </div>

    </main>


    <div
        id="satori-footer"
    ></div>


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


    <script
        src="../../js/cart.js"
    ></script>


    ${generateProductJS()}


</body>

</html>`;

}


/* =====================================================
   GENERADOR PRINCIPAL
===================================================== */

function generateProductHTML(
    product,
    outputDirectory,
    allProducts
) {

    const type =
        getProductType(
            product
        );


    if (type === "clothing") {

        return generateClothingHTML(
            product,
            outputDirectory,
            allProducts
        );

    }


    return generateAccessoryHTML(
        product,
        outputDirectory,
        allProducts
    );

}


/* =====================================================
   GENERAR TODO
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
        function (product) {

            if (
                !product ||
                !product.id ||
                !product.name
            ) {

                console.warn(
                    "⚠ Producto ignorado: falta id o name."
                );

                return;

            }


            const category =
                normalizeCategory(
                    product.category
                );


            const type =
                getProductType(
                    product
                );


            const folder =
                path.join(
                    OUTPUT_DIR,
                    category
                );


            fs.mkdirSync(
                folder,
                {
                    recursive:
                        true
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
                `✓ ${type.toUpperCase()} → productos/${category}/${filename}`
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
   EJECUCIÓN
===================================================== */

try {

    generateProducts();

}
catch (error) {

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


    process.exit(1);

}
