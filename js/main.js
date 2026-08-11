/* =========================================================
   SATORIMODE
   MAIN.JS
   HEADER + MENÚS RESPONSIVE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       DROPDOWNS DESKTOP
       SOLO SE ABREN AL HACER CLICK
    ===================================================== */

    const dropdowns = document.querySelectorAll(".nav-dropdown");


    function closeAllDropdowns() {

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("is-open");


            const button =
                dropdown.querySelector(".nav-dropdown-btn");


            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    dropdowns.forEach(function (dropdown) {

        const button =
            dropdown.querySelector(".nav-dropdown-btn");


        if (!button) return;


        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();


            const wasOpen =
                dropdown.classList.contains("is-open");


            /* ---------------------------------------------
               CERRAR TODOS
            --------------------------------------------- */

            closeAllDropdowns();


            /* ---------------------------------------------
               ABRIR SOLO EL SELECCIONADO
            --------------------------------------------- */

            if (!wasOpen) {

                dropdown.classList.add("is-open");


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

    document.addEventListener("click", function (event) {

        if (
            !event.target.closest(".nav-dropdown")
        ) {

            closeAllDropdowns();

        }

    });



    /* =====================================================
       EVITAR QUE LOS LINKS DEL DROPDOWN CAMBIEN
       EL ESTADO DEL MENÚ ANTES DE NAVEGAR
    ===================================================== */

    document
        .querySelectorAll(".dropdown-menu a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                closeAllDropdowns();

            });

        });



    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const mobileButton =
        document.querySelector(".mobile-menu-button");


    const mobileMenu =
        document.querySelector(".mobile-menu");


    const mobileClose =
        document.querySelector(".mobile-menu-close");


    const mobileOverlay =
        document.querySelector(".mobile-menu-overlay");



    /* =====================================================
       ABRIR MENÚ MÓVIL
    ===================================================== */

    function openMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.add("is-open");


        if (mobileOverlay) {

            mobileOverlay.classList.add("is-open");

        }


        if (mobileButton) {

            mobileButton.classList.add("is-open");


            mobileButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";

    }



    /* =====================================================
       CERRAR MENÚ MÓVIL
    ===================================================== */

    function closeMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.remove("is-open");


        if (mobileOverlay) {

            mobileOverlay.classList.remove("is-open");

        }


        if (mobileButton) {

            mobileButton.classList.remove("is-open");


            mobileButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow = "";

    }



    /* =====================================================
       BOTÓN HAMBURGUESA
    ===================================================== */

    if (mobileButton) {

        mobileButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    mobileMenu &&
                    mobileMenu.classList.contains("is-open");


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }



    /* =====================================================
       BOTÓN CERRAR
    ===================================================== */

    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }



    /* =====================================================
       FONDO OSCURO
    ===================================================== */

    if (mobileOverlay) {

        mobileOverlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }



    /* =====================================================
       SUBMENÚS MÓVILES
       SOLO SE ABREN AL HACER CLICK
    ===================================================== */

    const mobileButtons =
        document.querySelectorAll(
            ".mobile-nav-button"
        );


    mobileButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


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


                /* -----------------------------------------
                   CERRAR TODOS
                ----------------------------------------- */

                document
                    .querySelectorAll(
                        ".mobile-submenu"
                    )
                    .forEach(function (menu) {

                        menu.classList.remove(
                            "is-open"
                        );

                    });


                document
                    .querySelectorAll(
                        ".mobile-nav-button"
                    )
                    .forEach(function (otherButton) {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        otherButton.classList.remove(
                            "is-open"
                        );

                    });



                /* -----------------------------------------
                   ABRIR EL SELECCIONADO
                ----------------------------------------- */

                if (!wasOpen) {

                    submenu.classList.add(
                        "is-open"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );


                    button.classList.add(
                        "is-open"
                    );

                }

            }
        );

    });



    /* =====================================================
       CERRAR MENÚ MÓVIL AL ELEGIR UNA OPCIÓN
    ===================================================== */

    document
        .querySelectorAll(".mobile-menu a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        });



    /* =====================================================
       ESC = CERRAR TODO
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeAllDropdowns();


            closeMobileMenu();

        }
    );

});

/* =====================================================
   BUSCADOR
===================================================== */

const searchButton =
    document.querySelector(
        ".search-button"
    );


const searchOverlay =
    document.querySelector(
        ".search-overlay"
    );


const searchClose =
    document.querySelector(
        ".search-close"
    );


const searchInput =
    document.querySelector(
        "#product-search"
    );


const searchResults =
    document.querySelector(
        "#search-results"
    );


/* PRODUCTOS BASE */

const searchProducts = [

    {
        name: "Polera Anime",
        category: "ANIME",
        price: "$24.990",
        image: "images/polera-anime.jpg",
        url: "anime.html"
    },

    {
        name: "Polera Streetwear",
        category: "STREETWEAR",
        price: "$24.990",
        image: "images/polera-streetwear.jpg",
        url: "streetwear.html"
    },

    {
        name: "Polera Satorii",
        category: "EXCLUSIVOS",
        price: "$26.990",
        image: "images/polera-satorii.jpg",
        url: "exclusivos.html"
    }

];


/* ABRIR */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        function () {

            searchOverlay.classList.add(
                "is-open"
            );


            searchOverlay.setAttribute(
                "aria-hidden",
                "false"
            );


            searchButton.setAttribute(
                "aria-expanded",
                "true"
            );


            setTimeout(function () {

                if (searchInput) {

                    searchInput.focus();

                }

            }, 150);

        }
    );

}


/* CERRAR */

function closeSearch() {

    if (!searchOverlay) return;


    searchOverlay.classList.remove(
        "is-open"
    );


    searchOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    if (searchButton) {

        searchButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


if (searchClose) {

    searchClose.addEventListener(
        "click",
        closeSearch
    );

}


if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                searchOverlay
            ) {

                closeSearch();

            }

        }
    );

}


/* =====================================================
   RESULTADOS
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                searchResults.innerHTML = `
                    <p class="search-empty">
                        Busca tu próxima polera Satorii.
                    </p>
                `;

                return;

            }


            const results =
                searchProducts.filter(
                    function (product) {

                        return (
                            product.name
                                .toLowerCase()
                                .includes(query)
                            ||
                            product.category
                                .toLowerCase()
                                .includes(query)
                        );

                    }
                );


            if (!results.length) {

                searchResults.innerHTML = `
                    <p class="search-empty">
                        No encontramos productos para
                        "${query}".
                    </p>
                `;

                return;

            }


            searchResults.innerHTML =
                results.map(
                    function (product) {

                        return `

                            <a
                                href="${product.url}"
                                class="search-result-item"
                            >

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                    class="search-result-image"
                                >

                                <div
                                    class="search-result-info"
                                >

                                    <span
                                        class="search-result-category"
                                    >
                                        ${product.category}
                                    </span>

                                    <span
                                        class="search-result-name"
                                    >
                                        ${product.name}
                                    </span>

                                    <span
                                        class="search-result-price"
                                    >
                                        ${product.price}
                                    </span>

                                </div>

                            </a>

                        `;

                    }
                ).join("");

        }
    );

}
