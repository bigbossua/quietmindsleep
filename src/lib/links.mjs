// Affiliate link builder and URL helpers. Templates never build affiliate URLs themselves.
import { esc } from './html.mjs';

export function pageUrl(key) {
  // key: 'hub/slug' (article), 'hub' (hub), 'about' (page)
  return '/' + key.replace(/^\/+|\/+$/g, '') + '/';
}

export function buildAffiliateLink(product, ctx) {
  const provider = ctx.affiliates.providers[product.provider];
  if (!provider) throw new Error(`Unknown affiliate provider '${product.provider}' for product ${product.id}`);
  if (!provider.enabled) return null;
  const { site } = ctx;
  let url;
  if (provider.type === 'amazon') {
    const tag = site.affiliate?.amazon?.tag || '';
    const tpl = provider.linkTemplates[product.link.type];
    if (!tpl) throw new Error(`Provider ${product.provider} has no template for link type ${product.link.type}`);
    url = tpl
      .replace('{asin}', product.asin || '')
      .replace('{query}', encodeURIComponent(product.link.query || product.name))
      .replace('{trackingParam}', provider.trackingParam)
      .replace('{tag}', encodeURIComponent(tag));
    if (product.link.type === 'asin' && !product.asin) return null;
  } else if (provider.type === 'direct') {
    url = product.link.url;
  } else {
    url = provider.linkTemplates.url
      .replace('{url}', encodeURIComponent(product.link.url || ''))
      .replace('{merchantId}', product.link.merchantId || '')
      .replace('{affiliateId}', site.affiliate?.[product.provider]?.affiliateId || '');
  }
  return { url, rel: provider.rel, label: provider.ctaLabel, providerName: provider.name, disclosureLabel: provider.disclosureLabel, providerId: product.provider };
}

export function affiliateAnchor(product, ctx, extraClass = '') {
  const link = buildAffiliateLink(product, ctx);
  if (!link) return '';
  return `<a class="btn btn-affiliate ${extraClass}" href="${esc(link.url)}" rel="${esc(link.rel)}" target="_blank" data-affiliate="${esc(link.providerId)}" data-product="${esc(product.id)}">${esc(link.label)} <span aria-hidden="true">→</span></a>`;
}
