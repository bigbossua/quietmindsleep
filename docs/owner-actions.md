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

## 3. Hostinger (blocks going live) — about 5 minutes

Everything on the GitHub side is done: the production build is on the public `hostinger` branch and CI republishes it on every push to `main`. Hostinger's own panel cannot be reached from the cloud build environment (hpanel.hostinger.com and api.hostinger.com are blocked by its network policy, and there is no Hostinger connector), so the final connection is a short job in hPanel. Because the repository is public, **no SSH key, token or password is needed**.

Follow `docs/go-live.md`. In short:
1. hPanel → Websites → quietmindsleep.co.uk → File Manager → check `public_html` is empty or only holds Hostinger's placeholder (back up anything else first).
2. hPanel → Advanced → **Git** → Create repository → ENTER `https://github.com/bigbossua/quietmindsleep.git`, branch `hostinger`, directory blank → Create.
3. Copy the webhook URL Hostinger shows into GitHub → Settings → Webhooks (push events) so future releases deploy automatically.
4. Security → SSL: Active, Force HTTPS on.
5. Create the mailbox `hello@quietmindsleep.co.uk` (hPanel → Emails) or change `contactEmail` in `site.config.json`.

Then run `node scripts/verify-live.mjs` from any machine with internet, or allow `quietmindsleep.co.uk` in this environment's network settings and tell Claude "verify the live site".

## 4. Google Search Console (after go-live)

1. CLICK THIS → https://search.google.com/search-console → Add property → **Domain** → ENTER THIS → `quietmindsleep.co.uk`.
2. Copy the TXT record → hPanel → **Domains → DNS / Name Servers** → add TXT → SAVE → back in Search Console click Verify.
3. **Sitemaps** → ENTER THIS → `https://quietmindsleep.co.uk/sitemap.xml` → Submit.
4. Optional analytics: create a GA4 property, put the `G-XXXX` ID in `site.config.json → analytics.ga4MeasurementId`. No tracking loads until you do, and the cookie policy already describes this.

## 5. Email list (optional, later)

Choose a provider (Kit, MailerLite, Mailchimp…), create a form/endpoint, and set `email.provider` and `email.formAction` in `site.config.json`. Until then the sign-up box shows a friendly notice and links to the on-site plan.
