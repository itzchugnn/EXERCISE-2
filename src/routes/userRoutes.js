const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Định nghĩa các endpoint RESTful cho tài nguyên Users
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);

module.exports = router;
