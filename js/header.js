/* =========================================================
   SATORIMODE
   HEADER GLOBAL
   Este archivo genera automáticamente:
   - Barra de envíos
   - Header desktop
   - Menú móvil
   - Dropdowns
   - Iconos
   - Carrito
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       RUTA BASE DEL SITIO
       Funciona aunque la página esté dentro de /productos/
    ===================================================== */

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";


    /* =====================================================
       CONTENEDOR DEL HEADER
    ===================================================== */

    let headerContainer = document.getElementById("satori-header");

    if (!headerContainer) {
        headerContainer = document.createElement("div");
        headerContainer.id = "satori-header";

        document.body.insertBefore(
            headerContainer,
            document.body.firstChild
        );
    }


    /* =====================================================
       HEADER
    ===================================================== */

    headerContainer.innerHTML = `

        <!-- ===============================================
             BARRA SUPERIOR
        ================================================ -->

        <div class="shipping-bar">
            ENVÍOS A TODO CHILE · SATORIMODE
        </div>


        <!-- ===============================================
             HEADER PRINCIPAL
        ================================================ -->

        <header class="site-header">

            <div class="header-inner">


                <!-- =======================================
                     LOGO
                ======================================== -->

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


                <!-- =======================================
                     MENÚ PRINCIPAL DESKTOP
                ======================================== -->

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
                            <span class="arrow">⌄</span>
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
                            <span class="arrow">⌄</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="${baseUrl}productos.html">
                                TODAS LAS POLERAS
                            </a>

                            <a href="${baseUrl}satorii-pack.html">
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
                            <span class="arrow">⌄</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="${baseUrl}guia-tallas.html">
                                GUÍA DE TALLAS
                            </a>

                            <a href="${baseUrl}envios.html">
                                ENVÍOS
                            </a>

                            <a href="${baseUrl}preguntas.html">
                                PREGUNTAS FRECUENTES
                            </a>

                        </div>

                    </div>

                </nav>


                <!-- =======================================
                     ICONOS
                ======================================== -->

                <div class="header-icons">


                    <!-- BUSCAR -->

                    <a
                        href="${baseUrl}buscar.html"
                        class="header-icon"
                        aria-label="Buscar"
                        title="Buscar"
                    >
                        ⌕
                    </a>


                    <!-- CUENTA -->

                    <a
                        href="${baseUrl}cuenta.html"
                        class="header-icon"
                        aria-label="Cuenta"
                        title="Cuenta"
                    >
                        ♙
                    </a>


                    <!-- CARRITO -->

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


                    <!-- BOTÓN MENÚ MÓVIL -->

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


        <!-- ===============================================
             OVERLAY MENÚ MÓVIL
        ================================================ -->

        <div
            class="mobile-menu-overlay"
            id="mobile-menu-overlay"
        ></div>


        <!-- ===============================================
             MENÚ MÓVIL
        ================================================ -->

        <aside
            class="mobile-menu"
            id="mobile-menu"
        >


            <!-- HEADER DEL MENÚ -->

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
                    <span>COLECCIONES</span>
                    <span class="arrow">↓</span>
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
                    <span>PRODUCTOS</span>
                    <span class="arrow">↓</span>
                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >

                    <a href="${baseUrl}productos.html">
                        TODAS LAS POLERAS
                    </a>

                    <a href="${baseUrl}satorii-pack.html">
                        SATORII PACK
                    </a>

                </div>


                <!-- AYUDA -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-help"
                >
                    <span>AYUDA</span>
                    <span class="arrow">↓</span>
                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-help"
                >

                    <a href="${baseUrl}guia-tallas.html">
                        GUÍA DE TALLAS
                    </a>

                    <a href="${baseUrl}envios.html">
                        ENVÍOS
                    </a>

                    <a href="${baseUrl}preguntas.html">
                        PREGUNTAS FRECUENTES
                    </a>

                </div>

            </nav>


            <!-- ===========================================
                 INSTAGRAM
            ============================================ -->

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
       DROPDOWNS DESKTOP
    ===================================================== */

    const dropdowns = document.querySelectorAll(
        ".nav-dropdown"
    );


    dropdowns.forEach(function (dropdown) {

        const button = dropdown.querySelector(
            ".nav-dropdown-btn"
        );


        button.addEventListener("click", function (event) {

            event.stopPropagation();


            dropdowns.forEach(function (other) {

                if (other !== dropdown) {
                    other.classList.remove("active");
                }

            });


            dropdown.classList.toggle("active");

        });

    });


    /* =====================================================
       CERRAR DROPDOWNS AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener("click", function () {

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("active");

        });

    });


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


    function openMobileMenu() {

        mobileMenu.classList.add("is-open");

        mobileOverlay.classList.add("is-open");

        mobileButton.classList.add("is-open");

        mobileButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";

    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("is-open");

        mobileOverlay.classList.remove("is-open");

        mobileButton.classList.remove("is-open");

        mobileButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";

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


    mobileSubmenuButtons.forEach(function (button) {

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

                    arrow.textContent = "↑";

                } else {

                    arrow.textContent = "↓";

                }

            }
        );

    });


    /* =====================================================
       CERRAR MENÚ MÓVIL AL CAMBIAR A DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 1100) {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       ACTUALIZAR CONTADOR DEL CARRITO
       Lee localStorage
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

            cart = JSON.parse(
                localStorage.getItem(
                    "satoriCart"
                )
            ) || [];

        } catch (error) {

            cart = [];

        }


        let totalProducts = 0;


        cart.forEach(function (product) {

            totalProducts +=
                Number(product.quantity) || 0;

        });


        cartCount.textContent =
            totalProducts;


        if (totalProducts > 0) {

            cartCount.style.display =
                "flex";

        } else {

            cartCount.style.display =
                "none";

        }

    }


    updateCartCount();


    /* =====================================================
       ACTUALIZAR SI CAMBIA EL STORAGE
    ===================================================== */

    window.addEventListener(
        "storage",
        updateCartCount
    );


});
