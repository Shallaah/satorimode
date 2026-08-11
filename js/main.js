/* =========================================================
   SATORIMODE
   MAIN.JS
   HEADER + MENÚS RESPONSIVE + BUSCADOR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       DROPDOWNS DESKTOP
       SOLO SE ABREN AL HACER CLICK
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(".nav-dropdown");


    function closeAllDropdowns() {

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("active");


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

        });

    }


    dropdowns.forEach(function (dropdown) {

        const button =
            dropdown.querySelector(
                ".nav-dropdown-btn"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                const wasOpen =
                    dropdown.classList.contains(
                        "active"
                    );


                /* -----------------------------------------
                   CERRAR TODOS
                ----------------------------------------- */

                closeAllDropdowns();


                /* -----------------------------------------
                   ABRIR EL SELECCIONADO
                ----------------------------------------- */

                if (!wasOpen) {

                    dropdown.classList.add(
                        "active"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

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

                closeAllDropdowns();

            }

        }
    );



    /* =====================================================
       LINKS DEL DROPDOWN
    ===================================================== */

    document
        .querySelectorAll(
            ".dropdown-menu a"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeAllDropdowns();

                    }
                );

            }
        );



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

    if (!mobileMenu) {
        console.warn("SatoriMode: .mobile-menu no encontrado");
        return;
    }

    /* Usamos ambos estados para evitar conflictos
       entre versiones anteriores del CSS */

    mobileMenu.classList.add("is-open");
    mobileMenu.classList.add("active");


    if (mobileOverlay) {

        mobileOverlay.classList.add("is-open");
        mobileOverlay.classList.add("active");

    }


    if (mobileButton) {

        mobileButton.classList.add("is-open");
        mobileButton.classList.add("active");

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
    mobileMenu.classList.remove("active");


    if (mobileOverlay) {

        mobileOverlay.classList.remove("is-open");
        mobileOverlay.classList.remove("active");

    }


    if (mobileButton) {

        mobileButton.classList.remove("is-open");
        mobileButton.classList.remove("active");

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

            event.preventDefault();
            event.stopPropagation();


            const menuIsOpen =
                mobileMenu &&
                (
                    mobileMenu.classList.contains("is-open") ||
                    mobileMenu.classList.contains("active")
                );


            if (menuIsOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );

}


/* =====================================================
   BOTÓN X
===================================================== */

if (mobileClose) {

    mobileClose.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeMobileMenu();

        }
    );

}


/* =====================================================
   OVERLAY
===================================================== */

if (mobileOverlay) {

    mobileOverlay.addEventListener(
        "click",
        function () {

            closeMobileMenu();

        }
    );

}


/* =====================================================
   SUBMENÚS MÓVILES
===================================================== */

const mobileButtons =
    document.querySelectorAll(
        ".mobile-nav-button"
    );


mobileButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


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
                submenu.classList.contains("is-open") ||
                submenu.classList.contains("active");


            /* CERRAR TODOS */

            document
                .querySelectorAll(
                    ".mobile-submenu"
                )
                .forEach(function (menu) {

                    menu.classList.remove(
                        "is-open"
                    );

                    menu.classList.remove(
                        "active"
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

                    otherButton.classList.remove(
                        "active"
                    );

                });


            /* ABRIR EL SELECCIONADO */

            if (!wasOpen) {

                submenu.classList.add(
                    "is-open"
                );

                submenu.classList.add(
                    "active"
                );


                button.setAttribute(
                    "aria-expanded",
                    "true"
                );


                button.classList.add(
                    "is-open"
                );

                button.classList.add(
                    "active"
                );

            }

        }
    );

});


/* =====================================================
   CERRAR AL ELEGIR UN LINK
===================================================== */

document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

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



    /* =====================================================
       PRODUCTOS PARA EL BUSCADOR
    ===================================================== */

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



    /* =====================================================
       MENSAJE DEL BUSCADOR
    ===================================================== */

    function renderSearchMessage(message) {

        if (!searchResults) return;


        searchResults.innerHTML = `
            <p class="search-empty">
                ${message}
            </p>
        `;

    }



    /* =====================================================
       ABRIR BUSCADOR
    ===================================================== */

    if (
        searchButton &&
        searchOverlay
    ) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                searchOverlay.classList.add(
                    "active"
                );


                searchOverlay.setAttribute(
                    "aria-hidden",
                    "false"
                );


                searchButton.setAttribute(
                    "aria-expanded",
                    "true"
                );


                if (searchInput) {

                    setTimeout(
                        function () {

                            searchInput.focus();

                        },
                        150
                    );

                }

            }
        );

    }



    /* =====================================================
       CERRAR BUSCADOR
    ===================================================== */

    function closeSearch() {

        if (!searchOverlay) return;


        searchOverlay.classList.remove(
            "active"
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


        if (searchInput) {

            searchInput.value = "";

        }


        renderSearchMessage(
            "Busca tu próxima polera Satorii."
        );

    }



    /* =====================================================
       BOTÓN CERRAR BUSCADOR
    ===================================================== */

    if (searchClose) {

        searchClose.addEventListener(
            "click",
            closeSearch
        );

    }



    /* =====================================================
       CERRAR BUSCADOR AL HACER CLICK
       FUERA DE LA VENTANA
    ===================================================== */

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
       RESULTADOS DEL BUSCADOR
    ===================================================== */

    if (
        searchInput &&
        searchResults
    ) {

        searchInput.addEventListener(
            "input",
            function () {

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                /* -----------------------------------------
                   SIN BÚSQUEDA
                ----------------------------------------- */

                if (!query) {

                    renderSearchMessage(
                        "Busca tu próxima polera Satorii."
                    );

                    return;

                }


                /* -----------------------------------------
                   FILTRAR PRODUCTOS
                ----------------------------------------- */

                const results =
                    searchProducts.filter(
                        function (product) {

                            return (

                                product.name
                                    .toLowerCase()
                                    .includes(
                                        query
                                    )

                                ||

                                product.category
                                    .toLowerCase()
                                    .includes(
                                        query
                                    )

                            );

                        }
                    );


                /* -----------------------------------------
                   SIN RESULTADOS
                ----------------------------------------- */

                if (!results.length) {

                    renderSearchMessage(
                        `No encontramos productos para "${query}".`
                    );

                    return;

                }


                /* -----------------------------------------
                   MOSTRAR RESULTADOS
                ----------------------------------------- */

                searchResults.innerHTML =
                    results
                        .map(
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
                        )
                        .join("");

            }
        );

    }



    /* =====================================================
       ESC = CERRAR TODO
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            closeAllDropdowns();

            closeMobileMenu();

            closeSearch();

        }
    );

});
