Write-Host "🧹 Cleaning previous build artifacts..."
Remove-Item -Path dist, build, node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item pnpm-lock.yaml -Force -ErrorAction SilentlyContinue

Write-Host "📦 Installing dependencies..."
pnpm install

Write-Host "🏗️ Building optimized production bundle..."
$env:NODE_ENV = "production"
pnpm build

Write-Host "`n📊 Checking build sizes..."
$distSize = (Get-ChildItem -Path dist -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "Total dist folder size: $($distSize.ToString('N2')) MB"
