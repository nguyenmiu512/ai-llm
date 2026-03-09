"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const data = [
  { id: "CC001", loai: "VietGAP", san_pham: "Gạo ST25 hữu cơ", to_chuc_cap: "Cục Trồng trọt", don_vi_nhan: "HTX Nông nghiệp Sóc Trăng", ngay_cap: "10/01/2025", ngay_het_han: "10/01/2027", trang_thai: "valid" },
  { id: "CC002", loai: "GlobalGAP", san_pham: "Tôm sú đông lạnh", to_chuc_cap: "Control Union VN", don_vi_nhan: "Cty TNHH Thủy sản Minh Phú", ngay_cap: "15/03/2025", ngay_het_han: "15/03/2026", trang_thai: "expiring" },
  { id: "CC003", loai: "HACCP", san_pham: "Cá tra phi-lê", to_chuc_cap: "Nafiqad", don_vi_nhan: "Cty CP Vĩnh Hoàn", ngay_cap: "01/06/2024", ngay_het_han: "01/06/2027", trang_thai: "valid" },
  { id: "CC004", loai: "ISO22000", san_pham: "Nước mắm 40 độ đạm", to_chuc_cap: "Bureau Veritas VN", don_vi_nhan: "Cty TNHH Nước mắm Hưng Thành", ngay_cap: "20/09/2024", ngay_het_han: "20/09/2027", trang_thai: "valid" },
  { id: "CC005", loai: "Organic", san_pham: "Gạo hữu cơ Sóc Trăng", to_chuc_cap: "IFOAM VN", don_vi_nhan: "HTX Nông nghiệp Sóc Trăng", ngay_cap: "05/11/2022", ngay_het_han: "05/11/2024", trang_thai: "expired" },
  { id: "CC006", loai: "ASC", san_pham: "Tôm hùm nuôi bền vững", to_chuc_cap: "ASC International", don_vi_nhan: "Cty CP Thủy sản Khánh Hòa", ngay_cap: "20/01/2025", ngay_het_han: "20/01/2026", trang_thai: "expiring" },
  { id: "CC007", loai: "VietGAP", san_pham: "Xoài cát Hòa Lộc", to_chuc_cap: "Sở NN&PTNT Tiền Giang", don_vi_nhan: "HTX Cây ăn quả Cái Bè", ngay_cap: "12/04/2025", ngay_het_han: "12/04/2027", trang_thai: "valid" },
  { id: "CC008", loai: "GlobalGAP", san_pham: "Vải thiều xuất khẩu EU", to_chuc_cap: "SGS VN", don_vi_nhan: "HTX Vải thiều Bắc Giang", ngay_cap: "01/02/2025", ngay_het_han: "01/02/2027", trang_thai: "valid" },
  { id: "CC009", loai: "HACCP", san_pham: "Cá ngừ đóng hộp", to_chuc_cap: "Nafiqad", don_vi_nhan: "Cty CP Đồ hộp Hạ Long", ngay_cap: "15/07/2024", ngay_het_han: "15/07/2027", trang_thai: "valid" },
  { id: "CC010", loai: "ISO22000", san_pham: "Sữa và sản phẩm từ sữa", to_chuc_cap: "TÜV Rheinland VN", don_vi_nhan: "Cty CP Sữa Mộc Châu", ngay_cap: "30/08/2022", ngay_het_han: "30/08/2024", trang_thai: "expired" },
  { id: "CC011", loai: "Organic", san_pham: "Mật ong hữu cơ", to_chuc_cap: "IFOAM VN", don_vi_nhan: "HTX Ong mật Kon Tum", ngay_cap: "10/03/2025", ngay_het_han: "10/03/2027", trang_thai: "valid" },
  { id: "CC012", loai: "VietGAP", san_pham: "Nhãn lồng Hưng Yên", to_chuc_cap: "Sở NN&PTNT Hưng Yên", don_vi_nhan: "HTX Nhãn lồng Phố Hiến", ngay_cap: "25/05/2025", ngay_het_han: "25/05/2027", trang_thai: "valid" },
  { id: "CC013", loai: "GlobalGAP", san_pham: "Hạt điều xuất khẩu", to_chuc_cap: "Control Union VN", don_vi_nhan: "Cty TNHH Điều vàng Bình Phước", ngay_cap: "18/10/2024", ngay_het_han: "18/10/2025", trang_thai: "expiring" },
  { id: "CC014", loai: "HACCP", san_pham: "Mực khô chế biến", to_chuc_cap: "Nafiqad", don_vi_nhan: "Cty TNHH Hải sản Đại Dương", ngay_cap: "08/12/2024", ngay_het_han: "08/12/2027", trang_thai: "valid" },
  { id: "CC015", loai: "ASC", san_pham: "Cua biển nuôi bền vững", to_chuc_cap: "ASC International", don_vi_nhan: "Cty TNHH Thủy hải sản Năm Căn", ngay_cap: "22/02/2025", ngay_het_han: "22/02/2027", trang_thai: "valid" },
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
  { key: "id", label: "Mã CC", width: "80px" },
  {
    key: "loai",
    label: "Loại chứng chỉ",
    render: (row: Record<string, unknown>) => (
      <Badge variant={loaiColors[row.loai as string] ?? "neutral"}>{row.loai as string}</Badge>
    ),
  },
  { key: "san_pham", label: "Sản phẩm" },
  { key: "to_chuc_cap", label: "Tổ chức cấp" },
  { key: "don_vi_nhan", label: "Đơn vị nhận" },
  { key: "ngay_cap", label: "Ngày cấp" },
  { key: "ngay_het_han", label: "Hết hạn" },
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
      title="Chứng chỉ được cấp"
      subtitle="Danh sách chứng chỉ đã được cấp cho các tổ chức, doanh nghiệp trong hệ thống"
      stats={[
        { label: "Tổng chứng chỉ", value: data.length, variant: "info" },
        { label: "Còn hiệu lực", value: data.filter((c) => c.trang_thai === "valid").length, variant: "success" },
        { label: "Sắp hết hạn", value: data.filter((c) => c.trang_thai === "expiring").length, variant: "warning" },
        { label: "Đã hết hạn", value: data.filter((c) => c.trang_thai === "expired").length, variant: "danger" },
      ]}
      tableColumns={columns}
      tableData={data}
      searchKeys={["id", "loai", "san_pham", "to_chuc_cap", "don_vi_nhan"]}
      addLabel="Thêm chứng chỉ"
    />
  );
}
