# Mind Arts (mindarts.ru)

Personal site: projects, blog, about — **RU** (default) and **EN** (`/en/...`). Built with [Astro](https://astro.build), hosted on reg.ru, deployed from GitHub.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Project landings (legacy static)

Full HTML/CSS/JS for Beatbob, Kinonaoborot, and Tarifmometr live under:

- `public/beatbob/`
- `public/kinonaoborot/`
- `public/tarifmometr/`

They are copied as-is into `dist/` on build. Replace the placeholder `index.html` files with your production assets from reg.ru.

## Blog

Posts are Markdown under `src/content/blog/ru/` and `src/content/blog/en/`. Frontmatter includes `locale` and optional `translationSlug`.

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
