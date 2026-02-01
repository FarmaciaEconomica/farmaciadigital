# ⚠️ Correção: URL da API no Vercel

## 🔍 Problema Identificado

A variável `VITE_API_BASE_URL` está apontando para:
```
https://farmacia-digital-v1n4.onrender.com
```

Mas deveria ser:
```
https://farmacia-digital-1.onrender.com
```

---

## ✅ Solução

### 1. Atualizar Variável no Vercel

1. Acesse: https://vercel.com
2. Seu projeto → **Settings** → **Environment Variables**
3. Encontre `VITE_API_BASE_URL`
4. Clique nos **3 pontos** (⋮) → **Edit**
5. Altere o valor para:
   ```
   https://farmacia-digital-1.onrender.com
   ```
6. **Save**

### 2. Fazer Redeploy

Após atualizar:

1. Vercel → **Deployments**
2. Clique nos **3 pontos** (⋮) do último deploy
3. **Redeploy**
4. Aguarde terminar

---

## ✅ Variáveis Corretas

Após a correção, você deve ter:

```
VITE_CLOUDINARY_CLOUD_NAME = dqtfaco8b ✅
VITE_CLOUDINARY_API_KEY = 153895292434583 ✅
VITE_CLOUDINARY_UPLOAD_PRESET = farmacia-upload ✅
VITE_API_BASE_URL = https://farmacia-digital-1.onrender.com ✅ (corrigir)
```

---

## 🧪 Testar Após Redeploy

1. Limpe cache (Ctrl+Shift+R)
2. Abra Console (F12)
3. Deve aparecer automaticamente:

```
🔍 ===== Cloudinary Config Check =====
Cloud Name: dqtfaco8b
API Key: ✅ Configurado
Upload Preset: farmacia-upload
Vai usar Cloudinary? ✅ SIM
=====================================
```

---

## 📋 Checklist

- [x] ✅ Variáveis configuradas com `VITE_`
- [x] ✅ Variáveis em "All Environments"
- [ ] ⚠️ Corrigir `VITE_API_BASE_URL` para `farmacia-digital-1.onrender.com`
- [ ] ⚠️ Fazer redeploy
- [ ] ⚠️ Limpar cache e testar
