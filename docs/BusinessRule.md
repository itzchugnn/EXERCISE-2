## Business Rule chính
- BR01	
    • Một ChiNhanh có (1, N) NhanVien đang làm việc.
    • Một NhanVien tại một thời điểm chỉ có thể làm việc tại (1, 1) ChiNhanh.

- BR02	
    • Một ChiNhanh được quản lý bởi duy nhất (1, 1) NhanVien.
    • Một NhanVien quản lý (0, 1) ChiNhanh.

- BR03	
    • Một ChiNhanh có thể xuất hiện trong (0, N) LichSuCongTac.
    • Một LichSuCongTac chỉ tham chiếu đến (1, 1) ChiNhanh.

- BR04	
    • Một NhanVien có thể có (1, N) LichSuCongTac.
    • Một LichSuCongTac chỉ thuộc về (1, 1) NhanVien.

- BR05	
    • Một ChiNhanh có thể cung cấp (1, N) GoiDichVu.
    • Một GoiDichVu có thể được cung cấp tại (0, N) ChiNhanh.

- BR06	
    • Một ChiNhanh có thể quản lý (0, N) bản ghi TonKho.
    • Một bản ghi TonKho chỉ thuộc về duy nhất (1, 1) ChiNhanh.

- BR07	
    • Một SanPham có (0, N) bản ghi TonKho.
    • Một bản ghi TonKho chỉ tham chiếu đến duy nhất (1, 1) SanPham.

- BR08	
    • Mỗi HoiVien tại một thời điểm chỉ thuộc về duy nhất (1, 1) HangHV.
    • Một HangHV có thể có (0, N) HoiVien.

- BR09	
    • Một HoiVien có thể thanh toán (0, N) HoaDon.
    • Một HoaDon chỉ được lập cho duy nhất (1, 1) HoiVien.

- BR10	
    • Một NhanVien có thể lập (0, N) HoaDon.
    • Một HoaDon chỉ được lập bởi duy nhất bởi (1, 1) NhanVien.

- BR11	
    • Một ChiNhanh có thể phát sinh (0, N) HoaDon.
    • Một HoaDon chỉ được lập tại duy nhất (1, 1) ChiNhanh.

- BR12	
    • Một HoaDon có (1, N) CTHoaDon.
    • Một CTHoaDon chỉ thuộc về duy nhất (1, 1) HoaDon.

- BR13	
    • Một CTHoaDon tham chiếu đến (0, 1) GoiDichVu và (0, 1) SanPham.
    • Một GoiDichVu hoặc SanPham có thể xuất hiện trong (0, N) CTHoaDon.

- BR14	
    • Một HoiVien có thể sở hữu (0, N) DKGoi.
    • Mỗi DKGoi thuộc về duy nhất (1, 1) HoiVien.

- BR15	
    • Mỗi DKGoi là sự đăng ký của duy nhất (1, 1) GoiDichVu.
    • Một GoiDichVu có thể có (0, N) DKGoi.

- BR16	
    • Mỗi DKGoi phát sinh từ duy nhất (1, 1) HoaDon.
    • Một HoaDon có thể kích hoạt (0, N) DKGoi.

- BR17	
    • Một HoiVien có thể có (0, N) lượt CheckIn.
    • Mỗi lượt CheckIn được thực hiện bởi duy nhất (1, 1) HoiVien.

- BR18	
    • Một ChiNhanh tiếp nhận (0, N) lượt CheckIn.
    • Mỗi lượt CheckIn chỉ diễn ra tại duy nhất (1, 1) ChiNhanh.

- BR19	
    • Mỗi LichHenPT được đặt dựa trên duy nhất (1, 1) DKGoi.
    • Một DKGoi có thể có (0, N) LichHenPT.

- BR20	
    • Mỗi LichHenPT do duy nhất (1, 1) NhanVien hướng dẫn.
    • Một NhanVien có thể hướng dẫn (0, N) LichHenPT.

- BR21	
    • Mỗi LichHenPT diễn ra tại duy nhất (1, 1) ChiNhanh.
    • Một ChiNhanh có thể tổ chức (0, N) LichHenPT.


## Constraint
- BR22	
    • Mỗi HoiVien và NhanVien phải có số CCCD, số điện thoại và Email đúng định dạng chuẩn.
    • Các thông tin CCCD, SĐT, Email là duy nhất, không được trùng lặp giữa các HoiVien hoặc giữa các NhanVien.

- BR23	
    • Mỗi HoiVien khi đăng ký phải trên 15 tuổi.
    • Mỗi NhanVien khi vào làm việc phải trên 18 tuổi.

- BR24	
    • NhanVien bao gồm các chức vụ: HLV, Lễ tân, Quản lý chi nhánh, Nhân viên bán hàng.

- BR25	
    • GoiDichVu bao gồm: Gym, Yoga, GroupX, PT 1-1, Spa.
    • Hình thức thanh toán của HoaDon: Tiền mặt, VNPay, Thẻ.
    • Tên hạng của HangHV: Silver, Gold, Platinum.

- BR26	
    • Trạng thái của DKGoi: Đang hoạt động, Hết hạn, Đã hủy.
    • Trạng thái của LichHenPT: Đã đặt, Đã hoàn thành, Hủy.

- BR27	
    • Giá tiền của GoiDichVu, giá bán của SanPham, lương cơ bản của NhanVien (và trong LichSuCongTac), cùng số lượng mua trong CTHoaDon phải luôn lớn hơn 0.

- BR28	
    • Số lượng tồn trong TonKho, điểm tích lũy và tổng chi tiêu năm của HoiVien, số buổi PT còn lại trong DKGoi và tiền giảm giá trong HoaDon phải lớn hơn hoặc bằng 0.

- BR29	
    • Trong mỗi ChiNhanh, giờ mở cửa bắt buộc phải sớm hơn giờ đóng cửa.

- BR30	
    • Mỗi CTHoaDon chỉ được phép tham chiếu đến duy nhất 1 GoiDichVu (khi đó MaSP rỗng và SoLuong = 1) hoặc duy nhất 1 SanPham (khi đó MaGoi rỗng), không được đồng thời tham chiếu cả hai hoặc để trống cả hai.

- BR31	
    • Trong GoiDichVu, nếu loại gói là PT 1-1 thì số buổi PT mặc định phải lớn hơn 0.
    • Ngược lại nếu là gói Gym, Yoga, GroupX, Spa theo thời hạn thì số buổi PT bằng 0 (hoặc rỗng).

- BR32	
    • Trong mỗi DKGoi, ngày hết hạn phải lớn hơn hoặc bằng ngày kích hoạt, và số buổi PT còn lại không được vượt quá tổng số buổi PT ban đầu của gói.
    
- BR33	
    • Trong mỗi LichSuCongTac, ngày kết thúc công tác phải để trống (nếu NhanVien đang làm việc tại ChiNhanh đó) hoặc phải lớn hơn hoặc bằng ngày bắt đầu công tác.