"use strict";

/* LOADER */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if(loader) {
        setTimeout(()=>{
            loader.classList.add("hidden");
        }, 800);
    }
});

/* FORCE HOME URL ON RELOAD */
window.addEventListener("load", function(){
    if(window.location.hash){
        history.replaceState(null, null, " ");
    }
});

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LANGUAGE CHECKER (التحقق من لغة الصفحة)
    ===================================================== */
    // هنا السكربت يفحص إذا كانت الصفحة عربية أو إنكليزية
    const isArabic = document.documentElement.lang === "ar";
    
    // تحديد مسار الملفات بناءً على اللغة
    const headerPath = isArabic ? "/ar/header.html" : "/header.html";
    const footerPath = isArabic ? "/ar/footer.html" : "/footer.html";

    /* =====================================================
       LOAD GLOBAL HEADER & FOOTER AND INIT MENU
    ===================================================== */
    // جلب الهيدر المناسب للغة
    fetch(headerPath)
    .then(res => res.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        const navbar = document.querySelector(".navbar");
        const menuToggle = document.getElementById('menuToggle');
        const curtainMenu = document.getElementById('curtainMenu');

        if(navbar) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 40) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            });
        }

        if(menuToggle && curtainMenu) {
            menuToggle.addEventListener('click', () => {
                document.body.classList.toggle('menu-open');
            });

            const curtainLinks = curtainMenu.querySelectorAll('a');
            curtainLinks.forEach(link => {
                link.addEventListener('click', () => {
                    document.body.classList.remove('menu-open');
                });
            });
        }
    });

    // جلب الفوتر المناسب للغة
    fetch(footerPath)
    .then(res => res.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
    });

    /* =====================================================
       OTHER SCRIPTS (Scroll, Parallax, Forms, etc.)
    ===================================================== */

    /* SCROLL PROGRESS */
    const progress=document.querySelector(".scroll-progress");
    window.addEventListener("scroll",()=>{
        const height=document.body.scrollHeight-window.innerHeight;
        const percent=(window.scrollY/height)*100;
        if(progress) progress.style.width=percent+"%";
    });

    /* REVEAL */
    const reveals=document.querySelectorAll(".section,.service-card,.hero-content");
    function reveal(){
        reveals.forEach(el=>{
            if(el.getBoundingClientRect().top<window.innerHeight-120){
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll",reveal);
    reveal();

    /* ICON PARALLAX */
    const cards=document.querySelectorAll(".service-card");
    cards.forEach(card=>{
        const icon=card.querySelector(".icon-svg");
        card.addEventListener("mousemove",e=>{
            const rect=card.getBoundingClientRect();
            const x=e.clientX-rect.left-rect.width/2;
            const y=e.clientY-rect.top-rect.height/2;
            if(icon){
                icon.style.transform=`translate(${x*0.05}px, ${y*0.05}px)`;
            }
        });
        card.addEventListener("mouseleave",()=>{
            if(icon) icon.style.transform="";
        });
    });

   /* STAGGER TITLE SPLIT (WORD SAFE VERSION) */
    document.querySelectorAll(".reveal-title").forEach(title=>{
        const words = title.innerText.split(" ");
        title.innerHTML = "";

        words.forEach((word,i)=>{
            const span = document.createElement("span");
            span.innerText = word;
            span.style.transitionDelay = (i * 0.12) + "s";
            span.style.display = "inline-block";
            span.style.marginRight = "8px"; 
            title.appendChild(span);
        });
    });

    /* APPROACH PARALLAX */
    const approachBg = document.querySelector(".approach-bg-title");
    if(approachBg) {
        window.addEventListener("scroll", () => {
            const section = document.querySelector(".approach-editorial");
            if(section) {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if(rect.top < windowHeight && rect.bottom > 0){
                    const offset = (windowHeight - rect.top) * 0.08;
                    approachBg.style.transform = `translate(-50%, -50%) translateY(${offset}px)`;
                }
            }
        });
    }

    /* VISION DIVIDER PARALLAX */
    window.addEventListener("scroll", () => {
        const divider = document.querySelector(".vision-divider");
        if(divider) {
            const offset = window.scrollY * 0.04;
            divider.style.transform = `translateY(${offset}px)`;
        }
    });

    /* =====================================================
       TURNSTILE + EMAILJS FINAL VERSION (FIXED & TRANSLATED)
    ===================================================== */
    const form = document.getElementById("contact-form");
    if(form){
        form.addEventListener("submit", async function(e){
            e.preventDefault();

            /* TURNSTILE FIX */
            const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]')?.value;
            if(!turnstileResponse){
                // رسالة منبثقة تتغير حسب اللغة
                alert(isArabic ? "الرجاء التحقق من أنك لست روبوتاً" : "Please verify you are human");
                return;
            }

            /* Honeypot */
            const honeypot = form.querySelector('input[name="website"]').value;
            if(honeypot){
                return;
            }

            /* EMAILJS SEND */
            emailjs.sendForm("service_6t9szgi", "template_1fs4hrl", this, "Hfom3ZLXXLSCkZRcL")
            .then(function(){
                // رسالة النجاح تتغير حسب اللغة
                alert(isArabic ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully");
                form.reset();
                if(window.turnstile){
                    turnstile.reset();
                }
            })
            .catch(function(error){
                // رسالة الخطأ تتغير حسب اللغة
                alert(isArabic ? "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً." : "Error sending message");
                console.log(error);
            });
        });
    }

});
