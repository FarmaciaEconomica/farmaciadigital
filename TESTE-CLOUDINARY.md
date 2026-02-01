# 🧪 Como Testar o Cloudinary

## 📋 Pré-requisitos

1. ✅ Conta criada no Cloudinary
2. ✅ Variáveis de ambiente configuradas
3. ✅ Upload Preset criado (se necessário)

---

## 🔧 Método 1: Teste Rápido no Console do Navegador

### No Frontend (Vercel/Local)

1. Abra o console do navegador (F12)
2. Execute:

```javascript
// Verificar se as variáveis estão configuradas
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY);

// Testar upload simples
const testUpload = async () => {
  const formData = new FormData();
  formData.append('file', new Blob(['test'], { type: 'text/plain' }), 'test.txt');
  formData.append('upload_preset', 'seu_upload_preset');
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    console.log('✅ Upload funcionou!', data);
    return data;
  } catch (error) {
    console.error('❌ Erro no upload:', error);
  }
};

testUpload();
```

---

## 🎨 Método 2: Criar Página de Teste

Crie uma página simples para testar uploads.

### Criar componente de teste:

**src/pages/TestCloudinary.jsx:**
```jsx
import { useState } from 'react';
import { uploadToCloudinary, getCloudinaryUrl } from '@/config/cloudinary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestCloudinary() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      // Testar upload
      const uploadResult = await uploadToCloudinary(file, {
        folder: 'test',
        uploadPreset: 'seu_upload_preset' // Substitua pelo seu preset
      });

      setResult(uploadResult);
      setImageUrl(uploadResult.url);
      console.log('✅ Upload bem-sucedido:', uploadResult);
    } catch (err) {
      setError(err.message);
      console.error('❌ Erro no upload:', err);
    } finally {
      setUploading(false);
    }
  };

  const testOptimizedUrl = () => {
    if (!imageUrl) return;
    
    // Testar URL otimizada
    const optimized = getCloudinaryUrl(imageUrl, {
      width: 300,
      height: 300,
      quality: 'auto',
      format: 'auto'
    });
    
    console.log('URL Original:', imageUrl);
    console.log('URL Otimizada:', optimized);
    setImageUrl(optimized);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Teste Cloudinary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Verificar variáveis de ambiente */}
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Variáveis de Ambiente:</h3>
            <p>Cloud Name: {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '❌ Não configurado'}</p>
            <p>API Key: {import.meta.env.VITE_CLOUDINARY_API_KEY ? '✅ Configurado' : '❌ Não configurado'}</p>
          </div>

          {/* Upload de arquivo */}
          <div>
            <label className="block mb-2">
              <span className="font-semibold">Selecione uma imagem:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
                className="mt-2 block w-full"
              />
            </label>
          </div>

          {/* Status */}
          {uploading && (
            <div className="p-4 bg-blue-100 rounded">
              ⏳ Fazendo upload...
            </div>
          )}

          {/* Resultado */}
          {result && (
            <div className="p-4 bg-green-100 rounded space-y-2">
              <h3 className="font-bold text-green-800">✅ Upload bem-sucedido!</h3>
              <p><strong>URL:</strong> {result.url}</p>
              <p><strong>Public ID:</strong> {result.publicId}</p>
              <p><strong>Dimensões:</strong> {result.width} x {result.height}</p>
              
              {imageUrl && (
                <div className="mt-4">
                  <img 
                    src={imageUrl} 
                    alt="Uploaded" 
                    className="max-w-md rounded shadow"
                  />
                  <Button onClick={testOptimizedUrl} className="mt-2">
                    Testar URL Otimizada
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Erro */}
          {error && (
            <div className="p-4 bg-red-100 rounded">
              <h3 className="font-bold text-red-800">❌ Erro:</h3>
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Adicionar rota (se usar React Router):

```jsx
// No seu arquivo de rotas
import TestCloudinary from '@/pages/TestCloudinary';

// Adicionar rota
<Route path="/test-cloudinary" element={<TestCloudinary />} />
```

---

## 🔌 Método 3: Teste via API Direta

### Usando cURL:

```bash
# Teste básico de upload
curl -X POST \
  https://api.cloudinary.com/v1_1/SEU_CLOUD_NAME/image/upload \
  -F "file=@/caminho/para/imagem.jpg" \
  -F "upload_preset=seu_upload_preset" \
  -F "cloud_name=SEU_CLOUD_NAME"
```

### Usando JavaScript (Console):

```javascript
// Criar um arquivo de teste
const file = new File(['test'], 'test.txt', { type: 'text/plain' });

const formData = new FormData();
formData.append('file', file);
formData.append('upload_preset', 'seu_upload_preset');
formData.append('cloud_name', 'seu_cloud_name');

fetch('https://api.cloudinary.com/v1_1/seu_cloud_name/image/upload', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => {
  console.log('✅ Sucesso:', data);
  console.log('URL:', data.secure_url);
})
.catch(err => console.error('❌ Erro:', err));
```

---

## 🧪 Método 4: Teste no Backend (Render)

### Adicionar rota de teste no backend:

**backend/server.js:**
```javascript
// Adicionar esta rota
app.get('/api/test-cloudinary', async (req, res) => {
  try {
    const cloudinary = require('cloudinary').v2;
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Teste simples: listar recursos
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 1
    });

    res.json({
      status: 'ok',
      message: 'Cloudinary configurado corretamente',
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      resources: result.resources.length
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
```

### Testar:
```bash
curl https://seu-backend.onrender.com/api/test-cloudinary
```

---

## ✅ Checklist de Verificação

### Variáveis de Ambiente:
- [ ] `VITE_CLOUDINARY_CLOUD_NAME` configurado
- [ ] `VITE_CLOUDINARY_API_KEY` configurado
- [ ] `VITE_CLOUDINARY_API_SECRET` configurado (apenas backend)

### Upload Preset:
- [ ] Upload Preset criado no Cloudinary
- [ ] Preset configurado como "Unsigned" (para uploads do frontend)
- [ ] Nome do preset anotado

### Testes:
- [ ] Upload de imagem funciona
- [ ] URL retornada é válida
- [ ] Imagem aparece no Cloudinary Dashboard
- [ ] URL otimizada funciona

---

## 🆘 Problemas Comuns

### Erro: "Cloudinary não configurado"
**Solução:** Verifique se as variáveis de ambiente estão configuradas no Vercel/Render

### Erro: "Invalid upload preset"
**Solução:** 
1. Verifique o nome do preset no Cloudinary Dashboard
2. Certifique-se que o preset está como "Unsigned"

### Erro: "Unauthorized"
**Solução:**
- Verifique se as credenciais estão corretas
- Verifique se o preset permite uploads não assinados

### Imagem não aparece
**Solução:**
- Verifique se o upload foi bem-sucedido (veja o console)
- Verifique se a URL está correta
- Teste a URL diretamente no navegador

---

## 📝 Exemplo Completo de Uso

```javascript
import { uploadToCloudinary, getCloudinaryUrl } from '@/config/cloudinary';

// Upload de imagem
const handleImageUpload = async (file) => {
  try {
    const result = await uploadToCloudinary(file, {
      folder: 'farmacia',
      uploadPreset: 'farmacia-upload'
    });
    
    console.log('Imagem enviada:', result.url);
    return result.url;
  } catch (error) {
    console.error('Erro no upload:', error);
    throw error;
  }
};

// Usar URL otimizada
const optimizedImage = getCloudinaryUrl(imageUrl, {
  width: 800,
  height: 600,
  quality: 'auto'
});
```

---

## 🎯 Teste Rápido (1 minuto)

1. Abra o console do navegador (F12)
2. Cole este código:

```javascript
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY ? '✅' : '❌');
```

Se aparecer os valores, as variáveis estão configuradas! ✅
