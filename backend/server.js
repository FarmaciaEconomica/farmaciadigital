import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Pool } = pg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const JWT_SECRET = process.env.JWT_SECRET || 'farmacia-digital-secret-change-in-production';

// Pool de conexão PostgreSQL
let pool = null;
const usePostgres = !!process.env.DATABASE_URL;

if (usePostgres) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  pool.on('error', (err) => console.error('Erro inesperado no pool:', err));
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// ========== Tabela users e funções de auth ==========
async function ensureUsersTable() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(100) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255),
      role VARCHAR(50) DEFAULT 'customer',
      phone VARCHAR(50),
      created_date TIMESTAMP DEFAULT NOW(),
      updated_date TIMESTAMP DEFAULT NOW()
    )
  `);
}

async function findUserByEmail(email) {
  if (!pool) return null;
  const r = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
  return r.rows[0] || null;
}

async function findUserById(id) {
  if (!pool) return null;
  const r = await pool.query('SELECT id, email, full_name, role, phone, created_date FROM users WHERE id = $1', [id]);
  return r.rows[0] || null;
}

async function createUser({ email, password, full_name, role = 'customer', phone }) {
  if (!pool) throw new Error('Database not configured');
  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const password_hash = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO users (id, email, password_hash, full_name, role, phone) VALUES ($1, $2, $3, $4, $5, $6)',
    [id, email.toLowerCase().trim(), password_hash, full_name || null, role, phone || null]
  );
  return findUserById(id);
}

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token não informado' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

// ========== Funções de persistência PostgreSQL ==========

async function getProductsFromDB(filters = {}) {
  if (!pool) return [];
  const { status, category, search } = filters;
  
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  let paramIndex = 1;

  if (status) {
    query += ` AND status = $${paramIndex++}`;
    params.push(status);
  }
  if (category) {
    query += ` AND category = $${paramIndex++}`;
    params.push(category);
  }
  if (search) {
    query += ` AND (LOWER(name) LIKE $${paramIndex} OR LOWER(sku) LIKE $${paramIndex} OR LOWER(barcode) LIKE $${paramIndex})`;
    params.push(`%${search.toLowerCase()}%`);
    paramIndex++;
  }

  const result = await pool.query(query, params);
  return result.rows.map(rowToProduct);
}

async function getProductByIdFromDB(id) {
  if (!pool) return null;
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0] ? rowToProduct(result.rows[0]) : null;
}

async function createProductInDB(product) {
  if (!pool) throw new Error('Database not configured');
  
  const { id, name, description, price, sku, barcode, category, stock, status, image_url, created_date, updated_date, ...extra } = product;
  
  await pool.query(
    `INSERT INTO products (id, name, description, price, sku, barcode, category, stock, status, image_url, created_date, updated_date, data)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
    [
      id,
      name || '',
      description || null,
      price ?? null,
      sku || null,
      barcode || null,
      category || null,
      stock ?? 0,
      status || 'active',
      image_url || null,
      created_date || new Date().toISOString(),
      updated_date || new Date().toISOString(),
      Object.keys(extra).length ? JSON.stringify(extra) : null
    ]
  );
}

async function updateProductInDB(id, product) {
  if (!pool) throw new Error('Database not configured');
  
  const { name, description, price, sku, barcode, category, stock, status, image_url, created_date, ...extra } = product;
  const updated_date = new Date().toISOString();
  const dataJson = Object.keys(extra).length ? JSON.stringify(extra) : null;

  await pool.query(
    `UPDATE products SET 
      name = $2, description = $3, price = $4, sku = $5, barcode = $6,
      category = $7, stock = $8, status = $9, image_url = $10,
      updated_date = $11, data = $12
    WHERE id = $1`,
    [
      id,
      name ?? '',
      description ?? null,
      price ?? null,
      sku ?? null,
      barcode ?? null,
      category ?? null,
      stock ?? 0,
      status ?? 'active',
      image_url ?? null,
      updated_date,
      dataJson
    ]
  );
}

async function deleteProductFromDB(id) {
  if (!pool) throw new Error('Database not configured');
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

function rowToProduct(row) {
  const product = {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price ? parseFloat(row.price) : row.price,
    sku: row.sku,
    barcode: row.barcode,
    category: row.category,
    stock: row.stock ?? 0,
    status: row.status || 'active',
    image_url: row.image_url,
    created_date: row.created_date?.toISOString?.() || row.created_date,
    updated_date: row.updated_date?.toISOString?.() || row.updated_date
  };
  if (row.data && typeof row.data === 'object') {
    Object.assign(product, row.data);
  }
  return product;
}

async function getCategoriesFromDB() {
  if (!pool) return [];
  const result = await pool.query('SELECT * FROM categories ORDER BY name');
  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    ...(row.data && typeof row.data === 'object' ? row.data : {})
  }));
}

// ========== Health check ==========
app.get('/api/health', async (req, res) => {
  let productsCount = 0;
  if (pool) {
    try {
      const result = await pool.query('SELECT COUNT(*) as count FROM products');
      productsCount = parseInt(result.rows[0]?.count || 0, 10);
    } catch (e) {
      console.error('Erro no health check:', e);
    }
  }
  res.json({ 
    status: 'ok', 
    message: 'API funcionando',
    timestamp: new Date().toISOString(),
    productsCount,
    database: usePostgres ? 'postgresql' : 'none'
  });
});

// ========== Rotas de produtos ==========
app.get('/api/products', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Database not configured. Set DATABASE_URL.' });
    }
    const products = await getProductsFromDB(req.query);
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Database not configured. Set DATABASE_URL.' });
    }
    const product = await getProductByIdFromDB(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Database not configured. Set DATABASE_URL.' });
    }
    const data = req.body;
    const product = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
    await createProductInDB(product);
    console.log(`✅ Produto criado: ${product.id} - ${product.name}`);
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Database not configured. Set DATABASE_URL.' });
    }
    const existing = await getProductByIdFromDB(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    const updatedProduct = {
      ...existing,
      ...req.body,
      id: req.params.id,
      updated_date: new Date().toISOString()
    };
    await updateProductInDB(req.params.id, updatedProduct);
    console.log(`✅ Produto atualizado: ${updatedProduct.id} - ${updatedProduct.name}`);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Database not configured. Set DATABASE_URL.' });
    }
    const existing = await getProductByIdFromDB(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    await deleteProductFromDB(req.params.id);
    console.log(`✅ Produto deletado: ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

// ========== Rotas de pedidos ==========
app.get('/api/orders', (req, res) => {
  res.json({ orders: [] });
});

app.post('/api/orders', (req, res) => {
  res.json({ success: true, order: req.body });
});

// ========== Rotas de categorias ==========
app.get('/api/categories', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Database not configured. Set DATABASE_URL.' });
    }
    let categories = await getCategoriesFromDB();
    if (categories.length === 0) {
      const defaultCategories = [
        { id: 'cat_1', name: 'Medicamentos', slug: 'medicamentos' },
        { id: 'cat_2', name: 'Dermocosméticos', slug: 'dermocosmeticos' },
        { id: 'cat_3', name: 'Vitaminas', slug: 'vitaminas' },
        { id: 'cat_4', name: 'Higiene', slug: 'higiene' },
        { id: 'cat_5', name: 'Infantil', slug: 'infantil' }
      ];
      for (const cat of defaultCategories) {
        try {
          await pool.query(
            'INSERT INTO categories (id, name, slug) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
            [cat.id, cat.name, cat.slug]
          );
        } catch (e) {
          // ignore duplicate
        }
      }
      categories = await getCategoriesFromDB();
    }
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

// ========== Rotas de autenticação ==========
app.post('/api/auth/register', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Cadastro indisponível. Configure DATABASE_URL.' });
    }
    const { email, password, full_name, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    const user = await createUser({
      email,
      password,
      full_name: full_name || null,
      role: 'customer',
      phone: phone || null
    });
    const token = createToken(user);
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        phone: user.phone
      },
      token
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    if (!usePostgres) {
      return res.status(503).json({ error: 'Login indisponível. Configure DATABASE_URL.' });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    const userRow = await findUserByEmail(email);
    if (!userRow) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    const r = await pool.query('SELECT password_hash FROM users WHERE id = $1', [userRow.id]);
    const match = await bcrypt.compare(password, r.rows[0].password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    const user = await findUserById(userRow.id);
    const token = createToken(user);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        phone: user.phone
      },
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// ========== Encerrar conexão ao fechar ==========
process.on('SIGTERM', async () => {
  console.log('🛑 Encerrando servidor...');
  if (pool) {
    await pool.end();
  }
  process.exit(0);
});

// ========== Iniciar servidor ==========
app.listen(PORT, async () => {
  let dbStatus = 'Nenhum (configure DATABASE_URL)';
  let productsCount = 0;
  
  if (pool) {
    try {
      await ensureUsersTable();
      const userCount = await pool.query('SELECT COUNT(*) as c FROM users');
      if (parseInt(userCount.rows[0]?.c || 0, 10) === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
        await createUser({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          full_name: 'Administrador',
          role: 'admin'
        });
        console.log('✅ Primeiro usuário admin criado:', process.env.ADMIN_EMAIL);
      }
      const result = await pool.query('SELECT COUNT(*) as count FROM products');
      productsCount = parseInt(result.rows[0]?.count || 0, 10);
      dbStatus = 'PostgreSQL conectado';
    } catch (e) {
      dbStatus = `Erro: ${e.message}`;
      console.error('Erro ao conectar ao banco:', e);
    }
  }

  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Frontend configurado: ${process.env.FRONTEND_URL || 'Nenhum (aceita todas as origens)'}`);
  console.log(`☁️ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME || 'Não configurado'}`);
  console.log(`💾 Persistência: ${dbStatus} (${productsCount} produtos)`);
});
