/* =========================================================
   SATORIMODE · CATÁLOGO DE PRODUCTOS
   ========================================================= */


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const DEFAULT_NEW_DAYS = 7;


/* =========================================================
   PRODUCTOS
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

        subcategory: "poleras",

        price: 18990,

        currency: "CLP",


        /* =================================================
           FECHA DE LANZAMIENTO
        ================================================== */

        releaseDate: "2026-08-20",

        newDays: 7,


        /* =================================================
           DESCRIPCIÓN
        ================================================== */

        description:
            "Polera inspirada en Kid Buu, diseñada para nuestra colección Anime de Satorii.",


        /* =================================================
           INFORMACIÓN DEL PRODUCTO
        ================================================== */

        details: {

            description:
                "Polera inspirada en Kid Buu, diseñada para nuestra colección Anime de Satorii.",

            shipping:
                "Enviamos a todo Chile. Los pedidos se preparan y despachan según la modalidad de envío seleccionada.",

            warranty:
                "Todos nuestros productos cuentan con garantía frente a fallas de fabricación.",

            measurements:
                "Disponible en tallas M, L y XL. Revisa nuestra guía de tallas antes de comprar.",

            care:
                "Lavar con agua fría y evitar el uso de cloro. No planchar directamente sobre el estampado."

        },


        /* =================================================
           IMAGEN PRINCIPAL
        ================================================== */

        image:
            "img/productos/anime/dbz-kid-buu/01.webp",


        /* =================================================
           GALERÍA
        ================================================== */

        images: [

            "img/productos/anime/dbz-kid-buu/01.webp",

            "img/productos/anime/dbz-kid-buu/02.webp",

            "img/productos/anime/dbz-kid-buu/03.webp"

        ],


        /* =================================================
           PÁGINA INDIVIDUAL
        ================================================== */

        url:
            "productos/anime/kid-buu.html",


        /* =================================================
           TALLAS
        ================================================== */

        sizes: [

            "M",
            "L",
            "XL"

        ],


        /* =================================================
           COLORES
        ================================================== */

        colors: [

            "Blanco"

        ],


        /* =================================================
           ETIQUETAS
        ================================================== */

        tags: [

            "kid buu",
            "buu",
            "dragon ball",
            "dragon ball z",
            "anime",
            "polera",
            "streetwear"

        ],


        /* =================================================
           ESTADO
        ================================================== */

        available: true,

        featured: true,

        newProduct: true

    },


    /* =====================================================
       POLERA GOKU
    ===================================================== */

    {
        id: "goku",

        name: "Polera Goku",

        category: "anime",

        collection: "Anime",

        subcategory: "poleras",

        price: 19990,

        currency: "CLP",


        /* =================================================
           FECHA DE LANZAMIENTO
        ================================================== */

        releaseDate: "2026-08-20",

        newDays: 7,


        /* =================================================
           DESCRIPCIÓN
        ================================================== */

        description:
            "Polera inspirada en Goku para nuestra colección Anime de Satorii.",


        /* =================================================
           INFORMACIÓN DEL PRODUCTO
        ================================================== */

        details: {

            description:
                "Polera inspirada en Goku para nuestra colección Anime de Satorii.",

            shipping:
                "Enviamos a todo Chile. Los pedidos se preparan y despachan según la modalidad de envío seleccionada.",

            warranty:
                "Todos nuestros productos cuentan con garantía frente a fallas de fabricación.",

            measurements:
                "Disponible en tallas M, L y XL. Revisa nuestra guía de tallas antes de comprar.",

            care:
                "Lavar con agua fría y evitar el uso de cloro. No planchar directamente sobre el estampado."

        },


        /* =================================================
           IMAGEN PRINCIPAL
        ================================================== */

        image:
            "img/productos/anime/goku/01.PNG",


        /* =================================================
           GALERÍA
        ================================================== */

        images: [

            "img/productos/anime/goku/01.PNG",

            "img/productos/anime/goku/02.PNG",

            "img/productos/anime/goku/03.PNG"

        ],


        /* =================================================
           PÁGINA INDIVIDUAL
        ================================================== */

        url:
            "productos/anime/goku.html",


        /* =================================================
           TALLAS
        ================================================== */

        sizes: [

            "M",
            "L",
            "XL"

        ],


        /* =================================================
           COLORES
        ================================================== */

        colors: [

            "Negro",

            "Blanco"

        ],


        /* =================================================
           ETIQUETAS
        ================================================== */

        tags: [

            "goku",
            "dragon ball",
            "dragon ball z",
            "anime",
            "polera",
            "streetwear"

        ],


        /* =================================================
           ESTADO
        ================================================== */

        available: true,

        featured: false,

        newProduct: true

    }

];


/* =========================================================
   SISTEMA · PRODUCTO NUEVO
   ========================================================= */


/*
   Comprueba si un producto todavía debe aparecer
   como NUEVO.

   Ejemplo:

   releaseDate: "2026-08-20"
   newDays: 7

   El producto será NUEVO durante 7 días.
*/

function isProductNew(product) {

    if (!product) {
        return false;
    }


    /*
       Si no está marcado como producto nuevo,
       no mostramos la etiqueta.
    */

    if (product.newProduct !== true) {
        return false;
    }


    /*
       Si no tiene fecha de lanzamiento,
       mantenemos el comportamiento anterior.
    */

    if (!product.releaseDate) {
        return true;
    }


    /*
       Número de días configurado.
       Si no existe, usamos 7 días.
    */

    const days =
        Number(product.newDays) ||
        DEFAULT_NEW_DAYS;


    /*
       Fecha de lanzamiento.
    */

    const releaseDate =
        new Date(
            `${product.releaseDate}T00:00:00`
        );


    /*
       Comprobar que la fecha sea válida.
    */

    if (
        Number.isNaN(
            releaseDate.getTime()
        )
    ) {

        return false;

    }


    /*
       Fecha actual.
    */

    const now =
        new Date();


    /*
       Normalizamos la fecha actual
       para trabajar por días completos.
    */

    const today =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );


    /*
       Fecha límite.

       Ejemplo:

       lanzamiento:
       20 agosto

       7 días:

       hasta:
       26 agosto

       El 27 deja de aparecer.
    */

    const expirationDate =
        new Date(
            releaseDate
        );


    expirationDate.setDate(
        expirationDate.getDate() +
        days
    );


    /*
       Producto NUEVO mientras
       la fecha actual sea anterior
       a la fecha de expiración.
    */

    return (
        today <
        expirationDate
    );

}


/* =========================================================
   OBTENER PRODUCTO POR ID
   ========================================================= */

function getProductById(id) {

    if (!id) {
        return null;
    }

    return PRODUCTS.find(
        product =>
            product.id === id
    ) || null;

}


/* =========================================================
   OBTENER PRODUCTOS POR CATEGORÍA
   ========================================================= */

function getProductsByCategory(category) {

    if (!category) {
        return [];
    }

    const normalizedCategory =
        normalizeProductText(category);

    return PRODUCTS.filter(
        product =>
            normalizeProductText(
                product.category
            ) === normalizedCategory
    );

}


/* =========================================================
   OBTENER PRODUCTOS POR COLECCIÓN
   ========================================================= */

function getProductsByCollection(collection) {

    if (!collection) {
        return [];
    }

    const normalizedCollection =
        normalizeProductText(collection);

    return PRODUCTS.filter(
        product =>
            normalizeProductText(
                product.collection
            ) === normalizedCollection
    );

}


/* =========================================================
   OBTENER PRODUCTOS POR SUBCATEGORÍA
   ========================================================= */

function getProductsBySubcategory(subcategory) {

    if (!subcategory) {
        return [];
    }

    const normalizedSubcategory =
        normalizeProductText(subcategory);

    return PRODUCTS.filter(
        product =>
            normalizeProductText(
                product.subcategory
            ) === normalizedSubcategory
    );

}


/* =========================================================
   PRODUCTOS DISPONIBLES
   ========================================================= */

function getAvailableProducts() {

    return PRODUCTS.filter(
        product =>
            product.available === true
    );

}


/* =========================================================
   PRODUCTOS DESTACADOS
   ========================================================= */

function getFeaturedProducts() {

    return PRODUCTS.filter(
        product =>
            product.featured === true &&
            product.available === true
    );

}


/* =========================================================
   PRODUCTOS NUEVOS
   ========================================================= */

function getNewProducts() {

    return PRODUCTS.filter(
        product =>
            product.available === true &&
            isProductNew(product)
    );

}


/* =========================================================
   NORMALIZAR TEXTO
   ========================================================= */

function normalizeProductText(value) {

    return String(value || "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();

}


/* =========================================================
   TEXTO BUSCABLE DE UN PRODUCTO
   ========================================================= */

function getProductSearchText(product) {

    if (!product) {
        return "";
    }


    const values = [

        product.name,

        product.category,

        product.collection,

        product.subcategory,

        product.description,

        ...(Array.isArray(product.tags)
            ? product.tags
            : []
        ),

        ...(Array.isArray(product.colors)
            ? product.colors
            : []
        ),

        ...(Array.isArray(product.sizes)
            ? product.sizes
            : []
        )

    ];


    return normalizeProductText(
        values.join(" ")
    );

}


/* =========================================================
   BÚSQUEDA DE PRODUCTOS
   ========================================================= */

function searchProducts(query) {

    const text =
        normalizeProductText(query);


    if (!text) {
        return [];
    }


    return PRODUCTS.filter(
        product => {

            const searchableText =
                getProductSearchText(
                    product
                );

            return searchableText.includes(
                text
            );

        }
    );

}


/* =========================================================
   BÚSQUEDA CON PRODUCTOS DISPONIBLES
   ========================================================= */

function searchAvailableProducts(query) {

    const text =
        normalizeProductText(query);


    if (!text) {
        return [];
    }


    return PRODUCTS.filter(
        product => {

            if (
                product.available !== true
            ) {
                return false;
            }


            const searchableText =
                getProductSearchText(
                    product
                );


            return searchableText.includes(
                text
            );

        }
    );

}


/* =========================================================
   OBTENER TODAS LAS CATEGORÍAS
   ========================================================= */

function getProductCategories() {

    return [
        ...new Set(

            PRODUCTS
                .map(
                    product =>
                        product.category
                )
                .filter(Boolean)

        )
    ];

}


/* =========================================================
   OBTENER TODAS LAS COLECCIONES
   ========================================================= */

function getProductCollections() {

    return [
        ...new Set(

            PRODUCTS
                .map(
                    product =>
                        product.collection
                )
                .filter(Boolean)

        )
    ];

}


/* =========================================================
   OBTENER TODAS LAS SUBCATEGORÍAS
   ========================================================= */

function getProductSubcategories() {

    return [
        ...new Set(

            PRODUCTS
                .map(
                    product =>
                        product.subcategory
                )
                .filter(Boolean)

        )
    ];

}


/* =========================================================
   OBTENER TODAS LAS TALLAS
   ========================================================= */

function getProductSizes() {

    const sizes = [];


    PRODUCTS.forEach(
        product => {

            if (
                !Array.isArray(
                    product.sizes
                )
            ) {
                return;
            }


            product.sizes.forEach(
                size => {

                    if (
                        size &&
                        !sizes.includes(size)
                    ) {

                        sizes.push(size);

                    }

                }
            );

        }
    );


    return sizes;

}


/* =========================================================
   OBTENER TODOS LOS COLORES
   ========================================================= */

function getProductColors() {

    const colors = [];


    PRODUCTS.forEach(
        product => {

            if (
                !Array.isArray(
                    product.colors
                )
            ) {
                return;
            }


            product.colors.forEach(
                color => {

                    if (
                        color &&
                        !colors.includes(color)
                    ) {

                        colors.push(color);

                    }

                }
            );

        }
    );


    return colors;

}


/* =========================================================
   OBTENER RANGO DE PRECIOS
   ========================================================= */

function getProductPriceRange() {

    const prices =
        PRODUCTS
            .map(
                product =>
                    Number(
                        product.price
                    ) || 0
            )
            .filter(
                price =>
                    price > 0
            );


    if (!prices.length) {

        return {

            min: 0,

            max: 0

        };

    }


    return {

        min: Math.min(
            ...prices
        ),

        max: Math.max(
            ...prices
        )

    };

}


/* =========================================================
   PRODUCTOS POR RANGO DE PRECIO
   ========================================================= */

function getProductsByPriceRange(
    min = 0,
    max = Infinity
) {

    const minimum =
        Number(min) || 0;

    const maximum =
        Number(max);


    return PRODUCTS.filter(
        product => {

            const price =
                Number(
                    product.price
                ) || 0;


            return (
                price >= minimum &&
                (
                    !Number.isFinite(
                        maximum
                    ) ||
                    price <= maximum
                )
            );

        }
    );

}


/* =========================================================
   PRODUCTOS POR TALLA
   ========================================================= */

function getProductsBySize(size) {

    if (!size) {
        return [];
    }


    const normalizedSize =
        normalizeProductText(size);


    return PRODUCTS.filter(
        product => {

            if (
                !Array.isArray(
                    product.sizes
                )
            ) {
                return false;
            }


            return product.sizes.some(
                productSize =>
                    normalizeProductText(
                        productSize
                    ) === normalizedSize
            );

        }
    );

}


/* =========================================================
   PRODUCTOS POR COLOR
   ========================================================= */

function getProductsByColor(color) {

    if (!color) {
        return [];
    }


    const normalizedColor =
        normalizeProductText(color);


    return PRODUCTS.filter(
        product => {

            if (
                !Array.isArray(
                    product.colors
                )
            ) {
                return false;
            }


            return product.colors.some(
                productColor =>
                    normalizeProductText(
                        productColor
                    ) === normalizedColor
            );

        }
    );

}


/* =========================================================
   PRODUCTOS RELACIONADOS
   ========================================================= */

function getRelatedProducts(
    currentProductId,
    category = null,
    limit = 3
) {

    let products =
        PRODUCTS.filter(
            product =>

                product.id !==
                    currentProductId &&

                product.available === true

        );


    if (category) {

        const normalizedCategory =
            normalizeProductText(
                category
            );


        const sameCategory =
            products.filter(
                product =>

                    normalizeProductText(
                        product.category
                    ) ===
                    normalizedCategory

            );


        if (
            sameCategory.length > 0
        ) {

            products = [

                ...sameCategory,

                ...products.filter(
                    product =>

                        normalizeProductText(
                            product.category
                        ) !==
                        normalizedCategory

                )

            ];

        }

    }


    return products.slice(
        0,
        limit
    );

}


/* =========================================================
   ORDENAMIENTO
   ========================================================= */


/* =========================================================
   PRECIO MENOR → MAYOR
   ========================================================= */

function sortProductsByPriceAsc(
    products
) {

    return [...products].sort(
        (
            a,
            b
        ) =>
            (
                Number(
                    a.price
                ) || 0
            ) -
            (
                Number(
                    b.price
                ) || 0
            )
    );

}


/* =========================================================
   PRECIO MAYOR → MENOR
   ========================================================= */

function sortProductsByPriceDesc(
    products
) {

    return [...products].sort(
        (
            a,
            b
        ) =>
            (
                Number(
                    b.price
                ) || 0
            ) -
            (
                Number(
                    a.price
                ) || 0
            )
    );

}


/* =========================================================
   NOMBRE A → Z
   ========================================================= */

function sortProductsByNameAsc(
    products
) {

    return [...products].sort(
        (
            a,
            b
        ) =>
            String(
                a.name || ""
            ).localeCompare(
                String(
                    b.name || ""
                ),
                "es",
                {
                    sensitivity:
                        "base"
                }
            )
    );

}


/* =========================================================
   DESTACADOS PRIMERO
   ========================================================= */

function sortProductsByFeatured(
    products
) {

    return [...products].sort(
        (
            a,
            b
        ) => {

            const featuredA =
                a.featured === true
                    ? 1
                    : 0;

            const featuredB =
                b.featured === true
                    ? 1
                    : 0;


            return featuredB -
                featuredA;

        }
    );

}


/* =========================================================
   FILTRO COMBINADO
   ========================================================= */

function filterProducts(
    products,
    filters = {}
) {

    let result =
        Array.isArray(products)
            ? [...products]
            : [];


    /* =====================================================
       BÚSQUEDA
    ====================================================== */

    if (
        filters.search
    ) {

        const searchText =
            normalizeProductText(
                filters.search
            );


        result =
            result.filter(
                product =>

                    getProductSearchText(
                        product
                    ).includes(
                        searchText
                    )

            );

    }


    /* =====================================================
       CATEGORÍA
    ====================================================== */

    if (
        filters.category
    ) {

        const category =
            normalizeProductText(
                filters.category
            );


        result =
            result.filter(
                product =>

                    normalizeProductText(
                        product.category
                    ) === category

            );

    }


    /* =====================================================
       COLECCIÓN
    ====================================================== */

    if (
        filters.collection
    ) {

        const collection =
            normalizeProductText(
                filters.collection
            );


        result =
            result.filter(
                product =>

                    normalizeProductText(
                        product.collection
                    ) === collection

            );

    }


    /* =====================================================
       SUBCATEGORÍA
    ====================================================== */

    if (
        filters.subcategory
    ) {

        const subcategory =
            normalizeProductText(
                filters.subcategory
            );


        result =
            result.filter(
                product =>

                    normalizeProductText(
                        product.subcategory
                    ) === subcategory

            );

    }


    /* =====================================================
       TALLA
    ====================================================== */

    if (
        filters.size
    ) {

        const size =
            normalizeProductText(
                filters.size
            );


        result =
            result.filter(
                product => {

                    if (
                        !Array.isArray(
                            product.sizes
                        )
                    ) {
                        return false;
                    }


                    return product.sizes.some(
                        productSize =>

                            normalizeProductText(
                                productSize
                            ) === size

                    );

                }
            );

    }


    /* =====================================================
       COLOR
    ====================================================== */

    if (
        filters.color
    ) {

        const color =
            normalizeProductText(
                filters.color
            );


        result =
            result.filter(
                product => {

                    if (
                        !Array.isArray(
                            product.colors
                        )
                    ) {
                        return false;
                    }


                    return product.colors.some(
                        productColor =>

                            normalizeProductText(
                                productColor
                            ) === color

                    );

                }
            );

    }


    /* =====================================================
       PRECIO MÍNIMO
    ====================================================== */

    if (
        filters.minPrice !==
        undefined
    ) {

        const minPrice =
            Number(
                filters.minPrice
            ) || 0;


        result =
            result.filter(
                product =>

                    (
                        Number(
                            product.price
                        ) || 0
                    ) >= minPrice

            );

    }


    /* =====================================================
       PRECIO MÁXIMO
    ====================================================== */

    if (
        filters.maxPrice !==
        undefined
    ) {

        const maxPrice =
            Number(
                filters.maxPrice
            );


        if (
            Number.isFinite(
                maxPrice
            )
        ) {

            result =
                result.filter(
                    product =>

                        (
                            Number(
                                product.price
                            ) || 0
                        ) <= maxPrice

                );

        }

    }


    /* =====================================================
       DISPONIBILIDAD
    ====================================================== */

    if (
        filters.available === true
    ) {

        result =
            result.filter(
                product =>
                    product.available === true
            );

    }


    /* =====================================================
       DESTACADOS
    ====================================================== */

    if (
        filters.featured === true
    ) {

        result =
            result.filter(
                product =>
                    product.featured === true
            );

    }


    /* =====================================================
       NUEVOS
    ====================================================== */

    if (
        filters.newProduct === true
    ) {

        result =
            result.filter(
                product =>
                    isProductNew(product)
            );

    }


    return result;

}


/* =========================================================
   ORDENAMIENTO GENERAL
   ========================================================= */

function sortProducts(
    products,
    sort = "featured"
) {

    const list =
        Array.isArray(products)
            ? [...products]
            : [];


    switch (sort) {

        case "price-asc":

            return sortProductsByPriceAsc(
                list
            );


        case "price-desc":

            return sortProductsByPriceDesc(
                list
            );


        case "name-asc":

            return sortProductsByNameAsc(
                list
            );


        case "featured":

        default:

            return sortProductsByFeatured(
                list
            );

    }

}


/* =========================================================
   OBTENER PRODUCTOS PARA CATÁLOGO
   ========================================================= */

function getCatalogProducts(
    filters = {},
    sort = "featured"
) {

    let products =
        PRODUCTS.filter(
            product =>
                product.available === true
        );


    products =
        filterProducts(
            products,
            filters
        );


    products =
        sortProducts(
            products,
            sort
        );


    return products;

}


/* =========================================================
   COMPROBACIÓN
   ========================================================= */

console.log(
    `SatoriMode · ${PRODUCTS.length} producto(s) cargado(s).`
);
