(function () {
    "use strict";

    function initSatoriiHeader() {

        /* =====================================================
           EVITAR DUPLICADOS
        ====================================================== */

        const existingHeader =
            document.getElementById("satori-header");

        if (existingHeader) {
            existingHeader.remove();
        }


        /* =====================================================
           ROOT
        ====================================================== */

        const root =
            document.createElement("div");

        root.id = "satori-header";


        /* =====================================================
           HTML DEL HEADER
        ====================================================== */

        root.innerHTML = `

        <!-- =================================================
             BARRA SUPERIOR
        ================================================== -->

        <div class="top-bar">

            <div class="top-bar-inner">

                <a
                    class="top-instagram"
                    href="https://www.instagram.com/satorimode/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram SatoriMode"
                >

                    <svg viewBox="0 0 24 24" aria-hidden="true">

                        <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="5"
                            ry="5"
                        />

                        <circle
                            cx="12"
                            cy="12"
                            r="4"
                        />

                        <circle
                            cx="17.5"
                            cy="6.5"
                            r="1"
                            class="instagram-dot"
                        />

                    </svg>

                </a>


                <span class="shipping-message">
                    🚚 ENVÍOS A TODO CHILE
                </span>


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


                <!-- HAMBURGUESA -->

                <button
                    id="satori-mobile-open"
                    class="mobile-menu-button"
                    type="button"
                    aria-label="Abrir menú"
                    aria-controls="satori-mobile-menu"
                    aria-expanded="false"
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </button>


                <!-- LOGO -->

                <a
                    href="index.html"
                    class="satori-logo satori-brand-logo"
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
                        href="index.html"
                        class="nav-home-button"
                    >
                        INICIO
                    </a>


                    <!-- =================================================
                         COLECCIONES
                    ================================================== -->

                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                            aria-expanded="false"
                        >

                            <span>
                                COLECCIONES
                            </span>

                            <span
                                class="nav-arrow"
                                aria-hidden="true"
                            >
                                ↓
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a href="anime.html">
                                Anime
                            </a>

                            <a href="streetwear.html">
                                Streetwear
                            </a>

                            <a href="accesorios.html">
                                Accesorios
                            </a>

                            <a href="productos.html">
                                Todo
                            </a>

                        </div>

                    </div>


                    <!-- =================================================
                         PRODUCTOS
                    ================================================== -->

                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                            aria-expanded="false"
                        >

                            <span>
                                PRODUCTOS
                            </span>

                            <span
                                class="nav-arrow"
                                aria-hidden="true"
                            >
                                ↓
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a href="satorii-pack.html">
                                Satorii Pack
                            </a>

                            <a href="gift-cards.html">
                                Gift Cards
                            </a>

                            <a href="mystery-box.html">
                                Mystery Box
                            </a>

                        </div>

                    </div>


                    <!-- =================================================
                         AYUDA
                    ================================================== -->

                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                            aria-expanded="false"
                        >

                            <span>
                                AYUDA
                            </span>

                            <span
                                class="nav-arrow"
                                aria-hidden="true"
                            >
                                ↓
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a href="preguntas-frecuentes.html">
                                Preguntas frecuentes
                            </a>

                            <a href="envios.html">
                                Envíos
                            </a>

                            <a href="cambios.html">
                                Cambios y devoluciones
                            </a>

                            <a href="guia-tallas.html">
                                Guía de tallas
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
                        class="header-icon"
                        id="satori-search"
                        type="button"
                        aria-label="Buscar"
                        aria-controls="satori-search-overlay"
                        aria-expanded="false"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

                            <circle
                                cx="10.8"
                                cy="10.8"
                                r="6.5"
                            />

                            <line
                                x1="16"
                                y1="16"
                                x2="21"
                                y2="21"
                            />

                        </svg>

                    </button>


                    <!-- CUENTA -->

                    <a
                        class="header-icon"
                        href="cuenta.html"
                        aria-label="Mi cuenta"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

                            <circle
                                cx="12"
                                cy="8"
                                r="3.2"
                            />

                            <path
                                d="M5.5 20c.8-3.5 3-5.2 6.5-5.2s5.7 1.7 6.5 5.2"
                            />

                        </svg>

                    </a>


                    <!-- CARRITO -->

                    <a
                        class="header-icon"
                        href="carrito.html"
                        aria-label="Carrito"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

                            <path
                                d="M4 5h2l1.7 10.2a2 2 0 0 0 2 1.7h6.8a2 2 0 0 0 2-1.5L20 8H7"
                            />

                            <circle
                                cx="10"
                                cy="20"
                                r="1.2"
                            />

                            <circle
                                cx="17"
                                cy="20"
                                r="1.2"
                            />

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
            id="satori-mobile-overlay"
            aria-hidden="true"
        ></div>


        <!-- =================================================
             MENÚ MÓVIL
        ================================================== -->

        <aside
            class="mobile-menu"
            id="satori-mobile-menu"
            aria-hidden="true"
        >

            <div class="mobile-menu-header">

                <a
                    href="index.html"
                    class="mobile-menu-logo satori-brand-logo"
                >
                    SATORII
                </a>


                <button
                    id="satori-mobile-close"
                    class="mobile-menu-close"
                    type="button"
                    aria-label="Cerrar menú"
                >
                    ×
                </button>

            </div>


            <nav
                class="mobile-nav"
                aria-label="Menú móvil"
            >


                <!-- INICIO -->

                <a
                    href="index.html"
                    class="mobile-nav-button mobile-home-button"
                >

                    <span>
                        INICIO
                    </span>

                </a>


                <!-- =================================================
                     COLECCIONES
                ================================================== -->

                <button
                    class="mobile-nav-button"
                    data-target="mobile-collections"
                    type="button"
                    aria-expanded="false"
                >

                    <span>
                        COLECCIONES
                    </span>

                    <span
                        class="mobile-arrow"
                        aria-hidden="true"
                    >
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-collections"
                >

                    <a href="anime.html">
                        Anime
                    </a>

                    <a href="streetwear.html">
                        Streetwear
                    </a>

                    <a href="accesorios.html">
                        Accesorios
                    </a>

                    <a href="productos.html">
                        Todo
                    </a>

                </div>


                <!-- =================================================
                     PRODUCTOS
                ================================================== -->

                <button
                    class="mobile-nav-button"
                    data-target="mobile-products"
                    type="button"
                    aria-expanded="false"
                >

                    <span>
                        PRODUCTOS
                    </span>

                    <span
                        class="mobile-arrow"
                        aria-hidden="true"
                    >
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >

                    <a href="satorii-pack.html">
                        Satorii Pack
                    </a>

                    <a href="gift-cards.html">
                        Gift Cards
                    </a>

                    <a href="mystery-box.html">
                        Mystery Box
                    </a>

                </div>


                <!-- =================================================
                     AYUDA
                ================================================== -->

                <button
                    class="mobile-nav-button"
                    data-target="mobile-help"
                    type="button"
                    aria-expanded="false"
                >

                    <span>
                        AYUDA
                    </span>

                    <span
                        class="mobile-arrow"
                        aria-hidden="true"
                    >
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-help"
                >

                    <a href="preguntas-frecuentes.html">
                        Preguntas frecuentes
                    </a>

                    <a href="envios.html">
                        Envíos
                    </a>

                    <a href="cambios.html">
                        Cambios y devoluciones
                    </a>

                    <a href="guia-tallas.html">
                        Guía de tallas
                    </a>

                </div>

            </nav>


            <!-- =================================================
                 REDES
            ================================================== -->

            <div class="mobile-social">

                <span>
                    SÍGUENOS
                </span>


                <a
                    href="https://www.instagram.com/satorimode/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mobile-instagram"
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
                        />

                        <circle
                            cx="12"
                            cy="12"
                            r="4"
                        />

                        <circle
                            cx="17.5"
                            cy="6.5"
                            r="1"
                            class="instagram-dot"
                        />

                    </svg>

                    INSTAGRAM ↗

                </a>

            </div>

        </aside>


        <!-- =================================================
             BUSCADOR
        ================================================== -->

        <div
            class="search-overlay"
            id="satori-search-overlay"
            aria-hidden="true"
        >

            <div
                class="search-box"
                role="dialog"
                aria-modal="true"
                aria-labelledby="satori-search-title"
            >

                <button
                    class="search-close"
                    id="satori-search-close"
                    type="button"
                    aria-label="Cerrar búsqueda"
                >
                    ×
                </button>


                <div
                    class="search-title"
                    id="satori-search-title"
                >
                    BUSCAR
                </div>


                <form
                    class="search-form"
                    id="satori-search-form"
                >

                    <input
                        type="search"
                        id="satori-search-input"
                        placeholder="¿Qué estás buscando?"
                        autocomplete="off"
                        aria-label="Buscar productos"
                    />


                    <button
                        type="submit"
                        aria-label="Realizar búsqueda"
                    >
                        →
                    </button>

                </form>

            </div>

        </div>

        `;


        /* =====================================================
           INSERTAR HEADER
        ====================================================== */

        document.body.prepend(root);


        /* =====================================================
           ELEMENTOS
        ====================================================== */

        const mobileMenu =
            document.getElementById(
                "satori-mobile-menu"
            );

        const overlay =
            document.getElementById(
                "satori-mobile-overlay"
            );

        const openButton =
            document.getElementById(
                "satori-mobile-open"
            );

        const closeButton =
            document.getElementById(
                "satori-mobile-close"
            );

        const searchButton =
            document.getElementById(
                "satori-search"
            );

        const searchOverlay =
            document.getElementById(
                "satori-search-overlay"
            );

        const searchClose =
            document.getElementById(
                "satori-search-close"
            );

        const searchInput =
            document.getElementById(
                "satori-search-input"
            );

        const searchForm =
            document.getElementById(
                "satori-search-form"
            );


        /* =====================================================
           BLOQUEAR / LIBERAR SCROLL
        ====================================================== */

        function lockBodyScroll() {

            document.body.classList.add(
                "menu-open"
            );

        }


        function unlockBodyScroll() {

            if (
                mobileMenu &&
                mobileMenu.classList.contains("open")
            ) {
                return;
            }

            if (
                searchOverlay &&
                searchOverlay.classList.contains("open")
            ) {
                return;
            }

            document.body.classList.remove(
                "menu-open"
            );

        }


        /* =====================================================
           CERRAR DROPDOWNS
        ====================================================== */

        function closeDropdowns() {

            root.querySelectorAll(
                ".nav-dropdown"
            ).forEach(
                function (dropdown) {

                    dropdown.classList.remove(
                        "open"
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

                }
            );

        }


        /* =====================================================
           MENÚ MÓVIL
        ====================================================== */

        function closeMobileMenu() {

            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "open"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            if (overlay) {

                overlay.classList.remove(
                    "open"
                );

                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            if (openButton) {

                openButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            unlockBodyScroll();

        }


        function openMobileMenu() {

            closeSearch();

            closeDropdowns();


            if (mobileMenu) {

                mobileMenu.classList.add(
                    "open"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }


            if (overlay) {

                overlay.classList.add(
                    "open"
                );

                overlay.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }


            if (openButton) {

                openButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            lockBodyScroll();

        }


        if (openButton) {

            openButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    openMobileMenu();

                }
            );

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    closeMobileMenu();

                }
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }


        /* =====================================================
           BUSCADOR
        ====================================================== */

        function closeSearch() {

            if (searchOverlay) {

                searchOverlay.classList.remove(
                    "open"
                );

                searchOverlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            if (searchButton) {

                searchButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            unlockBodyScroll();

        }


        function openSearch() {

            closeMobileMenu();

            closeDropdowns();


            if (!searchOverlay) {
                return;
            }


            searchOverlay.classList.add(
                "open"
            );

            searchOverlay.setAttribute(
                "aria-hidden",
                "false"
            );


            if (searchButton) {

                searchButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            lockBodyScroll();


            setTimeout(
                function () {

                    if (searchInput) {

                        searchInput.focus();

                    }

                },
                150
            );

        }


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    openSearch();

                }
            );

        }


        if (searchClose) {

            searchClose.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    closeSearch();

                }
            );

        }


        if (searchOverlay) {

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

        }


        /* =====================================================
           PROCESAR BÚSQUEDA
        ====================================================== */

        if (searchForm) {

            searchForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const query =
                        searchInput
                            ? searchInput.value.trim()
                            : "";


                    if (!query) {

                        if (searchInput) {

                            searchInput.focus();

                        }

                        return;

                    }


                    const searchUrl =
                        "productos.html?search=" +
                        encodeURIComponent(query);


                    window.location.href =
                        searchUrl;

                }
            );

        }


        /* =====================================================
           DROPDOWNS DESKTOP
        ====================================================== */

        root.querySelectorAll(
            ".nav-dropdown"
        ).forEach(
            function (dropdown) {

                const button =
                    dropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                if (!button) {
                    return;
                }


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();


                        closeSearch();


                        const wasOpen =
                            dropdown.classList.contains(
                                "open"
                            );


                        closeDropdowns();


                        if (!wasOpen) {

                            dropdown.classList.add(
                                "open"
                            );

                            button.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           CERRAR DROPDOWN AL HACER CLICK AFUERA
        ====================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    root.contains(
                        event.target
                    )
                ) {

                    return;

                }


                closeDropdowns();

            }
        );


        /* =====================================================
           SUBMENÚS MÓVILES
        ====================================================== */

        root.querySelectorAll(
            ".mobile-nav-button[data-target]"
        ).forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();


                        const targetId =
                            button.dataset.target;


                        const target =
                            document.getElementById(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        const wasOpen =
                            target.classList.contains(
                                "open"
                            );


                        /* Cerrar todos */

                        root.querySelectorAll(
                            ".mobile-submenu"
                        ).forEach(
                            function (submenu) {

                                submenu.classList.remove(
                                    "open"
                                );

                            }
                        );


                        root.querySelectorAll(
                            ".mobile-nav-button"
                        ).forEach(
                            function (navButton) {

                                navButton.classList.remove(
                                    "active"
                                );

                                if (
                                    navButton.hasAttribute(
                                        "aria-expanded"
                                    )
                                ) {

                                    navButton.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                }

                            }
                        );


                        /* Abrir seleccionado */

                        if (!wasOpen) {

                            target.classList.add(
                                "open"
                            );

                            button.classList.add(
                                "active"
                            );

                            button.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           CERRAR MENÚ AL NAVEGAR
        ====================================================== */

        root.querySelectorAll(
            ".mobile-nav a"
        ).forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileMenu();

                    }
                );

            }
        );


        /* =====================================================
           ESC
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Escape"
                ) {
                    return;
                }


                closeSearch();

                closeMobileMenu();

                closeDropdowns();

            }
        );


        /* =====================================================
           HEADER AL HACER SCROLL
        ====================================================== */

        function updateScrollHeader() {

            if (
                window.scrollY > 50
            ) {

                root.classList.add(
                    "scrolled"
                );

            } else {

                root.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateScrollHeader,
            {
                passive: true
            }
        );


        updateScrollHeader();


        /* =====================================================
           CAMBIO DE TAMAÑO
        ====================================================== */

        window.addEventListener(
            "resize",
            function () {

                /*
                 * Si volvemos a escritorio,
                 * cerramos el menú móvil.
                 */

                if (
                    window.innerWidth > 1000
                ) {

                    closeMobileMenu();

                }

                updateScrollHeader();

            }
        );


        /* =====================================================
           CERRAR AL CAMBIAR DE PÁGINA / VISIBILIDAD
        ====================================================== */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.hidden
                ) {

                    closeMobileMenu();

                    closeSearch();

                }

            }
        );

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initSatoriiHeader
        );

    } else {

        initSatoriiHeader();

    }

})();
