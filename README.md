# Askon Creative Agency: website

Static site for GitHub Pages. English at `/`, Arabic at `/ar/`.

## 1. Upload
1. Delete every old file in the repository (old pages, `rtl.css`, `lottie.json`, `Codex.html`, `/ar/*`).
2. Upload the contents of this folder to the repository root. Keep your existing `favicon.ico`.
3. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Settings > Pages > Custom domain: `askonltd.com`. Tick **Enforce HTTPS** once it becomes available.

## 2. DNS (at your domain registrar or Cloudflare)
| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

Add the four AAAA records for IPv6 from GitHub's Pages documentation. Verify the domain in your GitHub account (Settings > Pages > Add a domain) to stop others claiming it.

## 3. Security checklist
- Turn on 2FA for GitHub, the registrar and Cloudflare. Enable DNSSEC and add a CAA record for `letsencrypt.org`.
- GitHub Pages cannot send HTTP headers. Put the domain behind Cloudflare (proxy on, SSL "Full (strict)", Always Use HTTPS, HSTS) and add a Transform Rule that sets `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- A Content-Security-Policy is already in each page `<meta>`. It allows only your own files, Google Fonts, jsDelivr (EmailJS), Cloudflare Turnstile and YouTube (nocookie). If you add another service, add its domain there.
- EmailJS keys in `main.js` are public by design. In the EmailJS dashboard: restrict allowed domains to `askonltd.com`, set a monthly limit, and enable its rate limiting.
- Turnstile: in the Cloudflare dashboard, limit the widget to the hostname `askonltd.com`. Note the token is checked in the browser only. For strong spam protection, verify it server-side (a small Cloudflare Worker); ask me and I will write it.
- The quote form no longer sends `attendees`. If your EmailJS template `template_6akujta` shows it, remove it there.

## 4. Still to add
- `assets/askon-symbol-*.svg` are placeholders drawn from your PNG. Replace them with the master logo files from the designer (`askon-logo-horizontal-reversed.svg` etc.). The header wordmark is live text until then.
- Overcame Demo font: put `overcame-demo.woff2` in `/fonts/`. Until then headings use Archivo.
- `assets/og-image.jpg` (1200x630) for link previews.
- Showreel and project videos: replace each `.frame` with a YouTube `youtube-nocookie.com` iframe (example in a comment inside `index.html`).

## 5. Editing
Text lives in `build.py` (both languages). Run `python3 build.py` to regenerate the four pages. Menu and footer live in `main.js`. Colours are variables at the top of `style.css`.
