# Maintenance

The aim is low-maintenance, not zero-maintenance. These are the routines and the tools that make them quick.

| Routine | Frequency | Tool |
|---|---|---|
| Rebuild + audit after any content change | every change | `npm run check` (build + audit); CI does this on push |
| Orphan / weak-link check | every change | `reports/audit.md` (blocking on orphans) |
| Internal link map review; money pages incoming links | monthly | `npm run linkmap` → `reports/link-map.md` |
| Affiliate link check (tag present, links resolve) | monthly | `npm run register` → `reports/product-register.csv`; `node scripts/check-external-links.mjs` (needs internet) |
| Product availability / replacement | quarterly | update `data/products.json` (`status`, `lastChecked`, `asin`); never silently swap for an unrelated product |
| Source link rot | quarterly | `node scripts/check-external-links.mjs` |
| Search Console + Semrush review | monthly | see docs/research-process.md "Ongoing loop" |
| Content refresh | as findings dictate | edit the article, bump `updated:` in front matter, rebuild |
| New article | as research dictates | add plan entry with Semrush evidence → `npm run new -- hub/slug` → write → add 2–4 links *to* it from existing relevant pages (the audit will flag it as weak until you do) |

## Registers

- `reports/content-register.csv`: URL, target keyword, cluster, tier, dates, word count, affiliate products, links out, sources, status, Semrush-validated flag.
- `reports/product-register.csv`: product, Amazon URL, tag, pages used on, last checked, status.
- `data/keywords.csv`: the keyword database.

## Adding an affiliate programme

1. Add a provider to `data/affiliates.json` (copy `awin-example`, set `enabled: true`, fill the link template).
2. Add any per-account ids to `site.config.json → affiliate.<provider>`.
3. Point products at the provider or add new products with a category.
4. Update `content/pages/affiliate-disclosure.md` to name the programme. Rebuild.

## Scheduled monitoring (set up 25 September 2026)

| Routine | When | Where it runs | What it does |
|---|---|---|---|
| Live verification | Mondays 07:30 UTC | GitHub Actions (`verify-live.yml`, no session needed) | Checks HTTPS, redirects, all sitemap URLs, assets, search, 404, affiliate tags; publishes results and screenshots to the `live-reports` branch |
| Weekly launch check | Mondays 08:47 London | Claude cloud session | Reads the live-reports results, looks for new desktop-session branches (`launch-ops`, `gsc-weekly-*`), merges reports, summarises to the owner. Note: sessions started by routines run without connectors, so the Semrush validation runs only when the owner asks Claude directly or recreates the routine from the claude.ai Routines UI with the Semrush connector attached. |
| Search Console + Associates check | Mondays 09:10 London | Claude desktop session (needs the desktop app open and Chrome signed in) | Records indexing status, impressions/clicks, position 8–20 candidates, Associates clicks/earnings for `kleantouch-21`; requests indexing for unindexed hubs; pushes `reports/gsc-weekly/<date>.md` |
| 6-week growth review | 6 November 2026 | Claude cloud session | Builds the improvement plan from the weekly reports (pages at positions 8–20), validates with Semrush if units exist, improves the top 10 pages, pushes to `main` |

Content policy for this period: **no new article batches** until Google has evaluated the existing 114 pages. Improvements to existing pages only, driven by Search Console and Semrush data.
