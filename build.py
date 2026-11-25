#!/usr/bin/env python3
"""Askon site generator. Run:  python3 build.py
Writes: index.html, quote.html, 404.html, ar/index.html, ar/quote.html, sitemap.xml
All page text lives in C below (both languages). Menu behaviour lives in main.js.
"""
import os, json, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = "https://askonltd.com"
SK = "0x4AAAAAACewk_qC2RQSIRfS"          # Cloudflare Turnstile site key

# ---------------------------------------------------------------- content switches
# Showreel: put the YouTube video id here (e.g. "abc123XYZ_0"). Empty = decorative viewfinder, no fake player.
SHOWREEL_ID = ""
# Selected work: add real projects and the section, menu link and hero button appear automatically.
# Each item: (youtube_id, en_title, en_meta, ar_title, ar_meta)
WORK = [
    # ("VIDEO_ID", "Project name", "Client, service", "اسم المشروع", "العميل، الخدمة"),
]

CSP = ("default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://challenges.cloudflare.com; "
       "style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; "
       "img-src 'self' data:; connect-src 'self' https://api.emailjs.com; "
       "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com; "
       "object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests")
F_ARCHIVO = "family=Archivo:wdth,wght@62..125,400..900"
F_PLEX = "family=IBM+Plex+Sans+Arabic:wght@400;500;700"
def fonts(ar):  # Arabic font is only requested on Arabic pages
    return "https://fonts.googleapis.com/css2?" + F_ARCHIVO + ("&" + F_PLEX if ar else "") + "&display=swap"

C = {
"en": dict(
 name="Askon Creative Agency", skip="Skip to content", menu="Menu",
 nav_work="Work", nav_services="Services", nav_about="About", nav_contact="Contact", other="AR", other_label="العربية",
 tag="We shoot. We edit. We tell the story.", city="Damascus", copy="&copy; 2026 Askon Creative Agency",
 t="Askon Creative Agency | Film & photo production in Damascus",
 d="Askon Creative is a Damascus production company. Documentaries, commercials, event coverage and photography, shot and edited by one team.",
 h1a="Keep on", h1b="asking", tl="Intro",
 lead="Askon Creative is a production company in Damascus. We make documentaries, commercials and event films, and we shoot and edit them ourselves.",
 b1="Get a quote", b2="See our work", rec="REC",
 wh="Selected work", wp="Projects we have shot and edited.",
 sh="What we make", sp="Four services. Every one includes editing, colour grading and sound.",
 svc=[("Documentaries and reports","Short films about people, organisations and places. From the first interview to the final cut.","Story films, project reports, interviews"),
      ("Commercials and brand films","Adverts and company films that explain what you do and look the part.","Adverts, company films, campaigns"),
      ("Event and exhibition coverage","Video and photo coverage of exhibitions, conferences and launches, delivered fast.","Multi-camera shoots, highlights, same-week delivery"),
      ("Photography","Product, corporate portrait and location photography with a cinematic eye.","Products, portraits, places")],
 common="Post-production on every project: editing, colour grading, sound mix, motion graphics.",
 pr="How we work", prp="Every project follows the same four steps.",
 steps=[("Brief","We start by asking. Goals, audience, deadline."),("Shoot","Our crew and cameras, on location."),("Edit","Cut, colour and sound, all in-house."),("Deliver","Final files for web, screens and social, on time.")],
 ah="A production company built in Damascus",
 ap1="Askon Creative is a film and photo production company based in Damascus. We make documentaries, commercials and event films for organisations, exhibitions and businesses across Syria.",
 ap2="We care about how the work looks and how fast it arrives. Every project gets a clear idea, a sharp image, clean sound and a delivery date we keep.",
 facts=[("Fast","Short turnaround without cutting corners."),("Sharp","High-quality image and sound on every job."),("Rooted","Based in Damascus, telling stories from Syria.")],
 ch="Tell us about your project", mail="Email", tel="Phone", addr="Office",
 address="64/26 Al-Adawi Commercial Complex, Al-Adawi District, Damascus, Syria",
 n="Name", e="Email", m="Message", send="Send message",
 qt="Get a quote | Askon Creative Agency", qd="Tell us about your film or photo project and we will send you a proposal.",
 qh="Get a quote", qp="Tell us what you need. We will reply with a proposal.",
 s1="What do you need?", svcs=["Documentary or report","Commercial or brand film","Event or exhibition coverage","Photography","Other"],
 s2="About the project", date="Preferred date", loc="City or location", desc="What should we know about the project?",
 s3="About you", fn="Full name", co="Company or organisation", em="Work email", ph2="Phone or WhatsApp", qs="Send request",
 nf_t="Page not found | Askon Creative Agency", nf_h="Page not found", nf_p="This page does not exist.", nf_a="Go to the homepage",
 og_locale="en_US", og_alt="Askon Creative Agency logo"),
"ar": dict(
 name="آسكون كرييتف", skip="انتقل إلى المحتوى", menu="القائمة",
 nav_work="أعمالنا", nav_services="خدماتنا", nav_about="من نحن", nav_contact="تواصل", other="EN", other_label="English",
 tag="نصوّر. نمنتج. نحكي القصة.", city="دمشق", copy="&copy; 2026 آسكون كرييتف",
 t="آسكون كرييتف | إنتاج أفلام وتصوير في دمشق",
 d="آسكون كرييتف شركة إنتاج في دمشق. أفلام وثائقية وإعلانات وتغطية فعاليات وتصوير فوتوغرافي، يصوّرها ويمنتجها فريق واحد.",
 h1a="خليك عم", h1b="تسأل", tl="المقدمة",
 lead="آسكون كرييتف شركة إنتاج في دمشق. نصنع أفلاماً وثائقية وإعلانات وأفلام فعاليات، ونصوّرها ونمنتجها بأنفسنا.",
 b1="اطلب عرض سعر", b2="شاهد أعمالنا", rec="REC",
 wh="أعمال مختارة", wp="مشاريع صوّرناها ومنتجناها.",
 sh="ماذا نصنع", sp="أربع خدمات. كل واحدة تشمل المونتاج وتصحيح الألوان والصوت.",
 svc=[("أفلام وثائقية وتقارير","أفلام قصيرة عن الناس والمؤسسات والأماكن. من المقابلة الأولى إلى المونتاج النهائي.","أفلام قصصية، تقارير مشاريع، مقابلات"),
      ("إعلانات وأفلام تعريفية","إعلانات وأفلام للشركات تشرح ما تفعله وتظهر بمستواه.","إعلانات، أفلام شركات، حملات"),
      ("تغطية الفعاليات والمعارض","تغطية فيديو وصور للمعارض والمؤتمرات والإطلاقات، وتسليم سريع.","تصوير متعدد الكاميرات، ملخصات، تسليم خلال أيام"),
      ("التصوير الفوتوغرافي","تصوير منتجات وبورتريه للشركات وتصوير أماكن بعين سينمائية.","منتجات، بورتريه، أماكن")],
 common="مونتاج وما بعد الإنتاج في كل مشروع: مونتاج، تصحيح ألوان، مكساج صوت، موشن غرافيك.",
 pr="كيف نعمل", prp="كل مشروع يمر بنفس الخطوات الأربع.",
 steps=[("الفكرة","نبدأ بالأسئلة: الهدف، الجمهور، الموعد."),("التصوير","فريقنا وكاميراتنا في موقعك."),("المونتاج","قص وألوان وصوت، كله عندنا."),("التسليم","ملفات نهائية للويب والشاشات والسوشيال، في موعدها.")],
 ah="شركة إنتاج وُلدت في دمشق",
 ap1="آسكون كرييتف شركة إنتاج أفلام وتصوير مقرها دمشق. نصنع أفلاماً وثائقية وإعلانات وأفلام فعاليات للمؤسسات والمعارض والشركات في سوريا.",
 ap2="يهمنا كيف يبدو العمل وكم يسرع وصوله. لكل مشروع فكرة واضحة وصورة حادة وصوت نظيف وموعد تسليم نلتزم به.",
 facts=[("سريعون","تسليم قصير دون التفريط بالجودة."),("دقيقون","جودة عالية في الصورة والصوت، في كل عمل."),("من دمشق","مقرنا في دمشق، ونحكي قصصاً من سوريا.")],
 ch="حدّثنا عن مشروعك", mail="البريد الإلكتروني", tel="الهاتف", addr="المكتب",
 address="مجمع العدوي التجاري ٦٤/٢٦، حي العدوي، دمشق، سوريا",
 n="الاسم", e="البريد الإلكتروني", m="رسالتك", send="إرسال الرسالة",
 qt="اطلب عرض سعر | آسكون كرييتف", qd="حدّثنا عن مشروعك المرئي أو الفوتوغرافي وسنرسل لك عرضاً.",
 qh="اطلب عرض سعر", qp="أخبرنا بما تحتاجه وسنرد عليك بعرض.",
 s1="ماذا تحتاج؟", svcs=["فيلم وثائقي أو تقرير","إعلان أو فيلم تعريفي","تغطية فعالية أو معرض","تصوير فوتوغرافي","أخرى"],
 s2="عن المشروع", date="التاريخ المفضل", loc="المدينة أو الموقع", desc="ماذا يجب أن نعرف عن المشروع؟",
 s3="عنك", fn="الاسم الكامل", co="الشركة أو المنظمة", em="البريد الإلكتروني للعمل", ph2="الهاتف أو واتساب", qs="إرسال الطلب",
 og_locale="ar_AR", og_alt="شعار آسكون كرييتف"),
}

# ---------------------------------------------------------------- shared pieces
def head(lang, title, desc, en_path, ar_path, jsonld=None):
    c = C[lang]; ar = lang == "ar"; cur = SITE + (ar_path if ar else en_path)
    other = "en" if ar else "ar"
    ld = ('<script type="application/ld+json">' + json.dumps(jsonld, ensure_ascii=False) + '</script>\n') if jsonld else ""
    return f'''<!DOCTYPE html>
<html lang="{lang}" dir="{'rtl' if ar else 'ltr'}">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="{CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#211029">
<link rel="canonical" href="{cur}">
<link rel="alternate" hreflang="en" href="{SITE+en_path}">
<link rel="alternate" hreflang="ar" href="{SITE+ar_path}">
<link rel="alternate" hreflang="x-default" href="{SITE+en_path}">
<meta property="og:site_name" content="{c['name']}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="{cur}">
<meta property="og:locale" content="{c['og_locale']}">
<meta property="og:locale:alternate" content="{C[other]['og_locale']}">
<meta property="og:image" content="{SITE}/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{c['og_alt']}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{SITE}/assets/og-image.jpg">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{fonts(ar)}">
<link rel="stylesheet" href="/style.css">
{ld}</head>
'''

def brand(lang, h):
    pre = "/ar" if lang == "ar" else ""
    w = round(h * 494.56 / 171.14)
    return (f'<a class="brand" href="{pre}/" aria-label="{C[lang]["name"]}">'
            f'<img src="/assets/askon-logo-reversed.svg" alt="" width="{w}" height="{h}"></a>')

def header(lang, en_path, ar_path, with_work):
    c = C[lang]; ar = lang == "ar"; pre = "/ar" if ar else ""
    other_href = en_path if ar else ar_path
    work = f'<a href="{pre}/#work">{c["nav_work"]}</a>' if with_work else ""
    return (f'<header id="site-header" class="site-header"><div class="wrap">{brand(lang,52)}'
            f'<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">{c["menu"]}</button>'
            f'<nav class="nav" id="nav" aria-label="{"الرئيسية" if ar else "Main"}">{work}'
            f'<a href="{pre}/#services">{c["nav_services"]}</a><a href="{pre}/#about">{c["nav_about"]}</a>'
            f'<a href="{pre}/#contact">{c["nav_contact"]}</a>'
            f'<a class="lang" href="{other_href}" hreflang="{"en" if ar else "ar"}" lang="{"en" if ar else "ar"}" aria-label="{c["other_label"]}">{c["other"]}</a>'
            f'<a class="btn" href="{pre}/quote.html">{c["b1"]}</a></nav></div></header>')

def footer(lang):
    c = C[lang]
    return (f'<footer id="site-footer" class="site-footer"><div class="wrap">{brand(lang,44)}<p>{c["tag"]}</p>'
            f'<p>{c["city"]}<span class="sep"></span><a class="ltr" href="mailto:info@askonltd.com">info@askonltd.com</a></p>'
            f'<p>{c["copy"]}</p></div></footer>')

SCRIPTS = '''<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js" defer></script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer></script>
<script src="/main.js" defer></script>
</body>
</html>
'''
TS = f'<div class="cf-turnstile" data-sitekey="{SK}" data-theme="auto"></div>'

def iframe(vid, title):
    return f'<iframe src="https://www.youtube-nocookie.com/embed/{vid}" title="{title}" allow="fullscreen" loading="lazy"></iframe>'

# ---------------------------------------------------------------- pages
def jsonld(lang):
    c = C[lang]
    return {"@context": "https://schema.org", "@type": "Organization", "name": "Askon Creative Agency",
            "alternateName": "آسكون كرييتف", "url": SITE + "/", "logo": SITE + "/assets/askon-logo-ink.svg",
            "description": C["en"]["d"], "email": "info@askonltd.com", "telephone": "+963959654951",
            "address": {"@type": "PostalAddress", "streetAddress": "64/26 Al-Adawi Commercial Complex, Al-Adawi District",
                        "addressLocality": "Damascus", "addressCountry": "SY"}}

def home(l):
    c = C[l]; ar = l == "ar"; pre = "/ar" if ar else ""
    has_work = bool(WORK)
    svc = "".join(f'<li><h3>{a}</h3><div><p>{b}</p><small>{t}</small></div></li>' for a, b, t in c["svc"])
    steps = "".join(f'<li class="clip g{g}"><span class="n">{i}</span><h3>{a}</h3><p>{b}</p></li>'
                    for i, ((a, b), g) in enumerate(zip(c["steps"], (3, 4, 5, 3)), 1))
    facts = "".join(f'<li><span class="dot"></span><div><b>{a}</b>{b}</div></li>' for a, b in c["facts"])
    if SHOWREEL_ID:
        hero_frame = f'<div class="frame">{iframe(SHOWREEL_ID, "Askon showreel")}</div>'
    else:  # decorative viewfinder: brand mark + live scroll timecode, no fake player
        hero_frame = (f'<div class="frame vf" aria-hidden="true"><i></i><i></i><i></i><i></i>'
                      f'<span class="rec"><span class="dot"></span>{c["rec"]}</span>'
                      f'<img class="mark" src="/assets/askon-symbol-reversed.svg" alt="">'
                      f'<span class="tc" data-tc>00:00:00:00</span></div>')
    b2 = f'<a class="btn ghost" href="#work">{c["b2"]}</a>' if has_work else ""
    work = ""
    if has_work:
        W1 = ' class="w1"'
        arts = "".join(
            f'<article{W1 if i == 0 else ""}><div class="frame">{iframe(v, (at if ar else et))}</div>'
            f'<h3>{at if ar else et}</h3><p>{am if ar else em_}</p></article>'
            for i, (v, et, em_, at, am) in enumerate(WORK))
        work = (f'<section id="work" data-clip="{c["wh"]}" class="on-ink"><div class="wrap">\n'
                f' <div class="head"><h2>{c["wh"]}</h2><p>{c["wp"]}</p></div>\n <div class="work-grid">{arts}</div>\n</div></section>\n')
    ph1 = '<span class="ltr">+963 959 654 951</span>'; ph2 = '<span class="ltr">+963 959 401 656</span>'
    return head(l, c["t"], c["d"], "/", "/ar/", jsonld(l)) + f'''<body>
<a class="skip" href="#main">{c["skip"]}</a>
{header(l, "/", "/ar/", has_work)}
<main id="main">
<section id="top" data-clip="{c["tl"]}" class="hero on-ink">
 <div class="bgmark" aria-hidden="true"></div>
 <div class="wrap">
  <p class="meta"><span class="dot rec-dot"></span>{c["rec"]}<span class="tc" data-tc>00:00:00:00</span><span class="sep"></span>{c["city"]}</p>
  <h1><span class="ln"><span class="in">{c["h1a"]}</span></span><span class="ln"><span class="in">{c["h1b"]}<span class="dot"></span></span></span></h1>
  <div class="rule"></div>
  <div class="hero-grid">
   <div><p class="lead">{c["lead"]}</p>
    <div class="actions"><a class="btn" href="{pre}/quote.html">{c["b1"]}</a>{b2}</div></div>
   {hero_frame}
  </div>
 </div>
</section>
<section id="services" data-clip="{c["sh"]}"><div class="wrap">
 <div class="head"><h2>{c["sh"]}</h2><p>{c["sp"]}</p></div>
 <ul class="svc">{svc}</ul>
 <p class="common"><span class="dot"></span>{c["common"]}</p>
</div></section>
{work}<section id="process" data-clip="{c["pr"]}"><div class="wrap">
 <div class="head"><h2>{c["pr"]}</h2><p>{c["prp"]}</p></div>
 <div class="ruler" aria-hidden="true"></div>
 <ol class="reel">{steps}</ol>
</div></section>
<section id="about" data-clip="{c["nav_about"]}" class="on-ink"><div class="wrap">
 <h2 class="statement">{c["ah"]}</h2>
 <div class="about"><div><p>{c["ap1"]}</p><p>{c["ap2"]}</p></div>
 <ul class="facts">{facts}</ul></div>
</div></section>
<section id="contact" data-clip="{c["nav_contact"]}"><div class="wrap contact-grid">
 <div><h2>{c["ch"]}</h2>
  <dl><dt>{c["mail"]}</dt><dd><a class="ltr" href="mailto:info@askonltd.com">info@askonltd.com</a></dd>
  <dt>{c["tel"]}</dt><dd><a href="tel:+963959654951">{ph1}</a></dd><dd><a href="tel:+963959401656">{ph2}</a></dd>
  <dt>{c["addr"]}</dt><dd>{c["address"]}</dd></dl></div>
 <form id="contact-form" class="on-paper" novalidate>
  <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
  <div><label for="cn">{c["n"]}</label><input id="cn" type="text" name="name" autocomplete="name" required></div>
  <div><label for="ce">{c["e"]}</label><input id="ce" type="email" name="email" autocomplete="email" required></div>
  <div><label for="cm">{c["m"]}</label><textarea id="cm" name="message" required></textarea></div>
  {TS}
  <button class="btn" type="submit">{c["send"]}</button>
  <p class="status" role="status" aria-live="polite"></p>
 </form>
</div></section>
</main>
{footer(l)}
''' + SCRIPTS

def quote(l):
    c = C[l]
    opts = "".join(f'<label class="opt"><input type="checkbox" name="svc" value="{s}"><span>{s}</span></label>' for s in c["svcs"])
    return head(l, c["qt"], c["qd"], "/quote.html", "/ar/quote.html") + f'''<body>
<a class="skip" href="#main">{c["skip"]}</a>
{header(l, "/quote.html", "/ar/quote.html", bool(WORK))}
<main id="main"><section class="quote-page"><div class="wrap">
 <h1>{c["qh"]}</h1><p>{c["qp"]}</p>
 <form id="quote-form" class="on-paper" novalidate>
  <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
  <fieldset class="step"><legend>{c["s1"]}</legend><div class="opts">{opts}</div>
   <input type="hidden" id="selected-services" name="selected_services"><input type="hidden" id="project-type" name="project_type"></fieldset>
  <div class="step"><h2 class="h3x">{c["s2"]}</h2>
   <div class="row2"><div><label for="ed">{c["date"]}</label><input id="ed" type="date" name="event_date"></div>
   <div><label for="lc">{c["loc"]}</label><input id="lc" type="text" name="location" required></div></div>
   <div><label for="pd">{c["desc"]}</label><textarea id="pd" name="project_description" required></textarea></div></div>
  <div class="step"><h2 class="h3x">{c["s3"]}</h2>
   <div class="row2"><div><label for="fn">{c["fn"]}</label><input id="fn" type="text" name="full_name" autocomplete="name" required></div>
   <div><label for="co">{c["co"]}</label><input id="co" type="text" name="company_name" autocomplete="organization"></div></div>
   <div class="row2"><div><label for="em">{c["em"]}</label><input id="em" type="email" name="email" autocomplete="email" required></div>
   <div><label for="ph">{c["ph2"]}</label><input id="ph" type="tel" name="phone" autocomplete="tel" required></div></div></div>
  {TS}
  <button class="btn" type="submit">{c["qs"]}</button>
  <p class="status" role="status" aria-live="polite"></p>
 </form>
</div></section></main>
{footer(l)}
''' + SCRIPTS

def notfound():
    """One 404 for the whole site (GitHub Pages serves a single 404.html). English first, Arabic line below."""
    c = C["en"]; a = C["ar"]
    h = head("en", c["nf_t"], c["nf_p"], "/", "/ar/").replace('<link rel="canonical" href="https://askonltd.com/">\n', '<meta name="robots" content="noindex">\n')
    return h + f'''<body>
<a class="skip" href="#main">{c["skip"]}</a>
{header("en", "/", "/ar/", bool(WORK))}
<main id="main" class="notfound on-ink"><div class="wrap"><h1>{c["nf_h"]}</h1><p>{c["nf_p"]} <a href="/">{c["nf_a"]}</a>.</p>
<p lang="ar" dir="rtl">الصفحة غير موجودة. <a href="/ar/">العودة إلى الصفحة الرئيسية</a>.</p></div></main>
{footer("en")}
<script src="/main.js" defer></script>
</body>
</html>
'''

def sitemap():
    today = datetime.date.today().isoformat()
    def url(en, ar):
        alt = (f'<xhtml:link rel="alternate" hreflang="en" href="{SITE+en}"/>'
               f'<xhtml:link rel="alternate" hreflang="ar" href="{SITE+ar}"/>'
               f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE+en}"/>')
        return "".join(f'<url><loc>{SITE+p}</loc><lastmod>{today}</lastmod>{alt}</url>\n' for p in (en, ar))
    return ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
            'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + url("/", "/ar/") + url("/quote.html", "/ar/quote.html") + '</urlset>\n')

def write(rel, text):
    p = os.path.join(HERE, rel); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w", encoding="utf-8").write(text)

if __name__ == "__main__":
    for l, d in (("en", ""), ("ar", "ar/")):
        write(d + "index.html", home(l))
        write(d + "quote.html", quote(l))
    write("404.html", notfound())
    write("sitemap.xml", sitemap())
    print("built: index, quote, ar/index, ar/quote, 404, sitemap")
