# Run after: npm run build
#   .\package-for-server.ps1
#
# Creates: coaction-data-hub-deploy.zip (contains a `dist` folder)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$dist = Join-Path $PSScriptRoot "dist"
if (-not (Test-Path $dist)) {
  Write-Error "dist folder not found. Run: npm run build"
}

$zipName = "coaction-data-hub-deploy.zip"
$zipPath = Join-Path $PSScriptRoot $zipName
if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

Write-Host "Creating $zipName ..." -ForegroundColor Cyan
Compress-Archive -Path $dist -DestinationPath $zipPath -CompressionLevel Optimal -Force

$item = Get-Item $zipPath
Write-Host "Done: $($item.FullName)  ($([math]::Round($item.Length / 1MB, 2)) MB)" -ForegroundColor Green
