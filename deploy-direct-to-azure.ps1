# Deploy directly to Azure Static Web Apps (bypasses GitHub Actions)
# Get your deployment token from:
# Azure Portal -> nextclaud-company-site -> Settings -> Deployment tokens -> Manage deployment token

param(
    [Parameter(Mandatory = $true)]
    [string]$DeploymentToken
)

$ErrorActionPreference = "Stop"
$SiteDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Deploying from: $SiteDir"
npx --yes @azure/static-web-apps-cli@latest deploy $SiteDir `
    --deployment-token $DeploymentToken `
    --env production

Write-Host ""
Write-Host "Done! Check https://www.nextclaud.com in 1-2 minutes." -ForegroundColor Green
