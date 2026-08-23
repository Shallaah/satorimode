(function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const SATORIMODE_BASE = "/satorimode/";

    const SATORII_RED = "#EF0930";

    const CART_STORAGE_KEY = "satorimode_cart";

    const OLD_CART_STORAGE_KEY = "satorii_cart";


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    function initSatoriiHeader() {

        /* =================================================
           EVITAR DUPLICADOS
        ================================================== */

        document
            .getElementById("satori-header")
            ?.remove();

        document
            .getElementById("satori-header-style")
            ?.remove();

        document
            .getElementById("satori-header-spacer")
            ?.remove();


        /* =================================================
           ROOT
        ================================================== */

        const root = document.createElement("div");

        root.id = "satori-header";


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
                    href="https://www.instagram.com/satoriicl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Satorii"
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

                </a>


                <span class="shipping-message">

                    <svg
                        class="shipping-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path d="M3 6h11v10H3z" />

                        <path d="M14 10h4l3 3v3h-7z" />

                        <circle
                            cx="7"
                            cy="18"
                            r="2"
                        />

                        <circle
                            cx="18"
                            cy="18"
                            r="2"
                        />

                    </svg>

                    <span>
                        ENVÍOS A TODO CHILE
                    </span>

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
                    aria-label="Satorii - Inicio"
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

                            <svg
                                class="nav-arrow"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>

                        </button>


                        <div class="dropdown-menu">

                            <a href="${SATORIMODE_BASE}anime.html">
                                Anime
                            </a>

                            <a href="${SATORIMODE_BASE}yokai.html">
                                Yokai
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

                            <svg
                                class="nav-arrow"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>

                        </button>


                        <div class="dropdown-menu">

                            <a href="${SATORIMODE_BASE}satorii-pack.html">
                                Satorii Pack
                            </a>

                            <a href="${SATORIMODE_BASE}regala-satorii.html">
                                Regala Satorii
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

                            <svg
                                class="nav-arrow"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>

                        </button>


                        <div class="dropdown-menu">

                            <a href="${SATORIMODE_BASE}cambios-y-devoluciones.html">
                                Cambios y devoluciones
                            </a>

                            <a href="${SATORIMODE_BASE}preguntas-frecuentes.html">
                                Preguntas frecuentes
                            </a>

                            <a href="${SATORIMODE_BASE}envios.html">
                                Envíos
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
                        href="${SATORIMODE_BASE}cuenta.html"
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

                    <button
                        class="header-icon cart-header-icon"
                        id="satori-cart-button"
                        type="button"
                        aria-label="Abrir carrito"
                        aria-controls="satori-cart-preview"
                        aria-expanded="false"
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

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path d="M6 6l12 12"></path>
                        <path d="M18 6L6 18"></path>

                    </svg>

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

                    <svg
                        class="mobile-arrow"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-collections"
                >

                    <a href="${SATORIMODE_BASE}anime.html">
                        Anime
                    </a>

                    <a href="${SATORIMODE_BASE}yokai.html">
                        Yokai
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

                    <svg
                        class="mobile-arrow"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-products"
                >

                    <a href="${SATORIMODE_BASE}satorii-pack.html">
                        Satorii Pack
                    </a>

                    <a href="${SATORIMODE_BASE}regala-satorii.html">
                        Regala Satorii
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

                    <svg
                        class="mobile-arrow"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>

                </button>


                <div
                    class="mobile-submenu"
                    id="mobile-help"
                >

                    <a href="${SATORIMODE_BASE}cambios-y-devoluciones.html">
                        Cambios y devoluciones
                    </a>

                    <a href="${SATORIMODE_BASE}preguntas-frecuentes.html">
                        Preguntas frecuentes
                    </a>

                    <a href="${SATORIMODE_BASE}envios.html">
                        Envíos
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
                    href="https://www.instagram.com/satoriicl/"
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

                    INSTAGRAM

                    <svg
                        class="external-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path d="M14 5h5v5"></path>
                        <path d="M19 5l-8 8"></path>
                        <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"></path>

                    </svg>

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
                aria-label="Buscar productos"
            >

                <button
                    class="search-close"
                    id="satori-search-close"
                    type="button"
                    aria-label="Cerrar búsqueda"
                >

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path d="M6 6l12 12"></path>
                        <path d="M18 6L6 18"></path>

                    </svg>

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
             CARRITO
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

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path d="M6 6l12 12"></path>
                        <path d="M18 6L6 18"></path>

                    </svg>

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
           INSERTAR HEADER
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
                "Inter",
                Arial,
                Helvetica,
                sans-serif;
        }


        /* =====================================================
           BLOQUEAR SCROLL
        ====================================================== */

        html.satori-lock-scroll,
        body.satori-lock-scroll {
            overflow:hidden !important;
            overscroll-behavior:none;
        }


        /* =====================================================
           TOP BAR
        ====================================================== */

        #satori-header .top-bar {
            width:100%;
            height:32px;
            background:${SATORII_RED};
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
            width:22px;
            height:22px;
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


        /* =====================================================
           ENVÍOS
        ====================================================== */

        #satori-header .shipping-message {
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
            display:flex;
            align-items:center;
            gap:6px;
            font-size:10px;
            font-weight:700;
            white-space:nowrap;
        }

        #satori-header .shipping-icon {
            width:15px;
            height:15px;
            flex-shrink:0;
            fill:none;
            stroke:currentColor;
            stroke-width:1.7;
            stroke-linecap:round;
            stroke-linejoin:round;
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
           HEADER PRINCIPAL
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

        #satori-header .satori-brand-logo {
            font-family:
                "Barlow Condensed",
                "Arial Narrow",
                Arial,
                sans-serif;
            font-weight:800;
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
            font-size:30px;
        }

        @media (min-width:1001px) {

            #satori-header .satori-logo:hover {
                color:${SATORII_RED};
                transform:
                    skewX(-5deg)
                    scale(1.05);
            }

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
            color:#fff;
            font-family:inherit;
            font-size:12px;
            font-weight:600;
            cursor:pointer;
            display:flex;
            align-items:center;
            gap:6px;
            text-decoration:none;
            white-space:nowrap;
        }

        #satori-header .nav-home-button:hover,
        #satori-header .nav-dropdown-btn:hover {
            color:${SATORII_RED};
        }

        #satori-header .nav-dropdown {
            position:relative;
            height:100%;
            display:flex;
            align-items:center;
        }

        #satori-header .nav-arrow {
            width:13px;
            height:13px;
            fill:none;
            stroke:currentColor;
            stroke-width:2;
            stroke-linecap:round;
            stroke-linejoin:round;
            transition:transform .2s ease;
        }

        #satori-header
        .nav-dropdown.open
        .nav-arrow {
            transform:rotate(180deg);
        }


        /* =====================================================
           DROPDOWN
        ====================================================== */

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
            color:${SATORII_RED};
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
            color:${SATORII_RED};
        }

        #satori-header .header-icon svg {
            width:18px;
            height:18px;
            fill:none;
            stroke:currentColor;
            stroke-width:1.55;
            stroke-linecap:round;
            stroke-linejoin:round;
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
            font-family:inherit;
            font-size:12px;
        }

        #satori-header .header-search-inline input::placeholder {
            color:rgba(255,255,255,.65);
        }


        /* =====================================================
           CARRITO
        ====================================================== */

        #satori-header .cart-count {
            position:absolute;
            top:1px;
            right:1px;
            min-width:15px;
            height:15px;
            padding:0 4px;
            border-radius:999px;
            background:${SATORII_RED};
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
            height:100vh;
            padding:20px 24px;
            padding-top:
                max(
                    20px,
                    env(safe-area-inset-top)
                );
            background:#fff;
            transform:translateX(-100%);
            transition:transform .28s ease;
            overflow-y:auto;
            -webkit-overflow-scrolling:touch;
            overscroll-behavior:contain;
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
            font-size:28px;
            color:#111;
        }

        #satori-header .mobile-menu-close {
            width:40px;
            height:40px;
            padding:0;
            border:0;
            background:none;
            color:#111;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
        }

        #satori-header .mobile-menu-close svg {
            width:22px;
            height:22px;
            fill:none;
            stroke:currentColor;
            stroke-width:2;
            stroke-linecap:round;
        }

        #satori-header .mobile-menu-close:hover {
            color:${SATORII_RED};
        }


        /* =====================================================
           NAVEGACIÓN MÓVIL
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
            font-family:inherit;
            font-size:15px;
            font-weight:600;
            text-decoration:none;
            cursor:pointer;
        }

        #satori-header .mobile-home-button {
            justify-content:flex-start;
        }

        #satori-header .mobile-nav-button:hover {
            color:${SATORII_RED};
        }

        #satori-header .mobile-arrow {
            width:16px;
            height:16px;
            fill:none;
            stroke:currentColor;
            stroke-width:2;
            stroke-linecap:round;
            stroke-linejoin:round;
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
            color:${SATORII_RED};
        }


        /* =====================================================
           SOCIAL
        ====================================================== */

        #satori-header .mobile-social {
            margin-top:35px;
            padding-top:5px;
            padding-bottom:
                max(
                    10px,
                    env(safe-area-inset-bottom)
                );
        }

        #satori-header .mobile-social span {
            display:block;
            margin-bottom:15px;
            color:${SATORII_RED};
            font-size:10px;
            font-weight:700;
            letter-spacing:3px;
        }

        #satori-header .mobile-instagram {
            display:flex;
            align-items:center;
            gap:8px;
            color:#111;
            text-decoration:none;
            font-size:14px;
            font-weight:700;
        }

        #satori-header .mobile-instagram:hover {
            color:${SATORII_RED};
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

        #satori-header .mobile-instagram .external-icon {
            width:13px;
            height:13px;
            margin-left:1px;
            stroke-width:1.7;
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
            transform:translateY(-15px);
            transition:transform .2s ease;
        }

        #satori-header
        .search-overlay.open
        .search-box {
            transform:translateY(0);
        }

        #satori-header .search-close {
            position:absolute;
            top:10px;
            right:12px;
            width:38px;
            height:38px;
            padding:0;
            border:0;
            background:none;
            color:#111;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
        }

        #satori-header .search-close svg {
            width:22px;
            height:22px;
            fill:none;
            stroke:currentColor;
            stroke-width:2;
            stroke-linecap:round;
        }

        #satori-header .search-close:hover {
            color:${SATORII_RED};
        }

        #satori-header .search-title {
            margin:0 45px 18px 0;
            color:#111;
            font-size:13px;
            font-weight:800;
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

        #satori-header .search-form:focus-within {
            border-color:${SATORII_RED};
        }

        #satori-header .search-form input {
            flex:1;
            min-width:0;
            padding:0 16px;
            border:0;
            outline:none;
            font-family:inherit;
            font-size:15px;
            color:#111;
            background:#fff;
        }

        #satori-header .search-form input::placeholder {
            color:#999;
        }

        #satori-header .search-form button {
            width:60px;
            flex-shrink:0;
            border:0;
            background:${SATORII_RED};
            color:#fff;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
        }

        #satori-header .search-form button svg {
            width:20px;
            height:20px;
            fill:none;
            stroke:currentColor;
            stroke-width:1.8;
            stroke-linecap:round;
            stroke-linejoin:round;
        }

        #satori-header .search-form button:hover {
            background:#111;
        }


        /* =====================================================
           CARRITO
        ====================================================== */

        #satori-header .cart-preview {
            position:fixed;
            top:0;
            right:0;
            width:min(430px,100vw);
            height:100dvh;
            height:100vh;
            background:#fff;
            display:flex;
            flex-direction:column;
            transform:translateX(100%);
            transition:transform .28s ease;
            box-shadow:
                -15px 0 45px
                rgba(0,0,0,.15);
            z-index:1000003;
            padding-bottom:
                env(safe-area-inset-bottom);
        }

        #satori-header
        .cart-preview.open {
            transform:translateX(0);
        }

        #satori-header .cart-preview-header {
            flex-shrink:0;
            min-height:92px;
            padding:22px 25px;
            border-bottom:1px solid #ddd;
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:20px;
            padding-top:
                max(
                    22px,
                    env(safe-area-inset-top)
                );
        }

        #satori-header .cart-preview-label {
            margin-bottom:6px;
            color:${SATORII_RED};
            font-size:9px;
            font-weight:800;
            letter-spacing:2px;
        }

        #satori-header .cart-preview-header h2 {
            margin:0;
            color:#111;
            font-family:
                "Barlow Condensed",
                "Arial Narrow",
                Arial,
                sans-serif;
            font-size:25px;
            font-weight:800;
            letter-spacing:-.5px;
        }

        #satori-header .cart-preview-close {
            flex-shrink:0;
            width:40px;
            height:40px;
            padding:0;
            border:0;
            background:transparent;
            color:#111;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
        }

        #satori-header .cart-preview-close svg {
            width:22px;
            height:22px;
            fill:none;
            stroke:currentColor;
            stroke-width:2;
            stroke-linecap:round;
        }

        #satori-header .cart-preview-close:hover {
            color:${SATORII_RED};
        }


        /* =====================================================
           CONTENIDO CARRITO
        ====================================================== */

        #satori-header .cart-preview-content {
            flex:1;
            min-height:0;
            overflow-y:auto;
            -webkit-overflow-scrolling:touch;
            overscroll-behavior:contain;
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
            gap:10px;
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

        #satori-header .cart-preview-quantity button:hover {
            color:${SATORII_RED};
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
            white-space:nowrap;
        }

        #satori-header .cart-preview-remove:hover {
            color:${SATORII_RED};
        }


        /* =====================================================
           CARRITO VACÍO
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
            color:${SATORII_RED};
            font-size:9px;
            font-weight:800;
            letter-spacing:2px;
        }

        #satori-header .cart-preview-empty h3 {
            margin:0;
            color:#111;
            font-family:
                "Barlow Condensed",
                "Arial Narrow",
                Arial,
                sans-serif;
            font-size:28px;
            font-weight:800;
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

        #satori-header .cart-preview-empty a:hover {
            background:${SATORII_RED};
        }


        /* =====================================================
           FOOTER CARRITO
        ====================================================== */

        #satori-header .cart-preview-footer {
            flex-shrink:0;
            padding:20px 25px 24px;
            padding-bottom:
                max(
                    24px,
                    calc(
                        24px +
                        env(safe-area-inset-bottom)
                    )
                );
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

        #satori-header .cart-preview-actions {
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            width:100%;
        }

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
            text-align:center;
        }

        #satori-header .cart-preview-view {
            background:#fff;
            color:#111;
            border:1px solid #111;
        }

        #satori-header .cart-preview-view:hover {
            background:#111;
            color:#fff;
        }

        #satori-header .cart-preview-checkout {
            background:${SATORII_RED};
            color:#fff;
            border:1px solid ${SATORII_RED};
        }

        #satori-header .cart-preview-checkout:hover {
            background:#111;
            border-color:#111;
        }

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
            color:${SATORII_RED};
        }


        /* =====================================================
           MÓVIL
        ====================================================== */

        @media (max-width:1000px) {

            #satori-header .top-message {
                display:none;
            }

            #satori-header .top-bar-inner {
                width:calc(100% - 28px);
            }

            #satori-header .top-instagram {
                left:0;
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

            #satori-header .header-search-inline {
                display:none !important;
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
            }

            #satori-header
            .mobile-menu-button span {
                display:block;
                width:23px;
                height:1.5px;
                background:#fff;
            }

            #satori-header
            .mobile-menu-button span:nth-child(2) {
                width:17px;
            }


            /* LOGO */

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
                padding-top:
                    max(
                        18px,
                        env(safe-area-inset-top)
                    );
            }

            #satori-header .cart-preview-content {
                padding:0 20px 20px;
            }

            #satori-header .cart-preview-footer {
                padding:18px 20px 22px;
                padding-bottom:
                    max(
                        22px,
                        calc(
                            22px +
                            env(safe-area-inset-bottom)
                        )
                    );
            }


            /* BUSCADOR */

            #satori-header .search-overlay {
                padding-top:
                    max(
                        82px,
                        calc(
                            env(safe-area-inset-top)
                            + 72px
                        )
                    );
                padding-left:12px;
                padding-right:12px;
                align-items:flex-start;
            }

            #satori-header .search-box {
                width:100%;
                max-width:520px;
                padding:26px 18px 20px;
                border-radius:14px;
            }

            #satori-header .search-title {
                margin-top:2px;
                margin-bottom:15px;
                font-size:12px;
                letter-spacing:1.8px;
            }

            #satori-header .search-form {
                height:50px;
                border-radius:9px;
            }

            #satori-header .search-form input {
                padding:0 13px;
                font-size:14px;
            }

            #satori-header .search-form button {
                width:54px;
            }

            #satori-header .search-close {
                top:8px;
                right:9px;
                width:34px;
                height:34px;
            }

        }


        /* =====================================================
           MÓVILES PEQUEÑOS
        ====================================================== */

        @media (max-width:430px) {

            #satori-header .shipping-message {
                font-size:9px;
            }

            #satori-header .shipping-icon {
                width:14px;
                height:14px;
            }

            #satori-header .satori-logo,
            #satori-header .satori-logo:hover,
            #satori-header .satori-logo:active,
            #satori-header .satori-logo:focus {
                font-size:28px;
            }

            #satori-header .cart-preview {
                width:92vw;
            }

            #satori-header .search-overlay {
                padding-left:10px;
                padding-right:10px;
            }

            #satori-header .search-box {
                padding:
                    25px
                    14px
                    17px;
            }

            #satori-header .cart-preview-actions {
                grid-template-columns:1fr;
                gap:8px;
            }

        }


        /* =====================================================
           FOCUS
        ====================================================== */

        #satori-header
        button:focus-visible,
        #satori-header
        a:focus-visible,
        #satori-header
        input:focus-visible {

            outline:
                2px solid ${SATORII_RED};

            outline-offset:3px;
        }


        /* =====================================================
           REDUCED MOTION
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
           REFERENCIAS
        ====================================================== */

        const mobileOpen =
            root.querySelector(
                "#satori-mobile-open"
            );

        const mobileClose =
            root.querySelector(
                "#satori-mobile-close"
            );

        const mobileMenu =
            root.querySelector(
                "#satori-mobile-menu"
            );

        const mobileOverlay =
            root.querySelector(
                "#satori-mobile-overlay"
            );


        const searchButton =
            root.querySelector(
                "#satori-search"
            );

        const searchOverlay =
            root.querySelector(
                "#satori-search-overlay"
            );

        const searchClose =
            root.querySelector(
                "#satori-search-close"
            );

        const searchInput =
            root.querySelector(
                "#satori-search-input"
            );

        const searchForm =
            root.querySelector(
                "#satori-search-form"
            );

        const inlineSearch =
            root.querySelector(
                "#satori-search-inline"
            );

        const inlineSearchInput =
            root.querySelector(
                "#satori-search-inline-input"
            );


        const cartButton =
            root.querySelector(
                "#satori-cart-button"
            );

        const cartPreview =
            root.querySelector(
                "#satori-cart-preview"
            );

        const cartOverlay =
            root.querySelector(
                "#satori-cart-overlay"
            );

        const cartClose =
            root.querySelector(
                "#satori-cart-close"
            );

        const cartContent =
            root.querySelector(
                "#satori-cart-preview-content"
            );

        const cartSubtotal =
            root.querySelector(
                "#satori-cart-preview-subtotal"
            );

        const cartCount =
            root.querySelector(
                "[data-satori-cart-count]"
            );


        const dropdowns =
            root.querySelectorAll(
                ".nav-dropdown"
            );


        /* =====================================================
           BLOQUEO DE SCROLL
        ====================================================== */

        function lockScroll() {

            document.documentElement.classList.add(
                "satori-lock-scroll"
            );

            document.body.classList.add(
                "satori-lock-scroll"
            );

        }


        function unlockScroll() {

            const mobileIsOpen =
                mobileMenu?.classList.contains(
                    "open"
                );

            const searchIsOpen =
                searchOverlay?.classList.contains(
                    "open"
                );

            const cartIsOpen =
                cartPreview?.classList.contains(
                    "open"
                );


            if (
                !mobileIsOpen &&
                !searchIsOpen &&
                !cartIsOpen
            ) {

                document.documentElement.classList.remove(
                    "satori-lock-scroll"
                );

                document.body.classList.remove(
                    "satori-lock-scroll"
                );

            }

        }


        /* =====================================================
           SCROLL HEADER
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
                    "68px";

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


        updateScrollHeader();


        /* =====================================================
           CERRAR DROPDOWNS
        ====================================================== */

        function closeDropdowns() {

            dropdowns.forEach(
                function (dropdown) {

                    dropdown.classList.remove(
                        "open"
                    );

                    const button =
                        dropdown.querySelector(
                            ".nav-dropdown-btn"
                        );

                    button?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }


        /* =====================================================
           MENÚ MÓVIL — CERRAR SUBMENÚS
        ====================================================== */

        function closeMobileSubmenus() {

            root
                .querySelectorAll(
                    ".mobile-submenu.open"
                )
                .forEach(
                    function (submenu) {

                        submenu.classList.remove(
                            "open"
                        );

                        const button =
                            root.querySelector(
                                '[data-target="' +
                                submenu.id +
                                '"]'
                            );

                        button?.classList.remove(
                            "active"
                        );

                        button?.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

        }


        /* =====================================================
           MENÚ MÓVIL — ABRIR
        ====================================================== */

        function openMobileMenu() {

            closeSearch();

            closeCart();

            closeDropdowns();

            if (!mobileMenu)
                return;


            mobileMenu.classList.add(
                "open"
            );

            mobileOverlay?.classList.add(
                "open"
            );


            mobileMenu.setAttribute(
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


            lockScroll();

        }


        /* =====================================================
           MENÚ MÓVIL — CERRAR
        ====================================================== */

        function closeMobileMenu() {

            if (!mobileMenu)
                return;


            mobileMenu.classList.remove(
                "open"
            );

            mobileOverlay?.classList.remove(
                "open"
            );


            mobileMenu.setAttribute(
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


            closeMobileSubmenus();

            unlockScroll();

        }


        mobileOpen?.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openMobileMenu();

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


        /* =====================================================
           SUBMENÚS MÓVILES
        ====================================================== */

        root
            .querySelectorAll(
                ".mobile-nav-button[data-target]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const targetId =
                                button.dataset.target;

                            const submenu =
                                root.querySelector(
                                    "#" + targetId
                                );

                            if (!submenu)
                                return;


                            const isOpen =
                                submenu.classList.contains(
                                    "open"
                                );


                            closeMobileSubmenus();


                            if (!isOpen) {

                                submenu.classList.add(
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
           DROPDOWNS DESKTOP
        ====================================================== */

        dropdowns.forEach(
            function (dropdown) {

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
                            dropdown.classList.contains(
                                "open"
                            );


                        closeDropdowns();


                        if (!isOpen) {

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
                    !root.contains(
                        event.target
                    )
                ) {

                    closeDropdowns();

                }

            }
        );


        /* =====================================================
           BUSCADOR — ABRIR
        ====================================================== */

        function openSearch() {

            closeMobileMenu();

            closeCart();

            closeDropdowns();


            if (!searchOverlay)
                return;


            searchOverlay.classList.add(
                "open"
            );


            searchOverlay.setAttribute(
                "aria-hidden",
                "false"
            );

            searchButton?.setAttribute(
                "aria-expanded",
                "true"
            );


            lockScroll();


            window.setTimeout(
                function () {

                    searchInput?.focus();

                },
                120
            );

        }


        /* =====================================================
           BUSCADOR — CERRAR
        ====================================================== */

        function closeSearch() {

            if (!searchOverlay)
                return;


            searchOverlay.classList.remove(
                "open"
            );


            searchOverlay.setAttribute(
                "aria-hidden",
                "true"
            );

            searchButton?.setAttribute(
                "aria-expanded",
                "false"
            );


            if (inlineSearch) {

                inlineSearch.classList.remove(
                    "open"
                );

            }


            unlockScroll();

        }


        searchButton?.addEventListener(
            "click",
            function () {

                const isOpen =
                    searchOverlay?.classList.contains(
                        "open"
                    );


                if (isOpen) {

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


        searchOverlay?.addEventListener(
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


        /* =====================================================
           BUSCADOR INLINE
        ====================================================== */

        inlineSearchInput?.addEventListener(
            "focus",
            function () {

                inlineSearch?.classList.add(
                    "open"
                );

            }
        );


        inlineSearchInput?.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    inlineSearchInput.blur();

                    inlineSearch?.classList.remove(
                        "open"
                    );

                    return;

                }


                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();


                    const value =
                        inlineSearchInput.value
                            .trim();


                    if (!value)
                        return;


                    performSearch(
                        value
                    );

                }

            }
        );


        /* =====================================================
           BÚSQUEDA
        ====================================================== */

        function performSearch(
            value
        ) {

            const query =
                String(value || "")
                    .trim();


            if (!query)
                return;


            const url =
                SATORIMODE_BASE +
                "productos.html?search=" +
                encodeURIComponent(
                    query
                );


            window.location.href =
                url;

        }


        searchForm?.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const value =
                    searchInput?.value
                        .trim();


                if (!value)
                    return;


                performSearch(
                    value
                );

            }
        );


        /* =====================================================
           CARRITO
        ====================================================== */

        function getCart() {

            let cart = [];


            try {

                const current =
                    localStorage.getItem(
                        CART_STORAGE_KEY
                    );

                const old =
                    localStorage.getItem(
                        OLD_CART_STORAGE_KEY
                    );


                if (current) {

                    cart =
                        JSON.parse(
                            current
                        );

                } else if (old) {

                    cart =
                        JSON.parse(
                            old
                        );


                    if (
                        Array.isArray(
                            cart
                        )
                    ) {

                        localStorage.setItem(
                            CART_STORAGE_KEY,
                            JSON.stringify(
                                cart
                            )
                        );

                    }

                }

            } catch (error) {

                console.warn(
                    "SATORII: no se pudo leer el carrito.",
                    error
                );

                cart = [];

            }


            if (!Array.isArray(cart)) {

                cart = [];

            }


            return cart;

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


                window.dispatchEvent(
                    new CustomEvent(
                        "satori-cart-updated"
                    )
                );

            } catch (error) {

                console.warn(
                    "SATORII: no se pudo guardar el carrito.",
                    error
                );

            }

        }


        /* =====================================================
           FORMATEAR PRECIO
        ====================================================== */

        function formatPrice(
            value
        ) {

            const number =
                Number(value) || 0;


            return "$" +
                number.toLocaleString(
                    "es-CL"
                );

        }


        /* =====================================================
           OBTENER PRODUCTO ACTUAL DEL CATÁLOGO
        ====================================================== */

        function getCatalogProduct(
            cartItem
        ) {

            if (
                typeof PRODUCTS ===
                "undefined" ||
                !Array.isArray(PRODUCTS)
            ) {

                return null;

            }


            const cartId =
                String(
                    cartItem?.productId ??
                    cartItem?.id ??
                    ""
                );


            if (!cartId) {

                return null;

            }


            return (
                PRODUCTS.find(
                    function (product) {

                        return String(
                            product.id
                        ) === cartId;

                    }
                ) ||
                null
            );

        }


        /* =====================================================
           DATOS ACTUALES DEL PRODUCTO
        ====================================================== */

        function getCurrentCartItemData(
            cartItem
        ) {

            const catalogProduct =
                getCatalogProduct(
                    cartItem
                );


            if (catalogProduct) {

                return {

                    ...cartItem,

                    id:
                        catalogProduct.id,

                    productId:
                        catalogProduct.id,

                    name:
                        catalogProduct.name ||
                        cartItem.name ||
                        "Producto",

                    price:
                        Number(
                            catalogProduct.price
                        ) || 0,

                    image:
                        catalogProduct.image ||
                        catalogProduct.images?.[0] ||
                        cartItem.image ||
                        "",

                    quantity:
                        Math.max(
                            1,
                            Number(
                                cartItem.quantity ??
                                cartItem.cantidad ??
                                1
                            ) || 1
                        )

                };

            }


            if (
                typeof PRODUCTS ===
                "undefined"
            ) {

                return {

                    ...cartItem,

                    price:
                        Number(
                            cartItem.price ??
                            cartItem.precio ??
                            0
                        ) || 0,

                    quantity:
                        Math.max(
                            1,
                            Number(
                                cartItem.quantity ??
                                cartItem.cantidad ??
                                1
                            ) || 1
                        )

                };

            }


            return {

                ...cartItem,

                price:0,

                quantity:
                    Math.max(
                        1,
                        Number(
                            cartItem.quantity ??
                            cartItem.cantidad ??
                            1
                        ) || 1
                    )

            };

        }


        /* =====================================================
           OBTENER CARRITO NORMALIZADO
        ====================================================== */

        function getNormalizedCart() {

            return getCart().map(
                function (cartItem) {

                    return getCurrentCartItemData(
                        cartItem
                    );

                }
            );

        }


        /* =====================================================
           CANTIDAD TOTAL
        ====================================================== */

        function getCartQuantity(
            cart
        ) {

            return cart.reduce(
                function (
                    total,
                    item
                ) {

                    const quantity =
                        Number(
                            item.quantity ??
                            item.cantidad ??
                            1
                        );


                    return total +
                        (
                            Number.isFinite(
                                quantity
                            )
                                ? quantity
                                : 1
                        );

                },
                0
            );

        }


        /* =====================================================
           SUBTOTAL
        ====================================================== */

        function getCartSubtotal(
            cart
        ) {

            return cart.reduce(
                function (
                    total,
                    item
                ) {

                    const currentItem =
                        getCurrentCartItemData(
                            item
                        );


                    const price =
                        Number(
                            currentItem.price
                        ) || 0;


                    const quantity =
                        Number(
                            currentItem.quantity
                        ) || 1;


                    return total +
                        (
                            price *
                            quantity
                        );

                },
                0
            );

        }


        /* =====================================================
           ACTUALIZAR CONTADOR
        ====================================================== */

        function updateCartCount() {

            const cart =
                getCart();


            const quantity =
                getCartQuantity(
                    cart
                );


            if (!cartCount)
                return;


            if (quantity > 0) {

                cartCount.textContent =
                    quantity;

                cartCount.style.display =
                    "flex";

            } else {

                cartCount.textContent =
                    "0";

                cartCount.style.display =
                    "none";

            }

        }


        /* =====================================================
           ESCAPAR HTML
        ====================================================== */

        function escapeHtml(
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
           RENDER CARRITO
        ====================================================== */

        function renderCart() {

            if (!cartContent)
                return;


            const rawCart =
                getCart();


            const cart =
                getNormalizedCart();


            if (!cart.length) {

                cartContent.innerHTML = `

                    <div class="cart-preview-empty">

                        <div class="cart-preview-empty-label">
                            SATORII · SHOP
                        </div>

                        <h3>
                            TU CARRITO ESTÁ VACÍO
                        </h3>

                        <p>
                            Aún no tienes productos
                            agregados a tu carrito.
                        </p>

                        <a
                            href="${SATORIMODE_BASE}productos.html"
                        >
                            EXPLORAR PRODUCTOS
                        </a>

                    </div>

                `;

            } else {

                cartContent.innerHTML =
                    cart.map(
                        function (
                            item,
                            index
                        ) {

                            const catalogProduct =
                                getCatalogProduct(
                                    rawCart[index]
                                );


                            const name =
                                catalogProduct?.name ||
                                item.name ||
                                item.nombre ||
                                "Producto";


                            const image =
                                catalogProduct?.image ||
                                catalogProduct?.images?.[0] ||
                                item.image ||
                                item.imagen ||
                                "";


                            const price =
                                Number(
                                    item.price
                                ) || 0;


                            const quantity =
                                Number(
                                    item.quantity ??
                                    item.cantidad ??
                                    1
                                ) || 1;


                            const size =
                                item.size ||
                                item.talla ||
                                "";


                            const color =
                                item.color ||
                                "";


                            let options = "";


                            if (
                                size ||
                                color
                            ) {

                                options = `

                                    <div
                                        class="cart-preview-options"
                                    >

                                        ${
                                            size
                                                ? `Talla: ${escapeHtml(size)}`
                                                : ""
                                        }

                                        ${
                                            size && color
                                                ? " · "
                                                : ""
                                        }

                                        ${
                                            color
                                                ? `Color: ${escapeHtml(color)}`
                                                : ""
                                        }

                                    </div>

                                `;

                            }


                            return `

                                <div
                                    class="cart-preview-item"
                                    data-cart-index="${index}"
                                >

                                    <div
                                        class="cart-preview-image"
                                    >

                                        ${
                                            image
                                                ?
                                                `
                                                    <img
                                                        src="${escapeHtml(image)}"
                                                        alt="${escapeHtml(name)}"
                                                        loading="lazy"
                                                    >
                                                `
                                                :
                                                ""
                                        }

                                    </div>


                                    <div
                                        class="cart-preview-info"
                                    >

                                        <h3
                                            class="cart-preview-name"
                                        >
                                            ${escapeHtml(name)}
                                        </h3>


                                        ${options}


                                        <div
                                            class="cart-preview-price"
                                        >
                                            ${formatPrice(price)}
                                        </div>


                                        <div
                                            class="cart-preview-controls"
                                        >

                                            <div
                                                class="cart-preview-quantity"
                                            >

                                                <button
                                                    type="button"
                                                    data-cart-action="minus"
                                                    data-cart-index="${index}"
                                                    aria-label="Disminuir cantidad"
                                                >
                                                    −
                                                </button>


                                                <span>
                                                    ${quantity}
                                                </span>


                                                <button
                                                    type="button"
                                                    data-cart-action="plus"
                                                    data-cart-index="${index}"
                                                    aria-label="Aumentar cantidad"
                                                >
                                                    +
                                                </button>

                                            </div>


                                            <button
                                                type="button"
                                                class="cart-preview-remove"
                                                data-cart-action="remove"
                                                data-cart-index="${index}"
                                            >
                                                ELIMINAR
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("");

            }


            const subtotal =
                getCartSubtotal(
                    cart
                );


            if (cartSubtotal) {

                cartSubtotal.textContent =
                    formatPrice(
                        subtotal
                    );

            }


            updateCartCount();

        }


        /* =====================================================
           CARRITO — ABRIR
        ====================================================== */

        function openCart() {

            closeMobileMenu();

            closeSearch();

            closeDropdowns();


            renderCart();


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


            lockScroll();

        }


        /* =====================================================
           CARRITO — CERRAR
        ====================================================== */

        function closeCart() {

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


            unlockScroll();

        }


        cartButton?.addEventListener(
            "click",
            function () {

                const isOpen =
                    cartPreview?.classList.contains(
                        "open"
                    );


                if (isOpen) {

                    closeCart();

                } else {

                    openCart();

                }

            }
        );


        cartClose?.addEventListener(
            "click",
            closeCart
        );


        cartOverlay?.addEventListener(
            "click",
            closeCart
        );


        /* =====================================================
           CONTROLES CARRITO
        ====================================================== */

        cartContent?.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "[data-cart-action]"
                    );


                if (!button)
                    return;


                const index =
                    Number(
                        button.dataset.cartIndex
                    );


                if (
                    !Number.isInteger(
                        index
                    )
                )
                    return;


                const action =
                    button.dataset.cartAction;


                const cart =
                    getCart();


                if (!cart[index])
                    return;


                const currentQuantity =
                    Number(
                        cart[index].quantity ??
                        cart[index].cantidad ??
                        1
                    ) || 1;


                if (
                    action ===
                    "plus"
                ) {

                    cart[index].quantity =
                        currentQuantity + 1;

                }


                if (
                    action ===
                    "minus"
                ) {

                    if (
                        currentQuantity <= 1
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                    } else {

                        cart[index].quantity =
                            currentQuantity - 1;

                    }

                }


                if (
                    action ===
                    "remove"
                ) {

                    cart.splice(
                        index,
                        1
                    );

                }


                saveCart(
                    cart
                );


                renderCart();

            }
        );


        /* =====================================================
           STORAGE
        ====================================================== */

        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                        CART_STORAGE_KEY ||
                    event.key ===
                        OLD_CART_STORAGE_KEY
                ) {

                    updateCartCount();


                    if (
                        cartPreview?.classList.contains(
                            "open"
                        )
                    ) {

                        renderCart();

                    }

                }

            }
        );


        /* =====================================================
           EVENTO PERSONALIZADO DEL CARRITO
        ====================================================== */

        window.addEventListener(
            "satori-cart-updated",
            function () {

                updateCartCount();


                if (
                    cartPreview?.classList.contains(
                        "open"
                    )
                ) {

                    renderCart();

                }

            }
        );


        /* =====================================================
           EVENTO DE ACTUALIZACIÓN DE PRODUCTOS
        ====================================================== */

        window.addEventListener(
            "satorii:products-updated",
            function () {

                updateCartCount();

                renderCart();

            }
        );


        /* =====================================================
           ESC
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !==
                    "Escape"
                )
                    return;


                closeMobileMenu();

                closeSearch();

                closeCart();

                closeDropdowns();

            }
        );


        /* =====================================================
           REDIMENSIONAMIENTO
        ====================================================== */

        let resizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        function () {

                            if (
                                window.innerWidth >
                                1000
                            ) {

                                closeMobileMenu();

                            }

                        },
                        100
                    );

            }
        );


        /* =====================================================
           ENLACES DEL MENÚ MÓVIL
        ====================================================== */

        root
            .querySelectorAll(
                ".mobile-nav a"
            )
            .forEach(
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
           ENLACES DEL CARRITO
        ====================================================== */

        root
            .querySelectorAll(
                ".cart-preview a"
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            closeCart();

                        }
                    );

                }
            );


        /* =====================================================
           ESTADO INICIAL
        ====================================================== */

        updateCartCount();

        renderCart();

    }


    /* =====================================================
       INICIALIZACIÓN DOM
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
