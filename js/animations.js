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


        const header =
            document.querySelector(
                "#satori-header"
            );


        if (header) {

            header.classList.add(
                "satori-header-animate"
            );


            requestAnimationFrame(function () {

                header.classList.add(
                    "satori-header-loaded"
                );

            });

        }

    }


    /* =====================================================
       ENTRADA DE ELEMENTOS
    ====================================================== */

    function initializeAnimatedElements() {

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
       TRANSICIÓN AL CAMBIAR DE PÁGINA
    ====================================================== */

    function initializePageTransitions() {

        document.addEventListener(
            "click",
            function (event) {

                const link =
                    event.target.closest("a");


                if (!link) {
                    return;
                }


                const href =
                    link.getAttribute("href");


                if (!href) {
                    return;
                }


                if (
                    href.startsWith("#") ||
                    href.startsWith("mailto:") ||
                    href.startsWith("tel:") ||
                    href.startsWith("javascript:")
                ) {
                    return;
                }


                if (
                    link.target === "_blank" ||
                    link.hasAttribute("download")
                ) {
                    return;
                }


                const url =
                    new URL(
                        href,
                        window.location.href
                    );


                if (
                    url.origin !==
                    window.location.origin
                ) {
                    return;
                }


                if (
                    url.pathname ===
                    window.location.pathname &&
                    url.search ===
                    window.location.search
                ) {
                    return;
                }


                event.preventDefault();


                document.body.classList.add(
                    "satori-page-exit"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            url.href;

                    },
                    230
                );

            }
        );

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initializePageAnimation();

            initializeAnimatedElements();

            initializePageTransitions();

        }
    );


})();
