document.addEventListener("DOMContentLoaded", function () {

    const footerContainer =
        document.getElementById("satori-footer") ||
        document.getElementById("footer");

    if (!footerContainer) return;


    /* =====================================================
       RUTA BASE
    ====================================================== */

    const script =
        document.currentScript ||
        document.querySelector(
            'script[src*="footer.js"]'
        );

    let BASE = "../";

    if (script) {

        try {

            const scriptURL =
                new URL(
                    script.src,
                    window.location.href
                );

            BASE =
                new URL(
                    "../",
                    scriptURL
                ).href;

        } catch (error) {

            BASE = "../";

        }

    }


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const SATORII_RED = "#EF0930";


    /* =====================================================
       FOOTER HTML
    ====================================================== */

    footerContainer.innerHTML = `

        <footer class="satori-footer">

            <div class="satori-footer-main">


                <!-- =====================================
                     MARCA
                ====================================== -->

                <div class="satori-footer-brand">

                    <a
                        href="${BASE}index.html"
                        class="satori-footer-logo"
                        aria-label="Satorii - Inicio"
                    >
                        SATORII
                    </a>

                    <div class="satori-footer-kanji">
                        悟
                    </div>

                    <p>
                        Anime, cultura japonesa y streetwear.
                    </p>

                </div>


                <!-- =====================================
                     COLECCIONES
                ====================================== -->

                <div class="satori-footer-column">

                    <h3>
                        COLECCIONES
                    </h3>

                    <a href="${BASE}anime.html">
                        Anime
                    </a>

                    <a href="${BASE}yokai.html">
                        Yokai
                    </a>

                </div>


                <!-- =====================================
                     TIENDA
                ====================================== -->

                <div class="satori-footer-column">

                    <h3>
                        TIENDA
                    </h3>

                    <a href="${BASE}productos.html">
                        Todos los productos
                    </a>

                    <a href="${BASE}carrito.html">
                        Carrito
                    </a>

                </div>


                <!-- =====================================
                     AYUDA
                ====================================== -->

                <div class="satori-footer-column">

                    <h3>
                        AYUDA
                    </h3>

                    <a href="${BASE}preguntas-frecuentes.html">
                        Preguntas frecuentes
                    </a>

                    <a href="${BASE}envios.html">
                        Envíos
                    </a>

                    <a href="${BASE}cambios-y-devoluciones.html">
                        Cambios y devoluciones
                    </a>

                    <a href="${BASE}guia-tallas.html">
                        Guía de tallas
                    </a>


                    <!-- =================================
                         REDES SOCIALES
                    ================================== -->

                    <div class="satori-footer-social">

                        <h3>
                            SÍGUENOS
                        </h3>

                        <a
                            href="https://www.instagram.com/satoriicl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="satori-instagram"
                            aria-label="Instagram Satorii"
                        >

                            <i
                                class="fa-brands fa-instagram"
                                aria-hidden="true"
                            ></i>

                            <span>
                                Instagram
                            </span>

                        </a>

                    </div>

                </div>

            </div>


            <!-- =========================================
                 PARTE INFERIOR
            ========================================== -->

            <div class="satori-footer-bottom">

                <span>
                    © ${new Date().getFullYear()} SATORII
                </span>

                <span>
                    Todos los derechos reservados.
                </span>

            </div>


        </footer>

    `;


    /* =====================================================
       EVITAR ESTILOS DUPLICADOS
    ====================================================== */

    if (
        document.getElementById(
            "satori-footer-styles"
        )
    ) {
        return;
    }


    /* =====================================================
       ESTILOS
    ====================================================== */

    const style =
        document.createElement("style");


    style.id =
        "satori-footer-styles";


    style.textContent = `

        /* =================================================
           FUENTES
        ================================================= */

        @import url(
            'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap'
        );

        @import url(
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
        );


        /* =================================================
           FOOTER BASE
        ================================================= */

        .satori-footer {

            width:100%;

            background:#101727;

            color:#fff;

            margin-top:0;

            border-radius:
                20px
                20px
                0
                0;

            overflow:hidden;

        }


        /* =================================================
           CONTENIDO PRINCIPAL
        ================================================= */

        .satori-footer-main {

            width:min(
                1400px,
                calc(100% - 48px)
            );

            margin:0 auto;

            padding:
                52px 0 48px;

            display:grid;

            grid-template-columns:
                1.7fr
                1fr
                1fr
                1fr;

            gap:55px;

            align-items:start;

        }


        /* =================================================
           MARCA
        ================================================= */

        .satori-footer-brand {

            min-width:0;

        }


        /* =================================================
           LOGO
        ================================================= */

        .satori-footer-logo {

            display:inline-block;

            color:#fff;

            text-decoration:none;

            font-family:
                "Barlow Condensed",
                "Arial Narrow",
                Arial,
                sans-serif;

            font-size:34px;

            line-height:.88;

            font-weight:800;

            font-style:italic;

            letter-spacing:-0.8px;

            text-transform:uppercase;

            transform:
                skewX(-3deg);

            transform-origin:
                left center;

            transition:
                color .2s ease,
                transform .2s ease;

        }


        .satori-footer-logo:hover {

            color:${SATORII_RED};

            transform:
                skewX(-5deg)
                scale(1.04);

        }


        /* =================================================
           KANJI
        ================================================= */

        .satori-footer-kanji {

            margin-top:10px;

            color:${SATORII_RED};

            font-family:
                Arial,
                "Noto Sans JP",
                sans-serif;

            font-size:15px;

            line-height:1;

            font-weight:700;

        }


        /* =================================================
           DESCRIPCIÓN
        ================================================= */

        .satori-footer-brand p {

            max-width:260px;

            margin:
                16px 0 0;

            color:#9ca3af;

            font-size:11px;

            line-height:1.65;

        }


        /* =================================================
           COLUMNAS
        ================================================= */

        .satori-footer-column {

            display:flex;

            flex-direction:column;

            align-items:flex-start;

            gap:10px;

        }


        /* =================================================
           TÍTULOS
        ================================================= */

        .satori-footer-column h3 {

            margin:
                0 0 8px;

            color:#fff;

            font-size:10px;

            line-height:1;

            font-weight:800;

            letter-spacing:
                .12em;

        }


        /* =================================================
           ENLACES
        ================================================= */

        .satori-footer-column a {

            width:fit-content;

            color:#9ca3af;

            font-size:10px;

            line-height:1.4;

            text-decoration:none;

            transition:
                color .2s ease,
                transform .2s ease;

        }


        .satori-footer-column > a:hover {

            color:${SATORII_RED};

            transform:
                translateX(2px);

        }


        /* =================================================
           REDES SOCIALES
        ================================================= */

        .satori-footer-social {

            margin-top:24px;

            padding-top:0;

        }


        .satori-footer-social h3 {

            margin:
                0 0 11px;

        }


        .satori-instagram {

            display:inline-flex !important;

            align-items:center;

            gap:8px;

            color:#9ca3af !important;

            font-size:10px;

            line-height:1.4;

            text-decoration:none;

            transition:
                color .2s ease,
                transform .2s ease;

        }


        .satori-instagram i {

            font-size:16px;

        }


        .satori-instagram:hover {

            color:${SATORII_RED} !important;

            transform:
                translateX(2px);

        }


        /* =================================================
           PARTE INFERIOR
        ================================================= */

        .satori-footer-bottom {

            width:min(
                1400px,
                calc(100% - 48px)
            );

            margin:0 auto;

            padding:
                18px 0;

            border-top:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .10
                );

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:40px;

            color:#6b7280;

            font-size:9px;

            line-height:1.4;

        }


        /* =================================================
           HOVER GENERAL
        ================================================= */

        .satori-footer a:focus-visible {

            outline:
                2px solid
                ${SATORII_RED};

            outline-offset:3px;

        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width:1000px) {

            .satori-footer-main {

                grid-template-columns:
                    1.5fr
                    1fr
                    1fr;

                gap:40px;

            }


            .satori-footer-brand {

                grid-row:span 2;

            }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width:700px) {

            .satori-footer-main {

                width:
                    calc(100% - 32px);

                padding:
                    42px 0;

                grid-template-columns:
                    1fr
                    1fr;

                gap:
                    35px 25px;

            }


            .satori-footer-brand {

                grid-column:
                    1 / -1;

                grid-row:auto;

            }


            .satori-footer-brand p {

                max-width:
                    320px;

            }


            .satori-footer-bottom {

                width:
                    calc(100% - 32px);

                padding:
                    17px 0;

                flex-direction:
                    column;

                align-items:
                    flex-start;

                gap:7px;

            }

        }


        /* =================================================
           MÓVILES PEQUEÑOS
        ====================================================== */

        @media (max-width:420px) {

            .satori-footer {

                border-radius:
                    16px
                    16px
                    0
                    0;

            }


            .satori-footer-main {

                width:
                    calc(100% - 28px);

                grid-template-columns:
                    1fr;

                gap:30px;

            }


            .satori-footer-brand {

                grid-column:auto;

            }


            .satori-footer-bottom {

                width:
                    calc(100% - 28px);

            }

        }


        /* =================================================
           REDUCED MOTION
        ====================================================== */

        @media (
            prefers-reduced-motion:reduce
        ) {

            .satori-footer *,
            .satori-footer *::before,
            .satori-footer *::after {

                transition:none !important;

            }

        }

    `;


    document.head.appendChild(style);

});
