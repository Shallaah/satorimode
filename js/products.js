/* =========================================================
   SATORIMODE · CATÁLOGO DE PRODUCTOS
   ========================================================= */

const PRODUCTS = [

    /* =====================================================
       POLERA KID BUU
       ===================================================== */

    {
        id: "kid-buu",
        name: "Polera Kid Buu",

        category: "anime",
        collection: "Anime",

        price: 18990,
        currency: "CLP",

        description:
            "Polera inspirada en Kid Buu, diseñada para nuestra colección Anime de SatoriMode.",

        image:
            "productos/anime/polera-kid-buu-01.PNG",

        images: [
            "productos/anime/polera-kid-buu-01.PNG",
            "productos/anime/polera-kid-buu-02.PNG",
            "productos/anime/polera-kid-buu-03.PNG"
        ],

        url:
            "productos/anime/polera-kid-buu.html",

        sizes: ["M", "L", "XL"],

        colors: ["Blanco"],

        tags: [
            "kid buu",
            "buu",
            "dragon ball",
            "dragon ball z",
            "anime",
            "polera",
            "streetwear"
        ],

        available: true,
        featured: true
    }

];


/* =========================================================
   FUNCIONES
   ========================================================= */

function getProductById(id) {

    return PRODUCTS.find(product =>
        product.id === id
    );

}


function getProductsByCategory(category) {

    return PRODUCTS.filter(product =>
        product.category === category
    );

}


function getAvailableProducts() {

    return PRODUCTS.filter(product =>
        product.available === true
    );

}


function getFeaturedProducts() {

    return PRODUCTS.filter(product =>
        product.featured === true
    );

}


function searchProducts(query) {

    if (!query) return [];

    const text = query
        .trim()
        .toLowerCase();

    if (!text) return [];

    return PRODUCTS.filter(product => {

        const searchableText = [

            product.name,
            product.category,
            product.collection,
            ...product.tags

        ]
        .join(" ")
        .toLowerCase();

        return searchableText.includes(text);

    });

}


function getRelatedProducts(
    currentProductId,
    category = null,
    limit = 3
) {

    let products = PRODUCTS.filter(product =>

        product.id !== currentProductId &&
        product.available === true

    );


    if (category) {

        const sameCategory =
            products.filter(product =>
                product.category === category
            );

        if (sameCategory.length > 0) {

            products = [
                ...sameCategory,
                ...products.filter(product =>
                    product.category !== category
                )
            ];

        }

    }


    return products.slice(0, limit);

}


/* =========================================================
   COMPROBACIÓN
   ========================================================= */

console.log(
    `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
);
