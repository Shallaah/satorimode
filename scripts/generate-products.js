function generateProductCSS() {

    return `

        :root {
            --satori-red: #f31218;
            --satori-black: #111827;
            --satori-muted: #666;
            --satori-border: #e5e5e5;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            background: #fff;
            color: var(--satori-black);
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
        }

        /* =================================================
           CONTENEDOR GENERAL
        ================================================= */

        .satori-product-page {
            width: min(1800px, calc(100% - 60px));
            margin: 0 auto;
        }

        /* =================================================
           PRODUCTO PRINCIPAL
        ================================================= */

        .satori-product-layout {

            display: grid;

            grid-template-columns:
                minmax(0, 1.05fr)
                minmax(420px, .95fr);

            gap: clamp(35px, 4vw, 70px);

            padding: 55px 0 70px;

            align-items: start;
        }

        /* =================================================
           GALERÍA
        ================================================= */

        .satori-product-gallery {
            min-width: 0;
        }

        .satori-main-image {

            width: 100%;

            height: clamp(430px, 36vw, 555px);

            display: flex;

            align-items: center;
            justify-content: center;

            overflow: hidden;

            background: #f7f7f7;

            border-radius: 12px;
        }

        .satori-main-image img {

            width: 100%;
            height: 100%;

            display: block;

            object-fit: contain;

            transition:
                transform .35s ease;
        }

        .satori-main-image:hover img {
            transform: scale(1.012);
        }

        .satori-image-placeholder {

            color: #aaa;

            font-size: 22px;

            font-weight: 900;

            letter-spacing: 4px;
        }

        /* =================================================
           MINIATURAS
        ================================================= */

        .satori-thumbnails {

            display: grid;

            grid-template-columns:
                repeat(3, 100px);

            gap: 10px;

            margin-top: 10px;
        }

        .satori-thumbnail {

            width: 100px;
            height: 100px;

            padding: 0;

            overflow: hidden;

            border:
                1px solid #ddd;

            border-radius: 7px;

            background: #f7f7f7;

            cursor: pointer;

            transition:
                border-color .2s ease,
                transform .2s ease;
        }

        .satori-thumbnail.active {

            border:
                2px solid #111;
        }

        .satori-thumbnail:hover {

            transform:
                translateY(-2px);
        }

        .satori-thumbnail img {

            width: 100%;
            height: 100%;

            display: block;

            object-fit: contain;
        }

        /* =================================================
           INFORMACIÓN
        ================================================= */

        .satori-product-info {

            max-width: 700px;
        }

        .satori-product-category {

            display: block;

            margin-bottom: 10px;

            color: #777;

            font-size: 11px;

            font-weight: 900;

            letter-spacing: 2px;
        }

        .satori-product-info h1 {

            margin: 0;

            color: #111827;

            font-size:
                clamp(36px, 3.5vw, 54px);

            line-height: .98;

            letter-spacing: -2px;

            font-weight: 900;
        }

        .satori-product-price {

            margin-top: 17px;

            color: #111827;

            font-size: 25px;

            font-weight: 900;
        }

        .satori-product-divider {

            width: 100%;

            height: 1px;

            margin: 24px 0 27px;

            background: #e5e5e5;
        }

        /* =================================================
           OPCIONES
        ================================================= */

        .satori-option {
            margin-top: 23px;
        }

        .satori-option-header {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-bottom: 12px;
        }

        .satori-option-header span {

            color: #111827;

            font-size: 11px;

            font-weight: 900;

            letter-spacing: 1px;
        }

        .satori-option-header a {

            color: #111827;

            font-size: 10px;

            font-weight: 800;

            text-decoration: underline;
        }

        .satori-size-options,
        .satori-color-options {

            display: flex;

            flex-wrap: wrap;

            gap: 9px;
        }

        .satori-size-button {

            min-width: 46px;
            min-height: 42px;

            padding: 0 14px;

            border:
                1px solid #dcdcdc;

            border-radius: 6px;

            background: #fff;

            color: #111827;

            font-size: 11px;

            font-weight: 800;

            cursor: pointer;

            transition: .2s ease;
        }

        .satori-size-button.active {

            background: #111827;

            border-color: #111827;

            color: #fff;
        }

        .satori-color-button {

            min-height: 42px;

            display: inline-flex;

            align-items: center;

            gap: 8px;

            padding: 0 14px;

            border:
                1px solid #dcdcdc;

            border-radius: 22px;

            background: #fff;

            color: #111827;

            font-size: 11px;

            font-weight: 700;

            cursor: pointer;
        }

        .satori-color-button.active {

            border-color: #111827;

            background: #111827;

            color: #fff;
        }

        .satori-color-dot {

            width: 14px;
            height: 14px;

            border-radius: 50%;

            display: block;

            border:
                1px solid #aaa;
        }

        .satori-color-black {
            background: #111;
        }

        .satori-color-white {
            background: #fff;
        }

        .satori-color-red {
            background: #f31218;
        }

        .satori-color-blue {
            background: #3568c8;
        }

        .satori-color-green {
            background: #3b9a5c;
        }

        /* =================================================
           CANTIDAD
        ================================================= */

        .satori-quantity-row {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-top: 28px;
        }

        .satori-quantity-label {

            color: #111827;

            font-size: 11px;

            font-weight: 900;

            letter-spacing: 1px;
        }

        .satori-quantity {

            display: flex;

            align-items: center;

            border:
                1px solid #ddd;

            border-radius: 6px;

            overflow: hidden;
        }

        .satori-quantity button {

            width: 40px;
            height: 40px;

            border: 0;

            background: #fff;

            cursor: pointer;

            font-size: 15px;
        }

        .satori-quantity span {

            min-width: 36px;

            text-align: center;

            font-size: 11px;

            font-weight: 800;
        }

        .satori-quantity-input {

            position: absolute;

            width: 1px;
            height: 1px;

            opacity: 0;

            pointer-events: none;
        }

        /* =================================================
           BOTÓN CARRITO
        ================================================= */

        .satori-add-to-cart {

            width: 100%;

            min-height: 56px;

            margin-top: 19px;

            border: 0;

            border-radius: 6px;

            background:
                var(--satori-red);

            color: #fff;

            font-size: 11px;

            font-weight: 900;

            letter-spacing: .5px;

            cursor: pointer;

            transition:
                transform .2s ease,
                background .2s ease;
        }

        .satori-add-to-cart:hover {

            background: #d90d12;

            transform: translateY(-1px);
        }

        .satori-add-to-cart.is-added {

            background: #111827;
        }

        /* =================================================
           CONFIANZA
        ================================================= */

        .satori-trust-grid {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            margin-top: 8px;

            border:
                1px solid #e5e5e5;

            border-radius: 8px;

            overflow: hidden;
        }

        .satori-trust-item {

            min-height: 72px;

            display: flex;

            align-items: center;

            gap: 10px;

            padding: 11px 13px;
        }

        .satori-trust-item +
        .satori-trust-item {

            border-left:
                1px solid #e5e5e5;
        }

        .satori-trust-icon {

            width: 27px;
            height: 27px;

            display: flex;

            align-items: center;
            justify-content: center;

            border:
                1px solid #ddd;

            border-radius: 50%;

            font-size: 11px;
        }

        .satori-trust-item strong {

            display: block;

            font-size: 9px;

            font-weight: 900;
        }

        .satori-trust-item span {

            display: block;

            margin-top: 4px;

            color: #777;

            font-size: 8px;

            line-height: 1.4;
        }

        /* =================================================
           DETALLES
        ================================================= */

        .satori-details {

            margin-top: 18px;

            border:
                1px solid #e5e5e5;

            border-radius: 8px;

            overflow: hidden;
        }

        .satori-tabs {

            display: grid;

            grid-template-columns:
                1fr 1fr;

            border-bottom:
                1px solid #e5e5e5;
        }

        .satori-tab {

            min-height: 50px;

            border: 0;

            background: #fafafa;

            color: #777;

            font-size: 10px;

            font-weight: 800;

            cursor: pointer;
        }

        .satori-tab +
        .satori-tab {

            border-left:
                1px solid #e5e5e5;
        }

        .satori-tab.active {

            background: #fff;

            color: #111827;
        }

        .satori-panel {

            display: none;

            padding: 24px;
        }

        .satori-panel.active {
            display: block;
        }

        .satori-panel h3 {

            margin:
                0 0 13px;

            color: #111827;

            font-size: 15px;
        }

        .satori-panel p {

            margin:
                0 0 13px;

            color: #666;

            font-size: 12px;

            line-height: 1.75;
        }

        .satori-product-care {

            padding-top: 13px;

            border-top:
                1px solid #eee;
        }

        .satori-detail-item +
        .satori-detail-item {

            margin-top: 19px;

            padding-top: 19px;

            border-top:
                1px solid #eee;
        }

        .satori-detail-item strong {

            display: block;

            margin-bottom: 7px;

            font-size: 11px;
        }

        /* =================================================
           BANNER FULL WIDTH ANTES DE RECOMENDACIONES
        ================================================= */

        .satori-product-divider-banner {

            position: relative;

            width: 100%;

            min-height: 135px;

            margin:
                5px 0 70px;

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 30px;

            padding:
                30px 45px;

            overflow: hidden;

            background:
                #111827;

            color: #fff;
        }

        .satori-product-divider-banner::after {

            content: "SATORII";

            position: absolute;

            right: 30px;
            bottom: -45px;

            color:
                rgba(255,255,255,.035);

            font-size: 105px;

            font-weight: 900;

            letter-spacing: -5px;
        }

        .satori-product-divider-banner span {

            display: block;

            margin-bottom: 7px;

            color:
                var(--satori-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 3px;
        }

        .satori-product-divider-banner h2 {

            margin: 0;

            font-size:
                clamp(25px, 3vw, 38px);

            line-height: .95;

            letter-spacing: -1.5px;

        }

        .satori-product-divider-banner h2 strong {

            color:
                var(--satori-red);
        }

        .satori-product-divider-banner p {

            position: relative;

            z-index: 2;

            max-width: 480px;

            margin: 0;

            color: #c8c8c8;

            font-size: 12px;

            line-height: 1.6;
        }

        /* =================================================
           RECOMENDACIONES
        ================================================= */

        .satori-related {

            padding:
                0 0 80px;

            border-top: 0;
        }

        .satori-related-heading {

            margin-bottom: 25px;
        }

        .satori-related-heading > span {

            display: block;

            margin-bottom: 8px;

            color:
                var(--satori-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 2px;
        }

        .satori-related-heading h2 {

            margin: 0;

            color: #111827;

            font-size:
                clamp(27px, 3vw, 40px);

            line-height: .92;

            letter-spacing: -1.8px;

            font-weight: 900;
        }

        .satori-related-heading h2 em {

            color:
                var(--satori-red);

            font-style: normal;
        }

        .satori-related-heading p {

            margin:
                9px 0 0;

            color: #777;

            font-size: 12px;
        }

        .satori-related-grid {

            display: grid;

            grid-template-columns:
                repeat(4, minmax(0, 1fr));

            gap: 18px;

            width: 75%;
        }

        .satori-related-card {

            position: relative;

            display: block;

            min-width: 0;

            color: inherit;

            text-decoration: none;
        }

        .satori-related-image {

            position: relative;

            width: 75%;

            aspect-ratio: 1 / 1;

            overflow: hidden;

            background: #f6f6f6;

            border-radius: 8px;
        }

        .satori-related-image img {

            width: 100%;
            height: 100%;

            display: block;

            object-fit: contain;

            transition:
                transform .35s ease;
        }

        .satori-related-card:hover
        .satori-related-image img {

            transform:
                scale(1.035);
        }

        .satori-related-overlay {

            position: absolute;

            left: 10px;
            bottom: 10px;

            padding:
                7px 9px;

            background:
                #111827;

            color: #fff;

            font-size: 8px;

            font-weight: 900;

            opacity: 0;

            transform:
                translateY(5px);

            transition: .25s ease;
        }

        .satori-related-card:hover
        .satori-related-overlay {

            opacity: 1;

            transform:
                translateY(0);
        }

        .satori-related-info {

            width: 75%;

            padding-top: 10px;
        }

        .satori-related-info > span {

            display: block;

            color:
                var(--satori-red);

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 1.2px;
        }

        .satori-related-info h3 {

            margin:
                4px 0 0;

            color: #111827;

            font-size: 11px;

            line-height: 1.35;

            font-weight: 700;
        }

        .satori-related-info strong {

            display: block;

            margin-top: 5px;

            color: #111827;

            font-size: 11px;
        }

        /* =================================================
           BANNER EDITORIAL
        ================================================= */

        .satori-editorial {

            position: relative;

            display: grid;

            grid-template-columns:
                1fr 1fr;

            min-height: 430px;

            margin:
                0 0 90px;

            overflow: hidden;

            background: #0d0d0d;

            color: #fff;

            border-radius: 10px;
        }

        .satori-editorial-content {

            position: relative;

            z-index: 2;

            display: flex;

            flex-direction: column;

            justify-content: center;

            padding: 65px;
        }

        .satori-editorial-label {

            margin-bottom: 17px;

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 4px;
        }

        .satori-editorial h2 {

            max-width: 650px;

            margin: 0;

            font-size:
                clamp(36px, 4.5vw, 64px);

            line-height: .88;

            letter-spacing: -3px;

            font-weight: 900;
        }

        .satori-editorial h2 span {

            color:
                var(--satori-red);
        }

        .satori-editorial p {

            max-width: 520px;

            margin:
                22px 0 0;

            color: #aaa;

            font-size: 13px;

            line-height: 1.7;
        }

        .satori-editorial-button {

            align-self: flex-start;

            margin-top: 27px;

            padding:
                13px 18px;

            background:
                var(--satori-red);

            color: #fff;

            text-decoration: none;

            font-size: 9px;

            font-weight: 900;
        }

        .satori-editorial-image {

            position: relative;

            min-height: 430px;

            display: flex;

            align-items: center;
            justify-content: center;

            overflow: hidden;

            background:
                linear-gradient(
                    135deg,
                    #111 0%,
                    #250000 100%
                );
        }

        .satori-editorial-image::before {

            content:
                "TU UNIVERSO";

            position: absolute;

            right: -20px;
            bottom: 0;

            color:
                rgba(255,255,255,.035);

            font-size: 80px;

            font-weight: 900;

            transform:
                rotate(-8deg);
        }

        .satori-editorial-image img {

            position: relative;

            z-index: 2;

            width: 90%;
            height: 90%;

            object-fit: contain;

            filter:
                drop-shadow(
                    0 30px 35px
                    rgba(0,0,0,.5)
                );
        }

        /* =================================================
           NUEVA SECCIÓN:
           LA HISTORIA DETRÁS DEL DISEÑO
        ================================================= */

        .satori-story {

            margin:
                0 0 80px;

            padding:
                65px 0;

            border-top:
                1px solid #e5e5e5;

            border-bottom:
                1px solid #e5e5e5;
        }

        .satori-story-heading > span {

            display: block;

            margin-bottom: 9px;

            color:
                var(--satori-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 3px;
        }

        .satori-story-heading h2 {

            max-width: 850px;

            margin: 0;

            font-size:
                clamp(30px, 4vw, 48px);

            line-height: .94;

            letter-spacing: -2px;
        }

        .satori-story-heading h2 strong {

            color:
                var(--satori-red);
        }

        .satori-story-grid {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 25px;

            margin-top: 42px;
        }

        .satori-story-card {

            min-height: 185px;

            padding: 24px;

            background: #f7f7f7;

            border-left:
                3px solid #111827;
        }

        .satori-story-card span {

            color:
                var(--satori-red);

            font-size: 10px;

            font-weight: 900;

            letter-spacing: 2px;
        }

        .satori-story-card h3 {

            margin:
                16px 0 9px;

            font-size: 14px;

            letter-spacing: .5px;
        }

        .satori-story-card p {

            margin: 0;

            color: #666;

            font-size: 12px;

            line-height: 1.7;
        }

        /* =================================================
           GUÍA DE CUIDADO
        ================================================= */

        .satori-care-guide {

            display: grid;

            grid-template-columns:
                auto 1fr auto;

            align-items: center;

            gap: 25px;

            margin:
                0 0 75px;

            padding:
                26px 30px;

            border:
                1px solid #ddd;

            background: #fafafa;

            border-radius: 8px;
        }

        .satori-care-icon {

            width: 50px;
            height: 50px;

            display: flex;

            align-items: center;
            justify-content: center;

            border:
                1px solid #ddd;

            border-radius: 50%;

            background: #fff;

            font-size: 21px;
        }

        .satori-care-content > span {

            display: block;

            margin-bottom: 7px;

            color:
                var(--satori-red);

            font-size: 8px;

            font-weight: 900;

            letter-spacing: 2px;
        }

        .satori-care-content h2 {

            margin: 0;

            font-size: 24px;

            letter-spacing: -1px;
        }

        .satori-care-content h2 strong {

            color:
                var(--satori-red);
        }

        .satori-care-content p {

            max-width: 650px;

            margin:
                8px 0 0;

            color: #777;

            font-size: 11px;

            line-height: 1.6;
        }

        .satori-care-button {

            display: inline-flex;

            align-items: center;
            justify-content: center;

            padding:
                13px 17px;

            border:
                1px solid #111;

            color: #111;

            background: #fff;

            text-decoration: none;

            font-size: 9px;

            font-weight: 900;

            white-space: nowrap;

            transition: .2s ease;
        }

        .satori-care-button:hover {

            background: #111;

            color: #fff;
        }

        /* =================================================
           BANNER FINAL
        ================================================= */

        .satori-final-banner {

            position: relative;

            overflow: hidden;

            margin:
                0 0 90px;

            padding:
                65px;

            background:
                linear-gradient(
                    110deg,
                    #080808 0%,
                    #180000 55%,
                    #520000 100%
                );

            color: #fff;

            border-radius: 10px;
        }

        .satori-final-banner::after {

            content:
                "SATORII";

            position: absolute;

            right: -30px;
            bottom: -60px;

            color:
                rgba(255,255,255,.04);

            font-size: 145px;

            font-weight: 900;

            transform:
                rotate(-6deg);
        }

        .satori-final-banner div {

            position: relative;

            z-index: 2;
        }

        .satori-final-banner span {

            display: block;

            margin-bottom: 11px;

            color:
                var(--satori-red);

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 3px;
        }

        .satori-final-banner h2 {

            margin: 0;

            font-size:
                clamp(38px, 5vw, 65px);

            line-height: .9;

            letter-spacing: -3px;
        }

        .satori-final-banner h2 strong {

            color:
                var(--satori-red);
        }

        .satori-final-banner p {

            max-width: 500px;

            margin:
                18px 0 24px;

            color: #aaa;

            font-size: 12px;

            line-height: 1.7;
        }

        .satori-final-banner a {

            display: inline-flex;

            padding:
                13px 19px;

            background:
                var(--satori-red);

            color: #fff;

            text-decoration: none;

            font-size: 9px;

            font-weight: 900;
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1100px) {

            .satori-product-layout {

                grid-template-columns:
                    minmax(0, 1fr)
                    minmax(350px, .9fr);

                gap: 35px;
            }

            .satori-main-image {

                height: 470px;
            }

            .satori-related-grid {

                width: 85%;
            }

        }

        @media (max-width: 900px) {

            .satori-product-layout {

                grid-template-columns: 1fr;
            }

            .satori-product-info {

                max-width: 760px;
            }

            .satori-editorial {

                grid-template-columns: 1fr;
            }

            .satori-editorial-image {

                min-height: 360px;
            }

            .satori-story-grid {

                grid-template-columns:
                    1fr 1fr;
            }

            .satori-care-guide {

                grid-template-columns:
                    auto 1fr;
            }

            .satori-care-button {

                grid-column: 2;

                justify-self: start;
            }

        }

        @media (max-width: 700px) {

            .satori-product-page {

                width:
                    calc(100% - 30px);
            }

            .satori-product-layout {

                padding:
                    35px 0 55px;
            }

            .satori-main-image {

                height: auto;

                aspect-ratio: 1 / 1;
            }

            .satori-thumbnails {

                grid-template-columns:
                    repeat(3, 1fr);
            }

            .satori-thumbnail {

                width: 100%;
                height: auto;

                aspect-ratio: 1 / 1;
            }

            .satori-trust-grid {

                grid-template-columns: 1fr;
            }

            .satori-trust-item +
            .satori-trust-item {

                border-left: 0;

                border-top:
                    1px solid #e5e5e5;
            }

            .satori-product-divider-banner {

                min-height: 180px;

                align-items: flex-start;

                flex-direction: column;

                padding:
                    28px 25px;
            }

            .satori-related-grid {

                width: 100%;

                grid-template-columns:
                    repeat(2, 1fr);

                gap: 15px;
            }

            .satori-related-image,
            .satori-related-info {

                width: 90%;
            }

            .satori-editorial {

                margin-bottom:
                    65px;
            }

            .satori-editorial-content {

                padding:
                    45px 30px;
            }

            .satori-editorial-image {

                min-height:
                    330px;
            }

            .satori-story {

                padding:
                    50px 0;
            }

            .satori-story-grid {

                grid-template-columns: 1fr;
            }

            .satori-care-guide {

                grid-template-columns: 1fr;

                margin-bottom:
                    60px;

                padding: 25px;
            }

            .satori-care-button {

                grid-column: auto;
            }

            .satori-final-banner {

                margin-bottom:
                    60px;

                padding:
                    48px 28px;
            }

        }

        @media (max-width: 430px) {

            .satori-product-page {

                width:
                    calc(100% - 20px);
            }

            .satori-product-info h1 {

                font-size: 31px;
            }

            .satori-thumbnails {

                gap: 7px;
            }

            .satori-related-grid {

                gap: 12px;
            }

        }

    `;

}
