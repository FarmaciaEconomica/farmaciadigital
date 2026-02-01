# 🔧 Como Criar/Configurar Upload Preset no Cloudinary

## 🎯 Objetivo

Criar ou editar o preset `farmacia-upload` como **"Unsigned"** para permitir uploads do frontend.

---

## 📋 Passo a Passo

### 1. Acessar Cloudinary

1. Acesse: https://cloudinary.com/console
2. Faça login
3. Selecione a conta `dqtfaco8b` (se tiver múltiplas contas)

### 2. Ir em Upload Presets

1. No menu lateral esquerdo, clique em **Settings**
2. Clique em **Upload**
3. Role até **Upload presets**
4. Clique na aba **Upload Presets**

### 3. Criar ou Editar Preset

#### Se o preset `farmacia-upload` NÃO existe:

1. Clique no botão **"+ Add Upload Preset"** (canto superior direito)
2. Preencha:

**Preset name:**
```
farmacia-upload
```

**Signing mode:**
```
Unsigned  ⚠️ MUITO IMPORTANTE!
```

**Outras configurações (opcionais):**

- **Folder:** `farmacia-digital` (opcional, organiza os arquivos)
- **Allowed formats:** `jpg,png,webp` (opcional, limita formatos)
- **Max file size:** `10MB` (opcional)
- **Use filename:** `false` (recomendado)
- **Unique filename:** `true` (recomendado)

3. Clique em **Save**

#### Se o preset `farmacia-upload` JÁ existe:

1. Clique no preset `farmacia-upload` na lista
2. Verifique **Signing mode**
3. Se estiver como **"Signed"**, mude para **"Unsigned"**
4. Clique em **Save**

---

## ⚠️ Configurações Críticas

### ✅ Deve Estar Assim:

```
Preset name: farmacia-upload
Signing mode: Unsigned  ← CRÍTICO!
```

### ❌ NÃO Pode Estar Assim:

```
Signing mode: Signed  ← Isso vai dar erro!
```

---

## 🧪 Testar Após Configurar

1. No seu site, tente fazer upload de uma imagem
2. Veja os logs no console:

**Se funcionar:**
```
✅ Upload bem-sucedido! { url: 'https://res.cloudinary.com/...' }
```

**Se ainda falhar:**
```
❌ Erro: Invalid upload preset
```

Nesse caso, verifique:
- Nome do preset está exato: `farmacia-upload`
- Preset está como "Unsigned"
- Preset existe na conta `dqtfaco8b`

---

## 📋 Checklist

- [ ] Acessar Cloudinary Dashboard
- [ ] Ir em Settings → Upload → Upload Presets
- [ ] Verificar se `farmacia-upload` existe
- [ ] Se não existe, criar como "Unsigned"
- [ ] Se existe, verificar se está como "Unsigned"
- [ ] Se estiver "Signed", mudar para "Unsigned"
- [ ] Salvar
- [ ] Testar upload no site

---

## 🆘 Problemas Comuns

### Problema 1: Não encontra o preset

**Solução:**
- Verifique se está na conta correta (`dqtfaco8b`)
- Use a busca na página de presets

### Problema 2: Não consegue mudar para "Unsigned"

**Solução:**
- Alguns presets podem estar bloqueados
- Crie um novo preset com nome diferente
- Ou delete o antigo e crie novo

### Problema 3: Preset existe mas upload ainda falha

**Solução:**
- Verifique se o nome está EXATO: `farmacia-upload` (case-sensitive)
- Verifique se está na conta correta
- Limpe cache do navegador e teste novamente

---

## ✅ Resumo

1. **Acessar:** Cloudinary Dashboard
2. **Ir em:** Settings → Upload → Upload Presets
3. **Criar/Editar:** `farmacia-upload` como **"Unsigned"**
4. **Salvar**
5. **Testar** upload no site

**Pronto!** 🎉
