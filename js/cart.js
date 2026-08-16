(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const CART_KEY = "satorimode_cart";


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

            console.error(
                "SatoriMode · Error leyendo JSON:",
                error
            );

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


    /*
     * Convierte una imagen relativa en una URL absoluta.
     *
     * Esto evita que una imagen guardada como:
     *
     * images/polera.jpg
     *
     * termine buscando:
     *
     * carrito/images/polera.jpg
     *
     * al abrir carrito.html.
     */

    function normalizeImageUrl(image) {

        if (!image) {

            return "";

        }


        try {

            return new URL(
                String(image),
                document.baseURI
            ).href;

        }

        catch (error) {

            return String(image);

        }

    }


    /* =====================================================
       NORMALIZAR CARRITO
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

                    const quantity =
                        Number(
                            item.quantity ??
                            item.cantidad ??
                            1
                        );


                    return {

                        id:
                            String(
                                item.id ??
                                item.productId ??
                                ""
                            ),


                        name:
                            String(
                                item.name ??
                                item.nombre ??
                                "Producto"
                            ),


                        price:
                            Number(
                                item.price ??
                                item.precio ??
                                0
                            ),


                        image:
                            item.image ??
                            item.imagen ??
                            "",


                        size:
                            String(
                                item.size ??
                                item.talla ??
                                ""
                            ),


                        color:
                            String(
                                item.color ??
                                item.colorName ??
                                ""
                            ),


                        quantity:
                            Number.isFinite(quantity) &&
                            quantity > 0
                                ? Math.floor(quantity)
                                : 1

                    };

                }
            );

    }


    /* =====================================================
       LEER CARRITO
    ====================================================== */

    function readCart() {

        const saved =
            localStorage.getItem(
                CART_KEY
            );


        if (!saved) {

            return [];

        }


        return normalizeCart(
            safeParse(saved)
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

        }

        catch (error) {

            console.error(
                "SatoriMode · Error guardando carrito:",
                error
            );

            return;

        }


        updateBadge();


        /*
         * IMPORTANTE:
         *
         * Este evento permite que el header,
         * carrito.html y otros componentes
         * sepan que el carrito cambió.
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
         * Contador del header nuevo.
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
         * Compatibilidad con badge antiguo.
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
       OBTENER ID DEL PRODUCTO
    ====================================================== */

    function getProductId(
        button,
        productRoot
    ) {

        /*
         * Primero buscamos un ID explícito.
         */

        const id =
            productRoot?.dataset.productId ||
            productRoot?.dataset.id ||
            button?.dataset.productId ||
            button?.dataset.productId ||
            document.body.dataset.productId ||
            "";


        if (id) {

            return String(id);

        }


        /*
         * Si estamos en una página individual,
         * utilizamos la ruta como respaldo.
         */

        const pathname =
            location.pathname;


        if (
            pathname &&
            pathname !== "/" &&
            pathname !== "/index.html"
        ) {

            return pathname;

        }


        /*
         * Último respaldo.
         */

        return "";

    }


    /* =====================================================
       OBTENER PRODUCTO DE LA PÁGINA
    ====================================================== */

    function getProductFromPage(button) {

        /*
         * Buscamos el contenedor más cercano.
         */

        const productRoot =
            button.closest(
                "[data-product]"
            );


        /* =================================================
           ID
        ================================================== */

        const id =
            getProductId(
                button,
                productRoot
            );


        /* =================================================
           NOMBRE
        ================================================== */

        const name =
            productRoot?.dataset.productName ||
            productRoot?.dataset.name ||
            button.dataset.productName ||
            document.body.dataset.productName ||
            document.querySelector(
                ".product-page-info h1, " +
                ".product-title, " +
                ".product-details h1, " +
                ".product-info h1, " +
                "h1"
            )?.textContent.trim() ||
            "Producto";


        /* =================================================
           PRECIO
        ================================================== */

        const priceRaw =
            productRoot?.dataset.productPrice ||
            productRoot?.dataset.price ||
            button.dataset.productPrice ||
            document.body.dataset.productPrice ||
            document.querySelector(
                ".product-page-price, " +
                ".product-price-large, " +
                ".product-price"
            )?.textContent ||
            "0";


        const price =
            Number(
                String(priceRaw)
                    .replace(
                        /[^\d]/g,
                        ""
                    )
            );


        /* =================================================
           IMAGEN
        ================================================== */

        let image =
            productRoot?.dataset.productImage ||
            productRoot?.dataset.image ||
            button.dataset.productImage ||
            document.body.dataset.productImage ||
            "";


        /*
         * Si no encontramos la imagen mediante
         * data-product-image, buscamos una imagen.
         */

        if (!image) {

            image =
                document.querySelector(
                    ".product-main-image img, " +
                    "#mainProductImage, " +
                    "#product-main-image, " +
                    ".product-gallery img"
                )?.getAttribute(
                    "src"
                ) ||
                "";

        }


        /*
         * Convertimos la ruta a absoluta.
         */

        image =
            normalizeImageUrl(
                image
            );


        /* =================================================
           TALLA
        ================================================== */

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
                : (
                    productRoot?.dataset.productSize ||
                    button.dataset.productSize ||
                    ""
                );


        /* =================================================
           COLOR
        ================================================== */

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
                : (
                    productRoot?.dataset.productColor ||
                    button.dataset.productColor ||
                    ""
                );


        /* =================================================
           CANTIDAD
        ================================================== */

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


        quantity =
            Math.floor(
                quantity
            );


        return {

            id:
                String(id),

            name:
                String(name).trim(),

            price:
                Number(price) || 0,

            image:
                image,

            size:
                String(size).trim(),

            color:
                String(color).trim(),

            quantity:
                quantity

        };

    }


    /* =====================================================
       COMPARAR PRODUCTOS
    ====================================================== */

    function sameProduct(
        itemA,
        itemB
    ) {

        return (

            String(itemA.id) ===
                String(itemB.id)

            &&

            String(itemA.size || "") ===
                String(itemB.size || "")

            &&

            String(itemA.color || "") ===
                String(itemB.color || "")

        );

    }


    /* =====================================================
       AGREGAR PRODUCTO
    ====================================================== */

    function addProduct(product) {

        if (!product) {

            return;

        }


        if (!product.id) {

            console.error(
                "SatoriMode · Producto sin ID.",
                product
            );

            return;

        }


        const cart =
            readCart();


        const existing =
            cart.find(
                function (item) {

                    return sameProduct(
                        item,
                        product
                    );

                }
            );


        if (existing) {

            existing.quantity +=
                product.quantity;


            /*
             * Si el producto anterior no tenía
             * imagen, aprovechamos la nueva.
             */

            if (
                !existing.image &&
                product.image
            ) {

                existing.image =
                    product.image;

            }

        }

        else {

            cart.push(
                {
                    id:
                        product.id,

                    name:
                        product.name,

                    price:
                        product.price,

                    image:
                        product.image,

                    size:
                        product.size,

                    color:
                        product.color,

                    quantity:
                        product.quantity
                }
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


            /* =================================================
               VERIFICAR TALLA
            ================================================== */

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
                    "SatoriMode · No se pudo identificar el producto."
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


            const style =
                document.createElement(
                    "style"
                );


            style.id =
                "satori-cart-toast-style";


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


                @media (max-width:600px) {

                    .satori-cart-toast {

                        right:12px;

                        bottom:12px;

                        width:
                            calc(100% - 24px);

                    }

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
         * Solo usamos la clave definitiva.
         */

        const cart =
            readCart();


        /*
         * Normalizamos lo que ya exista.
         */

        if (cart.length) {

            try {

                localStorage.setItem(
                    CART_KEY,
                    JSON.stringify(
                        cart
                    )
                );

            }

            catch (error) {

                console.error(
                    "SatoriMode · Error normalizando carrito:",
                    error
                );

            }

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
       SINCRONIZACIÓN INTERNA
    ====================================================== */

    document.addEventListener(
        "satorii:cart-updated",
        function () {

            updateBadge();

        }
    );


    /* =====================================================
       SINCRONIZACIÓN ENTRE PESTAÑAS
    ====================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key !== CART_KEY
            ) {

                return;

            }


            updateBadge();


            document.dispatchEvent(
                new CustomEvent(
                    "satorii:cart-updated"
                )
            );

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
            updateBadge,

        formatPrice:
            formatPrice

    };


})();
