Write-Host "Starting optimization process..."

# Check current directory
Write-Host "Current directory: $(Get-Location)"

# List current files
Write-Host "`nCurrent files:"
Get-ChildItem -File | Select-Object Name
