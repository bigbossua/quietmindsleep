// Merge a Semrush Keyword Magic Tool / Keyword Overview CSV export (UK database) into data/keywords.csv.
// Usage: node scripts/ingest-semrush.mjs path/to/export.csv [more.csv ...]
// Accepts the standard export columns: Keyword, Volume, Keyword Difficulty (or KD), CPC, Intent, SERP Features.
// Keywords in the export that are not yet in the plan are written to reports/semrush-new-opportunities.csv for review.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, toCsv, parseCsv } from './lib.mjs';
const files = process.argv.slice(2);
if (!files.length) { console.error('Usage: node scripts/ingest-semrush.mjs export.csv'); process.exit(1); }
const kwFile = path.join(ROOT, 'data', 'keywords.csv');
const rows = parseCsv(fs.readFileSync(kwFile, 'utf8'));
const byKw = Object.fromEntries(rows.map(r => [r.keyword.toLowerCase(), r]));
const pick = (r, names) => { for (const n of names) { const k = Object.keys(r).find(x => x.toLowerCase() === n.toLowerCase()); if (k && r[k] !== '') return r[k]; } return ''; };
const today = new Date().toISOString().slice(0, 10);
const newOpps = [];
let merged = 0;
for (const f of files) {
  for (const r of parseCsv(fs.readFileSync(f, 'utf8'))) {
    const kw = pick(r, ['Keyword']).toLowerCase(); if (!kw) continue;
    const data = { volumeUK: pick(r, ['Volume', 'Search Volume']), kd: pick(r, ['Keyword Difficulty', 'KD', 'Keyword Difficulty Index']), cpc: pick(r, ['CPC', 'CPC (GBP)', 'CPC (USD)']), intentSemrush: pick(r, ['Intent']), serpFeatures: pick(r, ['SERP Features']) };
    if (byKw[kw]) { Object.assign(byKw[kw], data, { status: 'semrush-data-merged', lastResearched: today }); merged++; }
    else newOpps.push({ keyword: kw, ...data, suggestedAction: '' });
  }
}
fs.writeFileSync(kwFile, toCsv(rows, Object.keys(rows[0])));
if (newOpps.length) fs.writeFileSync(path.join(ROOT, 'reports', 'semrush-new-opportunities.csv'), toCsv(newOpps, ['keyword', 'volumeUK', 'kd', 'cpc', 'intentSemrush', 'serpFeatures', 'suggestedAction']));
console.log(`Merged Semrush data for ${merged} planned keywords. ${newOpps.length} keywords not in the plan written to reports/semrush-new-opportunities.csv.`);
