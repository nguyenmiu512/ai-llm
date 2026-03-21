"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const webhooks = [
  { id: "WH0001", su_kien: "product.created", url: "https://api.aeon.vn/hooks/ndatrace", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:00:05", trang_thai: "success" },
  { id: "WH0002", su_kien: "uid.allocated", url: "https://erp.vinamilk.com.vn/webhook", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:00:12", trang_thai: "success" },
  { id: "WH0003", su_kien: "event.trace", url: "https://api.masan.vn/trace-hook", http_status: 500, so_lan_thu: 3, thoi_gian: "08/03/2026 08:01:00", trang_thai: "failed" },
  { id: "WH0004", su_kien: "certificate.expiring", url: "https://system.fpt.vn/hooks", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:01:30", trang_thai: "success" },
  { id: "WH0005", su_kien: "alert.created", url: "https://api.vingroup.net/alerts", http_status: 404, so_lan_thu: 2, thoi_gian: "08/03/2026 08:02:00", trang_thai: "failed" },
  { id: "WH0006", su_kien: "label.attached", url: "https://api.aeon.vn/hooks/ndatrace", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:02:30", trang_thai: "success" },
  { id: "WH0007", su_kien: "transport.started", url: "https://logistics.ghn.vn/webhook", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:03:00", trang_thai: "success" },
  { id: "WH0008", su_kien: "transport.completed", url: "https://logistics.ghn.vn/webhook", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:03:30", trang_thai: "success" },
  { id: "WH0009", su_kien: "batch.declared", url: "https://erp.vinamilk.com.vn/webhook", http_status: 500, so_lan_thu: 5, thoi_gian: "08/03/2026 08:04:00", trang_thai: "failed" },
  { id: "WH0010", su_kien: "product.updated", url: "https://api.masan.vn/trace-hook", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:04:30", trang_thai: "success" },
  { id: "WH0011", su_kien: "qr.scanned", url: "https://consumer.shopee.vn/hooks", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:05:00", trang_thai: "success" },
  { id: "WH0012", su_kien: "uid.allocated", url: "https://api.vingroup.net/alerts", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:05:30", trang_thai: "success" },
  { id: "WH0013", su_kien: "alert.resolved", url: "https://system.fpt.vn/hooks", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:06:00", trang_thai: "success" },
  { id: "WH0014", su_kien: "event.trace", url: "https://api.aeon.vn/hooks/ndatrace", http_status: 500, so_lan_thu: 3, thoi_gian: "08/03/2026 08:06:30", trang_thai: "retry" },
  { id: "WH0015", su_kien: "certificate.created", url: "https://api.masan.vn/trace-hook", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:07:00", trang_thai: "success" },
  { id: "WH0016", su_kien: "batch.declared", url: "https://logistics.ghn.vn/webhook", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:07:30", trang_thai: "success" },
  { id: "WH0017", su_kien: "label.attached", url: "https://consumer.shopee.vn/hooks", http_status: 404, so_lan_thu: 2, thoi_gian: "08/03/2026 08:08:00", trang_thai: "failed" },
  { id: "WH0018", su_kien: "qr.generated", url: "https://erp.vinamilk.com.vn/webhook", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:08:30", trang_thai: "success" },
  { id: "WH0019", su_kien: "transport.incident", url: "https://api.vingroup.net/alerts", http_status: 500, so_lan_thu: 5, thoi_gian: "08/03/2026 08:09:00", trang_thai: "retry" },
  { id: "WH0020", su_kien: "product.created", url: "https://system.fpt.vn/hooks", http_status: 200, so_lan_thu: 1, thoi_gian: "08/03/2026 08:09:30", trang_thai: "success" },
];

const statusVariant = (code: number): "success" | "warning" | "danger" => {
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "warning";
  return "danger";
};

const columns = [
  { key: "id", label: "Mã", width: "90px" },
  { key: "su_kien", label: "Sự kiện" },
  { key: "url", label: "URL đích" },
  {
    key: "http_status",
    label: "HTTP Status",
    render: (row: Record<string, unknown>) => (
      <Badge variant={statusVariant(row.http_status as number)}>{row.http_status as number}</Badge>
    ),
  },
  { key: "so_lan_thu", label: "Số lần thử" },
  { key: "thoi_gian", label: "Thời gian" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
        success: { label: "Thành công", variant: "success" },
        failed: { label: "Thất bại", variant: "danger" },
        retry: { label: "Đang thử lại", variant: "warning" },
      };
      const m = map[row.trang_thai as string];
      return <Badge variant={m.variant}>{m.label}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Sự kiện tích hợp"
      subtitle="Lịch sử sự kiện webhook và tích hợp hệ thống"
      stats={[
        { label: "Tổng webhook", value: webhooks.length, variant: "info" },
        { label: "Thành công", value: webhooks.filter((w) => w.trang_thai === "success").length, variant: "success" },
        { label: "Thất bại", value: webhooks.filter((w) => w.trang_thai === "failed").length, variant: "danger" },
        { label: "Đang thử lại", value: webhooks.filter((w) => w.trang_thai === "retry").length, variant: "warning" },
      ]}
      tableColumns={columns}
      tableData={webhooks}
      searchKeys={["id", "su_kien", "url"]}
      addLabel="Thêm Webhook"
    />
  );
}
