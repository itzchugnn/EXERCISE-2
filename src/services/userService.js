const UserModel = require('../models/userModel');

// Service: Chịu trách nhiệm xử lý nghiệp vụ logic (Business Logic)
const UserService = {
  async getAllUsers() {
    return await UserModel.findAll();
  },

  async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      const error = new Error('Không tìm thấy người dùng với ID đã cung cấp');
      error.statusCode = 404;
      throw error;
    }
    return user;
  },

  async registerUser(userData) {
    // 1. Kiểm tra email đã tồn tại hay chưa
    const existing = await UserModel.findByEmail(userData.email);
    if (existing) {
      const error = new Error('Email này đã được sử dụng');
      error.statusCode = 409;
      throw error;
    }

    // 2. Thực tế sẽ hash password ở đây trước khi lưu
    // Ví dụ: const passwordHash = await bcrypt.hash(userData.password, 10);
    const passwordHash = 'dummy_hash_' + userData.password;

    // 3. Gọi Model để insert vào DB
    return await UserModel.create({
      roleId: userData.roleId || 3, // Mặc định role USER
      fullName: userData.fullName,
      email: userData.email,
      passwordHash: passwordHash,
      phone: userData.phone || null,
    });
  }
};

module.exports = UserService;
