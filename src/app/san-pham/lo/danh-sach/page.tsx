"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";
import { batches } from "@/lib/mock-data";

const statusMap: Record<string, "success" | "info" | "warning" | "danger"> = {
  "in-transit": "info",
  warehouse: "warning",
  delivered: "success",
  recalled: "danger",
};
const statusLabel: Record<string, string> = {
  "in-transit": "Đang vận chuyển",
  warehouse: "Trong kho",
  delivered: "Đã giao",
  recalled: "Thu hồi",
};

const columns = [
  { key: "id", label: "Mã lô", width: "110px" },
  { key: "product", label: "Sản phẩm" },
  { key: "company", label: "Doanh nghiệp" },
  { key: "quantity", label: "Số lượng" },
  { key: "productionDate", label: "Ngày SX" },
  { key: "expiryDate", label: "Hạn SD" },
  {
    key: "status",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => (
      <Badge variant={statusMap[row.status as string]}>{statusLabel[row.status as string]}</Badge>
    ),
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Danh sách lô hàng"
      subtitle="Quản lý thông tin và truy xuất nguồn gốc lô hàng"
      stats={[
        { label: "Tổng lô", value: batches.length, variant: "info" },
        { label: "Đang vận chuyển", value: batches.filter((b) => b.status === "in-transit").length, variant: "info" },
        { label: "Đã giao", value: batches.filter((b) => b.status === "delivered").length, variant: "success" },
        { label: "Thu hồi", value: batches.filter((b) => b.status === "recalled").length, variant: "danger" },
      ]}
      tableColumns={columns}
      tableData={batches}
      searchKeys={["id", "product", "company"]}
      addLabel="Khai báo lô"
    />
  );
}
