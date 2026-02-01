# 📚 Explicação: Render vs Vercel

## 🎯 Como Funciona

### Render (Backend)
- **URL:** https://farmacia-digital-1.onrender.com
- **Função:** API Backend (servidor)
- **O que faz:** Recebe requisições do frontend e processa dados

### Vercel (Frontend)
- **URL:** https://farmacia-digital-azure.vercel.app
- **Função:** Interface do usuário (aplicação React)
- **O que faz:** Mostra a interface e faz requisições para o backend

---

## 🔗 Como Eles Se Conectam

```
Usuário → Vercel (Frontend) → Render (Backend) → Resposta
```

1. Usuário acessa: `https://farmacia-digital-azure.vercel.app`
2. Frontend (Vercel) faz requisição para: `https://farmacia-digital-1.onrender.com/api/...`
3. Backend (Render) processa e retorna dados
4. Frontend (Vercel) mostra os dados para o usuário

---

## ⚠️ IMPORTANTE: Configurar CORS no Render

O backend precisa saber que pode aceitar requisições do frontend do Vercel.

### No Render, configure a variável:

```
FRONTEND_URL = https://farmacia-digital-azure.vercel.app
```

**Como fazer:**
1. Acesse: https://render.com
2. Seu serviço → **Environment**
3. Adicione a variável `FRONTEND_URL`
4. Valor: `https://farmacia-digital-azure.vercel.app`
5. **Save Changes**
6. O serviço vai reiniciar automaticamente

---

## ✅ Por Que o Render Não Mostra o Link do Vercel?

O Render mostra apenas a URL do **próprio backend**, que é o correto!

- ✅ Render mostra: `https://farmacia-digital-1.onrender.com` (backend)
- ✅ Vercel mostra: `https://farmacia-digital-azure.vercel.app` (frontend)

São serviços **separados** e **independentes**:
- Render = servidor/API
- Vercel = interface/aplicação web

---

## 🧪 Testar a Conexão

### 1. Testar Backend (Render):
Acesse: https://farmacia-digital-1.onrender.com/api/health

Deve retornar:
```json
{
  "status": "ok",
  "message": "API funcionando",
  "timestamp": "..."
}
```

### 2. Testar Frontend (Vercel):
Acesse: https://farmacia-digital-azure.vercel.app

Deve carregar a aplicação.

### 3. Testar Conexão entre Eles:

No console do navegador (F12), no site do Vercel, execute:

```javascript
fetch('https://farmacia-digital-1.onrender.com/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ Backend conectado!', data))
  .catch(err => console.error('❌ Erro:', err));
```

Se funcionar, está tudo conectado! 🎉

---

## 📋 Checklist

- [x] Backend (Render) está funcionando
- [ ] `FRONTEND_URL` configurado no Render
- [ ] `VITE_API_BASE_URL` configurado no Vercel apontando para o Render
- [ ] Frontend (Vercel) está funcionando
- [ ] Teste de conexão entre frontend e backend

---

## 🎯 Resumo

- **Render** = Backend (API) → Mostra apenas sua própria URL ✅
- **Vercel** = Frontend (Interface) → Tem sua própria URL ✅
- Eles se comunicam via requisições HTTP
- Precisa configurar `FRONTEND_URL` no Render para permitir CORS
