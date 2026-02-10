# Como Criar Usuário Administrador

Existem duas formas de criar seu usuário administrador:

## Opção 1: Via Endpoint HTTP (Recomendado)

1. **Inicie o servidor backend** (se ainda não estiver rodando):
   ```bash
   cd backend
   npm start
   ```

2. **Faça uma requisição POST** para criar o admin. Você pode usar:
   - **Postman** ou **Insomnia**
   - **curl** no terminal
   - **fetch** no console do navegador

### Exemplo com curl:
```bash
curl -X POST http://localhost:10000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu-email@farmacia.com",
    "password": "sua-senha-segura",
    "full_name": "Seu Nome"
  }'
```

### Exemplo com fetch (no console do navegador):
```javascript
fetch('http://localhost:10000/api/auth/create-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'seu-email@farmacia.com',
    password: 'sua-senha-segura',
    full_name: 'Seu Nome'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### Resposta de sucesso:
```json
{
  "success": true,
  "message": "Usuário admin criado com sucesso",
  "user": {
    "id": "user_...",
    "email": "seu-email@farmacia.com",
    "full_name": "Seu Nome",
    "role": "admin"
  },
  "token": "jwt-token-aqui"
}
```

## Opção 2: Via Interface Web (Mais Fácil)

1. **Inicie o servidor backend** (se ainda não estiver rodando):
   ```bash
   cd backend
   npm start
   ```

2. **Abra o arquivo HTML** no navegador:
   - Abra o arquivo `backend/create-admin.html` diretamente no navegador
   - Ou sirva via servidor HTTP local

3. **Preencha o formulário**:
   - Email do administrador
   - Senha (mínimo 6 caracteres)
   - Nome completo (opcional)

4. **Clique em "Criar Administrador"**

A interface mostrará uma mensagem de sucesso ou erro.

## Opção 3: Via Script de Linha de Comando

1. **Navegue até a pasta backend**:
   ```bash
   cd backend
   ```

2. **Execute o script**:
   ```bash
   npm run create-admin
   ```

3. **Siga as instruções** que aparecerão no terminal:
   - Digite o email do administrador
   - Digite a senha (mínimo 6 caracteres)
   - Digite o nome completo (opcional)

### Exemplo de execução:
```
🔐 Criando usuário administrador...

Email do administrador: admin@farmacia.com
Senha (mínimo 6 caracteres): senha123456
Nome completo (opcional, Enter para pular): Administrador Principal

✅ Usuário admin criado com sucesso!
   Email: admin@farmacia.com
   Nome: Administrador Principal
   Role: admin
```

## Após Criar o Admin

1. **Acesse a tela de login admin** no frontend: `/AdminLogin`
2. **Use as credenciais** que você acabou de criar
3. **Você terá acesso total** ao painel administrativo

## Importante

- ⚠️ **Segurança**: Após criar o primeiro admin, considere remover ou proteger o endpoint `/api/auth/create-admin` no arquivo `backend/server.js`
- 🔒 **Senha forte**: Use uma senha segura com pelo menos 6 caracteres (recomendado: 8+ caracteres com letras, números e símbolos)
- 📧 **Email único**: Cada email só pode ser cadastrado uma vez

## Solução de Problemas

### Erro: "Database not configured"
- Verifique se a variável `DATABASE_URL` está configurada no arquivo `.env` do backend

### Erro: "Email já cadastrado"
- O email já existe no banco de dados. Use outro email ou faça login com as credenciais existentes

### Erro: "Senha deve ter no mínimo 6 caracteres"
- Use uma senha com pelo menos 6 caracteres
