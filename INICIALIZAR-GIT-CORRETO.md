# 🔧 Inicializar Git Corretamente

## ✅ Situação

- ✅ Backend não tem `.git` (correto!)
- ⚠️ Git principal não encontrado na raiz

## 🚀 Solução: Inicializar Git na Raiz

Execute na pasta raiz do projeto (`Farmácia Digital`):

```powershell
# 1. Inicializar Git
git init

# 2. Adicionar remote
git remote add origin https://github.com/westtlley/farmacia-digital.git

# 3. Renomear branch
git branch -M main

# 4. Adicionar todos os arquivos
git add .

# 5. Fazer commit
git commit -m "Initial commit: Projeto completo com backend e Cloudinary"

# 6. Fazer push
git push -u origin main
```

---

## ⚠️ Se o Repositório Já Existe no GitHub

Se você já tem commits no GitHub, pode precisar fazer pull primeiro:

```powershell
# Se der erro de histórico não relacionado
git pull origin main --allow-unrelated-histories

# Depois push
git push -u origin main
```

---

## ✅ Estrutura Final

```
Farmácia Digital/          ← Git AQUI
├── .git/                  ← Repositório Git
├── backend/               ← Pasta normal (sem .git)
│   ├── server.js
│   ├── package.json
│   └── ...
├── src/
├── package.json
└── ...
```

---

## 📋 Checklist

- [ ] Git inicializado na raiz
- [ ] Remote configurado
- [ ] Backend adicionado (sem .git próprio)
- [ ] Commit feito
- [ ] Push realizado
- [ ] Verificar no GitHub se backend aparece

---

## 🧪 Verificar no GitHub

Após o push, acesse:
https://github.com/westtlley/farmacia-digital

Deve mostrar:
- ✅ Pasta `backend/` com os arquivos
- ✅ Pasta `src/`
- ✅ Arquivos de configuração
