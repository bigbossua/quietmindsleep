# Quiet Mind Sleep — MASTER STATUS

**The single source of truth for this project.** Last reconciled: **2026-09-26 ~11:00 UTC** by the master Claude Code session on the owner's PC (repository `C:\Users\ukrai\Downloads\quietmindsleep`).

How this file is kept true:
- It consolidates every Quiet Mind Sleep workstream: the cloud build/architecture session, the "Amazon Associates UK integration" desktop session, the "Launch ops: SSL, Search Console, Associates" desktop session, and this master session.
- Where sources disagreed, the repository, Git history (branches `main`, `amazon-links`, `launch-ops`, `hostinger`, `live-reports`, `link-reports`), GitHub Actions results and live checks win over session notes. Each fact below cites its evidence.
- Work happens in one place: this repository, driven by the master local session. Do not start new Quiet Mind Sleep sessions for sub-tasks; add them to the task list at the bottom.
- `docs/owner-actions.md` holds the click-by-click instructions for owner tasks. This file holds the state.

---

## MASTER STATUS

**The site is LIVE and healthy on the apex domain. Three launch items are still open:**
1. `www` TLS.
2. CI deploy secrets.
3. Redeploying `main`: the live build is one content fix behind.

Semrush validation is still blocked on API units.

| Area | State | Evidence |
|---|---|---|
| Live site `https://quietmindsleep.co.uk` | ✅ LIVE | Local verify-live run 26 Sep ~10:55 UTC: 22/23. CI verify-live run `36230810632` 26 Sep 08:48 UTC: 22/23 (`live-reports/verify.log`). |
| Build deployed on the server | ⚠️ `fd5fc54` (25 Sep 17:20, manual SSH deploy) | Server docroot timestamps are 25 Sep 17:20. `main` is at `c7a045c`. |
| Build on `main` / `hostinger` branch | ✅ `c7a045c` built and audited by CI | Build and deploy run `36230808962`: build ✅, deploy-ssh skipped, verify skipped. |
| `https://www.` | ❌ TLS fails; certificate covers the apex only | openssl, 26 Sep 09:29 UTC: `CN=quietmindsleep.co.uk`, SAN `DNS:quietmindsleep.co.uk` only, Let's Encrypt YE2, valid 25 Sep–24 Dec 2026. Node: `ERR_TLS_CERT_ALTNAME_INVALID`. |
| GitHub Actions auto-deploy | ❌ secrets not set | Every run so far shows `deploy-ssh: skipped`. |
| Search Console | ✅ verified, sitemap accepted, indexing requested | Launch-ops desktop session, 25–26 Sep. |
| Amazon Associates | ✅ complete | Commit `fd5fc54`; `reports/amazon-status.md`; the live check shows tagged `/dp/` links. |
| Semrush | ❌ `no_api_units` (re-tested 26 Sep ~11:00 UTC) | All 440 keyword rows are `draft-pending-validation`. |
| External source links | ✅ in the repo; ⚠️ 3 dead links still on the live site | Link check run `36212510468`: 191×200, 13×403 (bot-blocked), 0 dead. The fixes (`3ea0f71`) are not deployed yet, so 4 live articles still carry the old dead URLs. |

---

## DONE

Each item: date — what — evidence.

**Architecture and build**
- 25 Sep — Static site platform: custom Node generator (Markdown + JSON), design system, SVG illustrations, OG images, search, sitemap, robots, `.htaccess` (HTTPS + non-www), 404, structured data. Commit `b62a1f0`; `docs/architecture.md`.
- 25 Sep — All 93 planned articles written across 9 hubs plus resources. 116 HTML pages, 114 indexable. Commit `776f201`; `reports/audit.md`.
- 25 Sep — Audit tooling: 0 blocking issues, 0 orphans, 0 broken internal links. The only 2 warnings are short meta descriptions on the noindex `/404.html` and `/search/` pages. See `reports/audit.md`.
- 25 Sep — Internal link map: every article has 4–8 contextual links. The money pages get the most incoming links (masks 56, headphones 41, white-noise machines 41, earplugs 26). See `reports/link-map.md`.
- 25 Sep — SEO review: 0 titles over 65 characters, no duplicate titles or H1s. Five cannibalisation pairs are flagged for a Semrush SERP check. Commit `b1c07ae`; `reports/seo-review.md`.

**Amazon Associates** (desktop session, 25 Sep; commits `d5c82d2`, `fd5fc54`, `19c6f0a`)
- Associates Central is signed in and the account is in normal standing.
  - The tracking ID is `kleantouch-21`, the only ID on the account. No `quietmindsleep-21` ID was created.
  - `https://quietmindsleep.co.uk` was not on the website list. It was added, and the change was confirmed as saved.
- 19/19 ASINs were verified on amazon.co.uk with SiteStripe Special Links under `kleantouch-21`, and each link was tested in Chrome. See `data/asin-verification.csv` and `reports/amazon-status.md`.
  - The session's own output files were compared with the repo on 26 Sep. The CSV is identical; the repo's `amazon-status.md` is the newer, more complete version.
- Build result: 56 affiliate pages, 134 links. All links have the form `https://www.amazon.co.uk/dp/<ASIN>/?tag=kleantouch-21` with `rel="sponsored nofollow noopener"`, and the disclosure appears on every page.
- Windows path fix in `scripts/lib.mjs` and `src/lib/config.mjs` (`fileURLToPath`).
- The `amazon-links` branch (`fd5fc54`) is contained in `main`. Nothing is pending on that branch.

**Deployment and verification**
- 25 Sep — Deploy tooling: `build-deploy.yml` (build, audit, publish the `hostinger` branch, SSH deploy with an overwrite guard, post-deploy verify), `verify-live.yml`, `scripts/verify-live.mjs`, and snapshots. Commits `c19d171`, `81d649d`, `c645343`, `3ece20a`, `13139c6`.
- 25 Sep 17:20 — First production deploy of `fd5fc54`, over SSH from the owner's PC with the `quietmindsleep-deploy` key and the owner's approval. Commit `78f9c22`.
- 25–26 Sep — Independent CI verification: 22/23 at 18:14, 08:17 and 08:48 UTC. The only failure is the `www` TLS check.
- 26 Sep — CI names each missing deploy secret in the run summary (presence only). Commit `e984e88`.
- 26 Sep — `verify-live.mjs` reporting fix (branch `launch-ops`):
  - the www failure now shows the TLS error code;
  - the homepage check no longer prints "unexpected HTML" when it passes.

**External links**
- 26 Sep — First CI link check. 3 dead links were replaced: the Mental Health Foundation sleep page (×2), the Drinkaware alcohol-and-sleep page, and the Sleep Foundation sleep-maintenance insomnia page. The checker now retries with browser headers. Commit `3ea0f71`.
- A monthly link check is scheduled (`check-links.yml`, 1st of the month at 06:15 UTC) and publishes to the `link-reports` branch. Commit `68960bb`.

**Search Console** (launch-ops desktop session, evening of 25 Sep)
- The Domain property `quietmindsleep.co.uk` was verified by DNS TXT on the first try.
- The sitemap `https://quietmindsleep.co.uk/sitemap.xml` was submitted: status Success, 114 discovered URLs.
- Indexing was requested for these 9 URLs; each showed "URL is not on Google" before the request:
  - `/`
  - `/quiet-the-mind/`
  - `/waking-at-night/`
  - `/sleep-sounds/`
  - `/sleep-environment/`
  - `/relaxation/`
  - `/sleep-habits/`
  - `/sleep-products/`
  - `/sleep-questions/`
- `/falling-asleep/` already showed "URL is on Google".

**Hostinger**
- The SSH details were confirmed in hPanel → Websites → quietmindsleep.co.uk → Advanced → SSH Access on 26 Sep:
  - SSH is ACTIVE on port 65002;
  - the IP and the `u…` username are shown there (deliberately not written into this public repo);
  - the `quietmindsleep-deploy` key is listed (added 25 Sep).

**Monitoring**
- Weekly live verification runs in GitHub Actions (Mondays 07:30 UTC) and publishes to `live-reports`. Commit `73c1e82`.
- A weekly cloud launch-check routine runs Mondays 08:47 London time (`docs/maintenance.md`).
- A 6-week growth review is scheduled for 6 Nov 2026.
- The Search Console + Associates browser routine was **disabled** on 26 Sep at the owner's request. Commit `a88f119`.

---

## IN PROGRESS

- **www SSL reissue in hPanel.** The launch-ops desktop session is doing this; it is not being redone here in parallel. Its certificate SANs and redirect result are pending.
- **Associates report reading** (clicks, orders, earnings for `kleantouch-21`). The launch-ops desktop session is doing this; its numbers are pending.
- **Master session:** re-checking `www` periodically, and waiting on GitHub access or deploy approval (see NEXT ACTIONS).

---

## REMAINING

- Redeploy `main` (`c7a045c`) to production so the 3 dead-link fixes go live on:
  - `falling-asleep/cant-sleep-before-a-big-day`
  - `falling-asleep/things-to-do-before-bed`
  - `quiet-the-mind/how-to-calm-your-mind-before-bed`
  - `waking-at-night/waking-up-in-the-middle-of-the-night`
- After the www certificate is reissued: re-run `verify-live.yml` and expect 23/23.
- A person should open the 13 bot-blocked (403) source URLs once. They are listed in `reports/writer-notes.md`.
- Mailbox `hello@quietmindsleep.co.uk`: no MX record was found on 26 Sep. Either create the mailbox or change `contactEmail` in `site.config.json`.
- Optional: GA4 measurement ID (`site.config.json` → `analytics.ga4MeasurementId`, currently empty) and an email-list provider (currently `none`).
- After Semrush units exist:
  - validate the 440 keywords;
  - research competitors (15 candidates in `data/competitors.csv`);
  - resolve the 5 cannibalisation pairs;
  - move the 93 articles from `status: draft` to validated.
- Content policy: **no new article batches** until Google has evaluated the existing 114 pages. Only improve existing pages, driven by Search Console and Semrush data.

---

## BLOCKED

| Blocker | Blocks | Needs |
|---|---|---|
| GitHub Actions secrets `SSH_HOST`, `SSH_USER`, `SSH_PORT`, `SSH_PRIVATE_KEY` not set | Auto-deploy on push, and CI redeploy of `main` | The owner adds them in GitHub → Settings → Secrets and variables → Actions (values from hPanel SSH Access; the key file stays on the owner's PC). Alternatively, install `gh` on this PC and run `gh auth login`; Claude then sets the three non-key values. This PC has no `gh`, and the Claude in Chrome extension refuses github.com. |
| Production write approval | A manual SSH redeploy of the `hostinger` branch (the same procedure as 25 Sep) | An explicit "yes, redeploy" from the owner. SSH access from this PC was confirmed read-only on 26 Sep. |
| `www` certificate | The www → non-www redirect over HTTPS (the one failing live check) | hPanel → Security → SSL reissue including `www`, then Force HTTPS. The launch-ops session is on it. |
| Semrush API units | All keyword validation and research | The owner buys units at https://www.semrush.com/mcp-access. Re-tested 26 Sep: `no_api_units`. Do not buy units without the owner. |

---

## DEPLOYMENT STATUS

- **Production:** Hostinger shared plan, `domains/quietmindsleep.co.uk/public_html`. It serves the `fd5fc54` build, deployed manually over SSH on 25 Sep 17:20.
- **Pipeline:** each push to `main` goes through `build-deploy.yml`:
  1. `build`: npm ci, build, audit, linkmap, register;
  2. publish to the `hostinger` branch (currently `baed820` = `c7a045c`);
  3. `deploy-ssh`: skipped until the secrets exist;
  4. `verify`: skipped along with deploy-ssh.
- **Fallback routes** (`docs/go-live.md`):
  - Route 1: SSH from Actions, once the secrets exist.
  - Route 2: Hostinger Git pull of the `hostinger` branch.
  - Manual: `tar | ssh` from this PC with the `quietmindsleep-deploy` key. The overwrite guard must be kept, and the owner's approval is needed each time.
- **Last runs:**
  - Build and deploy `36230808962`: success, deploy skipped.
  - Verify live site `36230810632`: failure, 22/23, www only.
  - No runs since 08:48 UTC on 26 Sep.
- **Drift between `fd5fc54` and `c7a045c`:** 4 article source-link fixes, plus CI/docs changes. No product, tag or template change.

## SEO STATUS

- 116 pages (114 indexable), 93 articles (~154,800 words), 9 topic hubs.
- Structured data: Organization and WebSite on 116 pages, BreadcrumbList 111, Article 93, FAQPage 50, CollectionPage 9.
- `data/keywords.csv`: 440 rows (93 primary, 347 secondary). Volume, KD and intent are blank; every row is `draft-pending-validation`. Semrush remains blocked (`no_api_units`, 26 Sep).
- Competitors: 0 verified; 15 candidates listed.
- Cannibalisation pairs awaiting SERP checks (`reports/seo-review.md`):
  - anxiety at night / sleep anxiety
  - white noise for sleep / is it bad to sleep with white noise
  - brown vs white noise / pink vs white noise
  - brown vs white noise / earplugs vs white noise
  - pink vs white noise / earplugs vs white noise
- Every Semrush figure is left blank rather than estimated (a project rule).

## AMAZON STATUS

- **Complete.**
  - Tracking ID `kleantouch-21`.
  - The site is on the Associates website list.
  - 19/19 products have verified ASINs, are direct `/dp/` links, `status: active`, `lastChecked: 2026-09-25`.
- Live check: the sampled Amazon links carry the tag and are `/dp/` links, and the disclosure precedes the first link.
- ASINs:
  - B07PRG2CQY Manta Sleep Mask
  - B0C7GPGR19 Aosun silk mask
  - B09DXXWVL4 Umisleep weighted mask
  - B0B785VC19 Mack's Ultra Soft
  - B0D3V6TR98 Loop Quiet 2
  - B01LHL84ZI Quies wax
  - B07RJTW7DB Marpac Dohm (UK plug)
  - B019GAFJEG LectroFan Classic
  - B01D50RZQI Yogasleep Rohm
  - B0CLGTSMCF Musicozy headband
  - B0CRGR2TS5 Soundcore Sleep A20
  - B0D9YWWT26 Panda pillow
  - B08YZ7FM5Z Cosi Home gel pillow
  - B00VWMHFZ8 Deconovo blackout curtains
  - B0D5721NNQ Bemece no-drill blind
  - B0CW99YJHZ Sivio weighted blanket
  - B08HZFC7SN Appletree percale set
  - B01ISWOP4I Silentnight 4.5 tog
  - B0BT7LPSBY DREO tower fan
- Caveats:
  - The weighted mask is Umisleep, not Gravity.
  - The weighted blanket is Sivio.
  - The Panda pillow is fixed-height.
  - The Dohm Classic was out of stock, so the UK-plug Marpac Dohm is used.
  - The Dohm and DREO pages show "Add to basket" but no literal "In stock" label.
- Do not change the tag or the ASINs without a documented problem.
- Pending: Associates clicks/orders/earnings from the launch-ops session.
- Ongoing: check Reports → Link-Type Performance monthly, and keep the 3-qualifying-sales-in-180-days rule in mind (`docs/amazon-runbook.md`).

## SEARCH CONSOLE STATUS

- The Domain property is verified (DNS TXT).
- Sitemap: Success, 114 discovered URLs.
- Indexing was requested for the home page and 8 hubs; `/falling-asleep/` was already indexed.
- Next:
  - read the Coverage/Pages report in about a week;
  - export Performance → Pages for the 6-week review on 6 Nov.
- Optional: add Claude's account as a user.

## HOSTINGER/SSL STATUS

- SSH is ACTIVE on port 65002 and the deploy key is authorised. Access from this PC was confirmed on 26 Sep.
- The apex certificate (Let's Encrypt YE2) is valid until 24 Dec 2026, but its only SAN is `quietmindsleep.co.uk`.
  - `http://www.` gives a 301 to `https://www.`, which fails TLS.
  - `.htaccess` will redirect www to non-www once the certificate covers `www`.
- The www reissue is in progress in the launch-ops session.
- The `hello@` mailbox does not exist yet (no MX record).

---

## NEXT ACTIONS — single task list

| # | Task | Owner | Status |
|---|---|---|---|
| 1 | Reissue SSL to include `www` and turn on Force HTTPS | launch-ops session / owner | in progress |
| 2 | Report the www certificate SANs and redirect result after the reissue | launch-ops session → master | pending |
| 3 | Read Associates clicks/orders/earnings for `kleantouch-21` | launch-ops session → master | pending |
| 4 | Set the GitHub secrets `SSH_HOST`, `SSH_USER`, `SSH_PORT`, `SSH_PRIVATE_KEY` | owner (or owner installs `gh` + `gh auth login`, then Claude sets the three non-key values) | blocked |
| 5 | Redeploy `main`: either CI (`gh workflow run build-deploy.yml --ref main`) after #4, or a manual SSH redeploy of the `hostinger` branch with the owner's approval | master session | waiting on #4 or approval |
| 6 | Run `verify-live.yml`, target 23/23 | master session | after #1 and #5 |
| 7 | Merge `launch-ops` into `main` (this status doc + the verify-live reporting fix) | owner approval | ready |
| 8 | Open the 13 bot-blocked source URLs once (`reports/writer-notes.md`) | owner or a browser session | open |
| 9 | Create the `hello@` mailbox or change `contactEmail` | owner | open |
| 10 | Buy Semrush API units, then run the research step (`docs/research-process.md`) | owner, then Claude | blocked |
| 11 | Optional: GA4 ID; email-list provider | owner | optional |
| 12 | 6-week growth review | scheduled cloud session | 6 Nov 2026 |
