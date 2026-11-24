"use strict";
(function () {
  var AR = document.documentElement.lang === "ar";
  var pre = AR ? "/ar" : "";
  var T = AR ? {
    work: "أعمالنا", services: "خدماتنا", about: "من نحن", contact: "تواصل", quote: "اطلب عرض سعر", menu: "القائمة",
    other: "EN", otherLabel: "English", tag: "نصوّر. نمنتج. نحكي القصة.",
    sending: "جاري الإرسال...", ok: "وصلنا طلبك. سنرد عليك قريباً.",
    errSvc: "اختر خدمة واحدة على الأقل.", errBot: "أكّد أنك لست روبوتاً ثم أعد المحاولة.",
    errSend: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا على info@askonltd.com.", wait: "انتظر لحظات قبل إرسال طلب جديد.",
    send: "إرسال", skip: "انتقل إلى المحتوى"
  } : {
    work: "Work", services: "Services", about: "About", contact: "Contact", quote: "Get a quote", menu: "Menu",
    other: "AR", otherLabel: "العربية", tag: "We shoot. We edit. We tell the story.",
    sending: "Sending...", ok: "Request received. We will reply soon.",
    errSvc: "Choose at least one service.", errBot: "Confirm you are human, then try again.",
    errSend: "Could not send. Try again or email info@askonltd.com.", wait: "Please wait a moment before sending again.",
    send: "Send", skip: "Skip to content"
  };

  var CFG = { service: "service_6t9szgi", key: "Hfom3ZLXXLSCkZRcL", contactTpl: "template_1fs4hrl", quoteTpl: "template_6akujta" };

  /* Header + footer: one place to edit for every page in this language */
  var brand = '<a class="brand" href="' + pre + '/" aria-label="Askon Creative Agency">' +
    '<img src="/assets/askon-symbol-reversed.svg" alt="" width="34" height="30">' +
    '<span class="wordmark" dir="ltr">ASK<b>ON</b></span></a>';
  var path = location.pathname.replace(/^\/ar(\/|$)/, "/");
  var otherHref = AR ? path : "/ar" + (path === "/" ? "/" : path);
  var h = document.getElementById("site-header");
  if (h) {
    h.className = "site-header";
    h.innerHTML = '<div class="wrap">' + brand +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">' + T.menu + '</button>' +
      '<nav class="nav" id="nav" aria-label="Main">' +
      '<a href="' + pre + '/#work">' + T.work + '</a><a href="' + pre + '/#services">' + T.services + '</a>' +
      '<a href="' + pre + '/#about">' + T.about + '</a><a href="' + pre + '/#contact">' + T.contact + '</a>' +
      '<a class="lang" href="' + otherHref + '" hreflang="' + (AR ? "en" : "ar") + '" lang="' + (AR ? "en" : "ar") + '" aria-label="' + T.otherLabel + '">' + T.other + '</a>' +
      '<a class="btn" href="' + pre + '/quote.html">' + T.quote + '</a></nav></div>';
    var mb = h.querySelector(".menu-btn"), nav = h.querySelector(".nav");
    mb.addEventListener("click", function () {
      var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o);
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); } });
  }
  var f = document.getElementById("site-footer");
  if (f) {
    f.className = "site-footer";
    f.innerHTML = '<div class="wrap">' + brand + '<p>' + T.tag + '</p>' +
      '<p>Damascus<span class="sep"></span><a class="ltr" href="mailto:info@askonltd.com">info@askonltd.com</a></p>' +
      '<p>&copy; 2026 Askon Creative Agency</p></div>';
  }

  /* Forms: honeypot + Turnstile token check + short cooldown, sent through EmailJS */
  var last = 0;
  function wire(form, tpl) {
    if (!form) return;
    var status = form.querySelector(".status");
    function say(msg, cls) { status.textContent = msg; status.className = "status" + (cls ? " " + cls : ""); }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector('[name="website"]').value) return;          // honeypot
      var svc = form.querySelector("#selected-services");
      if (svc) {
        var picked = [].map.call(form.querySelectorAll('input[name="svc"]:checked'), function (i) { return i.value; });
        if (!picked.length) { say(T.errSvc, "err"); return; }
        svc.value = picked.join(", ");
      }
      var tok = form.querySelector('[name="cf-turnstile-response"]');
      if (!tok || !tok.value) { say(T.errBot, "err"); return; }
      if (Date.now() - last < 30000) { say(T.wait, "err"); return; }
      if (!window.emailjs) { say(T.errSend, "err"); return; }
      var btn = form.querySelector('button[type="submit"]'), label = btn.textContent;
      btn.disabled = true; btn.textContent = T.sending; say("");
      window.emailjs.sendForm(CFG.service, tpl, form, { publicKey: CFG.key }).then(function () {
        last = Date.now(); say(T.ok, "ok"); form.reset();
        if (window.turnstile) window.turnstile.reset();
      }).catch(function () { say(T.errSend, "err"); }).then(function () { btn.disabled = false; btn.textContent = label; });
    });
  }
  wire(document.getElementById("contact-form"), CFG.contactTpl);
  wire(document.getElementById("quote-form"), CFG.quoteTpl);
})();
