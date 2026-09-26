# Live verification — https://quietmindsleep.co.uk — 2026-09-26T10:26:06.323Z

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


## Runner facts (GitHub Actions run 36235716842, after the 10:15 UTC redeploy)

- Live HTML last-modified: Sat, 26 Sep 2026 08:47:07 GMT = the CI build of commit c7a045c (run 36230808962), so production now equals `main`, including the three source-link fixes from 3ea0f71.
- TLS: CN=quietmindsleep.co.uk only, Let's Encrypt, valid to 24 Dec 2026; https://www still fails the handshake (no www SAN). This is the only failing check.
- Deploy secrets still absent: deploy-ssh skipped on every run; this redeploy was manual over SSH from the owner's PC.
