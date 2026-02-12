document.addEventListener("DOMContentLoaded", function () {

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

    /* NAVBAR CURTAIN */
    const navbar = document.querySelector(".navbar");

    setTimeout(() => navbar.classList.add("hide"), 800);

    document.addEventListener("mousemove", function (e) {
        if (e.clientY <= 80) {
            navbar.classList.remove("hide");
        } else {
            navbar.classList.add("hide");
        }
    });

    /* REVEAL */
    
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

});
