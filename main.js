document.addEventListener("DOMContentLoaded",()=>{

/* EMAIL */
emailjs.init("Hfom3ZLXXLSCkZRcL");
const form=document.getElementById("contact-form");
if(form){
form.addEventListener("submit",e=>{
e.preventDefault();
grecaptcha.ready(()=>{
grecaptcha.execute("6LeTTmksAAAAANn8qp-8DKoUxA4HFKc54Hd0oEei",{action:"submit"})
.then(token=>{
emailjs.sendForm("service_6t9szgi","template_1fs4hrl",form,{
"g-recaptcha-response":token
}).then(()=>{alert("Message Sent");form.reset();});
});
});
});
}

/* NAVBAR */
const navbar=document.querySelector(".navbar");
setTimeout(()=>navbar.classList.add("hide"),900);
document.addEventListener("mousemove",e=>{
e.clientY<80?navbar.classList.remove("hide"):navbar.classList.add("hide");
});

/* REVEAL + STAGGER */
const observer=new IntersectionObserver(entries=>{
entries.forEach((entry,i)=>{
if(entry.isIntersecting){
setTimeout(()=>entry.target.classList.add("visible"),i*120);
observer.unobserve(entry.target);
}
});
},{threshold:.18});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* LOTTIE */
lottie.loadAnimation({
container:document.getElementById("lottie"),
renderer:"svg",
loop:true,
autoplay:true,
path:"lottie.json"
});

});
