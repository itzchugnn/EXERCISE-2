const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares toàn cục
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health-check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'Backend API - HTTT Project',
  });
});

// Đăng ký các API Routes
app.use('/api/users', userRoutes);

// Middleware xử lý lỗi (luôn đặt ở cuối cùng)
app.use(errorHandler);

// Khởi chạy server nếu chạy trực tiếp
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`Health check endpoint: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;
