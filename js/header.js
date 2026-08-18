(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const SATORIMODE_BASE = "/satorimode/";


    /* =====================================================
       CLAVE PRINCIPAL DEL CARRITO
    ====================================================== */

    const CART_STORAGE_KEY =
        "satorimode_cart";


    /*
     * Clave utilizada en versiones anteriores.
     *
     * Se conserva únicamente para migración.
     */

    const OLD_CART_STORAGE_KEY =
        "satorii_cart";


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    function initSatoriiHeader() {


        /* =================================================
           EVITAR DUPLICADOS
        ================================================== */

        const oldHeader =
            document.getElementById(
                "satori-header"
            );

        const oldStyle =
            document.getElementById(
                "satori-header-style"
            );

        const oldSpacer =
            document.getElementById(
                "satori-header-spacer"
            );


        if (oldHeader) {

            oldHeader.remove();

        }


        if (oldStyle) {

            oldStyle.remove();

        }


        if (oldSpacer) {

            oldSpacer.remove();

        }


        /* =================================================
           ROOT
        ================================================== */

        const root =
            document.createElement(
                "div"
            );


        root.id =
            "satori-header";


        /* =================================================
           HTML
        ================================================== */

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


                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                            aria-expanded="false"
                        >

                            <span>COLECCIONES</span>

                            <span
                                class="nav-arrow"
                                aria-hidden="true"
                            >
                                ↓
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a
                                href="${SATORIMODE_BASE}anime.html"
                            >
                                Anime
                            </a>

                            <a
                                href="${SATORIMODE_BASE}torii.html"
                            >
                                Torii
                            </a>

                            <a
                                href="${SATORIMODE_BASE}accesorios.html"
                            >
                                Accesorios
                            </a>

                            <a
                                href="${SATORIMODE_BASE}productos.html"
                            >
                                Todo
                            </a>

                        </div>

                    </div>


                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                            aria-expanded="false"
                        >

                            <span>PRODUCTOS</span>

                            <span
                                class="nav-arrow"
                                aria-hidden="true"
                            >
                                ↓
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a
                                href="${SATORIMODE_BASE}satorii-pack.html"
                            >
                                Satorii Pack
                            </a>

                            <a
                                href="${SATORIMODE_BASE}regala-satorii.html"
                            >
                                Regala Satorii
                            </a>

                            <a
                                href="${SATORIMODE_BASE}mystery-box.html"
                            >
                                Mystery Box
                            </a>

                        </div>

                    </div>


                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                            aria-expanded="false"
                        >

                            <span>AYUDA</span>

                            <span
                                class="nav-arrow"
                                aria-hidden="true"
                            >
                                ↓
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a
                                href="${SATORIMODE_BASE}preguntas-frecuentes.html"
                            >
                                Preguntas frecuentes
                            </a>

                            <a
                                href="${SATORIMODE_BASE}envios.html"
                            >
                                Envíos
                            </a>

                            <a
                                href="${SATORIMODE_BASE}cambios.html"
                            >
                                Cambios y devoluciones
                            </a>

                            <a
                                href="${SATORIMODE_BASE}guia-tallas.html"
                            >
                                Guía de tallas
                            </a>

                        </div>

                    </div>

                </nav>


                <!-- =================================================
                     ICONOS
                ================================================== -->

                <div class="header-icons">


                    <!-- BUSCADOR INLINE -->

                    <form
                        class="header-search-inline"
                        id="satori-search-inline"
                    >

                        <input
                            type="search"
                            id="satori-search-inline-input"
                            placeholder="¿Qué estás buscando?"
                            autocomplete="off"
                            aria-label="Buscar productos"
                        >

                    </form>


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


                    <!-- CARRITO -->

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
                    INICIO
                </a>


                <button
                    class="mobile-nav-button"
                    data-target="mobile-collections"
                    type="button"
                    aria-expanded="false"
                >

                    <span>COLECCIONES</span>

                    <span class="mobile-arrow">
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-collections"
                >

                    <a
                        href="${SATORIMODE_BASE}anime.html"
                    >
                        Anime
                    </a>

                    <a
                        href="${SATORIMODE_BASE}torii.html"
                    >
                        Torii
                    </a>

                    <a
                        href="${SATORIMODE_BASE}accesorios.html"
                    >
                        Accesorios
                    </a>

                    <a
                        href="${SATORIMODE_BASE}productos.html"
                    >
                        Todo
                    </a>

                </div>


                <button
                    class="mobile-nav-button"
                    data-target="mobile-products"
                    type="button"
                    aria-expanded="false"
                >

                    <span>PRODUCTOS</span>

                    <span class="mobile-arrow">
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >

                    <a
                        href="${SATORIMODE_BASE}satorii-pack.html"
                    >
                        Satorii Pack
                    </a>

                    <a
                        href="${SATORIMODE_BASE}regala-satorii.html"
                    >
                        Regala Satorii
                    </a>

                    <a
                        href="${SATORIMODE_BASE}mystery-box.html"
                    >
                        Mystery Box
                    </a>

                </div>


                <button
                    class="mobile-nav-button"
                    data-target="mobile-help"
                    type="button"
                    aria-expanded="false"
                >

                    <span>AYUDA</span>

                    <span class="mobile-arrow">
                        ↓
                    </span>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-help"
                >

                    <a
                        href="${SATORIMODE_BASE}preguntas-frecuentes.html"
                    >
                        Preguntas frecuentes
                    </a>

                    <a
                        href="${SATORIMODE_BASE}envios.html"
                    >
                        Envíos
                    </a>

                    <a
                        href="${SATORIMODE_BASE}cambios.html"
                    >
                        Cambios y devoluciones
                    </a>

                    <a
                        href="${SATORIMODE_BASE}guia-tallas.html"
                    >
                        Guía de tallas
                    </a>

                </div>

            </nav>


            <div class="mobile-social">

                <span>SÍGUENOS</span>

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


        <!-- =================================================
             OVERLAY CARRITO
        ================================================== -->

        <div
            class="cart-preview-overlay"
            id="satori-cart-overlay"
            aria-hidden="true"
        ></div>


        <!-- =================================================
             PREVIEW CARRITO
        ================================================== -->

        <aside
            class="cart-preview"
            id="satori-cart-preview"
            aria-hidden="true"
        >

            <div class="cart-preview-header">

                <div>

                    <div class="cart-preview-label">
                        SATORII · SHOPPING CART
                    </div>

                    <h2>
                        TU CARRITO
                    </h2>

                </div>


                <button
                    id="satori-cart-close"
                    class="cart-preview-close"
                    type="button"
                    aria-label="Cerrar carrito"
                >
                    ×
                </button>

            </div>


            <div
                class="cart-preview-content"
                id="satori-cart-preview-content"
            ></div>


            <div
                class="cart-preview-footer"
                id="satori-cart-preview-footer"
            >

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


                <!-- =================================================
                     ACCIONES DEL CARRITO
                ================================================== -->

                <div class="cart-preview-actions">

                    <a
                        href="${SATORIMODE_BASE}carrito.html"
                        class="cart-preview-button cart-preview-view"
                    >
                        VER CARRITO
                    </a>


                    <a
                        href="${SATORIMODE_BASE}checkout.html"
                        class="cart-preview-button cart-preview-checkout"
                    >
                        FINALIZAR PEDIDO
                    </a>

                </div>


                <!-- =================================================
                     SEGUIR COMPRANDO
                ================================================== -->

                <a
                    href="${SATORIMODE_BASE}productos.html"
                    class="cart-preview-continue"
                >
                    ← Seguir comprando
                </a>

            </div>

        </aside>

        `;


        /* =====================================================
           INSERTAR
        ====================================================== */

        document.body.prepend(
            root
        );


        /* =====================================================
           CSS
        ====================================================== */

        const style =
            document.createElement(
                "style"
            );


        style.id =
            "satori-header-style";


        style.textContent = `

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
           TOP BAR
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
            width:min(
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

        #satori-header .instagram-dot {
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
            white-space:nowrap;
        }

        #satori-header .top-message {
            position:absolute;
            right:0;
            top:50%;
            transform:translateY(-50%);
            font-size:9px;
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
            background:#000;
            border-bottom:1px solid #222;
            z-index:10000;
        }

        #satori-header .header-inner {
            width:min(
                1400px,
                calc(100% - 40px)
            );
            height:68px;
            margin:0 auto;
            display:grid;
            grid-template-columns:1fr auto 1fr;
            align-items:center;
            position:relative;
        }


        /* =====================================================
           LOGO
        ====================================================== */

@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@1,900&display=swap");

#satori-header .satori-brand-logo {
    font-family:
        "Roboto Condensed",
        "Arial Narrow",
        Arial,
        Helvetica,
        sans-serif;

    font-weight:900;
    font-style:italic;
    letter-spacing:-1.8px;
    text-transform:uppercase;
    color:#fff;
    text-decoration:none;
    line-height:.88;
    white-space:nowrap;

    transform:skewX(-3deg);

    transition:
        color .2s ease,
        transform .2s ease;
}

#satori-header .satori-logo {
    grid-column:1;
    justify-self:start;
    font-size:29px;
}


        @media (min-width:1001px) {

            #satori-header .satori-logo:hover {
                color:#f31218;
                transform:
                    skewX(-5deg)
                    scale(1.06);
            }

        }


        /* =====================================================
           NAV
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
            color:#fff;
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
            transition:transform .2s ease;
        }

        #satori-header
        .nav-dropdown.open
        .nav-arrow {
            transform:rotate(180deg);
        }

        #satori-header .dropdown-menu {
            position:absolute;
            top:68px;
            left:50%;
            transform:translate(-50%,-8px);
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
            transform:translate(-50%,0);
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

        /* =====================================================
           BUSCADOR INLINE
        ====================================================== */

        #satori-header .header-search-inline {
            display:flex;
            align-items:center;
            width:0;
            max-width:0;
            opacity:0;
            overflow:hidden;
            transition:
                width .25s ease,
                max-width .25s ease,
                opacity .2s ease,
                margin .25s ease;
            margin-right:0;
        }

        #satori-header .header-search-inline.open {
            width:220px;
            max-width:220px;
            opacity:1;
            margin-right:2px;
        }

        #satori-header .header-search-inline input {
            width:100%;
            height:34px;
            padding:0 10px;
            border:0;
            border-bottom:1px solid rgba(255,255,255,.65);
            outline:none;
            background:transparent;
            color:#fff;
            font-size:12px;
        }

        #satori-header .header-search-inline input::placeholder {
            color:rgba(255,255,255,.65);
        }

        #satori-header .header-search-inline button {
            display:none;
        }

        #satori-header .header-icon {
            width:34px;
            height:34px;
            padding:0;
            border:0;
            background:transparent;
            color:#fff;
            text-decoration:none;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            position:relative;
            -webkit-tap-highlight-color:transparent;
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
            pointer-events:none;
            z-index:20;
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
            width:calc(100% - 16px);
            height:64px;
            background:#000;
            border:1px solid #222;
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
           OVERLAYS
        ====================================================== */

        #satori-header .mobile-menu-overlay,
        #satori-header .cart-preview-overlay {
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.45);
            opacity:0;
            visibility:hidden;
            pointer-events:none;
            transition:
                opacity .25s ease,
                visibility .25s ease;
        }

        #satori-header .mobile-menu-overlay {
            z-index:1000000;
        }

        #satori-header .cart-preview-overlay {
            z-index:1000002;
        }

        #satori-header
        .mobile-menu-overlay.open,
        #satori-header
        .cart-preview-overlay.open {
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
            transform:translateX(-100%);
            transition:transform .28s ease;
            overflow-y:auto;
            z-index:1000001;
        }

        #satori-header
        .mobile-menu.open {
            transform:translateX(0);
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
            border:0;
            background:none;
            color:#111;
            font-size:29px;
            cursor:pointer;
            -webkit-tap-highlight-color:transparent;
        }

        #satori-header .mobile-menu-close:hover {
            color:#f31218;
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
            -webkit-tap-highlight-color:transparent;
        }

        #satori-header .mobile-home-button {
            justify-content:flex-start;
        }

        #satori-header .mobile-nav-button:hover {
            color:#f31218;
        }

        #satori-header .mobile-arrow {
            font-size:12px;
            transition:transform .2s ease;
        }

        #satori-header
        .mobile-nav-button.active
        .mobile-arrow {
            transform:rotate(180deg);
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


        /* =====================================================
           BUSCADOR
        ====================================================== */

        #satori-header .search-overlay {
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.55);
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
            width:min(700px,calc(100% - 32px));
            padding:30px;
            background:#fff;
            border-radius:16px;
            box-shadow:
                0 20px 60px
                rgba(0,0,0,.25);
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
            cursor:pointer;
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
            padding:0 16px;
            border:0;
            outline:none;
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
           PREVIEW CARRITO
        ====================================================== */

        #satori-header .cart-preview {
            position:fixed;
            top:0;
            right:0;
            width:min(430px,100vw);
            height:100dvh;
            background:#fff;
            display:flex;
            flex-direction:column;
            transform:translateX(100%);
            transition:transform .28s ease;
            box-shadow:
                -15px 0 45px
                rgba(0,0,0,.15);
            z-index:1000003;
        }

        #satori-header
        .cart-preview.open {
            transform:translateX(0);
        }


        /* =====================================================
           HEADER CARRITO
        ====================================================== */

        #satori-header .cart-preview-header {
            flex-shrink:0;
            min-height:92px;
            padding:22px 25px;
            border-bottom:1px solid #ddd;
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:20px;
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
            font-size:23px;
            font-weight:900;
            letter-spacing:-1px;
        }

        #satori-header .cart-preview-close {
            flex-shrink:0;
            width:40px;
            height:40px;
            border:0;
            background:transparent;
            color:#111;
            font-size:30px;
            cursor:pointer;
        }


        /* =====================================================
           CONTENIDO
        ====================================================== */

        #satori-header .cart-preview-content {
            flex:1;
            overflow-y:auto;
            padding:5px 25px 20px;
        }

        #satori-header .cart-preview-item {
            display:grid;
            grid-template-columns:82px minmax(0,1fr);
            gap:14px;
            padding:18px 0;
            border-bottom:1px solid #eee;
        }

        #satori-header .cart-preview-image {
            width:82px;
            height:82px;
            overflow:hidden;
            background:#f5f5f5;
            border-radius:6px;
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
            font-size:14px;
            font-weight:700;
            line-height:1.3;
        }

        #satori-header .cart-preview-options {
            margin-top:5px;
            color:#777;
            font-size:10px;
            line-height:1.5;
        }

        #satori-header .cart-preview-price {
            margin-top:7px;
            color:#111;
            font-size:13px;
            font-weight:800;
        }

        #satori-header .cart-preview-controls {
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-top:10px;
        }

        #satori-header .cart-preview-quantity {
            display:flex;
            align-items:center;
            height:30px;
            border:1px solid #ccc;
            border-radius:4px;
            overflow:hidden;
        }

        #satori-header .cart-preview-quantity button {
            width:28px;
            height:100%;
            border:0;
            background:#fff;
            cursor:pointer;
            font-size:14px;
        }

        #satori-header .cart-preview-quantity span {
            min-width:30px;
            text-align:center;
            font-size:11px;
            font-weight:700;
        }

        #satori-header .cart-preview-remove {
            border:0;
            background:none;
            color:#888;
            font-size:9px;
            font-weight:700;
            cursor:pointer;
        }

        #satori-header .cart-preview-remove:hover {
            color:#f31218;
        }


        /* =====================================================
           VACÍO
        ====================================================== */

        #satori-header .cart-preview-empty {
            min-height:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding:40px 25px;
            text-align:center;
        }

        #satori-header .cart-preview-empty-label {
            margin-bottom:10px;
            color:#f31218;
            font-size:9px;
            font-weight:800;
            letter-spacing:2px;
        }

        #satori-header .cart-preview-empty h3 {
            margin:0;
            color:#111;
            font-size:25px;
            font-weight:900;
        }

        #satori-header .cart-preview-empty p {
            max-width:290px;
            margin:12px auto 22px;
            color:#777;
            font-size:12px;
            line-height:1.6;
        }

        #satori-header .cart-preview-empty a {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:44px;
            padding:0 22px;
            background:#111;
            color:#fff;
            text-decoration:none;
            font-size:10px;
            font-weight:800;
            border-radius:4px;
        }


        /* =====================================================
           FOOTER CARRITO
        ====================================================== */

        #satori-header .cart-preview-footer {
            flex-shrink:0;
            padding:20px 25px 24px;
            background:#fafafa;
            border-top:1px solid #ddd;
        }

        #satori-header .cart-preview-subtotal {
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-bottom:16px;
        }

        #satori-header .cart-preview-subtotal span {
            color:#555;
            font-size:11px;
            font-weight:700;
            letter-spacing:1px;
        }

        #satori-header .cart-preview-subtotal strong {
            color:#111;
            font-size:18px;
            font-weight:900;
        }


        /* =====================================================
           ACCIONES DEL CARRITO
        ====================================================== */

        #satori-header .cart-preview-actions {

            display:grid;

            grid-template-columns:
                1fr
                1fr;

            gap:10px;

            width:100%;

        }


        /* =====================================================
           BOTONES
        ====================================================== */

        #satori-header .cart-preview-button {

            width:100%;

            min-height:48px;

            display:flex;

            align-items:center;

            justify-content:center;

            padding:0 10px;

            text-decoration:none;

            font-size:10px;

            font-weight:800;

            letter-spacing:.8px;

            border-radius:5px;

            transition:
                background .2s ease,
                color .2s ease,
                border-color .2s ease;

        }


        /* =====================================================
           VER CARRITO
        ====================================================== */

        #satori-header .cart-preview-view {

            background:#fff;

            color:#111;

            border:1px solid #111;

        }


        #satori-header .cart-preview-view:hover {

            background:#111;

            color:#fff;

        }


        /* =====================================================
           FINALIZAR PEDIDO
        ====================================================== */

        #satori-header .cart-preview-checkout {

            background:#f31218;

            color:#fff;

            border:1px solid #f31218;

        }


        #satori-header .cart-preview-checkout:hover {

            background:#111;

            border-color:#111;

        }


        /* =====================================================
           SEGUIR COMPRANDO
        ====================================================== */

        #satori-header .cart-preview-continue {

            display:block;

            margin-top:13px;

            text-align:center;

            color:#555;

            text-decoration:none;

            font-size:10px;

            font-weight:700;

        }


        #satori-header .cart-preview-continue:hover {

            color:#f31218;

        }


        /* =====================================================
           MÓVIL
        ====================================================== */

        @media (max-width:1000px) {

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
                display:block;
            }


            /* HAMBURGUESA */

            #satori-header .mobile-menu-button {
                position:absolute;
                left:14px;
                top:50%;
                transform:translateY(-50%);
                width:36px;
                height:36px;
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
                -webkit-tap-highlight-color:transparent;
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


            /* =================================================
               LOGO MÓVIL
            ================================================== */

            #satori-header .satori-logo,
            #satori-header .satori-logo:hover,
            #satori-header .satori-logo:active,
            #satori-header .satori-logo:focus {

                position:absolute;

                left:50%;
                top:50%;
transform:
    translate(-50%,-50%)
    skewX(-3deg);

font-size:29px;

                z-index:900001;

                color:#fff;

                transition:
                    color .2s ease;

                -webkit-tap-highlight-color:transparent;
            }


            #satori-header .satori-logo:active {

                transform:
                    translate(-50%,-50%)
                    skewX(-5deg);

            }


            /* NAV */

            #satori-header .main-nav {
                display:none;
            }


            /* ICONOS */

            #satori-header .header-icons {
                position:absolute;
                right:7px;
                top:50%;
                transform:translateY(-50%);
                display:flex;
                align-items:center;
                gap:1px;
                z-index:900001;
            }

            #satori-header .header-icon {
                width:32px;
                height:32px;
            }


            /* CARRITO */

            #satori-header .cart-preview {
                width:min(390px,90vw);
            }

            #satori-header .cart-preview-header {
                min-height:82px;
                padding:18px 20px;
            }

            #satori-header .cart-preview-content {
                padding:0 20px 20px;
            }

            #satori-header .cart-preview-footer {
                padding:18px 20px 22px;
            }


            /* BUSCADOR */

            #satori-header .search-overlay {
                padding-top:82px;
            }

            #satori-header .search-box {
                width:calc(100% - 24px);
                padding:24px 18px;
            }

        }


        /* =====================================================
           MÓVILES PEQUEÑOS
        ====================================================== */

        @media (max-width:430px) {

            #satori-header .shipping-message {
                font-size:9px;
            }

            #satori-header .satori-logo,
            #satori-header .satori-logo:hover,
            #satori-header .satori-logo:active,
            #satori-header .satori-logo:focus {

                font-size:28px;

                left:50%;
                top:50%;

                transform:
                    translate(-50%,-50%)
                    skewX(-5deg);

            }

            #satori-header .cart-preview {
                width:92vw;
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


        document.head.appendChild(
            style
        );


        /* =====================================================
           ESPACIADOR
        ====================================================== */

        const spacer =
            document.createElement(
                "div"
            );


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

        const mobileOverlay =
            document.getElementById(
                "satori-mobile-overlay"
            );

        const mobileOpen =
            document.getElementById(
                "satori-mobile-open"
            );

        const mobileClose =
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

        const inlineSearch =
            document.getElementById(
                "satori-search-inline"
            );

        const inlineSearchInput =
            document.getElementById(
                "satori-search-inline-input"
            );


        const cartButton =
            document.getElementById(
                "satori-cart-button"
            );

        const cartPreview =
            document.getElementById(
                "satori-cart-preview"
            );

        const cartOverlay =
            document.getElementById(
                "satori-cart-overlay"
            );

        const cartClose =
            document.getElementById(
                "satori-cart-close"
            );

        const cartContent =
            document.getElementById(
                "satori-cart-preview-content"
            );

        const cartFooter =
            document.getElementById(
                "satori-cart-preview-footer"
            );

        const cartSubtotal =
            document.getElementById(
                "satori-cart-preview-subtotal"
            );


        /* =====================================================
           MIGRAR CARRITO ANTIGUO
        ====================================================== */

        function migrateOldCart() {

            try {

                const current =
                    localStorage.getItem(
                        CART_STORAGE_KEY
                    );

                const old =
                    localStorage.getItem(
                        OLD_CART_STORAGE_KEY
                    );


                if (
                    !current &&
                    old
                ) {

                    localStorage.setItem(
                        CART_STORAGE_KEY,
                        old
                    );


                    console.info(
                        "SatoriMode · Carrito antiguo migrado."
                    );

                }

            }

            catch (error) {

                console.error(
                    "SatoriMode · Error migrando carrito:",
                    error
                );

            }

        }


        migrateOldCart();


        /* =====================================================
           PRECIO
        ====================================================== */

        function formatPrice(
            price
        ) {

            return new Intl.NumberFormat(
                "es-CL",
                {
                    style:"currency",
                    currency:"CLP",
                    maximumFractionDigits:0
                }
            ).format(
                Number(price) || 0
            );

        }


        /* =====================================================
           OBTENER CARRITO
        ====================================================== */

        function getCart() {

            try {

                const saved =
                    localStorage.getItem(
                        CART_STORAGE_KEY
                    );


                if (!saved) {

                    return [];

                }


                const cart =
                    JSON.parse(saved);


                if (!Array.isArray(cart)) {

                    return [];

                }


                return cart;

            }

            catch (error) {

                console.error(
                    "SatoriMode · Error leyendo carrito:",
                    error
                );

                return [];

            }

        }


        /* =====================================================
           GUARDAR CARRITO
        ====================================================== */

        function saveCart(
            cart
        ) {

            try {

                localStorage.setItem(
                    CART_STORAGE_KEY,
                    JSON.stringify(
                        cart
                    )
                );

            }

            catch (error) {

                console.error(
                    "SatoriMode · Error guardando carrito:",
                    error
                );

            }

        }


        /* =====================================================
           CONTADOR
        ====================================================== */

        function updateHeaderCartCount() {

            const cart =
                getCart();


            const count =
                cart.reduce(
                    function (
                        total,
                        item
                    ) {

                        return total +
                            Number(
                                item.quantity || 0
                            );

                    },
                    0
                );


            root.querySelectorAll(
                "[data-satori-cart-count]"
            ).forEach(
                function (
                    element
                ) {

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
           CERRAR DROPDOWNS
        ====================================================== */

        function closeDropdowns() {

            root.querySelectorAll(
                ".nav-dropdown"
            ).forEach(
                function (
                    dropdown
                ) {

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

            mobileMenu?.classList.remove(
                "open"
            );

            mobileOverlay?.classList.remove(
                "open"
            );


            mobileMenu?.setAttribute(
                "aria-hidden",
                "true"
            );

            mobileOverlay?.setAttribute(
                "aria-hidden",
                "true"
            );

            mobileOpen?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* =====================================================
           CERRAR BUSCADOR
        ====================================================== */

        function closeSearch() {

            inlineSearch?.classList.remove(
                "open"
            );

            searchOverlay?.classList.remove(
                "open"
            );


            searchOverlay?.setAttribute(
                "aria-hidden",
                "true"
            );


            searchButton?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* =====================================================
           CERRAR CARRITO
        ====================================================== */

        function closeCartPreview() {

            cartPreview?.classList.remove(
                "open"
            );

            cartOverlay?.classList.remove(
                "open"
            );


            cartPreview?.setAttribute(
                "aria-hidden",
                "true"
            );

            cartOverlay?.setAttribute(
                "aria-hidden",
                "true"
            );

            cartButton?.setAttribute(
                "aria-expanded",
                "false"
            );


            updateBodyLock();

        }


        /* =====================================================
           BODY LOCK
        ====================================================== */

        function updateBodyLock() {

            const open =
                mobileMenu?.classList.contains(
                    "open"
                ) ||

                searchOverlay?.classList.contains(
                    "open"
                ) ||

                cartPreview?.classList.contains(
                    "open"
                );


            document.body.style.overflow =
                open
                    ? "hidden"
                    : "";

        }


        /* =====================================================
           ABRIR MENÚ
        ====================================================== */

        function openMobileMenu() {

            closeSearch();

            closeCartPreview();

            closeDropdowns();


            mobileMenu?.classList.add(
                "open"
            );

            mobileOverlay?.classList.add(
                "open"
            );


            mobileMenu?.setAttribute(
                "aria-hidden",
                "false"
            );

            mobileOverlay?.setAttribute(
                "aria-hidden",
                "false"
            );

            mobileOpen?.setAttribute(
                "aria-expanded",
                "true"
            );


            updateBodyLock();

        }


        /* =====================================================
           ABRIR BUSCADOR
        ====================================================== */

        function openSearch() {

            closeMobileMenu();

            closeCartPreview();

            closeDropdowns();


            inlineSearch?.classList.add(
                "open"
            );


            setTimeout(
                function () {

                    inlineSearchInput?.focus();

                },
                80
            );

        }


        /* =====================================================
           ABRIR CARRITO
        ====================================================== */

        function openCartPreview() {

            closeMobileMenu();

            closeSearch();

            closeDropdowns();


            renderCartPreview();


            cartPreview?.classList.add(
                "open"
            );

            cartOverlay?.classList.add(
                "open"
            );


            cartPreview?.setAttribute(
                "aria-hidden",
                "false"
            );

            cartOverlay?.setAttribute(
                "aria-hidden",
                "false"
            );

            cartButton?.setAttribute(
                "aria-expanded",
                "true"
            );


            updateBodyLock();

        }


        /* =====================================================
           EVENTOS MENÚ
        ====================================================== */

        mobileOpen?.addEventListener(
            "click",
            function (
                event
            ) {

                event.preventDefault();

                event.stopPropagation();

                openMobileMenu();

            }
        );


        mobileClose?.addEventListener(
            "click",
            function () {

                closeMobileMenu();

                updateBodyLock();

            }
        );


        mobileOverlay?.addEventListener(
            "click",
            function () {

                closeMobileMenu();

                updateBodyLock();

            }
        );


        /* =====================================================
           EVENTOS BUSCADOR
        ====================================================== */

        searchButton?.addEventListener(
            "click",
            function (
                event
            ) {

                event.preventDefault();

                event.stopPropagation();

                if (
                    inlineSearch?.classList.contains(
                        "open"
                    )
                ) {

                    closeSearch();

                }

                else {

                    openSearch();

                }

            }
        );


        searchClose?.addEventListener(
            "click",
            function () {

                closeSearch();

                updateBodyLock();

            }
        );


        searchOverlay?.addEventListener(
            "click",
            function (
                event
            ) {

                if (
                    event.target ===
                    searchOverlay
                ) {

                    closeSearch();

                    updateBodyLock();

                }

            }
        );


        /* =====================================================
           EVENTOS CARRITO
        ====================================================== */

        cartButton?.addEventListener(
            "click",
            function (
                event
            ) {

                event.preventDefault();

                event.stopPropagation();

                openCartPreview();

            }
        );


        cartClose?.addEventListener(
            "click",
            function () {

                closeCartPreview();

            }
        );


        cartOverlay?.addEventListener(
            "click",
            function () {

                closeCartPreview();

            }
        );


        /* =====================================================
           BÚSQUEDA
        ====================================================== */

        searchForm?.addEventListener(
            "submit",
            function (
                event
            ) {

                event.preventDefault();


                const query =
                    searchInput?.value.trim();


                if (!query) {

                    searchInput?.focus();

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

        /* =====================================================
           BÚSQUEDA INLINE
        ====================================================== */

        inlineSearch?.addEventListener(
            "submit",
            function (
                event
            ) {

                event.preventDefault();


                const query =
                    inlineSearchInput?.value.trim();


                if (!query) {

                    inlineSearchInput?.focus();

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


        inlineSearchInput?.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    event.key === "Escape"
                ) {

                    closeSearch();

                    searchButton?.focus();

                }

            }
        );


        document.addEventListener(
            "click",
            function (
                event
            ) {

                if (
                    !inlineSearch?.classList.contains(
                        "open"
                    )
                ) {

                    return;

                }


                if (
                    inlineSearch.contains(
                        event.target
                    ) ||
                    searchButton?.contains(
                        event.target
                    )
                ) {

                    return;

                }


                closeSearch();

            }
        );


        /* =====================================================
           DROPDOWNS
        ====================================================== */

        root.querySelectorAll(
            ".nav-dropdown"
        ).forEach(
            function (
                dropdown
            ) {

                const button =
                    dropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                button?.addEventListener(
                    "click",
                    function (
                        event
                    ) {

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
            function (
                button
            ) {

                button.addEventListener(
                    "click",
                    function (
                        event
                    ) {

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
                            function (
                                submenu
                            ) {

                                submenu.classList.remove(
                                    "open"
                                );

                            }
                        );


                        root.querySelectorAll(
                            ".mobile-nav-button"
                        ).forEach(
                            function (
                                navButton
                            ) {

                                navButton.classList.remove(
                                    "active"
                                );


                                navButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

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
           RENDER CARRITO
        ====================================================== */

        function renderCartPreview() {

            if (!cartContent) {

                return;

            }


            const cart =
                getCart();


            /* =================================================
               VACÍO
            ================================================== */

            if (
                cart.length === 0
            ) {

                cartContent.innerHTML = `

                    <div
                        class="cart-preview-empty"
                    >

                        <div
                            class="cart-preview-empty-label"
                        >
                            SATORII · CARRITO
                        </div>


                        <h3>
                            TU CARRITO ESTÁ VACÍO.
                        </h3>


                        <p>
                            Explora nuestras colecciones
                            y encuentra algo que sea parte
                            de tu estilo.
                        </p>


                        <a
                            href="${SATORIMODE_BASE}productos.html"
                        >
                            EXPLORAR PRODUCTOS
                        </a>

                    </div>

                `;


                if (cartFooter) {

                    cartFooter.style.display =
                        "none";

                }


                return;

            }


            if (cartFooter) {

                cartFooter.style.display =
                    "block";

            }


            let subtotal =
                0;


            cartContent.innerHTML =
                "";


            cart.forEach(
                function (
                    product,
                    index
                ) {

                    const quantity =
                        Math.max(
                            0,
                            Number(
                                product.quantity || 0
                            )
                        );


                    const price =
                        Number(
                            product.price || 0
                        );


                    const itemTotal =
                        price *
                        quantity;


                    subtotal +=
                        itemTotal;


                    const item =
                        document.createElement(
                            "article"
                        );


                    item.className =
                        "cart-preview-item";


                    const options =
                        [];


                    if (
                        product.size
                    ) {

                        options.push(
                            "Talla: " +
                            product.size
                        );

                    }


                    if (
                        product.color
                    ) {

                        options.push(
                            "Color: " +
                            product.color
                        );

                    }


                    item.innerHTML = `

                        <div
                            class="cart-preview-image"
                        >

                            <img
                                src="${escapeHTML(
                                    product.image || ""
                                )}"
                                alt="${escapeHTML(
                                    product.name ||
                                    "Producto"
                                )}"
                            >

                        </div>


                        <div
                            class="cart-preview-info"
                        >

                            <h3
                                class="cart-preview-name"
                            >
                                ${escapeHTML(
                                    product.name ||
                                    "Producto"
                                )}
                            </h3>


                            ${
                                options.length
                                    ? `
                                        <div
                                            class="cart-preview-options"
                                        >
                                            ${options
                                                .map(
                                                    escapeHTML
                                                )
                                                .join(" · ")}
                                        </div>
                                    `
                                    : ""
                            }


                            <div
                                class="cart-preview-price"
                            >
                                ${formatPrice(
                                    itemTotal
                                )}
                            </div>


                            <div
                                class="cart-preview-controls"
                            >

                                <div
                                    class="cart-preview-quantity"
                                >

                                    <button
                                        type="button"
                                        data-action="decrease"
                                        aria-label="Disminuir cantidad"
                                    >
                                        −
                                    </button>


                                    <span>
                                        ${quantity}
                                    </span>


                                    <button
                                        type="button"
                                        data-action="increase"
                                        aria-label="Aumentar cantidad"
                                    >
                                        +
                                    </button>

                                </div>


                                <button
                                    type="button"
                                    class="cart-preview-remove"
                                >
                                    ELIMINAR
                                </button>

                            </div>

                        </div>

                    `;


                    item.querySelector(
                        '[data-action="decrease"]'
                    )?.addEventListener(
                        "click",
                        function () {

                            changeCartQuantity(
                                index,
                                -1
                            );

                        }
                    );


                    item.querySelector(
                        '[data-action="increase"]'
                    )?.addEventListener(
                        "click",
                        function () {

                            changeCartQuantity(
                                index,
                                1
                            );

                        }
                    );


                    item.querySelector(
                        ".cart-preview-remove"
                    )?.addEventListener(
                        "click",
                        function () {

                            removeCartProduct(
                                index
                            );

                        }
                    );


                    cartContent.appendChild(
                        item
                    );

                }
            );


            if (cartSubtotal) {

                cartSubtotal.textContent =
                    formatPrice(
                        subtotal
                    );

            }

        }


        /* =====================================================
           ESCAPE HTML
        ====================================================== */

        function escapeHTML(
            value
        ) {

            return String(
                value ?? ""
            )
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        /* =====================================================
           CAMBIAR CANTIDAD
        ====================================================== */

        function changeCartQuantity(
            index,
            change
        ) {

            const cart =
                getCart();


            if (
                !cart[index]
            ) {

                return;

            }


            cart[index].quantity =
                Number(
                    cart[index].quantity || 0
                ) + change;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(
                    index,
                    1
                );

            }


            saveCart(
                cart
            );


            updateHeaderCartCount();

            renderCartPreview();


            document.dispatchEvent(
                new CustomEvent(
                    "satorii:cart-updated"
                )
            );

        }


        /* =====================================================
           ELIMINAR
        ====================================================== */

        function removeCartProduct(
            index
        ) {

            const cart =
                getCart();


            if (
                !cart[index]
            ) {

                return;

            }


            cart.splice(
                index,
                1
            );


            saveCart(
                cart
            );


            updateHeaderCartCount();

            renderCartPreview();


            document.dispatchEvent(
                new CustomEvent(
                    "satorii:cart-updated"
                )
            );

        }


        /* =====================================================
           SINCRONIZACIÓN
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
            function (
                event
            ) {

                if (
                    event.key ===
                    CART_STORAGE_KEY
                ) {

                    updateHeaderCartCount();

                    renderCartPreview();

                }

            }
        );


        /* =====================================================
           CLICK FUERA
        ====================================================== */

        document.addEventListener(
            "click",
            function (
                event
            ) {

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
           NAVEGACIÓN MÓVIL
        ====================================================== */

        root.querySelectorAll(
            ".mobile-nav a"
        ).forEach(
            function (
                link
            ) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileMenu();

                        updateBodyLock();

                    }
                );

            }
        );


        /* =====================================================
           ESC
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    event.key !==
                    "Escape"
                ) {

                    return;

                }


                closeSearch();

                closeMobileMenu();

                closeCartPreview();

                closeDropdowns();

                updateBodyLock();

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

                updateBodyLock();

            }
        );


        /* =====================================================
           INICIALIZACIÓN
        ====================================================== */

        updateHeaderCartCount();

        renderCartPreview();

    }


    /* =====================================================
       INICIO
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
