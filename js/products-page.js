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
   - recomendaciones
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

            Esto es importante porque las rutas de
            products.js están escritas desde la raíz.
        */

        function isProductPage() {

            return window.location.pathname
                .includes("/productos/");

        }


        /*
            Convierte una ruta de products.js en una
            ruta correcta para la página actual.
        */

        function getAssetPath(path) {

            if (!path) {

                return "";

            }


            /*
                En páginas individuales:

                /productos/anime/goku.html

                necesitamos:

                ../../productos/anime/imagen.PNG
            */

            if (isProductPage()) {

                return "../../" + path;

            }


            /*
                En páginas normales:

                /anime.html

                funciona directamente:

                productos/anime/imagen.PNG
            */

            return path;

        }


        /*
            Convierte la URL del producto para que
            funcione correctamente desde cualquier página.
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
           BUSCAR CONTENEDOR
        ================================================= */

        const productsGrid =
            document.querySelector(
                ".products-grid[data-category], #all-products-grid, #animeProductsGrid, #streetwearProductsGrid, #accesoriosProductsGrid"
            );


        /*
            Si no existe un contenedor de productos,
            no hacemos nada.

            Esto evita interferir con otros elementos
            de la página.
        */

        if (!productsGrid) {

            console.log(
                "SatoriMode: no hay catálogo de productos en esta página."
            );

            return;

        }


        /* =================================================
           DETECTAR CATEGORÍA
        ================================================= */

        let pageCategory =
            productsGrid.dataset.category ||
            null;


        /*
            Compatibilidad con IDs antiguos.
        */

        if (
            !pageCategory &&
            productsGrid.id === "animeProductsGrid"
        ) {

            pageCategory = "anime";

        }


        if (
            !pageCategory &&
            productsGrid.id === "streetwearProductsGrid"
        ) {

            pageCategory = "streetwear";

        }


        if (
            !pageCategory &&
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
           CREAR TARJETA
        ================================================= */

        function createProductCard(product) {


            const card =
                document.createElement("a");


            card.className =
                "product-card";


            /*
                IMPORTANTE:

                Usamos una ruta corregida dependiendo
                de dónde esté ubicada la página.
            */

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
           OBTENER PRODUCTOS
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
           COMPROBACIÓN
        ================================================= */

        console.log(
            `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
        );


        console.log(
            pageCategory

                ? `SatoriMode · Categoría: ${pageCategory}`

                : "SatoriMode · Mostrando todos los productos."
        );


    }

);
