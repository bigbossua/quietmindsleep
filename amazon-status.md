# Amazon Associates status — Quiet Mind Sleep

Checked: 2026-09-25, from the owner's signed-in Associates Central UK session (Claude in Chrome). No credentials, cookies, tokens or login URLs were copied or stored; only the tracking ID and ASINs left the browser.

## 1. Account (affiliate-program.amazon.co.uk)

- **Account status:** signed in and operating normally. The Associates Central home page shows the earnings dashboard (clicks are being recorded) and no "pending qualifying sales", closure, tax/payment-information or identity-verification banner. The only notice shown is an optional "Set up your Amazon Storefront" reminder. The programme's 3-qualifying-sales-within-180-days rule still applies to new accounts; the dashboard shows 0 ordered items this month.
- **Tracking ID (Account Settings → Manage Your Tracking IDs):** `kleantouch-21`. This is the only tracking ID on the account (store ID also `kleantouch-21`). A site-specific `quietmindsleep-21` ID was **not** created, because the brief was to record the existing ID; creating one is an account change the owner can make later if per-site reporting is wanted.
- **Website list (Account Settings → Edit Your Website, Mobile App, and Alexa Skill List):** `https://quietmindsleep.co.uk` was **not** listed (only `https://kleantouch.co.uk` was). It was added and confirmed as authorised; after reloading the page the list shows both sites. **Website registered: yes.**

## 2. Tracking ID applied to the site

`site.config.json` → `affiliate.amazon.tag` must be `kleantouch-21` (was `REPLACE-WITH-YOUR-TAG-21`). Command: `node scripts/set-amazon-tag.mjs kleantouch-21`.

## 3. Product verification (data/asin-verification.csv)

All 19 product types have a verified listing. For each one the product page was opened on amazon.co.uk, the title read from the page, availability checked, the ASIN taken from the `/dp/` URL, and a **SiteStripe → Get Link → Full Link** generated; each generated link was checked to contain `www.amazon.co.uk`, the ASIN and `tag=kleantouch-21`. No prices, ratings or review counts were recorded.

| id | ASIN | Listing (short) | Stock note |
|---|---|---|---|
| contoured-sleep-mask | B07PRG2CQY | Manta Sleep Mask | In stock |
| silk-sleep-mask | B0C7GPGR19 | Aosun 22-Momme Mulberry Silk Sleep Mask | In stock |
| weighted-sleep-mask | B09DXXWVL4 | Umisleep Weighted Sleep Mask 120g | In stock |
| soft-foam-earplugs | B0B785VC19 | Mack's Ultra Soft Foam Earplugs, 100 pair | In stock |
| reusable-silicone-earplugs | B0D3V6TR98 | Loop Quiet 2 Ear Plugs | In stock |
| mouldable-wax-earplugs | B01LHL84ZI | Quies Boules Natural Wax Earplugs, pack of 2 | In stock |
| fan-based-white-noise-machine | B07RJTW7DB | Marpac Dohm White Noise Sound Machine, UK plug | Orderable (Add to basket, delivery date, dispatched from Amazon); no explicit "In stock" label |
| digital-sound-machine | B019GAFJEG | LectroFan Classic, White | In stock |
| portable-sound-machine | B01D50RZQI | Yogasleep Rohm Portable White Noise Sound Machine | In stock |
| headband-sleep-headphones | B0CLGTSMCF | MUSICOZY Sleep Headphones Headband | In stock |
| sleep-earbuds | B0CRGR2TS5 | soundcore Sleep A20 by Anker | In stock |
| memory-foam-side-sleeper-pillow | B0D9YWWT26 | Panda ActiveFoam Hybrid Bamboo Pillow | In stock |
| gel-cooling-pillow | B08YZ7FM5Z | Cosi Home Memory Foam Pillow with Cooling Gel | In stock |
| thermal-blackout-curtains | B00VWMHFZ8 | Deconovo Eyelet Thermal Blackout Curtains 46"x54" | In stock |
| blackout-blind-no-drill | B0D5721NNQ | Bemece Portable 100% Blackout Blind, no drill | In stock |
| weighted-blanket | B0CW99YJHZ | Sivio Weighted Blanket 7kg (glass beads) | In stock |
| cotton-percale-bedding | B08HZFC7SN | Appletree Cassia 100% Cotton Percale Duvet Cover Set | In stock |
| summer-tog-duvet | B01ISWOP4I | Silentnight Anti Allergy 4.5 Tog Double Duvet | In stock |
| quiet-bedroom-fan | B0BT7LPSBY | DREO 20dB Silent Tower Fan | Orderable (Add to basket, delivery date, sold by Amazon); no explicit "In stock" label |

Substitutions and caveats (also in the CSV `notes` column): weighted sleep mask uses Umisleep rather than Gravity (no Gravity listing found on amazon.co.uk); weighted blanket uses Sivio (glass-bead fill confirmed in the listing); the Panda pillow is fixed-height rather than adjustable-layer; the Dohm Classic listing (B00TQ2MU2O) was temporarily out of stock so the UK-plug Marpac Dohm listing was used instead. Rows left unverified: **none**.

## 4. Link test

Each product's direct Special Link in the form `https://www.amazon.co.uk/dp/<ASIN>?tag=kleantouch-21` was opened in the browser on 2026-09-25. All 19 landed on the correct amazon.co.uk product page (title matched the verified title) and the final URL still contained `tag=kleantouch-21`. Click attribution should be confirmed in Associates Central → Reports → Link-Type Performance the following day.

| ASIN | Landed on correct page | tag= in URL |
|---|---|---|
| B07PRG2CQY | yes | yes |
| B0C7GPGR19 | yes | yes |
| B09DXXWVL4 | yes | yes |
| B0B785VC19 | yes | yes |
| B0D3V6TR98 | yes | yes |
| B01LHL84ZI | yes | yes |
| B07RJTW7DB | yes | yes |
| B019GAFJEG | yes | yes |
| B01D50RZQI | yes | yes |
| B0CLGTSMCF | yes | yes |
| B0CRGR2TS5 | yes | yes |
| B0D9YWWT26 | yes | yes |
| B08YZ7FM5Z | yes | yes |
| B00VWMHFZ8 | yes | yes |
| B0D5721NNQ | yes | yes |
| B0CW99YJHZ | yes | yes |
| B08HZFC7SN | yes | yes |
| B01ISWOP4I | yes | yes |
| B0BT7LPSBY | yes | yes |

## 5. Build / audit / push — done 2026-09-25

Run on the owner's Windows PC (Claude Code desktop, Node v24.19.0 portable) from a fresh clone of `main` at `3ece20a`.

```text
node scripts/set-amazon-tag.mjs kleantouch-21
  Amazon tracking ID set: REPLACE-WITH-YOUR-TAG-21 → kleantouch-21
node scripts/ingest-asins.mjs data/asin-verification.csv
  Applied 19 verified ASINs. 0 rows skipped.
npm run build
  Built 93 articles, 9 hubs, 9 pages
npm run register
  Content register: 93 articles. Product register: 19 products (0 unused).
```

`npm run audit` (exit 0):

| Metric | Value |
|---|---|
| HTML pages | 116 |
| Pages with affiliate links | 56 |
| Affiliate links | 134 |
| Blocking issues | 0 |
| Warnings | 2 (short meta descriptions on /404.html and /search/, unrelated to Amazon) |

| Affiliate readiness check | Status |
|---|---|
| Amazon tracking ID set | yes (kleantouch-21) |
| Products with verified ASIN (direct links) | 19 of 19 |
| Products on search links (needs-verification) | 0 |
| Products marked active | 19 |
| Disclosure on every affiliate page | yes |

Independent check of the built `dist/` HTML (grep, separate from the audit script):
- 56 pages contain Amazon links; all 134 links are direct links of the form `https://www.amazon.co.uk/dp/<ASIN>/?tag=kleantouch-21` with `rel="sponsored nofollow noopener"`. The site template puts a `/` before `?tag=`; this is the same product URL as `/dp/<ASIN>?tag=`.
- 0 search links (`/s?k=`), 0 placeholder tags, 0 other tag values.
- The set of ASINs in the built pages is exactly the 19 ASINs in `data/asin-verification.csv`.
- All 116 pages (including all 56 affiliate pages) contain "As an Amazon Associate, Quiet Mind Sleep earns from qualifying purchases".

Repo fix needed to run on Windows: `scripts/lib.mjs` and `src/lib/config.mjs` derived `ROOT` from `new URL(...).pathname`, which resolves to `C:\C:\...` on Windows. Both now use `fileURLToPath` (no behaviour change on Linux/CI).

Pushed to branch `amazon-links` (not `main`). The live site changes only after this branch is merged to `main` and the deploy workflow runs. Click attribution still needs checking in Associates Central → Reports the day after the first live clicks.
