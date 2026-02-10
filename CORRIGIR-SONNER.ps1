# Script para corrigir o erro useTheme no sonner.jsx
# Execute este script na raiz do projeto

Write-Host "🔧 Corrigindo arquivo sonner.jsx..." -ForegroundColor Cyan
Write-Host ""

# Verificar se o arquivo existe
if (-not (Test-Path "src\components\ui\sonner.jsx")) {
    Write-Host "❌ Arquivo não encontrado: src\components\ui\sonner.jsx" -ForegroundColor Red
    exit 1
}

# Ler o conteúdo atual
$content = Get-Content "src\components\ui\sonner.jsx" -Raw

# Verificar se já está corrigido
if ($content -notmatch "useTheme") {
    Write-Host "✅ Arquivo já está corrigido!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "📝 Aplicando correção..." -ForegroundColor Yellow
    
    # Aplicar correções
    $content = $content -replace 'import \{ useTheme \} from "next-themes"\r?\n', ''
    $content = $content -replace 'const \{ theme = "system" \} = useTheme\(\)', "// Usar tema claro por padrão (não usar next-themes para evitar erro)`n  const theme = `"light`""
    
    # Salvar arquivo
    Set-Content -Path "src\components\ui\sonner.jsx" -Value $content -NoNewline
    
    Write-Host "✅ Correção aplicada!" -ForegroundColor Green
    Write-Host ""
}

# Adicionar ao git
Write-Host "📦 Adicionando ao git..." -ForegroundColor Yellow
git add src\components\ui\sonner.jsx

# Verificar se há mudanças
$status = git status --short src\components\ui\sonner.jsx
if ($status) {
    Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
    git commit -m "fix: Remove useTheme do next-themes em sonner.jsx para corrigir erro ThemeProvider"
    
    Write-Host "🚀 Enviando para o GitHub..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Sucesso! Correção enviada ao GitHub." -ForegroundColor Green
        Write-Host "O Vercel fará o rebuild automaticamente." -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao fazer push. Verifique as mensagens acima." -ForegroundColor Red
    }
} else {
    Write-Host "ℹ️  Nenhuma mudança detectada. Arquivo já está atualizado." -ForegroundColor Cyan
}

Write-Host ""
