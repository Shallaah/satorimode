/* =========================================================
   SATORIMODE
   HEADER GLOBAL
   =========================================================
   Incluye automáticamente:

   - Barra de envíos
   - Header desktop
   - Header móvil
   - Logo
   - Navegación
   - Dropdowns
   - Menú hamburguesa
   - Carrito
   - Contador del carrito
   - Buscador en tiempo real
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       RUTA BASE DEL SITIO
       Funciona desde cualquier carpeta
       ===================================================== */

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";


    /* =====================================================
       PRODUCTOS PARA EL BUSCADOR
       =====================================================

       Aquí iremos agregando los productos de SatoriMode.

       IMPORTANTE:
       Cuando agreguemos más poleras, solamente las
       agregaremos aquí.

    ===================================================== */

    const productos = [

        {
            nombre: "Polera Kid Buu",
            precio: "$18.990",
            imagen: `${baseUrl}productos/anime/polera-kid-buu-01.PNG`,
            url: `${baseUrl}productos/anime/polera-kid-buu.html`,
            palabras: "polera kid buu anime dragon ball"
        }

    ];


    /* =====================================================
       CONTENEDOR DEL HEADER
       ===================================================== */

    let headerContainer =
        document.getElementById("satori-header");


    if (!headerContainer) {

        headerContainer =
            document.createElement("div");

        headerContainer.id =
            "satori-header";

        document.body.insertBefore(
            headerContainer,
            document.body.firstChild
        );

    }


    /* =====================================================
       HTML DEL HEADER
       ===================================================== */

    headerContainer.innerHTML = `


        <!-- =================================================
             BARRA SUPERIOR
        ================================================== -->

        <div class="shipping-bar">
            ENVÍOS A TODO CHILE · SATORIMODE
        </div>



        <!-- =================================================
             HEADER PRINCIPAL
        ================================================== -->

        <header class="site-header">

            <div class="header-inner">


                <!-- =========================================
                     LOGO
                ========================================== -->

                <a
                    href="${baseUrl}index.html"
                    class="brand-logo"
                    aria-label="SatoriMode inicio"
                >

                    <img
                        src="${baseUrl}logo.png"
                        alt="SatoriMode"
                    >

                </a>



                <!-- =========================================
                     NAVEGACIÓN DESKTOP
                ========================================== -->

                <nav class="main-nav">


                    <!-- INICIO -->

                    <a
                        href="${baseUrl}index.html"
                    >
                        INICIO
                    </a>



                    <!-- COLECCIONES -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                        >

                            COLECCIONES

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a href="${baseUrl}anime.html">
                                ANIME
                            </a>

                            <a href="${baseUrl}streetwear.html">
                                STREETWEAR
                            </a>

                            <a href="${baseUrl}exclusivos.html">
                                EXCLUSIVOS
                            </a>

                        </div>

                    </div>



                    <!-- PRODUCTOS -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                        >

                            PRODUCTOS

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a
                                href="${baseUrl}productos.html"
                            >
                                TODAS LAS POLERAS
                            </a>

                            <a
                                href="${baseUrl}satorii-pack.html"
                            >
                                SATORII PACK
                            </a>

                        </div>

                    </div>



                    <!-- AYUDA -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                        >

                            AYUDA

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a
                                href="${baseUrl}guia-tallas.html"
                            >
                                GUÍA DE TALLAS
                            </a>

                            <a
                                href="${baseUrl}envios.html"
                            >
                                ENVÍOS
                            </a>

                            <a
                                href="${baseUrl}preguntas.html"
                            >
                                PREGUNTAS FRECUENTES
                            </a>

                        </div>

                    </div>


                </nav>



                <!-- =========================================
                     ICONOS
                ========================================== -->

                <div class="header-icons">


                    <!-- =====================================
                         BUSCADOR
                    ====================================== -->

                    <button
                        type="button"
                        class="header-icon search-button"
                        id="search-button"
                        aria-label="Buscar"
                        title="Buscar"
                    >

                        ⌕

                    </button>



                    <!-- =====================================
                         CUENTA
                    ====================================== -->

                    <a
                        href="${baseUrl}cuenta.html"
                        class="header-icon"
                        aria-label="Cuenta"
                        title="Cuenta"
                    >

                        ♙

                    </a>



                    <!-- =====================================
                         CARRITO
                    ====================================== -->

                    <a
                        href="${baseUrl}carrito.html"
                        class="header-icon cart-header-icon"
                        aria-label="Carrito"
                        title="Carrito"
                    >

                        🛒

                        <span
                            class="cart-count"
                            id="cart-count"
                        >
                            0
                        </span>

                    </a>



                    <!-- =====================================
                         MENÚ MÓVIL
                    ====================================== -->

                    <button
                        type="button"
                        class="mobile-menu-button"
                        id="mobile-menu-button"
                        aria-label="Abrir menú"
                        aria-expanded="false"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>


                </div>


            </div>

        </header>



        <!-- =================================================
             BUSCADOR
        ================================================== -->

        <div
            class="search-overlay"
            id="search-overlay"
        >


            <div
                class="search-box"
                role="dialog"
                aria-label="Buscar productos"
            >


                <div class="search-input-wrapper">


                    <span class="search-input-icon">
                        ⌕
                    </span>


                    <input
                        type="search"
                        id="search-input"
                        class="search-input"
                        placeholder="Buscar productos..."
                        autocomplete="off"
                    >


                    <button
                        type="button"
                        id="search-close"
                        class="search-close"
                        aria-label="Cerrar búsqueda"
                    >
                        ×
                    </button>


                </div>



                <div
                    class="search-results"
                    id="search-results"
                >

                    <div class="search-empty">
                        Busca una polera, personaje o colección.
                    </div>

                </div>


            </div>


        </div>



        <!-- =================================================
             OVERLAY MENÚ MÓVIL
        ================================================== -->

        <div
            class="mobile-menu-overlay"
            id="mobile-menu-overlay"
        ></div>



        <!-- =================================================
             MENÚ MÓVIL
        ================================================== -->

        <aside
            class="mobile-menu"
            id="mobile-menu"
        >


            <!-- HEADER MENÚ -->

            <div class="mobile-menu-header">


                <a
                    href="${baseUrl}index.html"
                    class="mobile-menu-logo"
                >

                    <img
                        src="${baseUrl}logo.png"
                        alt="SatoriMode"
                    >

                </a>


                <button
                    type="button"
                    class="mobile-menu-close"
                    id="mobile-menu-close"
                    aria-label="Cerrar menú"
                >

                    ×

                </button>


            </div>



            <!-- NAVEGACIÓN MÓVIL -->

            <nav class="mobile-nav">


                <!-- INICIO -->

                <a href="${baseUrl}index.html">
                    INICIO
                </a>



                <!-- COLECCIONES -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-collections"
                >

                    <span>
                        COLECCIONES
                    </span>

                    <span class="arrow">
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-collections"
                >

                    <a href="${baseUrl}anime.html">
                        ANIME
                    </a>

                    <a href="${baseUrl}streetwear.html">
                        STREETWEAR
                    </a>

                    <a href="${baseUrl}exclusivos.html">
                        EXCLUSIVOS
                    </a>

                </div>



                <!-- PRODUCTOS -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-products"
                >

                    <span>
                        PRODUCTOS
                    </span>

                    <span class="arrow">
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >

                    <a
                        href="${baseUrl}productos.html"
                    >
                        TODAS LAS POLERAS
                    </a>

                    <a
                        href="${baseUrl}satorii-pack.html"
                    >
                        SATORII PACK
                    </a>

                </div>



                <!-- AYUDA -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-help"
                >

                    <span>
                        AYUDA
                    </span>

                    <span class="arrow">
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-help"
                >

                    <a
                        href="${baseUrl}guia-tallas.html"
                    >
                        GUÍA DE TALLAS
                    </a>

                    <a
                        href="${baseUrl}envios.html"
                    >
                        ENVÍOS
                    </a>

                    <a
                        href="${baseUrl}preguntas.html"
                    >
                        PREGUNTAS FRECUENTES
                    </a>

                </div>


            </nav>



            <!-- INSTAGRAM -->

            <div class="mobile-social">


                <span>
                    SÍGUENOS
                </span>


                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener"
                >
                    INSTAGRAM
                </a>


            </div>


        </aside>


    `;



    /* =====================================================
       ESTILOS DEL BUSCADOR
       Se agregan automáticamente.
       No necesitamos modificar style.css todavía.
    ===================================================== */

    if (!document.getElementById("satori-search-styles")) {


        const searchStyles =
            document.createElement("style");


        searchStyles.id =
            "satori-search-styles";


        searchStyles.textContent = `


            /* =============================================
               BOTÓN DE BÚSQUEDA
            ============================================== */

            .search-button {

                border: 0;
                background: transparent;
                cursor: pointer;
                font: inherit;

            }



            /* =============================================
               OVERLAY
            ============================================== */

            .search-overlay {

                position: fixed;

                inset: 0;

                background: rgba(0,0,0,0.45);

                z-index: 10000;

                display: flex;

                justify-content: center;

                align-items: flex-start;

                padding-top: 105px;

                opacity: 0;

                visibility: hidden;

                pointer-events: none;

                transition:
                    opacity .2s ease,
                    visibility .2s ease;

            }


            .search-overlay.is-open {

                opacity: 1;

                visibility: visible;

                pointer-events: auto;

            }



            /* =============================================
               CAJA
            ============================================== */

            .search-box {

                width: min(680px, calc(100% - 30px));

                background: #ffffff;

                border-radius: 14px;

                box-shadow:
                    0 15px 50px rgba(0,0,0,.25);

                overflow: hidden;

            }



            /* =============================================
               INPUT
            ============================================== */

            .search-input-wrapper {

                display: flex;

                align-items: center;

                gap: 12px;

                padding: 15px 18px;

                border-bottom:
                    1px solid #eeeeee;

            }


            .search-input-icon {

                font-size: 22px;

                line-height: 1;

            }


            .search-input {

                flex: 1;

                border: 0;

                outline: 0;

                font-size: 16px;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                background: transparent;

                color: #080808;

            }


            .search-input::placeholder {

                color: #888888;

            }


            .search-close {

                width: 34px;

                height: 34px;

                border: 0;

                border-radius: 50%;

                background: #f3f3f3;

                cursor: pointer;

                font-size: 22px;

                line-height: 1;

            }



            /* =============================================
               RESULTADOS
            ============================================== */

            .search-results {

                max-height: 430px;

                overflow-y: auto;

            }


            .search-empty {

                padding: 25px;

                color: #777777;

                font-size: 14px;

                text-align: center;

            }


            .search-result {

                display: flex;

                align-items: center;

                gap: 15px;

                padding: 12px 18px;

                text-decoration: none;

                color: #080808;

                transition:
                    background .15s ease;

            }


            .search-result:hover {

                background: #f7f7f7;

            }


            .search-result-image {

                width: 65px;

                height: 65px;

                object-fit: cover;

                border-radius: 8px;

                background: #f5f5f5;

                flex-shrink: 0;

            }


            .search-result-info {

                display: flex;

                flex-direction: column;

                gap: 5px;

            }


            .search-result-name {

                font-size: 14px;

                font-weight: 800;

                text-transform: uppercase;

            }


            .search-result-price {

                font-size: 13px;

                color: #e11111;

                font-weight: 700;

            }



            /* =============================================
               MÓVIL
            ============================================== */

            @media (max-width: 1100px) {


                .search-overlay {

                    padding-top: 85px;

                    align-items: flex-start;

                }


                .search-box {

                    width: calc(100% - 20px);

                    border-radius: 12px;

                }


                .search-input {

                    font-size: 16px;

                }


                .search-result-image {

                    width: 58px;

                    height: 58px;

                }


            }

        `;


        document.head.appendChild(searchStyles);

    }



    /* =====================================================
       DROPDOWNS DESKTOP
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(
            ".nav-dropdown"
        );


    dropdowns.forEach(function (dropdown) {


        const button =
            dropdown.querySelector(
                ".nav-dropdown-btn"
            );


        button.addEventListener(
            "click",
            function (event) {


                event.stopPropagation();


                dropdowns.forEach(
                    function (other) {

                        if (other !== dropdown) {

                            other.classList.remove(
                                "active"
                            );

                        }

                    }
                );


                dropdown.classList.toggle(
                    "active"
                );


            }
        );


    });



    /* =====================================================
       CERRAR DROPDOWNS AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener(
        "click",
        function () {


            dropdowns.forEach(
                function (dropdown) {

                    dropdown.classList.remove(
                        "active"
                    );

                }
            );


        }
    );



    /* =====================================================
       BUSCADOR
    ===================================================== */

    const searchButton =
        document.getElementById(
            "search-button"
        );


    const searchOverlay =
        document.getElementById(
            "search-overlay"
        );


    const searchInput =
        document.getElementById(
            "search-input"
        );


    const searchClose =
        document.getElementById(
            "search-close"
        );


    const searchResults =
        document.getElementById(
            "search-results"
        );



    /* =============================================
       ABRIR
    ============================================== */

    function openSearch() {

        searchOverlay.classList.add(
            "is-open"
        );

        document.body.style.overflow =
            "hidden";

        setTimeout(
            function () {

                searchInput.focus();

            },
            100
        );

    }



    /* =============================================
       CERRAR
    ============================================== */

    function closeSearch() {

        searchOverlay.classList.remove(
            "is-open"
        );

        document.body.style.overflow =
            "";

        searchInput.value = "";

        showSearchMessage(
            "Busca una polera, personaje o colección."
        );

    }



    searchButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            openSearch();

        }
    );


    searchClose.addEventListener(
        "click",
        closeSearch
    );



    /* =============================================
       CLICK FUERA DE LA CAJA
    ============================================== */

    searchOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                searchOverlay
            ) {

                closeSearch();

            }

        }
    );



    /* =============================================
       ESC PARA CERRAR
    ============================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                searchOverlay.classList.contains(
                    "is-open"
                )
            ) {

                closeSearch();

            }

        }
    );



    /* =============================================
       MENSAJE VACÍO
    ============================================== */

    function showSearchMessage(message) {

        searchResults.innerHTML = `

            <div class="search-empty">

                ${message}

            </div>

        `;

    }



    /* =============================================
       BUSCAR PRODUCTOS
    ============================================== */

    function searchProducts(value) {


        const query =
            value
                .trim()
                .toLowerCase();


        if (!query) {

            showSearchMessage(
                "Busca una polera, personaje o colección."
            );

            return;

        }



        const resultados =
            productos.filter(
                function (producto) {


                    const texto =
                        (
                            producto.nombre +
                            " " +
                            producto.palabras
                        )
                        .toLowerCase();


                    return texto.includes(
                        query
                    );

                }
            );



        if (
            resultados.length === 0
        ) {

            showSearchMessage(
                "No encontramos productos con esa búsqueda."
            );

            return;

        }



        searchResults.innerHTML =
            resultados
                .map(
                    function (producto) {


                        return `

                            <a
                                href="${producto.url}"
                                class="search-result"
                            >

                                <img
                                    src="${producto.imagen}"
                                    alt="${producto.nombre}"
                                    class="search-result-image"
                                >

                                <span
                                    class="search-result-info"
                                >

                                    <span
                                        class="search-result-name"
                                    >
                                        ${producto.nombre}
                                    </span>

                                    <span
                                        class="search-result-price"
                                    >
                                        ${producto.precio}
                                    </span>

                                </span>

                            </a>

                        `;

                    }
                )
                .join("");


    }



    /* =============================================
       BUSCAR MIENTRAS ESCRIBE
    ============================================== */

    searchInput.addEventListener(
        "input",
        function () {

            searchProducts(
                searchInput.value
            );

        }
    );



    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const mobileButton =
        document.getElementById(
            "mobile-menu-button"
        );


    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    const mobileClose =
        document.getElementById(
            "mobile-menu-close"
        );


    const mobileOverlay =
        document.getElementById(
            "mobile-menu-overlay"
        );



    /* =============================================
       ABRIR MENÚ
    ============================================== */

    function openMobileMenu() {


        mobileMenu.classList.add(
            "is-open"
        );


        mobileOverlay.classList.add(
            "is-open"
        );


        mobileButton.classList.add(
            "is-open"
        );


        mobileButton.setAttribute(
            "aria-expanded",
            "true"
        );


        document.body.style.overflow =
            "hidden";


    }



    /* =============================================
       CERRAR MENÚ
    ============================================== */

    function closeMobileMenu() {


        mobileMenu.classList.remove(
            "is-open"
        );


        mobileOverlay.classList.remove(
            "is-open"
        );


        mobileButton.classList.remove(
            "is-open"
        );


        mobileButton.setAttribute(
            "aria-expanded",
            "false"
        );


        document.body.style.overflow =
            "";


    }



    mobileButton.addEventListener(
        "click",
        openMobileMenu
    );


    mobileClose.addEventListener(
        "click",
        closeMobileMenu
    );


    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );



    /* =====================================================
       SUBMENÚS MÓVILES
    ===================================================== */

    const mobileSubmenuButtons =
        document.querySelectorAll(
            "[data-mobile-submenu]"
        );


    mobileSubmenuButtons.forEach(
        function (button) {


            button.addEventListener(
                "click",
                function () {


                    const submenuId =
                        button.getAttribute(
                            "data-mobile-submenu"
                        );


                    const submenu =
                        document.getElementById(
                            submenuId
                        );


                    submenu.classList.toggle(
                        "is-open"
                    );


                    const arrow =
                        button.querySelector(
                            ".arrow"
                        );


                    if (
                        submenu.classList.contains(
                            "is-open"
                        )
                    ) {

                        arrow.textContent =
                            "↑";

                    } else {

                        arrow.textContent =
                            "↓";

                    }


                }
            );


        }
    );



    /* =====================================================
       CERRAR MENÚ AL PASAR A DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {


            if (
                window.innerWidth > 1100
            ) {

                closeMobileMenu();

            }


        }
    );



    /* =====================================================
       CONTADOR DEL CARRITO
    ===================================================== */

    function updateCartCount() {


        const cartCount =
            document.getElementById(
                "cart-count"
            );


        if (!cartCount) {

            return;

        }


        let cart = [];


        try {


            cart =
                JSON.parse(
                    localStorage.getItem(
                        "satoriCart"
                    )
                ) || [];


        } catch (error) {


            cart = [];


        }


        let totalProducts = 0;


        cart.forEach(
            function (product) {


                totalProducts +=
                    Number(
                        product.quantity
                    ) || 0;


            }
        );


        cartCount.textContent =
            totalProducts;


        if (
            totalProducts > 0
        ) {


            cartCount.style.display =
                "flex";


        } else {


            cartCount.style.display =
                "none";


        }


    }



    updateCartCount();



    /* =====================================================
       ACTUALIZAR CARRITO
    ===================================================== */

    window.addEventListener(
        "storage",
        updateCartCount
    );


});
