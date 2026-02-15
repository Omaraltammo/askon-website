document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
   SMART NAVBAR SYSTEM (Curtain + Blur Premium)
===================================================== */

const navbar = document.querySelector(".navbar");

/* إخفاء مبدئي بعد تحميل الصفحة */
setTimeout(() => {
    navbar.classList.add("hide");
}, 800);

/* نظام Curtain (يظهر عند تحريك الماوس للأعلى) */
document.addEventListener("mousemove", (e) => {
    if (e.clientY <= 80) {
        navbar.classList.remove("hide");
    } else {
        navbar.classList.add("hide");
    }
});

/* Smart Blur عند التمرير */
window.addEventListener("scroll", () => {

    /* تفعيل الـ Glass Effect */
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


    /* SCROLL PROGRESS */
    const progress=document.querySelector(".scroll-progress");
    window.addEventListener("scroll",()=>{
        const height=document.body.scrollHeight-window.innerHeight;
        const percent=(window.scrollY/height)*100;
        progress.style.width=percent+"%";
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
                icon.style.transform=
                    `translate(${x*0.05}px, ${y*0.05}px)`;
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
        span.style.marginRight = "8px"; // يحافظ على المسافة
        title.appendChild(span);
    });
});

});
/* APPROACH PARALLAX */

const approachBg = document.querySelector(".approach-bg-title");

window.addEventListener("scroll", () => {

    const section = document.querySelector(".approach-editorial");
    const rect = section.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    if(rect.top < windowHeight && rect.bottom > 0){

        const offset = (windowHeight - rect.top) * 0.08;

        approachBg.style.transform =
            `translate(-50%, -50%) translateY(${offset}px)`;
    }

});
window.addEventListener("scroll", () => {
    const divider = document.querySelector(".vision-divider");
    if(!divider) return;

    const offset = window.scrollY * 0.04;
    divider.style.transform = `translateY(${offset}px)`;
});
