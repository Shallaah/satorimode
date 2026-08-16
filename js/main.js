/* =========================================================
   SATORIMODE · MAIN.JS
   Solo lógica de página:
   - Productos de portada
   - Recomendaciones aleatorias
   - Filtros Anime
   - Sin duplicar header/buscador
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const baseUrl = new URL("./", window.location.href).href;

    /* =====================================================
       CATÁLOGO
       Cuando agregues productos reales, los incorporamos aquí.
       Por ahora se usa el producto existente de SatoriMode.
    ===================================================== */

    const productos = [
        {
            id: "kid-buu",
            name: "Polera Kid Buu",
            category: "ANIME",
            price: "$18.990",
            image: "productos/anime/polera-kid-buu-01.PNG",
            url: "productos/anime/polera-kid-buu.html",
            tag: "DESTACADO",
            featured: true,
            latest: true
        }
    ];

    /* =====================================================
       TARJETA PRODUCTO
    ===================================================== */

    function productCard(product, tag = "") {
        return `
            <a href="${baseUrl}${product.url}" class="home-product-card">
                <div class="home-product-image">
                    ${tag ? `<span class="home-product-tag">${tag}</span>` : ""}
                    <img
                        src="${baseUrl}${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >
                </div>
                <div class="home-product-info">
                    <span>${product.category}</span>
                    <h3>${product.name}</h3>
                    <strong>${product.price}</strong>
                </div>
            </a>
        `;
    }

    function renderProducts(containerId, products, tag = "") {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!products.length) {
            container.innerHTML = `
                <div class="home-product-empty">
                    <strong>Estamos preparando nuevos diseños.</strong>
                    <p>Muy pronto encontrarás más productos en SatoriMode.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => productCard(product, tag)).join("");
    }

    /* =====================================================
       DESTACADOS
    ===================================================== */

    const featured = productos.filter(product => product.featured);
    renderProducts("featured-products", featured, "DESTACADO");

    /* =====================================================
       RECOMENDADOS ALEATORIOS
       Mezcla el catálogo cada vez que se carga la portada.
    ===================================================== */

    function shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    const recommended = shuffle(productos).slice(0, Math.min(4, productos.length));
    renderProducts("recommended-products", recommended, "PARA TI");

    /* =====================================================
       ÚLTIMOS LANZAMIENTOS
    ===================================================== */

    const latest = productos.filter(product => product.latest);
    renderProducts("latest-products", latest, "NUEVO");

    /* =====================================================
       FILTROS ANIME
       Se mantienen para anime.html.
    ===================================================== */

    const animeFilterToggle = document.querySelector("#animeFilterToggle");
    const animeFilters = document.querySelector("#animeFilters");

    if (animeFilterToggle && animeFilters) {
        animeFilterToggle.addEventListener("click", event => {
            event.preventDefault();

            const isOpen = animeFilters.classList.toggle("is-open");
            animeFilterToggle.setAttribute("aria-expanded", String(isOpen));
            animeFilterToggle.textContent = isOpen
                ? "× OCULTAR FILTROS"
                : "☷ MOSTRAR FILTROS";
        });
    }

    document.querySelectorAll(".anime-filter").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const filterType = button.dataset.filter;
            const wasActive = button.classList.contains("active");

            document
                .querySelectorAll(`.anime-filter[data-filter="${filterType}"]`)
                .forEach(other => other.classList.remove("active"));

            if (!wasActive) button.classList.add("active");
        });
    });

});
