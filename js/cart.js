/* =========================================================
   SATORII · SISTEMA GLOBAL DEL CARRITO
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const CART_STORAGE_KEY = "satorii_cart";


    /* =====================================================
       OBTENER CARRITO
    ===================================================== */

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
    ===================================================== */

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
       AGREGAR PRODUCTO
    ===================================================== */

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


        const cart =
            getCart();


        /*
         * El mismo producto + misma talla
         * + mismo color = misma línea.
         */

        const existingItem =
            cart.find(
                item =>
                    item.productId === productId &&
                    item.size === size &&
                    item.color === color
            );


        if (existingItem) {

            existingItem.quantity += quantity;

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


        /*
         * Aviso global.
         */

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

    }


    /* =====================================================
       ELIMINAR PRODUCTO
    ===================================================== */

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

    }


    /* =====================================================
       CAMBIAR CANTIDAD
    ===================================================== */

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

    }


    /* =====================================================
       VACIAR CARRITO
    ===================================================== */

    function clearCart() {

        localStorage.removeItem(
            CART_STORAGE_KEY
        );


        updateCartUI();


        document.dispatchEvent(
            new CustomEvent(
                "satorii:cart-updated",
                {
                    detail: {
                        cart: []
                    }
                }
            )
        );

    }


    /* =====================================================
       CANTIDAD TOTAL DE PRODUCTOS
    ===================================================== */

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
    ===================================================== */

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
                        product.price *
                        Number(
                            item.quantity || 0
                        )
                    );

            },
            0
        );

    }


    /* =====================================================
       FORMATO DE PRECIO
    ===================================================== */

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
        ).format(price);

    }


    /* =====================================================
       ACTUALIZAR CONTADOR DEL HEADER
    ===================================================== */

    function updateCartUI() {

        const count =
            getCartCount();


        /*
         * Cualquier elemento que tenga:
         *
         * data-satori-cart-count
         *
         * recibirá automáticamente
         * la cantidad del carrito.
         */

        document
            .querySelectorAll(
                "[data-satori-cart-count]"
            )
            .forEach(
                element => {

                    element.textContent =
                        count;

                }
            );


        /*
         * También podemos ocultar el
         * contador cuando está en cero.
         */

        document
            .querySelectorAll(
                "[data-satori-cart-count]"
            )
            .forEach(
                element => {

                    element.style.display =
                        count > 0
                            ? ""
                            : "none";

                }
            );

    }


    /* =====================================================
       OBTENER PRODUCTOS COMPLETOS DEL CARRITO
       ===================================================== */

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
                            item.quantity,

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
    ===================================================== */

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
       ACTUALIZAR AL CARGAR
    ===================================================== */

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
       SINCRONIZAR ENTRE PESTAÑAS
    ===================================================== */

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
                                    getCart()
                            }
                        }
                    )
                );

            }

        }
    );


})();
