"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const criticalTemplates = [
  { id: "MTY001", ten_mau: "Kiểm dịch thực vật xuất khẩu", pham_vi: "Nông sản xuất khẩu", co_so: "Nghị định 31/2018/NĐ-CP", bat_buoc: true, ngay_hieu_luc: "01/01/2024", trang_thai: "active" },
  { id: "MTY002", ten_mau: "Kiểm tra an toàn thực phẩm", pham_vi: "Thực phẩm chế biến", co_so: "Luật An toàn thực phẩm 2010", bat_buoc: true, ngay_hieu_luc: "01/01/2024", trang_thai: "active" },
  { id: "MTY003", ten_mau: "Truy xuất nguồn gốc thủy sản", pham_vi: "Thủy sản xuất khẩu EU", co_so: "EU Regulation 1224/2009", bat_buoc: true, ngay_hieu_luc: "15/03/2024", trang_thai: "active" },
  { id: "MTY004", ten_mau: "Chứng nhận VietGAP nông sản", pham_vi: "Rau củ quả tươi", co_so: "QCVN 01-132:2013/BNNPTNT", bat_buoc: true, ngay_hieu_luc: "01/06/2024", trang_thai: "active" },
  { id: "MTY005", ten_mau: "Khai báo hải quan nhập khẩu", pham_vi: "Hàng hóa nhập khẩu", co_so: "Luật Hải quan 2014", bat_buoc: true, ngay_hieu_luc: "01/01/2024", trang_thai: "active" },
  { id: "MTY006", ten_mau: "Ghi nhận chuỗi lạnh vận chuyển", pham_vi: "Thực phẩm đông lạnh", co_so: "QCVN 02-28:2012/BNNPTNT", bat_buoc: false, ngay_hieu_luc: "01/09/2024", trang_thai: "active" },
  { id: "MTY007", ten_mau: "Báo cáo sử dụng thuốc BVTV", pham_vi: "Nông sản canh tác", co_so: "Nghị định 66/2016/NĐ-CP", bat_buoc: true, ngay_hieu_luc: "01/01/2025", trang_thai: "active" },
  { id: "MTY008", ten_mau: "Kiểm tra dư lượng kháng sinh thủy sản", pham_vi: "Thủy sản nuôi trồng", co_so: "Thông tư 26/2016/TT-BNNPTNT", bat_buoc: true, ngay_hieu_luc: "01/01/2025", trang_thai: "active" },
  { id: "MTY009", ten_mau: "Đăng ký lô hàng nông sản nội địa", pham_vi: "Nông sản nội địa", co_so: "Thông tư 74/2011/TT-BNNPTNT", bat_buoc: false, ngay_hieu_luc: "01/03/2025", trang_thai: "inactive" },
  { id: "MTY010", ten_mau: "Xác nhận xuất xứ hàng hóa ASEAN", pham_vi: "Hàng xuất khẩu ASEAN", co_so: "ATIGA - Hiệp định ASEAN", bat_buoc: true, ngay_hieu_luc: "01/06/2025", trang_thai: "active" },
];

const columns = [
  { key: "id", label: "Mã mẫu", width: "90px" },
  { key: "ten_mau", label: "Tên mẫu" },
  { key: "pham_vi", label: "Phạm vi áp dụng" },
  { key: "co_so", label: "Cơ sở pháp lý" },
  {
    key: "bat_buoc",
    label: "Bắt buộc",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.bat_buoc ? "danger" : "neutral"}>
        {row.bat_buoc ? "Bắt buộc" : "Khuyến nghị"}
      </Badge>
    ),
  },
  { key: "ngay_hieu_luc", label: "Ngày hiệu lực" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "active" ? "success" : "neutral"}>
        {row.trang_thai === "active" ? "Hiệu lực" : "Hết hiệu lực"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Mẫu sự kiện trọng yếu"
      subtitle="Mẫu sự kiện bắt buộc theo quy định pháp luật"
      stats={[
        { label: "Tổng mẫu", value: criticalTemplates.length, variant: "info" },
        { label: "Bắt buộc", value: criticalTemplates.filter((t) => t.bat_buoc).length, variant: "danger" },
        { label: "Khuyến nghị", value: criticalTemplates.filter((t) => !t.bat_buoc).length, variant: "neutral" },
        { label: "Đang hiệu lực", value: criticalTemplates.filter((t) => t.trang_thai === "active").length, variant: "success" },
      ]}
      tableColumns={columns}
      tableData={criticalTemplates}
      searchKeys={["id", "ten_mau", "pham_vi", "co_so"]}
      addLabel="Tạo mẫu trọng yếu"
    />
  );
}
