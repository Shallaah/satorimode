/* =========================================================
   SATORIMODE · HEADER GLOBAL
   ---------------------------------------------------------
   RESPONSABILIDADES:
   - Barra superior
   - Header desktop
   - Header móvil
   - Dropdowns
   - Menú móvil
   - Buscador
   - Contador del carrito
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       RUTA BASE
    ====================================================== */

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";


    function siteUrl(path = "") {

        if (!path) {
            return baseUrl;
        }

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        return new URL(
            path.replace(/^\/+/, ""),
            baseUrl
        ).href;

    }



    /* =====================================================
       PRODUCTOS
       Usa PRODUCTS desde products.js
    ====================================================== */

    const productos = Array.isArray(window.PRODUCTS)
        ? window.PRODUCTS
        : [];



    /* =====================================================
       HEADER CONTAINER
    ====================================================== */

    let headerContainer =
        document.getElementById("satori-header");


    if (!headerContainer) {

        headerContainer =
            document.createElement("div");

        headerContainer.id =
            "satori-header";

        document.body.insertBefore(
            headerContainer,
            document.body.firstChild
        );

    }



    /* =====================================================
       HTML DEL HEADER
    ====================================================== */

    headerContainer.innerHTML = `

        <!-- ===============================================
             BARRA SUPERIOR
        ================================================ -->

        <div class="shipping-bar">
            🚚 ENVÍOS A TODO CHILE
        </div>



        <!-- ===============================================
             HEADER
        ================================================ -->

        <header class="site-header">

            <div class="header-inner">


                <!-- MENÚ MÓVIL -->

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



                <!-- LOGO -->

                <a
                    href="${siteUrl("index.html")}"
                    class="brand-logo"
                    aria-label="SatoriMode inicio"
                >

                    <img
                        src="${siteUrl("logo.png")}"
                        alt="SatoriMode"
                    >

                </a>



                <!-- =======================================
                     NAVEGACIÓN DESKTOP
                ======================================== -->

                <nav
                    class="main-nav"
                    aria-label="Navegación principal"
                >


                    <a
                        href="${siteUrl("index.html")}"
                    >
                        INICIO
                    </a>



                    <!-- COLECCIONES -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            COLECCIONES
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

                        </div>

                    </div>



                    <!-- PRODUCTOS -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            PRODUCTOS
                            <span class="arrow">⌄</span>
                        </button>


                        <div class="dropdown-menu">

                            <a
                                href="${siteUrl("productos.html")}"
                            >
                                TODAS LAS POLERAS
                            </a>

                            <a
                                href="${siteUrl("satorii-pack.html")}"
                            >
                                SATORII PACK
                            </a>

                        </div>

                    </div>



                    <!-- AYUDA -->

                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            AYUDA
                            <span class="arrow">⌄</span>
                        </button>


                        <div class="dropdown-menu">

                            <a
                                href="${siteUrl("guia-tallas.html")}"
                            >
                                GUÍA DE TALLAS
                            </a>

                            <a
                                href="${siteUrl("envios.html")}"
                            >
                                ENVÍOS
                            </a>

                            <a
                                href="${siteUrl("preguntas-frecuentes.html")}"
                            >
                                PREGUNTAS FRECUENTES
                            </a>

                        </div>

                    </div>


                </nav>



                <!-- =======================================
                     ICONOS
                ======================================== -->

                <div class="header-icons">


                    <!-- BUSCADOR -->

                    <button
                        type="button"
                        class="header-icon search-button"
                        id="search-button"
                        aria-label="Buscar"
                        title="Buscar"
                        aria-expanded="false"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="10.8"
                                cy="10.8"
                                r="6.2"
                            ></circle>

                            <path
                                d="M15.5 15.5 21 21"
                            ></path>

                        </svg>

                    </button>



                    <!-- CUENTA -->

                    <a
                        href="${siteUrl("cuenta.html")}"
                        class="header-icon"
                        aria-label="Cuenta"
                        title="Cuenta"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

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
                        href="${siteUrl("carrito.html")}"
                        class="header-icon cart-header-icon"
                        aria-label="Carrito"
                        title="Carrito"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >

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


                        <span
                            class="cart-count"
                            id="cart-count"
                        >
                            0
                        </span>

                    </a>


                </div>

            </div>

        </header>



        <!-- ===============================================
             BUSCADOR
        ================================================ -->

        <div
            class="search-overlay"
            id="search-overlay"
            aria-hidden="true"
        >

            <div
                class="search-box"
                role="dialog"
                aria-label="Buscar productos"
            >


                <div class="search-input-wrapper">


                    <svg
                        class="search-input-icon-svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <circle
                            cx="10.8"
                            cy="10.8"
                            r="6.2"
                        ></circle>

                        <path
                            d="M15.5 15.5 21 21"
                        ></path>

                    </svg>



                    <input
                        type="search"
                        id="product-search"
                        class="search-input"
                        placeholder="Buscar productos..."
                        autocomplete="off"
                        aria-label="Buscar productos"
                    >



                    <button
                        type="button"
                        id="search-close"
                        class="search-close"
                        aria-label="Cerrar búsqueda"
                    >
                        ×
                    </button>


                </div>



                <div
                    class="search-results"
                    id="search-results"
                >

                    <div class="search-empty">
                        Busca una polera, personaje o colección.
                    </div>

                </div>


            </div>

        </div>



        <!-- ===============================================
             OVERLAY MENÚ MÓVIL
        ================================================ -->

        <div
            class="mobile-menu-overlay"
            id="mobile-menu-overlay"
        ></div>



        <!-- ===============================================
             MENÚ MÓVIL
        ================================================ -->

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

                    <img
                        src="${siteUrl("logo.png")}"
                        alt="SatoriMode"
                    >

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



            <nav
                class="mobile-nav"
                aria-label="Navegación móvil"
            >


                <a
                    href="${siteUrl("index.html")}"
                >
                    INICIO
                </a>



                <!-- COLECCIONES -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-collections"
                    aria-expanded="false"
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
                    id="mobile-collections"
                >

                    <a href="${siteUrl("anime.html")}">
                        ANIME
                    </a>

                    <a href="${siteUrl("streetwear.html")}">
                        STREETWEAR
                    </a>

                    <a href="${siteUrl("accesorios.html")}">
                        ACCESORIOS
                    </a>

                </div>



                <!-- PRODUCTOS -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-products"
                    aria-expanded="false"
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
                    id="mobile-products"
                >

                    <a href="${siteUrl("productos.html")}">
                        TODAS LAS POLERAS
                    </a>

                    <a href="${siteUrl("satorii-pack.html")}">
                        SATORII PACK
                    </a>

                </div>



                <!-- AYUDA -->

                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-help"
                    aria-expanded="false"
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
                    id="mobile-help"
                >

                    <a href="${siteUrl("guia-tallas.html")}">
                        GUÍA DE TALLAS
                    </a>

                    <a href="${siteUrl("envios.html")}">
                        ENVÍOS
                    </a>

                    <a href="${siteUrl("preguntas-frecuentes.html")}">
                        PREGUNTAS FRECUENTES
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



    /* =====================================================
       ICONOS SVG
    ====================================================== */

    if (
        !document.getElementById(
            "satori-header-icons-style"
        )
    ) {

        const style =
            document.createElement("style");


        style.id =
            "satori-header-icons-style";


        style.textContent = `

            .header-icon svg {

                width: 18px;
                height: 18px;

                fill: none;

                stroke: currentColor;

                stroke-width: 1.7;

                stroke-linecap: round;
                stroke-linejoin: round;

            }


            .search-input-icon-svg {

                width: 20px;
                height: 20px;

                fill: none;

                stroke: #111;

                stroke-width: 1.8;

                stroke-linecap: round;
                stroke-linejoin: round;

                flex: 0 0 auto;

            }


            .search-button {

                border: 0;

                background: transparent;

                padding: 0;

                cursor: pointer;

            }


            .header-icons .header-icon {

                text-decoration: none;

            }


            @media (max-width: 700px) {

                .header-icon svg {

                    width: 17px;
                    height: 17px;

                }

            }

        `;


        document.head.appendChild(style);

    }



    /* =====================================================
       DROPDOWNS DESKTOP
    ====================================================== */

    const dropdowns =
        [
            ...document.querySelectorAll(
                ".nav-dropdown"
            )
        ];


    function closeDropdowns() {

        dropdowns.forEach(
            dropdown => {

                dropdown.classList.remove(
                    "active"
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


    dropdowns.forEach(
        dropdown => {

            const button =
                dropdown.querySelector(
                    ".nav-dropdown-btn"
                );


            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    const isOpen =
                        dropdown.classList.contains(
                            "active"
                        );


                    closeDropdowns();


                    if (!isOpen) {

                        dropdown.classList.add(
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


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".nav-dropdown"
                )
            ) {

                closeDropdowns();

            }

        }
    );



    /* =====================================================
       BUSCADOR
    ====================================================== */

    const searchButton =
        document.getElementById(
            "search-button"
        );


    const searchOverlay =
        document.getElementById(
            "search-overlay"
        );


    const searchInput =
        document.getElementById(
            "product-search"
        );


    const searchClose =
        document.getElementById(
            "search-close"
        );


    const searchResults =
        document.getElementById(
            "search-results"
        );



    function renderSearchMessage(
        message
    ) {

        if (!searchResults) {
            return;
        }


        searchResults.innerHTML = `

            <div class="search-empty">
                ${message}
            </div>

        `;

    }



    function getProductName(product) {

        return (
            product.name ||
            product.nombre ||
            "Producto Satorii"
        );

    }



    function getProductImage(product) {

        if (
            Array.isArray(product.images) &&
            product.images.length
        ) {

            return product.images[0];

        }


        return (
            product.image ||
            product.imagen ||
            ""
        );

    }



    function getProductPrice(product) {

        if (
            typeof product.price === "number"
        ) {

            return "$" +
                product.price.toLocaleString(
                    "es-CL"
                );

        }


        if (product.precio) {

            return product.precio;

        }


        return "";

    }



    function getProductUrl(product) {

        if (product.url) {

            return siteUrl(
                product.url
            );

        }


        if (product.href) {

            return siteUrl(
                product.href
            );

        }


        return siteUrl(
            "productos.html"
        );

    }



    function openSearch() {

        if (!searchOverlay) {
            return;
        }


        searchOverlay.classList.add(
            "active"
        );


        searchOverlay.classList.add(
            "is-open"
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


        document.body.style.overflow =
            "hidden";


        setTimeout(
            () => {

                if (searchInput) {

                    searchInput.focus();

                }

            },
            80
        );

    }



    function closeSearch() {

        if (!searchOverlay) {
            return;
        }


        searchOverlay.classList.remove(
            "active"
        );


        searchOverlay.classList.remove(
            "is-open"
        );


        searchOverlay.setAttribute(
            "aria-hidden",
            "true"
        );


        if (searchButton) {

            searchButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        document.body.style.overflow =
            "";


        if (searchInput) {

            searchInput.value = "";

        }


        renderSearchMessage(
            "Busca una polera, personaje o colección."
        );

    }



    if (searchButton) {

        searchButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                openSearch();

            }
        );

    }



    if (searchClose) {

        searchClose.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeSearch();

            }
        );

    }



    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            event => {

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
       BÚSQUEDA REAL
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                if (!query) {

                    renderSearchMessage(
                        "Busca una polera, personaje o colección."
                    );

                    return;

                }


                const results =
                    productos.filter(
                        product => {

                            if (!product) {
                                return false;
                            }


                            const name =
                                getProductName(
                                    product
                                )
                                .toLowerCase();


                            const category =
                                String(
                                    product.category ||
                                    product.collection ||
                                    product.categoria ||
                                    ""
                                )
                                .toLowerCase();


                            const id =
                                String(
                                    product.id ||
                                    ""
                                )
                                .toLowerCase();


                            return (
                                name.includes(
                                    query
                                ) ||

                                category.includes(
                                    query
                                ) ||

                                id.includes(
                                    query
                                )
                            );

                        }
                    );



                if (!results.length) {

                    renderSearchMessage(
                        `No encontramos productos para "${query}".`
                    );

                    return;

                }



                searchResults.innerHTML =
                    results
                        .slice(0, 8)
                        .map(
                            product => {

                                const image =
                                    getProductImage(
                                        product
                                    );


                                return `

                                    <a
                                        href="${getProductUrl(product)}"
                                        class="search-result"
                                    >

                                        ${
                                            image
                                                ? `
                                                    <img
                                                        src="${siteUrl(image)}"
                                                        alt="${getProductName(product)}"
                                                        class="search-result-image"
                                                    >
                                                  `
                                                : ""
                                        }


                                        <span
                                            class="search-result-info"
                                        >

                                            <span
                                                class="search-result-name"
                                            >
                                                ${getProductName(product)}
                                            </span>


                                            <span
                                                class="search-result-price"
                                            >
                                                ${getProductPrice(product)}
                                            </span>

                                        </span>

                                    </a>

                                `;

                            }
                        )
                        .join("");

            }
        );

    }



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



    function openMobileMenu() {

        if (!mobileMenu) {
            return;
        }


        mobileMenu.classList.add(
            "is-open"
        );


        mobileMenu.classList.add(
            "active"
        );


        if (mobileOverlay) {

            mobileOverlay.classList.add(
                "is-open"
            );


            mobileOverlay.classList.add(
                "active"
            );

        }


        if (mobileButton) {

            mobileButton.classList.add(
                "is-open"
            );


            mobileButton.classList.add(
                "active"
            );


            mobileButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }



    function closeMobileMenu() {

        if (!mobileMenu) {
            return;
        }


        mobileMenu.classList.remove(
            "is-open"
        );


        mobileMenu.classList.remove(
            "active"
        );


        if (mobileOverlay) {

            mobileOverlay.classList.remove(
                "is-open"
            );


            mobileOverlay.classList.remove(
                "active"
            );

        }


        if (mobileButton) {

            mobileButton.classList.remove(
                "is-open"
            );


            mobileButton.classList.remove(
                "active"
            );


            mobileButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }



    if (mobileButton) {

        mobileButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    mobileMenu &&
                    (
                        mobileMenu.classList.contains(
                            "is-open"
                        ) ||
                        mobileMenu.classList.contains(
                            "active"
                        )
                    );


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }



    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }



    if (mobileOverlay) {

        mobileOverlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }



    /* =====================================================
       SUBMENÚS MÓVILES
    ====================================================== */

    document
        .querySelectorAll(
            ".mobile-nav-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        const submenu =
                            document.getElementById(
                                button.dataset.mobileSubmenu
                            );


                        if (!submenu) {
                            return;
                        }


                        const wasOpen =
                            submenu.classList.contains(
                                "is-open"
                            );


                        document
                            .querySelectorAll(
                                ".mobile-submenu"
                            )
                            .forEach(
                                menu => {

                                    menu.classList.remove(
                                        "is-open"
                                    );


                                    menu.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        document
                            .querySelectorAll(
                                ".mobile-nav-button"
                            )
                            .forEach(
                                btn => {

                                    btn.classList.remove(
                                        "is-open"
                                    );


                                    btn.classList.remove(
                                        "active"
                                    );


                                    btn.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );


                                    const arrow =
                                        btn.querySelector(
                                            ".arrow"
                                        );


                                    if (arrow) {

                                        arrow.textContent =
                                            "↓";

                                    }

                                }
                            );


                        if (!wasOpen) {

                            submenu.classList.add(
                                "is-open"
                            );


                            submenu.classList.add(
                                "active"
                            );


                            button.classList.add(
                                "is-open"
                            );


                            button.classList.add(
                                "active"
                            );


                            button.setAttribute(
                                "aria-expanded",
                                "true"
                            );


                            const arrow =
                                button.querySelector(
                                    ".arrow"
                                );


                            if (arrow) {

                                arrow.textContent =
                                    "↑";

                            }

                        }

                    }
                );

            }
        );



    /* =====================================================
       CERRAR MENÚ AL NAVEGAR
    ====================================================== */

    document
        .querySelectorAll(
            ".mobile-menu a"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

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


        if (!cartCount) {
            return;
        }


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
            cart.reduce(
                (sum, product) => {

                    return (
                        sum +
                        (
                            Number(
                                product.quantity
                            ) || 0
                        )
                    );

                },
                0
            );


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



    /* =====================================================
       ESC
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            closeDropdowns();

            closeSearch();

            closeMobileMenu();

        }
    );


});
