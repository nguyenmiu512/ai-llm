"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const organizations = [
  { id: "ORG001", ten: "HTX Nông nghiệp Sóc Trăng", loai: "HTX", tinh: "Sóc Trăng", ngay_gia_nhap: "15/01/2024", so_san_pham: 3, trang_thai: "active" },
  { id: "ORG002", ten: "Công ty TNHH Thủy sản Minh Phú", loai: "Doanh nghiệp", tinh: "Cà Mau", ngay_gia_nhap: "20/01/2024", so_san_pham: 8, trang_thai: "active" },
  { id: "ORG003", ten: "Công ty CP Cà phê Lâm Đồng", loai: "Doanh nghiệp", tinh: "Lâm Đồng", ngay_gia_nhap: "25/01/2024", so_san_pham: 4, trang_thai: "active" },
  { id: "ORG004", ten: "Công ty TNHH Nước mắm Hưng Thành", loai: "Doanh nghiệp", tinh: "Kiên Giang", ngay_gia_nhap: "01/02/2024", so_san_pham: 5, trang_thai: "active" },
  { id: "ORG005", ten: "HTX Cây ăn quả Cái Bè", loai: "HTX", tinh: "Tiền Giang", ngay_gia_nhap: "10/02/2024", so_san_pham: 6, trang_thai: "active" },
  { id: "ORG006", ten: "Công ty CP Vĩnh Hoàn", loai: "Doanh nghiệp", tinh: "Đồng Tháp", ngay_gia_nhap: "15/02/2024", so_san_pham: 7, trang_thai: "active" },
  { id: "ORG007", ten: "HTX Rau sạch Lâm Đồng", loai: "HTX", tinh: "Lâm Đồng", ngay_gia_nhap: "20/02/2024", so_san_pham: 4, trang_thai: "active" },
  { id: "ORG008", ten: "Công ty CP Nước giải khát Bến Tre", loai: "Doanh nghiệp", tinh: "Bến Tre", ngay_gia_nhap: "01/03/2024", so_san_pham: 3, trang_thai: "active" },
  { id: "ORG009", ten: "Công ty TNHH Điều vàng Bình Phước", loai: "Doanh nghiệp", tinh: "Bình Phước", ngay_gia_nhap: "10/03/2024", so_san_pham: 2, trang_thai: "active" },
  { id: "ORG010", ten: "Công ty CP Chè Lâm Đồng", loai: "Doanh nghiệp", tinh: "Lâm Đồng", ngay_gia_nhap: "15/03/2024", so_san_pham: 3, trang_thai: "inactive" },
  { id: "ORG011", ten: "HTX Bưởi da xanh Mỏ Cày", loai: "HTX", tinh: "Bến Tre", ngay_gia_nhap: "01/04/2024", so_san_pham: 2, trang_thai: "active" },
  { id: "ORG012", ten: "Công ty TNHH Hải sản Đại Dương", loai: "Doanh nghiệp", tinh: "Bình Thuận", ngay_gia_nhap: "10/04/2024", so_san_pham: 4, trang_thai: "active" },
  { id: "ORG013", ten: "Công ty CP Sữa Mộc Châu", loai: "Doanh nghiệp", tinh: "Sơn La", ngay_gia_nhap: "20/04/2024", so_san_pham: 5, trang_thai: "active" },
  { id: "ORG014", ten: "HTX Ong mật Kon Tum", loai: "HTX", tinh: "Kon Tum", ngay_gia_nhap: "01/05/2024", so_san_pham: 2, trang_thai: "active" },
  { id: "ORG015", ten: "HTX Trái cây Xuân Lộc", loai: "HTX", tinh: "Đồng Nai", ngay_gia_nhap: "15/05/2024", so_san_pham: 3, trang_thai: "inactive" },
  { id: "ORG016", ten: "Công ty CP Thủy sản Khánh Hòa", loai: "Doanh nghiệp", tinh: "Khánh Hòa", ngay_gia_nhap: "01/06/2024", so_san_pham: 4, trang_thai: "active" },
  { id: "ORG017", ten: "HTX Nông nghiệp Long An", loai: "HTX", tinh: "Long An", ngay_gia_nhap: "15/06/2024", so_san_pham: 3, trang_thai: "active" },
  { id: "ORG018", ten: "Sabeco - Chi nhánh HCM", loai: "Doanh nghiệp", tinh: "TP. Hồ Chí Minh", ngay_gia_nhap: "01/07/2024", so_san_pham: 6, trang_thai: "active" },
  { id: "ORG019", ten: "Cục An toàn thực phẩm - Bộ Y tế", loai: "Cơ quan nhà nước", tinh: "Hà Nội", ngay_gia_nhap: "01/08/2024", so_san_pham: 0, trang_thai: "active" },
  { id: "ORG020", ten: "HTX Vải thiều Bắc Giang", loai: "HTX", tinh: "Bắc Giang", ngay_gia_nhap: "15/08/2024", so_san_pham: 2, trang_thai: "active" },
];

const loaiColors: Record<string, "success" | "info" | "warning"> = {
  "Doanh nghiệp": "info",
  "HTX": "success",
  "Cơ quan nhà nước": "warning",
};

const columns = [
  { key: "id", label: "Mã", width: "80px" },
  { key: "ten", label: "Tên tổ chức" },
  {
    key: "loai",
    label: "Loại",
    render: (row: Record<string, unknown>) => (
      <Badge variant={loaiColors[row.loai as string] ?? "neutral"}>{row.loai as string}</Badge>
    ),
  },
  { key: "tinh", label: "Tỉnh/Thành" },
  { key: "ngay_gia_nhap", label: "Ngày gia nhập" },
  { key: "so_san_pham", label: "Số sản phẩm" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "active" ? "success" : "neutral"}>
        {row.trang_thai === "active" ? "Đang hoạt động" : "Tạm ngừng"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Tổ chức"
      subtitle="Quản lý thông tin tổ chức và doanh nghiệp trong hệ thống"
      stats={[
        { label: "Tổng tổ chức", value: organizations.length, variant: "info" },
        { label: "Doanh nghiệp", value: organizations.filter((o) => o.loai === "Doanh nghiệp").length, variant: "info" },
        { label: "HTX", value: organizations.filter((o) => o.loai === "HTX").length, variant: "success" },
        { label: "Đang hoạt động", value: organizations.filter((o) => o.trang_thai === "active").length, variant: "success" },
      ]}
      tableColumns={columns}
      tableData={organizations}
      searchKeys={["id", "ten", "loai", "tinh"]}
      addLabel="Thêm tổ chức"
    />
  );
}
