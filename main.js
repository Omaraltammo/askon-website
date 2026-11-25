"use strict";
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var AR = root.lang === "ar";
  var T = AR ? {
    sending: "جاري الإرسال...", ok: "وصلنا طلبك. سنرد عليك قريباً.",
    errReq: "أكمل الحقول المطلوبة ثم أعد المحاولة.",
    errSvc: "اختر خدمة واحدة على الأقل.", errBot: "أكّد أنك لست روبوتاً ثم أعد المحاولة.",
    errSend: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا على info@askonltd.com.", wait: "انتظر لحظات قبل إرسال طلب جديد."
  } : {
    sending: "Sending...", ok: "Request received. We will reply soon.",
    errReq: "Please complete the required fields and try again.",
    errSvc: "Choose at least one service.", errBot: "Confirm you are human, then try again.",
    errSend: "Could not send. Try again or email info@askonltd.com.", wait: "Please wait a moment before sending again."
  };

  var CFG = { service: "service_6t9szgi", key: "Hfom3ZLXXLSCkZRcL", contactTpl: "template_1fs4hrl", quoteTpl: "template_6akujta" };

  /* Mobile menu (header and footer are rendered by build.py, so they work without JS) */
  var mb = document.querySelector(".menu-btn"), nav = document.querySelector(".nav");
  if (mb && nav) {
    function setOpen(o) { nav.classList.toggle("open", o); mb.setAttribute("aria-expanded", o ? "true" : "false"); }
    mb.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); mb.focus(); } });
  }

  /* Forms: required-field check, honeypot, Turnstile token check, short cooldown, sent through EmailJS */
  var last = 0;
  function wire(form, tpl) {
    if (!form) return;
    var status = form.querySelector(".status");
    function say(msg, cls) { status.textContent = msg; status.className = "status" + (cls ? " " + cls : ""); }
    function clearMark(e) { var t = e.target; if (t.setCustomValidity) t.setCustomValidity(""); t.removeAttribute("aria-invalid"); var o = form.querySelector(".opts"); if (o && t.name === "svc") o.removeAttribute("aria-invalid"); }
    form.addEventListener("input", clearMark);
    form.addEventListener("change", clearMark);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector('[name="website"]').value) return;          // honeypot

      // 1. required fields (the form has novalidate, so we check here). Whitespace-only counts as empty.
      [].forEach.call(form.querySelectorAll("input[required],textarea[required]"), function (el) {
        if (el.type !== "email" && el.type !== "checkbox") el.setCustomValidity(el.value.trim() ? "" : " ");
      });
      var bad = [].slice.call(form.querySelectorAll("input:invalid,select:invalid,textarea:invalid"));
      if (bad.length) {
        bad.forEach(function (el) { el.setAttribute("aria-invalid", "true"); });
        say(T.errReq, "err"); bad[0].focus(); return;
      }

      // 2. quote form: at least one service; mirror it into project_type for the email template
      var svc = form.querySelector("#selected-services");
      if (svc) {
        var picked = [].map.call(form.querySelectorAll('input[name="svc"]:checked'), function (i) { return i.value; });
        if (!picked.length) {
          var o = form.querySelector(".opts"); if (o) o.setAttribute("aria-invalid", "true");
          say(T.errSvc, "err"); var f = form.querySelector('input[name="svc"]'); if (f) f.focus(); return;
        }
        svc.value = picked.join(", ");
        var pt = form.querySelector("#project-type"); if (pt) pt.value = svc.value;
      }

      // 3. Turnstile, cooldown, EmailJS
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

/* Edit timeline: fixed bar, playhead follows scroll, clips follow the page sections */
(function () {
  var secs = [].slice.call(document.querySelectorAll("main > section[data-clip]"));
  if (!secs.length) return;
  var bar = document.createElement("nav");
  bar.className = "timeline"; bar.setAttribute("aria-label", document.documentElement.lang === "ar" ? "أقسام الصفحة" : "Page sections");
  bar.innerHTML = '<span class="tl-tc" aria-hidden="true">00:00:00:00</span><div class="tl-track">' +
    secs.map(function (s) { return '<a class="tl-clip" href="#' + s.id + '">' + s.getAttribute("data-clip") + '</a>'; }).join("") +
    '<span class="tl-head" aria-hidden="true"></span></div>';
  document.body.appendChild(bar); document.body.classList.add("has-bar");
  var clips = [].slice.call(bar.querySelectorAll(".tl-clip")), head = bar.querySelector(".tl-head");
  var tcs = [].slice.call(document.querySelectorAll("[data-tc]")).concat(bar.querySelector(".tl-tc"));
  var tick = false, FPS = 25, TOTAL = 150;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function size() { clips.forEach(function (c, i) { c.style.flexGrow = secs[i].offsetHeight; }); }
  function draw() {
    tick = false;
    var max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    head.style.left = (p * 100) + "%";
    var f = Math.floor(p * TOTAL * FPS), t = pad(Math.floor(f / FPS / 3600)) + ":" + pad(Math.floor(f / FPS / 60) % 60) + ":" + pad(Math.floor(f / FPS) % 60) + ":" + pad(f % FPS);
    tcs.forEach(function (e) { e.textContent = t; });
    var y = scrollY + innerHeight * 0.4, cur = 0;
    secs.forEach(function (s, i) { if (s.offsetTop <= y) cur = i; });
    clips.forEach(function (c, i) { c.classList.toggle("on", i === cur); });
  }
  function req() { if (!tick) { tick = true; requestAnimationFrame(draw); } }
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", function () { size(); req(); });
  addEventListener("load", function () { size(); req(); });
  size(); draw();
})();
