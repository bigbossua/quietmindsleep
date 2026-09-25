import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);
export const DIST = path.join(ROOT, 'dist');
export const CONTENT = path.join(ROOT, 'content');
export const DATA = path.join(ROOT, 'data');
export const ASSETS = path.join(ROOT, 'src', 'assets');

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

export function loadConfig() {
  const site = readJson(path.join(ROOT, 'site.config.json'));
  const hubs = readJson(path.join(DATA, 'hubs.json'));
  const plan = readJson(path.join(CONTENT, 'plan.json')).pages;
  const productsFile = readJson(path.join(DATA, 'products.json'));
  const affiliates = readJson(path.join(DATA, 'affiliates.json'));
  return { site, hubs, plan, products: productsFile.products, categories: productsFile.categories, affiliates };
}

export function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
export function writeFile(p, content) { ensureDir(path.dirname(p)); fs.writeFileSync(p, content); }
export function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}
export function walk(dir, ext = '.md') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p, ext));
    else if (p.endsWith(ext)) out.push(p);
  }
  return out.sort();
}
