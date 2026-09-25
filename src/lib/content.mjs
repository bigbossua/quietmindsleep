// Markdown → HTML pipeline with internal-link resolution and shortcodes.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { esc, slugify, words, readingTime, stripTags } from './html.mjs';
import { pageUrl } from './links.mjs';
import { productSection, comparisonTable, emailCapture, healthNotice, faqSection } from './components.mjs';

marked.setOptions({ gfm: true, breaks: false });

export class BuildError extends Error {}

// Resolve [text](@key) links to real URLs; record outgoing links.
export function resolveInternalLinks(md, file, ctx, outgoing) {
  return md.replace(/\]\(@([a-z0-9\-\/]+)\)/g, (m, key) => {
    key = key.replace(/\/+$/, '');
    if (!ctx.index[key]) throw new BuildError(`${file}: internal link target '@${key}' does not exist`);
    outgoing.add(key);
    return `](${pageUrl(key)})`;
  });
}

// Record plain absolute internal links too (e.g. /about/)
function recordPlainLinks(html, outgoing, ctx) {
  for (const m of html.matchAll(/href="\/([a-z0-9\-\/]+)\/"/g)) {
    const key = m[1];
    if (ctx.index[key]) outgoing.add(key);
  }
}

function parseArgs(str) {
  // "id1, id2 | heading=Foo | intro=Bar"
  const [listPart, ...optParts] = str.split('|');
  const ids = listPart.split(',').map(s => s.trim()).filter(Boolean);
  const opts = {};
  for (const p of optParts) { const i = p.indexOf('='); if (i > 0) opts[p.slice(0, i).trim()] = p.slice(i + 1).trim(); }
  return { ids, opts };
}

export function renderShortcodes(md, file, ctx, page) {
  const used = new Set();
  let faqPlaced = false;
  const out = md.replace(/^\{\{\s*(products|compare|email|health|faq)\s*(?::\s*([^}]*))?\}\}\s*$/gm, (m, name, args = '') => {
    if (name === 'products' || name === 'compare') {
      const { ids, opts } = parseArgs(args);
      const products = ids.map(id => {
        const p = ctx.productIndex[id];
        if (!p) throw new BuildError(`${file}: unknown product id '${id}'`);
        used.add(id);
        return p;
      });
      return '\n\n' + (name === 'products' ? productSection(products, ctx, opts.heading, opts.intro) : comparisonTable(products, ctx, opts.caption)) + '\n\n';
    }
    if (name === 'email') return '\n\n' + emailCapture(ctx, 'inline') + '\n\n';
    if (name === 'health') return '\n\n' + healthNotice() + '\n\n';
    if (name === 'faq') { faqPlaced = true; return '\n\n<!--FAQ-->\n\n'; }
    return m;
  });
  return { md: out, used, faqPlaced };
}

function addHeadingIds(html, headings) {
  const seen = new Set();
  return html.replace(/<h([23])>(.*?)<\/h\1>/g, (m, level, inner) => {
    let id = slugify(stripTags(inner)); let base = id; let i = 2;
    while (seen.has(id)) id = `${base}-${i++}`;
    seen.add(id);
    headings.push({ level: Number(level), id, text: stripTags(inner) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

function styleCallouts(html) {
  // blockquotes beginning with <strong>Key point / In short / Tip</strong> become callouts
  return html.replace(/<blockquote>\s*<p><strong>([^<]{2,40})<\/strong>/g, (m, label) =>
    `<blockquote class="callout"><p><strong>${label}</strong>`);
}

function externalLinks(html) {
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener" target="_blank"');
}

export function loadMarkdownFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

export function renderBody(content, file, ctx, page) {
  const outgoing = new Set();
  const { md, used, faqPlaced } = renderShortcodes(content, file, ctx, page);
  const resolved = resolveInternalLinks(md, file, ctx, outgoing);
  let html = marked.parse(resolved);
  const headings = [];
  html = addHeadingIds(html, headings);
  html = styleCallouts(html);
  html = externalLinks(html);
  recordPlainLinks(html, outgoing, ctx);
  // FAQ answers may contain markdown and @links
  const faq = (page.faq || []).map(f => {
    const a = resolveInternalLinks(String(f.a), file, ctx, outgoing);
    return { q: f.q, aHtml: externalLinks(marked.parse(a)) };
  });
  const faqHtml = faqSection(faq);
  if (faqPlaced) html = html.replace('<!--FAQ-->', faqHtml); else html += faqHtml;
  const wordCount = words(html);
  return { html, headings, outgoing, productsUsed: used, faq, wordCount, readingTime: readingTime(html) };
}
