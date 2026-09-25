# Owner actions — what only you can do

Everything below needs your account access. Each item says exactly what to click. Nothing else on the site is waiting on you.

## 1. Semrush API units (blocks the research step)

The Semrush connector is authorised, but the account has **no API units**, so every research request is refused. Until this is fixed the keyword database has blank volume/KD columns and every page is marked `draft-pending-validation`.

CLICK THIS → https://www.semrush.com/mcp-access → ENTER THIS → choose an API unit package for your subscription → SAVE THIS → confirm the purchase.

Then tell Claude "Semrush units are available" and the research step in `docs/research-process.md` runs: UK keyword validation for all 440 planned keywords, competitor keyword gaps, question research, and a written recommendation of which planned pages to keep, merge, rewrite or replace.

Alternative without API units: export keywords from the Semrush web interface (Keyword Magic Tool → UK database → Export CSV) and run `npm run ingest:semrush -- path/to/export.csv`.

## 2. Amazon Associates tracking ID (blocks commission, not the site)

The Amazon Associates account **cannot be reached from the cloud build environment**: it has no browser, and the network policy blocks amazon.co.uk, affiliate-program.amazon.co.uk and webservices.amazon.co.uk. An authenticated Amazon tab open on your computer is not visible to a cloud session. Two ways to complete this:

**Option A — you do it (about 20 minutes):**
1. CLICK THIS → Associates Central → **Account Settings → Manage Your Tracking IDs** → note the ID ending in `-21`.
2. CLICK THIS → **Account Settings → Edit Your Website and Mobile App List** → ENTER THIS → `https://quietmindsleep.co.uk` → SAVE.
3. In a terminal in the repository: `node scripts/set-amazon-tag.mjs <your-id-21>`; commit.
4. Optionally verify one listing per product and fill `data/asin-verification.csv`, then `node scripts/ingest-asins.mjs data/asin-verification.csv`; commit. Full steps in `docs/amazon-runbook.md`.

**Option B — Claude does it from your computer:** open this repository in Claude Desktop (or run `claude remote-control` in the repo folder) so Claude can use your signed-in browser, and say "run docs/amazon-runbook.md". Claude will inspect the account, set the tag, verify listings and record ASINs without copying any credentials.

Until the tag is set, links work but earn nothing. Search links are an approved Special Link format and remain valid after the tag is set.

## 3. Hostinger — site is LIVE (deployed 2026-09-25); two items remain

The site was deployed on 2026-09-25 from commit `fd5fc54` over SSH from the owner's PC (the workflow's own rsync/tar procedure, using the `quietmindsleep-hostinger-deploy` key already authorised in hPanel → Advanced → SSH Access). `scripts/verify-live.mjs` passed every check except the `www` one below: homepage 200 over HTTPS, http→https 301, robots, sitemap (114 URLs, all 200), canonicals, assets, 404 template, search.

Still on the owner (about 5 minutes):
1. **SSL for `www`** — hPanel → Websites → quietmindsleep.co.uk → Security → **SSL**. The certificate currently covers only `quietmindsleep.co.uk`, so `https://www.quietmindsleep.co.uk` fails the TLS handshake (`www` is a CNAME to Hostinger's CDN, which presents the apex-only certificate). Install/reissue the free SSL so it includes `www`, and turn on **Force HTTPS**. `.htaccess` already redirects www → non-www once the certificate exists.
2. **GitHub Actions SSH secrets** so every push to `main` deploys automatically (today's runs show `deploy-ssh: skipped`). GitHub → `bigbossua/quietmindsleep` → Settings → Secrets and variables → Actions: `SSH_HOST` = the SSH IP shown in hPanel → Advanced → SSH Access, `SSH_USER` = the `u…` username there, `SSH_PORT` = `65002`, `SSH_PRIVATE_KEY` = contents of the private key file for `quietmindsleep-hostinger-deploy` (on the owner's PC). Never paste the key anywhere else. Until then, redeploy manually with the same procedure or via the `hostinger` branch route in `docs/go-live.md`.
3. Create the mailbox `hello@quietmindsleep.co.uk` (hPanel → Emails) or change `contactEmail` in `site.config.json`.

## 4. Google Search Console (after go-live)

1. CLICK THIS → https://search.google.com/search-console → Add property → **Domain** → ENTER THIS → `quietmindsleep.co.uk`.
2. Copy the TXT record → hPanel → **Domains → DNS / Name Servers** → add TXT → SAVE → back in Search Console click Verify.
3. **Sitemaps** → ENTER THIS → `https://quietmindsleep.co.uk/sitemap.xml` → Submit.
4. Optional analytics: create a GA4 property, put the `G-XXXX` ID in `site.config.json → analytics.ga4MeasurementId`. No tracking loads until you do, and the cookie policy already describes this.

## 5. Email list (optional, later)

Choose a provider (Kit, MailerLite, Mailchimp…), create a form/endpoint, and set `email.provider` and `email.formAction` in `site.config.json`. Until then the sign-up box shows a friendly notice and links to the on-site plan.
