/* =========================================================
   SATORIMODE
   GENERADOR AUTOMÁTICO DE PRODUCTOS
   =========================================================

   Este archivo utiliza PRODUCTS de products.js.

   Funciona automáticamente en:

   - productos.html
   - anime.html
   - streetwear.html
   - accesorios.html

   La categoría se determina mediante:

   data-category="anime"

   Si no existe categoría:
   muestra todos los productos.
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       BUSCAR CONTENEDOR
    ===================================================== */

    const productsGrid =
        document.querySelector(
            "#all-products-grid, #animeProductsGrid"
        );


    if (!productsGrid) {

        return;

    }


    /* =====================================================
       COMPROBAR PRODUCTS.JS
    ===================================================== */

    if (
        typeof PRODUCTS === "undefined"
    ) {

        console.error(
            "SatoriMode: products.js no está cargado."
        );

        return;

    }


    /* =====================================================
       DETECTAR CATEGORÍA
    ===================================================== */

    let pageCategory =
        productsGrid.dataset.category || null;


    /*
        Compatibilidad con el anime.html
        que actualmente utiliza animeProductsGrid.
    */

    if (
        !pageCategory &&
        productsGrid.id === "animeProductsGrid"
    ) {

        pageCategory = "anime";

    }


    /* =====================================================
       ESTADO DE FILTROS
    ===================================================== */

    let activeFilters = {

        collection: null,

        size: null,

        color: null

    };


    /* =====================================================
       FORMATEAR PRECIO
    ===================================================== */

    function formatPrice(price) {

        return new Intl.NumberFormat(
            "es-CL"
        ).format(price);

    }


    /* =====================================================
       CREAR TARJETA
    ===================================================== */

    function createProductCard(product) {


        const card =
            document.createElement("a");


        card.className =
            "product-card";


        card.href =
            product.url || "#";


        const image =
            product.image ||
            (
                product.images &&
                product.images[0]
            ) ||
            "";


        card.innerHTML = `

            <div class="product-image">

                ${
                    image

                    ?

                    `
                    <img
                        src="${image}"
                        alt="${product.name}"
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

                    ${product.name}

                </h3>


                <p class="product-price">

                    $${formatPrice(product.price)}

                </p>


                <p class="product-details">

                    Tallas
                    ${
                        product.sizes
                            ? product.sizes.join(" · ")
                            : "Consultar"
                    }

                </p>

            </div>

        `;


        return card;

    }


    /* =====================================================
       OBTENER PRODUCTOS DE LA PÁGINA
    ===================================================== */

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
                    Si la página tiene categoría,
                    solamente mostramos esa categoría.
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


    /* =====================================================
       APLICAR FILTROS
    ===================================================== */

    function applyFilters(products) {


        return products.filter(
            function (product) {


                /* -----------------------------------------
                   COLECCIÓN
                ------------------------------------------ */

                if (
                    activeFilters.collection &&
                    product.category !==
                    activeFilters.collection
                ) {

                    return false;

                }


                /* -----------------------------------------
                   TALLA
                ------------------------------------------ */

                if (
                    activeFilters.size &&
                    (
                        !product.sizes ||
                        !product.sizes.includes(
                            activeFilters.size
                        )
                    )
                ) {

                    return false;

                }


                /* -----------------------------------------
                   COLOR
                ------------------------------------------ */

                if (
                    activeFilters.color &&
                    (
                        !product.colors ||
                        !product.colors.some(
                            function (color) {

                                return (
                                    color.toLowerCase() ===
                                    activeFilters.color
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


    /* =====================================================
       MOSTRAR PRODUCTOS
    ===================================================== */

    function renderProducts() {


        productsGrid.innerHTML = "";


        let products =
            getPageProducts();


        products =
            applyFilters(products);


        /* =================================================
           SIN RESULTADOS
        ================================================== */

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


        /* =================================================
           CREAR TARJETAS
        ================================================== */

        products.forEach(
            function (product) {

                productsGrid.appendChild(
                    createProductCard(product)
                );

            }
        );

    }


    /* =====================================================
       FILTROS
    ===================================================== */

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
                        Si ya estaba seleccionado,
                        lo quitamos.
                    */

                    if (
                        activeFilters[filterType] ===
                        filterValue
                    ) {

                        activeFilters[filterType] =
                            null;

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
                                function (otherButton) {

                                    otherButton.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        activeFilters[filterType] =
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


    /* =====================================================
       BOTÓN MOSTRAR FILTROS
    ===================================================== */

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


    /* =====================================================
       MENSAJE SIN RESULTADOS
    ===================================================== */

    if (
        !document.getElementById(
            "products-page-styles"
        )
    ) {


        const style =
            document.createElement("style");


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


    /* =====================================================
       GENERAR CATÁLOGO
    ===================================================== */

    renderProducts();


    /* =====================================================
       MENSAJE
    ===================================================== */

    console.log(
        `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
    );

    console.log(
        pageCategory
            ? `SatoriMode · Categoría: ${pageCategory}`
            : "SatoriMode · Mostrando todos los productos."
    );


});
