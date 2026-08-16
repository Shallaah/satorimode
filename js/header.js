/* =========================================================
   SATORII · HEADER
   HEADER GLOBAL — VERSIÓN FINAL
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ESPERAR A QUE CARGUE LA PÁGINA
    ====================================================== */

    function ready(fn) {

        if (document.readyState === "loading") {

            document.addEventListener(
                "DOMContentLoaded",
                fn
            );

        } else {

            fn();

        }
    }


    ready(function () {


        /* =================================================
           EVITAR DUPLICADOS
        ================================================== */

        var old =
            document.getElementById(
                "satori-header"
            );

        if (old) {
            old.remove();
        }


        /* =================================================
           CONTENEDOR PRINCIPAL
        ================================================== */

        var root =
            document.createElement("div");

        root.id =
            "satori-header";


        /* =================================================
           HTML DEL HEADER
        ================================================== */

        root.innerHTML = `

            <!-- ==========================================
                 BARRA SUPERIOR
            =========================================== -->

            <div class="top-bar">

                <div class="top-bar-inner">

                    <a
                        class="top-instagram"
                        href="https://www.instagram.com/satorimode/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Satorii"
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


            <!-- ==========================================
                 HEADER PRINCIPAL
            =========================================== -->

            <header class="main-header">

                <div class="header-inner">


                    <!-- ==================================
                         BOTÓN MENÚ MÓVIL
                    =================================== -->

                    <button
                        class="mobile-menu-button"
                        id="satori-mobile-open"
                        type="button"
                        aria-label="Abrir menú"
                        aria-expanded="false"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>


                    <!-- ==================================
                         LOGO
                    =================================== -->

                    <a
                        class="satori-logo"
                        href="index.html"
                        aria-label="Satorii"
                    >
                        SATORII
                    </a>


                    <!-- ==================================
                         NAVEGACIÓN DESKTOP
                    =================================== -->

                    <nav
                        class="main-nav"
                        aria-label="Navegación principal"
                    >


                        <!-- INICIO
                             NO TIENE SUBMENÚ -->

                        <button
                            class="nav-home-button"
                            id="satori-home-button"
                            type="button"
                        >
                            INICIO
                        </button>


                        <!-- COLECCIONES -->

                        <div class="nav-dropdown">

                            <button
                                class="nav-dropdown-btn"
                                type="button"
                            >

                                COLECCIONES

                                <span class="arrow">
                                    ⌄
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


                        <!-- PRODUCTOS -->

                        <div class="nav-dropdown">

                            <button
                                class="nav-dropdown-btn"
                                type="button"
                            >

                                PRODUCTOS

                                <span class="arrow">
                                    ⌄
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


                        <!-- AYUDA -->

                        <div class="nav-dropdown">

                            <button
                                class="nav-dropdown-btn"
                                type="button"
                            >

                                AYUDA

                                <span class="arrow">
                                    ⌄
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


                    <!-- ==================================
                         ICONOS
                    =================================== -->

                    <div class="header-icons">


                        <!-- BUSCAR -->

                        <button
                            class="header-icon"
                            id="satori-search"
                            type="button"
                            aria-label="Buscar"
                        >

                            <svg viewBox="0 0 24 24">

                                <circle
                                    cx="10.8"
                                    cy="10.8"
                                    r="6.3"
                                ></circle>

                                <path
                                    d="M16 16l4.5 4.5"
                                ></path>

                            </svg>

                        </button>


                        <!-- CUENTA -->

                        <a
                            class="header-icon"
                            href="cuenta.html"
                            aria-label="Cuenta"
                        >

                            <svg viewBox="0 0 24 24">

                                <circle
                                    cx="12"
                                    cy="8"
                                    r="3.2"
                                ></circle>

                                <path
                                    d="M5.5 20c.8-3.7 3-5.5 6.5-5.5s5.7 1.8 6.5 5.5"
                                ></path>

                            </svg>

                        </a>


                        <!-- CARRITO -->

                        <a
                            class="header-icon"
                            href="carrito.html"
                            aria-label="Carrito"
                        >

                            <svg viewBox="0 0 24 24">

                                <path
                                    d="M4 5h2l1.4 9.2a2 2 0 0 0 2 1.7h7.2a2 2 0 0 0 2-1.7L20 8H7"
                                ></path>

                                <circle
                                    cx="10"
                                    cy="19.5"
                                    r="1"
                                ></circle>

                                <circle
                                    cx="17"
                                    cy="19.5"
                                    r="1"
                                ></circle>

                            </svg>

                        </a>


                    </div>


                </div>

            </header>


            <!-- ==========================================
                 BUSCADOR
            =========================================== -->

            <div
                class="satori-search-box"
                id="satori-search-box"
            >

                <input
                    id="satori-search-input"
                    type="search"
                    placeholder="Buscar productos..."
                    aria-label="Buscar productos"
                >

                <button
                    id="satori-search-close"
                    type="button"
                    aria-label="Cerrar búsqueda"
                >
                    ×
                </button>

            </div>


            <!-- ==========================================
                 OVERLAY MÓVIL
            =========================================== -->

            <div
                class="mobile-menu-overlay"
                id="satori-mobile-overlay"
            ></div>


            <!-- ==========================================
                 MENÚ MÓVIL
            =========================================== -->

            <aside
                class="mobile-menu"
                id="satori-mobile-menu"
                aria-hidden="true"
            >


                <div class="mobile-menu-header">

                    <a
                        class="mobile-menu-logo"
                        href="index.html"
                    >
                        SATORII
                    </a>


                    <button
                        class="mobile-menu-close"
                        id="satori-mobile-close"
                        type="button"
                        aria-label="Cerrar menú"
                    >
                        ×
                    </button>

                </div>


                <nav class="mobile-nav">


                    <!-- INICIO -->

                    <button
                        class="mobile-nav-button mobile-home-button"
                        id="satori-mobile-home"
                        type="button"
                    >

                        <span>
                            INICIO
                        </span>

                    </button>


                    <!-- COLECCIONES -->

                    <button
                        class="mobile-nav-button"
                        type="button"
                        data-target="m-colecciones"
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
                        id="m-colecciones"
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


                    <!-- PRODUCTOS -->

                    <button
                        class="mobile-nav-button"
                        type="button"
                        data-target="m-productos"
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
                        id="m-productos"
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


                    <!-- AYUDA -->

                    <button
                        class="mobile-nav-button"
                        type="button"
                        data-target="m-ayuda"
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
                        id="m-ayuda"
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


                <!-- INSTAGRAM -->

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

        `;


        /* =================================================
           INSERTAR HEADER
        ================================================== */

        document.body.prepend(root);


        /* =================================================
           CSS
        ================================================== */

        var style =
            document.createElement("style");

        style.id =
            "satori-header-runtime-style";


        style.textContent = `

            /* =========================================
               BASE
            ========================================== */

            #satori-header {

                width:100%;

                position:relative;

                z-index:9000;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

            }


            #satori-header * {
                box-sizing:border-box;
            }


            /* =========================================
               BARRA ROJA SUPERIOR
            ========================================== */

            #satori-header .top-bar {

                width:100%;

                height:32px;

                background:#ed1111;

                color:#fff;

            }


            #satori-header .top-bar-inner {

                width:
                    min(
                        1400px,
                        calc(100% - 40px)
                    );

                height:100%;

                margin:auto;

                display:grid;

                grid-template-columns:
                    1fr
                    auto
                    1fr;

                align-items:center;

            }


            #satori-header .top-instagram {

                width:22px;

                height:22px;

                display:flex;

                align-items:center;

                justify-content:center;

                color:#fff;

                text-decoration:none;

            }


            #satori-header .top-instagram svg {

                width:15px;

                height:15px;

                fill:none;

                stroke:currentColor;

                stroke-width:1.7;

                stroke-linecap:round;

                stroke-linejoin:round;

            }


            #satori-header
            .top-instagram
            circle:last-child {

                fill:currentColor;

                stroke:none;

            }


            #satori-header .shipping-message {

                grid-column:2;

                font-size:10px;

                font-weight:600;

                letter-spacing:.5px;

                white-space:nowrap;

                text-align:center;

            }


            #satori-header .top-message {

                grid-column:3;

                justify-self:end;

                font-size:9px;

                font-weight:500;

                white-space:nowrap;

            }


            /* =========================================
               HEADER BLANCO
            ========================================== */

            #satori-header .main-header {

                width:100%;

                height:70px;

                background:#fff;

                border-bottom:
                    1px solid #e3e3e3;

                position:sticky;

                top:0;

                z-index:9001;

                transition:

                    width .25s ease,

                    margin .25s ease,

                    border-radius .25s ease,

                    box-shadow .25s ease,

                    border .25s ease;

            }


            /* =========================================
               HEADER FLOTANTE AL HACER SCROLL
            ========================================== */

            #satori-header
            .main-header.scrolled {

                width:
                    calc(100% - 24px);

                margin:
                    10px auto 0;

                border:
                    1px solid #d8d8d8;

                border-radius:
                    16px;

                box-shadow:
                    0 10px 30px
                    rgba(0,0,0,.12);

            }


            #satori-header .header-inner {

                width:
                    min(
                        1400px,
                        calc(100% - 40px)
                    );

                height:100%;

                margin:auto;

                display:grid;

                grid-template-columns:
                    1fr
                    auto
                    1fr;

                align-items:center;

            }


            #satori-header
            .main-header.scrolled
            .header-inner {

                width:
                    calc(100% - 28px);

            }


            /* =========================================
               LOGO DESKTOP
            ========================================== */

            #satori-header .satori-logo {

                grid-column:1;

                justify-self:start;

                color:#111;

                text-decoration:none;

                font-size:27px;

                font-weight:500;

                font-style:italic;

                letter-spacing:-2px;

                line-height:1;

                transform:
                    skewX(-5deg);

                white-space:nowrap;

            }


            /* =========================================
               NAVEGACIÓN
            ========================================== */

            #satori-header .main-nav {

                grid-column:2;

                height:100%;

                display:flex;

                align-items:center;

                gap:30px;

            }


            #satori-header
            .nav-home-button,
            #satori-header
            .nav-dropdown-btn {

                height:100%;

                padding:0;

                border:0;

                background:transparent;

                color:#111;

                font-family:inherit;

                font-size:12px;

                font-weight:500;

                cursor:pointer;

                display:flex;

                align-items:center;

                gap:5px;

            }


            #satori-header
            .nav-home-button:hover,
            #satori-header
            .nav-dropdown-btn:hover {

                color:#ed1111;

            }


            #satori-header .nav-dropdown {

                position:relative;

                height:100%;

                display:flex;

                align-items:center;

            }


            #satori-header
            .nav-dropdown-btn
            .arrow {

                font-size:10px;

                transition:
                    transform .2s ease;

            }


            #satori-header
            .nav-dropdown.open
            .arrow {

                transform:
                    rotate(180deg);

            }


            /* =========================================
               MENÚS DESKTOP
            ========================================== */

            #satori-header .dropdown-menu {

                position:absolute;

                top:69px;

                left:50%;

                transform:
                    translateX(-50%)
                    translateY(-8px);

                width:215px;

                padding:8px;

                background:#fff;

                border:
                    1px solid #ddd;

                border-radius:8px;

                box-shadow:
                    0 15px 35px
                    rgba(0,0,0,.14);

                opacity:0;

                visibility:hidden;

                pointer-events:none;

                transition:.18s ease;

                z-index:10000;

            }


            #satori-header
            .nav-dropdown.open
            .dropdown-menu {

                opacity:1;

                visibility:visible;

                pointer-events:auto;

                transform:
                    translateX(-50%)
                    translateY(0);

            }


            #satori-header
            .dropdown-menu a {

                display:block;

                padding:11px 12px;

                border-radius:5px;

                color:#111;

                text-decoration:none;

                font-size:12px;

                font-weight:500;

            }


            #satori-header
            .dropdown-menu a:hover {

                background:#f5f5f5;

                color:#ed1111;

            }


            /* =========================================
               ICONOS
            ========================================== */

            #satori-header .header-icons {

                grid-column:3;

                justify-self:end;

                display:flex;

                align-items:center;

                gap:12px;

            }


            #satori-header .header-icon {

                width:27px;

                height:27px;

                padding:0;

                display:flex;

                align-items:center;

                justify-content:center;

                border:0;

                background:transparent;

                color:#111;

                text-decoration:none;

                cursor:pointer;

            }


            #satori-header .header-icon:hover {

                color:#ed1111;

            }


            #satori-header
            .header-icon svg {

                width:18px;

                height:18px;

                fill:none;

                stroke:currentColor;

                stroke-width:1.6;

                stroke-linecap:round;

                stroke-linejoin:round;

            }


            /* =========================================
               BUSCADOR
            ========================================== */

            #satori-header .satori-search-box {

                position:fixed;

                top:112px;

                left:50%;

                transform:
                    translateX(-50%);

                width:
                    min(
                        600px,
                        calc(100% - 30px)
                    );

                padding:10px;

                background:#fff;

                border:
                    1px solid #ddd;

                border-radius:8px;

                box-shadow:
                    0 15px 35px
                    rgba(0,0,0,.14);

                display:none;

                gap:8px;

                z-index:11000;

            }


            #satori-header
            .satori-search-box.open {

                display:flex;

            }


            #satori-header
            .satori-search-box input {

                flex:1;

                min-width:0;

                height:40px;

                padding:
                    0 12px;

                border:
                    1px solid #ddd;

                outline:none;

                font-size:14px;

            }


            #satori-header
            .satori-search-box button {

                width:40px;

                height:40px;

                border:0;

                border-radius:5px;

                background:#111;

                color:#fff;

                font-size:22px;

                cursor:pointer;

            }


            /* =========================================
               HAMBURGUESA
            ========================================== */

            #satori-header
            .mobile-menu-button {

                display:none;

            }


            /* =========================================
               MENÚ MÓVIL
            ========================================== */

            #satori-header
            .mobile-menu-overlay {

                position:fixed;

                inset:0;

                background:
                    rgba(0,0,0,.45);

                opacity:0;

                visibility:hidden;

                pointer-events:none;

                transition:.2s;

                z-index:12000;

            }


            #satori-header
            .mobile-menu-overlay.open {

                opacity:1;

                visibility:visible;

                pointer-events:auto;

            }


            #satori-header .mobile-menu {

                position:fixed;

                top:0;

                left:0;

                width:
                    min(
                        370px,
                        88vw
                    );

                height:100vh;

                padding:
                    20px 24px;

                background:#fff;

                border-right:
                    1px solid #ddd;

                transform:
                    translateX(-100%);

                transition:
                    transform .25s ease;

                z-index:12001;

                overflow-y:auto;

            }


            #satori-header
            .mobile-menu.open {

                transform:
                    translateX(0);

            }


            #satori-header
            .mobile-menu-header {

                min-height:55px;

                display:flex;

                align-items:center;

                justify-content:space-between;

                border-bottom:
                    1px solid #ddd;

                margin-bottom:10px;

            }


            #satori-header
            .mobile-menu-logo {

                color:#111;

                text-decoration:none;

                font-size:26px;

                font-weight:500;

                font-style:italic;

                letter-spacing:-1.5px;

            }


            #satori-header
            .mobile-menu-close {

                width:40px;

                height:40px;

                border:0;

                background:transparent;

                color:#111;

                font-size:30px;

                cursor:pointer;

            }


            /* =========================================
               OPCIONES MÓVILES
            ========================================== */

            #satori-header
            .mobile-nav-button {

                width:100%;

                min-height:60px;

                padding:0;

                border:0;

                border-bottom:
                    1px solid #ddd;

                background:#fff;

                display:flex;

                align-items:center;

                justify-content:space-between;

                color:#111;

                font-family:inherit;

                font-size:16px;

                font-weight:500;

                text-align:left;

                cursor:pointer;

            }


            /* INICIO SIN FLECHA */

            #satori-header
            .mobile-home-button {

                justify-content:flex-start;

            }


            #satori-header
            .mobile-home-button
            .arrow {

                display:none;

            }


            #satori-header
            .mobile-nav-button
            .arrow {

                transition:
                    transform .2s ease;

            }


            #satori-header
            .mobile-nav-button.open
            .arrow {

                transform:
                    rotate(180deg);

            }


            /* =========================================
               SUBMENÚ MÓVIL
            ========================================== */

            #satori-header
            .mobile-submenu {

                max-height:0;

                overflow:hidden;

                opacity:0;

                transition:
                    max-height .25s ease,
                    opacity .2s ease;

            }


            #satori-header
            .mobile-submenu.open {

                max-height:500px;

                opacity:1;

            }


            #satori-header
            .mobile-submenu a {

                min-height:48px;

                padding:
                    0 10px 0 20px;

                border-bottom:
                    1px solid #eee;

                display:flex;

                align-items:center;

                color:#555;

                text-decoration:none;

                font-size:14px;

            }


            #satori-header
            .mobile-submenu a:hover {

                color:#ed1111;

            }


            /* =========================================
               INSTAGRAM MÓVIL
            ========================================== */

            #satori-header
            .mobile-social {

                margin-top:35px;

            }


            #satori-header
            .mobile-social span {

                display:block;

                margin-bottom:15px;

                color:#ed1111;

                font-size:10px;

                font-weight:800;

                letter-spacing:3px;

            }


            #satori-header
            .mobile-social a {

                color:#111;

                text-decoration:none;

                font-size:14px;

                font-weight:600;

            }


            /* =========================================
               MÓVIL
            ========================================== */

            @media (max-width:900px) {


                /* Barra superior */

                #satori-header
                .top-bar {

                    height:32px;

                }


                #satori-header
                .top-bar-inner {

                    width:
                        calc(100% - 14px);

                }


                #satori-header
                .top-message {

                    display:none;

                }


                #satori-header
                .shipping-message {

                    font-size:9px;

                }


                /* Header */

                #satori-header
                .main-header {

                    height:64px;

                }


                /* Header flotante */

                #satori-header
                .main-header.scrolled {

                    width:
                        calc(100% - 16px);

                    margin:
                        8px auto 0;

                    border:
                        1px solid #d8d8d8;

                    border-radius:
                        15px;

                    box-shadow:
                        0 8px 24px
                        rgba(0,0,0,.13);

                }


                #satori-header
                .header-inner {

                    position:relative;

                    width:100%;

                    height:64px;

                    margin:0;

                    padding:
                        0 14px;

                    display:block;

                }


                /* =====================================
                   HAMBURGUESA — UNA SOLA
                ====================================== */

                #satori-header
                .mobile-menu-button {

                    position:absolute;

                    left:14px;

                    top:50%;

                    transform:
                        translateY(-50%);

                    width:30px;

                    height:30px;

                    padding:0;

                    margin:0;

                    border:0;

                    background:transparent;

                    display:flex;

                    flex-direction:column;

                    justify-content:center;

                    align-items:flex-start;

                    gap:4px;

                    cursor:pointer;

                    z-index:100;

                }


                #satori-header
                .mobile-menu-button::before,

                #satori-header
                .mobile-menu-button::after {

                    display:none !important;

                    content:none !important;

                }


                #satori-header
                .mobile-menu-button span {

                    display:block;

                    width:22px;

                    height:2px;

                    margin:0;

                    background:#111;

                }


                /* =====================================
                   LOGO PERFECTAMENTE CENTRADO
                ====================================== */

                #satori-header
                .satori-logo {

                    position:absolute;

                    left:50%;

                    top:50%;

                    transform:
                        translate(
                            -50%,
                            -50%
                        )
                        skewX(-5deg);

                    margin:0;

                    padding:0;

                    font-size:25px;

                    font-weight:500;

                    white-space:nowrap;

                    z-index:90;

                }


                /* =====================================
                   ICONOS DERECHA
                ====================================== */

                #satori-header
                .header-icons {

                    position:absolute;

                    right:10px;

                    top:50%;

                    transform:
                        translateY(-50%);

                    display:flex;

                    align-items:center;

                    gap:3px;

                    z-index:100;

                }


                #satori-header
                .header-icon {

                    width:30px;

                    height:30px;

                }


                /* =====================================
                   BUSCADOR
                ====================================== */

                #satori-header
                .satori-search-box {

                    top:104px;

                    width:
                        calc(100% - 24px);

                }


                /* =====================================
                   MENÚ MÓVIL
                ====================================== */

                #satori-header
                .mobile-menu {

                    width:
                        min(
                            370px,
                            88vw
                        );

                    height:100dvh;

                }

            }

        `;


        document.head.appendChild(style);


        /* =================================================
           HEADER FLOTANTE AL HACER SCROLL
        ================================================== */

        var mainHeader =
            root.querySelector(
                ".main-header"
            );


        function updateHeader() {

            if (!mainHeader) {
                return;
            }


            if (window.scrollY > 35) {

                mainHeader.classList.add(
                    "scrolled"
                );

            } else {

                mainHeader.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive:true
            }
        );


        updateHeader();


        /* =================================================
           INICIO
           NO ABRE MENÚ
        ================================================== */

        var homeButton =
            document.getElementById(
                "satori-home-button"
            );


        if (homeButton) {

            homeButton.addEventListener(
                "click",
                function () {

                    window.scrollTo({

                        top:0,

                        behavior:"smooth"

                    });

                }
            );

        }


        var mobileHome =
            document.getElementById(
                "satori-mobile-home"
            );


        if (mobileHome) {

            mobileHome.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                    window.scrollTo({

                        top:0,

                        behavior:"smooth"

                    });

                }
            );

        }


        /* =================================================
           DROPDOWNS DESKTOP
        ================================================== */

        var dropdowns =
            root.querySelectorAll(
                ".nav-dropdown"
            );


        dropdowns.forEach(
            function (dropdown) {


                var button =
                    dropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        dropdowns.forEach(
                            function (other) {

                                if (
                                    other !==
                                    dropdown
                                ) {

                                    other.classList.remove(
                                        "open"
                                    );

                                }

                            }
                        );


                        dropdown.classList.toggle(
                            "open"
                        );

                    }
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !event.target.closest(
                        "#satori-header .nav-dropdown"
                    )
                ) {

                    dropdowns.forEach(
                        function (dropdown) {

                            dropdown.classList.remove(
                                "open"
                            );

                        }
                    );

                }

            }
        );


        /* =================================================
           MENÚ MÓVIL
        ================================================== */

        var openButton =
            document.getElementById(
                "satori-mobile-open"
            );


        var closeButton =
            document.getElementById(
                "satori-mobile-close"
            );


        var mobileMenu =
            document.getElementById(
                "satori-mobile-menu"
            );


        var overlay =
            document.getElementById(
                "satori-mobile-overlay"
            );


        function openMobileMenu() {

            mobileMenu.classList.add(
                "open"
            );

            overlay.classList.add(
                "open"
            );


            openButton.setAttribute(
                "aria-expanded",
                "true"
            );


            mobileMenu.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }


        function closeMobileMenu() {

            mobileMenu.classList.remove(
                "open"
            );

            overlay.classList.remove(
                "open"
            );


            openButton.setAttribute(
                "aria-expanded",
                "false"
            );


            mobileMenu.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }


        openButton.addEventListener(
            "click",
            openMobileMenu
        );


        closeButton.addEventListener(
            "click",
            closeMobileMenu
        );


        overlay.addEventListener(
            "click",
            closeMobileMenu
        );


        /* =================================================
           SUBMENÚS MÓVILES
        ================================================== */

        root.querySelectorAll(
            ".mobile-nav-button"
        ).forEach(
            function (button) {


                button.addEventListener(
                    "click",
                    function () {


                        var targetId =
                            button.dataset.target;


                        /*
                         * INICIO no tiene target,
                         * por lo tanto no abre nada.
                         */

                        if (!targetId) {
                            return;
                        }


                        var target =
                            document.getElementById(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        var wasOpen =
                            target.classList.contains(
                                "open"
                            );


                        root.querySelectorAll(
                            ".mobile-submenu"
                        ).forEach(
                            function (menu) {

                                menu.classList.remove(
                                    "open"
                                );

                            }
                        );


                        root.querySelectorAll(
                            ".mobile-nav-button"
                        ).forEach(
                            function (btn) {

                                btn.classList.remove(
                                    "open"
                                );

                            }
                        );


                        if (!wasOpen) {

                            target.classList.add(
                                "open"
                            );

                            button.classList.add(
                                "open"
                            );

                        }

                    }
                );

            }
        );


        /* =================================================
           BUSCADOR
        ================================================== */

        var searchButton =
            document.getElementById(
                "satori-search"
            );


        var searchBox =
            document.getElementById(
                "satori-search-box"
            );


        var searchClose =
            document.getElementById(
                "satori-search-close"
            );


        searchButton.addEventListener(
            "click",
            function () {

                searchBox.classList.toggle(
                    "open"
                );


                if (
                    searchBox.classList.contains(
                        "open"
                    )
                ) {

                    document
                        .getElementById(
                            "satori-search-input"
                        )
                        .focus();

                }

            }
        );


        searchClose.addEventListener(
            "click",
            function () {

                searchBox.classList.remove(
                    "open"
                );

            }
        );


        /* =================================================
           ESC
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {


                if (
                    event.key !==
                    "Escape"
                ) {

                    return;

                }


                closeMobileMenu();


                searchBox.classList.remove(
                    "open"
                );


                dropdowns.forEach(
                    function (dropdown) {

                        dropdown.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );


    });

})();
