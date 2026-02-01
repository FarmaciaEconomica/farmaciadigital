# 🔍 Como Verificar Variáveis no Vercel

## 📋 Passo a Passo Visual

### 1. Acessar Vercel

1. Acesse: https://vercel.com
2. Faça login
3. Clique no seu projeto **farmacia-digital**

### 2. Ir em Settings

1. No menu superior, clique em **Settings**
2. No menu lateral esquerdo, clique em **Environment Variables**

### 3. Verificar Variáveis

Você deve ver uma lista de variáveis. Procure por:

#### ✅ Variáveis que DEVEM existir:

1. **VITE_CLOUDINARY_CLOUD_NAME**
   - Valor: `dqtfaco8b`
   - Environment: **All Environments**

2. **VITE_CLOUDINARY_API_KEY**
   - Valor: (sua API key da conta dqtfaco8b)
   - Environment: **All Environments**

3. **VITE_CLOUDINARY_UPLOAD_PRESET**
   - Valor: `farmacia-upload`
   - Environment: **All Environments**

4. **VITE_API_BASE_URL** (ou `VITE_API_URL`)
   - Valor: `https://farmacia-digital-1.onrender.com`
   - Environment: **All Environments`

---

## ⚠️ Variáveis que NÃO devem existir (sem VITE_)

Se você ver estas variáveis **SEM o prefixo `VITE_`**, elas NÃO funcionarão:

- ❌ `CLOUDINARY_CLOUD_NAME` (deve ser `VITE_CLOUDINARY_CLOUD_NAME`)
- ❌ `CLOUDINARY_API_KEY` (deve ser `VITE_CLOUDINARY_API_KEY`)

**Solução:** Delete essas e adicione as corretas com `VITE_`.

---

## ➕ Como Adicionar Variável

1. Clique em **Add Environment Variable**
2. Preencha:
   - **Key:** `VITE_CLOUDINARY_CLOUD_NAME`
   - **Value:** `dqtfaco8b`
   - **Environment:** Selecione **All Environments**
3. Clique em **Save**
4. Repita para as outras variáveis

---

## 🔄 Fazer Redeploy

**IMPORTANTE:** Após adicionar/atualizar variáveis:

1. Vá em **Deployments**
2. Clique nos **3 pontos** (⋮) do último deploy
3. Clique em **Redeploy**
4. Aguarde terminar

---

## ✅ Verificar se Funcionou

Após o redeploy:

1. Acesse seu site
2. Abra Console (F12)
3. Recarregue página (Ctrl+Shift+R)
4. Deve aparecer:

```
🔍 ===== Cloudinary Config Check =====
Cloud Name: dqtfaco8b
API Key: ✅ Configurado
Upload Preset: farmacia-upload
Vai usar Cloudinary? ✅ SIM
=====================================
```

---

## 🆘 Se Ainda Não Funcionar

1. **Verifique se o redeploy foi concluído**
2. **Limpe cache completamente:**
   - Ctrl+Shift+Delete
   - Selecione "Imagens e arquivos em cache"
   - Limpe
3. **Recarregue a página** (Ctrl+Shift+R)
4. **Verifique se está na URL correta do Vercel**

---

## 📋 Checklist Rápido

- [ ] Variáveis têm prefixo `VITE_`
- [ ] Variáveis estão em **All Environments**
- [ ] Valores estão corretos
- [ ] Redeploy foi feito
- [ ] Cache foi limpo
- [ ] Teste no console funcionou
