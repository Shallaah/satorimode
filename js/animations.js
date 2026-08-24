/* =========================================================
   SATORII · ANIMACIONES GLOBALES
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ENTRADA DE LA PÁGINA
    ====================================================== */

    function initializePageAnimation() {

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
       ANIMACIONES DE ELEMENTOS
    ====================================================== */

    function initializeAnimatedElements(
        root = document
    ) {

        /* -------------------------------------------------
           CONTENIDO
        -------------------------------------------------- */

        const contentElements =
            root.querySelectorAll(
                ".satori-content-animate:not(.satori-content-loaded)"
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


        /* -------------------------------------------------
           TARJETAS
        -------------------------------------------------- */

        const cards =
            root.querySelectorAll(
                ".satori-card-animate:not(.satori-card-loaded)"
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


        /* -------------------------------------------------
           FADE
        -------------------------------------------------- */

        const fades =
            root.querySelectorAll(
                ".satori-fade-animate:not(.satori-fade-loaded)"
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
       CONTENIDO DINÁMICO

       IMPORTANTE

       anime.html
       yokai.html
       productos.html

       generan las tarjetas DESPUÉS de cargar
       animations.js.

       Por eso necesitamos observar el DOM.
    ====================================================== */

    function initializeAnimationObserver() {

        if (
            typeof MutationObserver ===
            "undefined"
        ) {

            return;

        }


        const observer =
            new MutationObserver(
                function (mutations) {

                    mutations.forEach(
                        function (mutation) {

                            mutation.addedNodes.forEach(
                                function (node) {

                                    if (
                                        node.nodeType !==
                                        Node.ELEMENT_NODE
                                    ) {

                                        return;

                                    }


                                    /*
                                     * Si el elemento agregado
                                     * ES directamente una tarjeta
                                     */

                                    if (
                                        node.matches &&
                                        node.matches(
                                            ".satori-card-animate, .satori-content-animate, .satori-fade-animate"
                                        )
                                    ) {

                                        initializeAnimatedElements(
                                            node.parentElement ||
                                            document
                                        );

                                        return;

                                    }


                                    /*
                                     * Si el elemento agregado
                                     * contiene tarjetas dentro
                                     */

                                    if (
                                        node.querySelector &&
                                        node.querySelector(
                                            ".satori-card-animate, .satori-content-animate, .satori-fade-animate"
                                        )
                                    ) {

                                        initializeAnimatedElements(
                                            node
                                        );

                                    }

                                }
                            );

                        }
                    );

                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    }


    /* =====================================================
       TRANSICIONES ENTRE PÁGINAS
    ====================================================== */

    function initializePageTransitions() {

        /*
         * DESACTIVADAS.

         * Los enlaces deben funcionar normalmente.
         */

        return;

    }


    /* =====================================================
       LIMPIEZA
    ====================================================== */

    function cleanupAnimationStates() {

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

        initializeAnimationObserver();

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
            initializeSatoriAnimations,
            {
                once: true
            }
        );

    }
    else {

        initializeSatoriAnimations();

    }


})();
