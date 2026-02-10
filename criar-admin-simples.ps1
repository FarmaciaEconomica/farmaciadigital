# Script simples para criar usuário administrador via endpoint HTTP
# Certifique-se de que o servidor backend está rodando (npm start na pasta backend)

Write-Host "🔐 Criador de Usuário Administrador" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Solicitar dados do usuário
$email = Read-Host "Email do administrador"
if ([string]::IsNullOrWhiteSpace($email) -or -not $email.Contains("@")) {
    Write-Host "❌ Email inválido!" -ForegroundColor Red
    exit 1
}

$password = Read-Host "Senha (mínimo 6 caracteres)" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

if ($passwordPlain.Length -lt 6) {
    Write-Host "❌ Senha deve ter no mínimo 6 caracteres!" -ForegroundColor Red
    exit 1
}

$fullName = Read-Host "Nome completo (opcional, Enter para pular)"
if ([string]::IsNullOrWhiteSpace($fullName)) {
    $fullName = "Administrador"
}

Write-Host ""
Write-Host "⏳ Criando usuário admin..." -ForegroundColor Yellow

# Fazer requisição HTTP
$body = @{
    email = $email
    password = $passwordPlain
    full_name = $fullName
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:10000/api/auth/create-admin" `
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
    Write-Host "Agora você pode fazer login no painel admin!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao criar usuário:" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        $errorObj = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "  $($errorObj.error)" -ForegroundColor Red
    } else {
        Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Certifique-se de que:" -ForegroundColor Yellow
    Write-Host "  1. O servidor backend está rodando (npm start na pasta backend)" -ForegroundColor Yellow
    Write-Host "  2. O DATABASE_URL está configurado no arquivo .env" -ForegroundColor Yellow
    Write-Host "  3. O email não está já cadastrado" -ForegroundColor Yellow
}
