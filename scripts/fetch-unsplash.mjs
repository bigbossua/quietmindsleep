// Optional: replace the SVG illustration set with curated Unsplash photography.
// Requires internet access and an Unsplash API access key (UNSPLASH_ACCESS_KEY) — free at https://unsplash.com/developers.
// Usage: UNSPLASH_ACCESS_KEY=... node scripts/fetch-unsplash.mjs
// Per Unsplash API guidelines this script triggers the download endpoint for each photo and records attribution in src/assets/img/credits.json.
// Photos are saved as JPEG at 1200px wide into src/assets/img/photos/<name>.jpg; set "photos": true in site.config.json → "images" to use them (see docs/architecture.md).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';
const key = process.env.UNSPLASH_ACCESS_KEY;
if (!key) { console.error('Set UNSPLASH_ACCESS_KEY'); process.exit(1); }
const wanted = { hero: 'calm bedroom window night', mind: 'calm night sky stars', moon: 'crescent moon night sky', clock: 'bedside clock night', waves: 'ocean waves at dusk calm', bedroom: 'minimal bedroom bed linen soft light', breath: 'calm morning mist field', sun: 'sunrise soft light bedroom', mask: 'sleep mask pillow', question: 'night window rain' };
const sharp = (await import('sharp')).default;
const out = path.join(ROOT, 'src', 'assets', 'img', 'photos'); fs.mkdirSync(out, { recursive: true });
const credits = {};
for (const [name, q] of Object.entries(wanted)) {
  const r = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&orientation=landscape&content_filter=high&per_page=1`, { headers: { Authorization: `Client-ID ${key}` } });
  const j = await r.json(); const p = j.results?.[0]; if (!p) { console.log('no result for', name); continue; }
  await fetch(p.links.download_location, { headers: { Authorization: `Client-ID ${key}` } });
  const img = Buffer.from(await (await fetch(p.urls.raw + '&w=1600&q=80&fm=jpg')).arrayBuffer());
  await sharp(img).resize(1200, 675, { fit: 'cover' }).jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(out, `${name}.jpg`));
  credits[name] = { photographer: p.user.name, profile: p.user.links.html + '?utm_source=quietmindsleep&utm_medium=referral', photo: p.links.html, description: p.alt_description };
  console.log(name, '←', p.user.name);
}
fs.writeFileSync(path.join(ROOT, 'src', 'assets', 'img', 'credits.json'), JSON.stringify(credits, null, 2));
console.log('Done. Review the photos, then enable them in site.config.json.');
