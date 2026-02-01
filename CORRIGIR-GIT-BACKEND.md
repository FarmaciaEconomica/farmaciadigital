# 🔧 Corrigir Git na Pasta Backend

## ⚠️ Problema

Você executou `git init` dentro da pasta `backend`, criando um repositório Git aninhado. Isso pode causar problemas.

## ✅ Solução

### Opção 1: Remover Git do Backend (Recomendado)

Execute na pasta raiz do projeto:

```powershell
# Remover repositório Git do backend
Remove-Item -Recurse -Force "backend\.git"

# Verificar se foi removido
Test-Path "backend\.git"  # Deve retornar False
```

### Opção 2: Via Comandos Git

```bash
# Na pasta raiz do projeto
cd backend
rm -rf .git
cd ..
```

---

## ✅ Verificar Estrutura Correta

### Estrutura Esperada:

```
farmacia-digital/          ← Repositório Git PRINCIPAL (aqui)
├── .git/                  ← Git aqui
├── backend/               ← Pasta normal (SEM .git)
│   ├── server.js
│   ├── package.json
│   └── ...
├── src/
├── package.json
└── ...
```

### ❌ Estrutura ERRADA (atual):

```
farmacia-digital/
├── backend/
│   ├── .git/              ← Git aqui (ERRADO!)
│   └── ...
```

---

## 🔄 Após Corrigir

1. **Remover .git do backend**
2. **Verificar se o Git principal está na raiz**
3. **Adicionar backend ao Git principal:**

```bash
# Na pasta raiz
git add backend/
git commit -m "Add backend folder"
git push
```

---

## ⚠️ Se Já Fez Push do Backend Separado

Se você já fez push do backend como repositório separado:

1. **Delete o repositório no GitHub** (se criou um separado)
2. **Remova o .git do backend local**
3. **Adicione ao repositório principal**

---

## 📋 Comandos Completos

```powershell
# 1. Remover Git do backend
Remove-Item -Recurse -Force "backend\.git" -ErrorAction SilentlyContinue

# 2. Verificar se foi removido
if (Test-Path "backend\.git") {
    Write-Host "❌ Ainda existe .git no backend" -ForegroundColor Red
} else {
    Write-Host "✅ .git removido do backend" -ForegroundColor Green
}

# 3. Verificar se Git principal existe
if (Test-Path ".git") {
    Write-Host "✅ Git principal encontrado na raiz" -ForegroundColor Green
} else {
    Write-Host "⚠️  Git principal não encontrado" -ForegroundColor Yellow
    Write-Host "   Execute: git init" -ForegroundColor Cyan
}

# 4. Adicionar backend ao Git principal
git add backend/
git status
```
