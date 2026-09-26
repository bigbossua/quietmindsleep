// Checks every external link in dist/ (sources, affiliate links). Needs internet access. Usage: node scripts/check-external-links.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, walkHtml, toCsv } from './lib.mjs';
const dist = path.join(ROOT, 'dist');
const links = new Map();
for (const f of walkHtml(dist)) {
  const page = '/' + path.relative(dist, f).replace(/index\.html$/, '');
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/href="(https?:\/\/[^"]+)"/g)) { const u = m[1].replace(/&amp;/g, '&'); if (!links.has(u)) links.set(u, new Set()); links.get(u).add(page); }
}
const rows = [];
let i = 0;
for (const [url, pages] of links) {
  i++;
  let status = '', note = '';
  const browserHeaders = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36', 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'accept-language': 'en-GB,en;q=0.9' };
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow', headers: browserHeaders, signal: AbortSignal.timeout(15000) }); status = r.status;
    if (r.status === 405 || r.status === 403 || r.status === 429) { const g = await fetch(url, { redirect: 'follow', headers: browserHeaders, signal: AbortSignal.timeout(20000) }); status = g.status; }
    if (status === 403 || status === 429) note = 'blocked for automated clients; verify manually (usually fine)';
  }
  catch (e) { status = 'ERR'; note = e.message; }
  rows.push({ url, status, note, pageCount: pages.size, pages: [...pages].slice(0, 5) });
  process.stdout.write(`\r${i}/${links.size}`);
}
console.log();
fs.writeFileSync(path.join(ROOT, 'reports', 'external-links.csv'), toCsv(rows, ['url', 'status', 'note', 'pageCount', 'pages']));
const bad = rows.filter(r => r.status === 'ERR' || (r.status >= 400 && r.status !== 403 && r.status !== 429));
const blocked = rows.filter(r => r.status === 403 || r.status === 429);
console.log(`${rows.length} external URLs checked, ${bad.length} problems, ${blocked.length} blocked-for-bots (verify manually). See reports/external-links.csv`);
bad.forEach(b => console.log(` - ${b.status} ${b.url}`));
