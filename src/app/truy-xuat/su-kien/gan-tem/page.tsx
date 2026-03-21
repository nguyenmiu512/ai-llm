"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const labelEvents = [
  { id: "GT001", ma_uid: "UID-VN-00100001", san_pham: "Gạo ST25 hữu cơ", lo_hang: "LO-2026-0001", nguoi_th: "Nguyễn Văn An", thoi_gian: "01/03/2026 08:15", ket_qua: "success" },
  { id: "GT002", ma_uid: "UID-VN-00100002", san_pham: "Tôm sú đông lạnh", lo_hang: "LO-2026-0002", nguoi_th: "Trần Thị Bích", thoi_gian: "01/03/2026 09:30", ket_qua: "success" },
  { id: "GT003", ma_uid: "UID-VN-00100003", san_pham: "Cà phê Arabica Đà Lạt", lo_hang: "LO-2026-0003", nguoi_th: "Lê Minh Cường", thoi_gian: "02/03/2026 07:45", ket_qua: "error" },
  { id: "GT004", ma_uid: "UID-VN-00100004", san_pham: "Nước mắm Phú Quốc", lo_hang: "LO-2026-0004", nguoi_th: "Phạm Hồng Dương", thoi_gian: "02/03/2026 10:00", ket_qua: "success" },
  { id: "GT005", ma_uid: "UID-VN-00100005", san_pham: "Xoài cát Hòa Lộc", lo_hang: "LO-2026-0005", nguoi_th: "Vũ Thị Oanh", thoi_gian: "03/03/2026 08:00", ket_qua: "success" },
  { id: "GT006", ma_uid: "UID-VN-00100006", san_pham: "Cá tra phi-lê đông lạnh", lo_hang: "LO-2026-0006", nguoi_th: "Đặng Minh Khoa", thoi_gian: "03/03/2026 11:30", ket_qua: "success" },
  { id: "GT007", ma_uid: "UID-VN-00100007", san_pham: "Rau muống VietGAP", lo_hang: "LO-2026-0007", nguoi_th: "Hoàng Thị Lan", thoi_gian: "04/03/2026 06:30", ket_qua: "error" },
  { id: "GT008", ma_uid: "UID-VN-00100008", san_pham: "Nước dừa tươi đóng lon", lo_hang: "LO-2026-0008", nguoi_th: "Nguyễn Văn An", thoi_gian: "04/03/2026 09:00", ket_qua: "success" },
  { id: "GT009", ma_uid: "UID-VN-00100009", san_pham: "Hạt điều rang muối", lo_hang: "LO-2026-0009", nguoi_th: "Trần Thị Bích", thoi_gian: "04/03/2026 13:15", ket_qua: "success" },
  { id: "GT010", ma_uid: "UID-VN-00100010", san_pham: "Bưởi da xanh Bến Tre", lo_hang: "LO-2026-0010", nguoi_th: "Lê Minh Cường", thoi_gian: "05/03/2026 08:45", ket_qua: "success" },
  { id: "GT011", ma_uid: "UID-VN-00100011", san_pham: "Mực khô Bình Thuận", lo_hang: "LO-2026-0011", nguoi_th: "Phạm Hồng Dương", thoi_gian: "05/03/2026 10:30", ket_qua: "error" },
  { id: "GT012", ma_uid: "UID-VN-00100012", san_pham: "Sữa tươi thanh trùng", lo_hang: "LO-2026-0012", nguoi_th: "Vũ Thị Oanh", thoi_gian: "05/03/2026 14:00", ket_qua: "success" },
  { id: "GT013", ma_uid: "UID-VN-00100013", san_pham: "Mật ong rừng Tây Nguyên", lo_hang: "LO-2026-0013", nguoi_th: "Đặng Minh Khoa", thoi_gian: "06/03/2026 07:30", ket_qua: "success" },
  { id: "GT014", ma_uid: "UID-VN-00100014", san_pham: "Vải thiều Lục Ngạn", lo_hang: "LO-2026-0014", nguoi_th: "Hoàng Thị Lan", thoi_gian: "06/03/2026 09:00", ket_qua: "success" },
  { id: "GT015", ma_uid: "UID-VN-00100015", san_pham: "Cua biển Cà Mau", lo_hang: "LO-2026-0015", nguoi_th: "Nguyễn Văn An", thoi_gian: "06/03/2026 11:15", ket_qua: "success" },
  { id: "GT016", ma_uid: "UID-VN-00100016", san_pham: "Tiêu đen Chư Sê", lo_hang: "LO-2026-0016", nguoi_th: "Trần Thị Bích", thoi_gian: "07/03/2026 08:00", ket_qua: "error" },
  { id: "GT017", ma_uid: "UID-VN-00100017", san_pham: "Cá ngừ đại dương đóng hộp", lo_hang: "LO-2026-0017", nguoi_th: "Lê Minh Cường", thoi_gian: "07/03/2026 10:45", ket_qua: "success" },
  { id: "GT018", ma_uid: "UID-VN-00100018", san_pham: "Nhãn lồng Hưng Yên", lo_hang: "LO-2026-0018", nguoi_th: "Phạm Hồng Dương", thoi_gian: "07/03/2026 13:30", ket_qua: "success" },
  { id: "GT019", ma_uid: "UID-VN-00100019", san_pham: "Thịt bò nhập khẩu Úc", lo_hang: "LO-2026-0019", nguoi_th: "Vũ Thị Oanh", thoi_gian: "08/03/2026 08:30", ket_qua: "success" },
  { id: "GT020", ma_uid: "UID-VN-00100020", san_pham: "Gạo ST25 hữu cơ", lo_hang: "LO-2026-0020", nguoi_th: "Đặng Minh Khoa", thoi_gian: "08/03/2026 11:00", ket_qua: "success" },
];

const columns = [
  { key: "id", label: "Mã SK", width: "80px" },
  { key: "ma_uid", label: "Mã UID", width: "160px" },
  { key: "san_pham", label: "Sản phẩm" },
  { key: "lo_hang", label: "Lô hàng" },
  { key: "nguoi_th", label: "Người thực hiện" },
  { key: "thoi_gian", label: "Thời gian" },
  {
    key: "ket_qua",
    label: "Kết quả",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.ket_qua === "success" ? "success" : "danger"}>
        {row.ket_qua === "success" ? "Thành công" : "Lỗi"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Sự kiện gắn tem nhãn"
      subtitle="Ghi nhận sự kiện gắn tem nhãn sản phẩm"
      stats={[
        { label: "Tổng sự kiện", value: labelEvents.length, variant: "info" },
        { label: "Thành công", value: labelEvents.filter((e) => e.ket_qua === "success").length, variant: "success" },
        { label: "Lỗi", value: labelEvents.filter((e) => e.ket_qua === "error").length, variant: "danger" },
        { label: "Tỷ lệ thành công", value: `${Math.round((labelEvents.filter((e) => e.ket_qua === "success").length / labelEvents.length) * 100)}%`, variant: "success" },
      ]}
      tableColumns={columns}
      tableData={labelEvents}
      searchKeys={["id", "ma_uid", "san_pham", "lo_hang", "nguoi_th"]}
      addLabel="Gắn tem mới"
    />
  );
}
