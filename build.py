import os
SITE="https://askonltd.com"
CSP="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://challenges.cloudflare.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.emailjs.com; frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
FONTS="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;700&display=swap"
SK="0x4AAAAAACewk_qC2RQSIRfS"

def head(lang,title,desc,en_path,ar_path):
    ar=lang=="ar"; cur=SITE+(ar_path if ar else en_path)
    return f'''<!DOCTYPE html>
<html lang="{lang}" dir="{'rtl' if ar else 'ltr'}">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="{CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#211029">
<link rel="canonical" href="{cur}">
<link rel="alternate" hreflang="en" href="{SITE+en_path}">
<link rel="alternate" hreflang="ar" href="{SITE+ar_path}">
<link rel="alternate" hreflang="x-default" href="{SITE+en_path}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="{cur}">
<meta property="og:image" content="{SITE}/assets/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<link rel="stylesheet" href="/style.css">
</head>
'''

C={
"en":dict(
 skip="Skip to content",
 t="Askon Creative Agency | Film & photo production in Damascus",
 d="Askon Creative is a Damascus production company. Documentaries, commercials, event coverage and photography, shot and edited by one team.",
 h1="Keep on asking",
 lead="Askon Creative is a production company in Damascus. We make documentaries, commercials and event films, and we shoot and edit them ourselves.",
 b1="Get a quote",b2="See our work",rec="REC",
 wh="Selected work",wp="Showreel and projects are being added. Each one will play right here.",
 ph="Showreel",pt="Project title",pm="Client, service",
 sh="What we make",sp="Four services. Every one includes editing, colour grading and sound.",
 svc=[("Documentaries and reports","Short films about people, organisations and places. From the first interview to the final cut.","Story films, project reports, interviews"),
      ("Commercials and brand films","Adverts and company films that explain what you do and look the part.","Adverts, company films, campaigns"),
      ("Event and exhibition coverage","Video and photo coverage of exhibitions, conferences and launches, delivered fast.","Multi-camera shoots, highlights, same-week delivery"),
      ("Photography","Product, corporate portrait and location photography with a cinematic eye.","Products, portraits, places")],
 common="Post-production on every project: editing, colour grading, sound mix, motion graphics.",
 ah="Fifteen years of shooting and editing, now for ourselves",
 ap1="We spent fifteen years in Turkey shooting and editing for other companies. We came back to Damascus and started Askon Creative together: three partners and a fourth shooter-editor, all working from the same edit bay.",
 ap2="Our name is a promise. Press play, start recording, keep on asking.",
 facts=[("Fast","Short turnaround without cutting corners."),("Sharp","High-quality image and sound on every job."),("Together","The people who shoot your film also cut it.")],
 ch="Tell us about your project",
 mail="Email",tel="Phone",addr="Office",
 address="64/26 Al-Adawi Commercial Complex, Al-Adawi District, Damascus, Syria",
 n="Name",e="Email",m="Message",send="Send message",
 qt="Get a quote | Askon Creative Agency",qd="Tell us about your film or photo project and we will send you a proposal.",
 qh="Get a quote",qp="Tell us what you need. We will reply with a proposal.",
 s1="What do you need?",
 svcs=["Documentary or report","Commercial or brand film","Event or exhibition coverage","Photography"],
 s2="About the project",pty="Project type",
 ptys=["Documentary or report","Commercial or brand film","Event or exhibition coverage","Photography","Other"],
 date="Preferred date",loc="City or location",desc="What should we know about the project?",
 s3="About you",fn="Full name",co="Company or organisation",em="Work email",ph2="Phone or WhatsApp",qs="Send request",choose="Choose a type"),
"ar":dict(
 skip="انتقل إلى المحتوى",
 t="آسكون كرييتف | إنتاج أفلام وتصوير في دمشق",
 d="آسكون كرييتف شركة إنتاج في دمشق. أفلام وثائقية وإعلانات وتغطية فعاليات وتصوير فوتوغرافي، يصوّرها ويمنتجها فريق واحد.",
 h1="استمر بالسؤال",
 lead="آسكون كرييتف شركة إنتاج في دمشق. نصنع أفلاماً وثائقية وإعلانات وأفلام فعاليات، ونصوّرها ونمنتجها بأنفسنا.",
 b1="اطلب عرض سعر",b2="شاهد أعمالنا",rec="REC",
 wh="أعمال مختارة",wp="نضيف الآن العرض التعريفي والمشاريع. سيعمل كل فيديو هنا مباشرة.",
 ph="العرض التعريفي",pt="عنوان المشروع",pm="العميل، الخدمة",
 sh="ماذا نصنع",sp="أربع خدمات. كل واحدة تشمل المونتاج وتصحيح الألوان والصوت.",
 svc=[("أفلام وثائقية وتقارير","أفلام قصيرة عن الناس والمؤسسات والأماكن. من المقابلة الأولى إلى المونتاج النهائي.","أفلام قصصية، تقارير مشاريع، مقابلات"),
      ("إعلانات وأفلام تعريفية","إعلانات وأفلام للشركات تشرح ما تفعله وتظهر بمستواه.","إعلانات، أفلام شركات، حملات"),
      ("تغطية الفعاليات والمعارض","تغطية فيديو وصور للمعارض والمؤتمرات والإطلاقات، وتسليم سريع.","تصوير متعدد الكاميرات، ملخصات، تسليم خلال أيام"),
      ("التصوير الفوتوغرافي","تصوير منتجات وبورتريه للشركات وتصوير أماكن بعين سينمائية.","منتجات، بورتريه، أماكن")],
 common="مونتاج وما بعد الإنتاج في كل مشروع: مونتاج، تصحيح ألوان، مكساج صوت، موشن غرافيك.",
 ah="خمس عشرة سنة من التصوير والمونتاج، والآن لأنفسنا",
 ap1="قضينا خمس عشرة سنة في تركيا نصوّر ونمنتج لشركات أخرى. عدنا إلى دمشق وأسسنا آسكون كرييتف معاً: ثلاثة شركاء ومصوّر ومونتير رابع، نعمل جميعاً في غرفة مونتاج واحدة.",
 ap2="اسمنا وعد: اضغط تشغيل، ابدأ التسجيل، واستمر بالسؤال.",
 facts=[("سريعون","تسليم قصير دون التفريط بالجودة."),("دقيقون","صورة وصوت عاليا الجودة في كل عمل."),("معاً","من يصوّر فيلمك هو من يمنتجه.")],
 ch="حدّثنا عن مشروعك",
 mail="البريد الإلكتروني",tel="الهاتف",addr="المكتب",
 address="مجمع العدوي التجاري ٦٤/٢٦، حي العدوي، دمشق، سوريا",
 n="الاسم",e="البريد الإلكتروني",m="رسالتك",send="إرسال الرسالة",
 qt="اطلب عرض سعر | آسكون كرييتف",qd="حدّثنا عن مشروعك المرئي أو الفوتوغرافي وسنرسل لك عرضاً.",
 qh="اطلب عرض سعر",qp="أخبرنا بما تحتاجه وسنرد عليك بعرض.",
 s1="ماذا تحتاج؟",
 svcs=["فيلم وثائقي أو تقرير","إعلان أو فيلم تعريفي","تغطية فعالية أو معرض","تصوير فوتوغرافي"],
 s2="عن المشروع",pty="نوع المشروع",
 ptys=["فيلم وثائقي أو تقرير","إعلان أو فيلم تعريفي","تغطية فعالية أو معرض","تصوير فوتوغرافي","أخرى"],
 date="التاريخ المفضل",loc="المدينة أو الموقع",desc="ماذا يجب أن نعرف عن المشروع؟",
 s3="عنك",fn="الاسم الكامل",co="الشركة أو المنظمة",em="البريد الإلكتروني للعمل",ph2="الهاتف أو واتساب",qs="إرسال الطلب",choose="اختر النوع"),
}

SCRIPTS=f'''<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js" defer></script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer></script>
<script src="/main.js" defer></script>
</body>
</html>
'''
TS=f'<div class="cf-turnstile" data-sitekey="{SK}" data-theme="auto"></div>'

def home(l):
    c=C[l]; ar=l=="ar"
    svc="".join(f'<li><div><h3>{a}</h3><small>{t}</small></div><p>{b}</p></li>' for a,b,t in c["svc"])
    works="".join(f'<article><div class="frame"><span class="rec"><span class="dot"></span>{c["rec"]}</span><span class="play"></span><span class="tc">00:00:00</span></div><h3>{c["pt"]} {i}</h3><p>{c["pm"]}</p></article>' for i in (1,2,3))
    facts="".join(f'<li><span class="dot"></span><div><b>{a}</b>{b}</div></li>' for a,b in c["facts"])
    ph1='<span class="ltr">+963 959 654 951</span>'; ph2='<span class="ltr">+963 959 401 656</span>'
    return head(l,c["t"],c["d"],"/","/ar/")+f'''<body>
<a class="skip" href="#main">{c["skip"]}</a>
<header id="site-header"></header>
<noscript><p class="wrap">info@askonltd.com</p></noscript>
<main id="main">
<section class="hero on-ink">
 <div class="wrap">
  <h1>{c["h1"]}<span class="dot"></span></h1>
  <div class="rule"></div>
  <div class="hero-grid">
   <div><p class="lead">{c["lead"]}</p>
    <div class="actions"><a class="btn" href="{'/ar' if ar else ''}/quote.html">{c["b1"]}</a><a class="btn ghost" href="#work">{c["b2"]}</a></div></div>
   <!-- SHOWREEL: replace this .frame content with
        <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="Askon showreel" allow="fullscreen" loading="lazy"></iframe> -->
   <div class="frame"><span class="rec"><span class="dot"></span>{c["rec"]}</span><span class="play"></span><span class="tc">{c["ph"]} 00:00:00</span></div>
  </div>
 </div>
</section>
<section id="services"><div class="wrap">
 <div class="head"><h2>{c["sh"]}</h2><p>{c["sp"]}</p></div>
 <ul class="svc">{svc}</ul>
 <p class="common"><span class="dot"></span>{c["common"]}</p>
</div></section>
<section id="work" class="on-ink"><div class="wrap">
 <div class="head"><h2>{c["wh"]}</h2><p>{c["wp"]}</p></div>
 <div class="work-grid">{works}</div>
</div></section>
<section id="about"><div class="wrap about">
 <div><h2>{c["ah"]}</h2><p class="mt">{c["ap1"]}</p><p>{c["ap2"]}</p></div>
 <ul class="facts">{facts}</ul>
</div></section>
<section id="contact" class="on-ink"><div class="wrap contact-grid">
 <div><h2>{c["ch"]}</h2>
  <dl><dt>{c["mail"]}</dt><dd><a class="ltr" href="mailto:info@askonltd.com">info@askonltd.com</a></dd>
  <dt>{c["tel"]}</dt><dd><a href="tel:+963959654951">{ph1}</a></dd><dd><a href="tel:+963959401656">{ph2}</a></dd>
  <dt>{c["addr"]}</dt><dd>{c["address"]}</dd></dl></div>
 <form id="contact-form" novalidate>
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
<footer id="site-footer"></footer>
'''+SCRIPTS

def quote(l):
    c=C[l]; ar=l=="ar"
    opts="".join(f'<label class="opt"><input type="checkbox" name="svc" value="{s}"><span>{s}</span></label>' for s in c["svcs"])
    types=f'<option value="" disabled selected>{c["choose"]}</option>'+"".join(f'<option value="{t}">{t}</option>' for t in c["ptys"])
    return head(l,c["qt"],c["qd"],"/quote.html","/ar/quote.html")+f'''<body>
<a class="skip" href="#main">{c["skip"]}</a>
<header id="site-header"></header>
<main id="main"><section class="quote-page"><div class="wrap">
 <h1>{c["qh"]}</h1><p>{c["qp"]}</p>
 <form id="quote-form" class="on-paper" novalidate>
  <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
  <fieldset class="step"><legend>{c["s1"]}</legend><div class="opts">{opts}</div><input type="hidden" id="selected-services" name="selected_services"></fieldset>
  <div class="step"><h2 class="h3x">{c["s2"]}</h2>
   <div><label for="pt">{c["pty"]}</label><select id="pt" name="project_type" required>{types}</select></div>
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
<footer id="site-footer"></footer>
'''+SCRIPTS

for l,d in (("en",""),("ar","ar/")):
    open(d+"index.html","w",encoding="utf-8").write(home(l))
    open(d+"quote.html","w",encoding="utf-8").write(quote(l))
