"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";
import { chains } from "@/lib/mock-data";

const columns = [
  { key: "id", label: "Mã chuỗi", width: "110px" },
  { key: "name", label: "Tên chuỗi" },
  { key: "product", label: "Sản phẩm chính" },
  { key: "nodes", label: "Số nút" },
  { key: "events", label: "Sự kiện" },
  { key: "startDate", label: "Ngày bắt đầu" },
  {
    key: "status",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "success" | "warning" | "neutral"> = { active: "success", paused: "warning", completed: "neutral" };
      const label: Record<string, string> = { active: "Đang hoạt động", paused: "Tạm dừng", completed: "Hoàn thành" };
      return <Badge variant={map[row.status as string]}>{label[row.status as string]}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Danh sách chuỗi cung ứng"
      subtitle="Quản lý và giám sát toàn bộ chuỗi cung ứng"
      stats={[
        { label: "Tổng chuỗi", value: chains.length, variant: "info" },
        { label: "Đang hoạt động", value: chains.filter((c) => c.status === "active").length, variant: "success" },
        { label: "Tạm dừng", value: chains.filter((c) => c.status === "paused").length, variant: "warning" },
        { label: "Hoàn thành", value: chains.filter((c) => c.status === "completed").length, variant: "neutral" },
      ]}
      tableColumns={columns}
      tableData={chains}
      searchKeys={["id", "name", "product"]}
      addLabel="Tạo chuỗi mới"
    />
  );
}
