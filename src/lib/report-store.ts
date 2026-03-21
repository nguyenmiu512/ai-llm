export interface StatItem {
  label: string;
  value: string;
  change?: string;
  isUp?: boolean;
}

export interface ReportSession {
  id: string;
  title: string;
  query: string;
  summary: string;
  timestamp: string;
  stats: StatItem[];
}

// Module-level cache — survives SPA navigation without re-query
const cache = new Map<string, ReportSession>();

export function saveSession(session: ReportSession): void {
  cache.set(session.id, session);
  if (typeof window === "undefined") return;
  try {
    const store = JSON.parse(localStorage.getItem("__rpt") || "{}");
    store[session.id] = session;
    localStorage.setItem("__rpt", JSON.stringify(store));
  } catch {}
}

export function getSession(id: string): ReportSession | null {
  if (cache.has(id)) return cache.get(id)!;
  if (typeof window === "undefined") return null;
  try {
    const store = JSON.parse(localStorage.getItem("__rpt") || "{}");
    if (store[id]) {
      cache.set(id, store[id]);
      return store[id];
    }
  } catch {}
  return null;
}

// Pre-seed demo sessions so detail pages always resolve
export const INITIAL_SESSION_ID = "q1-2026-violations";
export const SESSION_HIGH_RISK_ID = "session-high-risk";
export const SESSION_EXPORT_ATTP_ID = "session-export-attp";

saveSession({
  id: SESSION_HIGH_RISK_ID,
  title: "Phân bổ cơ sở rủi ro cao — Tháng 3/2026",
  query: "Liệt kê doanh nghiệp có mức độ rủi ro cao cần xử lý ngay trong tháng 3/2026",
  summary: "47 cơ sở vượt ngưỡng rủi ro cao. 12 cần đình chỉ khẩn cấp. Tập trung tại Quận 1 (18) và Quận 5 (14).",
  timestamp: "09:16 - 20/03/2026",
  stats: [
    { label: "Cơ sở rủi ro cao", value: "47", change: "+12", isUp: true },
    { label: "Cần đình chỉ ngay", value: "12", change: "25.5%" },
    { label: "Quận tập trung nhất", value: "Quận 1", change: "18 cơ sở" },
  ],
});

saveSession({
  id: SESSION_EXPORT_ATTP_ID,
  title: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn ATTP — 6 tháng gần nhất",
  query: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn chứng nhận ATTP trong 6 tháng gần nhất",
  summary: "Tỷ lệ đạt chuẩn ATTP 91.3% trong 6 tháng (T10/2025–T3/2026). Tháng 1/2026 thấp nhất 88.7%. Xu hướng phục hồi tích cực.",
  timestamp: "14:23 - 19/03/2026",
  stats: [
    { label: "Đạt chuẩn TB 6 tháng", value: "91.3%", change: "+1.8%", isUp: true },
    { label: "Tháng thấp nhất", value: "T1/2026", change: "88.7%" },
    { label: "Lô hàng kiểm tra", value: "3,847", change: "+9.2%", isUp: true },
  ],
});

saveSession({
  id: INITIAL_SESSION_ID,
  title: "Kết quả phân tích — Vi phạm chuỗi cung ứng Q1/2026",
  query: "Phân tích tổng hợp vi phạm chuỗi cung ứng trong Q1/2026, phân loại theo nhóm và so sánh xu hướng theo tháng.",
  summary:
    "Đã phân tích 2,661 sự kiện vi phạm trong Q1/2026 từ 1,284 doanh nghiệp. Vi phạm truy xuất nguồn gốc chiếm tỷ lệ cao nhất (38.7%), đỉnh điểm tháng 2. Tỷ lệ xử lý đạt 87.4%, cải thiện 2.8% so với Q4/2025.",
  timestamp: "10:32 - 20/03/2026",
  stats: [
    { label: "Tổng vi phạm", value: "2,661", change: "+15.2%", isUp: true },
    { label: "Tỷ lệ xử lý", value: "87.4%", change: "+2.8%", isUp: true },
    { label: "Doanh nghiệp", value: "1,284" },
  ],
});
