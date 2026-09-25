// Rasterise Open Graph images (1200x630 PNG) from the SVG illustrations, plus the apple-touch-icon.
import fs from 'node:fs';
import path from 'node:path';
import { palette } from './illustrations.mjs';

export async function generateOgImages(imgDir, brand) {
  let sharp;
  try { sharp = (await import('sharp')).default; } catch { console.log('sharp not available: skipping OG PNGs'); return; }
  const names = fs.readdirSync(imgDir).filter(f => f.endsWith('.svg') && !['favicon.svg', 'logo.svg'].includes(f)).map(f => f.replace('.svg', ''));
  for (const name of names) {
    const svg = fs.readFileSync(path.join(imgDir, `${name}.svg`), 'utf8');
    const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect x="0" y="470" width="1200" height="160" fill="${palette.navy}" opacity=".85"/><text x="60" y="560" font-family="Georgia, serif" font-size="46" fill="${palette.sand}">Quiet Mind <tspan font-style="italic" fill="${palette.gold}">Sleep</tspan></text><text x="60" y="600" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="${palette.mist}">quietmindsleep.co.uk</text></svg>`);
    await sharp(Buffer.from(svg)).resize(1200, 630, { fit: 'cover' }).composite([{ input: overlay }]).png({ compressionLevel: 9, palette: true }).toFile(path.join(imgDir, `og-${name}.png`));
  }
  await sharp(Buffer.from(fs.readFileSync(path.join(imgDir, 'favicon.svg')))).resize(180, 180).png().toFile(path.join(imgDir, 'apple-touch-icon.png'));
  fs.copyFileSync(path.join(imgDir, 'og-hero.png'), path.join(imgDir, 'og-default.png'));
}
