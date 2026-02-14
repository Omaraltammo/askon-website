document.addEventListener("DOMContentLoaded", function () {

    /* NAVBAR SCROLL */
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* SCROLL PROGRESS */
    const progress = document.querySelector(".scroll-progress");
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const height = document.body.scrollHeight - window.innerHeight;
        const percent = (scrollTop / height) * 100;
        progress.style.width = percent + "%";
    });

    /* REVEAL */
    const sections = document.querySelectorAll(".section");
    function reveal(){
        sections.forEach(sec=>{
            const top = sec.getBoundingClientRect().top;
            if(top < window.innerHeight - 100){
                sec.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();

    /* COUNTER ANIMATION */
    const counters = document.querySelectorAll(".counter");
    let started = false;

    function runCounters(){
        counters.forEach(counter=>{
            const target = +counter.dataset.target;
            let count = 0;
            const step = target / 120;

            const update = ()=>{
                count += step;
                if(count < target){
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(update);
                }else{
                    counter.innerText = target;
                }
            };
            update();
        });
    }

    window.addEventListener("scroll", ()=>{
        const about = document.querySelector("#about");
        if(!started && about.getBoundingClientRect().top < window.innerHeight-100){
            started = true;
            runCounters();
        }
    });

    /* DYNAMIC LIGHT FOLLOW */
    const ambient = document.querySelector(".ambient-light");
    document.addEventListener("mousemove", (e)=>{
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        ambient.style.background =
            `radial-gradient(circle at ${x}% ${y}%, rgba(185,166,123,.1), transparent 60%)`;
    });

});
