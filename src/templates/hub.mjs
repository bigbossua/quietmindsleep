import { esc } from '../lib/html.mjs';
import { base } from './base.mjs';
import { breadcrumbs, heroIllustration, cardGrid, linkList, emailCapture } from '../lib/components.mjs';
import { breadcrumbSchema, collectionSchema } from '../lib/schema.mjs';
import { pageUrl } from '../lib/links.mjs';

export function hubPage(ctx, hub) {
  const pages = ctx.articlesByHub[hub.slug] || [];
  const featured = hub.featured.map(s => ctx.index[`${hub.slug}/${s}`]).filter(Boolean);
  const rest = pages.filter(p => !featured.includes(p));
  const related = (hub.relatedHubs || []).map(s => ctx.hubIndex[s]).filter(Boolean);
  const commercial = (hub.commercial || []).map(k => ctx.index[k]).filter(Boolean);
  const trail = [{ label: 'Home', url: '/' }, { label: hub.title }];
  const groups = groupByRole(rest);
  const bodyHtml = `
<section class="hub-header">
  <div class="wrap hub-header-grid">
    <div>
      ${breadcrumbs(trail)}
      <h1>${esc(hub.h1 || hub.title)}</h1>
      <p class="standfirst">${esc(hub.intro)}</p>
      <p class="hub-count">${pages.length} guides</p>
    </div>
    <div class="hub-hero">${heroIllustration(hub.illustration, '')}</div>
  </div>
</section>
<section class="wrap section">
  <h2 class="section-title">Start here</h2>
  ${cardGrid(featured, ctx, { hideHub: true, cls: 'card-grid-4' })}
</section>
${groups.map(g => g.pages.length ? `
<section class="wrap section">
  <h2 class="section-title">${esc(g.label)}</h2>
  ${cardGrid(g.pages, ctx, { hideHub: true, cls: 'card-grid-3 card-grid-compact' })}
</section>` : '').join('')}
<section class="wrap section hub-related">
  <div class="hub-related-grid">
    ${related.length ? `<div><h2 class="section-title">Related topics</h2><ul class="hub-list">${related.map(r => `<li><a href="${pageUrl(r.slug)}"><strong>${esc(r.title)}</strong><span>${esc(r.description)}</span></a></li>`).join('')}</ul></div>` : ''}
    ${commercial.length ? `<div><h2 class="section-title">Product guides you may find useful</h2>${linkList(commercial, { desc: true, cls: 'link-list-desc' })}</div>` : ''}
  </div>
</section>
<section class="wrap section">${emailCapture(ctx, 'wide')}</section>`;
  const schemas = [breadcrumbSchema(ctx, trail), collectionSchema(ctx, hub, pages)];
  return base(ctx, { ...hub, key: hub.slug, url: pageUrl(hub.slug), type: 'hub', metaTitle: hub.metaTitle }, bodyHtml, { schemas });
}

function groupByRole(pages) {
  const info = pages.filter(p => p.role === 'informational');
  const support = pages.filter(p => p.role === 'supporting');
  const commercial = pages.filter(p => p.role === 'commercial');
  return [
    { label: 'In-depth guides', pages: info },
    { label: 'Buying guides and comparisons', pages: commercial },
    { label: 'Quick reads and specific questions', pages: support }
  ];
}
