/* =========================================================
   SATORII · CATÁLOGO DE PRODUCTOS
   =========================================================

   Este archivo controla:

   - Catálogos
   - Categorías
   - Filtros
   - Tarjetas
   - Recomendaciones

   products.js se carga automáticamente si es necesario.
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CARGAR PRODUCTS.JS
    ===================================================== */

    function loadProductsScript(callback) {

        /*
         * Si PRODUCTS ya existe, no necesitamos
         * cargar nada.
         */

        if (
            typeof PRODUCTS !== "undefined"
        ) {

            callback();

            return;

        }


        /*
         * Buscar si products.js ya está siendo
         * cargado por otro script.
         */

        const existingScript =
            document.querySelector(
                'script[src$="/js/products.js"], script[src="js/products.js"], script[src="../../js/products.js"]'
            );


        if (
            existingScript
        ) {

            /*
             * Esperar a que termine de cargar.
             */

            existingScript.addEventListener(
                "load",
                function () {

                    callback();

                },
                {
                    once: true
                }
            );


            existingScript.addEventListener(
                "error",
                function () {

                    showCatalogError();

                },
                {
                    once: true
                }
            );


            /*
             * Si el script ya terminó pero PRODUCTS
             * sigue sin existir, dejamos que el
             * callback compruebe el estado.
             */

            setTimeout(
                function () {

                    if (
                        typeof PRODUCTS !== "undefined"
                    ) {

                        callback();

                    }

                },
                100
            );


            return;

        }


        /*
         * Determinar la ruta correcta según
         * la página actual.
         */

        const pathname =
            window.location.pathname;


        let productsPath =
            "js/products.js";


        /*
         * Las páginas dentro de /productos/
         * necesitan ../../js/products.js
         */

        if (
            pathname.includes("/productos/")
        ) {

            productsPath =
                "../../js/products.js";

        }


        /*
         * Crear el script.
         */

        const script =
            document.createElement(
                "script"
            );


        script.src =
            productsPath;


        script.onload =
            function () {

                if (
                    typeof PRODUCTS === "undefined"
                ) {

                    showCatalogError();

                    return;

                }


                callback();

            };


        script.onerror =
            function () {

                console.error(
                    "SatoriMode: no se pudo cargar:",
                    productsPath
                );


                showCatalogError();

            };


        document.head.appendChild(
            script
        );

    }


    /* =====================================================
       ERROR DE CATÁLOGO
    ===================================================== */

    function showCatalogError() {

        const productsGrid =
            document.querySelector(
                ".products-grid[data-category], #all-products-grid, #animeProductsGrid, #streetwearProductsGrid, #accesoriosProductsGrid"
            );


        if (
            !productsGrid
        ) {

            return;

        }


        productsGrid.innerHTML = `

            <div class="products-empty">

                <strong>
                    NO SE PUDO CARGAR EL CATÁLOGO.
                </strong>

                <p>
                    Revisa que js/products.js esté disponible.
                </p>

            </div>

        `;


        console.error(
            "SatoriMode: products.js no está disponible."
        );

    }


    /* =====================================================
       INICIALIZAR CATÁLOGO
    ===================================================== */

    function initProductsPage() {


        /*
         * Comprobación final.
         */

        if (
            typeof PRODUCTS === "undefined"
        ) {

            console.error(
                "SatoriMode: PRODUCTS no está definido."
            );


            showCatalogError();

            return;

        }


        console.log(
            `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
        );


        /* =================================================
           UTILIDADES
        ================================================= */

        function formatPrice(price) {

            return new Intl.NumberFormat(
                "es-CL"
            ).format(
                Number(price || 0)
            );

        }


        /*
         * Detecta si estamos dentro de:

         /productos/anime/
         /productos/streetwear/
         /productos/accesorios/
         */

        function isProductPage() {

            return window.location.pathname
                .includes("/productos/");

        }


        /*
         * Convierte una ruta de imagen de
         * products.js a una ruta correcta.
         */

        function getAssetPath(assetPath) {

            if (
                !assetPath
            ) {

                return "";

            }


            if (
                isProductPage()
            ) {

                return "../../" + assetPath;

            }


            return assetPath;

        }


        /*
         * Convierte la URL de un producto.
         */

        function getProductUrl(product) {

            if (
                !product ||
                !product.url
            ) {

                return "#";

            }


            if (
                isProductPage()
            ) {

                return "../../" + product.url;

            }


            return product.url;

        }


        /* =================================================
           CREAR TARJETA
        ================================================= */

        function createProductCard(product) {

            const card =
                document.createElement(
                    "a"
                );


            card.className =
                "product-card";


            card.href =
                getProductUrl(
                    product
                );


            const image =
                product.image ||
                (
                    Array.isArray(
                        product.images
                    )
                        ? product.images[0]
                        : ""
                ) ||
                "";


            const imagePath =
                getAssetPath(
                    image
                );


            const collection =
                (
                    product.collection ||
                    product.category ||
                    ""
                ).toUpperCase();


            const sizes =
                Array.isArray(
                    product.sizes
                ) &&
                product.sizes.length
                    ? product.sizes.join(
                        " · "
                    )
                    : "Consultar";


            card.innerHTML = `

                <div class="product-image">

                    ${
                        imagePath

                            ? `

                                <img
                                    src="${imagePath}"
                                    alt="${product.name || ""}"
                                    loading="lazy"
                                >

                            `

                            : `

                                <div class="image-placeholder">
                                    SIN IMAGEN
                                </div>

                            `
                    }

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${collection}
                    </span>


                    <h3>
                        ${product.name || ""}
                    </h3>


                    <p class="product-price">
                        $${formatPrice(product.price)}
                    </p>


                    <p class="product-details">
                        Tallas ${sizes}
                    </p>

                </div>

            `;


            return card;

        }


        /* =================================================
           CONTENEDOR DEL CATÁLOGO
        ================================================= */

        const productsGrid =
            document.querySelector(
                ".products-grid[data-category], #all-products-grid, #animeProductsGrid, #streetwearProductsGrid, #accesoriosProductsGrid"
            );


        if (
            !productsGrid
        ) {

            console.log(
                "SatoriMode: no hay catálogo principal en esta página."
            );


            return;

        }


        /* =================================================
           CATEGORÍA
        ================================================= */

        let pageCategory =
            productsGrid.dataset.category ||
            null;


        if (
            !pageCategory &&
            productsGrid.id ===
                "animeProductsGrid"
        ) {

            pageCategory =
                "anime";

        }


        if (
            !pageCategory &&
            productsGrid.id ===
                "streetwearProductsGrid"
        ) {

            pageCategory =
                "streetwear";

        }


        if (
            !pageCategory &&
            productsGrid.id ===
                "accesoriosProductsGrid"
        ) {

            pageCategory =
                "accesorios";

        }


        if (
            pageCategory ===
            "all"
        ) {

            pageCategory =
                null;

        }


        /* =================================================
           FILTROS
        ================================================= */

        let activeFilters = {

            collection: null,

            size: null,

            color: null

        };


        /* =================================================
           OBTENER PRODUCTOS
        ================================================= */

        function getPageProducts() {

            return PRODUCTS.filter(
                function (product) {

                    /*
                     * Solo productos disponibles.
                     */

                    if (
                        product.available !== true
                    ) {

                        return false;

                    }


                    /*
                     * Categoría.
                     */

                    if (
                        pageCategory &&
                        product.category !==
                            pageCategory
                    ) {

                        return false;

                    }


                    return true;

                }
            );

        }


        /* =================================================
           FILTROS
        ================================================= */

        function applyFilters(
            products
        ) {

            return products.filter(
                function (product) {


                    /*
                     * COLECCIÓN
                     */

                    if (
                        activeFilters.collection &&
                        product.category !==
                            activeFilters.collection
                    ) {

                        return false;

                    }


                    /*
                     * TALLA
                     */

                    if (
                        activeFilters.size &&
                        (
                            !Array.isArray(
                                product.sizes
                            ) ||
                            !product.sizes.includes(
                                activeFilters.size
                            )
                        )
                    ) {

                        return false;

                    }


                    /*
                     * COLOR
                     */

                    if (
                        activeFilters.color &&
                        (
                            !Array.isArray(
                                product.colors
                            ) ||
                            !product.colors.some(
                                function (color) {

                                    return (
                                        String(color)
                                            .toLowerCase()
                                            .trim() ===
                                        String(
                                            activeFilters.color
                                        )
                                            .toLowerCase()
                                            .trim()
                                    );

                                }
                            )
                        )
                    ) {

                        return false;

                    }


                    return true;

                }
            );

        }


        /* =================================================
           MOSTRAR PRODUCTOS
        ================================================= */

        function renderProducts() {

            productsGrid.innerHTML =
                "";


            let products =
                getPageProducts();


            products =
                applyFilters(
                    products
                );


            if (
                products.length === 0
            ) {

                productsGrid.innerHTML = `

                    <div class="products-empty">

                        <strong>
                            NO ENCONTRAMOS PRODUCTOS.
                        </strong>

                        <p>
                            Prueba quitando alguno de los filtros.
                        </p>

                    </div>

                `;


                return;

            }


            products.forEach(
                function (product) {

                    productsGrid.appendChild(
                        createProductCard(
                            product
                        )
                    );

                }
            );

        }


        /* =================================================
           RECOMENDACIONES
        ================================================= */

        function getRandomRecommendations(
            currentProductId,
            limit
        ) {

            const products =
                PRODUCTS.filter(
                    function (product) {

                        return (
                            product.available === true &&
                            product.id !==
                                currentProductId
                        );

                    }
                );


            products.sort(
                function () {

                    return Math.random() - 0.5;

                }
            );


            return products.slice(
                0,
                limit
            );

        }


        /* =================================================
           PRODUCTO ACTUAL
        ================================================= */

        function getCurrentProductId() {

            const recommendationContainer =
                document.querySelector(
                    "#relatedProductsGrid, #recommendedProductsGrid"
                );


            if (
                recommendationContainer &&
                recommendationContainer.dataset.productId
            ) {

                return (
                    recommendationContainer
                        .dataset
                        .productId
                );

            }


            const currentPath =
                window.location.pathname;


            const currentProduct =
                PRODUCTS.find(
                    function (product) {

                        if (
                            !product.url
                        ) {

                            return false;

                        }


                        /*
                         * Normalizar ambas rutas.
                         */

                        const productUrl =
                            product.url
                                .replace(
                                    /^\/+/,
                                    ""
                                );


                        return currentPath.endsWith(
                            productUrl
                        );

                    }
                );


            if (
                currentProduct
            ) {

                return currentProduct.id;

            }


            return null;

        }


        /* =================================================
           MOSTRAR RECOMENDACIONES
        ================================================= */

        function renderRecommendations() {

            const recommendationContainer =
                document.querySelector(
                    "#relatedProductsGrid, #recommendedProductsGrid"
                );


            if (
                !recommendationContainer
            ) {

                return;

            }


            const currentProductId =
                getCurrentProductId();


            const recommendations =
                getRandomRecommendations(
                    currentProductId,
                    3
                );


            recommendationContainer.innerHTML =
                "";


            recommendations.forEach(
                function (product) {

                    recommendationContainer.appendChild(
                        createProductCard(
                            product
                        )
                    );

                }
            );


            console.log(
                "SatoriMode · Recomendaciones:",
                recommendations.map(
                    function (product) {

                        return product.name;

                    }
                )
            );

        }


        /* =================================================
           FILTROS VISUALES
        ================================================= */

        const filterButtons =
            document.querySelectorAll(
                ".anime-filter"
            );


        filterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const filterType =
                            button.dataset.filter;


                        const filterValue =
                            button.dataset.value;


                        if (
                            !Object.prototype.hasOwnProperty.call(
                                activeFilters,
                                filterType
                            )
                        ) {

                            return;

                        }


                        if (
                            activeFilters[
                                filterType
                            ] ===
                            filterValue
                        ) {

                            activeFilters[
                                filterType
                            ] = null;


                            button.classList.remove(
                                "active"
                            );

                        }
                        else {

                            document
                                .querySelectorAll(
                                    `.anime-filter[data-filter="${filterType}"]`
                                )
                                .forEach(
                                    function (
                                        otherButton
                                    ) {

                                        otherButton.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            activeFilters[
                                filterType
                            ] =
                                filterValue;


                            button.classList.add(
                                "active"
                            );

                        }


                        renderProducts();

                    }
                );

            }
        );


        /* =================================================
           BOTÓN DE FILTROS
        ================================================= */

        const filterToggle =
            document.getElementById(
                "products-filter-toggle"
            );


        const filtersContainer =
            document.getElementById(
                "products-filters"
            );


        if (
            filterToggle &&
            filtersContainer
        ) {

            filterToggle.addEventListener(
                "click",
                function () {

                    filtersContainer.classList.toggle(
                        "is-open"
                    );


                    const isOpen =
                        filtersContainer.classList.contains(
                            "is-open"
                        );


                    filterToggle.textContent =
                        isOpen
                            ? "OCULTAR FILTROS"
                            : "MOSTRAR FILTROS";

                }
            );

        }


        /* =================================================
           ESTILOS DE ERROR / SIN RESULTADOS
        ================================================= */

        if (
            !document.getElementById(
                "products-page-styles"
            )
        ) {

            const style =
                document.createElement(
                    "style"
                );


            style.id =
                "products-page-styles";


            style.textContent = `

                .products-empty {

                    grid-column:
                        1 / -1;

                    width:
                        100%;

                    padding:
                        80px 20px;

                    text-align:
                        center;

                }


                .products-empty strong {

                    display:
                        block;

                    font-size:
                        18px;

                    font-weight:
                        900;

                    letter-spacing:
                        1px;

                }


                .products-empty p {

                    margin-top:
                        10px;

                    color:
                        #777;

                    font-size:
                        14px;

                }

            `;


            document.head.appendChild(
                style
            );

        }


        /* =================================================
           GENERAR
        ================================================= */

        renderProducts();


        renderRecommendations();


        console.log(
            `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
        );


        if (
            pageCategory
        ) {

            console.log(
                `SatoriMode · Categoría: ${pageCategory}`
            );

        }
        else {

            console.log(
                "SatoriMode · Mostrando todos los productos."
            );

        }

    }


    /* =====================================================
       INICIO
    ===================================================== */

    function start() {

        loadProductsScript(
            initProductsPage
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            start,
            {
                once:
                    true
            }
        );

    }
    else {

        start();

    }


})();
