# Script para adicionar backend ao Git
Write-Host "📦 Adicionando backend ao Git..." -ForegroundColor Green
Write-Host ""

# Verificar se está em um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Erro: Não é um repositório Git" -ForegroundColor Red
    Write-Host "   Execute este script na pasta raiz do projeto" -ForegroundColor Yellow
    Write-Host "   Onde está o arquivo .git" -ForegroundColor Yellow
    pause
    exit 1
}

# Verificar se backend existe
if (-not (Test-Path "backend")) {
    Write-Host "❌ Erro: Pasta backend não encontrada" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "✓ Repositório Git encontrado" -ForegroundColor Green
Write-Host "✓ Pasta backend encontrada" -ForegroundColor Green
Write-Host ""

# Adicionar backend
Write-Host "📝 Adicionando backend ao Git..." -ForegroundColor Cyan
git add backend/

# Verificar status
Write-Host ""
Write-Host "📋 Status do Git:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "💾 Para fazer commit, execute:" -ForegroundColor Yellow
Write-Host "   git commit -m 'Add backend folder for Render deployment'" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Para fazer push, execute:" -ForegroundColor Yellow
Write-Host "   git push" -ForegroundColor White
Write-Host ""

$commit = Read-Host "Deseja fazer commit agora? (S/N)"
if ($commit -eq "S" -or $commit -eq "s") {
    git commit -m "Add backend folder for Render deployment"
    Write-Host "✓ Commit realizado!" -ForegroundColor Green
    Write-Host ""
    
    $push = Read-Host "Deseja fazer push agora? (S/N)"
    if ($push -eq "S" -or $push -eq "s") {
        git push
        Write-Host ""
        Write-Host "✅ Backend adicionado ao GitHub!" -ForegroundColor Green
        Write-Host "   O Render deve detectar automaticamente" -ForegroundColor Cyan
    }
}

Write-Host ""
pause
