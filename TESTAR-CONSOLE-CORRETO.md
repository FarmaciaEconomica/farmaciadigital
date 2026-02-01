# 🧪 Como Testar Corretamente no Console

## ⚠️ Erro Comum

Se você tentar colar código como:
```javascript
VITE_CLOUDINARY_CLOUD_NAME = dqtfaco8b
```

Isso vai dar erro porque não é código JavaScript válido no console.

---

## ✅ Forma Correta de Testar

### Opção 1: Verificar Variáveis (Recomendado)

No console, execute:

```javascript
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY ? '✅' : '❌');
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
```

**Nota:** Se der erro "Cannot use 'import.meta' outside a module", é normal. As variáveis só funcionam no código da aplicação, não no console diretamente.

---

### Opção 2: Verificar Logs Automáticos

Os logs automáticos devem aparecer quando a página carrega. Se não aparecerem:

1. **Recarregue a página** (Ctrl+Shift+R)
2. **Verifique se o redeploy foi feito** após adicionar variáveis
3. **Verifique se está na URL correta do Vercel**

**O que deve aparecer automaticamente:**

```
🔍 ===== Cloudinary Config Check =====
Cloud Name: dqtfaco8b
API Key: ✅ Configurado
Upload Preset: farmacia-upload
Vai usar Cloudinary? ✅ SIM
=====================================
```

---

### Opção 3: Testar Upload Real

A melhor forma de testar é fazer upload de uma imagem real na aplicação:

1. Acesse uma página que permite upload
2. Selecione uma imagem
3. Veja os logs no console:
   - Deve aparecer: `☁️ Tentando upload no Cloudinary...`
   - Deve aparecer: `✅ Upload bem-sucedido!`
   - A URL deve ser do Cloudinary (res.cloudinary.com)

---

## 🔍 Por Que `import.meta.env` Não Funciona no Console?

O `import.meta.env` só funciona dentro de módulos JavaScript. Quando você cola código diretamente no console, ele não está em um módulo, então não funciona.

**Solução:** As variáveis são injetadas pelo Vite durante o build. Elas só estão disponíveis no código da aplicação, não no console diretamente.

---

## ✅ Forma Mais Fácil de Verificar

1. **Recarregue a página** (Ctrl+Shift+R)
2. **Veja os logs automáticos** que aparecem ao carregar
3. Se aparecer "Vai usar Cloudinary? ✅ SIM", está funcionando!

---

## 📋 Checklist

- [ ] Variáveis configuradas no Vercel (com `VITE_`)
- [ ] Redeploy feito após adicionar variáveis
- [ ] Cache limpo (Ctrl+Shift+R)
- [ ] Logs automáticos aparecem ao carregar página
- [ ] Teste de upload funciona

---

## 🆘 Se Logs Não Aparecerem

1. **Verifique se o redeploy foi concluído**
2. **Verifique se está na URL correta do Vercel**
3. **Limpe cache completamente:**
   - Ctrl+Shift+Delete
   - Selecione "Imagens e arquivos em cache"
   - Limpe
4. **Recarregue a página** (Ctrl+Shift+R)

Se ainda não aparecer, as variáveis podem não ter sido injetadas corretamente. Verifique se o redeploy foi feito.
