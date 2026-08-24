/* =========================================================
   SATORII · GENERADOR DE PÁGINAS DE PRODUCTOS
   DISEÑO 2 · SATORII ANIME STREETWEAR

   VERSIÓN SUPABASE + FALLBACK LOCAL

   CORRECCIONES:
   ✓ Galería
   ✓ Cantidad
   ✓ Validación de talla
   ✓ Recomendaciones dinámicas
   ✓ Recomendaciones desde Supabase
   ✓ Precios dinámicos desde Supabase
   ✓ Disponibilidad dinámica desde Supabase
   ✓ Rutas de imágenes
   ✓ Banner
   ✓ Animaciones
   ✓ Favoritos
   ✓ Carrito
   ✓ Supabase
   ✓ Responsive
   ✓ Reduced motion
   ✓ Accesibilidad
   ✓ Fallbacks
   ✓ Rutas relativas seguras

   SALIDA:
   productos/{categoria}/{producto}.html
========================================================= */

"use strict";


/* =========================================================
   DEPENDENCIAS
========================================================= */

const fs =
    require("fs");

const path =
    require("path");

const vm =
    require("vm");


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const ROOT_DIR =
    path.resolve(
        __dirname,
        ".."
    );


const PRODUCTS_JS =
    path.join(
        ROOT_DIR,
        "js",
        "products.js"
    );


const PRODUCTS_DIR =
    path.join(
        ROOT_DIR,
        "productos"
    );


/* =========================================================
   COLORES SATORII
========================================================= */

const SATORII_RED =
    "#EF0930";

const SATORII_BLACK =
    "#080808";

const SATORII_DARK =
    "#101727";

const SATORII_WHITE =
    "#FFFFFF";

const SATORII_LIGHT =
    "#F5F5F5";

const SATORII_BORDER =
    "#DDDDDD";

const SATORII_TEXT =
    "#777777";


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    String(
        process.env.SATORII_SUPABASE_URL ||
        process.env.SUPABASE_URL ||
        ""
    ).trim();


const SUPABASE_PUBLISHABLE_KEY =
    String(
        process.env.SATORII_SUPABASE_PUBLISHABLE_KEY ||
        process.env.SUPABASE_PUBLISHABLE_KEY ||
        process.env.SUPABASE_ANON_KEY ||
        ""
    ).trim();


const SUPABASE_ENABLED =
    Boolean(
        SUPABASE_URL &&
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================================
   UTILIDADES
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   JSON SEGURO
========================================================= */

function safeJSONString(value) {

    return JSON.stringify(
        value
    )
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");

}


/* =========================================================
   SLUG
========================================================= */

function slugify(value) {

    return String(
        value ?? ""
    )
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}


/* =========================================================
   PRECIO
========================================================= */

function formatPrice(value) {

    return (
        "$" +
        (
            Number(value) || 0
        ).toLocaleString("es-CL") +
        " CLP"
    );

}


/* =========================================================
   URL PRODUCTO
========================================================= */

function normalizeProductUrl(product) {

    let url =
        String(
            product.url || ""
        )
            .trim()
            .replace(/^\/+/, "")
            .replace(/\\/g, "/");


    /*
       Si Supabase tiene una URL absoluta,
       la dejamos intacta.
    */

    if (
        /^(https?:)?\/\//i.test(url)
    ) {

        return url;

    }


    if (!url) {

        const category =
            slugify(
                product.category ||
                product.collection ||
                "anime"
            );


        const productName =
            slugify(
                product.id ||
                product.name
            );


        url =
            `productos/${category}/${productName}.html`;

    }


    if (
        !url
            .toLowerCase()
            .endsWith(".html")
    ) {

        url += ".html";

    }


    return url;

}


/* =========================================================
   PREFIJO RAÍZ
========================================================= */

function getRootPrefix(productUrl) {

    const normalized =
        String(productUrl)
            .replace(/\\/g, "/")
            .replace(/^\/+/, "");


    /*
       URLs absolutas no necesitan
       prefijo relativo.
    */

    if (
        /^(https?:)?\/\//i.test(normalized)
    ) {

        return "";

    }


    const directory =
        path.posix.dirname(
            normalized
        );


    if (
        !directory ||
        directory === "."
    ) {

        return "./";

    }


    const depth =
        directory
            .split("/")
            .filter(Boolean)
            .length;


    return "../".repeat(
        depth
    );

}


/* =========================================================
   ASSET LOCAL
========================================================= */

function resolveLocalAsset(
    image,
    productUrl
) {

    if (!image) {

        return null;

    }


    const clean =
        String(image)
            .trim()
            .replace(/^\/+/, "")
            .replace(/\\/g, "/");


    if (!clean) {

        return null;

    }


    if (
        /^(https?:)?\/\//i.test(clean) ||
        clean.startsWith("data:") ||
        clean.startsWith("blob:")
    ) {

        return {
            exists: true,
            remote: true,
            path: clean
        };

    }


    const normalizedProductUrl =
        String(productUrl)
            .replace(/\\/g, "/")
            .replace(/^\/+/, "");


    const productDirectory =
        path.dirname(
            path.join(
                ROOT_DIR,
                normalizedProductUrl
            )
        );


    const candidates = [

        path.resolve(
            ROOT_DIR,
            clean
        ),

        path.resolve(
            productDirectory,
            clean
        )

    ];


    for (
        const candidate of candidates
    ) {

        try {

            if (
                fs.existsSync(candidate) &&
                fs.statSync(candidate).isFile()
            ) {

                return {
                    exists: true,
                    remote: false,
                    path: candidate
                };

            }

        }

        catch (
            error
        ) {

            continue;

        }

    }


    return {
        exists: false,
        remote: false,
        path: null
    };

}


/* =========================================================
   RUTA FINAL DE IMAGEN
========================================================= */

function getImagePath(
    image,
    productUrl
) {

    if (!image) {

        return "";

    }


    const clean =
        String(image)
            .trim()
            .replace(/^\/+/, "")
            .replace(/\\/g, "/");


    if (!clean) {

        return "";

    }


    if (
        /^(https?:)?\/\//i.test(clean) ||
        clean.startsWith("data:") ||
        clean.startsWith("blob:")
    ) {

        return clean;

    }


    const asset =
        resolveLocalAsset(
            clean,
            productUrl
        );


    if (
        asset &&
        asset.exists &&
        !asset.remote
    ) {

        const relative =
            path.relative(
                ROOT_DIR,
                asset.path
            )
                .replace(/\\/g, "/");


        return (
            getRootPrefix(productUrl) +
            relative
        );

    }


    /*
       Fallback para archivos que todavía
       no existen al momento de generar.
    */

    return (
        getRootPrefix(productUrl) +
        clean
    );

}


/* =========================================================
   IMÁGENES
========================================================= */

function getProductImages(product) {

    /*
       Supabase puede entregar JSONB como array.
    */

    if (
        Array.isArray(product.images)
    ) {

        const images =
            product.images
                .filter(Boolean)
                .map(
                    image =>
                        String(image).trim()
                )
                .filter(Boolean);


        if (images.length) {

            return images;

        }

    }


    /*
       Fallback por si images llega como
       string JSON.
    */

    if (
        typeof product.images === "string"
    ) {

        try {

            const parsed =
                JSON.parse(
                    product.images
                );


            if (
                Array.isArray(parsed)
            ) {

                const images =
                    parsed
                        .filter(Boolean)
                        .map(
                            image =>
                                String(image).trim()
                        )
                        .filter(Boolean);


                if (images.length) {

                    return images;

                }

            }

        }

        catch (
            error
        ) {

            /*
               Continuamos usando image.
            */

        }

    }


    if (product.image) {

        return [
            String(
                product.image
            ).trim()
        ];

    }


    return [];

}


/* =========================================================
   PRIMERA IMAGEN VÁLIDA
========================================================= */

function getFirstValidImage(
    product,
    productUrl
) {

    const images =
        getProductImages(product);


    for (
        const image of images
    ) {

        const asset =
            resolveLocalAsset(
                image,
                productUrl
            );


        if (
            asset?.exists
        ) {

            return getImagePath(
                image,
                productUrl
            );

        }

    }


    /*
       Si es una URL remota, también sirve.
    */

    for (
        const image of images
    ) {

        if (
            /^(https?:)?\/\//i.test(
                String(image)
            )
        ) {

            return getImagePath(
                image,
                productUrl
            );

        }

    }


    return "";

}


/* =========================================================
   DESCRIPCIÓN
========================================================= */

function getDescription(product) {

    return (
        product.description ||
        product.details?.description ||
        "Diseño exclusivo SATORII."
    );

}


/* =========================================================
   DETALLES
========================================================= */

function getDetails(product) {

    const details =
        product.details || {};


    return {

        collection:
            product.collection ||
            product.category ||
            "SATORII",

        material:
            details.material ||
            product.material ||
            "Algodón premium.",

        print:
            details.print ||
            product.print ||
            "Estampado de alta definición.",

        fit:
            details.fit ||
            product.fit ||
            "Regular / Oversized",

        origin:
            details.origin ||
            product.origin ||
            "Diseñado en Chile",

        weight:
            details.weight ||
            product.weight ||
            "240 GSM"

    };

}


/* =========================================================
   TALLAS
========================================================= */

function getSizeGuide(product) {

    if (
        Array.isArray(product.sizeGuide) &&
        product.sizeGuide.length
    ) {

        return product.sizeGuide;

    }


    if (
        Array.isArray(
            product.details?.sizeGuide
        ) &&
        product.details.sizeGuide.length
    ) {

        return product.details.sizeGuide;

    }


    return [

        {
            size: "M",
            width: "51",
            length: "73"
        },

        {
            size: "L",
            width: "56",
            length: "75.5"
        },

        {
            size: "XL",
            width: "61",
            length: "78"
        }

    ];

}


/* =========================================================
   ENVÍOS
========================================================= */

function getShipping(product) {

    return (
        product.details?.shipping ||
        product.shipping ||
        "Enviamos a todo Chile. Los tiempos y costos de despacho dependen del destino y método de envío seleccionado."
    );

}


/* =========================================================
   CUIDADOS
========================================================= */

function getCare(product) {

    return (
        product.details?.care ||
        product.care ||
        "Lavar con agua fría. No utilizar cloro. No planchar directamente sobre el estampado. Preferir secado natural."
    );

}


/* =========================================================
   BANNER
========================================================= */

function getBannerImage(
    product,
    productUrl
) {

    const candidates = [

        product.bannerImage,
        product.featureImage,
        product.editorialImage,
        product.characterImage,
        product.details?.bannerImage,

        "img/banner-02.webp",
        "img/banner-02.jpg",
        "img/banner.webp",
        "img/banner.jpg"

    ].filter(Boolean);


    for (
        const image of candidates
    ) {

        const asset =
            resolveLocalAsset(
                image,
                productUrl
            );


        if (
            asset?.exists
        ) {

            return getImagePath(
                image,
                productUrl
            );

        }

    }


    return "";

}


function getBannerTitle(product) {

    return (
        product.bannerTitle ||
        product.details?.bannerTitle ||
        "EL UNIVERSO DETRÁS DE LA PRENDA"
    );

}


function getBannerText(product) {

    return (
        product.bannerText ||
        product.details?.bannerText ||
        "Una pieza creada para llevar la identidad del anime y la cultura urbana contigo."
    );

}


/* =========================================================
   DETECTAR POLERA
========================================================= */

function isTshirt(product) {

    const text =
        [
            product.type,
            product.productType,
            product.category,
            product.collection,
            product.subcategory,
            product.name
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


    return /polera|t-shirt|tshirt|tee|shirt|oversize/.test(
        text
    );

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const copy =
        array.slice();


    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];

    }


    return copy;

}


/* =========================================================
   RECOMENDACIONES
========================================================= */

function renderRecommendations(
    product,
    products,
    productUrl
) {

    const recommended =
        getRecommendedProducts(
            product,
            products
        );


    if (
        !Array.isArray(recommended) ||
        !recommended.length
    ) {

        return "";

    }


    const cards = [];


    recommended.forEach(
        function (item) {

            const url =
                normalizeProductUrl(
                    item
                );


            const itemImages =
                getProductImages(
                    item
                );


            let validImage = "";


            for (
                const image of itemImages
            ) {

                const asset =
                    resolveLocalAsset(
                        image,
                        url
                    );


                if (
                    asset?.exists ||
                    /^(https?:)?\/\//i.test(
                        String(image)
                    )
                ) {

                    validImage =
                        image;

                    break;

                }

            }


            if (!validImage) {

                return;

            }


            const image =
                getImagePath(
                    validImage,
                    url
                );


            const href =
                getRootPrefix(
                    productUrl
                ) +
                url;


            const card =
                [
                    '<a',
                    'class="satori-recommendation satori-animate satori-animate-up"',
                    'href="' +
                        escapeHTML(href) +
                    '"',
                    'data-product-id="' +
                        escapeHTML(
                            item.id
                        ) +
                    '"',
                    'data-supabase-product-id="' +
                        escapeHTML(
                            item.id
                        ) +
                    '"',
                    '>',
                    '<div class="satori-rec-image">',
                    '<img',
                    'src="' +
                        escapeHTML(image) +
                    '"',
                    'alt="' +
                        escapeHTML(
                            item.name
                        ) +
                    '"',
                    'loading="lazy"',
                    'decoding="async"',
                    '>',
                    '</div>',
                    '<div class="satori-rec-info">',
                    '<strong>',
                    escapeHTML(
                        item.name
                    ),
                    '</strong>',
                    '<span data-supabase-price="' +
                        escapeHTML(
                            String(item.id)
                        ) +
                    '">',
                    formatPrice(
                        item.price
                    ),
                    '</span>',
                    '</div>',
                    '</a>'
                ].join("");


            cards.push(
                card
            );

        }
    );


    if (!cards.length) {

        return "";

    }


    const collectionUrl =
        getRootPrefix(
            productUrl
        ) +
        "anime.html";


    return [
        '<section',
        'class="satori-recommendations satori-page-animate"',
        '>',
        '<div class="satori-section-heading">',
        '<div>',
        '<span>SATORII / SELECCIÓN</span>',
        '<h2>TAMBIÉN TE PUEDE GUSTAR</h2>',
        '</div>',
        '<a href="' +
            escapeHTML(
                collectionUrl
            ) +
        '">',
        'VER COLECCIÓN',
        '</a>',
        '</div>',
        '<div class="satori-recommendation-grid">',
        cards.join(""),
        '</div>',
        '</section>'
    ].join("");

}
/* =========================================================
   CARGAR PRODUCTS.JS
========================================================= */

function loadProducts() {

    if (
        !fs.existsSync(PRODUCTS_JS)
    ) {

        throw new Error(
            `No existe ${PRODUCTS_JS}`
        );

    }


    const source =
        fs.readFileSync(
            PRODUCTS_JS,
            "utf8"
        );


    const sandbox = {};


    vm.runInNewContext(
        source +
        "\nthis.__SATORII_PRODUCTS = PRODUCTS;",
        sandbox,
        {
            filename:
                PRODUCTS_JS
        }
    );


    if (
        !Array.isArray(
            sandbox.__SATORII_PRODUCTS
        )
    ) {

        throw new Error(
            "No se pudo cargar PRODUCTS desde products.js"
        );

    }


    return sandbox.__SATORII_PRODUCTS;

}


/* =========================================================
   GALERÍA
========================================================= */

function renderGallery(
    product,
    productUrl
) {

    const images =
        getProductImages(product);


    const validImages =
        images.filter(
            image => {

                const asset =
                    resolveLocalAsset(
                        image,
                        productUrl
                    );


                return (
                    asset?.exists ||
                    /^(https?:)?\/\//i.test(
                        String(image)
                    )
                );

            }
        );


    if (!validImages.length) {

        return `

            <div
                class="satori-product-image-empty"
            >
                <span>SATORII.</span>
            </div>

        `;

    }


    const mainImage =
        getImagePath(
            validImages[0],
            productUrl
        );


    const thumbs =
        validImages
            .slice(0, 6)
            .map(
                (
                    image,
                    index
                ) => {

                    const src =
                        getImagePath(
                            image,
                            productUrl
                        );


                    return `

                        <button
                            class="satori-thumb ${
                                index === 0
                                    ? "active"
                                    : ""
                            }"
                            type="button"
                            data-image="${escapeHTML(src)}"
                            aria-label="Ver imagen ${index + 1}"
                            aria-pressed="${
                                index === 0
                                    ? "true"
                                    : "false"
                            }"
                        >

                            <img
                                src="${escapeHTML(src)}"
                                alt="${escapeHTML(
                                    product.name
                                )}"
                                loading="${
                                    index === 0
                                        ? "eager"
                                        : "lazy"
                                }"
                                decoding="async"
                            >

                        </button>

                    `;

                }
            )
            .join("");


    return `

        <div
            class="satori-gallery
                   satori-animate
                   satori-animate-left"
        >

            <div
                class="satori-main-image"
            >

                <img
                    id="satoriMainProductImage"
                    src="${escapeHTML(mainImage)}"
                    alt="${escapeHTML(product.name)}"
                    fetchpriority="high"
                    decoding="async"
                >

            </div>


            <div
                class="satori-thumbnails"
            >

                ${thumbs}

            </div>

        </div>

    `;

}


/* =========================================================
   TALLAS
========================================================= */

function renderSizes(product) {

    const sizes =
        Array.isArray(product.sizes) &&
        product.sizes.length
            ? product.sizes
            : [
                "S",
                "M",
                "L",
                "XL"
            ];


    return sizes
        .map(
            (
                size,
                index
            ) => `

                <button
                    type="button"
                    class="satori-size ${
                        index === 0
                            ? "active"
                            : ""
                    }"
                    data-size="${escapeHTML(size)}"
                    aria-pressed="${
                        index === 0
                            ? "true"
                            : "false"
                    }"
                >

                    ${escapeHTML(size)}

                </button>

            `
        )
        .join("");

}


/* =========================================================
   COLORES
========================================================= */

function renderColors(product) {

    const colors =
        Array.isArray(product.colors) &&
        product.colors.length
            ? product.colors
            : [
                "Negro"
            ];


    return colors
        .map(
            (
                color,
                index
            ) => {

                const normalized =
                    String(color)
                        .toLowerCase();


                let colorValue =
                    "#111111";


                if (
                    normalized.includes("rojo")
                ) {

                    colorValue =
                        SATORII_RED;

                }

                else if (
                    normalized.includes("blanco")
                ) {

                    colorValue =
                        "#FFFFFF";

                }

                else if (
                    normalized.includes("gris")
                ) {

                    colorValue =
                        "#888888";

                }

                else if (
                    normalized.includes("azul")
                ) {

                    colorValue =
                        "#234B8C";

                }

                else if (
                    normalized.includes("verde")
                ) {

                    colorValue =
                        "#3D6B45";

                }


                return `

                    <button
                        type="button"
                        class="satori-color ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-color="${escapeHTML(color)}"
                        title="${escapeHTML(color)}"
                        aria-label="${escapeHTML(color)}"
                        aria-pressed="${
                            index === 0
                                ? "true"
                                : "false"
                        }"
                    >

                        <span
                            style="background:${colorValue}"
                        ></span>

                    </button>

                `;

            }
        )
        .join("");

}


/* =========================================================
   TABS
========================================================= */

function renderTabs(product) {

    const details =
        getDetails(product);


    return `

        <section
            class="satori-information
                   satori-page-animate
                   satori-animate"
            id="informacion-producto"
        >

            <div
                class="satori-tabs"
                role="tablist"
                aria-label="Información del producto"
            >

                <button
                    id="tab-description"
                    class="satori-tab active"
                    type="button"
                    data-tab="description"
                    role="tab"
                    aria-selected="true"
                    aria-controls="panel-description"
                >
                    DESCRIPCIÓN
                </button>

                <button
                    id="tab-details"
                    class="satori-tab"
                    type="button"
                    data-tab="details"
                    role="tab"
                    aria-selected="false"
                    aria-controls="panel-details"
                >
                    DETALLES
                </button>

                <button
                    id="tab-shipping"
                    class="satori-tab"
                    type="button"
                    data-tab="shipping"
                    role="tab"
                    aria-selected="false"
                    aria-controls="panel-shipping"
                >
                    ENVÍOS
                </button>

                <button
                    id="tab-care"
                    class="satori-tab"
                    type="button"
                    data-tab="care"
                    role="tab"
                    aria-selected="false"
                    aria-controls="panel-care"
                >
                    CUIDADOS
                </button>

            </div>


            <div
                id="panel-description"
                class="satori-tab-panel active"
                data-panel="description"
                role="tabpanel"
                aria-labelledby="tab-description"
            >

                <div class="satori-panel-intro">

                    <span>
                        SATORII / PRODUCT
                    </span>

                    <h2>
                        SOBRE ESTA PIEZA
                    </h2>

                </div>


                <p>
                    ${escapeHTML(
                        getDescription(product)
                    )}
                </p>


                <p>
                    En SATORII creemos que una polera
                    puede ser mucho más que una prenda.
                    Cada diseño busca representar una
                    historia, personaje o universo que
                    forma parte de nuestra cultura.
                </p>

            </div>


            <div
                id="panel-details"
                class="satori-tab-panel"
                data-panel="details"
                role="tabpanel"
                aria-labelledby="tab-details"
            >

                <div class="satori-detail-grid">

                    <div>
                        <span>COLECCIÓN</span>
                        <strong>
                            ${escapeHTML(
                                details.collection
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>MATERIAL</span>
                        <strong>
                            ${escapeHTML(
                                details.material
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>ESTAMPADO</span>
                        <strong>
                            ${escapeHTML(
                                details.print
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>FIT</span>
                        <strong>
                            ${escapeHTML(
                                details.fit
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>ORIGEN</span>
                        <strong>
                            ${escapeHTML(
                                details.origin
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>PESO</span>
                        <strong>
                            ${escapeHTML(
                                details.weight
                            )}
                        </strong>
                    </div>

                </div>

            </div>


            <div
                id="panel-shipping"
                class="satori-tab-panel"
                data-panel="shipping"
                role="tabpanel"
                aria-labelledby="tab-shipping"
            >

                <div class="satori-panel-intro">

                    <span>
                        SATORII / SHIPPING
                    </span>

                    <h2>
                        ENVÍOS Y CAMBIOS
                    </h2>

                </div>


                <p>
                    ${escapeHTML(
                        getShipping(product)
                    )}
                </p>


                <div class="satori-info-list">

                    <div>
                        <strong>
                            ENVÍOS A TODO CHILE
                        </strong>

                        <span>
                            Despachamos a regiones y Santiago.
                        </span>
                    </div>


                    <div>
                        <strong>
                            CAMBIOS Y DEVOLUCIONES
                        </strong>

                        <span>
                            Revisa nuestras condiciones antes
                            de realizar tu compra.
                        </span>
                    </div>


                    <div>
                        <strong>
                            PAGO SEGURO
                        </strong>

                        <span>
                            Compra mediante nuestros medios
                            de pago disponibles.
                        </span>
                    </div>

                </div>

            </div>


            <div
                id="panel-care"
                class="satori-tab-panel"
                data-panel="care"
                role="tabpanel"
                aria-labelledby="tab-care"
            >

                <div class="satori-panel-intro">

                    <span>
                        SATORII / CARE
                    </span>

                    <h2>
                        CUIDADOS DE LA PRENDA
                    </h2>

                </div>


                <p>
                    ${escapeHTML(
                        getCare(product)
                    )}
                </p>


                <ul>

                    <li>
                        Lavar preferentemente con agua fría.
                    </li>

                    <li>
                        No utilizar cloro.
                    </li>

                    <li>
                        No planchar directamente sobre el estampado.
                    </li>

                    <li>
                        Evitar secadora a altas temperaturas.
                    </li>

                </ul>

            </div>

        </section>

    `;

}


/* =========================================================
   RECOMENDACIONES ESTÁTICAS
   FALLBACK INICIAL
========================================================= */

function renderRecommendations(
    product,
    products,
    productUrl
) {

    const recommended =
        getRecommendedProducts(
            product,
            products
        );


    if (!recommended.length) {

        return "";

    }


    const cards =
        recommended
            .map(
                item => {

                    const url =
                        normalizeProductUrl(item);


                    const itemImages =
                        getProductImages(item);


                    const validImage =
                        itemImages.find(
                            image => {

                                const asset =
                                    resolveLocalAsset(
                                        image,
                                        url
                                    );


                                return (
                                    asset?.exists ||
                                    /^(https?:)?\/\//i.test(
                                        String(image)
                                    )
                                );

                            }
                        );


                    if (!validImage) {

                        return "";

                    }


                    const image =
                        getImagePath(
                            validImage,
                            url
                        );


                    const href =
                        getRootPrefix(
                            productUrl
                        ) +
                        url;


                    return `

                        <a
                            class="satori-recommendation
                                   satori-animate
                                   satori-animate-up"
                            href="${escapeHTML(href)}"
                            data-product-id="${escapeHTML(
                                item.id
                            )}"
                        >

                            <div
                                class="satori-rec-image"
                            >

                                <img
                                    src="${escapeHTML(image)}"
                                    alt="${escapeHTML(
                                        item.name
                                    )}"
                                    loading="lazy"
                                    decoding="async"
                                >

                            </div>


                            <div
                                class="satori-rec-info"
                            >

                                <strong>
                                    ${escapeHTML(
                                        item.name
                                    )}
                                </strong>

                                <span>
                                    ${formatPrice(
                                        item.price
                                    )}
                                </span>

                            </div>

                        </a>

                    `;

                }
            )
            .filter(Boolean)
            .join("");


    if (!cards) {

        return "";

    }


    return `

        <section
            class="satori-recommendations
                   satori-page-animate"
            id="satoriRecommendations"
        >

            <div
                class="satori-section-heading"
            >

                <div>

                    <span>
                        SATORII / STREETWEAR
                    </span>

                    <h2>
                        POLERAS RECOMENDADAS
                    </h2>

                </div>


                <a
                    href="${escapeHTML(
                        getRootPrefix(productUrl) +
                        "anime.html"
                    )}"
                >
                    VER COLECCIÓN
                </a>

            </div>


            <div
                class="satori-recommendation-grid"
            >

                ${cards}

            </div>

        </section>

    `;

}


/* =========================================================
   GENERAR PÁGINA
========================================================= */

function generateProductPage(
    product,
    products
) {

    const productUrl =
        normalizeProductUrl(product);


    const outputPath =
        path.join(
            ROOT_DIR,
            ...productUrl.split("/")
        );


    fs.mkdirSync(
        path.dirname(outputPath),
        {
            recursive:
                true
        }
    );


    const root =
        getRootPrefix(productUrl);


    const images =
        getProductImages(product);


    const firstImage =
        getFirstValidImage(
            product,
            productUrl
        );


    const bannerImage =
        getBannerImage(
            product,
            productUrl
        );


    const category =
        String(
            product.category ||
            product.collection ||
            "anime"
        );


    const recommendations =
        renderRecommendations(
            product,
            products,
            productUrl
        );


    const gallery =
        renderGallery(
            product,
            productUrl
        );


    const sizes =
        renderSizes(product);


    const colors =
        renderColors(product);


    const tabs =
        renderTabs(product);


    const firstSize =
        Array.isArray(product.sizes) &&
        product.sizes.length
            ? product.sizes[0]
            : "S";


    const firstColor =
        product.colors?.[0] ||
        "Negro";


    /*
       DATOS INICIALES.

       Estos datos son fallback.
       Supabase puede reemplazar precio,
       disponibilidad e imagen al cargar.
    */

    const productData = {

        id:
            String(
                product.id || ""
            ),

        name:
            product.name || "",

        price:
            Number(product.price) || 0,

        category:
            product.category || "",

        collection:
            product.collection || "",

        subcategory:
            product.subcategory || "",

        available:
            product.available !== false,

        url:
            productUrl,

        image:
            firstImage,

        images:
            images,

        sizes:
            product.sizes || [],

        colors:
            product.colors || []

    };


    const html = `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="theme-color"
        content="${SATORII_DARK}"
    >

    <meta
        name="description"
        content="${escapeHTML(
            getDescription(product)
        )}"
    >

    <meta
        property="og:title"
        content="${escapeHTML(
            product.name
        )} | SATORII"
    >

    <meta
        property="og:description"
        content="${escapeHTML(
            getDescription(product)
        )}"
    >

    ${
        firstImage
            ? `
    <meta
        property="og:image"
        content="${escapeHTML(firstImage)}"
    >
    `
            : ""
    }

    <title>
        ${escapeHTML(product.name)} | SATORII
    </title>


    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    >

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >

    <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
    >


    <link
        rel="stylesheet"
        href="${root}css/style.css"
    >


    ${
        SUPABASE_ENABLED
            ? `
    <script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
        defer
    ></script>
    `
            : ""
    }


    <style>

        :root {

            --s-red:
                ${SATORII_RED};

            --s-dark:
                ${SATORII_DARK};

            --s-black:
                ${SATORII_BLACK};

            --s-white:
                ${SATORII_WHITE};

            --s-light:
                ${SATORII_LIGHT};

            --s-border:
                ${SATORII_BORDER};

            --s-text:
                ${SATORII_TEXT};

            --s-heading:
                "Barlow Condensed",
                sans-serif;

            --s-body:
                "Inter",
                sans-serif;

        }


        .satori-product-page *,
        .satori-editorial *,
        .satori-recommendations * {

            box-sizing:
                border-box;

        }


        html {

            scroll-behavior:
                smooth;

        }


        body {

            margin:
                0;

            background:
                #ffffff;

            color:
                var(--s-black);

            font-family:
                var(--s-body);

        }


        body.satori-page-loading {

            overflow-x:
                hidden;

        }


        button,
        input,
        select,
        textarea {

            font-family:
                var(--s-body);

        }


        /* ==========================================
           ANIMACIONES
        ========================================== */

        .satori-animate {

            opacity:
                0;

            transform:
                translate3d(
                    0,
                    28px,
                    0
                );

            transition:
                opacity .75s ease,
                transform .75s cubic-bezier(
                    .22,
                    1,
                    .36,
                    1);

            will-change:
                opacity,
                transform;

        }


        .satori-animate-left {

            transform:
                translate3d(
                    -28px,
                    0,
                    0
                );

        }


        .satori-animate-right {

            transform:
                translate3d(
                    28px,
                    0,
                    0
                );

        }


        .satori-animate-up {

            transform:
                translate3d(
                    0,
                    28px,
                    0
                );

        }


        .satori-page-ready
        .satori-animate.is-visible {

            opacity:
                1;

            transform:
                translate3d(
                    0,
                    0,
                    0
                );

        }


        .satori-product-info {

            opacity:
                0;

            transform:
                translate3d(
                    28px,
                    0,
                    0
                );

            transition:
                opacity .8s ease,
                transform .8s cubic-bezier(
                    .22,
                    1,
                    .36,
                    1);

            transition-delay:
                .18s;

        }


        .satori-page-ready
        .satori-product-info.is-visible {

            opacity:
                1;

            transform:
                translate3d(
                    0,
                    0,
                    0
                );

        }


        .satori-gallery {

            transition-delay:
                .08s;

        }


        .satori-recommendation:nth-child(1) {
            transition-delay: .05s;
        }

        .satori-recommendation:nth-child(2) {
            transition-delay: .12s;
        }

        .satori-recommendation:nth-child(3) {
            transition-delay: .19s;
        }

        .satori-recommendation:nth-child(4) {
            transition-delay: .26s;
        }


        /* ==========================================
           CONTENEDOR
        ========================================== */

        .satori-product-page {

            width:
                100%;

            max-width:
                1440px;

            margin:
                0 auto;

            padding:
                42px 42px 0;

        }


        /* ==========================================
           BREADCRUMB
        ========================================== */

        .satori-breadcrumb {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                8px;

            margin:
                0 0 30px;

            font-size:
                10px;

            line-height:
                1.4;

            font-weight:
                700;

            letter-spacing:
                .08em;

            text-transform:
                uppercase;

            color:
                #888888;

        }


        .satori-breadcrumb span:last-child {

            color:
                var(--s-black);

        }


        /* ==========================================
           PRODUCTO
        ========================================== */

        .satori-product-layout {

            display:
                grid;

            grid-template-columns:
                minmax(0, 1.12fr)
                minmax(380px, .88fr);

            gap:
                64px;

            align-items:
                start;

        }


        /* ==========================================
           GALERÍA
        ========================================== */

        .satori-gallery {

            min-width:
                0;

        }


        .satori-main-image {

            width:
                100%;

            aspect-ratio:
                1 / 1;

            overflow:
                hidden;

            background:
                #f6f6f6;

        }


        .satori-main-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                contain;

            transition:
                opacity .25s ease,
                transform .45s cubic-bezier(
                    .22,
                    1,
                    .36,
                    1);

        }


        .satori-main-image:hover img {

            transform:
                scale(1.02);

        }


        .satori-thumbnails {

            display:
                grid;

            grid-template-columns:
                repeat(5, 1fr);

            gap:
                10px;

            margin-top:
                12px;

        }


        .satori-thumb {

            display:
                block;

            padding:
                0;

            border:
                1px solid transparent;

            background:
                #f5f5f5;

            aspect-ratio:
                1 / 1;

            overflow:
                hidden;

            cursor:
                pointer;

            transition:
                border-color .2s ease,
                transform .2s ease;

        }


        .satori-thumb:hover {

            transform:
                translateY(-2px);

        }


        .satori-thumb.active {

            border-color:
                var(--s-red);

        }


        .satori-thumb img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

        }


        .satori-product-image-empty {

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            aspect-ratio:
                1 / 1;

            background:
                var(--s-light);

            color:
                var(--s-red);

            font-family:
                var(--s-heading);

            font-size:
                60px;

            font-weight:
                900;

        }


        /* ==========================================
           INFO PRODUCTO
        ========================================== */

        .satori-product-info {

            min-width:
                0;

            padding:
                2px 0 0;

        }


        .satori-product-category {

            margin-bottom:
                12px;

            color:
                #777777;

            font-size:
                10px;

            line-height:
                1.2;

            font-weight:
                800;

            letter-spacing:
                .14em;

            text-transform:
                uppercase;

        }


        .satori-product-title {

            margin:
                0;

            font-family:
                var(--s-heading);

            font-size:
                clamp(46px, 5vw, 72px);

            line-height:
                .88;

            font-weight:
                900;

            letter-spacing:
                -.025em;

            text-transform:
                uppercase;

        }


        .satori-product-subtitle {

            margin:
                10px 0 20px;

            color:
                #777777;

            font-size:
                12px;

            line-height:
                1.4;

            font-weight:
                600;

            letter-spacing:
                .04em;

            text-transform:
                uppercase;

        }


        .satori-price {

            margin:
                0 0 5px;

            color:
                var(--s-red);

            font-size:
                25px;

            line-height:
                1.2;

            font-weight:
                900;

        }


        .satori-tax {

            display:
                block;

            margin:
                0 0 28px;

            color:
                #888888;

            font-size:
                10px;

            line-height:
                1.4;

        }


        /* ==========================================
           OPCIONES
        ========================================== */

        .satori-option {

            margin:
                0 0 24px;

        }


        .satori-option-label {

            display:
                flex;

            justify-content:
                space-between;

            align-items:
                center;

            gap:
                15px;

            margin-bottom:
                10px;

            color:
                var(--s-black);

            font-size:
                10px;

            line-height:
                1.3;

            font-weight:
                900;

            letter-spacing:
                .07em;

            text-transform:
                uppercase;

        }


        .satori-option-label a {

            color:
                var(--s-black);

            font-size:
                9px;

            text-decoration:
                underline;

            text-underline-offset:
                3px;

        }


        .satori-option-label a:hover {

            color:
                var(--s-red);

        }


        /* ==========================================
           TALLAS
        ========================================== */

        .satori-size-list {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                7px;

        }


        .satori-size {

            min-width:
                48px;

            height:
                42px;

            padding:
                0 12px;

            border:
                1px solid #d5d5d5;

            background:
                #ffffff;

            color:
                var(--s-black);

            cursor:
                pointer;

            font-size:
                11px;

            font-weight:
                800;

            transition:
                .2s ease;

        }


        .satori-size:hover {

            border-color:
                var(--s-black);

            transform:
                translateY(-1px);

        }


        .satori-size.active {

            border-color:
                var(--s-black);

            background:
                var(--s-black);

            color:
                #ffffff;

        }


        /* ==========================================
           COLORES
        ========================================== */

        .satori-color-list {

            display:
                flex;

            gap:
                10px;

        }


        .satori-color {

            width:
                34px;

            height:
                34px;

            padding:
                3px;

            border:
                1px solid #cccccc;

            border-radius:
                50%;

            background:
                #ffffff;

            cursor:
                pointer;

            transition:
                .2s ease;

        }


        .satori-color:hover {

            transform:
                scale(1.08);

        }


        .satori-color span {

            display:
                block;

            width:
                100%;

            height:
                100%;

            border:
                1px solid #aaaaaa;

            border-radius:
                50%;

        }


        .satori-color.active {

            border:
                2px solid
                var(--s-red);

        }


        /* ==========================================
           COMPRA
        ========================================== */

        .satori-buy-block {

            margin-top:
                4px;

        }


        .satori-buy-label {

            display:
                block;

            margin-bottom:
                10px;

            color:
                var(--s-black);

            font-size:
                10px;

            line-height:
                1.3;

            font-weight:
                900;

            letter-spacing:
                .07em;

            text-transform:
                uppercase;

        }


        .satori-buy-row {

            display:
                grid;

            grid-template-columns:
                124px
                minmax(0, 1fr);

            gap:
                10px;

        }


        .satori-quantity {

            display:
                flex;

            width:
                124px;

            height:
                46px;

            border:
                1px solid #cccccc;

            background:
                #ffffff;

        }


        .satori-quantity button {

            width:
                40px;

            padding:
                0;

            border:
                0;

            background:
                #ffffff;

            color:
                var(--s-black);

            cursor:
                pointer;

            font-size:
                18px;

            line-height:
                1;

        }


        .satori-quantity button:hover {

            background:
                #f5f5f5;

        }


        .satori-quantity span {

            flex:
                1;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            font-size:
                12px;

            font-weight:
                800;

        }


        .satori-add-to-cart {

            min-height:
                46px;

            padding:
                0 18px;

            border:
                0;

            background:
                var(--s-red);

            color:
                #ffffff;

            cursor:
                pointer;

            font-size:
                11px;

            line-height:
                1.2;

            font-weight:
                900;

            letter-spacing:
                .06em;

            text-transform:
                uppercase;

            transition:
                .2s ease;

        }


        .satori-add-to-cart:hover {

            background:
                #c90025;

            transform:
                translateY(-1px);

        }


        .satori-add-to-cart:disabled {

            opacity:
                .55;

            cursor:
                not-allowed;

            transform:
                none;

        }


        .satori-favorite {

            width:
                100%;

            min-height:
                44px;

            margin-top:
                10px;

            border:
                1px solid #cccccc;

            background:
                #ffffff;

            color:
                var(--s-black);

            cursor:
                pointer;

            font-size:
                10px;

            font-weight:
                800;

            letter-spacing:
                .05em;

            text-transform:
                uppercase;

        }


        .satori-favorite.active {

            border-color:
                var(--s-red);

            color:
                var(--s-red);

        }


        /* ==========================================
           BENEFICIOS
        ========================================== */

        .satori-benefits {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            margin-top:
                26px;

            border-top:
                1px solid
                var(--s-border);

            border-bottom:
                1px solid
                var(--s-border);

        }


        .satori-benefit {

            min-width:
                0;

            padding:
                17px 8px;

            text-align:
                center;

            border-right:
                1px solid
                var(--s-border);

        }


        .satori-benefit:last-child {

            border-right:
                0;

        }


        .satori-benefit strong {

            display:
                block;

            margin-bottom:
                5px;

            font-size:
                9px;

            font-weight:
                900;

        }


        .satori-benefit span {

            display:
                block;

            color:
                #777777;

            font-size:
                9px;

            line-height:
                1.45;

        }


        /* ==========================================
           INFORMACIÓN
        ========================================== */

        .satori-information {

            margin:
                68px 0 0;

            border-top:
                1px solid
                var(--s-border);

        }


        .satori-tabs {

            display:
                flex;

            overflow-x:
                auto;

            border-bottom:
                1px solid
                var(--s-border);

            scrollbar-width:
                none;

        }


        .satori-tabs::-webkit-scrollbar {

            display:
                none;

        }


        .satori-tab {

            position:
                relative;

            flex:
                0 0 auto;

            padding:
                18px 22px;

            border:
                0;

            background:
                #ffffff;

            color:
                #888888;

            cursor:
                pointer;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .05em;

            text-transform:
                uppercase;

        }


        .satori-tab.active {

            color:
                var(--s-black);

        }


        .satori-tab.active::after {

            content:
                "";

            position:
                absolute;

            left:
                0;

            right:
                0;

            bottom:
                -1px;

            height:
                3px;

            background:
                var(--s-red);

        }


        .satori-tab-panel {

            display:
                none;

            max-width:
                900px;

            padding:
                34px 5px 10px;

        }


        .satori-tab-panel.active {

            display:
                block;

        }


        .satori-panel-intro {

            margin-bottom:
                18px;

        }


        .satori-panel-intro span {

            display:
                block;

            margin-bottom:
                6px;

            color:
                var(--s-red);

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                .12em;

        }


        .satori-tab-panel h2 {

            margin:
                0;

            font-family:
                var(--s-heading);

            font-size:
                30px;

            line-height:
                .95;

            font-weight:
                900;

        }


        .satori-tab-panel p {

            max-width:
                800px;

            margin:
                0 0 15px;

            color:
                #555555;

            font-size:
                13px;

            line-height:
                1.75;

        }


        /* ==========================================
           DETALLES
        ========================================== */

        .satori-detail-grid {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap:
                1px;

            border:
                1px solid
                var(--s-border);

            background:
                var(--s-border);

        }


        .satori-detail-grid div {

            padding:
                20px;

            background:
                #ffffff;

        }


        .satori-detail-grid span {

            display:
                block;

            margin-bottom:
                7px;

            color:
                #888888;

            font-size:
                9px;

            font-weight:
                800;

        }


        .satori-detail-grid strong {

            display:
                block;

            font-size:
                12px;

            line-height:
                1.4;

        }


        /* ==========================================
           ENVÍOS
        ========================================== */

        .satori-info-list {

            display:
                grid;

            gap:
                10px;

            margin-top:
                25px;

        }


        .satori-info-list div {

            padding:
                17px;

            background:
                var(--s-light);

        }


        .satori-info-list strong {

            display:
                block;

            margin-bottom:
                5px;

            font-size:
                10px;

            font-weight:
                900;

        }


        .satori-info-list span {

            color:
                #777777;

            font-size:
                11px;

        }


        /* ==========================================
           BANNER
        ========================================== */

        .satori-editorial {

            position:
                relative;

            width:
                100%;

            min-height:
                360px;

            margin:
                72px 0 0;

            overflow:
                hidden;

            background:
                var(--s-dark);

        }


        .satori-editorial img {

            position:
                absolute;

            inset:
                0;

            width:
                100%;

            height:
                100%;

            object-fit:
                cover;

            opacity:
                .62;

        }


        .satori-editorial::after {

            content:
                "";

            position:
                absolute;

            inset:
                0;

            background:
                linear-gradient(
                    90deg,
                    rgba(16,23,39,.98) 0%,
                    rgba(16,23,39,.82) 38%,
                    rgba(16,23,39,.35) 70%,
                    rgba(16,23,39,.12) 100%
                );

        }


        .satori-editorial-content {

            position:
                relative;

            z-index:
                2;

            min-height:
                360px;

            width:
                100%;

            max-width:
                1440px;

            margin:
                0 auto;

            padding:
                55px 42px;

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            color:
                #ffffff;

        }


        .satori-editorial-content span {

            display:
                block;

            margin-bottom:
                10px;

            color:
                var(--s-red);

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .14em;

        }


        .satori-editorial-content h2 {

            max-width:
                700px;

            margin:
                0 0 14px;

            font-family:
                var(--s-heading);

            font-size:
                clamp(46px, 6vw, 78px);

            line-height:
                .87;

            font-weight:
                900;

        }


        .satori-editorial-content p {

            max-width:
                500px;

            margin:
                0;

            color:
                rgba(255,255,255,.82);

            font-size:
                12px;

            line-height:
                1.7;

        }


        /* ==========================================
           RECOMENDACIONES
        ========================================== */

        .satori-recommendations-wrapper {

            width:
                100%;

        }


        .satori-recommendations {

            padding:
                62px 0 55px;

        }


        .satori-section-heading {

            display:
                flex;

            align-items:
                flex-end;

            justify-content:
                space-between;

            gap:
                20px;

            margin-bottom:
                22px;

        }


        .satori-section-heading span {

            display:
                block;

            margin-bottom:
                7px;

            color:
                var(--s-red);

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                .12em;

        }


        .satori-section-heading h2 {

            margin:
                0;

            font-family:
                var(--s-heading);

            font-size:
                40px;

            line-height:
                .9;

            font-weight:
                900;

        }


        .satori-section-heading a {

            color:
                var(--s-black);

            font-size:
                10px;

            font-weight:
                900;

            text-decoration:
                none;

        }


        .satori-section-heading a:hover {

            color:
                var(--s-red);

        }


        .satori-recommendation-grid {

            display:
                grid;

            grid-template-columns:
                repeat(4, minmax(0, 1fr));

            gap:
                18px;

        }


        .satori-recommendation {

            display:
                block;

            color:
                inherit;

            text-decoration:
                none;

        }


        .satori-rec-image {

            position:
                relative;

            width:
                100%;

            aspect-ratio:
                1 / 1.08;

            overflow:
                hidden;

            background:
                #f5f5f5;

        }


        .satori-rec-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

            transition:
                transform .45s cubic-bezier(
                    .22,
                    1,
                    .36,
                    1);

        }


        .satori-recommendation:hover
        .satori-rec-image img {

            transform:
                scale(1.035);

        }


        .satori-rec-info {

            display:
                flex;

            flex-direction:
                column;

            gap:
                5px;

            padding:
                13px 2px;

        }


        .satori-rec-info strong {

            overflow:
                hidden;

            color:
                var(--s-black);

            font-size:
                12px;

            font-weight:
                800;

            white-space:
                nowrap;

            text-overflow:
                ellipsis;

        }


        .satori-rec-info span {

            color:
                var(--s-red);

            font-size:
                12px;

            font-weight:
                900;

        }


        /* ==========================================
           TABLET
        ========================================== */

        @media (max-width: 1100px) {

            .satori-product-page {

                padding:
                    34px 28px 0;

            }


            .satori-product-layout {

                grid-template-columns:
                    minmax(0,1fr)
                    minmax(330px,.8fr);

                gap:
                    35px;

            }

        }


        /* ==========================================
           MOBILE
        ========================================== */

        @media (max-width: 900px) {

            .satori-product-page {

                padding:
                    28px 20px 0;

            }


            .satori-product-layout {

                grid-template-columns:
                    1fr;

                gap:
                    34px;

            }


            .satori-product-info {

                padding:
                    0;

            }


            .satori-recommendation-grid {

                grid-template-columns:
                    repeat(2,minmax(0,1fr));

            }


            .satori-editorial-content {

                padding:
                    50px 28px;

            }

        }


        /* ==========================================
           MOBILE PEQUEÑO
        ========================================== */

        @media (max-width: 600px) {

            .satori-product-page {

                padding:
                    18px 12px 0;

            }


            .satori-breadcrumb {

                margin-bottom:
                    18px;

                font-size:
                    8px;

            }


            .satori-main-image {

                aspect-ratio:
                    1 / 1.03;

            }


            .satori-thumbnails {

                grid-template-columns:
                    repeat(4,1fr);

                gap:
                    7px;

            }


            .satori-product-title {

                font-size:
                    clamp(42px,14vw,54px);

            }


            .satori-price {

                font-size:
                    22px;

            }


            .satori-buy-row {

                grid-template-columns:
                    108px
                    minmax(0,1fr);

                gap:
                    8px;

            }


            .satori-quantity {

                width:
                    108px;

            }


            .satori-add-to-cart {

                padding:
                    0 8px;

                font-size:
                    9px;

            }


            .satori-benefit {

                padding:
                    14px 5px;

            }


            .satori-benefit strong {

                font-size:
                    7px;

            }


            .satori-benefit span {

                font-size:
                    7px;

            }


            .satori-tabs {

                margin-left:
                    -12px;

                margin-right:
                    -12px;

                padding-left:
                    4px;

            }


            .satori-tab {

                padding:
                    16px 12px;

                font-size:
                    8px;

            }


            .satori-tab-panel {

                padding:
                    26px 0 8px;

            }


            .satori-detail-grid {

                grid-template-columns:
                    repeat(2,minmax(0,1fr));

            }


            .satori-editorial {

                min-height:
                    360px;

                margin-top:
                    48px;

            }


            .satori-editorial-content {

                min-height:
                    360px;

                padding:
                    30px 20px;

                justify-content:
                    flex-end;

            }


            .satori-editorial::after {

                background:
                    linear-gradient(
                        180deg,
                        rgba(16,23,39,.32) 0%,
                        rgba(16,23,39,.88) 65%,
                        rgba(16,23,39,.98) 100%
                    );

            }


            .satori-recommendations {

                padding:
                    45px 0 42px;

            }


            .satori-section-heading {

                display:
                    block;

            }


            .satori-section-heading a {

                display:
                    inline-block;

                margin-top:
                    11px;

            }


            .satori-recommendation-grid {

                grid-template-columns:
                    repeat(2,minmax(0,1fr));

                gap:
                    20px 10px;

            }

        }


        /* ==========================================
           MUY PEQUEÑO
        ========================================== */

        @media (max-width: 380px) {

            .satori-product-page {

                padding-left:
                    10px;

                padding-right:
                    10px;

            }


            .satori-product-title {

                font-size:
                    40px;

            }


            .satori-buy-row {

                grid-template-columns:
                    94px
                    1fr;

            }


            .satori-quantity {

                width:
                    94px;

            }


            .satori-quantity button {

                width:
                    31px;

            }

        }


        /* ==========================================
           REDUCED MOTION
        ========================================== */

        @media (prefers-reduced-motion: reduce) {

            html {

                scroll-behavior:
                    auto;

            }


            *,
            *::before,
            *::after {

                animation-duration:
                    .01ms !important;

                animation-iteration-count:
                    1 !important;

                transition-duration:
                    .01ms !important;

                scroll-behavior:
                    auto !important;

            }


            .satori-animate,
            .satori-product-info {

                opacity:
                    1 !important;

                transform:
                    none !important;

            }

        }

    </style>

</head>


<body
    class="satori-page-loading"
>


    <!-- HEADER -->

    <script
        src="${root}js/header.js"
    ></script>


    <!-- CONTENIDO -->

    <main
        class="satori-product-page"
    >

        <div
            class="satori-breadcrumb
                   satori-page-animate
                   satori-animate"
        >

            <span>INICIO</span>

            <span>/</span>

            <span>
                ${escapeHTML(category)}
            </span>

            <span>/</span>

            <span>
                ${escapeHTML(product.name)}
            </span>

        </div>


        <section
            class="satori-product-layout"
        >

            ${gallery}


            <div
                class="satori-product-info
                       satori-page-animate"
            >

                <div
                    class="satori-product-category"
                >
                    ${escapeHTML(
                        product.collection ||
                        product.category ||
                        "SATORII"
                    )}
                </div>


                <h1
                    class="satori-product-title"
                >
                    ${escapeHTML(
                        product.name
                    )}
                </h1>


                <div
                    class="satori-product-subtitle"
                >
                    SATORII · ANIME STREETWEAR
                </div>


                <div
                    id="satoriProductPrice"
                    class="satori-price"
                    data-price="${Number(
                        product.price
                    ) || 0}"
                >
                    ${formatPrice(product.price)}
                </div>


                <span
                    class="satori-tax"
                >
                    Impuestos incluidos.
                </span>


                <!-- TALLA -->

                <div
                    class="satori-option"
                >

                    <div
                        class="satori-option-label"
                    >

                        <span>TALLA</span>

                        <a
                            href="${escapeHTML(
                                root +
                                "guia-tallas.html"
                            )}"
                        >
                            GUÍA DE TALLAS
                        </a>

                    </div>


                    <div
                        class="satori-size-list"
                    >

                        ${sizes}

                    </div>

                </div>


                <!-- COLOR -->

                <div
                    class="satori-option"
                >

                    <div
                        class="satori-option-label"
                    >

                        <span>COLOR</span>

                        <span
                            id="selectedColorLabel"
                        >
                            ${escapeHTML(
                                firstColor
                            )}
                        </span>

                    </div>


                    <div
                        class="satori-color-list"
                    >

                        ${colors}

                    </div>

                </div>


                <!-- COMPRA -->

                <div
                    class="satori-buy-block"
                >

                    <span
                        class="satori-buy-label"
                    >
                        CANTIDAD
                    </span>


                    <div
                        class="satori-buy-row"
                    >

                        <div
                            class="satori-quantity"
                        >

                            <button
                                type="button"
                                data-quantity-minus
                                aria-label="Disminuir cantidad"
                            >
                                −
                            </button>


                            <span
                                id="satoriQuantity"
                            >
                                1
                            </span>


                            <button
                                type="button"
                                data-quantity-plus
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>

                        </div>


                        <button
                            id="addToCart"
                            class="satori-add-to-cart add-to-cart"
                            type="button"

                            data-product-id="${escapeHTML(
                                product.id
                            )}"

                            data-product-name="${escapeHTML(
                                product.name
                            )}"

                            data-product-price="${Number(
                                product.price
                            )}"

                            data-product-image="${escapeHTML(
                                firstImage
                            )}"

                            data-product-url="${escapeHTML(
                                productUrl
                            )}"

                            data-product-size="${escapeHTML(
                                firstSize
                            )}"

                            data-product-color="${escapeHTML(
                                firstColor
                            )}"

                            data-product-quantity="1"
                        >
                            AGREGAR AL CARRITO
                        </button>

                    </div>

                </div>


                <button
                    type="button"
                    id="satoriFavorite"
                    class="satori-favorite"
                >
                    ♡ &nbsp; AGREGAR A FAVORITOS
                </button>


                <!-- BENEFICIOS -->

                <div
                    class="satori-benefits"
                >

                    <div
                        class="satori-benefit"
                    >

                        <strong>
                            🚚 ENVÍOS A TODO CHILE
                        </strong>

                        <span>
                            Despachamos a todo el país.
                        </span>

                    </div>


                    <div
                        class="satori-benefit"
                    >

                        <strong>
                            ↻ CAMBIOS
                        </strong>

                        <span>
                            Cambios y devoluciones.
                        </span>

                    </div>


                    <div
                        class="satori-benefit"
                    >

                        <strong>
                            ◉ PAGO SEGURO
                        </strong>

                        <span>
                            Compra protegida.
                        </span>

                    </div>

                </div>

            </div>

        </section>


        ${tabs}

    </main>


    <!-- BANNER -->

    <section
        class="satori-editorial
               satori-page-animate
               satori-animate"
    >

        ${
            bannerImage
                ? `
        <img
            src="${escapeHTML(bannerImage)}"
            alt=""
            loading="lazy"
            decoding="async"
        >
        `
                : ""
        }


        <div
            class="satori-editorial-content"
        >

            <span>
                SATORII · ANIME ARCHIVE
            </span>


            <h2>
                ${escapeHTML(
                    getBannerTitle(product)
                )}
            </h2>


            <p>
                ${escapeHTML(
                    getBannerText(product)
                )}
            </p>

        </div>

    </section>


    <!-- RECOMENDACIONES -->

    <main
        class="satori-product-page
               satori-recommendations-wrapper"
    >

        ${recommendations}

    </main>


    <!-- FOOTER -->

    <div
        id="satori-footer"
    ></div>


    <!-- PRODUCT DATA -->

    <script>

        window.SATORII_PRODUCT =
            ${safeJSONString(productData)};

    </script>


    <!-- SUPABASE CONFIG -->

    <script>

        window.SATORII_SUPABASE_CONFIG = {

            enabled:
                ${SUPABASE_ENABLED ? "true" : "false"},

            url:
                ${safeJSONString(
                    SUPABASE_URL
                )},

            publishableKey:
                ${safeJSONString(
                    SUPABASE_PUBLISHABLE_KEY
                )}

        };

    </script>


    <!-- GLOBAL SCRIPTS -->

    <script
        src="${root}js/products.js"
    ></script>


    <script
        src="${root}js/cart.js"
    ></script>


    <script
        src="${root}js/footer.js"
    ></script>


    <!-- PRODUCT INTERACTIONS -->

    <script>

        (function () {

            "use strict";


            /* =========================================
               UTILIDADES
            ========================================== */

            function escapeAttribute(
                value
            ) {

                return String(
                    value ?? ""
                )
                    .replace(
                        /&/g,
                        "&amp;"
                    )
                    .replace(
                        /"/g,
                        "&quot;"
                    )
                    .replace(
                        /</g,
                        "&lt;"
                    )
                    .replace(
                        />/g,
                        "&gt;"
                    );

            }


            function formatSatoriPrice(
                value
            ) {

                return (
                    "$" +
                    (
                        Number(value) || 0
                    ).toLocaleString(
                        "es-CL"
                    ) +
                    " CLP"
                );

            }


            function getProductImagesFromSupabase(
                product
            ) {

                if (
                    Array.isArray(
                        product?.images
                    )
                ) {

                    return product.images
                        .filter(Boolean)
                        .map(
                            image =>
                                String(
                                    image
                                ).trim()
                        )
                        .filter(Boolean);

                }


                if (
                    typeof product?.images ===
                    "string"
                ) {

                    try {

                        const parsed =
                            JSON.parse(
                                product.images
                            );


                        if (
                            Array.isArray(parsed)
                        ) {

                            return parsed
                                .filter(Boolean)
                                .map(
                                    image =>
                                        String(
                                            image
                                        ).trim()
                                )
                                .filter(Boolean);

                        }

                    }

                    catch (
                        error
                    ) {

                        /*
                           Fallback a image.
                        */

                    }

                }


                if (
                    product?.image
                ) {

                    return [
                        String(
                            product.image
                        ).trim()
                    ];

                }


                return [];

            }


            function getSupabaseProductImage(
                product
            ) {

                const images =
                    getProductImagesFromSupabase(
                        product
                    );


                return (
                    images[0] ||
                    ""
                );

            }


            function isTshirt(
                product
            ) {

                const text =
                    [
                        product?.type,
                        product?.productType,
                        product?.category,
                        product?.collection,
                        product?.subcategory,
                        product?.name
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();


                return /polera|t-shirt|tshirt|tee|shirt|oversize/.test(
                    text
                );

            }


            function shuffle(
                array
            ) {

                const copy =
                    array.slice();


                for (
                    let i =
                        copy.length - 1;
                    i > 0;
                    i--
                ) {

                    const j =
                        Math.floor(
                            Math.random() *
                            (i + 1)
                        );


                    [
                        copy[i],
                        copy[j]
                    ] =
                    [
                        copy[j],
                        copy[i]
                    ];

                }


                return copy;

            }


            function normalizeProductUrl(
                product
            ) {

                let url =
                    String(
                        product?.url ||
                        ""
                    )
                        .trim()
                        .replace(
                            /^\/+/,
                            ""
                        )
                        .replace(
                            /\\/g,
                            "/"
                        );


                if (
                    /^(https?:)?\/\//i.test(
                        url
                    )
                ) {

                    return url;

                }


                if (!url) {

                    const category =
                        String(
                            product?.category ||
                            product?.collection ||
                            "anime"
                        )
                            .normalize("NFD")
                            .replace(
                                /[\u0300-\u036f]/g,
                                ""
                            )
                            .toLowerCase()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            )
                            .replace(
                                /^-+|-+$/g,
                                "");


                    const slug =
                        String(
                            product?.id ||
                            product?.name ||
                            "producto"
                        )
                            .normalize("NFD")
                            .replace(
                                /[\u0300-\u036f]/g,
                                ""
                            )
                            .toLowerCase()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            )
                            .replace(
                                /^-+|-+$/g,
                                "");


                    url =
                        "productos/" +
                        category +
                        "/" +
                        slug +
                        ".html";

                }


                if (
                    !url
                        .toLowerCase()
                        .endsWith(
                            ".html"
                        )
                ) {

                    url += ".html";

                }


                return url;

            }


            function getPageRoot() {

                const pathname =
                    window.location.pathname
                        .replace(
                            /\\/g,
                            "/"
                        )
                        .replace(
                            /^\/+/,
                            ""
                        );


                const segments =
                    pathname
                        .split("/")
                        .filter(Boolean);


                /*
                   La página de producto está en:

                   productos/categoria/producto.html

                   por lo tanto necesita:

                   ../../
                */

                const depth =
                    Math.max(
                        segments.length - 1,
                        0
                    );


                return "../".repeat(
                    depth
                );

            }


            /* =========================================
               ANIMACIONES
            ========================================== */

            function initializePageAnimation() {

                document.body.classList.remove(
                    "satori-page-loading"
                );


                document.body.classList.add(
                    "satori-page-ready"
                );


                const animatedElements =
                    document.querySelectorAll(
                        ".satori-animate"
                    );


                const reducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;


                if (
                    reducedMotion ||
                    !("IntersectionObserver" in window)
                ) {

                    animatedElements.forEach(
                        function (element) {

                            element.classList.add(
                                "is-visible"
                            );

                        }
                    );

                }

                else {

                    const observer =
                        new IntersectionObserver(
                            function (
                                entries,
                                observerInstance
                            ) {

                                entries.forEach(
                                    function (entry) {

                                        if (
                                            !entry.isIntersecting
                                        ) {

                                            return;

                                        }


                                        entry.target.classList.add(
                                            "is-visible"
                                        );


                                        observerInstance.unobserve(
                                            entry.target
                                        );

                                    }
                                );

                            },
                            {
                                threshold:
                                    0.08,

                                rootMargin:
                                    "0px 0px -30px 0px"
                            }
                        );


                    animatedElements.forEach(
                        function (element) {

                            observer.observe(
                                element
                            );

                        }
                    );

                }


                const productInfo =
                    document.querySelector(
                        ".satori-product-info"
                    );


                if (productInfo) {

                    requestAnimationFrame(
                        function () {

                            productInfo.classList.add(
                                "is-visible"
                            );

                        }
                    );

                }

            }


            if (
                document.readyState ===
                "loading"
            ) {

                document.addEventListener(
                    "DOMContentLoaded",
                    initializePageAnimation
                );

            }

            else {

                initializePageAnimation();

            }


            /* =========================================
               GALERÍA
            ========================================== */

            const mainImage =
                document.getElementById(
                    "satoriMainProductImage"
                );


            const thumbnails =
                Array.from(
                    document.querySelectorAll(
                        ".satori-thumb"
                    )
                );


            let currentImage =
                0;


            function changeImage(
                index
            ) {

                if (
                    !mainImage ||
                    !thumbnails.length
                ) {

                    return;

                }


                if (
                    index < 0
                ) {

                    index =
                        thumbnails.length - 1;

                }


                if (
                    index >= thumbnails.length
                ) {

                    index = 0;

                }


                currentImage =
                    index;


                const button =
                    thumbnails[
                        currentImage
                    ];


                const nextImage =
                    button.dataset.image;


                if (!nextImage) {

                    return;

                }


                mainImage.style.opacity =
                    "0";


                const showImage =
                    function () {

                        mainImage.style.opacity =
                            "1";

                    };


                mainImage.onload =
                    showImage;


                mainImage.onerror =
                    showImage;


                mainImage.src =
                    nextImage;


                requestAnimationFrame(
                    function () {

                        mainImage.style.opacity =
                            "1";

                    }
                );


                thumbnails.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                        item.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                button.setAttribute(
                    "aria-pressed",
                    "true"
                );

            }


            thumbnails.forEach(
                function (
                    button,
                    index
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            changeImage(
                                index
                            );

                        }
                    );

                }
            );


            /* =========================================
               TALLA
            ========================================== */

            let selectedSize =
                ${safeJSONString(firstSize)};


            document
                .querySelectorAll(
                    ".satori-size"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                document
                                    .querySelectorAll(
                                        ".satori-size"
                                    )
                                    .forEach(
                                        function (item) {

                                            item.classList.remove(
                                                "active"
                                            );

                                            item.setAttribute(
                                                "aria-pressed",
                                                "false"
                                            );

                                        }
                                    );


                                button.classList.add(
                                    "active"
                                );


                                button.setAttribute(
                                    "aria-pressed",
                                    "true"
                                );


                                selectedSize =
                                    button.dataset.size ||
                                    "";


                                updateCartData();

                            }
                        );

                    }
                );


            /* =========================================
               COLOR
            ========================================== */

            let selectedColor =
                ${safeJSONString(firstColor)};


            document
                .querySelectorAll(
                    ".satori-color"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                document
                                    .querySelectorAll(
                                        ".satori-color"
                                    )
                                    .forEach(
                                        function (item) {

                                            item.classList.remove(
                                                "active"
                                            );

                                            item.setAttribute(
                                                "aria-pressed",
                                                "false"
                                            );

                                        }
                                    );


                                button.classList.add(
                                    "active"
                                );


                                button.setAttribute(
                                    "aria-pressed",
                                    "true"
                                );


                                selectedColor =
                                    button.dataset.color ||
                                    "";


                                const label =
                                    document.getElementById(
                                        "selectedColorLabel"
                                    );


                                if (label) {

                                    label.textContent =
                                        selectedColor;

                                }


                                updateCartData();

                            }
                        );

                    }
                );


            /* =========================================
               CANTIDAD
            ========================================== */

            let quantity =
                1;


            const MIN_QUANTITY =
                1;


            const MAX_QUANTITY =
                20;


            const quantityDisplay =
                document.getElementById(
                    "satoriQuantity"
                );


            function updateQuantity() {

                quantity =
                    Math.max(
                        MIN_QUANTITY,
                        Math.min(
                            MAX_QUANTITY,
                            Number(quantity) || 1
                        )
                    );


                if (
                    quantityDisplay
                ) {

                    quantityDisplay.textContent =
                        String(quantity);

                }


                updateCartData();

            }


            document
                .querySelectorAll(
                    "[data-quantity-minus]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                quantity--;

                                updateQuantity();

                            }
                        );

                    }
                );


            document
                .querySelectorAll(
                    "[data-quantity-plus]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                quantity++;

                                updateQuantity();

                            }
                        );

                    }
                );


            /* =========================================
               CARRITO
            ========================================== */

            const addToCart =
                document.getElementById(
                    "addToCart"
                );


            function updateCartData() {

                if (!addToCart) {

                    return;

                }


                addToCart.dataset.productSize =
                    selectedSize;


                addToCart.dataset.productColor =
                    selectedColor;


                addToCart.dataset.productQuantity =
                    String(quantity);

            }


            updateCartData();


            if (addToCart) {

                addToCart.addEventListener(
                    "click",
                    function (event) {

                        if (!selectedSize) {

                            event.preventDefault();


                            const sizeList =
                                document.querySelector(
                                    ".satori-size-list"
                                );


                            if (sizeList) {

                                sizeList.scrollIntoView({
                                    behavior:
                                        "smooth",

                                    block:
                                        "center"
                                });

                            }


                            return;

                        }


                        updateCartData();

                    }
                );

            }


            /* =========================================
               FAVORITOS
            ========================================== */

            const favorite =
                document.getElementById(
                    "satoriFavorite"
                );


            if (favorite) {

                const key =
                    "satorii_favorites";


                let favorites =
                    [];


                try {

                    favorites =
                        JSON.parse(
                            localStorage.getItem(
                                key
                            )
                        ) || [];


                    if (
                        !Array.isArray(
                            favorites
                        )
                    ) {

                        favorites = [];

                    }

                }

                catch (
                    error
                ) {

                    favorites = [];

                }


                const productId =
                    ${safeJSONString(
                        String(product.id)
                    )};


                if (
                    favorites.includes(
                        productId
                    )
                ) {

                    favorite.classList.add(
                        "active"
                    );


                    favorite.innerHTML =
                        "♥ &nbsp; EN FAVORITOS";

                }


                favorite.addEventListener(
                    "click",
                    function () {

                        const index =
                            favorites.indexOf(
                                productId
                            );


                        if (
                            index === -1
                        ) {

                            favorites.push(
                                productId
                            );


                            favorite.classList.add(
                                "active"
                            );


                            favorite.innerHTML =
                                "♥ &nbsp; EN FAVORITOS";

                        }

                        else {

                            favorites.splice(
                                index,
                                1
                            );


                            favorite.classList.remove(
                                "active"
                            );


                            favorite.innerHTML =
                                "♡ &nbsp; AGREGAR A FAVORITOS";

                        }


                        try {

                            localStorage.setItem(
                                key,
                                JSON.stringify(
                                    favorites
                                )
                            );

                        }

                        catch (
                            error
                        ) {

                            console.warn(
                                "SATORII · No se pudieron guardar favoritos.",
                                error
                            );

                        }

                    }
                );

            }


            /* =========================================
               TABS
            ========================================== */

            const tabs =
                document.querySelectorAll(
                    ".satori-tab"
                );


            const panels =
                document.querySelectorAll(
                    ".satori-tab-panel"
                );


            tabs.forEach(
                function (tab) {

                    tab.addEventListener(
                        "click",
                        function () {

                            const target =
                                tab.dataset.tab;


                            tabs.forEach(
                                function (item) {

                                    item.classList.remove(
                                        "active"
                                    );

                                    item.setAttribute(
                                        "aria-selected",
                                        "false"
                                    );

                                }
                            );


                            panels.forEach(
                                function (panel) {

                                    panel.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            tab.classList.add(
                                "active"
                            );


                            tab.setAttribute(
                                "aria-selected",
                                "true"
                            );


                            const targetPanel =
                                document.querySelector(
                                    '[data-panel="' +
                                    target +
                                    '"]'
                                );


                            if (
                                targetPanel
                            ) {

                                targetPanel.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }
            );


            /* =================================================
               SUPABASE
            ================================================= */

            let supabaseClient =
                null;


            /* =========================================
               ESPERAR SUPABASE
            ========================================== */

            async function waitForSupabase() {

                let attempts =
                    0;


                while (
                    !window.supabase &&
                    attempts < 100
                ) {

                    await new Promise(
                        function (resolve) {

                            setTimeout(
                                resolve,
                                100
                            );

                        }
                    );


                    attempts++;

                }


                return Boolean(
                    window.supabase
                );

            }


            /* =========================================
               CREAR CLIENTE
            ========================================== */

            async function initializeSupabase() {

                const config =
                    window.SATORII_SUPABASE_CONFIG;


                if (
                    !config ||
                    !config.enabled ||
                    !config.url ||
                    !config.publishableKey
                ) {

                    console.info(
                        "SATORII · Supabase no está configurado."
                    );

                    return null;

                }


                const loaded =
                    await waitForSupabase();


                if (!loaded) {

                    console.warn(
                        "SATORII · Supabase no pudo cargarse."
                    );

                    return null;

                }


                try {

                    supabaseClient =
                        window.supabase.createClient(
                            config.url,
                            config.publishableKey,
                            {
                                auth: {

                                    persistSession:
                                        false,

                                    autoRefreshToken:
                                        false,

                                    detectSessionInUrl:
                                        false

                                }
                            }
                        );


                    window.SATORII_SUPABASE =
                        supabaseClient;


                    document.dispatchEvent(
                        new CustomEvent(
                            "satorii:supabase-ready",
                            {
                                detail: {

                                    client:
                                        supabaseClient,

                                    product:
                                        window.SATORII_PRODUCT

                                }
                            }
                        )
                    );


                    console.log(
                        "SATORII · Supabase conectado."
                    );


                    return supabaseClient;

                }

                catch (
                    error
                ) {

                    console.warn(
                        "SATORII · Error inicializando Supabase:",
                        error
                    );


                    return null;

                }

            }


            /* =========================================
               OBTENER PRODUCTO ACTUAL
            ========================================== */

            async function fetchCurrentProduct() {

                if (
                    !supabaseClient
                ) {

                    return null;

                }


                const currentId =
                    String(
                        window.SATORII_PRODUCT?.id ||
                        ""
                    ).trim();


                if (!currentId) {

                    console.warn(
                        "SATORII · El producto no tiene ID."
                    );

                    return null;

                }


                try {

                    const result =
                        await supabaseClient
                            .from(
                                "products"
                            )
                            .select(
                                "id,name,category,collection,subcategory,price,currency,image,images,url,sizes,colors,available"
                            )
                            .eq(
                                "id",
                                currentId
                            )
                            .maybeSingle();


                    if (
                        result.error
                    ) {

                        console.warn(
                            "SATORII · Error consultando producto:",
                            result.error
                        );

                        return null;

                    }


                    if (
                        !result.data
                    ) {

                        console.warn(
                            "SATORII · Producto no encontrado en Supabase:",
                            currentId
                        );

                        return null;

                    }


                    return result.data;

                }

                catch (
                    error
                ) {

                    console.warn(
                        "SATORII · Error consultando producto:",
                        error
                    );


                    return null;

                }

            }


            /* =========================================
               ACTUALIZAR PRODUCTO
            ========================================== */

            function updateCurrentProduct(
                product
            ) {

                if (
                    !product
                ) {

                    return;

                }


                const price =
                    Number(
                        product.price
                    ) || 0;


                const available =
                    product.available !== false;


                /*
                   Actualizar objeto global.
                */

                if (
                    window.SATORII_PRODUCT
                ) {

                    window.SATORII_PRODUCT.price =
                        price;


                    window.SATORII_PRODUCT.available =
                        available;


                    if (
                        product.name
                    ) {

                        window.SATORII_PRODUCT.name =
                            product.name;

                    }


                    if (
                        product.image
                    ) {

                        window.SATORII_PRODUCT.image =
                            product.image;

                    }


                    if (
                        product.images
                    ) {

                        window.SATORII_PRODUCT.images =
                            product.images;

                    }

                }


                /* =================================
                   PRECIO VISIBLE
                ================================== */

                const priceElement =
                    document.getElementById(
                        "satoriProductPrice"
                    );


                if (
                    priceElement
                ) {

                    priceElement.dataset.price =
                        String(price);


                    priceElement.textContent =
                        formatSatoriPrice(
                            price
                        );

                }


                /* =================================
                   BOTÓN CARRITO
                ================================== */

                const button =
                    document.getElementById(
                        "addToCart"
                    );


                if (
                    button
                ) {

                    button.dataset.productPrice =
                        String(price);


                    /*
                       Actualizamos imagen también.
                    */

                    const image =
                        getSupabaseProductImage(
                            product
                        );


                    if (image) {

                        button.dataset.productImage =
                            image;

                    }


                    /*
                       Disponibilidad.
                    */

                    if (!available) {

                        button.disabled =
                            true;

                        button.textContent =
                            "PRODUCTO NO DISPONIBLE";

                        button.setAttribute(
                            "aria-disabled",
                            "true"
                        );

                    }

                    else {

                        button.disabled =
                            false;

                        button.textContent =
                            "AGREGAR AL CARRITO";

                        button.removeAttribute(
                            "aria-disabled"
                        );

                    }

                }


                /*
                   Actualizar datos globales
                   usados por otros scripts.
                */

                document.dispatchEvent(
                    new CustomEvent(
                        "satorii:product-updated",
                        {
                            detail: {
                                product:
                                    product
                            }
                        }
                    )
                );

            }


            /* =========================================
               OBTENER RECOMENDACIONES
            ========================================== */

            async function fetchRecommendedProducts() {

                if (
                    !supabaseClient
                ) {

                    return [];

                }


                const currentId =
                    String(
                        window.SATORII_PRODUCT?.id ||
                        ""
                    ).trim();


                try {

                    const result =
                        await supabaseClient
                            .from(
                                "products"
                            )
                            .select(
                                "id,name,category,collection,subcategory,price,currency,image,images,url,available"
                            )
                            .eq(
                                "available",
                                true
                            );


                    if (
                        result.error
                    ) {

                        console.warn(
                            "SATORII · Error cargando recomendaciones:",
                            result.error
                        );

                        return [];

                    }


                    const products =
                        Array.isArray(
                            result.data
                        )
                            ? result.data
                            : [];


                    /*
                       Solo poleras.
                    */

                    const candidates =
                        products.filter(
                            function (product) {

                                if (
                                    String(
                                        product.id
                                    ) ===
                                    currentId
                                ) {

                                    return false;

                                }


                                if (
                                    product.available ===
                                    false
                                ) {

                                    return false;

                                }


                                if (
                                    !isTshirt(
                                        product
                                    )
                                ) {

                                    return false;

                                }


                                const images =
                                    getProductImagesFromSupabase(
                                        product
                                    );


                                if (
                                    !images.length
                                ) {

                                    return false;

                                }


                                return true;

                            }
                        );


                    /*
                       Aleatorio.
                    */

                    return shuffle(
                        candidates
                    ).slice(
                        0,
                        4
                    );

                }

                catch (
                    error
                ) {

                    console.warn(
                        "SATORII · Error cargando recomendaciones:",
                        error
                    );


                    return [];

                }

            }


            /* =========================================
               RENDER RECOMENDACIONES SUPABASE
            ========================================== */

            function renderSupabaseRecommendations(
                products
            ) {

                if (
                    !Array.isArray(
                        products
                    ) ||
                    !products.length
                ) {

                    return;

                }


                const section =
                    document.getElementById(
                        "satoriRecommendations"
                    );


                const grid =
                    document.querySelector(
                        ".satori-recommendation-grid"
                    );


                if (
                    !section ||
                    !grid
                ) {

                    return;

                }


                const currentProductId =
                    String(
                        window.SATORII_PRODUCT?.id ||
                        ""
                    );


                const pageRoot =
                    getPageRoot();


                const cards =
                    products
                        .filter(
                            function (product) {

                                return (
                                    String(
                                        product.id
                                    ) !==
                                    currentProductId
                                );

                            }
                        )
                        .map(
                            function (product) {

                                const productUrl =
                                    normalizeProductUrl(
                                        product
                                    );


                                const images =
                                    getProductImagesFromSupabase(
                                        product
                                    );


                                const image =
                                    images[0] ||
                                    "";


                                if (
                                    !image
                                ) {

                                    return "";

                                }


                                let href =
                                    productUrl;


                                /*
                                   Si la URL de Supabase
                                   es relativa, agregamos
                                   la raíz correcta.
                                */

                                if (
                                    !/^(https?:)?\/\//i.test(
                                        href
                                    )
                                ) {

                                    href =
                                        pageRoot +
                                        href;

                                }


                                return `

                                    <a
                                        class="satori-recommendation
                                               satori-animate
                                               satori-animate-up"
                                        href="${escapeAttribute(
                                            href
                                        )}"
                                        data-product-id="${escapeAttribute(
                                            product.id
                                        )}"
                                    >

                                        <div
                                            class="satori-rec-image"
                                        >

                                            <img
                                                src="${escapeAttribute(
                                                    image
                                                )}"
                                                alt="${escapeAttribute(
                                                    product.name ||
                                                    "Producto"
                                                )}"
                                                loading="lazy"
                                                decoding="async"
                                            >

                                        </div>


                                        <div
                                            class="satori-rec-info"
                                        >

                                            <strong>
                                                ${escapeHTML(
                                                    product.name ||
                                                    "Producto"
                                                )}
                                            </strong>

                                            <span>
                                                ${formatSatoriPrice(
                                                    product.price
                                                )}
                                            </span>

                                        </div>

                                    </a>

                                `;

                            }
                        )
                        .filter(Boolean)
                        .join("");


                if (!cards) {

                    return;

                }


                /*
                   Reemplazamos las recomendaciones
                   estáticas por las actuales de Supabase.
                */

                grid.innerHTML =
                    cards;


                /*
                   Volver a observar las nuevas
                   tarjetas para las animaciones.
                */

                initializeRecommendationAnimations();

            }


            /* =========================================
               ANIMACIONES RECOMENDACIONES
            ========================================== */

            function initializeRecommendationAnimations() {

                const elements =
                    document.querySelectorAll(
                        ".satori-recommendation.satori-animate"
                    );


                if (
                    !elements.length
                ) {

                    return;

                }


                const reducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;


                if (
                    reducedMotion ||
                    !(
                        "IntersectionObserver" in
                        window
                    )
                ) {

                    elements.forEach(
                        function (element) {

                            element.classList.add(
                                "is-visible"
                            );

                        }
                    );


                    return;

                }


                const observer =
                    new IntersectionObserver(
                        function (
                            entries,
                            observerInstance
                        ) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        !entry.isIntersecting
                                    ) {

                                        return;

                                    }


                                    entry.target.classList.add(
                                        "is-visible"
                                    );


                                    observerInstance.unobserve(
                                        entry.target
                                    );

                                }
                            );

                        },
                        {
                            threshold:
                                0.08,

                            rootMargin:
                                "0px 0px -30px 0px"
                        }
                    );


                elements.forEach(
                    function (element) {

                        observer.observe(
                            element
                        );

                    }
                );

            }


            /* =========================================
               INICIAR SUPABASE
            ========================================== */

            async function initializeSatoriSupabase() {

                const client =
                    await initializeSupabase();


                if (
                    !client
                ) {

                    return;

                }


                /*
                   1. Buscar producto actual.
                */

                const currentProduct =
                    await fetchCurrentProduct();


                /*
                   2. Actualizar precio,
                      disponibilidad, etc.
                */

                if (
                    currentProduct
                ) {

                    updateCurrentProduct(
                        currentProduct
                    );

                }


                /*
                   3. Buscar recomendaciones.
                */

                const recommendations =
                    await fetchRecommendedProducts();


                /*
                   4. Reemplazar las
                      recomendaciones estáticas.
                */

                if (
                    recommendations.length
                ) {

                    renderSupabaseRecommendations(
                        recommendations
                    );

                }

            }


            /*
               Ejecutar Supabase.
            */

            initializeSatoriSupabase();


        })();

    </script>


</body>

</html>`;


    fs.writeFileSync(
        outputPath,
        html,
        "utf8"
    );


    console.log(
        `✓ Generado: ${productUrl}`
    );

}


/* =========================================================
   GENERAR TODO
========================================================= */

function generateAll() {

    console.log("");
    console.log("==============================================");
    console.log("SATORII · GENERADOR DE PRODUCTOS");
    console.log("DISEÑO 2 · ANIME STREETWEAR");
    console.log("==============================================");
    console.log("");


    const products =
        loadProducts();


    const availableProducts =
        products.filter(
            product =>
                product.available !== false
        );


    if (
        !availableProducts.length
    ) {

        console.warn(
            "No hay productos disponibles."
        );

        return;

    }


    fs.mkdirSync(
        PRODUCTS_DIR,
        {
            recursive:
                true
        }
    );


    let generated =
        0;


    availableProducts.forEach(
        function (product) {

            try {

                generateProductPage(
                    product,
                    availableProducts
                );


                generated++;

            }

            catch (
                error
            ) {

                console.error(
                    `✗ Error generando ${product.id}:`,
                    error
                );

            }

        }
    );


    console.log("");
    console.log("==============================================");

    console.log(
        `✓ ${generated} páginas generadas`
    );

    console.log(
        `✓ Supabase: ${
            SUPABASE_ENABLED
                ? "CONFIGURADO"
                : "NO CONFIGURADO"
        }`
    );

    console.log("==============================================");
    console.log("");

}


/* =========================================================
   EJECUTAR
========================================================= */

try {

    generateAll();

}

catch (
    error
) {

    console.error(
        "SATORII · Error fatal:",
        error
    );


    process.exit(1);

}
