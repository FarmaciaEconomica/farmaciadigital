# Script para atualizar Git
Write-Host "🔄 Atualizando repositório Git..." -ForegroundColor Green
Write-Host ""

# Verificar se está em um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Não é um repositório Git" -ForegroundColor Red
    Write-Host "   Execute este script na pasta raiz do projeto (onde está o .git)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Se o Git não estiver inicializado, execute:" -ForegroundColor Cyan
    Write-Host "   git init" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/westtlley/farmacia-digital.git" -ForegroundColor White
    pause
    exit 1
}

Write-Host "✓ Repositório Git encontrado" -ForegroundColor Green
Write-Host ""

# Verificar status
Write-Host "📋 Status do Git:" -ForegroundColor Cyan
git status --short

Write-Host ""

# Adicionar todos os arquivos
Write-Host "📝 Adicionando arquivos..." -ForegroundColor Cyan
git add .

# Verificar se há mudanças
$status = git status --porcelain
if ($status) {
    Write-Host ""
    Write-Host "💾 Fazendo commit..." -ForegroundColor Cyan
    
    $commitMessage = Read-Host "Digite a mensagem do commit (ou Enter para usar padrão)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Update: Configuração backend/frontend e Cloudinary"
    }
    
    git commit -m $commitMessage
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Commit realizado!" -ForegroundColor Green
        Write-Host ""
        
        # Verificar remote
        $remote = git remote -v
        if ($remote) {
            Write-Host "🚀 Fazendo push..." -ForegroundColor Cyan
            git push
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "✅ Atualização concluída!" -ForegroundColor Green
                Write-Host "   Código enviado para: https://github.com/westtlley/farmacia-digital" -ForegroundColor Cyan
            } else {
                Write-Host ""
                Write-Host "❌ Erro ao fazer push" -ForegroundColor Red
                Write-Host "   Verifique suas credenciais do GitHub" -ForegroundColor Yellow
            }
        } else {
            Write-Host ""
            Write-Host "⚠️  Remote não configurado" -ForegroundColor Yellow
            Write-Host "   Configure com:" -ForegroundColor Cyan
            Write-Host "   git remote add origin https://github.com/westtlley/farmacia-digital.git" -ForegroundColor White
        }
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao fazer commit" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "⚠️  Nenhuma mudança para commitar" -ForegroundColor Yellow
}

Write-Host ""
pause
