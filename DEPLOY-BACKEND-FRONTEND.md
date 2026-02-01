# 🚀 Deploy: Render (Backend) + Vercel (Frontend)

## 📋 Resumo

- **Backend (Render):** API Node.js/Express em `backend/`
- **Frontend (Vercel):** React/Vite na raiz do projeto

---

## 🔧 Passo 1: Configurar Backend no Render

### 1.1 Criar Web Service no Render

1. Acesse [render.com](https://render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub
4. Configure:
   - **Name:** `farmacia-digital-api`
   - **Environment:** `Node`
   - **Region:** Escolha a mais próxima
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

### 1.2 Adicionar Variáveis de Ambiente no Render

No painel do Render, vá em **Environment** e adicione:

```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://seu-app.vercel.app
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

**⚠️ Importante:**
- `FRONTEND_URL` será a URL do seu app no Vercel (você vai atualizar depois)
- Não use prefixo `VITE_` no backend

### 1.3 Deploy do Backend

1. Clique em **"Create Web Service"**
2. Aguarde o build (2-3 minutos)
3. Anote a URL: `https://farmacia-digital-api.onrender.com`

**✅ Teste o backend:**
```bash
curl https://farmacia-digital-api.onrender.com/api/health
```

---

## 🎨 Passo 2: Configurar Frontend no Vercel

### 2.1 Importar Projeto no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New Project"**
3. Importe seu repositório GitHub
4. Configure:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `.` (raiz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 2.2 Adicionar Variáveis de Ambiente no Vercel

No painel do Vercel, vá em **Settings → Environment Variables** e adicione:

```
VITE_API_URL=https://farmacia-digital-api.onrender.com
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
VITE_CLOUDINARY_API_KEY=sua_api_key
```

**⚠️ Importante:**
- `VITE_API_URL` deve ser a URL do seu backend no Render
- Use prefixo `VITE_` para variáveis expostas no frontend

### 2.3 Deploy do Frontend

1. Clique em **"Deploy"**
2. Aguarde o build (2-3 minutos)
3. Anote a URL: `https://seu-app.vercel.app`

---

## 🔄 Passo 3: Atualizar URLs

### 3.1 Atualizar FRONTEND_URL no Render

1. Volte ao Render
2. Vá em **Environment**
3. Atualize `FRONTEND_URL` com a URL do Vercel:
   ```
   FRONTEND_URL=https://seu-app.vercel.app
   ```
4. O Render vai fazer redeploy automaticamente

### 3.2 Verificar CORS

O backend já está configurado para aceitar requisições do frontend via CORS.

---

## ✅ Passo 4: Verificar Tudo

### Testar Backend:
```bash
curl https://farmacia-digital-api.onrender.com/api/health
```

Deve retornar:
```json
{
  "status": "ok",
  "message": "API funcionando",
  "timestamp": "..."
}
```

### Testar Frontend:
1. Acesse a URL do Vercel
2. Abra o Console do navegador (F12)
3. Verifique se não há erros de CORS
4. Teste uma funcionalidade que chama a API

---

## 🔄 Atualizações Futuras

### Backend:
```bash
# Fazer alterações em backend/
cd backend
# Editar arquivos
git add .
git commit -m "Atualização backend"
git push
# Render faz deploy automático
```

### Frontend:
```bash
# Fazer alterações em src/
git add .
git commit -m "Atualização frontend"
git push
# Vercel faz deploy automático
```

---

## 🆘 Troubleshooting

### Erro: CORS
**Sintoma:** Erro no console do navegador sobre CORS

**Solução:**
1. Verifique `FRONTEND_URL` no Render
2. Certifique-se que está com a URL correta do Vercel
3. Reinicie o serviço no Render

### Erro: API não encontrada
**Sintoma:** Frontend não consegue conectar ao backend

**Solução:**
1. Verifique `VITE_API_URL` no Vercel
2. Certifique-se que o backend está rodando no Render
3. Teste a URL do backend diretamente no navegador

### Erro: Variáveis de ambiente
**Sintoma:** Variáveis não funcionam

**Solução:**
- Backend: Não use prefixo `VITE_`
- Frontend: Use prefixo `VITE_` para expor no cliente
- Reinicie os serviços após adicionar variáveis

---

## 📝 Checklist Final

- [ ] Backend deployado no Render
- [ ] Frontend deployado no Vercel
- [ ] `FRONTEND_URL` configurado no Render
- [ ] `VITE_API_URL` configurado no Vercel
- [ ] Backend responde em `/api/health`
- [ ] Frontend consegue chamar a API
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente configuradas

---

## 🎉 Pronto!

Agora você tem:
- ✅ Backend rodando no Render
- ✅ Frontend rodando no Vercel
- ✅ Comunicação entre eles funcionando
- ✅ Deploy automático em ambos
