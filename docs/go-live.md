# Go-live: connecting Hostinger to the `hostinger` branch

The production build lives on the `hostinger` branch of the public repository `bigbossua/quietmindsleep` (branch root = website root, `.htaccess` included). Hostinger's Git deployment pulls that branch straight into `public_html`. Because the repository is public, **no SSH key, token or password is needed**.

## 1. Inspect `public_html` first (do not skip)

hPanel → **Websites** → `quietmindsleep.co.uk` → **Dashboard** → **File Manager** → open `public_html`.

- **Empty, or only Hostinger's `default.php` / placeholder `index.html`:** delete the placeholder and continue.
- **A WordPress or other site you still want:** stop. Hostinger's Git deploy needs an empty target folder. Take a backup (**Files → Backups → Generate new backup**) and tell Claude what is there before anything is removed.
- **Files you are unsure about:** download them (right-click → Download) or generate a backup, then continue.

Also confirm the site's **document root** is `public_html` (Websites → Dashboard → Advanced → Website settings, or the "Website root" shown in File Manager).

## 2. Connect the repository

hPanel → **Websites** → `quietmindsleep.co.uk` → **Dashboard** → **Advanced → Git**.

CLICK THIS → **Create a new repository** → ENTER THIS:

| Field | Value |
|---|---|
| Repository | `https://github.com/bigbossua/quietmindsleep.git` |
| Branch | `hostinger` |
| Install path / directory | leave **blank** (deploys into `public_html`) |

SAVE THIS → **Create**. Hostinger clones the branch; the site is live within a minute or two.

If hPanel offers **"Connect with GitHub"** (OAuth) instead of a URL field, use it, pick `bigbossua/quietmindsleep`, and select branch `hostinger` with the root directory. If it asks for an SSH key, that is only for private repositories; this one is public, so choose the HTTPS URL option instead.

## 3. Turn on auto-deploy

On the same Git page Hostinger shows a **Webhook URL**. Copy it → GitHub → `bigbossua/quietmindsleep` → **Settings → Webhooks → Add webhook** → Payload URL = that URL, content type `application/json`, "Just the push event" → **Add webhook**. Every future push to `hostinger` (which CI produces from `main`) redeploys automatically. Without the webhook, click **Deploy** on the Git page after each release.

## 4. SSL and HTTPS

hPanel → **Security → SSL**: the certificate should show **Active**. Turn on **Force HTTPS**. (`.htaccess` also redirects http→https and www→non-www, so both layers agree.)

## 5. Verify

From any machine with internet access, in the repository:

```bash
npm install
node scripts/verify-live.mjs https://quietmindsleep.co.uk
```

It checks redirects, HTTPS, every sitemap URL (200 + canonical), CSS/JS/fonts/search index, robots, the 404 page, search, and internal links on a sample of pages, and writes `reports/live-verification.md`. Or tell Claude "verify the live site" from a session whose network can reach `quietmindsleep.co.uk` (add the domain to the environment's allowed hosts).

## 6. After go-live

Search Console: add the domain property, verify by DNS TXT, submit `https://quietmindsleep.co.uk/sitemap.xml` (steps in `docs/owner-actions.md`).

## Release process from now on

`main` is production. Push (or merge) to `main` → GitHub Actions builds, audits, and republishes the `hostinger` branch → Hostinger pulls it (webhook) → live. Manual equivalent: `npm run build && npm run deploy:branch`.
