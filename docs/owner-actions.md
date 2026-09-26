# Owner actions — what only you can do

Everything below needs your account access. Each item says exactly what to click. Nothing else on the site is waiting on you.

**Current state and the single task list live in `docs/PROJECT-REPORT.md` (MASTER STATUS).** This file is the how-to; if the two ever disagree, the master status wins.

## 1. Semrush API units (blocks the research step)

The Semrush connector is authorised, but the account has **no API units**, so every research request is refused. Until this is fixed the keyword database has blank volume/KD columns and every page is marked `draft-pending-validation`.

CLICK THIS → https://www.semrush.com/mcp-access → ENTER THIS → choose an API unit package for your subscription → SAVE THIS → confirm the purchase.

Then tell Claude "Semrush units are available" and the research step in `docs/research-process.md` runs: UK keyword validation for all 440 planned keywords, competitor keyword gaps, question research, and a written recommendation of which planned pages to keep, merge, rewrite or replace.

Alternative without API units: export keywords from the Semrush web interface (Keyword Magic Tool → UK database → Export CSV) and run `npm run ingest:semrush -- path/to/export.csv`.

## 2. Amazon Associates — COMPLETE (verified 2026-09-25)

Tracking ID `kleantouch-21` is set in `site.config.json`; `https://quietmindsleep.co.uk` is on the Associates website list; all 19 products in `data/products.json` are direct `/dp/` links with verified ASINs (`reports/amazon-status.md`). The live-site check confirms every Amazon link carries the tag and the disclosure precedes the first link on every affiliate page. Nothing to do here. Do not change the ASINs or the tag unless a documented problem appears; check **Reports → Link-Type Performance** in Associates Central monthly (`docs/amazon-runbook.md`).

## 3. Hostinger — site is LIVE (deployed 2026-09-25); two items remain

(Update 26 Sep 10:15 UTC: redeployed to `c7a045c` = current `main` by the same manual procedure, owner-approved; see `docs/PROJECT-REPORT.md`.) The site was first deployed on 2026-09-25 from commit `fd5fc54` over SSH from the owner's PC (the workflow's own rsync/tar procedure, using the `quietmindsleep-hostinger-deploy` key already authorised in hPanel → Advanced → SSH Access). The independent GitHub-runner check (`verify-live.yml`, last run 26 Sep 08:17 UTC, `reports/live-verification.md`) passes 22 of 23 checks: homepage 200 over HTTPS, http→https 301, robots, sitemap (114 URLs, all 200), canonicals, assets, 404 template, sampled internal links, affiliate tag/disclosure, search. The one failure is the `www` certificate below.

**Why these are still open (status 26 Sep):** both need hPanel or GitHub Settings access. The cloud session has no browser and its network policy blocks Hostinger, and the owner has asked that no further browser sessions be started. As of 26 Sep the desktop bridge environment is no longer registered either, so a browser session cannot be started from the cloud at all. Each item below is therefore an approval point: do the clicks yourself, or reconnect the desktop bridge (open this repository in Claude Desktop, or run `claude remote-control` in the repo folder) and say "do owner-actions §3 and §4"; Claude then works from your signed-in browser and, for the deploy secrets, can set them with `gh secret set SSH_PRIVATE_KEY < path/to/key` on your PC so the key never appears in chat. Once done, say so and Claude re-runs `verify-live.yml` and reports the result.

Still on the owner (about 5 minutes):
1. ~~**SSL for `www`**~~ — **DONE 26 Sep 14:04 UTC** (Lifetime SSL reinstalled covering apex + www; live check 23/23). Original steps kept for reference: hPanel → Websites → quietmindsleep.co.uk → Security → **SSL**. The certificate currently covers only `quietmindsleep.co.uk`, so `https://www.quietmindsleep.co.uk` fails the TLS handshake (`www` is a CNAME to Hostinger's CDN, which presents the apex-only certificate). Install/reissue the free SSL so it includes `www`, and turn on **Force HTTPS**. `.htaccess` already redirects www → non-www once the certificate exists.
2. **GitHub Actions SSH secrets** so every push to `main` deploys automatically (today's runs show `deploy-ssh: skipped`). GitHub → `bigbossua/quietmindsleep` → Settings → Secrets and variables → Actions: `SSH_HOST` = the SSH IP shown in hPanel → Advanced → SSH Access, `SSH_USER` = the `u…` username there, `SSH_PORT` = `65002`, `SSH_PRIVATE_KEY` = contents of the private key file for `quietmindsleep-hostinger-deploy` (on the owner's PC). Never paste the key anywhere else. Until then, redeploy manually with the same procedure or via the `hostinger` branch route in `docs/go-live.md`.
3. Create the mailbox `hello@quietmindsleep.co.uk` (hPanel → Emails) or change `contactEmail` in `site.config.json`.

## 4. Google Search Console — steps 1–4 DONE (25–26 Sep 2026)

Domain property verified (TXT, first try); sitemap Success with 114 URLs; indexing requested for the homepage and 8 hubs (`/falling-asleep/` was already on Google). Current state: `docs/PROJECT-REPORT.md`. Steps kept for reference; only 5–6 remain optional.

1. CLICK THIS → https://search.google.com/search-console → Add property → **Domain** → ENTER THIS → `quietmindsleep.co.uk`.
2. Copy the TXT record → hPanel → **Domains → DNS / Name Servers** → add TXT → SAVE → back in Search Console click Verify (DNS can take up to an hour).
3. **Sitemaps** → ENTER THIS → `https://quietmindsleep.co.uk/sitemap.xml` → Submit.
4. **URL Inspection → Request indexing** for these 10 URLs, one at a time: `https://quietmindsleep.co.uk/` and the nine hubs `/falling-asleep/`, `/waking-at-night/`, `/quiet-the-mind/`, `/relaxation/`, `/sleep-sounds/`, `/sleep-environment/`, `/sleep-habits/`, `/sleep-products/`, `/sleep-questions/`.
5. Optionally add `bigbossua`'s Claude session as a user later so the 6-week review (`docs/maintenance.md`) can read Performance data; until then export Performance → Pages as CSV when asked.
6. Optional analytics: create a GA4 property, put the `G-XXXX` ID in `site.config.json → analytics.ga4MeasurementId`. No tracking loads until you do, and the cookie policy already describes this.

## 5. Email list (optional, later)

Choose a provider (Kit, MailerLite, Mailchimp…), create a form/endpoint, and set `email.provider` and `email.formAction` in `site.config.json`. Until then the sign-up box shows a friendly notice and links to the on-site plan.
