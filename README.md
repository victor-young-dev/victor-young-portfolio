# Victor Young — Portfolio

Personal portfolio site. Designer, developer and founder based in Umudi, Imo State, Nigeria.

Live work featured: [Apex Wright Lab](https://apex-wright-lab.vercel.app/) · [Kaabo](https://kaabonglaunch.netlify.app/) · [BrandiLux](https://brandi-lux.netlify.app/)

## Stack

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework.
That is deliberate — it deploys anywhere in seconds and stays fast on a slow connection.

- **Type:** Syne (display), Manrope (body), JetBrains Mono (labels) via Google Fonts
- **Themes:** light and dark, toggled in the nav, remembered in `localStorage`, defaults to the visitor's OS setting
- **Motion:** IntersectionObserver reveals, a scroll-drawn "idea to live" spine, soft page transitions. All disabled under `prefers-reduced-motion`

## Structure

```
.
├── index.html          landing
├── work.html           five projects, live and in build
├── about.html          story, principles, toolkit
├── resume.html         CV — the button prints to PDF
├── contact.html        channels
└── assets/
    ├── css/styles.css  all styling, theme tokens at the top
    ├── js/main.js      theme, nav, reveals
    └── img/            portraits, favicon
```

## Run it locally

Open `index.html` in a browser, or use the **Live Server** extension in VS Code
(right-click `index.html` → *Open with Live Server*).

## Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Deploy

**Vercel** — import the repo at vercel.com/new. Framework preset: *Other*.
Leave the build command empty and the output directory as `.`. Deploy.

**Netlify** — import the repo at app.netlify.com/start. Build command: empty.
Publish directory: `.`. Deploy.

Both configs are already in the repo (`vercel.json`, `netlify.toml`), so the defaults should just work.

## Before you publish — things to change

| Where | What |
|---|---|
| `resume.html`, `contact.html` | `hello@victoryoung.dev` is a placeholder |
| `resume.html`, `contact.html` | WhatsApp number — confirm it is the one you want on a personal site |
| `resume.html` | Date ranges (2024, 2022) are estimates — confirm them |
| `resume.html` | Add degree class and graduation year |
| `contact.html` | LinkedIn and Instagram are marked "coming soon" |
| everywhere | Buy a domain. `.vercel.app` in the address bar makes finished work read as coursework |

## Swapping in real screenshots

Each project cover is built in CSS, themed with the real site's own colours.
To use a real screenshot instead, drop the image in `assets/img/` and replace the
`<div class="cover-body ...">` block inside that card's `.cover` with:

```html
<img src="assets/img/kaabo.png" alt="Kaabo launch site">
```

Keep the `.cover-bar` above it — that is the browser frame.

## Adding a project

Copy any `.card` block in `work.html`, change the copy, and pick a status pill:
`<span class="pill live">` or `<span class="pill build">`. When ResQNet ships,
move it into the Live group and bump the counter on `index.html` to `04`.
