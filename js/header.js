document.addEventListener("DOMContentLoaded", () => {

    const headerContainer = document.getElementById("satori-header");

    if (!headerContainer) return;

    headerContainer.innerHTML = `

        <!-- BARRA SUPERIOR -->
        <div class="top-bar">

            <div class="top-bar-inner">

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

                <span class="shipping-message">
                    🚚 ENVÍOS A TODO CHILE
                </span>

                <span class="top-message">
                    CULTURA JAPONESA · STREETWEAR · ANIME
                </span>

            </div>

        </div>


        <!-- HEADER PRINCIPAL -->
        <header class="main-header">

            <div class="header-inner">


                <!-- MENÚ MÓVIL -->
                <button
                    class="mobile-menu-button"
                    id="mobile-menu-button"
                    aria-label="Abrir menú"
                    aria-expanded="false"
                >
                    ☰
                </button>


                <!-- LOGO -->
                <a
                    href="index.html"
                    class="satori-logo"
                >
                    SATORII
                </a>


                <!-- NAVEGACIÓN -->
                <nav class="main-nav">


                    <a href="index.html">
                        INICIO
                    </a>


                    <div class="nav-dropdown">

                        <a href="productos.html">

                            COLECCIONES

                            <span>⌄</span>

                        </a>

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


                    <!-- PRODUCTOS = SATORII PACK -->
                    <div class="nav-dropdown">

                        <a href="satorii-pack.html">

                            PRODUCTOS

                            <span>⌄</span>

                        </a>

                        <div class="dropdown-menu">

                            <a href="satorii-pack.html">
                                Satorii Pack
                            </a>

                            <a href="mystery-box.html">
                                Mystery Box
                            </a>

                            <a href="gift-cards.html">
                                Gift Cards
                            </a>

                        </div>

                    </div>


                    <div class="nav-dropdown">

                        <a href="#">

                            AYUDA

                            <span>⌄</span>

                        </a>

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


                <!-- ACCIONES -->
                <div class="header-actions">


                    <!-- BUSCADOR -->
                    <div
                        class="search-wrapper"
                        id="search-wrapper"
                    >

                        <button
                            class="header-icon search-button"
                            id="search-button"
                            aria-label="Buscar"
                        >

                            <svg viewBox="0 0 24 24">

                                <circle
                                    cx="11"
                                    cy="11"
                                    r="7"
                                ></circle>

                                <path
                                    d="M16.5 16.5L21 21"
                                ></path>

                            </svg>

                        </button>


                        <input
                            type="search"
                            class="search-input"
                            id="search-input"
                            placeholder="Buscar productos..."
                            aria-label="Buscar productos"
                        >

                    </div>


                    <!-- CUENTA -->
                    <a
                        href="cuenta.html"
                        class="header-icon"
                        aria-label="Mi cuenta"
                    >

                        <svg viewBox="0 0 24 24">

                            <circle
                                cx="12"
                                cy="8"
                                r="4"
                            ></circle>

                            <path
                                d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
                            ></path>

                        </svg>

                    </a>


                    <!-- CARRITO -->
                    <a
                        href="carrito.html"
                        class="header-icon"
                        aria-label="Carrito"
                    >

                        <svg viewBox="0 0 24 24">

                            <path
                                d="M3 4h2l2.5 11h10L20 8H6"
                            ></path>

                            <circle
                                cx="9"
                                cy="19"
                                r="1.5"
                            ></circle>

                            <circle
                                cx="17"
                                cy="19"
                                r="1.5"
                            ></circle>

                        </svg>

                    </a>


                </div>

            </div>

        </header>


        <!-- MENÚ MÓVIL -->
        <div
            class="mobile-overlay"
            id="mobile-overlay"
        ></div>


        <aside
            class="mobile-menu"
            id="mobile-menu"
        >


            <div class="mobile-menu-header">

                <a
                    href="index.html"
                    class="satori-logo"
                >
                    SATORII
                </a>

                <button
                    id="mobile-menu-close"
                    aria-label="Cerrar menú"
                >
                    ×
                </button>

            </div>


            <nav>


                <a
                    href="index.html"
                    class="mobile-menu-item"
                >
                    <span>INICIO</span>
                </a>


                <button
                    class="mobile-menu-item"
                    data-submenu="mobile-collections"
                >

                    <span>
                        COLECCIONES
                    </span>

                    <span>
                        →
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


                <button
                    class="mobile-menu-item"
                    data-submenu="mobile-products"
                >

                    <span>
                        PRODUCTOS
                    </span>

                    <span>
                        →
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >

                    <a href="satorii-pack.html">
                        Satorii Pack
                    </a>

                    <a href="mystery-box.html">
                        Mystery Box
                    </a>

                    <a href="gift-cards.html">
                        Gift Cards
                    </a>

                </div>


                <button
                    class="mobile-menu-item"
                    data-submenu="mobile-help"
                >

                    <span>
                        AYUDA
                    </span>

                    <span>
                        →
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


            <div class="mobile-instagram">

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

    `;


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const menuButton =
        document.getElementById("mobile-menu-button");

    const menu =
        document.getElementById("mobile-menu");

    const overlay =
        document.getElementById("mobile-overlay");

    const closeButton =
        document.getElementById("mobile-menu-close");


    function openMenu() {

        menu.classList.add("open");
        overlay.classList.add("open");

        document.body.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu() {

        menu.classList.remove("open");
        overlay.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    menuButton.addEventListener(
        "click",
        openMenu
    );


    closeButton.addEventListener(
        "click",
        closeMenu
    );


    overlay.addEventListener(
        "click",
        closeMenu
    );


    /* =====================================================
       SUBMENÚS MÓVILES
    ===================================================== */

    document
        .querySelectorAll("[data-submenu]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const submenuId =
                        button.dataset.submenu;

                    const submenu =
                        document.getElementById(
                            submenuId
                        );

                    if (!submenu) return;

                    submenu.classList.toggle("open");

                    button.classList.toggle("open");

                }
            );

        });


    /* =====================================================
       BUSCADOR
    ===================================================== */

    const searchWrapper =
        document.getElementById("search-wrapper");

    const searchButton =
        document.getElementById("search-button");

    const searchInput =
        document.getElementById("search-input");


    searchButton.addEventListener(
        "click",
        () => {

            searchWrapper.classList.toggle(
                "active"
            );

            if (
                searchWrapper.classList.contains(
                    "active"
                )
            ) {

                setTimeout(
                    () => searchInput.focus(),
                    100
                );

            }

        }
    );


    /* =====================================================
       ESC PARA CERRAR
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

                searchWrapper.classList.remove(
                    "active"
                );

            }

        }
    );

});
