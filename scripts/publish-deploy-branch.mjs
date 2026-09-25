// Publishes dist/ to the orphan `hostinger` branch (what Hostinger's Git deploy pulls into public_html).
// Usage: npm run build && node scripts/publish-deploy-branch.mjs   (CI does the same via peaceiris/actions-gh-pages)
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';
const dist = path.join(ROOT, 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) { console.error('dist/ missing — run npm run build first'); process.exit(1); }
const sha = execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim();
const work = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'qms-deploy-'));
const run = (cmd, cwd = work) => execSync(cmd, { cwd, stdio: 'inherit' });
run(`git init -q -b hostinger`);
run(`cp -a "${dist}/." "${work}/"`);
fs.writeFileSync(path.join(work, '.deploy-info'), `source=${sha}\nbuilt=${new Date().toISOString()}\n`);
run('git add -A');
run(`git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "Deploy ${sha}"`);
const remote = execSync('git remote get-url origin', { cwd: ROOT }).toString().trim();
run(`git push --force "${remote}" hostinger:hostinger`);
console.log(`Published dist/ (${fs.readdirSync(work).length} top-level entries) to branch hostinger from ${sha}.`);
