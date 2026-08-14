/* =========================================================
   SATORIMODE
   CATÁLOGO CENTRAL DE PRODUCTOS
   =========================================================

   Este archivo contiene la información de todos los
   productos de SatoriMode.

   Otros sistemas podrán utilizar esta información para:

   - productos.html
   - categorías
   - filtros
   - buscador
   - recomendaciones
   - páginas de productos
   - carrito

   Para agregar un nuevo producto, solamente añadiremos
   otro objeto dentro de PRODUCTS.
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


        /* ---------------------------------------------
           IMÁGENES
        ---------------------------------------------- */

        images: [

            "productos/anime/polera-kid-buu-01.PNG",

            "productos/anime/polera-kid-buu-02.PNG",

            "productos/anime/polera-kid-buu-03.PNG"

        ],


        /* ---------------------------------------------
           IMAGEN PRINCIPAL
        ---------------------------------------------- */

        image:
            "productos/anime/polera-kid-buu-01.PNG",


        /* ---------------------------------------------
           PÁGINA DEL PRODUCTO
        ---------------------------------------------- */

        url:
            "productos/anime/polera-kid-buu.html",


        /* ---------------------------------------------
           TALLAS DISPONIBLES
        ---------------------------------------------- */

        sizes: [

            "M",
            "L",
            "XL"

        ],


        /* ---------------------------------------------
           COLORES
        ---------------------------------------------- */

        colors: [

            "Blanco"

        ],


        /* ---------------------------------------------
           ETIQUETAS
           Sirven posteriormente para búsqueda y
           recomendaciones.
        ---------------------------------------------- */

        tags: [

            "kid buu",
            "buu",
            "dragon ball",
            "dragon ball z",
            "anime",
            "polera",
            "streetwear"

        ],


        /* ---------------------------------------------
           DISPONIBILIDAD
        ---------------------------------------------- */

        available: true,


        /* ---------------------------------------------
           PRODUCTO DESTACADO
        ---------------------------------------------- */

        featured: true

    }

];



/* =========================================================
   FUNCIONES AUXILIARES
   ========================================================= */


/*
    Buscar un producto por su ID.
*/

function getProductById(id) {

    return PRODUCTS.find(
        function(product) {

            return product.id === id;

        }
    );

}



/*
    Obtener productos de una categoría.
*/

function getProductsByCategory(category) {

    return PRODUCTS.filter(
        function(product) {

            return product.category === category;

        }
    );

}



/*
    Obtener productos disponibles.
*/

function getAvailableProducts() {

    return PRODUCTS.filter(
        function(product) {

            return product.available === true;

        }
    );

}



/*
    Obtener productos destacados.
*/

function getFeaturedProducts() {

    return PRODUCTS.filter(
        function(product) {

            return product.featured === true;

        }
    );

}



/*
    Buscar productos por texto.

    Busca dentro de:

    - nombre
    - categoría
    - colección
    - etiquetas
*/

function searchProducts(query) {


    if (!query) {

        return [];

    }


    const text =
        query
            .trim()
            .toLowerCase();


    if (!text) {

        return [];

    }


    return PRODUCTS.filter(
        function(product) {


            const searchableText = [

                product.name,

                product.category,

                product.collection,

                ...product.tags

            ]
            .join(" ")
            .toLowerCase();


            return searchableText.includes(
                text
            );


        }
    );

}



/*
    Obtener productos relacionados.

    No muestra el mismo producto que estamos viendo.
*/

function getRelatedProducts(
    currentProductId,
    category = null,
    limit = 3
) {


    let products =
        PRODUCTS.filter(
            function(product) {

                return (
                    product.id !== currentProductId &&
                    product.available === true
                );

            }
        );


    /*
        Si especificamos una categoría,
        primero buscamos productos de esa categoría.
    */

    if (category) {

        const sameCategory =
            products.filter(
                function(product) {

                    return (
                        product.category ===
                        category
                    );

                }
            );


        /*
            Si existen productos de la misma categoría,
            los priorizamos.
        */

        if (sameCategory.length > 0) {

            products =
                sameCategory.concat(
                    products.filter(
                        function(product) {

                            return (
                                product.category !==
                                category
                            );

                        }
                    )
                );

        }

    }


    return products.slice(
        0,
        limit
    );

}



/* =========================================================
   INFORMACIÓN DEL CATÁLOGO
   ========================================================= */

console.log(
    `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
);
