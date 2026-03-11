"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Plus, AlertTriangle, Search, CheckCircle, Clock, FlaskConical } from "lucide-react";

const stats = [
  { label: "Tổng vụ", value: "47", icon: AlertTriangle, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Đang điều tra", value: "8", icon: Search, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Đã kết luận", value: "35", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "Đang xử lý", value: "4", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
];

const vuNgoDocData: Record<string, unknown>[] = [
  { maVu: "NGD-2025-001", diaDiem: "Bếp ăn Công ty Pou Yuen, Bình Tân", ngayXayRa: "05/01/2025", soNguoiMac: 47, soNguoiNhapVien: 12, nguyenNhan: "Vi khuẩn Salmonella", trangThai: "Đã kết luận" },
  { maVu: "NGD-2025-002", diaDiem: "Quán cơm bình dân đường Lê Văn Sỹ, Q.3", ngayXayRa: "12/01/2025", soNguoiMac: 8, soNguoiNhapVien: 3, nguyenNhan: "Ngộ độc thức ăn", trangThai: "Đã kết luận" },
  { maVu: "NGD-2025-003", diaDiem: "Nhà trẻ Họa Mi, P. Hiệp Bình Phước, Thủ Đức", ngayXayRa: "18/01/2025", soNguoiMac: 15, soNguoiNhapVien: 6, nguyenNhan: "Độc tố nấm mốc", trangThai: "Đang xử lý" },
  { maVu: "NGD-2025-004", diaDiem: "Tiệc cưới nhà hàng Bông Sen, Q.7", ngayXayRa: "25/01/2025", soNguoiMac: 32, soNguoiNhapVien: 8, nguyenNhan: "Vi sinh vật", trangThai: "Đã kết luận" },
  { maVu: "NGD-2025-005", diaDiem: "Canteen Trường ĐH Bách Khoa, Q.10", ngayXayRa: "02/02/2025", soNguoiMac: 23, soNguoiNhapVien: 9, nguyenNhan: "Vi khuẩn E.coli", trangThai: "Đã kết luận" },
  { maVu: "NGD-2025-006", diaDiem: "Hàng bún bò vỉa hè 123 Đinh Tiên Hoàng", ngayXayRa: "10/02/2025", soNguoiMac: 5, soNguoiNhapVien: 2, nguyenNhan: "Chưa xác định", trangThai: "Đang điều tra" },
  { maVu: "NGD-2025-007", diaDiem: "Bếp ăn Công ty Samsung HCMC, Q.9", ngayXayRa: "14/02/2025", soNguoiMac: 68, soNguoiNhapVien: 22, nguyenNhan: "Staphylococcus aureus", trangThai: "Đã kết luận" },
  { maVu: "NGD-2025-008", diaDiem: "Xe bánh mì khu vực Bình Thạnh", ngayXayRa: "20/02/2025", soNguoiMac: 4, soNguoiNhapVien: 1, nguyenNhan: "Chưa xác định", trangThai: "Đang điều tra" },
  { maVu: "NGD-2025-009", diaDiem: "Trường Tiểu học Lê Văn Tám, Quận 1", ngayXayRa: "01/03/2025", soNguoiMac: 28, soNguoiNhapVien: 7, nguyenNhan: "Vi khuẩn Listeria", trangThai: "Đang xử lý" },
  { maVu: "NGD-2025-010", diaDiem: "Nhà hàng Hải sản Đại Dương, Q.4", ngayXayRa: "05/03/2025", soNguoiMac: 12, soNguoiNhapVien: 4, nguyenNhan: "Độc tố cá nóc", trangThai: "Đã kết luận" },
  { maVu: "NGD-2025-011", diaDiem: "Lễ hội ẩm thực phường Bến Nghé, Q.1", ngayXayRa: "08/03/2025", soNguoiMac: 9, soNguoiNhapVien: 3, nguyenNhan: "Chưa xác định", trangThai: "Đang điều tra" },
  { maVu: "NGD-2025-012", diaDiem: "Bếp ăn Bệnh viện Q.11", ngayXayRa: "10/03/2025", soNguoiMac: 6, soNguoiNhapVien: 4, nguyenNhan: "Ngộ độc hóa chất", trangThai: "Đang điều tra" },
  { maVu: "NGD-2025-013", diaDiem: "Tiệc sinh nhật tư gia đường Lê Quang Định", ngayXayRa: "11/03/2025", soNguoiMac: 7, soNguoiNhapVien: 2, nguyenNhan: "Chưa xác định", trangThai: "Đang điều tra" },
  { maVu: "NGD-2025-014", diaDiem: "Quán bún thịt nướng P. Tân Định, Q.1", ngayXayRa: "12/03/2025", soNguoiMac: 3, soNguoiNhapVien: 1, nguyenNhan: "Vi sinh vật", trangThai: "Đang xử lý" },
  { maVu: "NGD-2025-015", diaDiem: "Căng tin Trường THPT Gia Định, Bình Thạnh", ngayXayRa: "14/03/2025", soNguoiMac: 19, soNguoiNhapVien: 5, nguyenNhan: "Vi khuẩn Salmonella", trangThai: "Đang điều tra" },
];

// Kết quả điều tra
const ketQuaDieuTraData: Record<string, unknown>[] = [
  { maVu: "NGD-2025-001", ketLuanNguyenNhan: "Vi khuẩn Salmonella trong thịt gà chưa nấu chín", bienPhapXuLy: "Đình chỉ bếp ăn, tiêu hủy thực phẩm, phạt 25 triệu", coSoLienQuan: "Bếp ăn Công ty Pou Yuen", ngayKetLuan: "20/01/2025", trangThai: "Hoàn thành" },
  { maVu: "NGD-2025-002", ketLuanNguyenNhan: "Thức ăn bảo quản không đúng cách, để quá 4 tiếng", bienPhapXuLy: "Cảnh cáo, yêu cầu cải thiện điều kiện bảo quản", coSoLienQuan: "Quán cơm Lê Văn Sỹ", ngayKetLuan: "25/01/2025", trangThai: "Hoàn thành" },
  { maVu: "NGD-2025-004", ketLuanNguyenNhan: "Hải sản nhiễm khuẩn do bảo quản lạnh không đủ nhiệt độ", bienPhapXuLy: "Phạt 50 triệu, tạm đình chỉ hoạt động 1 tháng", coSoLienQuan: "Nhà hàng Bông Sen", ngayKetLuan: "10/02/2025", trangThai: "Hoàn thành" },
  { maVu: "NGD-2025-005", ketLuanNguyenNhan: "Vi khuẩn E.coli trong rau sống không được rửa đúng cách", bienPhapXuLy: "Phạt 15 triệu, yêu cầu tập huấn vệ sinh thực phẩm", coSoLienQuan: "Canteen ĐH Bách Khoa", ngayKetLuan: "20/02/2025", trangThai: "Hoàn thành" },
  { maVu: "NGD-2025-007", ketLuanNguyenNhan: "Tụ cầu vàng từ thực phẩm chế biến sẵn để quá lâu", bienPhapXuLy: "Phạt 35 triệu, thay đổi quy trình chế biến", coSoLienQuan: "Bếp ăn Samsung HCMC", ngayKetLuan: "05/03/2025", trangThai: "Hoàn thành" },
  { maVu: "NGD-2025-010", ketLuanNguyenNhan: "Độc tố tetrodotoxin từ cá nóc được phục vụ trái phép", bienPhapXuLy: "Đình chỉ vĩnh viễn phục vụ cá nóc, phạt 80 triệu", coSoLienQuan: "Nhà hàng Hải sản Đại Dương", ngayKetLuan: "20/03/2025", trangThai: "Hoàn thành" },
  { maVu: "NGD-2025-003", ketLuanNguyenNhan: "Đang lấy mẫu thực phẩm xét nghiệm tại viện kiểm nghiệm", bienPhapXuLy: "Tạm đình chỉ bếp ăn, chờ kết quả xét nghiệm", coSoLienQuan: "Nhà trẻ Họa Mi", ngayKetLuan: "Đang điều tra", trangThai: "Đang xử lý" },
  { maVu: "NGD-2025-009", ketLuanNguyenNhan: "Phân lập được Listeria monocytogenes trong mẫu thức ăn", bienPhapXuLy: "Đình chỉ canteen, tiêu hủy toàn bộ thực phẩm", coSoLienQuan: "Trường Tiểu học Lê Văn Tám", ngayKetLuan: "Đang hoàn tất", trangThai: "Đang xử lý" },
];

const vuNgoDocColumns = [
  { key: "maVu", label: "Mã vụ", sortable: true },
  { key: "diaDiem", label: "Địa điểm xảy ra" },
  { key: "ngayXayRa", label: "Ngày xảy ra" },
  { key: "soNguoiMac", label: "Số người mắc", sortable: true },
  { key: "soNguoiNhapVien", label: "Nhập viện", sortable: true },
  { key: "nguyenNhan", label: "Nguyên nhân nghi ngờ" },
  {
    key: "trangThai", label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const val = String(row.trangThai);
      const variant = val === "Đã kết luận" ? "success" : val === "Đang điều tra" ? "warning" : "info";
      return <Badge variant={variant as "success" | "warning" | "info"}>{val}</Badge>;
    },
  },
];

const ketQuaColumns = [
  { key: "maVu", label: "Mã vụ", sortable: true },
  { key: "ketLuanNguyenNhan", label: "Kết luận nguyên nhân" },
  { key: "bienPhapXuLy", label: "Biện pháp xử lý" },
  { key: "coSoLienQuan", label: "Cơ sở liên quan" },
  { key: "ngayKetLuan", label: "Ngày kết luận" },
  {
    key: "trangThai", label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const val = String(row.trangThai);
      const variant = val === "Hoàn thành" ? "success" : "warning";
      return <Badge variant={variant as "success" | "warning"}>{val}</Badge>;
    },
  },
];

const tabs = [
  { id: "danh-sach", label: "Danh sách vụ ngộ độc", icon: AlertTriangle },
  { id: "ket-qua", label: "Kết quả điều tra", icon: FlaskConical },
];

export default function DanhSachNgoDocPage() {
  const [tab, setTab] = useState("danh-sach");

  return (
    <DashboardLayout>
      <PageHeader
        title="Ngộ độc thực phẩm"
        subtitle="Quản lý danh sách vụ ngộ độc và kết quả điều tra nguyên nhân"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Plus size={16} />
            Khai báo vụ mới
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon size={20} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
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
          {tab === "danh-sach" && (
            <DataTable columns={vuNgoDocColumns} data={vuNgoDocData} searchable searchKeys={["maVu", "diaDiem", "nguyenNhan"]} />
          )}
          {tab === "ket-qua" && (
            <DataTable columns={ketQuaColumns} data={ketQuaDieuTraData} searchable searchKeys={["maVu", "coSoLienQuan", "ketLuanNguyenNhan"]} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
