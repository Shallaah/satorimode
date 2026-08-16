/* =========================================================
   SATORII · HEADER GLOBAL
   ---------------------------------------------------------
   - Barra superior
   - Instagram
   - Header desktop
   - Header móvil
   - Dropdowns
   - Buscador
   - Menú móvil
   - Carrito
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       RUTA BASE
    ===================================================== */

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";


    function siteUrl(path = "") {

        if (!path) {
            return baseUrl;
        }

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        return new URL(
            path.replace(/^\/+/, ""),
            baseUrl
        ).href;

    }


    /* =====================================================
       HEADER CONTAINER
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
       HEADER
    ===================================================== */

    headerContainer.innerHTML = `


        <!-- =================================================
             BARRA SUPERIOR
        ================================================== -->

        <div class="top-bar">

            <div class="top-bar-inner">


                <!-- INSTAGRAM -->

                <a
                    href="https://www.instagram.com/satorimode/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="top-instagram"
                    aria-label="Instagram SatoriMode"
                >

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="5"
                        ></rect>

                        <circle
                            cx="12"
                            cy="12"
                            r="4"
                        ></circle>

                        <circle
                            cx="17.5"
                            cy="6.5"
                            r="1"
                            fill="currentColor"
                            stroke="none"
                        ></circle>

                    </svg>

                </a>


                <!-- ENVÍOS -->

                <span class="shipping-message">
                    🚚 ENVÍOS A TODO CHILE
                </span>


                <!-- MENSAJE DERECHO -->

                <span class="top-message">
                    CULTURA JAPONESA · STREETWEAR · ANIME
                </span>

            </div>

        </div>



        <!-- =================================================
             HEADER PRINCIPAL
        ================================================== -->

        <header class="main-header">

            <div class="header-inner">


                <!-- =================================================
                     MENÚ MÓVIL
                ================================================== -->

                <button
                    type="button"
                    class="mobile-menu-button"
                    id="mobile-menu-button"
                    aria-label="Abrir menú"
                    aria-expanded="false"
                    aria-controls="mobile-menu"
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </button>



                <!-- =================================================
                     LOGO
                ================================================== -->

                <a
                    href="${siteUrl("index.html")}"
                    class="satori-logo"
                    aria-label="SatoriMode - Inicio"
                >

                    SATORII

                </a>



                <!-- =================================================
                     NAVEGACIÓN DESKTOP
                ================================================== -->

                <nav
                    class="main-nav"
                    aria-label="Navegación principal"
                >


                    <!-- INICIO -->

                    <a
                        href="${siteUrl("index.html")}"
                    >
                        INICIO
                    </a>



                    <!-- =================================================
                         COLECCIONES
                    ================================================== -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                            aria-haspopup="true"
                        >

                            <span>
                                COLECCIONES
                            </span>

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div
                            class="dropdown-menu"
                            role="menu"
                        >

                            <a
                                href="${siteUrl("anime.html")}"
                                role="menuitem"
                            >
                                ANIME
                            </a>


                            <a
                                href="${siteUrl("streetwear.html")}"
                                role="menuitem"
                            >
                                STREETWEAR
                            </a>


                            <a
                                href="${siteUrl("accesorios.html")}"
                                role="menuitem"
                            >
                                ACCESORIOS
                            </a>

                        </div>

                    </div>



                    <!-- =================================================
                         PRODUCTOS
                    ================================================== -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                            aria-haspopup="true"
                        >

                            <span>
                                PRODUCTOS
                            </span>

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div
                            class="dropdown-menu"
                            role="menu"
                        >


                            <!-- SATORII PACK -->

                            <a
                                href="${siteUrl("satorii-pack.html")}"
                                role="menuitem"
                            >
                                SATORII PACK
                            </a>


                            <!-- MYSTERY BOX -->

                            <a
                                href="${siteUrl("mystery-box.html")}"
                                role="menuitem"
                            >
                                MYSTERY BOX
                            </a>


                            <!-- GIFT CARDS -->

                            <a
                                href="${siteUrl("gift-cards.html")}"
                                role="menuitem"
                            >
                                GIFT CARDS
                            </a>


                        </div>

                    </div>



                    <!-- =================================================
                         AYUDA
                    ================================================== -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                            aria-haspopup="true"
                        >

                            <span>
                                AYUDA
                            </span>

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div
                            class="dropdown-menu"
                            role="menu"
                        >


                            <a
                                href="${siteUrl("preguntas-frecuentes.html")}"
                                role="menuitem"
                            >
                                PREGUNTAS FRECUENTES
                            </a>


                            <a
                                href="${siteUrl("envios.html")}"
                                role="menuitem"
                            >
                                ENVÍOS
                            </a>


                            <a
                                href="${siteUrl("cambios.html")}"
                                role="menuitem"
                            >
                                CAMBIOS Y DEVOLUCIONES
                            </a>


                            <a
                                href="${siteUrl("guia-tallas.html")}"
                                role="menuitem"
                            >
                                GUÍA DE TALLAS
                            </a>


                        </div>

                    </div>


                </nav>



                <!-- =================================================
                     ICONOS
                ================================================== -->

                <div class="header-icons">


                    <!-- BUSCADOR -->

                    <button
                        type="button"
                        class="header-icon search-button"
                        id="search-button"
                        aria-label="Buscar productos"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

                            <circle
                                cx="11"
                                cy="11"
                                r="6.5"
                            ></circle>

                            <path
                                d="M16 16L21 21"
                            ></path>

                        </svg>

                    </button>



                    <!-- CUENTA -->

                    <a
                        href="${siteUrl("cuenta.html")}"
                        class="header-icon"
                        aria-label="Mi cuenta"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

                            <circle
                                cx="12"
                                cy="8"
                                r="3.5"
                            ></circle>

                            <path
                                d="M5 21c.7-4 3-6 7-6s6.3 2 7 6"
                            ></path>

                        </svg>

                    </a>



                    <!-- CARRITO -->

                    <a
                        href="${siteUrl("carrito.html")}"
                        class="header-icon"
                        aria-label="Carrito"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

                            <path
                                d="M4 5h2l2 11h9l3-8H7"
                            ></path>

                            <circle
                                cx="10"
                                cy="20"
                                r="1.2"
                            ></circle>

                            <circle
                                cx="17"
                                cy="20"
                                r="1.2"
                            ></circle>

                        </svg>

                    </a>


                </div>

            </div>

        </header>



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
            aria-hidden="true"
        >


            <!-- HEADER DEL MENÚ -->

            <div class="mobile-menu-header">


                <a
                    href="${siteUrl("index.html")}"
                    class="mobile-menu-logo"
                >

                    SATORII

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

            <nav
                class="mobile-nav"
                aria-label="Navegación móvil"
            >


                <!-- =================================================
                     INICIO
                ================================================== -->

                <a
                    href="${siteUrl("index.html")}"
                    class="mobile-menu-link"
                >
                    INICIO
                </a>



                <!-- =================================================
                     COLECCIONES
                ================================================== -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-collections"
                    aria-expanded="false"
                >

                    <span>
                        COLECCIONES
                    </span>

                    <span class="arrow">
                        →
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-collections"
                >

                    <a
                        href="${siteUrl("anime.html")}"
                    >
                        ANIME
                    </a>


                    <a
                        href="${siteUrl("streetwear.html")}"
                    >
                        STREETWEAR
                    </a>


                    <a
                        href="${siteUrl("accesorios.html")}"
                    >
                        ACCESORIOS
                    </a>

                </div>



                <!-- =================================================
                     PRODUCTOS
                ================================================== -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-products"
                    aria-expanded="false"
                >

                    <span>
                        PRODUCTOS
                    </span>

                    <span class="arrow">
                        →
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >


                    <a
                        href="${siteUrl("satorii-pack.html")}"
                    >
                        SATORII PACK
                    </a>


                    <a
                        href="${siteUrl("mystery-box.html")}"
                    >
                        MYSTERY BOX
                    </a>


                    <a
                        href="${siteUrl("gift-cards.html")}"
                    >
                        GIFT CARDS
                    </a>


                </div>



                <!-- =================================================
                     AYUDA
                ================================================== -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-help"
                    aria-expanded="false"
                >

                    <span>
                        AYUDA
                    </span>

                    <span class="arrow">
                        →
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-help"
                >


                    <a
                        href="${siteUrl("preguntas-frecuentes.html")}"
                    >
                        PREGUNTAS FRECUENTES
                    </a>


                    <a
                        href="${siteUrl("envios.html")}"
                    >
                        ENVÍOS
                    </a>


                    <a
                        href="${siteUrl("cambios.html")}"
                    >
                        CAMBIOS Y DEVOLUCIONES
                    </a>


                    <a
                        href="${siteUrl("guia-tallas.html")}"
                    >
                        GUÍA DE TALLAS
                    </a>


                </div>


            </nav>



            <!-- =================================================
                 INSTAGRAM
            ================================================== -->

            <div class="mobile-social">

                <span>
                    SÍGUENOS
                </span>


                <a
                    href="https://www.instagram.com/satorimode/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    INSTAGRAM ↗
                </a>

            </div>


        </aside>



        <!-- =================================================
             BUSCADOR
        ================================================== -->

        <div
            class="search-overlay"
            id="search-overlay"
            aria-hidden="true"
        >

            <div class="search-panel">


                <div class="search-panel-header">

                    <span>
                        SATORII · BUSCAR
                    </span>


                    <button
                        type="button"
                        class="search-close"
                        id="search-close"
                        aria-label="Cerrar búsqueda"
                    >
                        ×
                    </button>

                </div>


                <div class="search-input-wrapper">

                    <input
                        type="search"
                        id="product-search"
                        placeholder="Buscar productos..."
                        autocomplete="off"
                    >

                </div>


                <div
                    id="search-results"
                    class="search-results"
                ></div>


            </div>

        </div>

    `;



    /* =====================================================
       DROPDOWNS DESKTOP
    ===================================================== */

    const dropdowns =
        headerContainer.querySelectorAll(
            ".nav-dropdown"
        );


    dropdowns.forEach((dropdown) => {

        const button =
            dropdown.querySelector(
                ".nav-dropdown-btn"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const isOpen =
                    dropdown.classList.contains(
                        "is-open"
                    );


                dropdowns.forEach((other) => {

                    other.classList.remove(
                        "is-open"
                    );

                    const otherButton =
                        other.querySelector(
                            ".nav-dropdown-btn"
                        );

                    if (otherButton) {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                });


                if (!isOpen) {

                    dropdown.classList.add(
                        "is-open"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });



    /* =====================================================
       CERRAR DROPDOWNS AL HACER CLICK AFUERA
    ===================================================== */

    document.addEventListener(
        "click",
        () => {

            dropdowns.forEach((dropdown) => {

                dropdown.classList.remove(
                    "is-open"
                );


                const button =
                    dropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

        }
    );



    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const mobileMenuButton =
        document.getElementById(
            "mobile-menu-button"
        );


    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    const mobileMenuClose =
        document.getElementById(
            "mobile-menu-close"
        );


    const mobileMenuOverlay =
        document.getElementById(
            "mobile-menu-overlay"
        );



    function openMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.add(
            "active"
        );


        if (mobileMenuOverlay) {

            mobileMenuOverlay.classList.add(
                "active"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        document.body.classList.add(
            "menu-open"
        );

    }



    function closeMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.remove(
            "active"
        );


        if (mobileMenuOverlay) {

            mobileMenuOverlay.classList.remove(
                "active"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        document.body.classList.remove(
            "menu-open"
        );

    }



    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            openMobileMenu
        );

    }


    if (mobileMenuClose) {

        mobileMenuClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    if (mobileMenuOverlay) {

        mobileMenuOverlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }



    /* =====================================================
       SUBMENÚS MÓVILES
    ===================================================== */

    const mobileButtons =
        headerContainer.querySelectorAll(
            ".mobile-nav-button"
        );


    mobileButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const submenuId =
                    button.dataset.mobileSubmenu;


                const submenu =
                    document.getElementById(
                        submenuId
                    );


                if (!submenu) return;


                const isOpen =
                    submenu.classList.contains(
                        "active"
                    );


                /* Cerrar otros */

                headerContainer
                    .querySelectorAll(
                        ".mobile-submenu"
                    )
                    .forEach((otherSubmenu) => {

                        otherSubmenu.classList.remove(
                            "active"
                        );

                    });


                headerContainer
                    .querySelectorAll(
                        ".mobile-nav-button"
                    )
                    .forEach((otherButton) => {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    });


                /* Abrir seleccionado */

                if (!isOpen) {

                    submenu.classList.add(
                        "active"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });



    /* =====================================================
       CERRAR MENÚ CON ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

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


    const searchClose =
        document.getElementById(
            "search-close"
        );


    const searchInput =
        document.getElementById(
            "product-search"
        );



    function openSearch() {

        if (!searchOverlay) return;


        searchOverlay.classList.add(
            "active"
        );


        searchOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        if (searchInput) {

            setTimeout(() => {

                searchInput.focus();

            }, 100);

        }

    }



    function closeSearch() {

        if (!searchOverlay) return;


        searchOverlay.classList.remove(
            "active"
        );


        searchOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }



    if (searchButton) {

        searchButton.addEventListener(
            "click",
            openSearch
        );

    }


    if (searchClose) {

        searchClose.addEventListener(
            "click",
            closeSearch
        );

    }



    /* =====================================================
       CERRAR BUSCADOR AL HACER CLICK EN OVERLAY
    ===================================================== */

    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === searchOverlay
                ) {

                    closeSearch();

                }

            }
        );

    }



    /* =====================================================
       ESC PARA CERRAR BUSCADOR
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeSearch();

            }

        }
    );

});
