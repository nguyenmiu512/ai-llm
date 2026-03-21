"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const data = Array.from({ length: 25 }, (_, i) => ({
  id: `DN${String(i + 1).padStart(4, "0")}`,
  name: ["Công ty CP Nông sản Việt", "TNHH Thực phẩm Sạch", "HTX Nông nghiệp Xanh", "Công ty TNHH Rau củ Miền Bắc", "Trang trại Hữu Cơ Việt"][i % 5],
  type: ["Công ty CP", "TNHH", "HTX", "Doanh nghiệp tư nhân"][i % 4],
  province: ["Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ", "Lâm Đồng"][i % 5],
  status: ["active", "pending", "inactive"][i % 3],
  products: Math.floor(10 + i * 2),
}));

const columns = [
  { key: "id", label: "Mã DN", width: "100px" },
  { key: "name", label: "Tên doanh nghiệp" },
  { key: "type", label: "Loại hình" },
  { key: "province", label: "Tỉnh/Thành phố" },
  { key: "products", label: "Số sản phẩm" },
  {
    key: "status",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "success" | "warning" | "neutral"> = { active: "success", pending: "warning", inactive: "neutral" };
      const label: Record<string, string> = { active: "Hoạt động", pending: "Chờ duyệt", inactive: "Ngưng HĐ" };
      return <Badge variant={map[row.status as string]}>{label[row.status as string]}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Danh sách doanh nghiệp"
      subtitle="Quản lý thông tin các doanh nghiệp tham gia chuỗi cung ứng"
      stats={[
        { label: "Tổng cộng", value: data.length, variant: "info" },
        { label: "Hoạt động", value: data.filter((d) => d.status === "active").length, variant: "success" },
        { label: "Chờ duyệt", value: data.filter((d) => d.status === "pending").length, variant: "warning" },
      ]}
      tableColumns={columns}
      tableData={data}
      searchKeys={["name", "id", "province"]}
      addLabel="Thêm doanh nghiệp"
    />
  );
}
