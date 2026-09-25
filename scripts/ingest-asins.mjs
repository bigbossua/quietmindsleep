// Merge verified Amazon products into data/products.json. Usage: node scripts/ingest-asins.mjs data/asin-verification.csv
// CSV columns: id, asin, verifiedTitle, verifiedOn (YYYY-MM-DD), notes. Only rows with a well-formed ASIN are applied.
// Each matched product switches to link.type 'asin', status 'active', lastChecked = verifiedOn. Nothing is invented: rows must come
// from the Associates SiteStripe / Product Linking tool or the product page itself. See docs/amazon-runbook.md.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, parseCsv } from './lib.mjs';
const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/ingest-asins.mjs data/asin-verification.csv'); process.exit(1); }
const p = path.join(ROOT, 'data', 'products.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));
const byId = Object.fromEntries(data.products.map(x => [x.id, x]));
let applied = 0, skipped = [];
for (const r of parseCsv(fs.readFileSync(file, 'utf8'))) {
  const asin = (r.asin || '').trim().toUpperCase();
  if (!byId[r.id]) { skipped.push(`${r.id}: unknown product id`); continue; }
  if (!/^[A-Z0-9]{10}$/.test(asin)) { skipped.push(`${r.id}: ASIN '${r.asin}' is not 10 alphanumeric characters`); continue; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.verifiedOn || '')) { skipped.push(`${r.id}: verifiedOn must be YYYY-MM-DD`); continue; }
  const prod = byId[r.id];
  prod.asin = asin; prod.link = { type: 'asin', query: prod.link.query || prod.name };
  prod.status = 'active'; prod.lastChecked = r.verifiedOn;
  if (r.verifiedTitle) prod.verifiedTitle = r.verifiedTitle.trim();
  if (r.notes) prod.verificationNotes = r.notes.trim();
  applied++;
}
fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
console.log(`Applied ${applied} verified ASINs. ${skipped.length} rows skipped.`);
skipped.forEach(s => console.log(' - ' + s));
console.log('Run: npm run build && npm run audit && npm run register');
