import { esc } from '../lib/html.mjs';
import { base } from './base.mjs';
import { breadcrumbs, heroIllustration, articleMeta, toc, readNext, sourcesList, emailCapture, healthNotice, linkList, productSection } from '../lib/components.mjs';
import { breadcrumbSchema, articleSchema, faqSchema } from '../lib/schema.mjs';
import { pageUrl } from '../lib/links.mjs';

export function articlePage(ctx, page) {
  const hub = ctx.hubIndex[page.hub];
  const trail = [{ label: 'Home', url: '/' }, ...(hub ? [{ label: hub.title, url: pageUrl(hub.slug) }] : [{ label: 'Resources', url: '/resources/' }]), { label: page.title }];
  const related = page.readNextPages;
  const hubLinks = hub ? ctx.articlesByHub[hub.slug].filter(p => p.key !== page.key).slice(0, 8) : [];
  const commercial = page.commercialPages || [];
  // Auto product section: if the plan lists affiliate categories and the body did not place products, append a modest section before the conclusion
  const hasAffiliateLinks = page.productsUsed.size > 0;
  const bodyHtml = `
<article class="article">
  <header class="article-header wrap-narrow">
    ${breadcrumbs(trail)}
    <p class="kicker"><a href="${hub ? pageUrl(hub.slug) : '/resources/'}">${esc(hub ? hub.title : 'Resources')}</a></p>
    <h1>${esc(page.h1 || page.title)}</h1>
    <p class="standfirst">${esc(page.standfirst || page.description)}</p>
    ${articleMeta(page)}
    ${page.productsUsed.size > 0 ? '<p class="affiliate-line">This guide contains affiliate links. As an Amazon Associate, Quiet Mind Sleep earns from qualifying purchases. <a href="/affiliate-disclosure/">How this works</a>.</p>' : ''}
  </header>
  <div class="article-hero wrap-narrow">${heroIllustration(page.illustration, page.imageAlt || '')}</div>
  <div class="article-layout wrap">
    <div class="article-body wrap-narrow">
      ${page.hasHealthNotice ? '' : ''}
      ${toc(page.headings)}
      ${page.html}
      ${page.showHealthNotice ? healthNotice() : ''}
      ${sourcesList(page.sources)}
      ${hasAffiliateLinks ? `<p class="affiliate-notice small">This page contains affiliate links. As an Amazon Associate, Quiet Mind Sleep earns from qualifying purchases. <a href="/affiliate-disclosure/">Read our affiliate disclosure</a>.</p>` : ''}
      <p class="editorial-note">Written and reviewed by the Quiet Mind Sleep editorial team in line with our <a href="/editorial-policy/">editorial policy</a>. Spotted an error? <a href="/corrections/">Let us know</a>.</p>
    </div>
    <aside class="article-sidebar" aria-label="Related content">
      ${hub ? `<div class="sidebar-block"><h2>More in ${esc(hub.title)}</h2>${linkList(hubLinks)}<a class="text-link" href="${pageUrl(hub.slug)}">All ${esc(hub.title)} guides →</a></div>` : ''}
      ${commercial.length ? `<div class="sidebar-block sidebar-commercial"><h2>Useful guides</h2>${linkList(commercial)}</div>` : ''}
      ${emailCapture(ctx, 'sidebar')}
    </aside>
  </div>
  <div class="wrap">${readNext(related, ctx)}</div>
</article>`;
  const schemas = [breadcrumbSchema(ctx, trail), articleSchema(ctx, page), faqSchema(page.faq)];
  return base(ctx, page, bodyHtml, { schemas });
}
