# Live verification — https://quietmindsleep.co.uk — 2026-09-25T17:28:31.763Z

| Check | Result | Detail |
|---|---|---|
| http → https redirect | ✅ | status 301 location https://quietmindsleep.co.uk/ |
| www → non-www redirect | ❌ | status ERR location undefined |
| homepage 200 over HTTPS | ✅ | status 200 |
| homepage is the Quiet Mind Sleep build | ✅ | unexpected HTML (old site or parking page?) |
| asset /robots.txt | ✅ | status 200 |
| asset /sitemap.xml | ✅ | status 200 |
| asset /search-index.json | ✅ | status 200 |
| asset /favicon.svg | ✅ | status 200 |
| asset /assets/js/site.js | ✅ | status 200 |
| asset /assets/js/search.js | ✅ | status 200 |
| asset /assets/img/hero.svg | ✅ | status 200 |
| asset /assets/img/og-default.png | ✅ | status 200 |
| asset /assets/fonts/inter-latin-wght-normal.woff2 | ✅ | status 200 |
| stylesheet loads | ✅ | status 200 |
| 404 page returns 404 with site template | ✅ | status 404 |
| sitemap lists pages | ✅ | 114 URLs |
| all sitemap URLs return 200 | ✅ | 114/114 |
| canonicals match live URLs | ✅ | 0 mismatches |
| internal links on sampled pages resolve | ✅ | 110 checked, 0 broken |
| search page loads | ✅ | status 200 |

## Failures
- www → non-www redirect — status ERR location undefined
