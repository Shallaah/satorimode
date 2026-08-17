/* =====================================================
   JAVASCRIPT DE LA PÁGINA
===================================================== */

function generateProductJS() {

    return `

<script>

(function () {

    "use strict";


    /* =================================================
       GALERÍA
    ================================================= */

    const mainImage =
        document.getElementById(
            "satoriMainImage"
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
                        this.getAttribute(
                            "data-image"
                        );


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


    /* =================================================
       COLOR
    ================================================= */

    const colorButtons =
        document.querySelectorAll(
            ".satori-color-button"
        );


    colorButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    colorButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    /*
                     * Guardamos la selección
                     * para que otros scripts
                     * puedan utilizarla.
                     */

                    const selectedColor =
                        this.getAttribute(
                            "data-color"
                        );


                    const productContainer =
                        document.querySelector(
                            "[data-product]"
                        );


                    if (
                        productContainer
                    ) {

                        productContainer.dataset.color =
                            selectedColor;

                    }

                }
            );

        }
    );


    /* =================================================
       TALLA
    ================================================= */

    const sizeButtons =
        document.querySelectorAll(
            ".satori-size-button"
        );


    sizeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


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


                    const selectedSize =
                        this.getAttribute(
                            "data-size"
                        );


                    const productContainer =
                        document.querySelector(
                            "[data-product]"
                        );


                    if (
                        productContainer
                    ) {

                        productContainer.dataset.size =
                            selectedSize;

                    }

                }
            );

        }
    );


    /* =================================================
       CANTIDAD
    ================================================= */

    let quantity = 1;


    const quantityDisplay =
        document.getElementById(
            "satoriQuantity"
        );


    const quantityInput =
        document.getElementById(
            "quantity"
        );


    const minusButton =
        document.getElementById(
            "satoriQuantityMinus"
        );


    const plusButton =
        document.getElementById(
            "satoriQuantityPlus"
        );


    function updateQuantity() {

        if (
            quantityDisplay
        ) {

            quantityDisplay.textContent =
                quantity;

        }


        if (
            quantityInput
        ) {

            quantityInput.value =
                quantity;

        }


        const productContainer =
            document.querySelector(
                "[data-product]"
            );


        if (
            productContainer
        ) {

            productContainer.dataset.quantity =
                quantity;

        }

    }


    if (
        minusButton
    ) {

        minusButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                if (
                    quantity > 1
                ) {

                    quantity--;

                }


                updateQuantity();

            }
        );

    }


    if (
        plusButton
    ) {

        plusButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                quantity++;


                updateQuantity();

            }
        );

    }


    updateQuantity();


    /* =================================================
       TABS
    ================================================= */

    const tabs =
        document.querySelectorAll(
            ".satori-tab"
        );


    const panels =
        document.querySelectorAll(
            ".satori-panel"
        );


    tabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const target =
                        this.getAttribute(
                            "data-tab"
                        );


                    tabs.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    panels.forEach(
                        function (panel) {

                            panel.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    const selectedPanel =
                        document.querySelector(
                            '[data-panel="' +
                            target +
                            '"]'
                        );


                    if (
                        selectedPanel
                    ) {

                        selectedPanel.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

        /* =================================================
       CARRITO
    ================================================= */

    const addButton =
        document.getElementById(
            "addToCart"
        );


    if (
        addButton
    ) {

        const originalText =
            addButton.textContent.trim();


        let resetTimer =
            null;


        /*
         * Función que muestra el estado
         * "AGREGADO AL CARRITO".
         */

        function showAddedState() {

            /*
             * Cancelamos cualquier
             * temporizador anterior.
             */

            if (
                resetTimer
            ) {

                clearTimeout(
                    resetTimer
                );

            }


            /*
             * Quitamos primero la clase
             * para poder reiniciar la animación.
             */

            addButton.classList.remove(
                "added"
            );


            /*
             * Fuerza al navegador a
             * recalcular la animación.
             */

            void addButton.offsetWidth;


            /*
             * Activamos el estado rojo.
             */

            addButton.classList.add(
                "added"
            );


            /*
             * Cambiamos el texto.

             */

            addButton.textContent =
                "✓ AGREGADO AL CARRITO";


            /*
             * Volvemos al estado original
             * después de 2 segundos.
             */

            resetTimer =
                setTimeout(
                    function () {

                        addButton.classList.remove(
                            "added"
                        );


                        addButton.textContent =
                            originalText;


                    },
                    2000
                );

        }


        /*
         * IMPORTANTE:
         *
         * No usamos preventDefault().
         * No usamos stopPropagation().
         *
         * Así el sistema real del carrito
         * puede recibir el clic.
         */

        addButton.addEventListener(
            "click",
            function () {

                /*
                 * Dejamos que cart.js procese
                 * primero el producto.
                 */

                setTimeout(
                    function () {

                        showAddedState();

                    },
                    80
                );

            }
        );

    }


    /* =================================================
       COMPATIBILIDAD CON CART.JS
    ================================================= */

    /*
     * Algunos sistemas de carrito pueden
     * cambiar clases o atributos del botón.
     *
     * Este observer detecta esos cambios
     * sin interferir con cart.js.
     */

    if (
        addButton
    ) {

        const cartObserver =
            new MutationObserver(
                function () {

                    /*
                     * No hacemos nada aquí.
                     *
                     * El observer solamente mantiene
                     * preparada la referencia del botón
                     * para sistemas externos.
                     */

                }
            );


        cartObserver.observe(
            addButton,
            {
                attributes:
                    true,

                attributeFilter:
                    [
                        "class"
                    ]

            }
        );

    }


    /* =================================================
       SELECCIÓN INICIAL
    ================================================= */

    /*
     * Si existe un color, dejamos
     * seleccionado el primero.
     */

    const firstColor =
        document.querySelector(
            ".satori-color-button"
        );


    if (
        firstColor &&
        !document.querySelector(
            ".satori-color-button.active"
        )
    ) {

        firstColor.classList.add(
            "active"
        );

    }


    /*
     * Si existe una talla, dejamos
     * seleccionada la primera.
     */

    const firstSize =
        document.querySelector(
            ".satori-size-button"
        );


    if (
        firstSize &&
        !document.querySelector(
            ".satori-size-button.active"
        )
    ) {

        firstSize.classList.add(
            "active"
        );

    }


})();

</script>

    `;

}

/* =====================================================
   HTML PRENDA
===================================================== */

function generateClothingHTML(
    product,
    outputDirectory,
    allProducts
) {

    const name =
        escapeHTML(
            product.name
        );


    const category =
        escapeHTML(
            String(
                product.collection ||
                product.category ||
                "SATORII"
            ).toUpperCase()
        );


    const price =
        formatPrice(
            product.price
        );


    const description =
        product.details?.description ||
        product.description ||
        (
            product.name +
            " · SATORII"
        );


    const images =
        getImages(
            product
        );


    const mainImage =
        images.length
            ? getImagePath(
                images[0],
                outputDirectory
            )
            : "";


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
        content="${escapeHTML(description)}"
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

        ${generateProductCSS()}

    </style>

</head>


<body

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"

>


    <div
        id="satori-header"
    ></div>


    <main>

        <div
            class="satori-product-page"
        >


            <section
                class="satori-product-layout"
                id="producto"
            >


                <div
                    class="satori-product-gallery"
                >

                    ${generateGallery(
                        product,
                        outputDirectory
                    )}

                </div>


                <div
                    class="satori-product-info"
                    data-product
                    data-product-id="${escapeHTML(product.id)}"
                    data-product-name="${name}"
                    data-product-price="${escapeHTML(product.price)}"
                    data-product-image="${escapeHTML(mainImage)}"
                >

                    <span
                        class="satori-product-category"
                    >
                        ${category}
                    </span>


                    <h1>
                        ${name}
                    </h1>


                    <div
                        class="satori-product-price"
                    >
                        ${price}
                    </div>


                    <div
                        class="satori-product-divider"
                    ></div>


                    ${generateColors(
                        product
                    )}


                    ${generateSizes(
                        product
                    )}


                    <div
                        class="satori-quantity-row"
                    >

                        <span
                            class="satori-quantity-label"
                        >
                            CANTIDAD
                        </span>


                        <div
                            class="satori-quantity"
                        >

                            <button
                                type="button"
                                id="satoriQuantityMinus"
                            >
                                −
                            </button>


                            <span
                                id="satoriQuantity"
                            >
                                1
                            </span>


                            <button
                                type="button"
                                id="satoriQuantityPlus"
                            >
                                +
                            </button>

                        </div>


                        <input
                            type="hidden"
                            id="quantity"
                            value="1"
                        >

                    </div>


                    <button
                        type="button"
                        id="addToCart"
                        class="
                            satori-add-to-cart
                            add-to-cart
                            add-to-cart-button
                        "
                        data-add-to-cart
                        data-product-id="${escapeHTML(product.id)}"
                    >

                        AGREGAR AL CARRITO · ${price}

                    </button>


                    ${generateTrustBlocks(
                        product
                    )}


                    ${generateDescription(
                        product,
                        "clothing"
                    )}

                </div>

            </section>


            ${generateCareBanner(
                product,
                outputDirectory,
                "clothing"
            )}


            ${generateRecommendations(
                product,
                allProducts,
                outputDirectory,
                "clothing"
            )}


            ${generateEditorialBanner(
                product,
                outputDirectory,
                "clothing"
            )}

        </div>

    </main>


    <div
        id="satori-footer"
    ></div>


    <script
        src="../../js/products.js"
    ></script>


    <script
        src="../../js/main.js"
    ></script>


    <script
        src="../../js/header.js"
    ></script>


    <script
        src="../../js/footer.js"
    ></script>


    <script
        src="../../js/cart.js"
    ></script>


    ${generateProductJS()}


</body>

</html>`;

}
