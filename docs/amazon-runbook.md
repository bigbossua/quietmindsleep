# Amazon Associates runbook

This is the exact procedure for turning the site's affiliate placeholders into verified Amazon Associates links. It must be run from a session that can reach Amazon with the owner's authenticated Associates account (Claude Desktop with the built-in browser or Claude in Chrome, or the owner directly). The cloud build environment cannot reach amazon.co.uk and has no browser, so it cannot do steps 1–3.

Never copy session cookies, login URLs, passwords or tokens into files, commits, logs or reports. The only things that leave the browser are the tracking ID and product ASINs.

## 1. Inspect the account (Associates Central, amazon.co.uk programme)

Record, in `reports/amazon-status.md`:
- Account status shown in Associates Central (Active / pending qualifying sales / closed). New accounts must record 3 qualifying sales within 180 days.
- **Account Settings → Manage Your Tracking IDs**: the tracking ID to use (UK IDs end in `-21`). Create `quietmindsleep-21` if a site-specific one is wanted.
- **Account Settings → Edit Your Website and Mobile App List**: is `https://quietmindsleep.co.uk` listed? If not, add it.
- Any banner about tax/payment information or identity verification still outstanding.

## 2. Set the tracking ID

```bash
node scripts/set-amazon-tag.mjs quietmindsleep-21   # use the real ID
npm run build && npm run audit
```
Every Amazon link on all pages now carries `tag=<id>`.

## 3. Verify products and collect ASINs

For each row in `data/asin-verification.csv` (the 19 product types), find a specific listing on amazon.co.uk that matches the product description in `data/products.json`:
1. Open the listing and confirm it is sold on amazon.co.uk, matches the described type and brand example, and is in stock.
2. Use **SiteStripe → Text → Short/Full link** or **Product Linking → Product Links** to confirm the Special Link is generated under the tracking ID above. The ASIN is the 10-character code in the product URL (`/dp/XXXXXXXXXX`).
3. Fill `asin`, `verifiedTitle` (copy the listing title), `verifiedOn` (today) and any `notes` (for example "brand example changed to X because Y is unavailable").
4. Do not record prices, ratings or review counts anywhere.

Then:
```bash
node scripts/ingest-asins.mjs data/asin-verification.csv
npm run build && npm run audit && npm run register
```
Products with a verified ASIN switch from search links to direct `/dp/` Special Links and are marked `active`. Rows left blank stay as search links (an approved Special Link format) marked `needs-verification`.

## 4. Test

From the same browser-enabled session, open at least one link per product from `reports/product-register.csv` and confirm: it lands on amazon.co.uk, the URL contains `tag=<id>`, and (in Associates Central → Reports → Link-Type Performance, next day) clicks are attributed. Record results in `reports/amazon-status.md`.

## 5. Keep it maintained

`npm run register` lists every product with `lastChecked`. Re-verify quarterly or when the external link checker reports a non-200 on a product URL. If a product disappears, pick a replacement of the same type, verify it as above, and update the CSV; never swap in an unrelated item.

## Policy reminders (Associates Operating Agreement)
- Disclosure: the site shows "As an Amazon Associate, Quiet Mind Sleep earns from qualifying purchases" in the footer of every page, at the top of every article with affiliate links, and next to every product component and comparison table.
- No prices or availability claims in content (the CTA says "Check current availability").
- No Amazon product images unless supplied via PA-API/SiteStripe.
- Special Links only on the website, never in emails or downloadable files.
