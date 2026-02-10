# Script para criar usuário admin na API de produção
# Execute este script para criar o admin diretamente na API

$apiUrl = "https://farmaciaeconomica.onrender.com"
$endpoint = "$apiUrl/api/auth/create-admin"

$body = @{
    email = "farmaciaeconomica2407@gmail.com"
    password = "@Erlane.emt2407"
    full_name = "Wesley Santos"
} | ConvertTo-Json

Write-Host "🔐 Criando usuário administrador na API de produção..." -ForegroundColor Cyan
Write-Host "API: $apiUrl" -ForegroundColor Yellow
Write-Host ""

try {
    Write-Host "⏳ Enviando requisição..." -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri $endpoint `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -ErrorAction Stop

    Write-Host ""
    Write-Host "✅ Usuário admin criado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Detalhes:" -ForegroundColor Cyan
    Write-Host "  Email: $($response.user.email)" -ForegroundColor White
    Write-Host "  Nome: $($response.user.full_name)" -ForegroundColor White
    Write-Host "  Role: $($response.user.role)" -ForegroundColor White
    Write-Host ""
    Write-Host "🎉 Agora você pode fazer login no painel admin!" -ForegroundColor Green
    Write-Host "   URL: https://farmaciadigital.vercel.app/AdminLogin" -ForegroundColor Cyan
    
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao criar usuário:" -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        try {
            $errorObj = $_.ErrorDetails.Message | ConvertFrom-Json
            Write-Host "  $($errorObj.error)" -ForegroundColor Red
        } catch {
            Write-Host "  $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Possíveis causas:" -ForegroundColor Yellow
    Write-Host "  1. O servidor backend não está rodando" -ForegroundColor Yellow
    Write-Host "  2. O DATABASE_URL não está configurado" -ForegroundColor Yellow
    Write-Host "  3. O email já está cadastrado" -ForegroundColor Yellow
    Write-Host "  4. Problema de conexão com o banco de dados" -ForegroundColor Yellow
}
