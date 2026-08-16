/* =========================================================
   SATORIMODE · HEADER GLOBAL
   - Barra de envíos
   - Header desktop / móvil
   - Dropdowns
   - Buscador
   - Menú móvil
   - Contador del carrito
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";

    const siteUrl = (path) => {
        if (!path) return baseUrl;

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        return `${baseUrl}${String(path).replace(/^\/+/, "")}`;
    };

    const headerContainer = document.getElementById("satori-header");

    if (!headerContainer) return;


    /* =====================================================
       PRODUCTOS DE RESPALDO PARA EL BUSCADOR
    ===================================================== */

    const fallbackProducts = [
        {
            name: "Polera Kid Buu",
            price: 18990,
            image: "productos/anime/polera-kid-buu-01.PNG",
            url: "productos/anime/polera-kid-buu.html",
            category: "anime"
        }
    ];


    const getProducts = () => {

        const candidates = [
            window.satoriProducts,
            window.SATORI_PRODUCTS,
            window.products,
            window.PRODUCTS
        ];

        for (const candidate of candidates) {

            if (Array.isArray(candidate) && candidate.length) {
                return candidate;
            }

        }

        return fallbackProducts;
    };


    /* =====================================================
       HEADER
    ===================================================== */

    headerContainer.innerHTML = `

        <!-- BARRA SUPERIOR -->

        <div class="shipping-bar">
            🚚 ENVÍOS A TODO CHILE
        </div>


        <!-- HEADER PRINCIPAL -->

        <header class="site-header">

            <div class="header-inner">


                <!-- MENÚ MÓVIL -->

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


                <!-- LOGO -->

                <a
                    href="${siteUrl("index.html")}"
                    class="brand-logo"
                    aria-label="SatoriMode - Inicio"
                >
                    <img
                        src="${siteUrl("logo.png")}"
                        alt="SatoriMode"
                    >
                </a>


                <!-- NAVEGACIÓN DESKTOP -->

                <nav
                    class="main-nav"
                    aria-label="Navegación principal"
                >

                    <a href="${siteUrl("index.html")}">
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
                            <span class="arrow">⌄</span>
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


                <!-- ICONOS -->

                <div class="header-icons">


                    <!-- BUSCADOR -->

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


                    <!-- CUENTA -->

                    <a
                        href="${siteUrl("cuenta.html")}"
                        class="header-icon"
                        aria-label="Cuenta"
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
             BUSCADOR
        ================================================== -->

        <div
            class="search-overlay"
            id="search-overlay"
            aria-hidden="true"
        >

            <div
                class="search-box"
                role="dialog"
                aria-modal="true"
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
                        id="search-input"
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


        <!-- =================================================
             MENÚ MÓVIL
        ================================================== -->

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
       DROPDOWNS DESKTOP
    ===================================================== */

    const dropdowns = [
        ...document.querySelectorAll(".nav-dropdown")
    ];


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


        button.addEventListener("click", event => {

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

        });

    });


    document.addEventListener("click", event => {

        if (!event.target.closest(".nav-dropdown")) {
            closeDropdowns();
        }

    });


    /* =====================================================
       BUSCADOR
    ===================================================== */

    const searchButton =
        document.getElementById("search-button");

    const searchOverlay =
        document.getElementById("search-overlay");

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

        if (!searchOverlay) return;

        searchOverlay.classList.add("is-open");

        searchOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        searchButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            searchInput?.focus();

        }, 80);

    };


    const closeSearch = () => {

        if (!searchOverlay) return;

        searchOverlay.classList.remove("is-open");

        searchOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        searchButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";

        if (searchInput) {
            searchInput.value = "";
        }

        renderSearchMessage(
            "Busca una polera, personaje o colección."
        );

    };


    searchButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            openSearch();

        }
    );


    searchClose?.addEventListener(
        "click",
        closeSearch
    );


    searchOverlay?.addEventListener(
        "click",
        event => {

            if (event.target === searchOverlay) {
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

                            <span class="search-result-info">

                                <span class="search-result-name">
                                    ${product.name}
                                </span>

                                <span class="search-result-price">
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

        mobileMenu?.classList.remove(
            "is-open"
        );

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

    document
        .querySelectorAll(".mobile-nav-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

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
                        .forEach(btn => {

                            btn.classList.remove(
                                "is-open"
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

        });


    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =====================================================
       CARRITO
    ===================================================== */

    const updateCartCount = () => {

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
                    (sum, item) =>
                        sum +
                        (
                            Number(
                                item.quantity
                            ) || 0
                        ),
                    0
                )
                : 0;


        cartCount.textContent =
            total;


        cartCount.style.display =
            total > 0
                ? "flex"
                : "none";

    };


    updateCartCount();


    window.addEventListener(
        "storage",
        updateCartCount
    );


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            closeDropdowns();
            closeSearch();
            closeMobileMenu();

        }
    );

});
