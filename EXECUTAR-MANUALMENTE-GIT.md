# 📋 Comandos para Executar Manualmente

## ⚠️ Importante

Execute estes comandos **na pasta raiz do projeto** (`Farmácia Digital`).

## ✅ Comandos Completos

Abra o PowerShell na pasta `C:\Users\POSITIVO\Downloads\Farmácia Digital` e execute:

```powershell
# 1. Verificar se está na pasta correta
Get-Location
# Deve mostrar: C:\Users\POSITIVO\Downloads\Farmácia Digital

# 2. Verificar se backend não tem .git
Test-Path "backend\.git"
# Deve retornar: False

# 3. Inicializar Git
git init

# 4. Adicionar remote
git remote add origin https://github.com/westtlley/farmacia-digital.git

# 5. Renomear branch
git branch -M main

# 6. Adicionar todos os arquivos
git add .

# 7. Verificar o que será commitado
git status

# 8. Fazer commit
git commit -m "Update: Backend, Cloudinary e configurações de deploy"

# 9. Fazer push
git push -u origin main
```

---

## 🔍 Se Der Erro de Remote Já Existe

```powershell
# Remover remote antigo
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/westtlley/farmacia-digital.git
```

---

## 🔍 Se Der Erro de Histórico Não Relacionado

```powershell
# Fazer pull primeiro
git pull origin main --allow-unrelated-histories

# Depois push
git push -u origin main
```

---

## ✅ Verificar Após Push

Acesse: https://github.com/westtlley/farmacia-digital

Deve mostrar:
- ✅ Pasta `backend/` com arquivos
- ✅ Pasta `src/`
- ✅ Arquivos de configuração

---

## 📝 Resumo

1. ✅ Backend não tem `.git` próprio (correto)
2. ⏳ Inicializar Git na raiz
3. ⏳ Adicionar todos os arquivos
4. ⏳ Commit e push

Execute os comandos acima manualmente no PowerShell!
