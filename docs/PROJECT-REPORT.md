# Quiet Mind Sleep — project report (25 September 2026)

## Website

| | |
|---|---|
| URL | https://quietmindsleep.co.uk — **LIVE** since 2026-09-25 (deployed commit `fd5fc54`). |
| Technology | Static site: custom Node generator (Markdown + JSON data), one CSS file, one small JS file, self-hosted fonts, SVG illustration system, Open Graph PNGs. No CMS, database or plugins. |
| Hosting | Hostinger, addon domain `domains/quietmindsleep.co.uk/public_html`. `main` is the production source; CI builds, audits and republishes the `hostinger` branch on every push. The first deploy was done over SSH from the owner's PC with the workflow's own procedure because the GitHub Actions SSH secrets are not set yet (`deploy-ssh` skipped) — add them per `docs/owner-actions.md` §3 so pushes to `main` deploy automatically. |
| Status | **Live and verified (2026-09-25): homepage 200 over HTTPS, http→https 301, robots, sitemap 114/114, canonicals, assets, 404, search all pass. Open: `https://www.` fails TLS because the Hostinger certificate does not yet cover `www` (owner action in hPanel → SSL). Not validated in Semrush.** |

## SEO

| | |
|---|---|
| Pages built | 116 HTML pages (93 articles, 9 topic hubs, resources index, 9 trust/legal pages, search, sitemap, 404) |
| Articles | 93 (154,794 body words); all plan entries written |
| Keyword clusters | 9 hubs: Quiet the Mind, Falling Asleep, Waking at Night, Sleep Sounds, Sleep Environment, Relaxation, Sleep Habits, Sleep Products, Sleep Questions (+ Resources) |
| Keyword database | `data/keywords.csv`: 440 rows (93 primary, 347 secondary). **Volume/KD/intent columns blank** — Semrush refused every request (`no_api_units`). Status of every row: `draft-pending-validation`. |
| Competitors researched | 0 verified. 15 candidates listed in `data/competitors.csv` for the Semrush step. |
| Technical | Clean URLs, canonicals, sitemap.xml, robots.txt, breadcrumbs + BreadcrumbList, Article, FAQPage (50 pages with genuine FAQs), WebSite/Organization, CollectionPage; `.htaccess` forcing HTTPS + non-www; 404 page; lazy images with alt text; no third-party scripts unless GA4 is configured. |
| Audit | `reports/audit.md`: 0 blocking issues, 0 orphan pages, 0 broken internal links, 3 warnings (two noindex utility pages with short descriptions; Amazon tag placeholder). |
| Internal linking | `reports/link-map.md/.csv`: every article has 4–8 contextual body links, read-next cards, hub and sidebar links. Money pages receive 5–56 incoming links each (masks 56, headphones 41, white-noise machines 41, earplugs 26). |

## Affiliate

| | |
|---|---|
| Amazon Associates status | **Verified 25 Sep 2026** from the owner's signed-in Associates Central session: account operating normally, no outstanding banners; `quietmindsleep.co.uk` added to the website list (see `reports/amazon-status.md`). |
| Tracking ID status | `kleantouch-21` (the account's existing UK ID) set in `site.config.json`; applied to every link. |
| Affiliate pages | 56 pages carry affiliate components |
| Affiliate links | 134 (all with `rel="sponsored nofollow"`, `tag=` parameter; disclosure at the top of every affiliate article, beside every product component and table, and in the footer) |
| Products | 19 product types, 11 categories, 0 unused; **19 of 19 verified ASINs** with direct `/dp/` Special Links, each tested in the browser; `status: active`, `lastChecked: 2026-09-25` |
| Remaining Amazon actions | Confirm click attribution in Associates Central → Reports → Link-Type Performance the day after go-live; optionally create a site-specific `quietmindsleep-21` tracking ID for per-site reporting; keep the 3-qualifying-sales-in-180-days rule in mind. |

## Google

| | |
|---|---|
| Search Console | Not set up (needs your Google account). Steps in `docs/owner-actions.md`. |
| Sitemap | Generated at `/sitemap.xml` (114 URLs, search excluded). Live; submit in Search Console. |
| Indexing | Site is live; nothing indexed yet until Search Console is set up and the sitemap submitted. |

## Content

| | |
|---|---|
| Articles published (built) | 93 |
| Queued | 0 from the plan; new opportunities will come from the Semrush step |
| Requiring review | 93 — every article is `status: draft` pending (a) Semrush validation of its target keyword and (b) an external-link check that could not run here (network blocked). Writers flagged the specific URLs they were unsure of in `reports/writer-notes.md`. |

## Remaining actions

### YOU MUST DO
1. **Semrush:** buy API units at https://www.semrush.com/mcp-access (or export Keyword Magic CSVs from the web app). Then say "Semrush units are available".
3. **Hostinger:** in hPanel → Security → SSL, reissue the free certificate so it covers `www.quietmindsleep.co.uk` and turn on Force HTTPS; create the `hello@` mailbox. Add the four SSH secrets in GitHub (`docs/owner-actions.md` §3) so CI deploys future pushes.
4. ~~Merge the feature branch into `main`~~ — done; `main` is live.
4. **Merge** the feature branch into `main` (or tell Claude to) so the deploy workflow runs.
5. **Search Console:** verify the domain (DNS TXT) and submit the sitemap after deploy.
6. Optional: GA4 measurement ID; email provider endpoint.

### CLAUDE WILL DO
1. Run the full Semrush research (keyword validation, questions, 10+ competitors, keyword gaps, money-page ranking) and rewrite/merge/replace pages as the data dictates; fill `data/keywords.csv`; re-tier the plan.
2. Run `scripts/check-external-links.mjs` from a network-enabled session and fix any dead source links.
3. Verify the live deployment (HTTPS, redirects, 404, sitemap, canonicals) and fix anything Hostinger-specific.
4. Add verified ASINs and switch products to direct links once Amazon access is available; set `status: active`.
5. Replace SVG art with curated Unsplash photography if wanted (`scripts/fetch-unsplash.mjs`).
6. Run the monthly GSC + Semrush loop described in `docs/research-process.md` and update pages, links and products accordingly.
