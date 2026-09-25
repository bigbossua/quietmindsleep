import { esc } from '../lib/html.mjs';
import { base } from './base.mjs';
import { breadcrumbs, emailCapture } from '../lib/components.mjs';
import { breadcrumbSchema } from '../lib/schema.mjs';

export function staticPage(ctx, page) {
  const trail = [{ label: 'Home', url: '/' }, { label: page.title }];
  const bodyHtml = `
<article class="article static-page">
  <header class="article-header wrap-narrow">
    ${breadcrumbs(trail)}
    <h1>${esc(page.h1 || page.title)}</h1>
    ${page.standfirst ? `<p class="standfirst">${esc(page.standfirst)}</p>` : ''}
    ${page.updated ? `<p class="article-meta">Last updated <time datetime="${esc(page.updated)}">${new Date(page.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time></p>` : ''}
  </header>
  <div class="article-body wrap-narrow">
    ${page.html}
  </div>
</article>`;
  return base(ctx, page, bodyHtml, { schemas: [breadcrumbSchema(ctx, trail)] });
}

export function searchPage(ctx) {
  const bodyHtml = `
<section class="article static-page">
  <header class="article-header wrap-narrow">
    ${breadcrumbs([{ label: 'Home', url: '/' }, { label: 'Search' }])}
    <h1>Search Quiet Mind Sleep</h1>
    <p class="standfirst">Find guides on racing thoughts, falling asleep, waking at night, sleep sounds, your bedroom and more.</p>
  </header>
  <div class="wrap-narrow">
    <form class="search-form" role="search" action="/search/" method="get">
      <label class="visually-hidden" for="search-q">Search</label>
      <input type="search" id="search-q" name="q" placeholder="e.g. waking at 3am, brown noise, sleep mask" autocomplete="off">
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
    <div id="search-results" class="search-results" aria-live="polite"></div>
    <noscript><p>Search needs JavaScript. You can browse all guides on the <a href="/sitemap/">sitemap</a>.</p></noscript>
  </div>
</section>`;
  return base(ctx, { key: 'search', url: '/search/', title: 'Search', description: 'Search all Quiet Mind Sleep guides.', type: 'search', noindex: true }, bodyHtml, { extraScripts: `<script src="/assets/js/search.js?v=${ctx.buildId}" defer></script>` });
}

export function notFoundPage(ctx) {
  const bodyHtml = `
<section class="article static-page">
  <header class="article-header wrap-narrow">
    <h1>We couldn't find that page</h1>
    <p class="standfirst">It may have moved or the link may be out of date. Try a search, or start from one of the topics below.</p>
  </header>
  <div class="wrap-narrow">
    <form class="search-form" role="search" action="/search/" method="get">
      <label class="visually-hidden" for="nf-q">Search</label>
      <input type="search" id="nf-q" name="q" placeholder="Search the site">
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
    <ul class="link-list">${ctx.hubs.map(h => `<li><a href="/${h.slug}/">${esc(h.title)}</a></li>`).join('')}</ul>
  </div>
</section>`;
  return base(ctx, { key: '404', url: '/404.html', title: 'Page not found', description: 'The page you were looking for could not be found.', type: 'error', noindex: true }, bodyHtml);
}

export function sitemapPage(ctx) {
  const sections = ctx.hubs.map(h => `<section><h2><a href="/${h.slug}/">${esc(h.title)}</a></h2><ul class="link-list">${(ctx.articlesByHub[h.slug] || []).map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')}</ul></section>`).join('');
  const resources = ctx.articles.filter(p => p.hub === 'resources');
  const pages = ctx.staticPages;
  const bodyHtml = `
<section class="article static-page">
  <header class="article-header wrap-narrow">
    ${breadcrumbs([{ label: 'Home', url: '/' }, { label: 'Sitemap' }])}
    <h1>Sitemap</h1>
    <p class="standfirst">Every guide and page on Quiet Mind Sleep.</p>
  </header>
  <div class="wrap-narrow sitemap-page">
    ${sections}
    <section><h2>Resources</h2><ul class="link-list">${resources.map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')}</ul></section>
    <section><h2>About and legal</h2><ul class="link-list">${pages.map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')}</ul></section>
  </div>
</section>`;
  return base(ctx, { key: 'sitemap', url: '/sitemap/', title: 'Sitemap', description: 'A full list of guides and pages on Quiet Mind Sleep.', type: 'sitemap' }, bodyHtml);
}

export function resourcesIndex(ctx) {
  const resources = ctx.articles.filter(p => p.hub === 'resources');
  const bodyHtml = `
<section class="article static-page">
  <header class="article-header wrap-narrow">
    ${breadcrumbs([{ label: 'Home', url: '/' }, { label: 'Resources' }])}
    <h1>Sleep resources</h1>
    <p class="standfirst">Plans and checklists that pull the guides together into something you can act on this week.</p>
  </header>
  <div class="wrap"><div class="card-grid card-grid-3">${resources.map(p => `<article class="card"><div class="card-body"><h3 class="card-title"><a href="${p.url}">${esc(p.title)}</a></h3><p class="card-desc">${esc(p.description)}</p></div></article>`).join('')}</div></div>
  <div class="wrap section">${emailCapture(ctx, 'wide')}</div>
</section>`;
  return base(ctx, { key: 'resources', url: '/resources/', title: 'Sleep resources', description: 'Free sleep plans and checklists from Quiet Mind Sleep, including the 7-Night Quiet Mind Sleep Plan.', type: 'hub' }, bodyHtml);
}
