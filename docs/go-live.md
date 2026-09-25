# Go-live

Two routes exist. **Route 1 (SSH from GitHub Actions)** is fully automated once four GitHub secrets exist. **Route 2 (Hostinger Git pull)** is a two-minute job in hPanel. Either results in the same files in `public_html`.

## Route 1 — SSH deploy from GitHub Actions (recommended once secrets exist)

The workflow `.github/workflows/build-deploy.yml` has a `deploy-ssh` job: it downloads the built site, connects to Hostinger's SSH access with a key stored as a GitHub secret, checks the target directory is empty or already ours (it refuses to overwrite another site), syncs `dist/` with rsync, and then runs the live verification and publishes screenshots and results to the `live-reports` branch.

You need the SSH keypair whose **public** key is added in hPanel → **Advanced → SSH Access** (the key named `quietmindsleep-deploy`). The **private** key never goes into chat or the repository: it goes only into a GitHub secret.

GitHub → `bigbossua/quietmindsleep` → **Settings → Secrets and variables → Actions → New repository secret**, four times:

| Secret name | Value | Where to find it |
|---|---|---|
| `SSH_PRIVATE_KEY` | The full contents of the private key file (begins `-----BEGIN OPENSSH PRIVATE KEY-----` or `-----BEGIN RSA PRIVATE KEY-----`, ends with the matching `END` line) | On the computer where you generated `quietmindsleep-deploy`, usually `~/.ssh/quietmindsleep-deploy` (no `.pub`). Open it in a text editor and paste everything. |
| `SSH_HOST` | The SSH IP address | hPanel → Advanced → **SSH Access** → "SSH IP" |
| `SSH_USER` | The SSH username (looks like `u123456789`) | Same page → "SSH username" |
| `SSH_PORT` | `65002` (Hostinger's standard SSH port; use the value shown if different) | Same page → "SSH port" |

Optional secret `SSH_TARGET_DIR` overrides the default `domains/quietmindsleep.co.uk/public_html`.

SSH access itself must be **enabled** on that page (toggle at the top). Then either push to `main` or run **Actions → Build and deploy → Run workflow**. The run's `deploy-ssh` and `verify` jobs show exactly what was deployed and whether the live site passed.

## Route 2 — Hostinger Git pull of the `hostinger` branch

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
