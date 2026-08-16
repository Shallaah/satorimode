/* =========================================================
   SATORIMODE · HEADER GLOBAL
   Una sola fuente de verdad para:
   - Barra superior
   - Header desktop/móvil
   - Dropdowns
   - Menú móvil
   - Buscador
   - Contador del carrito
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const script = document.currentScript;
    const baseUrl = script
        ? new URL("../", script.src).href
        : "/satorimode/";

    const productos = [
        {
            nombre: "Polera Kid Buu",
            precio: "$18.990",
            imagen: `${baseUrl}productos/anime/polera-kid-buu-01.PNG`,
            url: `${baseUrl}productos/anime/polera-kid-buu.html`,
            palabras: "polera kid buu anime dragon ball"
        }
    ];

    let headerContainer = document.getElementById("satori-header");

    if (!headerContainer) {
        headerContainer = document.createElement("div");
        headerContainer.id = "satori-header";
        document.body.insertBefore(headerContainer, document.body.firstChild);
    }

    headerContainer.innerHTML = `
        <div class="shipping-bar">ENVÍOS A TODO CHILE · SATORIMODE</div>

        <header class="site-header">
            <div class="header-inner">

                <button
                    type="button"
                    class="mobile-menu-button"
                    id="mobile-menu-button"
                    aria-label="Abrir menú"
                    aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>

                <a href="${baseUrl}index.html" class="brand-logo" aria-label="SatoriMode inicio">
                    <img src="${baseUrl}logo.png" alt="SatoriMode">
                </a>

                <nav class="main-nav" aria-label="Navegación principal">
                    <a href="${baseUrl}index.html">INICIO</a>

                    <div class="nav-dropdown">
                        <button type="button" class="nav-dropdown-btn" aria-expanded="false">
                            COLECCIONES <span class="arrow">⌄</span>
                        </button>
                        <div class="dropdown-menu">
                            <a href="${baseUrl}anime.html">ANIME</a>
                            <a href="${baseUrl}streetwear.html">STREETWEAR</a>
                            <a href="${baseUrl}accesorios.html">ACCESORIOS</a>
                        </div>
                    </div>

                    <div class="nav-dropdown">
                        <button type="button" class="nav-dropdown-btn" aria-expanded="false">
                            PRODUCTOS <span class="arrow">⌄</span>
                        </button>
                        <div class="dropdown-menu">
                            <a href="${baseUrl}productos.html">TODAS LAS POLERAS</a>
                            <a href="${baseUrl}satorii-pack.html">SATORII PACK</a>
                        </div>
                    </div>

                    <div class="nav-dropdown">
                        <button type="button" class="nav-dropdown-btn" aria-expanded="false">
                            AYUDA <span class="arrow">⌄</span>
                        </button>
                        <div class="dropdown-menu">
                            <a href="${baseUrl}guia-tallas.html">GUÍA DE TALLAS</a>
                            <a href="${baseUrl}envios.html">ENVÍOS</a>
                            <a href="${baseUrl}preguntas-frecuentes.html">PREGUNTAS FRECUENTES</a>
                        </div>
                    </div>
                </nav>

                <div class="header-icons">
                    <button type="button" class="header-icon search-button" id="search-button" aria-label="Buscar" title="Buscar">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"></circle><path d="M15.5 15.5 21 21"></path></svg>
                    </button>

                    <a href="${baseUrl}cuenta.html" class="header-icon" aria-label="Cuenta" title="Cuenta">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"></circle><path d="M5.5 20c.8-3.7 3-5.5 6.5-5.5s5.7 1.8 6.5 5.5"></path></svg>
                    </a>

                    <a href="${baseUrl}carrito.html" class="header-icon cart-header-icon" aria-label="Carrito" title="Carrito">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h2l1.4 9.2a2 2 0 0 0 2 1.7h7.2a2 2 0 0 0 2-1.7L20 8H7"></path><circle cx="10" cy="19.5" r="1"></circle><circle cx="17" cy="19.5" r="1"></circle></svg>
                        <span class="cart-count" id="cart-count">0</span>
                    </a>
                </div>
            </div>
        </header>

        <div class="search-overlay" id="search-overlay" aria-hidden="true">
            <div class="search-box" role="dialog" aria-label="Buscar productos">
                <div class="search-input-wrapper">
                    <svg class="search-input-icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"></circle><path d="M15.5 15.5 21 21"></path></svg>
                    <input type="search" id="search-input" class="search-input" placeholder="Buscar productos..." autocomplete="off">
                    <button type="button" id="search-close" class="search-close" aria-label="Cerrar búsqueda">×</button>
                </div>
                <div class="search-results" id="search-results">
                    <div class="search-empty">Busca una polera, personaje o colección.</div>
                </div>
            </div>
        </div>

        <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>

        <aside class="mobile-menu" id="mobile-menu" aria-hidden="true">
            <div class="mobile-menu-header">
                <a href="${baseUrl}index.html" class="mobile-menu-logo">
                    <img src="${baseUrl}logo.png" alt="SatoriMode">
                </a>
                <button type="button" class="mobile-menu-close" id="mobile-menu-close" aria-label="Cerrar menú">×</button>
            </div>

            <nav class="mobile-nav" aria-label="Navegación móvil">
                <a href="${baseUrl}index.html">INICIO</a>

                <button type="button" class="mobile-nav-button" data-mobile-submenu="mobile-collections" aria-expanded="false">
                    <span>COLECCIONES</span><span class="arrow">↓</span>
                </button>
                <div class="mobile-submenu" id="mobile-collections">
                    <a href="${baseUrl}anime.html">ANIME</a>
                    <a href="${baseUrl}streetwear.html">STREETWEAR</a>
                    <a href="${baseUrl}accesorios.html">ACCESORIOS</a>
                </div>

                <button type="button" class="mobile-nav-button" data-mobile-submenu="mobile-products" aria-expanded="false">
                    <span>PRODUCTOS</span><span class="arrow">↓</span>
                </button>
                <div class="mobile-submenu" id="mobile-products">
                    <a href="${baseUrl}productos.html">TODAS LAS POLERAS</a>
                    <a href="${baseUrl}satorii-pack.html">SATORII PACK</a>
                </div>

                <button type="button" class="mobile-nav-button" data-mobile-submenu="mobile-help" aria-expanded="false">
                    <span>AYUDA</span><span class="arrow">↓</span>
                </button>
                <div class="mobile-submenu" id="mobile-help">
                    <a href="${baseUrl}guia-tallas.html">GUÍA DE TALLAS</a>
                    <a href="${baseUrl}envios.html">ENVÍOS</a>
                    <a href="${baseUrl}preguntas-frecuentes.html">PREGUNTAS FRECUENTES</a>
                </div>
            </nav>

            <div class="mobile-social">
                <span>SÍGUENOS</span>
                <a href="https://www.instagram.com/satorimode/" target="_blank" rel="noopener">INSTAGRAM ↗</a>
            </div>
        </aside>
    `;

    /* Header icon styling */
    if (!document.getElementById("satori-header-icons-style")) {
        const style = document.createElement("style");
        style.id = "satori-header-icons-style";
        style.textContent = `
            .header-icon svg { width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round; }
            .search-input-icon-svg { width:20px; height:20px; fill:none; stroke:#111; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; flex:0 0 auto; }
            .search-button { border:0; background:transparent; padding:0; }
            .header-icons .header-icon { text-decoration:none; }
            @media (max-width:700px){ .header-icon svg{width:17px;height:17px;} }
        `;
        document.head.appendChild(style);
    }

    const dropdowns = [...document.querySelectorAll(".nav-dropdown")];

    function closeDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("active");
            const btn = dropdown.querySelector(".nav-dropdown-btn");
            if (btn) btn.setAttribute("aria-expanded", "false");
        });
    }

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(".nav-dropdown-btn");
        btn.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            const open = dropdown.classList.contains("active");
            closeDropdowns();
            if (!open) {
                dropdown.classList.add("active");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".nav-dropdown")) closeDropdowns();
    });

    /* Search */
    const searchButton = document.getElementById("search-button");
    const searchOverlay = document.getElementById("search-overlay");
    const searchInput = document.getElementById("search-input");
    const searchClose = document.getElementById("search-close");
    const searchResults = document.getElementById("search-results");

    function renderSearchMessage(message) {
        searchResults.innerHTML = `<div class="search-empty">${message}</div>`;
    }

    function openSearch() {
        searchOverlay.classList.add("is-open");
        searchOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        setTimeout(() => searchInput.focus(), 80);
    }

    function closeSearch() {
        searchOverlay.classList.remove("is-open");
        searchOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        searchInput.value = "";
        renderSearchMessage("Busca una polera, personaje o colección.");
    }

    searchButton.addEventListener("click", event => {
        event.stopPropagation();
        openSearch();
    });
    searchClose.addEventListener("click", closeSearch);
    searchOverlay.addEventListener("click", event => {
        if (event.target === searchOverlay) closeSearch();
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            renderSearchMessage("Busca una polera, personaje o colección.");
            return;
        }

        const results = productos.filter(producto =>
            `${producto.nombre} ${producto.palabras}`.toLowerCase().includes(query)
        );

        if (!results.length) {
            renderSearchMessage(`No encontramos productos para "${query}".`);
            return;
        }

        searchResults.innerHTML = results.map(producto => `
            <a href="${producto.url}" class="search-result">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="search-result-image">
                <span class="search-result-info">
                    <span class="search-result-name">${producto.nombre}</span>
                    <span class="search-result-price">${producto.precio}</span>
                </span>
            </a>
        `).join("");
    });

    /* Mobile menu */
    const mobileButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileClose = document.getElementById("mobile-menu-close");
    const mobileOverlay = document.getElementById("mobile-menu-overlay");

    function closeMobileMenu() {
        mobileMenu.classList.remove("is-open");
        mobileOverlay.classList.remove("is-open");
        mobileButton.classList.remove("is-open");
        mobileButton.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    mobileButton.addEventListener("click", () => {
        const open = mobileMenu.classList.contains("is-open");
        if (open) {
            closeMobileMenu();
        } else {
            mobileMenu.classList.add("is-open");
            mobileOverlay.classList.add("is-open");
            mobileButton.classList.add("is-open");
            mobileButton.setAttribute("aria-expanded", "true");
            mobileMenu.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    });

    mobileClose.addEventListener("click", closeMobileMenu);
    mobileOverlay.addEventListener("click", closeMobileMenu);

    document.querySelectorAll(".mobile-nav-button").forEach(button => {
        button.addEventListener("click", () => {
            const submenu = document.getElementById(button.dataset.mobileSubmenu);
            const wasOpen = submenu.classList.contains("is-open");

            document.querySelectorAll(".mobile-submenu").forEach(menu => menu.classList.remove("is-open"));
            document.querySelectorAll(".mobile-nav-button").forEach(btn => {
                btn.classList.remove("is-open");
                btn.setAttribute("aria-expanded", "false");
                const arrow = btn.querySelector(".arrow");
                if (arrow) arrow.textContent = "↓";
            });

            if (!wasOpen) {
                submenu.classList.add("is-open");
                button.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
                const arrow = button.querySelector(".arrow");
                if (arrow) arrow.textContent = "↑";
            }
        });
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        if (!cartCount) return;

        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem("satoriCart")) || [];
        } catch {
            cart = [];
        }

        const total = cart.reduce((sum, product) => sum + (Number(product.quantity) || 0), 0);
        cartCount.textContent = total;
        cartCount.style.display = total > 0 ? "flex" : "none";
    }

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        closeDropdowns();
        closeSearch();
        closeMobileMenu();
    });
});
