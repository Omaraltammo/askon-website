document.addEventListener("DOMContentLoaded", function () {

    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        grecaptcha.ready(() => {
            grecaptcha.execute("YOUR_RECAPTCHA_KEY", { action: "submit" })
            .then(token => {

                emailjs.sendForm(
                    "YOUR_SERVICE_ID",
                    "YOUR_TEMPLATE_ID",
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

    // NAVBAR CURTAIN
    const navbar = document.querySelector(".navbar");

    setTimeout(() => navbar.classList.add("hide"), 800);

    document.addEventListener("mousemove", function (e) {
        if (e.clientY <= 80) {
            navbar.classList.remove("hide");
        } else {
            navbar.classList.add("hide");
        }
    });

    // REVEAL ON SCROLL
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const trigger = window.innerHeight - 100;

        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < trigger) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});
