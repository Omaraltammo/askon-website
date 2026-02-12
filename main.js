document.addEventListener("DOMContentLoaded", function () {

    /* ================= EMAILJS ================= */

    emailjs.init("Hfom3ZLXXLSCkZRcL");

    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (typeof grecaptcha === "undefined") return;

            grecaptcha.ready(() => {
                grecaptcha.execute("6LeTTmksAAAAANn8qp-8DKoUxA4HFKc54Hd0oEei", { action: "submit" })
                .then(token => {

                    emailjs.sendForm(
                        "service_6t9szgi",
                        "template_1fs4hrl",
                        form,
                        { 'g-recaptcha-response': token }
                    )
                    .then(() => {
                        alert("Message Sent Successfully!");
                        form.reset();
                    })
                    .catch(() => {
                        alert("Failed to send message.");
                    });

                });
            });
        });
    }

    /* ================= NAVBAR CURTAIN ================= */

    const navbar = document.querySelector(".navbar");

    setTimeout(() => {
        navbar.classList.add("hide");
    }, 800);

    document.addEventListener("mousemove", function (e) {
        if (e.clientY <= 80) {
            navbar.classList.remove("hide");
        } else {
            navbar.classList.add("hide");
        }
    });

    /* ================= REVEAL ON SCROLL ================= */

    const reveals = document.querySelectorAll(".section, .service-card, .hero-content");

    function revealOnScroll() {
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 120) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* ================= ICON PARALLAX ================= */

    const cards = document.querySelectorAll("[data-parallax]");

    cards.forEach(card => {

        const icon = card.querySelector(".icon-svg");
        const strength = parseFloat(card.dataset.parallax) || 0.05;

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = (x - rect.width / 2) * strength;
            const moveY = (y - rect.height / 2) * strength;

            icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        card.addEventListener("mouseleave", () => {
            icon.style.transform = "translate(0,0)";
        });

    });

});
