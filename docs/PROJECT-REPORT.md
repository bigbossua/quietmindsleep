# Quiet Mind Sleep — project report (25 September 2026)

## Website

| | |
|---|---|
| URL | https://quietmindsleep.co.uk (not yet deployed; see "You must do") |
| Technology | Static site: custom Node generator (Markdown + JSON data), one CSS file, one small JS file, self-hosted fonts, SVG illustration system, Open Graph PNGs. No CMS, database or plugins. |
| Hosting | Hostinger (existing domain). Deployment path built: GitHub Actions → `hostinger` branch (Git deploy in hPanel) or FTPS. The live account could not be inspected from this environment (network policy blocked hostinger.com and quietmindsleep.co.uk). |
| Status | **Built, audited and pushed to branch `claude/quiet-mind-site-architecture-kuc23p`. Not deployed. Not validated in Semrush.** |

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
| Amazon Associates status | **Unknown** — the cloud environment has no browser and the network policy blocks all Amazon hosts (verified 403 on three hosts). Runbook for a browser-enabled session: `docs/amazon-runbook.md`. |
| Tracking ID status | Placeholder `REPLACE-WITH-YOUR-TAG-21` in `site.config.json`; one edit updates all links. |
| Affiliate pages | 56 pages carry affiliate components |
| Affiliate links | 134 (all with `rel="sponsored nofollow"`, `tag=` parameter; disclosure at the top of every affiliate article, beside every product component and table, and in the footer) |
| Products | 19 product types in `data/products.json`, 11 categories, 0 unused; all `search`-type Special Links (work immediately) with `status: needs-verification` until ASINs are confirmed |
| Remaining Amazon actions | Confirm account active; add site to website list; `node scripts/set-amazon-tag.mjs <id>`; verify listings and `node scripts/ingest-asins.mjs data/asin-verification.csv`; test attribution in Associates reports. |

## Google

| | |
|---|---|
| Search Console | Not set up (needs your Google account). Steps in `docs/owner-actions.md`. |
| Sitemap | Generated at `/sitemap.xml` (114 URLs, search excluded). Submit after deploy. |
| Indexing | Not applicable until deployed. |

## Content

| | |
|---|---|
| Articles published (built) | 93 |
| Queued | 0 from the plan; new opportunities will come from the Semrush step |
| Requiring review | 93 — every article is `status: draft` pending (a) Semrush validation of its target keyword and (b) an external-link check that could not run here (network blocked). Writers flagged the specific URLs they were unsure of in `reports/writer-notes.md`. |

## Remaining actions

### YOU MUST DO
1. **Semrush:** buy API units at https://www.semrush.com/mcp-access (or export Keyword Magic CSVs from the web app). Then say "Semrush units are available".
2. **Amazon Associates:** confirm the account is active, add quietmindsleep.co.uk to your website list, and paste your `-21` tracking ID into `site.config.json`.
3. **Hostinger:** check/back up the current `public_html`, confirm SSL, connect the `hostinger` branch under Advanced → Git (or add FTP secrets), create the `hello@` mailbox.
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
