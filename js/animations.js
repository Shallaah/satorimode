/* =========================================================
   SATORII · ANIMACIONES GLOBALES
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ENTRADA DE LA PÁGINA
    ====================================================== */

    function initializePageAnimation() {

        /*
         * Marca que la página ya está lista.
         *
         * IMPORTANTE:
         * No bloqueamos scroll.
         * No modificamos overflow.
         * No modificamos pointer-events.
         */

        document.body.classList.add(
            "satori-page-ready"
        );


        const page =
            document.querySelector(
                ".satori-page-animate"
            );


        if (page) {

            requestAnimationFrame(function () {

                requestAnimationFrame(function () {

                    page.classList.add(
                        "satori-page-loaded"
                    );

                });

            });

        }

    }


    /* =====================================================
       ENTRADA DE ELEMENTOS
    ====================================================== */

    function initializeAnimatedElements() {

        /*
         * CONTENIDO
         */

        const contentElements =
            document.querySelectorAll(
                ".satori-content-animate"
            );


        contentElements.forEach(
            function (element, index) {

                element.style.animationDelay =
                    (index * 0.07) + "s";

                element.classList.add(
                    "satori-content-loaded"
                );

            }
        );


        /*
         * TARJETAS
         */

        const cards =
            document.querySelectorAll(
                ".satori-card-animate"
            );


        cards.forEach(
            function (card, index) {

                card.style.animationDelay =
                    (index * 0.08) + "s";

                card.classList.add(
                    "satori-card-loaded"
                );

            }
        );


        /*
         * FADE
         */

        const fades =
            document.querySelectorAll(
                ".satori-fade-animate"
            );


        fades.forEach(
            function (element, index) {

                element.style.animationDelay =
                    (index * 0.06) + "s";

                element.classList.add(
                    "satori-fade-loaded"
                );

            }
        );

    }


    /* =====================================================
       TRANSICIONES ENTRE PÁGINAS
    ====================================================== */

    /*
     * DESACTIVADAS TEMPORALMENTE.
     *
     * No interceptamos los enlaces.
     * Esto permite que:
     *
     * - header.js controle sus botones
     * - carrito.js controle el carrito
     * - los enlaces funcionen normalmente
     * - no haya preventDefault() global
     * - no haya retrasos antes de navegar
     */

    function initializePageTransitions() {

        return;

    }


    /* =====================================================
       LIMPIEZA DE ESTADOS
    ====================================================== */

    function cleanupAnimationStates() {

        /*
         * Nos aseguramos de que animations.js nunca
         * deje bloqueado el scroll.
         */

        document.documentElement.classList.remove(
            "satori-page-exit"
        );

        document.body.classList.remove(
            "satori-page-exit"
        );

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    function initializeSatoriAnimations() {

        cleanupAnimationStates();

        initializePageAnimation();

        initializeAnimatedElements();

        initializePageTransitions();

    }


    /* =====================================================
       DOM READY
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeSatoriAnimations
        );

    } else {

        initializeSatoriAnimations();

    }


})();
