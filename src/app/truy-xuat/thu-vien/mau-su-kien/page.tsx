"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const templates = [
  { id: "MSK001", ten_mau: "Thu hoạch nông sản tiêu chuẩn", loai: "Thu hoạch", mo_ta: "Mẫu ghi nhận sự kiện thu hoạch cho nông sản theo tiêu chuẩn VietGAP", so_truong: 12, ngay_tao: "10/01/2026", trang_thai: "active" },
  { id: "MSK002", ten_mau: "Đóng gói và nhãn hiệu", loai: "Đóng gói", mo_ta: "Mẫu ghi nhận thông tin đóng gói, nhãn hiệu sản phẩm", so_truong: 9, ngay_tao: "12/01/2026", trang_thai: "active" },
  { id: "MSK003", ten_mau: "Vận chuyển liên tỉnh", loai: "Vận chuyển", mo_ta: "Mẫu theo dõi lộ trình vận chuyển giữa các tỉnh thành", so_truong: 15, ngay_tao: "15/01/2026", trang_thai: "active" },
  { id: "MSK004", ten_mau: "Nhập kho lạnh", loai: "Lưu kho", mo_ta: "Mẫu ghi nhận thông số nhiệt độ, độ ẩm khi nhập kho lạnh", so_truong: 11, ngay_tao: "18/01/2026", trang_thai: "active" },
  { id: "MSK005", ten_mau: "Phân phối đến đại lý", loai: "Phân phối", mo_ta: "Mẫu ghi nhận thông tin giao hàng đến đại lý và nhà phân phối", so_truong: 10, ngay_tao: "20/01/2026", trang_thai: "active" },
  { id: "MSK006", ten_mau: "Sản xuất chế biến thực phẩm", loai: "Sản xuất", mo_ta: "Mẫu ghi nhận quy trình chế biến thực phẩm theo HACCP", so_truong: 18, ngay_tao: "22/01/2026", trang_thai: "active" },
  { id: "MSK007", ten_mau: "Kiểm tra chất lượng sản phẩm", loai: "Kiểm tra", mo_ta: "Mẫu ghi nhận kết quả kiểm tra chất lượng tại cơ sở sản xuất", so_truong: 14, ngay_tao: "25/01/2026", trang_thai: "active" },
  { id: "MSK008", ten_mau: "Thu hoạch thủy sản nuôi trồng", loai: "Thu hoạch", mo_ta: "Mẫu thu hoạch thủy sản theo tiêu chuẩn ASC/GlobalGAP", so_truong: 13, ngay_tao: "28/01/2026", trang_thai: "active" },
  { id: "MSK009", ten_mau: "Nhập khẩu hàng hóa", loai: "Nhập khẩu", mo_ta: "Mẫu ghi nhận thông tin hàng nhập khẩu theo quy định hải quan", so_truong: 20, ngay_tao: "01/02/2026", trang_thai: "inactive" },
  { id: "MSK010", ten_mau: "Xuất khẩu hàng hóa", loai: "Xuất khẩu", mo_ta: "Mẫu ghi nhận thông tin hàng xuất khẩu theo quy định", so_truong: 19, ngay_tao: "05/02/2026", trang_thai: "active" },
  { id: "MSK011", ten_mau: "Bán lẻ tại siêu thị", loai: "Phân phối", mo_ta: "Mẫu ghi nhận thông tin bán lẻ tại điểm bán siêu thị", so_truong: 8, ngay_tao: "10/02/2026", trang_thai: "active" },
  { id: "MSK012", ten_mau: "Tiêu hủy sản phẩm lỗi", loai: "Tiêu hủy", mo_ta: "Mẫu ghi nhận sự kiện tiêu hủy sản phẩm không đạt chất lượng", so_truong: 7, ngay_tao: "15/02/2026", trang_thai: "active" },
  { id: "MSK013", ten_mau: "Xử lý sau thu hoạch", loai: "Sản xuất", mo_ta: "Mẫu ghi nhận quy trình xử lý, bảo quản sau thu hoạch", so_truong: 16, ngay_tao: "20/02/2026", trang_thai: "active" },
  { id: "MSK014", ten_mau: "Truy vết sự cố chất lượng", loai: "Kiểm tra", mo_ta: "Mẫu truy vết nguyên nhân và xử lý sự cố chất lượng sản phẩm", so_truong: 17, ngay_tao: "25/02/2026", trang_thai: "active" },
  { id: "MSK015", ten_mau: "Đánh giá nhà cung cấp", loai: "Kiểm tra", mo_ta: "Mẫu đánh giá tiêu chí nhà cung cấp nguyên liệu đầu vào", so_truong: 22, ngay_tao: "01/03/2026", trang_thai: "inactive" },
];

const loaiColors: Record<string, "success" | "info" | "warning" | "neutral" | "danger"> = {
  "Thu hoạch": "success",
  "Đóng gói": "neutral",
  "Vận chuyển": "warning",
  "Lưu kho": "info",
  "Phân phối": "info",
  "Sản xuất": "info",
  "Kiểm tra": "warning",
  "Nhập khẩu": "neutral",
  "Xuất khẩu": "neutral",
  "Tiêu hủy": "danger",
};

const columns = [
  { key: "id", label: "Mã mẫu", width: "90px" },
  { key: "ten_mau", label: "Tên mẫu" },
  {
    key: "loai",
    label: "Loại sự kiện",
    render: (row: Record<string, unknown>) => (
      <Badge variant={loaiColors[row.loai as string] ?? "neutral"}>{row.loai as string}</Badge>
    ),
  },
  { key: "mo_ta", label: "Mô tả" },
  { key: "so_truong", label: "Số trường dữ liệu", render: (row: Record<string, unknown>) => <span className="font-mono font-semibold">{row.so_truong as number}</span> },
  { key: "ngay_tao", label: "Ngày tạo" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "active" ? "success" : "neutral"}>
        {row.trang_thai === "active" ? "Đang dùng" : "Ngừng dùng"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Mẫu sự kiện"
      subtitle="Quản lý các mẫu sự kiện chuẩn trong hệ thống"
      stats={[
        { label: "Tổng mẫu", value: templates.length, variant: "info" },
        { label: "Đang dùng", value: templates.filter((t) => t.trang_thai === "active").length, variant: "success" },
        { label: "Ngừng dùng", value: templates.filter((t) => t.trang_thai === "inactive").length, variant: "neutral" },
      ]}
      tableColumns={columns}
      tableData={templates}
      searchKeys={["id", "ten_mau", "loai", "mo_ta"]}
      addLabel="Tạo mẫu mới"
    />
  );
}
