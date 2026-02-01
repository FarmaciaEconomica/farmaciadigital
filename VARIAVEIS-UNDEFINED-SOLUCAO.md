# ❌ Problema: Variáveis Cloudinary Estão `undefined`

## 🔍 Diagnóstico

O console mostrou:
```
Cloud Name: undefined
API Key: ❌ FALTA
Upload Preset: undefined
```

**Isso significa:** As variáveis não estão configuradas no Vercel ou o redeploy não foi feito.

---

## ✅ SOLUÇÃO PASSO A PASSO

### Passo 1: Verificar Variáveis no Vercel

1. Acesse: https://vercel.com
2. Faça login
3. Seu projeto → **Settings** → **Environment Variables**

### Passo 2: Verificar se Existem

Procure por estas variáveis (com o prefixo `VITE_`):

- [ ] `VITE_CLOUDINARY_CLOUD_NAME`
- [ ] `VITE_CLOUDINARY_API_KEY`
- [ ] `VITE_CLOUDINARY_UPLOAD_PRESET`
- [ ] `VITE_API_BASE_URL` (ou `VITE_API_URL`)

### Passo 3: Se NÃO Existem, Adicionar

Clique em **Add Environment Variable** e adicione:

```
Key: VITE_CLOUDINARY_CLOUD_NAME
Value: dqtfaco8b
Environment: All Environments
```

```
Key: VITE_CLOUDINARY_API_KEY
Value: (sua API key da conta dqtfaco8b)
Environment: All Environments
```

```
Key: VITE_CLOUDINARY_UPLOAD_PRESET
Value: farmacia-upload
Environment: All Environments
```

```
Key: VITE_API_BASE_URL
Value: https://farmacia-digital-1.onrender.com
Environment: All Environments
```

⚠️ **IMPORTANTE:**
- Todas devem ter o prefixo `VITE_`
- Todas devem estar em **All Environments**
- Use os valores corretos

### Passo 4: Se JÁ Existem, Verificar

1. Verifique se têm o prefixo `VITE_`
2. Verifique se os valores estão corretos
3. Verifique se estão em **All Environments**

### Passo 5: Fazer Redeploy

**CRÍTICO:** Após adicionar/atualizar variáveis, você DEVE fazer redeploy!

1. No Vercel, vá em **Deployments**
2. Clique nos **3 pontos** (⋮) do último deploy
3. Clique em **Redeploy**
4. Aguarde o deploy terminar (pode levar 1-2 minutos)

### Passo 6: Limpar Cache do Navegador

Após o redeploy:

1. No navegador, pressione **Ctrl+Shift+R** (ou **Ctrl+F5**)
2. Isso força o navegador a baixar a versão mais recente

### Passo 7: Testar Novamente

1. Abra o Console (F12)
2. Recarregue a página (Ctrl+Shift+R)
3. Você deve ver automaticamente:

```
🔍 ===== Cloudinary Config Check =====
Cloud Name: dqtfaco8b
API Key: ✅ Configurado
Upload Preset: farmacia-upload
Vai usar Cloudinary? ✅ SIM
=====================================
```

---

## 🔍 Verificar Variáveis no Console (Alternativa)

Se `import.meta.env` não funcionar no console, tente:

```javascript
// Verificar se as variáveis foram injetadas pelo Vite
console.log('Verificando variáveis...');
console.log('window:', Object.keys(window).filter(k => k.includes('CLOUDINARY')));
```

Ou verifique diretamente no código fonte:

1. No navegador, pressione **Ctrl+U** (ver código fonte)
2. Procure por `VITE_CLOUDINARY_CLOUD_NAME`
3. Se não encontrar, as variáveis não foram injetadas

---

## ⚠️ Problemas Comuns

### Problema 1: Variáveis sem prefixo `VITE_`

**Errado:**
```
CLOUDINARY_CLOUD_NAME = dqtfaco8b
```

**Correto:**
```
VITE_CLOUDINARY_CLOUD_NAME = dqtfaco8b
```

### Problema 2: Variáveis apenas em Production

**Errado:**
- Variável configurada apenas em "Production"

**Correto:**
- Variável configurada em **All Environments**

### Problema 3: Redeploy não foi feito

**Sintoma:** Variáveis adicionadas mas ainda aparecem como `undefined`

**Solução:** Fazer redeploy após adicionar variáveis

### Problema 4: Cache do navegador

**Sintoma:** Variáveis configuradas mas ainda mostra versão antiga

**Solução:** Limpar cache (Ctrl+Shift+R)

---

## 📋 Checklist Completo

- [ ] Acessar Vercel → Settings → Environment Variables
- [ ] Verificar se `VITE_CLOUDINARY_CLOUD_NAME` existe
- [ ] Verificar se `VITE_CLOUDINARY_API_KEY` existe
- [ ] Verificar se `VITE_CLOUDINARY_UPLOAD_PRESET` existe
- [ ] Verificar se todas têm prefixo `VITE_`
- [ ] Verificar se todas estão em **All Environments**
- [ ] Adicionar variáveis faltantes (se necessário)
- [ ] Fazer redeploy no Vercel
- [ ] Limpar cache do navegador (Ctrl+Shift+R)
- [ ] Testar novamente no console
- [ ] Verificar se logs automáticos aparecem

---

## 🎯 Resumo

**Problema:** Variáveis estão `undefined`

**Causa:** Não configuradas no Vercel ou redeploy não foi feito

**Solução:**
1. ✅ Adicionar variáveis no Vercel (com `VITE_`)
2. ✅ Fazer redeploy
3. ✅ Limpar cache
4. ✅ Testar novamente

Depois disso, as variáveis devem aparecer! 🎉
