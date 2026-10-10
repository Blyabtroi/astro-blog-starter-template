# Mind Arts (mindarts.ru)

Personal site: projects, blog, about — **RU** (default) and **EN** (`/en/...`). Built with [Astro](https://astro.build), hosted on reg.ru, deployed from GitHub.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). Legacy landings (`/beatbob/`, `/kinonaoborot/`, `/tarifmometr/`) use `public/*/index.html`; the dev server rewrites trailing-slash URLs (see `astro.config.mjs`). Restart `npm run dev` after config changes; if the port is busy, stop old Astro processes so you are not hitting a stale server on another port.

## Build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Project landings (legacy static)

Full HTML/CSS/JS for Beatbob (EN), Kinonaoborot, and Tarifmometr live under `public/beatbob/`, `public/kinonaoborot/`, and `public/tarifmometr/`. Shared sticky minibar: `public/styles/legacy-minibar.css` and `public/js/legacy-minibar.js` (site theme on the bar only; each landing keeps its own page styling).

MKNC is an Astro page at `src/pages/mknc/index.astro` → `/mknc/`.

**app-ads.txt:** Kinonaoborot lines are in `public/app-ads.kinonaoborot.txt`. Merge into the site root `app-ads.txt` on the host when you maintain that file manually.

Landings are one-time copies into this repo (not synced from product repos). After image changes in Tarifmometr assets, you can convert PNGs to WebP locally with `npx sharp-cli` or a one-off `sharp` script; WebP is not required for deploy.

## Blog

Posts are Markdown under `src/content/blog/ru/` and `src/content/blog/en/`. Frontmatter includes `locale` and optional `translationSlug`.

Habr republications: full text in `src/content/blog/ru/habr-*.md`, images under `public/blog/habr/<id>/`. Re-fetch from Habr with `npm install --no-save turndown turndown-plugin-gfm && node scripts/habr-to-markdown.mjs`.

Tokenization comparison (RU/EN blog post): sample texts and `tokcmp.py` live in [`tokcmp/`](tokcmp/).

## Deploy (GitHub Actions → FTP)

On push to `main`, [.github/workflows/deploy.yml](.github/workflows/deploy.yml) runs `npm run build` and uploads `dist/` via FTP.

Configure **repository secrets** (Settings → Secrets and variables → Actions). Do not commit credentials.

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | FTP/SFTP host from reg.ru panel |
| `FTP_USERNAME` | FTP login |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Remote directory for the site root (e.g. `/www/mindarts.ru/public_html/`) |

Optional: use an environment `production` with protection rules for deploy approval.

## Structure

- `src/pages/` — RU routes (default locale)
- `src/pages/en/` — English routes
- `src/i18n/` — UI strings
- `src/data/projects.ts` — project catalog metadata
