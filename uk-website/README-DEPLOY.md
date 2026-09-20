# Deploy www.nextclaud.co.uk

Static marketing site for the **UK market**. Deploy separately from `www.nextclaud.com` (Pakistan).

## UK contact details

| | |
|---|---|
| Email | info@nextclaud.co.uk |
| Phone | 07838 162607 |
| WhatsApp | +44 7838 162607 |
| App signup | https://app.nextclaud.com/register?market=uk |

## Azure Static Web Apps (recommended)

1. **Azure Portal** → Create **Static Web App**
   - Name: e.g. `swa-nextclaud-uk`
   - Region: **UK West** or **West Europe**
   - Source: GitHub → repo `whatsappCommunicator` → branch `master`
   - App location: **`/uk-website`**
   - Output location: *(leave empty — static HTML, no build)*

2. **Custom domain**
   - Static Web App → **Custom domains** → Add `www.nextclaud.co.uk` and `nextclaud.co.uk`
   - At your domain registrar, add DNS records Azure shows (CNAME or ALIAS)

3. **SSL** — Azure provisions a free managed certificate after DNS propagates (up to 48h)

## DNS example (typical)

| Type | Host | Value |
|------|------|-------|
| CNAME | www | `<your-swa>.azurestaticapps.net` |
| ALIAS/ANAME | @ | `<your-swa>.azurestaticapps.net` (if registrar supports) |

## GitHub Actions

Use `.github/workflows/uk_website-nextclaud.yml` (create Azure SWA first, then paste the deployment token into GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN_UK`).

## Refresh logos after brand updates

From the repo root:

```powershell
cd client
node scripts/prepare-uk-logos.mjs
```

This rebuilds `uk-website/assets/nextclaud-header-logo.png` and `nextclaud-logo.png` from `client/public/header-logo-source.png` and `login-logo-source.png`.

## Local preview

Open `index.html` in a browser, or:

```powershell
cd uk-website
npx --yes serve .
```

## Pakistan site

Keep deploying the Pakistan version from the same template with PK contact details to **www.nextclaud.com** (separate Static Web App or branch).
