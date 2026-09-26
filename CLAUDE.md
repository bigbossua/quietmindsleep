# Quiet Mind Sleep — working notes for Claude sessions

Independent UK sleep information + affiliate site. Static build, no CMS. Read `README.md`, then `docs/PROJECT-REPORT.md` (MASTER STATUS: the single source of truth for status and the one task list; update it when state changes), then `docs/owner-actions.md` for how-to steps on owner tasks. All Quiet Mind Sleep work is consolidated here; do not open parallel sessions or status files.

## Non-negotiables
- Semrush controls SEO decisions. Never invent keyword volumes, KD, traffic or competitor data. If Semrush is unavailable, leave fields blank and mark status `draft-pending-validation`.
- No fake reviews, testing claims, statistics, experts, quotes or stories. Products use factual, manufacturer-style language; no prices or ratings.
- Health standard: no diagnosis, no treatment claims, never advise changing medication, signpost a GP for persistent problems. See `docs/writing-guide.md` §2.
- Do not invent legal entities, addresses, credentials or a medical team.
- Internal links use `[anchor](@key)`; the build fails on unknown keys. Every new article needs 2–4 contextual links *to* it from existing pages.
- Tiers are internal only; never label pages Tier 1/2/3 publicly.

## Commands
`npm run build` · `npm run audit` (fails on broken links/orphans) · `npm run linkmap` · `npm run register` · `npm run keywords` · `npm run ingest:semrush -- file.csv` · `npm run new -- hub/slug` · `npm run serve`

Validation of one hub without touching dist/: `QMS_DIST=/tmp/x QMS_NO_REPORT=1 QMS_VALIDATE=1 QMS_ONLY=<hub> node src/build.mjs`

## Where things live
Templates/components `src/templates`, `src/lib/components.mjs`; product data `data/products.json`; providers `data/affiliates.json`; plan `content/plan.json`; hubs `data/hubs.json`; config `site.config.json`.

## Git
Work on the designated feature branch; production deploys run from `main` via `.github/workflows/build-deploy.yml`.
