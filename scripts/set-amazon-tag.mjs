// Set the Amazon Associates UK tracking ID used by every affiliate link. Usage: node scripts/set-amazon-tag.mjs yourtag-21
// Validates the UK format (ends in -21), writes site.config.json, and reminds you to rebuild. Never paste account passwords or session data anywhere.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';
const tag = (process.argv[2] || '').trim();
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*-21$/i.test(tag)) { console.error(`'${tag}' does not look like an Amazon.co.uk Associates tracking ID (expected something like quietmindsleep-21).`); process.exit(1); }
const p = path.join(ROOT, 'site.config.json');
const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
const prev = cfg.affiliate.amazon.tag;
cfg.affiliate.amazon.tag = tag;
fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + '\n');
console.log(`Amazon tracking ID set: ${prev} → ${tag}. Run: npm run build && npm run audit`);
