# 🧪 Como Testar Cloudinary no Console

## 📋 Passo a Passo

### 1. Abrir o Console

1. Acesse seu site no Vercel
2. Pressione **F12** (ou clique com botão direito → Inspecionar)
3. Vá na aba **Console**

### 2. Verificar Variáveis

No console, execute este comando:

```javascript
console.log('=== Verificação Cloudinary ===');
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY ? '✅ Configurado' : '❌ FALTA');
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
console.log('API URL:', import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL);
console.log('=============================');
```

**O que deve aparecer:**

✅ **Se estiver configurado:**
```
=== Verificação Cloudinary ===
Cloud Name: dqtfaco8b
API Key: ✅ Configurado
Upload Preset: farmacia-upload
API URL: https://farmacia-digital-1.onrender.com
=============================
```

❌ **Se NÃO estiver configurado:**
```
=== Verificação Cloudinary ===
Cloud Name: undefined
API Key: ❌ FALTA
Upload Preset: undefined
API URL: undefined
=============================
```

---

### 3. Verificar Logs Automáticos

Os logs automáticos devem aparecer quando a página carrega. Se não aparecerem:

1. **Recarregue a página** (Ctrl+R ou F5)
2. **Limpe o cache** (Ctrl+Shift+R)
3. **Verifique se o deploy foi feito** após adicionar variáveis

**O que deve aparecer automaticamente:**

```
🔍 ===== Cloudinary Config Check =====
Cloud Name: dqtfaco8b
API Key: ✅ Configurado
Upload Preset: farmacia-upload
Vai usar Cloudinary? ✅ SIM
=====================================
📋 Variáveis VITE_ disponíveis: [...]
```

---

### 4. Testar Upload Direto

No console, execute:

```javascript
// Criar arquivo de teste
const blob = new Blob(['test'], { type: 'text/plain' });
const file = new File([blob], 'test.txt', { type: 'text/plain' });

// Testar upload
const testUpload = async () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  if (!cloudName || !uploadPreset) {
    console.error('❌ Variáveis não configuradas!');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  try {
    console.log('☁️ Tentando upload...');
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );
    
    const data = await response.json();
    
    if (data.secure_url) {
      console.log('✅ Upload funcionou!', data.secure_url);
    } else {
      console.error('❌ Erro:', data);
    }
  } catch (error) {
    console.error('❌ Erro no upload:', error);
  }
};

testUpload();
```

---

## 🔍 Problemas Comuns

### Problema 1: Variáveis aparecem como `undefined`

**Causa:** Variáveis não foram adicionadas ou redeploy não foi feito.

**Solução:**
1. Verifique no Vercel se as variáveis estão com prefixo `VITE_`
2. Verifique se estão em **All Environments**
3. Faça redeploy
4. Limpe cache do navegador (Ctrl+Shift+R)

---

### Problema 2: Logs automáticos não aparecem

**Causa:** Código não foi deployado ou cache do navegador.

**Solução:**
1. Verifique se o código foi commitado e deployado
2. Limpe cache do navegador (Ctrl+Shift+R)
3. Verifique se está na URL correta do Vercel

---

### Problema 3: Erro "Invalid upload preset"

**Causa:** Preset não existe ou nome está errado.

**Solução:**
1. Verifique no Cloudinary se o preset `farmacia-upload` existe
2. Verifique se o nome está exato (case-sensitive)
3. Verifique se está como "Unsigned"

---

### Problema 4: Erro "Unauthorized"

**Causa:** Preset está como "Signed" ou API key está errada.

**Solução:**
1. No Cloudinary, mude o preset para "Unsigned"
2. Verifique se a API key está correta

---

## 📋 Checklist de Verificação

- [ ] Console aberto (F12)
- [ ] Variáveis aparecem no console (não são `undefined`)
- [ ] Logs automáticos aparecem ao carregar página
- [ ] Upload Preset existe no Cloudinary
- [ ] Upload Preset está como "Unsigned"
- [ ] Teste de upload funciona

---

## 🆘 Se Nada Aparecer

1. **Verifique se está na URL correta do Vercel**
2. **Verifique se o deploy foi feito recentemente**
3. **Limpe cache completamente:**
   - Ctrl+Shift+Delete
   - Selecione "Imagens e arquivos em cache"
   - Limpe
4. **Recarregue a página** (Ctrl+Shift+R)

---

## ✅ Resultado Esperado

Quando tudo estiver funcionando, você deve ver:

1. **Ao carregar a página:**
   - Logs automáticos do Cloudinary

2. **No console:**
   - Variáveis configuradas (não `undefined`)
   - "Vai usar Cloudinary? ✅ SIM"

3. **Ao fazer upload:**
   - `☁️ Tentando upload no Cloudinary...`
   - `✅ Upload bem-sucedido!`
   - URL do Cloudinary (res.cloudinary.com)
