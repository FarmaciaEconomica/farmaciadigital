# 🔧 Configurar FRONTEND_URL no Render

## ⚠️ IMPORTANTE

O backend precisa saber qual é a URL do frontend para permitir requisições (CORS).

---

## 📋 Passo a Passo

### 1. Acesse o Render

1. Acesse: https://render.com
2. Faça login
3. Vá em **Dashboard**
4. Clique no seu serviço **farmacia-digital-api**

### 2. Adicionar Variável de Ambiente

1. No menu lateral, clique em **Environment**
2. Role até **Environment Variables**
3. Clique em **Add Environment Variable**
4. Configure:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://farmacia-digital-azure.vercel.app`
5. Clique em **Save Changes**

### 3. Aguardar Reinicialização

O Render vai reiniciar o serviço automaticamente. Aguarde alguns segundos.

### 4. Verificar Logs

Nos logs do Render, você deve ver:

```
🚀 Servidor rodando na porta 10000
📍 Health check: http://localhost:10000/api/health
🌐 URL pública: https://farmacia-digital-1.onrender.com
🔗 Frontend configurado: https://farmacia-digital-azure.vercel.app
☁️ Cloudinary: farmdigi
```

---

## ✅ Por Que Isso É Importante?

Sem `FRONTEND_URL` configurado:
- ❌ O backend aceita requisições de qualquer origem (`*`)
- ⚠️ Menos seguro
- ⚠️ Pode causar problemas de CORS

Com `FRONTEND_URL` configurado:
- ✅ O backend aceita apenas requisições do seu frontend
- ✅ Mais seguro
- ✅ CORS configurado corretamente

---

## 🧪 Testar

Depois de configurar, teste no console do navegador (no site do Vercel):

```javascript
fetch('https://farmacia-digital-1.onrender.com/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ Funcionou!', data))
  .catch(err => console.error('❌ Erro:', err));
```

Se retornar os dados, está tudo funcionando! 🎉

---

## 📋 Checklist

- [ ] Acessar Render Dashboard
- [ ] Ir em Environment Variables
- [ ] Adicionar `FRONTEND_URL` = `https://farmacia-digital-azure.vercel.app`
- [ ] Salvar
- [ ] Aguardar reinicialização
- [ ] Verificar logs
- [ ] Testar conexão
