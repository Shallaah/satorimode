/* =========================================================
   SATORII · FOOTER GLOBAL
   Genera automáticamente el footer en todas las páginas.
========================================================= */

(function () {

    "use strict";


    function loadSatoriFooter() {

        const footerContainer =
            document.getElementById("satori-footer");


        if (!footerContainer) {
            return;
        }


        /* =====================================================
           EVITAR DUPLICAR FOOTER
        ====================================================== */

        if (
            footerContainer.querySelector(
                ".satori-global-footer"
            )
        ) {
            return;
        }


        /* =====================================================
           HTML
        ====================================================== */

        footerContainer.innerHTML = `

            <footer class="satori-global-footer">


                <!-- =================================================
                     CONTENIDO PRINCIPAL
                ================================================== -->

                <div class="satori-footer-main">


                    <!-- =================================================
                         MARCA
                    ================================================== -->

                    <div class="satori-footer-brand">

                        <h3>
                            SATORII
                        </h3>


                        <span class="satori-footer-kanji">
                            悟り
                        </span>


                        <p>
                            Cultura japonesa y streetwear
                            llevados a prendas que puedes
                            llevar contigo.
                        </p>


                        <a
                            href="https://www.instagram.com/satorimode/"
                            class="satori-footer-instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram de SatoriMode"
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
                                />

                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                />

                                <circle
                                    cx="17.4"
                                    cy="6.6"
                                    r="1"
                                    class="instagram-dot"
                                />

                            </svg>

                        </a>

                    </div>


                    <!-- =================================================
                         COLECCIONES
                    ================================================== -->

                    <div class="satori-footer-column">

                        <h4>
                            COLECCIONES
                        </h4>


                        <a href="anime.html">
                            Anime
                        </a>


                        <a href="streetwear.html">
                            Streetwear
                        </a>


                        <a href="accesorios.html">
                            Accesorios
                        </a>


                        <a href="productos.html">
                            Todo
                        </a>

                    </div>


                    <!-- =================================================
                         AYUDA
                    ================================================== -->

                    <div class="satori-footer-column">

                        <h4>
                            AYUDA
                        </h4>


                        <a href="preguntas-frecuentes.html">
                            Preguntas frecuentes
                        </a>


                        <a href="envios.html">
                            Envíos
                        </a>


                        <a href="cambios.html">
                            Cambios y devoluciones
                        </a>


                        <a href="guia-tallas.html">
                            Guía de tallas
                        </a>

                    </div>


                    <!-- =================================================
                         COMMUNITY
                    ================================================== -->

                    <div class="satori-footer-community">

                        <span
                            class="satori-footer-community-label"
                        >
                            SATORII COMMUNITY
                        </span>


                        <h3>
                            ÚNETE AL
                            <span>CLAN.</span>
                        </h3>


                        <p>
                            Recibe lanzamientos exclusivos,
                            novedades y beneficios de Satori.
                        </p>


                        <form
                            class="satori-footer-newsletter"
                            id="satori-footer-newsletter"
                        >

                            <input
                                type="email"
                                name="email"
                                placeholder="Tu correo electrónico"
                                aria-label="Tu correo electrónico"
                                autocomplete="email"
                                required
                            >


                            <button
                                type="submit"
                                aria-label="Suscribirse"
                            >
                                →
                            </button>

                        </form>

                    </div>

                </div>


                <!-- =================================================
                     PARTE INFERIOR
                ================================================== -->

                <div class="satori-footer-bottom">


                    <span>
                        © 2026 SatoriMode
                    </span>


                    <div>

                        <a href="privacidad.html">
                            Privacidad
                        </a>


                        <a href="terminos.html">
                            Términos
                        </a>


                        <a href="contacto.html">
                            Contacto
                        </a>

                    </div>

                </div>


            </footer>

        `;


        /* =====================================================
           NEWSLETTER
        ====================================================== */

        const newsletter =
            document.getElementById(
                "satori-footer-newsletter"
            );


        if (newsletter) {

            newsletter.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const input =
                        newsletter.querySelector(
                            "input"
                        );


                    if (!input) {
                        return;
                    }


                    const email =
                        input.value.trim();


                    if (!email) {

                        input.focus();

                        return;

                    }


                    /*
                     * Por ahora solamente mostramos
                     * confirmación.
                     *
                     * Más adelante podemos conectarlo
                     * a un sistema real de newsletter.
                     */

                    alert(
                        "¡Gracias por unirte al Clan Satori!"
                    );


                    input.value = "";

                }
            );

        }

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            loadSatoriFooter
        );

    } else {

        loadSatoriFooter();

    }

})();
