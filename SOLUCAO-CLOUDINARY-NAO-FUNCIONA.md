# 🔧 Solução: Cloudinary Não Está Funcionando

## 🎯 Problema Identificado

O Cloudinary não está funcionando porque faltam variáveis de ambiente ou o Upload Preset não está configurado corretamente.

---

## ✅ SOLUÇÃO PASSO A PASSO

### **PASSO 1: Verificar Variáveis no Vercel**

1. Acesse [vercel.com](https://vercel.com)
2. Seu projeto → **Settings** → **Environment Variables**
3. Verifique se existem estas 3 variáveis:

```
VITE_CLOUDINARY_CLOUD_NAME = farmdigi
VITE_CLOUDINARY_API_KEY = 653955521569147
VITE_CLOUDINARY_UPLOAD_PRESET = farmacia-upload
```

**⚠️ IMPORTANTE:**
- Todas devem ter o prefixo `VITE_`
- Todas devem estar em **All Environments** (Production, Preview, Development)
- Se alguma estiver faltando, **adicione agora**

---

### **PASSO 2: Criar Upload Preset no Cloudinary**

1. Acesse [cloudinary.com/console](https://cloudinary.com/console)
2. Vá em **Settings** → **Upload** (menu lateral)
3. Role até **Upload presets**
4. Clique em **Add upload preset**
5. Configure:
   - **Preset name:** `farmacia-upload`
   - **Signing mode:** `Unsigned` ⚠️ **MUITO IMPORTANTE!**
   - **Folder:** `uploads` (opcional)
   - **Format:** `Auto` (recomendado)
6. Clique em **Save**

**⚠️ CRÍTICO:** O preset DEVE estar como **"Unsigned"** para funcionar do frontend!

---

### **PASSO 3: Fazer Redeploy no Vercel**

Após adicionar as variáveis:

1. No Vercel, vá em **Deployments**
2. Clique nos **3 pontos** (⋮) do último deploy
3. Clique em **Redeploy**
4. Aguarde o deploy terminar

---

### **PASSO 4: Testar no Console do Navegador**

1. Acesse seu site no Vercel
2. Abra o **Console** (F12 → Console)
3. Você deve ver:

```
🔍 ===== Cloudinary Config Check =====
Cloud Name: farmdigi
API Key: ✅ Configurado
Upload Preset: farmacia-upload
Vai usar Cloudinary? ✅ SIM
=====================================
```

**Se aparecer "❌ FALTA":**
- ❌ Variável não foi adicionada
- ❌ Redeploy não foi feito
- ❌ Variável está com nome errado

---

### **PASSO 5: Testar Upload**

1. No console, execute:

```javascript
// Verificar variáveis
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
```

2. Tente fazer upload de uma imagem no seu app
3. Veja os logs no console:
   - Deve aparecer: `☁️ Tentando upload no Cloudinary...`
   - Deve aparecer: `✅ Upload bem-sucedido!`

---

## 🐛 Problemas Comuns e Soluções

### **Problema 1: Variáveis aparecem como `undefined`**

**Causa:** Variáveis não foram adicionadas ou redeploy não foi feito.

**Solução:**
1. Verifique se as variáveis estão no Vercel
2. Faça redeploy
3. Limpe cache do navegador (Ctrl+Shift+R)

---

### **Problema 2: Erro "Invalid upload preset"**

**Causa:** O preset não existe ou o nome está errado.

**Solução:**
1. Verifique o nome exato do preset no Cloudinary
2. Use o nome EXATO na variável `VITE_CLOUDINARY_UPLOAD_PRESET`
3. Certifique-se que está como "Unsigned"

---

### **Problema 3: Erro "Unauthorized" ou "403"**

**Causa:** O preset não está como "Unsigned" ou as credenciais estão erradas.

**Solução:**
1. No Cloudinary, verifique se o preset está como **"Unsigned"**
2. Se não estiver, edite o preset e mude para "Unsigned"
3. Salve e teste novamente

---

### **Problema 4: Logs mostram "willUseCloudinary: false"**

**Causa:** Faltam variáveis ou estão com nome errado.

**Solução:**
1. Verifique se TODAS as 3 variáveis estão no Vercel:
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_API_KEY`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`
2. Verifique se os nomes estão EXATAMENTE assim (case-sensitive)
3. Faça redeploy

---

## 📋 Checklist Final

Antes de testar, verifique:

- [ ] `VITE_CLOUDINARY_CLOUD_NAME` adicionada no Vercel
- [ ] `VITE_CLOUDINARY_API_KEY` adicionada no Vercel
- [ ] `VITE_CLOUDINARY_UPLOAD_PRESET` adicionada no Vercel
- [ ] Todas as variáveis estão em **All Environments**
- [ ] Upload Preset `farmacia-upload` existe no Cloudinary
- [ ] Upload Preset está como **"Unsigned"**
- [ ] Redeploy foi feito no Vercel
- [ ] Console mostra "Vai usar Cloudinary? ✅ SIM"
- [ ] Teste de upload funciona

---

## 🆘 Se Ainda Não Funcionar

Envie estas informações:

1. **Screenshot do Console** mostrando os logs
2. **Screenshot das variáveis no Vercel**
3. **Screenshot do Upload Preset no Cloudinary**
4. **Erro específico** (se houver)

---

## 🎯 Resumo Rápido

1. ✅ Adicione 3 variáveis no Vercel (com `VITE_`)
2. ✅ Crie preset `farmacia-upload` no Cloudinary (Unsigned)
3. ✅ Faça redeploy
4. ✅ Teste no console do navegador

**Pronto!** 🎉
