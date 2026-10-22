-- ========================================================
-- SEED DATA (DỮ LIỆU MẪU BAN ĐẦU)
-- Dùng để các thành viên trong nhóm nạp nhanh dữ liệu test
-- ========================================================

-- Nạp Roles mẫu
INSERT INTO roles (name, description) VALUES
('ADMIN', 'Quản trị viên toàn hệ thống'),
('STAFF', 'Nhân viên vận hành'),
('USER', 'Người dùng thông thường / Khách hàng')
ON CONFLICT (name) DO NOTHING;

-- Nạp Users mẫu (Mật khẩu hash mẫu cho pass: 'password123')
INSERT INTO users (role_id, full_name, email, password_hash, phone) VALUES
(1, 'Administrator', 'admin@example.com', '$2b$10$wT0o3qA54/pZ8v4m.91YgOWZ6L0HqNn2kFf7qG9XqQv4QpWk8P1.y', '0901234567'),
(2, 'Nhân viên hỗ trợ', 'staff@example.com', '$2b$10$wT0o3qA54/pZ8v4m.91YgOWZ6L0HqNn2kFf7qG9XqQv4QpWk8P1.y', '0912345678'),
(3, 'Nguyễn Văn A', 'user_a@example.com', '$2b$10$wT0o3qA54/pZ8v4m.91YgOWZ6L0HqNn2kFf7qG9XqQv4QpWk8P1.y', '0987654321')
ON CONFLICT (email) DO NOTHING;
