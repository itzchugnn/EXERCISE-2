const UserService = require('../services/userService');

// Controller: Chịu trách nhiệm nhận HTTP Request, gọi Service và trả về HTTP Response
const UserController = {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        total: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  async createUser(req, res, next) {
    try {
      const { fullName, email, password, phone, roleId } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp đầy đủ fullName, email và password',
        });
      }

      const newUser = await UserService.registerUser({ fullName, email, password, phone, roleId });
      res.status(201).json({
        success: true,
        message: 'Tạo người dùng thành công',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = UserController;
