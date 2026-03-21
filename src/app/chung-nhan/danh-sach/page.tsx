"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";
import { certifications } from "@/lib/mock-data";

const columns = [
  { key: "id", label: "Mã CN", width: "100px" },
  { key: "name", label: "Loại chứng nhận" },
  { key: "entity", label: "Tổ chức / DN" },
  { key: "type", label: "Phạm vi" },
  { key: "issuedAt", label: "Ngày cấp" },
  { key: "expiresAt", label: "Ngày hết hạn" },
  { key: "issuer", label: "Đơn vị cấp" },
  {
    key: "status",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "success" | "warning" | "danger"> = { valid: "success", expiring: "warning", expired: "danger" };
      const label: Record<string, string> = { valid: "Còn hiệu lực", expiring: "Sắp hết hạn", expired: "Đã hết hạn" };
      return <Badge variant={map[row.status as string]}>{label[row.status as string]}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Danh sách chứng nhận"
      subtitle="Quản lý chứng nhận và chứng chỉ của các doanh nghiệp"
      stats={[
        { label: "Tổng cộng", value: certifications.length, variant: "info" },
        { label: "Còn hiệu lực", value: certifications.filter((c) => c.status === "valid").length, variant: "success" },
        { label: "Sắp hết hạn", value: certifications.filter((c) => c.status === "expiring").length, variant: "warning" },
        { label: "Đã hết hạn", value: certifications.filter((c) => c.status === "expired").length, variant: "danger" },
      ]}
      tableColumns={columns}
      tableData={certifications}
      searchKeys={["id", "name", "entity", "issuer"]}
      addLabel="Cấp chứng nhận"
    />
  );
}
