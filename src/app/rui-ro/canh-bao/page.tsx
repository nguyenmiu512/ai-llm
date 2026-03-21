"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";
import { alerts } from "@/lib/mock-data";

const columns = [
  { key: "id", label: "Mã CB", width: "100px" },
  { key: "title", label: "Nội dung cảnh báo" },
  { key: "entity", label: "Đối tượng" },
  {
    key: "level",
    label: "Mức độ",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "danger" | "warning" | "info"> = { high: "danger", medium: "warning", low: "info" };
      const label: Record<string, string> = { high: "Cao", medium: "Trung bình", low: "Thấp" };
      return <Badge variant={map[row.level as string]}>{label[row.level as string]}</Badge>;
    },
  },
  {
    key: "status",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "danger" | "warning" | "success"> = { open: "danger", processing: "warning", resolved: "success" };
      const label: Record<string, string> = { open: "Chưa xử lý", processing: "Đang xử lý", resolved: "Đã xử lý" };
      return <Badge variant={map[row.status as string]}>{label[row.status as string]}</Badge>;
    },
  },
  { key: "createdAt", label: "Ngày tạo" },
];

export default function Page() {
  return (
    <SectionPage
      title="Danh sách cảnh báo rủi ro"
      subtitle="Theo dõi và xử lý các cảnh báo trong hệ thống"
      stats={[
        { label: "Tổng cảnh báo", value: alerts.length, variant: "info" },
        { label: "Chưa xử lý", value: alerts.filter((a) => a.status === "open").length, variant: "danger" },
        { label: "Đang xử lý", value: alerts.filter((a) => a.status === "processing").length, variant: "warning" },
        { label: "Đã xử lý", value: alerts.filter((a) => a.status === "resolved").length, variant: "success" },
      ]}
      tableColumns={columns}
      tableData={alerts}
      searchKeys={["id", "title", "entity"]}
      addLabel="Tạo cảnh báo"
    />
  );
}
