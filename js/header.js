document.addEventListener("DOMContentLoaded", function () {

    const headerContainer = document.getElementById("satori-header");

    if (!headerContainer) return;

    headerContainer.innerHTML = `
        <div class="shipping-bar">
            🚚 ENVÍOS A TODO CHILE
        </div>

        <header class="main-header">

            <div class="header-inner">

                <!-- LOGO -->
                <a href="index.html" class="satori-logo">
                    SATORII
                </a>

                <!-- NAVEGACIÓN PC -->
                <nav class="desktop-nav">

                    <a href="index.html">INICIO</a>

                    <div class="nav-dropdown">
                        <button type="button">
                            COLECCIONES
                            <span>⌄</span>
                        </button>

                        <div class="dropdown-menu">
                            <a href="anime.html">Anime</a>
                            <a href="streetwear.html">Streetwear</a>
                            <a href="accesorios.html">Accesorios</a>
                        </div>
                    </div>

                    <div class="nav-dropdown">
                        <button type="button">
                            PRODUCTOS
                            <span>⌄</span>
                        </button>

                        <div class="dropdown-menu">
                            <a href="productos.html">Todos los productos</a>
                            <a href="poleras.html">Poleras</a>
                            <a href="accesorios.html">Accesorios</a>
                        </div>
                    </div>

                    <div class="nav-dropdown">
                        <button type="button">
                            AYUDA
                            <span>⌄</span>
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

                <!-- ACCIONES -->
                <div class="header-actions">

                    <!-- BUSCADOR -->
                    <div class="header-search">

                        <button
                            type="button"
                            class="search-toggle"
                            aria-label="Buscar"
                            aria-expanded="false"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="11" cy="11" r="6.5"></circle>
                                <path d="M16 16L21 21"></path>
                            </svg>
                        </button>

                        <form
                            class="search-form"
                            action="productos.html"
                            method="get"
                        >
                            <input
                                type="search"
                                name="q"
                                placeholder="Buscar productos..."
                                autocomplete="off"
                                aria-label="Buscar productos"
                            >
                        </form>

                    </div>

                    <!-- USUARIO -->
                    <a
                        href="cuenta.html"
                        class="header-icon"
                        aria-label="Mi cuenta"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="8" r="3.5"></circle>
                            <path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6"></path>
                        </svg>
                    </a>

                    <!-- CARRITO -->
                    <a
                        href="carrito.html"
                        class="header-icon"
                        aria-label="Carrito"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 5h2l1.5 10h10L20 8H7"></path>
                            <circle cx="10" cy="19" r="1.3"></circle>
                            <circle cx="17" cy="19" r="1.3"></circle>
                        </svg>
                    </a>

                    <!-- MENÚ MÓVIL -->
                    <button
                        type="button"
                        class="mobile-menu-toggle"
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

        <!-- MENÚ MÓVIL -->

        <div class="mobile-overlay"></div>

        <aside class="mobile-menu">

            <div class="mobile-menu-header">

                <a href="index.html" class="mobile-logo">
                    SATORII
                </a>

                <button
                    type="button"
                    class="mobile-menu-close"
                    aria-label="Cerrar menú"
                >
                    ×
                </button>

            </div>

            <nav class="mobile-nav">

                <a href="index.html">
                    INICIO
                </a>

                <details>
                    <summary>
                        COLECCIONES
                        <span>↓</span>
                    </summary>

                    <a href="anime.html">Anime</a>
                    <a href="streetwear.html">Streetwear</a>
                    <a href="accesorios.html">Accesorios</a>
                </details>

                <details>
                    <summary>
                        PRODUCTOS
                        <span>↓</span>
                    </summary>

                    <a href="productos.html">Todos los productos</a>
                    <a href="poleras.html">Poleras</a>
                    <a href="accesorios.html">Accesorios</a>
                </details>

                <details>
                    <summary>
                        AYUDA
                        <span>↓</span>
                    </summary>

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

                </details>

            </nav>

            <div class="mobile-social">

                <span>SÍGUENOS</span>

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
       BUSCADOR
       ===================================================== */

    const searchBox = headerContainer.querySelector(".header-search");
    const searchToggle = headerContainer.querySelector(".search-toggle");
    const searchInput = headerContainer.querySelector(".search-form input");

    searchToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = searchBox.classList.toggle("is-open");

        searchToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        if (isOpen) {
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        }

    });


    /* Cerrar buscador al hacer clic afuera */

    document.addEventListener("click", function (event) {

        if (!searchBox.contains(event.target)) {

            searchBox.classList.remove("is-open");

            searchToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       MENÚ MÓVIL
       ===================================================== */

    const mobileToggle =
        headerContainer.querySelector(".mobile-menu-toggle");

    const mobileMenu =
        headerContainer.querySelector(".mobile-menu");

    const mobileOverlay =
        headerContainer.querySelector(".mobile-overlay");

    const mobileClose =
        headerContainer.querySelector(".mobile-menu-close");


    function openMobileMenu() {

        mobileMenu.classList.add("is-open");
        mobileOverlay.classList.add("is-open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");

    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("is-open");
        mobileOverlay.classList.remove("is-open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    }


    mobileToggle.addEventListener(
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


    /* Cerrar menú cuando se selecciona un enlace */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =====================================================
       DROPDOWNS PC
       ===================================================== */

    document
        .querySelectorAll(".nav-dropdown > button")
        .forEach(button => {

            button.addEventListener("click", function () {

                const dropdown =
                    this.parentElement;

                document
                    .querySelectorAll(".nav-dropdown")
                    .forEach(item => {

                        if (item !== dropdown) {
                            item.classList.remove("active");
                        }

                    });

                dropdown.classList.toggle("active");

            });

        });


    /* Cerrar dropdown al hacer clic afuera */

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".nav-dropdown")) {

            document
                .querySelectorAll(".nav-dropdown")
                .forEach(item => {
                    item.classList.remove("active");
                });

        }

    });

});
