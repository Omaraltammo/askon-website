document.addEventListener("DOMContentLoaded", function () {

    console.log("MAIN.JS LOADED");

    /* ================= EMAILJS ================= */
    emailjs.init("Hfom3ZLXXLSCkZRcL");

    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Contact form not found");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("FORM SUBMIT TRIGGERED");

        emailjs.sendForm(
            "service_6t9szgi",
            "template_1fs4hrl",
            this
        )
        .then(() => {
            alert("Message Sent Successfully!");
            this.reset();
        })
        .catch(error => {
            console.error("EmailJS Error:", error);
            alert("Failed to send message.");
        });
    });

    /* ================= NAVBAR ================= */
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

});
