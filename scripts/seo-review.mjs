// On-page SEO review of dist/: titles, descriptions, H1s, keyword cannibalisation risk, schema validity, indexability. → reports/seo-review.md
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readJson, walkHtml } from './lib.mjs';
const dist = path.join(ROOT, 'dist');
const plan = readJson('content/plan.json').pages;
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const rows = []; const schemaTypes = {}; const problems = [];
for (const f of walkHtml(dist)) {
  const url = '/' + path.relative(dist, f).replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const h2s = (html.match(/<h2[^>]*>/g) || []).length;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); const types = j['@graph'] ? j['@graph'].map(x => x['@type']) : [j['@type']]; for (const t of types) schemaTypes[t] = (schemaTypes[t] || 0) + 1; }
    catch (e) { problems.push(`${url}: invalid JSON-LD (${e.message})`); }
  }
  if (h1 && title && !title.toLowerCase().includes(h1.split(/[:?]/)[0].toLowerCase().slice(0, 20))) problems.push(`${url}: <title> and H1 diverge ("${title}" vs "${h1}")`);
  rows.push({ url, title, titleLen: title.length, desc, descLen: desc.length, h1, h2s, robots });
}
// cannibalisation: pairwise primary-keyword token overlap
const stop = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'and', 'in', 'at', 'on', 'is', 'do', 'i', 'my', 'you', 'your', 'it', 'with', 'how', 'why', 'what', 'can', 'cant', "can't", 'sleep', 'night', 'before', 'bed', 'up']);
const tok = (s) => new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w && !stop.has(w)));
const risks = [];
for (let i = 0; i < plan.length; i++) for (let j = i + 1; j < plan.length; j++) {
  const a = tok(plan[i].primaryKeyword), b = tok(plan[j].primaryKeyword); if (!a.size || !b.size) continue;
  const inter = [...a].filter(x => b.has(x)).length; const jac = inter / new Set([...a, ...b]).size;
  if (jac >= 0.6) risks.push(`${plan[i].slug} ("${plan[i].primaryKeyword}") ↔ ${plan[j].slug} ("${plan[j].primaryKeyword}") overlap ${(jac * 100).toFixed(0)}%`);
}
const md = `# SEO review — ${new Date().toISOString().slice(0, 10)}

Pages: ${rows.length}. Indexable: ${rows.filter(r => !r.robots.includes('noindex')).length}. Noindex: ${rows.filter(r => r.robots.includes('noindex')).map(r => r.url).join(', ')}.

## Titles and descriptions
- Titles over 65 chars: ${rows.filter(r => r.titleLen > 65).length}
- Descriptions outside 120–160: ${rows.filter(r => r.descLen && (r.descLen < 120 || r.descLen > 160)).map(r => `${r.url} (${r.descLen})`).join(', ') || 'none'}
- Duplicate titles: ${(() => { const m = {}; rows.forEach(r => (m[r.title] = (m[r.title] || 0) + 1)); return Object.entries(m).filter(([, n]) => n > 1).map(([t]) => t).join('; ') || 'none'; })()}
- Duplicate H1s: ${(() => { const m = {}; rows.forEach(r => (m[r.h1] = (m[r.h1] || 0) + 1)); return Object.entries(m).filter(([, n]) => n > 1).map(([t]) => t).join('; ') || 'none'; })()}
- Pages with fewer than 3 H2s (articles only): ${rows.filter(r => r.h2s < 3 && r.url.split('/').length > 3).map(r => r.url).join(', ') || 'none'}

## Structured data
${Object.entries(schemaTypes).map(([t, n]) => `- ${t}: ${n} pages`).join('\n')}

## Keyword cannibalisation risk (primary keywords with ≥60% token overlap — review intent, merge if the SERPs match)
${risks.length ? risks.map(r => `- ${r}`).join('\n') : '- none detected'}

## Problems
${problems.length ? problems.map(p => `- ${p}`).join('\n') : '- none'}
`;
fs.writeFileSync(path.join(ROOT, 'reports', 'seo-review.md'), md);
console.log(md);
