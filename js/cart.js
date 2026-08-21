/* =====================================================
   SATORII
   CARRITO GLOBAL
===================================================== */

(function () {

    "use strict";


    /* =================================================
       CONFIGURACIÓN
    ================================================= */

    const CART_KEY =
        "satorimode_cart";


    const OLD_CART_KEY =
        "satoriCart";


    const LEGACY_CART_KEY =
        "satorimode-cart";


    /* =================================================
       ESTILOS DEL CARRITO
    ================================================= */

    const style =
        document.createElement(
            "style"
        );


    style.textContent = `

        /* =============================================
           BOTÓN AGREGAR AL CARRITO
        ============================================= */

        .satori-add-to-cart.added,
        #addToCart.added,
        .add-to-cart.added {

            background:
                #f31218 !important;

            border-color:
                #f31218 !important;

            color:
                #ffffff !important;

            transform:
                scale(1.015);

            box-shadow:
                0 8px 25px
                rgba(
                    243,
                    18,
                    24,
                    .22
                );

            animation:
                satoriCartButton
                .55s
                cubic-bezier(
                    .34,
                    1.56,
                    .64,
                    1
                );

        }


        @keyframes satoriCartButton {

            0% {

                transform:
                    scale(.94);

            }

            45% {

                transform:
                    scale(1.04);

            }

            70% {

                transform:
                    scale(.985);

            }

            100% {

                transform:
                    scale(1.015);

            }

        }


        /* =============================================
           BRILLO DEL BOTÓN
        ============================================= */

        .satori-add-to-cart.added::after,
        #addToCart.added::after,
        .add-to-cart.added::after {

            content:
                "";

            position:
                absolute;

            top:
                0;

            left:
                -120%;

            width:
                65%;

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
                        .35
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
                    150%;

            }

        }


        /* =============================================
           OPCIONES DE COLOR
        ============================================= */

        .satori-color-button {

            transition:
                .2s ease;

            cursor:
                pointer;

        }


        .satori-color-button.active {

            background:
                #111827 !important;

            border-color:
                #111827 !important;

            color:
                #ffffff !important;

            transform:
                translateY(-1px);

        }


        /* =============================================
           OPCIONES DE TALLA
        ============================================= */

        .satori-size-button {

            transition:
                .2s ease;

            cursor:
                pointer;

        }


        .satori-size-button.active {

            background:
                #111827 !important;

            border-color:
                #111827 !important;

            color:
                #ffffff !important;

            transform:
                translateY(-1px);

        }


        /* =============================================
           TOAST
        ============================================= */

        .satori-cart-toast {

            position:
                fixed;

            right:
                24px;

            bottom:
                24px;

            z-index:
                99999;

            width:
                min(
                    360px,
                    calc(
                        100vw - 32px
                    )
                );

            padding:
                18px 20px;

            background:
                #111827;

            color:
                #ffffff;

            border-radius:
                8px;

            box-shadow:
                0 15px 45px
                rgba(
                    0,
                    0,
                    0,
                    .25
                );

            opacity:
                0;

            transform:
                translateY(
                    18px
                );

            pointer-events:
                none;

            transition:
                opacity .3s ease,
                transform .3s ease;

        }


        .satori-cart-toast.is-visible {

            opacity:
                1;

            transform:
                translateY(
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
                11px;

            font-weight:
                900;

            letter-spacing:
                1px;

        }


        .satori-toast-title span {

            width:
                22px;

            height:
                22px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                50%;

            background:
                #f31218;

            color:
                #ffffff;

        }


        .satori-toast-product {

            margin-top:
                8px;

            color:
                #cfcfcf;

            font-size:
                13px;

        }


        .satori-toast-link {

            display:
                inline-block;

            margin-top:
                12px;

            color:
                #ffffff;

            font-size:
                10px;

            font-weight:
                900;

            text-decoration:
                none;

            letter-spacing:
                .8px;

        }

    `;


    document.head.appendChild(
        style
    );


    /* =================================================
       LEER CARRITO
    ================================================= */

    function getCart() {

        try {

            const saved =
                localStorage.getItem(
                    CART_KEY
                );


            if (
                saved
            ) {

                const parsed =
                    JSON.parse(
                        saved
                    );


                if (
                    Array.isArray(
                        parsed
                    )
                ) {

                    return parsed;

                }

            }

        }
        catch (
            error
        ) {

            console.error(
                "SATORII · error leyendo carrito:",
                error
            );

        }


        return [];

    }


    /* =================================================
       GUARDAR CARRITO
    ================================================= */

    function saveCart(
        cart
    ) {

        const json =
            JSON.stringify(
                cart
            );


        /*
         * Clave principal.
         */

        localStorage.setItem(
            CART_KEY,
            json
        );


        /*
         * Compatibilidad con versiones
         * anteriores del carrito.
         */

        localStorage.setItem(
            OLD_CART_KEY,
            json
        );


        localStorage.setItem(
            LEGACY_CART_KEY,
            json
        );


        /*
         * Actualizar contador del header.
         */

        updateBadge();


        /*
         * Avisar al resto de SATORII.
         */

        document.dispatchEvent(
            new CustomEvent(
                "satorii:cart-updated",
                {
                    detail: {
                        cart:
                            cart
                    }
                }
            )
        );

    }


    /* =================================================
       CONTADOR HEADER
    ================================================= */

    function updateBadge() {

        const cart =
            getCart();


        const count =
            cart.reduce(
                function (
                    total,
                    product
                ) {

                    return (
                        total +
                        Number(
                            product.quantity ||
                            0
                        )
                    );

                },
                0
            );


        document
            .querySelectorAll(
                ".header-cart, .cart-icon, [data-cart-icon], a[href*='carrito.html']"
            )
            .forEach(
                function (element) {

                    element.classList.add(
                        "satori-cart-wrapper"
                    );


                    let badge =
                        element.querySelector(
                            ".satori-cart-badge"
                        );


                    if (
                        !badge
                    ) {

                        badge =
                            document.createElement(
                                "span"
                            );


                        badge.className =
                            "satori-cart-badge";


                        element.appendChild(
                            badge
                        );

                    }


                    badge.textContent =
                        count;


                    badge.classList.toggle(
                        "is-empty",
                        count === 0
                    );

                }
            );

    }


    /* =================================================
       PRODUCTO DESDE LA PÁGINA
    ================================================= */

    function getProduct(
        button
    ) {

        const root =
            button.closest(
                "[data-product]"
            ) ||
            document.querySelector(
                "[data-product]"
            ) ||
            document.body;


        /* =============================================
           TALLA
        ============================================= */

        const activeSize =
            document.querySelector(
                [
                    ".satori-size-button.active",
                    ".product-size.active",
                    ".product-size.selected",
                    "[data-size].active",
                    "[data-size].selected"
                ].join(", ")
            );


        /* =============================================
           COLOR
        ============================================= */

        const activeColor =
            document.querySelector(
                [
                    ".satori-color-button.active",
                    ".product-color.active",
                    ".product-color.selected",
                    "[data-color].active",
                    "[data-color].selected"
                ].join(", ")
            );


        /* =============================================
           CANTIDAD
        ============================================= */

        const quantityInput =
            document.querySelector(
                "#quantity, .quantity-input"
            );


        const quantity =
            Math.max(
                1,
                Number(
                    quantityInput?.value ||
                    1
                )
            );


        /* =============================================
           DATOS PRODUCTO
        ============================================= */

        const productId =
            root.dataset.productId ||
            document.body.dataset.productId ||
            location.pathname;


        const name =
            root.dataset.productName ||
            document.body.dataset.productName ||
            document
                .querySelector(
                    ".satori-product-info h1, h1"
                )
                ?.textContent
                .trim() ||
            "Producto SATORII";


        const price =
            Number(
                String(
                    root.dataset.productPrice ||
                    document.body.dataset.productPrice ||
                    0
                )
                    .replace(
                        /[^\d]/g,
                        ""
                    )
            );


const imageElement =
    document.querySelector(
        ".satori-main-image img, .product-main-image img, #mainProductImage"
    );

const image =
    root.dataset.productImage ||
    document.body.dataset.productImage ||
    imageElement?.currentSrc ||
    imageElement?.src ||
    "";

const normalizedImage =
    image
        ? new URL(
            image,
            document.baseURI
        ).href
        : "";


        return {

            id:
                productId,

            productId:
                productId,

            name:
                name,

            price:
                price,

            image:
                normalizedImage,

            size:
                activeSize
                    ? (
                        activeSize.dataset.size ||
                        activeSize.textContent.trim()
                    )
                    : "",

            color:
                activeColor
                    ? (
                        activeColor.dataset.color ||
                        activeColor.textContent.trim()
                    )
                    : "",

            quantity:
                quantity

        };

    }


    /* =================================================
       ANIMACIÓN DEL BOTÓN
    ================================================= */

    function animateButton(
        button
    ) {

        if (
            !button
        ) {

            return;

        }


        /*
         * Guardamos el texto original.
         */

        if (
            !button.dataset.originalText
        ) {

            button.dataset.originalText =
                button.textContent.trim();

        }


        /*
         * Reiniciamos la animación.
         */

        button.classList.remove(
            "added"
        );


        void button.offsetWidth;


        /*
         * Estado rojo.
         */

        button.classList.add(
            "added"
        );


        button.textContent =
            "✓ AGREGADO AL CARRITO";


        /*
         * Limpiar temporizador anterior.
         */

        if (
            button._satoriResetTimer
        ) {

            clearTimeout(
                button._satoriResetTimer
            );

        }


        /*
         * Volver al estado original.
         */

        button._satoriResetTimer =
            setTimeout(
                function () {

                    button.classList.remove(
                        "added"
                    );


                    button.textContent =
                        button.dataset.originalText;

                },
                2200
            );

    }


    /* =================================================
       TOAST
    ================================================= */

    function showToast(
        product
    ) {

        let toast =
            document.querySelector(
                ".satori-cart-toast"
            );


        if (
            !toast
        ) {

            toast =
                document.createElement(
                    "div"
                );


            toast.className =
                "satori-cart-toast";


            document.body.appendChild(
                toast
            );

        }


        const sizeText =
            product.size
                ? " · Talla " +
                  product.size
                : "";


        const colorText =
            product.color
                ? " · " +
                  product.color
                : "";


        toast.innerHTML = `

            <div
                class="satori-toast-title"
            >

                <span>
                    ✓
                </span>

                PRODUCTO AGREGADO

            </div>


            <div
                class="satori-toast-product"
            >

                ${escapeHTML(
                    product.name
                )}

                ${escapeHTML(
                    sizeText
                )}

                ${escapeHTML(
                    colorText
                )}

            </div>


            <a
                href="carrito.html"
                class="satori-toast-link"
            >

                VER CARRITO →

            </a>

        `;


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
            setTimeout(
                function () {

                    toast.classList.remove(
                        "is-visible"
                    );

                },
                4500
            );

    }


    /* =================================================
       SELECCIÓN DE TALLAS
    ================================================= */

    document.addEventListener(
        "click",
        function (
            event
        ) {

            const sizeButton =
                event.target.closest(
                    ".satori-size-button, .product-size, [data-size]"
                );


            if (
                !sizeButton
            ) {

                return;

            }


            /*
             * No interferimos si es otra
             * cosa que tenga data-size.
             */

            const allSizes =
                document.querySelectorAll(
                    ".satori-size-button, .product-size, [data-size]"
                );


            allSizes.forEach(
                function (
                    item
                ) {

                    item.classList.remove(
                        "active"
                    );

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            sizeButton.classList.add(
                "active"
            );


            sizeButton.classList.add(
                "selected"
            );

        }
    );


    /* =================================================
       SELECCIÓN DE COLOR
    ================================================= */

    document.addEventListener(
        "click",
        function (
            event
        ) {

            const colorButton =
                event.target.closest(
                    ".satori-color-button, .product-color, [data-color]"
                );


            if (
                !colorButton
            ) {

                return;

            }


            const allColors =
                document.querySelectorAll(
                    ".satori-color-button, .product-color, [data-color]"
                );


            allColors.forEach(
                function (
                    item
                ) {

                    item.classList.remove(
                        "active"
                    );

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            colorButton.classList.add(
                "active"
            );


            colorButton.classList.add(
                "selected"
            );

        }
    );


    /* =================================================
       CARRITO
    ================================================= */

    document.addEventListener(
        "click",
        function (
            event
        ) {

            const button =
                event.target.closest(
                    "#addToCart, #satoriAddToCart, .add-to-cart, [data-add-to-cart]"
                );


            if (
                !button
            ) {

                return;

            }


            /*
             * IMPORTANTE:
             *
             * Aquí sí detenemos el comportamiento
             * predeterminado porque NOSOTROS somos
             * el sistema del carrito.
             */

            event.preventDefault();


            const product =
                getProduct(
                    button
                );


            /*
             * Si existen tallas, obligamos
             * a seleccionar una.
             */

            const sizeButtons =
                document.querySelectorAll(
                    ".satori-size-button, .product-size, [data-size]"
                );


            if (
                sizeButtons.length
            ) {

                const selectedSize =
                    document.querySelector(
                        [
                            ".satori-size-button.active",
                            ".satori-size-button.selected",
                            ".product-size.active",
                            ".product-size.selected",
                            "[data-size].active",
                            "[data-size].selected"
                        ].join(", ")
                    );


                if (
                    !selectedSize
                ) {

                    /*
                     * No agregamos.
                     */

                    alert(
                        "Selecciona una talla antes de continuar."
                    );


                    return;

                }

            }


            const cart =
                getCart();


            /*
             * Buscar misma variante.
             */

            const existing =
                cart.find(
                    function (
                        item
                    ) {

                        return (

                            (
                                item.id ||
                                item.productId
                            ) ===
                                product.id &&

                            (
                                item.size ||
                                ""
                            ) ===
                                product.size &&

                            (
                                item.color ||
                                ""
                            ) ===
                                product.color

                        );

                    }
                );


            if (
                existing
            ) {

                existing.quantity =
                    Number(
                        existing.quantity ||
                        0
                    ) +
                    Number(
                        product.quantity
                    );

            }
            else {

                cart.push(
                    product
                );

            }


            /*
             * Guardar.
             */

            saveCart(
                cart
            );


            /*
             * Animación.
             */

            animateButton(
                button
            );


            /*
             * Toast.

             */

            showToast(
                product
            );


            console.log(
                "SATORII · producto agregado:",
                product
            );

        },
        true
    );


    /* =================================================
       CANTIDAD
    ================================================= */

    document.addEventListener(
        "click",
        function (
            event
        ) {

            const minus =
                event.target.closest(
                    "#satoriQuantityMinus, #quantityMinus, [data-quantity-minus]"
                );


            const plus =
                event.target.closest(
                    "#satoriQuantityPlus, #quantityPlus, [data-quantity-plus]"
                );


            if (
                !minus &&
                !plus
            ) {

                return;

            }


            const input =
                document.querySelector(
                    "#quantity, .quantity-input"
                );


            const display =
                document.querySelector(
                    "#satoriQuantity, #quantityValue, [data-quantity]"
                );


            if (
                !input &&
                !display
            ) {

                return;

            }


            let value =
                Number(
                    input?.value ||
                    display?.textContent ||
                    1
                );


            if (
                minus
            ) {

                value =
                    Math.max(
                        1,
                        value - 1
                    );

            }


            if (
                plus
            ) {

                value += 1;

            }


            if (
                input
            ) {

                input.value =
                    value;

            }


            if (
                display
            ) {

                display.textContent =
                    value;

            }

        },
        true
    );


    /* =================================================
       INICIALIZAR
    ================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            updateBadge();

        }
    );


    window.addEventListener(
        "storage",
        function () {

            updateBadge();

        }
    );


    /* =================================================
       API GLOBAL
    ================================================= */

    window.SatoriCart = {

        get:
            getCart,

        save:
            saveCart,

        count:
            function () {

                return getCart()
                    .reduce(
                        function (
                            total,
                            product
                        ) {

                            return (
                                total +
                                Number(
                                    product.quantity ||
                                    0
                                )
                            );

                        },
                        0
                    );

            },

        updateBadge:
            updateBadge

    };


    /* =================================================
       ESCAPE HTML
    ================================================= */

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


})();
