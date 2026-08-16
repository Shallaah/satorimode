/* =========================================================
   SATORII · FOOTER GLOBAL
   Este archivo genera automáticamente el footer
   en todas las páginas de SatoriMode.
========================================================= */

(function () {

    function loadSatoriFooter() {

        const footerContainer =
            document.getElementById("satori-footer");

        if (!footerContainer) return;

        footerContainer.innerHTML = `

            <footer class="satori-global-footer">

                <div class="satori-footer-main">

                    <!-- =========================
                         MARCA
                    ========================== -->

                    <div class="satori-footer-brand">

                        <h3>SATORII</h3>

                        <span class="satori-footer-kanji">
                            悟り
                        </span>

                        <p>
                            Cultura japonesa y streetwear
                            llevados a prendas que puedes
                            llevar contigo.
                        </p>

                        <a
                            href="#"
                            class="satori-footer-instagram"
                            aria-label="Instagram Satori"
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
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                />

                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                />

                                <circle
                                    cx="17.4"
                                    cy="6.6"
                                    r="1"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>

                    </div>


                    <!-- =========================
                         COLECCIONES
                    ========================== -->

                    <div class="satori-footer-column">

                        <h4>COLECCIONES</h4>

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


                    <!-- =========================
                         AYUDA
                    ========================== -->

                    <div class="satori-footer-column">

                        <h4>AYUDA</h4>

                        <a href="#">
                            Preguntas frecuentes
                        </a>

                        <a href="#">
                            Envíos
                        </a>

                        <a href="#">
                            Cambios y devoluciones
                        </a>

                        <a href="#">
                            Guía de tallas
                        </a>

                    </div>


                    <!-- =========================
                         COMMUNITY
                    ========================== -->

                    <div class="satori-footer-community">

                        <span class="satori-footer-community-label">
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
                                placeholder="Tu correo electrónico"
                                aria-label="Tu correo electrónico"
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


                <!-- =========================
                     PARTE INFERIOR
                ========================== -->

                <div class="satori-footer-bottom">

                    <span>
                        © 2026 SatoriMode
                    </span>

                    <div>

                        <a href="#">
                            Privacidad
                        </a>

                        <a href="#">
                            Términos
                        </a>

                        <a href="#">
                            Contacto
                        </a>

                    </div>

                </div>

            </footer>

        `;


        /* =========================================
           NEWSLETTER
        ========================================== */

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

                    if (!input.value.trim()) {
                        return;
                    }

                    alert(
                        "¡Gracias por unirte al Clan Satori!"
                    );

                    input.value = "";

                }
            );

        }

    }


    /* =============================================
       CARGAR FOOTER
    ============================================== */

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
