# Architecture

## Why a static site

Hostinger shared hosting serves plain files fastest and with the fewest moving parts: no CMS to update, no database, no plugins, no PHP execution needed. Every page is pre-rendered HTML with one small CSS file, one small JS file and self-hosted fonts, which gives excellent Core Web Vitals by default. Deployment is "copy files".

## Data model

```
site.config.json ── brand, nav, affiliate tags, analytics, email provider
data/hubs.json ───── Hub (category) ── featured pages, related hubs, commercial pages
content/plan.json ── Page plan ── slug, hub, keywords, intent, role, tier, affiliate categories, angle
content/articles ─── Article markdown ── front matter (title, description, standfirst, readNext, faq, sources) + body
data/affiliates.json ─ Provider (amazon-uk live; network/direct templates ready)
data/products.json ─── Product ── provider, category, link (asin | search), status, lastChecked
                        Category ── label, home guide, hub
```

Relationships: Provider → Product → Category → Guide page; articles reference product ids via shortcodes and categories via the plan's `affiliate` list, which drives the "Useful guides" sidebar links. Adding a second affiliate programme means adding a provider and pointing products at it; templates do not change.

## Build pipeline (src/build.mjs)

1. Load config, hubs, plan, products, providers.
2. Pass 1: read all article and page front matter; build the key index (`hub`, `hub/slug`, `page`).
3. Pass 2: render each body: shortcodes → `@key` link resolution (fails on unknown keys) → Markdown → heading ids, callouts, external link attributes → FAQ.
4. Resolve read-next and commercial pages; sort hub listings by tier.
5. Write HTML from templates (`base`, `article`, `hub`, `home`, `page`), plus sitemap.xml, robots.txt, search-index.json, .htaccess, illustrations (SVG) and Open Graph PNGs.
6. Write `reports/link-graph.json` for the audit scripts.

Environment flags: `QMS_DIST` (output dir), `QMS_ONLY=<hub>` (render one hub), `QMS_VALIDATE=1` (planned pages count as valid link targets), `QMS_NO_OG=1` (skip PNGs), `QMS_NO_REPORT=1`.

## Reusable components (src/lib/components.mjs)

header/nav, footer, breadcrumbs, illustration, article card & grids, product box, product section, comparison table, FAQ, email capture, health notice, sources list, article meta, table of contents, read-next. Schema (src/lib/schema.mjs): WebSite+Organization, BreadcrumbList, Article, FAQPage (only when a real FAQ exists), CollectionPage for hubs. No review or rating schema anywhere.

## Page roles and the funnel

informational (traffic) → supporting (topical depth, keeps readers moving) → commercial (buying guides, "vs") → affiliate CTA. Hubs connect each cluster. Roles are set in the plan, shown as sections on hub pages, and never labelled as tiers publicly.

## Images

The launch visual identity is a generated SVG illustration set (10 scenes) so every page has consistent, lightweight art without stock photography. `scripts/fetch-unsplash.mjs` can fetch curated photography when network access and an Unsplash key are available; keep the same file names and the templates need no change beyond switching the extension in `components.mjs`.

## Future digital products

`resources/` already holds the lead magnet and checklist. Audio, guided relaxation and premium guides fit as a new hub folder (e.g. `content/articles/audio/`) plus a `resources` type in the plan; the email capture component is the on-ramp. No paid functionality exists yet by design.
