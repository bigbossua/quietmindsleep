import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
export const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
export const csvCell = (v) => { const s = v == null ? '' : String(Array.isArray(v) ? v.join('; ') : v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
export const toCsv = (rows, cols) => [cols.join(','), ...rows.map(r => cols.map(c => csvCell(r[c])).join(','))].join('\n') + '\n';
export function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter(r => r.length > 1 || r[0]);
  return body.map(r => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}
export function walkHtml(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkHtml(p)); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
