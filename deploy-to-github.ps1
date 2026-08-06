# Deploy NextClaud company site to GitHub (nextclaud/nextclaudWebCode)
# Requires: Git for Windows (https://git-scm.com/download/win)

$ErrorActionPreference = "Stop"
$SiteDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$TempClone = Join-Path $env:TEMP "nextclaudWebCode-deploy"
$RepoUrl = "https://github.com/nextclaud/nextclaudWebCode.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Install from https://git-scm.com/download/win then run this script again." -ForegroundColor Red
    exit 1
}

if (Test-Path $TempClone) { Remove-Item $TempClone -Recurse -Force }

Write-Host "Cloning repository..."
git clone $RepoUrl $TempClone
Set-Location $TempClone

# Remove old PHP site files
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

# Copy new static HTML site
Copy-Item "$SiteDir\*" . -Recurse -Force

git add -A
git status

$msg = @"
Replace PHP site with static HTML for Azure Static Web Apps.

- Convert index, clients, faqs, pricing, and terms pages to HTML
- Fix Azure SWA workflow (skip_app_build, output_location)
- Add staticwebapp.config.json for clean URLs
"@

git commit -m $msg
git push origin main

Write-Host ""
Write-Host "Deployed! Check GitHub Actions: https://github.com/nextclaud/nextclaudWebCode/actions" -ForegroundColor Green
Write-Host "Live site: https://orange-river-0b1c33d10.7.azurestaticapps.net" -ForegroundColor Green
