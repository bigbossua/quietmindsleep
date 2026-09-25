# Quiet Mind Sleep — quietmindsleep.co.uk

An independent UK sleep information and product-recommendation website, built as a static site with a deliberate internal-linking architecture, a reusable affiliate product system, and maintenance tooling so the site can be operated with little manual work.

**Start here:** `docs/owner-actions.md` lists exactly what the owner must do to go live (Semrush units, Amazon Associates tag, Hostinger connection, Search Console). Everything else is automated.

## Quick start

```bash
npm install
npm run build      # → dist/  (HTML, sitemap.xml, robots.txt, .htaccess, search index, OG images)
npm run audit      # broken links, orphans, on-page SEO, affiliate checks → reports/audit.md
npm run linkmap    # internal link map → reports/link-map.csv / .md
npm run register   # content + product maintenance registers → reports/*.csv
npm run serve      # preview at http://localhost:8080
```

## How the site is organised

```
site.config.json        brand, domain, navigation, Amazon tag, analytics, email provider
data/hubs.json          the 9 topic hubs (category pages) and their relationships
data/products.json      affiliate product register (factual descriptions, link type, status)
data/affiliates.json    affiliate providers (Amazon UK live; others can be added without touching templates)
data/keywords.csv       keyword database (Semrush columns blank until data is ingested)
data/competitors.csv    competitor candidates for Semrush research (unverified)
content/plan.json       the content architecture: every page, its intent, role, tier, links and product opportunity
content/articles/       one Markdown file per article, in hub folders
content/pages/          about, contact, editorial, legal pages
src/                    generator: lib/, templates/, assets/ (CSS, JS, fonts, generated illustrations)
scripts/                audit, link map, registers, Semrush ingest, scaffolding, link checker, Unsplash fetch
reports/                generated: audit.md, link-map, registers, link-graph.json
docs/                   writing guide, architecture, research process, maintenance, deployment, owner actions
```

## Editing content

- Write articles in Markdown with the front matter described in `docs/writing-guide.md`.
- Internal links use `[anchor](@hub/slug)` and are validated at build time. A link to a page that does not exist fails the build, so there are never broken internal links.
- Products are placed with `{{products: id, id}}` or `{{compare: id, id}}`; the product data lives in one place.
- Changing a component (product box, breadcrumbs, FAQ, footer, schema…) means changing one template in `src/`, then rebuilding.

## Deployment

Pushes to `main` build the site, run the audit, and publish `dist/` to the `hostinger` branch (and optionally FTP). See `docs/deployment.md`.

## Principles

SEMrush controls the search strategy. The website controls the user journey. Internal linking connects the asset. Affiliate monetisation sits naturally within relevant content. Nothing on the site makes medical promises or fabricates reviews.
