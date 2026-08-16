document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("satori-header");

    if (!header) return;

    header.innerHTML = `

        <!-- ================================
             BARRA SUPERIOR
        ================================= -->

        <div class="top-bar">

            <div class="top-bar-inner">

                <a
                    href="https://www.instagram.com/satorimode/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="top-instagram"
                    aria-label="Instagram SatoriMode"
                >

                    <svg viewBox="0 0 24 24">

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



        <!-- ================================
             HEADER
        ================================= -->

        <header class="main-header">

            <div class="header-inner">


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



                    <div class="nav-dropdown">

                        <a href="productos.html">
                            PRODUCTOS
                            <span>⌄</span>
                        </a>

                        <div class="dropdown-menu">

                            <a href="poleras.html">
                                Poleras
                            </a>

                            <a href="polerones.html">
                                Polerones
                            </a>

                            <a href="accesorios.html">
                                Accesorios
                            </a>

                            <a href="productos.html">
                                Todos
                            </a>

                        </div>

                    </div>



                    <div class="nav-dropdown">

                        <a href="ayuda.html">
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
                            type="button"
                            aria-label="Buscar"
                        >

                            <svg viewBox="0 0 24 24">

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


                        <input
                            type="search"
                            id="search-input"
                            class="search-input"
                            placeholder="Buscar productos..."
                        >

                    </div>



                    <!-- CUENTA -->

                    <a
                        href="cuenta.html"
                        class="header-icon"
                        aria-label="Cuenta"
                    >

                        <svg viewBox="0 0 24 24">

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
                        href="carrito.html"
                        class="header-icon"
                        aria-label="Carrito"
                    >

                        <svg viewBox="0 0 24 24">

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



                    <!-- MENÚ MÓVIL -->

                    <button
                        class="mobile-menu-button"
                        id="mobile-menu-button"
                        type="button"
                        aria-label="Abrir menú"
                    >
                        ☰
                    </button>

                </div>

            </div>

        </header>



        <!-- ================================
             MENÚ MÓVIL
        ================================= -->

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
                    type="button"
                >
                    ×
                </button>

            </div>


            <nav>

                <a href="index.html">
                    INICIO
                </a>

                <a href="productos.html">
                    COLECCIONES
                    <span>→</span>
                </a>

                <a href="productos.html">
                    PRODUCTOS
                    <span>→</span>
                </a>

                <a href="ayuda.html">
                    AYUDA
                    <span>→</span>
                </a>

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


        <div
            class="mobile-overlay"
            id="mobile-overlay"
        ></div>

    `;



    /* ==========================================
       BUSCADOR
    ========================================== */

    const searchButton =
        document.getElementById("search-button");

    const searchInput =
        document.getElementById("search-input");

    const searchWrapper =
        document.getElementById("search-wrapper");


    searchButton.addEventListener("click", (event) => {

        event.stopPropagation();

        searchWrapper.classList.toggle("active");

        if (
            searchWrapper.classList.contains("active")
        ) {

            setTimeout(() => {
                searchInput.focus();
            }, 100);

        }

    });


    document.addEventListener("click", (event) => {

        if (
            !searchWrapper.contains(event.target)
        ) {

            searchWrapper.classList.remove("active");

        }

    });


    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            const query =
                searchInput.value.trim();

            if (!query) return;

            window.location.href =
                `productos.html?search=${encodeURIComponent(query)}`;

        }

    });



    /* ==========================================
       MENÚ MÓVIL
    ========================================== */

    const mobileButton =
        document.getElementById("mobile-menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileClose =
        document.getElementById("mobile-menu-close");

    const mobileOverlay =
        document.getElementById("mobile-overlay");


    function openMenu() {

        mobileMenu.classList.add("open");

        mobileOverlay.classList.add("open");

        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        mobileMenu.classList.remove("open");

        mobileOverlay.classList.remove("open");

        document.body.classList.remove("menu-open");

    }


    mobileButton?.addEventListener(
        "click",
        openMenu
    );


    mobileClose?.addEventListener(
        "click",
        closeMenu
    );


    mobileOverlay?.addEventListener(
        "click",
        closeMenu
    );

});
