// Screenshots + header/DNS/TLS facts for a live host. Runs in CI (needs playwright + chromium). Usage: node scripts/live-snapshot.mjs <baseUrl> <outDir>
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
const [,, baseArg, outArg] = process.argv;
const base = (baseArg || 'https://quietmindsleep.co.uk').replace(/\/$/, '');
const out = outArg || 'reports-live'; fs.mkdirSync(out, { recursive: true });
const host = new URL(base).host;
const sh = (c) => { try { return execSync(c, { stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 }).toString(); } catch (e) { return `ERR: ${(e.stderr || e.stdout || e.message).toString().slice(0, 500)}`; } };
const facts = {
  dns_a: sh(`dig +short A ${host}`).trim(), dns_www: sh(`dig +short ${'www.' + host}`).trim(),
  tls: sh(`echo | openssl s_client -servername ${host} -connect ${host}:443 2>/dev/null | openssl x509 -noout -subject -issuer -dates`).trim(),
  head_https: sh(`curl -sSI -m 20 ${base}/`).trim(), head_http: sh(`curl -sSI -m 20 http://${host}/`).trim(), head_www: sh(`curl -sSI -m 20 https://www.${host}/`).trim()
};
fs.writeFileSync(path.join(out, 'facts.json'), JSON.stringify(facts, null, 2));
let playwright; try { playwright = await import('playwright'); } catch { console.log('playwright not installed; facts only'); process.exit(0); }
const browser = await playwright.chromium.launch();
const shots = [['home', '/', 1280], ['home-mobile', '/', 390], ['article', '/quiet-the-mind/racing-thoughts-at-night/', 1280], ['article-mobile', '/waking-at-night/waking-up-at-3am/', 390], ['product', '/sleep-products/best-sleep-masks-uk/', 1280], ['hub', '/sleep-sounds/', 1280], ['search', '/search/?q=brown%20noise', 1280], ['notfound', '/no-such-page-' + Date.now() + '/', 1280]];
const console_errors = {};
for (const [name, p, w] of shots) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  const errs = []; page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); page.on('requestfailed', r => errs.push('REQUEST FAILED ' + r.url()));
  const resp = await page.goto(base + p, { waitUntil: 'networkidle', timeout: 45000 }).catch(e => ({ status: () => 'ERR ' + e.message }));
  await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: name.startsWith('home') });
  console_errors[name] = { status: resp && resp.status(), errors: errs.slice(0, 20) };
  await page.close();
}
await browser.close();
fs.writeFileSync(path.join(out, 'pages.json'), JSON.stringify(console_errors, null, 2));
console.log(JSON.stringify(console_errors, null, 2));
