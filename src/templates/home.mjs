import { esc } from '../lib/html.mjs';
import { base } from './base.mjs';
import { cardGrid, illustration, emailCapture, icon, productBox } from '../lib/components.mjs';
import { pageUrl } from '../lib/links.mjs';

export function homePage(ctx) {
  const { site, hubs } = ctx;
  const featured = site.featuredHome.map(k => ctx.index[k]).filter(Boolean);
  const products = site.productsHome.map(k => ctx.index[k]).filter(Boolean);
  const resources = site.resourcesHome.map(k => ctx.index[k]).filter(Boolean);
  const latest = ctx.articles.slice().sort((a, b) => (b.updated || b.published).localeCompare(a.updated || a.published)).slice(0, 6);
  const bodyHtml = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker">UK sleep guides, written in plain English</p>
      <h1>Practical ways to quiet a busy mind and build better sleep habits.</h1>
      <p class="standfirst">Clear, calm guidance on racing thoughts, falling asleep, waking in the night and setting up a bedroom that helps. Independent, evidence-aware and free of miracle promises.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="/quiet-the-mind/">Quiet a racing mind ${icon('arrow')}</a>
        <a class="btn btn-secondary" href="/resources/7-night-quiet-mind-sleep-plan/">Try the 7-night plan</a>
      </div>
    </div>
    <div class="hero-art">${illustration('hero', 'A calm night sky over a quiet bedroom window', 'hero-illustration')}</div>
  </div>
</section>

<section class="wrap section" aria-labelledby="topics-heading">
  <div class="section-head"><h2 id="topics-heading" class="section-title">Explore by topic</h2><p>Every guide belongs to a topic, so you can go as deep as you need.</p></div>
  <ul class="topic-grid">
    ${hubs.map(h => `<li><a class="topic-card" href="${pageUrl(h.slug)}"><span class="topic-art">${illustration(h.illustration, '', 'topic-illustration')}</span><span class="topic-body"><strong>${esc(h.title)}</strong><span>${esc(h.description)}</span></span></a></li>`).join('')}
  </ul>
</section>

<section class="wrap section" aria-labelledby="featured-heading">
  <div class="section-head"><h2 id="featured-heading" class="section-title">Featured guides</h2><p>The guides most people start with.</p></div>
  ${cardGrid(featured, ctx, { cls: 'card-grid-3' })}
</section>

<section class="section section-tint" aria-labelledby="trust-heading">
  <div class="wrap trust-grid">
    <div>
      <h2 id="trust-heading" class="section-title">Why trust Quiet Mind Sleep?</h2>
      <p>We are an independent UK website, not a clinic and not a shop. We write about what the evidence and reputable sources such as the NHS actually say, in language you can use tonight. When we mention a product, we explain why it might help and where it falls short, and we never write fake reviews.</p>
      <p><a class="text-link" href="/about/">About us</a> · <a class="text-link" href="/editorial-policy/">Editorial policy</a> · <a class="text-link" href="/affiliate-disclosure/">How we make money</a></p>
    </div>
    <ul class="trust-points">
      <li>${icon('heart')}<span><strong>Written for real bedrooms.</strong> UK homes, UK seasons, UK habits.</span></li>
      <li>${icon('info')}<span><strong>No miracle promises.</strong> We say what helps, what might help, and what is hype.</span></li>
      <li>${icon('clock')}<span><strong>Kept up to date.</strong> Guides are reviewed and updated as advice changes.</span></li>
    </ul>
  </div>
</section>

<section class="wrap section" aria-labelledby="resources-heading">
  <div class="section-head"><h2 id="resources-heading" class="section-title">Sleep resources</h2><p>Plans, checklists and techniques you can use straight away.</p></div>
  ${cardGrid(resources, ctx, { cls: 'card-grid-4' })}
</section>

<section class="wrap section" aria-labelledby="products-heading">
  <div class="section-head"><h2 id="products-heading" class="section-title">Product guides</h2><p>Plain-English buying guides for the few products that genuinely help with darkness, quiet and comfort. <a href="/affiliate-disclosure/">We may earn a commission</a> if you buy through our links.</p></div>
  ${cardGrid(products, ctx, { cls: 'card-grid-4', hideHub: true })}
</section>

<section class="wrap section">${emailCapture(ctx, 'wide')}</section>

<section class="wrap section" aria-labelledby="latest-heading">
  <div class="section-head"><h2 id="latest-heading" class="section-title">Recently updated</h2></div>
  ${cardGrid(latest, ctx, { cls: 'card-grid-3 card-grid-compact' })}
</section>`;
  return base(ctx, { key: 'home', url: '/', title: site.brand, description: `${site.tagline} Independent UK guides on racing thoughts, falling asleep, waking at night, sleep sounds and setting up your bedroom for better sleep.`, type: 'home', illustration: 'hero' }, bodyHtml);
}
