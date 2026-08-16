/* =========================================================
   SATORIMODE · MAIN.JS
   =========================================================

   RESPONSABILIDADES:

   - Productos destacados de la Home
   - Más vendidos
   - Últimos estrenos
   - Newsletter / Únete al Clan

   IMPORTANTE:
   products.js debe cargarse antes que main.js.

   header.js se encarga de:
   - Header
   - Barra superior
   - Dropdowns
   - Menú móvil
   - Buscador
   - Carrito
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       RUTA BASE
    ====================================================== */

    const currentScript = document.currentScript;

    const baseUrl = currentScript
        ? new URL("../", currentScript.src).href
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
    ====================================================== */

    const products = Array.isArray(window.PRODUCTS)
        ? window.PRODUCTS
        : [];



    /* =====================================================
       UTILIDADES DE PRODUCTOS
    ====================================================== */

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


        return (
            product.image ||
            product.imagen ||
            ""
        );

    }



    function getProductCategory(product) {

        if (!product) {
            return "SATORIMODE";
        }


        return String(
            product.collection ||
            product.category ||
            product.categoria ||
            "SATORIMODE"
        ).trim();

    }



    function normalizeCategory(category) {

        const value = String(
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

        return String(value || "")
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
                product.category ||
                product.collection
            );


        const slug =
            slugify(
                product.id ||
                product.name ||
                product.nombre
            );


        return siteUrl(
            `productos/${category}/${slug}.html`
        );

    }



    function formatPrice(price) {

        if (
            typeof price === "string" &&
            price.includes("$")
        ) {

            return price;

        }


        return "$" +
            Number(
                price || 0
            ).toLocaleString(
                "es-CL"
            );

    }



    /* =====================================================
       PRODUCTOS DISPONIBLES
    ====================================================== */

    function getAvailableProducts() {

        return products.filter(
            product => {

                return (
                    product &&
                    product.available !== false
                );

            }
        );

    }



    /* =====================================================
       CREAR TARJETA DE PRODUCTO
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


        const name =
            product.name ||
            product.nombre ||
            "Producto Satorii";


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
                        onclick="
                            event.preventDefault();
                            event.stopPropagation();
                        "
                    >
                        ♡
                    </button>


                    ${
                        image
                            ? `
                                <img
                                    src="${siteUrl(image)}"
                                    alt="${name}"
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
                        ${name}
                    </h3>


                    <strong>
                        ${formatPrice(
                            product.price
                        )}
                    </strong>

                </div>

            </a>

        `;

    }



    /* =====================================================
       MÁS VENDIDOS
    ====================================================== */

    function getFeaturedProducts() {

        const available =
            getAvailableProducts();


        if (!available.length) {
            return [];
        }


        /*
         * Primero buscamos productos marcados
         * específicamente como destacados.
         */

        const featured =
            available.filter(
                product => {

                    return (
                        product.featured === true ||
                        product.isFeatured === true ||
                        product.bestSeller === true ||
                        product.bestseller === true
                    );

                }
            );


        if (featured.length) {

            return featured.slice(0, 5);

        }


        /*
         * Si todavía no tienes productos marcados
         * como destacados, mostramos los primeros
         * disponibles.
         */

        return available.slice(0, 5);

    }



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
                    product => {

                        const isBestSeller =
                            product.bestSeller === true ||
                            product.bestseller === true;


                        return createHomeProductCard(
                            product,
                            {
                                tag:
                                    isBestSeller
                                        ? "MÁS VENDIDO"
                                        : ""
                            }
                        );

                    }
                )
                .join("");

    }



    /* =====================================================
       ÚLTIMOS ESTRENOS
    ====================================================== */

    function getLatestProducts() {

        const available =
            getAvailableProducts();


        if (!available.length) {
            return [];
        }


        /*
         * Si tienes productos marcados como nuevos,
         * usamos esos primero.
         */

        const latest =
            available.filter(
                product => {

                    return (
                        product.latest === true ||
                        product.isNew === true ||
                        product.new === true
                    );

                }
            );


        if (latest.length) {

            return latest.slice(0, 4);

        }


        /*
         * Si todavía no tienes productos marcados
         * como nuevos, usamos los últimos productos
         * del catálogo.
         */

        return available
            .slice(-4)
            .reverse();

    }



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
                    product => {

                        const isNew =
                            product.latest === true ||
                            product.isNew === true ||
                            product.new === true;


                        return createHomeProductCard(
                            product,
                            {
                                tag:
                                    isNew
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
       =====================================================

       Compatible con:

       <form id="footerNewsletter">

       o simplemente:

       <form class="newsletter-form">

       Por eso funcionará con el HTML que
       tenemos actualmente.
    ====================================================== */

    const newsletter =
        document.getElementById(
            "footerNewsletter"
        ) ||
        document.querySelector(
            ".newsletter-form"
        );


    if (newsletter) {

        newsletter.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const emailInput =
                    newsletter.querySelector(
                        'input[type="email"]'
                    );


                if (!emailInput) {
                    return;
                }


                const email =
                    emailInput.value.trim();


                if (!email) {

                    emailInput.reportValidity();

                    return;

                }


                if (
                    !emailInput.checkValidity()
                ) {

                    emailInput.reportValidity();

                    return;

                }



                /* =========================================
                   GUARDAR EMAIL LOCALMENTE
                   ========================================= */

                let subscribers = [];


                try {

                    subscribers =
                        JSON.parse(
                            localStorage.getItem(
                                "satoriiSubscribers"
                            ) || "[]"
                        );

                } catch {

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



                /* =========================================
                   LIMPIAR INPUT
                   ========================================= */

                emailInput.value = "";



                /* =========================================
                   MENSAJE
                   ========================================= */

                showNewsletterMessage(
                    newsletter,
                    "¡Bienvenido al Clan Satorii! 🔴"
                );

            }
        );

    }



    function showNewsletterMessage(
        form,
        message
    ) {

        let messageElement =
            form.querySelector(
                ".newsletter-message"
            );


        if (!messageElement) {

            messageElement =
                document.createElement(
                    "div"
                );


            messageElement.className =
                "newsletter-message";


            form.appendChild(
                messageElement
            );

        }


        messageElement.textContent =
            message;


        /*
         * Eliminamos el mensaje después
         * de unos segundos para mantener
         * limpio el footer.
         */

        clearTimeout(
            messageElement._timer
        );


        messageElement._timer =
            setTimeout(
                () => {

                    messageElement.textContent =
                        "";

                },
                5000
            );

    }



    /* =====================================================
       INICIALIZAR HOME
    ====================================================== */

    renderFeaturedProducts();

    renderLatestProducts();


});
