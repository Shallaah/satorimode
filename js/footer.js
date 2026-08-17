/*
=========================================================
 SATORII — FOOTER
=========================================================

 Footer global de SATORII.

 Incluye:
 - Marca
 - Colecciones
 - Ayuda
 - SATORII Community
 - Formulario de correo
 - Redes sociales
 - Links legales
 - Responsive

 Se inserta automáticamente en:

    <div id="satori-footer"></div>

=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    const footerContainer =
        document.getElementById("satori-footer") ||
        document.getElementById("footer");

    if (!footerContainer) {
        return;
    }


    /* =====================================================
       RUTA BASE DEL PROYECTO

       footer.js está dentro de:

           /js/footer.js

       Por lo tanto, ../ es la raíz del proyecto.

       Esto permite que el footer funcione también desde:

           /index.html
           /productos.html
           /productos/anime/goku.html
           /productos/streetwear/xxx.html

    ===================================================== */

    const scriptElement =
        document.currentScript ||
        document.querySelector(
            'script[src*="footer.js"]'
        );


    let BASE = "../";


    if (scriptElement) {

        try {

            const scriptURL =
                new URL(
                    scriptElement.src,
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


            <!-- =========================================
                 CONTENIDO PRINCIPAL
            ========================================== -->

            <div class="satori-footer-main">


                <!-- =====================================
                     MARCA
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

                        Cultura japonesa y streetwear
                        llevados a prendas que puedes
                        llevar contigo.

                    </p>


                    <div class="satori-footer-socials">


                        <a
                            href="#"
                            aria-label="Instagram"
                            class="satori-social"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >

                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="5"
                                    ry="5"
                                ></rect>

                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                ></circle>

                                <circle
                                    cx="17.5"
                                    cy="6.5"
                                    r="1"
                                    class="satori-instagram-dot"
                                ></circle>

                            </svg>

                        </a>


                        <a
                            href="#"
                            aria-label="TikTok"
                            class="satori-social satori-social-text"
                        >
                            ♪
                        </a>


                    </div>


                </div>


                <!-- =====================================
                     COLECCIONES
                ====================================== -->

                <div class="satori-footer-column">


                    <h3>
                        COLECCIONES
                    </h3>


                    <a
                        href="${BASE}anime.html"
                    >
                        Anime
                    </a>


                    <a
                        href="${BASE}streetwear.html"
                    >
                        Streetwear
                    </a>


                    <a
                        href="${BASE}accesorios.html"
                    >
                        Accesorios
                    </a>


                    <a
                        href="${BASE}productos.html"
                    >
                        Todo
                    </a>


                </div>


                <!-- =====================================
                     AYUDA
                ====================================== -->

                <div class="satori-footer-column">


                    <h3>
                        AYUDA
                    </h3>


                    <a
                        href="${BASE}ayuda.html"
                    >
                        Preguntas frecuentes
                    </a>


                    <a
                        href="${BASE}envios.html"
                    >
                        Envíos
                    </a>


                    <a
                        href="${BASE}cambios.html"
                    >
                        Cambios y devoluciones
                    </a>


                    <a
                        href="${BASE}guia-tallas.html"
                    >
                        Guía de tallas
                    </a>


                </div>


                <!-- =====================================
                     SATORII COMMUNITY
                ====================================== -->

                <div class="satori-footer-community">


                    <span class="satori-community-label">

                        SATORII COMMUNITY

                    </span>


                    <h2>

                        ÚNETE AL
                        <span>CLAN.</span>

                    </h2>


                    <p>

                        Recibe lanzamientos exclusivos,
                        novedades y beneficios de SATORII.

                    </p>


                    <form
                        class="satori-newsletter"
                        id="satoriNewsletter"
                    >


                        <input
                            type="email"
                            name="email"
                            placeholder="Tu correo electrónico"
                            autocomplete="email"
                            required
                        >


                        <button
                            type="submit"
                            aria-label="Unirse al clan"
                        >

                            <span>
                                →
                            </span>

                        </button>


                    </form>


                    <small
                        class="satori-newsletter-message"
                        id="satoriNewsletterMessage"
                    ></small>


                </div>


            </div>


            <!-- =========================================
                 BARRA INFERIOR
            ========================================== -->

            <div class="satori-footer-bottom">


                <span>

                    © ${new Date().getFullYear()}
                    SatoriMode

                </span>


                <div class="satori-footer-legal">


                    <a
                        href="${BASE}privacidad.html"
                    >
                        Privacidad
                    </a>


                    <a
                        href="${BASE}terminos.html"
                    >
                        Términos
                    </a>


                    <a
                        href="${BASE}contacto.html"
                    >
                        Contacto
                    </a>


                </div>


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
           FOOTER SATORII
        ================================================= */

        .satori-footer {

            width: 100%;

            background: #111111;

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
                58px 0 48px;

            display: grid;

            grid-template-columns:
                1.35fr
                .8fr
                .8fr
                1.5fr;

            gap: 55px;

            align-items: start;

        }


        /* =================================================
           MARCA
        ================================================= */

        .satori-footer-brand {

            min-width: 0;

        }


        .satori-footer-logo {

            display: inline-block;

            color: #ffffff;

            font-size: 27px;

            font-weight: 900;

            letter-spacing: -.07em;

            line-height: 1;

            text-decoration: none;

        }


        .satori-footer-kanji {

            margin-top: 10px;

            color: #ff003c;

            font-size: 14px;

            font-weight: 700;

        }


        .satori-footer-brand p {

            max-width: 290px;

            margin:
                18px 0 0;

            color: #a7a7a7;

            font-size: 12px;

            line-height: 1.7;

        }


        /* =================================================
           REDES SOCIALES
        ================================================= */

        .satori-footer-socials {

            display: flex;

            gap: 9px;

            margin-top: 20px;

        }


        .satori-social {

            width: 38px;

            height: 38px;

            display: flex;

            align-items: center;

            justify-content: center;

            border:
                1px solid #3a3a3a;

            border-radius: 50%;

            color: #ffffff;

            text-decoration: none;

            transition:
                .2s ease;

        }


        .satori-social:hover {

            border-color: #ff003c;

            color: #ff003c;

            transform:
                translateY(-2px);

        }


        .satori-social svg {

            width: 17px;

            height: 17px;

            fill: none;

            stroke: currentColor;

            stroke-width: 1.7;

        }


        .satori-social svg circle {

            fill: none;

        }


        .satori-social svg
        .satori-instagram-dot {

            fill: currentColor;

            stroke: none;

        }


        .satori-social-text {

            font-size: 17px;

            font-weight: 800;

        }


        /* =================================================
           COLUMNAS
        ================================================= */

        .satori-footer-column {

            display: flex;

            flex-direction: column;

            gap: 11px;

        }


        .satori-footer-column h3 {

            margin:
                0 0 12px;

            color: #ffffff;

            font-size: 11px;

            font-weight: 850;

            letter-spacing: .13em;

        }


        .satori-footer-column a {

            width: fit-content;

            color: #a7a7a7;

            font-size: 12px;

            text-decoration: none;

            transition:
                color .2s ease;

        }


        .satori-footer-column a:hover {

            color: #ffffff;

        }


        /* =================================================
           COMMUNITY
        ================================================= */

        .satori-footer-community {

            min-width: 0;

        }


        .satori-community-label {

            display: block;

            color: #ff003c;

            font-size: 10px;

            font-weight: 900;

            letter-spacing: .28em;

        }


        .satori-footer-community h2 {

            margin:
                8px 0 7px;

            color: #ffffff;

            font-size: 29px;

            line-height: 1;

            font-weight: 900;

            letter-spacing: -.035em;

        }


        .satori-footer-community h2 span {

            color: #ff003c;

        }


        .satori-footer-community p {

            max-width: 440px;

            margin:
                0 0 18px;

            color: #a7a7a7;

            font-size: 12px;

            line-height: 1.55;

        }


        /* =================================================
           NEWSLETTER
        ================================================= */

        .satori-newsletter {

            width: 100%;

            max-width: 440px;

            height: 46px;

            display: flex;

            overflow: hidden;

            border:
                1px solid #dedede;

            background: #ffffff;

        }


        .satori-newsletter input {

            flex: 1;

            min-width: 0;

            height: 100%;

            padding:
                0 15px;

            border: 0;

            outline: none;

            background: #ffffff;

            color: #111111;

            font-family: inherit;

            font-size: 12px;

        }


        .satori-newsletter input::placeholder {

            color: #8b8b8b;

        }


        .satori-newsletter button {

            width: 54px;

            height: 100%;

            border: 0;

            background: #ff003c;

            color: #ffffff;

            cursor: pointer;

            font-size: 22px;

            transition:
                background .2s ease;

        }


        .satori-newsletter button:hover {

            background: #e60036;

        }


        .satori-newsletter button span {

            display: block;

            transition:
                transform .2s ease;

        }


        .satori-newsletter button:hover span {

            transform:
                translateX(3px);

        }


        .satori-newsletter-message {

            display: block;

            min-height: 15px;

            margin-top: 8px;

            color: #ff003c;

            font-size: 10px;

        }


        /* =================================================
           BOTTOM
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
                1px solid #292929;

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            color: #777777;

            font-size: 10px;

        }


        .satori-footer-legal {

            display: flex;

            align-items: center;

            gap: 22px;

        }


        .satori-footer-legal a {

            color: #777777;

            text-decoration: none;

            transition:
                color .2s ease;

        }


        .satori-footer-legal a:hover {

            color: #ffffff;

        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 1000px) {

            .satori-footer-main {

                grid-template-columns:
                    1.2fr 1fr 1fr;

                gap: 35px;

            }


            .satori-footer-community {

                grid-column:
                    1 / -1;

                padding-top: 15px;

                border-top:
                    1px solid #292929;

            }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 650px) {

            .satori-footer-main {

                width:
                    calc(100% - 28px);

                padding:
                    42px 0 35px;

                grid-template-columns:
                    1fr 1fr;

                gap:
                    35px 25px;

            }


            .satori-footer-brand {

                grid-column:
                    1 / -1;

            }


            .satori-footer-community {

                grid-column:
                    1 / -1;

            }


            .satori-footer-community h2 {

                font-size: 27px;

            }


            .satori-newsletter {

                max-width:
                    100%;

            }


            .satori-footer-bottom {

                width:
                    calc(100% - 28px);

                flex-direction: column;

                align-items: flex-start;

                gap: 13px;

            }


            .satori-footer-legal {

                flex-wrap: wrap;

                gap:
                    12px 20px;

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


            .satori-footer-column {

                grid-column:
                    auto;

            }

        }

    `;


    document.head.appendChild(style);


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletter =
        document.getElementById(
            "satoriNewsletter"
        );


    const newsletterMessage =
        document.getElementById(
            "satoriNewsletterMessage"
        );


    if (newsletter) {

        newsletter.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const input =
                    newsletter.querySelector(
                        "input[type='email']"
                    );


                const email =
                    input.value.trim();


                if (!email) {
                    return;
                }


                /*
                 * Por ahora solamente guardamos
                 * el correo localmente.
                 *
                 * Cuando tengamos el sistema real
                 * de newsletter, reemplazamos esta
                 * parte por la API correspondiente.
                 */

                localStorage.setItem(
                    "satorii-community-email",
                    email
                );


                newsletterMessage.textContent =
                    "¡Bienvenido al clan!";


                input.value = "";


                setTimeout(
                    function () {

                        newsletterMessage.textContent =
                            "";

                    },
                    4000
                );

            }
        );

    }

});
