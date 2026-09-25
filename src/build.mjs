// Quiet Mind Sleep static build. Usage: node src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { loadConfig, ROOT, DIST, CONTENT, ASSETS, ensureDir, writeFile, copyDir, walk } from './lib/config.mjs';
import { loadMarkdownFile, renderBody, BuildError } from './lib/content.mjs';
import { pageUrl } from './lib/links.mjs';
import { articlePage } from './templates/article.mjs';
import { hubPage } from './templates/hub.mjs';
import { homePage } from './templates/home.mjs';
import { staticPage, searchPage, notFoundPage, sitemapPage, resourcesIndex } from './templates/page.mjs';
import { generateIllustrations } from './lib/illustrations.mjs';
import { generateOgImages } from './lib/og.mjs';

const iso = (d) => d instanceof Date ? d.toISOString().slice(0, 10) : String(d).slice(0, 10);
const OUT_DIR = process.env.QMS_DIST ? path.resolve(process.env.QMS_DIST) : DIST;
const WRITE_REPORTS = !process.env.QMS_NO_REPORT;

const t0 = Date.now();
const cfg = loadConfig();
const ctx = { ...cfg, buildId: Date.now().toString(36), index: {}, hubIndex: {}, productIndex: {}, articles: [], staticPages: [], articlesByHub: {}, warnings: [] };
for (const h of cfg.hubs) { h.key = h.slug; h.url = pageUrl(h.slug); h.type = 'hub'; ctx.hubIndex[h.slug] = h; ctx.index[h.slug] = h; ctx.articlesByHub[h.slug] = []; }
for (const p of cfg.products) ctx.productIndex[p.id] = p;
const planIndex = Object.fromEntries(cfg.plan.map(p => [p.slug, p]));

// ---------- Pass 1: load article metadata ----------
const ONLY = process.env.QMS_ONLY; // validation: only render this hub folder
const VALIDATE = !!process.env.QMS_VALIDATE; // validation: planned-but-unwritten pages count as valid link targets
const articleFiles = walk(ONLY ? path.join(CONTENT, 'articles', ONLY) : path.join(CONTENT, 'articles'));
for (const file of articleFiles) {
  const rel = path.relative(path.join(CONTENT, 'articles'), file).replace(/\\/g, '/').replace(/\.md$/, '');
  const { data, content } = loadMarkdownFile(file);
  const key = rel;
  const [hub] = key.split('/');
  if (!ctx.hubIndex[hub] && hub !== 'resources') throw new BuildError(`${file}: folder '${hub}' is not a hub`);
  const plan = planIndex[key];
  if (!plan) ctx.warnings.push(`No plan entry for ${key} (article exists but is not in content/plan.json)`);
  const required = ['title', 'description', 'published'];
  for (const r of required) if (!data[r]) throw new BuildError(`${file}: missing front matter '${r}'`);
  if (data.description.length > 165) ctx.warnings.push(`${key}: meta description is ${data.description.length} chars (aim for 140–160)`);
  if (data.status && data.status === 'unpublished') continue;
  const page = {
    key, file, hub, url: pageUrl(key), type: 'article', content,
    title: data.title, h1: data.h1 || data.title, description: data.description, standfirst: data.standfirst,
    published: iso(data.published), updated: data.updated ? iso(data.updated) : iso(data.published),
    illustration: data.illustration || ctx.hubIndex[hub]?.illustration || 'moon', imageAlt: data.imageAlt,
    primaryKeyword: data.primaryKeyword || plan?.primaryKeyword, secondaryKeywords: data.secondaryKeywords || plan?.secondaryKeywords || [],
    intent: data.intent || plan?.intent, role: data.role || plan?.role || 'informational', tier: plan?.tier,
    affiliateCategories: data.affiliate || plan?.affiliate || [],
    readNext: data.readNext || [], faq: data.faq || [], sources: data.sources || [],
    showHealthNotice: data.healthNotice !== false && (data.healthNotice === true || /gp|anxiety|depress|medic|apnoea|insomnia/i.test(content)),
    status: data.status || 'draft', hubTitle: ctx.hubIndex[hub]?.title || 'Resources'
  };
  ctx.index[key] = page; ctx.articles.push(page);
  if (ctx.articlesByHub[hub]) ctx.articlesByHub[hub].push(page);
}
// static pages
for (const file of walk(path.join(CONTENT, 'pages'))) {
  const key = path.basename(file, '.md');
  const { data, content } = loadMarkdownFile(file);
  const page = { key, file, url: pageUrl(key), type: 'page', content, title: data.title, h1: data.h1, description: data.description, standfirst: data.standfirst, updated: data.updated ? iso(data.updated) : undefined, noindex: !!data.noindex, faq: data.faq || [], sources: [] };
  ctx.index[key] = page; ctx.staticPages.push(page);
}
if (VALIDATE) for (const p of cfg.plan) if (!ctx.index[p.slug]) ctx.index[p.slug] = { key: p.slug, url: pageUrl(p.slug), title: p.title, description: p.title, hub: p.hub, type: 'planned', outgoing: new Set() };
ctx.index['resources'] = { key: 'resources', url: '/resources/', title: 'Sleep resources', type: 'hub' };
ctx.index['search'] = { key: 'search', url: '/search/', title: 'Search', type: 'page' };
ctx.index['sitemap'] = { key: 'sitemap', url: '/sitemap/', title: 'Sitemap', type: 'page' };

// ---------- Pass 2: render bodies ----------
for (const page of [...ctx.articles, ...ctx.staticPages]) {
  const r = renderBody(page.content, page.file, ctx, page);
  Object.assign(page, r);
  delete page.content;
}
// Read-next resolution and commercial pages
for (const page of ctx.articles) {
  page.readNextPages = page.readNext.map(k => {
    if (!ctx.index[k]) throw new BuildError(`${page.file}: readNext target '${k}' does not exist`);
    page.outgoing.add(k); return ctx.index[k];
  }).filter(p => p.type === 'article');
  if (page.readNextPages.length === 0) {
    // fall back to hub siblings that are not already linked
    const sib = (ctx.articlesByHub[page.hub] || []).filter(p => p.key !== page.key && !page.outgoing.has(p.key)).slice(0, 3);
    page.readNextPages = sib; sib.forEach(p => page.outgoing.add(p.key));
  }
  const cats = new Set(page.affiliateCategories);
  const guides = [...cats].map(c => ctx.categories[c]?.guide).filter(Boolean).filter(g => g !== page.key);
  const hubCommercial = (ctx.hubIndex[page.hub]?.commercial || []).filter(g => g !== page.key);
  page.commercialPages = [...new Set([...guides, ...hubCommercial])].map(k => ctx.index[k]).filter(Boolean).slice(0, 4);
  page.commercialPages.forEach(p => page.outgoing.add(p.key));
}
// Sort hub lists: tier then title
for (const h of Object.keys(ctx.articlesByHub)) ctx.articlesByHub[h].sort((a, b) => (a.tier || 9) - (b.tier || 9) || a.title.localeCompare(b.title));

// ---------- Output ----------
fs.rmSync(OUT_DIR, { recursive: true, force: true });
ensureDir(OUT_DIR);
copyDir(ASSETS, path.join(OUT_DIR, 'assets'));
generateIllustrations(path.join(OUT_DIR, 'assets', 'img'));
if (!process.env.QMS_NO_OG) await generateOgImages(path.join(OUT_DIR, 'assets', 'img'), cfg.site.brand);
fs.copyFileSync(path.join(OUT_DIR, 'assets', 'img', 'favicon.svg'), path.join(OUT_DIR, 'favicon.svg'));

const out = (url, html) => writeFile(path.join(OUT_DIR, url.replace(/^\//, ''), url.endsWith('.html') ? '' : 'index.html'), html);
out('/', homePage(ctx));
for (const h of ctx.hubs) out(h.url, hubPage(ctx, h));
for (const a of ctx.articles) out(a.url, articlePage(ctx, a));
for (const p of ctx.staticPages) out(p.url, staticPage(ctx, p));
out('/search/', searchPage(ctx));
out('/sitemap/', sitemapPage(ctx));
out('/resources/', resourcesIndex(ctx));
writeFile(path.join(OUT_DIR, '404.html'), notFoundPage(ctx));

// sitemap.xml
const urls = [{ loc: '/', p: '1.0' }, ...ctx.hubs.map(h => ({ loc: h.url, p: '0.9' })), { loc: '/resources/', p: '0.7' },
  ...ctx.articles.map(a => ({ loc: a.url, lastmod: a.updated, p: a.tier === 1 ? '0.8' : '0.7' })),
  ...ctx.staticPages.filter(p => !p.noindex).map(p => ({ loc: p.url, lastmod: p.updated, p: '0.4' })), { loc: '/sitemap/', p: '0.3' }];
writeFile(path.join(OUT_DIR, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${cfg.site.baseUrl}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.p}</priority></url>`).join('\n')}\n</urlset>\n`);
writeFile(path.join(OUT_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /search/\n\nSitemap: ${cfg.site.baseUrl}/sitemap.xml\n`);
// search index
writeFile(path.join(OUT_DIR, 'search-index.json'), JSON.stringify(ctx.articles.map(a => ({ t: a.title, u: a.url, d: a.description, h: a.hubTitle, k: [a.primaryKeyword, ...a.secondaryKeywords].filter(Boolean).join(' ') }))));
// .htaccess (Apache on Hostinger)
fs.copyFileSync(path.join(ROOT, 'src', 'htaccess.txt'), path.join(OUT_DIR, '.htaccess'));
// link graph for audit scripts
const graph = {};
for (const a of ctx.articles) graph[a.key] = { title: a.title, url: a.url, hub: a.hub, role: a.role, tier: a.tier, status: a.status, primaryKeyword: a.primaryKeyword, published: a.published, updated: a.updated, wordCount: a.wordCount, outgoing: [...a.outgoing], products: [...a.productsUsed], affiliateCategories: a.affiliateCategories, readNext: a.readNextPages.map(p => p.key), commercial: a.commercialPages.map(p => p.key), sources: a.sources.map(s => s.url) };
for (const h of ctx.hubs) graph[h.slug] = { title: h.title, url: h.url, hub: null, role: 'hub', outgoing: [...(ctx.articlesByHub[h.slug] || []).map(p => p.key), ...(h.relatedHubs || []), ...(h.commercial || [])] };
for (const p of ctx.staticPages) graph[p.key] = { title: p.title, url: p.url, role: 'static', outgoing: [...p.outgoing] };
if (WRITE_REPORTS) writeFile(path.join(ROOT, 'reports', 'link-graph.json'), JSON.stringify(graph, null, 1));

// plan coverage
const built = new Set(ctx.articles.map(a => a.key));
const queued = cfg.plan.filter(p => !built.has(p.slug));
console.log(`Built ${ctx.articles.length} articles, ${ctx.hubs.length} hubs, ${ctx.staticPages.length} pages in ${Date.now() - t0}ms. Plan: ${cfg.plan.length} (${queued.length} not yet written).`);
if (ctx.warnings.length) { console.log('Warnings:'); ctx.warnings.forEach(w => console.log(' - ' + w)); }
