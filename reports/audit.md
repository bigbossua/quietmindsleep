# Site audit — 2026-09-25

| Metric | Value |
|---|---|
| HTML pages | 116 |
| Articles | 93 |
| Total article words | 154,794 |
| Pages with affiliate links | 56 |
| Affiliate links | 135 |
| Blocking issues | 0 |
| Warnings | 3 |

## Blocking issues
- none

## Warnings
- /404.html: meta description 49 chars
- /search/: meta description 35 chars
- Amazon tracking ID not set in site.config.json (135 pages carry placeholder tag)

## Not checked here (needs network access)
- External links (sources) — run `node scripts/check-external-links.mjs` from a machine with internet access.
- Live HTTPS, redirects and .htaccess behaviour — verify on Hostinger after deployment (see docs/deployment.md).
