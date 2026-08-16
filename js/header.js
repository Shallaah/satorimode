(function () {
    "use strict";

    function initSatoriiHeader() {

        /* =====================================================
           ELIMINAR HEADER ANTERIOR
        ====================================================== */

        const oldHeader =
            document.getElementById("satori-header");

        const oldStyle =
            document.getElementById("satori-header-style");

        const oldSpacer =
            document.getElementById("satori-header-spacer");


        if (oldHeader) oldHeader.remove();

        if (oldStyle) oldStyle.remove();

        if (oldSpacer) oldSpacer.remove();


        /* =====================================================
           ROOT
        ====================================================== */

        const root =
            document.createElement("div");

        root.id =
            "satori-header";


        root.innerHTML = `

        <!-- =================================================
             TOP BAR
        ================================================== -->

        <div class="top-bar">

            <div class="top-bar-inner">

                <a
                    class="top-instagram"
                    href="https://www.instagram.com/satorimode/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >

                    <svg viewBox="0 0 24 24">

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
             MAIN HEADER
        ================================================== -->

        <header class="main-header">

            <div class="header-inner">


                <!-- HAMBURGUESA -->

                <button
                    id="satori-mobile-open"
                    class="mobile-menu-button"
                    type="button"
                    aria-label="Abrir menú"
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </button>


                <!-- LOGO -->

                <a
                    href="index.html"
                    class="satori-logo satori-brand-logo"
                >
                    SATORII
                </a>


                <!-- =================================================
                     NAVEGACIÓN PC
                ================================================== -->

                <nav class="main-nav">


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

                            <span class="nav-arrow">
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

                            <span class="nav-arrow">
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

                            <span class="nav-arrow">
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

                        <svg viewBox="0 0 24 24">

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

                        <svg viewBox="0 0 24 24">

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
        ></div>


        <!-- =================================================
             MENÚ MÓVIL
        ================================================== -->

        <aside
            class="mobile-menu"
            id="satori-mobile-menu"
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


            <nav class="mobile-nav">


                <!-- INICIO -->

                <a
                    href="index.html"
                    class="mobile-nav-button mobile-home-button"
                    id="mobile-home"
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
                >

                    <span>
                        COLECCIONES
                    </span>

                    <span class="mobile-arrow">
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
                >

                    <span>
                        PRODUCTOS
                    </span>

                    <span class="mobile-arrow">
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
                >

                    <span>
                        AYUDA
                    </span>

                    <span class="mobile-arrow">
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
                 SOCIAL
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

                    <svg viewBox="0 0 24 24">

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
        >

            <div class="search-box">

                <button
                    class="search-close"
                    id="satori-search-close"
                    type="button"
                    aria-label="Cerrar búsqueda"
                >
                    ×
                </button>


                <div class="search-title">
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
                    />


                    <button
                        type="submit"
                        aria-label="Buscar"
                    >
                        →
                    </button>

                </form>

            </div>

        </div>

        `;


        document.body.prepend(root);


        /* =====================================================
           CSS
        ====================================================== */

        const style =
            document.createElement("style");


        style.id =
            "satori-header-style";


        style.textContent = `

        /* =====================================================
           BASE
        ====================================================== */

        #satori-header,
        #satori-header * {

            box-sizing:border-box;

        }


        #satori-header {

            position:relative;

            width:100%;

            z-index:9999;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

        }


        /* =====================================================
           LOGO SATORII
        ====================================================== */

        #satori-header .satori-brand-logo {

            font-family:
                "Arial Narrow",
                Arial,
                Helvetica,
                sans-serif !important;

            font-weight:900 !important;

            font-style:italic !important;

            letter-spacing:-2.5px !important;

            text-transform:uppercase;

            color:#111;

            text-decoration:none;

            line-height:.9;

            white-space:nowrap;

            -webkit-font-smoothing:antialiased;

            text-rendering:geometricPrecision;

            transition:
                color .2s ease,
                transform .2s ease;

        }


        /* =====================================================
           TOP BAR
        ====================================================== */

        #satori-header .top-bar {

            width:100%;

            height:32px;

            background:#f31218;

            color:#fff;

        }


        #satori-header .top-bar-inner {

            position:relative;

            width:100%;

            max-width:1400px;

            height:100%;

            margin:auto;

            display:flex;

            align-items:center;

            justify-content:center;

        }


        #satori-header .top-instagram {

            position:absolute;

            left:20px;

            top:50%;

            transform:
                translateY(-50%);

            width:18px;

            height:18px;

            color:#fff;

            display:flex;

            align-items:center;

            justify-content:center;

            text-decoration:none;

        }


        #satori-header .top-instagram svg {

            width:17px;

            height:17px;

            fill:none;

            stroke:currentColor;

            stroke-width:1.8;

            stroke-linecap:round;

            stroke-linejoin:round;

        }


        #satori-header .top-instagram .instagram-dot {

            fill:currentColor;

            stroke:none;

        }


        #satori-header .shipping-message {

            position:absolute;

            left:50%;

            top:50%;

            transform:
                translate(-50%,-50%);

            font-size:10px;

            line-height:1;

            font-weight:700;

            white-space:nowrap;

            letter-spacing:.2px;

        }


        #satori-header .top-message {

            position:absolute;

            right:20px;

            top:50%;

            transform:
                translateY(-50%);

            font-size:9px;

            line-height:1;

            white-space:nowrap;

            letter-spacing:.3px;

        }


        /* =====================================================
           MAIN HEADER
        ====================================================== */

        #satori-header .main-header {

            position:relative;

            width:100%;

            height:70px;

            background:#fff;

            border-bottom:1px solid #dedede;

            z-index:10000;

        }


        #satori-header .header-inner {

            position:relative;

            width:calc(100% - 40px);

            max-width:1400px;

            height:100%;

            margin:auto;

            display:grid;

            grid-template-columns:
                1fr
                auto
                1fr;

            align-items:center;

        }


        /* =====================================================
           LOGO PC
        ====================================================== */

        #satori-header .satori-logo {

            grid-column:1;

            justify-self:start;

            font-size:25px;

            transform:skewX(-5deg);

        }


        #satori-header .satori-logo:hover {

            color:#f31218;

            transform:
                skewX(-5deg)
                scale(1.08);

        }


        /* =====================================================
           NAVEGACIÓN
        ====================================================== */

        #satori-header .main-nav {

            grid-column:2;

            height:100%;

            display:flex;

            align-items:center;

            gap:28px;

        }


        #satori-header .nav-home-button,
        #satori-header .nav-dropdown-btn {

            height:100%;

            padding:0;

            border:0;

            background:none;

            color:#111;

            font-size:12px;

            font-weight:500;

            cursor:pointer;

            display:flex;

            align-items:center;

            gap:5px;

            text-decoration:none;

        }


        #satori-header .nav-home-button:hover,
        #satori-header .nav-dropdown-btn:hover {

            color:#f31218;

        }


        #satori-header .nav-arrow {

            font-size:9px;

            transition:
                transform .2s ease;

        }


        #satori-header
        .nav-dropdown.open
        .nav-arrow {

            transform:
                rotate(180deg);

        }


        #satori-header .nav-dropdown {

            position:relative;

            height:100%;

            display:flex;

            align-items:center;

        }


        /* =====================================================
           DROPDOWN PC
        ====================================================== */

        #satori-header .dropdown-menu {

            position:absolute;

            top:70px;

            left:50%;

            transform:
                translate(-50%,-8px);

            width:220px;

            padding:8px;

            background:#fff;

            border:1px solid #ddd;

            border-radius:12px;

            box-shadow:
                0 15px 35px
                rgba(0,0,0,.12);

            opacity:0;

            visibility:hidden;

            pointer-events:none;

            transition:
                opacity .2s ease,
                transform .2s ease;

            z-index:100001;

        }


        #satori-header
        .nav-dropdown.open
        .dropdown-menu {

            opacity:1;

            visibility:visible;

            pointer-events:auto;

            transform:
                translate(-50%,0);

        }


        #satori-header .dropdown-menu a {

            display:block;

            padding:11px;

            color:#111;

            text-decoration:none;

            font-size:12px;

            border-radius:7px;

        }


        #satori-header .dropdown-menu a:hover {

            background:#f5f5f5;

            color:#f31218;

        }


        /* =====================================================
           ICONOS
        ====================================================== */

        #satori-header .header-icons {

            grid-column:3;

            justify-self:end;

            display:flex;

            align-items:center;

            gap:4px;

        }


        #satori-header .header-icon {

            width:34px;

            height:34px;

            padding:0;

            border:0;

            background:transparent;

            color:#111;

            text-decoration:none;

            display:flex;

            align-items:center;

            justify-content:center;

            cursor:pointer;

        }


        #satori-header .header-icon:hover {

            color:#f31218;

        }


        #satori-header .header-icon svg {

            width:17px;

            height:17px;

            fill:none;

            stroke:currentColor;

            stroke-width:1.55;

            stroke-linecap:round;

            stroke-linejoin:round;

        }


        /* =====================================================
           HAMBURGUESA
        ====================================================== */

        #satori-header .mobile-menu-button {

            display:none;

        }


        /* =====================================================
           OVERLAY MENÚ
        ====================================================== */

        #satori-header .mobile-menu-overlay {

            position:fixed;

            inset:0;

            background:
                rgba(0,0,0,.45);

            opacity:0;

            visibility:hidden;

            pointer-events:none;

            transition:
                opacity .2s ease;

            /*
             * IMPORTANTE:
             * Debe estar por encima del header
             * pero debajo del menú.
             */

            z-index:1000000;

        }


        #satori-header
        .mobile-menu-overlay.open {

            opacity:1;

            visibility:visible;

            pointer-events:auto;

        }


        /* =====================================================
           MENÚ MÓVIL
        ====================================================== */

        #satori-header .mobile-menu {

            position:fixed;

            top:0;

            left:0;

            width:min(370px,88vw);

            height:100dvh;

            padding:20px 24px;

            background:#fff;

            transform:
                translateX(-100%);

            transition:
                transform .25s ease;

            /*
             * ESTE ES EL CAMBIO IMPORTANTE.
             * El menú está por encima del header
             * flotante y del overlay.
             */

            z-index:1000001;

            overflow-y:auto;

        }


        #satori-header
        .mobile-menu.open {

            transform:
                translateX(0);

        }


        #satori-header .mobile-menu-header {

            height:60px;

            display:flex;

            align-items:center;

            justify-content:space-between;

            border-bottom:1px solid #ddd;

        }


        #satori-header .mobile-menu-logo {

            font-size:25px;

        }


        #satori-header .mobile-menu-logo:hover {

            color:#f31218;

        }


        #satori-header .mobile-menu-close {

            width:40px;

            height:40px;

            padding:0;

            border:0;

            background:none;

            color:#111;

            font-size:29px;

            line-height:1;

            cursor:pointer;

        }


        #satori-header .mobile-menu-close:hover {

            color:#f31218;

        }


        /* =====================================================
           NAV MÓVIL
        ====================================================== */

        #satori-header .mobile-nav-button {

            width:100%;

            min-height:60px;

            padding:0;

            border:0;

            border-bottom:1px solid #ddd;

            background:#fff;

            color:#111;

            display:flex;

            align-items:center;

            justify-content:space-between;

            font-size:15px;

            cursor:pointer;

            text-decoration:none;

        }


        #satori-header .mobile-nav-button:hover {

            color:#f31218;

        }


        #satori-header .mobile-home-button {

            justify-content:flex-start;

        }


        #satori-header .mobile-arrow {

            font-size:12px;

            transition:
                transform .2s ease;

        }


        #satori-header
        .mobile-nav-button.active
        .mobile-arrow {

            transform:
                rotate(180deg);

        }


        #satori-header .mobile-submenu {

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


        #satori-header .mobile-submenu a {

            height:48px;

            padding-left:20px;

            display:flex;

            align-items:center;

            border-bottom:1px solid #eee;

            color:#555;

            text-decoration:none;

            font-size:14px;

        }


        #satori-header .mobile-submenu a:hover {

            color:#f31218;

        }


        /* =====================================================
           SOCIAL
        ====================================================== */

        #satori-header .mobile-social {

            margin-top:35px;

            padding-top:5px;

        }


        #satori-header .mobile-social span {

            display:block;

            margin-bottom:15px;

            color:#f31218;

            font-size:10px;

            font-weight:bold;

            letter-spacing:3px;

        }


        #satori-header .mobile-instagram {

            display:flex;

            align-items:center;

            gap:9px;

            color:#111;

            text-decoration:none;

            font-size:14px;

            font-weight:bold;

        }


        #satori-header .mobile-instagram svg {

            width:17px;

            height:17px;

            fill:none;

            stroke:currentColor;

            stroke-width:1.8;

            stroke-linecap:round;

            stroke-linejoin:round;

        }


        #satori-header .mobile-instagram .instagram-dot {

            fill:currentColor;

            stroke:none;

        }


        #satori-header .mobile-instagram:hover {

            color:#f31218;

        }


        /* =====================================================
           BUSCADOR
        ====================================================== */

        #satori-header .search-overlay {

            position:fixed;

            inset:0;

            background:
                rgba(0,0,0,.55);

            opacity:0;

            visibility:hidden;

            pointer-events:none;

            display:flex;

            align-items:flex-start;

            justify-content:center;

            padding-top:90px;

            transition:
                opacity .2s ease;

            /*
             * Más alto que absolutamente todo
             */

            z-index:2000000;

        }


        #satori-header
        .search-overlay.open {

            opacity:1;

            visibility:visible;

            pointer-events:auto;

        }


        #satori-header .search-box {

            position:relative;

            width:min(
                700px,
                calc(100% - 32px)
            );

            padding:30px;

            background:#fff;

            border-radius:16px;

            box-shadow:
                0 20px 60px
                rgba(0,0,0,.25);

            transform:
                translateY(-15px);

            transition:
                transform .2s ease;

        }


        #satori-header
        .search-overlay.open
        .search-box {

            transform:
                translateY(0);

        }


        #satori-header .search-close {

            position:absolute;

            top:12px;

            right:14px;

            width:36px;

            height:36px;

            border:0;

            background:none;

            color:#111;

            font-size:30px;

            line-height:1;

            cursor:pointer;

        }


        #satori-header .search-close:hover {

            color:#f31218;

        }


        #satori-header .search-title {

            margin-bottom:18px;

            color:#111;

            font-size:13px;

            font-weight:700;

            letter-spacing:2px;

        }


        #satori-header .search-form {

            display:flex;

            width:100%;

            height:52px;

            border:1px solid #ccc;

            border-radius:10px;

            overflow:hidden;

        }


        #satori-header .search-form input {

            flex:1;

            min-width:0;

            padding:
                0 16px;

            border:0;

            outline:none;

            background:#fff;

            color:#111;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size:15px;

        }


        #satori-header .search-form input::placeholder {

            color:#999;

        }


        #satori-header .search-form button {

            width:60px;

            border:0;

            background:#f31218;

            color:#fff;

            font-size:24px;

            cursor:pointer;

        }


        #satori-header .search-form button:hover {

            background:#d90e13;

        }


        /* =====================================================
           ESPACIADOR
        ====================================================== */

        #satori-header-spacer {

            display:none;

            height:0;

        }


        /* =====================================================
           HEADER FLOTANTE AL HACER SCROLL
        ====================================================== */

        #satori-header.scrolled .main-header {

            position:fixed !important;

            top:8px !important;

            left:8px !important;

            width:
                calc(100% - 16px) !important;

            height:64px !important;

            background:#fff !important;

            border:
                1px solid #d4d4d4 !important;

            border-radius:16px !important;

            box-shadow:
                0 8px 25px
                rgba(0,0,0,.16) !important;

            /*
             * IMPORTANTE:
             * Menor que el menú móvil.
             */

            z-index:900000 !important;

        }


        /* =====================================================
           PC
        ====================================================== */

        @media (min-width:1001px) {

            #satori-header.scrolled
            + #satori-header-spacer {

                display:block;

                height:90px;

            }

        }


        /* =====================================================
           MÓVIL
        ====================================================== */

        @media (max-width:1000px) {


            #satori-header .top-bar {

                height:32px;

            }


            #satori-header .top-instagram {

                left:14px;

            }


            #satori-header .shipping-message {

                left:50%;

                font-size:10px;

            }


            #satori-header .top-message {

                display:none;

            }


            #satori-header .main-header {

                height:64px;

            }


            #satori-header .header-inner {

                width:100%;

                height:64px;

                margin:0;

                padding:0;

                display:block;

            }


            /* =================================================
               HAMBURGUESA
            ================================================== */

            #satori-header .mobile-menu-button {

                position:absolute;

                left:14px;

                top:50%;

                transform:
                    translateY(-50%);

                width:36px;

                height:36px;

                margin:0;

                padding:6px;

                border:0;

                background:transparent;

                display:flex;

                flex-direction:column;

                justify-content:center;

                align-items:flex-start;

                gap:5px;

                cursor:pointer;

                z-index:900001;

            }


            #satori-header .mobile-menu-button span {

                display:block;

                width:23px;

                height:1.5px;

                background:#111;

                border-radius:0;

                flex:none;

            }


            #satori-header
            .mobile-menu-button:hover
            span {

                background:#f31218;

            }


            /* =================================================
               LOGO CENTRADO
            ================================================== */

            #satori-header .satori-logo {

                position:absolute;

                left:50%;

                top:50%;

                transform:
                    translate(-50%,-50%)
                    skewX(-5deg);

                margin:0;

                padding:0;

                font-size:27px;

                line-height:.9;

                z-index:900001;

            }


            #satori-header .satori-logo:hover {

                transform:
                    translate(-50%,-50%)
                    skewX(-5deg)
                    scale(1.08);

            }


            /* =================================================
               OCULTAR NAV PC
            ================================================== */

            #satori-header .main-nav {

                display:none;

            }


            /* =================================================
               ICONOS
            ================================================== */

            #satori-header .header-icons {

                position:absolute;

                right:7px;

                top:50%;

                transform:
                    translateY(-50%);

                display:flex;

                align-items:center;

                gap:1px;

                z-index:900001;

            }


            #satori-header .header-icon {

                width:32px;

                height:32px;

            }


            #satori-header .header-icon svg {

                width:17px;

                height:17px;

                stroke-width:1.5;

            }


            /* =================================================
               HEADER FLOTANTE MÓVIL
            ================================================== */

            #satori-header.scrolled
            .main-header {

                position:fixed !important;

                top:8px !important;

                left:8px !important;

                width:
                    calc(100% - 16px) !important;

                height:64px !important;

                border:
                    1px solid #d4d4d4 !important;

                border-radius:16px !important;

                box-shadow:
                    0 8px 25px
                    rgba(0,0,0,.16) !important;

                z-index:900000 !important;

            }


            /* =================================================
               MENÚ MÓVIL
            ================================================== */

            #satori-header .mobile-menu {

                width:
                    min(370px,88vw);

                padding:
                    20px 24px;

                /*
                 * Siempre encima del header flotante.
                 */

                z-index:1000001 !important;

            }


            #satori-header .mobile-menu-overlay {

                z-index:1000000 !important;

            }


            #satori-header .mobile-nav-button {

                min-height:60px;

                font-size:15px;

            }


            #satori-header .mobile-menu-logo {

                font-size:27px;

            }


            /* =================================================
               BUSCADOR MÓVIL
            ================================================== */

            #satori-header .search-overlay {

                padding-top:82px;

                z-index:2000000 !important;

            }


            #satori-header .search-box {

                width:
                    calc(100% - 24px);

                padding:
                    24px 18px;

                border-radius:14px;

            }

        }


        /* =====================================================
           ACCESIBILIDAD
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {

            #satori-header *,
            #satori-header *::before,
            #satori-header *::after {

                transition:none !important;

            }

        }

        `;


        document.head.appendChild(style);


        /* =====================================================
           ESPACIADOR
        ====================================================== */

        const spacer =
            document.createElement("div");


        spacer.id =
            "satori-header-spacer";


        root.insertAdjacentElement(
            "afterend",
            spacer
        );


        /* =====================================================
           SCROLL
        ====================================================== */

        function updateScrollHeader() {

            if (window.scrollY > 50) {

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
                passive:true
            }
        );


        window.addEventListener(
            "resize",
            updateScrollHeader
        );


        updateScrollHeader();


        /* =====================================================
           ELEMENTOS MENÚ MÓVIL
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


        /* =====================================================
           ELEMENTOS BUSCADOR
        ====================================================== */

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
           CERRAR MENÚ MÓVIL
        ====================================================== */

        function closeMobileMenu() {

            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "open"
                );

            }


            if (overlay) {

                overlay.classList.remove(
                    "open"
                );

            }


            document.body.style.overflow = "";

        }


        /* =====================================================
           ABRIR MENÚ MÓVIL
        ====================================================== */

        function openMobileMenu() {

            /*
             * Si el buscador está abierto,
             * lo cerramos primero.
             */

            closeSearch();


            if (mobileMenu) {

                mobileMenu.classList.add(
                    "open"
                );

            }


            if (overlay) {

                overlay.classList.add(
                    "open"
                );

            }


            document.body.style.overflow =
                "hidden";

        }


        /* =====================================================
           EVENTOS MENÚ
        ====================================================== */

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

            }


            /*
             * Si no está abierto el menú,
             * devolvemos el scroll.
             */

            if (
                !mobileMenu ||
                !mobileMenu.classList.contains("open")
            ) {

                document.body.style.overflow =
                    "";

            }

        }


        function openSearch() {

            if (!searchOverlay) return;


            /*
             * Cerrar menú móvil si está abierto.
             */

            closeMobileMenu();


            /*
             * Cerrar dropdowns PC.
             */

            root.querySelectorAll(
                ".nav-dropdown"
            ).forEach(
                function (dropdown) {

                    dropdown.classList.remove(
                        "open"
                    );

                }
            );


            searchOverlay.classList.add(
                "open"
            );


            document.body.style.overflow =
                "hidden";


            /*
             * Enfocar input automáticamente.
             */

            setTimeout(
                function () {

                    if (searchInput) {

                        searchInput.focus();

                    }

                },
                200
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


        /*
         * Cerrar al tocar fuera de la caja.
         */

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


        /*
         * Procesar búsqueda.
         */

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


                    /*
                     * Llevar a productos.html
                     * con la búsqueda.
                     */

                    window.location.href =
                        "productos.html?search=" +
                        encodeURIComponent(query);

                }
            );

        }


        /* =====================================================
           DROPDOWNS PC
        ====================================================== */

        root.querySelectorAll(
            ".nav-dropdown"
        ).forEach(
            function (dropdown) {

                const button =
                    dropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                if (!button) return;


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        /*
                         * Cerrar buscador si estuviera abierto.
                         */

                        closeSearch();


                        root.querySelectorAll(
                            ".nav-dropdown"
                        ).forEach(
                            function (other) {

                                if (
                                    other !== dropdown
                                ) {

                                    other.classList.remove(
                                        "open"
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

                                }

                            }
                        );


                        const isOpen =
                            dropdown.classList.toggle(
                                "open"
                            );


                        button.setAttribute(
                            "aria-expanded",
                            String(isOpen)
                        );

                    }
                );

            }
        );


        /* =====================================================
           CERRAR DROPDOWNS AL HACER CLICK FUERA
        ====================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    root.contains(event.target)
                ) {

                    return;

                }


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


                        if (!target) return;


                        const isOpen =
                            target.classList.contains(
                                "open"
                            );


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

                            }
                        );


                        if (!isOpen) {

                            target.classList.add(
                                "open"
                            );

                            button.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           CERRAR SUBMENÚS AL NAVEGAR
        ====================================================== */

        root.querySelectorAll(
            ".mobile-submenu a"
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
                    event.key === "Escape"
                ) {

                    closeSearch();

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       INICIAR
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initSatoriiHeader
        );

    } else {

        initSatoriiHeader();

    }

})();
