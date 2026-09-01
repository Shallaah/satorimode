/* =========================================================
   SATORII · CARRITO GLOBAL
   ---------------------------------------------------------
   ✓ LocalStorage principal: satorimode_cart
   ✓ Compatibilidad con satorii_cart
   ✓ Lee datos del botón de producto
   ✓ Precio compatible con catálogo local
   ✓ Actualiza Header mediante satori-cart-updated
   ✓ Animación al agregar
   ✓ Toast global autocontenido
   ✓ Iconos SVG consistentes entre dispositivos
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const CART_KEY =
        "satorimode_cart";

    const OLD_CART_KEY =
        "satorii_cart";

    const SATORIMODE_BASE =
        "/satorimode/";


    /* =====================================================
       ICONOS SVG
    ====================================================== */

    function checkIconSVG() {

        return `
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M5 12.5L9.2 16.5L19 6.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </svg>
        `;

    }


    /* =====================================================
       ESTILOS GLOBALES DEL FEEDBACK
    ====================================================== */

    function injectFeedbackStyles() {

        if (
            document.getElementById(
                "satorii-cart-feedback-style"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "satorii-cart-feedback-style";


        style.textContent = `

            /* =============================================
               BOTÓN · PRODUCTO AGREGADO
            ============================================= */

            .satori-cart-added {
                animation:
                    satorii-cart-button-pop
                    .36s
                    cubic-bezier(.22,1,.36,1);
            }

            .satori-add-to-cart.satori-cart-added,
            .add-to-cart.satori-cart-added,
            #addToCart.satori-cart-added {
                background:
                    #111111 !important;

                color:
                    #ffffff !important;

                box-shadow:
                    0 10px 28px
                    rgba(0,0,0,.18);
            }

            .satorii-cart-added-content {
                display:
                    inline-flex;

                align-items:
                    center;

                justify-content:
                    center;

                gap:
                    8px;

                width:
                    100%;
            }

            .satorii-cart-added-icon {
                width:
                    17px;

                height:
                    17px;

                display:
                    inline-flex;

                align-items:
                    center;

                justify-content:
                    center;

                flex:
                    0 0 auto;
            }

            .satorii-cart-added-icon svg {
                width:
                    100%;

                height:
                    100%;

                display:
                    block;
            }


            @keyframes satorii-cart-button-pop {

                0% {
                    transform:
                        scale(1);
                }

                42% {
                    transform:
                        scale(.975);
                }

                100% {
                    transform:
                        scale(1);
                }

            }


            /* =============================================
               TOAST · PRODUCTO AGREGADO
            ============================================= */

            .satori-cart-toast {
                position:
                    fixed;

                right:
                    24px;

                bottom:
                    24px;

                width:
                    min(
                        360px,
                        calc(100vw - 30px)
                    );

                padding:
                    19px 20px;

                background:
                    #101727;

                color:
                    #ffffff;

                border:
                    1px solid
                    rgba(255,255,255,.10);

                border-left:
                    4px solid
                    #EF0930;

                border-radius:
                    12px;

                box-shadow:
                    0 20px 60px
                    rgba(0,0,0,.30);

                z-index:
                    2147483000;

                opacity:
                    0;

                visibility:
                    hidden;

                pointer-events:
                    none;

                transform:
                    translate3d(
                        0,
                        18px,
                        0
                    );

                transition:
                    opacity .25s ease,
                    visibility .25s ease,
                    transform .32s
                    cubic-bezier(.22,1,.36,1);
            }


            .satori-cart-toast.is-visible {
                opacity:
                    1;

                visibility:
                    visible;

                pointer-events:
                    auto;

                transform:
                    translate3d(
                        0,
                        0,
                        0
                    );
            }


            .satori-toast-title {
                display:
                    flex;

                align-items:
                    center;

                gap:
                    9px;

                color:
                    #ffffff;

                font-size:
                    10px;

                line-height:
                    1.3;

                font-weight:
                    900;

                letter-spacing:
                    .14em;

                text-transform:
                    uppercase;
            }


            .satori-toast-icon {
                width:
                    21px;

                height:
                    21px;

                display:
                    inline-flex;

                align-items:
                    center;

                justify-content:
                    center;

                flex:
                    0 0 auto;

                border-radius:
                    50%;

                background:
                    #EF0930;

                color:
                    #ffffff;
            }


            .satori-toast-icon svg {
                width:
                    13px;

                height:
                    13px;

                display:
                    block;
            }


            .satori-toast-product {
                margin-top:
                    10px;

                color:
                    rgba(255,255,255,.72);

                font-size:
                    12px;

                line-height:
                    1.5;
            }


            .satori-toast-link {
                display:
                    inline-flex;

                align-items:
                    center;

                margin-top:
                    13px;

                color:
                    #ffffff;

                font-size:
                    10px;

                line-height:
                    1.3;

                font-weight:
                    900;

                letter-spacing:
                    .08em;

                text-decoration:
                    none;

                text-transform:
                    uppercase;

                transition:
                    color .2s ease,
                    transform .2s ease;
            }


            .satori-toast-link:hover {
                color:
                    #EF0930;

                transform:
                    translateX(3px);
            }


            @media (
                max-width: 700px
            ) {

                .satori-cart-toast {
                    right:
                        15px;

                    bottom:
                        15px;

                    width:
                        calc(
                            100vw - 30px
                        );
                }

            }


            @media (
                prefers-reduced-motion: reduce
            ) {

                .satori-cart-toast,
                .satori-toast-link,
                .satori-cart-added {
                    transition:
                        none !important;

                    animation:
                        none !important;
                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       LEER CARRITO
    ====================================================== */

    function getCart() {

        try {

            const current =
                localStorage.getItem(
                    CART_KEY
                );


            if (current) {

                const parsed =
                    JSON.parse(
                        current
                    );


                return Array.isArray(
                    parsed
                )
                    ? parsed
                    : [];

            }


            const old =
                localStorage.getItem(
                    OLD_CART_KEY
                );


            if (!old) {

                return [];

            }


            const parsedOld =
                JSON.parse(
                    old
                );


            if (
                !Array.isArray(
                    parsedOld
                )
            ) {

                return [];

            }


            localStorage.setItem(
                CART_KEY,
                JSON.stringify(
                    parsedOld
                )
            );


            return parsedOld;

        }

        catch (
            error
        ) {

            console.warn(
                "SATORII · No se pudo leer el carrito.",
                error
            );


            return [];

        }

    }


    /* =====================================================
       GUARDAR CARRITO
    ====================================================== */

    function saveCart(
        cart
    ) {

        const normalized =
            Array.isArray(
                cart
            )
                ? cart
                : [];


        try {

            localStorage.setItem(
                CART_KEY,
                JSON.stringify(
                    normalized
                )
            );


            updateBadge();


            /*
             * Header actual.
             */

            window.dispatchEvent(
                new CustomEvent(
                    "satori-cart-updated",
                    {
                        detail: {
                            cart:
                                normalized
                        }
                    }
                )
            );


            /*
             * Compatibilidad con versiones
             * anteriores del Header.
             */

            document.dispatchEvent(
                new CustomEvent(
                    "satorii:cart-updated",
                    {
                        detail: {
                            cart:
                                normalized
                        }
                    }
                )
            );

        }

        catch (
            error
        ) {

            console.warn(
                "SATORII · No se pudo guardar el carrito.",
                error
            );

        }

    }


    /* =====================================================
       CONTADOR
    ====================================================== */

    function getCartCount() {

        return getCart()
            .reduce(
                function (
                    total,
                    product
                ) {

                    return (
                        total +
                        Math.max(
                            1,
                            Number(
                                product.quantity ??
                                product.cantidad ??
                                1
                            ) || 1
                        )
                    );

                },
                0
            );

    }


    function updateBadge() {

        const count =
            getCartCount();


        document
            .querySelectorAll(
                "[data-satori-cart-count]"
            )
            .forEach(
                function (
                    badge
                ) {

                    badge.textContent =
                        String(
                            count
                        );


                    badge.style.display =
                        count > 0
                            ? "flex"
                            : "none";

                }
            );

    }


    /* =====================================================
       ESCAPAR HTML
    ====================================================== */

    function escapeHTML(
        value
    ) {

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
       PRECIO
    ====================================================== */

    function normalizePrice(
        value
    ) {

        if (
            typeof value ===
            "number"
        ) {

            return Number.isFinite(
                value
            )
                ? value
                : 0;

        }


        const text =
            String(
                value ?? ""
            );


        const numeric =
            Number(
                text.replace(
                    /[^\d.-]/g,
                    ""
                )
            );


        return Number.isFinite(
            numeric
        )
            ? numeric
            : 0;

    }


    /* =====================================================
       PRODUCTO
    ====================================================== */

    function getProduct(
        button
    ) {

        const root =
            button.closest(
                "[data-product]"
            );


        const body =
            document.body;


        const selectedSize =
            document.querySelector(
                `
                .product-size.active,
                .product-size.is-active,
                .product-size.selected,
                [data-size].active,
                [data-size].selected
                `
            );


        const selectedColor =
            document.querySelector(
                `
                .product-color.active,
                .product-color.is-active,
                .product-color.selected,
                [data-color].active,
                [data-color].selected
                `
            );


        const quantity =
            Math.max(
                1,
                Number(
                    button.dataset
                        .productQuantity ||
                    document.querySelector(
                        "#quantity, .quantity-input"
                    )?.value ||
                    1
                ) || 1
            );


        const id =
            button.dataset.productId ||
            root?.dataset.productId ||
            body.dataset.productId ||
            "";


        const name =
            button.dataset.productName ||
            root?.dataset.productName ||
            body.dataset.productName ||
            document.querySelector(
                ".satori-product-title, .product-title, h1"
            )?.textContent?.trim() ||
            "Producto SATORII";


        const price =
            normalizePrice(
                button.dataset
                    .productPrice ||
                root?.dataset
                    .productPrice ||
                body.dataset
                    .productPrice ||
                document.querySelector(
                    ".satori-price, .satori-product-price, .product-price"
                )?.textContent ||
                0
            );


        const image =
            button.dataset.productImage ||
            root?.dataset.productImage ||
            body.dataset.productImage ||
            document.querySelector(
                `
                #satoriMainProductImage,
                #satoriMainImage,
                .satori-main-image img,
                .satori-product-gallery img,
                .product-main-image img,
                .product-gallery img,
                .product-image img
                `
            )?.src ||
            "";


        const url =
            button.dataset.productUrl ||
            root?.dataset.productUrl ||
            body.dataset.productUrl ||
            window.location.pathname;


        return {

            id:
                String(
                    id
                ),

            productId:
                String(
                    id
                ),

            name:
                String(
                    name
                ),

            price:
                price,

            image:
                String(
                    image
                ),

            url:
                String(
                    url
                ),

            size:
                button.dataset
                    .productSize ||
                selectedSize?.dataset
                    .size ||
                selectedSize?.textContent
                    ?.trim() ||
                "",

            color:
                button.dataset
                    .productColor ||
                selectedColor?.dataset
                    .color ||
                selectedColor?.textContent
                    ?.trim() ||
                "",

            quantity:
                quantity

        };

    }


    /* =====================================================
       VALIDACIÓN
    ====================================================== */

    function productIsValid(
        product
    ) {

        if (
            !product.id
        ) {

            console.error(
                "SATORII · Producto sin ID.",
                product
            );


            return false;

        }


        if (
            !product.name
        ) {

            console.error(
                "SATORII · Producto sin nombre.",
                product
            );


            return false;

        }


        if (
            !Number.isFinite(
                product.price
            ) ||
            product.price <= 0
        ) {

            console.error(
                "SATORII · Precio inválido.",
                product
            );


            return false;

        }


        return true;

    }


    /* =====================================================
       AGREGAR
    ====================================================== */

    function addProduct(
        product
    ) {

        const cart =
            getCart();


        const existing =
            cart.find(
                function (
                    item
                ) {

                    return (

                        String(
                            item.productId ??
                            item.id ??
                            ""
                        ) ===
                        String(
                            product.productId ??
                            product.id ??
                            ""
                        )

                        &&

                        String(
                            item.size || ""
                        ) ===
                        String(
                            product.size || ""
                        )

                        &&

                        String(
                            item.color || ""
                        ) ===
                        String(
                            product.color || ""
                        )

                    );

                }
            );


        if (
            existing
        ) {

/*
 * Actualizar datos dinámicos
 * por si cambiaron en el catálogo local.
 */

            existing.id =
                product.id;

            existing.productId =
                product.productId;

            existing.name =
                product.name;

            existing.price =
                product.price;

            existing.image =
                product.image;

            existing.url =
                product.url;

            existing.size =
                product.size;

            existing.color =
                product.color;

            existing.quantity =
                Math.max(
                    1,
                    Number(
                        existing.quantity
                    ) || 1
                ) +
                product.quantity;

        }

        else {

            cart.push(
                product
            );

        }


        saveCart(
            cart
        );

    }


    /* =====================================================
       ANIMACIÓN BOTÓN
    ====================================================== */

    function showAddedButtonState(
        button
    ) {

        if (!button) {

            return;

        }


        if (
            !button.dataset
                .satoriiOriginalHtml
        ) {

            button.dataset
                .satoriiOriginalHtml =
                button.innerHTML;

        }


        if (
            button._satoriiAddedTimer
        ) {

            clearTimeout(
                button._satoriiAddedTimer
            );

        }


        button.classList.remove(
            "satori-cart-added"
        );


        /*
         * Reiniciar animación.
         */

        void button.offsetWidth;


        button.classList.add(
            "satori-cart-added"
        );


        button.innerHTML = `

            <span
                class="satorii-cart-added-content"
            >

                <span
                    class="satorii-cart-added-icon"
                    aria-hidden="true"
                >
                    ${checkIconSVG()}
                </span>

                <span>
                    AGREGADO AL CARRITO
                </span>

            </span>

        `;


        button._satoriiAddedTimer =
            window.setTimeout(
                function () {

                    button.classList.remove(
                        "satori-cart-added"
                    );


                    if (
                        button.disabled
                    ) {

                        button.textContent =
                            "AGOTADO";

                        return;

                    }


                    button.innerHTML =
                        button.dataset
                            .satoriiOriginalHtml ||
                        "AGREGAR AL CARRITO";

                },
                1800
            );

    }


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(
        product
    ) {

        let toast =
            document.querySelector(
                ".satori-cart-toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );


            toast.className =
                "satori-cart-toast";


            toast.setAttribute(
                "role",
                "status"
            );


            toast.setAttribute(
                "aria-live",
                "polite"
            );


            toast.setAttribute(
                "aria-atomic",
                "true"
            );


            document.body.appendChild(
                toast
            );

        }


        const details =
            [
                product.size
                    ? (
                        "Talla: " +
                        product.size
                    )
                    : "",

                product.color
                    ? (
                        "Color: " +
                        product.color
                    )
                    : ""
            ]
                .filter(
                    Boolean
                )
                .join(
                    " · "
                );


        toast.innerHTML = `

            <div
                class="satori-toast-title"
            >

                <span
                    class="satori-toast-icon"
                    aria-hidden="true"
                >
                    ${checkIconSVG()}
                </span>

                <span>
                    PRODUCTO AGREGADO
                </span>

            </div>


            <div
                class="satori-toast-product"
            >
                ${escapeHTML(
                    product.name
                )}
                ${
                    details
                        ? (
                            " · " +
                            escapeHTML(
                                details
                            )
                        )
                        : ""
                }
            </div>


            <a
                href="${SATORIMODE_BASE}carrito.html"
                class="satori-toast-link"
            >
                VER CARRITO →
            </a>

        `;


        toast.classList.remove(
            "is-visible"
        );


        /*
         * Forzar reinicio si se agrega
         * varias veces seguidas.
         */

        void toast.offsetWidth;


        requestAnimationFrame(
            function () {

                toast.classList.add(
                    "is-visible"
                );

            }
        );


        clearTimeout(
            window.satoriToastTimer
        );


        window.satoriToastTimer =
            window.setTimeout(
                function () {

                    toast.classList.remove(
                        "is-visible"
                    );

                },
                4500
            );

    }


    /* =====================================================
       CLICK AGREGAR
    ====================================================== */

    document.addEventListener(
        "click",
        function (
            event
        ) {

            const button =
                event.target.closest(
                    `
                    #addToCart,
                    .add-to-cart,
                    [data-add-to-cart]
                    `
                );


            if (!button) {

                return;

            }


            if (
                button.disabled
            ) {

                return;

            }


            event.preventDefault();


            /*
             * Si hay tallas,
             * debe existir una activa.
             */

            const sizeButtons =
                document.querySelectorAll(
                    "[data-size]"
                );


            if (
                sizeButtons.length
            ) {

                const selected =
                    document.querySelector(
                        `
                        [data-size].active,
                        [data-size].selected,
                        [data-size].is-active
                        `
                    );


                if (!selected) {

                    alert(
                        "Selecciona una talla antes de continuar."
                    );


                    return;

                }

            }


            const product =
                getProduct(
                    button
                );


            if (
                !productIsValid(
                    product
                )
            ) {

                return;

            }


            addProduct(
                product
            );


            /*
             * Feedback visual solamente
             * después de guardar correctamente.
             */

            showAddedButtonState(
                button
            );


            showToast(
                product
            );

        }
    );


    /* =====================================================
       STORAGE
    ====================================================== */

    window.addEventListener(
        "storage",
        function (
            event
        ) {

            if (
                event.key ===
                    CART_KEY ||
                event.key ===
                    OLD_CART_KEY
            ) {

                updateBadge();

            }

        }
    );


    /* =====================================================
       INICIO
    ====================================================== */

    function initializeCart() {

        injectFeedbackStyles();

        updateBadge();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeCart,
            {
                once:
                    true
            }
        );

    }

    else {

        initializeCart();

    }


    /* =====================================================
       API PÚBLICA
    ====================================================== */

    window.SatoriCart = {

        get:
            getCart,

        save:
            saveCart,

        count:
            getCartCount,

        updateBadge:
            updateBadge

    };


})();
