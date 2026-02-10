# Script para criar usuário administrador
# Execute este script na raiz do projeto

$backendPath = Join-Path $PSScriptRoot "backend"

if (-not (Test-Path $backendPath)) {
    Write-Host "❌ Erro: Pasta backend não encontrada!" -ForegroundColor Red
    Write-Host "Certifique-se de executar este script na raiz do projeto." -ForegroundColor Yellow
    exit 1
}

Write-Host "📁 Navegando para a pasta backend..." -ForegroundColor Cyan
Set-Location $backendPath

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Verificar se o arquivo .env existe
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Aviso: Arquivo .env não encontrado!" -ForegroundColor Yellow
    Write-Host "Certifique-se de configurar DATABASE_URL no arquivo .env" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "🔐 Executando script de criação de admin..." -ForegroundColor Cyan
Write-Host ""

# Executar o script
node create-admin.js

# Voltar para o diretório original
Set-Location $PSScriptRoot
