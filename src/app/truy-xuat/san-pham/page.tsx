"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const products = [
  { id: "SP001", ten: "Gạo ST25 hữu cơ", danh_muc: "Nông sản", don_vi: "kg", doanh_nghiep: "HTX Nông nghiệp Sóc Trăng", tong_uid: 48200, trang_thai: "active" },
  { id: "SP002", ten: "Tôm sú đông lạnh", danh_muc: "Thủy sản", don_vi: "kg", doanh_nghiep: "Công ty TNHH Thủy sản Minh Phú", tong_uid: 120400, trang_thai: "active" },
  { id: "SP003", ten: "Cà phê Arabica Đà Lạt", danh_muc: "Nông sản", don_vi: "kg", doanh_nghiep: "Cty CP Cà phê Lâm Đồng", tong_uid: 31800, trang_thai: "active" },
  { id: "SP004", ten: "Nước mắm Phú Quốc 40 độ đạm", danh_muc: "Thực phẩm", don_vi: "chai", doanh_nghiep: "Cty TNHH Nước mắm Hưng Thành", tong_uid: 75000, trang_thai: "active" },
  { id: "SP005", ten: "Xoài cát Hòa Lộc", danh_muc: "Nông sản", don_vi: "kg", doanh_nghiep: "HTX Cây ăn quả Cái Bè", tong_uid: 28500, trang_thai: "active" },
  { id: "SP006", ten: "Cá tra phi-lê đông lạnh", danh_muc: "Thủy sản", don_vi: "kg", doanh_nghiep: "Cty CP Vĩnh Hoàn", tong_uid: 95600, trang_thai: "active" },
  { id: "SP007", ten: "Rau muống VietGAP", danh_muc: "Nông sản", don_vi: "bó", doanh_nghiep: "HTX Rau sạch Lâm Đồng", tong_uid: 15200, trang_thai: "active" },
  { id: "SP008", ten: "Nước dừa tươi đóng lon", danh_muc: "Đồ uống", don_vi: "lon", doanh_nghiep: "Cty CP Nước giải khát Bến Tre", tong_uid: 210000, trang_thai: "active" },
  { id: "SP009", ten: "Hạt điều rang muối", danh_muc: "Thực phẩm", don_vi: "túi", doanh_nghiep: "Cty TNHH Điều vàng Bình Phước", tong_uid: 42000, trang_thai: "active" },
  { id: "SP010", ten: "Trà ô long cao nguyên", danh_muc: "Đồ uống", don_vi: "hộp", doanh_nghiep: "Cty CP Chè Lâm Đồng", tong_uid: 18700, trang_thai: "inactive" },
  { id: "SP011", ten: "Bưởi da xanh Bến Tre", danh_muc: "Nông sản", don_vi: "quả", doanh_nghiep: "HTX Bưởi da xanh Mỏ Cày", tong_uid: 35400, trang_thai: "active" },
  { id: "SP012", ten: "Mực khô Bình Thuận", danh_muc: "Thủy sản", don_vi: "kg", doanh_nghiep: "Cty TNHH Hải sản Đại Dương", tong_uid: 22100, trang_thai: "active" },
  { id: "SP013", ten: "Sữa tươi thanh trùng", danh_muc: "Thực phẩm", don_vi: "hộp", doanh_nghiep: "Cty CP Sữa Mộc Châu", tong_uid: 380000, trang_thai: "active" },
  { id: "SP014", ten: "Mật ong rừng Tây Nguyên", danh_muc: "Thực phẩm", don_vi: "lọ", doanh_nghiep: "HTX Ong mật Kon Tum", tong_uid: 9800, trang_thai: "active" },
  { id: "SP015", ten: "Chôm chôm nhãn Đồng Nai", danh_muc: "Nông sản", don_vi: "kg", doanh_nghiep: "HTX Trái cây Xuân Lộc", tong_uid: 31200, trang_thai: "inactive" },
  { id: "SP016", ten: "Tôm hùm đất sống", danh_muc: "Thủy sản", don_vi: "con", doanh_nghiep: "Cty CP Thủy sản Khánh Hòa", tong_uid: 14500, trang_thai: "active" },
  { id: "SP017", ten: "Dưa hấu không hạt", danh_muc: "Nông sản", don_vi: "quả", doanh_nghiep: "HTX Nông nghiệp Long An", tong_uid: 28900, trang_thai: "active" },
  { id: "SP018", ten: "Bia đặc sản Sài Gòn", danh_muc: "Đồ uống", don_vi: "lon", doanh_nghiep: "Sabeco - Chi nhánh HCM", tong_uid: 520000, trang_thai: "active" },
  { id: "SP019", ten: "Thịt bò nhập khẩu Úc", danh_muc: "Thực phẩm", don_vi: "kg", doanh_nghiep: "Cty TNHH Nhập khẩu Thực phẩm Á Châu", tong_uid: 67800, trang_thai: "active" },
  { id: "SP020", ten: "Vải thiều Lục Ngạn", danh_muc: "Nông sản", don_vi: "kg", doanh_nghiep: "HTX Vải thiều Bắc Giang", tong_uid: 41200, trang_thai: "active" },
  { id: "SP021", ten: "Cua biển Cà Mau", danh_muc: "Thủy sản", don_vi: "con", doanh_nghiep: "Cty TNHH Thủy hải sản Năm Căn", tong_uid: 18300, trang_thai: "active" },
  { id: "SP022", ten: "Nước ép cam tươi", danh_muc: "Đồ uống", don_vi: "chai", doanh_nghiep: "Cty CP Đồ uống Vinamilk", tong_uid: 145000, trang_thai: "active" },
  { id: "SP023", ten: "Tiêu đen Chư Sê", danh_muc: "Nông sản", don_vi: "kg", doanh_nghiep: "HTX Hồ tiêu Gia Lai", tong_uid: 12400, trang_thai: "inactive" },
  { id: "SP024", ten: "Cá ngừ đại dương đóng hộp", danh_muc: "Thủy sản", don_vi: "hộp", doanh_nghiep: "Cty CP Đồ hộp Hạ Long", tong_uid: 89000, trang_thai: "active" },
  { id: "SP025", ten: "Nhãn lồng Hưng Yên", danh_muc: "Nông sản", don_vi: "kg", doanh_nghiep: "HTX Nhãn lồng Phố Hiến", tong_uid: 23700, trang_thai: "active" },
];

const columns = [
  { key: "id", label: "Mã SP", width: "90px" },
  { key: "ten", label: "Tên sản phẩm" },
  {
    key: "danh_muc",
    label: "Danh mục",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "success" | "info" | "warning" | "neutral"> = {
        "Nông sản": "success",
        "Thủy sản": "info",
        "Thực phẩm": "warning",
        "Đồ uống": "neutral",
      };
      return <Badge variant={map[row.danh_muc as string] ?? "neutral"}>{row.danh_muc as string}</Badge>;
    },
  },
  { key: "don_vi", label: "Đơn vị" },
  { key: "doanh_nghiep", label: "Doanh nghiệp" },
  { key: "tong_uid", label: "Tổng UID", render: (row: Record<string, unknown>) => <span className="font-mono">{(row.tong_uid as number).toLocaleString()}</span> },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "active" ? "success" : "neutral"}>
        {row.trang_thai === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Danh sách sản phẩm"
      subtitle="Quản lý danh sách sản phẩm trong hệ thống truy xuất nguồn gốc"
      stats={[
        { label: "Tổng sản phẩm", value: products.length, variant: "info" },
        { label: "Đang hoạt động", value: products.filter((p) => p.trang_thai === "active").length, variant: "success" },
        { label: "Ngừng hoạt động", value: products.filter((p) => p.trang_thai === "inactive").length, variant: "neutral" },
        { label: "Tổng UID cấp", value: "2,298,700", variant: "info" },
      ]}
      tableColumns={columns}
      tableData={products}
      searchKeys={["id", "ten", "danh_muc", "doanh_nghiep"]}
      addLabel="Thêm sản phẩm"
    />
  );
}
