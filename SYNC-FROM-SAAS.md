# Sync www.nextclaud.com from SaaS repo

**Production deploy:** this repo (`nextclaudWebCode`) → Azure SWA `orange-river-0b1c33d10` → `www.nextclaud.com`.

Source of truth for PK marketing HTML: `nextclaud-saas` → folder **`pk-website`**.

After editing pricing or pages in the SaaS repo:

```powershell
robocopy D:\whatsappCommunicator\pk-website D:\nextclaudWebCode /E /XD uk-website /XF README-DEPLOY.md
cd D:\nextclaudWebCode
git add -A
git commit -m "Sync PK marketing site from nextclaud-saas pk-website"
git push origin main
```

Or from SaaS `client` folder (logos + PK template):

```powershell
cd D:\whatsappCommunicator\client
node scripts/prepare-uk-logos.mjs
robocopy ..\pk-website D:\nextclaudWebCode /E /XD uk-website /XF README-DEPLOY.md
```

Pricing amounts: `site-config.js` → `NC_PLAN_PRICING` ($45 / $59 / $99, 2% quarterly, 5% yearly).
