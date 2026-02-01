# 🔧 Corrigir Erros de Blob URLs

## ⚠️ Problema

O código está usando `URL.createObjectURL()` que cria blob URLs locais. Essas URLs:
- ❌ Não funcionam em produção
- ❌ São temporárias e expiram
- ❌ Causam erro `ERR_FILE_NOT_FOUND`

## ✅ Solução

Atualizei `src/api/localApi.js` para usar Cloudinary quando disponível.

### O que foi alterado:

1. **UploadFile** e **UploadPrivateFile** agora:
   - ✅ Tentam usar Cloudinary primeiro
   - ✅ Usam blob URL apenas em desenvolvimento (fallback)
   - ✅ Usam placeholder se nada funcionar

---

## 🔧 Configuração Necessária

### 1. Adicionar Upload Preset nas Variáveis de Ambiente

No **Vercel**, adicione:

```
VITE_CLOUDINARY_UPLOAD_PRESET=nome_do_seu_preset
```

### 2. Criar Upload Preset no Cloudinary

1. Acesse [cloudinary.com/console](https://cloudinary.com/console)
2. Vá em **Settings → Upload**
3. Clique em **Add upload preset**
4. Configure:
   - **Preset name:** `farmacia-upload` (ou outro nome)
   - **Signing mode:** `Unsigned` (para uploads do frontend)
   - **Folder:** `uploads` (opcional)
5. Salve

### 3. Adicionar Variável no Vercel

No painel do Vercel:
- **Environment Variables**
- Adicione: `VITE_CLOUDINARY_UPLOAD_PRESET=farmacia-upload`
- Faça redeploy

---

## 🧪 Testar

### 1. Verificar se Cloudinary está configurado:

No console do navegador:
```javascript
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
```

### 2. Testar upload:

Use a página de teste: `/test-cloudinary`

Ou teste diretamente:
```javascript
import { uploadToCloudinary } from '@/config/cloudinary';

const file = // seu arquivo
const result = await uploadToCloudinary(file, {
  folder: 'uploads',
  uploadPreset: 'farmacia-upload'
});
console.log('URL:', result.url);
```

---

## 📋 Checklist

- [ ] Upload Preset criado no Cloudinary
- [ ] Preset configurado como "Unsigned"
- [ ] Variável `VITE_CLOUDINARY_UPLOAD_PRESET` adicionada no Vercel
- [ ] Redeploy feito no Vercel
- [ ] Teste de upload funcionando
- [ ] Blob URLs não aparecem mais nos erros

---

## 🆘 Se Ainda Der Erro

### Verificar logs:
1. Abra o Console do navegador (F12)
2. Veja se há erros de Cloudinary
3. Verifique se as variáveis estão carregadas

### Verificar variáveis:
```javascript
// No console
Object.keys(import.meta.env).filter(k => k.includes('CLOUDINARY'))
```

Deve mostrar:
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_API_KEY`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

---

## 🔄 Próximos Passos

Depois de configurar:
1. ✅ Blob URLs não devem mais aparecer
2. ✅ Imagens devem ser salvas no Cloudinary
3. ✅ URLs devem ser permanentes (cloudinary.com)
4. ✅ Logs do Render não devem mostrar blob URLs
