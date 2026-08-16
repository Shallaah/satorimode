/* =====================================================
   SATORII · NEWSLETTER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const newsletter = document.getElementById("footerNewsletter");

    if (!newsletter) return;

    newsletter.addEventListener("submit", (event) => {

        event.preventDefault();

        const emailInput = document.getElementById("footerEmail");

        if (!emailInput) return;

        const email = emailInput.value.trim();

        if (!email) {
            return;
        }

        if (!emailInput.checkValidity()) {
            emailInput.reportValidity();
            return;
        }

        /*
         * Por ahora guardamos el correo localmente.
         * Más adelante podemos conectarlo a un servicio
         * real de newsletter.
         */

        const subscribers =
            JSON.parse(
                localStorage.getItem("satoriiSubscribers") || "[]"
            );

        if (!subscribers.includes(email)) {

            subscribers.push(email);

            localStorage.setItem(
                "satoriiSubscribers",
                JSON.stringify(subscribers)
            );

        }

        emailInput.value = "";

        alert(
            "¡Bienvenido al Clan Satorii! 🔴"
        );

    });

});
