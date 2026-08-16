(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const CART_KEY = "satorimode_cart";

    /*
     * Claves antiguas.
     * Se leen solamente para recuperar carritos anteriores.
     */

    const LEGACY_KEYS = [
        "satorimode-cart",
        "satorii_cart",
        "satori_cart",
        "satoriCart"
    ];


    /* =====================================================
       UTILIDADES
    ====================================================== */

    function safeParse(value) {

        try {

            const parsed =
                JSON.parse(value);

            return Array.isArray(parsed)
                ? parsed
                : [];

        }

        catch (error) {

            return [];

        }

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


    /* =====================================================
       LEER CARRITO
    ====================================================== */

    function readCart() {

        let cart = [];


        /*
         * Primero usamos la clave definitiva.
         */

        const current =
            localStorage.getItem(
                CART_KEY
            );


        if (current) {

            cart =
                safeParse(current);

        }


        /*
         * Si no hay carrito actual,
         * buscamos versiones antiguas.
         */

        if (!cart.length) {

            for (
                const key of LEGACY_KEYS
            ) {

                const saved =
                    localStorage.getItem(
                        key
                    );


                if (!saved) {

                    continue;

                }


                const legacyCart =
                    safeParse(saved);


                if (
                    legacyCart.length
                ) {

                    cart =
                        legacyCart;

                    break;

                }

            }

        }


        return normalizeCart(
            cart
        );

    }


    /* =====================================================
       NORMALIZAR PRODUCTOS
    ====================================================== */

    function normalizeCart(cart) {

        if (!Array.isArray(cart)) {

            return [];

        }


        return cart
            .filter(
                function (item) {

                    return (
                        item &&
                        typeof item === "object"
                    );

                }
            )
            .map(
                function (item) {

                    return {

                        /*
                         * Aceptamos id y productId.
                         */

                        id:
                            String(
                                item.id ||
                                item.productId ||
                                ""
                            ),


                        name:
                            item.name ||
                            item.nombre ||
                            "Producto",


                        price:
                            Number(
                                item.price ??
                                item.precio ??
                                0
                            ),


                        image:
                            item.image ||
                            item.imagen ||
                            "",


                        size:
                            item.size ||
                            item.talla ||
                            "",


                        color:
                            item.color ||
                            item.colorName ||
                            "",


                        quantity:
                            Math.max(
                                1,
                                Number(
                                    item.quantity ||
                                    item.cantidad ||
                                    1
                                )
                            )

                    };

                }
            );

    }


    /* =====================================================
       GUARDAR CARRITO
    ====================================================== */

    function saveCart(cart) {

        const normalized =
            normalizeCart(
                cart
            );


        try {

            localStorage.setItem(
                CART_KEY,
                JSON.stringify(
                    normalized
                )
            );


            /*
             * Eliminamos las claves antiguas
             * después de migrarlas.
             */

            LEGACY_KEYS.forEach(
                function (key) {

                    if (
                        key !== CART_KEY
                    ) {

                        localStorage.removeItem(
                            key
                        );

                    }

                }
            );

        }

        catch (error) {

            console.error(
                "SatoriMode · Error guardando carrito:",
                error
            );

        }


        updateBadge();


        /*
         * Avisamos al header y a carrito.html.
         */

        document.dispatchEvent(
            new CustomEvent(
                "satorii:cart-updated"
            )
        );

    }


    /* =====================================================
       CONTADOR
    ====================================================== */

    function getCartCount() {

        return readCart().reduce(
            function (
                total,
                item
            ) {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );

    }


    function updateBadge() {

        const count =
            getCartCount();


        /*
         * Header nuevo.
         */

        document
            .querySelectorAll(
                "[data-satori-cart-count]"
            )
            .forEach(
                function (badge) {

                    badge.textContent =
                        count;


                    badge.style.display =
                        count > 0
                            ? "flex"
                            : "none";

                }
            );


        /*
         * Compatibilidad con versiones anteriores.
         */

        document
            .querySelectorAll(
                ".satori-cart-badge"
            )
            .forEach(
                function (badge) {

                    badge.textContent =
                        count;

                }
            );

    }


    /* =====================================================
       OBTENER PRODUCTO
    ====================================================== */

    function getProductFromPage(button) {

        /*
         * Contenedor del producto.
         */

        const productRoot =
            button.closest(
                "[data-product]"
            );


        /*
         * DATOS PRINCIPALES
         */

        const id =
            productRoot?.dataset.productId ||
            button.dataset.productId ||
            document.body.dataset.productId ||
            location.pathname;


        const name =
            productRoot?.dataset.productName ||
            document.body.dataset.productName ||
            document.querySelector(
                ".product-page-info h1, " +
                ".product-title, " +
                ".product-details h1, " +
                ".product-info h1, " +
                "h1"
            )?.textContent.trim() ||
            "Producto";


        const priceRaw =
            productRoot?.dataset.productPrice ||
            document.body.dataset.productPrice ||
            document.querySelector(
                ".product-page-price, " +
                ".product-price-large, " +
                ".product-price"
            )?.textContent ||
            "0";


        const image =
            productRoot?.dataset.productImage ||
            document.body.dataset.productImage ||
            document.querySelector(
                ".product-main-image img, " +
                "#mainProductImage, " +
                "#product-main-image, " +
                ".product-gallery img"
            )?.getAttribute(
                "src"
            ) ||
            "";


        /*
         * PRECIO
         */

        const price =
            Number(
                String(priceRaw)
                    .replace(
                        /[^\d]/g,
                        ""
                    )
            );


        /*
         * TALLA
         */

        const selectedSize =
            document.querySelector(
                ".product-size.active, " +
                ".product-size.selected, " +
                ".product-size.is-active, " +
                "[data-size].active, " +
                "[data-size].selected"
            );


        const size =
            selectedSize
                ? (
                    selectedSize.dataset.size ||
                    selectedSize.textContent.trim()
                )
                : "";


        /*
         * COLOR
         */

        const selectedColor =
            document.querySelector(
                ".product-color-button.active, " +
                ".product-color.active, " +
                ".product-color.selected, " +
                "[data-color].active, " +
                "[data-color].selected"
            );


        const color =
            selectedColor
                ? (
                    selectedColor.dataset.color ||
                    selectedColor.textContent.trim()
                )
                : "";


        /*
         * CANTIDAD
         */

        const quantityInput =
            document.querySelector(
                ".quantity-input"
            );


        const quantityElement =
            document.querySelector(
                "#quantityValue, " +
                "#quantity, " +
                "[data-quantity]"
            );


        let quantity =
            Number(
                quantityInput?.value
            );


        if (
            !quantity ||
            quantity < 1
        ) {

            quantity =
                Number(
                    quantityElement?.textContent
                );

        }


        if (
            !quantity ||
            quantity < 1
        ) {

            quantity = 1;

        }


        return {

            id:
                String(id),

            name:
                name,

            price:
                price,

            image:
                image,

            size:
                size,

            color:
                color,

            quantity:
                quantity

        };

    }


    /* =====================================================
       AGREGAR PRODUCTO
    ====================================================== */

    function addProduct(product) {

        const cart =
            readCart();


        /*
         * Un mismo producto con misma talla
         * y color se agrupa.
         */

        const existing =
            cart.find(
                function (item) {

                    return (

                        String(item.id) ===
                            String(product.id)

                        &&

                        String(item.size || "") ===
                            String(product.size || "")

                        &&

                        String(item.color || "") ===
                            String(product.color || "")

                    );

                }
            );


        if (existing) {

            existing.quantity +=
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


        showToast(
            product
        );

    }


    /* =====================================================
       DETECTAR BOTÓN AGREGAR
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "#addToCart, " +
                    ".add-to-cart, " +
                    ".add-to-cart-button, " +
                    "[data-add-to-cart]"
                );


            if (!button) {

                return;

            }


            /*
             * Si la página tiene selección de talla,
             * exigimos seleccionar una.
             */

            const sizeButtons =
                document.querySelectorAll(
                    ".product-size, " +
                    "[data-size]"
                );


            if (
                sizeButtons.length > 0
            ) {

                const selected =
                    document.querySelector(
                        ".product-size.active, " +
                        ".product-size.selected, " +
                        ".product-size.is-active, " +
                        "[data-size].active, " +
                        "[data-size].selected"
                    );


                if (!selected) {

                    event.preventDefault();

                    event.stopImmediatePropagation();


                    alert(
                        "Selecciona una talla antes de continuar."
                    );


                    return;

                }

            }


            /*
             * Evitamos que otro listener
             * agregue el producto nuevamente.
             */

            event.preventDefault();

            event.stopImmediatePropagation();


            const product =
                getProductFromPage(
                    button
                );


            if (!product.id) {

                console.error(
                    "SatoriMode · Producto sin ID."
                );

                return;

            }


            addProduct(
                product
            );

        },
        true
    );


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(product) {

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
                ></div>


                <a
                    href="/satorimode/carrito.html"
                    class="satori-toast-link"
                >
                    VER CARRITO →
                </a>

            `;


            document.body.appendChild(
                toast
            );


            /*
             * Estilos del aviso.
             */

            const style =
                document.createElement(
                    "style"
                );


            style.textContent = `

                .satori-cart-toast {

                    position:fixed;

                    right:20px;

                    bottom:20px;

                    width:min(
                        360px,
                        calc(100% - 40px)
                    );

                    padding:18px;

                    background:#fff;

                    border:1px solid #ddd;

                    border-radius:8px;

                    box-shadow:
                        0 15px 40px
                        rgba(0,0,0,.18);

                    z-index:9999999;

                    transform:
                        translateY(20px);

                    opacity:0;

                    pointer-events:none;

                    transition:
                        opacity .25s ease,
                        transform .25s ease;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                }


                .satori-cart-toast.is-visible {

                    transform:
                        translateY(0);

                    opacity:1;

                    pointer-events:auto;

                }


                .satori-toast-title {

                    display:flex;

                    align-items:center;

                    gap:8px;

                    color:#f31218;

                    font-size:10px;

                    font-weight:800;

                    letter-spacing:1.5px;

                }


                .satori-toast-title span {

                    font-size:15px;

                }


                .satori-toast-product {

                    margin-top:8px;

                    color:#111;

                    font-size:13px;

                    font-weight:700;

                    line-height:1.4;

                }


                .satori-toast-link {

                    display:block;

                    margin-top:12px;

                    color:#111;

                    font-size:10px;

                    font-weight:800;

                    text-decoration:none;

                }


                .satori-toast-link:hover {

                    color:#f31218;

                }

            `;


            document.head.appendChild(
                style
            );

        }


        const productText =
            toast.querySelector(
                ".satori-toast-product"
            );


        if (productText) {

            let text =
                product.name;


            if (product.size) {

                text +=
                    " · Talla " +
                    product.size;

            }


            if (product.color) {

                text +=
                    " · " +
                    product.color;

            }


            productText.textContent =
                text;

        }


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


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    function init() {

        /*
         * Recuperamos carritos antiguos
         * y los convertimos al formato nuevo.
         */

        const cart =
            readCart();


        if (cart.length) {

            localStorage.setItem(
                CART_KEY,
                JSON.stringify(
                    cart
                )
            );

        }


        updateBadge();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else {

        init();

    }


    /* =====================================================
       SINCRONIZACIÓN
    ====================================================== */

    document.addEventListener(
        "satorii:cart-updated",
        function () {

            updateBadge();

        }
    );


    window.addEventListener(
        "storage",
        function (event) {

            if (
                [
                    CART_KEY,
                    ...LEGACY_KEYS
                ].includes(
                    event.key
                )
            ) {

                updateBadge();


                document.dispatchEvent(
                    new CustomEvent(
                        "satorii:cart-updated"
                    )
                );

            }

        }
    );


    /* =====================================================
       API GLOBAL
    ====================================================== */

    window.SatoriCart = {

        get:
            readCart,

        save:
            saveCart,

        add:
            addProduct,

        count:
            getCartCount,

        updateBadge:
            updateBadge

    };


})();
