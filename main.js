"use strict";

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
       LOAD GLOBAL HEADER & FOOTER AND INIT MENU (النسخة المسرّعة)
    ===================================================== */
    // جلب الهيدر والفوتر بنفس اللحظة، وإخفاء شاشة التحميل فقط بعد اكتمالهما
    Promise.all([
        fetch(headerPath).then(res => res.text()),
        fetch(footerPath).then(res => res.text())
    ])
    .then(([headerData, footerData]) => {
        // 1. زرع الهيدر والفوتر في الصفحة
        document.body.insertAdjacentHTML("afterbegin", headerData);
        document.body.insertAdjacentHTML("beforeend", footerData);

        // 2. تعريف العناصر بعد ما صارت موجودة بالصفحة
        const navbar = document.querySelector(".navbar");
        const menuToggle = document.getElementById('menuToggle');
        const curtainMenu = document.getElementById('curtainMenu');

        // 3. تأثير الـ Blur عند النزول (Scrolled)
        if(navbar) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 40) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            });
        }

        // 4. تشغيل الستارة عند الضغط على الزر
        if(menuToggle && curtainMenu) {
            menuToggle.addEventListener('click', () => {
                document.body.classList.toggle('menu-open');
            });

            // إغلاق الستارة عند الضغط على أي رابط بداخلها
            const curtainLinks = curtainMenu.querySelectorAll('a');
            curtainLinks.forEach(link => {
                link.addEventListener('click', () => {
                    document.body.classList.remove('menu-open');
                });
            });
        }

        // 5. إخفاء اللودر بسلاسة بعد أن أصبح الهيدر والفوتر جاهزين تماماً
        const loader = document.getElementById("loader");
        if(loader) {
            setTimeout(()=>{
                loader.classList.add("hidden");
            }, 300); // 300 ملي ثانية كافية جداً لضمان نعومة الظهور
        }
    })
    .catch(error => {
        console.error("Error loading header/footer:", error);
        // في حال حدوث خطأ بالإنترنت، نخفي اللودر حتى لا يعلق الموقع
        const loader = document.getElementById("loader");
        if(loader) loader.classList.add("hidden");
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
    // تأخير بسيط لتشغيل الأنيميشن كي لا يسبق اختفاء اللودر
    setTimeout(reveal, 400); 

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
