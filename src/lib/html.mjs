export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
export const attr = esc;
export const slugify = (s) => String(s).toLowerCase()
  .replace(/&/g, ' and ').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
export const stripTags = (h = '') => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const words = (text) => stripTags(text).split(/\s+/).filter(Boolean).length;
export const readingTime = (text) => Math.max(1, Math.round(words(text) / 220));
export const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
