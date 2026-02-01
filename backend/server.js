import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rotas de produtos
app.get('/api/products', (req, res) => {
  // TODO: Implementar lógica de produtos
  res.json({ products: [] });
});

app.post('/api/products', (req, res) => {
  // TODO: Implementar criação de produto
  res.json({ success: true, product: req.body });
});

// Rotas de pedidos
app.get('/api/orders', (req, res) => {
  // TODO: Implementar lógica de pedidos
  res.json({ orders: [] });
});

app.post('/api/orders', (req, res) => {
  // TODO: Implementar criação de pedido
  res.json({ success: true, order: req.body });
});

// Rotas de categorias
app.get('/api/categories', (req, res) => {
  res.json({ categories: [] });
});

// Rotas de autenticação
app.post('/api/auth/login', (req, res) => {
  // TODO: Implementar autenticação
  res.json({ success: true, user: req.body });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
