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

// Armazenamento em memória (temporário - migrar para banco de dados depois)
let productsStore = [];
let categoriesStore = [];

// Rotas de produtos
app.get('/api/products', (req, res) => {
  try {
    const { status, category, search } = req.query;
    let products = [...productsStore];
    
    // Filtros
    if (status) {
      products = products.filter(p => p.status === status);
    }
    if (category) {
      products = products.filter(p => p.category === category);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name?.toLowerCase().includes(searchLower) ||
        p.sku?.toLowerCase().includes(searchLower) ||
        p.barcode?.toLowerCase().includes(searchLower)
      );
    }
    
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = productsStore.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const data = req.body;
    const product = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
    productsStore.push(product);
    console.log(`✅ Produto criado: ${product.id} - ${product.name}`);
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const index = productsStore.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    const updatedProduct = {
      ...productsStore[index],
      ...req.body,
      id: req.params.id,
      updated_date: new Date().toISOString()
    };
    productsStore[index] = updatedProduct;
    console.log(`✅ Produto atualizado: ${updatedProduct.id} - ${updatedProduct.name}`);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const index = productsStore.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    productsStore.splice(index, 1);
    console.log(`✅ Produto deletado: ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
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
  try {
    // Se não houver categorias, retornar padrões
    if (categoriesStore.length === 0) {
      const defaultCategories = [
        { id: 'cat_1', name: 'Medicamentos', slug: 'medicamentos' },
        { id: 'cat_2', name: 'Dermocosméticos', slug: 'dermocosmeticos' },
        { id: 'cat_3', name: 'Vitaminas', slug: 'vitaminas' },
        { id: 'cat_4', name: 'Higiene', slug: 'higiene' },
        { id: 'cat_5', name: 'Infantil', slug: 'infantil' }
      ];
      categoriesStore = defaultCategories;
    }
    res.json(categoriesStore);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
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
  console.log(`🌐 URL pública: https://farmacia-digital-1.onrender.com`);
  console.log(`🔗 Frontend configurado: ${process.env.FRONTEND_URL || 'Nenhum (aceita todas as origens)'}`);
  console.log(`☁️ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME || 'Não configurado'}`);
});
