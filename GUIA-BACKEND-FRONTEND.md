# 🚀 Guia: Render (Backend) + Vercel (Frontend)

## 📋 Visão Geral

- **Render:** Backend API (Node.js/Express)
- **Vercel:** Frontend React (Vite)

## 🏗️ Estrutura do Projeto

```
farmacia-digital/
├── backend/              # API Backend (Render)
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   └── .env
├── src/                 # Frontend React (Vercel)
├── package.json
├── vercel.json          # Config Vercel (Frontend)
└── render.yaml          # Config Render (Backend)
```

---

## 🔧 Passo 1: Configurar Backend no Render

### 1.1 Criar estrutura do backend

Crie uma pasta `backend` na raiz do projeto com:

**backend/package.json:**
```json
{
  "name": "farmacia-digital-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

**backend/server.js:**
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Rotas da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

// Rotas de produtos
app.get('/api/products', (req, res) => {
  // Sua lógica aqui
  res.json({ products: [] });
});

// Rotas de pedidos
app.get('/api/orders', (req, res) => {
  res.json({ orders: [] });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
```

### 1.2 Atualizar render.yaml

```yaml
services:
  # Backend API
  - type: web
    name: farmacia-digital-api
    env: node
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: FRONTEND_URL
        sync: false
      - key: CLOUDINARY_CLOUD_NAME
        sync: false
      - key: CLOUDINARY_API_KEY
        sync: false
      - key: CLOUDINARY_API_SECRET
        sync: false
```

---

## 🎨 Passo 2: Configurar Frontend no Vercel

### 2.1 Atualizar vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "env": {
    "VITE_API_URL": "@api_url"
  }
}
```

### 2.2 Criar arquivo de configuração da API

**src/config/api.js:**
```javascript
// URL da API Backend (Render)
export const API_URL = import.meta.env.VITE_API_URL || 'https://farmacia-digital-api.onrender.com';

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async put(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async delete(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
```

### 2.3 Atualizar código para usar API

**src/api/base44Client.js:**
```javascript
import { apiClient } from '@/config/api';

// Substituir localStorage por chamadas à API
export const base44 = {
  entities: {
    Product: {
      list: async () => {
        return await apiClient.get('/api/products');
      },
      create: async (data) => {
        return await apiClient.post('/api/products', data);
      },
      // ... outros métodos
    },
    // ... outras entidades
  },
};
```

---

## 🔐 Passo 3: Variáveis de Ambiente

### Backend (Render)

No painel do Render, adicione:

```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://seu-app.vercel.app
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### Frontend (Vercel)

No painel do Vercel, adicione:

```
VITE_API_URL=https://farmacia-digital-api.onrender.com
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
VITE_CLOUDINARY_API_KEY=sua_api_key
```

---

## 🚀 Passo 4: Deploy

### 4.1 Deploy do Backend (Render)

1. Acesse [render.com](https://render.com)
2. New → Web Service
3. Conecte o repositório GitHub
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Adicione as variáveis de ambiente
6. Deploy!

**URL do Backend:** `https://farmacia-digital-api.onrender.com`

### 4.2 Deploy do Frontend (Vercel)

1. Acesse [vercel.com](https://vercel.com)
2. Import Project
3. Conecte o repositório GitHub
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (raiz)
5. Adicione variável de ambiente:
   - `VITE_API_URL` = URL do seu backend no Render
6. Deploy!

**URL do Frontend:** `https://seu-app.vercel.app`

---

## ✅ Passo 5: Verificar

### Testar Backend:
```bash
curl https://farmacia-digital-api.onrender.com/api/health
```

### Testar Frontend:
- Acesse a URL do Vercel
- Verifique se as chamadas à API funcionam

---

## 🔄 Atualizações Futuras

### Backend:
```bash
cd backend
# Fazer alterações
git add .
git commit -m "Atualização backend"
git push
# Render faz deploy automático
```

### Frontend:
```bash
# Fazer alterações
git add .
git commit -m "Atualização frontend"
git push
# Vercel faz deploy automático
```

---

## 🆘 Troubleshooting

### CORS Error
- Verifique `FRONTEND_URL` no Render
- Adicione a URL do Vercel no CORS do backend

### API não encontrada
- Verifique `VITE_API_URL` no Vercel
- Certifique-se que o backend está rodando no Render

### Variáveis de ambiente
- Backend: Não use `VITE_` prefix
- Frontend: Use `VITE_` prefix para expor no cliente

---

## 📝 Resumo

1. ✅ Backend no Render (API Node.js)
2. ✅ Frontend no Vercel (React/Vite)
3. ✅ Variáveis de ambiente configuradas
4. ✅ CORS configurado
5. ✅ Deploy automático em ambos
