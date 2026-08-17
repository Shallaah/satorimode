/*
=========================================================
SATORII
GENERADOR AUTOMÁTICO DE PÁGINAS DE PRODUCTO
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

    const value =
        String(category || "otros")
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


function getColorClass(color) {

    const value =
        String(color || "")
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
                            loading="${index === 0 ? "eager" : "lazy"}"
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

                ${product.colors
                    .map(
                        (color, index) => `

                            <button
                                type="button"
                                class="
                                    satori-color-button
                                    ${index === 0 ? "active" : ""}
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
                                    ${index === 0 ? "active" : ""}
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
        "Compra protegida frente a fallas de fabricación.";

    const care =
        details.care ||
        "Lavar con agua fría. No planchar directamente sobre el estampado.";

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
                        Cuidados:
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
   SHUFFLE
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


/* =====================================================
   RECOMENDACIONES
===================================================== */

function generateRecommendations(
    currentProduct,
    allProducts,
    outputDirectory
) {

    const currentId =
        String(currentProduct.id);

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

    const sameCategory =
        available.filter(
            product =>
                normalizeCategory(
                    product.category
                ) === currentCategory
        );

    const otherCategory =
        available.filter(
            product =>
                normalizeCategory(
                    product.category
                ) !== currentCategory
        );

    const related =
        shuffle(sameCategory)
            .concat(
                shuffle(otherCategory)
            )
            .slice(0, 5);

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
                                ${escapeHTML(
                                    String(
                                        item.collection ||
                                        item.category ||
                                        "SATORII"
                                    ).toUpperCase()
                                )}
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


/* =====================================================
   BANNER CUIDA TU SATORII
===================================================== */

function generateStyleBanner(
    product,
    outputDirectory
) {

    /*
       IMPORTANTE:

       Por defecto NO mostramos ninguna imagen.

       Si en products.js agregas:

       careImage: "img/..."

       el banner automáticamente mostrará
       esa imagen.

       Así podemos agregar imágenes después
       sin volver a modificar el generador.
    */

    const careImage =
        product.careImage || "";

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
                ${image ? "has-image" : "no-image"}
            "
        >

            <div class="satori-style-content">

                <span>
                    SATORII · CUIDADO
                </span>


                <h2>
                    CUIDA TU
                    <em>SATORII.</em>
                </h2>


                <p>
                    Una buena prenda merece durar.
                    Aprende a cuidar el estampado, el tejido
                    y la apariencia de tu SATORII.
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


/* =====================================================
   BANNER EDITORIAL
===================================================== */

function generateEditorialBanner(
    product,
    mainImage
) {

    return `

        <section class="satori-editorial">

            <div class="satori-editorial-content">

                <span>
                    SATORII · ${escapeHTML(
                        String(
                            product.collection ||
                            product.category ||
                            "ANIME"
                        ).toUpperCase()
                    )}
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


                <a href="#satorii-pack">
                    DESCUBRIR SATORII →
                </a>

            </div>


            <div class="satori-editorial-image">

                ${
                    mainImage
                        ? `
                            <img
                                src="${escapeHTML(mainImage)}"
                                alt="${escapeHTML(product.name)}"
                            >
                        `
                        : ""
                }

            </div>

        </section>

    `;
}


/* =====================================================
   SATORII PACK
===================================================== */

function generateSatoriPack(product) {

    return `

        <section
            class="satori-pack"
            id="satorii-pack"
        >

            <div class="satori-section-heading">

                <span>
                    SATORII · TU EXPERIENCIA
                </span>


                <h2>
                    MÁS QUE UNA
                    <em>PRENDA.</em>
                </h2>


                <p>
                    Queremos que comprar en SATORII sea
                    más que elegir una polera. Es llevar
                    contigo algo que representa tu universo.
                </p>

            </div>


            <div class="satori-pack-grid">

                <article class="satori-pack-card">

                    <div class="satori-pack-number">
                        01
                    </div>

                    <div class="satori-pack-icon">
                        ◇
                    </div>

                    <h3>
                        TU PRENDA
                    </h3>

                    <p>
                        El diseño que elegiste,
                        preparado para formar parte
                        de tu estilo.
                    </p>

                </article>


                <article class="satori-pack-card">

                    <div class="satori-pack-number">
                        02
                    </div>

                    <div class="satori-pack-icon">
                        □
                    </div>

                    <h3>
                        EXPERIENCIA SATORII
                    </h3>

                    <p>
                        Una identidad visual pensada
                        para que cada detalle se sienta
                        parte de la misma marca.
                    </p>

                </article>


                <article class="satori-pack-card">

                    <div class="satori-pack-number">
                        03
                    </div>

                    <div class="satori-pack-icon">
                        +
                    </div>

                    <h3>
                        CUIDADO
                    </h3>

                    <p>
                        Te entregamos recomendaciones
                        para conservar tu prenda y su
                        diseño durante más tiempo.
                    </p>

                </article>


                <article class="satori-pack-card">

                    <div class="satori-pack-number">
                        04
                    </div>

                    <div class="satori-pack-icon">
                        ∞
                    </div>

                    <h3>
                        TU UNIVERSO
                    </h3>

                    <p>
                        Porque SATORII no busca vestir
                        a todos igual. Busca que encuentres
                        aquello que te representa.
                    </p>

                </article>

            </div>

        </section>

    `;
}


/* =====================================================
   BANNER FINAL
===================================================== */

function generateFinalBanner() {

    return `

        <section class="satori-final-banner">

            <span>
                SATORII · TU UNIVERSO
            </span>


            <h2>
                ENCUENTRA TU
                <em>UNIVERSO.</em>
            </h2>


            <p>
                Explora más diseños y encuentra la próxima
                pieza que te represente.
            </p>


            <a href="../../productos.html">
                VER TODA LA COLECCIÓN →
            </a>

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
            --satori-border: #e5e5e5;
            --satori-muted: #666;

        }


        * {
            box-sizing: border-box;
        }


        html {
            scroll-behavior: smooth;
        }


        body {

            margin: 0;

            background: #fff;

            color: var(--satori-black);

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 16px;

            line-height: 1.65;

        }


        button,
        input,
        a {
            font-family: inherit;
        }


        a {
            color: inherit;
        }


        .satori-product-page {

            width:
                min(
                    1500px,
                    calc(100% - 48px)
                );

            margin: 0 auto;

        }


        /* =================================================
           PRODUCTO
        ================================================= */

        .satori-product-layout {

            display: grid;

            grid-template-columns:
                minmax(0, 1.02fr)
                minmax(470px, .98fr);

            gap:
                clamp(
                    42px,
                    5vw,
                    75px
                );

            padding:
                58px 0 55px;

            align-items: start;

        }


        .satori-product-gallery {

            width: 100%;

            max-width: 620px;

        }


        .satori-main-image {

            width: 100%;

            aspect-ratio: 1 / 1;

            display: flex;

            align-items: center;

            justify-content: center;

            overflow: hidden;

            background: #f7f7f7;

            border-radius: 10px;

        }


        .satori-main-image img {

            width: 100%;

            height: 100%;

            object-fit: contain;

            display: block;

            transition:
                transform .35s ease;

        }


        .satori-main-image:hover img {

            transform:
                scale(1.018);

        }


        .satori-thumbnails {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 10px;

            margin-top: 10px;

        }


        .satori-thumbnail {

            width: 100%;

            aspect-ratio: 1 / 1;

            padding: 0;

            overflow: hidden;

            background: #f7f7f7;

            border: 1px solid #ddd;

            border-radius: 7px;

            cursor: pointer;

            transition: .2s ease;

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

            font-size: 12px;

            font-weight: 900;

            letter-spacing: 2px;

            color: #777;

        }


        .satori-product-info h1 {

            margin: 0;

            font-size:
                clamp(
                    42px,
                    4.5vw,
                    68px
                );

            line-height: .98;

            letter-spacing: -2.5px;

            font-weight: 900;

        }


        .satori-product-price {

            margin-top: 18px;

            font-size: 28px;

            font-weight: 900;

        }


        .satori-product-divider {

            width: 100%;

            height: 1px;

            margin: 25px 0;

            background: #e5e5e5;

        }


        /* =================================================
           OPCIONES
        ================================================= */

        .satori-option {

            margin-top: 23px;

        }


        .satori-option-header {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-bottom: 10px;

        }


        .satori-option-header span {

            font-size: 12px;

            font-weight: 900;

            letter-spacing: 1.5px;

        }


        .satori-option-header a {

            color: #111;

            font-size: 11px;

            font-weight: 800;

            text-decoration: underline;

        }


        .satori-size-options,
        .satori-color-options {

            display: flex;

            flex-wrap: wrap;

            gap: 8px;

        }


        .satori-size-button {

            min-width: 48px;

            min-height: 43px;

            padding: 0 14px;

            border: 1px solid #ddd;

            border-radius: 7px;

            background: #fff;

            color: #111827;

            font-size: 13px;

            font-weight: 800;

            cursor: pointer;

        }


        .satori-size-button.active {

            background: #111827;

            border-color: #111827;

            color: #fff;

        }


        .satori-color-button {

            min-height: 43px;

            display: inline-flex;

            align-items: center;

            gap: 8px;

            padding: 0 15px;

            border: 1px solid #ddd;

            border-radius: 22px;

            background: #fff;

            color: #111827;

            font-size: 13px;

            font-weight: 700;

            cursor: pointer;

        }


        .satori-color-button.active {

            background: #111827;

            border-color: #111827;

            color: #fff;

        }


        .satori-color-dot {

            width: 14px;

            height: 14px;

            display: block;

            border-radius: 50%;

            border: 1px solid #aaa;

        }


        .satori-color-black {
            background: #111;
        }


        .satori-color-white {
            background: #fff;
        }


        .satori-color-red {
            background: var(--satori-red);
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

            margin-top: 28px;

        }


        .satori-quantity-label {

            font-size: 12px;

            font-weight: 900;

            letter-spacing: 1.5px;

        }


        .satori-quantity {

            display: flex;

            align-items: center;

            border: 1px solid #ddd;

            border-radius: 7px;

            overflow: hidden;

        }


        .satori-quantity button {

            width: 42px;

            height: 42px;

            border: 0;

            background: #fff;

            cursor: pointer;

            font-size: 17px;

        }


        .satori-quantity span {

            min-width: 38px;

            text-align: center;

            font-size: 13px;

            font-weight: 700;

        }


        /* =================================================
           CARRITO
        ================================================= */

        .satori-add-to-cart {

            width: 100%;

            min-height: 54px;

            margin-top: 22px;

            border: 0;

            border-radius: 6px;

            background: #111827;

            color: #fff;

            font-size: 12px;

            font-weight: 900;

            letter-spacing: .7px;

            cursor: pointer;

            transition:
                background .2s ease,
                transform .2s ease;

        }


        .satori-add-to-cart:hover {

            background: #000;

            transform:
                translateY(-1px);

        }


        .satori-add-to-cart.added {

            background:
                var(--satori-red) !important;

            color: #fff;

        }


        /* =================================================
           CONFIANZA
        ================================================= */

        .satori-trust-grid {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            margin-top: 8px;

            border: 1px solid #e2e2e2;

            border-radius: 7px;

            overflow: hidden;

        }


        .satori-trust-item {

            min-height: 74px;

            display: flex;

            align-items: center;

            gap: 9px;

            padding: 12px;

        }


        .satori-trust-item +
        .satori-trust-item {

            border-left:
                1px solid #e5e5e5;

        }


        .satori-trust-icon {

            width: 24px;

            height: 24px;

            display: flex;

            align-items: center;

            justify-content: center;

            border: 1px solid #ddd;

            border-radius: 50%;

            font-size: 11px;

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

            margin-top: 10px;

            border: 1px solid #ddd;

            border-radius: 7px;

            overflow: hidden;

        }


        .satori-tabs {

            display: grid;

            grid-template-columns:
                1fr 1fr;

            border-bottom:
                1px solid #ddd;

        }


        .satori-tab {

            min-height: 48px;

            border: 0;

            background: #fff;

            font-size: 11px;

            font-weight: 900;

            cursor: pointer;

        }


        .satori-tab.active {

            background: #fafafa;

        }


        .satori-panel {

            display: none;

            padding: 23px;

        }


        .satori-panel.active {

            display: block;

        }


        .satori-panel h3 {

            margin:
                0 0 10px;

            font-size: 16px;

        }


        .satori-panel p {

            margin: 0;

            color: #666;

            font-size: 14px;

            line-height: 1.75;

        }


        .satori-product-care {

            margin-top: 17px !important;

        }


        .satori-detail-item +
        .satori-detail-item {

            margin-top: 20px;

        }


        .satori-detail-item strong {

            font-size: 12px;

            font-weight: 900;

        }


        .satori-detail-item p {

            margin-top: 6px;

        }


        /* =================================================
           CUIDA TU SATORII
        ================================================= */

        .satori-style-banner {

            width: 100%;

            min-height: 185px;

            display: flex;

            align-items: center;

            margin:
                5px 0 65px;

            overflow: hidden;

            border-radius: 7px;

            background:
                linear-gradient(
                    100deg,
                    #090909,
                    #230407
                );

            color: #fff;

        }


        .satori-style-banner.no-image
        .satori-style-content {

            max-width: 900px;

        }


        .satori-style-content {

            padding:
                36px 45px;

            display: flex;

            flex-direction: column;

            justify-content: center;

            position: relative;

            z-index: 2;

        }


        .satori-style-content span {

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 2.5px;

        }


        .satori-style-content h2 {

            margin:
                4px 0;

            font-size:
                clamp(
                    30px,
                    3.5vw,
                    48px
                );

            line-height: .9;

            letter-spacing: -2px;

            font-weight: 900;

        }


        .satori-style-content h2 em {

            color:
                var(--satori-red);

            font-style: normal;

        }


        .satori-style-content p {

            max-width: 600px;

            margin:
                10px 0 15px;

            color: #d0d0d0;

            font-size: 13px;

            line-height: 1.55;

        }


        .satori-style-content a {

            width: max-content;

            padding:
                9px 13px;

            background:
                var(--satori-red);

            color: #fff;

            text-decoration: none;

            font-size: 9px;

            font-weight: 900;

        }


        .satori-style-image {

            width: 42%;

            min-height: 185px;

            margin-left: auto;

            overflow: hidden;

        }


        .satori-style-image img {

            width: 100%;

            height: 100%;

            object-fit: cover;

            display: block;

        }


        /* =================================================
           RECOMENDACIONES
        ================================================= */

        .satori-related {

            padding:
                0 0 65px;

        }


        .satori-related-heading {

            margin-bottom: 24px;

        }


        .satori-related-heading > span,
        .satori-section-heading > span {

            display: block;

            margin-bottom: 5px;

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 2.2px;

        }


        .satori-related-heading h2 {

            margin: 0;

            font-size:
                clamp(
                    30px,
                    3.8vw,
                    46px
                );

            line-height: .95;

            letter-spacing: -2px;

            font-weight: 900;

        }


        .satori-related-heading h2 em {

            color:
                var(--satori-red);

            font-style: normal;

        }


        .satori-related-heading p {

            margin:
                9px 0 0;

            color: #777;

            font-size: 14px;

        }


        .satori-related-grid {

            display: grid;

            grid-template-columns:
                repeat(5, 1fr);

            gap: 16px;

        }


        .satori-related-card {

            text-decoration: none;

            color: #111;

        }


        .satori-related-image {

            width: 100%;

            aspect-ratio: 1 / 1;

            overflow: hidden;

            background: #f6f6f6;

            border-radius: 6px;

            position: relative;

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
                scale(1.04);

        }


        .satori-related-info {

            padding-top: 9px;

        }


        .satori-related-info span {

            color: #888;

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1.2px;

        }


        .satori-related-info h3 {

            margin:
                3px 0;

            font-size: 12px;

            line-height: 1.25;

            font-weight: 800;

        }


        .satori-related-info strong {

            font-size: 12px;

        }


        /* =================================================
           EDITORIAL
        ================================================= */

        .satori-editorial {

            display: grid;

            grid-template-columns:
                1fr 1fr;

            min-height: 470px;

            margin:
                0 0 70px;

            overflow: hidden;

            border-radius: 7px;

            background: #090909;

            color: #fff;

        }


        .satori-editorial-content {

            display: flex;

            flex-direction: column;

            justify-content: center;

            padding: 55px;

        }


        .satori-editorial-content span {

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 2.5px;

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

            line-height: .88;

            letter-spacing: -3px;

            font-weight: 900;

        }


        .satori-editorial h2 em {

            color:
                var(--satori-red);

            font-style: normal;

        }


        .satori-editorial h2 strong {

            color: #fff;

        }


        .satori-editorial-content p {

            max-width: 470px;

            margin:
                10px 0 20px;

            color: #c9c9c9;

            font-size: 14px;

        }


        .satori-editorial-content a {

            width: max-content;

            padding:
                10px 14px;

            background:
                var(--satori-red);

            color: #fff;

            text-decoration: none;

            font-size: 9px;

            font-weight: 900;

        }


        .satori-editorial-image {

            position: relative;

            min-height: 470px;

            overflow: hidden;

            background:
                radial-gradient(
                    circle,
                    #35090c,
                    #090909 70%
                );

        }


        .satori-editorial-image img {

            width: 100%;

            height: 100%;

            display: block;

            object-fit: contain;

            transform:
                scale(1.08);

        }


        /* =================================================
           SATORII PACK
        ================================================= */

        .satori-pack {

            padding:
                0 0 70px;

        }


        .satori-section-heading {

            border-top:
                1px solid #e5e5e5;

            padding-top:
                55px;

            margin-bottom:
                32px;

        }


        .satori-section-heading h2 {

            max-width: 850px;

            margin: 0;

            font-size:
                clamp(
                    34px,
                    4.5vw,
                    58px
                );

            line-height: .9;

            letter-spacing: -2.5px;

            font-weight: 900;

        }


        .satori-section-heading h2 em {

            color:
                var(--satori-red);

            font-style: normal;

        }


        .satori-section-heading p {

            max-width: 700px;

            margin:
                12px 0 0;

            color: #777;

            font-size: 14px;

        }


        .satori-pack-grid {

            display: grid;

            grid-template-columns:
                repeat(4, 1fr);

            border-top:
                1px solid #aaa;

            border-bottom:
                1px solid #ddd;

        }


        .satori-pack-card {

            position: relative;

            min-height: 230px;

            padding:
                25px 25px 25px 0;

        }


        .satori-pack-card +
        .satori-pack-card {

            border-left:
                1px solid #ddd;

            padding-left:
                25px;

        }


        .satori-pack-number {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                1px;

        }


        .satori-pack-icon {

            width:
                45px;

            height:
                45px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            margin:
                22px 0 18px;

            border:
                1px solid #ddd;

            border-radius:
                50%;

            font-size:
                18px;

        }


        .satori-pack-card h3 {

            margin:
                0 0 8px;

            font-size:
                14px;

            font-weight:
                900;

        }


        .satori-pack-card p {

            max-width:
                240px;

            margin:
                0;

            color:
                #777;

            font-size:
                13px;

            line-height:
                1.6;

        }


        /* =================================================
           BANNER FINAL
        ================================================= */

        .satori-final-banner {

            min-height:
                190px;

            margin:
                0 0 75px;

            padding:
                38px 42px;

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            overflow:
                hidden;

            border-radius:
                7px;

            background:
                linear-gradient(
                    100deg,
                    #090909,
                    #260306
                );

            color:
                #fff;

        }


        .satori-final-banner span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2px;

        }


        .satori-final-banner h2 {

            margin:
                4px 0;

            font-size:
                clamp(
                    34px,
                    4vw,
                    55px
                );

            line-height:
                .9;

            font-weight:
                900;

        }


        .satori-final-banner h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-final-banner p {

            margin:
                7px 0 15px;

            color:
                #c9c9c9;

            font-size:
                13px;

        }


        .satori-final-banner a {

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


        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1100px) {

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


            .satori-related-grid {

                grid-template-columns:
                    repeat(4, 1fr);

            }


            .satori-pack-grid {

                grid-template-columns:
                    repeat(2, 1fr);

            }


            .satori-pack-card:nth-child(3) {

                border-left: 0;

            }

        }


        @media (max-width: 850px) {

            .satori-related-grid {

                grid-template-columns:
                    repeat(2, 1fr);

            }


            .satori-editorial {

                grid-template-columns:
                    1fr;

            }


            .satori-editorial-image {

                min-height:
                    350px;

            }


            .satori-style-banner {

                display:
                    block;

            }


            .satori-style-image {

                width: 100%;

                min-height:
                    230px;

            }

        }


        @media (max-width: 650px) {

            .satori-product-page {

                width:
                    calc(100% - 22px);

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


            .satori-trust-item +
            .satori-trust-item {

                border-left:
                    0;

                border-top:
                    1px solid #e5e5e5;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(2, 1fr);

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


            .satori-pack-grid {

                grid-template-columns:
                    1fr;

            }


            .satori-pack-card {

                min-height:
                    auto;

                padding:
                    25px 0;

            }


            .satori-pack-card +
            .satori-pack-card {

                border-left:
                    0;

                border-top:
                    1px solid #ddd;

                padding-left:
                    0;

            }


            .satori-style-content {

                padding:
                    30px 25px;

            }


            .satori-final-banner {

                padding:
                    35px 25px;

            }

        }

    `;

}


/* =====================================================
   JAVASCRIPT
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
                   COLORES
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
                   TALLAS
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
                   CARRITO
                ========================================== */

                const addButton =
                    document.getElementById(
                        "addToCart"
                    );


                if (addButton) {

                    const originalText =
                        addButton.textContent.trim();

                    let resetTimer = null;


                    function showAddedState() {

                        addButton.classList.add(
                            "added"
                        );


                        addButton.textContent =
                            "✓ AGREGADO AL CARRITO";


                        if (resetTimer) {

                            clearTimeout(
                                resetTimer
                            );

                        }


                        resetTimer =
                            setTimeout(
                                function () {

                                    addButton.classList.remove(
                                        "added"
                                    );


                                    addButton.textContent =
                                        originalText;

                                },
                                1800
                            );

                    }


                    addButton.addEventListener(
                        "click",
                        function () {

                            showAddedState();

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

            }
        );

        </script>

    `;

}


/* =====================================================
   HTML
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


    <div id="satori-header"></div>


    <main>

        <div class="satori-product-page">


            <!-- PRODUCTO -->

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


                    ${generateDetails(product)}

                </div>

            </section>


            <!-- CUIDA TU SATORII -->

            ${generateStyleBanner(
                product,
                outputDirectory
            )}


            <!-- RECOMENDACIONES -->

            ${generateRecommendations(
                product,
                allProducts,
                outputDirectory
            )}


            <!-- UNIVERSO -->

            ${generateEditorialBanner(
                product,
                mainImage
            )}


            <!-- SATORII PACK -->

            ${generateSatoriPack(product)}


            <!-- FINAL -->

            ${generateFinalBanner()}


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


/* =====================================================
   GENERAR
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

}/*
=========================================================
SATORII
GENERADOR AUTOMÁTICO DE PÁGINAS DE PRODUCTO
=========================================================

Genera:

productos/anime/*.html
productos/streetwear/*.html
productos/accesorios/*.html
productos/otros/*.html

CARACTERÍSTICAS:

- Máximo 3 imágenes
- Galería cuadrada
- Diseño responsive
- Color / talla / cantidad
- Carrito integrado con cart.js
- Botón de carrito con estado temporal
- Banner de cuidado automático
- Recomendaciones
- Historia del diseño
- Guía de cuidado
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
   ESCAPE HTML
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

function formatPrice(value) {

    return "$" +
        Number(value || 0)
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

    const value =
        String(category || "otros")
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


/* =====================================================
   IMÁGENES
===================================================== */

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
        .split(path.sep)
        .join("/");

}


/* =====================================================
   COLOR
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
                            loading="${index === 0 ? "eager" : "lazy"}"
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

                ${product.colors
                    .map(
                        (color, index) => `

                            <button
                                type="button"
                                class="
                                    satori-color-button
                                    ${index === 0 ? "active" : ""}
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
                                    ${index === 0 ? "active" : ""}
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
   BLOQUE DE CONFIANZA
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
        "Compra protegida frente a fallas de fabricación.";

    const care =
        details.care ||
        "Lavar con agua fría. No planchar directamente sobre el estampado.";

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
                        Cuidados:
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
   SHUFFLE
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


/* =====================================================
   RECOMENDACIONES
===================================================== */

function generateRecommendations(
    currentProduct,
    allProducts,
    outputDirectory
) {

    const currentId =
        String(currentProduct.id);

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

    const sameCategory =
        available.filter(
            product =>
                normalizeCategory(
                    product.category
                ) === currentCategory
        );

    const otherCategory =
        available.filter(
            product =>
                normalizeCategory(
                    product.category
                ) !== currentCategory
        );

    /*
       Ahora mostramos hasta 5 productos.
       El CSS los hace más pequeños para que
       se vean como una verdadera fila de tienda.
    */

    const related =
        shuffle(sameCategory)
            .concat(
                shuffle(otherCategory)
            )
            .slice(0, 5);

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
                                ${escapeHTML(
                                    String(
                                        item.collection ||
                                        item.category ||
                                        "SATORII"
                                    ).toUpperCase()
                                )}
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


/* =====================================================
   BANNER DE CUIDADO
===================================================== */

function generateStyleBanner(
    product,
    outputDirectory
) {

    const images =
        getImages(product);

    /*
       Preferimos la segunda imagen.
       En la mayoría de productos corresponde
       al acercamiento del diseño.
    */

    const secondImage =
        images[1] ||
        images[0] ||
        "";

    const image =
        secondImage
            ? getImagePath(
                secondImage,
                outputDirectory
            )
            : "";

    return `

        <section class="satori-style-banner">

            <div class="satori-style-content">

                <span>
                    SATORII · CUIDADO
                </span>


                <h2>
                    CUIDA TU
                    <em>SATORII.</em>
                </h2>


                <p>
                    Una buena prenda merece durar.
                    Aprende a cuidar el estampado, el tejido
                    y la apariencia de tu SATORII.
                </p>


                <a href="../../cuidado.html">
                    VER GUÍA DE CUIDADO →
                </a>

            </div>


            <div class="satori-style-image">

                ${
                    image
                        ? `
                            <img
                                src="${escapeHTML(image)}"
                                alt="Detalle de ${escapeHTML(product.name)}"
                            >
                        `
                        : ""
                }

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

    return `

        <section class="satori-editorial">

            <div class="satori-editorial-content">

                <span>
                    SATORII · ${escapeHTML(
                        String(
                            product.collection ||
                            product.category ||
                            "ANIME"
                        ).toUpperCase()
                    )}
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
                            >
                        `
                        : ""
                }

            </div>

        </section>

    `;

}


/* =====================================================
   HISTORIA
===================================================== */

function generateBrandDetails(product) {

    return `

        <section class="satori-story">

            <div class="satori-section-heading">

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
                        Diseños inspirados en anime,
                        cultura japonesa y streetwear.
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
                        Una composición pensada para que
                        el gráfico sea protagonista.
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
                        Piezas creadas para que puedas
                        expresar aquello que forma parte
                        de tu universo.
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

    /*
       Este bloque queda como acceso independiente
       a la guía completa.
    */

    return `

        <section class="satori-care-guide">

            <div>

                <span>
                    SATORII · CUIDADO
                </span>


                <h2>
                    CUIDA TU
                    <em>SATORII.</em>
                </h2>


                <p>
                    Aprende cómo cuidar tus prendas para
                    conservar el estampado, el tejido y
                    su apariencia durante más tiempo.
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

            <span>
                SATORII · TU UNIVERSO
            </span>


            <h2>
                ENCUENTRA TU
                <em>UNIVERSO.</em>
            </h2>


            <p>
                Explora más diseños y encuentra la próxima
                pieza que te represente.
            </p>


            <a href="../../productos.html">
                VER TODA LA COLECCIÓN →
            </a>

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
            --satori-dark: #090909;
            --satori-border: #e5e5e5;
            --satori-muted: #666;

        }


        * {
            box-sizing: border-box;
        }


        html {
            scroll-behavior: smooth;
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

            /*
               Tipografía base ligeramente mayor
               para evitar que el usuario tenga que
               hacer zoom.
            */

            font-size: 16px;

            line-height: 1.65;

        }


        button,
        input,
        a {
            font-family: inherit;
        }


        a {
            color: inherit;
        }


        .satori-product-page {

            width:
                min(
                    1500px,
                    calc(100% - 48px)
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
                minmax(0, 1.02fr)
                minmax(470px, .98fr);

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


        /* =================================================
           GALERÍA
        ================================================= */

        .satori-product-gallery {

            width: 100%;

            /*
               Evita que la imagen principal se
               coma demasiado espacio vertical.
            */

            max-width:
                620px;

        }


        .satori-main-image {

            width: 100%;

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
                scale(1.018);

        }


        .satori-thumbnails {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

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
                translateY(-2px);

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


        /* =================================================
           INFORMACIÓN
        ================================================= */

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


        /* =================================================
           OPCIONES
        ================================================= */

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
            background:
                #3568c8;
        }


        .satori-color-green {
            background:
                #3b9a5c;
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


        /* =================================================
           CARRITO
        ================================================= */

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

            transition:
                background .2s ease,
                transform .2s ease;

        }


        .satori-add-to-cart:hover {

            background:
                #000;

            transform:
                translateY(-1px);

        }


        /*
           Estado temporal después de agregar.
        */

        .satori-add-to-cart.added {

            background:
                var(--satori-red) !important;

            color:
                #fff;

        }


        /* =================================================
           CONFIANZA
        ================================================= */

        .satori-trust-grid {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

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


        .satori-trust-item +
        .satori-trust-item {

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


        /* =================================================
           DETALLES
        ================================================= */

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


        /*
           Texto más grande y respirable.
        */

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


        .satori-detail-item +
        .satori-detail-item {

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


        /* =================================================
           BANNER CUIDA TU SATORII
        ================================================= */

        .satori-style-banner {

            width:
                100%;

            min-height:
                170px;

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

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


        .satori-style-content {

            padding:
                32px 42px;

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


        .satori-style-content span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2.5px;

        }


        .satori-style-content h2 {

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


        .satori-style-content h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-style-content p {

            max-width:
                540px;

            margin:
                9px 0 13px;

            color:
                #d0d0d0;

            font-size:
                13px;

            line-height:
                1.55;

        }


        .satori-style-content a {

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


        .satori-style-image {

            position:
                relative;

            min-height:
                170px;

            overflow:
                hidden;

        }


        /*
           ZOOM AGRESIVO:
           la segunda imagen queda recortada
           para mostrar principalmente el diseño.
        */

        .satori-style-image img {

            position:
                absolute;

            width:
                150%;

            height:
                150%;

            right:
                -27%;

            top:
                -25%;

            object-fit:
                contain;

            object-position:
                center;

            transform:
                scale(2.15);

            transform-origin:
                center center;

            filter:
                saturate(.95);

        }


        /* =================================================
           RECOMENDACIONES
        ================================================= */

        .satori-related {

            padding:
                0 0 65px;

        }


        .satori-related-heading {

            margin-bottom:
                24px;

        }


        .satori-related-heading > span,
        .satori-section-heading > span {

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


        /*
           5 productos en escritorio.
           Esto hace las tarjetas aproximadamente
           25% más pequeñas que antes.
        */

        .satori-related-grid {

            display:
                grid;

            grid-template-columns:
                repeat(5, 1fr);

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
                scale(1.04);

        }


        .satori-related-overlay {

            position:
                absolute;

            inset:
                auto 0 0 0;

            padding:
                9px;

            background:
                rgba(
                    243,
                    18,
                    24,
                    .95
                );

            color:
                #fff;

            text-align:
                center;

            font-size:
                9px;

            font-weight:
                900;

            transform:
                translateY(100%);

            transition:
                transform .25s ease;

        }


        .satori-related-card:hover
        .satori-related-overlay {

            transform:
                translateY(0);

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


        /* =================================================
           EDITORIAL
        ================================================= */

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
                scale(1.08);

        }


        /* =================================================
           HISTORIA
        ================================================= */

        .satori-story {

            padding:
                0 0 65px;

            border-top:
                1px solid #e5e5e5;

            padding-top:
                55px;

        }


        .satori-section-heading h2 {

            max-width:
                850px;

            margin:
                0;

            font-size:
                clamp(
                    34px,
                    4.5vw,
                    58px
                );

            line-height:
                .9;

            letter-spacing:
                -2.5px;

            font-weight:
                900;

        }


        .satori-section-heading h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-section-heading p {

            max-width:
                650px;

            margin:
                12px 0 30px;

            color:
                #777;

            font-size:
                14px;

        }


        .satori-story-grid {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            border-top:
                1px solid #aaa;

        }


        .satori-story-grid article {

            padding:
                22px 20px 15px 0;

        }


        .satori-story-grid article +
        article {

            border-left:
                1px solid #ddd;

            padding-left:
                20px;

        }


        .satori-story-grid span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

        }


        .satori-story-grid h3 {

            margin:
                8px 0 5px;

            font-size:
                13px;

            font-weight:
                900;

        }


        .satori-story-grid p {

            margin:
                0;

            color:
                #777;

            font-size:
                13px;

            line-height:
                1.6;

        }


        /* =================================================
           CUIDADO
        ================================================= */

        .satori-care-guide {

            display:
                grid;

            grid-template-columns:
                1fr auto;

            align-items:
                center;

            gap:
                30px;

            margin:
                0 0 55px;

            padding:
                24px 28px;

            border:
                1px solid #ddd;

            border-radius:
                7px;

            background:
                #fafafa;

        }


        .satori-care-guide > div > span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2px;

        }


        .satori-care-guide h2 {

            margin:
                3px 0;

            font-size:
                28px;

            line-height:
                1;

            font-weight:
                900;

        }


        .satori-care-guide h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-care-guide p {

            max-width:
                700px;

            margin:
                6px 0 0;

            color:
                #777;

            font-size:
                13px;

        }


        .satori-care-button {

            padding:
                11px 15px;

            border:
                1px solid #111;

            background:
                #fff;

            color:
                #111;

            text-decoration:
                none;

            font-size:
                9px;

            font-weight:
                900;

            white-space:
                nowrap;

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

            min-height:
                190px;

            margin:
                0 0 75px;

            padding:
                38px 42px;

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            overflow:
                hidden;

            border-radius:
                7px;

            background:
                linear-gradient(
                    100deg,
                    #090909,
                    #260306
                );

            color:
                #fff;

        }


        .satori-final-banner span {

            color:
                var(--satori-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                2px;

        }


        .satori-final-banner h2 {

            margin:
                4px 0;

            font-size:
                clamp(
                    34px,
                    4vw,
                    55px
                );

            line-height:
                .9;

            font-weight:
                900;

        }


        .satori-final-banner h2 em {

            color:
                var(--satori-red);

            font-style:
                normal;

        }


        .satori-final-banner p {

            margin:
                7px 0 15px;

            color:
                #c9c9c9;

            font-size:
                13px;

        }


        .satori-final-banner a {

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


        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1100px) {

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
                    repeat(4, 1fr);

            }

        }


        @media (max-width: 850px) {

            .satori-related-grid {

                grid-template-columns:
                    repeat(2, 1fr);

            }


            .satori-style-banner,
            .satori-editorial {

                grid-template-columns:
                    1fr;

            }


            .satori-style-image {

                min-height:
                    230px;

            }


            .satori-editorial-image {

                min-height:
                    350px;

            }


            .satori-story-grid {

                grid-template-columns:
                    1fr;

            }


            .satori-story-grid article +
            article {

                border-left:
                    0;

                border-top:
                    1px solid #ddd;

                padding-left:
                    0;

            }

        }


        @media (max-width: 650px) {

            .satori-product-page {

                width:
                    calc(100% - 22px);

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


            .satori-trust-item +
            .satori-trust-item {

                border-left:
                    0;

                border-top:
                    1px solid #e5e5e5;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(2, 1fr);

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


            .satori-care-guide {

                grid-template-columns:
                    1fr;

            }


            .satori-care-button {

                justify-self:
                    start;

            }


            .satori-style-content {

                padding:
                    30px 25px;

            }


            .satori-final-banner {

                padding:
                    35px 25px;

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
                   CARRITO

                   El botón cambia inmediatamente a rojo
                   cuando el usuario lo pulsa.

                   Después de 1.8 segundos vuelve al
                   estado original.

                   Esto es independiente del evento de
                   cart.js, por lo que el texto no queda
                   permanentemente en "AGREGADO".
                ========================================== */

                const addButton =
                    document.getElementById(
                        "addToCart"
                    );


                if (addButton) {

                    const originalText =
                        addButton.textContent.trim();


                    let cartResetTimer = null;


                    function showAddedState() {

                        addButton.classList.add(
                            "added"
                        );


                        addButton.textContent =
                            "✓ AGREGADO AL CARRITO";


                        if (cartResetTimer) {

                            clearTimeout(
                                cartResetTimer
                            );

                        }


                        cartResetTimer =
                            setTimeout(
                                function () {

                                    addButton.classList.remove(
                                        "added"
                                    );


                                    addButton.textContent =
                                        originalText;

                                },
                                1800
                            );

                    }


                    /*
                       Escuchamos el clic sin impedir
                       que cart.js procese el producto.
                    */

                    addButton.addEventListener(
                        "click",
                        function () {

                            showAddedState();

                        }
                    );


                    /*
                       También escuchamos el evento
                       personalizado si cart.js lo utiliza.
                    */

                    document.addEventListener(
                        "satorii:cart-updated",
                        function () {

                            showAddedState();

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


    const styleBanner =
        generateStyleBanner(
            product,
            outputDirectory
        );


    const editorial =
        generateEditorialBanner(
            product,
            mainImage
        );


    const story =
        generateBrandDetails(
            product
        );


    const careGuide =
        generateCareGuide();


    const finalBanner =
        generateFinalBanner();


    const javascript =
        generateProductJS();


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


    <!-- HEADER -->

    <div
        id="satori-header"
    ></div>


    <main>

        <div
            class="satori-product-page"
        >


            <!-- =========================================
                 PRODUCTO
            ========================================== -->

            <section
                class="satori-product-layout"
                id="producto"
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


                    <!-- DETALLES -->

                    ${details}

                </div>

            </section>


            <!-- =========================================
                 CUIDADO DE LA PRENDA
            ========================================== -->

            ${styleBanner}


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
                 GUÍA DE CUIDADO
            ========================================== -->

            ${careGuide}


            <!-- =========================================
                 FINAL
            ========================================== -->

            ${finalBanner}


        </div>

    </main>


    <!-- FOOTER -->

    <div
        id="satori-footer"
    ></div>


    <!-- SCRIPTS GLOBALES -->

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


    <!-- JAVASCRIPT DEL PRODUCTO -->

    ${javascript}


</body>

</html>`;

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
