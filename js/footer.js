document.addEventListener("DOMContentLoaded", function () {

    const footerContainer =
        document.getElementById("satori-footer") ||
        document.getElementById("footer");

    if (!footerContainer) return;


    /* =====================================================
       RUTA BASE
    ===================================================== */

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
       FOOTER HTML
    ===================================================== */

    footerContainer.innerHTML = `

        <footer class="satori-footer">

            <div class="satori-footer-main">


                <!-- =====================================
                     SATORII
                ====================================== -->

                <div class="satori-footer-brand">

                    <a
                        href="${BASE}index.html"
                        class="satori-footer-logo"
                    >
                        SATORII
                    </a>

                    <div class="satori-footer-kanji">
                        悟り
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

                    <a href="${BASE}streetwear.html">
                        Streetwear
                    </a>

                    <a href="${BASE}accesorios.html">
                        Accesorios
                    </a>

                </div>


                <!-- =====================================
                     PRODUCTOS
                ====================================== -->

                <div class="satori-footer-column">

                    <h3>
                        PRODUCTOS
                    </h3>

                    <a href="${BASE}productos.html">
                        Todos los productos
                    </a>

                    <a href="${BASE}carrito.html">
                        Carrito
                    </a>

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
       ESTILOS
    ===================================================== */

    if (
        document.getElementById(
            "satori-footer-styles"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "satori-footer-styles";


    style.textContent = `

        /* =================================================
           FUENTE DEL LOGO
        ================================================= */

        @import url(
            'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,900;1,900&display=swap'
        );


        /* =================================================
           FOOTER
        ================================================= */

        .satori-footer {

            width: 100%;

            background: #111827;

            color: #ffffff;

            margin-top: 0;

        }


        /* =================================================
           CONTENIDO PRINCIPAL
        ================================================= */

        .satori-footer-main {

            width: min(
                1400px,
                calc(100% - 48px)
            );

            margin: 0 auto;

            padding:
                48px 0 45px;

            display: grid;

            grid-template-columns:
                2fr 1fr 1fr;

            gap: 70px;

            align-items: start;

        }


        /* =================================================
           MARCA
        ================================================= */

        .satori-footer-brand {

            min-width: 0;

        }


        /* =================================================
           LOGO SATORII

           Condensado
           Extra Bold
           Itálico
           Compacto
        ================================================= */

        .satori-footer-logo {

            display: inline-block;

            color: #ffffff;

            text-decoration: none;

            font-family:
                "Roboto Condensed",
                "Arial Narrow",
                Arial,
                sans-serif;

            font-size: 29px;

            line-height: .88;

            font-weight: 900;

            font-style: italic;

            letter-spacing: -.075em;

            transform:
                scaleX(.88);

            transform-origin:
                left center;

        }


        /* =================================================
           KANJI
        ================================================= */

        .satori-footer-kanji {

            margin-top: 9px;

            color: #ff003c;

            font-family:
                Arial,
                "Noto Sans JP",
                sans-serif;

            font-size: 14px;

            line-height: 1;

            font-weight: 700;

        }


        /* =================================================
           DESCRIPCIÓN
        ================================================= */

        .satori-footer-brand p {

            margin:
                15px 0 0;

            color: #c7ccd4;

            font-size: 11px;

            line-height: 1.6;

        }


        /* =================================================
           COLUMNAS
        ================================================= */

        .satori-footer-column {

            display: flex;

            flex-direction: column;

            gap: 10px;

        }


        .satori-footer-column h3 {

            margin:
                0 0 8px;

            color: #ffffff;

            font-size: 10px;

            line-height: 1;

            font-weight: 850;

            letter-spacing: .09em;

        }


        .satori-footer-column a {

            width: fit-content;

            color: #c7ccd4;

            font-size: 10px;

            line-height: 1.3;

            text-decoration: none;

            transition:
                color .2s ease;

        }


        .satori-footer-column a:hover {

            color: #ffffff;

        }


        /* =================================================
           PARTE INFERIOR
        ================================================= */

        .satori-footer-bottom {

            width: min(
                1400px,
                calc(100% - 48px)
            );

            margin: 0 auto;

            padding:
                18px 0;

            border-top:
                1px solid rgba(
                    255,
                    255,
                    255,
                    .12
                );

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            color: #8e96a3;

            font-size: 9px;

        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 800px) {

            .satori-footer-main {

                grid-template-columns:
                    1.5fr 1fr 1fr;

                gap: 35px;

            }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 600px) {

            .satori-footer-main {

                width:
                    calc(100% - 28px);

                padding:
                    38px 0;

                grid-template-columns:
                    1fr 1fr;

                gap:
                    30px 25px;

            }


            .satori-footer-brand {

                grid-column:
                    1 / -1;

            }


            .satori-footer-bottom {

                width:
                    calc(100% - 28px);

                flex-direction:
                    column;

                align-items:
                    flex-start;

                gap: 8px;

            }

        }


        /* =================================================
           MOBILE PEQUEÑO
        ================================================= */

        @media (max-width: 400px) {

            .satori-footer-main {

                grid-template-columns:
                    1fr;

            }


            .satori-footer-brand {

                grid-column:
                    auto;

            }

        }

    `;


    document.head.appendChild(style);

});
