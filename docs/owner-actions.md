# Owner actions — what only you can do

Everything below needs your account access. Each item says exactly what to click. Nothing else on the site is waiting on you.

## 1. Semrush API units (blocks the research step)

The Semrush connector is authorised, but the account has **no API units**, so every research request is refused. Until this is fixed the keyword database has blank volume/KD columns and every page is marked `draft-pending-validation`.

CLICK THIS → https://www.semrush.com/mcp-access → ENTER THIS → choose an API unit package for your subscription → SAVE THIS → confirm the purchase.

Then tell Claude "Semrush units are available" and the research step in `docs/research-process.md` runs: UK keyword validation for all 440 planned keywords, competitor keyword gaps, question research, and a written recommendation of which planned pages to keep, merge, rewrite or replace.

Alternative without API units: export keywords from the Semrush web interface (Keyword Magic Tool → UK database → Export CSV) and run `npm run ingest:semrush -- path/to/export.csv`.

## 2. Amazon Associates tracking ID (blocks commission, not the site)

Claude cannot see your Amazon Associates account from this environment, so its status is unknown. Please check:

1. CLICK THIS → https://affiliate-program.amazon.co.uk/ → sign in → **Account Settings**.
2. Confirm the account is **active** (not "pending 3 qualifying sales" or closed). New accounts must make 3 qualifying sales within 180 days or they close.
3. CLICK THIS → **Manage Your Tracking IDs** → note the ID that ends in `-21` (or create one named `quietmindsleep-21`).
4. CLICK THIS → **Account Settings → Edit Your Website and Mobile App List** → ENTER THIS → `https://quietmindsleep.co.uk` → SAVE THIS.
5. Open `site.config.json` in the repository, replace `REPLACE-WITH-YOUR-TAG-21` with your tracking ID, commit. Every affiliate link on the site updates on the next build.

Until step 5 is done, links still work but earn nothing. Product listings are `search` links (approved Special Link format) and work immediately; once you have Amazon access you (or Claude, with browser access) can add verified ASINs in `data/products.json` for direct product-page links.

## 3. Hostinger (blocks going live)

Claude could not reach Hostinger or the live domain from this environment (network policy), so the existing hosting was not inspected. Before deploying:

1. CLICK THIS → hPanel → **Websites** → quietmindsleep.co.uk → **Dashboard** → check what is currently in `public_html` (File Manager). If there is an existing site, download a backup first (**Files → Backups**).
2. Confirm SSL is active (**Security → SSL**, should say Active/Lifetime) and **Force HTTPS** is on.
3. Choose one deployment route (details in `docs/deployment.md`):
   - **Git (recommended):** hPanel → **Advanced → Git** → Create repository → ENTER THIS → repository `https://github.com/bigbossua/quietmindsleep`, branch `hostinger`, directory leave blank (public_html) → SAVE. For a private repo add the SSH key Hostinger shows to GitHub → Settings → Deploy keys. Copy the **webhook URL** into GitHub → Settings → Webhooks so every deploy auto-pulls.
   - **FTP:** hPanel → **Files → FTP Accounts** → create/read credentials → GitHub → Settings → Secrets → add `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
4. Merge the site branch into `main` (or tell Claude to) so the workflow runs.
5. Create the mailbox `hello@quietmindsleep.co.uk` (hPanel → **Emails**) or change `contactEmail` in `site.config.json`.

## 4. Google Search Console (after go-live)

1. CLICK THIS → https://search.google.com/search-console → Add property → **Domain** → ENTER THIS → `quietmindsleep.co.uk`.
2. Copy the TXT record → hPanel → **Domains → DNS / Name Servers** → add TXT → SAVE → back in Search Console click Verify.
3. **Sitemaps** → ENTER THIS → `https://quietmindsleep.co.uk/sitemap.xml` → Submit.
4. Optional analytics: create a GA4 property, put the `G-XXXX` ID in `site.config.json → analytics.ga4MeasurementId`. No tracking loads until you do, and the cookie policy already describes this.

## 5. Email list (optional, later)

Choose a provider (Kit, MailerLite, Mailchimp…), create a form/endpoint, and set `email.provider` and `email.formAction` in `site.config.json`. Until then the sign-up box shows a friendly notice and links to the on-site plan.
