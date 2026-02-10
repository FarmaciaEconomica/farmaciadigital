import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
import readline from 'readline';

const { Pool } = pg;

dotenv.config();

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;

if (!pool) {
  console.error('❌ Erro: DATABASE_URL não configurado no .env');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    console.log('🔐 Criando usuário administrador...\n');
    
    const email = await question('Email do administrador: ');
    if (!email || !email.includes('@')) {
      console.error('❌ Email inválido');
      rl.close();
      process.exit(1);
    }
    
    const password = await question('Senha (mínimo 6 caracteres): ');
    if (!password || password.length < 6) {
      console.error('❌ Senha deve ter no mínimo 6 caracteres');
      rl.close();
      process.exit(1);
    }
    
    const full_name = await question('Nome completo (opcional, Enter para pular): ') || 'Administrador';
    
    // Verificar se já existe
    const existing = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    if (existing.rows.length > 0) {
      console.error('❌ Email já cadastrado');
      rl.close();
      await pool.end();
      process.exit(1);
    }
    
    // Criar usuário
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const password_hash = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO users (id, email, password_hash, full_name, role, phone) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, email.toLowerCase().trim(), password_hash, full_name, 'admin', null]
    );
    
    console.log('\n✅ Usuário admin criado com sucesso!');
    console.log(`   Email: ${email}`);
    console.log(`   Nome: ${full_name}`);
    console.log(`   Role: admin\n`);
    
    rl.close();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error.message);
    rl.close();
    await pool.end();
    process.exit(1);
  }
}

// Garantir que a tabela existe
pool.query(`
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
`).then(() => {
  createAdmin();
}).catch(err => {
  console.error('❌ Erro ao criar tabela:', err.message);
  process.exit(1);
});
