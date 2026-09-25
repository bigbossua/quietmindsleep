# Site audit — 2026-09-25

| Metric | Value |
|---|---|
| HTML pages | 116 |
| Articles | 93 |
| Total article words | 154,773 |
| Pages with affiliate links | 56 |
| Affiliate links | 134 |
| Blocking issues | 0 |
| Warnings | 2 |

## Affiliate readiness
| Check | Status |
|---|---|
| Amazon tracking ID set | yes (kleantouch-21) |
| Products with verified ASIN (direct links) | 19 of 19 |
| Products on search links (needs-verification) | 0 |
| Products marked active | 19 |
| Disclosure on every affiliate page | yes |

## Blocking issues
- none

## Warnings
- /404.html: meta description 49 chars
- /search/: meta description 35 chars

## Not checked here (needs network access)
- External links (sources) — run `node scripts/check-external-links.mjs` from a machine with internet access.
- Live HTTPS, redirects and .htaccess behaviour — verify on Hostinger after deployment (see docs/deployment.md).
