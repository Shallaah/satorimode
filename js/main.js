/* =========================================================
   SATORIMODE · MAIN.JS
   Portada + filtros. Usa PRODUCTS si existe y mantiene
   compatibilidad con el catálogo actual.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = new URL("./", window.location.href).href;

    const fallback = [{
        id: "kid-buu",
        name: "Polera Kid Buu",
        category: "anime",
        price: 18990,
        image: "productos/anime/polera-kid-buu-01.PNG",
        url: "productos/anime/polera-kid-buu.html",
        featured: true,
        latest: true,
        available: true
    }];

    const raw = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : fallback;
    const productos = raw.filter(p => p && p.available !== false).map(p => ({
        id: p.id || p.name,
        name: p.name || "Producto SatoriMode",
        category: String(p.collection || p.category || "SATORIMODE").toUpperCase(),
        price: typeof p.price === "number" ? `$${p.price.toLocaleString("es-CL")}` : String(p.price || "$0"),
        image: p.image || (Array.isArray(p.images) ? p.images[0] : ""),
        url: p.url || "productos.html",
        featured: p.featured !== false,
        latest: p.latest !== false
    }));

    function productCard(product, tag = "") {
        const image = product.image
            ? `<img src="${baseUrl}${product.image.replace(/^\//, "")}" alt="${product.name}" loading="lazy">`
            : `<span class="store-product-placeholder">SATORIMODE</span>`;

        return `
            <a class="store-product-card" href="${baseUrl}${product.url.replace(/^\//, "")}">
                <div class="store-product-image">
                    ${tag ? `<span class="store-product-tag">${tag}</span>` : ""}
                    <button class="store-product-fav" type="button" aria-label="Agregar a favoritos" onclick="event.preventDefault()">♡</button>
                    ${image}
                </div>
                <div class="store-product-info">
                    <span>${product.category}</span>
                    <h3>${product.name}</h3>
                    <strong>${product.price}</strong>
                </div>
            </a>`;
    }

    function render(id, list, tag) {
        const el = document.getElementById(id);
        if (!el) return;
        const items = list.length ? list : productos.slice(0, 5);
        el.innerHTML = items.map(p => productCard(p, tag)).join("");
    }

    const featured = productos.filter(p => p.featured).slice(0, 5);
    const latest = productos.filter(p => p.latest).slice(0, 4);
    render("featured-products", featured, "");
    render("latest-products", latest, "NUEVO");

    /* Filtros Anime */
    const animeFilterToggle = document.querySelector("#animeFilterToggle");
    const animeFilters = document.querySelector("#animeFilters");
    if (animeFilterToggle && animeFilters) {
        animeFilterToggle.addEventListener("click", () => {
            const open = animeFilters.classList.toggle("is-open");
            animeFilterToggle.setAttribute("aria-expanded", String(open));
            animeFilterToggle.textContent = open ? "× OCULTAR FILTROS" : "☷ MOSTRAR FILTROS";
        });
    }
    document.querySelectorAll(".anime-filter").forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.filter;
            document.querySelectorAll(`.anime-filter[data-filter="${type}"]`).forEach(b => b.classList.remove("active"));
            button.classList.add("active");
        });
    });
});
