document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       SATORII — HERO SLIDER
    ========================================================= */
    const slider = document.getElementById("hero-slider");
    const track = document.getElementById("hero-track");
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    /* ---------------------------------------------------------
       COMPROBACIÓN
    --------------------------------------------------------- */
    if (
        !slider ||
        !track ||
        !slides.length
    ) {
        return;
    }
    /* ---------------------------------------------------------
       CONFIGURACIÓN
    --------------------------------------------------------- */
    const AUTOPLAY_TIME = 6000;
    const SWIPE_THRESHOLD = 60;
    /* ---------------------------------------------------------
       ESTADO
    --------------------------------------------------------- */
    let currentSlide = 0;
    let autoSlide = null;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isPointerDown = false;
    let isHovering = false;
    /* ---------------------------------------------------------
       REDUCED MOTION
    --------------------------------------------------------- */
    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
    /* =========================================================
       CAMBIAR SLIDE
    ========================================================= */
    function goToSlide(index) {
        /* -----------------------------------------------------
           CONTROLAR LÍMITES
        ----------------------------------------------------- */
        if (index < 0) {
            index = slides.length - 1;
        }
        if (index >= slides.length) {
            index = 0;
        }
        currentSlide = index;
        /* -----------------------------------------------------
           MOVER TRACK
        ----------------------------------------------------- */
        track.style.transform =
            `translateX(-${index * 100}%)`;
        /* -----------------------------------------------------
           ACTUALIZAR DOTS
        ----------------------------------------------------- */
        dots.forEach((dot, i) => {
            const active = i === index;
            dot.classList.toggle(
                "active",
                active
            );
            dot.setAttribute(
                "aria-current",
                active ? "true" : "false"
            );
        });
        /* -----------------------------------------------------
           ACTUALIZAR ARIA
        ----------------------------------------------------- */
        slides.forEach((slide, i) => {
            slide.setAttribute(
                "aria-hidden",
                i === index
                    ? "false"
                    : "true"
            );
        });
    }
    /* =========================================================
       SIGUIENTE
    ========================================================= */
    function nextSlide() {
        goToSlide(
            currentSlide + 1
        );
    }
    /* =========================================================
       ANTERIOR
    ========================================================= */
    function previousSlide() {
        goToSlide(
            currentSlide - 1
        );
    }
    /* =========================================================
       AUTOPLAY
    ========================================================= */
    function stopAutoSlide() {
        if (autoSlide) {
            clearInterval(autoSlide);
            autoSlide = null;
        }
    }
    function startAutoSlide() {
        stopAutoSlide();
        /*
         * Si el usuario tiene activado
         * "reducir movimiento", no iniciamos
         * el autoplay.
         */
        if (prefersReducedMotion) {
            return;
        }
        /*
         * No reproducir mientras el usuario
         * está interactuando con el slider.
         */
        if (isHovering) {
            return;
        }
        autoSlide = setInterval(
            nextSlide,
            AUTOPLAY_TIME
        );
    }
    /* =========================================================
       DOTS
    ========================================================= */
    dots.forEach((dot) => {
        dot.addEventListener(
            "click",
            (event) => {
                event.preventDefault();
                event.stopPropagation();
                const index =
                    Number(
                        dot.dataset.slide
                    );
                if (
                    Number.isNaN(index)
                ) {
                    return;
                }
                goToSlide(index);
                startAutoSlide();
            }
        );
    });
    /* =========================================================
       MOUSE — INICIO
    ========================================================= */
    slider.addEventListener(
        "mousedown",
        (event) => {
            /*
             * No iniciar drag cuando
             * el usuario está presionando
             * un botón.
             */
            if (
                event.target.closest("button")
            ) {
                return;
            }
            isPointerDown = true;
            isDragging = true;
            startX =
                event.clientX;
            currentX =
                event.clientX;
            slider.classList.add(
                "dragging"
            );
            stopAutoSlide();
        }
    );
    /* =========================================================
       MOUSE — MOVIMIENTO
    ========================================================= */
    window.addEventListener(
        "mousemove",
        (event) => {
            if (!isPointerDown) {
                return;
            }
            currentX =
                event.clientX;
        }
    );
    /* =========================================================
       MOUSE — FINAL
    ========================================================= */
    window.addEventListener(
        "mouseup",
        () => {
            if (!isPointerDown) {
                return;
            }
            isPointerDown = false;
            isDragging = false;
            slider.classList.remove(
                "dragging"
            );
            const distance =
                currentX - startX;
            if (
                Math.abs(distance) >=
                SWIPE_THRESHOLD
            ) {
                if (distance < 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
            startAutoSlide();
        }
    );
    /* =========================================================
       MOUSE — SALIR DE LA VENTANA
    ========================================================= */
    window.addEventListener(
        "blur",
        () => {
            if (!isPointerDown) {
                return;
            }
            isPointerDown = false;
            isDragging = false;
            slider.classList.remove(
                "dragging"
            );
            startAutoSlide();
        }
    );
    /* =========================================================
       TOUCH — INICIO
    ========================================================= */
    slider.addEventListener(
        "touchstart",
        (event) => {
            if (
                !event.touches ||
                !event.touches.length
            ) {
                return;
            }
            startX =
                event.touches[0].clientX;
            currentX =
                startX;
            stopAutoSlide();
        },
        {
            passive: true
        }
    );
    /* =========================================================
       TOUCH — MOVIMIENTO
    ========================================================= */
    slider.addEventListener(
        "touchmove",
        (event) => {
            if (
                !event.touches ||
                !event.touches.length
            ) {
                return;
            }
            currentX =
                event.touches[0].clientX;
        },
        {
            passive: true
        }
    );
    /* =========================================================
       TOUCH — FINAL
    ========================================================= */
    slider.addEventListener(
        "touchend",
        () => {
            const distance =
                currentX - startX;
            if (
                Math.abs(distance) >=
                SWIPE_THRESHOLD
            ) {
                if (distance < 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
            startAutoSlide();
        }
    );
    /* =========================================================
       HOVER
    ========================================================= */
    slider.addEventListener(
        "mouseenter",
        () => {
            isHovering = true;
            stopAutoSlide();
        }
    );
    slider.addEventListener(
        "mouseleave",
        () => {
            isHovering = false;
            startAutoSlide();
        }
    );
    /* =========================================================
       TECLADO
    ========================================================= */
    slider.setAttribute(
        "tabindex",
        "0"
    );
    slider.addEventListener(
        "keydown",
        (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    event.preventDefault();
                    previousSlide();
                    startAutoSlide();
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    nextSlide();
                    startAutoSlide();
                    break;
            }
        }
    );
    /* =========================================================
       VISIBILIDAD DE LA PESTAÑA
    ========================================================= */
    document.addEventListener(
        "visibilitychange",
        () => {
            if (
                document.hidden
            ) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        }
    );
    /* =========================================================
       INICIALIZACIÓN
    ========================================================= */
    goToSlide(0);
    startAutoSlide();
});
