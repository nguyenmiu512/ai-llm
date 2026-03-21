"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";
import { products } from "@/lib/mock-data";

const columns = [
  { key: "id", label: "Mã SP", width: "110px" },
  { key: "name", label: "Tên sản phẩm" },
  { key: "category", label: "Danh mục" },
  { key: "unit", label: "Đơn vị" },
  { key: "company", label: "Doanh nghiệp" },
  { key: "batchCount", label: "Số lô" },
  {
    key: "status",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "success" | "warning" | "neutral"> = { active: "success", pending: "warning", inactive: "neutral" };
      const label: Record<string, string> = { active: "Đang bán", pending: "Chờ duyệt", inactive: "Ngưng" };
      return <Badge variant={map[row.status as string]}>{label[row.status as string]}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Danh sách sản phẩm"
      subtitle="Quản lý toàn bộ sản phẩm trong hệ thống"
      stats={[
        { label: "Tổng sản phẩm", value: products.length, variant: "info" },
        { label: "Đang bán", value: products.filter((p) => p.status === "active").length, variant: "success" },
        { label: "Chờ duyệt", value: products.filter((p) => p.status === "pending").length, variant: "warning" },
      ]}
      tableColumns={columns}
      tableData={products}
      searchKeys={["name", "id", "company", "category"]}
      addLabel="Thêm sản phẩm"
    />
  );
}
