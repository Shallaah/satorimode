/* =========================================================
   SATORIMODE · HEADER GLOBAL
   ---------------------------------------------------------
   - Barra superior
   - Header desktop
   - Header móvil
   - Logo SATORII
   - Dropdowns
   - Buscador inline
   - Menú móvil
   - Instagram
   - Contador del carrito
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       RUTA BASE
    ===================================================== */

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";

    const siteUrl = (path = "") => {

        if (!path) {
            return baseUrl;
        }

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        return new URL(
            String(path).replace(/^\/+/, ""),
            baseUrl
        ).href;
    };


    /* =====================================================
       PRODUCTOS
    ===================================================== */

    const fallbackProducts = [
        {
            name: "Polera Kid Buu",
            price: 18990,
            image: "productos/anime/polera-kid-buu-01.PNG",
            url: "productos/anime/polera-kid-buu.html",
            category: "anime",
            keywords: "polera kid buu dragon ball anime"
        }
    ];


    const getProducts = () => {

        const sources = [
            window.PRODUCTS,
            window.satoriProducts,
            window.SATORI_PRODUCTS,
            window.products
        ];

        for (const source of sources) {

            if (
                Array.isArray(source) &&
                source.length
            ) {
                return source;
            }

        }

        return fallbackProducts;
    };


    /* =====================================================
       CONTENEDOR
    ===================================================== */

    const headerContainer =
        document.getElementById("satori-header");

    if (!headerContainer) {
        return;
    }


    /* =====================================================
       HTML DEL HEADER
    ===================================================== */

    headerContainer.innerHTML = `

        <!-- =================================================
             BARRA SUPERIOR
        ================================================== -->

        <div class="shipping-bar">

            <span class="shipping-icon">🚚</span>

            <strong>
                ENVÍOS A TODO CHILE
            </strong>

        </div>


        <!-- =================================================
             HEADER PRINCIPAL
        ================================================== -->

        <header class="site-header">

            <div class="header-inner">


                <!-- =================================================
                     MENÚ MÓVIL
                ================================================== -->

                <button
                    type="button"
                    class="mobile-menu-button"
                    id="mobile-menu-button"
                    aria-label="Abrir menú"
                    aria-expanded="false"
                    aria-controls="mobile-menu"
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </button>


                <!-- =================================================
                     LOGO
                ================================================== -->

                <a
                    href="${siteUrl("index.html")}"
                    class="brand-logo"
                    aria-label="SatoriMode - Inicio"
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

                            <span class="arrow">
                                ⌄
                            </span>

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

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div class="dropdown-menu">

                            <a href="${siteUrl("productos.html")}">
                                TODAS LAS POLERAS
                            </a>

                            <a href="${siteUrl("satorii-pack.html")}">
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

                            <span class="arrow">
                                ⌄
                            </span>

                        </button>


                        <div class="dropdown-menu">

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

                    </div>

                </nav>


                <!-- =================================================
                     ACCIONES DEL HEADER
                ================================================== -->

                <div class="header-actions">


                    <!-- BUSCADOR -->

                    <div class="header-search">

                        <button
                            type="button"
                            class="header-icon search-button"
                            id="search-button"
                            aria-label="Buscar productos"
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


                        <div
                            class="header-search-box"
                            id="header-search-box"
                        >

                            <input
                                type="search"
                                id="search-input"
                                placeholder="Buscar productos..."
                                autocomplete="off"
                                aria-label="Buscar productos"
                            >


                            <button
                                type="button"
                                id="search-close"
                                aria-label="Cerrar búsqueda"
                            >
                                ×
                            </button>


                            <div
                                class="header-search-results"
                                id="search-results"
                            ></div>

                        </div>

                    </div>


                    <!-- CUENTA -->

                    <a
                        href="${siteUrl("cuenta.html")}"
                        class="header-icon"
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


        <!-- =================================================
             OVERLAY MENÚ MÓVIL
        ================================================== -->

        <div
            class="mobile-menu-overlay"
            id="mobile-menu-overlay"
        ></div>


        <!-- =================================================
             MENÚ MÓVIL
        ================================================== -->

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


            <nav
                class="mobile-nav"
                aria-label="Navegación móvil"
            >

                <a href="${siteUrl("index.html")}">
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
       DROPDOWNS DESKTOP
    ===================================================== */

    const dropdowns =
        [...document.querySelectorAll(".nav-dropdown")];


    const closeDropdowns = () => {

        dropdowns.forEach(dropdown => {

            dropdown.classList.remove("active");

            const button =
                dropdown.querySelector(".nav-dropdown-btn");

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    };


    dropdowns.forEach(dropdown => {

        const button =
            dropdown.querySelector(".nav-dropdown-btn");

        if (!button) return;


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                const wasOpen =
                    dropdown.classList.contains("active");

                closeDropdowns();

                if (!wasOpen) {

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
        event => {

            if (
                !event.target.closest(".nav-dropdown")
            ) {
                closeDropdowns();
            }

        }
    );


    /* =====================================================
       BUSCADOR INLINE
    ===================================================== */

    const searchButton =
        document.getElementById("search-button");

    const searchBox =
        document.getElementById("header-search-box");

    const searchInput =
        document.getElementById("search-input");

    const searchClose =
        document.getElementById("search-close");

    const searchResults =
        document.getElementById("search-results");


    const renderSearchMessage = message => {

        if (!searchResults) return;

        searchResults.innerHTML = `
            <div class="search-empty">
                ${message}
            </div>
        `;

    };


    const normalizeProduct = product => {

        const name =
            product?.name ||
            product?.nombre ||
            "Producto Satori";


        const priceRaw =
            product?.price ??
            product?.precio ??
            0;


        const price =
            typeof priceRaw === "number"
                ? `$${priceRaw.toLocaleString("es-CL")}`
                : String(priceRaw);


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


        const keywords =
            product?.keywords ||
            product?.palabras ||
            "";


        const category =
            product?.category ||
            product?.categoria ||
            "";


        return {

            name,
            price,

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
                `${name} ${keywords} ${category}`
                    .toLowerCase()

        };

    };


    const openSearch = () => {

        if (!searchBox) return;

        searchBox.classList.add("is-open");

        searchButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        renderSearchMessage(
            "Busca una polera, personaje o colección."
        );

        setTimeout(
            () => searchInput?.focus(),
            100
        );

    };


    const closeSearch = () => {

        if (!searchBox) return;

        searchBox.classList.remove("is-open");

        searchButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        if (searchInput) {
            searchInput.value = "";
        }

        if (searchResults) {
            searchResults.innerHTML = "";
        }

    };


    searchButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            if (
                searchBox.classList.contains("is-open")
            ) {

                closeSearch();

            } else {

                openSearch();

            }

        }
    );


    searchClose?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            closeSearch();

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(".header-search")
            ) {

                closeSearch();

            }

        }
    );


    searchInput?.addEventListener(
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
                getProducts()
                    .map(normalizeProduct)
                    .filter(product =>
                        product.searchText.includes(query)
                    )
                    .slice(0, 8);


            if (!results.length) {

                renderSearchMessage(
                    `No encontramos productos para "${query}".`
                );

                return;

            }


            searchResults.innerHTML =
                results
                    .map(product => `

                        <a
                            href="${product.url}"
                            class="search-result"
                        >

                            ${
                                product.image
                                    ? `
                                        <img
                                            src="${product.image}"
                                            alt="${product.name}"
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
                                    ${product.name}
                                </span>

                                <span
                                    class="search-result-price"
                                >
                                    ${product.price}
                                </span>

                            </span>

                        </a>

                    `)
                    .join("");

        }
    );


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

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


    const closeMobileMenu = () => {

        mobileMenu?.classList.remove("is-open");

        mobileOverlay?.classList.remove(
            "is-open"
        );

        mobileButton?.classList.remove(
            "is-open"
        );

        mobileButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    };


    const openMobileMenu = () => {

        mobileMenu?.classList.add(
            "is-open"
        );

        mobileOverlay?.classList.add(
            "is-open"
        );

        mobileButton?.classList.add(
            "is-open"
        );

        mobileButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    };


    mobileButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            if (
                mobileMenu?.classList.contains(
                    "is-open"
                )
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


    /* =====================================================
       SUBMENÚS MÓVILES
    ===================================================== */

    const mobileButtons =
        document.querySelectorAll(
            ".mobile-nav-button"
        );


    mobileButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

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
                    .querySelectorAll(
                        ".mobile-submenu"
                    )
                    .forEach(menu => {

                        menu.classList.remove(
                            "is-open"
                        );

                    });


                document
                    .querySelectorAll(
                        ".mobile-nav-button"
                    )
                    .forEach(otherButton => {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        otherButton.classList.remove(
                            "is-open"
                        );

                    });


                if (!wasOpen) {

                    submenu.classList.add(
                        "is-open"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    button.classList.add(
                        "is-open"
                    );

                }

            }
        );

    });


    document
        .querySelectorAll(
            ".mobile-menu a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =====================================================
       CONTADOR DEL CARRITO
    ===================================================== */

    const updateCartCount = () => {

        const cartCount =
            document.getElementById(
                "cart-count"
            );

        if (!cartCount) return;


        try {

            const cart =
                JSON.parse(
                    localStorage.getItem(
                        "satoriCart"
                    )
                ) || [];


            let total = 0;


            if (Array.isArray(cart)) {

                cart.forEach(item => {

                    total +=
                        Number(
                            item.quantity ??
                            item.cantidad ??
                            1
                        );

                });

            }


            cartCount.textContent =
                total > 99
                    ? "99+"
                    : total;


            cartCount.classList.toggle(
                "has-items",
                total > 0
            );

        } catch {

            cartCount.textContent = "0";

        }

    };


    updateCartCount();


    window.addEventListener(
        "storage",
        updateCartCount
    );

});
