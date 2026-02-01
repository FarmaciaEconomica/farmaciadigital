# ⚡ Teste Rápido do Cloudinary (1 minuto)

## 🎯 Método Mais Rápido: Console do Navegador

### 1. Abra o Console (F12)

### 2. Cole este código:

```javascript
// Verificar configuração
console.log('=== Cloudinary Config ===');
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '❌ Não configurado');
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY ? '✅ Configurado' : '❌ Não configurado');
console.log('========================');
```

**Se aparecer os valores:** ✅ Variáveis configuradas!

**Se aparecer "Não configurado":** ❌ Configure as variáveis no Vercel/Render

---

## 🧪 Teste de Upload Rápido

### No Console do Navegador:

```javascript
// Teste rápido de upload
const testCloudinary = async () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = 'SEU_UPLOAD_PRESET'; // Substitua pelo seu preset
  
  if (!cloudName) {
    console.error('❌ Cloudinary não configurado');
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
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );
    
    const data = await response.json();
    
    if (data.secure_url) {
      console.log('✅ Upload funcionou!');
      console.log('URL:', data.secure_url);
      console.log('Public ID:', data.public_id);
    } else {
      console.error('❌ Erro:', data);
    }
  } catch (error) {
    console.error('❌ Erro no upload:', error);
  }
};

testCloudinary();
```

---

## 📄 Usar Página de Teste

1. Adicione a rota no seu router:

```jsx
import TestCloudinary from '@/pages/TestCloudinary';

// Adicionar rota
<Route path="/test-cloudinary" element={<TestCloudinary />} />
```

2. Acesse: `http://localhost:5173/test-cloudinary`

3. Preencha o Upload Preset e teste!

---

## ✅ Checklist

- [ ] Variáveis de ambiente configuradas
- [ ] Upload Preset criado no Cloudinary
- [ ] Preset configurado como "Unsigned"
- [ ] Teste no console funciona
- [ ] Upload de imagem funciona

---

## 🆘 Problemas Comuns

### "Cloudinary não configurado"
→ Configure as variáveis no Vercel/Render

### "Invalid upload preset"
→ Verifique o nome do preset no Cloudinary Dashboard

### "Unauthorized"
→ Verifique se o preset está como "Unsigned"
