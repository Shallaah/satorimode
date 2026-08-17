function generateProductJS(
    product,
    price
) {

    return `

        <script>

        document.addEventListener(
            "DOMContentLoaded",
            function () {


                /* =========================================
                   GALERÍA
                ========================================== */

                const mainImage =
                    document.getElementById(
                        "satoriMainImage"
                    );


                document
                    .querySelectorAll(
                        ".satori-thumbnail"
                    )
                    .forEach(
                        function (thumbnail) {

                            thumbnail.addEventListener(
                                "click",
                                function () {

                                    if (
                                        mainImage &&
                                        this.dataset.image
                                    ) {

                                        mainImage.src =
                                            this.dataset.image;

                                    }


                                    document
                                        .querySelectorAll(
                                            ".satori-thumbnail"
                                        )
                                        .forEach(
                                            function (item) {

                                                item.classList.remove(
                                                    "active"
                                                );

                                            }
                                        );


                                    this.classList.add(
                                        "active"
                                    );

                                }
                            );

                        }
                    );


                /* =========================================
                   CANTIDAD

                   carrito.js utiliza #quantity
                ========================================== */

                let quantity = 1;


                const quantityDisplay =
                    document.getElementById(
                        "satoriQuantity"
                    );


                const quantityInput =
                    document.getElementById(
                        "quantity"
                    );


                const minus =
                    document.getElementById(
                        "satoriQuantityMinus"
                    );


                const plus =
                    document.getElementById(
                        "satoriQuantityPlus"
                    );


                function updateQuantity() {

                    if (quantityDisplay) {

                        quantityDisplay.textContent =
                            quantity;

                    }


                    if (quantityInput) {

                        quantityInput.value =
                            quantity;

                    }

                }


                if (minus) {

                    minus.addEventListener(
                        "click",
                        function () {

                            quantity =
                                Math.max(
                                    1,
                                    quantity - 1
                                );

                            updateQuantity();

                        }
                    );

                }


                if (plus) {

                    plus.addEventListener(
                        "click",
                        function () {

                            quantity += 1;

                            updateQuantity();

                        }
                    );

                }


                updateQuantity();


                /* =========================================
                   FEEDBACK DEL BOTÓN

                   carrito.js se encarga de agregar
                   realmente el producto.

                   Aquí solamente mostramos el estado
                   visual de "agregado".
                ========================================== */

                const addButton =
                    document.getElementById(
                        "satoriAddToCart"
                    );


                if (addButton) {

                    addButton.addEventListener(
                        "click",
                        function () {

                            addButton.classList.add(
                                "is-added"
                            );


                            addButton.innerHTML =
                                "✓ AGREGADO AL CARRITO";


                            setTimeout(
                                function () {

                                    addButton.classList.remove(
                                        "is-added"
                                    );


                                    addButton.innerHTML =
                                        "AGREGAR AL CARRITO · ${escapeHTML(
                                            price
                                        )}";

                                },
                                2200
                            );

                        }
                    );

                }


                /* =========================================
                   PESTAÑAS
                ========================================== */

                const tabs =
                    document.querySelectorAll(
                        ".satori-tab"
                    );


                const panels =
                    document.querySelectorAll(
                        ".satori-panel"
                    );


                tabs.forEach(
                    function (tab) {

                        tab.addEventListener(
                            "click",
                            function () {

                                const target =
                                    this.dataset.tab;


                                tabs.forEach(
                                    function (item) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                panels.forEach(
                                    function (panel) {

                                        panel.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                this.classList.add(
                                    "active"
                                );


                                const panel =
                                    document.querySelector(
                                        `[data-panel="${target}"]`
                                    );


                                if (panel) {

                                    panel.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );


            }
        );

        </script>

    `;

}
