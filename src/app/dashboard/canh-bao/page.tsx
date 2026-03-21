import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import { AlertTriangle, Clock, CheckCircle2, XCircle, FileCheck2, FileText } from "lucide-react";

// Giấy ATTP sắp hết hạn / đã hết hạn
const atpExpiry = [
  { id: 1, soGCN: "GCN-2022-007412", tenCoSo: "Siêu thị Mini Phước Lộc", ngayHetHan: "05/04/2026", conLai: 25, trangThai: "sap" },
  { id: 2, soGCN: "GCN-2022-005631", tenCoSo: "Quán ăn Cơm Tấm Thuận Kiều", ngayHetHan: "12/04/2026", conLai: 32, trangThai: "sap" },
  { id: 3, soGCN: "GCN-2022-006320", tenCoSo: "Bếp ăn Bệnh viện Chợ Rẫy", ngayHetHan: "14/04/2026", conLai: 34, trangThai: "sap" },
  { id: 4, soGCN: "GCN-2022-004523", tenCoSo: "Lò bánh mì Thành Công", ngayHetHan: "02/04/2026", conLai: 22, trangThai: "sap" },
  { id: 5, soGCN: "GCN-2021-003218", tenCoSo: "Cửa hàng Bánh mì Hương Việt", ngayHetHan: "20/09/2024", conLai: -533, trangThai: "hethan" },
  { id: 6, soGCN: "GCN-2021-002109", tenCoSo: "HTX Rau sạch Bình Chánh", ngayHetHan: "30/04/2024", conLai: -680, trangThai: "hethan" },
  { id: 7, soGCN: "GCN-2020-000987", tenCoSo: "Cơ sở sản xuất nước mắm Phú Quốc", ngayHetHan: "15/12/2023", conLai: -817, trangThai: "hethan" },
];

// Hồ sơ tự công bố sắp hết hạn / đã hết hạn
const tcbExpiry = [
  { id: 1, soHoSo: "TCB-2023-00891", tenSanPham: "Nước mắm cá cơm 40 độ đạm", donVi: "Cơ sở nước mắm Phú Quốc", ngayHetHan: "20/03/2026", conLai: 9, trangThai: "sap" },
  { id: 2, soHoSo: "TCB-2023-00934", tenSanPham: "Tương ớt sa tế đặc biệt", donVi: "Cơ sở Gia vị Bà Ngoại", ngayHetHan: "01/04/2026", conLai: 21, trangThai: "sap" },
  { id: 3, soHoSo: "TCB-2023-01012", tenSanPham: "Bánh phồng tôm Sa Giang 200g", donVi: "XN Chế biến TP Đồng Tháp", ngayHetHan: "08/04/2026", conLai: 28, trangThai: "sap" },
  { id: 4, soHoSo: "TCB-2022-00456", tenSanPham: "Mì gạo lứt hữu cơ 500g", donVi: "Công ty TNHH Thực phẩm Xanh", ngayHetHan: "10/02/2026", conLai: -29, trangThai: "hethan" },
  { id: 5, soHoSo: "TCB-2022-00512", tenSanPham: "Đường thốt nốt An Giang 500g", donVi: "HTX Nông nghiệp An Phú", ngayHetHan: "05/01/2026", conLai: -65, trangThai: "hethan" },
];

const generalAlerts = [
  { id: 1, title: "Lô hàng TP001 hết hạn chứng nhận", description: "Gạo ST25 – Công ty CP Lương thực Sóc Trăng", time: "Hôm nay, 08:30", level: "high", status: "Chưa xử lý" },
  { id: 2, title: "Phát hiện vi phạm nhãn hàng hóa", description: "Cơ sở sản xuất thực phẩm Minh Hằng – Quận 7", time: "Hôm qua, 14:20", level: "medium", status: "Đang xử lý" },
  { id: 3, title: "Báo cáo vụ ngộ độc thực phẩm tập thể", description: "Trường THCS Nguyễn Du – 23 học sinh bị ảnh hưởng", time: "3 ngày trước, 11:05", level: "high", status: "Đã xử lý" },
  { id: 4, title: "Cơ sở kinh doanh chưa đăng ký kiểm định", description: "15 cơ sở tại Bình Tân chưa hoàn thành thủ tục", time: "4 ngày trước, 08:45", level: "low", status: "Chưa xử lý" },
  { id: 5, title: "Hồ sơ tự công bố chờ phê duyệt", description: "8 hồ sơ đang chờ xét duyệt quá 7 ngày", time: "5 ngày trước, 15:30", level: "medium", status: "Đang xử lý" },
];

const levelStyle: Record<string, string> = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-blue-50 text-blue-700 border-blue-200",
};
const levelLabel: Record<string, string> = { high: "Cao", medium: "Trung bình", low: "Thấp" };
const statusStyle: Record<string, string> = {
  "Chưa xử lý": "bg-red-100 text-red-700",
  "Đang xử lý": "bg-amber-100 text-amber-700",
  "Đã xử lý": "bg-green-100 text-green-700",
};

const stats = [
  { label: "Tổng cảnh báo", value: "15", icon: AlertTriangle, color: "text-gray-600", bg: "bg-gray-50" },
  { label: "Chưa xử lý", value: "5", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  { label: "Đang xử lý", value: "6", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Đã xử lý", value: "4", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
];

export default function CanhBaoPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Cảnh báo hệ thống"
        subtitle="Theo dõi và xử lý các cảnh báo an toàn thực phẩm"
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

      {/* Giấy ATTP – cảnh báo hết hạn */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <FileCheck2 size={16} className="text-brand-600" />
          <h3 className="font-semibold text-gray-800">Giấy chứng nhận ATTP – Cảnh báo thời hạn</h3>
        </div>
        <div className="space-y-2">
          {atpExpiry.map((item) => {
            const isSap = item.trangThai === "sap";
            const row = isSap
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-red-50 border-red-200 text-red-800";
            return (
              <div key={item.id} className={`flex items-center gap-3 p-3.5 rounded-xl border ${row}`}>
                <AlertTriangle size={15} className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight">{item.tenCoSo}</p>
                  <p className="text-xs opacity-70 mt-0.5">Số GCN: {item.soGCN} – Hết hạn: {item.ngayHetHan}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${isSap ? "bg-amber-200 text-amber-800" : "bg-red-200 text-red-800"}`}>
                  {isSap ? `Còn ${item.conLai} ngày` : "Đã hết hạn"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hồ sơ tự công bố – cảnh báo hết hạn */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-teal-600" />
          <h3 className="font-semibold text-gray-800">Hồ sơ tự công bố – Cảnh báo thời hạn</h3>
        </div>
        <div className="space-y-2">
          {tcbExpiry.map((item) => {
            const isSap = item.trangThai === "sap";
            const row = isSap
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-red-50 border-red-200 text-red-800";
            return (
              <div key={item.id} className={`flex items-center gap-3 p-3.5 rounded-xl border ${row}`}>
                <AlertTriangle size={15} className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight">{item.tenSanPham}</p>
                  <p className="text-xs opacity-70 mt-0.5">{item.donVi} – Số HS: {item.soHoSo} – Hết hạn: {item.ngayHetHan}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${isSap ? "bg-amber-200 text-amber-800" : "bg-red-200 text-red-800"}`}>
                  {isSap ? `Còn ${item.conLai} ngày` : "Đã hết hạn"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cảnh báo chung */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Cảnh báo chung</h3>
        <div className="space-y-3">
          {generalAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border ${levelStyle[alert.level]} flex gap-3 items-start`}
            >
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">{alert.title}</p>
                <p className="text-sm opacity-70 mt-0.5">{alert.description}</p>
                <p className="flex items-center gap-1 text-xs opacity-60 mt-1">
                  <Clock size={10} />
                  {alert.time}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/60 border border-current">
                  {levelLabel[alert.level]}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[alert.status]}`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
