"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Plus, AlertTriangle, FileCheck2, Clock, CheckCircle } from "lucide-react";

const data: Record<string, unknown>[] = [
  { soGCN: "GCN-2024-001234", tenCoSo: "Công ty TNHH Thực phẩm Sài Gòn Xanh", loaiHinh: "Sản xuất", diaChi: "123 Nguyễn Văn Linh, Q.7", ngayCap: "15/03/2024", ngayHetHan: "15/03/2027", conLai: 369, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2024-001289", tenCoSo: "Nhà hàng Hải sản Biển Đông", loaiHinh: "Dịch vụ ăn uống", diaChi: "78 Võ Văn Kiệt, Q.1", ngayCap: "22/04/2024", ngayHetHan: "22/04/2027", conLai: 407, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2023-009876", tenCoSo: "Xí nghiệp Chế biến Thực phẩm Bình Minh", loaiHinh: "Chế biến", diaChi: "56 QL1A, Bình Tân", ngayCap: "10/01/2023", ngayHetHan: "10/01/2026", conLai: 305, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2022-007412", tenCoSo: "Siêu thị Mini Phước Lộc", loaiHinh: "Kinh doanh", diaChi: "234 Tên Lửa, Bình Tân", ngayCap: "05/06/2022", ngayHetHan: "05/04/2026", conLai: 25, trangThai: "Sắp hết hạn" },
  { soGCN: "GCN-2022-005631", tenCoSo: "Quán ăn Cơm Tấm Thuận Kiều", loaiHinh: "Dịch vụ ăn uống", diaChi: "89 Lý Thường Kiệt, Q.10", ngayCap: "18/07/2022", ngayHetHan: "12/04/2026", conLai: 32, trangThai: "Sắp hết hạn" },
  { soGCN: "GCN-2021-003218", tenCoSo: "Cửa hàng Bánh mì Hương Việt", loaiHinh: "Kinh doanh", diaChi: "45 Lê Văn Sỹ, Q.3", ngayCap: "20/09/2021", ngayHetHan: "20/09/2024", conLai: -533, trangThai: "Đã hết hạn" },
  { soGCN: "GCN-2024-002541", tenCoSo: "Công ty CP Thực phẩm Đông Lạnh Mê Kông", loaiHinh: "Sản xuất", diaChi: "KCN Tân Bình", ngayCap: "08/08/2024", ngayHetHan: "08/08/2027", conLai: 515, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2024-003012", tenCoSo: "Nhà hàng Buffet Nhật Sakura", loaiHinh: "Dịch vụ ăn uống", diaChi: "Vincom Đồng Khởi, Q.1", ngayCap: "12/09/2024", ngayHetHan: "12/09/2027", conLai: 550, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2023-008741", tenCoSo: "Công ty TNHH Nước uống Ánh Dương", loaiHinh: "Sản xuất", diaChi: "18 Bình Long, Tân Phú", ngayCap: "25/11/2023", ngayHetHan: "25/11/2026", conLai: 259, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2022-006320", tenCoSo: "Bếp ăn Bệnh viện Chợ Rẫy", loaiHinh: "Bếp ăn tập thể", diaChi: "201B Nguyễn Chí Thanh, Q.5", ngayCap: "14/03/2022", ngayHetHan: "14/04/2026", conLai: 34, trangThai: "Sắp hết hạn" },
  { soGCN: "GCN-2021-002109", tenCoSo: "Hợp tác xã Rau sạch Bình Chánh", loaiHinh: "Sản xuất", diaChi: "Ấp 5, Xã Tân Quý Tây, Bình Chánh", ngayCap: "30/04/2021", ngayHetHan: "30/04/2024", conLai: -680, trangThai: "Đã hết hạn" },
  { soGCN: "GCN-2024-004187", tenCoSo: "Công ty TNHH Chế biến Thủy sản Phú Quý", loaiHinh: "Chế biến", diaChi: "Lô B12 KCN Hiệp Phước", ngayCap: "07/11/2024", ngayHetHan: "07/11/2027", conLai: 606, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2023-007856", tenCoSo: "Chuỗi Cà phê Sáng Việt", loaiHinh: "Dịch vụ ăn uống", diaChi: "12 Đinh Tiên Hoàng, Bình Thạnh", ngayCap: "19/05/2023", ngayHetHan: "19/05/2026", conLai: 69, trangThai: "Còn hiệu lực" },
  { soGCN: "GCN-2022-004523", tenCoSo: "Lò bánh mì Thành Công", loaiHinh: "Sản xuất", diaChi: "67 Cách Mạng Tháng 8, Q.3", ngayCap: "02/08/2022", ngayHetHan: "02/04/2026", conLai: 22, trangThai: "Sắp hết hạn" },
  { soGCN: "GCN-2020-000987", tenCoSo: "Cơ sở sản xuất nước mắm Phú Quốc", loaiHinh: "Sản xuất", diaChi: "Số 9 Nguyễn Kiệm, Phú Nhuận", ngayCap: "15/12/2020", ngayHetHan: "15/12/2023", conLai: -817, trangThai: "Đã hết hạn" },
];

const expiryStats = [
  { label: "Tổng giấy chứng nhận", value: "2,561", icon: FileCheck2, color: "text-brand-600", bg: "bg-brand-50" },
  { label: "Còn hiệu lực", value: "2,429", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "Sắp hết hạn (<30 ngày)", value: "64", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Đã hết hạn", value: "68", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
];

const columns = [
  { key: "soGCN", label: "Số GCN", sortable: true },
  { key: "tenCoSo", label: "Tên cơ sở", sortable: true },
  { key: "loaiHinh", label: "Loại hình", sortable: true },
  { key: "diaChi", label: "Địa chỉ" },
  { key: "ngayCap", label: "Ngày cấp" },
  { key: "ngayHetHan", label: "Ngày hết hạn" },
  {
    key: "conLai",
    label: "Còn lại",
    render: (row: Record<string, unknown>) => {
      const days = Number(row.conLai);
      if (days < 0) return <span className="text-xs font-semibold text-red-600">Hết hạn {Math.abs(days)} ngày</span>;
      if (days <= 30) return <span className="text-xs font-semibold text-amber-600">Còn {days} ngày</span>;
      return <span className="text-xs text-gray-500">Còn {days} ngày</span>;
    },
  },
  {
    key: "trangThai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const val = String(row.trangThai);
      const variant = val === "Còn hiệu lực" ? "success" : val === "Sắp hết hạn" ? "warning" : "danger";
      return <Badge variant={variant as "success" | "warning" | "danger"}>{val}</Badge>;
    },
  },
];

export default function DanhSachGCNPage() {
  const sap = data.filter((d) => d.trangThai === "Sắp hết hạn");
  const hetHan = data.filter((d) => d.trangThai === "Đã hết hạn");

  return (
    <DashboardLayout>
      <PageHeader
        title="Giấy chứng nhận ATTP"
        subtitle="Quản lý, theo dõi thời hạn và cảnh báo giấy chứng nhận an toàn thực phẩm"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Plus size={16} />
            Cấp mới GCN
          </button>
        }
      />

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {expiryStats.map((s) => {
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

      {/* Cảnh báo chung */}
      {(sap.length > 0 || hetHan.length > 0) && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-500" />
            <h3 className="font-semibold text-gray-800">Cảnh báo thời hạn giấy chứng nhận</h3>
          </div>
          <div className="space-y-2">
            {hetHan.map((item) => (
              <div key={String(item.soGCN)} className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800">
                <AlertTriangle size={14} className="shrink-0 text-red-600" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold">{String(item.tenCoSo)}</span>
                  <span className="text-xs ml-2 opacity-70">– {String(item.soGCN)} – Hết hạn: {String(item.ngayHetHan)}</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-200 text-red-800 shrink-0">Đã hết hạn</span>
              </div>
            ))}
            {sap.map((item) => (
              <div key={String(item.soGCN)} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                <Clock size={14} className="shrink-0 text-amber-600" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold">{String(item.tenCoSo)}</span>
                  <span className="text-xs ml-2 opacity-70">– {String(item.soGCN)} – Hết hạn: {String(item.ngayHetHan)}</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 shrink-0">Còn {Number(item.conLai)} ngày</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Danh sách đầy đủ */}
      <DataTable columns={columns} data={data} searchable searchKeys={["soGCN", "tenCoSo", "diaChi", "loaiHinh"]} />
    </DashboardLayout>
  );
}
