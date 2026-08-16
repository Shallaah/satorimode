(function () {
    "use strict";

    function initSatoriiHeader() {

        /* =====================================================
           ELIMINAR HEADER ANTERIOR
        ===================================================== */

        const oldHeader = document.getElementById("satori-header");

        if (oldHeader) {
            oldHeader.remove();
        }

        const oldStyle = document.getElementById("satori-header-style");

        if (oldStyle) {
            oldStyle.remove();
        }


        /* =====================================================
           HEADER
        ===================================================== */

        const root = document.createElement("div");

        root.id = "satori-header";

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
                    class="satori-logo"
                >
                    SATORII
                </a>


                <!-- =================================================
                     NAV DESKTOP
                ================================================== -->

                <nav class="main-nav">


                    <!-- INICIO -->

                    <button
                        class="nav-home-button"
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

                            <span>COLECCIONES</span>

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


                    <!-- PRODUCTOS -->

                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                        >

                            <span>PRODUCTOS</span>

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


                    <!-- AYUDA -->

                    <div class="nav-dropdown">

                        <button
                            class="nav-dropdown-btn"
                            type="button"
                        >

                            <span>AYUDA</span>

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
                        href="cuenta.html"
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

                    <a
                        class="header-icon"
                        href="carrito.html"
                        aria-label="Carrito"
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

                    </a>

                </div>

            </div>

        </header>


        <!-- =================================================
             OVERLAY
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
                    class="mobile-menu-logo"
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

                <button
                    class="mobile-nav-button mobile-home-button"
                    id="mobile-home"
                    type="button"
                >

                    <span>
                        INICIO
                    </span>

                </button>


                <!-- COLECCIONES -->

                <button
                    class="mobile-nav-button"
                    data-target="mobile-collections"
                    type="button"
                >

                    <span>
                        COLECCIONES
                    </span>

                    <span>
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
                >

                    <span>
                        PRODUCTOS
                    </span>

                    <span>
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
                >

                    <span>
                        AYUDA
                    </span>

                    <span>
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
                >
                    INSTAGRAM ↗
                </a>

            </div>

        </aside>

        `;


        document.body.prepend(root);


        /* =====================================================
           CSS
        ===================================================== */

        const style = document.createElement("style");

        style.id = "satori-header-style";

        style.textContent = `

        /* =====================================================
           BASE
        ===================================================== */

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
           TOP BAR
        ===================================================== */

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


        /* INSTAGRAM */

        #satori-header .top-instagram {

            position:absolute;

            left:20px;

            top:50%;

            transform:
                translateY(-50%);

            width:17px;

            height:17px;

            color:#fff;

            display:flex;

            align-items:center;

            justify-content:center;

            text-decoration:none;

        }


        #satori-header .top-instagram svg {

            width:16px;

            height:16px;

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


        /* TEXTO CENTRAL */

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
           HEADER
        ===================================================== */

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
           LOGO
        ===================================================== */

        #satori-header .satori-logo {

            grid-column:1;

            justify-self:start;

            color:#111;

            text-decoration:none;

            font-size:25px;

            line-height:1;

            font-weight:700;

            font-style:italic;

            letter-spacing:-2px;

            transform:skewX(-5deg);

        }


        /* =====================================================
           NAV
        ===================================================== */

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

            cursor:pointer;

            display:flex;

            align-items:center;

            gap:5px;

        }


        #satori-header .nav-arrow {

            font-size:9px;

            transform:
                translateY(-1px);

        }


        #satori-header .nav-dropdown {

            position:relative;

            height:100%;

            display:flex;

            align-items:center;

        }


        /* =====================================================
           DROPDOWN
        ===================================================== */

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

            border-radius:10px;

            box-shadow:
                0 15px 35px
                rgba(0,0,0,.12);

            opacity:0;

            visibility:hidden;

            pointer-events:none;

            transition:.2s ease;

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

            border-radius:6px;

        }


        #satori-header .dropdown-menu a:hover {

            background:#f5f5f5;

            color:#f31218;

        }


        /* =====================================================
           ICONOS DESKTOP
        ===================================================== */

        #satori-header .header-icons {

            grid-column:3;

            justify-self:end;

            display:flex;

            align-items:center;

            gap:5px;

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


        #satori-header .header-icon svg {

            width:17px;

            height:17px;

            fill:none;

            stroke:currentColor;

            stroke-width:1.6;

            stroke-linecap:round;

            stroke-linejoin:round;

        }


        #satori-header .header-icon:hover {

            color:#f31218;

        }


        /* =====================================================
           HAMBURGUESA
        ===================================================== */

        #satori-header .mobile-menu-button {

            display:none;

        }


        /* =====================================================
           OVERLAY
        ===================================================== */

        #satori-header .mobile-menu-overlay {

            position:fixed;

            inset:0;

            background:
                rgba(0,0,0,.45);

            opacity:0;

            visibility:hidden;

            pointer-events:none;

            transition:.2s ease;

            z-index:110000;

        }


        #satori-header
        .mobile-menu-overlay.open {

            opacity:1;

            visibility:visible;

            pointer-events:auto;

        }


        /* =====================================================
           MENÚ MÓVIL
        ===================================================== */

        #satori-header .mobile-menu {

            position:fixed;

            top:0;

            left:0;

            width:min(370px,88vw);

            height:100dvh;

            padding:
                20px 24px;

            background:#fff;

            transform:
                translateX(-100%);

            transition:
                transform .25s ease;

            z-index:110001;

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

            color:#111;

            text-decoration:none;

            font-size:25px;

            font-weight:700;

            font-style:italic;

            letter-spacing:-2px;

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


        /* =====================================================
           NAV MÓVIL
        ===================================================== */

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

        }


        #satori-header .mobile-home-button {

            justify-content:flex-start;

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
        ===================================================== */

        #satori-header .mobile-social {

            margin-top:35px;

        }


        #satori-header .mobile-social span {

            display:block;

            margin-bottom:15px;

            color:#f31218;

            font-size:10px;

            font-weight:bold;

            letter-spacing:3px;

        }


        #satori-header .mobile-social a {

            color:#111;

            text-decoration:none;

            font-size:14px;

            font-weight:bold;

        }


        /* =====================================================
           SCROLL DESKTOP
        ===================================================== */

        @media (min-width:1001px) {

            #satori-header.scrolled .main-header {

                position:fixed !important;

                top:10px !important;

                left:12px !important;

                width:
                    calc(100% - 24px) !important;

                height:70px !important;

                border:
                    1px solid #d7d7d7 !important;

                border-radius:16px !important;

                box-shadow:
                    0 10px 30px
                    rgba(0,0,0,.14) !important;

                z-index:999999 !important;

            }


            #satori-header.scrolled {

                padding-bottom:70px;

            }

        }


        /* =====================================================
           MÓVIL
        ===================================================== */

        @media (max-width:1000px) {

            #satori-header .top-bar {

                height:32px;

            }


            #satori-header .top-bar-inner {

                width:100%;

            }


            /* INSTAGRAM */

            #satori-header .top-instagram {

                left:14px;

                width:17px;

                height:17px;

            }


            /* CENTRAR ENVÍOS */

            #satori-header .shipping-message {

                left:50%;

                transform:
                    translate(-50%,-50%);

                font-size:10px;

            }


            #satori-header .top-message {

                display:none;

            }


            /* HEADER */

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
            ================================================= */

            #satori-header .mobile-menu-button {

                position:absolute !important;

                left:14px !important;

                top:50% !important;

                transform:
                    translateY(-50%) !important;

                width:34px !important;

                height:34px !important;

                margin:0 !important;

                padding:5px !important;

                border:0 !important;

                background:transparent !important;

                display:flex !important;

                flex-direction:column !important;

                justify-content:center !important;

                align-items:flex-start !important;

                gap:5px !important;

                cursor:pointer !important;

                z-index:999999 !important;

            }


            #satori-header
            .mobile-menu-button span {

                display:block !important;

                width:22px !important;

                height:1.5px !important;

                min-height:1.5px !important;

                max-height:1.5px !important;

                margin:0 !important;

                padding:0 !important;

                background:#111 !important;

                border:0 !important;

                border-radius:0 !important;

                opacity:1 !important;

                visibility:visible !important;

                flex:none !important;

            }


            /* =================================================
               LOGO
            ================================================= */

            #satori-header .satori-logo {

                position:absolute !important;

                left:50% !important;

                top:50% !important;

                transform:
                    translate(-50%,-50%)
                    skewX(-5deg) !important;

                margin:0 !important;

                padding:0 !important;

                font-size:24px !important;

                line-height:1 !important;

                z-index:999998 !important;

            }


            /* =================================================
               OCULTAR NAV DESKTOP
            ================================================= */

            #satori-header .main-nav {

                display:none !important;

            }


            /* =================================================
               ICONOS
            ================================================= */

            #satori-header .header-icons {

                position:absolute !important;

                right:7px !important;

                top:50% !important;

                transform:
                    translateY(-50%) !important;

                display:flex !important;

                align-items:center !important;

                gap:1px !important;

                z-index:999999 !important;

            }


            #satori-header .header-icon {

                width:32px !important;

                height:32px !important;

            }


            #satori-header .header-icon svg {

                width:17px !important;

                height:17px !important;

                stroke-width:1.5 !important;

            }


            /* =================================================
               HEADER AL HACER SCROLL
            ================================================= */

            #satori-header.scrolled .main-header {

                position:fixed !important;

                top:8px !important;

                left:8px !important;

                width:
                    calc(100% - 16px) !important;

                height:64px !important;

                border:
                    1px solid #d7d7d7 !important;

                border-radius:16px !important;

                box-shadow:
                    0 8px 25px
                    rgba(0,0,0,.16) !important;

                z-index:999999 !important;

            }


            #satori-header.scrolled {

                padding-bottom:64px !important;

            }

        }

        `;


        document.head.appendChild(style);


        /* =====================================================
           SCROLL
        ===================================================== */

        function updateScrollHeader() {

            const mainHeader =
                root.querySelector(".main-header");

            if (!mainHeader) {
                return;
            }


            if (window.scrollY > 50) {

                root.classList.add("scrolled");

                mainHeader.style.position =
                    "fixed";

                mainHeader.style.zIndex =
                    "999999";


                if (window.innerWidth <= 1000) {

                    mainHeader.style.top =
                        "8px";

                    mainHeader.style.left =
                        "8px";

                    mainHeader.style.width =
                        "calc(100% - 16px)";

                } else {

                    mainHeader.style.top =
                        "10px";

                    mainHeader.style.left =
                        "12px";

                    mainHeader.style.width =
                        "calc(100% - 24px)";

                }

            } else {

                root.classList.remove("scrolled");

                mainHeader.style.position =
                    "relative";

                mainHeader.style.top = "";

                mainHeader.style.left = "";

                mainHeader.style.width = "";

                mainHeader.style.zIndex = "";

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
           INICIO
        ===================================================== */

        const desktopHome =
            root.querySelector(
                ".nav-home-button"
            );


        if (desktopHome) {

            desktopHome.addEventListener(
                "click",
                function () {

                    window.scrollTo({
                        top:0,
                        behavior:"smooth"
                    });

                }
            );

        }


        const mobileHome =
            document.getElementById(
                "mobile-home"
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


        /* =====================================================
           DROPDOWNS PC
        ===================================================== */

        root.querySelectorAll(
            ".nav-dropdown"
        ).forEach(
            function (dropdown) {

                const button =
                    dropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


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
            function () {

                root.querySelectorAll(
                    ".nav-dropdown"
                ).forEach(
                    function (dropdown) {

                        dropdown.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );


        /* =====================================================
           MENÚ MÓVIL
        ===================================================== */

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


        function openMobileMenu() {

            mobileMenu.classList.add(
                "open"
            );

            overlay.classList.add(
                "open"
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


        /* =====================================================
           SUBMENÚS MÓVILES
        ===================================================== */

        root.querySelectorAll(
            ".mobile-nav-button"
        ).forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const targetId =
                            button.dataset.target;


                        if (!targetId) {
                            return;
                        }


                        const target =
                            document.getElementById(
                                targetId
                            );


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


                        if (!isOpen) {

                            target.classList.add(
                                "open"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           ESC
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       INICIAR
    ===================================================== */

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
