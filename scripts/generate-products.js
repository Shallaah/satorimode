/*
=========================================================
SATORII
GENERADOR AUTOMÁTICO DE PÁGINAS DE PRODUCTO
=========================================================

Genera:

    productos/anime/*.html
    productos/streetwear/*.html
    productos/accesorios/*.html
    productos/otros/*.html

Características:

- Máximo 3 imágenes
- Galería cuadrada
- Diseño responsive
- Carrito conectado con cart.js
- Recomendaciones
- Banner editorial
- Historia del diseño
- Guía de cuidado
- Banner final
- Header global
- Footer global
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
   CARGAR PRODUCTOS
===================================================== */

function loadProducts() {

    if (!fs.existsSync(PRODUCTS_FILE)) {
        throw new Error(
            "No se encontró js/products.js"
        );
    }

    const source = fs.readFileSync(
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

    const value = String(
        category || "otros"
    )
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
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


function getImages(product) {

    if (
        Array.isArray(product.images) &&
        product.images.length
    ) {
        return product.images.slice(0, 3);
    }

    if (product.image) {
        return [product.image];
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

    const absolute = path.resolve(
        ROOT,
        String(image)
    );

    const relative = path.relative(
        outputDirectory,
        absolute
    );

    return relative
        .split(path.sep)
        .join("/");

}


function getColorClass(color) {

    const value = String(
        color || ""
    )
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    if (value.includes("blanco")) {
        return "satori-color-white";
    }

    if (value.includes("rojo")) {
        return "satori-color-red";
    }

    if (value.includes("azul")) {
        return "satori-color-blue";
    }

    if (value.includes("verde")) {
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

    const images = getImages(product);

    if (!images.length) {

        return `
            <div class="satori-main-image">
                <div class="satori-image-placeholder">
                    SATORII
                </div>
            </div>
        `;

    }

    const prepared = images.map(
        image =>
            getImagePath(
                image,
                outputDirectory
            )
    );

    const main = prepared[0];

    const thumbnails = prepared
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

                ${
                    product.colors
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
                                        ${escapeHTML(color)}
                                    </span>

                                </button>

                            `
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

                ${
                    product.sizes
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
                                    data-size="${escapeHTML(
                                        size
                                    )}"
                                >
                                    ${escapeHTML(size)}
                                </button>

                            `
                        )
                        .join("")
                }

            </div>

        </section>

    `;
}


/* =====================================================
   CONFIANZA
===================================================== */

function generateTrustBlocks(product) {

    const details =
        product.details || {};

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
                    ✦
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

function generateDetails(product) {

    const details =
        product.details || {};

    const description =
        details.description ||
        product.description ||
        "Producto creado para representar el estilo SATORII.";

    const shipping =
        details.shipping ||
        "Enviamos a todo Chile.";

    const warranty =
        details.warranty ||
        "Compra protegida.";

    const care =
        details.care ||
        "";

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

                ${
                    care
                        ? `
                            <p class="satori-product-care">

                                <strong>
                                    Cuidados:
                                </strong>

                                ${escapeHTML(care)}

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
   RECOMENDACIONES
===================================================== */

function shuffle(array) {

    const result = array.slice();

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
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
        String(currentProduct.id);

    const category =
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

    const sameCategory =
        available.filter(
            product =>
                normalizeCategory(
                    product.category
                ) === category
        );

    const otherCategory =
        available.filter(
            product =>
                normalizeCategory(
                    product.category
                ) !== category
        );

    const related =
        shuffle(sameCategory)
            .concat(
                shuffle(otherCategory)
            )
            .slice(0, 4);


    if (!related.length) {
        return "";
    }


    const cards =
        related
            .map(item => {

                const images =
                    getImages(item);

                const image =
                    images.length
                        ? getImagePath(
                            images[0],
                            outputDirectory
                        )
                        : "";

                const itemCategory =
                    String(
                        item.collection ||
                        item.category ||
                        "SATORII"
                    ).toUpperCase();

                const itemCategoryPath =
                    normalizeCategory(
                        item.category
                    );

                const filename =
                    `${slugify(
                        item.id ||
                        item.name
                    )}.html`;

                const url =
                    `../${itemCategoryPath}/${filename}`;


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

                            <div class="satori-related-overlay">
                                VER PRODUCTO →
                            </div>

                        </div>


                        <div class="satori-related-info">

                            <span>
                                ${escapeHTML(itemCategory)}
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

            })
            .join("");


    return `

        <section class="satori-related">

            <div class="satori-related-heading">

                <span>
                    SATORII · DESCUBRE MÁS
                </span>

                <h2>
                    TAMBIÉN TE PUEDE
                    <em>GUSTAR.</em>
                </h2>

                <p>
                    Diseños que podrían convertirse
                    en parte de tu universo.
                </p>

            </div>


            <div class="satori-related-grid">

                ${cards}

            </div>

        </section>

    `;
}


/* =====================================================
   BANNER FULL WIDTH
===================================================== */

function generateSlimBanner(product) {

    const category =
        String(
            product.collection ||
            product.category ||
            "SATORII"
        ).toUpperCase();

    return `

        <section class="satori-slim-banner">

            <div>

                <span>
                    SATORII · ${escapeHTML(category)}
                </span>

                <strong>
                    LLEVA TU ESTILO.
                </strong>

                <p>
                    Una pieza, una historia, una forma
                    de representar lo que te gusta.
                </p>

            </div>

            <a href="../../productos.html">
                VER MÁS →
            </a>

        </section>

    `;
}


/* =====================================================
   EDITORIAL
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
        ).toUpperCase();

    return `

        <section class="satori-editorial">

            <div class="satori-editorial-content">

                <span class="satori-editorial-label">
                    SATORII / ${escapeHTML(category)}
                </span>

                <h2>
                    NO VISTAS
                    <span>UN PERSONAJE.</span>
                    <br>
                    VISTE TU UNIVERSO.
                </h2>

                <p>
                    Tu prenda no es solamente una ilustración.
                    Es una forma de llevar contigo aquello
                    que te representa.
                </p>

                <a
                    href="../../anime.html"
                    class="satori-editorial-button"
                >
                    EXPLORAR COLECCIÓN →
                </a>

            </div>


            <div class="satori-editorial-image">

                ${
                    mainImage
                        ? `
                            <img
                                src="${escapeHTML(mainImage)}"
                                alt="${escapeHTML(product.name)}"
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
   HISTORIA DEL DISEÑO
===================================================== */

function generateBrandDetails(product) {

    const details =
        product.details || {};

    const care =
        details.care ||
        "Sigue las recomendaciones de lavado para conservar la prenda y su estampado.";


    return `

        <section class="satori-story">

            <div class="satori-story-heading">

                <span>
                    SATORII · DETRÁS DEL DISEÑO
                </span>

                <h2>
                    LA HISTORIA
                    <em>DETRÁS DEL DISEÑO.</em>
                </h2>

                <p>
                    Cada pieza nace para que puedas llevar
                    contigo una parte del universo que te inspira.
                </p>

            </div>


            <div class="satori-story-grid">

                <article>

                    <span>
                        01
                    </span>

                    <h3>
                        INSPIRACIÓN
                    </h3>

                    <p>
                        Tomamos referencias del anime,
                        manga y cultura japonesa para crear
                        diseños que tengan personalidad propia.
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
                        Buscamos que cada composición tenga
                        presencia y pueda sentirse como parte
                        de tu propio estilo.
                    </p>

                </article>


                <article>

                    <span>
                        03
                    </span>

                    <h3>
                        SATORII
                    </h3>

                    <p>
                        ${escapeHTML(care)}
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

        <section class="satori-care-guide">

            <div class="satori-care-icon">
                🧺
            </div>


            <div class="satori-care-content">

                <span>
                    SATORII · CUIDADO
                </span>

                <h2>
                    CUIDA TU
                    <strong>SATORII.</strong>
                </h2>

                <p>
                    Queremos que tu diseño siga contigo
                    por mucho tiempo. Aprende cómo lavar,
                    secar y conservar correctamente tu prenda.
                </p>

            </div>


            <a
                href="../../cuidado.html"
                class="satori-care-button"
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

        <section class="satori-final-banner">

            <div>

                <span>
                    SATORII · TU UNIVERSO
                </span>

                <h2>
                    ENCUENTRA TU
                    <strong>UNIVERSO.</strong>
                </h2>

                <p>
                    Explora más diseños y encuentra
                    la próxima pieza que te represente.
                </p>

                <a href="../../productos.html">
                    VER TODA LA COLECCIÓN →
                </a>

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

            --satori-red: #f31218;
            --satori-black: #111827;
            --satori-dark: #0d0d0d;
            --satori-border: #e5e5e5;
            --satori-muted: #666;

        }


        * {
            box-sizing: border-box;
        }


        body {

            margin: 0;

            background: #fff;

            color:
                var(--satori-black);

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 15px;

            line-height: 1.6;

        }


        button,
        input,
        a {
            font-family: inherit;
        }


        .satori-product-page {

            width:
                min(
                    1500px,
                    calc(100% - 70px)
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
                minmax(0, 1.08fr)
                minmax(420px, .92fr);

            gap:
                clamp(
                    45px,
                    5vw,
                    90px
                );

            padding:
                65px 0 70px;

            align-items:
                start;

        }


        /* =================================================
           GALERÍA
        ================================================= */

        .satori-product-gallery {

            min-width: 0;

            max-width: 820px;

        }


        .satori-main-image {

            width: 100%;

            aspect-ratio: 1 / 1;

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
                12px;

        }


        .satori-main-image img {

            width: 100%;

            height: 100%;

            object-fit:
                contain;

            display: block;

            transition:
                transform .35s ease;

        }


        .satori-main-image:hover img {
            transform: scale(1.015);
        }


        .satori-thumbnails {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 12px;

            margin-top: 12px;

        }


        .satori-thumbnail {

            width: 100%;

            aspect-ratio: 1 / 1;

            padding: 0;

            overflow: hidden;

            background: #f7f7f7;

            border:
                1px solid #ddd;

            border-radius: 8px;

            cursor: pointer;

            transition:
                .2s ease;

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

            display: block;

            object-fit: contain;

        }


        .satori-image-placeholder {

            color: #aaa;

            font-size: 22px;

            font-weight: 900;

            letter-spacing: 4px;

        }


        /* =================================================
           INFORMACIÓN
        ================================================= */

        .satori-product-info {

            width: 100%;

            max-width: 720px;

        }


        .satori-product-category {

            display: block;

            margin-bottom: 8px;

            color: #777;

            font-size: 12px;

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

            line-height: 1;

            letter-spacing:
                -2px;

            font-weight: 900;

        }


        .satori-product-price {

            margin-top: 17px;

            font-size: 28px;

            font-weight: 900;

        }


        .satori-product-divider {

            width: 100%;

            height: 1px;

            margin:
                22px 0;

            background:
                var(--satori-border);

        }


        /* =================================================
           OPCIONES
        ================================================= */

        .satori-option {

            margin-top: 24px;

        }


        .satori-option-header {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            margin-bottom: 10px;

        }


        .satori-option-header span {

            font-size: 12px;

            font-weight: 900;

            letter-spacing: 1px;

        }


        .satori-option-header a {

            color: #111;

            font-size: 11px;

            font-weight: 800;

            text-decoration:
                underline;

        }


        .satori-size-options,
        .satori-color-options {

            display:
                flex;

            flex-wrap:
                wrap;

            gap: 9px;

        }


        .satori-size-button {

            min-width: 48px;

            min-height: 42px;

            padding:
                0 14px;

            border:
                1px solid #ddd;

            border-radius: 7px;

            background: #fff;

            color: #111827;

            font-size: 12px;

            font-weight: 800;

            cursor: pointer;

        }


        .satori-size-button.active {

            background:
                #111827;

            border-color:
                #111827;

            color: #fff;

        }


        .satori-color-button {

            min-height: 42px;

            display:
                inline-flex;

            align-items:
                center;

            gap: 8px;

            padding:
                0 15px;

            border:
                1px solid #ddd;

            border-radius: 22px;

            background: #fff;

            color: #111827;

            font-size: 12px;

            font-weight: 700;

            cursor: pointer;

        }


        .satori-color-button.active {

            background:
                #111827;

            border-color:
                #111827;

            color: #fff;

        }


        .satori-color-dot {

            width: 14px;

            height: 14px;

            display: block;

            border-radius: 50%;

            border:
                1px solid #aaa;

        }


        .satori-color-black {
            background: #111;
        }


        .satori-color-white {
            background: #fff;
        }


        .satori-color-red {
            background:
                var(--satori-red);
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

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            margin-top: 28px;

        }


        .satori-quantity-label {

            font-size: 12px;

            font-weight: 900;

            letter-spacing: 1px;

        }


        .satori-quantity {

            display:
                flex;

            align-items:
                center;

            border:
                1px solid #ddd;

            border-radius: 7px;

            overflow: hidden;

        }


        .satori-quantity button {

            width: 42px;

            height: 40px;

            border: 0;

            background: #fff;

            cursor: pointer;

            font-size: 17px;

        }


        .satori-quantity span {

            min-width: 36px;

            text-align: center;

            font-size: 13px;

            font-weight: 800;

        }


        /* =================================================
           BOTÓN CARRITO
        ================================================= */

        .satori-add-to-cart {

            width: 100%;

            min-height: 54px;

            margin-top: 18px;

            padding: 0 20px;

            border: 0;

            border-radius: 7px;

            background:
                #111827;

            color: #fff;

            font-size: 13px;

            font-weight: 900;

            letter-spacing: .3px;

            cursor: pointer;

            transition:
                background .2s ease,
                transform .2s ease;

        }


        .satori-add-to-cart:hover {

            transform:
                translateY(-1px);

        }


        .satori-add-to-cart.added {

            background:
                var(--satori-red);

        }


        /* =================================================
           CONFIANZA
        ================================================= */

        .satori-trust-grid {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            margin-top: 8px;

            border:
                1px solid var(--satori-border);

            border-radius: 8px;

            overflow: hidden;

        }


        .satori-trust-item {

            min-height: 76px;

            display:
                flex;

            align-items:
                center;

            gap: 10px;

            padding:
                12px;

        }


        .satori-trust-item + .satori-trust-item {

            border-left:
                1px solid var(--satori-border);

        }


        .satori-trust-icon {

            width: 28px;

            height: 28px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius: 50%;

            background:
                #f5f5f5;

            font-size: 12px;

        }


        .satori-trust-item strong {

            display: block;

            font-size: 10px;

            font-weight: 900;

        }


        .satori-trust-item span {

            display: block;

            margin-top: 2px;

            color: #777;

            font-size: 10px;

            line-height: 1.35;

        }


        /* =================================================
           DESCRIPCIÓN
        ================================================= */

        .satori-details {

            margin-top: 12px;

            border:
                1px solid var(--satori-border);

            border-radius: 8px;

            overflow: hidden;

        }


        .satori-tabs {

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

            border-bottom:
                1px solid var(--satori-border);

        }


        .satori-tab {

            min-height: 48px;

            border: 0;

            background: #fafafa;

            font-size: 10px;

            font-weight: 900;

            cursor: pointer;

        }


        .satori-tab.active {

            background: #fff;

        }


        .satori-panel {

            display: none;

            padding:
                22px;

        }


        .satori-panel.active {
            display: block;
        }


        .satori-panel h3 {

            margin:
                0 0 10px;

            font-size: 14px;

        }


        .satori-panel p {

            margin: 0;

            color: #555;

            font-size: 13px;

            line-height: 1.7;

        }


        .satori-product-care {

            margin-top: 16px !important;

            padding-top: 15px;

            border-top:
                1px solid #eee;

        }


        .satori-detail-item + .satori-detail-item {

            margin-top: 18px;

            padding-top: 18px;

            border-top:
                1px solid #eee;

        }


        /* =================================================
           BANNER DELGADO
        ================================================= */

        .satori-slim-banner {

            width: 100%;

            min-height: 155px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            gap: 30px;

            margin:
                10px 0 60px;

            padding:
                30px 45px;

            background:
                linear-gradient(
                    100deg,
                    #0d0d0d,
                    #240508
                );

            color: #fff;

            border-radius: 10px;

            overflow: hidden;

        }


        .satori-slim-banner span {

            display: block;

            margin-bottom: 4px;

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 3px;

        }


        .satori-slim-banner strong {

            display: block;

            font-size:
                clamp(
                    24px,
                    3vw,
                    42px
                );

            line-height: 1;

        }


        .satori-slim-banner p {

            margin:
                10px 0 0;

            color: #bbb;

            font-size: 13px;

        }


        .satori-slim-banner a {

            flex-shrink: 0;

            padding:
                12px 18px;

            background:
                var(--satori-red);

            color: #fff;

            text-decoration: none;

            font-size: 10px;

            font-weight: 900;

        }


        /* =================================================
           RECOMENDACIONES
        ================================================= */

        .satori-related {

            padding:
                0 0 80px;

        }


        .satori-related-heading {

            margin-bottom:
                25px;

        }


        .satori-related-heading > span {

            display: block;

            margin-bottom: 7px;

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 2px;

        }


        .satori-related-heading h2 {

            margin: 0;

            font-size:
                clamp(
                    25px,
                    3vw,
                    38px
                );

            line-height: 1;

            letter-spacing:
                -1.5px;

            font-weight: 900;

        }


        .satori-related-heading h2 em {

            color:
                var(--satori-red);

            font-style: normal;

        }


        .satori-related-heading p {

            margin:
                8px 0 0;

            color: #777;

            font-size: 12px;

        }


        .satori-related-grid {

            display:
                grid;

            grid-template-columns:
                repeat(4, 1fr);

            gap: 18px;

            /*
             * Los productos son deliberadamente
             * más pequeños que antes.
             */

            max-width:
                1120px;

        }


        .satori-related-card {

            display: block;

            color: inherit;

            text-decoration: none;

        }


        .satori-related-image {

            position: relative;

            width: 100%;

            aspect-ratio: 1 / 1;

            overflow: hidden;

            background:
                #f7f7f7;

            border-radius: 8px;

        }


        .satori-related-image img {

            width: 100%;

            height: 100%;

            display: block;

            object-fit: contain;

            transition:
                transform .3s ease;

        }


        .satori-related-card:hover
        .satori-related-image img {

            transform:
                scale(1.035);

        }


        .satori-related-overlay {

            position: absolute;

            left: 10px;

            bottom: 10px;

            padding:
                7px 9px;

            background:
                #111827;

            color: #fff;

            font-size: 8px;

            font-weight: 900;

            opacity: 0;

            transform:
                translateY(5px);

            transition:
                .2s ease;

        }


        .satori-related-card:hover
        .satori-related-overlay {

            opacity: 1;

            transform:
                translateY(0);

        }


        .satori-related-info {

            padding-top: 10px;

        }


        .satori-related-info > span {

            display: block;

            color:
                var(--satori-red);

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1px;

        }


        .satori-related-info h3 {

            margin:
                3px 0 0;

            font-size: 12px;

            line-height: 1.35;

        }


        .satori-related-info strong {

            display: block;

            margin-top: 4px;

            font-size: 12px;

        }


        /* =================================================
           EDITORIAL
        ================================================= */

        .satori-editorial {

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

            min-height:
                390px;

            margin:
                20px 0 75px;

            overflow: hidden;

            background:
                linear-gradient(
                    110deg,
                    #0b0b0b,
                    #1b0305
                );

            color: #fff;

            border-radius: 10px;

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


        .satori-editorial-label {

            margin-bottom: 12px;

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 3px;

        }


        .satori-editorial h2 {

            margin: 0;

            font-size:
                clamp(
                    34px,
                    4vw,
                    58px
                );

            line-height: .92;

            letter-spacing:
                -2px;

            font-weight: 900;

        }


        .satori-editorial h2 span {

            color:
                var(--satori-red);

        }


        .satori-editorial p {

            max-width: 500px;

            margin:
                18px 0 22px;

            color: #aaa;

            font-size: 13px;

            line-height: 1.65;

        }


        .satori-editorial-button {

            align-self: flex-start;

            padding:
                12px 18px;

            background:
                var(--satori-red);

            color: #fff;

            text-decoration: none;

            font-size: 10px;

            font-weight: 900;

        }


        .satori-editorial-image {

            min-height: 390px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            overflow: hidden;

            background:
                radial-gradient(
                    circle at center,
                    #35080b,
                    #130203
                );

        }


        .satori-editorial-image img {

            width: 100%;

            height: 100%;

            object-fit: contain;

            display: block;

        }


        /* =================================================
           HISTORIA
        ================================================= */

        .satori-story {

            padding:
                55px 0 65px;

            border-top:
                1px solid #ddd;

        }


        .satori-story-heading {

            max-width:
                760px;

            margin-bottom:
                38px;

        }


        .satori-story-heading span {

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 3px;

        }


        .satori-story-heading h2 {

            margin:
                7px 0 10px;

            font-size:
                clamp(
                    30px,
                    4vw,
                    48px
                );

            line-height: .95;

            letter-spacing:
                -2px;

        }


        .satori-story-heading h2 em {

            color:
                var(--satori-red);

            font-style: normal;

        }


        .satori-story-heading p {

            margin: 0;

            color: #666;

            font-size: 14px;

        }


        .satori-story-grid {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 20px;

        }


        .satori-story-grid article {

            padding:
                24px 0;

            border-top:
                2px solid #111;

        }


        .satori-story-grid article > span {

            color:
                var(--satori-red);

            font-size: 11px;

            font-weight: 900;

        }


        .satori-story-grid h3 {

            margin:
                10px 0 7px;

            font-size: 13px;

            letter-spacing: 1px;

        }


        .satori-story-grid p {

            margin: 0;

            color: #666;

            font-size: 13px;

            line-height: 1.65;

        }


        /* =================================================
           CUIDADO
        ================================================= */

        .satori-care-guide {

            display:
                grid;

            grid-template-columns:
                auto 1fr auto;

            align-items:
                center;

            gap: 25px;

            margin:
                15px 0 70px;

            padding:
                28px 32px;

            border:
                1px solid #ddd;

            border-radius: 9px;

        }


        .satori-care-icon {

            width: 48px;

            height: 48px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius: 50%;

            background:
                #f5f5f5;

            font-size: 20px;

        }


        .satori-care-content span {

            display: block;

            color:
                var(--satori-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 2px;

        }


        .satori-care-content h2 {

            margin:
                3px 0 3px;

            font-size: 25px;

            line-height: 1;

        }


        .satori-care-content h2 strong {

            color:
                var(--satori-red);

        }


        .satori-care-content p {

            margin: 0;

            color: #666;

            font-size: 12px;

        }


        .satori-care-button {

            padding:
                12px 17px;

            border:
                1px solid #111;

            color: #111;

            text-decoration: none;

            font-size: 9px;

            font-weight: 900;

            white-space: nowrap;

        }


        .satori-care-button:hover {

            background: #111;

            color: #fff;

        }


        /* =================================================
           BANNER FINAL
        ================================================= */

        .satori-final-banner {

            position: relative;

            overflow: hidden;

            margin:
                0 0 70px;

            padding:
                55px;

            background:
                linear-gradient(
                    110deg,
                    #0b0b0b,
                    #250407
                );

            color: #fff;

            border-radius: 10px;

        }


        .satori-final-banner::after {

            content:
                "SATORII";

            position:
                absolute;

            right:
                -30px;

            bottom:
                -55px;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .035
                );

            font-size:
                140px;

            font-weight:
                900;

            transform:
                rotate(-6deg);

        }


        .satori-final-banner > div {

            position: relative;

            z-index: 2;

        }


        .satori-final-banner span {

            display: block;

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 3px;

        }


        .satori-final-banner h2 {

            margin:
                8px 0 0;

            font-size:
                clamp(
                    34px,
                    4vw,
                    58px
                );

            line-height: .95;

        }


        .satori-final-banner h2 strong {

            color:
                var(--satori-red);

        }


        .satori-final-banner p {

            max-width:
                500px;

            margin:
                14px 0 22px;

            color: #aaa;

            font-size: 13px;

        }


        .satori-final-banner a {

            display:
                inline-flex;

            padding:
                12px 18px;

            background:
                var(--satori-red);

            color: #fff;

            text-decoration: none;

            font-size: 10px;

            font-weight: 900;

        }


        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1100px) {

            .satori-product-layout {

                grid-template-columns:
                    1fr 1fr;

                gap: 35px;

            }

            .satori-related-grid {

                grid-template-columns:
                    repeat(3, 1fr);

            }

        }


        @media (max-width: 850px) {

            .satori-product-page {

                width:
                    calc(100% - 30px);

            }


            .satori-product-layout {

                grid-template-columns:
                    1fr;

            }


            .satori-product-gallery {

                max-width: none;

            }


            .satori-product-info {

                max-width: none;

            }


            .satori-editorial {

                grid-template-columns:
                    1fr;

            }


            .satori-editorial-image {

                min-height: 330px;

            }


            .satori-story-grid {

                grid-template-columns:
                    1fr;

            }

        }


        @media (max-width: 650px) {

            .satori-product-page {

                width:
                    calc(100% - 20px);

            }


            .satori-product-layout {

                padding:
                    35px 0 50px;

            }


            .satori-product-info h1 {

                font-size: 36px;

            }


            .satori-trust-grid {

                grid-template-columns:
                    1fr;

            }


            .satori-trust-item + .satori-trust-item {

                border-left: 0;

                border-top:
                    1px solid #e5e5e5;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(2, 1fr);

                gap: 14px;

            }


            .satori-slim-banner {

                flex-direction:
                    column;

                align-items:
                    flex-start;

                padding:
                    28px;

            }


            .satori-editorial-content {

                padding:
                    38px 28px;

            }


            .satori-editorial h2 {

                font-size: 38px;

            }


            .satori-care-guide {

                grid-template-columns:
                    1fr;

            }


            .satori-care-button {

                justify-self:
                    start;

            }


            .satori-final-banner {

                padding:
                    40px 28px;

            }

        }

    `;

}


/* =====================================================
   JAVASCRIPT DEL PRODUCTO
===================================================== */

function generateProductJS() {

    return `

        <script>

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                /* =========================================
                   GALERÍA
                ========================================== */

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
                   COLOR
                ========================================== */

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
                   TALLA
                ========================================== */

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
                ========================================== */

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


                /* =========================================
                   BOTÓN CARRITO
                   
                   IMPORTANTE:
                   cart.js es quien guarda realmente
                   el producto en satorimode_cart.
                ========================================== */

                const addButton =
                    document.getElementById(
                        "addToCart"
                    );


                if (addButton) {

                    addButton.addEventListener(
                        "click",
                        function () {

                            setTimeout(
                                function () {

                                    addButton.classList.add(
                                        "added"
                                    );

                                    addButton.textContent =
                                        "✓ AGREGADO AL CARRITO";

                                },
                                100
                            );

                        }
                    );

                }


                /* =========================================
                   PESTAÑAS
                ========================================== */

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

    const gallery =
        generateGallery(
            product,
            outputDirectory
        );

    const colors =
        generateColors(product);

    const sizes =
        generateSizes(product);

    const trust =
        generateTrustBlocks(product);

    const details =
        generateDetails(product);

    const recommendations =
        generateRecommendations(
            product,
            allProducts,
            outputDirectory
        );

    const slimBanner =
        generateSlimBanner(product);

    const editorial =
        generateEditorialBanner(
            product,
            mainImage
        );

    const story =
        generateBrandDetails(product);

    const careGuide =
        generateCareGuide();

    const finalBanner =
        generateFinalBanner();

    const javascript =
        generateProductJS();


    return `

<!DOCTYPE html>

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


    <!-- ===============================================
         HEADER
    ================================================ -->

    <div
        id="satori-header"
    ></div>


    <!-- ===============================================
         CONTENIDO
    ================================================ -->

    <main>

        <div class="satori-product-page">


            <!-- =========================================
                 PRODUCTO
            ========================================== -->

            <section
                class="satori-product-layout"
            >


                <!-- GALERÍA -->

                <div
                    class="satori-product-gallery"
                >

                    ${gallery}

                </div>


                <!-- INFORMACIÓN -->

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


                    ${colors}


                    ${sizes}


                    <!-- CANTIDAD -->

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


                    <!-- CARRITO -->

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


                    <!-- CONFIANZA -->

                    ${trust}


                    <!-- DESCRIPCIÓN -->

                    ${details}

                </div>

            </section>


            <!-- =========================================
                 BANNER
            ========================================== -->

            ${slimBanner}


            <!-- =========================================
                 RECOMENDACIONES
            ========================================== -->

            ${recommendations}


            <!-- =========================================
                 EDITORIAL
            ========================================== -->

            ${editorial}


            <!-- =========================================
                 HISTORIA
            ========================================== -->

            ${story}


            <!-- =========================================
                 CUIDADO
            ========================================== -->

            ${careGuide}


            <!-- =========================================
                 FINAL
            ========================================== -->

            ${finalBanner}


        </div>

    </main>


    <!-- ===============================================
         FOOTER
    ================================================ -->

    <div
        id="satori-footer"
    ></div>


    <!-- ===============================================
         JAVASCRIPT GLOBAL
    ================================================ -->

    <script src="../../js/products.js"></script>

    <script src="../../js/main.js"></script>

    <script src="../../js/header.js"></script>

    <script src="../../js/footer.js"></script>

    <!-- IMPORTANTE:
         cart.js controla el carrito -->
    <script src="../../js/cart.js"></script>


    <!-- JAVASCRIPT PRODUCTO -->

    ${javascript}


</body>

</html>

`;

}


/* =====================================================
   GENERAR TODOS
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
catch (error) {

    console.error(
        "========================================"
    );

    console.error(
        "SATORII · ERROR"
    );

    console.error(error);

    console.error(
        "========================================"
    );

    process.exit(1);

}
