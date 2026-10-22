# Dự Án Hệ Thống Thông Tin - Web Backend & Database

Dự án phát triển ứng dụng Web tập trung vào thiết kế cơ sở dữ liệu quan hệ và kiến trúc Backend phân tầng (Layered Architecture: Controller - Service - Model) dành cho môn học chuyên ngành Hệ thống Thông tin (HTTT).

---

## Thành viên & Đóng góp
- **Chủ dự án (Author)**: Trần Nguyễn Công Chung
- **Cộng tác viên (Collaborators)**: Nhóm sinh viên HTTT

---

## Cấu trúc thư mục dự án

```text
EXERCISE-2-main/
├── .github/                     # Cấu hình GitHub (Issue & Pull Request templates)
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── database/                    # Quản lý Cơ sở dữ liệu (Database)
│   ├── docs/
│   │   └── data_dictionary.md   # Từ điển dữ liệu (Data Dictionary chuẩn HTTT)
│   ├── schema/
│   │   └── 01_initial_schema.sql# DDL: Khởi tạo bảng, khóa chính/ngoại, index
│   └── seeds/
│       └── 01_sample_data.sql   # DML: Dữ liệu mẫu ban đầu để test
├── local/                       # THƯ MỤC CÁ NHÂN (Được Git ignore hoàn toàn)
│   └── README_LOCAL.md          # Lưu query nháp, test riêng, không bao giờ bị push
├── src/                         # Mã nguồn Backend (Layered Architecture)
│   ├── config/                  # Cấu hình Database Pool & biến môi trường
│   │   └── database.js
│   ├── controllers/             # Nhận Request, trả lời Response (HTTP status)
│   │   └── userController.js
│   ├── middlewares/             # Xác thực (Auth), Xử lý lỗi (Error Handler)
│   │   └── errorHandler.js
│   ├── models/                  # Tầng truy vấn CSDL (SQL queries / Repository)
│   │   └── userModel.js
│   ├── routes/                  # Định tuyến các API endpoints
│   │   └── userRoutes.js
│   ├── services/                # Tầng nghiệp vụ logic (Business logic)
│   │   └── userService.js
│   └── app.js                   # Entry point của ứng dụng
├── .env.example                 # Mẫu khai báo biến môi trường (Database credentials)
├── .gitignore                   # Cấu hình loại bỏ file rác, .env và thư mục local/
├── package.json                 # Quản lý thư viện và scripts
└── README.md                    # Tài liệu hướng dẫn dự án
```

---

## Thư mục `local/` (Dành riêng cho cá nhân)
Thư mục `local/` đã được thêm vào file [`.gitignore`](file:///e:/EXERCISE-2-main/.gitignore).
- Mọi file, thư mục con, script test nhanh, file backup CSDL bạn tạo bên trong `local/` đều **sẽ không bao giờ được Git quét qua**.
- Bạn có thể thoải mái thực hiện `git add .`, `git commit` và `git push` mà không lo bị lộ file nháp hoặc dữ liệu test cá nhân lên GitHub.

---

## Hướng dẫn cài đặt và chạy cho thành viên nhóm

### 1. Sao chép và cấu hình biến môi trường
Mỗi thành viên tự tạo 1 file `.env` ở thư mục gốc (không commit file này lên git):
```bash
cp .env.example .env
```
Mở file `.env` và điền thông tin kết nối CSDL (User, Password, Port, Database name) của máy cá nhân bạn.

### 2. Thiết lập Cơ sở dữ liệu (PostgreSQL / MySQL)
1. Mở công cụ quản lý CSDL (pgAdmin, DBeaver, hoặc terminal).
2. Tạo database mới (ví dụ: `project_db`).
3. Thực thi file khởi tạo bảng:
   - Chạy script [`database/schema/01_initial_schema.sql`](file:///e:/EXERCISE-2-main/database/schema/01_initial_schema.sql)
4. Nạp dữ liệu mẫu ban đầu:
   - Chạy script [`database/seeds/01_sample_data.sql`](file:///e:/EXERCISE-2-main/database/seeds/01_sample_data.sql)
5. Tham khảo cấu trúc chi tiết tại [`database/docs/data_dictionary.md`](file:///e:/EXERCISE-2-main/database/docs/data_dictionary.md).

### 3. Cài đặt thư viện và khởi động Server
```bash
# Cài đặt các dependencies
npm install

# Khởi chạy server ở chế độ development (tự reload khi sửa code)
npm run dev

# Hoặc chạy thông thường:
npm start
```
Kiểm tra API hoạt động tại:
- Health check: `GET http://localhost:5000/api/health`
- Danh sách Users: `GET http://localhost:5000/api/users`

---

## Quy trình làm việc nhóm trên GitHub (Git Flow)

1. **Tuyệt đối không push trực tiếp lên nhánh `main`**.
2. **Quy tắc tạo nhánh (Branching)**:
   - Tính năng mới: `feat/<tên-tính-năng>` (VD: `feat/user-login`, `feat/order-api`)
   - Sửa lỗi: `fix/<tên-lỗi>` (VD: `fix/db-connection-timeout`)
   - Database / Migration: `db/<tên-task>` (VD: `db/add-product-table`)
3. **Quy trình đẩy code**:
   ```bash
   git checkout -b feat/my-feature
   # Thực hiện code...
   git add .
   git commit -m "feat: thêm API lấy thông tin người dùng"
   git push origin feat/my-feature
   ```
4. **Tạo Pull Request (PR)** trên GitHub vào nhánh `main` hoặc `develop`, điền đầy đủ checklist theo mẫu có sẵn để đồng đội review.
