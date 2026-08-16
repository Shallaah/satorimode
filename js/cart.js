/* =========================================================
   SATORII · SISTEMA GLOBAL DEL CARRITO
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const CART_STORAGE_KEY = "satorii_cart";


    /* =====================================================
       OBTENER CARRITO
    ====================================================== */

    function getCart() {

        try {

            const savedCart =
                localStorage.getItem(
                    CART_STORAGE_KEY
                );


            if (!savedCart) {

                return [];

            }


            const cart =
                JSON.parse(savedCart);


            return Array.isArray(cart)
                ? cart
                : [];

        }

        catch (error) {

            console.error(
                "SatoriMode · Error al cargar el carrito:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       GUARDAR CARRITO
    ====================================================== */

    function saveCart(cart) {

        try {

            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(cart)
            );

        }

        catch (error) {

            console.error(
                "SatoriMode · Error al guardar el carrito:",
                error
            );

        }

    }


    /* =====================================================
       EMITIR ACTUALIZACIÓN GLOBAL
    ====================================================== */

    function dispatchCartUpdate() {

        const cart =
            getCart();


        document.dispatchEvent(
            new CustomEvent(
                "satorii:cart-updated",
                {
                    detail: {
                        cart: cart,
                        count: getCartCount()
                    }
                }
            )
        );

    }


    /* =====================================================
       AGREGAR PRODUCTO
    ====================================================== */

    function addToCart(
        productId,
        quantity = 1,
        size = null,
        color = null
    ) {

        if (
            typeof PRODUCTS === "undefined"
        ) {

            console.error(
                "SatoriMode · PRODUCTS no está disponible."
            );

            return;

        }


        const product =
            PRODUCTS.find(
                item =>
                    item.id === productId
            );


        if (!product) {

            console.error(
                "SatoriMode · Producto no encontrado:",
                productId
            );

            return;

        }


        if (
            product.available !== true
        ) {

            console.warn(
                "SatoriMode · Producto no disponible:",
                productId
            );

            return;

        }


        quantity =
            parseInt(
                quantity,
                10
            );


        if (
            isNaN(quantity) ||
            quantity <= 0
        ) {

            quantity = 1;

        }


        const cart =
            getCart();


        /*
         * Mismo producto +
         * misma talla +
         * mismo color
         * = misma línea.
         */

        const existingItem =
            cart.find(
                item =>
                    item.productId === productId &&
                    item.size === size &&
                    item.color === color
            );


        if (existingItem) {

            existingItem.quantity =
                Number(existingItem.quantity || 0) +
                quantity;

        }

        else {

            cart.push({

                productId:
                    productId,

                quantity:
                    quantity,

                size:
                    size,

                color:
                    color

            });

        }


        saveCart(cart);


        updateCartUI();


        dispatchCartUpdate();

    }


    /* =====================================================
       ELIMINAR PRODUCTO
    ====================================================== */

    function removeFromCart(
        productId,
        size = null,
        color = null
    ) {

        let cart =
            getCart();


        cart =
            cart.filter(
                item =>
                    !(
                        item.productId === productId &&
                        item.size === size &&
                        item.color === color
                    )
            );


        saveCart(cart);


        updateCartUI();


        dispatchCartUpdate();

    }


    /* =====================================================
       CAMBIAR CANTIDAD
    ====================================================== */

    function updateCartQuantity(
        productId,
        quantity,
        size = null,
        color = null
    ) {

        const cart =
            getCart();


        const item =
            cart.find(
                item =>
                    item.productId === productId &&
                    item.size === size &&
                    item.color === color
            );


        if (!item) {

            return;

        }


        quantity =
            parseInt(
                quantity,
                10
            );


        if (
            isNaN(quantity) ||
            quantity <= 0
        ) {

            removeFromCart(
                productId,
                size,
                color
            );

            return;

        }


        item.quantity =
            quantity;


        saveCart(cart);


        updateCartUI();


        dispatchCartUpdate();

    }


    /* =====================================================
       VACIAR CARRITO
    ====================================================== */

    function clearCart() {

        localStorage.removeItem(
            CART_STORAGE_KEY
        );


        updateCartUI();


        dispatchCartUpdate();

    }


    /* =====================================================
       CANTIDAD TOTAL DE PRENDAS
       ====================================================== */

    function getCartCount() {

        const cart =
            getCart();


        return cart.reduce(
            (
                total,
                item
            ) => {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );

    }


    /* =====================================================
       SUBTOTAL
    ====================================================== */

    function getCartSubtotal() {

        if (
            typeof PRODUCTS === "undefined"
        ) {

            return 0;

        }


        const cart =
            getCart();


        return cart.reduce(
            (
                total,
                item
            ) => {

                const product =
                    PRODUCTS.find(
                        product =>
                            product.id ===
                            item.productId
                    );


                if (!product) {

                    return total;

                }


                return total +
                    (
                        Number(product.price || 0) *
                        Number(item.quantity || 0)
                    );

            },
            0
        );

    }


    /* =====================================================
       FORMATO DE PRECIO
    ====================================================== */

    function formatPrice(
        price
    ) {

        return new Intl.NumberFormat(
            "es-CL",
            {
                style:
                    "currency",

                currency:
                    "CLP",

                maximumFractionDigits:
                    0
            }
        ).format(
            Number(price || 0)
        );

    }


    /* =====================================================
       ACTUALIZAR CONTADOR DEL HEADER
    ====================================================== */

    function updateCartUI() {

        const count =
            getCartCount();


        /*
         * Elementos que utilicen:
         *
         * data-satori-cart-count
         */

        document
            .querySelectorAll(
                "[data-satori-cart-count]"
            )
            .forEach(
                element => {

                    element.textContent =
                        count;

                    element.style.display =
                        count > 0
                            ? "flex"
                            : "none";

                }
            );


        /*
         * Si el header todavía no tiene
         * el contador, lo creamos
         * automáticamente sobre el
         * icono del carrito.
         */

        const cartLink =
            document.querySelector(
                '#satori-header a[href*="carrito.html"]'
            );


        if (
            cartLink &&
            !cartLink.querySelector(
                "[data-satori-cart-count]"
            )
        ) {

            cartLink.style.position =
                "relative";


            const badge =
                document.createElement(
                    "span"
                );


            badge.setAttribute(
                "data-satori-cart-count",
                ""
            );


            badge.setAttribute(
                "aria-label",
                "Cantidad de productos en el carrito"
            );


            badge.textContent =
                count;


            badge.style.position =
                "absolute";

            badge.style.top =
                "1px";

            badge.style.right =
                "1px";

            badge.style.minWidth =
                "15px";

            badge.style.height =
                "15px";

            badge.style.padding =
                "0 4px";

            badge.style.borderRadius =
                "999px";

            badge.style.background =
                "#f31218";

            badge.style.color =
                "#fff";

            badge.style.fontSize =
                "9px";

            badge.style.fontWeight =
                "700";

            badge.style.lineHeight =
                "15px";

            badge.style.textAlign =
                "center";

            badge.style.alignItems =
                "center";

            badge.style.justifyContent =
                "center";

            badge.style.whiteSpace =
                "nowrap";

            badge.style.pointerEvents =
                "none";

            badge.style.zIndex =
                "10";


            cartLink.appendChild(
                badge
            );

        }


        /*
         * Actualizar todos los
         * contadores encontrados.
         */

        document
            .querySelectorAll(
                "[data-satori-cart-count]"
            )
            .forEach(
                element => {

                    element.textContent =
                        count;

                    element.style.display =
                        count > 0
                            ? "flex"
                            : "none";

                }
            );

    }


    /* =====================================================
       OBTENER PRODUCTOS COMPLETOS
       ====================================================== */

    function getCartProducts() {

        if (
            typeof PRODUCTS === "undefined"
        ) {

            return [];

        }


        const cart =
            getCart();


        return cart
            .map(
                item => {

                    const product =
                        PRODUCTS.find(
                            product =>
                                product.id ===
                                item.productId
                        );


                    if (!product) {

                        return null;

                    }


                    return {

                        ...product,

                        quantity:
                            Number(
                                item.quantity || 0
                            ),

                        selectedSize:
                            item.size,

                        selectedColor:
                            item.color

                    };

                }
            )
            .filter(Boolean);

    }


    /* =====================================================
       EXPONER FUNCIONES GLOBALMENTE
    ====================================================== */

    window.SatoriCart = {

        getCart,

        saveCart,

        addToCart,

        removeFromCart,

        updateCartQuantity,

        clearCart,

        getCartCount,

        getCartSubtotal,

        getCartProducts,

        formatPrice,

        updateCartUI

    };


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    function initializeCart() {

        updateCartUI();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeCart
        );

    }

    else {

        initializeCart();

    }


    /* =====================================================
       SINCRONIZACIÓN ENTRE PESTAÑAS
    ====================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                CART_STORAGE_KEY
            ) {

                updateCartUI();


                document.dispatchEvent(
                    new CustomEvent(
                        "satorii:cart-updated",
                        {
                            detail: {
                                cart:
                                    getCart(),

                                count:
                                    getCartCount()
                            }
                        }
                    )
                );

            }

        }
    );


    /* =====================================================
       SINCRONIZACIÓN EN LA MISMA PÁGINA
    ====================================================== */

    document.addEventListener(
        "satorii:cart-updated",
        function () {

            updateCartUI();

        }
    );


})();
