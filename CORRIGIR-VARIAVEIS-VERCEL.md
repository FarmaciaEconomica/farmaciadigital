# 🔧 CORREÇÃO URGENTE: Variáveis no Vercel

## ❌ Problemas Identificados

### 1. Variáveis SEM o prefixo `VITE_`

Você tem:
- ❌ `CLOUDINARY_API_KEY` 
- ❌ `CLOUDINARY_CLOUD_NAME`

Mas deveria ser:
- ✅ `VITE_CLOUDINARY_API_KEY`
- ✅ `VITE_CLOUDINARY_CLOUD_NAME`

### 2. Valores Incorretos

Você tem:
- ❌ `CLOUDINARY_CLOUD_NAME` = `dqtfaco8b`
- ❌ `CLOUDINARY_API_KEY` = `153895292434583`

Mas deveria ser:
- ✅ `VITE_CLOUDINARY_CLOUD_NAME` = `farmdigi`
- ✅ `VITE_CLOUDINARY_API_KEY` = `653955521569147`

---

## ✅ SOLUÇÃO PASSO A PASSO

### Passo 1: Remover Variáveis Erradas

1. No Vercel, vá em **Settings** → **Environment Variables**
2. **DELETE** estas variáveis (clique nos 3 pontos → Delete):
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_CLOUD_NAME`

### Passo 2: Adicionar Variáveis Corretas

Adicione estas variáveis (com o prefixo `VITE_`):

```
VITE_CLOUDINARY_CLOUD_NAME = farmdigi
VITE_CLOUDINARY_API_KEY = 653955521569147
VITE_CLOUDINARY_UPLOAD_PRESET = farmacia-upload
```

⚠️ **IMPORTANTE:**
- Todas devem ter o prefixo `VITE_`
- Todas devem estar em **All Environments**
- Use os valores corretos acima

### Passo 3: Verificar VITE_API_BASE_URL

Verifique se `VITE_API_BASE_URL` está apontando para:
```
https://farmacia-digital-1.onrender.com
```

Se estiver apontando para `farmacia-digital-v1n4.onrender.com`, atualize para:
```
https://farmacia-digital-1.onrender.com
```

---

## 🔧 CORREÇÃO: Upload Preset no Cloudinary

### Problema: Preset está como "Signed"

O preset `farmacia-upload` está como **"Signed"** mas precisa ser **"Unsigned"**!

### Como Corrigir:

1. Acesse: https://cloudinary.com/console
2. Settings → Upload → Upload Presets
3. Clique no preset `farmacia-upload`
4. Mude **"Signing mode"** de **"Signed"** para **"Unsigned"**
5. **Save**

⚠️ **CRÍTICO:** Sem isso, o upload do frontend NÃO funcionará!

---

## 📋 Checklist de Correção

- [ ] Remover `CLOUDINARY_API_KEY` (sem VITE_)
- [ ] Remover `CLOUDINARY_CLOUD_NAME` (sem VITE_)
- [ ] Adicionar `VITE_CLOUDINARY_CLOUD_NAME` = `farmdigi`
- [ ] Adicionar `VITE_CLOUDINARY_API_KEY` = `653955521569147`
- [ ] Verificar `VITE_CLOUDINARY_UPLOAD_PRESET` = `farmacia-upload`
- [ ] Verificar `VITE_API_BASE_URL` = `https://farmacia-digital-1.onrender.com`
- [ ] Mudar preset no Cloudinary para "Unsigned"
- [ ] Fazer redeploy no Vercel

---

## 🧪 Testar Depois

1. Faça redeploy no Vercel
2. Acesse seu site
3. Abra Console (F12)
4. Deve aparecer:

```
🔍 ===== Cloudinary Config Check =====
Cloud Name: farmdigi
API Key: ✅ Configurado
Upload Preset: farmacia-upload
Vai usar Cloudinary? ✅ SIM
=====================================
```

Se aparecer "❌ FALTA", verifique novamente as variáveis!
