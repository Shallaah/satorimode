/* =========================================================
   SATORIMODE
   PÁGINA DE PRODUCTOS
   =========================================================

   Este archivo toma los productos de PRODUCTS
   (products.js) y genera automáticamente las tarjetas
   dentro de productos.html.
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CONTENEDOR
    ===================================================== */

    const productsGrid =
        document.getElementById(
            "all-products-grid"
        );


    /*
        Si la página no tiene el catálogo,
        no hacemos nada.
    */

    if (!productsGrid) {

        return;

    }



    /* =====================================================
       ESTADO DE LOS FILTROS
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
       CREAR TARJETA DE PRODUCTO
    ===================================================== */

    function createProductCard(product) {


        const card =
            document.createElement("a");


        card.className =
            "product-card";


        card.href =
            product.url;


        /*
            Guardamos información en la tarjeta.
            Esto también nos servirá para los filtros.
        */

        card.dataset.collection =
            product.category;


        card.dataset.sizes =
            product.sizes.join(",");


        card.dataset.colors =
            product.colors
                .map(function (color) {

                    return color.toLowerCase();

                })
                .join(",");



        /* =================================================
           CONTENIDO
        ================================================= */

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="product-category">

                    ${product.collection}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <p class="product-price">

                    $${formatPrice(product.price)}

                </p>


                <p class="product-details">

                    Tallas
                    ${product.sizes.join(" · ")}

                </p>

            </div>

        `;


        return card;

    }



    /* =====================================================
       MOSTRAR PRODUCTOS
    ===================================================== */

    function renderProducts() {


        /*
            Limpiamos el catálogo actual.
        */

        productsGrid.innerHTML = "";



        /*
            Obtenemos todos los productos disponibles.
        */

        const availableProducts =
            PRODUCTS.filter(
                function (product) {

                    return product.available === true;

                }
            );



        /*
            Aplicamos los filtros.
        */

        const filteredProducts =
            availableProducts.filter(
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
                        !product.sizes.includes(
                            activeFilters.size
                        )
                    ) {

                        return false;

                    }



                    /* -------------------------------------
                       COLOR
                    -------------------------------------- */

                    if (
                        activeFilters.color &&
                        !product.colors.some(
                            function (color) {

                                return (
                                    color.toLowerCase() ===
                                    activeFilters.color
                                );

                            }
                        )
                    ) {

                        return false;

                    }



                    return true;

                }
            );



        /* =================================================
           NINGÚN PRODUCTO
        ================================================== */

        if (
            filteredProducts.length === 0
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

        filteredProducts.forEach(
            function (product) {

                const card =
                    createProductCard(product);


                productsGrid.appendChild(
                    card
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



                    /* -------------------------------------
                       SI YA ESTÁ ACTIVO
                       LO DESACTIVAMOS
                    -------------------------------------- */

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
                            Quitamos activo de otros
                            botones del mismo grupo.
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



                    /*
                        Volvemos a generar el catálogo.
                    */

                    renderProducts();

                }
            );


        }
    );



    /* =====================================================
       BOTÓN MOSTRAR FILTROS EN MÓVIL
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
       CREAR ESTILO PARA MENSAJE SIN RESULTADOS
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
       GENERAR CATÁLOGO INICIAL
    ===================================================== */

    renderProducts();



    /* =====================================================
       MENSAJE EN CONSOLA
    ===================================================== */

    console.log(
        `SatoriMode · Catálogo generado: ${PRODUCTS.length} producto(s).`
    );


});
