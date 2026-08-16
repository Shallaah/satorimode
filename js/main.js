/* =========================================================
   SATORIMODE
   MAIN.JS
   =========================================================

   FUNCIONES:

   - Dropdowns desktop
   - Menú móvil
   - Submenús móviles
   - Buscador
   - Productos de la Home
   - Más vendidos
   - Últimos estrenos
   - Newsletter / Únete al Clan
   - Cierre con ESC

   IMPORTANTE:
   products.js debe cargarse antes que main.js
   para utilizar PRODUCTS.
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           RUTA BASE DEL SITIO
        ====================================================== */

        const currentScript =
            document.currentScript;


        const baseUrl =
            currentScript
                ? new URL(
                    "../",
                    currentScript.src
                ).href
                : "/";


        function siteUrl(path) {

            if (!path) {
                return baseUrl;
            }

            return new URL(
                path.replace(/^\/+/, ""),
                baseUrl
            ).href;

        }



        /* =====================================================
           PRODUCTOS
        ====================================================== */

        const products =
            Array.isArray(window.PRODUCTS)
                ? window.PRODUCTS
                : [];


        function getProductImage(product) {

            if (!product) {
                return "";
            }


            if (
                Array.isArray(product.images) &&
                product.images.length
            ) {

                return product.images[0];

            }


            return product.image || "";

        }


        function getProductCategory(product) {

            return String(
                product.collection ||
                product.category ||
                "SATORIMODE"
            ).trim();

        }


        function normalizeCategory(category) {

            const value =
                String(
                    category || "otros"
                )
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .toLowerCase()
                .trim();


            if (
                value === "anime" ||
                value === "streetwear" ||
                value === "accesorios"
            ) {

                return value;

            }


            return "otros";

        }


        function slugify(value) {

            return String(
                value || ""
            )
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                "");

        }


        function getProductUrl(product) {

            if (!product) {
                return "#";
            }


            if (product.url) {

                if (
                    /^https?:\/\//i.test(
                        product.url
                    )
                ) {

                    return product.url;

                }


                return siteUrl(
                    product.url
                );

            }


            const category =
                normalizeCategory(
                    product.category
                );


            const slug =
                slugify(
                    product.id ||
                    product.name
                );


            return siteUrl(
                `productos/${category}/${slug}.html`
            );

        }


        function formatPrice(price) {

            return "$" +
                Number(
                    price || 0
                ).toLocaleString(
                    "es-CL"
                );

        }



        /* =====================================================
           DROPDOWNS DESKTOP
        ====================================================== */

        const dropdowns =
            document.querySelectorAll(
                ".nav-dropdown"
            );


        function closeAllDropdowns() {

            dropdowns.forEach(
                function (dropdown) {

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
            function (dropdown) {

                const button =
                    dropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                if (!button) {
                    return;
                }


                button.setAttribute(
                    "aria-expanded",
                    "false"
                );


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();


                        const wasOpen =
                            dropdown.classList.contains(
                                "active"
                            );


                        closeAllDropdowns();


                        if (!wasOpen) {

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
            function (event) {

                if (
                    !event.target.closest(
                        ".nav-dropdown"
                    )
                ) {

                    closeAllDropdowns();

                }

            }
        );


        document
            .querySelectorAll(
                ".dropdown-menu a"
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            closeAllDropdowns();

                        }
                    );

                }
            );



        /* =====================================================
           MENÚ MÓVIL
        ====================================================== */

        const mobileButton =
            document.querySelector(
                ".mobile-menu-button"
            );


        const mobileMenu =
            document.querySelector(
                ".mobile-menu"
            );


        const mobileClose =
            document.querySelector(
                ".mobile-menu-close"
            );


        const mobileOverlay =
            document.querySelector(
                ".mobile-menu-overlay"
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

            mobileButton.setAttribute(
                "aria-expanded",
                "false"
            );


            mobileButton.addEventListener(
                "click",
                function (event) {

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
                function (event) {

                    event.preventDefault();

                    closeMobileMenu();

                }
            );

        }


        if (mobileOverlay) {

            mobileOverlay.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }



        /* =====================================================
           SUBMENÚS MÓVILES
        ====================================================== */

        const mobileButtons =
            document.querySelectorAll(
                ".mobile-nav-button"
            );


        mobileButtons.forEach(
            function (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();


                        const submenu =
                            button.nextElementSibling;


                        if (
                            !submenu ||
                            !submenu.classList.contains(
                                "mobile-submenu"
                            )
                        ) {

                            return;

                        }


                        const wasOpen =
                            submenu.classList.contains(
                                "is-open"
                            ) ||
                            submenu.classList.contains(
                                "active"
                            );


                        document
                            .querySelectorAll(
                                ".mobile-submenu"
                            )
                            .forEach(
                                function (menu) {

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
                                function (otherButton) {

                                    otherButton.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );


                                    otherButton.classList.remove(
                                        "is-open"
                                    );


                                    otherButton.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        if (!wasOpen) {

                            submenu.classList.add(
                                "is-open"
                            );


                            submenu.classList.add(
                                "active"
                            );


                            button.setAttribute(
                                "aria-expanded",
                                "true"
                            );


                            button.classList.add(
                                "is-open"
                            );


                            button.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );


        document
            .querySelectorAll(
                ".mobile-menu a"
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
           BUSCADOR
        ====================================================== */

        const searchButton =
            document.querySelector(
                ".search-button, .search-trigger"
            );


        const searchOverlay =
            document.querySelector(
                ".search-overlay"
            );


        const searchClose =
            document.querySelector(
                ".search-close"
            );


        const searchInput =
            document.querySelector(
                "#product-search"
            );


        const searchResults =
            document.querySelector(
                "#search-results"
            );


        function renderSearchMessage(
            message
        ) {

            if (!searchResults) {
                return;
            }


            searchResults.innerHTML = `
                <p class="search-empty">
                    ${message}
                </p>
            `;

        }


        function closeSearch() {

            if (!searchOverlay) {
                return;
            }


            searchOverlay.classList.remove(
                "active"
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


            if (searchInput) {

                searchInput.value = "";

            }


            renderSearchMessage(
                "Busca tu próxima polera Satorii."
            );

        }


        function openSearch() {

            if (!searchOverlay) {
                return;
            }


            searchOverlay.classList.add(
                "active"
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


            if (searchInput) {

                setTimeout(
                    function () {

                        searchInput.focus();

                    },
                    150
                );

            }

        }


        if (
            searchButton &&
            searchOverlay
        ) {

            searchButton.setAttribute(
                "aria-expanded",
                "false"
            );


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
                function () {

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


        if (
            searchInput &&
            searchResults
        ) {

            searchInput.addEventListener(
                "input",
                function () {

                    const query =
                        searchInput.value
                            .trim()
                            .toLowerCase();


                    if (!query) {

                        renderSearchMessage(
                            "Busca tu próxima polera Satorii."
                        );

                        return;

                    }


                    const results =
                        products.filter(
                            function (product) {

                                if (
                                    !product ||
                                    product.available === false
                                ) {

                                    return false;

                                }


                                const name =
                                    String(
                                        product.name ||
                                        ""
                                    ).toLowerCase();


                                const category =
                                    getProductCategory(
                                        product
                                    ).toLowerCase();


                                const collection =
                                    String(
                                        product.collection ||
                                        ""
                                    ).toLowerCase();


                                const id =
                                    String(
                                        product.id ||
                                        ""
                                    ).toLowerCase();


                                return (
                                    name.includes(
                                        query
                                    ) ||
                                    category.includes(
                                        query
                                    ) ||
                                    collection.includes(
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
                                function (product) {

                                    const image =
                                        getProductImage(
                                            product
                                        );


                                    return `
                                        <a
                                            href="${getProductUrl(product)}"
                                            class="search-result-item"
                                        >

                                            ${
                                                image
                                                    ? `
                                                        <img
                                                            src="${siteUrl(image)}"
                                                            alt="${product.name || "Producto Satorii"}"
                                                            class="search-result-image"
                                                        >
                                                      `
                                                    : ""
                                            }


                                            <div
                                                class="search-result-info"
                                            >

                                                <span
                                                    class="search-result-category"
                                                >
                                                    ${getProductCategory(product).toUpperCase()}
                                                </span>


                                                <span
                                                    class="search-result-name"
                                                >
                                                    ${product.name || "Producto Satorii"}
                                                </span>


                                                <span
                                                    class="search-result-price"
                                                >
                                                    ${formatPrice(product.price)}
                                                </span>

                                            </div>

                                        </a>
                                    `;

                                }
                            )
                            .join("");

                }
            );

        }



        /* =====================================================
           TARJETA DE PRODUCTO PARA LA HOME
        ====================================================== */

        function createHomeProductCard(
            product,
            options = {}
        ) {

            if (!product) {
                return "";
            }


            const image =
                getProductImage(
                    product
                );


            const category =
                getProductCategory(
                    product
                );


            const url =
                getProductUrl(
                    product
                );


            const tag =
                options.tag ||
                product.badge ||
                product.tag ||
                "";


            return `
                <a
                    href="${url}"
                    class="store-product-card"
                >

                    <div
                        class="store-product-image"
                    >

                        ${
                            tag
                                ? `
                                    <span
                                        class="store-product-tag"
                                    >
                                        ${tag}
                                    </span>
                                  `
                                : ""
                        }


                        <button
                            type="button"
                            class="store-product-fav"
                            aria-label="Agregar a favoritos"
                            onclick="event.preventDefault(); event.stopPropagation();"
                        >
                            ♡
                        </button>


                        ${
                            image
                                ? `
                                    <img
                                        src="${siteUrl(image)}"
                                        alt="${product.name || "Producto Satorii"}"
                                        loading="lazy"
                                    >
                                  `
                                : `
                                    <div
                                        class="store-product-placeholder"
                                    >
                                        SATORII
                                    </div>
                                  `
                        }

                    </div>


                    <div
                        class="store-product-info"
                    >

                        <span>
                            ${category.toUpperCase()}
                        </span>


                        <h3>
                            ${product.name || "Producto Satorii"}
                        </h3>


                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                    </div>

                </a>
            `;

        }



        /* =====================================================
           SELECCIÓN DE PRODUCTOS DESTACADOS
        ====================================================== */

        function getFeaturedProducts() {

            const available =
                products.filter(
                    function (product) {

                        return (
                            product &&
                            product.available !== false
                        );

                    }
                );


            if (!available.length) {
                return [];
            }


            const marked =
                available.filter(
                    function (product) {

                        return (
                            product.featured === true ||
                            product.bestSeller === true ||
                            product.bestseller === true ||
                            product.isFeatured === true
                        );

                    }
                );


            if (marked.length) {

                return marked.slice(0, 5);

            }


            return available.slice(0, 5);

        }



        /* =====================================================
           SELECCIÓN DE ÚLTIMOS PRODUCTOS
        ====================================================== */

        function getLatestProducts() {

            const available =
                products.filter(
                    function (product) {

                        return (
                            product &&
                            product.available !== false
                        );

                    }
                );


            if (!available.length) {
                return [];
            }


            const marked =
                available.filter(
                    function (product) {

                        return (
                            product.latest === true ||
                            product.isNew === true ||
                            product.new === true
                        );

                    }
                );


            if (marked.length) {

                return marked.slice(0, 4);

            }


            /*
             * Si no existe una marca de "nuevo",
             * usamos los últimos productos del catálogo.
             */

            return available
                .slice(-4)
                .reverse();

        }



        /* =====================================================
           RENDER · MÁS VENDIDOS
        ====================================================== */

        function renderFeaturedProducts() {

            const container =
                document.getElementById(
                    "featured-products"
                );


            if (!container) {
                return;
            }


            const featured =
                getFeaturedProducts();


            if (!featured.length) {

                container.innerHTML = `
                    <p class="store-product-empty">
                        Próximamente encontrarás
                        nuevos diseños Satorii.
                    </p>
                `;

                return;

            }


            container.innerHTML =
                featured
                    .map(
                        function (product) {

                            return createHomeProductCard(
                                product,
                                {
                                    tag:
                                        product.bestSeller ||
                                        product.bestseller
                                            ? "MÁS VENDIDO"
                                            : ""
                                }
                            );

                        }
                    )
                    .join("");

        }



        /* =====================================================
           RENDER · ÚLTIMOS ESTRENOS
        ====================================================== */

        function renderLatestProducts() {

            const container =
                document.getElementById(
                    "latest-products"
                );


            if (!container) {
                return;
            }


            const latest =
                getLatestProducts();


            if (!latest.length) {

                container.innerHTML = `
                    <p class="store-product-empty">
                        Próximamente nuevos lanzamientos.
                    </p>
                `;

                return;

            }


            container.innerHTML =
                latest
                    .map(
                        function (product) {

                            return createHomeProductCard(
                                product,
                                {
                                    tag:
                                        product.latest ||
                                        product.isNew ||
                                        product.new
                                            ? "NUEVO"
                                            : ""
                                }
                            );

                        }
                    )
                    .join("");

        }



        /* =====================================================
           NEWSLETTER · ÚNETE AL CLAN
        ====================================================== */

        const newsletter =
            document.getElementById(
                "footerNewsletter"
            );


        if (newsletter) {

            newsletter.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const emailInput =
                        document.getElementById(
                            "footerEmail"
                        );


                    if (!emailInput) {
                        return;
                    }


                    const email =
                        emailInput.value
                            .trim();


                    if (!email) {
                        return;
                    }


                    if (
                        !emailInput.checkValidity()
                    ) {

                        emailInput.reportValidity();

                        return;

                    }


                    let subscribers = [];


                    try {

                        subscribers =
                            JSON.parse(
                                localStorage.getItem(
                                    "satoriiSubscribers"
                                ) || "[]"
                            );

                    } catch (error) {

                        subscribers = [];

                    }


                    if (
                        !subscribers.includes(
                            email
                        )
                    ) {

                        subscribers.push(
                            email
                        );

                    }


                    localStorage.setItem(
                        "satoriiSubscribers",
                        JSON.stringify(
                            subscribers
                        )
                    );


                    emailInput.value = "";


                    showNewsletterMessage(
                        "¡Bienvenido al Clan Satorii! 🔴"
                    );

                }
            );

        }


        function showNewsletterMessage(
            message
        ) {

            let messageElement =
                document.getElementById(
                    "newsletterMessage"
                );


            if (!messageElement) {

                messageElement =
                    document.createElement(
                        "div"
                    );


                messageElement.id =
                    "newsletterMessage";


                messageElement.style.marginTop =
                    "10px";


                messageElement.style.color =
                    "#ed1111";


                messageElement.style.fontSize =
                    "11px";


                messageElement.style.fontWeight =
                    "700";


                const form =
                    document.getElementById(
                        "footerNewsletter"
                    );


                if (
                    form &&
                    form.parentNode
                ) {

                    form.parentNode.appendChild(
                        messageElement
                    );

                }

            }


            messageElement.textContent =
                message;

        }



        /* =====================================================
           ESC · CERRAR TODO
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Escape"
                ) {

                    return;

                }


                closeAllDropdowns();

                closeMobileMenu();

                closeSearch();

            }
        );



        /* =====================================================
           INICIALIZACIÓN HOME
        ====================================================== */

        renderFeaturedProducts();

        renderLatestProducts();


    }
);
