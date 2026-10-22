const db = require('../config/database');

// Model: Chịu trách nhiệm trực tiếp giao tiếp với Database (SQL queries)
const UserModel = {
  // Lấy danh sách người dùng kèm tên vai trò (JOIN query)
  async findAll() {
    const sql = `
      SELECT u.id, u.full_name, u.email, u.phone, u.is_active, u.created_at, r.name as role_name
      FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      ORDER BY u.id ASC;
    `;
    const { rows } = await db.query(sql);
    return rows;
  },

  // Tìm người dùng theo ID
  async findById(id) {
    const sql = `
      SELECT u.id, u.full_name, u.email, u.phone, u.is_active, u.created_at, r.name as role_name
      FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1;
    `;
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },

  // Tìm người dùng theo Email
  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = $1;`;
    const { rows } = await db.query(sql, [email]);
    return rows[0] || null;
  },

  // Tạo người dùng mới
  async create({ roleId, fullName, email, passwordHash, phone }) {
    const sql = `
      INSERT INTO users (role_id, full_name, email, password_hash, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, role_id, full_name, email, phone, created_at;
    `;
    const values = [roleId, fullName, email, passwordHash, phone];
    const { rows } = await db.query(sql, values);
    return rows[0];
  }
};

module.exports = UserModel;
