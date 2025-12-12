# Script de despliegue para GitHub Pages
# Ejecutar en PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ARQUITECTURA DEL DINERO" -ForegroundColor Cyan
Write-Host "  Script de despliegue a GitHub Pages" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✓ Git detectado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git no está instalado. Por favor instalá Git primero." -ForegroundColor Red
    Write-Host "  Descargalo desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}

Write-Host ""

# Verificar si ya es un repositorio Git
if (Test-Path ".git") {
    Write-Host "✓ Repositorio Git ya inicializado" -ForegroundColor Green
    
    # Mostrar estado
    Write-Host "`nEstado actual:" -ForegroundColor Cyan
    git status --short
    
    Write-Host "`n¿Querés hacer commit y push de los cambios? (S/N)" -ForegroundColor Yellow
    $respuesta = Read-Host
    
    if ($respuesta -eq "S" -or $respuesta -eq "s") {
        $mensaje = Read-Host "Mensaje del commit"
        if ([string]::IsNullOrWhiteSpace($mensaje)) {
            $mensaje = "Actualización $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        }
        
        git add .
        git commit -m "$mensaje"
        git push
        
        Write-Host "`n✓ Cambios subidos correctamente" -ForegroundColor Green
    }
} else {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Arquitectura del Dinero"
    
    Write-Host "`n✓ Repositorio inicializado" -ForegroundColor Green
    Write-Host "`nPróximos pasos:" -ForegroundColor Cyan
    Write-Host "1. Creá un repositorio en GitHub llamado 'arquitectura-del-dinero'" -ForegroundColor White
    Write-Host "2. Ejecutá estos comandos:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/TU_USUARIO/arquitectura-del-dinero.git" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host "`n3. Activá GitHub Pages en Settings → Pages" -ForegroundColor White
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Para más información, consultá README.md" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
