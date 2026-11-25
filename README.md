# موقع آسكون كرييتف

موقع ثابت لـ GitHub Pages. الإنكليزي على `/` والعربي على `/ar/`.

## الرفع
1. احذف كل الملفات القديمة من المستودع (بما فيها `rtl.css` و`lottie.json` و`Codex.html` و`CNAME.txt`).
2. ارفع **محتويات** هذا المجلد كلها إلى جذر المستودع (بما فيها الملفات المخفية `.nojekyll`).
3. Settings > Pages > Deploy from a branch > `main` / root، والدومين `askonltd.com`، وفعّل Enforce HTTPS.

## الملفات
| الملف | الدور |
|---|---|
| `build.py` | كل النصوص (عربي وإنكليزي) + يولّد الصفحات والـ sitemap و404 |
| `main.js` | قائمة الموبايل، النماذج، شريط المونتاج |
| `style.css` | التصميم، الألوان متغيّرات أعلى الملف |
| `assets/` | الشعار (حبر ومعكوس)، الرمز، favicon، og-image، apple-touch-icon |

بعد أي تعديل نصي: `python3 build.py` ثم ارفع الملفات المتغيّرة. **لا تعدّل ملفات HTML يدوياً** لأن build.py يستبدلها.

## إضافة الفيديوهات
في أعلى `build.py`:
- `SHOWREEL_ID = "VIDEO_ID"` (معرّف يوتيوب) يضع الشوريل بدل الإطار التزييني.
- `WORK = [("VIDEO_ID","Title","Client, service","العنوان","العميل، الخدمة")]` يُظهر قسم الأعمال والرابط والزر تلقائياً. فارغة الآن فالقسم مخفي.

## أمان (مهم)
- فعّل 2FA على GitHub والريجستري وCloudflare، وDNSSEC، وCAA لـ letsencrypt.org.
- GitHub Pages لا يرسل HTTP headers: ضع الدومين خلف Cloudflare (proxy، SSL Full strict، HSTS) وأضف Transform Rule: `X-Content-Type-Options: nosniff` و`X-Frame-Options: DENY` و`Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- مفاتيح EmailJS علنية بطبيعتها: قيّد الدومين `askonltd.com` وحدّد حداً شهرياً من لوحة EmailJS.
- Turnstile: قيّده على `askonltd.com`. التحقق حالياً في المتصفح فقط؛ للحماية الحقيقية من السبام نحتاج Cloudflare Worker يتحقق من التوكن.
- SRI لسكربت EmailJS (لم أضفه لأنه يحتاج حساب hash من الإنترنت):
  `curl -s https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js | openssl dgst -sha384 -binary | openssl base64 -A`
  ثم أضف `integrity="sha384-..." crossorigin="anonymous"` على وسم السكربت في `SCRIPTS` داخل build.py.
- قالب EmailJS `template_6akujta` يستلم الآن `selected_services` و`project_type` (نفس القيمة) و`event_date` و`location` و`project_description` و`full_name` و`company_name` و`email` و`phone`.

## ما زال ناقصاً
- خط Overcame: الملف غير موجود وهو نسخة Demo، فأزلته من CSS (العناوين بخط Archivo). عند شراء الترخيص: ضع `fonts/overcame.woff2` وفعّل السطر المعلّق أعلى `style.css`.
- استضافة الخطوط محلياً بدل Google Fonts (أسرع وأكثر خصوصية، وتشيل اعتماداً خارجياً).
- صفحة سياسة خصوصية (النماذج تمر عبر EmailJS وTurnstile).
- جرّب الموقع من داخل سوريا: قد تُحجب أو تبطؤ بعض الخدمات الخارجية (الخطوط، jsDelivr، EmailJS، Turnstile).
