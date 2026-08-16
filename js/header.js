/* =========================================================
   SATORII · HEADER GLOBAL
   VERSIÓN CORREGIDA
   - Barra superior
   - Header fijo
   - Logo centrado en móvil
   - Menú móvil izquierda
   - Dropdowns SOLO por click
   - Inicio / Colecciones / Productos / Ayuda abren menú
   - Buscador
   - Contador de carrito
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";

    const siteUrl = function (path = "") {

        if (!path) return baseUrl;

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        return new URL(
            String(path).replace(/^\/+/, ""),
            baseUrl
        ).href;
    };


    let headerContainer =
        document.getElementById("satori-header");

    if (!headerContainer) {

        headerContainer =
            document.createElement("div");

        headerContainer.id =
            "satori-header";

        document.body.prepend(headerContainer);
    }


    /* =====================================================
       ESTILOS DEL HEADER
       Se cargan desde aquí para evitar conflictos con
       reglas antiguas de style.css.
    ====================================================== */

    if (!document.getElementById("satori-header-fix")) {

        const style =
            document.createElement("style");

        style.id =
            "satori-header-fix";

        style.textContent = `

            /* =========================
               VARIABLES
            ========================== */

            :root {
                --satori-red: #ed1111;
                --satori-black: #111;
                --satori-white: #fff;
                --satori-border: #e6e6e6;
            }


            /* =========================
               BARRA SUPERIOR
            ========================== */

            .top-bar {
                width: 100%;
                height: 32px;
                background: var(--satori-red);
                color: #fff;
                position: relative;
                z-index: 5000;
            }

            .top-bar-inner {
                width: min(1400px, calc(100% - 40px));
                height: 100%;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                align-items: center;
                position: relative;
            }

            .top-instagram {
                justify-self: start;
                width: 22px;
                height: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }

            .top-instagram svg {
                width: 15px;
                height: 15px;
                fill: none;
                stroke: currentColor;
                stroke-width: 1.7;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            .top-instagram circle:last-child {
                fill: currentColor;
                stroke: none;
            }

            .shipping-message {
                grid-column: 2;
                font-size: 10px;
                font-weight: 600;
                letter-spacing: .7px;
                white-space: nowrap;
                text-align: center;
            }

            .top-message {
                grid-column: 3;
                justify-self: end;
                font-size: 9px;
                font-weight: 500;
                letter-spacing: .5px;
                white-space: nowrap;
            }


            /* =========================
               HEADER PRINCIPAL
            ========================== */

            .main-header {
                width: 100%;
                height: 70px;
                background: #fff;
                border-bottom: 1px solid var(--satori-border);
                position: sticky !important;
                top: 0 !important;
                z-index: 4900;
            }

            .header-inner {
                width: min(1400px, calc(100% - 40px));
                height: 100%;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                align-items: center;
                position: relative;
            }

            .satori-logo {
                grid-column: 1;
                justify-self: start;
                color: #111;
                text-decoration: none;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 28px;
                font-weight: 500;
                font-style: italic;
                letter-spacing: -2px;
                line-height: 1;
                transform: skewX(-5deg);
                white-space: nowrap;
            }


            /* =========================
               NAVEGACIÓN
            ========================== */

            .main-nav {
                grid-column: 2;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 32px;
            }

            .main-nav > a,
            .nav-dropdown-btn {
                height: 100%;
                padding: 0;
                border: 0;
                background: transparent;
                color: #111;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                font-weight: 500;
                letter-spacing: .3px;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 6px;
                white-space: nowrap;
                cursor: pointer;
            }

            .main-nav > a:hover,
            .nav-dropdown-btn:hover,
            .nav-dropdown.active .nav-dropdown-btn {
                color: var(--satori-red);
            }

            .nav-dropdown {
                position: relative;
                height: 100%;
                display: flex;
                align-items: center;
            }

            .nav-dropdown-btn .arrow {
                font-size: 10px;
                line-height: 1;
                transition: transform .2s ease;
            }

            .nav-dropdown.active .arrow {
                transform: rotate(180deg);
            }


            /* =========================
               DROPDOWNS
            ========================== */

            .dropdown-menu {
                position: absolute;
                top: calc(100% - 1px);
                left: 50%;
                width: 220px;
                padding: 8px;
                background: #fff;
                border: 1px solid #e2e2e2;
                border-radius: 8px;
                box-shadow: 0 15px 35px rgba(0,0,0,.12);
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transform: translate(-50%, -7px);
                transition:
                    opacity .18s ease,
                    visibility .18s ease,
                    transform .18s ease;
                z-index: 6000;
            }

            .nav-dropdown.active .dropdown-menu {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translate(-50%, 0);
            }

            .dropdown-menu a {
                display: flex;
                align-items: center;
                min-height: 40px;
                padding: 9px 12px;
                border-radius: 5px;
                color: #111;
                font-size: 12px;
                font-weight: 500;
                text-decoration: none;
            }

            .dropdown-menu a:hover {
                background: #f5f5f5;
                color: var(--satori-red);
            }


            /* =========================
               ICONOS
            ========================== */

            .header-icons {
                grid-column: 3;
                justify-self: end;
                display: flex;
                align-items: center;
                gap: 14px;
            }

            .header-icon {
                position: relative;
                width: 25px;
                height: 25px;
                padding: 0;
                border: 0;
                background: transparent;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: #111;
                text-decoration: none;
                cursor: pointer;
            }

            .header-icon:hover {
                color: var(--satori-red);
            }

            .header-icon svg {
                width: 18px;
                height: 18px;
                fill: none;
                stroke: currentColor;
                stroke-width: 1.6;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            .cart-count {
                position: absolute;
                top: -5px;
                right: -7px;
                min-width: 16px;
                height: 16px;
                padding: 0 4px;
                display: none;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: var(--satori-red);
                color: #fff;
                font-size: 8px;
                font-weight: 800;
                line-height: 1;
            }


            /* =========================
               BUSCADOR
            ========================== */

            .header-search {
                position: fixed;
                top: 102px;
                left: 50%;
                width: min(680px, calc(100% - 40px));
                transform: translateX(-50%) translateY(-10px);
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 18px 45px rgba(0,0,0,.16);
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition: .18s ease;
                z-index: 8000;
            }

            .header-search.is-open {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translateX(-50%) translateY(0);
            }

            .header-search-form {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .header-search input {
                flex: 1;
                min-width: 0;
                height: 42px;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 0 12px;
                outline: none;
                font-size: 14px;
            }

            .header-search input:focus {
                border-color: #111;
            }

            .header-search-close {
                width: 42px;
                height: 42px;
                border: 0;
                background: #111;
                color: #fff;
                border-radius: 5px;
                cursor: pointer;
                font-size: 20px;
            }

            .header-search-results {
                max-height: 360px;
                overflow: auto;
                margin-top: 10px;
            }


            /* =========================
               MENÚ MÓVIL
            ========================== */

            .mobile-menu-button {
                display: none;
                width: 42px;
                height: 42px;
                padding: 0;
                border: 0;
                background: transparent;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 5px;
                cursor: pointer;
            }

            .mobile-menu-button span {
                width: 22px;
                height: 2px;
                background: #111;
                display: block;
                transition: transform .2s ease, opacity .2s ease;
            }

            .mobile-menu-button.is-open span:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }

            .mobile-menu-button.is-open span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-button.is-open span:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }

            .mobile-menu-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,.42);
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                z-index: 7000;
                transition: .2s ease;
            }

            .mobile-menu-overlay.is-open {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            .mobile-menu {
                position: fixed;
                top: 0;
                left: 0;
                width: min(370px, 88vw);
                height: 100vh;
                padding: 24px;
                background: #fff;
                border-right: 1px solid #ddd;
                transform: translateX(-100%);
                transition: transform .25s ease;
                z-index: 7100;
                overflow-y: auto;
            }

            .mobile-menu.is-open {
                transform: translateX(0);
            }

            .mobile-menu-header {
                min-height: 55px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #ddd;
                margin-bottom: 20px;
            }

            .mobile-menu-logo {
                color: #111;
                font-size: 26px;
                font-weight: 500;
                font-style: italic;
                letter-spacing: -1.5px;
                text-decoration: none;
            }

            .mobile-menu-close {
                width: 40px;
                height: 40px;
                border: 0;
                background: transparent;
                font-size: 30px;
                cursor: pointer;
            }

            .mobile-nav {
                display: flex;
                flex-direction: column;
            }

            .mobile-nav > a,
            .mobile-nav-button {
                width: 100%;
                min-height: 60px;
                padding: 0;
                border: 0;
                border-bottom: 1px solid #ddd;
                background: transparent;
                color: #111;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                font-weight: 500;
                text-align: left;
                cursor: pointer;
            }

            .mobile-nav-button .arrow {
                transition: transform .2s ease;
            }

            .mobile-nav-button.is-open .arrow {
                transform: rotate(180deg);
            }

            .mobile-submenu {
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                transition: max-height .25s ease, opacity .2s ease;
            }

            .mobile-submenu.is-open {
                max-height: 500px;
                opacity: 1;
            }

            .mobile-submenu a {
                min-height: 48px;
                padding: 0 10px 0 18px;
                border-bottom: 1px solid #eee;
                display: flex;
                align-items: center;
                color: #555;
                text-decoration: none;
                font-size: 14px;
            }

            .mobile-submenu a:hover {
                color: var(--satori-red);
            }

            .mobile-social {
                margin-top: 35px;
            }

            .mobile-social span {
                display: block;
                color: var(--satori-red);
                font-size: 10px;
                font-weight: 800;
                letter-spacing: 3px;
                margin-bottom: 15px;
            }

            .mobile-social a {
                color: #111;
                font-size: 14px;
                font-weight: 600;
                text-decoration: none;
            }


            /* =========================
               MÓVIL
            ========================== */

            @media (max-width: 900px) {

                .top-bar {
                    height: 32px;
                }

                .top-bar-inner {
                    width: calc(100% - 20px);
                    grid-template-columns: 1fr auto 1fr;
                }

                .top-message {
                    display: none;
                }

                .shipping-message {
                    font-size: 9px;
                    letter-spacing: .4px;
                }

                .main-header {
                    height: 64px;
                }

                .header-inner {
                    width: calc(100% - 20px);
                    grid-template-columns: 1fr auto 1fr;
                }

                .mobile-menu-button {
                    grid-column: 1;
                    justify-self: start;
                    display: flex;
                }

                .satori-logo {
                    grid-column: 2;
                    justify-self: center;
                    font-size: 27px;
                }

                .main-nav {
                    display: none;
                }

                .header-icons {
                    grid-column: 3;
                    justify-self: end;
                    gap: 5px;
                }

                .header-icon {
                    width: 29px;
                    height: 29px;
                }

                .header-search {
                    top: 96px;
                }
            }

            @media (max-width: 430px) {

                .header-inner {
                    width: calc(100% - 14px);
                }

                .satori-logo {
                    font-size: 25px;
                }

                .mobile-menu {
                    width: 88vw;
                    padding: 20px;
                }
            }
        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       HTML
    ====================================================== */

    headerContainer.innerHTML = `

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
                        <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                        <circle cx="12" cy="12" r="4"></circle>
                        <circle cx="17.5" cy="6.5" r="1"></circle>
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


        <header class="main-header">

            <div class="header-inner">

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


                <a
                    class="satori-logo"
                    href="${siteUrl("index.html")}"
                    aria-label="SatoriMode"
                >
                    SATORII
                </a>


                <nav
                    class="main-nav"
                    aria-label="Navegación principal"
                >

                    <!-- INICIO -->
                    <div
                        class="nav-dropdown"
                        data-dropdown="inicio"
                    >
                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            <span>INICIO</span>
                            <span class="arrow">⌄</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="${siteUrl("index.html")}">
                                PÁGINA PRINCIPAL
                            </a>

                            <a href="${siteUrl("index.html#recommendations")}">
                                RECOMENDACIONES
                            </a>

                        </div>
                    </div>


                    <!-- COLECCIONES -->
                    <div
                        class="nav-dropdown"
                        data-dropdown="colecciones"
                    >
                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            <span>COLECCIONES</span>
                            <span class="arrow">⌄</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="${siteUrl("anime.html")}">
                                ANIME
                            </a>

                            <a href="${siteUrl("streetwear.html")}">
                                STREETWEAR
                            </a>

                            <a href="${siteUrl("accesorios.html")}">
                                ACCESORIOS
                            </a>

                            <a href="${siteUrl("productos.html")}">
                                TODO
                            </a>

                        </div>
                    </div>


                    <!-- PRODUCTOS -->
                    <div
                        class="nav-dropdown"
                        data-dropdown="productos"
                    >
                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            <span>PRODUCTOS</span>
                            <span class="arrow">⌄</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="${siteUrl("satorii-pack.html")}">
                                SATORII PACK
                            </a>

                            <a href="${siteUrl("gift-cards.html")}">
                                GIFT CARDS
                            </a>

                            <a href="${siteUrl("mystery-box.html")}">
                                MYSTERY BOX
                            </a>

                        </div>
                    </div>


                    <!-- AYUDA -->
                    <div
                        class="nav-dropdown"
                        data-dropdown="ayuda"
                    >
                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            <span>AYUDA</span>
                            <span class="arrow">⌄</span>
                        </button>

                        <div class="dropdown-menu">

                            <a href="${siteUrl("preguntas-frecuentes.html")}">
                                PREGUNTAS FRECUENTES
                            </a>

                            <a href="${siteUrl("envios.html")}">
                                ENVÍOS
                            </a>

                            <a href="${siteUrl("cambios.html")}">
                                CAMBIOS Y DEVOLUCIONES
                            </a>

                            <a href="${siteUrl("guia-tallas.html")}">
                                GUÍA DE TALLAS
                            </a>

                        </div>
                    </div>

                </nav>


                <div class="header-icons">

                    <button
                        type="button"
                        class="header-icon search-button"
                        id="search-button"
                        aria-label="Buscar"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="10.8" cy="10.8" r="6.3"></circle>
                            <path d="M16 16l4.5 4.5"></path>
                        </svg>
                    </button>


                    <a
                        href="${siteUrl("cuenta.html")}"
                        class="header-icon"
                        aria-label="Cuenta"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="8" r="3.2"></circle>
                            <path d="M5.5 20c.8-3.7 3-5.5 6.5-5.5s5.7 1.8 6.5 5.5"></path>
                        </svg>
                    </a>


                    <a
                        href="${siteUrl("carrito.html")}"
                        class="header-icon cart-header-icon"
                        aria-label="Carrito"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 5h2l1.4 9.2a2 2 0 0 0 2 1.7h7.2a2 2 0 0 0 2-1.7L20 8H7"></path>
                            <circle cx="10" cy="19.5" r="1"></circle>
                            <circle cx="17" cy="19.5" r="1"></circle>
                        </svg>

                        <span
                            class="cart-count"
                            id="cart-count"
                        >0</span>
                    </a>

                </div>

            </div>

        </header>


        <div
            class="header-search"
            id="header-search"
            aria-hidden="true"
        >
            <form
                class="header-search-form"
                id="header-search-form"
            >
                <input
                    id="header-search-input"
                    type="search"
                    placeholder="Buscar productos..."
                    autocomplete="off"
                    aria-label="Buscar productos"
                >

                <button
                    type="button"
                    class="header-search-close"
                    id="header-search-close"
                    aria-label="Cerrar búsqueda"
                >
                    ×
                </button>
            </form>

            <div
                class="header-search-results"
                id="header-search-results"
            ></div>
        </div>


        <div
            class="mobile-menu-overlay"
            id="mobile-menu-overlay"
        ></div>


        <aside
            class="mobile-menu"
            id="mobile-menu"
            aria-hidden="true"
        >

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


            <nav class="mobile-nav">

                <!-- INICIO -->
                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-inicio"
                    aria-expanded="false"
                >
                    <span>INICIO</span>
                    <span class="arrow">↓</span>
                </button>

                <div
                    class="mobile-submenu"
                    id="mobile-inicio"
                >
                    <a href="${siteUrl("index.html")}">
                        PÁGINA PRINCIPAL
                    </a>

                    <a href="${siteUrl("index.html#recommendations")}">
                        RECOMENDACIONES
                    </a>
                </div>


                <!-- COLECCIONES -->
                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-collections"
                    aria-expanded="false"
                >
                    <span>COLECCIONES</span>
                    <span class="arrow">↓</span>
                </button>

                <div
                    class="mobile-submenu"
                    id="mobile-collections"
                >
                    <a href="${siteUrl("anime.html")}">ANIME</a>
                    <a href="${siteUrl("streetwear.html")}">STREETWEAR</a>
                    <a href="${siteUrl("accesorios.html")}">ACCESORIOS</a>
                    <a href="${siteUrl("productos.html")}">TODO</a>
                </div>


                <!-- PRODUCTOS -->
                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-products"
                    aria-expanded="false"
                >
                    <span>PRODUCTOS</span>
                    <span class="arrow">↓</span>
                </button>

                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >
                    <a href="${siteUrl("satorii-pack.html")}">
                        SATORII PACK
                    </a>

                    <a href="${siteUrl("gift-cards.html")}">
                        GIFT CARDS
                    </a>

                    <a href="${siteUrl("mystery-box.html")}">
                        MYSTERY BOX
                    </a>
                </div>


                <!-- AYUDA -->
                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-help"
                    aria-expanded="false"
                >
                    <span>AYUDA</span>
                    <span class="arrow">↓</span>
                </button>

                <div
                    class="mobile-submenu"
                    id="mobile-help"
                >
                    <a href="${siteUrl("preguntas-frecuentes.html")}">
                        PREGUNTAS FRECUENTES
                    </a>

                    <a href="${siteUrl("envios.html")}">
                        ENVÍOS
                    </a>

                    <a href="${siteUrl("cambios.html")}">
                        CAMBIOS Y DEVOLUCIONES
                    </a>

                    <a href="${siteUrl("guia-tallas.html")}">
                        GUÍA DE TALLAS
                    </a>
                </div>

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
       DROPDOWNS DESKTOP
       SOLO CLICK
    ====================================================== */

    const dropdowns =
        document.querySelectorAll(
            ".main-nav .nav-dropdown"
        );

    function closeDropdowns() {

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("active");

            const button =
                dropdown.querySelector(
                    ".nav-dropdown-btn"
                );

            button?.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    }


    dropdowns.forEach(function (dropdown) {

        const button =
            dropdown.querySelector(
                ".nav-dropdown-btn"
            );

        button?.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    dropdown.classList.contains("active");

                closeDropdowns();

                if (!isOpen) {

                    dropdown.classList.add("active");

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );
                }
            }
        );
    });


    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(
                    ".main-nav .nav-dropdown"
                )
            ) {
                closeDropdowns();
            }
        }
    );


    /* =====================================================
       MENÚ MÓVIL
    ====================================================== */

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


    function closeMobileMenu() {

        mobileMenu?.classList.remove("is-open");
        mobileOverlay?.classList.remove("is-open");
        mobileButton?.classList.remove("is-open");

        mobileButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    function openMobileMenu() {

        mobileMenu?.classList.add("is-open");
        mobileOverlay?.classList.add("is-open");
        mobileButton?.classList.add("is-open");

        mobileButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }


    mobileButton?.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            if (
                mobileMenu?.classList.contains("is-open")
            ) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
    );


    mobileClose?.addEventListener(
        "click",
        closeMobileMenu
    );

    mobileOverlay?.addEventListener(
        "click",
        closeMobileMenu
    );


    document
        .querySelectorAll(".mobile-nav-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const submenu =
                        document.getElementById(
                            button.dataset.mobileSubmenu
                        );

                    if (!submenu) return;

                    const wasOpen =
                        submenu.classList.contains(
                            "is-open"
                        );


                    document
                        .querySelectorAll(".mobile-submenu")
                        .forEach(function (menu) {
                            menu.classList.remove(
                                "is-open"
                            );
                        });


                    document
                        .querySelectorAll(".mobile-nav-button")
                        .forEach(function (btn) {

                            btn.classList.remove(
                                "is-open"
                            );

                            btn.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        });


                    if (!wasOpen) {

                        submenu.classList.add(
                            "is-open"
                        );

                        button.classList.add(
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


    document
        .querySelectorAll(".mobile-submenu a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });


    /* =====================================================
       BUSCADOR
    ====================================================== */

    const searchButton =
        document.getElementById(
            "search-button"
        );

    const searchBox =
        document.getElementById(
            "header-search"
        );

    const searchInput =
        document.getElementById(
            "header-search-input"
        );

    const searchClose =
        document.getElementById(
            "header-search-close"
        );

    const searchResults =
        document.getElementById(
            "header-search-results"
        );


    function getProducts() {

        const candidates = [
            window.PRODUCTS,
            window.satoriProducts,
            window.SATORI_PRODUCTS,
            window.products
        ];

        for (const candidate of candidates) {

            if (
                Array.isArray(candidate) &&
                candidate.length
            ) {
                return candidate;
            }
        }

        return [];
    }


    function normalizeProduct(product) {

        const name =
            product?.name ||
            product?.nombre ||
            "";

        const price =
            product?.price ??
            product?.precio ??
            0;

        const image =
            product?.image ||
            product?.imagen ||
            (
                Array.isArray(product?.images)
                    ? product.images[0]
                    : ""
            );

        const url =
            product?.url ||
            product?.href ||
            "productos.html";

        const category =
            product?.category ||
            product?.categoria ||
            "";

        return {
            name,
            price:
                typeof price === "number"
                    ? `$${price.toLocaleString("es-CL")}`
                    : String(price),

            image:
                image &&
                !/^https?:\/\//i.test(image)
                    ? siteUrl(image)
                    : image,

            url:
                /^https?:\/\//i.test(url)
                    ? url
                    : siteUrl(url),

            searchText:
                `${name} ${category} ${product?.keywords || ""}`
                    .toLowerCase()
        };
    }


    function openSearch() {

        searchBox?.classList.add("is-open");
        searchBox?.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(function () {
            searchInput?.focus();
        }, 100);
    }


    function closeSearch() {

        searchBox?.classList.remove("is-open");
        searchBox?.setAttribute(
            "aria-hidden",
            "true"
        );

        if (searchInput) {
            searchInput.value = "";
        }

        if (searchResults) {
            searchResults.innerHTML = "";
        }
    }


    searchButton?.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (
                searchBox?.classList.contains(
                    "is-open"
                )
            ) {
                closeSearch();
            } else {
                openSearch();
            }
        }
    );


    searchClose?.addEventListener(
        "click",
        closeSearch
    );


    searchInput?.addEventListener(
        "input",
        function () {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();

            if (!query) {

                searchResults.innerHTML = "";

                return;
            }

            const results =
                getProducts()
                    .map(normalizeProduct)
                    .filter(function (product) {
                        return product.searchText
                            .includes(query);
                    })
                    .slice(0, 8);


            if (!results.length) {

                searchResults.innerHTML =
                    `<p style="padding:12px;color:#777">
                        No encontramos productos.
                    </p>`;

                return;
            }


            searchResults.innerHTML =
                results.map(function (product) {

                    return `
                        <a
                            href="${product.url}"
                            style="
                                display:flex;
                                align-items:center;
                                gap:12px;
                                padding:10px;
                                text-decoration:none;
                                color:#111;
                                border-bottom:1px solid #eee;
                            "
                        >
                            ${
                                product.image
                                    ? `
                                        <img
                                            src="${product.image}"
                                            alt="${product.name}"
                                            style="
                                                width:55px;
                                                height:55px;
                                                object-fit:cover;
                                                border-radius:5px;
                                            "
                                        >
                                    `
                                    : ""
                            }

                            <span>
                                <strong
                                    style="
                                        display:block;
                                        font-size:13px;
                                    "
                                >
                                    ${product.name}
                                </strong>

                                <small
                                    style="
                                        color:#777;
                                    "
                                >
                                    ${product.price}
                                </small>
                            </span>
                        </a>
                    `;

                }).join("");
        }
    );


    /* =====================================================
       CERRAR CON ESC
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }

            closeDropdowns();
            closeSearch();
            closeMobileMenu();
        }
    );


    /* =====================================================
       CONTADOR DEL CARRITO
    ====================================================== */

    function updateCartCount() {

        const cartCount =
            document.getElementById(
                "cart-count"
            );

        if (!cartCount) return;

        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "satoriCart"
                    )
                ) || [];

        } catch {

            cart = [];
        }


        const total =
            Array.isArray(cart)
                ? cart.reduce(
                    function (sum, item) {

                        return sum +
                            (
                                Number(
                                    item.quantity
                                ) || 0
                            );

                    },
                    0
                )
                : 0;


        cartCount.textContent =
            total;

        cartCount.style.display =
            total > 0
                ? "flex"
                : "none";
    }


    updateCartCount();

    window.addEventListener(
        "storage",
        updateCartCount
    );

});
