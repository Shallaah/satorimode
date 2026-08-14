/* =========================================================
   SATORIMODE · GENERADOR DE PRODUCTOS
   =========================================================

   Funciona automáticamente en:

   - productos.html
   - anime.html
   - streetwear.html
   - accesorios.html
   - páginas individuales de productos

   También genera correctamente:

   - tarjetas de productos
   - imágenes
   - enlaces
   - recomendaciones aleatorias
   - filtros
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


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
            Detecta si estamos dentro de:

            /productos/anime/
            /productos/streetwear/
            /productos/accesorios/
        */

        function isProductPage() {

            return window.location.pathname
                .includes("/productos/");

        }


        /*
            Convierte una ruta de products.js en
            una ruta correcta para la página actual.
        */

        function getAssetPath(path) {

            if (!path) {

                return "";

            }


            /*
                Página individual:

                /productos/anime/goku.html

                ../../productos/anime/imagen.PNG
            */

            if (isProductPage()) {

                return "../../" + path;

            }


            /*
                Página normal:

                /anime.html

                productos/anime/imagen.PNG
            */

            return path;

        }


        /*
            Convierte la URL del producto para que
            funcione desde cualquier página.
        */

        function getProductUrl(product) {

            if (!product || !product.url) {

                return "#";

            }


            if (isProductPage()) {

                return "../../" + product.url;

            }


            return product.url;

        }


        /* =================================================
           COMPROBAR PRODUCTS.JS
        ================================================= */

        if (
            typeof PRODUCTS === "undefined"
        ) {

            console.error(
                "SatoriMode: products.js no está cargado."
            );

            return;

        }


        /* =================================================
           CREAR TARJETA DE PRODUCTO
        ================================================= */

        function createProductCard(product) {

            const card =
                document.createElement("a");


            card.className =
                "product-card";


            card.href =
                getProductUrl(product);


            const image =
                product.image ||
                (
                    product.images &&
                    product.images[0]
                ) ||
                "";


            const imagePath =
                getAssetPath(image);


            card.innerHTML = `

                <div class="product-image">

                    ${
                        imagePath

                        ?

                        `
                        <img
                            src="${imagePath}"
                            alt="${product.name || ""}"
                            loading="lazy"
                        >
                        `

                        :

                        `
                        <div class="image-placeholder">
                            SIN IMAGEN
                        </div>
                        `
                    }

                </div>


                <div class="product-info">

                    <span class="product-category">

                        ${(
                            product.collection ||
                            product.category ||
                            ""
                        ).toUpperCase()}

                    </span>


                    <h3>
                        ${product.name || ""}
                    </h3>


                    <p class="product-price">

                        $${formatPrice(product.price)}

                    </p>


                    <p class="product-details">

                        Tallas

                        ${
                            Array.isArray(
                                product.sizes
                            ) &&
                            product.sizes.length

                                ? product.sizes.join(
                                    " · "
                                )

                                : "Consultar"
                        }

                    </p>

                </div>

            `;


            return card;

        }


        /* =================================================
           BUSCAR CONTENEDOR PRINCIPAL
        ================================================= */

        const productsGrid =
            document.querySelector(
                ".products-grid[data-category], #all-products-grid, #animeProductsGrid, #streetwearProductsGrid, #accesoriosProductsGrid"
            );


        /*
            Si no existe un catálogo principal,
            no interferimos con la página.
        */

        if (!productsGrid) {

            console.log(
                "SatoriMode: no hay catálogo principal de productos en esta página."
            );

        }


        /* =================================================
           DETECTAR CATEGORÍA
        ================================================= */

        let pageCategory =
            productsGrid
                ? productsGrid.dataset.category || null
                : null;


        /*
            Compatibilidad con IDs antiguos.
        */

        if (
            !pageCategory &&
            productsGrid &&
            productsGrid.id === "animeProductsGrid"
        ) {

            pageCategory = "anime";

        }


        if (
            !pageCategory &&
            productsGrid &&
            productsGrid.id === "streetwearProductsGrid"
        ) {

            pageCategory = "streetwear";

        }


        if (
            !pageCategory &&
            productsGrid &&
            productsGrid.id === "accesoriosProductsGrid"
        ) {

            pageCategory = "accesorios";

        }


        /*
            "all" = todos los productos.
        */

        if (
            pageCategory === "all"
        ) {

            pageCategory = null;

        }


        /* =================================================
           ESTADO DE FILTROS
        ================================================= */

        let activeFilters = {

            collection: null,

            size: null,

            color: null

        };


        /* =================================================
           OBTENER PRODUCTOS DE LA PÁGINA
        ================================================= */

        function getPageProducts() {

            return PRODUCTS.filter(
                function (product) {


                    /*
                        Solo productos disponibles.
                    */

                    if (
                        product.available !== true
                    ) {

                        return false;

                    }


                    /*
                        Filtrar por categoría.
                    */

                    if (
                        pageCategory &&
                        product.category !== pageCategory
                    ) {

                        return false;

                    }


                    return true;

                }
            );

        }


        /* =================================================
           APLICAR FILTROS
        ================================================= */

        function applyFilters(
            products
        ) {

            return products.filter(
                function (product) {


                    /* -------------------------------------
                       COLECCIÓN
                    -------------------------------------- */

                    if (
                        activeFilters.collection &&
                        product.category !==
                        activeFilters.collection
                    ) {

                        return false;

                    }


                    /* -------------------------------------
                       TALLA
                    -------------------------------------- */

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


                    /* -------------------------------------
                       COLOR
                    -------------------------------------- */

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

            if (!productsGrid) {

                return;

            }


            productsGrid.innerHTML = "";


            let products =
                getPageProducts();


            products =
                applyFilters(
                    products
                );


            /* =============================================
               SIN RESULTADOS
            ============================================== */

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


            /* =============================================
               CREAR TARJETAS
            ============================================== */

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
           RECOMENDACIONES ALEATORIAS
        ================================================= */

        function getRandomRecommendations(
            currentProductId,
            limit = 3
        ) {


            /*
                Tomamos TODOS los productos disponibles.

                No importa si son:
                - Anime
                - Streetwear
                - Accesorios

                Así las recomendaciones pueden variar.
            */

            let products =
                PRODUCTS.filter(
                    function (product) {

                        return (
                            product.available === true &&
                            product.id !== currentProductId
                        );

                    }
                );


            /*
                Mezclar aleatoriamente.

                De esta manera cada vez que se
                genere la sección puede aparecer
                una combinación diferente.
            */

            products.sort(
                function () {

                    return Math.random() - 0.5;

                }
            );


            /*
                Devolver solamente la cantidad
                solicitada.
            */

            return products.slice(
                0,
                limit
            );

        }


        /* =================================================
           OBTENER PRODUCTO ACTUAL
        ================================================= */

        function getCurrentProductId() {

            /*
                Opción 1:
                el contenedor de recomendaciones
                puede indicar el ID.
            */

            const recommendationContainer =
                document.querySelector(
                    "#relatedProductsGrid, #recommendedProductsGrid"
                );


            if (
                recommendationContainer &&
                recommendationContainer.dataset.productId
            ) {

                return recommendationContainer
                    .dataset
                    .productId;

            }


            /*
                Opción 2:
                intentar obtener el ID desde
                la URL actual comparándola con
                products.js.
            */

            const currentPath =
                window.location.pathname;


            const currentProduct =
                PRODUCTS.find(
                    function (product) {

                        if (!product.url) {

                            return false;

                        }


                        return (
                            currentPath.endsWith(
                                product.url
                            )
                        );

                    }
                );


            if (currentProduct) {

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


            /*
                Si la página no tiene recomendaciones,
                no hacemos nada.
            */

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


            /*
                Si no hay suficientes productos,
                mostramos los disponibles.
            */

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
                "SatoriMode · Recomendaciones generadas:",
                recommendations.map(
                    function (product) {

                        return product.name;

                    }
                )
            );

        }


        /* =================================================
           FILTROS
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


                        /*
                            Ignorar filtros desconocidos.
                        */

                        if (
                            !Object.prototype.hasOwnProperty.call(
                                activeFilters,
                                filterType
                            )
                        ) {

                            return;

                        }


                        /*
                            Si ya estaba seleccionado,
                            quitarlo.
                        */

                        if (
                            activeFilters[
                                filterType
                            ] === filterValue
                        ) {

                            activeFilters[
                                filterType
                            ] = null;


                            button.classList.remove(
                                "active"
                            );

                        }

                        else {


                            /*
                                Desactivar otros filtros
                                del mismo grupo.
                            */

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
                            ] = filterValue;


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
           BOTÓN MOSTRAR FILTROS
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
           ESTILOS DE "SIN RESULTADOS"
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
           GENERAR CATÁLOGO
        ================================================= */

        renderProducts();


        /* =================================================
           GENERAR RECOMENDACIONES
        ================================================= */

        renderRecommendations();


        /* =================================================
           COMPROBACIÓN
        ================================================= */

        console.log(
            `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
        );


        if (pageCategory) {

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

);
