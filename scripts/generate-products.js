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
        content="SATORII — Revisa tu carrito de compras."
    >

    <meta
        name="theme-color"
        content="#EF0930"
    >

    <title>Carrito | SATORII</title>


    <!-- =====================================================
         FAVICON
    ====================================================== -->

    <link
        rel="icon"
        type="image/png"
        href="img/logo.webp"
    >


    <!-- =====================================================
         ESTILOS GLOBALES
    ====================================================== -->

    <link
        rel="stylesheet"
        href="css/style.css"
    >

    <link
        rel="stylesheet"
        href="css/animations.css"
    >


    <style>

        /* =====================================================
           SATORII · CARRITO
           IDENTIDAD GLOBAL
        ====================================================== */

        :root {

            --satorii-red: #EF0930;
            --satorii-black: #111111;
            --satorii-white: #FFFFFF;
            --satorii-gray: #666666;
            --satorii-light: #F6F6F6;
            --satorii-border: #E5E5E5;

        }


        /* =====================================================
           PÁGINA
        ====================================================== */

        .satori-cart-page {

            width: 100%;

            min-height: 70vh;

            padding:
                80px
                30px
                100px;

            background:
                linear-gradient(
                    180deg,
                    #fff 0%,
                    #fafafa 100%
                );

        }


        .satori-cart-container {

            width:
                min(
                    1500px,
                    100%
                );

            margin:
                0 auto;

        }


        /* =====================================================
           CABECERA
        ====================================================== */

        .satori-cart-heading {

            position: relative;

            margin-bottom: 55px;

            padding-bottom: 28px;

            border-bottom:
                1px solid
                var(--satorii-border);

        }


        .satori-cart-label {

            display: block;

            margin-bottom: 16px;

            color:
                var(--satorii-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 3px;

        }


        .satori-cart-heading h1 {

            margin: 0;

            color:
                var(--satorii-black);

            font-size:
                clamp(
                    52px,
                    8vw,
                    100px
                );

            line-height: .82;

            font-weight: 950;

            letter-spacing: -6px;

            text-transform: uppercase;

        }


        .satori-cart-heading h1 span {

            color:
                var(--satorii-red);

        }


        .satori-cart-heading p {

            max-width: 620px;

            margin:
                24px 0 0;

            color:
                var(--satorii-gray);

            font-size: 11px;

            line-height: 1.8;

        }


        /* =====================================================
           LAYOUT
        ====================================================== */

        .satori-cart-layout {

            display: grid;

            grid-template-columns:
                minmax(0, 1fr)
                350px;

            gap: 55px;

            align-items: start;

        }


        /* =====================================================
           PRODUCTOS
        ====================================================== */

        .satori-cart-products {

            width: 100%;

            border-top:
                3px solid
                var(--satorii-black);

        }


        /* =====================================================
           PRODUCTO
        ====================================================== */

        .satori-cart-item {

            display: grid;

            grid-template-columns:
                140px
                minmax(0, 1fr)
                auto;

            gap: 24px;

            padding:
                25px 0;

            border-bottom:
                1px solid
                var(--satorii-border);

        }


        /* =====================================================
           IMAGEN
        ====================================================== */

        .satori-cart-image {

            width: 140px;

            aspect-ratio: 1 / 1;

            overflow: hidden;

            background:
                #f2f2f2;

            border-radius: 5px;

        }


        .satori-cart-image img {

            width: 100%;

            height: 100%;

            display: block;

            object-fit: cover;

            object-position: center;

            transition:
                transform .35s ease;

        }


        .satori-cart-item:hover
        .satori-cart-image img {

            transform:
                scale(1.035);

        }


        /* =====================================================
           INFORMACIÓN
        ====================================================== */

        .satori-cart-info {

            min-width: 0;

            padding-top: 3px;

        }


        .satori-cart-category {

            display: block;

            margin-bottom: 8px;

            color:
                var(--satorii-red);

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 2px;

        }


        .satori-cart-name {

            margin: 0;

            color:
                var(--satorii-black);

            font-size: 20px;

            font-weight: 900;

            line-height: 1.15;

            letter-spacing: -.5px;

        }


        .satori-cart-options {

            margin-top: 10px;

            color: #777;

            font-size: 10px;

            line-height: 1.7;

        }


        /* =====================================================
           PRECIO MÓVIL
        ====================================================== */

        .satori-cart-price-mobile {

            display: none;

            margin-top: 9px;

            color:
                var(--satorii-black);

            font-size: 13px;

            font-weight: 900;

        }


        /* =====================================================
           CONTROLES
        ====================================================== */

        .satori-cart-controls {

            display: flex;

            align-items: center;

            gap: 14px;

            margin-top: 20px;

        }


        .satori-cart-quantity {

            display: flex;

            align-items: center;

            height: 36px;

            overflow: hidden;

            border:
                1px solid #d5d5d5;

            border-radius: 4px;

            background: #fff;

        }


        .satori-cart-quantity button {

            width: 36px;

            height: 100%;

            padding: 0;

            border: 0;

            background: #fff;

            color:
                var(--satorii-black);

            font-size: 17px;

            cursor: pointer;

            transition:
                background .2s ease,
                color .2s ease;

        }


        .satori-cart-quantity button:hover {

            background:
                var(--satorii-red);

            color: #fff;

        }


        .satori-cart-quantity span {

            min-width: 38px;

            text-align: center;

            color:
                var(--satorii-black);

            font-size: 10px;

            font-weight: 900;

        }


        .satori-cart-remove {

            padding: 0;

            border: 0;

            background: transparent;

            color: #999;

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1px;

            cursor: pointer;

            transition:
                color .2s ease;

        }


        .satori-cart-remove:hover {

            color:
                var(--satorii-red);

        }


        /* =====================================================
           PRECIO TOTAL
        ====================================================== */

        .satori-cart-item-total {

            min-width: 120px;

            padding-top: 3px;

            color:
                var(--satorii-black);

            font-size: 15px;

            font-weight: 950;

            text-align: right;

            white-space: nowrap;

        }


        /* =====================================================
           RESUMEN
        ====================================================== */

        .satori-cart-summary {

            position: sticky;

            top: 90px;

            padding: 28px;

            background:
                var(--satorii-black);

            border-radius: 6px;

            color: #fff;

            box-shadow:
                0 15px 40px
                rgba(
                    0,
                    0,
                    0,
                    .08
                );

        }


        .satori-cart-summary-label {

            display: block;

            margin-bottom: 15px;

            color:
                var(--satorii-red);

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 3px;

        }


        .satori-cart-summary h2 {

            margin:
                0 0 25px;

            color: #fff;

            font-size: 23px;

            font-weight: 900;

            letter-spacing: -1px;

        }


        .satori-cart-summary-row {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            padding:
                15px 0;

            border-top:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .12
                );

        }


        .satori-cart-summary-row span {

            color: #aaa;

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1px;

        }


        .satori-cart-summary-row strong {

            color: #fff;

            font-size: 17px;

            font-weight: 950;

        }


        .satori-cart-shipping {

            margin:
                8px 0 22px;

            color: #888;

            font-size: 9px;

            line-height: 1.7;

        }


        /* =====================================================
           CHECKOUT
        ====================================================== */

        .satori-cart-checkout {

            width: 100%;

            min-height: 50px;

            border: 0;

            border-radius: 3px;

            background:
                var(--satorii-red);

            color: #fff;

            font-size: 9px;

            font-weight: 950;

            letter-spacing: 1.5px;

            cursor: pointer;

            transition:
                background .2s ease,
                transform .2s ease;

        }


        .satori-cart-checkout:hover {

            background: #fff;

            color: #111;

            transform:
                translateY(-2px);

        }


        /* =====================================================
           CONTINUAR COMPRANDO
        ====================================================== */

        .satori-cart-continue {

            display: block;

            margin-top: 17px;

            color: #aaa;

            text-align: center;

            text-decoration: none;

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1px;

            transition:
                color .2s ease;

        }


        .satori-cart-continue:hover {

            color:
                var(--satorii-red);

        }


        /* =====================================================
           VACIAR
        ====================================================== */

        .satori-cart-clear {

            width: 100%;

            margin-top: 25px;

            padding:
                13px 0;

            border: 0;

            border-top:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .12
                );

            background: transparent;

            color: #777;

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1px;

            cursor: pointer;

            transition:
                color .2s ease;

        }


        .satori-cart-clear:hover {

            color:
                var(--satorii-red);

        }


        /* =====================================================
           CARRITO VACÍO
        ====================================================== */

        .satori-cart-empty {

            position: relative;

            min-height: 500px;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

            padding:
                60px 20px;

            text-align: center;

            border-top:
                3px solid
                var(--satorii-black);

            overflow: hidden;

        }


        .satori-cart-empty::before {

            content: "S";

            position: absolute;

            right: 5%;

            bottom: -80px;

            color: #111;

            font-size: 320px;

            font-weight: 950;

            line-height: 1;

            opacity: .025;

            pointer-events: none;

        }


        .satori-cart-empty-label {

            position: relative;

            z-index: 2;

            margin-bottom: 12px;

            color:
                var(--satorii-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 3px;

        }


        .satori-cart-empty h2 {

            position: relative;

            z-index: 2;

            margin: 0;

            color:
                var(--satorii-black);

            font-size:
                clamp(
                    32px,
                    6vw,
                    58px
                );

            font-weight: 950;

            letter-spacing: -3px;

        }


        .satori-cart-empty p {

            position: relative;

            z-index: 2;

            max-width: 500px;

            margin:
                18px auto 28px;

            color:
                var(--satorii-gray);

            font-size: 11px;

            line-height: 1.8;

        }


        .satori-cart-empty-button {

            position: relative;

            z-index: 2;

            min-height: 46px;

            display: inline-flex;

            align-items: center;

            justify-content: center;

            padding:
                0 28px;

            border-radius: 3px;

            background:
                var(--satorii-black);

            color: #fff;

            text-decoration: none;

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1px;

            transition:
                background .2s ease,
                transform .2s ease;

        }


        .satori-cart-empty-button:hover {

            background:
                var(--satorii-red);

            transform:
                translateY(-2px);

        }


        /* =====================================================
           TABLET
        ====================================================== */

        @media (max-width: 900px) {

            .satori-cart-page {

                padding:
                    65px
                    20px
                    80px;

            }


            .satori-cart-layout {

                grid-template-columns: 1fr;

                gap: 40px;

            }


            .satori-cart-summary {

                position: static;

            }

        }


        /* =====================================================
           MÓVIL
        ====================================================== */

        @media (max-width: 650px) {

            .satori-cart-page {

                padding:
                    55px
                    15px
                    65px;

            }


            .satori-cart-heading {

                margin-bottom: 40px;

                padding-bottom: 22px;

            }


            .satori-cart-heading h1 {

                font-size: 52px;

                letter-spacing: -3px;

            }


            .satori-cart-heading p {

                font-size: 10px;

            }


            .satori-cart-item {

                grid-template-columns:
                    95px
                    minmax(0, 1fr);

                gap: 15px;

            }


            .satori-cart-image {

                width: 95px;

            }


            .satori-cart-item-total {

                display: none;

            }


            .satori-cart-price-mobile {

                display: block;

            }


            .satori-cart-name {

                font-size: 16px;

            }


            .satori-cart-options {

                font-size: 9px;

            }


            .satori-cart-controls {

                flex-wrap: wrap;

                gap: 9px;

                margin-top: 14px;

            }


            .satori-cart-summary {

                padding: 23px;

            }


            .satori-cart-empty {

                min-height: 420px;

            }


            .satori-cart-empty h2 {

                font-size: 36px;

                letter-spacing: -2px;

            }

        }


        /* =====================================================
           MÓVIL PEQUEÑO
        ====================================================== */

        @media (max-width: 380px) {

            .satori-cart-item {

                grid-template-columns:
                    82px
                    minmax(0, 1fr);

            }


            .satori-cart-image {

                width: 82px;

            }

        }


        /* =====================================================
           REDUCIR ANIMACIONES
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {

            .satori-cart-image img,
            .satori-cart-quantity button,
            .satori-cart-remove,
            .satori-cart-checkout,
            .satori-cart-continue,
            .satori-cart-clear,
            .satori-cart-empty-button {

                transition: none !important;

            }

        }

    </style>

</head>


<body>


    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div id="satori-header"></div>


    <!-- =====================================================
         CONTENIDO
    ====================================================== -->

    <main class="satori-cart-page satori-page-animate">

        <div
            class="
                satori-cart-container
            "
        >


            <header
                class="
                    satori-cart-heading
                    satori-content-animate
                "
            >

                <span
                    class="
                        satori-cart-label
                    "
                >

                    SATORII · SHOPPING CART

                </span>


                <h1>

                    TU CARRITO.

                </h1>


                <p>

                    Revisa tus productos antes de continuar.
                    Puedes modificar cantidades o eliminar
                    artículos cuando quieras.

                </p>

            </header>


            <div
                id="
                    satori-cart-page-content
                "
            ></div>


        </div>

    </main>


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <div id="satori-footer"></div>
<!-- =====================================================
         HEADER / FOOTER
    ====================================================== -->

    <script
        src="js/header.js"
    ></script>


    <script
        src="js/footer.js"
    ></script>


    <!-- =====================================================
         CARRITO GLOBAL
    ====================================================== -->

    <script
        src="js/cart.js"
    ></script>


    <!-- =====================================================
         RENDER DEL CARRITO
    ====================================================== -->

    <script>

        "use strict";

        /*
         * SATORII · CARRITO
         *
         * IMPORTANTE:
         * Esta página utiliza exactamente la misma clave que
         * cart.js y el mini-carrito del header.
         *
         * No depende de PRODUCTS, Supabase ni del catálogo.
         * El producto ya contiene nombre, precio, imagen,
         * talla, color y cantidad dentro de localStorage.
         */

        const SATORII_CART_KEY = "satorimode_cart";

        const cartContent =
            document.getElementById(
                "satori-cart-page-content"
            );


        /* =====================================================
           UTILIDADES
        ====================================================== */

        function getCart() {

            try {

                const saved =
                    localStorage.getItem(
                        SATORII_CART_KEY
                    );

                if (!saved) {
                    return [];
                }

                const parsed =
                    JSON.parse(saved);

                return Array.isArray(parsed)
                    ? parsed
                    : [];

            } catch (error) {

                console.error(
                    "SATORII · Error leyendo carrito:",
                    error
                );

                return [];

            }

        }


        function saveCart(cart) {

            const json =
                JSON.stringify(cart);

            try {

                localStorage.setItem(
                    SATORII_CART_KEY,
                    json
                );

                /* Compatibilidad */
                localStorage.setItem(
                    "satoriCart",
                    json
                );

                localStorage.setItem(
                    "satorimode-cart",
                    json
                );

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

            } catch (error) {

                console.error(
                    "SATORII · Error guardando carrito:",
                    error
                );

            }

        }


        function normalizeProduct(product) {

            return {

                ...product,

                id:
                    product?.id ??
                    product?.productId ??
                    "",

                productId:
                    product?.productId ??
                    product?.id ??
                    "",

                name:
                    product?.name ||
                    "Producto SATORII",

                price:
                    Number(
                        product?.price
                    ) || 0,

                image:
                    product?.image ||
                    product?.images?.[0] ||
                    "",

                quantity:
                    Math.max(
                        1,
                        Number(
                            product?.quantity
                        ) || 1
                    ),

                size:
                    product?.size || "",

                color:
                    product?.color || ""

            };

        }


        function formatPrice(price) {

            return new Intl.NumberFormat(
                "es-CL",
                {
                    style: "currency",
                    currency: "CLP",
                    maximumFractionDigits: 0
                }
            ).format(
                Number(price) || 0
            );

        }


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


        /* =====================================================
           RENDER
        ====================================================== */

        function renderCart() {

            if (!cartContent) {
                return;
            }

            const cart =
                getCart().map(
                    normalizeProduct
                );


            /* =================================================
               CARRITO VACÍO
            ================================================== */

            if (!cart.length) {

                cartContent.innerHTML = `

                    <section
                        class="
                            satori-cart-empty
                            satori-content-animate
                        "
                    >

                        <span
                            class="
                                satori-cart-empty-label
                            "
                        >
                            SATORII · CARRITO
                        </span>

                        <h2>
                            TU CARRITO
                            ESTÁ VACÍO.
                        </h2>

                        <p>
                            Aún no tienes productos
                            en tu carrito.

                            Explora nuestras colecciones
                            y encuentra algo que sea parte
                            de tu estilo.
                        </p>

                        <a
                            href="productos.html"
                            class="
                                satori-cart-empty-button
                            "
                        >
                            EXPLORAR PRODUCTOS
                        </a>

                    </section>

                `;

                return;

            }


            let subtotal = 0;
            let totalItems = 0;
            let productsHTML = "";


            /* =================================================
               PRODUCTOS
            ================================================== */

            cart.forEach(
                function (product, index) {

                    const quantity =
                        Math.max(
                            1,
                            Number(
                                product.quantity
                            ) || 1
                        );

                    const price =
                        Number(
                            product.price
                        ) || 0;

                    const itemTotal =
                        price * quantity;

                    subtotal += itemTotal;
                    totalItems += quantity;


                    let options = "";

                    if (product.size) {

                        options +=
                            "Talla: " +
                            escapeHTML(
                                product.size
                            );

                    }

                    if (product.color) {

                        if (options) {
                            options += " · ";
                        }

                        options +=
                            "Color: " +
                            escapeHTML(
                                product.color
                            );

                    }


                    const category =
                        product.collection ||
                        product.category ||
                        "SATORII";


                    productsHTML += `

                        <article
                            class="
                                satori-cart-item
                                satori-card-animate
                            "
                        >

                            <div
                                class="
                                    satori-cart-image
                                "
                            >

                                <img
                                    src="${escapeHTML(
                                        product.image
                                    )}"
                                    alt="${escapeHTML(
                                        product.name
                                    )}"
                                    loading="lazy"
                                >

                            </div>


                            <div
                                class="
                                    satori-cart-info
                                "
                            >

                                <span
                                    class="
                                        satori-cart-category
                                    "
                                >
                                    ${escapeHTML(
                                        String(
                                            category
                                        ).toUpperCase()
                                    )}
                                </span>


                                <h2
                                    class="
                                        satori-cart-name
                                    "
                                >
                                    ${escapeHTML(
                                        product.name
                                    )}
                                </h2>


                                ${
                                    options
                                        ? `
                                            <div
                                                class="
                                                    satori-cart-options
                                                "
                                            >
                                                ${options}
                                            </div>
                                        `
                                        : ""
                                }


                                <div
                                    class="
                                        satori-cart-price-mobile
                                    "
                                >
                                    ${formatPrice(
                                        itemTotal
                                    )}
                                </div>


                                <div
                                    class="
                                        satori-cart-controls
                                    "
                                >

                                    <div
                                        class="
                                            satori-cart-quantity
                                        "
                                    >

                                        <button
                                            type="button"
                                            data-cart-decrease="${index}"
                                            aria-label="Disminuir cantidad"
                                        >
                                            −
                                        </button>

                                        <span>
                                            ${quantity}
                                        </span>

                                        <button
                                            type="button"
                                            data-cart-increase="${index}"
                                            aria-label="Aumentar cantidad"
                                        >
                                            +
                                        </button>

                                    </div>


                                    <button
                                        type="button"
                                        class="
                                            satori-cart-remove
                                        "
                                        data-cart-remove="${index}"
                                    >
                                        ELIMINAR
                                    </button>

                                </div>

                            </div>


                            <div
                                class="
                                    satori-cart-item-total
                                "
                            >
                                ${formatPrice(
                                    itemTotal
                                )}
                            </div>

                        </article>

                    `;

                }
            );


            /* =================================================
               ESTRUCTURA
            ================================================== */

            cartContent.innerHTML = `

                <div
                    class="
                        satori-cart-layout
                        satori-content-animate
                    "
                >

                    <section
                        class="
                            satori-cart-products
                        "
                    >
                        ${productsHTML}
                    </section>


                    <aside
                        class="
                            satori-cart-summary
                        "
                    >

                        <span
                            class="
                                satori-cart-summary-label
                            "
                        >
                            SATORII · RESUMEN
                        </span>


                        <h2>
                            RESUMEN DEL PEDIDO
                        </h2>


                        <div
                            class="
                                satori-cart-summary-row
                            "
                        >

                            <span>
                                PRODUCTOS
                            </span>

                            <strong>
                                ${totalItems}
                            </strong>

                        </div>


                        <div
                            class="
                                satori-cart-summary-row
                            "
                        >

                            <span>
                                SUBTOTAL
                            </span>

                            <strong>
                                ${formatPrice(
                                    subtotal
                                )}
                            </strong>

                        </div>


                        <p
                            class="
                                satori-cart-shipping
                            "
                        >
                            El envío se calculará
                            durante el proceso
                            de compra.
                        </p>


                        <button
                            type="button"
                            class="
                                satori-cart-checkout
                            "
                            id="satori-cart-checkout"
                        >
                            CONTINUAR CON LA COMPRA
                        </button>


                        <a
                            href="productos.html"
                            class="
                                satori-cart-continue
                            "
                        >
                            ← SEGUIR COMPRANDO
                        </a>


                        <button
                            type="button"
                            class="
                                satori-cart-clear
                            "
                            id="satori-cart-clear"
                        >
                            VACIAR CARRITO
                        </button>

                    </aside>

                </div>

            `;


            /* =================================================
               EVENTOS
            ================================================== */

            cartContent
                .querySelectorAll(
                    "[data-cart-decrease]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                const index =
                                    Number(
                                        button.dataset
                                            .cartDecrease
                                    );

                                const current =
                                    getCart();

                                if (!current[index]) {
                                    return;
                                }

                                const quantity =
                                    Math.max(
                                        1,
                                        Number(
                                            current[index]
                                                .quantity
                                        ) || 1
                                    );

                                current[index].quantity =
                                    quantity - 1;

                                if (
                                    current[index]
                                        .quantity <= 0
                                ) {

                                    current.splice(
                                        index,
                                        1
                                    );

                                }

                                saveCart(
                                    current
                                );

                                renderCart();

                            }
                        );

                    }
                );


            cartContent
                .querySelectorAll(
                    "[data-cart-increase]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                const index =
                                    Number(
                                        button.dataset
                                            .cartIncrease
                                    );

                                const current =
                                    getCart();

                                if (!current[index]) {
                                    return;
                                }

                                const quantity =
                                    Math.max(
                                        1,
                                        Number(
                                            current[index]
                                                .quantity
                                        ) || 1
                                    );

                                current[index].quantity =
                                    quantity + 1;

                                saveCart(
                                    current
                                );

                                renderCart();

                            }
                        );

                    }
                );


            cartContent
                .querySelectorAll(
                    "[data-cart-remove]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                const index =
                                    Number(
                                        button.dataset
                                            .cartRemove
                                    );

                                const current =
                                    getCart();

                                if (!current[index]) {
                                    return;
                                }

                                current.splice(
                                    index,
                                    1
                                );

                                saveCart(
                                    current
                                );

                                renderCart();

                            }
                        );

                    }
                );


            document
                .getElementById(
                    "satori-cart-clear"
                )
                ?.addEventListener(
                    "click",
                    function () {

                        const confirmed =
                            confirm(
                                "¿Seguro que quieres vaciar el carrito?"
                            );

                        if (!confirmed) {
                            return;
                        }

                        saveCart([]);

                        renderCart();

                    }
                );


            document
                .getElementById(
                    "satori-cart-checkout"
                )
                ?.addEventListener(
                    "click",
                    function () {

                        if (!getCart().length) {
                            return;
                        }

                        window.location.href =
                            "checkout.html";

                    }
                );

        }


        /* =====================================================
           INICIO
        ====================================================== */

        if (
            document.readyState ===
            "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                renderCart
            );

        } else {

            renderCart();

        }


        /* =====================================================
           SINCRONIZACIÓN
        ====================================================== */

        document.addEventListener(
            "satorii:cart-updated",
            renderCart
        );

        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                    SATORII_CART_KEY
                ) {

                    renderCart();

                }

            }
        );

    </script>


    <script src="js/animations.js" defer></script>

</body>

</html>
