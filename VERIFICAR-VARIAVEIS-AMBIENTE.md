# ✅ Verificação de Variáveis de Ambiente

## 📋 Checklist Completo

### 🎨 Vercel (Frontend) - Obrigatórias

- [x] `VITE_CLOUDINARY_UPLOAD_PRESET` = `farmacia-upload` ✅
- [ ] `VITE_CLOUDINARY_CLOUD_NAME` = `farmdigi` ❌ **FALTA!**
- [ ] `VITE_CLOUDINARY_API_KEY` = `653955521569147` ❌ **FALTA!**
- [x] `VITE_API_BASE_URL` = URL do backend ✅

### 🔧 Render (Backend) - Obrigatórias

- [x] `CLOUDINARY_CLOUD_NAME` = `farmdigi` ✅
- [x] `CLOUDINARY_API_KEY` = `653955521569147` ✅
- [x] `CLOUDINARY_API_SECRET` = `kj69HUaj4b2acanWOsCBMGRbtaA` ✅
- [x] `FRONTEND_URL` = `https://farmacia-digital-azure.vercel.app` ✅
- [x] `JWT_SECRET` = `secret` ✅

---

## ⚠️ Variáveis Faltando no Vercel

### Adicionar no Vercel:

1. **VITE_CLOUDINARY_CLOUD_NAME**
   - Valor: `farmdigi`

2. **VITE_CLOUDINARY_API_KEY**
   - Valor: `653955521569147`

**⚠️ NÃO adicione `VITE_CLOUDINARY_API_SECRET` no frontend!**
- O secret deve ficar apenas no backend (Render)
- Frontend não precisa do secret

---

## 📝 Como Adicionar no Vercel

1. Acesse o painel do Vercel
2. Vá em **Settings → Environment Variables**
3. Clique em **Add New**
4. Adicione:

```
KEY: VITE_CLOUDINARY_CLOUD_NAME
VALUE: farmdigi
```

```
KEY: VITE_CLOUDINARY_API_KEY
VALUE: 653955521569147
```

5. Selecione **All Environments** (Production, Preview, Development)
6. Clique em **Save**
7. Faça **Redeploy** do projeto

---

## ✅ Após Adicionar

### Verificar no Console do Navegador:

```javascript
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY);
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
```

Deve mostrar:
- Cloud Name: `farmdigi`
- API Key: `653955521569147`
- Upload Preset: `farmacia-upload`

---

## 🔍 Resumo

### ✅ Render (Backend) - Completo
Todas as variáveis necessárias estão configuradas!

### ⚠️ Vercel (Frontend) - Faltam 2
- `VITE_CLOUDINARY_CLOUD_NAME` ❌
- `VITE_CLOUDINARY_API_KEY` ❌

---

## 🎯 Próximos Passos

1. Adicionar as 2 variáveis faltantes no Vercel
2. Fazer redeploy
3. Testar upload de imagem
4. Verificar se blob URLs não aparecem mais
