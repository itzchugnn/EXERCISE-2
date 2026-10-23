# MÔ TẢ

Hệ thống FitLife Hub gồm 12 chi nhánh tại các thành phố lớn. Mỗi chi nhánh cung cấp dịch vụ phòng tập (Gym/Yoga/GroupX), dịch vụ HLV cá nhân, dịch vụ Spa/Sauna, và cửa hàng bán thực phẩm bổ sung/phụ kiện tập luyện.

* **Chi nhánh:** Mã CN, tên chi nhánh, địa chỉ, số điện thoại, giờ mở/đóng cửa, danh sách dịch vụ/tiện ích có tại chi nhánh.
* **Hội viên (Khách hàng):** Họ tên, SĐT, Email, CCCD, giới tính, ngày sinh, ngày đăng ký. Một hội viên có thể mua nhiều gói tập (Gói theo tháng/năm, Gói PT 1-1, Vé Spa lẻ).

**Gói dịch vụ & Sản phẩm:**
* **Gói tập/Dịch vụ:** Mã gói, tên gói, loại (Gym, Yoga, PT 1-1, Spa), thời hạn (3 tháng, 6 tháng, 12 tháng), số buổi PT (nếu có), giá tiền.
* **Sản phẩm bán lẻ:** Mã SP, tên SP, loại (Whey protein, bình nước, thảm yoga), giá bán, số lượng tồn kho theo từng chi nhánh.

**Lịch hẹn & Check-in:**
* Mỗi lần hội viên đến tập tại bất kỳ chi nhánh nào, hệ thống phải ghi nhận lượt Check-in (Mã check-in, Hội viên, Chi nhánh, Thời gian vào, Thời gian ra, Cửa kiểm soát/Thiết bị).
* Đối với gói PT 1-1, hội viên phải đặt Lịch hẹn PT trước (HLV phụ trách, Ngày giờ tập, Chi nhánh, Trạng thái: Đã đặt / Đã hoàn thành / Hủy).

**Hóa đơn & Thanh toán:** Mã hóa đơn, ngày lập, nhân viên lập, hội viên, danh sách gói dịch vụ/sản phẩm, tổng tiền, giảm giá, hình thức thanh toán (Tiền mặt, VNPay, Thẻ).

**Chương trình Hội viên thân thiết:** 3 hạng (Silver - Gold - Platinum) dựa trên tổng chi tiêu trong năm. Tích điểm Loyalty $(\text{1 điểm} = 100.000 \text{ VNĐ})$.

**Quản lý Nhân sự:** HLV (PT), Lễ tân, Quản lý chi nhánh, Nhân viên bán hàng. Lưu thông tin: Mã NV, họ tên, SĐT, chức vụ, chi nhánh hiện tại, lương cơ bản. Nhân viên có thể có lịch sử điều chuyển công tác giữa các chi nhánh.

---

### Vấn đề hệ thống thực tế
Hệ thống hiện tại của FitLife Hub đang gặp 5 vấn đề nghiêm trọng về dữ liệu và vận hành. Các nhóm bắt buộc phải phân tích và đưa ra giải pháp thiết kế (ở cấp độ Schema, Index, Partition, Stored Proc, Trigger,...) để giải quyết các vấn đề này:

**1. Nghẽn Check-in giờ cao điểm**
* **Vấn đề:** Khung giờ 17h00 - 20h00 hàng ngày có hơn 10.000 lượt hội viên quét thẻ/QR check-in đồng thời trên toàn hệ thống. Truy vấn xác thực hội viên (kiểm tra hạn gói tập + lưu log check-in) bị đơ, gây ùn tắc tại cửa quay.
* **Nhiệm vụ sinh viên:** Đề xuất cấu trúc bảng/Index hoặc kỹ thuật lưu trữ/partition log check-in sao cho việc tra cứu quyền vào cổng đạt tốc độ dưới 50ms.

**2. Xung đột đặt lịch HLV cá nhân**
* **Vấn đề:** Hai hội viên cùng lúc đặt cùng một PT vào một khung giờ. Do giao dịch đồng thời, hệ thống bị ghi đè dữ liệu khiến PT bị trùng lịch dạy.
* **Nhiệm vụ sinh viên:** Đề xuất cơ chế ràng buộc để ngăn chặn tuyệt đối tình trạng Overbooking.

**3. Bùng nổ dữ liệu Log & Báo cáo doanh thu chậm**
* **Vấn đề:** Bảng ghi nhận lượt Check-in và lịch sử tập luyện tăng trưởng hơn 300.000 dòng/tháng. Khi quản lý cần chạy báo cáo Tỷ lệ lấp đầy phòng tập theo khung giờ/chi nhánh hoặc Doanh thu theo tháng, truy vấn mất hơn 1 phút.
* **Nhiệm vụ sinh viên:** Đề xuất giải pháp phân vùng dữ liệu và thiết kế bảng tổng hợp hoặc View/Trigger để tối ưu hóa báo cáo.

**4. Chi phí tính toán lại hạng hội viên bị quá tải**
* **Vấn đề:** Mỗi khi hội viên thanh toán một hóa đơn mới, hệ thống lại chạy tổng tiền hóa đơn trong 12 tháng qua để xét duyệt nâng/hạ hạng hội viên (Silver/Gold/Platinum) và tính điểm thưởng. Việc tính toán thời gian thực này làm chậm thao tác in hóa đơn.
* **Nhiệm vụ sinh viên:** Thiết kế lại cấu trúc lưu trữ điểm/hạng hội viên để việc thanh toán không bị nghẽn.

**5. Tra cứu Lịch sử điều chuyển Nhân sự & Lương/Hoa hồng bị sai lệch**
* **Vấn đề:** Một PT có thể chuyển từ Chi nhánh A sang Chi nhánh B trong tháng. Khi tính hoa hồng PT (dựa trên số buổi dạy tại từng chi nhánh), truy vấn xác định Thời điểm tập đó, PT đang thuộc chi nhánh nào bị sai sót.
* **Nhiệm vụ sinh viên:** Thiết kế lược đồ quan hệ quản lý Lịch sử công tác/Điều chuyển hợp lý để truy vấn hoa hồng chuẩn xác và nhanh chóng.

---

## Một số yêu cầu truy vấn / thống kê gợi ý

**Cấp Chi nhánh:**
* Doanh thu theo ngày/tháng/quý/năm.
* Danh sách hội viên check-in trong ngày theo khung giờ.
* Thống kê các gói tập/sản phẩm bán chạy nhất tại chi nhánh.
* Báo cáo tồn kho thực phẩm bổ sung/phụ kiện.
* Tra cứu lịch sử tập luyện / lịch hẹn PT của một hội viên.
* Hiệu suất làm việc của HLV (Số buổi dạy, điểm đánh giá từ hội viên).
* Thống kê hội viên sắp hết hạn gói tập hoặc lâu ngày chưa quay lại.

**Cấp Công ty / Ban giám đốc:**
* Doanh thu toàn hệ thống và so sánh giữa các chi nhánh.
* Gói dịch vụ mang lại doanh thu cao nhất trong 6 tháng gần nhất.
* Tỷ lệ phân bổ hạng hội viên (Silver / Gold / Platinum).
* Quản lý nhân sự toàn hệ thống (điều chuyển, cập nhật lương, tính hoa hồng).

---

## Yêu cầu

* **Giai đoạn 1:** Tự mô tả chi tiết quy trình, dữ liệu, ràng buộc liên quan, danh sách chức năng cần xây dựng kèm tần suất giao dịch tương ứng (thông tin tần suất tự quan sát, phân tích và đề xuất), có thể bổ sung thêm các chức năng, ràng buộc chức năng. Thiết kế dữ liệu mức quan niệm và logic.

* **Giai đoạn 2:** Bảng thiết kế cơ sở dữ liệu mức vật lý, các đề xuất về cải thiện hiệu quả truy vấn dựa trên thiết kế đề xuất, source code của project mô phỏng một số chức năng (tìm kiếm, thêm/xoá/sửa, thống kê) có tần suất cao và thấp sao cho bao gồm được các kịch bản minh hoạ hiệu quả của các giải pháp cải thiện hiệu suất, source script tạo csdl, query, index, partition.... Có sử dụng. Tạo, thực thi các chỉ mục, chụp hình và giải thích kết quả, so sánh giữa có/không có áp dụng giải pháp nâng cao hiệu suất.
* **Lưu ý:** Báo cáo là tài liệu tổng kết từ giai đoạn phân tích, thiết kế, cài đặt, đánh giá kết quả giải pháp.
* **Tự phát sinh dữ liệu** (kiểm tra dữ liệu khoá ngoại) đủ lớn để kiểm chứng các đề xuất chỉ mục $(\geq 70.000 \text{ dòng/bảng})$ cho 1 số bảng cần minh hoạ. Tự chọn Công cụ phát sinh hoặc tự code.

## Thang điểm:

* **Mức quan niệm: 20%** (đặc tả, thiết kế ER, báo cáo)
* **Mức logic: 10%** (chuyển lược đồ quan hệ, xác định ràng buộc, dạng chuẩn, chuẩn hoá lược đồ, báo cáo)
* **Mức vật lý: 50%** (script cơ sở dữ liệu, stored, function, trigger, phân tích tần suất, chỉ mục, partition, báo cáo...)
  * Mô tả 8 đến 10 kịch bản sử dụng có liên quan nhau trong hệ thống, xác định tần suất các truy vấn liên quan. Áp dụng kiến thức lý thuyết về phân tích dữ liệu mức vật lý để xác định các giải pháp phù hợp.
* **Cài đặt ứng dụng: 20%** Web