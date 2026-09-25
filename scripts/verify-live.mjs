// Verifies a deployed copy of the site. Usage: node scripts/verify-live.mjs [https://quietmindsleep.co.uk]
// Checks: HTTPS + redirects (http→https, www→non-www), every sitemap URL returns 200 with a matching canonical,
// robots.txt, sitemap.xml, CSS/JS/fonts/search index, 404 page, and internal links on a sample of pages.
// Needs network access to the live host. Writes reports/live-verification.md and exits 1 on failures.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';
const base = (process.argv[2] || JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8')).baseUrl).replace(/\/$/, '');
const host = new URL(base).host;
const results = [], fails = [];
const ua = { 'user-agent': 'Mozilla/5.0 (compatible; QuietMindSleepLiveCheck/1.0)' };
async function get(url, opts = {}) { try { const r = await fetch(url, { redirect: 'manual', headers: ua, signal: AbortSignal.timeout(20000), ...opts }); return { status: r.status, location: r.headers.get('location'), type: r.headers.get('content-type') || '', text: opts.method === 'HEAD' ? '' : await r.text() }; } catch (e) { return { status: 'ERR', error: e.message, text: '' }; } }
function check(name, ok, detail = '') { results.push({ name, ok, detail }); if (!ok) fails.push(`${name}${detail ? ' — ' + detail : ''}`); }

// 1. redirects and HTTPS
const httpR = await get(base.replace('https://', 'http://') + '/');
check('http → https redirect', [301, 302, 308].includes(httpR.status) && (httpR.location || '').startsWith('https://'), `status ${httpR.status} location ${httpR.location}`);
const wwwR = await get(`https://www.${host}/`);
check('www → non-www redirect', [301, 302, 308].includes(wwwR.status) && (wwwR.location || '').startsWith(base), `status ${wwwR.status} location ${wwwR.location}`);
const home = await get(base + '/');
check('homepage 200 over HTTPS', home.status === 200, `status ${home.status}`);
check('homepage is the Quiet Mind Sleep build', home.text.includes('Quiet Mind Sleep') && home.text.includes('/assets/css/site.css'), 'unexpected HTML (old site or parking page?)');
// 2. static assets
for (const a of ['/robots.txt', '/sitemap.xml', '/search-index.json', '/favicon.svg', '/assets/js/site.js', '/assets/js/search.js', '/assets/img/hero.svg', '/assets/img/og-default.png', '/assets/fonts/inter-latin-wght-normal.woff2']) {
  const r = await get(base + a); check(`asset ${a}`, r.status === 200, `status ${r.status}`);
}
const cssHref = (home.text.match(/href="(\/assets\/css\/site\.css[^"]*)"/) || [])[1];
const css = cssHref ? await get(base + cssHref) : { status: 'missing' };
check('stylesheet loads', css.status === 200 && css.text.includes('--c-navy'), `status ${css.status}`);
// 3. 404
const nf = await get(base + '/this-page-should-not-exist-' + Date.now() + '/');
check('404 page returns 404 with site template', nf.status === 404 && nf.text.includes("couldn't find that page"), `status ${nf.status}`);
// 4. sitemap URLs
const sm = await get(base + '/sitemap.xml');
const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
check('sitemap lists pages', urls.length > 100, `${urls.length} URLs`);
let okPages = 0, canonicalMismatch = 0; const pageHtml = {};
for (const u of urls) {
  const r = await get(u);
  if (r.status === 200) { okPages++; pageHtml[u] = r.text; const can = (r.text.match(/<link rel="canonical" href="([^"]+)"/) || [])[1]; if (can !== u) canonicalMismatch++; }
  else fails.push(`page ${u} → ${r.status}`);
  process.stdout.write(`\r${okPages}/${urls.length} pages ok`);
}
console.log();
check('all sitemap URLs return 200', urls.length > 0 && okPages === urls.length, `${okPages}/${urls.length}`);
check('canonicals match live URLs', urls.length > 0 && canonicalMismatch === 0, `${canonicalMismatch} mismatches`);
// 5. internal links on a sample of pages
const sample = Object.keys(pageHtml).filter((_, i) => i % 6 === 0).slice(0, 25);
const seen = new Set(); let broken = 0, linksChecked = 0;
for (const u of sample) for (const m of pageHtml[u].matchAll(/href="(\/[^"#?]*)"/g)) {
  const href = m[1]; if (seen.has(href) || href.startsWith('/assets/')) continue; seen.add(href);
  const r = await get(base + href, { method: 'HEAD' }); linksChecked++;
  if (![200, 301, 302].includes(r.status)) { broken++; fails.push(`internal link ${href} (from ${u}) → ${r.status}`); }
}
check('internal links on sampled pages resolve', linksChecked > 0 && broken === 0, `${linksChecked} checked, ${broken} broken`);
// 6. search works (index served + page present)
const search = await get(base + '/search/?q=3am');
check('search page loads', search.status === 200 && search.text.includes('search-results'), `status ${search.status}`);

const md = `# Live verification — ${base} — ${new Date().toISOString()}\n\n| Check | Result | Detail |\n|---|---|---|\n${results.map(r => `| ${r.name} | ${r.ok ? '✅' : '❌'} | ${r.detail} |`).join('\n')}\n\n## Failures\n${fails.length ? fails.map(f => `- ${f}`).join('\n') : '- none'}\n`;
fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'reports', 'live-verification.md'), md);
console.log(md);
process.exit(fails.length ? 1 : 0);
