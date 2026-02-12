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

    setTimeout(() => navbar.classList.add("hide"), 800);

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


    /* ================= MAGNETIC + 3D PARALLAX (APPLE GRADE) ================= */

    const cards = document.querySelectorAll(".service-card");

    cards.forEach(card => {

        const icon = card.querySelector(".icon-svg");
        let rafId = null;

        function animate(e) {

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (-y / rect.height) * 12;
            const rotateY = (x / rect.width) * 12;

            card.style.transform =
                `translateY(-18px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            if (icon) {
                icon.style.transform =
                    `translate(${x * 0.06}px, ${y * 0.06}px)`;
            }
        }

        card.addEventListener("mousemove", (e) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => animate(e));
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            if (icon) icon.style.transform = "";
        });

    });

});
