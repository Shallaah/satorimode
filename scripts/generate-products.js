/* =========================================================
   SATORII · GENERADOR COMPLETO DE PÁGINAS DE PRODUCTOS
   ---------------------------------------------------------
   ✓ Generación desde js/products.js
   ✓ Precios actualizados desde Supabase al abrir la página
   ✓ Disponibilidad actualizada desde Supabase
   ✓ Recomendaciones dinámicas desde Supabase
   ✓ Fallback a products.js si Supabase no está disponible
   ✓ Galería
   ✓ Tallas
   ✓ Colores
   ✓ Cantidad
   ✓ Carrito
   ✓ Favoritos
   ✓ Tabs
   ✓ Banner
   ✓ Responsive
   ✓ Reduced motion
   ✓ Rutas relativas seguras
   ✓ Compatible con GitHub Actions / Node 20
========================================================= */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const ROOT_DIR = path.resolve(__dirname, "..");

const PRODUCTS_JS = path.join(
    ROOT_DIR,
    "js",
    "products.js"
);

const PRODUCTS_DIR = path.join(
    ROOT_DIR,
    "productos"
);

const SATORII_RED = "#EF0930";
const SATORII_BLACK = "#080808";
const SATORII_DARK = "#101727";
const SATORII_LIGHT = "#F5F5F5";
const SATORII_BORDER = "#DDDDDD";

/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL = String(
    process.env.SATORII_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ""
).trim();

const SUPABASE_PUBLISHABLE_KEY = String(
    process.env.SATORII_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
).trim();

const SUPABASE_ENABLED = Boolean(
    SUPABASE_URL &&
    SUPABASE_PUBLISHABLE_KEY
);

/* =========================================================
   UTILIDADES
========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function safeJSONString(value) {
    return JSON.stringify(value ?? "")
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}

function slugify(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatPrice(value) {
    return (
        "$" +
        (Number(value) || 0).toLocaleString("es-CL") +
        " CLP"
    );
}

function shuffle(array) {
    const copy = array.slice();

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

/* =========================================================
   URL PRODUCTO
========================================================= */

function normalizeProductUrl(product) {
    let url = String(product.url || "")
        .replace(/^\/+/, "")
        .replace(/\\/g, "/");

    if (!url) {
        const category = slugify(
            product.category ||
            product.collection ||
            "anime"
        );

        const productName = slugify(
            product.id ||
            product.name
        );

        url =
            `productos/${category}/${productName}.html`;
    }

    if (!url.toLowerCase().endsWith(".html")) {
        url += ".html";
    }

    return url;
}

function getRootPrefix(productUrl) {
    const normalized = String(productUrl)
        .replace(/\\/g, "/")
        .replace(/^\/+/, "");

    const directory = path.posix.dirname(normalized);

    if (!directory || directory === ".") {
        return "./";
    }

    const depth = directory
        .split("/")
        .filter(Boolean)
        .length;

    return "../".repeat(depth);
}

/* =========================================================
   IMÁGENES
========================================================= */

function resolveLocalAsset(image, productUrl) {
    if (!image) return null;

    const clean = String(image)
        .trim()
        .replace(/^\/+/, "")
        .replace(/\\/g, "/");

    if (!clean) return null;

    if (
        /^(https?:)?\/\//i.test(clean) ||
        clean.startsWith("data:") ||
        clean.startsWith("blob:")
    ) {
        return {
            exists: true,
            remote: true,
            path: clean
        };
    }

    const productDirectory = path.dirname(
        path.join(
            ROOT_DIR,
            String(productUrl)
                .replace(/\\/g, "/")
        )
    );

    const candidates = [
        path.resolve(ROOT_DIR, clean),
        path.resolve(productDirectory, clean)
    ];

    for (const candidate of candidates) {
        try {
            if (
                fs.existsSync(candidate) &&
                fs.statSync(candidate).isFile()
            ) {
                return {
                    exists: true,
                    remote: false,
                    path: candidate
                };
            }
        } catch (_) {}
    }

    return {
        exists: false,
        remote: false,
        path: null
    };
}

function getImagePath(image, productUrl) {
    if (!image) return "";

    const clean = String(image)
        .trim()
        .replace(/^\/+/, "")
        .replace(/\\/g, "/");

    if (!clean) return "";

    if (
        /^(https?:)?\/\//i.test(clean) ||
        clean.startsWith("data:") ||
        clean.startsWith("blob:")
    ) {
        return clean;
    }

    const asset = resolveLocalAsset(
        clean,
        productUrl
    );

    if (asset?.exists && !asset.remote) {
        const relative = path.relative(
            ROOT_DIR,
            asset.path
        ).replace(/\\/g, "/");

        return (
            getRootPrefix(productUrl) +
            relative
        );
    }

    return (
        getRootPrefix(productUrl) +
        clean
    );
}

function getProductImages(product) {
    if (
        Array.isArray(product.images) &&
        product.images.length
    ) {
        const images = product.images
            .filter(Boolean)
            .map(image => String(image).trim())
            .filter(Boolean);

        if (images.length) return images;
    }

    if (product.image) {
        return [String(product.image).trim()];
    }

    return [];
}

function getFirstValidImage(product, productUrl) {
    const images = getProductImages(product);

    for (const image of images) {
        const asset = resolveLocalAsset(
            image,
            productUrl
        );

        if (asset?.exists) {
            return getImagePath(
                image,
                productUrl
            );
        }
    }

    for (const image of images) {
        if (
            /^(https?:)?\/\//i.test(
                String(image)
            )
        ) {
            return getImagePath(
                image,
                productUrl
            );
        }
    }

    return "";
}

/* =========================================================
   PRODUCTO
========================================================= */

function getDescription(product) {
    return (
        product.description ||
        product.details?.description ||
        "Diseño exclusivo SATORII."
    );
}

function getDetails(product) {
    const details = product.details || {};

    return {
        collection:
            product.collection ||
            product.category ||
            "SATORII",

        material:
            details.material ||
            product.material ||
            "Algodón premium.",

        print:
            details.print ||
            product.print ||
            "Estampado de alta definición.",

        fit:
            details.fit ||
            product.fit ||
            "Regular / Oversized",

        origin:
            details.origin ||
            product.origin ||
            "Diseñado en Chile",

        weight:
            details.weight ||
            product.weight ||
            "240 GSM"
    };
}

function getShipping(product) {
    return (
        product.details?.shipping ||
        product.shipping ||
        "Enviamos a todo Chile. Los tiempos y costos dependen del destino y método de envío."
    );
}

function getCare(product) {
    return (
        product.details?.care ||
        product.care ||
        "Lavar con agua fría. No utilizar cloro. No planchar directamente sobre el estampado."
    );
}

function getBannerImage(product, productUrl) {
    const candidates = [
        product.bannerImage,
        product.featureImage,
        product.editorialImage,
        product.characterImage,
        product.details?.bannerImage,
        "img/banner-02.webp",
        "img/banner-02.jpg",
        "img/banner.webp",
        "img/banner.jpg"
    ].filter(Boolean);

    for (const image of candidates) {
        const asset = resolveLocalAsset(
            image,
            productUrl
        );

        if (asset?.exists) {
            return getImagePath(
                image,
                productUrl
            );
        }
    }

    return "";
}

function isTshirt(product) {
    const text = [
        product.type,
        product.productType,
        product.category,
        product.collection,
        product.subcategory,
        product.name
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    return /polera|t-shirt|tshirt|tee|shirt|oversize/.test(text);
}

/* =========================================================
   TALLAS / COLORES
========================================================= */

function renderSizes(product) {
    const sizes =
        Array.isArray(product.sizes) &&
        product.sizes.length
            ? product.sizes
            : ["S", "M", "L", "XL"];

    return sizes.map((size, index) => `
        <button
            type="button"
            class="satori-size ${index === 0 ? "active" : ""}"
            data-size="${escapeHTML(size)}"
            aria-pressed="${index === 0 ? "true" : "false"}"
        >
            ${escapeHTML(size)}
        </button>
    `).join("");
}

function renderColors(product) {
    const colors =
        Array.isArray(product.colors) &&
        product.colors.length
            ? product.colors
            : ["Negro"];

    return colors.map((color, index) => {
        const normalized = String(color).toLowerCase();

        let colorValue = "#111111";

        if (normalized.includes("rojo")) {
            colorValue = SATORII_RED;
        } else if (normalized.includes("blanco")) {
            colorValue = "#FFFFFF";
        } else if (normalized.includes("gris")) {
            colorValue = "#888888";
        } else if (normalized.includes("azul")) {
            colorValue = "#234B8C";
        } else if (normalized.includes("verde")) {
            colorValue = "#3D6B45";
        }

        return `
            <button
                type="button"
                class="satori-color ${index === 0 ? "active" : ""}"
                data-color="${escapeHTML(color)}"
                title="${escapeHTML(color)}"
                aria-label="${escapeHTML(color)}"
                aria-pressed="${index === 0 ? "true" : "false"}"
            >
                <span style="background:${colorValue}"></span>
            </button>
        `;
    }).join("");
}

/* =========================================================
   GALERÍA
========================================================= */

function renderGallery(product, productUrl) {
    const images = getProductImages(product);

    const validImages = images.filter(image => {
        const asset = resolveLocalAsset(
            image,
            productUrl
        );

        return (
            asset?.exists ||
            /^(https?:)?\/\//i.test(
                String(image)
            )
        );
    });

    if (!validImages.length) {
        return `
            <div class="satori-gallery">
                <div class="satori-product-image-empty">
                    <span>SATORII.</span>
                </div>
            </div>
        `;
    }

    const mainImage = getImagePath(
        validImages[0],
        productUrl
    );

    const thumbs = validImages
        .slice(0, 6)
        .map((image, index) => {
            const src = getImagePath(
                image,
                productUrl
            );

            return `
                <button
                    class="satori-thumb ${index === 0 ? "active" : ""}"
                    type="button"
                    data-image="${escapeHTML(src)}"
                    aria-label="Ver imagen ${index + 1}"
                    aria-pressed="${index === 0 ? "true" : "false"}"
                >
                    <img
                        src="${escapeHTML(src)}"
                        alt="${escapeHTML(product.name)}"
                        loading="${index === 0 ? "eager" : "lazy"}"
                        decoding="async"
                    >
                </button>
            `;
        })
        .join("");

    return `
        <div class="satori-gallery satori-animate satori-animate-left">
            <div class="satori-main-image">
                <img
                    id="satoriMainProductImage"
                    src="${escapeHTML(mainImage)}"
                    alt="${escapeHTML(product.name)}"
                    fetchpriority="high"
                    decoding="async"
                >
            </div>

            <div class="satori-thumbnails">
                ${thumbs}
            </div>
        </div>
    `;
}

/* =========================================================
   INFORMACIÓN
========================================================= */

function renderTabs(product) {
    const details = getDetails(product);

    return `
        <section
            class="satori-information satori-animate"
            id="informacion-producto"
        >
            <div
                class="satori-tabs"
                role="tablist"
                aria-label="Información del producto"
            >
                <button
                    class="satori-tab active"
                    type="button"
                    data-tab="description"
                    role="tab"
                    aria-selected="true"
                >
                    DESCRIPCIÓN
                </button>

                <button
                    class="satori-tab"
                    type="button"
                    data-tab="details"
                    role="tab"
                    aria-selected="false"
                >
                    DETALLES
                </button>

                <button
                    class="satori-tab"
                    type="button"
                    data-tab="shipping"
                    role="tab"
                    aria-selected="false"
                >
                    ENVÍOS
                </button>

                <button
                    class="satori-tab"
                    type="button"
                    data-tab="care"
                    role="tab"
                    aria-selected="false"
                >
                    CUIDADOS
                </button>
            </div>

            <div
                class="satori-tab-panel active"
                data-panel="description"
            >
                <div class="satori-panel-intro">
                    <span>SATORII / PRODUCT</span>
                    <h2>SOBRE ESTA PIEZA</h2>
                </div>

                <p>${escapeHTML(getDescription(product))}</p>

                <p>
                    En SATORII creemos que una polera puede ser
                    mucho más que una prenda. Cada diseño busca
                    representar una historia, personaje o universo.
                </p>
            </div>

            <div
                class="satori-tab-panel"
                data-panel="details"
            >
                <div class="satori-detail-grid">
                    <div>
                        <span>COLECCIÓN</span>
                        <strong>${escapeHTML(details.collection)}</strong>
                    </div>

                    <div>
                        <span>MATERIAL</span>
                        <strong>${escapeHTML(details.material)}</strong>
                    </div>

                    <div>
                        <span>ESTAMPADO</span>
                        <strong>${escapeHTML(details.print)}</strong>
                    </div>

                    <div>
                        <span>FIT</span>
                        <strong>${escapeHTML(details.fit)}</strong>
                    </div>

                    <div>
                        <span>ORIGEN</span>
                        <strong>${escapeHTML(details.origin)}</strong>
                    </div>

                    <div>
                        <span>PESO</span>
                        <strong>${escapeHTML(details.weight)}</strong>
                    </div>
                </div>
            </div>

            <div
                class="satori-tab-panel"
                data-panel="shipping"
            >
                <div class="satori-panel-intro">
                    <span>SATORII / SHIPPING</span>
                    <h2>ENVÍOS Y CAMBIOS</h2>
                </div>

                <p>${escapeHTML(getShipping(product))}</p>
            </div>

            <div
                class="satori-tab-panel"
                data-panel="care"
            >
                <div class="satori-panel-intro">
                    <span>SATORII / CARE</span>
                    <h2>CUIDADOS DE LA PRENDA</h2>
                </div>

                <p>${escapeHTML(getCare(product))}</p>

                <ul>
                    <li>Lavar preferentemente con agua fría.</li>
                    <li>No utilizar cloro.</li>
                    <li>No planchar directamente sobre el estampado.</li>
                    <li>Evitar secadora a altas temperaturas.</li>
                </ul>
            </div>
        </section>
    `;
}

/* =========================================================
   RECOMENDACIONES ESTÁTICAS
   ---------------------------------------------------------
   Estas se usan como fallback si Supabase no responde.
========================================================= */

function getRecommendedProducts(product, products) {
    const candidates = products.filter(item => {
        if (
            String(item.id) ===
            String(product.id)
        ) {
            return false;
        }

        if (item.available === false) {
            return false;
        }

        if (!isTshirt(item)) {
            return false;
        }

        const images = getProductImages(item);

        if (!images.length) {
            return false;
        }

        const itemUrl =
            normalizeProductUrl(item);

        return images.some(image => {
            const asset =
                resolveLocalAsset(
                    image,
                    itemUrl
                );

            return (
                asset?.exists ||
                /^(https?:)?\/\//i.test(
                    String(image)
                )
            );
        });
    });

    return shuffle(candidates).slice(0, 4);
}

/* =========================================================
   RECOMENDACIONES HTML
========================================================= */

function renderRecommendations(
    product,
    products,
    productUrl
) {
    const recommended =
        getRecommendedProducts(
            product,
            products
        );

    const cards = recommended.map(item => {
        const url = normalizeProductUrl(item);
        const images = getProductImages(item);

        let validImage = "";

        for (const image of images) {
            const asset =
                resolveLocalAsset(
                    image,
                    url
                );

            if (
                asset?.exists ||
                /^(https?:)?\/\//i.test(
                    String(image)
                )
            ) {
                validImage = image;
                break;
            }
        }

        if (!validImage) {
            return "";
        }

        const image = getImagePath(
            validImage,
            url
        );

        const href =
            getRootPrefix(productUrl) +
            url;

        return `
            <a
                class="satori-recommendation satori-animate"
                href="${escapeHTML(href)}"
                data-product-id="${escapeHTML(item.id)}"
            >
                <div class="satori-rec-image">
                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                        decoding="async"
                    >
                </div>

                <div class="satori-rec-info">
                    <strong>${escapeHTML(item.name)}</strong>

                    <span
                        data-supabase-rec-price="${escapeHTML(String(item.id))}"
                    >
                        ${formatPrice(item.price)}
                    </span>
                </div>
            </a>
        `;
    }).filter(Boolean).join("");

    if (!cards) {
        return `
            <section
                class="satori-recommendations"
                id="satoriRecommendations"
                data-supabase-recommendations="true"
            ></section>
        `;
    }

    return `
        <section
            class="satori-recommendations"
            id="satoriRecommendations"
            data-supabase-recommendations="true"
        >
            <div class="satori-section-heading">
                <div>
                    <span>SATORII / SELECCIÓN</span>
                    <h2>TAMBIÉN TE PUEDE GUSTAR</h2>
                </div>

                <a
                    href="${escapeHTML(
                        getRootPrefix(productUrl) +
                        "anime.html"
                    )}"
                >
                    VER COLECCIÓN
                </a>
            </div>

            <div
                class="satori-recommendation-grid"
                id="satoriRecommendationGrid"
            >
                ${cards}
            </div>
        </section>
    `;
}

/* =========================================================
   CARGAR PRODUCTS.JS
========================================================= */

function loadProducts() {
    if (!fs.existsSync(PRODUCTS_JS)) {
        throw new Error(
            `No existe ${PRODUCTS_JS}`
        );
    }

    const source = fs.readFileSync(
        PRODUCTS_JS,
        "utf8"
    );

    const sandbox = {
        console,
        Math,
        JSON,
        Date
    };

    vm.runInNewContext(
        source +
        "\nthis.__SATORII_PRODUCTS = PRODUCTS;",
        sandbox,
        {
            filename: PRODUCTS_JS
        }
    );

    if (
        !Array.isArray(
            sandbox.__SATORII_PRODUCTS
        )
    ) {
        throw new Error(
            "No se pudo cargar PRODUCTS desde products.js"
        );
    }

    return sandbox.__SATORII_PRODUCTS;
}

/* =========================================================
   CSS
========================================================= */

function getPageCSS() {
    return `
        :root {
            --s-red: ${SATORII_RED};
            --s-dark: ${SATORII_DARK};
            --s-black: ${SATORII_BLACK};
            --s-light: ${SATORII_LIGHT};
            --s-border: ${SATORII_BORDER};
            --s-heading: "Barlow Condensed", sans-serif;
            --s-body: "Inter", sans-serif;
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
            color: var(--s-black);
            font-family: var(--s-body);
        }

        button,
        input,
        select,
        textarea {
            font-family: inherit;
        }

        .satori-product-page {
            width: 100%;
            max-width: 1440px;
            margin: 0 auto;
            padding: 42px 42px 0;
        }

        .satori-breadcrumb {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 0 0 30px;
            color: #888;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: .08em;
            text-transform: uppercase;
        }

        .satori-breadcrumb span:last-child {
            color: var(--s-black);
        }

        .satori-product-layout {
            display: grid;
            grid-template-columns:
                minmax(0, 1.12fr)
                minmax(380px, .88fr);
            gap: 64px;
            align-items: start;
        }

        .satori-gallery {
            min-width: 0;
        }

        .satori-main-image {
            width: 100%;
            aspect-ratio: 1 / 1;
            overflow: hidden;
            background: #f6f6f6;
        }

        .satori-main-image img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: contain;
            transition:
                opacity .25s ease,
                transform .45s cubic-bezier(.22,1,.36,1);
        }

        .satori-main-image:hover img {
            transform: scale(1.02);
        }

        .satori-thumbnails {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-top: 12px;
        }

        .satori-thumb {
            display: block;
            padding: 0;
            border: 1px solid transparent;
            background: #f5f5f5;
            aspect-ratio: 1 / 1;
            overflow: hidden;
            cursor: pointer;
        }

        .satori-thumb.active {
            border-color: var(--s-red);
        }

        .satori-thumb img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .satori-product-image-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1 / 1;
            background: var(--s-light);
            color: var(--s-red);
            font-family: var(--s-heading);
            font-size: 60px;
            font-weight: 900;
        }

        .satori-product-info {
            min-width: 0;
            padding-top: 2px;
        }

        .satori-product-category {
            margin-bottom: 12px;
            color: #777;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: .14em;
            text-transform: uppercase;
        }

        .satori-product-title {
            margin: 0;
            font-family: var(--s-heading);
            font-size: clamp(46px, 5vw, 72px);
            line-height: .88;
            font-weight: 900;
            letter-spacing: -.025em;
            text-transform: uppercase;
        }

        .satori-product-subtitle {
            margin: 10px 0 20px;
            color: #777;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: .04em;
            text-transform: uppercase;
        }

        .satori-price {
            margin-bottom: 5px;
            color: var(--s-red);
            font-size: 25px;
            font-weight: 900;
        }

        .satori-tax {
            display: block;
            margin-bottom: 28px;
            color: #888;
            font-size: 10px;
        }

        .satori-option {
            margin-bottom: 24px;
        }

        .satori-option-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;
            font-size: 10px;
            font-weight: 900;
            letter-spacing: .07em;
            text-transform: uppercase;
        }

        .satori-option-label a {
            color: var(--s-black);
            font-size: 9px;
            text-decoration: underline;
        }

        .satori-size-list,
        .satori-color-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .satori-size {
            min-width: 48px;
            height: 42px;
            padding: 0 12px;
            border: 1px solid #d5d5d5;
            background: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: 800;
        }

        .satori-size.active {
            border-color: var(--s-black);
            background: var(--s-black);
            color: #fff;
        }

        .satori-color {
            width: 34px;
            height: 34px;
            padding: 3px;
            border: 1px solid #ccc;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
        }

        .satori-color span {
            display: block;
            width: 100%;
            height: 100%;
            border: 1px solid #aaa;
            border-radius: 50%;
        }

        .satori-color.active {
            border: 2px solid var(--s-red);
        }

        .satori-buy-row {
            display: grid;
            grid-template-columns: 124px minmax(0, 1fr);
            gap: 10px;
        }

        .satori-quantity {
            display: flex;
            width: 124px;
            height: 46px;
            border: 1px solid #ccc;
        }

        .satori-quantity button {
            width: 40px;
            padding: 0;
            border: 0;
            background: #fff;
            cursor: pointer;
            font-size: 18px;
        }

        .satori-quantity span {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 800;
        }

        .satori-add-to-cart {
            min-height: 46px;
            border: 0;
            background: var(--s-red);
            color: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: .06em;
            text-transform: uppercase;
        }

        .satori-add-to-cart:disabled {
            opacity: .55;
            cursor: not-allowed;
        }

        .satori-favorite {
            width: 100%;
            min-height: 44px;
            margin-top: 10px;
            border: 1px solid #ccc;
            background: #fff;
            cursor: pointer;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .satori-favorite.active {
            border-color: var(--s-red);
            color: var(--s-red);
        }

        .satori-benefits {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-top: 26px;
            border-top: 1px solid var(--s-border);
            border-bottom: 1px solid var(--s-border);
        }

        .satori-benefit {
            padding: 17px 8px;
            text-align: center;
            border-right: 1px solid var(--s-border);
        }

        .satori-benefit:last-child {
            border-right: 0;
        }

        .satori-benefit strong,
        .satori-benefit span {
            display: block;
        }

        .satori-benefit strong {
            margin-bottom: 5px;
            font-size: 9px;
        }

        .satori-benefit span {
            color: #777;
            font-size: 9px;
        }

        .satori-information {
            margin-top: 68px;
            border-top: 1px solid var(--s-border);
        }

        .satori-tabs {
            display: flex;
            overflow-x: auto;
            border-bottom: 1px solid var(--s-border);
            scrollbar-width: none;
        }

        .satori-tabs::-webkit-scrollbar {
            display: none;
        }

        .satori-tab {
            position: relative;
            flex: 0 0 auto;
            padding: 18px 22px;
            border: 0;
            background: #fff;
            color: #888;
            cursor: pointer;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
        }

        .satori-tab.active {
            color: var(--s-black);
        }

        .satori-tab.active::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1px;
            height: 3px;
            background: var(--s-red);
        }

        .satori-tab-panel {
            display: none;
            max-width: 900px;
            padding: 34px 5px 10px;
        }

        .satori-tab-panel.active {
            display: block;
        }

        .satori-panel-intro {
            margin-bottom: 18px;
        }

        .satori-panel-intro span {
            display: block;
            margin-bottom: 6px;
            color: var(--s-red);
            font-size: 9px;
            font-weight: 900;
            letter-spacing: .12em;
        }

        .satori-tab-panel h2 {
            margin: 0;
            font-family: var(--s-heading);
            font-size: 30px;
            line-height: .95;
            font-weight: 900;
        }

        .satori-tab-panel p {
            max-width: 800px;
            color: #555;
            font-size: 13px;
            line-height: 1.75;
        }

        .satori-detail-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            border: 1px solid var(--s-border);
            background: var(--s-border);
        }

        .satori-detail-grid div {
            padding: 20px;
            background: #fff;
        }

        .satori-detail-grid span,
        .satori-detail-grid strong {
            display: block;
        }

        .satori-detail-grid span {
            margin-bottom: 7px;
            color: #888;
            font-size: 9px;
            font-weight: 800;
        }

        .satori-detail-grid strong {
            font-size: 12px;
        }

        .satori-editorial {
            position: relative;
            width: 100%;
            min-height: 360px;
            margin-top: 72px;
            overflow: hidden;
            background: var(--s-dark);
        }

        .satori-editorial img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: .62;
        }

        .satori-editorial::after {
            content: "";
            position: absolute;
            inset: 0;
            background:
                linear-gradient(
                    90deg,
                    rgba(16,23,39,.98) 0%,
                    rgba(16,23,39,.82) 38%,
                    rgba(16,23,39,.35) 70%,
                    rgba(16,23,39,.12) 100%
                );
        }

        .satori-editorial-content {
            position: relative;
            z-index: 2;
            min-height: 360px;
            max-width: 1440px;
            margin: 0 auto;
            padding: 55px 42px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #fff;
        }

        .satori-editorial-content span {
            margin-bottom: 10px;
            color: var(--s-red);
            font-size: 10px;
            font-weight: 900;
            letter-spacing: .14em;
        }

        .satori-editorial-content h2 {
            max-width: 700px;
            margin: 0 0 14px;
            font-family: var(--s-heading);
            font-size: clamp(46px, 6vw, 78px);
            line-height: .87;
            font-weight: 900;
        }

        .satori-editorial-content p {
            max-width: 500px;
            margin: 0;
            color: rgba(255,255,255,.82);
            font-size: 12px;
            line-height: 1.7;
        }

        .satori-recommendations {
            padding: 62px 0 55px;
        }

        .satori-section-heading {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 22px;
        }

        .satori-section-heading span {
            display: block;
            margin-bottom: 7px;
            color: var(--s-red);
            font-size: 9px;
            font-weight: 900;
            letter-spacing: .12em;
        }

        .satori-section-heading h2 {
            margin: 0;
            font-family: var(--s-heading);
            font-size: 40px;
            line-height: .9;
            font-weight: 900;
        }

        .satori-section-heading a {
            color: var(--s-black);
            font-size: 10px;
            font-weight: 900;
            text-decoration: none;
        }

        .satori-recommendation-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 18px;
        }

        .satori-recommendation {
            display: block;
            color: inherit;
            text-decoration: none;
        }

        .satori-rec-image {
            width: 100%;
            aspect-ratio: 1 / 1.08;
            overflow: hidden;
            background: #f5f5f5;
        }

        .satori-rec-image img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            transition: transform .45s cubic-bezier(.22,1,.36,1);
        }

        .satori-recommendation:hover .satori-rec-image img {
            transform: scale(1.035);
        }

        .satori-rec-info {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 13px 2px;
        }

        .satori-rec-info strong {
            overflow: hidden;
            font-size: 12px;
            font-weight: 800;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .satori-rec-info span {
            color: var(--s-red);
            font-size: 12px;
            font-weight: 900;
        }

        .satori-animate {
            opacity: 0;
            transform: translate3d(0, 28px, 0);
            transition:
                opacity .7s ease,
                transform .7s cubic-bezier(.22,1,.36,1);
        }

        .satori-animate-left {
            transform: translate3d(-28px, 0, 0);
        }

        .satori-page-ready .satori-animate.is-visible {
            opacity: 1;
            transform: translate3d(0,0,0);
        }

        @media (max-width: 1100px) {
            .satori-product-page {
                padding-left: 28px;
                padding-right: 28px;
            }

            .satori-product-layout {
                grid-template-columns:
                    minmax(0,1fr)
                    minmax(330px,.8fr);
                gap: 35px;
            }
        }

        @media (max-width: 900px) {
            .satori-product-page {
                padding-left: 20px;
                padding-right: 20px;
            }

            .satori-product-layout {
                grid-template-columns: 1fr;
                gap: 34px;
            }

            .satori-recommendation-grid {
                grid-template-columns: repeat(2,minmax(0,1fr));
            }

            .satori-editorial-content {
                padding: 50px 28px;
            }
        }

        @media (max-width: 600px) {
            .satori-product-page {
                padding: 18px 12px 0;
            }

            .satori-product-title {
                font-size: clamp(42px,14vw,54px);
            }

            .satori-buy-row {
                grid-template-columns: 108px minmax(0,1fr);
            }

            .satori-quantity {
                width: 108px;
            }

            .satori-detail-grid {
                grid-template-columns: repeat(2,minmax(0,1fr));
            }

            .satori-editorial-content {
                min-height: 360px;
                padding: 30px 20px;
                justify-content: flex-end;
            }

            .satori-recommendations {
                padding: 45px 0 42px;
            }

            .satori-section-heading {
                display: block;
            }

            .satori-section-heading a {
                display: inline-block;
                margin-top: 11px;
            }

            .satori-recommendation-grid {
                grid-template-columns: repeat(2,minmax(0,1fr));
                gap: 20px 10px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }

            *,
            *::before,
            *::after {
                animation-duration: .01ms !important;
                transition-duration: .01ms !important;
                scroll-behavior: auto !important;
            }

            .satori-animate {
                opacity: 1 !important;
                transform: none !important;
            }
        }
    `;
}

/* =========================================================
   JAVASCRIPT DEL PRODUCTO
========================================================= */

function getProductScript(root, product, productUrl) {
    const firstSize =
        Array.isArray(product.sizes) &&
        product.sizes.length
            ? product.sizes[0]
            : "S";

    const firstColor =
        Array.isArray(product.colors) &&
        product.colors.length
            ? product.colors[0]
            : "Negro";

    return `
<script>
(function () {
    "use strict";

    const PRODUCT =
        window.SATORII_PRODUCT || {};

    let selectedSize =
        ${safeJSONString(firstSize)};

    let selectedColor =
        ${safeJSONString(firstColor)};

    let quantity = 1;

    /* =====================================================
       ANIMACIONES
    ===================================================== */

    function initializeAnimations() {
        document.body.classList.add(
            "satori-page-ready"
        );

        const elements =
            document.querySelectorAll(
                ".satori-animate"
            );

        const reduced =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (
            reduced ||
            !("IntersectionObserver" in window)
        ) {
            elements.forEach(
                element =>
                    element.classList.add(
                        "is-visible"
                    )
            );

            return;
        }

        const observer =
            new IntersectionObserver(
                function (entries) {
                    entries.forEach(
                        function (entry) {
                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    );
                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );

        elements.forEach(
            element =>
                observer.observe(element)
        );
    }

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initializeAnimations
        );
    } else {
        initializeAnimations();
    }

    /* =====================================================
       GALERÍA
    ===================================================== */

    const mainImage =
        document.getElementById(
            "satoriMainProductImage"
        );

    const thumbnails =
        Array.from(
            document.querySelectorAll(
                ".satori-thumb"
            )
        );

    function changeImage(index) {
        if (
            !mainImage ||
            !thumbnails.length
        ) {
            return;
        }

        const button =
            thumbnails[
                Math.max(
                    0,
                    Math.min(
                        index,
                        thumbnails.length - 1
                    )
                )
            ];

        const nextImage =
            button.dataset.image;

        if (!nextImage) {
            return;
        }

        mainImage.src =
            nextImage;

        thumbnails.forEach(
            item => {
                item.classList.remove(
                    "active"
                );

                item.setAttribute(
                    "aria-pressed",
                    "false"
                );
            }
        );

        button.classList.add(
            "active"
        );

        button.setAttribute(
            "aria-pressed",
            "true"
        );
    }

    thumbnails.forEach(
        function (button, index) {
            button.addEventListener(
                "click",
                function () {
                    changeImage(index);
                }
            );
        }
    );

    /* =====================================================
       TALLAS
    ===================================================== */

    function updateCartData() {
        const button =
            document.getElementById(
                "addToCart"
            );

        if (!button) {
            return;
        }

        button.dataset.productSize =
            selectedSize;

        button.dataset.productColor =
            selectedColor;

        button.dataset.productQuantity =
            String(quantity);
    }

    document
        .querySelectorAll(".satori-size")
        .forEach(
            function (button) {
                button.addEventListener(
                    "click",
                    function () {
                        document
                            .querySelectorAll(
                                ".satori-size"
                            )
                            .forEach(
                                item => {
                                    item.classList.remove(
                                        "active"
                                    );

                                    item.setAttribute(
                                        "aria-pressed",
                                        "false"
                                    );
                                }
                            );

                        button.classList.add(
                            "active"
                        );

                        button.setAttribute(
                            "aria-pressed",
                            "true"
                        );

                        selectedSize =
                            button.dataset.size ||
                            "";

                        updateCartData();
                    }
                );
            }
        );

    /* =====================================================
       COLORES
    ===================================================== */

    document
        .querySelectorAll(".satori-color")
        .forEach(
            function (button) {
                button.addEventListener(
                    "click",
                    function () {
                        document
                            .querySelectorAll(
                                ".satori-color"
                            )
                            .forEach(
                                item => {
                                    item.classList.remove(
                                        "active"
                                    );

                                    item.setAttribute(
                                        "aria-pressed",
                                        "false"
                                    );
                                }
                            );

                        button.classList.add(
                            "active"
                        );

                        button.setAttribute(
                            "aria-pressed",
                            "true"
                        );

                        selectedColor =
                            button.dataset.color ||
                            "";

                        const label =
                            document.getElementById(
                                "selectedColorLabel"
                            );

                        if (label) {
                            label.textContent =
                                selectedColor;
                        }

                        updateCartData();
                    }
                );
            }
        );

    /* =====================================================
       CANTIDAD
    ===================================================== */

    const quantityDisplay =
        document.getElementById(
            "satoriQuantity"
        );

    function updateQuantity() {
        quantity =
            Math.max(
                1,
                Math.min(
                    20,
                    Number(quantity) || 1
                )
            );

        if (quantityDisplay) {
            quantityDisplay.textContent =
                String(quantity);
        }

        updateCartData();
    }

    document
        .querySelectorAll(
            "[data-quantity-minus]"
        )
        .forEach(
            button => {
                button.addEventListener(
                    "click",
                    function () {
                        quantity--;
                        updateQuantity();
                    }
                );
            }
        );

    document
        .querySelectorAll(
            "[data-quantity-plus]"
        )
        .forEach(
            button => {
                button.addEventListener(
                    "click",
                    function () {
                        quantity++;
                        updateQuantity();
                    }
                );
            }
        );

    updateCartData();

    /* =====================================================
       FAVORITOS
    ===================================================== */

    const favorite =
        document.getElementById(
            "satoriFavorite"
        );

    if (favorite) {
        const key =
            "satorii_favorites";

        let favorites = [];

        try {
            favorites =
                JSON.parse(
                    localStorage.getItem(key)
                ) || [];

            if (
                !Array.isArray(favorites)
            ) {
                favorites = [];
            }
        } catch (_) {
            favorites = [];
        }

        const productId =
            ${safeJSONString(
                String(product.id)
            )};

        function paintFavorite() {
            const active =
                favorites.includes(
                    productId
                );

            favorite.classList.toggle(
                "active",
                active
            );

            favorite.innerHTML =
                active
                    ? "♥ &nbsp; EN FAVORITOS"
                    : "♡ &nbsp; AGREGAR A FAVORITOS";
        }

        paintFavorite();

        favorite.addEventListener(
            "click",
            function () {
                const index =
                    favorites.indexOf(
                        productId
                    );

                if (index === -1) {
                    favorites.push(
                        productId
                    );
                } else {
                    favorites.splice(
                        index,
                        1
                    );
                }

                try {
                    localStorage.setItem(
                        key,
                        JSON.stringify(
                            favorites
                        )
                    );
                } catch (_) {}

                paintFavorite();
            }
        );
    }

    /* =====================================================
       TABS
    ===================================================== */

    const tabs =
        document.querySelectorAll(
            ".satori-tab"
        );

    const panels =
        document.querySelectorAll(
            ".satori-tab-panel"
        );

    tabs.forEach(
        function (tab) {
            tab.addEventListener(
                "click",
                function () {
                    const target =
                        tab.dataset.tab;

                    tabs.forEach(
                        item => {
                            item.classList.remove(
                                "active"
                            );

                            item.setAttribute(
                                "aria-selected",
                                "false"
                            );
                        }
                    );

                    panels.forEach(
                        panel =>
                            panel.classList.remove(
                                "active"
                            )
                    );

                    tab.classList.add(
                        "active"
                    );

                    tab.setAttribute(
                        "aria-selected",
                        "true"
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

    /* =====================================================
       SUPABASE
       -----------------------------------------------------
       IMPORTANTE:
       Se usa REST directamente.
       No depende de que el CDN de supabase-js
       haya cargado antes del script.
    ===================================================== */

    const SUPABASE_CONFIG =
        window.SATORII_SUPABASE_CONFIG || {};

    function money(value) {
        return (
            "$" +
            (Number(value) || 0).toLocaleString(
                "es-CL"
            ) +
            " CLP"
        );
    }

    function isTshirt(product) {
        const text = [
            product.type,
            product.productType,
            product.category,
            product.collection,
            product.subcategory,
            product.name
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return /polera|t-shirt|tshirt|tee|shirt|oversize/.test(
            text
        );
    }

    function supabaseHeaders() {
        return {
            apikey:
                SUPABASE_CONFIG.publishableKey,

            Authorization:
                "Bearer " +
                SUPABASE_CONFIG.publishableKey,

            "Content-Type":
                "application/json"
        };
    }

    async function supabaseRequest(
        query
    ) {
        if (
            !SUPABASE_CONFIG.enabled ||
            !SUPABASE_CONFIG.url ||
            !SUPABASE_CONFIG.publishableKey
        ) {
            return null;
        }

        const endpoint =
            SUPABASE_CONFIG.url.replace(
                /\\/$/,
                ""
            ) +
            "/rest/v1/products?" +
            query;

        const response =
            await fetch(
                endpoint,
                {
                    method: "GET",
                    headers:
                        supabaseHeaders(),
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                "Supabase HTTP " +
                response.status
            );
        }

        return response.json();
    }

    async function updateCurrentProductFromSupabase() {
        if (!PRODUCT.id) {
            return null;
        }

        const query =
            "select=*" +
            "&id=eq." +
            encodeURIComponent(
                String(PRODUCT.id)
            ) +
            "&limit=1";

        const rows =
            await supabaseRequest(
                query
            );

        if (
            !Array.isArray(rows) ||
            !rows.length
        ) {
            return null;
        }

        const current =
            rows[0];

        /* -----------------------------
           PRECIO
        ----------------------------- */

        if (
            current.price !== undefined &&
            current.price !== null
        ) {
            const price =
                Number(
                    current.price
                ) || 0;

            const priceElement =
                document.querySelector(
                    ".satori-price"
                );

            if (priceElement) {
                priceElement.textContent =
                    money(price);
            }

            const cartButton =
                document.getElementById(
                    "addToCart"
                );

            if (cartButton) {
                cartButton.dataset.productPrice =
                    String(price);
            }

            PRODUCT.price =
                price;
        }

        /* -----------------------------
           NOMBRE
        ----------------------------- */

        if (
            current.name
        ) {
            PRODUCT.name =
                current.name;

            const title =
                document.querySelector(
                    ".satori-product-title"
                );

            if (title) {
                title.textContent =
                    current.name;
            }

            const galleryAlt =
                document.querySelector(
                    "#satoriMainProductImage"
                );

            if (galleryAlt) {
                galleryAlt.alt =
                    current.name;
            }
        }

        /* -----------------------------
           DISPONIBILIDAD
        ----------------------------- */

        const available =
            current.available !== false;

        PRODUCT.available =
            available;

        const addToCart =
            document.getElementById(
                "addToCart"
            );

        if (addToCart) {
            addToCart.disabled =
                !available;

            if (!available) {
                addToCart.textContent =
                    "AGOTADO";
            } else {
                addToCart.textContent =
                    "AGREGAR AL CARRITO";
            }
        }

        return current;
    }

    async function loadSupabaseRecommendations(
        currentProduct
    ) {
        const section =
            document.getElementById(
                "satoriRecommendations"
            );

        if (!section) {
            return;
        }

        try {
            const query =
                "select=id,name,price,image,images,available,category,collection,subcategory,type,productType,url" +
                "&available=eq.true" +
                "&limit=50";

            const rows =
                await supabaseRequest(
                    query
                );

            if (
                !Array.isArray(rows)
            ) {
                return;
            }

            const candidates =
                rows.filter(
                    item => {
                        if (
                            String(item.id) ===
                            String(currentProduct.id)
                        ) {
                            return false;
                        }

                        return isTshirt(item);
                    }
                );

            const selected =
                shuffle(
                    candidates
                ).slice(0, 4);

            if (!selected.length) {
                return;
            }

            const root =
                ${safeJSONString(root)};

            const currentUrl =
                ${safeJSONString(productUrl)};

            const currentDirectory =
                currentUrl
                    .replace(
                        /\\\\/g,
                        "/"
                    )
                    .split("/")
                    .slice(0, -1)
                    .join("/");

            function recommendationUrl(item) {
                let url =
                    String(
                        item.url || ""
                    )
                        .replace(
                            /^\\\\/+|^\\/+/, ""
                        )
                        .replace(
                            /\\\\/g,
                            "/"
                        );

                if (!url) {
                    const category =
                        String(
                            item.category ||
                            item.collection ||
                            "anime"
                        )
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(
                                /[\\\\u0300-\\\\u036f]/g,
                                ""
                            )
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            )
                            .replace(
                                /^-+|-+$/g,
                                "");

                    const slug =
                        String(
                            item.id ||
                            item.name
                        )
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(
                                /[\\\\u0300-\\\\u036f]/g,
                                ""
                            )
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            )
                            .replace(
                                /^-+|-+$/g,
                                "");

                    url =
                        "productos/" +
                        category +
                        "/" +
                        slug +
                        ".html";
                }

                if (
                    !url
                        .toLowerCase()
                        .endsWith(".html")
                ) {
                    url += ".html";
                }

                const depth =
                    currentDirectory
                        .split("/")
                        .filter(Boolean)
                        .length;

                return (
                    "../".repeat(
                        depth
                    ) +
                    url
                );
            }

            function getRecommendationImage(item) {
                let image = "";

                if (
                    Array.isArray(
                        item.images
                    )
                ) {
                    image =
                        item.images.find(
                            Boolean
                        ) || "";
                }

                if (
                    !image &&
                    item.image
                ) {
                    image =
                        String(
                            item.image
                        );
                }

                return image;
            }

            const cards =
                selected.map(
                    item => {
                        const image =
                            getRecommendationImage(
                                item
                            );

                        if (!image) {
                            return "";
                        }

                        return (
                            '<a class="satori-recommendation satori-animate is-visible" ' +
                            'href="' +
                            recommendationUrl(
                                item
                            ) +
                            '" ' +
                            'data-product-id="' +
                            String(item.id)
                                .replace(
                                    /"/g,
                                    "&quot;"
                                ) +
                            '">' +
                            '<div class="satori-rec-image">' +
                            '<img src="' +
                            String(image)
                                .replace(
                                    /"/g,
                                    "&quot;"
                                ) +
                            '" alt="' +
                            String(
                                item.name || ""
                            ).replace(
                                /"/g,
                                "&quot;"
                            ) +
                            '" loading="lazy" decoding="async">' +
                            "</div>" +
                            '<div class="satori-rec-info">' +
                            "<strong>" +
                            String(
                                item.name || ""
                            ) +
                            "</strong>" +
                            '<span data-supabase-rec-price="' +
                            String(item.id) +
                            '">' +
                            money(
                                item.price
                            ) +
                            "</span>" +
                            "</div>" +
                            "</a>"
                        );
                    }
                )
                .filter(Boolean)
                .join("");

            if (!cards) {
                return;
            }

            const heading =
                '<div class="satori-section-heading">' +
                "<div>" +
                "<span>SATORII / SELECCIÓN</span>" +
                "<h2>TAMBIÉN TE PUEDE GUSTAR</h2>" +
                "</div>" +
                '<a href="' +
                root +
                'anime.html">VER COLECCIÓN</a>' +
                "</div>";

            section.innerHTML =
                heading +
                '<div class="satori-recommendation-grid" id="satoriRecommendationGrid">' +
                cards +
                "</div>";

        } catch (error) {
            console.warn(
                "SATORII · No se pudieron cargar recomendaciones desde Supabase.",
                error
            );
        }
    }

    async function initializeSupabase() {
        if (
            !SUPABASE_CONFIG.enabled
        ) {
            return;
        }

        try {
            const current =
                await updateCurrentProductFromSupabase();

            if (current) {
                await loadSupabaseRecommendations(
                    current
                );
            } else {
                await loadSupabaseRecommendations(
                    PRODUCT
                );
            }

            document.dispatchEvent(
                new CustomEvent(
                    "satorii:supabase-ready",
                    {
                        detail: {
                            product:
                                PRODUCT
                        }
                    }
                )
            );

        } catch (error) {
            console.warn(
                "SATORII · Supabase no pudo actualizar el producto.",
                error
            );
        }
    }

    initializeSupabase();

})();
</script>
`;
}

/* =========================================================
   GENERAR PÁGINA
========================================================= */

function generateProductPage(
    product,
    products
) {
    const productUrl =
        normalizeProductUrl(
            product
        );

    const outputPath =
        path.join(
            ROOT_DIR,
            ...productUrl.split("/")
        );

    fs.mkdirSync(
        path.dirname(outputPath),
        {
            recursive: true
        }
    );

    const root =
        getRootPrefix(
            productUrl
        );

    const firstImage =
        getFirstValidImage(
            product,
            productUrl
        );

    const bannerImage =
        getBannerImage(
            product,
            productUrl
        );

    const category =
        String(
            product.category ||
            product.collection ||
            "anime"
        );

    const recommendations =
        renderRecommendations(
            product,
            products,
            productUrl
        );

    const gallery =
        renderGallery(
            product,
            productUrl
        );

    const sizes =
        renderSizes(
            product
        );

    const colors =
        renderColors(
            product
        );

    const tabs =
        renderTabs(
            product
        );

    const firstSize =
        Array.isArray(product.sizes) &&
        product.sizes.length
            ? product.sizes[0]
            : "S";

    const firstColor =
        Array.isArray(product.colors) &&
        product.colors.length
            ? product.colors[0]
            : "Negro";

    const productData = {
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        category: product.category || "",
        collection: product.collection || "",
        available:
            product.available !== false,
        url: productUrl,
        image: firstImage,
        images: getProductImages(product),
        sizes:
            Array.isArray(product.sizes)
                ? product.sizes
                : [],
        colors:
            Array.isArray(product.colors)
                ? product.colors
                : []
    };

    const html = `<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="theme-color"
        content="${SATORII_DARK}"
    >

    <meta
        name="description"
        content="${escapeHTML(
            getDescription(product)
        )}"
    >

    <meta
        property="og:title"
        content="${escapeHTML(
            product.name
        )} | SATORII"
    >

    <meta
        property="og:description"
        content="${escapeHTML(
            getDescription(product)
        )}"
    >

    ${
        firstImage
            ? `
    <meta
        property="og:image"
        content="${escapeHTML(firstImage)}"
    >
    `
            : ""
    }

    <title>
        ${escapeHTML(product.name)} | SATORII
    </title>

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

    <link
        rel="stylesheet"
        href="${root}css/style.css"
    >

    <style>
        ${getPageCSS()}
    </style>

</head>

<body>

    <script src="${root}js/header.js"></script>

    <main class="satori-product-page">

        <div class="satori-breadcrumb satori-animate">
            <span>INICIO</span>
            <span>/</span>
            <span>${escapeHTML(category)}</span>
            <span>/</span>
            <span>${escapeHTML(product.name)}</span>
        </div>

        <section class="satori-product-layout">

            ${gallery}

            <div class="satori-product-info satori-animate">

                <div class="satori-product-category">
                    ${escapeHTML(
                        product.collection ||
                        product.category ||
                        "SATORII"
                    )}
                </div>

                <h1 class="satori-product-title">
                    ${escapeHTML(product.name)}
                </h1>

                <div class="satori-product-subtitle">
                    SATORII · ANIME STREETWEAR
                </div>

                <div
                    class="satori-price"
                    data-supabase-current-price
                >
                    ${formatPrice(product.price)}
                </div>

                <span class="satori-tax">
                    Impuestos incluidos.
                </span>

                <div class="satori-option">

                    <div class="satori-option-label">
                        <span>TALLA</span>

                        <a
                            href="${escapeHTML(
                                root +
                                "guia-tallas.html"
                            )}"
                        >
                            GUÍA DE TALLAS
                        </a>
                    </div>

                    <div class="satori-size-list">
                        ${sizes}
                    </div>

                </div>

                <div class="satori-option">

                    <div class="satori-option-label">
                        <span>COLOR</span>

                        <span id="selectedColorLabel">
                            ${escapeHTML(firstColor)}
                        </span>
                    </div>

                    <div class="satori-color-list">
                        ${colors}
                    </div>

                </div>

                <div class="satori-buy-block">

                    <span class="satori-option-label">
                        CANTIDAD
                    </span>

                    <div class="satori-buy-row">

                        <div class="satori-quantity">

                            <button
                                type="button"
                                data-quantity-minus
                                aria-label="Disminuir cantidad"
                            >
                                −
                            </button>

                            <span id="satoriQuantity">
                                1
                            </span>

                            <button
                                type="button"
                                data-quantity-plus
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>

                        </div>

                        <button
                            id="addToCart"
                            class="satori-add-to-cart add-to-cart"
                            type="button"

                            data-product-id="${escapeHTML(
                                product.id
                            )}"

                            data-product-name="${escapeHTML(
                                product.name
                            )}"

                            data-product-price="${Number(
                                product.price
                            )}"

                            data-product-image="${escapeHTML(
                                firstImage
                            )}"

                            data-product-url="${escapeHTML(
                                productUrl
                            )}"

                            data-product-size="${escapeHTML(
                                firstSize
                            )}"

                            data-product-color="${escapeHTML(
                                firstColor
                            )}"

                            data-product-quantity="1"
                        >
                            ${
                                product.available === false
                                    ? "AGOTADO"
                                    : "AGREGAR AL CARRITO"
                            }
                        </button>

                    </div>

                </div>

                <button
                    type="button"
                    id="satoriFavorite"
                    class="satori-favorite"
                >
                    ♡ &nbsp; AGREGAR A FAVORITOS
                </button>

                <div class="satori-benefits">

                    <div class="satori-benefit">
                        <strong>🚚 ENVÍOS A TODO CHILE</strong>
                        <span>Despachamos a todo el país.</span>
                    </div>

                    <div class="satori-benefit">
                        <strong>↻ CAMBIOS</strong>
                        <span>Cambios y devoluciones.</span>
                    </div>

                    <div class="satori-benefit">
                        <strong>◉ PAGO SEGURO</strong>
                        <span>Compra protegida.</span>
                    </div>

                </div>

            </div>

        </section>

        ${tabs}

    </main>

    <section class="satori-editorial satori-animate">

        ${
            bannerImage
                ? `
        <img
            src="${escapeHTML(bannerImage)}"
            alt=""
            loading="lazy"
            decoding="async"
        >
        `
                : ""
        }

        <div class="satori-editorial-content">

            <span>
                SATORII · ANIME ARCHIVE
            </span>

            <h2>
                ${escapeHTML(
                    product.bannerTitle ||
                    "EL UNIVERSO DETRÁS DE LA PRENDA"
                )}
            </h2>

            <p>
                ${escapeHTML(
                    product.bannerText ||
                    "Una pieza creada para llevar la identidad del anime y la cultura urbana contigo."
                )}
            </p>

        </div>

    </section>

    <main class="satori-product-page">

        ${recommendations}

    </main>

    <div id="satori-footer"></div>

    <script>
        window.SATORII_PRODUCT =
            ${safeJSONString(productData)};

        window.SATORII_SUPABASE_CONFIG = {
            enabled:
                ${SUPABASE_ENABLED ? "true" : "false"},

            url:
                ${safeJSONString(
                    SUPABASE_URL
                )},

            publishableKey:
                ${safeJSONString(
                    SUPABASE_PUBLISHABLE_KEY
                )}
        };
    </script>

    <script src="${root}js/products.js"></script>
    <script src="${root}js/cart.js"></script>
    <script src="${root}js/footer.js"></script>

    ${getProductScript(
        root,
        product,
        productUrl
    )}

</body>

</html>`;

    fs.writeFileSync(
        outputPath,
        html,
        "utf8"
    );

    console.log(
        `✓ Generado: ${productUrl}`
    );
}

/* =========================================================
   GENERAR TODO
========================================================= */

function generateAll() {
    console.log("");
    console.log("==============================================");
    console.log("SATORII · GENERADOR DE PRODUCTOS");
    console.log("==============================================");
    console.log("");

    const products =
        loadProducts();

    const availableProducts =
        products.filter(
            product =>
                product.available !== false
        );

    if (
        !availableProducts.length
    ) {
        console.warn(
            "No hay productos disponibles."
        );

        return;
    }

    fs.mkdirSync(
        PRODUCTS_DIR,
        {
            recursive: true
        }
    );

    let generated = 0;

    availableProducts.forEach(
        function (product) {
            try {
                generateProductPage(
                    product,
                    availableProducts
                );

                generated++;
            } catch (error) {
                console.error(
                    `✗ Error generando ${product.id}:`,
                    error
                );
            }
        }
    );

    console.log("");
    console.log("==============================================");
    console.log(
        `✓ ${generated} páginas generadas`
    );

    console.log(
        `✓ Supabase: ${
            SUPABASE_ENABLED
                ? "CONFIGURADO"
                : "NO CONFIGURADO"
        }`
    );

    console.log("==============================================");
    console.log("");
}

/* =========================================================
   EJECUTAR
========================================================= */

try {
    generateAll();
} catch (error) {
    console.error(
        "SATORII · Error fatal:",
        error
    );

    process.exit(1);
}
