# 🔧 Corrigir Estrutura do Git

## ✅ Situação Atual

- ✅ Não há `.git` no `backend` (correto!)
- ⚠️ Não há `.git` na raiz atual

## 🔍 Onde Está o Repositório Git?

O repositório Git pode estar em:
- Pasta pai: `C:\Users\POSITIVO\Downloads\`
- Ou precisa ser inicializado

## ✅ Solução

### Opção 1: Se o Git está na pasta pai

```powershell
# Voltar para pasta pai
cd ..

# Verificar se tem .git
Test-Path ".git"

# Se tiver, adicionar backend
git add "Farmácia Digital/backend/"
git commit -m "Add backend folder"
git push
```

### Opção 2: Inicializar Git na raiz atual

```powershell
# Na pasta atual (Farmácia Digital)
git init
git remote add origin https://github.com/westtlley/farmacia-digital.git
git branch -M main
git add .
git commit -m "Initial commit: Estrutura completa com backend"
git push -u origin main
```

---

## 📋 Estrutura Correta

```
Farmácia Digital/          ← Git aqui (raiz)
├── .git/                  ← Repositório Git
├── backend/               ← Pasta normal (SEM .git)
│   ├── server.js
│   └── package.json
├── src/
├── package.json
└── ...
```

---

## 🔍 Verificar Onde Está o Git

Execute:

```powershell
# Procurar .git em todas as pastas
Get-ChildItem -Path "C:\Users\POSITIVO\Downloads" -Recurse -Directory -Filter ".git" -ErrorAction SilentlyContinue | Select-Object FullName
```

---

## ✅ Após Encontrar/Configurar

1. **Adicionar backend ao Git:**
```bash
git add backend/
```

2. **Commit:**
```bash
git commit -m "Add backend folder for Render deployment"
```

3. **Push:**
```bash
git push
```

---

## 🆘 Se Não Encontrar o Git

Inicialize na pasta atual:

```powershell
git init
git remote add origin https://github.com/westtlley/farmacia-digital.git
git branch -M main
git add .
git commit -m "Initial commit: Projeto completo"
git push -u origin main
```
