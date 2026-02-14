document.addEventListener("DOMContentLoaded", function () {

    /* NAVBAR CURTAIN */
    const navbar = document.querySelector(".navbar");
    setTimeout(()=>navbar.classList.add("hide"),800);

    document.addEventListener("mousemove",e=>{
        if(e.clientY<=80){
            navbar.classList.remove("hide");
        }else{
            navbar.classList.add("hide");
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
    /* ICON PARALLAX INSIDE CARD */
    const cards = document.querySelectorAll(".service-card");
    
    cards.forEach(card => {
    
        const icon = card.querySelector(".icon-svg");
    
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
    
            if(icon){
                icon.style.transform =
                    `translate(${x * 0.06}px, ${y * 0.06}px)`;
            }
        });

    card.addEventListener("mouseleave", () => {
        if(icon) icon.style.transform = "";
    });

});

    /* SMOOTH ANCHOR (بصمتي الخاصة 👑) */
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener("click",function(e){
            e.preventDefault();
            const target=document.querySelector(this.getAttribute("href"));
            window.scrollTo({
                top:target.offsetTop-60,
                behavior:"smooth"
            });
        });
    });

    /* AMBIENT LIGHT FOLLOW */
    const ambient=document.querySelector(".ambient-light");
    document.addEventListener("mousemove",e=>{
        const x=(e.clientX/window.innerWidth)*100;
        const y=(e.clientY/window.innerHeight)*100;
        ambient.style.background=
        `radial-gradient(circle at ${x}% ${y}%, rgba(185,166,123,.1), transparent 60%)`;
    });

});
