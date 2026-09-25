// Site audit: broken internal links, orphans, on-page SEO checks, affiliate checks. Run after `npm run build`.
// Output: reports/audit.md and exit code 1 if blocking issues are found.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readJson, walkHtml } from './lib.mjs';

const dist = path.join(ROOT, 'dist');
if (!fs.existsSync(dist)) { console.error('dist/ not found. Run npm run build first.'); process.exit(1); }
const site = readJson('site.config.json');
const graph = readJson('reports/link-graph.json');
const files = walkHtml(dist);
const existing = new Set();
for (const f of files) { const rel = '/' + path.relative(dist, f).replace(/\\/g, '/'); existing.add(rel); if (rel.endsWith('/index.html')) existing.add(rel.replace(/index\.html$/, '')); }
for (const f of fs.readdirSync(dist)) if (!f.endsWith('.html')) existing.add('/' + f);
const assetOk = (u) => { const p = path.join(dist, u.split('?')[0]); return fs.existsSync(p); };

const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const issues = { blocking: [], warnings: [] };
const titles = new Map(), descs = new Map();
const incoming = {};
let affiliateLinks = 0, affiliatePages = 0, missingTagPages = 0;

for (const f of files) {
  const rel = '/' + path.relative(dist, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  const page = rel;
  // internal links
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    if (h.startsWith('/') && !h.startsWith('//')) {
      const clean = h.split('#')[0].split('?')[0];
      if (!clean) continue;
      if (clean.startsWith('/assets/') || /\.(xml|json|txt|svg|png)$/.test(clean)) { if (!assetOk(clean)) issues.blocking.push(`${page}: missing asset ${clean}`); continue; }
      if (!existing.has(clean)) issues.blocking.push(`${page}: broken internal link ${clean}`);
      else { incoming[clean] = incoming[clean] || new Set(); incoming[clean].add(page); }
    }
    if (h.includes('amazon.')) {
      affiliateLinks++;
      if (!/tag=[^&"]+/.test(h)) issues.blocking.push(`${page}: Amazon link without tag parameter`);
      if (h.includes('REPLACE-WITH-YOUR-TAG')) missingTagPages++;
    }
  }
  if (html.includes('data-affiliate=')) affiliatePages++;
  // on-page
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!title) issues.blocking.push(`${page}: missing <title>`);
  if (title.length > 70) issues.warnings.push(`${page}: title is ${title.length} chars`);
  if (!desc) issues.blocking.push(`${page}: missing meta description`);
  if (desc && (desc.length < 100 || desc.length > 165)) issues.warnings.push(`${page}: meta description ${desc.length} chars`);
  if (h1s !== 1) issues.blocking.push(`${page}: ${h1s} <h1> elements`);
  if (!canonical) issues.blocking.push(`${page}: missing canonical`);
  else if (canonical !== site.baseUrl + page && page !== '/404.html') issues.warnings.push(`${page}: canonical ${canonical} differs from URL`);
  if (titles.has(title) && page !== '/404.html') issues.warnings.push(`${page}: duplicate title with ${titles.get(title)}`); titles.set(title, page);
  if (descs.has(desc)) issues.warnings.push(`${page}: duplicate description with ${descs.get(desc)}`); descs.set(desc, page);
  for (const m of html.matchAll(/<img [^>]*>/g)) if (!/alt="/.test(m[0])) issues.blocking.push(`${page}: <img> without alt`);
  if (html.includes('data-affiliate=') && !html.includes('/affiliate-disclosure/')) issues.blocking.push(`${page}: affiliate links but no disclosure link`);
  if (/\bREPLACE ME\b|lorem ipsum|TODO/i.test(html)) issues.warnings.push(`${page}: placeholder text found`);
  if (html.includes('Placeholder')) issues.warnings.push(`${page}: contains 'Placeholder'`);
}

// Orphans: articles with fewer than N incoming links from OTHER pages (excluding nav/footer which link only hubs)
const orphans = [], weak = [];
for (const [key, node] of Object.entries(graph)) {
  if (node.role === 'hub' || node.role === 'static') continue;
  const inc = incoming[node.url] ? [...incoming[node.url]].filter(p => p !== node.url && p !== '/sitemap/') : [];
  const contextual = inc.filter(p => p !== '/' && !/^\/[a-z-]+\/$/.test(p)); // from articles, not hubs/home
  if (inc.length === 0) orphans.push(key);
  else if (contextual.length < 2) weak.push(`${key} (${contextual.length} article links, ${inc.length} total)`);
  node.incomingCount = inc.length; node.contextualIncoming = contextual.length;
}
if (orphans.length) issues.blocking.push(...orphans.map(o => `orphan page (no incoming links): ${o}`));
if (weak.length) issues.warnings.push(...weak.map(w => `weakly linked: ${w}`));
// sitemap/robots
for (const f of ['sitemap.xml', 'robots.txt', '404.html', '.htaccess', 'search-index.json']) if (!fs.existsSync(path.join(dist, f))) issues.blocking.push(`missing ${f}`);
const sm = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) { const u = m[1].replace(site.baseUrl, ''); if (!existing.has(u)) issues.blocking.push(`sitemap lists missing page ${u}`); }
if (site.affiliate.amazon.tag.includes('REPLACE')) issues.warnings.push(`Amazon tracking ID not set in site.config.json (${missingTagPages} pages carry placeholder tag)`);

const products = readJson('data/products.json').products;
const prodStats = { total: products.length, asin: products.filter(p => p.link.type === 'asin' && p.asin).length, search: products.filter(p => p.link.type !== 'asin' || !p.asin).length, active: products.filter(p => p.status === 'active').length, needsVerification: products.filter(p => p.status !== 'active').length };
const tagSet = !site.affiliate.amazon.tag.includes('REPLACE');
const articles = Object.values(graph).filter(n => n.role !== 'hub' && n.role !== 'static');
const words = articles.reduce((a, n) => a + (n.wordCount || 0), 0);
const md = `# Site audit — ${new Date().toISOString().slice(0, 10)}

| Metric | Value |
|---|---|
| HTML pages | ${files.length} |
| Articles | ${articles.length} |
| Total article words | ${words.toLocaleString('en-GB')} |
| Pages with affiliate links | ${affiliatePages} |
| Affiliate links | ${affiliateLinks} |
| Blocking issues | ${issues.blocking.length} |
| Warnings | ${issues.warnings.length} |

## Affiliate readiness
| Check | Status |
|---|---|
| Amazon tracking ID set | ${tagSet ? 'yes (' + site.affiliate.amazon.tag + ')' : 'NO — placeholder in site.config.json'} |
| Products with verified ASIN (direct links) | ${prodStats.asin} of ${prodStats.total} |
| Products on search links (needs-verification) | ${prodStats.search} |
| Products marked active | ${prodStats.active} |
| Disclosure on every affiliate page | ${issues.blocking.some(i => i.includes('no disclosure')) ? 'NO' : 'yes'} |

## Blocking issues
${issues.blocking.length ? issues.blocking.map(i => `- ${i}`).join('\n') : '- none'}

## Warnings
${issues.warnings.length ? issues.warnings.map(i => `- ${i}`).join('\n') : '- none'}

## Not checked here (needs network access)
- External links (sources) — run \`node scripts/check-external-links.mjs\` from a machine with internet access.
- Live HTTPS, redirects and .htaccess behaviour — verify on Hostinger after deployment (see docs/deployment.md).
`;
fs.writeFileSync(path.join(ROOT, 'reports', 'audit.md'), md);
console.log(md);
process.exit(issues.blocking.length ? 1 : 0);
