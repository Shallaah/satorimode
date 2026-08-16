/* =========================================================
   SATORIMODE · CARRITO
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const STORAGE_KEY =
        "satorii_cart";


    /* =====================================================
       OBTENER CARRITO
    ===================================================== */

    function getCart() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!saved) {

                return [];

            }


            const cart =
                JSON.parse(saved);


            return Array.isArray(cart)
                ? cart
                : [];

        }

        catch (error) {

            console.error(
                "SatoriMode · Error leyendo carrito:",
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
                STORAGE_KEY,
                JSON.stringify(cart)
            );

        }

        catch (error) {

            console.error(
                "SatoriMode · Error guardando carrito:",
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

        const product =
            typeof getProductById === "function"
                ? getProductById(productId)
                : null;


        if (!product) {

            console.error(
                "SatoriMode · Producto no encontrado:",
                productId
            );

            return;

        }


        if (product.available !== true) {

            return;

        }


        const cart =
            getCart();


        /*
         * Un mismo producto puede existir
         * con diferentes tallas/colores.
         *
         * Por eso usamos una clave única.
         */

        const existingIndex =
            cart.findIndex(item =>

                item.id === productId &&
                item.size === size &&
                item.color === color

            );


        if (existingIndex !== -1) {

            cart[existingIndex].quantity +=
                quantity;

        }

        else {

            cart.push({

                id: product.id,

                quantity: quantity,

                size: size,

                color: color

            });

        }


        saveCart(cart);


        renderCart();


        updateCartCount();


        /*
         * Evento personalizado.
         *
         * Esto permitirá que las demás páginas
         * actualicen el contador del carrito.
         */

        document.dispatchEvent(
            new CustomEvent(
                "satoriiCartUpdated"
            )
        );

    }


    /* =====================================================
       CAMBIAR CANTIDAD
    ===================================================== */

    function updateQuantity(
        index,
        quantity
    ) {

        const cart =
            getCart();


        if (!cart[index]) {

            return;

        }


        quantity =
            parseInt(
                quantity,
                10
            );


        if (
            Number.isNaN(quantity) ||
            quantity < 1
        ) {

            removeFromCart(index);

            return;

        }


        cart[index].quantity =
            quantity;


        saveCart(cart);


        renderCart();


        updateCartCount();


        document.dispatchEvent(
            new CustomEvent(
                "satoriiCartUpdated"
            )
        );

    }


    /* =====================================================
       ELIMINAR PRODUCTO
    ===================================================== */

    function removeFromCart(index) {

        const cart =
            getCart();


        if (!cart[index]) {

            return;

        }


        cart.splice(
            index,
            1
        );


        saveCart(cart);


        renderCart();


        updateCartCount();


        document.dispatchEvent(
            new CustomEvent(
                "satoriiCartUpdated"
            )
        );

    }


    /* =====================================================
       FORMATO PRECIO
    ===================================================== */

    function formatPrice(price) {

        return new Intl.NumberFormat(
            "es-CL",
            {
                style: "currency",
                currency: "CLP",
                maximumFractionDigits: 0
            }
        ).format(price);

    }


    /* =====================================================
       TOTAL DE PRODUCTOS
    ===================================================== */

    function getCartQuantity() {

        const cart =
            getCart();


        return cart.reduce(
            (
                total,
                item
            ) => {

                return total +
                    Number(item.quantity || 0);

            },
            0
        );

    }


    /* =====================================================
       TOTAL
    ===================================================== */

    function getCartTotal() {

        const cart =
            getCart();


        return cart.reduce(
            (
                total,
                item
            ) => {

                const product =
                    typeof getProductById === "function"
                        ? getProductById(item.id)
                        : null;


                if (!product) {

                    return total;

                }


                return total +
                    (
                        product.price *
                        Number(item.quantity || 0)
                    );

            },
            0
        );

    }


    /* =====================================================
       RENDER DEL CARRITO
    ===================================================== */

    function renderCart() {

        const list =
            document.getElementById(
                "cart-items-list"
            );


        const layout =
            document.getElementById(
                "cart-layout"
            );


        const empty =
            document.getElementById(
                "cart-empty"
            );


        const subtotal =
            document.getElementById(
                "cart-subtotal"
            );


        const total =
            document.getElementById(
                "cart-total"
            );


        const count =
            document.getElementById(
                "cart-items-count"
            );


        if (!list) {

            return;

        }


        const cart =
            getCart();


        /*
         * CARRITO VACÍO
         */

        if (cart.length === 0) {

            list.innerHTML = "";


            if (layout) {

                layout.style.display =
                    "none";

            }


            if (empty) {

                empty.style.display =
                    "block";

            }


            if (subtotal) {

                subtotal.textContent =
                    formatPrice(0);

            }


            if (total) {

                total.textContent =
                    formatPrice(0);

            }


            if (count) {

                count.textContent =
                    "0 productos";

            }


            return;

        }


        /*
         * CARRITO CON PRODUCTOS
         */

        if (layout) {

            layout.style.display =
                "grid";

        }


        if (empty) {

            empty.style.display =
                "none";

        }


        let html = "";


        cart.forEach(
            (
                item,
                index
            ) => {

                const product =
                    typeof getProductById === "function"
                        ? getProductById(item.id)
                        : null;


                if (!product) {

                    return;

                }


                const quantity =
                    Number(item.quantity || 1);


                const itemTotal =
                    product.price *
                    quantity;


                const sizeText =
                    item.size
                        ? `
                            <div class="cart-item-option">
                                Talla:
                                <strong>
                                    ${escapeHTML(item.size)}
                                </strong>
                            </div>
                        `
                        : "";


                const colorText =
                    item.color
                        ? `
                            <div class="cart-item-option">
                                Color:
                                <strong>
                                    ${escapeHTML(item.color)}
                                </strong>
                            </div>
                        `
                        : "";


                html += `

                    <article
                        class="cart-item"
                        data-cart-index="${index}"
                    >

                        <a
                            class="cart-item-image"
                            href="${product.url}"
                        >

                            <img
                                src="${product.image}"
                                alt="${escapeHTML(product.name)}"
                            >

                        </a>


                        <div class="cart-item-info">

                            <div class="cart-item-category">
                                ${escapeHTML(product.collection || product.category)}
                            </div>


                            <h3 class="cart-item-name">

                                ${escapeHTML(product.name)}

                            </h3>


                            ${sizeText}

                            ${colorText}


                            <div
                                class="cart-item-quantity"
                                aria-label="Cantidad"
                            >

                                <button
                                    type="button"
                                    class="cart-quantity-button"
                                    data-action="decrease"
                                    data-index="${index}"
                                    aria-label="Disminuir cantidad"
                                >
                                    −
                                </button>


                                <span
                                    class="cart-quantity-value"
                                >
                                    ${quantity}
                                </span>


                                <button
                                    type="button"
                                    class="cart-quantity-button"
                                    data-action="increase"
                                    data-index="${index}"
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <div class="cart-item-price">

                            <div class="cart-item-total">
                                ${formatPrice(itemTotal)}
                            </div>


                            <button
                                type="button"
                                class="cart-item-remove"
                                data-action="remove"
                                data-index="${index}"
                            >
                                ELIMINAR
                            </button>

                        </div>

                    </article>

                `;

            }
        );


        list.innerHTML =
            html;


        /*
         * SUBTOTAL / TOTAL
         */

        const cartTotal =
            getCartTotal();


        if (subtotal) {

            subtotal.textContent =
                formatPrice(cartTotal);

        }


        if (total) {

            total.textContent =
                formatPrice(cartTotal);

        }


        /*
         * CANTIDAD TOTAL
         */

        if (count) {

            const quantity =
                getCartQuantity();


            count.textContent =
                quantity === 1
                    ? "1 producto"
                    : `${quantity} productos`;

        }

    }


    /* =====================================================
       ESCAPAR HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
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
       EVENTOS DEL CARRITO
    ===================================================== */

    function initCartEvents() {

        const list =
            document.getElementById(
                "cart-items-list"
            );


        if (!list) {

            return;

        }


        list.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );


                if (!button) {

                    return;

                }


                const action =
                    button.dataset.action;


                const index =
                    Number(
                        button.dataset.index
                    );


                if (
                    Number.isNaN(index)
                ) {

                    return;

                }


                const cart =
                    getCart();


                if (!cart[index]) {

                    return;

                }


                const currentQuantity =
                    Number(
                        cart[index].quantity || 1
                    );


                if (
                    action === "increase"
                ) {

                    updateQuantity(
                        index,
                        currentQuantity + 1
                    );

                }


                if (
                    action === "decrease"
                ) {

                    updateQuantity(
                        index,
                        currentQuantity - 1
                    );

                }


                if (
                    action === "remove"
                ) {

                    removeFromCart(
                        index
                    );

                }

            }
        );

    }


    /* =====================================================
       CONTADOR DEL CARRITO
    ===================================================== */

    function updateCartCount() {

        const quantity =
            getCartQuantity();


        /*
         * Si posteriormente agregamos
         * un contador visual al carrito,
         * esta función ya estará preparada.
         */

        document.querySelectorAll(
            "[data-satori-cart-count]"
        ).forEach(
            badge => {

                badge.textContent =
                    quantity;

                badge.hidden =
                    quantity === 0;

            }
        );

    }


    /* =====================================================
       BOTÓN FINALIZAR COMPRA
    ===================================================== */

    function initCheckout() {

        const button =
            document.getElementById(
                "cart-checkout-button"
            );


        if (!button) {

            return;

        }


        button.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();


                if (
                    cart.length === 0
                ) {

                    return;

                }


                /*
                 * TODAVÍA NO conectamos
                 * Webpay / Mercado Pago / etc.
                 *
                 * Por ahora evitamos que
                 * el botón haga algo incorrecto.
                 */

                alert(
                    "El sistema de pago se conectará próximamente."
                );

            }
        );

    }


    /* =====================================================
       INICIALIZAR
    ===================================================== */

    function init() {

        initCartEvents();

        initCheckout();

        renderCart();

        updateCartCount();

    }


    /* =====================================================
       EXPONER FUNCIONES
       PARA LAS DEMÁS PÁGINAS
    ===================================================== */

    window.SATORII_CART = {

        getCart,

        addToCart,

        updateQuantity,

        removeFromCart,

        getCartQuantity,

        getCartTotal,

        renderCart,

        updateCartCount

    };


    /* =====================================================
       INICIAR
    ===================================================== */

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

})();
