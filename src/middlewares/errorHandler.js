// Middleware xử lý lỗi tập trung cho toàn bộ ứng dụng
function errorHandler(err, req, res, next) {
  console.error('❌ Server Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi máy chủ nội bộ (Internal Server Error)';

  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message: message,
      // Ẩn stack trace khi ở môi trường production
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
}

module.exports = errorHandler;
