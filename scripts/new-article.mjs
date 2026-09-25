// Scaffold a new article from a plan entry: node scripts/new-article.mjs <hub/slug>
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readJson } from './lib.mjs';
const key = process.argv[2];
const plan = readJson('content/plan.json').pages.find(p => p.slug === key);
if (!plan) { console.error(`No plan entry for ${key}. Add it to content/plan.json first (with SEMrush evidence).`); process.exit(1); }
const file = path.join(ROOT, 'content', 'articles', key + '.md');
if (fs.existsSync(file)) { console.error('File exists: ' + file); process.exit(1); }
const today = new Date().toISOString().slice(0, 10);
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, `---
title: "${plan.title}"
description: ""
standfirst: ""
published: ${today}
updated: ${today}
readNext:
  - ${plan.hub}
sources:
  - title: ""
    publisher: ""
    url: ""
status: draft
---
<!-- Angle: ${plan.angle} -->
<!-- Primary keyword: ${plan.primaryKeyword}; length ${plan.length} words; affiliate: ${(plan.affiliate || []).join(', ') || 'none'} -->

`);
console.log('Created ' + file + '\nSee docs/writing-guide.md for the standard.');
