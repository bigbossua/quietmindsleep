// Maintenance registers: reports/content-register.csv (per article) and reports/product-register.csv (per affiliate product)
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readJson, toCsv } from './lib.mjs';
const graph = readJson('reports/link-graph.json');
const plan = readJson('content/plan.json').pages;
const products = readJson('data/products.json');
const site = readJson('site.config.json');
const planIx = Object.fromEntries(plan.map(p => [p.slug, p]));
const usedOn = {};
const rows = Object.entries(graph).filter(([, n]) => n.role !== 'hub' && n.role !== 'static').map(([k, n]) => {
  for (const p of n.products || []) { usedOn[p] = usedOn[p] || []; usedOn[p].push(n.url); }
  const pl = planIx[k] || {};
  return { url: site.baseUrl + n.url, targetKeyword: n.primaryKeyword, secondaryKeywords: pl.secondaryKeywords, cluster: n.hub, tier: n.tier, role: n.role, publicationDate: n.published, lastUpdated: n.updated, wordCount: n.wordCount, affiliateProducts: n.products, affiliateCategories: n.affiliateCategories, internalLinksOut: (n.outgoing || []).length, sources: n.sources, status: n.status, semrushValidated: 'no' };
});
fs.writeFileSync(path.join(ROOT, 'reports', 'content-register.csv'), toCsv(rows, ['url', 'targetKeyword', 'secondaryKeywords', 'cluster', 'tier', 'role', 'publicationDate', 'lastUpdated', 'wordCount', 'affiliateProducts', 'affiliateCategories', 'internalLinksOut', 'sources', 'status', 'semrushValidated']));
const tag = site.affiliate.amazon.tag;
const prows = products.products.map(p => ({ id: p.id, product: p.name, brandExample: p.brandExample, category: p.category, provider: p.provider, linkType: p.link.type, asin: p.asin || '', amazonUrl: p.link.type === 'asin' ? `https://www.amazon.co.uk/dp/${p.asin}/?tag=${tag}` : `https://www.amazon.co.uk/s?k=${encodeURIComponent(p.link.query)}&tag=${tag}`, affiliateTag: tag, pagesUsedOn: usedOn[p.id] || [], pageCount: (usedOn[p.id] || []).length, lastChecked: p.lastChecked || '', status: p.status }));
fs.writeFileSync(path.join(ROOT, 'reports', 'product-register.csv'), toCsv(prows, ['id', 'product', 'brandExample', 'category', 'provider', 'linkType', 'asin', 'amazonUrl', 'affiliateTag', 'pagesUsedOn', 'pageCount', 'lastChecked', 'status']));
console.log(`Content register: ${rows.length} articles. Product register: ${prows.length} products (${prows.filter(p => !p.pageCount).length} unused).`);
