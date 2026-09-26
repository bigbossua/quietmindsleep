# Quiet Mind Sleep — MASTER STATUS

**The single source of truth for this project.** Last reconciled: **2026-09-26 14:10 UTC** by the master Claude Code session on the owner's PC (repository `C:\Users\ukrai\Downloads\quietmindsleep`).

How this file is kept true:
- It consolidates every Quiet Mind Sleep workstream: the cloud build/architecture session, the "Amazon Associates UK integration" desktop session, the "Launch ops: SSL, Search Console, Associates" desktop session, and this master session.
- Where sources disagreed, the repository, Git history (branches `main`, `amazon-links`, `launch-ops`, `hostinger`, `live-reports`, `link-reports`), GitHub Actions results and live checks win over session notes. Each fact below cites its evidence.
- Work happens in one place: this repository, driven by the master local session. Do not start new Quiet Mind Sleep sessions for sub-tasks; add them to the task list at the bottom.
- `docs/owner-actions.md` holds the click-by-click instructions for owner tasks. This file holds the state.

---

## MASTER STATUS

**The site is LIVE and passes all 23 live checks, apex and `www` (26 Sep 14:05 UTC). It serves the current `main` build (`c7a045c`, redeployed 26 Sep 10:15 UTC).**
- One launch item is still open: the CI deploy secrets.
- One follow-up: the `www` CDN certificate must rotate before 20 Oct.
- An apex HTTPS outage on 26 Sep is resolved. It was first seen at 13:59 UTC and fixed at 14:04 UTC; its start is unknown, sometime after the last good check at 10:20 UTC; see DONE.

Semrush validation is still blocked on API units.

| Area | State | Evidence |
|---|---|---|
| Live site `https://quietmindsleep.co.uk` | ✅ LIVE, 23/23 | Local verify-live run 26 Sep 14:05 UTC: **23/23** (`reports/live-verification.md`). Earlier CI verify-live run `36230810632` 26 Sep 08:48 UTC: 22/23 (`live-reports/verify.log`). |
| Build deployed on the server | ✅ `c7a045c` (26 Sep 10:15 UTC, manual SSH deploy approved by the owner) | Server `.deploy-info`: `source=c7a045c…`, 154 files. The previous docroot (`fd5fc54`) is backed up on the server at `~/qms-backups/public_html-20260926T101506Z.tar.gz`. |
| Build on `main` / `hostinger` branch | ✅ `c7a045c` built and audited by CI | Build and deploy run `36230808962`: build ✅, deploy-ssh skipped, verify skipped. |
| Apex certificate | ✅ covers apex + `www` | hPanel: Lifetime SSL **Active**. Served certificate (14:04 UTC): SAN `quietmindsleep.co.uk, www.quietmindsleep.co.uk`, valid 26 Sep–25 Dec 2026. |
| `https://www.` | ✅ 301 → `https://quietmindsleep.co.uk/`; ⚠️ served an older certificate | The `www` edge still presents a certificate valid 22 Jul–20 Oct 2026 (SAN apex + www, chain verifies OK). It must rotate to the new certificate before 20 Oct; see task #2. |
| GitHub Actions auto-deploy | ❌ secrets not set | Every run so far shows `deploy-ssh: skipped`. |
| Search Console | ✅ verified, sitemap accepted, indexing requested | Launch-ops desktop session, 25–26 Sep. |
| Amazon Associates | ✅ complete | Commit `fd5fc54`; `reports/amazon-status.md`; the live check shows tagged `/dp/` links. |
| Semrush | ❌ `no_api_units` (re-tested 26 Sep ~10:00 UTC) | All 440 keyword rows are `draft-pending-validation`. |
| External source links | ✅ 0 dead, in the repo and live | Link check run `36212510468`: 191×200, 13×403 (bot-blocked), 0 dead. The fixes (`3ea0f71`) went live with the 26 Sep redeploy; none of the 4 affected articles carries the old URLs any more (checked 10:20 UTC). |

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
- 26 Sep 10:15 UTC — Production redeployed to `c7a045c` (the current `main` build, from the `hostinger` branch), with the owner's approval. This was the same tar-over-SSH procedure with the workflow's overwrite guard:
  - the server's top-level entries matched the build exactly;
  - the old docroot was backed up to `~/qms-backups/` first;
  - 154 files were deployed;
  - verified afterwards: 22/23, and the dead links are gone.
- 26 Sep — **`www` fixed and apex SSL outage resolved.**
  - About 11:19 UTC: `https://www` started presenting a certificate that covers `www`, and it now gives a 301 to the apex.
  - Outage: by 13:59 UTC the apex served **no certificate at all** (TLS alert 80 on every edge IP), and hPanel → Security → SSL showed nothing installed, only an "Install SSL" button. The old certificate had evidently been removed during the reissue.
  - Fix: with the owner's approval, the master session clicked **Install SSL** (free Lifetime SSL, no cost) at about 14:03 UTC.
  - Result: HTTPS was back at 14:04:48 UTC with a new certificate covering apex + `www` (valid 26 Sep–25 Dec 2026), and hPanel shows it Active.
  - Full live check at 14:05 UTC: **23/23**.
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

- **Associates report reading** (clicks, orders, earnings for `kleantouch-21`). The launch-ops desktop session is doing this; its numbers are pending.
- **Master session:** waiting on GitHub access for the secrets (task #4).

---

## REMAINING

- Confirm the `www` edge serves the new certificate (valid to 25 Dec) well before the old one expires on 20 Oct 2026. The weekly `verify-live.yml` run will catch any failure.
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
| GitHub Actions secrets `SSH_HOST`, `SSH_USER`, `SSH_PORT`, `SSH_PRIVATE_KEY` not set | Auto-deploy on push. Until then, every production update is a manual SSH deploy that needs the owner's approval. | The owner adds them in GitHub → Settings → Secrets and variables → Actions (values from hPanel SSH Access; the key file stays on the owner's PC). Alternatively, install `gh` on this PC and run `gh auth login`; Claude then sets the three non-key values. This PC has no `gh`, and the Claude in Chrome extension refuses github.com. |
| Semrush API units | All keyword validation and research | The owner buys units at https://www.semrush.com/mcp-access. Re-tested 26 Sep: `no_api_units`. Do not buy units without the owner. |

---

## DEPLOYMENT STATUS

- **Production:** Hostinger shared plan, `domains/quietmindsleep.co.uk/public_html`. It serves the `c7a045c` build (= `main`), deployed manually over SSH on 26 Sep 10:15 UTC; see `.deploy-info` in the docroot. The previous deploy was `fd5fc54` on 25 Sep 17:20; its backup is in `~/qms-backups/` on the server.
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
  - Plus local verify-live runs on 26 Sep: 22/23 at 10:20 UTC (www only), then **23/23 at 14:05 UTC** after the SSL fix.
- **Drift:** none. Live = `main` = `c7a045c`. The `launch-ops` branch changes only docs and the verify script, so it needs no redeploy.

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
- SSL: hPanel shows Lifetime SSL **Active** (reinstalled 26 Sep about 14:03 UTC after the apex was found with no certificate).
  - The apex serves a certificate for `quietmindsleep.co.uk` + `www.quietmindsleep.co.uk`, valid 26 Sep–25 Dec 2026 (Hostinger auto-renews it).
  - The `www` edge still serves an older certificate covering both names, valid to 20 Oct 2026; watch for it to rotate (task #2).
- Redirects, all verified 26 Sep 14:05 UTC:
  - `http://` → `https://` (301);
  - `https://www.` → `https://quietmindsleep.co.uk/` (301, path preserved);
  - `http://www.` → https (301).
- If HTTPS ever breaks again, check hPanel → Security → SSL first. If it shows only "Install SSL", the certificate has been removed; reinstalling the free Lifetime SSL restored the site within about 1 minute.
- The `hello@` mailbox does not exist yet (no MX record).

---

## NEXT ACTIONS — single task list

| # | Task | Owner | Status |
|---|---|---|---|
| 1 | SSL covering `www`, and the www → apex redirect | master session | **done** 26 Sep 14:04 UTC (Lifetime SSL reinstalled after the outage; 23/23) |
| 2 | Confirm `https://www.` serves the new certificate (valid to 25 Dec) before the old one expires on 20 Oct 2026 | master session / weekly verify-live | check in the week of 5 Oct |
| 3 | Read Associates clicks/orders/earnings for `kleantouch-21` | launch-ops session → master | pending |
| 4 | Set the GitHub secrets `SSH_HOST`, `SSH_USER`, `SSH_PORT`, `SSH_PRIVATE_KEY` | owner (or owner installs `gh` + `gh auth login`, then Claude sets the three non-key values) | blocked |
| 5 | Redeploy `main` (`c7a045c`) to production | master session | **done** 26 Sep 10:15 UTC (manual SSH, owner-approved). After #4, trigger `gh workflow run build-deploy.yml --ref main` once to prove the CI route. |
| 6 | Live verification 23/23 | master session | **done** locally 26 Sep 14:05 UTC. Next CI run: Monday 28 Sep, 07:30 UTC (scheduled). |
| 7 | Merge `launch-ops` into `main` (this status doc + the verify-live reporting fix) | owner approval | ready |
| 8 | Open the 13 bot-blocked source URLs once (`reports/writer-notes.md`) | owner or a browser session | open |
| 9 | Create the `hello@` mailbox or change `contactEmail` | owner | open |
| 10 | Buy Semrush API units, then run the research step (`docs/research-process.md`) | owner, then Claude | blocked |
| 11 | Optional: GA4 ID; email-list provider | owner | optional |
| 12 | 6-week growth review | scheduled cloud session | 6 Nov 2026 |
