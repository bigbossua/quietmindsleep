// Internal linking map: Page | Parent hub | Related pages | Commercial pages | Incoming | Outgoing → reports/link-map.csv and .md
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readJson, toCsv } from './lib.mjs';
const graph = readJson('reports/link-graph.json');
const incoming = {};
for (const [k, n] of Object.entries(graph)) for (const t of n.outgoing || []) { incoming[t] = incoming[t] || new Set(); incoming[t].add(k); }
const rows = Object.entries(graph).map(([k, n]) => ({
  page: k, url: n.url, role: n.role, tier: n.tier ?? '', parentHub: n.hub ?? '',
  relatedPages: (n.outgoing || []).filter(t => graph[t] && graph[t].role !== 'hub' && graph[t].role !== 'static' && !(n.commercial || []).includes(t)).join('; '),
  commercialPages: (n.commercial || []).join('; '),
  incomingCount: incoming[k] ? incoming[k].size : 0, outgoingCount: (n.outgoing || []).length,
  incomingFrom: incoming[k] ? [...incoming[k]].join('; ') : ''
})).sort((a, b) => (a.parentHub || '').localeCompare(b.parentHub || '') || a.page.localeCompare(b.page));
const cols = ['page', 'url', 'role', 'tier', 'parentHub', 'relatedPages', 'commercialPages', 'incomingCount', 'outgoingCount', 'incomingFrom'];
fs.writeFileSync(path.join(ROOT, 'reports', 'link-map.csv'), toCsv(rows, cols));
const md = `# Internal link map\n\nGenerated ${new Date().toISOString().slice(0, 10)}. Counts are from the build's link graph (contextual body links, read-next, sidebar and hub listings). Orphans and weakly linked pages are listed in audit.md.\n\n| Page | Hub | Role | In | Out | Commercial pages linked |\n|---|---|---|---|---|---|\n` + rows.map(r => `| ${r.page} | ${r.parentHub} | ${r.role} | ${r.incomingCount} | ${r.outgoingCount} | ${r.commercialPages} |`).join('\n') + '\n';
fs.writeFileSync(path.join(ROOT, 'reports', 'link-map.md'), md);
const commercialIn = rows.filter(r => r.role === 'commercial').map(r => `${r.page}: ${r.incomingCount} incoming`).join('\n');
console.log(`Link map written for ${rows.length} pages.\nIncoming links to commercial pages:\n${commercialIn}`);
