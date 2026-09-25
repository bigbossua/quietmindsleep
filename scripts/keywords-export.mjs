// Builds data/keywords.csv from content/plan.json, preserving any Semrush data already merged in.
// Volume/KD/SERP columns stay blank until `npm run ingest:semrush -- <export.csv>` fills them.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readJson, toCsv, parseCsv } from './lib.mjs';
const plan = readJson('content/plan.json').pages;
const file = path.join(ROOT, 'data', 'keywords.csv');
const existing = fs.existsSync(file) ? Object.fromEntries(parseCsv(fs.readFileSync(file, 'utf8')).map(r => [r.keyword.toLowerCase(), r])) : {};
const rows = [];
for (const p of plan) {
  const add = (kw, type) => { const e = existing[kw.toLowerCase()] || {}; rows.push({ keyword: kw, keywordType: type, volumeUK: e.volumeUK || '', kd: e.kd || '', cpc: e.cpc || '', intentSemrush: e.intentSemrush || '', serpFeatures: e.serpFeatures || '', intentPlanned: p.intent, cluster: p.hub, proposedUrl: '/' + p.slug + '/', article: p.title, commercialPotential: p.affiliate?.length ? 'yes: ' + p.affiliate.join('; ') : 'no', tier: p.tier, competitorRanking: e.competitorRanking || '', status: e.volumeUK ? 'semrush-data-merged' : 'draft-pending-validation', lastResearched: e.lastResearched || '' }); };
  add(p.primaryKeyword, 'primary');
  for (const s of p.secondaryKeywords || []) add(s, 'secondary');
}
fs.writeFileSync(file, toCsv(rows, ['keyword', 'keywordType', 'volumeUK', 'kd', 'cpc', 'intentSemrush', 'serpFeatures', 'intentPlanned', 'cluster', 'proposedUrl', 'article', 'commercialPotential', 'tier', 'competitorRanking', 'status', 'lastResearched']));
console.log(`keywords.csv: ${rows.length} keyword rows (${rows.filter(r => r.volumeUK).length} with Semrush data).`);
