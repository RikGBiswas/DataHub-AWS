# Deployment guide (Windows server + PM2)

This project is a **Vite + React single-page application (SPA)**. After `npm run build`, everything required for production is under **`dist/`** (static HTML, JavaScript, CSS, and assets). There is no Node backend in this repository unless you add one separately.

Production hosting described here uses **PM2** to serve `dist` with `pm2 serve`, with **SPA mode** so client-side routes work.

---

## Prerequisites

### Build machine (local or AVD)

- **Node.js** and **npm** (versions compatible with this repo’s `package.json`)
- PowerShell
- This repository cloned locally

### Server

- **Node.js** and **npm** (for `pm2` and `pm2 serve`)
- **PM2** installed globally, for example:

  ```powershell
  npm install -g pm2
  ```

- **Windows Firewall** (or cloud NSG) allowing inbound **TCP** on the port you use for the app (example: **5051**)
- **PowerShell** for extract and PM2 commands

---

## Artifact: deployment zip

The repo includes **`package-for-server.ps1`**, which zips the **`dist`** folder into **`coaction-data-hub-deploy.zip`**. The zip contains a top-level **`dist`** folder (not loose files at the root of the zip).

Run it **after** a successful build:

```powershell
cd "<path-to-repo>"
npm run build
.\package-for-server.ps1
```

Output: **`coaction-data-hub-deploy.zip`** in the repository root.

If PowerShell blocks scripts:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\package-for-server.ps1
```

---

## Server layout (example)

These paths match a typical setup; adjust if your environment differs.

| Item | Example path |
|------|----------------|
| Staging zip on server | `D:\Temp\coaction-data-hub-deploy.zip` |
| Application root | `D:\DataHub AWS` |
| Built site (must exist after extract) | `D:\DataHub AWS\dist\index.html` |
| Public URL (example host + port) | `http://toolbox-nonprod-app.prosight.net:5051` |

---

## First-time deployment on the server

### 1. Copy the zip

Copy **`coaction-data-hub-deploy.zip`** to the server (e.g. `D:\Temp\`).

### 2. Create app folder and extract

```powershell
$ZipPath = "D:\Temp\coaction-data-hub-deploy.zip"
$AppRoot = "D:\DataHub AWS"

New-Item -ItemType Directory -Force -Path $AppRoot | Out-Null
Expand-Archive -Path $ZipPath -DestinationPath $AppRoot -Force
```

### 3. Verify `dist`

```powershell
Test-Path "D:\DataHub AWS\dist\index.html"
```

This should return **`True`**.

### 4. Start with PM2 (SPA, example port 5051)

```powershell
cd "D:\DataHub AWS"
pm2 serve dist 5051 --name coaction-data-hub --spa
pm2 save
```

**`--spa`** is important so deep links and refreshes on client routes return **`index.html`** instead of **404**.

### 5. Firewall (if clients cannot reach the port)

```powershell
New-NetFirewallRule -DisplayName "DataHub static (5051)" -Direction Inbound -LocalPort 5051 -Protocol TCP -Action Allow
```

### 6. Smoke test

On the server:

```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:5051/" -UseBasicParsing | Select-Object StatusCode
```

From a browser (if DNS and firewall allow):  
`http://toolbox-nonprod-app.prosight.net:5051`

---

## Redeploy (update to latest build)

### On the build machine

```powershell
cd "<path-to-repo>"
npm ci
npm run build
.\package-for-server.ps1
```

Copy the new **`coaction-data-hub-deploy.zip`** to the server (e.g. overwrite `D:\Temp\coaction-data-hub-deploy.zip`).

### On the server (recommended: backup then extract)

```powershell
$AppRoot = "D:\DataHub AWS"
$DistPath = Join-Path $AppRoot "dist"
$BackupRoot = Join-Path $AppRoot "backups"
$Ts = Get-Date -Format "yyyyMMdd-HHmmss"

New-Item -ItemType Directory -Force -Path $BackupRoot | Out-Null
if (Test-Path $DistPath) {
    Compress-Archive -Path $DistPath -DestinationPath (Join-Path $BackupRoot "dist-$Ts.zip") -Force
}

Expand-Archive -Path "D:\Temp\coaction-data-hub-deploy.zip" -DestinationPath $AppRoot -Force
```

### Restart PM2

```powershell
cd "D:\DataHub AWS"
pm2 restart coaction-data-hub
pm2 save
```

If the process does not exist yet, use the **First-time** `pm2 serve` command instead of `restart`.

### Verify

```powershell
pm2 status
Invoke-WebRequest -Uri "http://127.0.0.1:5051/" -UseBasicParsing | Select-Object StatusCode
```

---

## Changing the port

1. Remove or stop the old process:

   ```powershell
   pm2 delete coaction-data-hub
   ```

2. Start again on the new port (example **5052**):

   ```powershell
   cd "D:\DataHub AWS"
   pm2 serve dist 5052 --name coaction-data-hub --spa
   pm2 save
   ```

3. Update **firewall** rules and any **bookmarks / reverse proxy** configuration to match the new port.

---

## Rollback

If you kept backups under **`D:\DataHub AWS\backups\`**:

1. Stop or delete the PM2 app (optional; usually not required for static files):

   ```powershell
   pm2 stop coaction-data-hub
   ```

2. Remove the current `dist` folder and expand the chosen backup zip into `D:\DataHub AWS` so `dist` is restored (adjust backup filename).

3. Start or restart PM2:

   ```powershell
   pm2 restart coaction-data-hub
   pm2 save
   ```

---

## Troubleshooting

| Symptom | Things to check |
|--------|------------------|
| **404** on `/` but **`/index.html`** works | Ensure you started with **`--spa`**; restart with `pm2 serve dist <port> --name coaction-data-hub --spa`. |
| Works on **localhost**, not from other machines | **Firewall** on Windows; **NSG** / security groups in cloud; correct **DNS** to server IP. |
| Old content in browser | Hard refresh; confirm new **`dist`** timestamps after extract; confirm **`pm2 restart`** ran. |
| Wrong process on the port | `pm2 list`, `Get-NetTCPConnection -LocalPort 5051`, and `Get-Process -Id <pid>` to confirm **node** is serving. |

---

## Notes on IIS Express vs full IIS

**IIS Express** is oriented toward local development. For a long-lived static SPA on Windows, teams typically use **full IIS** (with URL rewrite for SPA) **or** **PM2 + static serve**, as in this document—not IIS Express as the production host.

---

## Quick reference

| Step | Command / artifact |
|------|---------------------|
| Build | `npm run build` |
| Zip | `.\package-for-server.ps1` → `coaction-data-hub-deploy.zip` |
| Serve | `pm2 serve dist 5051 --name coaction-data-hub --spa` |
| Persist PM2 | `pm2 save` |
| Redeploy app | Extract zip over app root → `pm2 restart coaction-data-hub` |
