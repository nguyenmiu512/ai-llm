"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const batches = [
  { ma_lo: "LO-2026-0001", san_pham: "Gạo ST25 hữu cơ", so_luong: 5000, don_vi: "kg", dia_diem: "HTX Sóc Trăng", ngay_sx: "28/02/2026", ngay_het_han: "28/02/2027", trang_thai: "active" },
  { ma_lo: "LO-2026-0002", san_pham: "Tôm sú đông lạnh", so_luong: 2000, don_vi: "kg", dia_diem: "Cty Minh Phú, Cà Mau", ngay_sx: "01/03/2026", ngay_het_han: "01/03/2027", trang_thai: "active" },
  { ma_lo: "LO-2026-0003", san_pham: "Cà phê Arabica Đà Lạt", so_luong: 800, don_vi: "kg", dia_diem: "Đà Lạt, Lâm Đồng", ngay_sx: "01/03/2026", ngay_het_han: "01/03/2028", trang_thai: "pending" },
  { ma_lo: "LO-2026-0004", san_pham: "Nước mắm Phú Quốc 40 độ", so_luong: 10000, don_vi: "chai", dia_diem: "Phú Quốc, Kiên Giang", ngay_sx: "15/02/2026", ngay_het_han: "15/02/2028", trang_thai: "active" },
  { ma_lo: "LO-2026-0005", san_pham: "Xoài cát Hòa Lộc", so_luong: 3000, don_vi: "kg", dia_diem: "Cái Bè, Tiền Giang", ngay_sx: "02/03/2026", ngay_het_han: "16/03/2026", trang_thai: "active" },
  { ma_lo: "LO-2026-0006", san_pham: "Cá tra phi-lê đông lạnh", so_luong: 4500, don_vi: "kg", dia_diem: "An Giang", ngay_sx: "02/03/2026", ngay_het_han: "02/03/2027", trang_thai: "active" },
  { ma_lo: "LO-2026-0007", san_pham: "Rau muống VietGAP", so_luong: 500, don_vi: "bó", dia_diem: "Đà Lạt, Lâm Đồng", ngay_sx: "03/03/2026", ngay_het_han: "10/03/2026", trang_thai: "pending" },
  { ma_lo: "LO-2026-0008", san_pham: "Nước dừa tươi đóng lon", so_luong: 50000, don_vi: "lon", dia_diem: "Bến Tre", ngay_sx: "03/03/2026", ngay_het_han: "03/06/2026", trang_thai: "active" },
  { ma_lo: "LO-2026-0009", san_pham: "Hạt điều rang muối", so_luong: 2000, don_vi: "túi", dia_diem: "Bình Phước", ngay_sx: "04/03/2026", ngay_het_han: "04/09/2026", trang_thai: "rejected" },
  { ma_lo: "LO-2026-0010", san_pham: "Bưởi da xanh Bến Tre", so_luong: 1500, don_vi: "quả", dia_diem: "Mỏ Cày, Bến Tre", ngay_sx: "04/03/2026", ngay_het_han: "18/03/2026", trang_thai: "active" },
  { ma_lo: "LO-2026-0011", san_pham: "Mực khô Bình Thuận", so_luong: 600, don_vi: "kg", dia_diem: "Phan Thiết, Bình Thuận", ngay_sx: "05/03/2026", ngay_het_han: "05/09/2026", trang_thai: "active" },
  { ma_lo: "LO-2026-0012", san_pham: "Sữa tươi thanh trùng", so_luong: 20000, don_vi: "hộp", dia_diem: "Mộc Châu, Sơn La", ngay_sx: "05/03/2026", ngay_het_han: "19/03/2026", trang_thai: "active" },
  { ma_lo: "LO-2026-0013", san_pham: "Mật ong rừng Tây Nguyên", so_luong: 500, don_vi: "lọ", dia_diem: "Kon Tum", ngay_sx: "05/03/2026", ngay_het_han: "05/03/2028", trang_thai: "active" },
  { ma_lo: "LO-2026-0014", san_pham: "Vải thiều Lục Ngạn", so_luong: 8000, don_vi: "kg", dia_diem: "Lục Ngạn, Bắc Giang", ngay_sx: "06/03/2026", ngay_het_han: "20/03/2026", trang_thai: "pending" },
  { ma_lo: "LO-2026-0015", san_pham: "Cua biển Cà Mau", so_luong: 300, don_vi: "con", dia_diem: "Năm Căn, Cà Mau", ngay_sx: "06/03/2026", ngay_het_han: "13/03/2026", trang_thai: "active" },
  { ma_lo: "LO-2026-0016", san_pham: "Tiêu đen Chư Sê", so_luong: 1000, don_vi: "kg", dia_diem: "Chư Sê, Gia Lai", ngay_sx: "07/03/2026", ngay_het_han: "07/03/2028", trang_thai: "active" },
  { ma_lo: "LO-2026-0017", san_pham: "Cá ngừ đại dương đóng hộp", so_luong: 15000, don_vi: "hộp", dia_diem: "Đà Nẵng", ngay_sx: "07/03/2026", ngay_het_han: "07/03/2028", trang_thai: "active" },
  { ma_lo: "LO-2026-0018", san_pham: "Nhãn lồng Hưng Yên", so_luong: 3000, don_vi: "kg", dia_diem: "Phố Hiến, Hưng Yên", ngay_sx: "07/03/2026", ngay_het_han: "21/03/2026", trang_thai: "pending" },
  { ma_lo: "LO-2026-0019", san_pham: "Thịt bò nhập khẩu Úc", so_luong: 1200, don_vi: "kg", dia_diem: "Cảng Cát Lái, TP.HCM", ngay_sx: "08/03/2026", ngay_het_han: "22/03/2026", trang_thai: "active" },
  { ma_lo: "LO-2026-0020", san_pham: "Gạo ST25 hữu cơ", so_luong: 6000, don_vi: "kg", dia_diem: "HTX Sóc Trăng", ngay_sx: "08/03/2026", ngay_het_han: "08/03/2027", trang_thai: "active" },
];

const columns = [
  { key: "ma_lo", label: "Mã lô", width: "130px" },
  { key: "san_pham", label: "Sản phẩm" },
  { key: "so_luong", label: "Số lượng", render: (row: Record<string, unknown>) => <span className="font-mono">{(row.so_luong as number).toLocaleString()}</span> },
  { key: "don_vi", label: "Đơn vị" },
  { key: "dia_diem", label: "Địa điểm sản xuất" },
  { key: "ngay_sx", label: "Ngày sản xuất" },
  { key: "ngay_het_han", label: "Ngày hết hạn" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
        active: { label: "Đang hoạt động", variant: "success" },
        pending: { label: "Chờ xác nhận", variant: "warning" },
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
      title="Khai báo theo lô"
      subtitle="Khai báo sự kiện truy xuất theo lô hàng"
      stats={[
        { label: "Tổng lô hàng", value: batches.length, variant: "info" },
        { label: "Đang hoạt động", value: batches.filter((b) => b.trang_thai === "active").length, variant: "success" },
        { label: "Chờ xác nhận", value: batches.filter((b) => b.trang_thai === "pending").length, variant: "warning" },
        { label: "Từ chối", value: batches.filter((b) => b.trang_thai === "rejected").length, variant: "danger" },
      ]}
      tableColumns={columns}
      tableData={batches}
      searchKeys={["ma_lo", "san_pham", "dia_diem"]}
      addLabel="Khai báo lô mới"
    />
  );
}
