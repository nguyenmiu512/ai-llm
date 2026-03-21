"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Plus, Megaphone, Activity, BarChart2 } from "lucide-react";

const chienDichData: Record<string, unknown>[] = [
  // 2026
  { tenChienDich: "Tháng hành động vì ATTP năm 2026", thoiGian: "15/04/2026 – 15/05/2026", diaBan: "Toàn TP.HCM", hinhThuc: "Kết hợp", nganSach: "950.000.000 đ", doiTuong: "Toàn dân", trangThai: "Kế hoạch" },
  { tenChienDich: "An toàn thực phẩm dịp Tết Nguyên Đán 2026", thoiGian: "10/01/2026 – 10/02/2026", diaBan: "Toàn TP.HCM", hinhThuc: "Kết hợp", nganSach: "720.000.000 đ", doiTuong: "Hộ kinh doanh", trangThai: "Đang triển khai" },
  { tenChienDich: "Truyền thông ATTP mùa hè 2026", thoiGian: "01/06/2026 – 31/08/2026", diaBan: "Quận 1, 3, 5", hinhThuc: "Online", nganSach: "320.000.000 đ", doiTuong: "Học sinh, sinh viên", trangThai: "Kế hoạch" },
  { tenChienDich: "Chiến dịch ATTP cho bếp ăn trường học 2026", thoiGian: "01/09/2026 – 30/11/2026", diaBan: "Toàn TP.HCM", hinhThuc: "Trực tiếp", nganSach: "200.000.000 đ", doiTuong: "Học sinh, nhân viên nhà bếp", trangThai: "Kế hoạch" },
  { tenChienDich: "Hội thảo ATTP doanh nghiệp sản xuất & chế biến", thoiGian: "20/03/2026 – 22/03/2026", diaBan: "Quận 1", hinhThuc: "Trực tiếp", nganSach: "120.000.000 đ", doiTuong: "Doanh nghiệp thực phẩm", trangThai: "Đang triển khai" },
  { tenChienDich: "Livestream TikTok: Nhận biết thực phẩm an toàn", thoiGian: "Hàng thứ 6 hàng tuần", diaBan: "Trực tuyến", hinhThuc: "Online", nganSach: "30.000.000 đ", doiTuong: "Người tiêu dùng trẻ", trangThai: "Đang triển khai" },
  // 2025
  { tenChienDich: "Tháng hành động vì ATTP năm 2025", thoiGian: "15/04/2025 – 15/05/2025", diaBan: "Toàn TP.HCM", hinhThuc: "Kết hợp", nganSach: "850.000.000 đ", doiTuong: "Toàn dân", trangThai: "Hoàn thành" },
  { tenChienDich: "An toàn thực phẩm dịp Tết Nguyên Đán 2025", thoiGian: "10/01/2025 – 10/02/2025", diaBan: "Toàn TP.HCM", hinhThuc: "Kết hợp", nganSach: "620.000.000 đ", doiTuong: "Hộ kinh doanh", trangThai: "Hoàn thành" },
  { tenChienDich: "ATTP vì sức khỏe cộng đồng – Facebook Live", thoiGian: "Hàng tuần thứ Tư", diaBan: "Trực tuyến", hinhThuc: "Online", nganSach: "40.000.000 đ", doiTuong: "Người tiêu dùng", trangThai: "Hoàn thành" },
  { tenChienDich: "Truyền thông phòng chống ngộ độc mùa nóng", thoiGian: "01/04/2025 – 30/09/2025", diaBan: "Toàn TP.HCM", hinhThuc: "Kết hợp", nganSach: "320.000.000 đ", doiTuong: "Toàn dân", trangThai: "Hoàn thành" },
  { tenChienDich: "Tập huấn kiến thức ATTP cho bếp ăn tập thể", thoiGian: "01/03/2025 – 31/03/2025", diaBan: "Toàn TP.HCM", hinhThuc: "Trực tiếp", nganSach: "150.000.000 đ", doiTuong: "Nhân viên bếp ăn", trangThai: "Hoàn thành" },
  { tenChienDich: "Tuần lễ vàng ATTP – Không chất cấm", thoiGian: "05/05/2025 – 12/05/2025", diaBan: "Bình Tân, Tân Phú", hinhThuc: "Trực tiếp", nganSach: "95.000.000 đ", doiTuong: "Hộ sản xuất", trangThai: "Hoàn thành" },
  { tenChienDich: "Triển lãm ATTP và sản phẩm sạch 2025", thoiGian: "20/10/2025 – 25/10/2025", diaBan: "Quận 1", hinhThuc: "Trực tiếp", nganSach: "400.000.000 đ", doiTuong: "Toàn dân", trangThai: "Hoàn thành" },
  { tenChienDich: "ATTP tại trường học 2025", thoiGian: "01/09/2025 – 30/11/2025", diaBan: "Toàn TP.HCM", hinhThuc: "Trực tiếp", nganSach: "180.000.000 đ", doiTuong: "Học sinh, giáo viên", trangThai: "Hoàn thành" },
  { tenChienDich: "Ký cam kết ATTP chợ truyền thống", thoiGian: "10/02/2025 – 28/02/2025", diaBan: "Quận 5, 6, 8", hinhThuc: "Trực tiếp", nganSach: "75.000.000 đ", doiTuong: "Tiểu thương", trangThai: "Hoàn thành" },
  { tenChienDich: "Livestream nấu ăn an toàn cho bà mẹ", thoiGian: "01/03/2025 – 30/06/2025", diaBan: "Trực tuyến", hinhThuc: "Online", nganSach: "60.000.000 đ", doiTuong: "Bà mẹ, gia đình", trangThai: "Hoàn thành" },
  { tenChienDich: "Hướng dẫn mua sắm thực phẩm an toàn cuối năm", thoiGian: "01/11/2025 – 31/12/2025", diaBan: "Toàn TP.HCM", hinhThuc: "Kết hợp", nganSach: "250.000.000 đ", doiTuong: "Người nội trợ", trangThai: "Hoàn thành" },
];

const hoatDongData: Record<string, unknown>[] = [
  // 2026 – Hoàn thành
  { maHoatDong: "HT-2026-001", tenHoatDong: "Tập huấn ATTP cho hộ kinh doanh phường Bến Nghé", loai: "Tập huấn", diaBan: "Q.1", soNguoiThamGia: 85, ngayThucHien: "05/01/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-002", tenHoatDong: "Phát tờ rơi về ATTP tại chợ Bình Tây", loai: "Tờ rơi / Pano", diaBan: "Q.6", soNguoiThamGia: 500, ngayThucHien: "08/01/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-003", tenHoatDong: "Livestream phòng chống ngộ độc mùa Tết", loai: "Mạng xã hội", diaBan: "Trực tuyến", soNguoiThamGia: 12400, ngayThucHien: "15/01/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-004", tenHoatDong: "Gắn bảng cam kết ATTP tại 50 cơ sở ăn uống", loai: "Trực tiếp", diaBan: "Bình Thạnh", soNguoiThamGia: 50, ngayThucHien: "20/01/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-005", tenHoatDong: "Đăng bài truyền thông Zalo OA về giấy phép ATTP", loai: "Mạng xã hội", diaBan: "Toàn TP", soNguoiThamGia: 8700, ngayThucHien: "25/01/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-006", tenHoatDong: "Tổ chức thi hiểu biết ATTP cho học sinh THPT", loai: "Tập huấn", diaBan: "Gò Vấp, Bình Thạnh", soNguoiThamGia: 320, ngayThucHien: "10/02/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-007", tenHoatDong: "Phát sóng clip ATTP trên TikTok – Series 3 tập", loai: "Mạng xã hội", diaBan: "Trực tuyến", soNguoiThamGia: 45600, ngayThucHien: "15/02/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-008", tenHoatDong: "Phát 2.000 tờ rơi tại chợ Tân Bình", loai: "Tờ rơi / Pano", diaBan: "Tân Bình", soNguoiThamGia: 2000, ngayThucHien: "18/02/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-009", tenHoatDong: "Bài viết báo chí về an toàn thực phẩm Tết 2026", loai: "Báo chí", diaBan: "Toàn TP", soNguoiThamGia: 0, ngayThucHien: "05/02/2026", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2026-010", tenHoatDong: "Phóng sự truyền hình về ngộ độc thực phẩm", loai: "Báo chí", diaBan: "Toàn TP", soNguoiThamGia: 0, ngayThucHien: "10/02/2026", trangThai: "Hoàn thành" },
  // 2026 – Đang triển khai
  { maHoatDong: "HT-2026-011", tenHoatDong: "Tập huấn kiến thức ATTP bếp ăn bệnh viện", loai: "Tập huấn", diaBan: "Q.5", soNguoiThamGia: 60, ngayThucHien: "20/02/2026", trangThai: "Đang triển khai" },
  { maHoatDong: "HT-2026-012", tenHoatDong: "Hội thảo ATTP cho doanh nghiệp sản xuất thực phẩm", loai: "Tập huấn", diaBan: "Q.1", soNguoiThamGia: 150, ngayThucHien: "20/03/2026", trangThai: "Đang triển khai" },
  { maHoatDong: "HT-2026-013", tenHoatDong: "Livestream TikTok: Nhận biết thực phẩm an toàn", loai: "Mạng xã hội", diaBan: "Trực tuyến", soNguoiThamGia: 18500, ngayThucHien: "07/03/2026", trangThai: "Đang triển khai" },
  // 2026 – Kế hoạch
  { maHoatDong: "HT-2026-014", tenHoatDong: "Treo 50 pano tháng hành động ATTP", loai: "Tờ rơi / Pano", diaBan: "Toàn TP", soNguoiThamGia: 0, ngayThucHien: "15/04/2026", trangThai: "Kế hoạch" },
  { maHoatDong: "HT-2026-015", tenHoatDong: "Tập huấn vệ sinh an toàn thực phẩm tại chợ dân sinh", loai: "Tập huấn", diaBan: "Q.8, Q.11", soNguoiThamGia: 0, ngayThucHien: "20/04/2026", trangThai: "Kế hoạch" },
  { maHoatDong: "HT-2026-016", tenHoatDong: "Chiến dịch mạng xã hội #ATTPChoGiaDinh", loai: "Mạng xã hội", diaBan: "Trực tuyến", soNguoiThamGia: 0, ngayThucHien: "01/05/2026", trangThai: "Kế hoạch" },
  { maHoatDong: "HT-2026-017", tenHoatDong: "Triển lãm ATTP hè 2026 tại Công viên 23/9", loai: "Trực tiếp", diaBan: "Q.1", soNguoiThamGia: 0, ngayThucHien: "15/06/2026", trangThai: "Kế hoạch" },
  // 2025 – Lịch sử
  { maHoatDong: "HT-2025-001", tenHoatDong: "Tập huấn ATTP Q1/2025 – Quận 3, Quận 10", loai: "Tập huấn", diaBan: "Q.3, Q.10", soNguoiThamGia: 210, ngayThucHien: "15/01/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-002", tenHoatDong: "Phát tờ rơi dịp Tết tại 15 chợ truyền thống", loai: "Tờ rơi / Pano", diaBan: "Nhiều quận", soNguoiThamGia: 8000, ngayThucHien: "20/01/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-003", tenHoatDong: "Ký cam kết ATTP chợ Bến Thành", loai: "Trực tiếp", diaBan: "Q.1", soNguoiThamGia: 120, ngayThucHien: "10/02/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-004", tenHoatDong: "Bài đăng Facebook về nhận biết phụ gia thực phẩm", loai: "Mạng xã hội", diaBan: "Trực tuyến", soNguoiThamGia: 32000, ngayThucHien: "05/03/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-005", tenHoatDong: "Tọa đàm chuyên gia ATTP – VTV9", loai: "Báo chí", diaBan: "Toàn quốc", soNguoiThamGia: 0, ngayThucHien: "18/04/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-006", tenHoatDong: "Phát 5.000 tờ rơi Tháng hành động ATTP", loai: "Tờ rơi / Pano", diaBan: "Toàn TP", soNguoiThamGia: 5000, ngayThucHien: "20/04/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-007", tenHoatDong: "Hội thảo ATTP cho siêu thị và chuỗi bán lẻ", loai: "Tập huấn", diaBan: "Q.1", soNguoiThamGia: 95, ngayThucHien: "12/05/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-008", tenHoatDong: "Clip ngắn TikTok: 5 nguyên tắc chọn thực phẩm", loai: "Mạng xã hội", diaBan: "Trực tuyến", soNguoiThamGia: 68200, ngayThucHien: "01/06/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-009", tenHoatDong: "Đặt 20 băng rôn ATTP trên các trục đường chính", loai: "Tờ rơi / Pano", diaBan: "Toàn TP", soNguoiThamGia: 0, ngayThucHien: "15/06/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-010", tenHoatDong: "Chương trình phát thanh ATTP trên FM 99.9 MHz", loai: "Báo chí", diaBan: "Toàn TP", soNguoiThamGia: 0, ngayThucHien: "01/07/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-011", tenHoatDong: "Tập huấn ATTP cho nhân viên bán thức ăn đường phố", loai: "Tập huấn", diaBan: "Q.5, Q.10", soNguoiThamGia: 180, ngayThucHien: "10/08/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-012", tenHoatDong: "Livestream Facebook: Mùa hè ăn gì cho an toàn?", loai: "Mạng xã hội", diaBan: "Trực tuyến", soNguoiThamGia: 24300, ngayThucHien: "20/08/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-013", tenHoatDong: "Tập huấn ATTP trường học đầu năm học 2025–2026", loai: "Tập huấn", diaBan: "Toàn TP", soNguoiThamGia: 450, ngayThucHien: "05/09/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-014", tenHoatDong: "Triển lãm sản phẩm ATTP – Nhà văn hóa Thanh niên", loai: "Trực tiếp", diaBan: "Q.1", soNguoiThamGia: 3800, ngayThucHien: "20/10/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-015", tenHoatDong: "Phóng sự HTV7: Thực phẩm bẩn và hệ quả", loai: "Báo chí", diaBan: "Toàn TP", soNguoiThamGia: 0, ngayThucHien: "15/11/2025", trangThai: "Hoàn thành" },
  { maHoatDong: "HT-2025-016", tenHoatDong: "Zalo OA: Cảnh báo thực phẩm mất an toàn cuối năm", loai: "Mạng xã hội", diaBan: "Toàn TP", soNguoiThamGia: 14200, ngayThucHien: "01/12/2025", trangThai: "Hoàn thành" },
];

const thongKeData = [
  { loai: "Tập huấn / Hội thảo", soHoatDong2025: 12, soHoatDong2026: 8, tongNguoiThamGia2025: "4,120", tongNguoiThamGia2026: "2,470", ghiChu: "Hộ kinh doanh, nhân viên bếp ăn, doanh nghiệp" },
  { loai: "Mạng xã hội (Zalo, Facebook, TikTok)", soHoatDong2025: 18, soHoatDong2026: 9, tongNguoiThamGia2025: "138,700", tongNguoiThamGia2026: "72,800", ghiChu: "Facebook, TikTok, Zalo OA" },
  { loai: "Tờ rơi / Pano / Băng rôn", soHoatDong2025: 8, soHoatDong2026: 4, tongNguoiThamGia2025: "25,000", tongNguoiThamGia2026: "10,500", ghiChu: "Phát tờ rơi, treo pano, băng rôn tại chợ" },
  { loai: "Báo chí / Truyền hình / Phát thanh", soHoatDong2025: 5, soHoatDong2026: 3, tongNguoiThamGia2025: "Toàn TP", tongNguoiThamGia2026: "Toàn TP", ghiChu: "HTV7, VTV9, FM 99.9 MHz" },
  { loai: "Trực tiếp (ký cam kết, sự kiện)", soHoatDong2025: 4, soHoatDong2026: 3, tongNguoiThamGia2025: "4,020", tongNguoiThamGia2026: "200", ghiChu: "Chợ truyền thống, cơ sở ăn uống" },
  { loai: "Triển lãm / Hội chợ ATTP", soHoatDong2025: 2, soHoatDong2026: 1, tongNguoiThamGia2025: "5,800", tongNguoiThamGia2026: "0 (kế hoạch)", ghiChu: "Nhà văn hóa Thanh niên, Công viên 23/9" },
];

const tabs = [
  { id: "chien-dich", label: "Chiến dịch truyền thông", icon: Megaphone },
  { id: "hoat-dong", label: "Hoạt động truyền thông", icon: Activity },
  { id: "thong-ke", label: "Thống kê", icon: BarChart2 },
];

const chienDichColumns = [
  { key: "tenChienDich", label: "Tên chiến dịch" },
  { key: "thoiGian", label: "Thời gian" },
  { key: "diaBan", label: "Địa bàn" },
  {
    key: "hinhThuc", label: "Hình thức",
    render: (row: Record<string, unknown>) => {
      const val = String(row.hinhThuc);
      const variant = val === "Trực tiếp" ? "info" : val === "Online" ? "success" : "neutral";
      return <Badge variant={variant as "info" | "success" | "neutral"}>{val}</Badge>;
    },
  },
  { key: "nganSach", label: "Ngân sách" },
  { key: "doiTuong", label: "Đối tượng" },
  {
    key: "trangThai", label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const val = String(row.trangThai);
      const variant = val === "Đang triển khai" ? "info" : val === "Hoàn thành" ? "success" : "neutral";
      return <Badge variant={variant as "info" | "success" | "neutral"}>{val}</Badge>;
    },
  },
];

const hoatDongColumns = [
  { key: "maHoatDong", label: "Mã HĐ", sortable: true },
  { key: "tenHoatDong", label: "Tên hoạt động" },
  { key: "loai", label: "Loại hình", sortable: true },
  { key: "diaBan", label: "Địa bàn" },
  { key: "soNguoiThamGia", label: "Người tham gia", sortable: true },
  { key: "ngayThucHien", label: "Ngày thực hiện" },
  {
    key: "trangThai", label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const val = String(row.trangThai);
      const variant = val === "Hoàn thành" ? "success" : val === "Đang triển khai" ? "info" : "neutral";
      return <Badge variant={variant as "success" | "info" | "neutral"}>{val}</Badge>;
    },
  },
];

const thongKeColumns = [
  { key: "loai", label: "Loại hình truyền thông" },
  { key: "soHoatDong2025", label: "Số HĐ 2025", sortable: true },
  { key: "tongNguoiThamGia2025", label: "Tiếp cận 2025" },
  { key: "soHoatDong2026", label: "Số HĐ 2026", sortable: true },
  { key: "tongNguoiThamGia2026", label: "Tiếp cận 2026" },
  { key: "ghiChu", label: "Ghi chú" },
];

export default function TruyenThongATTPPage() {
  const [tab, setTab] = useState("chien-dich");

  return (
    <DashboardLayout>
      <PageHeader
        title="Truyền thông ATTP"
        subtitle="Quản lý chiến dịch, hoạt động và thống kê truyền thông an toàn thực phẩm"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Plus size={16} />
            Tạo chiến dịch
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-colors ${
                  tab === t.id
                    ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50/40"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="p-5">
          {tab === "chien-dich" && (
            <DataTable columns={chienDichColumns} data={chienDichData} searchable searchKeys={["tenChienDich", "diaBan", "doiTuong"]} />
          )}
          {tab === "hoat-dong" && (
            <DataTable columns={hoatDongColumns} data={hoatDongData} searchable searchKeys={["tenHoatDong", "diaBan", "loai"]} />
          )}
          {tab === "thong-ke" && (
            <DataTable columns={thongKeColumns} data={thongKeData as Record<string, unknown>[]} searchable searchKeys={["loai"]} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
