import { esc } from '../lib/html.mjs';
import { header, footer } from '../lib/components.mjs';
import { jsonLd, websiteSchema } from '../lib/schema.mjs';

// Keep <title> within ~65 characters: try full title + brand, then the part before a colon + brand, then the full title alone.
export function smartTitle(title, brand) {
  const before = title.includes(': ') ? title.split(': ')[0] : (title.includes('? ') ? title.split('? ')[0] + '?' : null);
  const candidates = [`${title} | ${brand}`, before ? `${before} | ${brand}` : null, title, before].filter(Boolean);
  return candidates.find(c => c.length <= 65) || candidates[candidates.length - 1];
}

export function base(ctx, page, bodyHtml, opts = {}) {
  const { site } = ctx;
  const title = page.metaTitle || smartTitle(page.title, site.brand);
  const canonical = site.baseUrl + page.url;
  const ogImage = page.illustration ? `${site.baseUrl}/assets/img/og-${page.illustration}.png` : site.baseUrl + site.socialImage;
  const ga = site.analytics?.ga4MeasurementId ? `
<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.analytics.ga4MeasurementId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(site.analytics.ga4MeasurementId)}',{anonymize_ip:true});</script>` : '';
  const schemas = [websiteSchema(ctx), ...(opts.schemas || [])].filter(Boolean).map(jsonLd).join('\n');
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${esc(canonical)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta property="og:site_name" content="${esc(site.brand)}">
<meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1b2a41">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=${ctx.buildId}">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
${schemas}${ga}
</head>
<body class="page-${esc(page.type || 'page')}">
<a class="skip-link" href="#main">Skip to content</a>
${header(ctx, page)}
<main id="main" tabindex="-1">
${bodyHtml}
</main>
${footer(ctx)}
<script src="/assets/js/site.js?v=${ctx.buildId}" defer></script>
${opts.extraScripts || ''}
</body>
</html>`;
}
