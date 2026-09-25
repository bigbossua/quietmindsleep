# Deployment to Hostinger

The site is plain static files in `dist/` plus `.htaccess`. Hostinger's shared hosting (Apache/LiteSpeed) serves it directly. There is no PHP, database or CMS to configure.

## Route A — Git deployment (recommended)

1. GitHub Actions (`.github/workflows/build-deploy.yml`) builds and audits on every push to `main`, then publishes `dist/` to the `hostinger` branch.
2. hPanel → Websites → quietmindsleep.co.uk → Advanced → **Git** → Create new repository: URL `https://github.com/bigbossua/quietmindsleep.git`, branch `hostinger`, directory blank (deploys to `public_html`). For a private repository, copy the SSH key Hostinger shows into GitHub → Settings → Deploy keys (read-only).
3. Copy the webhook URL Hostinger displays into GitHub → Settings → Webhooks (content type `application/json`, event: push). Every publish then deploys automatically. Otherwise click **Deploy** in hPanel.
4. `public_html` must be empty (or backed up and cleared) before the first deploy.

## Route B — FTP from GitHub Actions

Add secrets `FTP_SERVER` (e.g. `ftp.quietmindsleep.co.uk` or the IP from hPanel → FTP Accounts), `FTP_USERNAME`, `FTP_PASSWORD`. The workflow uploads `dist/` to `public_html/` over FTPS.

## After the first deploy — verification checklist

- `https://quietmindsleep.co.uk/` returns 200 and the homepage.
- `http://…` and `https://www.…` both 301 to `https://quietmindsleep.co.uk/` (handled by `.htaccess`; also enable Force HTTPS in hPanel → SSL).
- `/sitemap.xml`, `/robots.txt` return 200; `/this-does-not-exist/` returns the styled 404.
- `/quiet-the-mind/` loads with correct CSS and fonts (check no mixed-content warnings).
- View source of any article: `<link rel="canonical">` points at the non-www HTTPS URL.
- Run `node scripts/check-external-links.mjs` from a machine with internet access.
- Submit the sitemap in Search Console.

## Caching

Hostinger's LiteSpeed cache is fine for static files. `.htaccess` sets long cache headers on assets (which are versioned by query string) and 10 minutes on HTML. Purge the hPanel cache after a deploy if a change does not appear.
