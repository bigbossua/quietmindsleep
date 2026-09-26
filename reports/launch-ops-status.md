LAUNCH OPS STATUS - quietmindsleep.co.uk
Recorded 2026-09-26 09:30 UTC from the owner's PC.

1. HOSTINGER SSH DETAILS (read from hPanel > Websites > quietmindsleep.co.uk > Advanced > SSH Access)
   SSH status: ACTIVE
   IP (SSH_HOST), Port (SSH_PORT = 65002) and Username (SSH_USER, the "u..." name) confirmed on that page.
   The IP and username are deliberately not written into this public repository; copy them from hPanel.
   Deploy key "quietmindsleep-deploy" is listed under SSH keys (added 2026-09-25).

2. GITHUB ACTIONS SECRETS - NOT SET (blocked)
   SSH_HOST, SSH_USER, SSH_PORT and SSH_PRIVATE_KEY could not be set or listed from this PC:
   - the gh CLI is not installed here, and
   - the Claude in Chrome extension refuses to open github.com ("Navigation to this domain is not allowed").
   Evidence the secrets are still missing: Build and deploy run 36230808962 (2026-09-26 08:46 UTC, main @ c7a045c)
   finished "success" with deploy-ssh = skipped and verify = skipped.
   Owner action: GitHub > bigbossua/quietmindsleep > Settings > Secrets and variables > Actions > New repository secret,
   using the three values in section 1 plus SSH_PRIVATE_KEY (the private key file for quietmindsleep-deploy; never paste it anywhere else).
   Or install gh on this PC, run "gh auth login", then:
     gh secret set SSH_HOST -R bigbossua/quietmindsleep --body "<SSH IP from hPanel>"
     gh secret set SSH_USER -R bigbossua/quietmindsleep --body "<SSH username from hPanel>"
     gh secret set SSH_PORT -R bigbossua/quietmindsleep --body "65002"

3. DEPLOY VIA GITHUB ACTIONS - NOT TRIGGERED (waiting on section 2)
   The live site is still the manual SSH deploy of 2026-09-25 (commit fd5fc54).
   After the secrets exist: gh workflow run build-deploy.yml --ref main, and check deploy-ssh and verify both succeed.

4. LIVE VERIFICATION
   No new verify-live run could be triggered (same GitHub access block).
   Latest run on record: verify-live 36230810632, 2026-09-26 08:48 UTC, live-reports/verify.log:
   22 pass / 1 fail. 114/114 sitemap URLs return 200; 0 canonical mismatches; 110 internal links, 0 broken;
   6 Amazon links, all tag=kleantouch-21 and direct /dp/ links; disclosure precedes first affiliate link.
   The only failure: www -> non-www redirect (TLS error, see section 5).
   Spot check from this PC at 09:29 UTC: https://quietmindsleep.co.uk/ 200; http://quietmindsleep.co.uk/ 301 -> https;
   /sitemap.xml 200; http://www.quietmindsleep.co.uk/ 301 -> https://www.quietmindsleep.co.uk/ (which then fails TLS).

5. WWW CERTIFICATE (checked from this PC, 09:29 UTC)
   curl.exe -sI https://www.quietmindsleep.co.uk/ -> fails: schannel SEC_E_WRONG_PRINCIPAL (target principal name is incorrect).
   openssl s_client -servername www.quietmindsleep.co.uk shows:
     subject CN=quietmindsleep.co.uk, issuer Let's Encrypt YE2, valid 2026-09-25 to 2026-12-24,
     SAN = DNS:quietmindsleep.co.uk only (no www).
   Still an owner action: hPanel > Security > SSL, reissue so it covers www, turn on Force HTTPS.
   Certificate SANs / redirect result after reissue: pending (being gathered by another session).

6. GOOGLE SEARCH CONSOLE (completed 2026-09-25 evening)
   Domain property quietmindsleep.co.uk verified by DNS TXT on the first try.
   Sitemap https://quietmindsleep.co.uk/sitemap.xml submitted: status Success, 114 discovered URLs.
   Indexing requested for:
     https://quietmindsleep.co.uk/
     https://quietmindsleep.co.uk/quiet-the-mind/
     https://quietmindsleep.co.uk/waking-at-night/
     https://quietmindsleep.co.uk/sleep-sounds/
     https://quietmindsleep.co.uk/sleep-environment/
     https://quietmindsleep.co.uk/relaxation/
     https://quietmindsleep.co.uk/sleep-habits/
     https://quietmindsleep.co.uk/sleep-products/
     https://quietmindsleep.co.uk/sleep-questions/
   https://quietmindsleep.co.uk/falling-asleep/ was already "URL is on Google" (no request needed).

7. AMAZON ASSOCIATES
   Branch amazon-links (commit fd5fc54 "Amazon Associates: verified tracking ID and ASINs") is already on GitHub
   and is contained in main; tag kleantouch-21 and 19 verified ASINs are live. No change made today.
   Associates account numbers (clicks / orders / earnings): pending (being gathered by another session).

8. NOT DONE / BLOCKED
   - GitHub secrets, CI deploy and a fresh verify-live run: need GitHub access from this PC (gh CLI + login) or the owner in the GitHub web UI.
   - www SSL reissue: owner in hPanel.
   - Mailbox hello@quietmindsleep.co.uk: unchanged, owner action.
