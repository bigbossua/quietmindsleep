import { esc, formatDate } from './html.mjs';
import { pageUrl, affiliateAnchor } from './links.mjs';

// ---------- Navigation ----------
export function header(ctx, current) {
  const { site } = ctx;
  const items = site.nav.map(n => {
    const hub = ctx.hubIndex[n.hub];
    const active = current && (current.key === n.hub || current.hub === n.hub) ? ' aria-current="page"' : '';
    return `<li><a href="${pageUrl(n.hub)}"${active}>${esc(n.label)}</a></li>`;
  }).join('');
  return `
<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="/" aria-label="${esc(site.brand)} home">
      <span class="brand-mark" aria-hidden="true">${brandMark()}</span>
      <span class="brand-name">Quiet Mind <em>Sleep</em></span>
    </a>
    <form class="header-search" role="search" action="/search/" method="get">
      <label class="visually-hidden" for="q">Search the site</label>
      <input type="search" id="q" name="q" placeholder="Search sleep guides…" autocomplete="off">
      <button type="submit" aria-label="Search">${icon('search')}</button>
    </form>
    <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" data-nav-toggle>
      <span class="nav-toggle-bar"></span><span class="visually-hidden">Menu</span>
    </button>
  </div>
  <nav class="primary-nav" id="primary-nav" aria-label="Sleep topics">
    <div class="wrap"><ul>${items}</ul></div>
  </nav>
</header>`;
}

export function brandMark() {
  return `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17" cy="17" r="16" fill="var(--c-navy)"/><path d="M22.5 8.5a9 9 0 1 0 4 15.4A10 10 0 0 1 22.5 8.5z" fill="var(--c-sand)"/><circle cx="11" cy="11" r="1.2" fill="var(--c-sand)" opacity=".8"/><circle cx="9" cy="17" r=".8" fill="var(--c-sand)" opacity=".6"/></svg>`;
}

export function icon(name) {
  const icons = {
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
    heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
  };
  return icons[name] || '';
}

export function footer(ctx) {
  const { site, hubs } = ctx;
  const topicLinks = hubs.map(h => `<li><a href="${pageUrl(h.slug)}">${esc(h.title)}</a></li>`).join('');
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-about">
      <a class="brand brand-footer" href="/"><span class="brand-mark" aria-hidden="true">${brandMark()}</span><span class="brand-name">Quiet Mind <em>Sleep</em></span></a>
      <p>${esc(site.tagline)} Independent, UK-focused sleep information, written in plain English.</p>
      <p class="footer-disclaimer">${esc(site.editorialNote)} Content is for general information only and is not a substitute for advice from a GP or other qualified health professional. If you are worried about your sleep or health, please seek medical advice.</p>
    </div>
    <nav class="footer-col" aria-label="Sleep topics">
      <h2>Sleep topics</h2>
      <ul>${topicLinks}</ul>
    </nav>
    <nav class="footer-col" aria-label="Resources">
      <h2>Resources</h2>
      <ul>
        <li><a href="/resources/7-night-quiet-mind-sleep-plan/">7-Night Quiet Mind Sleep Plan</a></li>
        <li><a href="/resources/sleep-checklist/">Better Sleep Checklist</a></li>
        <li><a href="/sleep-questions/when-to-see-a-gp-about-sleep/">When to see a GP</a></li>
        <li><a href="/sleep-products/">Product guides</a></li>
        <li><a href="/search/">Search</a></li>
        <li><a href="/sitemap/">Sitemap</a></li>
      </ul>
    </nav>
    <nav class="footer-col" aria-label="About and legal">
      <h2>About</h2>
      <ul>
        <li><a href="/about/">About Quiet Mind Sleep</a></li>
        <li><a href="/contact/">Contact</a></li>
        <li><a href="/editorial-policy/">Editorial policy</a></li>
        <li><a href="/affiliate-disclosure/">Affiliate disclosure</a></li>
        <li><a href="/health-disclaimer/">Health information disclaimer</a></li>
        <li><a href="/corrections/">Corrections</a></li>
        <li><a href="/privacy-policy/">Privacy policy</a></li>
        <li><a href="/cookie-policy/">Cookie policy</a></li>
        <li><a href="/terms/">Terms of use</a></li>
      </ul>
    </nav>
  </div>
  <div class="wrap footer-bottom">
    <p>&copy; ${year} ${esc(site.brand)}. As an Amazon Associate, ${esc(site.brand)} earns from qualifying purchases. <a href="/affiliate-disclosure/">Learn more</a>.</p>
  </div>
</footer>`;
}

// ---------- Breadcrumbs ----------
export function breadcrumbs(trail) {
  // trail: [{label, url}] ending with current (no url)
  const items = trail.map((t, i) => t.url
    ? `<li><a href="${esc(t.url)}">${esc(t.label)}</a></li>`
    : `<li aria-current="page">${esc(t.label)}</li>`).join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items}</ol></nav>`;
}

// ---------- Illustrations ----------
export function illustration(name, alt = '', cls = '') {
  return `<img class="illustration ${cls}" src="/assets/img/${esc(name)}.svg" alt="${esc(alt)}" width="1200" height="675" loading="lazy" decoding="async">`;
}
export function heroIllustration(name, alt = '') {
  return `<img class="illustration hero-illustration" src="/assets/img/${esc(name)}.svg" alt="${esc(alt)}" width="1200" height="675" fetchpriority="high" decoding="async">`;
}

// ---------- Cards ----------
export function articleCard(page, ctx, opts = {}) {
  const hub = ctx.hubIndex[page.hub];
  const ill = page.illustration || hub?.illustration || 'moon';
  return `
<article class="card ${opts.cls || ''}">
  <a class="card-media" href="${esc(page.url)}" tabindex="-1" aria-hidden="true">${illustration(ill, '', 'card-illustration')}</a>
  <div class="card-body">
    ${hub && !opts.hideHub ? `<a class="card-kicker" href="${pageUrl(hub.slug)}">${esc(hub.title)}</a>` : ''}
    <h3 class="card-title"><a href="${esc(page.url)}">${esc(page.title)}</a></h3>
    <p class="card-desc">${esc(page.description)}</p>
    ${page.readingTime ? `<p class="card-meta">${icon('clock')} ${page.readingTime} min read</p>` : ''}
  </div>
</article>`;
}

export function cardGrid(pages, ctx, opts = {}) {
  return `<div class="card-grid ${opts.cls || ''}">${pages.map(p => articleCard(p, ctx, opts)).join('')}</div>`;
}

export function linkList(pages, opts = {}) {
  return `<ul class="link-list ${opts.cls || ''}">${pages.map(p => `<li><a href="${esc(p.url)}">${esc(p.title)}</a>${opts.desc ? `<span>${esc(p.description)}</span>` : ''}</li>`).join('')}</ul>`;
}

// ---------- Product components ----------
export function productBox(product, ctx) {
  const cat = ctx.categories[product.category];
  const cta = affiliateAnchor(product, ctx);
  return `
<div class="product-box" data-product-id="${esc(product.id)}">
  <div class="product-box-head">
    <span class="product-kicker">${esc(cat?.label || 'Recommended')}</span>
    <h4 class="product-name">${esc(product.name)}</h4>
    ${product.brandExample ? `<p class="product-brand">Example: ${esc(product.brandExample)}</p>` : ''}
  </div>
  <p class="product-desc">${esc(product.description)}</p>
  <dl class="product-facts">
    <div><dt>Best for</dt><dd>${esc(product.bestFor)}</dd></div>
    <div><dt>Key feature</dt><dd>${esc(product.keyFeature)}</dd></div>
    <div><dt>Why it may help</dt><dd>${esc(product.why)}</dd></div>
    ${product.consideration ? `<div><dt>Worth knowing</dt><dd>${esc(product.consideration)}</dd></div>` : ''}
  </dl>
  ${cta ? `<div class="product-cta">${cta}<span class="product-note">Availability and price shown on the retailer's site.</span></div>` : ''}
</div>`;
}

export function productSection(products, ctx, heading, intro) {
  if (!products.length) return '';
  return `
<section class="product-section" aria-labelledby="products-${esc(products[0].id)}">
  <div class="product-section-head">
    <h3 id="products-${esc(products[0].id)}">${esc(heading || 'Recommended for sleep')}</h3>
    ${intro ? `<p>${esc(intro)}</p>` : ''}
    <p class="affiliate-notice">${icon('info')} We may earn a commission if you buy through links on this page, at no extra cost to you. We only recommend product types we would consider ourselves. <a href="/affiliate-disclosure/">How we choose products</a>.</p>
  </div>
  <div class="product-list">${products.map(p => productBox(p, ctx)).join('')}</div>
</section>`;
}

export function comparisonTable(products, ctx, caption) {
  if (!products.length) return '';
  const rows = products.map(p => {
    const link = affiliateAnchor(p, ctx, 'btn-small');
    return `<tr><th scope="row">${esc(p.name)}${p.brandExample ? `<span class="table-sub">e.g. ${esc(p.brandExample)}</span>` : ''}</th><td>${esc(p.bestFor)}</td><td>${esc(p.keyFeature)}</td><td>${esc(p.consideration || '')}</td><td>${link || '—'}</td></tr>`;
  }).join('');
  return `
<div class="table-wrap">
<table class="compare-table">
  <caption>${esc(caption || 'At a glance')}</caption>
  <thead><tr><th scope="col">Product type</th><th scope="col">Best for</th><th scope="col">Key feature</th><th scope="col">Worth knowing</th><th scope="col">Where to find it</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
</div>
<p class="affiliate-notice small">Links marked with an arrow go to a retailer; we may earn a commission. <a href="/affiliate-disclosure/">Affiliate disclosure</a>.</p>`;
}

// ---------- FAQ ----------
export function faqSection(faq) {
  if (!faq || !faq.length) return '';
  return `
<section class="faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading">Frequently asked questions</h2>
  ${faq.map(f => `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-answer">${f.aHtml}</div></details>`).join('')}
</section>`;
}

// ---------- Email capture ----------
export function emailCapture(ctx, variant = 'inline') {
  const { site } = ctx;
  const configured = site.email?.provider && site.email.provider !== 'none' && site.email.formAction;
  return `
<aside class="email-capture ${variant}" aria-labelledby="email-heading">
  <div class="email-icon" aria-hidden="true">${icon('mail')}</div>
  <div class="email-body">
    <h3 id="email-heading">Get the 7-Night Quiet Mind Sleep Plan</h3>
    <p>One small change each night for a week, with the reasoning behind it. Free, no spam, unsubscribe any time.</p>
    <form class="email-form" method="post" action="${esc(configured ? site.email.formAction : '#')}" data-email-form data-configured="${configured ? 'true' : 'false'}">
      <label class="visually-hidden" for="email-${variant}">Email address</label>
      <input type="email" id="email-${variant}" name="email" placeholder="you@example.com" required autocomplete="email">
      <button class="btn btn-primary" type="submit">Send me the plan</button>
      <p class="email-privacy">We'll only use your email to send the plan and occasional sleep guides. See our <a href="/privacy-policy/">privacy policy</a>.</p>
      <p class="email-fallback" hidden>Our email list isn't open yet. You can <a href="/resources/7-night-quiet-mind-sleep-plan/">read the full plan here</a>.</p>
    </form>
  </div>
</aside>`;
}

// ---------- Callouts ----------
export function healthNotice() {
  return `<aside class="callout callout-health" role="note"><strong>A note on health.</strong> Quiet Mind Sleep provides general information, not medical advice. If sleep problems are persistent, severe, or affecting your daily life or mood, please speak to a GP. <a href="/sleep-questions/when-to-see-a-gp-about-sleep/">When to see a GP about sleep</a>.</aside>`;
}

export function sourcesList(sources) {
  if (!sources || !sources.length) return '';
  return `
<section class="sources" aria-labelledby="sources-heading">
  <h2 id="sources-heading">Sources and further reading</h2>
  <ol>${sources.map(s => `<li>${s.publisher ? `${esc(s.publisher)}: ` : ''}<a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.title)}</a>${s.note ? ` — ${esc(s.note)}` : ''}</li>`).join('')}</ol>
</section>`;
}

export function articleMeta(page) {
  const upd = page.updated && page.updated !== page.published ? ` · Updated <time datetime="${esc(page.updated)}">${formatDate(page.updated)}</time>` : '';
  return `<p class="article-meta">By the Quiet Mind Sleep editorial team · Published <time datetime="${esc(page.published)}">${formatDate(page.published)}</time>${upd} · ${page.readingTime} min read</p>`;
}

export function toc(headings) {
  const h2s = headings.filter(h => h.level === 2);
  if (h2s.length < 4) return '';
  return `<nav class="toc" aria-labelledby="toc-heading"><h2 id="toc-heading">In this guide</h2><ol>${h2s.map(h => `<li><a href="#${esc(h.id)}">${esc(h.text)}</a></li>`).join('')}</ol></nav>`;
}

export function readNext(pages, ctx) {
  if (!pages.length) return '';
  return `
<section class="read-next" aria-labelledby="read-next-heading">
  <h2 id="read-next-heading">Read next</h2>
  ${cardGrid(pages, ctx, { cls: 'card-grid-3' })}
</section>`;
}
