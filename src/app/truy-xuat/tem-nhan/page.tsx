"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const labels = [
  { uid: "UID-VN-00100001", san_pham: "Gạo ST25 hữu cơ", lo_hang: "LO-2026-0001", loai_tem: "QR", trang_thai: "attached", ngay_cap: "02/01/2026", ngay_quet: "05/03/2026" },
  { uid: "UID-VN-00100002", san_pham: "Tôm sú đông lạnh", lo_hang: "LO-2026-0002", loai_tem: "UID", trang_thai: "attached", ngay_cap: "02/01/2026", ngay_quet: "07/03/2026" },
  { uid: "UID-VN-00100003", san_pham: "Cà phê Arabica Đà Lạt", lo_hang: "LO-2026-0003", loai_tem: "QR", trang_thai: "unattached", ngay_cap: "03/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100004", san_pham: "Nước mắm Phú Quốc", lo_hang: "LO-2026-0004", loai_tem: "RFID", trang_thai: "attached", ngay_cap: "03/01/2026", ngay_quet: "06/03/2026" },
  { uid: "UID-VN-00100005", san_pham: "Xoài cát Hòa Lộc", lo_hang: "LO-2026-0005", loai_tem: "QR", trang_thai: "cancelled", ngay_cap: "04/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100006", san_pham: "Cá tra phi-lê đông lạnh", lo_hang: "LO-2026-0006", loai_tem: "UID", trang_thai: "attached", ngay_cap: "05/01/2026", ngay_quet: "08/03/2026" },
  { uid: "UID-VN-00100007", san_pham: "Rau muống VietGAP", lo_hang: "LO-2026-0007", loai_tem: "QR", trang_thai: "unattached", ngay_cap: "06/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100008", san_pham: "Nước dừa tươi đóng lon", lo_hang: "LO-2026-0008", loai_tem: "RFID", trang_thai: "attached", ngay_cap: "07/01/2026", ngay_quet: "07/03/2026" },
  { uid: "UID-VN-00100009", san_pham: "Hạt điều rang muối", lo_hang: "LO-2026-0009", loai_tem: "QR", trang_thai: "attached", ngay_cap: "08/01/2026", ngay_quet: "06/03/2026" },
  { uid: "UID-VN-00100010", san_pham: "Trà ô long cao nguyên", lo_hang: "LO-2026-0010", loai_tem: "UID", trang_thai: "cancelled", ngay_cap: "09/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100011", san_pham: "Bưởi da xanh Bến Tre", lo_hang: "LO-2026-0011", loai_tem: "QR", trang_thai: "attached", ngay_cap: "10/01/2026", ngay_quet: "05/03/2026" },
  { uid: "UID-VN-00100012", san_pham: "Mực khô Bình Thuận", lo_hang: "LO-2026-0012", loai_tem: "QR", trang_thai: "unattached", ngay_cap: "11/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100013", san_pham: "Sữa tươi thanh trùng", lo_hang: "LO-2026-0013", loai_tem: "RFID", trang_thai: "attached", ngay_cap: "12/01/2026", ngay_quet: "08/03/2026" },
  { uid: "UID-VN-00100014", san_pham: "Mật ong rừng Tây Nguyên", lo_hang: "LO-2026-0014", loai_tem: "QR", trang_thai: "attached", ngay_cap: "13/01/2026", ngay_quet: "04/03/2026" },
  { uid: "UID-VN-00100015", san_pham: "Chôm chôm nhãn Đồng Nai", lo_hang: "LO-2026-0015", loai_tem: "UID", trang_thai: "cancelled", ngay_cap: "14/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100016", san_pham: "Tôm hùm đất sống", lo_hang: "LO-2026-0016", loai_tem: "QR", trang_thai: "attached", ngay_cap: "15/01/2026", ngay_quet: "08/03/2026" },
  { uid: "UID-VN-00100017", san_pham: "Dưa hấu không hạt", lo_hang: "LO-2026-0017", loai_tem: "QR", trang_thai: "unattached", ngay_cap: "16/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100018", san_pham: "Vải thiều Lục Ngạn", lo_hang: "LO-2026-0018", loai_tem: "RFID", trang_thai: "attached", ngay_cap: "17/01/2026", ngay_quet: "06/03/2026" },
  { uid: "UID-VN-00100019", san_pham: "Cua biển Cà Mau", lo_hang: "LO-2026-0019", loai_tem: "UID", trang_thai: "attached", ngay_cap: "18/01/2026", ngay_quet: "07/03/2026" },
  { uid: "UID-VN-00100020", san_pham: "Nước ép cam tươi", lo_hang: "LO-2026-0020", loai_tem: "QR", trang_thai: "unattached", ngay_cap: "19/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100021", san_pham: "Tiêu đen Chư Sê", lo_hang: "LO-2026-0021", loai_tem: "QR", trang_thai: "attached", ngay_cap: "20/01/2026", ngay_quet: "05/03/2026" },
  { uid: "UID-VN-00100022", san_pham: "Cá ngừ đại dương đóng hộp", lo_hang: "LO-2026-0022", loai_tem: "RFID", trang_thai: "attached", ngay_cap: "21/01/2026", ngay_quet: "08/03/2026" },
  { uid: "UID-VN-00100023", san_pham: "Nhãn lồng Hưng Yên", lo_hang: "LO-2026-0023", loai_tem: "QR", trang_thai: "cancelled", ngay_cap: "22/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100024", san_pham: "Thịt bò nhập khẩu Úc", lo_hang: "LO-2026-0024", loai_tem: "UID", trang_thai: "attached", ngay_cap: "23/01/2026", ngay_quet: "07/03/2026" },
  { uid: "UID-VN-00100025", san_pham: "Gạo ST25 hữu cơ", lo_hang: "LO-2026-0025", loai_tem: "QR", trang_thai: "attached", ngay_cap: "24/01/2026", ngay_quet: "08/03/2026" },
  { uid: "UID-VN-00100026", san_pham: "Tôm sú đông lạnh", lo_hang: "LO-2026-0026", loai_tem: "RFID", trang_thai: "unattached", ngay_cap: "25/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100027", san_pham: "Bưởi da xanh Bến Tre", lo_hang: "LO-2026-0027", loai_tem: "QR", trang_thai: "attached", ngay_cap: "26/01/2026", ngay_quet: "06/03/2026" },
  { uid: "UID-VN-00100028", san_pham: "Cá tra phi-lê đông lạnh", lo_hang: "LO-2026-0028", loai_tem: "UID", trang_thai: "attached", ngay_cap: "27/01/2026", ngay_quet: "08/03/2026" },
  { uid: "UID-VN-00100029", san_pham: "Mực khô Bình Thuận", lo_hang: "LO-2026-0029", loai_tem: "QR", trang_thai: "unattached", ngay_cap: "28/01/2026", ngay_quet: "-" },
  { uid: "UID-VN-00100030", san_pham: "Hạt điều rang muối", lo_hang: "LO-2026-0030", loai_tem: "QR", trang_thai: "attached", ngay_cap: "29/01/2026", ngay_quet: "07/03/2026" },
];

const columns = [
  { key: "uid", label: "Mã UID", width: "160px" },
  { key: "san_pham", label: "Sản phẩm" },
  { key: "lo_hang", label: "Lô hàng" },
  {
    key: "loai_tem",
    label: "Loại tem",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "info" | "success" | "neutral"> = { QR: "info", UID: "success", RFID: "neutral" };
      return <Badge variant={map[row.loai_tem as string] ?? "neutral"}>{row.loai_tem as string}</Badge>;
    },
  },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
        attached: { label: "Đã gắn", variant: "success" },
        unattached: { label: "Chưa gắn", variant: "warning" },
        cancelled: { label: "Hủy", variant: "danger" },
      };
      const m = map[row.trang_thai as string];
      return <Badge variant={m.variant}>{m.label}</Badge>;
    },
  },
  { key: "ngay_cap", label: "Ngày cấp" },
  { key: "ngay_quet", label: "Ngày quét cuối" },
];

export default function Page() {
  return (
    <SectionPage
      title="Tem nhãn (UID/QR)"
      subtitle="Quản lý tem nhãn điện tử và mã QR trong hệ thống"
      stats={[
        { label: "Tổng tem nhãn", value: labels.length, variant: "info" },
        { label: "Đã gắn", value: labels.filter((l) => l.trang_thai === "attached").length, variant: "success" },
        { label: "Chưa gắn", value: labels.filter((l) => l.trang_thai === "unattached").length, variant: "warning" },
        { label: "Đã hủy", value: labels.filter((l) => l.trang_thai === "cancelled").length, variant: "danger" },
      ]}
      tableColumns={columns}
      tableData={labels}
      searchKeys={["uid", "san_pham", "lo_hang", "loai_tem"]}
      addLabel="Cấp UID mới"
    />
  );
}
