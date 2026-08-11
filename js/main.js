/* =========================================================
   SATORIMODE
   MAIN.JS
   HEADER + MENÚS RESPONSIVE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       DROPDOWNS DESKTOP
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(".nav-dropdown");


    dropdowns.forEach(function (dropdown) {

        const button =
            dropdown.querySelector(".nav-dropdown-btn");

        if (!button) return;


        button.addEventListener("click", function (event) {

            event.stopPropagation();


            /* ---------------------------------------------
               Comprobar si ya estaba abierto
            --------------------------------------------- */

            const wasOpen =
                dropdown.classList.contains("is-open");


            /* ---------------------------------------------
               Cerrar todos los dropdowns
            --------------------------------------------- */

            dropdowns.forEach(function (otherDropdown) {

                otherDropdown.classList.remove(
                    "is-open"
                );


                const otherButton =
                    otherDropdown.querySelector(
                        ".nav-dropdown-btn"
                    );


                if (otherButton) {

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            /* ---------------------------------------------
               Abrir el seleccionado
            --------------------------------------------- */

            if (!wasOpen) {

                dropdown.classList.add(
                    "is-open"
                );


                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });



    /* =====================================================
       CERRAR DROPDOWN AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(
                    ".nav-dropdown"
                )
            ) {

                dropdowns.forEach(
                    function (dropdown) {

                        dropdown.classList.remove(
                            "is-open"
                        );


                        const button =
                            dropdown.querySelector(
                                ".nav-dropdown-btn"
                            );


                        if (button) {

                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );

            }

        }
    );



    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const mobileButton =
        document.querySelector(
            ".mobile-menu-button"
        );


    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );


    const mobileClose =
        document.querySelector(
            ".mobile-menu-close"
        );


    const mobileOverlay =
        document.querySelector(
            ".mobile-menu-overlay"
        );



    /* =====================================================
       ABRIR MENÚ MÓVIL
    ===================================================== */

    function openMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.add(
            "is-open"
        );


        if (mobileOverlay) {

            mobileOverlay.classList.add(
                "is-open"
            );

        }


        if (mobileButton) {

            mobileButton.classList.add(
                "is-open"
            );


            mobileButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }



    /* =====================================================
       CERRAR MENÚ MÓVIL
    ===================================================== */

    function closeMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.remove(
            "is-open"
        );


        if (mobileOverlay) {

            mobileOverlay.classList.remove(
                "is-open"
            );

        }


        if (mobileButton) {

            mobileButton.classList.remove(
                "is-open"
            );


            mobileButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }



    /* =====================================================
       EVENTOS DEL MENÚ MÓVIL
    ===================================================== */

    if (mobileButton) {

        mobileButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openMobileMenu();

            }
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    if (mobileOverlay) {

        mobileOverlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }



    /* =====================================================
       SUBMENÚS MÓVILES
    ===================================================== */

    const mobileButtons =
        document.querySelectorAll(
            ".mobile-nav-button"
        );


    mobileButtons.forEach(
        function (button, index) {

            button.addEventListener(
                "click",
                function () {


                    /* -------------------------------------
                       Obtener el submenu correspondiente

                       Cada botón está seguido por su
                       propio .mobile-submenu
                    ------------------------------------- */

                    const submenu =
                        button.nextElementSibling;


                    if (
                        !submenu ||
                        !submenu.classList.contains(
                            "mobile-submenu"
                        )
                    ) {
                        return;
                    }


                    const wasOpen =
                        submenu.classList.contains(
                            "is-open"
                        );


                    /* -------------------------------------
                       Cerrar todos los submenús
                    ------------------------------------- */

                    document
                        .querySelectorAll(
                            ".mobile-submenu"
                        )
                        .forEach(
                            function (menu) {

                                menu.classList.remove(
                                    "is-open"
                                );

                            }
                        );


                    document
                        .querySelectorAll(
                            ".mobile-nav-button"
                        )
                        .forEach(
                            function (otherButton) {

                                otherButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }
                        );


                    /* -------------------------------------
                       Abrir el seleccionado
                    ------------------------------------- */

                    if (!wasOpen) {

                        submenu.classList.add(
                            "is-open"
                        );


                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       CERRAR MENÚ MÓVIL AL ELEGIR UNA OPCIÓN
    ===================================================== */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu a"
        );


    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }
    );



    /* =====================================================
       ESC = CERRAR MENÚS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            /* Cerrar dropdowns */

            dropdowns.forEach(
                function (dropdown) {

                    dropdown.classList.remove(
                        "is-open"
                    );

                }
            );


            /* Cerrar menú móvil */

            closeMobileMenu();

        }
    );


});
