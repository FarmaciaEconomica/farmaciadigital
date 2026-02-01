# 🔧 Corrigir Configuração do Render

## ⚠️ Problema

O Render está fazendo deploy do **frontend** (Vite) em vez do **backend** (Node.js).

## ✅ Solução

### Opção 1: Configurar no Painel do Render (Recomendado)

1. Acesse [render.com](https://render.com)
2. Vá no seu serviço `farmacia-digital-api`
3. Clique em **"Settings"**
4. Configure:

#### Build & Deploy Settings:
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** `Node`

#### Runtime:
- **Node Version:** `18` ou `20` (escolha uma)

5. Clique em **"Save Changes"**
6. Vá em **"Manual Deploy"** → **"Deploy latest commit"**

### Opção 2: Deletar e Recriar o Serviço

Se a Opção 1 não funcionar:

1. **Delete o serviço atual** no Render
2. Crie um **novo Web Service**
3. Configure:
   - **Name:** `farmacia-digital-api`
   - **Environment:** `Node`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

### Opção 3: Usar render.yaml (Auto-deploy)

O `render.yaml` já está configurado corretamente. Para o Render usar ele:

1. No painel do Render, vá em **Settings**
2. Certifique-se que **"Auto-Deploy"** está ativado
3. O Render deve detectar o `render.yaml` automaticamente

Se não detectar, você pode:
- Fazer um commit vazio para forçar redeploy:
```bash
git commit --allow-empty -m "Force render.yaml detection"
git push
```

---

## ✅ Verificar se Está Correto

Após configurar, o log do deploy deve mostrar:

```
==> Building...
==> Installing dependencies...
==> cd backend && npm install
==> Starting...
==> cd backend && npm start
🚀 Servidor rodando na porta 10000
```

**NÃO deve mostrar:**
- `vite build`
- `npm run build`
- Qualquer coisa relacionada ao frontend

---

## 🔍 Checklist

- [ ] Root Directory = `backend`
- [ ] Build Command = `npm install`
- [ ] Start Command = `npm start`
- [ ] Environment = `Node`
- [ ] Não está fazendo build do Vite
- [ ] Está executando `node server.js`

---

## 🆘 Se Ainda Não Funcionar

### Verificar se o backend existe:
```bash
ls backend/
# Deve mostrar: server.js, package.json
```

### Testar backend localmente:
```bash
cd backend
npm install
npm start
```

Se funcionar localmente, o problema é apenas a configuração do Render.

---

## 📝 Nota Importante

**Frontend vai para o Vercel, não para o Render!**

- ✅ **Render:** Backend API (Node.js)
- ✅ **Vercel:** Frontend React (Vite)

O Render **NÃO** deve fazer build do frontend!
