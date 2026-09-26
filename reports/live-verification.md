# Live verification — https://quietmindsleep.co.uk — 2026-09-26T08:17:15.670Z

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
| live affiliate links carry the Associates tag | ✅ | 6 Amazon links, tag=kleantouch-21 |
| live affiliate links are direct product links | ✅ | 6/6 /dp/ links |
| disclosure precedes first affiliate link | ✅ |  |
| search page loads | ✅ | status 200 |

## Failures
- www → non-www redirect — status ERR location undefined


## Runner facts (GitHub Actions run 36229265008)

- DNS A (apex): 212.1.212.3, 191.101.104.99
- DNS www: CNAME www.quietmindsleep.co.uk.cdn.hstgr.net
- TLS certificate: CN=quietmindsleep.co.uk only, issuer Let's Encrypt, valid 25 Sep 2026 → 24 Dec 2026 (no `www` SAN)
- https://www.quietmindsleep.co.uk: `curl: (60) SSL: no alternative certificate subject name matches target host name` — the only failing check; fix is a Hostinger SSL reissue covering `www` (see docs/owner-actions.md §3)
- Live HTML last-modified 25 Sep 2026 17:20 UTC = deploy of commit fd5fc54; commits since then (dead-link fixes, docs) are built on the `hostinger` branch but not yet on the server because the SSH deploy secrets are not set
