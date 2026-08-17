/*
=========================================================
 SATORII
 GENERADOR AUTOMÁTICO DE PÁGINAS DE PRODUCTOS
=========================================================

 Lee:
    js/products.js

 Genera automáticamente:

    productos/anime/...
    productos/streetwear/...
    productos/accesorios/...

 Cada producto utiliza la misma plantilla visual.
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
   MÁXIMO 3 IMÁGENES
===================================================== */

function generateGallery(
    product,
    outputDirectory
) {

    let images =
        Array.isArray(product.images) &&
        product.images.length
            ? product.images
            : product.image
                ? [product.image]
                : [];


    /* Máximo 3 imágenes */

    images = images.slice(0, 3);


    if (!images.length) {

        return `

            <div class="satori-gallery">

                <div class="satori-main-image">

                    <div class="satori-image-placeholder">
                        SIN IMAGEN
                    </div>

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
                        class="satori-thumbnail ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-image="${escapeHTML(
                            imagePath
                        )}"
                        aria-label="Ver imagen ${index + 1}"
                    >

                        <img
                            src="${escapeHTML(
                                imagePath
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

            })
            .join("");


    return `

        <div class="satori-gallery">


            <div class="satori-main-image">

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


            ${
                images.length > 1
                    ? `
                        <div class="satori-thumbnails">

                            ${thumbnails}

                        </div>
                      `
                    : ""
            }


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

        <div class="satori-option">


            <div class="satori-option-header">

                <span>
                    TALLA
                </span>


                <a
                    href="../../guia-tallas.html"
                    class="satori-size-guide"
                >
                    GUÍA DE TALLAS
                </a>

            </div>


            <div class="satori-size-options">

                ${product.sizes
                    .map(function (size, index) {

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

        <div class="satori-option">


            <div class="satori-option-title">

                COLOR

            </div>


            <div class="satori-color-options">

                ${product.colors
                    .map(function (color, index) {

                        const colorName =
                            String(color)
                                .toLowerCase()
                                .trim();


                        let colorClass =
                            "color-default";


                        if (
                            colorName === "blanco" ||
                            colorName === "white"
                        ) {

                            colorClass =
                                "color-white";

                        }


                        if (
                            colorName === "negro" ||
                            colorName === "black"
                        ) {

                            colorClass =
                                "color-black";

                        }


                        if (
                            colorName === "rojo" ||
                            colorName === "red"
                        ) {

                            colorClass =
                                "color-red";

                        }


                        if (
                            colorName === "azul" ||
                            colorName === "blue"
                        ) {

                            colorClass =
                                "color-blue";

                        }


                        if (
                            colorName === "verde" ||
                            colorName === "green"
                        ) {

                            colorClass =
                                "color-green";

                        }


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
                            >

                                <span
                                    class="satori-color-dot ${colorClass}"
                                ></span>

                                <span class="satori-color-name">

                                    ${escapeHTML(
                                        color
                                    )}

                                </span>

                            </button>

                        `;

                    })
                    .join("")}

            </div>


        </div>

    `;

}


/* =====================================================
   HTML COMPLETO
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
            "SATORII"
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


    const categoryPath =
        normalizeCategory(
            product.category
        );


    const description =
        product.details?.description ||
        product.description ||
        "Producto SATORII.";


    const care =
        product.details?.care ||
        "";


    const shipping =
        product.details?.shipping ||
        "Enviamos a todo Chile.";


    const warranty =
        product.details?.warranty ||
        "Todos nuestros productos cuentan con garantía.";


    const mainProductImage =
        product.image ||
        (
            Array.isArray(product.images) &&
            product.images.length
                ? product.images[0]
                : ""
        );


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

        /* =================================================
           SATORII PRODUCT PAGE
        ================================================= */


        .satori-product-page {

            width: 100%;

            background: #fff;

            color: #111827;

        }


        .satori-product-container {

            width: min(
                1400px,
                calc(100% - 48px)
            );

            margin: 0 auto;

            padding:
                35px 0 55px;

        }


        /* =================================================
           BREADCRUMB
        ================================================= */


        .satori-breadcrumb {

            display: flex;

            align-items: center;

            gap: 7px;

            margin-bottom: 24px;

            font-size: 12px;

            color: #777;

        }


        .satori-breadcrumb a {

            color: #777;

            text-decoration: none;

        }


        .satori-breadcrumb-current {

            color: #111827;

            font-weight: 700;

        }


        /* =================================================
           LAYOUT
        ================================================= */


        .satori-product-layout {

            display: grid;

            grid-template-columns:
                minmax(0, 1.35fr)
                minmax(350px, .85fr);

            gap: 55px;

            align-items: start;

        }


        /* =================================================
           GALERÍA
        ================================================= */


        .satori-gallery {

            width: 100%;

        }


        .satori-main-image {

            width: 100%;

            aspect-ratio: 1 / 1;

            background: #f7f7f7;

            border-radius: 18px;

            overflow: hidden;

            display: flex;

            align-items: center;

            justify-content: center;

        }


        .satori-main-image img {

            width: 100%;

            height: 100%;

            object-fit: contain;

            display: block;

            transition:
                transform .3s ease;

        }


        .satori-main-image:hover img {

            transform: scale(1.015);

        }


        .satori-image-placeholder {

            color: #999;

            font-size: 13px;

            letter-spacing: .08em;

        }


        /* =================================================
           MINIATURAS
        ================================================= */


        .satori-thumbnails {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 10px;

            margin-top: 10px;

            max-width: 330px;

        }


        .satori-thumbnail {

            width: 100%;

            aspect-ratio: 1 / 1;

            padding: 0;

            border:
                1px solid #dedede;

            background: #f7f7f7;

            border-radius: 10px;

            overflow: hidden;

            cursor: pointer;

            transition:
                border-color .2s ease,
                transform .2s ease;

        }


        .satori-thumbnail:hover {

            transform:
                translateY(-1px);

        }


        .satori-thumbnail.active {

            border:
                2px solid #111827;

        }


        .satori-thumbnail img {

            width: 100%;

            height: 100%;

            object-fit: cover;

            display: block;

        }


        /* =================================================
           INFORMACIÓN
        ================================================= */


        .satori-product-info {

            position: sticky;

            top: 100px;

        }


        .satori-category {

            display: block;

            margin-bottom: 9px;

            font-size: 11px;

            font-weight: 800;

            letter-spacing: .12em;

            text-transform: uppercase;

            color: #777;

        }


        .satori-product-title {

            margin: 0;

            font-size: clamp(
                30px,
                3vw,
                44px
            );

            line-height: 1.05;

            letter-spacing: -.04em;

            font-weight: 850;

        }


        .satori-rating {

            display: flex;

            align-items: center;

            gap: 8px;

            margin-top: 12px;

            color: #777;

            font-size: 11px;

        }


        .satori-stars {

            color: #111827;

            letter-spacing: 1px;

        }


        .satori-price {

            margin-top: 17px;

            font-size: 27px;

            font-weight: 850;

        }


        .satori-price-note {

            margin-top: 4px;

            color: #888;

            font-size: 10px;

        }


        .satori-divider {

            width: 100%;

            height: 1px;

            margin:
                24px 0;

            background: #e8e8e8;

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

            margin-bottom: 10px;

            font-size: 11px;

            font-weight: 850;

            letter-spacing: .05em;

        }


        .satori-option-title {

            margin-bottom: 10px;

            font-size: 11px;

            font-weight: 850;

            letter-spacing: .05em;

        }


        .satori-size-guide {

            color: #111827;

            font-size: 10px;

            font-weight: 700;

            letter-spacing: 0;

            text-decoration: underline;

        }


        .satori-size-options {

            display: flex;

            flex-wrap: wrap;

            gap: 8px;

        }


        .satori-size {

            min-width: 48px;

            height: 43px;

            padding: 0 13px;

            border:
                1px solid #d7d7d7;

            border-radius: 7px;

            background: #fff;

            font-size: 11px;

            font-weight: 750;

            cursor: pointer;

            transition:
                .2s ease;

        }


        .satori-size:hover {

            border-color: #111827;

        }


        .satori-size.active {

            background: #111827;

            color: #fff;

            border-color: #111827;

        }


        /* =================================================
           COLORES
        ================================================= */


        .satori-color-options {

            display: flex;

            flex-wrap: wrap;

            gap: 8px;

        }


        .satori-color {

            display: inline-flex;

            align-items: center;

            gap: 7px;

            min-height: 38px;

            padding:
                0 12px;

            border:
                1px solid #d8d8d8;

            background: #fff;

            border-radius: 999px;

            cursor: pointer;

            font-size: 11px;

            font-weight: 700;

            transition:
                .2s ease;

        }


        .satori-color:hover {

            border-color: #111827;

        }


        .satori-color.active {

            background: #111827;

            color: #fff;

            border-color: #111827;

        }


        .satori-color-dot {

            width: 16px;

            height: 16px;

            border-radius: 50%;

            border:
                1px solid #cfcfcf;

            flex-shrink: 0;

        }


        .color-white {

            background: #fff;

        }


        .color-black {

            background: #111;

        }


        .color-red {

            background: #ff003c;

        }


        .color-blue {

            background: #2563eb;

        }


        .color-green {

            background: #22c55e;

        }


        .color-default {

            background:
                linear-gradient(
                    135deg,
                    #ddd,
                    #777
                );

        }


        /* =================================================
           CANTIDAD
        ================================================= */


        .satori-quantity-row {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-top: 24px;

        }


        .satori-quantity-label {

            font-size: 11px;

            font-weight: 850;

            letter-spacing: .05em;

        }


        .satori-quantity {

            height: 42px;

            display: flex;

            align-items: center;

            border:
                1px solid #d8d8d8;

            border-radius: 7px;

            overflow: hidden;

        }


        .satori-quantity button {

            width: 38px;

            height: 100%;

            border: 0;

            background: #fff;

            font-size: 17px;

            cursor: pointer;

        }


        .satori-quantity button:hover {

            background: #f5f5f5;

        }


        .satori-quantity span {

            width: 38px;

            text-align: center;

            font-size: 11px;

            font-weight: 800;

        }


        /* =================================================
           BOTÓN ROJO SATORII
        ================================================= */


        .satori-add-cart {

            width: 100%;

            min-height: 56px;

            margin-top: 18px;

            border: 0;

            border-radius: 8px;

            background: #ff003c;

            color: #fff;

            font-size: 12px;

            font-weight: 850;

            letter-spacing: .04em;

            cursor: pointer;

            transition:
                transform .2s ease,
                background .2s ease;

        }


        .satori-add-cart:hover {

            background: #e60036;

            transform:
                translateY(-1px);

        }


        .satori-add-cart.added {

            background: #111827;

        }


        /* =================================================
           3 BENEFICIOS
           SOLO AQUÍ
        ================================================= */


        .satori-mini-benefits {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            margin-top: 9px;

            border:
                1px solid #e5e5e5;

            border-radius: 8px;

            overflow: hidden;

        }


        .satori-mini-benefit {

            min-height: 72px;

            padding:
                10px 7px;

            text-align: center;

            border-right:
                1px solid #e5e5e5;

        }


        .satori-mini-benefit:last-child {

            border-right: 0;

        }


        .satori-mini-benefit-icon {

            font-size: 14px;

            margin-bottom: 5px;

        }


        .satori-mini-benefit strong {

            display: block;

            font-size: 9px;

            font-weight: 850;

        }


        .satori-mini-benefit span {

            display: block;

            margin-top: 2px;

            color: #888;

            font-size: 8px;

        }


        /* =================================================
           INFORMACIÓN
        ================================================= */


        .satori-info-box {

            margin-top: 10px;

            border:
                1px solid #e5e5e5;

            border-radius: 8px;

            overflow: hidden;

        }


        .satori-info-tabs {

            display: grid;

            grid-template-columns:
                1fr 1fr;

            border-bottom:
                1px solid #e5e5e5;

        }


        .satori-info-tab {

            padding:
                13px 8px;

            border: 0;

            background: #f7f7f7;

            font-size: 9px;

            font-weight: 850;

            cursor: pointer;

        }


        .satori-info-tab + .satori-info-tab {

            border-left:
                1px solid #e5e5e5;

        }


        .satori-info-tab.active {

            background: #fff;

        }


        .satori-info-content {

            display: none;

            padding: 18px;

        }


        .satori-info-content.active {

            display: block;

        }


        .satori-info-content h3 {

            margin:
                0 0 9px;

            font-size: 12px;

        }


        .satori-info-content p {

            margin: 0;

            color: #555;

            font-size: 10px;

            line-height: 1.65;

        }


        .satori-shipping-item {

            padding:
                11px 0;

            border-bottom:
                1px solid #eee;

        }


        .satori-shipping-item:first-child {

            padding-top: 0;

        }


        .satori-shipping-item:last-child {

            padding-bottom: 0;

            border-bottom: 0;

        }


        .satori-shipping-item strong {

            display: block;

            margin-bottom: 4px;

            font-size: 10px;

        }


        /* =================================================
           PRODUCTOS RELACIONADOS
        ================================================= */


        .satori-related {

            width: min(
                1400px,
                calc(100% - 48px)
            );

            margin: 0 auto;

            padding:
                45px 0 70px;

            border-top:
                1px solid #eee;

        }


        .satori-related-heading {

            margin-bottom: 18px;

        }


        .satori-related-eyebrow {

            display: block;

            margin-bottom: 5px;

            color: #777;

            font-size: 9px;

            font-weight: 850;

            letter-spacing: .13em;

        }


        .satori-related-heading h2 {

            margin: 0;

            font-size: 25px;

            line-height: 1.05;

            letter-spacing: -.035em;

        }


        .satori-related-heading p {

            margin:
                5px 0 0;

            color: #777;

            font-size: 10px;

        }


        /* =================================================
           LIMITAR PRODUCTOS RELACIONADOS
        ================================================= */


        #relatedProductsGrid {

            display: grid !important;

            grid-template-columns:
                repeat(4, minmax(0, 1fr));

            gap: 18px;

            align-items: start;

        }


        #relatedProductsGrid > * {

            min-width: 0;

        }


        #relatedProductsGrid img {

            width: 100% !important;

            height: auto !important;

            max-height: 280px !important;

            object-fit: contain !important;

            display: block;

        }


        #relatedProductsGrid .product-card {

            overflow: hidden;

        }


        /* =================================================
           FOOTER
        ================================================= */


        .site-footer {

            width: 100%;

            margin-top: 0;

            background: #111827;

            color: #fff;

        }


        .footer-main {

            width: min(
                1400px,
                calc(100% - 48px)
            );

            margin: 0 auto;

            padding:
                45px 0;

            display: grid;

            grid-template-columns:
                1.5fr 1fr 1fr;

            gap: 50px;

        }


        .footer-brand h3 {

            margin: 0 0 8px;

            font-size: 21px;

            letter-spacing: -.02em;

        }


        .footer-brand p {

            margin: 0;

            color: #cbd0d8;

            font-size: 11px;

            line-height: 1.6;

        }


        .footer-column {

            display: flex;

            flex-direction: column;

            gap: 8px;

        }


        .footer-column h4 {

            margin:
                0 0 7px;

            font-size: 10px;

            letter-spacing: .08em;

        }


        .footer-column a {

            color: #cbd0d8;

            text-decoration: none;

            font-size: 10px;

            transition:
                color .2s ease;

        }


        .footer-column a:hover {

            color: #ff003c;

        }


        .footer-bottom {

            width: min(
                1400px,
                calc(100% - 48px)
            );

            margin: 0 auto;

            padding:
                17px 0;

            border-top:
                1px solid rgba(
                    255,
                    255,
                    255,
                    .1
                );

            display: flex;

            justify-content: space-between;

            gap: 20px;

            color: #9ca3af;

            font-size: 9px;

        }


        /* =================================================
           RESPONSIVE
        ================================================= */


        @media (max-width: 1050px) {

            .satori-product-layout {

                grid-template-columns:
                    1fr;

                gap: 38px;

            }


            .satori-product-info {

                position: static;

            }

        }


        @media (max-width: 750px) {

            .satori-product-container,
            .satori-related {

                width:
                    calc(100% - 28px);

            }


            .satori-product-container {

                padding-top: 22px;

            }


            .satori-product-title {

                font-size: 30px;

            }


            .satori-main-image {

                border-radius: 14px;

            }


            #relatedProductsGrid {

                grid-template-columns:
                    repeat(2, minmax(0, 1fr));

                gap: 12px;

            }


            #relatedProductsGrid img {

                max-height: 210px !important;

            }


            .footer-main {

                width:
                    calc(100% - 28px);

                grid-template-columns:
                    1fr 1fr;

                gap: 30px;

            }


            .footer-brand {

                grid-column:
                    1 / -1;

            }


            .footer-bottom {

                width:
                    calc(100% - 28px);

                flex-direction: column;

                gap: 5px;

            }

        }


        @media (max-width: 480px) {

            .satori-mini-benefit {

                min-height: 68px;

                padding:
                    9px 4px;

            }


            .satori-mini-benefit strong {

                font-size: 8px;

            }


            .satori-mini-benefit span {

                font-size: 7px;

            }


            #relatedProductsGrid {

                grid-template-columns:
                    1fr 1fr;

            }


            .footer-main {

                grid-template-columns:
                    1fr;

            }


            .footer-brand {

                grid-column:
                    auto;

            }

        }


    </style>


</head>


<body>


    <!-- =================================================
         HEADER
    ================================================== -->


    <div id="satori-header"></div>


    <!-- =================================================
         PRODUCTO
    ================================================== -->


    <main class="satori-product-page">


        <section class="satori-product-container">


            <!-- =========================================
                 BREADCRUMB
            ========================================== -->


            <nav class="satori-breadcrumb">

                <a href="../../index.html">
                    Inicio
                </a>

                <span>/</span>

                <a href="../../productos.html">
                    Productos
                </a>

                <span>/</span>

                <span class="satori-breadcrumb-current">
                    ${name}
                </span>

            </nav>


            <!-- =========================================
                 PRODUCTO PRINCIPAL
            ========================================== -->


            <div class="satori-product-layout">


                <!-- GALERÍA -->

                ${gallery}


                <!-- INFORMACIÓN -->

                <div class="satori-product-info">


                    <span class="satori-category">

                        ${category}

                    </span>


                    <h1 class="satori-product-title">

                        ${name}

                    </h1>


                    <div class="satori-rating">

                        <span class="satori-stars">
                            ★★★★★
                        </span>

                        <span>
                            Producto SATORII
                        </span>

                    </div>


                    <div class="satori-price">

                        ${price}

                    </div>


                    <div class="satori-price-note">

                        Precio final del producto

                    </div>


                    <div class="satori-divider"></div>


                    ${colors}


                    ${sizes}


                    <!-- CANTIDAD -->


                    <div class="satori-quantity-row">


                        <span class="satori-quantity-label">

                            CANTIDAD

                        </span>


                        <div class="satori-quantity">


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


                    <!-- CARRITO -->


                    <button
                        type="button"
                        class="satori-add-cart"
                        id="addToCart"
                        data-product-id="${escapeHTML(
                            product.id
                        )}"
                    >

                        AGREGAR AL CARRITO · ${price}

                    </button>


                    <!-- SOLO UN BLOQUE DE BENEFICIOS -->


                    <div class="satori-mini-benefits">


                        <div class="satori-mini-benefit">

                            <div class="satori-mini-benefit-icon">
                                🚚
                            </div>

                            <strong>
                                ENVÍOS
                            </strong>

                            <span>
                                A todo Chile
                            </span>

                        </div>


                        <div class="satori-mini-benefit">

                            <div class="satori-mini-benefit-icon">
                                🔒
                            </div>

                            <strong>
                                COMPRA SEGURA
                            </strong>

                            <span>
                                Compra protegida
                            </span>

                        </div>


                        <div class="satori-mini-benefit">

                            <div class="satori-mini-benefit-icon">
                                ✦
                            </div>

                            <strong>
                                CALIDAD SATORII
                            </strong>

                            <span>
                                Calidad seleccionada
                            </span>

                        </div>


                    </div>


                    <!-- INFORMACIÓN -->


                    <div class="satori-info-box">


                        <div class="satori-info-tabs">


                            <button
                                type="button"
                                class="satori-info-tab active"
                                data-tab="description"
                            >

                                DESCRIPCIÓN

                            </button>


                            <button
                                type="button"
                                class="satori-info-tab"
                                data-tab="shipping"
                            >

                                ENVÍOS Y GARANTÍA

                            </button>


                        </div>


                        <div
                            class="satori-info-content active"
                            data-content="description"
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
                                        <p
                                            style="
                                                margin-top:12px;
                                            "
                                        >

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
                            class="satori-info-content"
                            data-content="shipping"
                        >


                            <div class="satori-shipping-item">

                                <strong>
                                    ENVÍOS
                                </strong>

                                <p>
                                    ${escapeHTML(
                                        shipping
                                    )}
                                </p>

                            </div>


                            <div class="satori-shipping-item">

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


                    </div>


                </div>


            </div>


        </section>


        <!-- =================================================
             PRODUCTOS RELACIONADOS
        ================================================== -->


        <section class="satori-related">


            <div class="satori-related-heading">


                <span class="satori-related-eyebrow">

                    SATORII · DESCUBRE MÁS

                </span>


                <h2>

                    TAMBIÉN TE PUEDE GUSTAR

                </h2>


                <p>

                    Descubre otros diseños que podrían gustarte.

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
                    SATORII
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
                    Todos los productos
                </a>

                <a href="../../carrito.html">
                    Carrito
                </a>

            </div>


        </div>


        <div class="footer-bottom">


            <span>
                © 2026 SATORII
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


    <script>


        document.addEventListener(
            "DOMContentLoaded",
            function () {


                /* =====================================
                   VARIABLES
                ====================================== */


                const productId =
                    "${escapeHTML(product.id)}";


                let selectedSize =
                    ${
                        product.sizes &&
                        product.sizes.length
                            ? JSON.stringify(
                                product.sizes[0]
                              )
                            : "null"
                    };


                let selectedColor =
                    ${
                        product.colors &&
                        product.colors.length
                            ? JSON.stringify(
                                product.colors[0]
                              )
                            : "null"
                    };


                let amount = 1;


                /* =====================================
                   TALLAS
                ====================================== */


                const sizeButtons =
                    document.querySelectorAll(
                        ".satori-size"
                    );


                sizeButtons.forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                selectedSize =
                                    this.dataset.size;


                                sizeButtons.forEach(
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
                   COLORES
                ====================================== */


                const colorButtons =
                    document.querySelectorAll(
                        ".satori-color"
                    );


                colorButtons.forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                selectedColor =
                                    this.dataset.color;


                                colorButtons.forEach(
                                    function (item) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                /*
                                 * El color seleccionado
                                 * se vuelve negro.
                                 */

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
                   CARRITO
                ====================================== */


                const addToCart =
                    document.getElementById(
                        "addToCart"
                    );


                if (addToCart) {

                    addToCart.addEventListener(
                        "click",
                        function () {


                            let cart = [];


                            try {

                                cart =
                                    JSON.parse(
                                        localStorage.getItem(
                                            "satorimode-cart"
                                        )
                                    ) || [];

                            } catch (error) {

                                cart = [];

                            }


                            const existingIndex =
                                cart.findIndex(
                                    function (item) {

                                        return (

                                            item.productId ===
                                                productId &&

                                            item.size ===
                                                selectedSize &&

                                            item.color ===
                                                selectedColor

                                        );

                                    }
                                );


                            if (
                                existingIndex !==
                                -1
                            ) {

                                cart[
                                    existingIndex
                                ].quantity += amount;

                            } else {

                                cart.push({

                                    productId:
                                        productId,

                                    name:
                                        ${JSON.stringify(
                                            product.name
                                        )},

                                    price:
                                        ${Number(
                                            product.price || 0
                                        )},

                                    image:
                                        ${JSON.stringify(
                                            mainProductImage
                                        )},

                                    size:
                                        selectedSize,

                                    color:
                                        selectedColor,

                                    quantity:
                                        amount

                                });

                            }


                            /*
                             * GUARDAR
                             */

                            localStorage.setItem(
                                "satorimode-cart",
                                JSON.stringify(cart)
                            );


                            /*
                             * Avisar al resto
                             * de la página.
                             */

                            window.dispatchEvent(
                                new CustomEvent(
                                    "satoriCartUpdated",
                                    {
                                        detail: {
                                            cart: cart
                                        }
                                    }
                                )
                            );


                            window.dispatchEvent(
                                new Event(
                                    "storage"
                                )
                            );


                            /*
                             * Actualizar contadores
                             */

                            const totalItems =
                                cart.reduce(
                                    function (
                                        total,
                                        item
                                    ) {

                                        return (
                                            total +
                                            Number(
                                                item.quantity ||
                                                0
                                            )
                                        );

                                    },
                                    0
                                );


                            document
                                .querySelectorAll(
                                    "[data-cart-count], .cart-count, .cart-counter"
                                )
                                .forEach(
                                    function (
                                        counter
                                    ) {

                                        counter.textContent =
                                            totalItems;

                                    }
                                );


                            /*
                             * Confirmación
                             */

                            const originalText =
                                addToCart.textContent;


                            addToCart.textContent =
                                "✓ AGREGADO AL CARRITO";


                            addToCart.classList.add(
                                "added"
                            );


                            setTimeout(
                                function () {

                                    addToCart.textContent =
                                        originalText;

                                    addToCart.classList.remove(
                                        "added"
                                    );

                                },
                                1800
                            );


                            console.log(
                                "SATORII · producto agregado:",
                                {
                                    productId,
                                    selectedSize,
                                    selectedColor,
                                    amount
                                }
                            );


                        }
                    );

                }


                /* =====================================
                   PESTAÑAS
                ====================================== */


                const infoTabs =
                    document.querySelectorAll(
                        ".satori-info-tab"
                    );


                const infoContents =
                    document.querySelectorAll(
                        ".satori-info-content"
                    );


                infoTabs.forEach(
                    function (tab) {

                        tab.addEventListener(
                            "click",
                            function () {


                                const selectedTab =
                                    this.dataset.tab;


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
                        ".satori-thumbnail"
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
        "SATORII · iniciando generación..."
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
        "SATORII · generación completada."
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
