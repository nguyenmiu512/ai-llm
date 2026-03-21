"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const transactions = [
  { id: "GD000001", loai: "Tạo", doi_tuong: "Sản phẩm SP-0412", nguoi_dung: "Nguyễn Văn An", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:00:01" },
  { id: "GD000002", loai: "Cập nhật", doi_tuong: "Lô hàng LO-2026-0019", nguoi_dung: "Trần Thị Bích", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:00:15" },
  { id: "GD000003", loai: "Đọc", doi_tuong: "Chứng chỉ CN-001", nguoi_dung: "admin@ndatrace.vn", ip: "192.168.1.10", ket_qua: "success", thoi_gian: "08/03/2026 08:00:28" },
  { id: "GD000004", loai: "Tạo", doi_tuong: "Sự kiện SK-2026-1024", nguoi_dung: "Lê Minh Cường", ip: "10.0.0.8", ket_qua: "success", thoi_gian: "08/03/2026 08:01:00" },
  { id: "GD000005", loai: "Xóa", doi_tuong: "Webhook WH-0049", nguoi_dung: "admin@ndatrace.vn", ip: "10.0.0.1", ket_qua: "success", thoi_gian: "08/03/2026 08:01:40" },
  { id: "GD000006", loai: "Tạo", doi_tuong: "UID Pool UID-REGION-HN", nguoi_dung: "htrung@ndatrace.vn", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:02:00" },
  { id: "GD000007", loai: "Cập nhật", doi_tuong: "Người dùng UID nguyen.van.a", nguoi_dung: "admin@ndatrace.vn", ip: "10.0.0.1", ket_qua: "success", thoi_gian: "08/03/2026 08:02:30" },
  { id: "GD000008", loai: "Đọc", doi_tuong: "Báo cáo hoạt động tháng 2/2026", nguoi_dung: "giam.doc@ndatrace.vn", ip: "103.201.0.15", ket_qua: "success", thoi_gian: "08/03/2026 08:03:00" },
  { id: "GD000009", loai: "Tạo", doi_tuong: "Tổ chức ORG-0088", nguoi_dung: "admin@ndatrace.vn", ip: "10.0.0.1", ket_qua: "failed", thoi_gian: "08/03/2026 08:03:30" },
  { id: "GD000010", loai: "Cập nhật", doi_tuong: "Chứng chỉ CN-006 - gia hạn", nguoi_dung: "Phạm Hồng Dương", ip: "10.0.0.8", ket_qua: "success", thoi_gian: "08/03/2026 08:04:00" },
  { id: "GD000011", loai: "Tạo", doi_tuong: "Mẫu sự kiện MSK-016", nguoi_dung: "Vũ Thị Oanh", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:04:30" },
  { id: "GD000012", loai: "Đọc", doi_tuong: "Danh sách API logs 7 ngày", nguoi_dung: "it.admin@ndatrace.vn", ip: "10.0.0.2", ket_qua: "success", thoi_gian: "08/03/2026 08:05:00" },
  { id: "GD000013", loai: "Xóa", doi_tuong: "Cảnh báo CB-018 đã xử lý", nguoi_dung: "Đặng Minh Khoa", ip: "10.0.0.8", ket_qua: "success", thoi_gian: "08/03/2026 08:05:30" },
  { id: "GD000014", loai: "Cập nhật", doi_tuong: "Sản phẩm SP001 - cập nhật mô tả", nguoi_dung: "Hoàng Thị Lan", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:06:00" },
  { id: "GD000015", loai: "Tạo", doi_tuong: "QR Batch QR-2026-0025", nguoi_dung: "Lê Minh Cường", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:06:30" },
  { id: "GD000016", loai: "Đọc", doi_tuong: "Transaction log GD000001-GD000010", nguoi_dung: "audit@ndatrace.vn", ip: "10.0.0.4", ket_qua: "success", thoi_gian: "08/03/2026 08:07:00" },
  { id: "GD000017", loai: "Cập nhật", doi_tuong: "Cảnh báo CB-003 - chuyển trạng thái", nguoi_dung: "Nguyễn Văn An", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:07:30" },
  { id: "GD000018", loai: "Tạo", doi_tuong: "Sự kiện gắn tem GT-020", nguoi_dung: "Đặng Minh Khoa", ip: "10.0.0.8", ket_qua: "failed", thoi_gian: "08/03/2026 08:08:00" },
  { id: "GD000019", loai: "Xóa", doi_tuong: "UID tạm thời UID-TEMP-04421", nguoi_dung: "admin@ndatrace.vn", ip: "10.0.0.1", ket_qua: "success", thoi_gian: "08/03/2026 08:08:30" },
  { id: "GD000020", loai: "Đọc", doi_tuong: "Thống kê UID tháng 3/2026", nguoi_dung: "giam.doc@ndatrace.vn", ip: "103.201.0.15", ket_qua: "success", thoi_gian: "08/03/2026 08:09:00" },
  { id: "GD000021", loai: "Cập nhật", doi_tuong: "Tổ chức ORG-018 - cập nhật địa chỉ", nguoi_dung: "admin@ndatrace.vn", ip: "10.0.0.1", ket_qua: "success", thoi_gian: "08/03/2026 08:09:30" },
  { id: "GD000022", loai: "Tạo", doi_tuong: "Chứng chỉ CN-021", nguoi_dung: "Trần Thị Bích", ip: "10.0.0.8", ket_qua: "success", thoi_gian: "08/03/2026 08:10:00" },
  { id: "GD000023", loai: "Đọc", doi_tuong: "Sản phẩm SP001-SP025 toàn bộ", nguoi_dung: "Hoàng Thị Lan", ip: "10.0.0.5", ket_qua: "success", thoi_gian: "08/03/2026 08:10:30" },
  { id: "GD000024", loai: "Xóa", doi_tuong: "Mẫu sự kiện MSK-009 ngừng dùng", nguoi_dung: "Vũ Thị Oanh", ip: "10.0.0.8", ket_qua: "success", thoi_gian: "08/03/2026 08:11:00" },
  { id: "GD000025", loai: "Tạo", doi_tuong: "Người dùng mới: bnguyen@hsx.vn", nguoi_dung: "admin@ndatrace.vn", ip: "10.0.0.1", ket_qua: "success", thoi_gian: "08/03/2026 08:11:30" },
];

const loaiColors: Record<string, "success" | "info" | "warning" | "danger"> = {
  "Tạo": "success",
  "Cập nhật": "info",
  "Xóa": "danger",
  "Đọc": "warning",
};

const columns = [
  { key: "id", label: "Mã GD", width: "100px" },
  {
    key: "loai",
    label: "Loại",
    render: (row: Record<string, unknown>) => (
      <Badge variant={loaiColors[row.loai as string] ?? "neutral"}>{row.loai as string}</Badge>
    ),
  },
  { key: "doi_tuong", label: "Đối tượng" },
  { key: "nguoi_dung", label: "Người dùng" },
  { key: "ip", label: "IP" },
  {
    key: "ket_qua",
    label: "Kết quả",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.ket_qua === "success" ? "success" : "danger"}>
        {row.ket_qua === "success" ? "Thành công" : "Thất bại"}
      </Badge>
    ),
  },
  { key: "thoi_gian", label: "Thời gian" },
];

export default function Page() {
  return (
    <SectionPage
      title="Nhật ký giao dịch"
      subtitle="Nhật ký giao dịch và xử lý dữ liệu trong hệ thống"
      stats={[
        { label: "Tổng giao dịch", value: transactions.length, variant: "info" },
        { label: "Thành công", value: transactions.filter((t) => t.ket_qua === "success").length, variant: "success" },
        { label: "Thất bại", value: transactions.filter((t) => t.ket_qua === "failed").length, variant: "danger" },
        { label: "Thao tác xóa", value: transactions.filter((t) => t.loai === "Xóa").length, variant: "warning" },
      ]}
      tableColumns={columns}
      tableData={transactions}
      searchKeys={["id", "loai", "doi_tuong", "nguoi_dung", "ip"]}
      addLabel="Xuất logs"
    />
  );
}
