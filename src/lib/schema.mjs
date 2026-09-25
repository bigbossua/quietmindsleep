import { stripTags } from './html.mjs';

export function websiteSchema(ctx) {
  const { site } = ctx;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${site.baseUrl}/#organization`, name: site.brand, url: site.baseUrl + '/', logo: { '@type': 'ImageObject', url: `${site.baseUrl}/assets/img/logo.svg` } },
      { '@type': 'WebSite', '@id': `${site.baseUrl}/#website`, url: site.baseUrl + '/', name: site.brand, description: site.tagline, publisher: { '@id': `${site.baseUrl}/#organization` }, inLanguage: 'en-GB',
        potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${site.baseUrl}/search/?q={search_term_string}` }, 'query-input': 'required name=search_term_string' } }
    ]
  };
}

export function breadcrumbSchema(ctx, trail) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.label, ...(t.url ? { item: ctx.site.baseUrl + t.url } : {}) }))
  };
}

export function articleSchema(ctx, page) {
  const { site } = ctx;
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    '@id': `${site.baseUrl}${page.url}#article`,
    headline: page.h1 || page.title,
    description: page.description,
    inLanguage: 'en-GB',
    mainEntityOfPage: { '@type': 'WebPage', '@id': site.baseUrl + page.url },
    datePublished: page.published, dateModified: page.updated || page.published,
    author: { '@type': 'Organization', name: `${site.brand} editorial team`, url: site.baseUrl + '/about/' },
    publisher: { '@id': `${site.baseUrl}/#organization` },
    image: `${site.baseUrl}/assets/img/${page.illustration}.svg`,
    articleSection: page.hubTitle,
    wordCount: page.wordCount
  };
}

export function faqSchema(faq) {
  if (!faq || faq.length < 2) return null; // only when there is a genuine FAQ section
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: stripTags(f.aHtml) } }))
  };
}

export function collectionSchema(ctx, hub, pages) {
  const { site } = ctx;
  return {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: hub.title, description: hub.description, url: site.baseUrl + hub.url, inLanguage: 'en-GB',
    isPartOf: { '@id': `${site.baseUrl}/#website` },
    hasPart: pages.slice(0, 20).map(p => ({ '@type': 'Article', headline: p.title, url: site.baseUrl + p.url }))
  };
}

export const jsonLd = (obj) => obj ? `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>` : '';
