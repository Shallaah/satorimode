document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const track = document.getElementById("hero-track");
    const slides = document.querySelectorAll(".hero-slide");

    const nextButton = document.getElementById("slider-next");
    const prevButton = document.getElementById("slider-prev");

    const dots = document.querySelectorAll(
        "#slider-dots button"
    );


    if (!track || slides.length === 0) {
        return;
    }


    let currentSlide = 0;

    let sliderTimer;


    function updateSlider() {

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        updateSlider();

    }


    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        updateSlider();

    }


    function startSlider() {

        clearInterval(sliderTimer);

        sliderTimer = setInterval(
            nextSlide,
            6000
        );

    }


    nextButton?.addEventListener(
        "click",
        () => {

            nextSlide();

            startSlider();

        }
    );


    prevButton?.addEventListener(
        "click",
        () => {

            previousSlide();

            startSlider();

        }
    );


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                currentSlide = index;

                updateSlider();

                startSlider();

            }
        );

    });


    /* ================================================
       PAUSAR AL PASAR EL MOUSE
    ================================================= */

    const hero = document.querySelector(
        ".hero-slider"
    );


    hero?.addEventListener(
        "mouseenter",
        () => clearInterval(sliderTimer)
    );


    hero?.addEventListener(
        "mouseleave",
        startSlider
    );


    /* ================================================
       INICIAR
    ================================================= */

    updateSlider();

    startSlider();


});
