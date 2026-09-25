# SEMrush research process

Semrush controls the search strategy. This document is the exact procedure Claude runs once API units are available (or that a person can follow in the Semrush interface), and how results flow back into the site.

## Status

- Semrush MCP connector: connected and authorised.
- API units: **none available** at build time (25 September 2026). Every report returned `no_api_units`. No keyword volumes, KD values or competitor data on this site have been invented; those columns are blank and pages carry `status: draft-pending-validation`.
- Cluster and page topics were taken from the project brief's cluster lists and general knowledge of UK search behaviour, so the launch architecture is a hypothesis to be validated, not a finding.

## Step 1 — keyword validation (Keyword Overview / Keyword Magic, database `uk`)

For every row in `data/keywords.csv`: volume (UK), KD, CPC, intent, SERP features, trend. Batch primary keywords first (93), then secondaries (347).

Decision rules:
- Volume 0–10 and no long-tail cluster around it → replace the page or merge into a stronger sibling.
- Two planned pages whose keywords share the same SERP (same top URLs) → merge to avoid cannibalisation.
- KD very high with SERP dominated by NHS/major publishers and no commercial intent → deprioritise to Tier 3 or drop.
- Commercial/transactional intent with achievable KD → promote to Tier 1 money page.

## Step 2 — question research (Keyword Magic → Questions filter)

Seeds: sleep, can't sleep, insomnia, wake up, fall asleep, brown noise, white noise, sleep mask, earplugs, bedroom. Collect questions with volume ≥ 30 in the UK; map to existing pages or add to `reports/semrush-new-opportunities.csv`.

## Step 3 — competitor research (Domain Overview → Organic Research → Keyword Gap)

Use `data/competitors.csv` as the seed list; confirm at least 10 real competitors via Organic Competitors for the top 3 domains. For each: organic traffic estimate, top pages, keyword clusters, pages generating commercial vs informational traffic, and the Keyword Gap against quietmindsleep.co.uk (which will show all keywords as gaps at launch). Filter gaps to: relevant, commercially useful, realistically attainable (KD ≤ 40 as a starting filter for a new domain).

## Step 4 — money pages

From steps 1–3, rank commercial opportunities by (volume × commercial intent) ÷ KD. These become the pages that receive extra contextual links from informational content (see `reports/link-map.md` for current incoming counts).

## Step 5 — write back

- `npm run ingest:semrush -- export.csv` merges Semrush columns into `data/keywords.csv`.
- Update `content/plan.json` (tiers, merges, replacements) and `data/hubs.json` (featured pages) accordingly.
- Rebuild; the audit and link map show the effect on linking.

## Ongoing loop (post-launch)

Monthly: Search Console (impressions, clicks, CTR, position by page and query) + Semrush Position Tracking. Actions: pages with impressions but position 8–20 → improve content and add internal links; unexpected ranking queries → consider a supporting page; two pages competing → merge; pages with no impressions after 3 months → re-check the keyword choice before rewriting.
