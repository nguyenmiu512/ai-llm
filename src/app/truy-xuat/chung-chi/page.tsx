"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const certificates = [
  { id: "CN001", loai: "VietGAP", to_chuc: "HTX Rau sạch Lâm Đồng", pham_vi: "Rau củ quả tươi", ngay_cap: "15/01/2025", ngay_het_han: "15/01/2027", trang_thai: "valid" },
  { id: "CN002", loai: "GlobalGAP", to_chuc: "Cty TNHH Thủy sản Minh Phú", pham_vi: "Tôm xuất khẩu EU", ngay_cap: "20/03/2025", ngay_het_han: "20/03/2026", trang_thai: "expiring" },
  { id: "CN003", loai: "HACCP", to_chuc: "Cty CP Vĩnh Hoàn", pham_vi: "Cá tra chế biến", ngay_cap: "01/06/2024", ngay_het_han: "01/06/2027", trang_thai: "valid" },
  { id: "CN004", loai: "ISO22000", to_chuc: "Cty TNHH Nước mắm Hưng Thành", pham_vi: "Sản xuất nước mắm", ngay_cap: "10/09/2024", ngay_het_han: "10/09/2027", trang_thai: "valid" },
  { id: "CN005", loai: "Organic", to_chuc: "HTX Nông nghiệp Sóc Trăng", pham_vi: "Gạo hữu cơ", ngay_cap: "05/11/2023", ngay_het_han: "05/11/2025", trang_thai: "expired" },
  { id: "CN006", loai: "ASC", to_chuc: "Cty CP Thủy sản Khánh Hòa", pham_vi: "Nuôi trồng thủy sản bền vững", ngay_cap: "20/01/2025", ngay_het_han: "20/01/2026", trang_thai: "expiring" },
  { id: "CN007", loai: "VietGAP", to_chuc: "HTX Cây ăn quả Cái Bè", pham_vi: "Xoài cát Hòa Lộc", ngay_cap: "12/04/2025", ngay_het_han: "12/04/2027", trang_thai: "valid" },
  { id: "CN008", loai: "GlobalGAP", to_chuc: "HTX Vải thiều Bắc Giang", pham_vi: "Vải thiều xuất khẩu", ngay_cap: "01/02/2025", ngay_het_han: "01/02/2027", trang_thai: "valid" },
  { id: "CN009", loai: "HACCP", to_chuc: "Cty CP Đồ hộp Hạ Long", pham_vi: "Cá ngừ đóng hộp", ngay_cap: "15/07/2024", ngay_het_han: "15/07/2027", trang_thai: "valid" },
  { id: "CN010", loai: "ISO22000", to_chuc: "Cty CP Sữa Mộc Châu", pham_vi: "Sữa và sản phẩm từ sữa", ngay_cap: "30/08/2023", ngay_het_han: "30/08/2025", trang_thai: "expired" },
  { id: "CN011", loai: "Organic", to_chuc: "HTX Ong mật Kon Tum", pham_vi: "Mật ong hữu cơ", ngay_cap: "10/03/2025", ngay_het_han: "10/03/2027", trang_thai: "valid" },
  { id: "CN012", loai: "VietGAP", to_chuc: "HTX Nhãn lồng Phố Hiến", pham_vi: "Nhãn lồng Hưng Yên", ngay_cap: "25/05/2025", ngay_het_han: "25/05/2027", trang_thai: "valid" },
  { id: "CN013", loai: "GlobalGAP", to_chuc: "Cty TNHH Điều vàng Bình Phước", pham_vi: "Hạt điều xuất khẩu", ngay_cap: "18/10/2024", ngay_het_han: "18/10/2025", trang_thai: "expiring" },
  { id: "CN014", loai: "HACCP", to_chuc: "Cty TNHH Hải sản Đại Dương", pham_vi: "Mực khô chế biến", ngay_cap: "08/12/2024", ngay_het_han: "08/12/2027", trang_thai: "valid" },
  { id: "CN015", loai: "ASC", to_chuc: "Cty TNHH Thủy hải sản Năm Căn", pham_vi: "Cua biển nuôi bền vững", ngay_cap: "22/02/2025", ngay_het_han: "22/02/2027", trang_thai: "valid" },
  { id: "CN016", loai: "ISO22000", to_chuc: "Cty CP Cà phê Lâm Đồng", pham_vi: "Cà phê rang xay", ngay_cap: "03/04/2024", ngay_het_han: "03/04/2026", trang_thai: "expiring" },
  { id: "CN017", loai: "VietGAP", to_chuc: "HTX Hồ tiêu Gia Lai", pham_vi: "Tiêu đen Chư Sê", ngay_cap: "14/06/2025", ngay_het_han: "14/06/2027", trang_thai: "valid" },
  { id: "CN018", loai: "Organic", to_chuc: "Cty CP Chè Lâm Đồng", pham_vi: "Trà ô long hữu cơ", ngay_cap: "28/11/2023", ngay_het_han: "28/11/2025", trang_thai: "expired" },
  { id: "CN019", loai: "GlobalGAP", to_chuc: "HTX Bưởi da xanh Mỏ Cày", pham_vi: "Bưởi da xanh xuất khẩu", ngay_cap: "09/01/2025", ngay_het_han: "09/01/2027", trang_thai: "valid" },
  { id: "CN020", loai: "HACCP", to_chuc: "Sabeco - Chi nhánh HCM", pham_vi: "Sản xuất bia", ngay_cap: "17/07/2024", ngay_het_han: "17/07/2027", trang_thai: "valid" },
];

const loaiColors: Record<string, "success" | "info" | "warning" | "neutral"> = {
  VietGAP: "success",
  GlobalGAP: "info",
  HACCP: "warning",
  ISO22000: "neutral",
  Organic: "success",
  ASC: "info",
};

const columns = [
  { key: "id", label: "Mã CN", width: "80px" },
  {
    key: "loai",
    label: "Loại chứng chỉ",
    render: (row: Record<string, unknown>) => (
      <Badge variant={loaiColors[row.loai as string] ?? "neutral"}>{row.loai as string}</Badge>
    ),
  },
  { key: "to_chuc", label: "Tổ chức" },
  { key: "pham_vi", label: "Phạm vi" },
  { key: "ngay_cap", label: "Ngày cấp" },
  { key: "ngay_het_han", label: "Ngày hết hạn" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
        valid: { label: "Còn hiệu lực", variant: "success" },
        expiring: { label: "Sắp hết hạn", variant: "warning" },
        expired: { label: "Đã hết hạn", variant: "danger" },
      };
      const m = map[row.trang_thai as string];
      return <Badge variant={m.variant}>{m.label}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Chứng chỉ"
      subtitle="Quản lý chứng chỉ và chứng nhận sản phẩm, doanh nghiệp"
      stats={[
        { label: "Tổng chứng chỉ", value: certificates.length, variant: "info" },
        { label: "Còn hiệu lực", value: certificates.filter((c) => c.trang_thai === "valid").length, variant: "success" },
        { label: "Sắp hết hạn", value: certificates.filter((c) => c.trang_thai === "expiring").length, variant: "warning" },
        { label: "Đã hết hạn", value: certificates.filter((c) => c.trang_thai === "expired").length, variant: "danger" },
      ]}
      tableColumns={columns}
      tableData={certificates}
      searchKeys={["id", "loai", "to_chuc", "pham_vi"]}
      addLabel="Thêm chứng chỉ"
    />
  );
}
