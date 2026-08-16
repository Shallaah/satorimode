(function () {

    "use strict";


    function initSatoriiHeader() {


        /* =====================================================
           EVITAR DUPLICADOS
        ====================================================== */

        const oldHeader =
            document.getElementById("satori-header");

        const oldStyle =
            document.getElementById("satori-header-style");

        const oldSpacer =
            document.getElementById("satori-header-spacer");


        if (oldHeader) {
            oldHeader.remove();
        }

        if (oldStyle) {
            oldStyle.remove();
        }

        if (oldSpacer) {
            oldSpacer.remove();
        }


        /* =====================================================
           ROOT
        ====================================================== */

        const root =
            document.createElement("div");

        root.id =
            "satori-header";


        /* =====================================================
           HTML
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
                     NAVEGACIÓN PC
                ================================================== -->

                <nav
                    class="main-nav"
                    aria-label="Navegación principal"
                >

                    <a
                        href="index.html"
                        class="nav-home-button"
                    >
                        INICIO
                    </a>


                    <!-- COLECCIONES -->

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


                    <!-- PRODUCTOS -->

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


                    <!-- AYUDA -->

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

                    <!-- BUSCAR -->

                    <button
                        class="header-icon"
                        id="satori-search"
                        type="button"
                        aria-label="Buscar"
                        aria-controls="satori-search-overlay"
                        aria-expanded="false"
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
             OVERLAY MÓVIL
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

                <a
                    href="index.html"
                    class="mobile-nav-button mobile-home-button"
                >
                    <span>
                        INICIO
                    </span>
                </a>


                <!-- COLECCIONES -->

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


                <!-- PRODUCTOS -->

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


                <!-- AYUDA -->

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


            <!-- REDES -->

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
            aria-hidden="true"
        >

            <div
                class="search-box"
                role="dialog"
                aria-modal="true"
            >

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
                        aria-label="Buscar productos"
                    >


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


        /* =====================================================
           INSERTAR
        ====================================================== */

        document.body.prepend(root);


        /* =====================================================
           CSS DEL HEADER
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

            width:100%;

            position:relative;

            z-index:9999;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

        }


        /* =====================================================
           BARRA SUPERIOR
        ====================================================== */

        #satori-header .top-bar {

            width:100%;

            height:32px;

            background:#f31218;

            color:#fff;

            position:relative;

            z-index:10001;

        }


        #satori-header .top-bar-inner {

            width:
                min(
                    1500px,
                    calc(100% - 40px)
                );

            height:100%;

            margin:0 auto;

            display:flex;

            align-items:center;

            justify-content:center;

            position:relative;

        }


        #satori-header .top-instagram {

            position:absolute;

            left:0;

            top:50%;

            transform:
                translateY(-50%);

            width:20px;

            height:20px;

            display:flex;

            align-items:center;

            justify-content:center;

            color:#fff;

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

            font-weight:700;

            line-height:1;

            white-space:nowrap;

            letter-spacing:.2px;

        }


        #satori-header .top-message {

            position:absolute;

            right:0;

            top:50%;

            transform:
                translateY(-50%);

            font-size:9px;

            line-height:1;

            white-space:nowrap;

            letter-spacing:.4px;

        }


        /* =====================================================
           HEADER PRINCIPAL
        ====================================================== */

        #satori-header .main-header {

            position:relative;

            width:100%;

            height:68px;

            background:#fff;

            border-bottom:1px solid #dedede;

            z-index:10000;

        }


        #satori-header .header-inner {

            width:
                min(
                    1400px,
                    calc(100% - 40px)
                );

            height:68px;

            margin:0 auto;

            display:grid;

            grid-template-columns:
                1fr
                auto
                1fr;

            align-items:center;

            position:relative;

        }


        /* =====================================================
           LOGO
        ====================================================== */

        #satori-header .satori-brand-logo {

            font-family:
                "Arial Narrow",
                Arial,
                Helvetica,
                sans-serif;

            font-weight:900;

            font-style:italic;

            letter-spacing:-2.5px;

            text-transform:uppercase;

            color:#111;

            text-decoration:none;

            line-height:.9;

            white-space:nowrap;

            -webkit-font-smoothing:antialiased;

            transition:
                color .2s ease,
                transform .2s ease;

        }


        #satori-header .satori-logo {

            grid-column:1;

            justify-self:start;

            font-size:25px;

            transform:
                skewX(-5deg);

        }


        #satori-header .satori-logo:hover {

            color:#f31218;

            transform:
                skewX(-5deg)
                scale(1.06);

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

            white-space:nowrap;

        }


        #satori-header .nav-home-button:hover,
        #satori-header .nav-dropdown-btn:hover {

            color:#f31218;

        }


        #satori-header .nav-dropdown {

            position:relative;

            height:100%;

            display:flex;

            align-items:center;

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


        /* =====================================================
           DROPDOWN
        ====================================================== */

        #satori-header .dropdown-menu {

            position:absolute;

            top:68px;

            left:50%;

            transform:
                translate(-50%,-8px);

            width:220px;

            padding:8px;

            background:#fff;

            border:1px solid #ddd;

            border-radius:10px;

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

            gap:3px;

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
           HEADER FLOTANTE
        ====================================================== */

        #satori-header.scrolled .main-header {

            position:fixed;

            top:8px;

            left:8px;

            width:
                calc(100% - 16px);

            height:64px;

            background:#fff;

            border:1px solid #d4d4d4;

            border-radius:16px;

            box-shadow:
                0 8px 25px
                rgba(0,0,0,.16);

            z-index:900000;

        }


        #satori-header.scrolled
        .header-inner {

            height:62px;

        }


        /* =====================================================
           MENÚ MÓVIL
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
                opacity .25s ease,
                visibility .25s ease;

            z-index:1000000;

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
                min(370px,88vw);

            height:100dvh;

            padding:
                20px 24px;

            background:#fff;

            transform:
                translateX(-100%);

            transition:
                transform .25s ease;

            overflow-y:auto;

            z-index:1000001;

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

            font-size:27px;

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

        }


        #satori-header .mobile-menu-close:hover {

            color:#f31218;

        }


        #satori-header .mobile-nav {

            margin:0;

            padding:0;

        }


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

            text-decoration:none;

            cursor:pointer;

        }


        #satori-header .mobile-home-button {

            justify-content:flex-start;

        }


        #satori-header .mobile-nav-button:hover {

            color:#f31218;

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
                opacity .2s ease,
                visibility .2s ease;

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

            width:
                min(
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

            color:#111;

            background:#fff;

            font-size:15px;

        }


        #satori-header .search-form button {

            width:60px;

            border:0;

            background:#f31218;

            color:#fff;

            font-size:24px;

        }


        /* =====================================================
           TABLET / MÓVIL
        ====================================================== */

        @media (max-width:1000px) {

            #satori-header .top-bar {

                height:32px;

            }


            #satori-header .top-bar-inner {

                width:
                    calc(100% - 28px);

            }


            #satori-header .top-instagram {

                left:0;

            }


            #satori-header .top-message {

                display:none;

            }


            #satori-header .shipping-message {

                font-size:10px;

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


            /* HAMBURGUESA */

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

                z-index:900001;

            }


            #satori-header
            .mobile-menu-button span {

                display:block;

                width:23px;

                height:1.5px;

                background:#111;

            }


            #satori-header
            .mobile-menu-button span:nth-child(2) {

                width:17px;

            }


            #satori-header
            .mobile-menu-button:hover span {

                background:#f31218;

            }


            /* LOGO */

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

                z-index:900001;

            }


            #satori-header .satori-logo:hover {

                transform:
                    translate(-50%,-50%)
                    skewX(-5deg)
                    scale(1.06);

            }


            /* NAV PC */

            #satori-header .main-nav {

                display:none;

            }


            /* ICONOS */

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


            /* MENÚ FLOTANTE */

            #satori-header.scrolled .main-header {

                top:8px;

                left:8px;

                width:
                    calc(100% - 16px);

                height:64px;

                border-radius:16px;

            }


            #satori-header.scrolled
            .header-inner {

                height:62px;

            }


            /* BUSCADOR */

            #satori-header .search-overlay {

                padding-top:82px;

            }


            #satori-header .search-box {

                width:
                    calc(100% - 24px);

                padding:
                    24px 18px;

                border-radius:14px;

            }


            /* MENÚ */

            #satori-header .mobile-menu {

                width:
                    min(370px,88vw);

            }

        }


        @media (max-width:430px) {

            #satori-header .shipping-message {

                font-size:9px;

            }


            #satori-header .satori-logo {

                font-size:26px;

            }

        }


        /* =====================================================
           ACCESIBILIDAD
        ====================================================== */

        @media (prefers-reduced-motion:reduce) {

            #satori-header *,
            #satori-header *::before,
            #satori-header *::after {

                transition:none !important;

            }

        }

        `;


        document.head.appendChild(style);


        /* =====================================================
           ESPACIADOR DEL HEADER FLOTANTE
        ====================================================== */

        const spacer =
            document.createElement("div");

        spacer.id =
            "satori-header-spacer";

        spacer.style.display =
            "none";

        spacer.style.height =
            "0px";

        root.insertAdjacentElement(
            "afterend",
            spacer
        );


        /* =====================================================
           SCROLL
        ====================================================== */

        function updateScrollHeader() {

            const scrolled =
                window.scrollY > 50;


            root.classList.toggle(
                "scrolled",
                scrolled
            );


            if (scrolled) {

                spacer.style.display =
                    "block";

                spacer.style.height =
                    window.innerWidth > 1000
                        ? "64px"
                        : "64px";

            } else {

                spacer.style.display =
                    "none";

                spacer.style.height =
                    "0px";

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
           SCROLL BODY
        ====================================================== */

        function lockBody() {

            document.body.classList.add(
                "menu-open"
            );

        }


        function unlockBody() {

            const menuOpen =
                mobileMenu &&
                mobileMenu.classList.contains(
                    "open"
                );

            const searchOpen =
                searchOverlay &&
                searchOverlay.classList.contains(
                    "open"
                );


            if (!menuOpen && !searchOpen) {

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }


        /* =====================================================
           DROPDOWNS
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
           CERRAR MENÚ
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


            unlockBody();

        }


        /* =====================================================
           ABRIR MENÚ
        ====================================================== */

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


            lockBody();

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
                closeMobileMenu
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


            unlockBody();

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


            lockBody();


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
           BÚSQUEDA
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


                    window.location.href =
                        "productos.html?search=" +
                        encodeURIComponent(query);

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
           CLICK FUERA
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


                        const target =
                            document.getElementById(
                                button.dataset.target
                            );


                        if (!target) {
                            return;
                        }


                        const wasOpen =
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
           CERRAR AL NAVEGAR
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
           RESIZE
        ====================================================== */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 1000
                ) {

                    closeMobileMenu();

                }


                updateScrollHeader();

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
