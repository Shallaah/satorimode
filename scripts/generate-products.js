/* =====================================================
   BLOQUE DE CONFIANZA
===================================================== */

function generateTrustBlocks(product) {

    const details =
        product.details || {};

    const shipping =
        details.shipping ||
        "Envíos a todo Chile.";

    const warranty =
        details.warranty ||
        "Compra protegida frente a fallas de fabricación.";

    return `

        <div class="satori-trust-grid">

            <div class="satori-trust-item">

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
                    🚚
                </div>

                <div>

                    <strong>
                        ENVÍOS
                    </strong>

                    <span>
                        ${escapeHTML(shipping)}
                    </span>

                </div>

            </div>


            <div class="satori-trust-item">

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
                    🔒
                </div>

                <div>

                    <strong>
                        COMPRA SEGURA
                    </strong>

                    <span>
                        Compra protegida.
                    </span>

                </div>

            </div>


            <div class="satori-trust-item">

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
                    ✦
                </div>

                <div>

                    <strong>
                        CALIDAD SATORII
                    </strong>

                    <span>
                        ${escapeHTML(warranty)}
                    </span>

                </div>

            </div>

        </div>

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


    <!-- =================================================
         HEADER
    ================================================= -->

    <div
        id="satori-header"
    ></div>


    <!-- =================================================
         CONTENIDO
    ================================================= -->

    <main>

        <div
            class="satori-product-page"
        >


            <!-- =================================================
                 PRODUCTO
            ================================================= -->

            <section
                class="satori-product-layout"
                id="producto"
            >


                <!-- =================================================
                     GALERÍA
                ================================================= -->

                <div
                    class="satori-product-gallery"
                >

                    ${generateGallery(
                        product,
                        outputDirectory
                    )}

                </div>


                <!-- =================================================
                     INFORMACIÓN
                ================================================= -->

                <div
                    class="satori-product-info"

                    data-product

                    data-product-id="${escapeHTML(product.id)}"

                    data-product-name="${name}"

                    data-product-price="${escapeHTML(product.price)}"

                    data-product-image="${escapeHTML(mainImage)}"
                >


                    <!-- CATEGORÍA -->

                    <span
                        class="satori-product-category"
                    >
                        ${category}
                    </span>


                    <!-- NOMBRE -->

                    <h1>
                        ${name}
                    </h1>


                    <!-- PRECIO -->

                    <div
                        class="satori-product-price"
                    >
                        ${price}
                    </div>


                    <div
                        class="satori-product-divider"
                    ></div>


                    <!-- COLOR -->

                    ${generateColors(
                        product
                    )}


                    <!-- TALLA -->

                    ${generateSizes(
                        product
                    )}


                    <!-- =================================================
                         CANTIDAD
                    ================================================= -->

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


                    <!-- =================================================
                         AGREGAR AL CARRITO
                    ================================================= -->

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


                    <!-- =================================================
                         CONFIANZA
                    ================================================= -->

                    ${generateTrustBlocks(
                        product
                    )}


                    <!-- =================================================
                         DESCRIPCIÓN / ENVÍOS
                    ================================================= -->

                    ${generateDescription(
                        product,
                        "clothing"
                    )}

                </div>

            </section>


            <!-- =================================================
                 CUIDA TU SATORII
            ================================================= -->

            ${generateCareBanner(
                product,
                outputDirectory,
                "clothing"
            )}


            <!-- =================================================
                 RECOMENDACIONES
            ================================================= -->

            ${generateRecommendations(
                product,
                allProducts,
                outputDirectory,
                "clothing"
            )}


            <!-- =================================================
                 BANNER EDITORIAL
            ================================================= -->

            ${generateEditorialBanner(
                product,
                outputDirectory,
                "clothing"
            )}

        </div>

    </main>


    <!-- =================================================
         FOOTER
    ================================================= -->

    <div
        id="satori-footer"
    ></div>


    <!-- =================================================
         SCRIPTS
    ================================================= -->

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
