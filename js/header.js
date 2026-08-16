/* =========================================================
   SATORIMODE · HEADER GLOBAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       RUTA BASE
    ===================================================== */

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
       CONTENEDOR
    ===================================================== */

    let headerContainer =
        document.getElementById("satori-header");


    if (!headerContainer) {

        headerContainer =
            document.createElement("div");

        headerContainer.id =
            "satori-header";

        document.body.prepend(
            headerContainer
        );

    }



    /* =====================================================
       HEADER
    ===================================================== */

    headerContainer.innerHTML = `

        <!-- BARRA SUPERIOR -->

        <div class="shipping-bar">

            <span class="shipping-message">
                🚚 ENVÍOS A TODO CHILE
            </span>


            <a
                href="https://www.instagram.com/satorimode/"
                target="_blank"
                rel="noopener noreferrer"
                class="shipping-instagram"
                aria-label="Instagram de SatoriMode"
                title="Instagram"
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
                        fill="currentColor"
                        stroke="none"
                    ></circle>

                </svg>

            </a>

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
                    aria-label="SatoriMode inicio"
                >
                    SATORII
                </a>



                <!-- NAVEGACIÓN -->

                <nav
                    class="main-nav"
                    aria-label="Navegación principal"
                >


                    <a href="${siteUrl("index.html")}">
                        INICIO
                    </a>



                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            COLECCIONES
                            <span class="arrow">
                                ↓
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



                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            PRODUCTOS
                            <span class="arrow">
                                ↓
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



                    <div class="nav-dropdown">

                        <button
                            type="button"
                            class="nav-dropdown-btn"
                            aria-expanded="false"
                        >
                            AYUDA
                            <span class="arrow">
                                ↓
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



                <!-- ICONOS -->

                <div class="header-icons">


                    <!-- BUSCADOR -->

                    <div class="header-search">

                        <button
                            type="button"
                            class="search-button"
                            id="search-button"
                            aria-label="Buscar"
                            aria-expanded="false"
                            title="Buscar"
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


                        <form
                            class="search-form"
                            id="header-search-form"
                        >

                            <input
                                type="search"
                                id="header-search-input"
                                placeholder="Buscar productos..."
                                autocomplete="off"
                                aria-label="Buscar productos"
                            >

                        </form>

                    </div>



                    <!-- CUENTA -->

                    <a
                        href="${siteUrl("cuenta.html")}"
                        class="header-icon"
                        aria-label="Mi cuenta"
                        title="Mi cuenta"
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



        <!-- RESULTADOS DE BÚSQUEDA -->

        <div
            class="search-results-panel"
            id="search-results-panel"
        >

            <div class="search-results-inner">

                <div
                    class="search-empty"
                    id="search-empty"
                >
                    Busca una polera, personaje o colección.
                </div>

                <div
                    id="search-results"
                    class="search-results"
                ></div>

            </div>

        </div>



        <!-- OVERLAY MÓVIL -->

        <div
            class="mobile-menu-overlay"
            id="mobile-menu-overlay"
        ></div>



        <!-- MENÚ MÓVIL -->

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



            <nav class="mobile-nav">


                <a href="${siteUrl("index.html")}">
                    INICIO
                </a>



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
       DROPDOWNS
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(".nav-dropdown");


    function closeDropdowns() {

        dropdowns.forEach(dropdown => {

            dropdown.classList.remove("active");

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

        });

    }


    dropdowns.forEach(dropdown => {

        const button =
            dropdown.querySelector(
                ".nav-dropdown-btn"
            );

        if (!button) return;


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

    });


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
    ===================================================== */

    const searchButton =
        document.getElementById(
            "search-button"
        );

    const headerSearch =
        document.querySelector(
            ".header-search"
        );

    const searchInput =
        document.getElementById(
            "header-search-input"
        );

    const searchPanel =
        document.getElementById(
            "search-results-panel"
        );

    const searchResults =
        document.getElementById(
            "search-results"
        );

    const searchEmpty =
        document.getElementById(
            "search-empty"
        );


    function getProducts() {

        if (
            Array.isArray(
                window.PRODUCTS
            )
        ) {

            return window.PRODUCTS;

        }

        return [];

    }


    function normalizeProduct(product) {

        const name =
            product?.name ||
            product?.nombre ||
            "";

        const category =
            product?.category ||
            product?.collection ||
            product?.categoria ||
            "";

        const keywords =
            product?.keywords ||
            product?.palabras ||
            "";

        const price =
            product?.price ||
            product?.precio ||
            "";

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


        return {

            name: String(name),

            category: String(category),

            price: String(price),

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
                `${name} ${category} ${keywords}`
                    .toLowerCase()

        };

    }


    function renderSearch() {

        if (!searchInput) return;


        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!query) {

            searchResults.innerHTML = "";

            searchEmpty.style.display =
                "block";

            searchEmpty.textContent =
                "Busca una polera, personaje o colección.";

            return;

        }


        const results =
            getProducts()
                .map(normalizeProduct)
                .filter(product =>
                    product.searchText.includes(
                        query
                    )
                )
                .slice(0, 8);


        if (!results.length) {

            searchResults.innerHTML = "";

            searchEmpty.style.display =
                "block";

            searchEmpty.textContent =
                `No encontramos productos para "${query}".`;

            return;

        }


        searchEmpty.style.display =
            "none";


        searchResults.innerHTML =
            results.map(product => `

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

            `).join("");

    }


    searchButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            const isOpen =
                headerSearch.classList.contains(
                    "is-open"
                );


            if (isOpen) {

                headerSearch.classList.remove(
                    "is-open"
                );

                searchPanel.classList.remove(
                    "is-open"
                );

                searchButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                headerSearch.classList.add(
                    "is-open"
                );

                searchPanel.classList.add(
                    "is-open"
                );

                searchButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

                setTimeout(() => {

                    searchInput?.focus();

                }, 100);

            }

        }
    );


    searchInput?.addEventListener(
        "input",
        renderSearch
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


    function closeMobileMenu() {

        mobileMenu?.classList.remove(
            "is-open"
        );

        mobileOverlay?.classList.remove(
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

        document.body.style.overflow =
            "";

    }


    function openMobileMenu() {

        mobileMenu?.classList.add(
            "is-open"
        );

        mobileOverlay?.classList.add(
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

    }


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
        .querySelectorAll(
            ".mobile-nav-button"
        )
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
       CARRITO
    ===================================================== */

    function updateCartCount() {

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

    }


    updateCartCount();


    window.addEventListener(
        "storage",
        updateCartCount
    );



    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletter =
        document.getElementById(
            "footerNewsletter"
        );


    newsletter?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                document.getElementById(
                    "footerEmail"
                )?.value.trim();


            if (!email) return;


            alert(
                "¡Gracias por unirte al Clan de Satorii!"
            );

            newsletter.reset();

        }
    );



    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }

            closeDropdowns();
            closeMobileMenu();

            headerSearch?.classList.remove(
                "is-open"
            );

            searchPanel?.classList.remove(
                "is-open"
            );

        }
    );

});/* =========================================================
   SATORIMODE · HEADER GLOBAL
   =========================================================
   - Barra de envíos
   - Instagram
   - Header desktop
   - Header responsive
   - Menú móvil
   - Dropdowns
   - Buscador inline
   - Cuenta
   - Carrito
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const headerContainer =
        document.getElementById("satori-header");

    if (!headerContainer) return;


    /* =====================================================
       RUTA BASE
    ===================================================== */

    const script = document.currentScript;

    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";


    function siteUrl(path = "") {

        if (!path) return baseUrl;

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        return new URL(
            String(path).replace(/^\/+/, ""),
            baseUrl
        ).href;
    }


    /* =====================================================
       PRODUCTOS PARA EL BUSCADOR
    ===================================================== */

    const fallbackProducts = [
        {
            name: "Polera Kid Buu",
            price: "$18.990",
            image: "productos/anime/polera-kid-buu-01.PNG",
            url: "productos/anime/polera-kid-buu.html",
            category: "ANIME",
            keywords: "kid buu dragon ball"
        }
    ];


    function getProducts() {

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
    }


    function productName(product) {

        return String(
            product?.name ||
            product?.nombre ||
            "Producto Satorii"
        );
    }


    function productPrice(product) {

        const price =
            product?.price ??
            product?.precio ??
            0;

        if (
            typeof price === "string" &&
            price.includes("$")
        ) {
            return price;
        }

        return "$" +
            Number(price).toLocaleString("es-CL");
    }


    function productImage(product) {

        if (
            Array.isArray(product?.images) &&
            product.images.length
        ) {
            return product.images[0];
        }

        return (
            product?.image ||
            product?.imagen ||
            ""
        );
    }


    function productUrl(product) {

        const url =
            product?.url ||
            product?.href ||
            "productos.html";

        return siteUrl(url);
    }


    /* =====================================================
       HTML DEL HEADER
    ===================================================== */

    headerContainer.innerHTML = `

        <!-- =================================================
             BARRA SUPERIOR
        ================================================== -->

        <div class="shipping-bar">

            <span class="shipping-text">
                🚚 ENVÍOS A TODO CHILE
            </span>

            <a
                href="https://www.instagram.com/satorimode/"
                class="shipping-instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de SatoriMode"
                title="Instagram"
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
                        fill="currentColor"
                        stroke="none"
                    ></circle>

                </svg>

            </a>

        </div>


        <!-- =================================================
             HEADER PRINCIPAL
        ================================================== -->

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
                    SATORII
                </a>


                <!-- =================================================
                     NAVEGACIÓN DESKTOP
                ================================================== -->

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

                            <a href="${siteUrl("cambios.html")}">
                                CAMBIOS Y DEVOLUCIONES
                            </a>

                        </div>

                    </div>

                </nav>


                <!-- =================================================
                     ACCIONES
                ================================================== -->

                <div class="header-icons">


                    <!-- BUSCADOR -->

                    <div
                        class="header-search"
                        id="header-search"
                    >

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


                        <form
                            class="search-form"
                            id="search-form"
                            action="${siteUrl("productos.html")}"
                            method="get"
                        >

                            <input
                                type="search"
                                id="search-input"
                                name="q"
                                placeholder="Buscar productos..."
                                autocomplete="off"
                                aria-label="Buscar productos"
                            >

                        </form>


                        <div
                            class="search-results"
                            id="search-results"
                        ></div>

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


                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-collections"
                    aria-expanded="false"
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


                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-products"
                    aria-expanded="false"
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

                    <a href="${siteUrl("productos.html")}">
                        TODAS LAS POLERAS
                    </a>

                    <a href="${siteUrl("satorii-pack.html")}">
                        SATORII PACK
                    </a>

                </div>


                <button
                    type="button"
                    class="mobile-nav-button"
                    data-mobile-submenu="mobile-help"
                    aria-expanded="false"
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

                    <a href="${siteUrl("guia-tallas.html")}">
                        GUÍA DE TALLAS
                    </a>

                    <a href="${siteUrl("envios.html")}">
                        ENVÍOS
                    </a>

                    <a href="${siteUrl("preguntas-frecuentes.html")}">
                        PREGUNTAS FRECUENTES
                    </a>

                    <a href="${siteUrl("cambios.html")}">
                        CAMBIOS Y DEVOLUCIONES
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
       DROPDOWNS
    ===================================================== */

    const dropdowns =
        [
            ...headerContainer.querySelectorAll(
                ".nav-dropdown"
            )
        ];


    function closeDropdowns() {

        dropdowns.forEach(dropdown => {

            dropdown.classList.remove("active");

            const button =
                dropdown.querySelector(
                    ".nav-dropdown-btn"
                );

            button?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    }


    dropdowns.forEach(dropdown => {

        const button =
            dropdown.querySelector(
                ".nav-dropdown-btn"
            );

        if (!button) return;


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                const open =
                    dropdown.classList.contains(
                        "active"
                    );

                closeDropdowns();

                if (!open) {

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

    });


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
    ===================================================== */

    const searchBox =
        document.getElementById(
            "header-search"
        );

    const searchButton =
        document.getElementById(
            "search-button"
        );

    const searchInput =
        document.getElementById(
            "search-input"
        );

    const searchResults =
        document.getElementById(
            "search-results"
        );


    function openSearch() {

        if (!searchBox) return;

        searchBox.classList.add(
            "is-open"
        );

        searchButton?.setAttribute(
            "aria-expanded",
            "true"
        );


        setTimeout(
            () => {
                searchInput?.focus();
            },
            100
        );

    }


    function closeSearch() {

        if (!searchBox) return;

        searchBox.classList.remove(
            "is-open"
        );

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

    }


    searchButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            if (
                searchBox.classList.contains(
                    "is-open"
                )
            ) {

                closeSearch();

            } else {

                openSearch();

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

                searchResults.innerHTML = "";

                return;

            }


            const results =
                getProducts()
                    .filter(product => {

                        const name =
                            productName(
                                product
                            ).toLowerCase();

                        const category =
                            String(
                                product?.category ||
                                product?.collection ||
                                product?.categoria ||
                                ""
                            ).toLowerCase();

                        const keywords =
                            String(
                                product?.keywords ||
                                product?.palabras ||
                                ""
                            ).toLowerCase();

                        return (
                            name.includes(query) ||
                            category.includes(query) ||
                            keywords.includes(query)
                        );

                    })
                    .slice(0, 6);


            if (!results.length) {

                searchResults.innerHTML = `

                    <div class="search-empty">
                        No encontramos productos para
                        "${query}".
                    </div>

                `;

                return;

            }


            searchResults.innerHTML =
                results
                    .map(product => {

                        const image =
                            productImage(
                                product
                            );


                        return `

                            <a
                                href="${productUrl(product)}"
                                class="search-result"
                            >

                                ${
                                    image
                                        ? `
                                            <img
                                                src="${siteUrl(image)}"
                                                alt="${productName(product)}"
                                            >
                                          `
                                        : ""
                                }

                                <span>

                                    <strong>
                                        ${productName(product)}
                                    </strong>

                                    <small>
                                        ${productPrice(product)}
                                    </small>

                                </span>

                            </a>

                        `;

                    })
                    .join("");

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".header-search"
                )
            ) {

                closeSearch();

            }

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


    function openMobileMenu() {

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

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMobileMenu() {

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

        document.body.classList.remove(
            "menu-open"
        );

    }


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
        headerContainer.querySelectorAll(
            ".mobile-nav-button"
        );


    mobileButtons.forEach(button => {

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


                headerContainer
                    .querySelectorAll(
                        ".mobile-submenu"
                    )
                    .forEach(menu => {

                        menu.classList.remove(
                            "is-open"
                        );

                    });


                headerContainer
                    .querySelectorAll(
                        ".mobile-nav-button"
                    )
                    .forEach(other => {

                        other.classList.remove(
                            "is-open"
                        );

                        other.setAttribute(
                            "aria-expanded",
                            "false"
                        );

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

                }

            }
        );

    });


    /* =====================================================
       CONTADOR CARRITO
    ===================================================== */

    const cartCount =
        document.getElementById(
            "cart-count"
        );


    function updateCartCount() {

        if (!cartCount) return;


        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "satoriCart"
                    ) || "[]"
                );

        } catch {

            cart = [];

        }


        const total =
            cart.reduce(
                (sum, item) => {

                    return sum +
                        Number(
                            item.quantity || 1
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

});
