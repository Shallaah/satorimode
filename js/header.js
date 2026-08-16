(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const SATORIMODE_BASE = "/satorimode/";

    const CART_STORAGE_KEY = "satorii_cart";


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

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
                    href="${SATORIMODE_BASE}index.html"
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
                        href="${SATORIMODE_BASE}index.html"
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

                            <a href="${SATORIMODE_BASE}anime.html">
                                Anime
                            </a>

                            <a href="${SATORIMODE_BASE}streetwear.html">
                                Streetwear
                            </a>

                            <a href="${SATORIMODE_BASE}accesorios.html">
                                Accesorios
                            </a>

                            <a href="${SATORIMODE_BASE}productos.html">
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

                            <a href="${SATORIMODE_BASE}satorii-pack.html">
                                Satorii Pack
                            </a>

                            <a href="${SATORIMODE_BASE}gift-cards.html">
                                Gift Cards
                            </a>

                            <a href="${SATORIMODE_BASE}mystery-box.html">
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

                            <a href="${SATORIMODE_BASE}preguntas-frecuentes.html">
                                Preguntas frecuentes
                            </a>

                            <a href="${SATORIMODE_BASE}envios.html">
                                Envíos
                            </a>

                            <a href="${SATORIMODE_BASE}cambios.html">
                                Cambios y devoluciones
                            </a>

                            <a href="${SATORIMODE_BASE}guia-tallas.html">
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
                        href="${SATORIMODE_BASE}cuenta.html"
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


                    <!-- =================================================
                         CARRITO
                    ================================================== -->

                    <button
                        class="header-icon cart-header-icon"
                        id="satori-cart-button"
                        type="button"
                        aria-label="Abrir carrito"
                        aria-controls="satori-cart-preview"
                        aria-expanded="false"
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


                        <!-- CONTADOR -->

                        <span
                            class="cart-count"
                            data-satori-cart-count
                            aria-hidden="true"
                        >
                            0
                        </span>

                    </button>

                </div>

            </div>

        </header>


        <!-- =================================================
             OVERLAY GENERAL
        ================================================== -->

        <div
            class="satori-panel-overlay"
            id="satori-panel-overlay"
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
                    href="${SATORIMODE_BASE}index.html"
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
                    href="${SATORIMODE_BASE}index.html"
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

                    <a href="${SATORIMODE_BASE}anime.html">
                        Anime
                    </a>

                    <a href="${SATORIMODE_BASE}streetwear.html">
                        Streetwear
                    </a>

                    <a href="${SATORIMODE_BASE}accesorios.html">
                        Accesorios
                    </a>

                    <a href="${SATORIMODE_BASE}productos.html">
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

                    <a href="${SATORIMODE_BASE}satorii-pack.html">
                        Satorii Pack
                    </a>

                    <a href="${SATORIMODE_BASE}gift-cards.html">
                        Gift Cards
                    </a>

                    <a href="${SATORIMODE_BASE}mystery-box.html">
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

                    <a href="${SATORIMODE_BASE}preguntas-frecuentes.html">
                        Preguntas frecuentes
                    </a>

                    <a href="${SATORIMODE_BASE}envios.html">
                        Envíos
                    </a>

                    <a href="${SATORIMODE_BASE}cambios.html">
                        Cambios y devoluciones
                    </a>

                    <a href="${SATORIMODE_BASE}guia-tallas.html">
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
             PREVISUALIZACIÓN DEL CARRITO
        ================================================== -->

        <aside
            class="cart-preview"
            id="satori-cart-preview"
            aria-hidden="true"
        >

            <div class="cart-preview-header">

                <div>

                    <div class="cart-preview-label">
                        SATORII · CARRITO
                    </div>

                    <h2>
                        TU CARRITO
                    </h2>

                </div>


                <button
                    class="cart-preview-close"
                    id="satori-cart-close"
                    type="button"
                    aria-label="Cerrar carrito"
                >
                    ×
                </button>

            </div>


            <div
                class="cart-preview-items"
                id="satori-cart-preview-items"
            ></div>


            <div
                class="cart-preview-empty"
                id="satori-cart-preview-empty"
            >

                <div class="cart-empty-icon">
                    🛒
                </div>

                <strong>
                    TU CARRITO ESTÁ VACÍO
                </strong>

                <span>
                    Agrega productos para verlos aquí.
                </span>

            </div>


            <div class="cart-preview-footer">

                <div class="cart-preview-subtotal">

                    <span>
                        SUBTOTAL
                    </span>

                    <strong
                        id="satori-cart-preview-subtotal"
                    >
                        $0
                    </strong>

                </div>


                <a
                    href="${SATORIMODE_BASE}carrito.html"
                    class="cart-preview-button"
                >
                    VER CARRITO
                </a>

                <a
                    href="${SATORIMODE_BASE}productos.html"
                    class="cart-preview-continue"
                >
                    ← Seguir comprando
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
            transform:translateY(-50%);
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
            transform:translate(-50%,-50%);
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
            transform:translateY(-50%);
            font-size:9px;
            line-height:1;
            white-space:nowrap;
            letter-spacing:.4px;
        }


        /* =====================================================
           HEADER
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
            transform:skewX(-5deg);
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
            transform:rotate(180deg);
        }


        /* =====================================================
           DROPDOWNS
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
            position:relative;
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
           CONTADOR
        ====================================================== */

        #satori-header .cart-count {
            position:absolute;
            top:1px;
            right:1px;
            min-width:15px;
            height:15px;
            padding:0 4px;
            border-radius:999px;
            background:#f31218;
            color:#fff;
            font-size:9px;
            font-weight:700;
            line-height:15px;
            text-align:center;
            display:none;
            align-items:center;
            justify-content:center;
            white-space:nowrap;
            pointer-events:none;
            z-index:20;
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
            cursor:pointer;
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
           OVERLAY
        ====================================================== */

        #satori-header .satori-panel-overlay {
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
        .satori-panel-overlay.open {
            opacity:1;
            visibility:visible;
            pointer-events:auto;
        }


        /* =====================================================
           CARRITO PREVIEW
        ====================================================== */

        #satori-header .cart-preview {
            position:fixed;
            top:76px;
            right:20px;

            width:390px;
            max-width:
                calc(100vw - 40px);

            max-height:
                calc(100vh - 100px);

            display:flex;
            flex-direction:column;

            background:#fff;

            border:1px solid #ddd;
            border-radius:14px;

            box-shadow:
                0 20px 60px
                rgba(0,0,0,.20);

            opacity:0;
            visibility:hidden;
            pointer-events:none;

            transform:
                translateY(-10px);

            transition:
                opacity .22s ease,
                transform .22s ease,
                visibility .22s ease;

            z-index:1500000;
        }


        #satori-header
        .cart-preview.open {

            opacity:1;
            visibility:visible;
            pointer-events:auto;

            transform:
                translateY(0);
        }


        #satori-header .cart-preview-header {

            display:flex;
            align-items:flex-start;
            justify-content:space-between;

            gap:20px;

            padding:22px 22px 17px;

            border-bottom:1px solid #eee;
        }


        #satori-header .cart-preview-label {

            margin-bottom:6px;

            color:#f31218;

            font-size:9px;

            font-weight:800;

            letter-spacing:2px;
        }


        #satori-header .cart-preview-header h2 {

            margin:0;

            color:#111;

            font-size:20px;

            font-weight:900;

            letter-spacing:-.5px;
        }


        #satori-header .cart-preview-close {

            width:30px;
            height:30px;

            padding:0;

            border:0;

            background:none;

            color:#111;

            font-size:26px;

            line-height:1;

            cursor:pointer;
        }


        #satori-header .cart-preview-close:hover {

            color:#f31218;
        }


        /* =====================================================
           ITEMS
        ====================================================== */

        #satori-header .cart-preview-items {

            flex:1;

            min-height:0;

            overflow-y:auto;

            padding:4px 22px;
        }


        #satori-header .cart-preview-item {

            display:grid;

            grid-template-columns:
                64px
                minmax(0,1fr)
                auto;

            gap:12px;

            padding:15px 0;

            border-bottom:1px solid #eee;
        }


        #satori-header .cart-preview-image {

            width:64px;
            height:64px;

            overflow:hidden;

            border-radius:6px;

            background:#f5f5f5;
        }


        #satori-header .cart-preview-image img {

            width:100%;
            height:100%;

            display:block;

            object-fit:cover;
        }


        #satori-header .cart-preview-info {

            min-width:0;
        }


        #satori-header .cart-preview-name {

            margin:0;

            color:#111;

            font-size:12px;

            font-weight:800;

            line-height:1.35;
        }


        #satori-header .cart-preview-options {

            margin-top:5px;

            color:#777;

            font-size:10px;

            line-height:1.5;
        }


        #satori-header .cart-preview-quantity {

            display:flex;

            align-items:center;

            width:max-content;

            height:26px;

            margin-top:8px;

            border:1px solid #ddd;

            border-radius:4px;

            overflow:hidden;
        }


        #satori-header .cart-preview-quantity button {

            width:25px;

            height:100%;

            padding:0;

            border:0;

            background:#fff;

            color:#111;

            cursor:pointer;

            font-size:13px;
        }


        #satori-header .cart-preview-quantity button:hover {

            background:#f5f5f5;
        }


        #satori-header .cart-preview-quantity span {

            min-width:27px;

            text-align:center;

            font-size:10px;

            font-weight:700;
        }


        #satori-header .cart-preview-price {

            text-align:right;

            color:#111;

            font-size:11px;

            font-weight:800;

            white-space:nowrap;
        }


        #satori-header .cart-preview-remove {

            display:block;

            margin-top:8px;

            margin-left:auto;

            padding:0;

            border:0;

            background:none;

            color:#999;

            font-size:8px;

            font-weight:700;

            letter-spacing:.5px;

            cursor:pointer;
        }


        #satori-header .cart-preview-remove:hover {

            color:#f31218;
        }


        /* =====================================================
           CARRITO VACÍO
        ====================================================== */

        #satori-header .cart-preview-empty {

            min-height:180px;

            padding:35px 22px;

            display:none;

            flex-direction:column;

            align-items:center;

            justify-content:center;

            text-align:center;

            gap:8px;
        }


        #satori-header .cart-preview-empty.visible {

            display:flex;
        }


        #satori-header .cart-empty-icon {

            margin-bottom:4px;

            font-size:28px;
        }


        #satori-header .cart-preview-empty strong {

            color:#111;

            font-size:12px;
        }


        #satori-header .cart-preview-empty span {

            color:#777;

            font-size:10px;
        }


        /* =====================================================
           FOOTER DEL PREVIEW
        ====================================================== */

        #satori-header .cart-preview-footer {

            padding:18px 22px 20px;

            border-top:1px solid #eee;

            background:#fff;

            border-radius:
                0 0 14px 14px;
        }


        #satori-header .cart-preview-subtotal {

            display:flex;

            align-items:center;

            justify-content:space-between;

            margin-bottom:14px;
        }


        #satori-header .cart-preview-subtotal span {

            color:#555;

            font-size:10px;

            font-weight:700;

            letter-spacing:1px;
        }


        #satori-header .cart-preview-subtotal strong {

            color:#111;

            font-size:16px;

            font-weight:900;
        }


        #satori-header .cart-preview-button {

            width:100%;

            min-height:44px;

            display:flex;

            align-items:center;

            justify-content:center;

            border-radius:5px;

            background:#111;

            color:#fff;

            text-decoration:none;

            font-size:10px;

            font-weight:800;

            letter-spacing:1px;

            transition:
                background .2s ease;
        }


        #satori-header .cart-preview-button:hover {

            background:#f31218;
        }


        #satori-header .cart-preview-continue {

            display:block;

            margin-top:12px;

            text-align:center;

            color:#666;

            text-decoration:none;

            font-size:10px;

            font-weight:700;
        }


        #satori-header .cart-preview-continue:hover {

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

            cursor:pointer;
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

                cursor:pointer;
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


            /* CONTADOR */

            #satori-header .cart-count {

                top:0;

                right:0;

                min-width:15px;

                height:15px;

                font-size:9px;
            }


            /* MENÚ MÓVIL */

            #satori-header .mobile-menu {

                width:
                    min(370px,88vw);
            }


            /* =================================================
               CARRITO MÓVIL
            ================================================== */

            #satori-header .cart-preview {

                top:0;

                right:0;

                width:
                    min(390px,88vw);

                max-width:
                    88vw;

                height:100dvh;

                max-height:none;

                border:0;

                border-radius:0;

                box-shadow:
                    -15px 0 45px
                    rgba(0,0,0,.18);

                transform:
                    translateX(100%);

                transition:
                    transform .25s ease;

                opacity:1;

                visibility:hidden;

                pointer-events:none;

                z-index:1000001;
            }


            #satori-header
            .cart-preview.open {

                transform:
                    translateX(0);

                visibility:visible;

                pointer-events:auto;
            }


            #satori-header .cart-preview-header {

                min-height:80px;

                padding:
                    20px 22px;

                align-items:center;
            }


            #satori-header .cart-preview-header h2 {

                font-size:21px;
            }


            #satori-header .cart-preview-items {

                padding:
                    4px 22px;
            }


            #satori-header .cart-preview-item {

                grid-template-columns:
                    70px
                    minmax(0,1fr)
                    auto;

                gap:12px;
            }


            #satori-header .cart-preview-image {

                width:70px;

                height:70px;
            }


            #satori-header .cart-preview-footer {

                padding:
                    18px 22px
                    calc(
                        20px +
                        env(safe-area-inset-bottom)
                    );
            }


            /* =================================================
               OVERLAY
            ================================================== */

            #satori-header
            .satori-panel-overlay {

                z-index:1000000;
            }


            /* =================================================
               BUSCADOR
            ================================================== */

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

        }


        @media (max-width:430px) {

            #satori-header .shipping-message {

                font-size:9px;
            }


            #satori-header .satori-logo {

                font-size:26px;
            }


            #satori-header .cart-preview {

                width:88vw;
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
           ESPACIADOR
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
                    "64px";

            }

            else {

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


        const panelOverlay =
            document.getElementById(
                "satori-panel-overlay"
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


        const cartButton =
            document.getElementById(
                "satori-cart-button"
            );


        const cartPreview =
            document.getElementById(
                "satori-cart-preview"
            );


        const cartClose =
            document.getElementById(
                "satori-cart-close"
            );


        const cartPreviewItems =
            document.getElementById(
                "satori-cart-preview-items"
            );


        const cartPreviewEmpty =
            document.getElementById(
                "satori-cart-preview-empty"
            );


        const cartPreviewSubtotal =
            document.getElementById(
                "satori-cart-preview-subtotal"
            );


        /* =====================================================
           CONTADOR
        ====================================================== */

        function getCartCount() {

            try {

                if (
                    window.SatoriCart &&
                    typeof
                    window.SatoriCart.getCartCount ===
                    "function"
                ) {

                    return window.SatoriCart.getCartCount();

                }


                const savedCart =
                    localStorage.getItem(
                        CART_STORAGE_KEY
                    );


                if (!savedCart) {

                    return 0;

                }


                const cart =
                    JSON.parse(savedCart);


                if (!Array.isArray(cart)) {

                    return 0;

                }


                return cart.reduce(
                    (
                        total,
                        item
                    ) => {

                        return total +
                            Number(
                                item.quantity || 0
                            );

                    },
                    0
                );

            }

            catch (error) {

                console.error(
                    "SatoriMode · Error leyendo carrito:",
                    error
                );

                return 0;

            }

        }


        function updateHeaderCartCount() {

            const count =
                getCartCount();


            root.querySelectorAll(
                "[data-satori-cart-count]"
            ).forEach(
                function (element) {

                    element.textContent =
                        count;


                    element.style.display =
                        count > 0
                            ? "flex"
                            : "none";

                }
            );

        }


        /* =====================================================
           FORMATO DE PRECIO
        ====================================================== */

        function formatPrice(price) {

            if (
                window.SatoriCart &&
                typeof
                window.SatoriCart.formatPrice ===
                "function"
            ) {

                return window.SatoriCart.formatPrice(
                    price
                );

            }


            return new Intl.NumberFormat(
                "es-CL",
                {
                    style:"currency",
                    currency:"CLP",
                    maximumFractionDigits:0
                }
            ).format(price);

        }


        /* =====================================================
           OBTENER PRODUCTOS DEL CARRITO
        ====================================================== */

        function getPreviewProducts() {

            try {

                if (
                    window.SatoriCart &&
                    typeof
                    window.SatoriCart.getCartProducts ===
                    "function"
                ) {

                    return window.SatoriCart.getCartProducts();

                }


                return [];

            }

            catch (error) {

                console.error(
                    "SatoriMode · Error obteniendo productos del carrito:",
                    error
                );

                return [];

            }

        }


        /* =====================================================
           RENDER PREVIEW
        ====================================================== */

        function renderCartPreview() {

            if (
                !cartPreviewItems ||
                !cartPreviewEmpty
            ) {

                return;

            }


            const products =
                getPreviewProducts();


            cartPreviewItems.innerHTML =
                "";


            if (
                products.length === 0
            ) {

                cartPreviewEmpty.classList.add(
                    "visible"
                );


                cartPreviewItems.style.display =
                    "none";


                if (cartPreviewSubtotal) {

                    cartPreviewSubtotal.textContent =
                        "$0";

                }


                return;

            }


            cartPreviewEmpty.classList.remove(
                "visible"
            );


            cartPreviewItems.style.display =
                "block";


            let subtotal =
                0;


            products.forEach(
                function (product) {

                    const itemTotal =
                        Number(product.price || 0) *
                        Number(product.quantity || 0);


                    subtotal +=
                        itemTotal;


                    const item =
                        document.createElement(
                            "article"
                        );


                    item.className =
                        "cart-preview-item";


                    const options = [];


                    if (
                        product.selectedSize
                    ) {

                        options.push(
                            "Talla: " +
                            product.selectedSize
                        );

                    }


                    if (
                        product.selectedColor
                    ) {

                        options.push(
                            "Color: " +
                            product.selectedColor
                        );

                    }


                    item.innerHTML = `

                        <div class="cart-preview-image">

                            <img
                                src="${product.image || ""}"
                                alt="${product.name || "Producto"}"
                            >

                        </div>


                        <div class="cart-preview-info">

                            <h3 class="cart-preview-name">
                                ${product.name || "Producto"}
                            </h3>


                            ${
                                options.length
                                    ? `
                                        <div class="cart-preview-options">
                                            ${options.join(" · ")}
                                        </div>
                                    `
                                    : ""
                            }


                            <div class="cart-preview-quantity">

                                <button
                                    type="button"
                                    data-cart-action="decrease"
                                >
                                    −
                                </button>


                                <span>
                                    ${product.quantity}
                                </span>


                                <button
                                    type="button"
                                    data-cart-action="increase"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <div class="cart-preview-price">

                            <div>
                                ${formatPrice(itemTotal)}
                            </div>


                            <button
                                type="button"
                                class="cart-preview-remove"
                                data-cart-action="remove"
                            >
                                ELIMINAR
                            </button>

                        </div>

                    `;


                    const decrease =
                        item.querySelector(
                            '[data-cart-action="decrease"]'
                        );


                    const increase =
                        item.querySelector(
                            '[data-cart-action="increase"]'
                        );


                    const remove =
                        item.querySelector(
                            '[data-cart-action="remove"]'
                        );


                    if (decrease) {

                        decrease.addEventListener(
                            "click",
                            function () {

                                if (
                                    window.SatoriCart &&
                                    typeof
                                    window.SatoriCart.updateCartQuantity ===
                                    "function"
                                ) {

                                    window.SatoriCart.updateCartQuantity(

                                        product.id,

                                        Number(
                                            product.quantity
                                        ) - 1,

                                        product.selectedSize,

                                        product.selectedColor

                                    );

                                }

                            }
                        );

                    }


                    if (increase) {

                        increase.addEventListener(
                            "click",
                            function () {

                                if (
                                    window.SatoriCart &&
                                    typeof
                                    window.SatoriCart.updateCartQuantity ===
                                    "function"
                                ) {

                                    window.SatoriCart.updateCartQuantity(

                                        product.id,

                                        Number(
                                            product.quantity
                                        ) + 1,

                                        product.selectedSize,

                                        product.selectedColor

                                    );

                                }

                            }
                        );

                    }


                    if (remove) {

                        remove.addEventListener(
                            "click",
                            function () {

                                if (
                                    window.SatoriCart &&
                                    typeof
                                    window.SatoriCart.removeFromCart ===
                                    "function"
                                ) {

                                    window.SatoriCart.removeFromCart(

                                        product.id,

                                        product.selectedSize,

                                        product.selectedColor

                                    );

                                }

                            }
                        );

                    }


                    cartPreviewItems.appendChild(
                        item
                    );

                }
            );


            if (cartPreviewSubtotal) {

                cartPreviewSubtotal.textContent =
                    formatPrice(subtotal);

            }

        }


        /* =====================================================
           ACTUALIZACIÓN GLOBAL
        ====================================================== */

        document.addEventListener(
            "satorii:cart-updated",
            function () {

                updateHeaderCartCount();

                renderCartPreview();

            }
        );


        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                    CART_STORAGE_KEY
                ) {

                    updateHeaderCartCount();

                    renderCartPreview();

                }

            }
        );


        updateHeaderCartCount();

        renderCartPreview();


        /* =====================================================
           BODY
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


            const cartOpen =
                cartPreview &&
                cartPreview.classList.contains(
                    "open"
                );


            const searchOpen =
                searchOverlay &&
                searchOverlay.classList.contains(
                    "open"
                );


            if (
                !menuOpen &&
                !cartOpen &&
                !searchOpen
            ) {

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
           CERRAR CARRITO
        ====================================================== */

        function closeCartPreview() {

            if (cartPreview) {

                cartPreview.classList.remove(
                    "open"
                );


                cartPreview.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            if (cartButton) {

                cartButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (panelOverlay) {

                panelOverlay.classList.remove(
                    "open"
                );

                panelOverlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            unlockBody();

        }


        /* =====================================================
           ABRIR CARRITO
        ====================================================== */

        function openCartPreview() {

            closeMobileMenu();

            closeSearch();

            closeDropdowns();

            renderCartPreview();


            if (!cartPreview) {

                return;

            }


            cartPreview.classList.add(
                "open"
            );


            cartPreview.setAttribute(
                "aria-hidden",
                "false"
            );


            if (cartButton) {

                cartButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            /*
             * En móvil usamos overlay.
             * En PC el overlay permanece oculto
             * visualmente mediante CSS.
             */

            if (panelOverlay) {

                panelOverlay.classList.add(
                    "open"
                );

                panelOverlay.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }


            lockBody();

        }


        if (cartButton) {

            cartButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const isOpen =
                        cartPreview &&
                        cartPreview.classList.contains(
                            "open"
                        );


                    if (isOpen) {

                        closeCartPreview();

                    }

                    else {

                        openCartPreview();

                    }

                }
            );

        }


        if (cartClose) {

            cartClose.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    closeCartPreview();

                }
            );

        }


        if (panelOverlay) {

            panelOverlay.addEventListener(
                "click",
                function () {

                    closeCartPreview();

                    closeMobileMenu();

                }
            );

        }


        /* =====================================================
           CERRAR MENÚ MÓVIL
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


            if (openButton) {

                openButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (panelOverlay) {

                panelOverlay.classList.remove(
                    "open"
                );


                panelOverlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            unlockBody();

        }


        /* =====================================================
           ABRIR MENÚ MÓVIL
        ====================================================== */

        function openMobileMenu() {

            closeCartPreview();

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


            if (openButton) {

                openButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            if (panelOverlay) {

                panelOverlay.classList.add(
                    "open"
                );


                panelOverlay.setAttribute(
                    "aria-hidden",
                    "false"
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

            closeCartPreview();

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
                        SATORIMODE_BASE +
                        "productos.html?search=" +
                        encodeURIComponent(
                            query
                        );

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

                        closeCartPreview();


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

                closeCartPreview();

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

                updateScrollHeader();


                /*
                 * Si volvemos a PC,
                 * cerramos el panel móvil.
                 */

                if (
                    window.innerWidth > 1000
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initSatoriiHeader
        );

    }

    else {

        initSatoriiHeader();

    }

})();
