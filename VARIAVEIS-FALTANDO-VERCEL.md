# ⚠️ Variáveis Faltando no Vercel

## 🔍 Análise dos .env

### ✅ Backend (Render) - COMPLETO
Todas as variáveis necessárias estão configuradas!

### ❌ Frontend (Vercel) - FALTAM 2

## 📋 Variáveis que DEVEM estar no Vercel:

### ✅ Já configuradas:
- `VITE_CLOUDINARY_UPLOAD_PRESET` = `farmacia-upload` ✅
- `VITE_API_BASE_URL` = URL do backend ✅

### ❌ FALTANDO:
1. **VITE_CLOUDINARY_CLOUD_NAME**
   - Valor: `farmdigi`
   
2. **VITE_CLOUDINARY_API_KEY**
   - Valor: `653955521569147`

---

## 🚀 Como Adicionar no Vercel

1. Acesse o painel do Vercel
2. Vá em **Settings → Environment Variables**
3. Clique em **Add New**
4. Adicione:

**Primeira variável:**
```
KEY: VITE_CLOUDINARY_CLOUD_NAME
VALUE: farmdigi
Environment: All Environments
```

**Segunda variável:**
```
KEY: VITE_CLOUDINARY_API_KEY
VALUE: 653955521569147
Environment: All Environments
```

5. Clique em **Save**
6. **Faça Redeploy** (ou aguarde deploy automático)

---

## 🧪 Verificar se Funcionou

### Após o redeploy, no console do navegador (F12):

```javascript
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY);
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
```

**Deve mostrar:**
- Cloud Name: `farmdigi`
- API Key: `653955521569147`
- Upload Preset: `farmacia-upload`

---

## 📊 Logs Esperados

Após adicionar as variáveis, você deve ver nos logs:

```
🔍 Cloudinary Config Check: {
  cloudName: "farmdigi",
  apiKey: "✅ Configurado",
  uploadPreset: "farmacia-upload",
  willUseCloudinary: true
}
```

E quando fizer upload:
```
☁️ Tentando upload no Cloudinary...
✅ Upload Cloudinary bem-sucedido: https://res.cloudinary.com/farmdigi/...
```

---

## ⚠️ Importante

**NÃO adicione `VITE_CLOUDINARY_API_SECRET` no frontend!**
- O secret deve ficar apenas no backend (Render)
- Frontend não precisa do secret para uploads unsigned

---

## ✅ Após Configurar

1. ✅ Variáveis adicionadas no Vercel
2. ✅ Redeploy feito
3. ✅ Logs mostram Cloudinary configurado
4. ✅ Uploads funcionam com Cloudinary
5. ✅ Blob URLs não aparecem mais
