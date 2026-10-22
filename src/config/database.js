const { Pool } = require('pg');
require('dotenv').config();

// Cấu hình Connection Pool đến cơ sở dữ liệu
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'project_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20, // Số lượng connection tối đa trong pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('✅ Đã kết nối thành công đến Database Pool');
});

pool.on('error', (err) => {
  console.error('❌ Lỗi bất ngờ trên Database Pool:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
