const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const PRODUCTS_FILE = path.join(ROOT, "js", "products.js");
const OUTPUT_DIR = path.join(ROOT, "productos");


/* =====================================================
   UTILIDADES
===================================================== */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatPrice(value) {

    return "$" +
        Number(value || 0)
            .toLocaleString("es-CL");

}


function slugify(value) {

    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}


function normalizeCategory(category) {

    const value =
        String(category || "otros")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();


    if (value === "anime") {

        return "anime";

    }


    if (value === "streetwear") {

        return "streetwear";

    }


    if (
        value === "accesorios" ||
        value === "accesorio"
    ) {

        return "accesorios";

    }


    return "otros";

}


/*
 * Anime + Streetwear = PRENDA
 * Accesorios + Otros = FICHA FLEXIBLE
 */

function getProductType(product) {

    const category =
        normalizeCategory(
            product.category
        );


    if (
        category === "anime" ||
        category === "streetwear"
    ) {

        return "clothing";

    }


    return "accessory";

}


/* =====================================================
   IMÁGENES
===================================================== */

function getImages(product) {

    if (
        Array.isArray(product.images) &&
        product.images.length
    ) {

        return product.images.slice(0, 3);

    }


    if (product.image) {

        return [
            product.image
        ];

    }


    return [];

}


/*
 * Busca un archivo ignorando mayúsculas/minúsculas.
 *
 * Esto permite que:
 *
 * .PNG
 * .png
 * .Png
 *
 * funcionen igual.
 */

function findFileCaseInsensitive(
    absolutePath
) {

    if (
        fs.existsSync(
            absolutePath
        )
    ) {

        return absolutePath;

    }


    const directory =
        path.dirname(
            absolutePath
        );


    const filename =
        path.basename(
            absolutePath
        );


    if (
        !fs.existsSync(
            directory
        )
    ) {

        return absolutePath;

    }


    try {

        const files =
            fs.readdirSync(
                directory
            );


        const match =
            files.find(
                file =>
                    file.toLowerCase() ===
                    filename.toLowerCase()
            );


        if (match) {

            return path.join(
                directory,
                match
            );

        }

    }
    catch (error) {

        return absolutePath;

    }


    return absolutePath;

}


/*
 * Convierte una ruta declarada en products.js
 * a una ruta correcta desde la página generada.
 *
 * Ejemplo:
 *
 * products.js:
 *
 * productos/anime/polera-kid-buu-01.PNG
 *
 * Página:
 *
 * productos/anime/goku.html
 *
 * Resultado:
 *
 * polera-kid-buu-01.PNG
 *
 * -----------------------------------------------------
 *
 * También soporta:
 *
 * /productos/anime/imagen.png
 * ./productos/anime/imagen.png
 * img/productos/imagen.png
 * https://...
 */

function getImagePath(
    image,
    outputDirectory
) {

    if (!image) {

        return "";

    }


    const original =
        String(image)
            .trim();


    if (!original) {

        return "";

    }


    /*
     * URLs externas.
     */

    if (
        /^https?:\/\//i.test(original) ||
        /^data:/i.test(original) ||
        /^blob:/i.test(original)
    ) {

        return original;

    }


    /*
     * Elimina query/hash para trabajar
     * correctamente con el archivo.
     */

    const cleanPath =
        original
            .split("#")[0]
            .split("?")[0];


    /*
     * Normalizamos las barras.
     */

    const normalized =
        cleanPath
            .replace(/\\/g, "/")
            .replace(/^\/+/, "")
            .replace(/^\.\/+/, "");


    /*
     * Ruta absoluta dentro del proyecto.
     */

    let absolute =
        path.resolve(
            ROOT,
            normalized
        );


    /*
     * Busca el archivo respetando
     * mayúsculas/minúsculas reales.
     */

    absolute =
        findFileCaseInsensitive(
            absolute
        );


    /*
     * Calculamos la ruta relativa
     * desde la carpeta donde está
     * la página HTML.
     */

    let relative =
        path.relative(
            outputDirectory,
            absolute
        );


    relative =
        relative
            .split(path.sep)
            .join("/");


    /*
     * Si por alguna razón queda vacío,
     * usamos el nombre del archivo.
     */

    if (!relative) {

        relative =
            path.basename(
                absolute
            );

    }


    return relative;

}


/* =====================================================
   PRODUCTOS
===================================================== */

function loadProducts() {

    if (
        !fs.existsSync(
            PRODUCTS_FILE
        )
    ) {

        throw new Error(
            "No se encontró js/products.js"
        );

    }


    const source =
        fs.readFileSync(
            PRODUCTS_FILE,
            "utf8"
        );


    const context = {
        console
    };


    vm.createContext(
        context
    );


    vm.runInContext(
        source +
        "\n;globalThis.__SATORII_PRODUCTS__ = PRODUCTS;",
        context
    );


    if (
        !Array.isArray(
            context.__SATORII_PRODUCTS__
        )
    ) {

        throw new Error(
            "PRODUCTS no es un arreglo válido."
        );

    }


    return context.__SATORII_PRODUCTS__;

}


/* =====================================================
   GALERÍA
===================================================== */

function generateGallery(
    product,
    outputDirectory
) {

    const images =
        getImages(
            product
        );


    if (!images.length) {

        return `
            <div class="satori-main-image">

                <div class="satori-image-placeholder">
                    SATORII
                </div>

            </div>
        `;

    }


    const prepared =
        images.map(
            image =>
                getImagePath(
                    image,
                    outputDirectory
                )
        );


    return `
        <div class="satori-main-image">

            <img
                id="satoriMainImage"
                src="${escapeHTML(prepared[0])}"
                alt="${escapeHTML(product.name)}"
            >

        </div>


        <div class="satori-thumbnails">

            ${prepared.map(
                (image, index) => `

                <button
                    type="button"
                    class="satori-thumbnail ${
                        index === 0
                            ? "active"
                            : ""
                    }"
                    data-image="${escapeHTML(image)}"
                    aria-label="Imagen ${index + 1}"
                >

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="${
                            index === 0
                                ? "eager"
                                : "lazy"
                        }"
                    >

                </button>

            `
            ).join("")}

        </div>
    `;

}


/* =====================================================
   COLORES
===================================================== */

function getColorClass(color) {

    const value =
        String(color || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();


    if (
        value.includes("blanco") ||
        value.includes("white")
    ) {

        return "white";

    }


    if (
        value.includes("rojo") ||
        value.includes("red")
    ) {

        return "red";

    }


    if (
        value.includes("azul") ||
        value.includes("blue")
    ) {

        return "blue";

    }


    if (
        value.includes("verde") ||
        value.includes("green")
    ) {

        return "green";

    }


    return "black";

}


function generateColors(product) {

    if (
        !Array.isArray(product.colors) ||
        !product.colors.length
    ) {

        return "";

    }


    return `
        <section class="satori-option">

            <div class="satori-option-header">

                <span>
                    COLOR
                </span>

            </div>


            <div class="satori-color-options">

                ${product.colors.map(
                    (color, index) => `

                    <button
                        type="button"
                        class="satori-color-button ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-color="${escapeHTML(color)}"
                    >

                        <span
                            class="
                                satori-color-dot
                                color-${getColorClass(color)}
                            "
                        ></span>

                        <span>
                            ${escapeHTML(color)}
                        </span>

                    </button>

                `
                ).join("")}

            </div>

        </section>
    `;

}


/* =====================================================
   TALLAS
===================================================== */

function generateSizes(product) {

    if (
        !Array.isArray(product.sizes) ||
        !product.sizes.length
    ) {

        return "";

    }


    return `
        <section class="satori-option">

            <div class="satori-option-header">

                <span>
                    TALLA
                </span>


                <a
                    href="../../guia-tallas.html"
                >
                    GUÍA DE TALLAS
                </a>

            </div>


            <div class="satori-size-options">

                ${product.sizes.map(
                    (size, index) => `

                    <button
                        type="button"
                        class="satori-size-button ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-size="${escapeHTML(size)}"
                    >

                        ${escapeHTML(size)}

                    </button>

                `
                ).join("")}

            </div>

        </section>
    `;

}


/* =====================================================
   INFORMACIÓN
===================================================== */

function getDetails(product) {

    return product.details || {};

}


/* =====================================================
   CONFIANZA
===================================================== */

function generateTrustBlocks(product) {

    const details =
        getDetails(
            product
        );


    return `

        <div class="satori-trust-grid">

            <div class="satori-trust-item">

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
                    🚚
                </div>


                <div>

                    <strong>
                        ENVÍOS
                    </strong>


                    <span>
                        ${escapeHTML(
                            details.shipping ||
                            "Envíos a todo Chile."
                        )}
                    </span>

                </div>

            </div>


            <div class="satori-trust-item">

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
                    🔒
                </div>


                <div>

                    <strong>
                        COMPRA SEGURA
                    </strong>


                    <span>
                        Compra protegida.
                    </span>

                </div>

            </div>


            <div class="satori-trust-item">

                <div
                    class="satori-trust-icon"
                    aria-hidden="true"
                >
                    ✦
                </div>


                <div>

                    <strong>
                        CALIDAD SATORI
                    </strong>


                    <span>
                        ${escapeHTML(
                            details.warranty ||
                            "Calidad y atención SATORII."
                        )}
                    </span>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   DESCRIPCIÓN
===================================================== */

function generateDescription(
    product,
    type
) {

    const details =
        getDetails(
            product
        );


    const description =
        details.description ||
        product.description ||
        (
            type === "clothing"
                ? "Una prenda SATORII creada para formar parte de tu estilo."
                : "Un producto seleccionado para formar parte del universo SATORII."
        );


    const shipping =
        details.shipping ||
        "Envíos a todo Chile.";


    const warranty =
        details.warranty ||
        "Compra protegida frente a fallas de fabricación.";


    const care =
        details.care ||
        (
            type === "clothing"
                ? "Lavar con agua fría. No planchar directamente sobre el estampado."
                : "Revisar las indicaciones específicas del producto antes de su uso o limpieza."
        );


    return `

        <section class="satori-details">

            <div class="satori-tabs">

                <button
                    type="button"
                    class="
                        satori-tab
                        active
                    "
                    data-tab="description"
                >
                    DESCRIPCIÓN
                </button>


                <button
                    type="button"
                    class="satori-tab"
                    data-tab="shipping"
                >
                    ENVÍOS Y GARANTÍA
                </button>

            </div>


            <div
                class="
                    satori-panel
                    active
                "
                data-panel="description"
            >

                <h3>
                    Sobre este producto
                </h3>


                <p>
                    ${escapeHTML(description)}
                </p>


                <p
                    class="satori-product-care"
                >

                    <strong>
                        ${
                            type === "clothing"
                                ? "Cuidados:"
                                : "Recomendación:"
                        }
                    </strong>

                    ${escapeHTML(care)}

                </p>

            </div>


            <div
                class="satori-panel"
                data-panel="shipping"
            >

                <div
                    class="satori-detail-item"
                >

                    <strong>
                        ENVÍOS
                    </strong>


                    <p>
                        ${escapeHTML(shipping)}
                    </p>

                </div>


                <div
                    class="satori-detail-item"
                >

                    <strong>
                        GARANTÍA
                    </strong>


                    <p>
                        ${escapeHTML(warranty)}
                    </p>

                </div>

            </div>

        </section>

    `;

}


/* =====================================================
   ESPECIFICACIONES DE ACCESORIOS
===================================================== */

function getAccessorySpecs(product) {

    const details =
        getDetails(
            product
        );


    const raw =
        product.specifications ||
        details.specifications ||
        {};


    if (Array.isArray(raw)) {

        return raw
            .filter(
                item =>
                    item &&
                    (
                        item.label ||
                        item.name
                    )
            )
            .map(
                item => ({

                    label:
                        item.label ||
                        item.name,

                    value:
                        item.value ||
                        ""

                })
            );

    }


    if (
        raw &&
        typeof raw === "object"
    ) {

        return Object.entries(raw)
            .filter(
                ([label, value]) =>
                    value !== undefined &&
                    value !== null &&
                    value !== ""
            )
            .map(
                ([label, value]) => ({

                    label,
                    value

                })
            );

    }


    return [];

}


function generateAccessorySpecs(product) {

    const specs =
        getAccessorySpecs(
            product
        );


    if (!specs.length) {

        return `

            <section
                class="satori-accessory-info"
            >

                <div
                    class="satori-section-label"
                >
                    DETALLES
                </div>


                <h2>
                    LO ESENCIAL,
                    <br>

                    <em>
                        BIEN ELEGIDO.
                    </em>

                </h2>


                <p>
                    Cada accesorio SATORII
                    puede tener características
                    diferentes. Aquí podrás
                    encontrar los detalles
                    específicos de este producto.
                </p>

            </section>

        `;

    }


    return `

        <section
            class="satori-accessory-info"
        >

            <div
                class="satori-section-label"
            >
                DETALLES DEL PRODUCTO
            </div>


            <h2>
                CONOCE SUS
                <br>

                <em>
                    DETALLES.
                </em>

            </h2>


            <div
                class="satori-spec-grid"
            >

                ${specs.map(
                    spec => `

                    <div
                        class="satori-spec"
                    >

                        <span>
                            ${escapeHTML(
                                spec.label
                            )}
                        </span>


                        <strong>
                            ${escapeHTML(
                                spec.value
                            )}
                        </strong>

                    </div>

                `
                ).join("")}

            </div>

        </section>

    `;

}


/* =====================================================
   BANNER DE CUIDADO
===================================================== */

function generateCareBanner(
    product,
    outputDirectory
) {

    const careImage =
        product.careImage ||
        "";


    const image =
        careImage
            ? getImagePath(
                careImage,
                outputDirectory
            )
            : "";


    return `

        <section
            class="
                satori-style-banner
                ${
                    image
                        ? "has-image"
                        : "no-image"
                }
            "
        >

            <div
                class="satori-style-content"
            >

                <span>
                    SATORII · CUIDADO
                </span>


                <h2>
                    CUIDA TU
                    <em>
                        SATORII.
                    </em>
                </h2>


                <p>
                    Una buena prenda merece durar.
                    Aprende a cuidar el estampado,
                    el tejido y la apariencia
                    de tu SATORII.
                </p>


                <a
                    href="../../cuidado.html"
                >
                    VER GUÍA DE CUIDADO →
                </a>

            </div>


            ${
                image
                    ? `

                    <div
                        class="satori-style-image"
                    >

                        <img
                            src="${escapeHTML(image)}"
                            alt="Cuidado de ${escapeHTML(product.name)}"
                        >

                    </div>

                `
                    : ""
            }

        </section>

    `;

}


/* =====================================================
   EDITORIAL PRENDA
===================================================== */

function generateClothingEditorial(
    product,
    outputDirectory
) {

    const images =
        getImages(
            product
        );


    const image =
        images.length
            ? getImagePath(
                images[1] ||
                images[0],
                outputDirectory
            )
            : "";


    return `

        <section
            class="satori-editorial"
        >

            <div
                class="
                    satori-editorial-content
                "
            >

                <span>
                    SATORII · ${
                        escapeHTML(
                            String(
                                product.collection ||
                                product.category ||
                                "PRENDAS"
                            ).toUpperCase()
                        )
                    }
                </span>


                <h2>

                    NO VISTAS UN
                    <em>
                        PERSONAJE.
                    </em>

                    <br>

                    VISTE TU
                    <strong>
                        UNIVERSO.
                    </strong>

                </h2>


                <p>
                    Tu estilo no necesita
                    explicaciones.
                    Es una forma de mostrar
                    aquello que realmente
                    te representa.
                </p>


                <a href="#producto">
                    VER LA PRENDA →
                </a>

            </div>


            <div
                class="
                    satori-editorial-image
                "
            >

                ${
                    image
                        ? `

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(product.name)}"
                        >

                    `
                        : ""
                }

            </div>

        </section>

    `;

}


/* =====================================================
   EDITORIAL ACCESORIOS
===================================================== */

function generateAccessoryEditorial(
    product,
    outputDirectory
) {

    const images =
        getImages(
            product
        );


    const image =
        images.length
            ? getImagePath(
                images[1] ||
                images[0],
                outputDirectory
            )
            : "";


    const type =
        product.type ||
        product.subcategory ||
        "ACCESORIO";


    return `

        <section
            class="
                satori-accessory-editorial
            "
        >

            <div
                class="
                    satori-accessory-editorial-image
                "
            >

                ${
                    image
                        ? `

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(product.name)}"
                        >

                    `
                        : ""
                }

            </div>


            <div
                class="
                    satori-accessory-editorial-content
                "
            >

                <span>
                    SATORII · ${
                        escapeHTML(
                            String(type).toUpperCase()
                        )
                    }
                </span>


                <h2>
                    DETALLES QUE
                    <em>
                        COMPLETAN
                    </em>
                    TU ESTILO.
                </h2>


                <p>
                    Descubre productos que
                    pueden acompañar tu colección,
                    tu espacio o simplemente
                    aquello que te gusta.
                </p>


                <a href="#producto">
                    VOLVER AL PRODUCTO →
                </a>

            </div>

        </section>

    `;

}


/* =====================================================
   RECOMENDACIONES
===================================================== */

function shuffle(array) {

    const result =
        array.slice();


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];

    }


    return result;

}


function generateRecommendations(
    currentProduct,
    allProducts,
    outputDirectory
) {

    const currentId =
        String(
            currentProduct.id
        );


    const available =
        allProducts.filter(
            product =>
                product &&
                String(product.id) !==
                    currentId &&
                product.available !== false
        );


    const sameType =
        available.filter(
            product =>
                getProductType(product) ===
                getProductType(currentProduct)
        );


    const differentType =
        available.filter(
            product =>
                getProductType(product) !==
                getProductType(currentProduct)
        );


    const related =
        shuffle(sameType)
            .concat(
                shuffle(differentType)
            )
            .slice(0, 5);


    if (!related.length) {

        return "";

    }


    const cards =
        related.map(
            item => {

                const images =
                    getImages(
                        item
                    );


                const image =
                    images.length
                        ? getImagePath(
                            images[0],
                            outputDirectory
                        )
                        : "";


                const categoryPath =
                    normalizeCategory(
                        item.category
                    );


                const filename =
                    `${
                        slugify(
                            item.id ||
                            item.name
                        )
                    }.html`;


                const url =
                    `../${categoryPath}/${filename}`;


                return `

                    <a
                        href="${escapeHTML(url)}"
                        class="satori-related-card"
                    >

                        <div
                            class="satori-related-image"
                        >

                            ${
                                image
                                    ? `

                                    <img
                                        src="${escapeHTML(image)}"
                                        alt="${escapeHTML(item.name)}"
                                        loading="lazy"
                                    >

                                `
                                    : `
                                        <span>
                                            SATORII
                                        </span>
                                    `
                            }

                        </div>


                        <div
                            class="
                                satori-related-info
                            "
                        >

                            <span>
                                ${
                                    escapeHTML(
                                        String(
                                            item.collection ||
                                            item.category ||
                                            "SATORII"
                                        ).toUpperCase()
                                    )
                                }
                            </span>


                            <h3>
                                ${escapeHTML(
                                    item.name
                                )}
                            </h3>


                            <strong>
                                ${formatPrice(
                                    item.price
                                )}
                            </strong>

                        </div>

                    </a>

                `;

            }
        ).join("");


    return `

        <section
            class="satori-related"
        >

            <div
                class="
                    satori-related-heading
                "
            >

                <span>
                    SATORII · DESCUBRE MÁS
                </span>


                <h2>
                    TAMBIÉN TE PUEDE
                    <em>
                        GUSTAR.
                    </em>
                </h2>


                <p>
                    Descubre otros diseños
                    que podrían convertirse
                    en parte de tu universo.
                </p>

            </div>


            <div
                class="
                    satori-related-grid
                "
            >

                ${cards}

            </div>

        </section>

    `;

}


/* =====================================================
   CSS DEL PRODUCTO
===================================================== */

function generateProductCSS() {

    return `

        :root {

            --satori-red:
                #e50914;

            --satori-black:
                #111827;

            --satori-gray:
                #707070;

            --satori-border:
                #e7e7e7;

            --satori-light:
                #fafafa;

        }


        * {

            box-sizing:
                border-box;

        }


        body {

            margin:
                0;

            background:
                #ffffff;

            color:
                var(--satori-black);

            font-family:
                Arial,
                Helvetica,
                sans-serif;

        }


        button,
        a {

            -webkit-tap-highlight-color:
                transparent;

        }


        .satori-product-page {

            width:
                min(
                    100%,
                    1500px
                );

            margin:
                0 auto;

            padding:
                42px 42px 100px;

        }


        .satori-product-layout {

            display:
                grid;

            grid-template-columns:
                minmax(
                    0,
                    1.08fr
                )
                minmax(
                    400px,
                    .92fr
                );

            gap:
                58px;

            align-items:
                start;

        }


        .satori-product-gallery {

            width:
                100%;

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
                #f5f5f5;

        }


        .satori-main-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

        }


        .satori-image-placeholder {

            width:
                100%;

            height:
                100%;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            color:
                #999;

            font-size:
                12px;

            font-weight:
                900;

            letter-spacing:
                2px;

        }


        .satori-thumbnails {

            display:
                grid;

            grid-template-columns:
                repeat(
                    3,
                    1fr
                );

            gap:
                10px;

            margin-top:
                10px;

        }


        .satori-thumbnail {

            position:
                relative;

            width:
                100%;

            aspect-ratio:
                1 / 1;

            padding:
                0;

            border:
                1px solid
                transparent;

            background:
                #f5f5f5;

            cursor:
                pointer;

            overflow:
                hidden;

        }


        .satori-thumbnail img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

            transition:
                transform
                .3s
                ease;

        }


        .satori-thumbnail:hover img {

            transform:
                scale(
                    1.04
                );

        }


        .satori-thumbnail.active {

            border-color:
                #111827;

        }


        .satori-product-info {

            width:
                100%;

            max-width:
                580px;

            padding-top:
                5px;

        }


        .satori-product-category {

            display:
                block;

            margin-bottom:
                12px;

            color:
                #777;

            font-size:
                11px;

            font-weight:
                800;

            letter-spacing:
                1.4px;

        }


        .satori-product-info h1 {

            margin:
                0;

            color:
                #111827;

            font-size:
                clamp(
                    28px,
                    3vw,
                    44px
                );

            line-height:
                1.04;

            font-weight:
                900;

            letter-spacing:
                -.8px;

        }


        .satori-product-price {

            margin-top:
                16px;

            color:
                #111827;

            font-size:
                20px;

            font-weight:
                800;

        }


        .satori-product-divider {

            width:
                100%;

            height:
                1px;

            margin:
                24px 0;

            background:
                var(--satori-border);

        }


        .satori-option {

            margin-bottom:
                24px;

        }


        .satori-option-header {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            gap:
                15px;

            margin-bottom:
                10px;

        }


        .satori-option-header span {

            color:
                #111827;

            font-size:
                11px;

            font-weight:
                900;

            letter-spacing:
                .8px;

        }


        .satori-option-header a {

            color:
                #777;

            font-size:
                10px;

            font-weight:
                800;

            letter-spacing:
                .4px;

            text-decoration:
                underline;

            text-underline-offset:
                3px;

        }


        .satori-color-options {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                8px;

        }


        .satori-color-button {

            display:
                inline-flex;

            align-items:
                center;

            gap:
                8px;

            min-height:
                38px;

            padding:
                0 12px;

            border:
                1px solid
                var(--satori-border);

            border-radius:
                4px;

            background:
                #ffffff;

            color:
                #333;

            font-size:
                11px;

            cursor:
                pointer;

            transition:
                border-color
                .2s
                ease,
                background
                .2s
                ease,
                transform
                .2s
                ease;

        }


        .satori-color-button:hover {

            border-color:
                #999;

        }


        .satori-color-button.active {

            border-color:
                #111827;

            background:
                #111827;

            color:
                #ffffff;

            transform:
                translateY(
                    -1px
                );

        }


        .satori-color-dot {

            width:
                15px;

            height:
                15px;

            display:
                block;

            border:
                1px solid
                rgba(
                    0,
                    0,
                    0,
                    .15
                );

            border-radius:
                50%;

        }


        .color-black {

            background:
                #111111;

        }


        .color-white {

            background:
                #ffffff;

        }


        .color-red {

            background:
                #c9141b;

        }


        .color-blue {

            background:
                #1e4c9a;

        }


        .color-green {

            background:
                #315f43;

        }


        .satori-size-options {

            display:
                flex;

            flex-wrap:
                wrap;

            gap:
                8px;

        }


        .satori-size-button {

            min-width:
                48px;

            height:
                40px;

            padding:
                0 12px;

            border:
                1px solid
                var(--satori-border);

            border-radius:
                4px;

            background:
                #ffffff;

            color:
                #333;

            font-size:
                11px;

            font-weight:
                800;

            cursor:
                pointer;

            transition:
                .2s
                ease;

        }


        .satori-size-button:hover {

            border-color:
                #999;

        }


        .satori-size-button.active {

            background:
                #111827;

            border-color:
                #111827;

            color:
                #ffffff;

        }


        .satori-quantity-row {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            margin-top:
                26px;

            padding:
                15px 0;

            border-top:
                1px solid
                var(--satori-border);

            border-bottom:
                1px solid
                var(--satori-border);

        }


        .satori-quantity-label {

            color:
                #111827;

            font-size:
                11px;

            font-weight:
                900;

            letter-spacing:
                .8px;

        }


        .satori-quantity {

            display:
                flex;

            align-items:
                center;

            border:
                1px solid
                var(--satori-border);

        }


        .satori-quantity button {

            width:
                38px;

            height:
                36px;

            padding:
                0;

            border:
                0;

            background:
                #ffffff;

            color:
                #111827;

            font-size:
                18px;

            cursor:
                pointer;

        }


        .satori-quantity span {

            width:
                38px;

            text-align:
                center;

            color:
                #111827;

            font-size:
                12px;

            font-weight:
                800;

        }


        .satori-add-to-cart {

            position:
                relative;

            overflow:
                hidden;

            width:
                100%;

            min-height:
                56px;

            margin-top:
                22px;

            padding:
                0 20px;

            border:
                0;

            border-radius:
                5px;

            background:
                #111827;

            color:
                #ffffff;

            font-size:
                12px;

            font-weight:
                900;

            letter-spacing:
                .8px;

            cursor:
                pointer;

            transition:
                background
                .28s
                ease,
                transform
                .2s
                ease,
                box-shadow
                .28s
                ease;

        }


        .satori-add-to-cart:hover {

            transform:
                translateY(
                    -1px
                );

            box-shadow:
                0 8px 24px
                rgba(
                    0,
                    0,
                    0,
                    .12
                );

        }


        .satori-add-to-cart.added {

            background:
                #e50914 !important;

            color:
                #ffffff !important;

            box-shadow:
                0 8px 26px
                rgba(
                    229,
                    9,
                    20,
                    .25
                );

            animation:
                satoriCartAdded
                .55s
                cubic-bezier(
                    .34,
                    1.56,
                    .64,
                    1
                );

        }


        @keyframes satoriCartAdded {

            0% {

                transform:
                    scale(
                        .95
                    );

            }

            45% {

                transform:
                    scale(
                        1.025
                    );

            }

            75% {

                transform:
                    scale(
                        .99
                    );

            }

            100% {

                transform:
                    scale(
                        1
                    );

            }

        }


        .satori-add-to-cart.added::after {

            content:
                "";

            position:
                absolute;

            top:
                0;

            left:
                -120%;

            width:
                65%;

            height:
                100%;

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(
                        255,
                        255,
                        255,
                        .35
                    ),
                    transparent
                );

            transform:
                skewX(
                    -20deg
                );

            animation:
                satoriCartShine
                .65s
                ease
                forwards;

        }


        @keyframes satoriCartShine {

            from {

                left:
                    -120%;

            }

            to {

                left:
                    150%;

            }

        }


        .satori-trust-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    3,
                    1fr
                );

            gap:
                10px;

            margin-top:
                20px;

            padding:
                16px 0;

            border-bottom:
                1px solid
                var(--satori-border);

        }


        .satori-trust-item {

            display:
                flex;

            align-items:
                flex-start;

            gap:
                9px;

            min-width:
                0;

        }


        .satori-trust-icon {

            width:
                30px;

            height:
                30px;

            min-width:
                30px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border:
                1px solid
                #e1e1e1;

            border-radius:
                50%;

            background:
                #fafafa;

            font-size:
                14px;

            line-height:
                1;

        }


        .satori-trust-item strong {

            display:
                block;

            color:
                #111827;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .3px;

        }


        .satori-trust-item span {

            display:
                block;

            margin-top:
                3px;

            color:
                #777;

            font-size:
                9px;

            line-height:
                1.4;

        }


        .satori-details {

            margin-top:
                24px;

        }


        .satori-tabs {

            display:
                grid;

            grid-template-columns:
                repeat(
                    2,
                    1fr
                );

            border-bottom:
                1px solid
                var(--satori-border);

        }


        .satori-tab {

            position:
                relative;

            min-height:
                48px;

            padding:
                0 12px;

            border:
                0;

            background:
                #ffffff;

            color:
                #777;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .6px;

            cursor:
                pointer;

        }


        .satori-tab::after {

            content:
                "";

            position:
                absolute;

            left:
                18%;

            right:
                18%;

            bottom:
                0;

            height:
                2px;

            background:
                transparent;

            transform:
                scaleX(
                    .35
                );

            transition:
                background
                .2s
                ease,
                transform
                .2s
                ease;

        }


        .satori-tab:hover {

            background:
                #fafafa;

        }


        .satori-tab.active {

            background:
                #fafafa;

            color:
                #111827;

        }


        .satori-tab.active::after {

            background:
                var(--satori-red);

            transform:
                scaleX(
                    1
                );

        }


        .satori-panel {

            display:
                none;

            padding:
                24px 2px 0;

        }


        .satori-panel.active {

            display:
                block;

            animation:
                satoriPanelIn
                .25s
                ease;

        }


        @keyframes satoriPanelIn {

            from {

                opacity:
                    0;

                transform:
                    translateY(
                        5px
                    );

            }

            to {

                opacity:
                    1;

                transform:
                    translateY(
                        0
                    );

            }

        }


        .satori-panel h3 {

            margin:
                0 0 10px;

            color:
                #111827;

            font-size:
                15px;

            font-weight:
                900;

        }


        .satori-panel p {

            margin:
                0 0 14px;

            color:
                #555;

            font-size:
                13px;

            line-height:
                1.7;

        }


        .satori-product-care {

            padding-top:
                5px;

        }


        .satori-detail-item {

            padding:
                0 0 18px;

        }


        .satori-detail-item strong {

            display:
                block;

            margin-bottom:
                6px;

            color:
                #111827;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .8px;

        }


        .satori-detail-item p {

            margin:
                0;

        }


        .satori-style-banner {

            display:
                grid;

            grid-template-columns:
                1fr;

            min-height:
                250px;

            margin-top:
                70px;

            overflow:
                hidden;

            background:
                #111827;

            color:
                #ffffff;

        }


        .satori-style-banner.has-image {

            grid-template-columns:
                1fr
                .72fr;

        }


        .satori-style-content {

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            padding:
                42px 50px;

        }


        .satori-style-content > span {

            margin-bottom:
                10px;

            color:
                #bdbdbd;

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                1.4px;

        }


        .satori-style-content h2 {

            margin:
                0;

            font-size:
                clamp(
                    27px,
                    3vw,
                    42px
                );

            line-height:
                .98;

            font-weight:
                900;

            letter-spacing:
                -1px;

        }


        .satori-style-content h2 em {

            color:
                #e50914;

            font-style:
                normal;

        }


        .satori-style-content p {

            max-width:
                570px;

            margin:
                18px 0;

            color:
                #cfcfcf;

            font-size:
                13px;

            line-height:
                1.65;

        }


        .satori-style-content a {

            align-self:
                flex-start;

            color:
                #ffffff;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .7px;

            text-decoration:
                none;

        }


        .satori-style-image {

            min-height:
                250px;

            overflow:
                hidden;

        }


        .satori-style-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

        }


        .satori-related {

            margin-top:
                80px;

        }


        .satori-related-heading {

            max-width:
                600px;

            margin-bottom:
                30px;

        }


        .satori-related-heading > span {

            color:
                #777;

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                1.3px;

        }


        .satori-related-heading h2 {

            margin:
                8px 0;

            color:
                #111827;

            font-size:
                clamp(
                    26px,
                    3vw,
                    38px
                );

            line-height:
                1;

            font-weight:
                900;

            letter-spacing:
                -1px;

        }


        .satori-related-heading h2 em {

            color:
                #e50914;

            font-style:
                normal;

        }


        .satori-related-heading p {

            margin:
                0;

            color:
                #777;

            font-size:
                12px;

            line-height:
                1.6;

        }


        .satori-related-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    5,
                    minmax(
                        0,
                        1fr
                    )
                );

            gap:
                16px;

        }


        .satori-related-card {

            min-width:
                0;

            color:
                inherit;

            text-decoration:
                none;

        }


        .satori-related-image {

            width:
                100%;

            aspect-ratio:
                1 / 1.08;

            overflow:
                hidden;

            background:
                #f5f5f5;

        }


        .satori-related-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

            transition:
                transform
                .35s
                ease;

        }


        .satori-related-card:hover
        .satori-related-image img {

            transform:
                scale(
                    1.035
                );

        }


        .satori-related-info {

            padding:
                10px 1px 0;

        }


        .satori-related-info span {

            color:
                #888;

            font-size:
                8px;

            font-weight:
                900;

            letter-spacing:
                .9px;

        }


        .satori-related-info h3 {

            margin:
                5px 0;

            color:
                #111827;

            font-size:
                12px;

            font-weight:
                900;

            line-height:
                1.2;

        }


        .satori-related-info strong {

            color:
                #111827;

            font-size:
                11px;

        }


        .satori-accessory-info {

            margin-top:
                60px;

            padding:
                45px;

            background:
                #f7f7f7;

        }


        .satori-section-label {

            margin-bottom:
                10px;

            color:
                #777;

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                1.3px;

        }


        .satori-accessory-info h2 {

            margin:
                0 0 25px;

            font-size:
                clamp(
                    28px,
                    4vw,
                    46px
                );

            line-height:
                .95;

            font-weight:
                900;

            letter-spacing:
                -1.2px;

        }


        .satori-accessory-info h2 em {

            color:
                #e50914;

            font-style:
                normal;

        }


        .satori-accessory-info p {

            max-width:
                620px;

            color:
                #666;

            font-size:
                13px;

            line-height:
                1.7;

        }


        .satori-spec-grid {

            display:
                grid;

            grid-template-columns:
                repeat(
                    4,
                    1fr
                );

            gap:
                10px;

            margin-top:
                25px;

        }


        .satori-spec {

            padding:
                18px;

            background:
                #ffffff;

            border:
                1px solid
                #e8e8e8;

        }


        .satori-spec span {

            display:
                block;

            margin-bottom:
                8px;

            color:
                #888;

            font-size:
                9px;

            font-weight:
                800;

            text-transform:
                uppercase;

        }


        .satori-spec strong {

            color:
                #111827;

            font-size:
                12px;

        }


        .satori-editorial {

            display:
                grid;

            grid-template-columns:
                .85fr
                1.15fr;

            min-height:
                390px;

            margin-top:
                80px;

            overflow:
                hidden;

            background:
                #f3f3f3;

        }


        .satori-editorial-content {

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            padding:
                50px;

        }


        .satori-editorial-content > span {

            margin-bottom:
                12px;

            color:
                #777;

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                1.4px;

        }


        .satori-editorial-content h2 {

            margin:
                0;

            color:
                #111827;

            font-size:
                clamp(
                    30px,
                    4vw,
                    55px
                );

            line-height:
                .93;

            font-weight:
                900;

            letter-spacing:
                -1.5px;

        }


        .satori-editorial-content h2 em {

            color:
                #e50914;

            font-style:
                normal;

        }


        .satori-editorial-content h2 strong {

            color:
                #111827;

        }


        .satori-editorial-content p {

            max-width:
                480px;

            margin:
                22px 0;

            color:
                #666;

            font-size:
                13px;

            line-height:
                1.65;

        }


        .satori-editorial-content a {

            align-self:
                flex-start;

            color:
                #111827;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .7px;

            text-decoration:
                none;

        }


        .satori-editorial-image {

            min-height:
                390px;

            overflow:
                hidden;

        }


        .satori-editorial-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

        }


        .satori-accessory-editorial {

            display:
                grid;

            grid-template-columns:
                1.05fr
                .95fr;

            min-height:
                360px;

            margin-top:
                70px;

            overflow:
                hidden;

            background:
                #111827;

            color:
                #ffffff;

        }


        .satori-accessory-editorial-image {

            min-height:
                360px;

            overflow:
                hidden;

        }


        .satori-accessory-editorial-image img {

            width:
                100%;

            height:
                100%;

            display:
                block;

            object-fit:
                cover;

        }


        .satori-accessory-editorial-content {

            display:
                flex;

            flex-direction:
                column;

            justify-content:
                center;

            padding:
                45px;

        }


        .satori-accessory-editorial-content > span {

            color:
                #aaa;

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                1.3px;

        }


        .satori-accessory-editorial-content h2 {

            margin:
                12px 0;

            color:
                #ffffff;

            font-size:
                clamp(
                    28px,
                    3vw,
                    45px
                );

            line-height:
                .95;

            font-weight:
                900;

            letter-spacing:
                -1px;

        }


        .satori-accessory-editorial-content h2 em {

            color:
                #e50914;

            font-style:
                normal;

        }


        .satori-accessory-editorial-content p {

            max-width:
                460px;

            color:
                #c8c8c8;

            font-size:
                13px;

            line-height:
                1.65;

        }


        .satori-accessory-editorial-content a {

            margin-top:
                10px;

            color:
                #ffffff;

            font-size:
                10px;

            font-weight:
                900;

            letter-spacing:
                .7px;

            text-decoration:
                none;

        }


        @media (
            max-width: 1100px
        ) {

            .satori-product-layout {

                grid-template-columns:
                    1fr
                    1fr;

                gap:
                    35px;

            }


            .satori-product-info {

                max-width:
                    none;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(
                        4,
                        1fr
                    );

            }

        }


        @media (
            max-width: 800px
        ) {

            .satori-product-page {

                padding:
                    25px 20px 70px;

            }


            .satori-product-layout {

                grid-template-columns:
                    1fr;

                gap:
                    35px;

            }


            .satori-style-banner.has-image {

                grid-template-columns:
                    1fr;

            }


            .satori-style-image {

                min-height:
                    230px;

            }


            .satori-editorial {

                grid-template-columns:
                    1fr;

            }


            .satori-editorial-image {

                min-height:
                    300px;

                order:
                    -1;

            }


            .satori-accessory-editorial {

                grid-template-columns:
                    1fr;

            }


            .satori-accessory-editorial-image {

                min-height:
                    300px;

            }


            .satori-related-grid {

                grid-template-columns:
                    repeat(
                        2,
                        1fr
                    );

            }


            .satori-spec-grid {

                grid-template-columns:
                    repeat(
                        2,
                        1fr
                    );

            }

        }


        @media (
            max-width: 520px
        ) {

            .satori-product-page {

                padding:
                    18px 14px 55px;

            }


            .satori-product-info h1 {

                font-size:
                    30px;

            }


            .satori-trust-grid {

                grid-template-columns:
                    1fr;

                gap:
                    13px;

            }


            .satori-trust-item {

                align-items:
                    center;

            }


            .satori-style-content,
            .satori-editorial-content,
            .satori-accessory-editorial-content {

                padding:
                    32px 25px;

            }


            .satori-related-grid {

                gap:
                    12px;

            }


            .satori-spec-grid {

                grid-template-columns:
                    1fr;

            }


            .satori-accessory-info {

                padding:
                    30px 22px;

            }

        }

    `;

}


/* =====================================================
   JAVASCRIPT DEL PRODUCTO
===================================================== */

function generateProductJS() {

    return `

<script>

(function () {

    "use strict";


    function initSatoriProduct() {


        /* =================================================
           GALERÍA
        ================================================= */

        const mainImage =
            document.getElementById(
                "satoriMainImage"
            );


        document
            .querySelectorAll(
                ".satori-thumbnail"
            )
            .forEach(
                function (thumbnail) {

                    thumbnail.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();


                            const image =
                                this.dataset.image;


                            if (
                                mainImage &&
                                image
                            ) {

                                mainImage.src =
                                    image;

                            }


                            document
                                .querySelectorAll(
                                    ".satori-thumbnail"
                                )
                                .forEach(
                                    function (item) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            this.classList.add(
                                "active"
                            );

                        }
                    );

                }
            );


        /* =================================================
           COLOR
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".satori-color-button"
                    );


                if (!button) {

                    return;

                }


                event.preventDefault();


                document
                    .querySelectorAll(
                        ".satori-color-button"
                    )
                    .forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                button.classList.add(
                    "active"
                );

            }
        );


        /* =================================================
           TALLA
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".satori-size-button"
                    );


                if (!button) {

                    return;

                }


                event.preventDefault();


                document
                    .querySelectorAll(
                        ".satori-size-button"
                    )
                    .forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                button.classList.add(
                    "active"
                );

            }
        );


        /* =================================================
           CANTIDAD
        ================================================= */

        let quantity =
            1;


        const quantityDisplay =
            document.getElementById(
                "satoriQuantity"
            );


        const quantityInput =
            document.getElementById(
                "quantity"
            );


        const minusButton =
            document.getElementById(
                "satoriQuantityMinus"
            );


        const plusButton =
            document.getElementById(
                "satoriQuantityPlus"
            );


        function updateQuantity() {

            if (
                quantityDisplay
            ) {

                quantityDisplay.textContent =
                    quantity;

            }


            if (
                quantityInput
            ) {

                quantityInput.value =
                    quantity;

            }

        }


        if (
            minusButton
        ) {

            minusButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    quantity =
                        Math.max(
                            1,
                            quantity - 1
                        );


                    updateQuantity();

                }
            );

        }


        if (
            plusButton
        ) {

            plusButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    quantity +=
                        1;


                    updateQuantity();

                }
            );

        }


        updateQuantity();


        /* =================================================
           PESTAÑAS
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                const tab =
                    event.target.closest(
                        ".satori-tab"
                    );


                if (!tab) {

                    return;

                }


                event.preventDefault();


                const target =
                    tab.dataset.tab;


                if (!target) {

                    return;

                }


                document
                    .querySelectorAll(
                        ".satori-tab"
                    )
                    .forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                document
                    .querySelectorAll(
                        ".satori-panel"
                    )
                    .forEach(
                        function (panel) {

                            panel.classList.remove(
                                "active"
                            );

                        }
                    );


                tab.classList.add(
                    "active"
                );


                const selectedPanel =
                    document.querySelector(
                        '.satori-panel[data-panel="' +
                        target +
                        '"]'
                    );


                if (
                    selectedPanel
                ) {

                    selectedPanel.classList.add(
                        "active"
                    );

                }

            }
        );


        /* =================================================
           BOTÓN CARRITO
        ================================================= */

        const addButton =
            document.getElementById(
                "addToCart"
            );


        let cartResetTimer =
            null;


        if (
            addButton
        ) {

            const originalText =
                addButton.textContent.trim();


            function showAddedState() {

                if (
                    cartResetTimer
                ) {

                    clearTimeout(
                        cartResetTimer
                    );

                }


                addButton.classList.remove(
                    "added"
                );


                void addButton.offsetWidth;


                addButton.classList.add(
                    "added"
                );


                addButton.textContent =
                    "✓ AGREGADO AL CARRITO";


                cartResetTimer =
                    setTimeout(
                        function () {

                            addButton.classList.remove(
                                "added"
                            );


                            addButton.textContent =
                                originalText;

                        },
                        2200
                    );

            }


            addButton.addEventListener(
                "click",
                function () {

                    showAddedState();

                }
            );


            document.addEventListener(
                "satorii:cart-updated",
                function () {

                    showAddedState();

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
            initSatoriProduct,
            {
                once:
                    true
            }
        );

    }
    else {

        initSatoriProduct();

    }


})();

</script>

    `;

}


/* =====================================================
   HTML PRENDA
===================================================== */

function generateClothingHTML(
    product,
    outputDirectory,
    allProducts
) {

    const name =
        escapeHTML(
            product.name
        );


    const category =
        escapeHTML(
            String(
                product.collection ||
                product.category ||
                "SATORII"
            ).toUpperCase()
        );


    const price =
        formatPrice(
            product.price
        );


    const description =
        product.details?.description ||
        product.description ||
        (
            product.name +
            " · SATORII"
        );


    const images =
        getImages(
            product
        );


    const mainImage =
        images.length
            ? getImagePath(
                images[0],
                outputDirectory
            )
            : "";


    return `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">


    <meta
        name="viewport"
        content="
            width=device-width,
            initial-scale=1.0
        "
    >


    <meta
        name="description"
        content="${escapeHTML(description)}"
    >


    <title>
        ${name} | SATORII
    </title>


    <link
        rel="icon"
        type="image/png"
        href="../../img/logo.png"
    >


    <link
        rel="stylesheet"
        href="../../css/style.css"
    >


    <style>

        ${generateProductCSS()}

    </style>

</head>


<body

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"

>


    <div
        id="satori-header"
    ></div>


    <main>

        <div
            class="satori-product-page"
        >

            <section
                class="satori-product-layout"
                id="producto"
            >


                <div
                    class="satori-product-gallery"
                >

                    ${generateGallery(
                        product,
                        outputDirectory
                    )}

                </div>


                <div
                    class="satori-product-info"

                    data-product

                    data-product-id="${escapeHTML(product.id)}"

                    data-product-name="${name}"

                    data-product-price="${escapeHTML(product.price)}"

                    data-product-image="${escapeHTML(mainImage)}"
                >


                    <span
                        class="
                            satori-product-category
                        "
                    >
                        ${category}
                    </span>


                    <h1>
                        ${name}
                    </h1>


                    <div
                        class="
                            satori-product-price
                        "
                    >
                        ${price}
                    </div>


                    <div
                        class="
                            satori-product-divider
                        "
                    ></div>


                    ${generateColors(
                        product
                    )}


                    ${generateSizes(
                        product
                    )}


                    <div
                        class="
                            satori-quantity-row
                        "
                    >

                        <span
                            class="
                                satori-quantity-label
                            "
                        >
                            CANTIDAD
                        </span>


                        <div
                            class="
                                satori-quantity
                            "
                        >

                            <button
                                type="button"
                                id="satoriQuantityMinus"
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
                                id="satoriQuantityPlus"
                            >
                                +
                            </button>

                        </div>


                        <input
                            type="hidden"
                            id="quantity"
                            value="1"
                        >

                    </div>


                    <button
                        type="button"
                        id="addToCart"
                        class="
                            satori-add-to-cart
                            add-to-cart
                            add-to-cart-button
                        "
                        data-add-to-cart
                        data-product-id="${escapeHTML(product.id)}"
                        data-product-name="${name}"
                        data-product-price="${escapeHTML(product.price)}"
                        data-product-image="${escapeHTML(mainImage)}"
                    >

                        AGREGAR AL CARRITO · ${price}

                    </button>


                    ${generateTrustBlocks(
                        product
                    )}


                    ${generateDescription(
                        product,
                        "clothing"
                    )}

                </div>

            </section>


            ${generateCareBanner(
                product,
                outputDirectory
            )}


            ${generateRecommendations(
                product,
                allProducts,
                outputDirectory
            )}


            ${generateClothingEditorial(
                product,
                outputDirectory
            )}

        </div>

    </main>


    <div
        id="satori-footer"
    ></div>


    <script
        src="../../js/products.js"
    ></script>


    <script
        src="../../js/main.js"
    ></script>


    <script
        src="../../js/header.js"
    ></script>


    <script
        src="../../js/footer.js"
    ></script>


    <script
        src="../../js/cart.js"
    ></script>


    ${generateProductJS()}


</body>

</html>`;

}


/* =====================================================
   HTML ACCESORIOS
===================================================== */

function generateAccessoryHTML(
    product,
    outputDirectory,
    allProducts
) {

    const name =
        escapeHTML(
            product.name
        );


    const category =
        escapeHTML(
            String(
                product.collection ||
                product.category ||
                "ACCESORIOS"
            ).toUpperCase()
        );


    const price =
        formatPrice(
            product.price
        );


    const description =
        product.details?.description ||
        product.description ||
        (
            product.name +
            " · SATORII"
        );


    const images =
        getImages(
            product
        );


    const mainImage =
        images.length
            ? getImagePath(
                images[0],
                outputDirectory
            )
            : "";


    return `<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">


    <meta
        name="viewport"
        content="
            width=device-width,
            initial-scale=1.0
        "
    >


    <meta
        name="description"
        content="${escapeHTML(description)}"
    >


    <title>
        ${name} | SATORII
    </title>


    <link
        rel="icon"
        type="image/png"
        href="../../img/logo.png"
    >


    <link
        rel="stylesheet"
        href="../../css/style.css"
    >


    <style>

        ${generateProductCSS()}

    </style>

</head>


<body

    data-product-id="${escapeHTML(product.id)}"

    data-product-name="${name}"

    data-product-price="${escapeHTML(product.price)}"

    data-product-image="${escapeHTML(mainImage)}"

>


    <div
        id="satori-header"
    ></div>


    <main>

        <div
            class="satori-product-page"
        >

            <section
                class="satori-product-layout"
                id="producto"
            >


                <div
                    class="satori-product-gallery"
                >

                    ${generateGallery(
                        product,
                        outputDirectory
                    )}

                </div>


                <div
                    class="satori-product-info"

                    data-product

                    data-product-id="${escapeHTML(product.id)}"

                    data-product-name="${name}"

                    data-product-price="${escapeHTML(product.price)}"

                    data-product-image="${escapeHTML(mainImage)}"
                >


                    <span
                        class="
                            satori-product-category
                        "
                    >
                        ${category}
                    </span>


                    <h1>
                        ${name}
                    </h1>


                    <div
                        class="
                            satori-product-price
                        "
                    >
                        ${price}
                    </div>


                    <div
                        class="
                            satori-product-divider
                        "
                    ></div>


                    <div
                        class="
                            satori-quantity-row
                        "
                    >

                        <span
                            class="
                                satori-quantity-label
                            "
                        >
                            CANTIDAD
                        </span>


                        <div
                            class="
                                satori-quantity
                            "
                        >

                            <button
                                type="button"
                                id="satoriQuantityMinus"
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
                                id="satoriQuantityPlus"
                            >
                                +
                            </button>

                        </div>


                        <input
                            type="hidden"
                            id="quantity"
                            value="1"
                        >

                    </div>


                    <button
                        type="button"
                        id="addToCart"
                        class="
                            satori-add-to-cart
                            add-to-cart
                            add-to-cart-button
                        "
                        data-add-to-cart
                        data-product-id="${escapeHTML(product.id)}"
                        data-product-name="${name}"
                        data-product-price="${escapeHTML(product.price)}"
                        data-product-image="${escapeHTML(mainImage)}"
                    >

                        AGREGAR AL CARRITO · ${price}

                    </button>


                    ${generateTrustBlocks(
                        product
                    )}


                    ${generateDescription(
                        product,
                        "accessory"
                    )}


                    ${generateAccessorySpecs(
                        product
                    )}

                </div>

            </section>


            ${generateRecommendations(
                product,
                allProducts,
                outputDirectory
            )}


            ${generateAccessoryEditorial(
                product,
                outputDirectory
            )}

        </div>

    </main>


    <div
        id="satori-footer"
    ></div>


    <script
        src="../../js/products.js"
    ></script>


    <script
        src="../../js/main.js"
    ></script>


    <script
        src="../../js/header.js"
    ></script>


    <script
        src="../../js/footer.js"
    ></script>


    <script
        src="../../js/cart.js"
    ></script>


    ${generateProductJS()}


</body>

</html>`;

}


/* =====================================================
   GENERAR PÁGINA
===================================================== */

function generateProductPage(
    product,
    allProducts
) {

    const type =
        getProductType(
            product
        );


    const category =
        normalizeCategory(
            product.category
        );


    const categoryDirectory =
        path.join(
            OUTPUT_DIR,
            category
        );


    fs.mkdirSync(
        categoryDirectory,
        {
            recursive:
                true
        }
    );


    const filename =
        `${
            slugify(
                product.id ||
                product.name
            )
        }.html`;


    const outputFile =
        path.join(
            categoryDirectory,
            filename
        );


    let html;


    if (
        type === "clothing"
    ) {

        html =
            generateClothingHTML(
                product,
                categoryDirectory,
                allProducts
            );

    }
    else {

        html =
            generateAccessoryHTML(
                product,
                categoryDirectory,
                allProducts
            );

    }


    fs.writeFileSync(
        outputFile,
        html,
        "utf8"
    );


    return outputFile;

}


/* =====================================================
   LIMPIAR PRODUCTOS GENERADOS
===================================================== */

function cleanGeneratedProducts() {

    if (
        !fs.existsSync(
            OUTPUT_DIR
        )
    ) {

        return;

    }


    const categories = [

        "anime",
        "streetwear",
        "accesorios",
        "otros"

    ];


    categories.forEach(
        function (category) {

            const directory =
                path.join(
                    OUTPUT_DIR,
                    category
                );


            if (
                fs.existsSync(
                    directory
                )
            ) {

                fs.rmSync(
                    directory,
                    {
                        recursive:
                            true,
                        force:
                            true
                    }
                );

            }

        }
    );

}


/* =====================================================
   COMPROBAR IMÁGENES
===================================================== */

function checkProductImages(
    products
) {

    console.log("");
    console.log(
        "----------------------------------------"
    );
    console.log(
        "COMPROBANDO IMÁGENES"
    );
    console.log(
        "----------------------------------------"
    );


    products.forEach(
        function (product) {

            const images =
                getImages(
                    product
                );


            images.forEach(
                function (image) {

                    if (
                        !image ||
                        /^https?:\/\//i.test(
                            image
                        )
                    ) {

                        return;

                    }


                    const normalized =
                        String(image)
                            .replace(/\\/g, "/")
                            .replace(/^\/+/, "")
                            .replace(/^\.\/+/, "");


                    let absolute =
                        path.resolve(
                            ROOT,
                            normalized
                        );


                    absolute =
                        findFileCaseInsensitive(
                            absolute
                        );


                    if (
                        fs.existsSync(
                            absolute
                        )
                    ) {

                        console.log(
                            `✓ ${image}`
                        );

                    }
                    else {

                        console.warn(
                            `⚠ NO ENCONTRADA: ${image}`
                        );

                    }

                }
            );

        }
    );


    console.log(
        "----------------------------------------"
    );

}


/* =====================================================
   PRINCIPAL
===================================================== */

function main() {

    console.log(
        "========================================"
    );

    console.log(
        "SATORII · GENERADOR DE PRODUCTOS"
    );

    console.log(
        "========================================"
    );


    const products =
        loadProducts();


    console.log(
        `Productos encontrados: ${products.length}`
    );


    /*
     * Primero comprobamos las imágenes.
     */

    checkProductImages(
        products
    );


    fs.mkdirSync(
        OUTPUT_DIR,
        {
            recursive:
                true
        }
    );


    /*
     * Eliminamos las páginas anteriores.
     */

    cleanGeneratedProducts();


    let generated =
        0;


    products.forEach(
        function (product) {

            if (
                !product ||
                product.available === false
            ) {

                return;

            }


            try {

                const output =
                    generateProductPage(
                        product,
                        products
                    );


                generated +=
                    1;


                console.log(
                    `✓ ${output}`
                );

            }
            catch (
                error
            ) {

                console.error(
                    `✗ Error generando ${
                        product.name ||
                        product.id ||
                        "producto"
                    }`
                );


                throw error;

            }

        }
    );


    console.log(
        "========================================"
    );


    console.log(
        `Páginas generadas: ${generated}`
    );


    console.log(
        "========================================"
    );

}


main();
