@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Inter:wght@400;500;600;700;800&display=swap');


/* =========================================================
   SATORII — VARIABLES
========================================================= */

:root {

    /* -----------------------------------------------------
       COLORES
    ----------------------------------------------------- */

    --black: #111111;
    --black-soft: #0b0b0b;

    --white: #ffffff;

    --red: #EF0930;
    --dark-red: #c90727;

    --gray: #666666;
    --gray-light: #777777;
    --gray-muted: #999999;

    --light-gray: #f5f5f5;

    --border: #dddddd;
    --border-soft: rgba(0, 0, 0, .08);


    /* -----------------------------------------------------
       TIPOGRAFÍAS
    ----------------------------------------------------- */

    --font-main:
        "Inter",
        Arial,
        Helvetica,
        sans-serif;

    --font-logo:
        "Barlow Condensed",
        "Arial Narrow",
        Arial,
        sans-serif;


    /* -----------------------------------------------------
       RADIOS
    ----------------------------------------------------- */

    --radius-sm: 5px;
    --radius: 8px;
    --radius-md: 10px;
    --radius-lg: 16px;


    /* -----------------------------------------------------
       CONTENEDORES
    ----------------------------------------------------- */

    --satori-content-width: 1800px;
    --satori-side-space: 30px;


    /* -----------------------------------------------------
       TRANSICIONES
    ----------------------------------------------------- */

    --transition-fast: .2s ease;
    --transition-normal: .3s ease;

}


/* =========================================================
   RESET
========================================================= */

*,
*::before,
*::after {
    box-sizing: border-box;
}


html {
    scroll-behavior: smooth;
    overflow-x: hidden;
}


body {
    margin: 0;
    padding: 0;

    background: var(--white);
    color: var(--black);

    font-family: var(--font-main);
    font-size: 16px;
    line-height: 1.45;

    overflow-x: hidden;
}


body.menu-open {
    overflow: hidden;
}


button,
input,
textarea,
select {
    font-family: inherit;
}


button {
    cursor: pointer;
}


a {
    color: inherit;
    text-decoration: none;
}


img {
    display: block;
    max-width: 100%;
}


/* =========================================================
   ACCESIBILIDAD — FOCUS
========================================================= */

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {

    outline:
        2px solid var(--red);

    outline-offset: 3px;
}


/* =========================================================
   HEADER GLOBAL
   Controlado por js/header.js
========================================================= */

#satori-header {
    width: 100%;
    position: relative;
    z-index: 9999;
}


#satori-header + main {
    padding-top: 0 !important;
}


/* =========================================================
   HERO / BANNER
========================================================= */

.hero-slider {

    width: 100%;

    position: relative;

    z-index: 0;

    overflow: hidden;

    background: #eeeeee;

    border: none;
    border-radius: 0;
    box-shadow: none;

    cursor: grab;

    /*
     * Permite deslizar horizontalmente
     * sin bloquear completamente
     * el scroll vertical en móviles.
     */
    touch-action: pan-y;

    user-select: none;
}


.hero-slider.dragging {
    cursor: grabbing;
}


.hero-track {

    display: flex;

    width: 100%;

    transition:
        transform .55s cubic-bezier(
            .22,
            .61,
            .36,
            1
        );
}


.hero-slide {

    position: relative;

    flex: 0 0 100%;

    width: 100%;

    height: min(68vh, 720px);

    min-height: 500px;

    overflow: hidden;

    background: #eeeeee;
}


.hero-slide picture {

    position: relative;

    display: block;

    width: 100%;
    height: 100%;
}


.hero-slide img,
.hero-slide picture img {

    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    object-position: center;

    user-select: none;

    pointer-events: none;

    -webkit-user-drag: none;
}


/* =========================================================
   HERO — INDICADORES
========================================================= */

.hero-dots {

    position: absolute;

    bottom: 18px;
    left: 50%;

    transform: translateX(-50%);

    display: flex;

    align-items: center;

    gap: 7px;

    z-index: 20;
}


.hero-dot {

    width: 8px;
    height: 8px;

    padding: 0;

    border: 0;

    border-radius: 50%;

    background:
        rgba(255, 255, 255, .65);

    transition:
        width var(--transition-fast),
        background var(--transition-fast),
        opacity var(--transition-fast);
}


.hero-dot:hover {
    opacity: .85;
}


.hero-dot.active {

    width: 24px;

    border-radius: 10px;

    background: var(--white);
}


/* =========================================================
   BENEFICIOS
========================================================= */

.benefits {

    position: relative;

    z-index: 20;

    width: min(
        var(--satori-content-width),
        calc(
            100% -
            (var(--satori-side-space) * 2)
        )
    );

    margin: -42px auto 0;

    padding: 0;

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    background: var(--white);

    border:
        1px solid var(--border-soft);

    border-radius:
        var(--radius-md);

    box-shadow:
        0 12px 35px
        rgba(0, 0, 0, .08);

    overflow: hidden;
}


.benefit {

    position: relative;

    min-height: 92px;

    padding: 20px 24px;

    display: flex;

    align-items: center;

    gap: 15px;

    background: var(--white);

    border-right:
        1px solid rgba(0, 0, 0, .10);

    transition:
        background var(--transition-normal);
}


.benefit:last-child {
    border-right: 0;
}


.benefit:not(:last-child)::after {

    content: "";

    position: absolute;

    top: 18px;
    right: 0;
    bottom: 18px;

    width: 1px;

    background:
        rgba(0, 0, 0, .10);
}


.benefit-icon {

    width: 40px;
    height: 40px;

    min-width: 40px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    font-size: 21px;
    line-height: 1;

    border-radius: 50%;

    background:
        rgba(239, 9, 48, .07);

    color: var(--red);

    transition:
        background var(--transition-fast),
        color var(--transition-fast),
        transform var(--transition-fast);
}


.benefit-content {

    display: flex;

    flex-direction: column;

    justify-content: center;

    min-width: 0;
}


.benefit strong {

    display: block;

    margin-bottom: 5px;

    color: var(--black);

    font-size: 12px;

    line-height: 1.2;

    font-weight: 800;
}


.benefit-content > span {

    display: block;

    color: var(--gray-light);

    font-size: 10px;

    line-height: 1.4;
}


.benefit:hover {
    background: #fafafa;
}


.benefit:hover .benefit-icon {

    background: var(--red);

    color: var(--white);

    transform: scale(1.05);
}


/* =========================================================
   SECCIONES
========================================================= */

.section,
.recommendations {

    width: min(
        var(--satori-content-width),
        calc(
            100% -
            (var(--satori-side-space) * 2)
        )
    );

    margin-left: auto;
    margin-right: auto;
}


.section {
    margin-top: 52px;
}


.recommendations {
    margin-top: 70px;
}


.section-header {

    margin-bottom: 20px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;
}


.section-header h2 {

    margin: 0;

    font-size: 24px;

    line-height: 1.1;

    font-weight: 800;

    letter-spacing: -.5px;
}


.section-header a {

    flex-shrink: 0;

    color: var(--red);

    font-size: 13px;

    font-weight: 700;

    transition:
        color var(--transition-fast);
}


.section-header a:hover {
    color: var(--dark-red);
}


/* =========================================================
   COLECCIONES
========================================================= */

.collections-grid {

    width: 100%;

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 10px;
}


.collection-card {

    min-height: 230px;

    position: relative;

    overflow: hidden;

    display: flex;

    align-items: flex-end;

    border:
        1px solid #cccccc;

    border-radius:
        var(--radius);

    background-color:
        var(--black);

    box-shadow:
        0 4px 15px
        rgba(0, 0, 0, .05);

    transition:
        transform var(--transition-normal),
        border-color var(--transition-normal),
        box-shadow var(--transition-normal);
}


.collection-card::before {

    content: "";

    position: absolute;

    inset: -8px;

    background-size: cover;

    background-position: center;

    background-repeat: no-repeat;

    transform: scale(1);

    transition:
        transform .55s cubic-bezier(
            .22,
            .61,
            .36,
            1
        );

    z-index: 0;
}


.collection-card:nth-child(1)::before {
    background-image:
        url("../img/anime-card.png");
}


.collection-card:nth-child(2)::before {
    background-image:
        url("../img/torii-card.png");
}


.collection-card:nth-child(3)::before {
    background-image:
        url("../img/anime-goods-card.png");
}


.collection-card:nth-child(4)::before {
    background-image:
        url("../img/todo-card.png");
}


.collection-card::after {

    content: "";

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            to top,
            rgba(0, 0, 0, .55) 0%,
            rgba(0, 0, 0, .22) 28%,
            rgba(0, 0, 0, .06) 55%,
            rgba(0, 0, 0, 0) 75%
        );

    transition:
        background var(--transition-normal);

    z-index: 1;

    pointer-events: none;
}


.collection-card > div {

    position: relative;

    z-index: 2;

    width: 100%;

    padding: 20px;

    color: var(--white);
}


.collection-card h3 {

    margin: 0;

    color: var(--white);

    font-size: 19px;

    font-weight: 800;

    line-height: 1;

    text-shadow:
        0 2px 5px
        rgba(0, 0, 0, .85);

    transition:
        color var(--transition-fast);
}


.collection-card span {

    display: block;

    margin-top: 5px;

    color: var(--white);

    font-size: 12px;

    text-shadow:
        0 2px 5px
        rgba(0, 0, 0, .85);

    transition:
        color var(--transition-fast);
}


.collection-card:hover {

    transform:
        translateY(-6px);

    border-color:
        #999999;

    box-shadow:
        0 14px 30px
        rgba(0, 0, 0, .14);
}


.collection-card:hover::before {
    transform: scale(1.05);
}


.collection-card:hover::after {

    background:
        linear-gradient(
            to top,
            rgba(0, 0, 0, .72) 0%,
            rgba(0, 0, 0, .28) 45%,
            rgba(0, 0, 0, .05) 75%
        );
}


.collection-card:hover h3,
.collection-card:hover span {
    color: var(--red);
}


/* =========================================================
   RECOMENDACIONES
========================================================= */

.recommendations-grid {

    width: 100%;

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 14px;
}


.recommendation-card {

    overflow: hidden;

    border:
        1px solid var(--border);

    border-radius:
        var(--radius);

    background:
        var(--white);

    transition:
        transform var(--transition-normal),
        box-shadow var(--transition-normal),
        border-color var(--transition-normal);
}


.recommendation-card:hover {

    transform:
        translateY(-5px);

    border-color:
        #cccccc;

    box-shadow:
        0 12px 28px
        rgba(0, 0, 0, .10);
}


.recommendation-image {

    width: 100%;

    aspect-ratio: 1 / 1;

    overflow: hidden;

    background:
        var(--light-gray);
}


.recommendation-image img {

    width: 100%;
    height: 100%;

    object-fit: cover;

    transition:
        transform .45s ease;
}


.recommendation-card:hover
.recommendation-image img {

    transform:
        scale(1.035);
}


.recommendation-info {
    padding: 15px;
}


.recommendation-category {

    margin-bottom: 6px;

    color: var(--red);

    font-size: 11px;

    font-weight: 700;

    letter-spacing: .7px;
}


.recommendation-name {

    margin-bottom: 4px;

    font-size: 15px;

    font-weight: 600;
}


.recommendation-price {

    color: var(--gray-light);

    font-size: 13px;
}


.recommendation-placeholder {

    width: 100%;
    height: 100%;

    min-height: 150px;

    display: flex;

    align-items: center;
    justify-content: center;

    background:
        var(--black);

    color:
        var(--white);

    font-family:
        var(--font-logo);

    font-size: 28px;

    font-style: italic;
}


/*
 * Oculta la sección cuando no existen
 * productos recomendados.
 */

.recommendations:
has(.recommendations-grid:empty) {

    display: none;
}


/* =========================================================
   SATORII PACK
========================================================= */

.satorii-pack {

    position: relative;

    width: min(
        var(--satori-content-width),
        calc(
            100% -
            (var(--satori-side-space) * 2)
        )
    );

    min-height: 370px;

    margin: 80px auto;

    padding: 55px;

    display: flex;

    align-items: center;

    overflow: hidden;

    background:
        var(--red);

    color:
        var(--white);

    border: none;

    border-radius:
        var(--radius-md);

    isolation: isolate;
}


.satorii-pack-content {

    position: relative;

    z-index: 10;

    width: 52%;

    max-width: 650px;
}


.satorii-pack-label {

    display: block;

    margin-bottom: 12px;

    color:
        var(--black);

    font-size: 11px;

    font-weight: 900;

    letter-spacing: 4px;
}


.satorii-pack h2 {

    margin:
        0 0 18px;

    color:
        var(--white);

    font-size:
        clamp(
            38px,
            4vw,
            62px
        );

    line-height: .95;

    font-weight: 900;

    letter-spacing: -1.5px;
}


.satorii-pack h2 span {
    color: var(--black);
}


.satorii-pack p {

    max-width: 570px;

    margin: 0;

    color:
        var(--white);

    font-size: 15px;

    line-height: 1.6;
}


.satorii-pack-button {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    margin-top: 25px;

    padding:
        14px 23px;

    background:
        var(--black);

    color:
        var(--white);

    border-radius:
        var(--radius-sm);

    font-size: 11px;

    font-weight: 800;

    letter-spacing: .4px;

    transition:
        transform var(--transition-normal),
        background var(--transition-normal),
        color var(--transition-normal);
}


.satorii-pack-button span {
    font-size: 17px;
}


.satorii-pack-button:hover {

    background:
        var(--white);

    color:
        var(--black);

    transform:
        translateY(-2px);
}


.satorii-pack-features {

    position: relative;

    display: flex;

    align-items: center;

    gap: 20px;

    margin-top: 30px;
}


.pack-feature {

    display: flex;

    align-items: center;

    gap: 9px;

    color:
        var(--white);
}


.pack-feature-icon {

    width: 34px;
    height: 34px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    border:
        1px solid
        rgba(255, 255, 255, .85);

    border-radius: 50%;

    font-size: 16px;
}


.pack-feature div {

    display: flex;

    flex-direction: column;
}


.pack-feature strong {

    color:
        var(--white);

    font-size: 9px;

    font-weight: 800;

    line-height: 1.2;
}


.pack-feature small {

    color:
        rgba(255, 255, 255, .9);

    font-size: 8px;

    line-height: 1.2;
}


.pack-divider {

    width: 1px;

    height: 35px;

    flex-shrink: 0;

    background:
        rgba(255, 255, 255, .5);
}


.satorii-pack-visual {

    position: absolute;

    top: 0;
    right: 0;

    width: 53%;
    height: 100%;

    display: flex;

    align-items: center;
    justify-content: center;

    z-index: 3;
}


.satorii-pack-glow {

    position: absolute;

    width: 420px;
    height: 420px;

    border-radius: 50%;

    background:
        rgba(255, 255, 255, .18);

    filter:
        blur(80px);
}


.satorii-pack-box {

    position: relative;

    z-index: 5;

    width:
        min(570px, 95%);

    max-height: 420px;

    object-fit: contain;

    filter:
        drop-shadow(
            0 30px 30px
            rgba(0, 0, 0, .45)
        );

    transform:
        translateY(18px);

    transition:
        transform .45s ease,
        filter .45s ease;
}


.satorii-pack:hover
.satorii-pack-box {

    transform:
        translateY(8px)
        scale(1.035);

    filter:
        drop-shadow(
            0 35px 35px
            rgba(0, 0, 0, .5)
        );
}


.satorii-pack::before {

    content: "";

    position: absolute;

    width: 520px;
    height: 520px;

    right: 3%;
    top: 50%;

    transform:
        translateY(-50%);

    border-radius: 50%;

    border:
        1px solid
        rgba(255, 255, 255, .18);

    z-index: 1;
}


.satorii-pack::after {

    content: "";

    position: absolute;

    width: 430px;
    height: 430px;

    right: 8%;
    top: 50%;

    transform:
        translateY(-50%);

    border-radius: 50%;

    background:
        rgba(255, 255, 255, .10);

    filter:
        blur(80px);

    z-index: 1;
}


/* =========================================================
   FOOTER GLOBAL
   Controlado por js/footer.js
========================================================= */

.satori-global-footer {

    width: 100%;

    margin-top: 70px;

    background:
        var(--black-soft);

    color:
        var(--white);

    border-top:
        2px solid #222222;
}


.satori-footer-main {

    width:
        min(
            1500px,
            calc(100% - 40px)
        );

    margin:
        0 auto;

    padding:
        65px 0 45px;

    display: grid;

    grid-template-columns:
        1.2fr 1fr 1fr 1.5fr;

    gap: 50px;
}


.satori-footer-brand h3 {

    margin:
        0 0 5px;

    font-family:
        var(--font-logo);

    font-size: 32px;

    font-weight: 700;

    font-style: italic;

    letter-spacing: -1px;
}


.satori-footer-kanji {

    display: block;

    margin-bottom: 18px;

    color:
        var(--red);

    font-size: 13px;
}


.satori-footer-brand p {

    max-width: 300px;

    margin: 0;

    color:
        #aaaaaa;

    font-size: 13px;

    line-height: 1.6;
}


.satori-footer-instagram {

    width: 38px;
    height: 38px;

    margin-top: 20px;

    display: flex;

    align-items: center;
    justify-content: center;

    border:
        1px solid #444444;

    border-radius: 50%;

    color:
        var(--white);

    transition:
        color var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast);
}


.satori-footer-instagram:hover {

    color:
        var(--red);

    border-color:
        var(--red);

    transform:
        translateY(-2px);
}


.satori-footer-instagram svg {

    width: 18px;
    height: 18px;
}


.satori-footer-column {

    display: flex;

    flex-direction: column;

    gap: 12px;
}


.satori-footer-column h4 {

    margin:
        0 0 8px;

    font-size: 12px;

    letter-spacing: 2px;
}


.satori-footer-column a {

    color:
        #aaaaaa;

    font-size: 13px;

    transition:
        color var(--transition-fast);
}


.satori-footer-column a:hover {
    color:
        var(--white);
}


.satori-footer-community-label {

    display: block;

    margin-bottom: 5px;

    color:
        var(--red);

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 3px;
}


.satori-footer-community h3 {

    margin:
        0 0 10px;

    font-size: 30px;

    line-height: 1;
}


.satori-footer-community h3 span {
    color:
        var(--red);
}


.satori-footer-community p {

    margin:
        0 0 18px;

    color:
        #aaaaaa;

    font-size: 13px;
}


.satori-footer-newsletter {

    display: flex;

    width: 100%;

    max-width: 400px;

    height: 46px;

    border:
        1px solid #444444;

    border-radius: 6px;

    overflow: hidden;

    background:
        var(--white);
}


.satori-footer-newsletter input {

    flex: 1;

    min-width: 0;

    padding:
        0 14px;

    border: 0;

    outline: none;

    color:
        var(--black);

    background:
        var(--white);

    font-size: 13px;
}


.satori-footer-newsletter button {

    width: 52px;

    border: 0;

    background:
        var(--red);

    color:
        var(--white);

    font-size: 20px;

    transition:
        background var(--transition-fast);
}


.satori-footer-newsletter button:hover {
    background:
        var(--dark-red);
}


.satori-footer-bottom {

    width:
        min(
            1500px,
            calc(100% - 40px)
        );

    margin:
        0 auto;

    padding:
        18px 0;

    border-top:
        1px solid #222222;

    display: flex;

    align-items: center;

    justify-content: space-between;

    color:
        #777777;

    font-size: 11px;
}


.satori-footer-bottom > div {

    display: flex;

    gap: 20px;
}


.satori-footer-bottom a:hover {
    color:
        var(--white);
}


/* =========================================================
   TABLET GRANDE
========================================================= */

@media (max-width: 1100px) {

    :root {
        --satori-side-space: 24px;
    }


    .collections-grid,
    .recommendations-grid {

        grid-template-columns:
            repeat(2, 1fr);
    }


    .satori-footer-main {

        grid-template-columns:
            repeat(2, 1fr);
    }

}


/* =========================================================
   TABLET — SATORII PACK
========================================================= */

@media (max-width: 1050px) {

    .satorii-pack {

        min-height: 330px;

        padding: 45px;
    }


    .satorii-pack-content {
        width: 55%;
    }


    .satorii-pack-visual {
        width: 50%;
    }


    .satorii-pack-box {
        width: 100%;
    }

}


/* =========================================================
   TABLET — BENEFICIOS
========================================================= */

@media (max-width: 950px) {

    .benefits {

        grid-template-columns:
            repeat(2, 1fr);

        margin-top: -30px;
    }


    .benefit {

        min-height: 82px;
    }


    .benefit:nth-child(2),
    .benefit:nth-child(4) {

        border-right: 0;
    }


    .benefit:nth-child(1),
    .benefit:nth-child(2) {

        border-bottom:
            1px solid var(--border);
    }


    .benefit:nth-child(3),
    .benefit:nth-child(4) {

        border-bottom: 0;
    }


    .benefit:nth-child(2)::after,
    .benefit:nth-child(4)::after {

        display: none;
    }

}


/* =========================================================
   MÓVIL
========================================================= */

@media (max-width: 900px) {

    :root {
        --satori-side-space: 15px;
    }


    /* -----------------------------------------------------
       HERO
    ----------------------------------------------------- */

    .hero-slide {

        height: 58vh;

        min-height: 360px;

        max-height: 580px;
    }


    .hero-dots {
        bottom: 12px;
    }


    /* -----------------------------------------------------
       BENEFICIOS
    ----------------------------------------------------- */

    .benefits {

        width:
            calc(100% - 30px);

        grid-template-columns:
            repeat(2, 1fr);
    }


    .benefit {

        min-height: 90px;

        padding: 16px;

        gap: 10px;
    }


    .benefit strong {
        font-size: 11px;
    }


    .benefit-content > span {
        font-size: 10px;
    }


    /* -----------------------------------------------------
       SECCIONES
    ----------------------------------------------------- */

    .section,
    .recommendations {

        width:
            calc(100% - 30px);
    }


    .section {
        margin-top: 38px;
    }


    .recommendations {
        margin-top: 50px;
    }


    .section-header {
        margin-bottom: 16px;
    }


    .section-header h2 {
        font-size: 21px;
    }


    .section-header a {
        font-size: 12px;
    }


    /* -----------------------------------------------------
       COLECCIONES
    ----------------------------------------------------- */

    .collections-grid {

        grid-template-columns:
            repeat(2, 1fr);

        gap: 8px;
    }


    .collection-card {
        min-height: 180px;
    }


    .collection-card > div {
        padding: 15px;
    }


    .collection-card h3 {
        font-size: 16px;
    }


    .collection-card span {
        font-size: 11px;
    }


    /* -----------------------------------------------------
       RECOMENDACIONES
    ----------------------------------------------------- */

    .recommendations-grid {

        grid-template-columns:
            repeat(2, 1fr);

        gap: 9px;
    }


    .recommendation-info {
        padding: 11px;
    }


    .recommendation-category {
        font-size: 9px;
    }


    .recommendation-name {
        font-size: 13px;
    }


    .recommendation-price {
        font-size: 11px;
    }


    /* -----------------------------------------------------
       SATORII PACK
    ----------------------------------------------------- */

    .satorii-pack {

        width:
            calc(100% - 30px);

        min-height: auto;

        margin:
            55px auto;

        padding:
            30px 22px 0;

        flex-direction: column;

        align-items: stretch;
    }


    .satorii-pack-content {

        width: 100%;

        max-width: none;
    }


    .satorii-pack-label {

        font-size: 9px;

        letter-spacing: 3px;
    }


    .satorii-pack h2 {
        font-size: 34px;
    }


    .satorii-pack p {
        font-size: 13px;
    }


    .satorii-pack-button {

        width: 100%;

        margin-top: 20px;
    }


    .satorii-pack-features {

        gap: 8px;

        justify-content:
            space-between;
    }


    .pack-feature {
        gap: 5px;
    }


    .pack-feature-icon {

        width: 28px;
        height: 28px;

        font-size: 13px;
    }


    .pack-feature strong {
        font-size: 7px;
    }


    .pack-feature small {
        font-size: 6px;
    }


    .pack-divider {
        height: 28px;
    }


    .satorii-pack-visual {

        position: relative;

        width: 100%;

        height: 250px;

        margin-top: -5px;
    }


    .satorii-pack-box {

        width: 105%;

        max-height: 280px;

        transform:
            translateY(8px);
    }


    .satorii-pack:hover
    .satorii-pack-box {

        transform:
            translateY(8px);
    }


    .satorii-pack-glow {

        width: 280px;
        height: 280px;
    }


    /* -----------------------------------------------------
       FOOTER
    ----------------------------------------------------- */

    .satori-global-footer {
        margin-top: 50px;
    }


    .satori-footer-main {

        width:
            calc(100% - 30px);

        grid-template-columns: 1fr;

        gap: 35px;

        padding:
            45px 0 30px;
    }


    .satori-footer-bottom {

        width:
            calc(100% - 30px);

        flex-direction: column;

        align-items: flex-start;

        gap: 13px;
    }

}


/* =========================================================
   MÓVIL — BENEFICIOS
========================================================= */

@media (max-width: 600px) {

    .benefits {

        width:
            calc(100% - 24px);

        margin:
            -28px auto 0;

        grid-template-columns:
            repeat(2, 1fr);

        border-radius:
            12px;

        box-shadow:
            0 10px 30px
            rgba(0, 0, 0, .10);
    }


    .benefit {

        min-height: 88px;

        padding:
            15px 13px;

        gap: 10px;
    }


    .benefit-icon {

        width: 34px;
        height: 34px;

        min-width: 34px;

        font-size: 17px;
    }


    .benefit strong {

        font-size: 9px;

        margin-bottom: 4px;
    }


    .benefit-content > span {

        font-size: 8px;
    }

}


/* =========================================================
   MÓVIL — HERO
========================================================= */

@media (max-width: 768px) {

    .hero-slide {

        width: 100%;

        height: auto;

        min-height: 0;

        max-height: none;

        aspect-ratio:
            1080 / 1200;

        overflow: hidden;
    }


    .hero-slide picture {

        display: block;

        width: 100%;
        height: 100%;
    }


    .hero-slide picture img {

        display: block;

        width: 100%;
        height: 100%;

        object-fit: cover;

        object-position: center;

        user-select: none;

        pointer-events: none;

        -webkit-user-drag: none;
    }

}


/* =========================================================
   MÓVIL PEQUEÑO
========================================================= */

@media (max-width: 480px) {

    .hero-slide {
        min-height: 340px;
    }


    .benefit {

        padding:
            13px 10px;

        gap: 8px;
    }


    .benefit-icon {

        width: 31px;
        height: 31px;

        min-width: 31px;

        font-size: 15px;
    }


    .benefit strong {
        font-size: 8px;
    }


    .benefit-content > span {
        font-size: 7px;
    }


    .collection-card {
        min-height: 140px;
    }


    .collection-card > div {
        padding: 12px;
    }


    .collection-card h3 {
        font-size: 15px;
    }


    .recommendations-grid {

        grid-template-columns:
            repeat(2, 1fr);
    }


    .satori-footer-bottom > div {

        flex-wrap: wrap;

        gap: 12px;
    }


    /* -----------------------------------------------------
       SATORII PACK
    ----------------------------------------------------- */

    .satorii-pack {

        width:
            calc(100% - 24px);

        padding:
            26px 18px 0;
    }


    .satorii-pack h2 {
        font-size: 31px;
    }


    .satorii-pack p {
        font-size: 12px;
    }


    .satorii-pack-visual {
        height: 220px;
    }


    .satorii-pack-box {
        width: 110%;
    }

}


/* =========================================================
   ACCESIBILIDAD — REDUCIR MOVIMIENTO
========================================================= */

@media (prefers-reduced-motion: reduce) {

    html {
        scroll-behavior: auto;
    }


    *,
    *::before,
    *::after {

        transition:
            none !important;

        animation:
            none !important;
    }


    .hero-track {
        transition:
            none !important;
    }


    .collection-card:hover,
    .recommendation-card:hover {

        transform: none;
    }


    .collection-card:hover::before,
    .recommendation-card:hover
    .recommendation-image img {

        transform: none;
    }


    .satorii-pack:hover
    .satorii-pack-box {

        transform:
            translateY(18px);
    }

}
