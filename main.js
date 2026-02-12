{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset178 GeezaPro;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh9000\viewkind0
\pard\tqr\tx720\tqr\tx1440\tqr\tx2160\tqr\tx2880\tqr\tx3600\tqr\tx4320\tqr\tx5040\tqr\tx5760\tqr\tx6480\tqr\tx7200\tqr\tx7920\tqr\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener("DOMContentLoaded", function () \{\
\
    /* ================= EMAILJS ================= */\
    emailjs.init("Hfom3ZLXXLSCkZRcL");\
\
    document.getElementById("contact-form")\
    .addEventListener("submit", function (event) \{\
        event.preventDefault();\
\
        emailjs.sendForm(\
            "service_6t9szgi",\
            "template_1fs4hrl",\
            this\
        )\
        .then(() => \{\
            alert("Message Sent Successfully!");\
            this.reset();\
        \})\
        .catch(error => \{\
            console.error("EmailJS Error:", error);\
            alert("Failed to send message.");\
        \});\
    \});\
\
    /* ================= NAVBAR ================= */\
    const navbar = document.querySelector(".navbar");\
\
    setTimeout(() => \{\
        navbar.classList.add("hide");\
    \}, 800);\
\
    document.addEventListener("mousemove", function (e) \{\
        if (e.clientY <= 80) \{\
            navbar.classList.remove("hide");\
        \} else \{\
            navbar.classList.add("hide");\
        \}\
    \});\
\
\});\
}