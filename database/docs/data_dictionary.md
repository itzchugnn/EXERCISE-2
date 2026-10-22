# 📚 TỪ ĐIỂN DỮ LIỆU (DATA DICTIONARY)

Tài liệu này quy chuẩn cấu trúc cơ sở dữ liệu của dự án để tất cả các thành viên trong nhóm thống nhất khi viết code Backend và truy vấn SQL.

---

## 1. Bảng `roles` (Vai trò)
- **Mục đích**: Quản lý phân quyền người dùng trong hệ thống.
- **Khóa chính**: `id`

| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL / INT | PRIMARY KEY, AUTO_INCREMENT | Mã định danh vai trò |
| `name` | VARCHAR(50) | NOT NULL, UNIQUE | Tên vai trò (ADMIN, STAFF, USER) |
| `description` | TEXT | NULLABLE | Mô tả chi tiết quyền hạn |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo |

---

## 2. Bảng `users` (Người dùng)
- **Mục đích**: Lưu trữ thông tin tài khoản và định danh người dùng.
- **Khóa chính**: `id`
- **Khóa ngoại**: `role_id` tham chiếu `roles(id)`

| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa / Ghi chú |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL / INT | PRIMARY KEY, AUTO_INCREMENT | Mã định danh người dùng |
| `role_id` | INT | FOREIGN KEY REFERENCES `roles(id)` | Quyền của người dùng |
| `full_name` | VARCHAR(100) | NOT NULL | Họ và tên hiển thị |
| `email` | VARCHAR(150) | NOT NULL, UNIQUE, INDEXED | Địa chỉ email dùng để đăng nhập |
| `password_hash` | VARCHAR(255) | NOT NULL | Mật khẩu đã được mã hóa (Bcrypt) |
| `phone` | VARCHAR(20) | NULLABLE | Số điện thoại liên lạc |
| `is_active` | BOOLEAN | DEFAULT TRUE | Trạng thái tài khoản (Active / Banned) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Thời điểm đăng ký |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Thời điểm cập nhật thông tin gần nhất |

---

## 3. Quy ước thiết kế CSDL trong nhóm (Database Conventions)
1. **Đặt tên bảng**: Chữ thường, số nhiều, snake_case (VD: `users`, `order_details`, `products`).
2. **Khóa chính**: Luôn đặt là `id` (`INT` hoặc `UUID`).
3. **Khóa ngoại**: Có định dạng `[tên_bảng_số_ít]_id` (VD: `role_id`, `user_id`).
4. **Audit Columns**: Mọi bảng dữ liệu chính đều nên có `created_at` và `updated_at`.
5. **Chỉ mục (Index)**: Đánh index cho các trường thường xuyên `WHERE`, `JOIN` hoặc `ORDER BY`.
