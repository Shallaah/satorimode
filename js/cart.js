/* =========================================================
   SATORII · CARRITO GLOBAL
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

                return Array.isArray(parsed)
                    ? parsed
                    : [];

            }


            /*
             * Compatibilidad antigua.
             */

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


            /*
             * Migrar automáticamente.
             */

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
            Array.isArray(cart)
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
             * Evento global.
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
                                product.quantity
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


        /*
         * Badge propio del Header actual.
         */

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

            document.body.appendChild(
                toast
            );

        }


        const sizeText =
            product.size
                ? (
                    " · Talla " +
                    escapeHTML(
                        product.size
                    )
                )
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
                ${sizeText}
            </div>

            <a
                href="${SATORIMODE_BASE}carrito.html"
                class="satori-toast-link"
            >
                VER CARRITO →
            </a>

        `;


        /*
         * Aseguramos interacción.
         */

        toast.style.pointerEvents =
            "auto";


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
                5000
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
       OBTENER PRODUCTO
    ====================================================== */

    function getProduct(
        button
    ) {

        /*
         * IMPORTANTE:
         *
         * Primero usamos los data-* DEL BOTÓN.
         * Las páginas generadas ya contienen aquí
         * el precio actualizado desde Supabase.
         */

        const root =
            button.closest(
                "[data-product]"
            );


        const body =
            document.body;


        const size =
            document.querySelector(
                `
                .product-size.active,
                .product-size.is-active,
                .product-size.selected,
                [data-size].active,
                [data-size].selected
                `
            );


        const color =
            document.querySelector(
                `
                .product-color.active,
                .product-color.is-active,
                .product-color.selected,
                [data-color].active,
                [data-color].selected
                `
            );


        /*
         * Cantidad.
         *
         * Las páginas nuevas usan
         * data-product-quantity en el botón.
         */

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
                button.dataset.productPrice ||
                root?.dataset.productPrice ||
                body.dataset.productPrice ||
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
                String(id),

            productId:
                String(id),

            name:
                String(name),

            price:
                price,

            image:
                String(image),

            url:
                String(url),

            size:
                button.dataset.productSize ||
                size?.dataset.size ||
                size?.textContent?.trim() ||
                "",

            color:
                button.dataset.productColor ||
                color?.dataset.color ||
                color?.textContent?.trim() ||
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
                "SATORII · El producto no tiene ID.",
                product
            );

            return false;

        }


        if (
            !product.name
        ) {

            console.error(
                "SATORII · El producto no tiene nombre.",
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
                "SATORII · El producto tiene un precio inválido.",
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
                            item.productId ||
                            item.id ||
                            ""
                        ) ===
                        String(
                            product.productId ||
                            product.id ||
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
             * También actualizamos los datos
             * por si cambiaron desde Supabase.
             */

            existing.name =
                product.name;

            existing.price =
                product.price;

            existing.image =
                product.image;

            existing.url =
                product.url;

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
             * Talla obligatoria cuando existen
             * botones de talla.
             */

            const sizeButtons =
                document.querySelectorAll(
                    "[data-size]"
                );


            if (
                sizeButtons.length
            ) {

                const selectedSize =
                    document.querySelector(
                        "[data-size].active, [data-size].selected"
                    );


                if (!selectedSize) {

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

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            updateBadge
        );

    }

    else {

        updateBadge();

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
