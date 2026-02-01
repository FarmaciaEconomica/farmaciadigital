# 🔍 Diagnóstico Completo do Cloudinary

## ⚠️ Problema: Cloudinary não está funcionando

## 🔍 Checklist de Verificação

### 1. Variáveis de Ambiente no Vercel

Verifique se TODAS estas variáveis estão configuradas:

- [ ] `VITE_CLOUDINARY_CLOUD_NAME` = `farmdigi`
- [ ] `VITE_CLOUDINARY_API_KEY` = `653955521569147`
- [ ] `VITE_CLOUDINARY_UPLOAD_PRESET` = `farmacia-upload`

**Como verificar:**
1. Vercel → Settings → Environment Variables
2. Veja se as 3 variáveis estão lá
3. Certifique-se que estão em **All Environments**

### 2. Upload Preset no Cloudinary

Verifique se o preset existe e está configurado:

1. Acesse [cloudinary.com/console](https://cloudinary.com/console)
2. Settings → Upload
3. Verifique se `farmacia-upload` existe
4. Verifique se está como **"Unsigned"** (importante!)

### 3. Testar no Console do Navegador

Após fazer redeploy, abra o console (F12) e execute:

```javascript
// Verificar variáveis
console.log('=== Cloudinary Config ===');
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY);
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
console.log('========================');
```

**Se aparecer `undefined`:**
- ❌ Variáveis não estão configuradas
- ❌ Precisa adicionar no Vercel
- ❌ Precisa fazer redeploy

### 4. Verificar Logs do Código

O código deve mostrar no console:

```
🔍 Cloudinary Config Check: {
  cloudName: "farmdigi",
  apiKey: "✅ Configurado",
  uploadPreset: "farmacia-upload",
  willUseCloudinary: true
}
```

**Se mostrar `willUseCloudinary: false`:**
- ❌ Variáveis não estão carregadas
- ❌ Precisa adicionar no Vercel

---

## 🧪 Teste Rápido de Upload

No console do navegador:

```javascript
// Teste direto de upload
const testUpload = async () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  if (!cloudName || !uploadPreset) {
    console.error('❌ Variáveis não configuradas!');
    console.log('Cloud Name:', cloudName);
    console.log('Upload Preset:', uploadPreset);
    return;
  }
  
  // Criar arquivo de teste
  const blob = new Blob(['test'], { type: 'text/plain' });
  const file = new File([blob], 'test.txt', { type: 'text/plain' });
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name', cloudName);
  
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

## 🔧 Soluções por Problema

### Problema 1: Variáveis não aparecem no console

**Solução:**
1. Adicione as variáveis no Vercel
2. Faça redeploy
3. Limpe cache do navegador (Ctrl+Shift+R)
4. Teste novamente

### Problema 2: Erro "Invalid upload preset"

**Solução:**
1. Verifique o nome do preset no Cloudinary
2. Certifique-se que está como "Unsigned"
3. Use o nome EXATO do preset

### Problema 3: Erro "Unauthorized"

**Solução:**
1. Verifique se o preset permite uploads unsigned
2. Verifique se as credenciais estão corretas
3. Crie um novo preset se necessário

### Problema 4: Código não tenta usar Cloudinary

**Solução:**
1. Verifique se `VITE_CLOUDINARY_CLOUD_NAME` está configurado
2. Verifique os logs do console
3. Veja se aparece "⚠️ Cloudinary não configurado"

---

## 📋 Passo a Passo para Corrigir

### Passo 1: Adicionar Variáveis no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Seu projeto → Settings → Environment Variables
3. Adicione:

```
VITE_CLOUDINARY_CLOUD_NAME = farmdigi
VITE_CLOUDINARY_API_KEY = 653955521569147
VITE_CLOUDINARY_UPLOAD_PRESET = farmacia-upload
```

4. Selecione **All Environments**
5. **Save**

### Passo 2: Fazer Redeploy

1. No Vercel, vá em **Deployments**
2. Clique nos 3 pontos do último deploy
3. **Redeploy**

### Passo 3: Verificar no Console

1. Acesse seu site
2. Abra Console (F12)
3. Execute o teste acima
4. Veja os logs

### Passo 4: Verificar Upload Preset

1. [cloudinary.com/console](https://cloudinary.com/console)
2. Settings → Upload
3. Verifique se `farmacia-upload` existe
4. Verifique se está **Unsigned**

---

## 🆘 Se Ainda Não Funcionar

### Envie estas informações:

1. **Logs do console** (F12)
2. **Variáveis que aparecem:**
```javascript
Object.keys(import.meta.env).filter(k => k.includes('CLOUDINARY'))
```
3. **Erro específico** (se houver)
4. **Screenshot** do painel do Cloudinary (Upload presets)

---

## ✅ Checklist Final

- [ ] Variáveis adicionadas no Vercel
- [ ] Redeploy feito
- [ ] Variáveis aparecem no console
- [ ] Upload Preset existe no Cloudinary
- [ ] Preset está como "Unsigned"
- [ ] Teste de upload funciona
- [ ] Logs mostram "willUseCloudinary: true"
