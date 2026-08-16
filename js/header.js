document.addEventListener("DOMContentLoaded", function () {

    const headerContainer = document.getElementById("satori-header");

    if (!headerContainer) return;

    headerContainer.innerHTML = `
        <div class="shipping-bar">
            🚚 ENVÍOS A TODO CHILE
        </div>

        <header class="main-header">

            <div class="header-inner">

                <!-- LOGO -->
                <a href="index.html" class="satori-logo">
                    SATORII
                </a>

                <!-- NAVEGACIÓN PC -->
                <nav class="desktop-nav">

                    <a href="index.html">INICIO</a>

                    <div class="nav-dropdown">
                        <button type="button">
                            COLECCIONES
                            <span>⌄</span>
                        </button>

                        <div class="dropdown-menu">
                            <a href="anime.html">Anime</a>
                            <a href="streetwear.html">Streetwear</a>
                            <a href="accesorios.html">Accesorios</a>
                        </div>
                    </div>

                    <div class="nav-dropdown">
                        <button type="button">
                            PRODUCTOS
                            <span>⌄</span>
                        </button>

                        <div class="dropdown-menu">
                            <a href="productos.html">Todos los productos</a>
                            <a href="poleras.html">Poleras</a>
                            <a href="accesorios.html">Accesorios</a>
                        </div>
                    </div>

                    <div class="nav-dropdown">
                        <button type="button">
                            AYUDA
                            <span>⌄</span>
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

                <!-- ACCIONES -->
                <div class="header-actions">

                    <!-- BUSCADOR -->
                    <div class="header-search">

                        <button
                            type="button"
                            class="search-toggle"
                            aria-label="Buscar"
                            aria-expanded="false"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="11" cy="11" r="6.5"></circle>
                                <path d="M16 16L21 21"></path>
                            </svg>
                        </button>

                        <form
                            class="search-form"
                            action="productos.html"
                            method="get"
                        >
                            <input
                                type="search"
                                name="q"
                                placeholder="Buscar productos..."
                                autocomplete="off"
                                aria-label="Buscar productos"
                            >
                        </form>

                    </div>

                    <!-- USUARIO -->
                    <a
                        href="cuenta.html"
                        class="header-icon"
                        aria-label="Mi cuenta"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="8" r="3.5"></circle>
                            <path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6"></path>
                        </svg>
                    </a>

                    <!-- CARRITO -->
                    <a
                        href="carrito.html"
                        class="header-icon"
                        aria-label="Carrito"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 5h2l1.5 10h10L20 8H7"></path>
                            <circle cx="10" cy="19" r="1.3"></circle>
                            <circle cx="17" cy="19" r="1.3"></circle>
                        </svg>
                    </a>

                    <!-- MENÚ MÓVIL -->
                    <button
                        type="button"
                        class="mobile-menu-toggle"
                        aria-label="Abrir menú"
                        aria-expanded="false"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>

            </div>

        </header>

        <!-- MENÚ MÓVIL -->

        <div class="mobile-overlay"></div>

        <aside class="mobile-menu">

            <div class="mobile-menu-header">

                <a href="index.html" class="mobile-logo">
                    SATORII
                </a>

                <button
                    type="button"
                    class="mobile-menu-close"
                    aria-label="Cerrar menú"
                >
                    ×
                </button>

            </div>

            <nav class="mobile-nav">

                <a href="index.html">
                    INICIO
                </a>

                <details>
                    <summary>
                        COLECCIONES
                        <span>↓</span>
                    </summary>

                    <a href="anime.html">Anime</a>
                    <a href="streetwear.html">Streetwear</a>
                    <a href="accesorios.html">Accesorios</a>
                </details>

                <details>
                    <summary>
                        PRODUCTOS
                        <span>↓</span>
                    </summary>

                    <a href="productos.html">Todos los productos</a>
                    <a href="poleras.html">Poleras</a>
                    <a href="accesorios.html">Accesorios</a>
                </details>

                <details>
                    <summary>
                        AYUDA
                        <span>↓</span>
                    </summary>

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

                </details>

            </nav>

            <div class="mobile-social">

                <span>SÍGUENOS</span>

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
       BUSCADOR
       ===================================================== */

    const searchBox = headerContainer.querySelector(".header-search");
    const searchToggle = headerContainer.querySelector(".search-toggle");
    const searchInput = headerContainer.querySelector(".search-form input");

    searchToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = searchBox.classList.toggle("is-open");

        searchToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        if (isOpen) {
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        }

    });


    /* Cerrar buscador al hacer clic afuera */

    document.addEventListener("click", function (event) {

        if (!searchBox.contains(event.target)) {

            searchBox.classList.remove("is-open");

            searchToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       MENÚ MÓVIL
       ===================================================== */

    const mobileToggle =
        headerContainer.querySelector(".mobile-menu-toggle");

    const mobileMenu =
        headerContainer.querySelector(".mobile-menu");

    const mobileOverlay =
        headerContainer.querySelector(".mobile-overlay");

    const mobileClose =
        headerContainer.querySelector(".mobile-menu-close");


    function openMobileMenu() {

        mobileMenu.classList.add("is-open");
        mobileOverlay.classList.add("is-open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");

    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("is-open");
        mobileOverlay.classList.remove("is-open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    }


    mobileToggle.addEventListener(
        "click",
        openMobileMenu
    );

    mobileClose.addEventListener(
        "click",
        closeMobileMenu
    );

    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );


    /* Cerrar menú cuando se selecciona un enlace */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =====================================================
       DROPDOWNS PC
       ===================================================== */

    document
        .querySelectorAll(".nav-dropdown > button")
        .forEach(button => {

            button.addEventListener("click", function () {

                const dropdown =
                    this.parentElement;

                document
                    .querySelectorAll(".nav-dropdown")
                    .forEach(item => {

                        if (item !== dropdown) {
                            item.classList.remove("active");
                        }

                    });

                dropdown.classList.toggle("active");

            });

        });


    /* Cerrar dropdown al hacer clic afuera */

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".nav-dropdown")) {

            document
                .querySelectorAll(".nav-dropdown")
                .forEach(item => {
                    item.classList.remove("active");
                });

        }

    });

});

/* =========================================================
   SATORIMODE - AJUSTE FINAL HEADER + FOOTER + ESCALA
   ========================================================= */


/* =========================================================
   HEADER MÁS BAJO
   ========================================================= */

.main-header {
    height: 64px;
}

.header-inner {
    min-height: 64px;
    height: 64px;

    width: min(1200px, calc(100% - 48px));

    margin: 0 auto;
}


/* LOGO */

.satori-logo {
    font-size: 30px;
}


/* NAVEGACIÓN */

.desktop-nav {
    gap: 38px;
}

.desktop-nav > a,
.nav-dropdown > button {
    height: 64px;

    font-size: 12px;
}


/* ICONOS */

.header-actions {
    gap: 17px;
}

.header-icon {
    width: 27px;
    height: 27px;
}

.header-icon svg {
    width: 20px;
    height: 20px;
}


/* BUSCADOR */

.search-toggle {
    width: 34px;
    height: 34px;
}

.search-toggle svg {
    width: 20px;
    height: 20px;
}


/* =========================================================
   ANCHO GENERAL DE LA TIENDA
   ========================================================= */

.home-redesign {
    width: min(1200px, calc(100% - 48px));

    margin-left: auto;
    margin-right: auto;
}


/* =========================================================
   HERO
   ========================================================= */

.store-hero {
    width: 100%;

    border: 1px solid #d8d8d8;

    border-radius: 0 0 6px 6px;

    overflow: hidden;
}


/* =========================================================
   BENEFICIOS
   ========================================================= */

.store-benefits {
    width: 100%;

    border: 1px solid #d8d8d8;

    border-top: 0;

    border-radius: 0 0 6px 6px;
}


/* =========================================================
   SECCIONES
   ========================================================= */

.store-section {
    width: 100%;
}


/* Títulos un poco más grandes */

.store-section-head h2 {
    font-size: 18px;
    letter-spacing: -.2px;
}

.store-section-head a {
    font-size: 11px;
}


/* =========================================================
   COLECCIONES
   ========================================================= */

.collection-showcase-grid {
    gap: 8px;
}

.collection-showcase {
    min-height: 210px;

    border: 1px solid #d0d0d0;

    border-radius: 5px;

    overflow: hidden;
}


/* =========================================================
   PRODUCTOS
   ========================================================= */

.store-product-grid {
    gap: 14px;
}


/* =========================================================
   BLOQUE INFERIOR
   ========================================================= */

.store-lower-grid {
    gap: 10px;
}

.store-latest,
.store-brand-card,
.store-clan-card {
    border: 1px solid #d8d8d8;

    border-radius: 5px;

    overflow: hidden;
}


/* =========================================================
   FOOTER COMPLETO
   ========================================================= */

.site-footer {
    width: 100%;

    margin-top: 55px;

    background: #080808;

    color: #fff;

    border-top: 1px solid #151515;
}


/* CONTENEDOR PRINCIPAL DEL FOOTER */

.footer-main {
    width: min(1200px, calc(100% - 48px));

    margin: 0 auto;

    padding: 58px 0 50px;

    display: grid;

    grid-template-columns:
        1.35fr
        1fr
        1fr
        1.65fr;

    column-gap: 70px;

    align-items: start;
}


/* =========================================================
   MARCA FOOTER
   ========================================================= */

.footer-brand {
    min-width: 0;
}

.footer-brand h3 {
    margin: 0 0 18px;

    color: #fff;

    font-size: 25px;

    font-weight: 800;

    letter-spacing: -.5px;
}

.footer-brand p {
    max-width: 260px;

    margin: 0;

    color: #aaa;

    font-size: 12px;

    line-height: 1.7;
}


/* =========================================================
   COLUMNAS
   ========================================================= */

.footer-column {
    min-width: 0;
}

.footer-column h4 {
    margin: 0 0 22px;

    color: #fff;

    font-size: 11px;

    font-weight: 800;

    letter-spacing: 1.5px;
}

.footer-column a {
    display: block;

    width: fit-content;

    margin-bottom: 14px;

    color: #aaa;

    font-size: 11px;

    line-height: 1.4;

    text-decoration: none;

    transition:
        color .2s ease,
        transform .2s ease;
}

.footer-column a:hover {
    color: #fff;

    transform: translateX(3px);
}


/* =========================================================
   INSTAGRAM
   ========================================================= */

.footer-social {
    display: flex;

    flex-direction: column;
}

.footer-instagram {
    width: 44px;
    height: 44px;

    display: flex;

    align-items: center;
    justify-content: center;

    margin-top: 2px;

    border: 1px solid #555;

    border-radius: 50%;

    color: #fff;

    text-decoration: none;

    transition:
        border-color .2s ease,
        background .2s ease;
}

.footer-instagram:hover {
    border-color: #fff;

    background: #151515;
}

.footer-instagram svg {
    width: 20px;
    height: 20px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.5;
}


/* =========================================================
   CLAN / NEWSLETTER
   ========================================================= */

.footer-community {
    min-width: 0;
}

.footer-community .store-eyebrow {
    display: block;

    margin-bottom: 10px;

    color: #ff1717;

    font-size: 9px;

    font-weight: 900;

    letter-spacing: 3px;
}

.footer-community h2 {
    margin: 0 0 12px;

    color: #fff;

    font-size: 25px;

    line-height: 1.05;

    font-weight: 900;
}

.footer-community h2 strong {
    color: #ff1717;
}

.footer-community p {
    max-width: 380px;

    margin: 0 0 20px;

    color: #aaa;

    font-size: 11px;

    line-height: 1.6;
}


/* =========================================================
   FORMULARIO FOOTER
   ========================================================= */

.footer-newsletter {
    width: 100%;

    max-width: 390px;

    display: flex;

    align-items: stretch;
}

.footer-newsletter input {
    flex: 1;

    min-width: 0;

    height: 44px;

    padding: 0 14px;

    border: 1px solid #ddd;

    border-right: 0;

    border-radius: 4px 0 0 4px;

    outline: none;

    background: #fff;

    color: #111;

    font-family: inherit;

    font-size: 11px;
}

.footer-newsletter input:focus {
    border-color: #ff1717;
}

.footer-newsletter button {
    width: 50px;

    height: 44px;

    border: 0;

    border-radius: 0 4px 4px 0;

    background: #ff1717;

    color: #fff;

    font-size: 18px;

    cursor: pointer;

    transition: background .2s ease;
}

.footer-newsletter button:hover {
    background: #d90000;
}


/* =========================================================
   FOOTER INFERIOR
   ========================================================= */

.footer-bottom {
    width: min(1200px, calc(100% - 48px));

    margin: 0 auto;

    padding: 18px 0 24px;

    border-top: 1px solid #242424;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    color: #777;

    font-size: 9px;
}

.footer-bottom span:last-child {
    text-align: right;
}


/* =========================================================
   BORDES / ESQUINAS
   ========================================================= */

.store-hero,
.store-benefits,
.collection-showcase,
.store-latest,
.store-brand-card,
.store-clan-card,
.store-pack {
    border: 1px solid #d8d8d8;

    border-radius: 5px;

    overflow: hidden;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 950px) {

    .header-inner {
        width: calc(100% - 36px);
    }

    .home-redesign {
        width: calc(100% - 36px);
    }

    .footer-main {
        width: calc(100% - 36px);

        grid-template-columns:
            1fr
            1fr;

        gap: 45px;
    }

    .footer-bottom {
        width: calc(100% - 36px);
    }

}


/* =========================================================
   MÓVIL
   ========================================================= */

@media (max-width: 768px) {

    .main-header {
        height: 64px;
    }

    .header-inner {
        height: 64px;

        min-height: 64px;

        width: calc(100% - 24px);
    }

    .satori-logo {
        font-size: 27px;
    }

    .home-redesign {
        width: calc(100% - 20px);
    }


    /* Colecciones */

    .collection-showcase-grid {
        grid-template-columns: 1fr 1fr;

        gap: 7px;
    }

    .collection-showcase {
        min-height: 170px;
    }


    /* Footer */

    .footer-main {
        width: calc(100% - 40px);

        padding: 45px 0 35px;

        grid-template-columns: 1fr;

        gap: 38px;
    }

    .footer-brand p {
        max-width: 320px;
    }

    .footer-community h2 {
        font-size: 23px;
    }

    .footer-newsletter {
        max-width: 100%;
    }

    .footer-bottom {
        width: calc(100% - 40px);

        padding: 18px 0 22px;

        flex-direction: column;

        align-items: flex-start;

        gap: 8px;
    }

    .footer-bottom span:last-child {
        text-align: left;
    }

}


/* =========================================================
   MÓVIL PEQUEÑO
   ========================================================= */

@media (max-width: 480px) {

    .shipping-bar {
        font-size: 8px;
    }

    .home-redesign {
        width: calc(100% - 16px);
    }

    .collection-showcase-grid {
        grid-template-columns: 1fr;
    }

    .collection-showcase {
        min-height: 180px;
    }

    .footer-main {
        width: calc(100% - 28px);
    }

    .footer-bottom {
        width: calc(100% - 28px);
    }

}
