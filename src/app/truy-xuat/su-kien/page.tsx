"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const events = [
  { id: "SK001", loai: "Thu hoạch", san_pham: "Gạo ST25 hữu cơ", lo_hang: "LO-2026-0001", dia_diem: "Sóc Trăng", thoi_gian: "01/03/2026 06:00", trang_thai: "verified" },
  { id: "SK002", loai: "Sản xuất", san_pham: "Tôm sú đông lạnh", lo_hang: "LO-2026-0002", dia_diem: "Cà Mau", thoi_gian: "01/03/2026 08:30", trang_thai: "verified" },
  { id: "SK003", loai: "Đóng gói", san_pham: "Cà phê Arabica Đà Lạt", lo_hang: "LO-2026-0003", dia_diem: "Lâm Đồng", thoi_gian: "02/03/2026 09:00", trang_thai: "pending" },
  { id: "SK004", loai: "Vận chuyển", san_pham: "Nước mắm Phú Quốc", lo_hang: "LO-2026-0004", dia_diem: "Phú Quốc → TP.HCM", thoi_gian: "02/03/2026 14:00", trang_thai: "verified" },
  { id: "SK005", loai: "Lưu kho", san_pham: "Xoài cát Hòa Lộc", lo_hang: "LO-2026-0005", dia_diem: "Kho lạnh Bình Dương", thoi_gian: "03/03/2026 10:00", trang_thai: "verified" },
  { id: "SK006", loai: "Phân phối", san_pham: "Cá tra phi-lê", lo_hang: "LO-2026-0006", dia_diem: "TP.HCM", thoi_gian: "03/03/2026 16:00", trang_thai: "verified" },
  { id: "SK007", loai: "Thu hoạch", san_pham: "Rau muống VietGAP", lo_hang: "LO-2026-0007", dia_diem: "Đà Lạt, Lâm Đồng", thoi_gian: "04/03/2026 05:30", trang_thai: "pending" },
  { id: "SK008", loai: "Sản xuất", san_pham: "Nước dừa tươi đóng lon", lo_hang: "LO-2026-0008", dia_diem: "Bến Tre", thoi_gian: "04/03/2026 07:00", trang_thai: "verified" },
  { id: "SK009", loai: "Đóng gói", san_pham: "Hạt điều rang muối", lo_hang: "LO-2026-0009", dia_diem: "Bình Phước", thoi_gian: "04/03/2026 11:00", trang_thai: "rejected" },
  { id: "SK010", loai: "Vận chuyển", san_pham: "Trà ô long cao nguyên", lo_hang: "LO-2026-0010", dia_diem: "Đà Lạt → Hà Nội", thoi_gian: "05/03/2026 08:00", trang_thai: "verified" },
  { id: "SK011", loai: "Lưu kho", san_pham: "Bưởi da xanh Bến Tre", lo_hang: "LO-2026-0011", dia_diem: "Kho lạnh Bến Tre", thoi_gian: "05/03/2026 12:00", trang_thai: "verified" },
  { id: "SK012", loai: "Phân phối", san_pham: "Mực khô Bình Thuận", lo_hang: "LO-2026-0012", dia_diem: "Hà Nội", thoi_gian: "05/03/2026 17:00", trang_thai: "pending" },
  { id: "SK013", loai: "Thu hoạch", san_pham: "Mật ong rừng Tây Nguyên", lo_hang: "LO-2026-0013", dia_diem: "Kon Tum", thoi_gian: "06/03/2026 06:00", trang_thai: "verified" },
  { id: "SK014", loai: "Sản xuất", san_pham: "Sữa tươi thanh trùng", lo_hang: "LO-2026-0014", dia_diem: "Mộc Châu, Sơn La", thoi_gian: "06/03/2026 08:00", trang_thai: "verified" },
  { id: "SK015", loai: "Đóng gói", san_pham: "Tôm hùm đất sống", lo_hang: "LO-2026-0015", dia_diem: "Khánh Hòa", thoi_gian: "06/03/2026 10:00", trang_thai: "verified" },
  { id: "SK016", loai: "Vận chuyển", san_pham: "Dưa hấu không hạt", lo_hang: "LO-2026-0016", dia_diem: "Long An → TP.HCM", thoi_gian: "06/03/2026 13:00", trang_thai: "pending" },
  { id: "SK017", loai: "Thu hoạch", san_pham: "Vải thiều Lục Ngạn", lo_hang: "LO-2026-0017", dia_diem: "Lục Ngạn, Bắc Giang", thoi_gian: "07/03/2026 05:00", trang_thai: "verified" },
  { id: "SK018", loai: "Lưu kho", san_pham: "Cua biển Cà Mau", lo_hang: "LO-2026-0018", dia_diem: "Kho lạnh Cà Mau", thoi_gian: "07/03/2026 09:00", trang_thai: "verified" },
  { id: "SK019", loai: "Phân phối", san_pham: "Nước ép cam tươi", lo_hang: "LO-2026-0019", dia_diem: "Hà Nội", thoi_gian: "07/03/2026 14:00", trang_thai: "rejected" },
  { id: "SK020", loai: "Sản xuất", san_pham: "Cá ngừ đại dương đóng hộp", lo_hang: "LO-2026-0020", dia_diem: "Đà Nẵng", thoi_gian: "07/03/2026 16:00", trang_thai: "verified" },
  { id: "SK021", loai: "Đóng gói", san_pham: "Nhãn lồng Hưng Yên", lo_hang: "LO-2026-0021", dia_diem: "Hưng Yên", thoi_gian: "08/03/2026 07:00", trang_thai: "pending" },
  { id: "SK022", loai: "Vận chuyển", san_pham: "Thịt bò nhập khẩu Úc", lo_hang: "LO-2026-0022", dia_diem: "Cảng Cát Lái → Kho TP.HCM", thoi_gian: "08/03/2026 09:00", trang_thai: "verified" },
  { id: "SK023", loai: "Thu hoạch", san_pham: "Tiêu đen Chư Sê", lo_hang: "LO-2026-0023", dia_diem: "Chư Sê, Gia Lai", thoi_gian: "08/03/2026 06:30", trang_thai: "verified" },
  { id: "SK024", loai: "Lưu kho", san_pham: "Hạt điều rang muối", lo_hang: "LO-2026-0024", dia_diem: "Kho Bình Phước", thoi_gian: "08/03/2026 11:00", trang_thai: "pending" },
  { id: "SK025", loai: "Phân phối", san_pham: "Gạo ST25 hữu cơ", lo_hang: "LO-2026-0025", dia_diem: "Siêu thị Aeon Hà Nội", thoi_gian: "08/03/2026 14:00", trang_thai: "verified" },
];

const loaiColors: Record<string, "success" | "info" | "warning" | "neutral" | "danger"> = {
  "Sản xuất": "info",
  "Thu hoạch": "success",
  "Đóng gói": "neutral",
  "Vận chuyển": "warning",
  "Lưu kho": "neutral",
  "Phân phối": "info",
};

const columns = [
  { key: "id", label: "Mã SK", width: "90px" },
  {
    key: "loai",
    label: "Loại sự kiện",
    render: (row: Record<string, unknown>) => (
      <Badge variant={loaiColors[row.loai as string] ?? "neutral"}>{row.loai as string}</Badge>
    ),
  },
  { key: "san_pham", label: "Sản phẩm" },
  { key: "lo_hang", label: "Lô hàng" },
  { key: "dia_diem", label: "Địa điểm" },
  { key: "thoi_gian", label: "Thời gian" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
        verified: { label: "Đã xác thực", variant: "success" },
        pending: { label: "Chờ xác thực", variant: "warning" },
        rejected: { label: "Từ chối", variant: "danger" },
      };
      const m = map[row.trang_thai as string];
      return <Badge variant={m.variant}>{m.label}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Sự kiện truy xuất"
      subtitle="Danh sách sự kiện trong chuỗi truy xuất nguồn gốc"
      stats={[
        { label: "Tổng sự kiện", value: events.length, variant: "info" },
        { label: "Đã xác thực", value: events.filter((e) => e.trang_thai === "verified").length, variant: "success" },
        { label: "Chờ xác thực", value: events.filter((e) => e.trang_thai === "pending").length, variant: "warning" },
        { label: "Từ chối", value: events.filter((e) => e.trang_thai === "rejected").length, variant: "danger" },
      ]}
      tableColumns={columns}
      tableData={events}
      searchKeys={["id", "loai", "san_pham", "lo_hang", "dia_diem"]}
      addLabel="Tạo sự kiện"
    />
  );
}
