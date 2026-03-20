"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BrainCircuit, Send, Plus, ChevronDown, ChevronRight, Copy,
  BookmarkPlus, Share2, BarChart2, TrendingUp, PieChart as PieIcon,
  AlignLeft, Clock, MessageSquare, Eye, Trash2, MoreHorizontal,
  CheckCircle2, Sparkles, X, Download, Search, LayoutGrid,
  Lightbulb, AlertTriangle, ShieldCheck, GitCompareArrows, Info,
  FileText, ExternalLink, PenLine, Paperclip,
} from "lucide-react";

// ── Dynamic chart imports (SSR-safe) ─────────────────────────────────────────
const Column = dynamic(() => import("@ant-design/plots").then((m) => m.Column), { ssr: false });
const Line = dynamic(() => import("@ant-design/plots").then((m) => m.Line), { ssr: false });
const Pie = dynamic(() => import("@ant-design/plots").then((m) => m.Pie), { ssr: false });
const Bar = dynamic(() => import("@ant-design/plots").then((m) => m.Bar), { ssr: false });

// ── Palette ───────────────────────────────────────────────────────────────────
const COLORS = ["#1570EF", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

// ── Chart data ────────────────────────────────────────────────────────────────
const columnData = [
  { month: "T1", type: "Truy xuất nguồn gốc", value: 312 },
  { month: "T1", type: "Tem nhãn", value: 198 },
  { month: "T1", type: "Chứng chỉ", value: 145 },
  { month: "T1", type: "Chất lượng", value: 98 },
  { month: "T1", type: "Quy trình", value: 54 },
  { month: "T2", type: "Truy xuất nguồn gốc", value: 378 },
  { month: "T2", type: "Tem nhãn", value: 241 },
  { month: "T2", type: "Chứng chỉ", value: 167 },
  { month: "T2", type: "Chất lượng", value: 119 },
  { month: "T2", type: "Quy trình", value: 72 },
  { month: "T3", type: "Truy xuất nguồn gốc", value: 341 },
  { month: "T3", type: "Tem nhãn", value: 215 },
  { month: "T3", type: "Chứng chỉ", value: 152 },
  { month: "T3", type: "Chất lượng", value: 108 },
  { month: "T3", type: "Quy trình", value: 61 },
];

const lineData = [
  { month: "T1", value: 807 },
  { month: "T2", value: 977 },
  { month: "T3", value: 877 },
];

const pieData = [
  { type: "Truy xuất nguồn gốc", value: 1031 },
  { type: "Tem nhãn", value: 654 },
  { type: "Chứng chỉ", value: 464 },
  { type: "Chất lượng", value: 325 },
  { type: "Quy trình", value: 187 },
];
const pieTotal = pieData.reduce((s, d) => s + d.value, 0);

const barData = [
  { company: "Vinafood Corp", value: 178 },
  { company: "SeaFood Mekong", value: 156 },
  { company: "GreenFarm VN", value: 143 },
  { company: "LogiPro Việt Nam", value: 139 },
  { company: "PharmaViet", value: 121 },
];

const topDoanhNghiep = [
  { ten: "Vinafood Corp", vi_pham: 178, xu_ly: "91.0%" },
  { ten: "SeaFood Mekong", vi_pham: 156, xu_ly: "88.5%" },
  { ten: "GreenFarm VN", vi_pham: 143, xu_ly: "86.7%" },
  { ten: "LogiPro Việt Nam", vi_pham: 139, xu_ly: "84.9%" },
  { ten: "PharmaViet", vi_pham: 121, xu_ly: "81.0%" },
];

const violationRows = [
  { loai: "Truy xuất nguồn gốc",    t1: 312, t2: 378, t3: 341, tong: 1031, muc: "Cao",        color: "#1570EF" },
  { loai: "Tem nhãn",               t1: 198, t2: 241, t3: 215, tong: 654,  muc: "Trung bình", color: "#F59E0B" },
  { loai: "Chứng chỉ",              t1: 145, t2: 167, t3: 152, tong: 464,  muc: "Trung bình", color: "#10B981" },
  { loai: "Chất lượng nguyên liệu", t1: 98,  t2: 119, t3: 108, tong: 325,  muc: "Cao",        color: "#EF4444" },
  { loai: "Quy trình sản xuất",     t1: 54,  t2: 72,  t3: 61,  tong: 187,  muc: "Thấp",       color: "#8B5CF6" },
];

// ── AI Insights ───────────────────────────────────────────────────────────────
const aiInsights = [
  {
    type: "finding", color: "blue", icon: "finding", title: "Phát hiện chính",
    points: [
      "Vi phạm truy xuất nguồn gốc tăng 20.8% so với Q4/2025, tập trung vào nhóm thủy sản đông lạnh.",
      "Tháng 2 ghi nhận đỉnh điểm vi phạm với 977 sự kiện, nguyên nhân do cao điểm xuất khẩu trước Tết.",
      "87.4% vi phạm đã được xử lý trong vòng 30 ngày, vượt KPI đề ra (85%).",
    ],
  },
  {
    type: "risk", color: "orange", icon: "risk", title: "Bất thường & Rủi ro",
    points: [
      "Vinafood Corp có 178 vi phạm — tăng 34% so với quý trước, cần kiểm tra đột xuất.",
      "Nhóm chứng chỉ hết hạn tăng đột biến ở tháng 2, liên quan đến 3 lô hàng xuất EU bị tạm giữ.",
      "12 doanh nghiệp chưa cập nhật thông tin truy xuất quá 60 ngày — nguy cơ mất chứng nhận.",
    ],
  },
  {
    type: "recommendation", color: "green", icon: "recommendation", title: "Khuyến nghị hành động",
    points: [
      "Tăng tần suất kiểm tra định kỳ đối với Top 5 doanh nghiệp vi phạm nhiều nhất lên 2 lần/tháng.",
      "Triển khai cảnh báo tự động khi chứng chỉ còn dưới 30 ngày hiệu lực.",
      "Mở đợt tập huấn truy xuất nguồn gốc cho nhóm doanh nghiệp mới gia nhập hệ thống (Q2/2026).",
    ],
  },
  {
    type: "comparison", color: "red", icon: "comparison", title: "So sánh năm trước",
    points: [
      "Tổng vi phạm Q1/2026 tăng 15.2% so với Q1/2025 (2,661 vs 2,310 sự kiện).",
      "Tỷ lệ xử lý cải thiện từ 83.1% (Q1/2025) lên 87.4% — xu hướng tích cực.",
      "Nhóm vi phạm tem nhãn giảm 8.3% nhờ áp dụng hệ thống QR tự động từ Q3/2025.",
    ],
  },
];

// ── Demo answers ──────────────────────────────────────────────────────────────
const demoAnswers: Record<string, { thinking: string[]; text: string; kpis?: { label: string; value: string; change: string; up: boolean | null }[] }> = {
  "Tỷ lệ tuân thủ tem nhãn của các doanh nghiệp xuất khẩu hiện tại là bao nhiêu?": {
    thinking: [
      "Bước 1 — Truy vấn dữ liệu tem nhãn từ module Mã Tem UID/QR",
      "Bước 2 — Lọc nhóm doanh nghiệp có hoạt động xuất khẩu trong 90 ngày gần nhất",
      "Bước 3 — Tính tỷ lệ tuân thủ theo tiêu chuẩn GS1 và quy định Việt Nam",
    ],
    text: "Tỷ lệ tuân thủ tem nhãn của **847 doanh nghiệp xuất khẩu** đang hoạt động đạt **82.3%** — thấp hơn 5.1% so với mục tiêu 87.4%. Nhóm thủy sản có tỷ lệ tuân thủ thấp nhất (74.6%), trong khi nhóm cà phê đạt cao nhất (94.2%).",
    kpis: [
      { label: "Tỷ lệ tuân thủ", value: "82.3%", change: "-5.1% vs KPI", up: false },
      { label: "DN xuất khẩu", value: "847", change: "Đang hoạt động", up: null },
      { label: "Tem chưa đúng", value: "1,247", change: "+8.3% so T2", up: false },
    ],
  },
  "So sánh vi phạm Q1/2026 với Q1/2025 theo từng nhóm vi phạm": {
    thinking: [
      "Bước 1 — Tải dữ liệu vi phạm Q1/2025 từ kho lưu trữ lịch sử",
      "Bước 2 — Chuẩn hóa phân loại vi phạm theo 5 nhóm thống nhất",
      "Bước 3 — Tính toán delta và phân tích xu hướng năm-trên-năm",
    ],
    text: "So sánh **Q1/2026 vs Q1/2025**: Tổng vi phạm tăng **15.2%** (2,661 vs 2,310). Vi phạm truy xuất nguồn gốc tăng mạnh nhất (+20.8%), trong khi vi phạm tem nhãn giảm nhờ triển khai hệ thống QR tự động từ Q3/2025 (-8.3%). Tỷ lệ xử lý cải thiện đáng kể từ 83.1% lên 87.4%.",
    kpis: [
      { label: "Q1/2025", value: "2,310", change: "Kỳ so sánh", up: null },
      { label: "Q1/2026", value: "2,661", change: "+15.2% YoY", up: false },
      { label: "Tỷ lệ xử lý", value: "87.4%", change: "+4.3% YoY", up: true },
    ],
  },
  "Danh sách doanh nghiệp có điểm rủi ro cao cần ưu tiên xử lý tháng 4": {
    thinking: [
      "Bước 1 — Tính điểm rủi ro tổng hợp từ 6 chỉ số: tần suất vi phạm, tái phạm, mức độ nghiêm trọng, thời gian xử lý, tuân thủ báo cáo, chứng nhận",
      "Bước 2 — Xếp hạng và lọc doanh nghiệp có điểm rủi ro ≥ 70",
      "Bước 3 — Đề xuất biện pháp xử lý ưu tiên theo quy trình NDATrace",
    ],
    text: "Đã xác định **6 doanh nghiệp rủi ro cao** (điểm ≥ 70) cần ưu tiên xử lý trong tháng 4/2026. Vinafood Corp đứng đầu với điểm 84 — tăng mạnh do vi phạm tái phạm 3 lần liên tiếp.",
    kpis: [
      { label: "DN rủi ro cao", value: "6", change: "+2 so T3", up: false },
      { label: "Điểm trung bình", value: "75.8", change: "Nhóm đỏ", up: null },
      { label: "Cần xử lý ngay", value: "2", change: "Điểm ≥ 80", up: null },
    ],
  },
  "Xu hướng tăng trưởng xuất khẩu thủy sản sang EU trong Q1/2026": {
    thinking: [
      "Bước 1 — Tổng hợp dữ liệu chứng nhận xuất khẩu EU từ module Chứng chỉ được cấp",
      "Bước 2 — Phân tích xu hướng theo giá trị và số lượng lô hàng",
      "Bước 3 — Đối chiếu với báo cáo thị trường và dự báo Q2",
    ],
    text: "Xuất khẩu thủy sản sang EU trong Q1/2026 tăng **18.4%** về giá trị so với Q1/2025, đạt **342 triệu USD**. Tôm thẻ chân trắng dẫn đầu (42%), tiếp theo là cá tra (31%) và mực khô (18%). Dự báo Q2/2026 tiếp tục tăng 12-15% nhờ nhu cầu hải sản mùa hè tại thị trường EU.",
    kpis: [
      { label: "Giá trị XK", value: "$342M", change: "+18.4% YoY", up: true },
      { label: "Số lô hàng", value: "1,847", change: "+11.2% vs Q1/25", up: true },
      { label: "Dự báo Q2", value: "$385M", change: "+12.6% dự kiến", up: true },
    ],
  },
};

// ── History groups ────────────────────────────────────────────────────────────
type HistoryItem = { id: number; title: string; time: string; msgs: number; tags: string[]; preview: string };
const historyGroups: { label: string; items: HistoryItem[] }[] = [
  {
    label: "Hôm nay",
    items: [
      { id: 1, title: "Phân tích vi phạm chuỗi cung ứng Q1/2026", time: "10:32", msgs: 4, tags: ["Q1/2026", "vi phạm"], preview: "2,661 sự kiện vi phạm, tỷ lệ xử lý 87.4%" },
      { id: 2, title: "Doanh nghiệp rủi ro cao cần xử lý ngay", time: "09:15", msgs: 2, tags: ["rủi ro", "ưu tiên"], preview: "6 doanh nghiệp điểm rủi ro ≥ 70" },
    ],
  },
  {
    label: "Hôm qua",
    items: [
      { id: 3, title: "Xu hướng xuất khẩu thủy sản Q1/2026", time: "15:44", msgs: 6, tags: ["xu hướng", "thủy sản"], preview: "Tăng 12% so với cùng kỳ, EU dẫn đầu" },
      { id: 4, title: "Chứng nhận hết hạn tháng 3/2026", time: "11:20", msgs: 3, tags: ["chứng nhận"], preview: "47 chứng nhận sắp hết hạn trong 30 ngày" },
    ],
  },
  {
    label: "Tuần này",
    items: [
      { id: 5, title: "So sánh hiệu suất Q4/2025 vs Q1/2026", time: "T4", msgs: 8, tags: ["so sánh"], preview: "Vi phạm tăng 15.2%, tỷ lệ xử lý cải thiện" },
      { id: 6, title: "Top 10 sản phẩm rủi ro cao nhất", time: "T4", msgs: 5, tags: ["rủi ro", "sản phẩm"], preview: "Tôm thẻ, xoài cát, mực khô trong nhóm đỏ" },
      { id: 7, title: "Rủi ro doanh nghiệp Vinafood Corp", time: "T3", msgs: 3, tags: ["rủi ro"], preview: "Vi phạm tăng 34%, đề xuất kiểm tra đột xuất" },
      { id: 8, title: "Phân tích lô hàng bị tạm giữ tháng 2", time: "T2", msgs: 4, tags: ["tạm giữ", "EU"], preview: "3 lô hàng thủy sản, giá trị 2.4 tỷ VNĐ" },
    ],
  },
  {
    label: "Trước đó",
    items: [
      { id: 9, title: "Mẫu sự kiện trọng yếu Q4/2025", time: "14/03", msgs: 7, tags: ["sự kiện"], preview: "128 sự kiện trọng yếu, 94% đã phân loại" },
      { id: 10, title: "Báo cáo tổng kết năm 2025", time: "10/03", msgs: 12, tags: ["tổng kết", "2025"], preview: "8,572 sản phẩm, 342 chuỗi cung ứng hoạt động" },
      { id: 11, title: "Phân tích tích hợp webhook Q4", time: "05/03", msgs: 4, tags: ["tích hợp"], preview: "98.7% giao dịch thành công, 124 lỗi xử lý" },
      { id: 12, title: "Đánh giá đối tác logistics 2025", time: "01/03", msgs: 6, tags: ["đối tác", "logistics"], preview: "VietLogistics đứng đầu với 96.2% đúng hạn" },
    ],
  },
];

// ── Question suggestions ──────────────────────────────────────────────────────
const questionGroups = [
  {
    label: "Phân tích", color: "blue",
    questions: [
      "Phân tích tổng hợp vi phạm chuỗi cung ứng Q1/2026 theo từng tháng",
      "Tỷ lệ tuân thủ tem nhãn của các doanh nghiệp xuất khẩu hiện tại là bao nhiêu?",
      "Thống kê số lượng sự kiện truy xuất nguồn gốc được ghi nhận trong tháng 3",
      "Phân tích hiệu suất xử lý vi phạm so với mục tiêu KPI quý này",
    ],
  },
  {
    label: "So sánh", color: "violet",
    questions: [
      "So sánh vi phạm Q1/2026 với Q1/2025 theo từng nhóm vi phạm",
      "Doanh nghiệp nào có tốc độ cải thiện tốt nhất so với quý trước?",
      "So sánh hiệu suất xử lý giữa các nhóm ngành hàng trong cùng kỳ",
      "Tỷ lệ chứng nhận được cấp mới vs. hết hạn trong Q1 qua các năm",
    ],
  },
  {
    label: "Rủi ro", color: "red",
    questions: [
      "Danh sách doanh nghiệp có điểm rủi ro cao cần ưu tiên xử lý tháng 4",
      "Những sản phẩm nào đang có nguy cơ không đạt tiêu chuẩn xuất khẩu EU?",
      "Dự báo xu hướng vi phạm Q2/2026 dựa trên dữ liệu hiện tại",
      "Phân tích nguyên nhân tái phạm của Top 5 doanh nghiệp vi phạm nhiều nhất",
    ],
  },
  {
    label: "Xuất khẩu", color: "green",
    questions: [
      "Xu hướng tăng trưởng xuất khẩu thủy sản sang EU trong Q1/2026",
      "Những thị trường nào đang có nhu cầu tăng đột biến với sản phẩm Việt Nam?",
      "Dự báo kim ngạch xuất khẩu nông sản Q2/2026 theo mô hình AI",
      "Tỷ lệ chứng nhận hữu cơ được công nhận ở các thị trường xuất khẩu chính",
    ],
  },
];

// ── Saved reports ─────────────────────────────────────────────────────────────
type SavedReport = { id: number; title: string; desc: string; author: string; views: number; status: string; tags: string[] };
const initialSavedReports: SavedReport[] = [
  { id: 1, title: "Vi phạm chuỗi cung ứng Q1/2026", desc: "Phân tích 2,661 sự kiện không tuân thủ theo 5 nhóm vi phạm chính", author: "Nguyễn Văn A", views: 42, status: "Đã duyệt", tags: ["Phân tích", "Q1"] },
  { id: 2, title: "Xu hướng thị trường xuất khẩu", desc: "Dự báo tăng trưởng các mặt hàng chủ lực sang EU, Mỹ, Nhật", author: "Trần Thị B", views: 18, status: "Chờ duyệt", tags: ["Xu hướng"] },
  { id: 3, title: "Báo cáo rủi ro doanh nghiệp Q1", desc: "Đánh giá rủi ro 1,284 doanh nghiệp, xác định 6 DN cần xử lý ngay", author: "Lê Văn C", views: 67, status: "Ban hành", tags: ["Rủi ro", "Địa bàn"] },
  { id: 4, title: "Hiệu suất truy xuất nguồn gốc", desc: "Phân tích tỷ lệ tuân thủ tem nhãn toàn quốc, so sánh YoY", author: "Phạm Thị D", views: 9, status: "Bản nháp", tags: ["Chuyên đề"] },
  { id: 5, title: "Tổng kết năm 2025", desc: "Báo cáo toàn diện 12 tháng hoạt động hệ thống NDATrace", author: "Nguyễn Thị E", views: 124, status: "Ban hành", tags: ["Tổng kết", "2025"] },
  { id: 6, title: "Phân tích lô hàng tạm giữ EU", desc: "Chi tiết 3 lô thủy sản bị tạm giữ tháng 2/2026, nguyên nhân và khắc phục", author: "Trần Văn F", views: 31, status: "Đã duyệt", tags: ["EU", "Tạm giữ"] },
];

const statusStyle: Record<string, string> = {
  "Đã duyệt": "bg-green-50 text-green-700 border-green-200",
  "Chờ duyệt": "bg-amber-50 text-amber-700 border-amber-200",
  "Ban hành": "bg-blue-50 text-blue-700 border-blue-200",
  "Bản nháp": "bg-gray-50 text-gray-600 border-gray-200",
};
const statusIcon: Record<string, string> = {
  "Đã duyệt": "✅", "Chờ duyệt": "⏳", "Ban hành": "🔖", "Bản nháp": "📝",
};
const ALL_TAGS = ["Phân tích", "Tổng kết", "Xu hướng", "Địa bàn", "Chuyên đề", "Rủi ro", "Q1", "EU"];

// ── Chart type tabs ───────────────────────────────────────────────────────────
type ChartType = "bar" | "line" | "donut" | "hbar";
const CHART_TABS: { key: ChartType; icon: React.ReactNode; label: string }[] = [
  { key: "bar", icon: <BarChart2 size={13} />, label: "Cột" },
  { key: "line", icon: <TrendingUp size={13} />, label: "Đường" },
  { key: "donut", icon: <PieIcon size={13} />, label: "Vòng" },
  { key: "hbar", icon: <AlignLeft size={13} />, label: "Ngang" },
];

// ── Advanced Modal ────────────────────────────────────────────────────────────
function AdvancedModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-03-31");
  const [selectedSources, setSelectedSources] = useState(["Truy xuất nguồn gốc", "Tem nhãn", "Chứng chỉ"]);
  const [compareMode, setCompareMode] = useState(false);
  const [compareWith, setCompareWith] = useState("Q4/2025");
  const [chartAuto, setChartAuto] = useState(true);
  const [selectedCharts, setSelectedCharts] = useState(["Cột", "Đường"]);
  const [lang, setLang] = useState("vi");
  const [depth, setDepth] = useState("standard");

  const sources = ["Truy xuất nguồn gốc", "Tem nhãn", "Chứng chỉ", "Chất lượng nguyên liệu", "Quy trình sản xuất"];
  const chartTypes = ["Cột", "Đường", "Tròn", "Ngang", "Nhiệt độ"];

  const toggleSource = (s: string) =>
    setSelectedSources((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleChart = (c: string) =>
    setSelectedCharts((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-[960px] max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <LayoutGrid size={15} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-[15px]">Cài đặt nâng cao</h3>
              <p className="text-[12px] text-gray-400">Tuỳ chỉnh phạm vi, nguồn dữ liệu và hiển thị kết quả</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X size={16} /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">

            {/* Column 1: Time & Comparison */}
            <div className="space-y-5">
              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Phạm vi thời gian</p>
                <div className="space-y-2.5">
                  <div>
                    <label className="text-[12px] text-gray-500 mb-1 block">Từ ngày</label>
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[13px] text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-500 mb-1 block">Đến ngày</label>
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[13px] text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {["Q1/2026", "Q4/2025", "6 tháng", "1 năm"].map((p) => (
                      <button key={p} onClick={() => {}} className="text-[12px] px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{p}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">So sánh kỳ</p>
                <label className="flex items-center gap-2.5 cursor-pointer mb-3">
                  <div onClick={() => setCompareMode((v) => !v)} className={`w-9 h-5 rounded-full transition-colors relative ${compareMode ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                    <div className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${compareMode ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-[13px] text-gray-700 dark:text-gray-300">Bật so sánh</span>
                </label>
                {compareMode && (
                  <select value={compareWith} onChange={(e) => setCompareWith(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[13px] text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors">
                    {["Q4/2025", "Q3/2025", "Q1/2025", "Q1/2024"].map((q) => <option key={q}>{q}</option>)}
                  </select>
                )}
              </div>
            </div>

            {/* Column 2: Data sources */}
            <div className="space-y-5">
              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Nguồn dữ liệu</p>
                <div className="space-y-2">
                  {sources.map((s) => (
                    <label key={s} onClick={() => toggleSource(s)} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className={`size-4 rounded-md border-2 flex items-center justify-center transition-all ${selectedSources.includes(s) ? "bg-brand-500 border-brand-500" : "border-gray-300 dark:border-gray-600 group-hover:border-brand-300"}`}>
                        {selectedSources.includes(s) && <CheckCircle2 size={10} className="text-white" />}
                      </div>
                      <span className="text-[13px] text-gray-700 dark:text-gray-300">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Độ chi tiết phân tích</p>
                <div className="space-y-1.5">
                  {[
                    { key: "summary", label: "Tóm tắt", desc: "Kết quả ngắn gọn, tổng quan" },
                    { key: "standard", label: "Tiêu chuẩn", desc: "Phân tích đầy đủ với biểu đồ" },
                    { key: "deep", label: "Chuyên sâu", desc: "Bao gồm dự báo và khuyến nghị" },
                  ].map((d) => (
                    <label key={d.key} onClick={() => setDepth(d.key)} className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${depth === d.key ? "border-brand-300 bg-brand-50 dark:bg-brand-900/10 dark:border-brand-700" : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"}`}>
                      <div className={`mt-0.5 size-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${depth === d.key ? "border-brand-500" : "border-gray-300 dark:border-gray-600"}`}>
                        {depth === d.key && <div className="size-1.5 rounded-full bg-brand-500" />}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-gray-700 dark:text-gray-200">{d.label}</p>
                        <p className="text-[11px] text-gray-400">{d.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Output & Display */}
            <div className="space-y-5">
              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Biểu đồ hiển thị</p>
                <label className="flex items-center gap-2.5 cursor-pointer mb-3">
                  <div onClick={() => setChartAuto((v) => !v)} className={`w-9 h-5 rounded-full transition-colors relative ${chartAuto ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                    <div className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${chartAuto ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-[13px] text-gray-700 dark:text-gray-300">Tự động chọn biểu đồ</span>
                </label>
                {!chartAuto && (
                  <div className="flex flex-wrap gap-1.5">
                    {chartTypes.map((c) => (
                      <button key={c} onClick={() => toggleChart(c)} className={`text-[12px] px-2.5 py-1 rounded-lg border transition-all ${selectedCharts.includes(c) ? "bg-brand-50 dark:bg-brand-900/20 border-brand-300 dark:border-brand-700 text-brand-600 dark:text-brand-400" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300"}`}>{c}</button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Ngôn ngữ phản hồi</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[{ key: "vi", label: "🇻🇳 Tiếng Việt" }, { key: "en", label: "🇺🇸 English" }].map((l) => (
                    <button key={l.key} onClick={() => setLang(l.key)} className={`py-2 rounded-xl border text-[13px] font-medium transition-all ${lang === l.key ? "bg-brand-600 text-white border-brand-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>{l.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Xuất kết quả</p>
                <div className="space-y-1.5">
                  {[
                    { icon: FileText, label: "Xuất PDF", desc: "Báo cáo đầy đủ" },
                    { icon: Download, label: "Xuất Excel", desc: "Dữ liệu thô & biểu đồ" },
                    { icon: Share2, label: "Chia sẻ link", desc: "Liên kết xem trực tiếp" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <button key={label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
                      <div className="size-7 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 flex items-center justify-center transition-colors">
                        <Icon size={13} className="text-gray-500 group-hover:text-brand-500 transition-colors" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-medium text-gray-700 dark:text-gray-200">{label}</p>
                        <p className="text-[11px] text-gray-400">{desc}</p>
                      </div>
                      <ExternalLink size={11} className="ml-auto text-gray-300 group-hover:text-brand-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <p className="text-[12px] text-gray-400">Cài đặt sẽ áp dụng cho câu hỏi tiếp theo</p>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[14px] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Huỷ</button>
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-[14px] font-semibold text-white transition-colors">Áp dụng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-[15px]">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={16} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ── View Report Modal ─────────────────────────────────────────────────────────
function ViewReportModal({ report, onClose }: { report: SavedReport; onClose: () => void }) {
  return (
    <Modal title="Xem báo cáo" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <p className="text-[12px] text-gray-400 mb-1">Tiêu đề</p>
          <p className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">{report.title}</p>
        </div>
        <div>
          <p className="text-[12px] text-gray-400 mb-1">Mô tả</p>
          <p className="text-[14px] text-gray-600 dark:text-gray-300">{report.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[12px] text-gray-400 mb-1">Tác giả</p>
            <p className="text-[14px] text-gray-700 dark:text-gray-200">{report.author}</p>
          </div>
          <div>
            <p className="text-[12px] text-gray-400 mb-1">Lượt xem</p>
            <p className="text-[14px] text-gray-700 dark:text-gray-200">{report.views}</p>
          </div>
        </div>
        <div>
          <p className="text-[12px] text-gray-400 mb-1">Trạng thái</p>
          <span className={`text-[12px] px-2 py-0.5 rounded-md border font-medium ${statusStyle[report.status]}`}>{statusIcon[report.status]} {report.status}</span>
        </div>
        <div>
          <p className="text-[12px] text-gray-400 mb-1.5">Thẻ</p>
          <div className="flex flex-wrap gap-1.5">
            {report.tags.map((t) => <span key={t} className="text-[12px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">{t}</span>)}
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[14px] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Đóng</button>
          <button className="flex-1 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-[14px] font-semibold transition-colors flex items-center justify-center gap-2">
            <ExternalLink size={14} /> Mở đầy đủ
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── Save Report Modal ─────────────────────────────────────────────────────────
function SaveReportModal({ onClose, onSave }: { onClose: () => void; onSave: (r: SavedReport) => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Phân tích"]);
  const [status, setStatus] = useState("Bản nháp");

  const toggleTag = (t: string) => setSelectedTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ id: Date.now(), title, desc, author: "Người dùng", views: 0, status, tags: selectedTags });
    onClose();
  };

  return (
    <Modal title="Lưu báo cáo" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200 mb-1 block">Tên báo cáo *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên báo cáo..." className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[14px] text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors" />
        </div>
        <div>
          <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200 mb-1 block">Mô tả</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Mô tả nội dung báo cáo..." rows={3} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[14px] text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors resize-none" />
        </div>
        <div>
          <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200 mb-1.5 block">Thẻ</label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_TAGS.map((t) => (
              <button key={t} onClick={() => toggleTag(t)} className={`text-[12px] px-2.5 py-1 rounded-lg border transition-all ${selectedTags.includes(t) ? "bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/20 dark:text-brand-300 dark:border-brand-700" : "bg-gray-50 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200 mb-1.5 block">Trạng thái</label>
          <div className="flex gap-2">
            {["Bản nháp", "Chờ duyệt"].map((s) => (
              <button key={s} onClick={() => setStatus(s)} className={`flex-1 py-2 rounded-xl border text-[13px] font-medium transition-all ${status === s ? "bg-brand-600 text-white border-brand-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>{s === "Bản nháp" ? "📝 Lưu nháp" : "⏳ Gửi duyệt"}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[14px] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Huỷ</button>
          <button onClick={handleSave} disabled={!title.trim()} className="flex-1 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-[14px] font-semibold transition-colors">Lưu báo cáo</button>
        </div>
      </div>
    </Modal>
  );
}

// ── AI Notice ─────────────────────────────────────────────────────────────────
function AINotice() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="flex items-start gap-2 mt-3 px-3 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
      <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
      <p className="text-[12px] text-blue-700 dark:text-blue-300 flex-1 leading-relaxed">
        Kết quả do AI tổng hợp từ dữ liệu hệ thống NDATrace. Số liệu mang tính tham khảo — vui lòng xác minh với dữ liệu gốc trước khi ban hành báo cáo chính thức.
      </p>
      <button onClick={() => setDismissed(true)} className="text-blue-400 hover:text-blue-600 transition-colors shrink-0"><X size={12} /></button>
    </div>
  );
}

// ── ThinkingBlock ─────────────────────────────────────────────────────────────
function ThinkingBlock({ steps }: { steps: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 rounded-xl border border-violet-100 bg-violet-50/60 dark:bg-violet-900/10 dark:border-violet-800 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-2 px-3 py-2 text-left">
        <span className="size-2 rounded-full bg-violet-500 animate-pulse shrink-0" />
        <span className="text-[13px] font-medium text-violet-700 dark:text-violet-300 flex-1">AI đã phân tích <span className="font-normal text-violet-500">({steps.length} bước)</span></span>
        {open ? <ChevronDown size={13} className="text-violet-400" /> : <ChevronRight size={13} className="text-violet-400" />}
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-1.5">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={13} className="text-violet-400 mt-0.5 shrink-0" />
              <p className="text-[13px] text-violet-600 dark:text-violet-300">{s}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── KPI Mini Row ──────────────────────────────────────────────────────────────
function KpiRow({ kpis }: { kpis: { label: string; value: string; change: string; up: boolean | null }[] }) {
  return (
    <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden mb-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="px-3 py-2.5 bg-white dark:bg-gray-900">
          <p className="text-[11px] text-gray-400 mb-0.5">{kpi.label}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">{kpi.value}</p>
          {kpi.up !== null
            ? <p className={`text-[11px] mt-0.5 font-medium ${kpi.up ? "text-green-600" : "text-red-500"}`}>{kpi.up ? "↑" : "↓"} {kpi.change}</p>
            : <p className="text-[11px] mt-0.5 text-gray-400">{kpi.change}</p>}
        </div>
      ))}
    </div>
  );
}

// ── Ant Design Charts ─────────────────────────────────────────────────────────
function ChartArea({ chartType }: { chartType: ChartType }) {
  const commonConfig = { height: 220, autoFit: true };
  const tooltipStyle = { domStyles: { "g2-tooltip": { borderRadius: "12px", fontSize: "12px" } } };

  if (chartType === "bar") {
    return (
      <Column
        {...commonConfig}
        data={columnData}
        xField="month"
        yField="value"
        seriesField="type"
        isStack
        color={COLORS}
        legend={{ position: "top-right" as const, itemName: { style: { fontSize: 11 } } }}
        xAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 11 } } }}
        yAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 11 } } }}
        tooltip={tooltipStyle}
        columnStyle={{ radius: [0, 0, 0, 0] }}
      />
    );
  }
  if (chartType === "line") {
    return (
      <Line
        {...commonConfig}
        data={lineData}
        xField="month"
        yField="value"
        color="#1570EF"
        smooth
        lineStyle={{ lineWidth: 2.5 }}
        point={{ size: 4, shape: "circle", style: { fill: "#fff", stroke: "#1570EF", lineWidth: 2 } }}
        xAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 11 } } }}
        yAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 11 } } }}
        tooltip={tooltipStyle}
        area={{ style: { fill: "l(270) 0:#ffffff 0.5:#e8f3ff 1:#1570ef", fillOpacity: 0.4 } }}
      />
    );
  }
  if (chartType === "donut") {
    return (
      <Pie
        {...commonConfig}
        data={pieData}
        angleField="value"
        colorField="type"
        radius={0.85}
        innerRadius={0.6}
        scale={{ color: { range: COLORS } }}
        label={{
          text: (datum: { value: number }) => `${((datum.value / pieTotal) * 100).toFixed(1)}%`,
          position: "inside",
          style: { fill: "#fff", fontSize: 11, fontWeight: 600 },
        }}
        legend={{ position: "right" as const }}
        tooltip={tooltipStyle}
      />
    );
  }
  // hbar
  return (
    <Bar
      {...commonConfig}
      data={barData}
      xField="value"
      yField="company"
      colorField="company"
      scale={{ color: { range: COLORS } }}
      barStyle={{ radius: [0, 4, 4, 0] }}
      label={{ position: "right" as const, style: { fill: "#6b7280", fontSize: 11 } }}
      xAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 11 } } }}
      yAxis={{ line: null, tickLine: null, label: { style: { fill: "#6b7280", fontSize: 11 } } }}
      tooltip={tooltipStyle}
    />
  );
}

// ── Mini Horizontal Bar Chart (Top 5) ─────────────────────────────────────────
function MiniBarChart() {
  return (
    <Bar
      height={150}
      autoFit
      data={barData}
      xField="value"
      yField="company"
      colorField="company"
      scale={{ color: { range: COLORS } }}
      barStyle={{ radius: [0, 4, 4, 0] }}
      xAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 10 } } }}
      yAxis={{ line: null, tickLine: null, label: { style: { fill: "#6b7280", fontSize: 10 } } }}
      tooltip={{ domStyles: { "g2-tooltip": { borderRadius: "12px", fontSize: "12px" } } }}
    />
  );
}

// ── Expand Charts Modal ───────────────────────────────────────────────────────
function FilterDropdown({
  label, options, selected, onChange,
}: { label: string; options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const allSelected = selected.length === options.length;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function toggle(item: string) {
    onChange(selected.includes(item) ? selected.filter((x) => x !== item) : [...selected, item]);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-[13px] transition-colors ${
          open ? "border-brand-400 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      >
        <span className="truncate">
          {allSelected ? `Tất cả (${options.length})` : selected.length === 0 ? "Chưa chọn" : `${selected.length} đã chọn`}
        </span>
        <ChevronDown size={13} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg z-20 overflow-hidden">
          <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-50 dark:border-gray-800">
            <input type="checkbox" checked={allSelected} onChange={() => onChange(allSelected ? [] : [...options])} className="accent-brand-600 w-3.5 h-3.5" />
            <span className="text-[13px] font-semibold text-gray-600 dark:text-gray-300">Tất cả</span>
          </label>
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="accent-brand-600 w-3.5 h-3.5" />
              <span className="text-[13px] text-gray-700 dark:text-gray-300 truncate">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function ExpandChartsModal({ onClose }: { onClose: () => void }) {
  const ALL_MONTHS = ["T1", "T2", "T3"];
  const ALL_TYPES = ["Truy xuất nguồn gốc", "Tem nhãn", "Chứng chỉ", "Chất lượng", "Quy trình"];
  const ALL_COMPANIES = ["Vinafood Corp", "SeaFood Mekong", "GreenFarm VN", "LogiPro Việt Nam", "PharmaViet"];

  const [selMonths, setSelMonths] = useState<string[]>([...ALL_MONTHS]);
  const [selTypes, setSelTypes] = useState<string[]>([...ALL_TYPES]);
  const [selCompanies, setSelCompanies] = useState<string[]>([...ALL_COMPANIES]);
  const [activeChart, setActiveChart] = useState<"column" | "line" | "pie" | "bar">("column");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const fColumnData = columnData.filter((d) => selMonths.includes(d.month) && selTypes.includes(d.type));
  const fLineData = lineData.filter((d) => selMonths.includes(d.month));
  const fPieData = pieData.filter((d) => selTypes.includes(d.type));
  const fBarData = barData.filter((d) => selCompanies.includes(d.company));
  const fPieTotal = fPieData.reduce((s, d) => s + d.value, 0);
  const fTotal = fColumnData.reduce((s, d) => s + d.value, 0);

  const tooltipStyle = { domStyles: { "g2-tooltip": { borderRadius: "12px", fontSize: "12px" } } };

  const chartTabs = [
    { key: "column", label: "Theo tháng", icon: BarChart2 },
    { key: "line",   label: "Xu hướng",   icon: TrendingUp },
    { key: "pie",    label: "Tỷ lệ",      icon: PieIcon },
    { key: "bar",    label: "Doanh nghiệp", icon: AlignLeft },
  ] as const;

  const emptyState = <div className="flex-1 flex items-center justify-center text-[13px] text-gray-400">Không có dữ liệu</div>;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-[1040px] max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <Sparkles size={15} className="text-violet-500" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-[15px]">Mở rộng biểu đồ — Vi phạm chuỗi cung ứng Q1/2026</h3>
              <p className="text-[12px] text-gray-400">2,661 sự kiện · Cập nhật 20/03/2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={16} /></button>
        </div>

        {/* Body: left filter + right chart */}
        <div className="flex flex-1 min-h-0">

          {/* ── Left: Filters ── */}
          <div className="w-[240px] shrink-0 border-r border-gray-100 dark:border-gray-800 flex flex-col overflow-y-auto">
            <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Bộ lọc</span>
              <button
                onClick={() => { setSelMonths([...ALL_MONTHS]); setSelTypes([...ALL_TYPES]); setSelCompanies([...ALL_COMPANIES]); }}
                className="text-[12px] text-brand-500 hover:text-brand-700 transition-colors"
              >
                Đặt lại
              </button>
            </div>

            <div className="px-4 py-4 space-y-5 flex-1">
              {/* Month */}
              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Tháng</p>
                <FilterDropdown label="Tháng" options={ALL_MONTHS} selected={selMonths} onChange={setSelMonths} />
              </div>
              {/* Violation type */}
              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Nhóm vi phạm</p>
                <FilterDropdown label="Nhóm vi phạm" options={ALL_TYPES} selected={selTypes} onChange={setSelTypes} />
              </div>
              {/* Company */}
              <div>
                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Doanh nghiệp</p>
                <FilterDropdown label="Doanh nghiệp" options={ALL_COMPANIES} selected={selCompanies} onChange={setSelCompanies} />
              </div>

              {/* Summary */}
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Tổng vi phạm</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{fTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Tỷ lệ xử lý</span>
                  <span className="font-semibold text-green-600">87.4%</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Doanh nghiệp</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{selCompanies.length}/{ALL_COMPANIES.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Chart ── */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chart tabs */}
            <div className="flex items-center gap-1 px-5 py-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
              {chartTabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveChart(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                    activeChart === key
                      ? "bg-brand-600 text-white"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex-1 p-6 flex flex-col min-h-0">
              {activeChart === "column" && (
                fColumnData.length > 0 ? (
                  <Column
                    autoFit
                    data={fColumnData} xField="month" yField="value" seriesField="type"
                    isStack color={COLORS}
                    legend={{ position: "top-right" as const }}
                    xAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 12 } } }}
                    yAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 12 } } }}
                    tooltip={tooltipStyle}
                  />
                ) : emptyState
              )}
              {activeChart === "line" && (
                fLineData.length > 0 ? (
                  <Line
                    autoFit
                    data={fLineData} xField="month" yField="value"
                    color="#1570EF" smooth lineStyle={{ lineWidth: 2.5 }}
                    point={{ size: 5, shape: "circle", style: { fill: "#fff", stroke: "#1570EF", lineWidth: 2 } }}
                    xAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 12 } } }}
                    yAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 12 } } }}
                    tooltip={tooltipStyle}
                    area={{ style: { fill: "l(270) 0:#ffffff 0.5:#e8f3ff 1:#1570ef", fillOpacity: 0.4 } }}
                  />
                ) : emptyState
              )}
              {activeChart === "pie" && (
                fPieData.length > 0 ? (
                  <Pie
                    autoFit
                    data={fPieData} angleField="value" colorField="type"
                    radius={0.85} innerRadius={0.6}
                    scale={{ color: { range: COLORS } }}
                    label={{
                      text: (datum: { value: number }) => `${((datum.value / fPieTotal) * 100).toFixed(1)}%`,
                      position: "inside",
                      style: { fill: "#fff", fontSize: 12, fontWeight: 600 },
                    }}
                    legend={{ position: "right" as const }}
                    tooltip={tooltipStyle}
                  />
                ) : emptyState
              )}
              {activeChart === "bar" && (
                fBarData.length > 0 ? (
                  <Bar
                    autoFit
                    data={fBarData} xField="value" yField="company"
                    color="#1570EF" barStyle={{ radius: [0, 4, 4, 0] }}
                    label={{ position: "right" as const, style: { fill: "#6b7280", fontSize: 12 } }}
                    xAxis={{ line: null, tickLine: null, label: { style: { fill: "#9ca3af", fontSize: 12 } } }}
                    yAxis={{ line: null, tickLine: null, label: { style: { fill: "#6b7280", fontSize: 12 } } }}
                    tooltip={tooltipStyle}
                  />
                ) : emptyState
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <p className="text-[12px] text-gray-400">NDATrace DB · Dữ liệu Q1/2026</p>
          <div className="flex items-center gap-2">
            <button onClick={() => {}} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download size={13} /> Xuất PDF
            </button>
            <button onClick={onClose} className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-[13px] font-semibold text-white transition-colors">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Result Card ───────────────────────────────────────────────────────────────
function ResultCard({ showToast, onSaveReport }: { showToast: (m: string) => void; onSaveReport: () => void }) {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [showTable, setShowTable] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showExpandCharts, setShowExpandCharts] = useState(false);

  return (
    <div className="rounded-2xl border border-[#e5e7eb] dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden text-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-violet-500" />
          <span className="font-semibold text-gray-800 dark:text-gray-100 text-[14px]">Kết quả phân tích — Vi phạm chuỗi cung ứng Q1/2026</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowExpandCharts(true)} className="flex items-center gap-1.5 text-[13px] text-brand-600 font-medium px-3 py-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"><LayoutGrid size={13} /> Mở rộng</button>
          <button onClick={onSaveReport} className="text-[13px] text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Lưu báo cáo</button>
          <button onClick={() => setCollapsed((v) => !v)} className="text-gray-400 hover:text-gray-600 transition-colors">
            {collapsed ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>
      {!collapsed && (
        <>
          <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800">
            {[{ label: "Tổng vi phạm", value: "2,661", change: "+15.2%", up: true }, { label: "Tỷ lệ xử lý", value: "87.4%", change: "+2.8%", up: true }, { label: "Doanh nghiệp", value: "1,284", change: "Toàn bộ", up: null }].map((kpi) => (
              <div key={kpi.label} className="px-4 py-3">
                <p className="text-[12px] text-gray-400 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{kpi.value}</p>
                {kpi.up !== null ? <p className={`text-[12px] mt-1 font-medium ${kpi.up ? "text-green-600" : "text-red-500"}`}>{kpi.up ? "↑" : "↓"} {kpi.change}</p> : <p className="text-[12px] mt-1 text-gray-400">{kpi.change}</p>}
              </div>
            ))}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1 mb-4">
              {CHART_TABS.map((t) => (
                <button key={t.key} onClick={() => setChartType(t.key)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${chartType === t.key ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            <ChartArea chartType={chartType} />
          </div>
          <div className="px-4 pb-2">
            <button onClick={() => setShowTable((v) => !v)} className="flex items-center gap-1.5 text-[13px] text-brand-600 hover:text-brand-700 font-medium transition-colors">
              {showTable ? <ChevronDown size={13} /> : <ChevronRight size={13} />} Xem bảng số liệu
            </button>
            {showTable && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 uppercase text-[11px] tracking-wide">
                      <th className="text-left px-4 py-2.5 font-semibold">Nhóm vi phạm</th>
                      <th className="text-right px-4 py-2.5 font-semibold">T1</th>
                      <th className="text-right px-4 py-2.5 font-semibold">T2</th>
                      <th className="text-right px-4 py-2.5 font-semibold">T3</th>
                      <th className="text-right px-4 py-2.5 font-semibold">Tổng</th>
                      <th className="text-center px-4 py-2.5 font-semibold">Mức độ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {violationRows.map((r, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-100 dark:border-gray-800 transition-colors"
                        style={{ borderLeft: `4px solid ${r.color}`, backgroundColor: r.color + "0d" }}
                      >
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold text-white"
                              style={{ background: r.color }}
                            >
                              G{i + 1}
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-100">{r.loai}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-gray-700 dark:text-gray-200">{r.t1}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-gray-700 dark:text-gray-200">{r.t2}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-gray-700 dark:text-gray-200">{r.t3}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className="font-bold" style={{ color: r.color }}>{r.tong}</span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${r.muc === "Cao" ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" : r.muc === "Trung bình" ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800" : "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"}`}>
                            {r.muc === "Cao" ? "⛔" : r.muc === "Trung bình" ? "⚠️" : "✅"} {r.muc}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Legend */}
                <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex flex-wrap gap-x-4 gap-y-1">
                  {violationRows.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full shrink-0" style={{ background: r.color }} />
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">G{i + 1} — {r.loai}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mx-4 my-3 rounded-xl bg-gray-50 dark:bg-gray-800 px-3 py-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full w-full" />
            </div>
            <span className="text-[12px] text-gray-500 whitespace-nowrap">100% đầy đủ · NDATrace DB · Cập nhật 20/03/2026</span>
          </div>
          <div className="px-4 pb-4">
            <p className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 mb-3">Top 5 doanh nghiệp vi phạm nhiều nhất</p>
            <div className="grid grid-cols-2 gap-4">
              <MiniBarChart />
              <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/60">
                      <th className="text-left px-3 py-2 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">#  Doanh nghiệp</th>
                      <th className="text-right px-3 py-2 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">Vi phạm</th>
                      <th className="text-right px-3 py-2 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">Xử lý</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topDoanhNghiep.map((r, i) => {
                      const rankColors = ["#EF4444","#F59E0B","#1570EF","#10B981","#8B5CF6"];
                      return (
                      <tr key={i} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="size-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: rankColors[i] }}>{i + 1}</span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 truncate">{r.ten}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right font-bold text-gray-900 dark:text-white">{r.vi_pham}</td>
                        <td className="px-3 py-2 text-right font-semibold text-green-600 dark:text-green-400">{r.xu_ly}</td>
                      </tr>);
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <p className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
              <Sparkles size={13} className="text-violet-500" /> Nhận định AI
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiInsights.map((ins) => {
                const colorMap: Record<string, { bg: string; border: string; icon: string; iconBg: string }> = {
                  blue:   { bg: "bg-blue-50 dark:bg-blue-900/10",   border: "border-blue-100 dark:border-blue-800",   icon: "text-blue-600 dark:text-blue-400",   iconBg: "bg-blue-100 dark:bg-blue-900/30" },
                  orange: { bg: "bg-amber-50 dark:bg-amber-900/10", border: "border-amber-100 dark:border-amber-800", icon: "text-amber-600 dark:text-amber-400", iconBg: "bg-amber-100 dark:bg-amber-900/30" },
                  green:  { bg: "bg-green-50 dark:bg-green-900/10", border: "border-green-100 dark:border-green-800", icon: "text-green-600 dark:text-green-400", iconBg: "bg-green-100 dark:bg-green-900/30" },
                  red:    { bg: "bg-red-50 dark:bg-red-900/10",     border: "border-red-100 dark:border-red-800",     icon: "text-red-600 dark:text-red-400",     iconBg: "bg-red-100 dark:bg-red-900/30" },
                };
                const c = colorMap[ins.color];
                const IconComp = ins.icon === "finding" ? Lightbulb : ins.icon === "risk" ? AlertTriangle : ins.icon === "recommendation" ? ShieldCheck : GitCompareArrows;
                return (
                  <div key={ins.type} className={`rounded-xl border p-3 ${c.bg} ${c.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`size-6 rounded-lg flex items-center justify-center ${c.iconBg}`}><IconComp size={12} className={c.icon} /></div>
                      <span className={`text-[13px] font-semibold ${c.icon}`}>{ins.title}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {ins.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className={`mt-1.5 size-1 rounded-full shrink-0 ${c.icon.replace("text-", "bg-")}`} />
                          <p className="text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed">{p}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <AINotice />
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-800">
            <button onClick={() => showToast("Đã sao chép!")} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Copy size={13} /> Sao chép</button>
            <button onClick={onSaveReport} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><BookmarkPlus size={13} /> Lưu</button>
            <button onClick={() => showToast("Đã sao chép liên kết!")} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Share2 size={13} /> Chia sẻ</button>
            <button onClick={() => showToast("Đang xuất PDF...")} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ml-auto"><Download size={13} /> Xuất PDF</button>
          </div>
        </>
      )}
      {showExpandCharts && <ExpandChartsModal onClose={() => setShowExpandCharts(false)} />}
    </div>
  );
}

// ── Simple AI message (for demo answers) ─────────────────────────────────────
function SimpleAIMessage({ answer, time, onSaveReport }: { answer: typeof demoAnswers[string]; time: string; onSaveReport: () => void }) {
  const html = answer.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return (
    <div className="flex flex-col gap-2 max-w-3xl">
      <div className="flex items-center gap-2 mb-1">
        <div className="size-7 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center"><BrainCircuit size={14} className="text-violet-600 dark:text-violet-400" /></div>
        <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">NDATrace AI</span>
        <span className="text-[11px] text-gray-400">{time}</span>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-[#e5e7eb] dark:border-gray-800 rounded-2xl p-4">
        <ThinkingBlock steps={answer.thinking} />
        {answer.kpis && <KpiRow kpis={answer.kpis} />}
        <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
        <AINotice />
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#e5e7eb] dark:border-gray-800">
          <button className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><Copy size={12} /> Sao chép</button>
          <button onClick={onSaveReport} className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><BookmarkPlus size={12} /> Lưu</button>
        </div>
      </div>
    </div>
  );
}

// ── Combined Side Panel (History + Saved) ─────────────────────────────────────
function SidePanel({
  activeId, onSelect, onNew,
  reports, onNewReport, onView, onDelete, forceTab,
}: {
  activeId: number; onSelect: (id: number) => void; onNew: () => void;
  reports: SavedReport[]; onNewReport: () => void; onView: (r: SavedReport) => void; onDelete: (id: number) => void;
  forceTab?: "history" | "saved";
}) {
  const [tab, setTab] = useState<"history" | "saved">("history");
  useEffect(() => { if (forceTab) setTab(forceTab); }, [forceTab]);
  return (
    <div className="flex flex-col h-full">
      {/* Tab header */}
      <div className="px-3 pt-3 pb-0 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex gap-1">
          {([
            { key: "history", label: "Lịch sử" },
            { key: "saved",   label: "Đã lưu" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 text-[13px] font-medium pb-2.5 border-b-2 transition-all ${
                tab === t.key
                  ? "text-brand-600 dark:text-brand-400 border-brand-500"
                  : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === "history" ? (
        <HistoryPanel activeId={activeId} onSelect={onSelect} onNew={onNew} />
      ) : (
        <SavedPanel reports={reports} onNew={onNewReport} onView={onView} onDelete={onDelete} />
      )}
    </div>
  );
}

// ── History panel ─────────────────────────────────────────────────────────────
function HistoryPanel({ activeId, onSelect, onNew }: { activeId: number; onSelect: (id: number) => void; onNew: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = historyGroups.flatMap((g) => g.items);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.preview.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      )
    : null;

  function Highlight({ text }: { text: string }) {
    if (!q) return <>{text}</>;
    const i = text.toLowerCase().indexOf(q);
    if (i === -1) return <>{text}</>;
    return (
      <>
        {text.slice(0, i)}
        <mark className="bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 rounded px-0.5 not-italic font-semibold">
          {text.slice(i, i + q.length)}
        </mark>
        {text.slice(i + q.length)}
      </>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-2 pt-2 pb-1 shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus-within:border-brand-400 focus-within:bg-white dark:focus-within:bg-gray-900 transition-all">
          <Search size={12} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm lịch sử..."
            className="flex-1 bg-transparent text-[13px] text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none min-w-0"
          />
          {query && (
            <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1.5">
        {/* Search results */}
        {filtered !== null && (
          filtered.length > 0 ? (
            <>
              <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {filtered.length} kết quả
              </p>
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onSelect(item.id); setQuery(""); }}
                  className={`w-full text-left px-2.5 py-2.5 rounded-xl border transition-all ${activeId === item.id ? "bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700" : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                >
                  <p className={`text-[13px] font-medium leading-snug line-clamp-2 ${activeId === item.id ? "text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300"}`}>
                    <Highlight text={item.title} />
                  </p>
                  <p className="text-[12px] text-gray-400 mt-0.5 line-clamp-1">
                    <Highlight text={item.preview} />
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Clock size={10} className="text-gray-400 shrink-0" />
                    <span className="text-[11px] text-gray-400">{item.time}</span>
                    <MessageSquare size={10} className="text-gray-400 ml-auto shrink-0" />
                    <span className="text-[11px] text-gray-400">{item.msgs}</span>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center py-8 text-center">
              <Search size={20} className="text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Không tìm thấy</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Thử từ khóa khác</p>
            </div>
          )
        )}

        {/* Default grouped list */}
        {filtered === null && historyGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{group.label}</p>
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`w-full text-left px-2.5 py-2.5 rounded-xl border transition-all group ${activeId === item.id ? "bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700" : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                >
                  <p className={`text-[13px] font-medium leading-snug line-clamp-2 ${activeId === item.id ? "text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300"}`}>{item.title}</p>
                  <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1">{item.preview}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Clock size={10} className="text-gray-400 shrink-0" />
                    <span className="text-[11px] text-gray-400">{item.time}</span>
                    <MessageSquare size={10} className="text-gray-400 ml-auto shrink-0" />
                    <span className="text-[11px] text-gray-400">{item.msgs}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Saved panel ───────────────────────────────────────────────────────────────
function SavedPanel({ reports, onNew, onView, onDelete }: { reports: SavedReport[]; onNew: () => void; onView: (r: SavedReport) => void; onDelete: (id: number) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? reports.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.author.toLowerCase().includes(q)
      )
    : reports;

  function Highlight({ text }: { text: string }) {
    if (!q) return <>{text}</>;
    const i = text.toLowerCase().indexOf(q);
    if (i === -1) return <>{text}</>;
    return (
      <>
        {text.slice(0, i)}
        <mark className="bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 rounded px-0.5 not-italic font-semibold">
          {text.slice(i, i + q.length)}
        </mark>
        {text.slice(i + q.length)}
      </>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-2 pt-2 pb-1 shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus-within:border-brand-400 focus-within:bg-white dark:focus-within:bg-gray-900 transition-all">
          <Search size={12} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm báo cáo..."
            className="flex-1 bg-transparent text-[13px] text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none min-w-0"
          />
          {query && (
            <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      {q && (
        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 shrink-0">
          {filtered.length} kết quả
        </p>
      )}

      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2">
        {filtered.length > 0 ? filtered.map((r) => (
          <div key={r.id} onClick={() => onView(r)} className="group relative px-3 py-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-800 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 leading-snug flex-1">
                <Highlight text={r.title} />
              </p>
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity shrink-0" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => onView(r)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-500 transition-colors"><Eye size={11} /></button>
                <button onClick={() => onDelete(r.id)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={11} /></button>
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors"><MoreHorizontal size={11} /></button>
              </div>
            </div>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
              <Highlight text={r.desc} />
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] px-1.5 py-0.5 rounded-md border font-medium ${statusStyle[r.status]}`}>{statusIcon[r.status]} {r.status}</span>
              <span className="flex items-center gap-1 text-[11px] text-gray-400 ml-auto"><Eye size={10} /> {r.views}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {r.tags.map((t) => (
                <span key={t} className={`text-[11px] px-1.5 py-0.5 rounded-md ${t.toLowerCase().includes(q) && q ? "bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                  <Highlight text={t} />
                </span>
              ))}
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center py-8 text-center">
            <Search size={20} className="text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Không tìm thấy</p>
            <p className="text-[12px] text-gray-400 mt-0.5">Thử từ khóa khác</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Question suggestions ──────────────────────────────────────────────────────
const groupColorMap: Record<string, { tab: string; card: string; dot: string }> = {
  blue:   { tab: "bg-blue-50 text-blue-700 border-blue-200",   card: "hover:border-blue-200 hover:bg-blue-50/40",   dot: "bg-blue-400" },
  violet: { tab: "bg-violet-50 text-violet-700 border-violet-200", card: "hover:border-violet-200 hover:bg-violet-50/40", dot: "bg-violet-400" },
  red:    { tab: "bg-red-50 text-red-700 border-red-200",       card: "hover:border-red-200 hover:bg-red-50/40",     dot: "bg-red-400" },
  green:  { tab: "bg-green-50 text-green-700 border-green-200", card: "hover:border-green-200 hover:bg-green-50/40", dot: "bg-green-400" },
};

function QuestionSuggestions({ onSelect, activeGroup }: { onSelect: (q: string) => void; activeGroup: number }) {
  const group = questionGroups[activeGroup];
  const colors = groupColorMap[group.color];
  return (
    <div className="mb-3">
      <ul className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {group.questions.slice(0, 3).map((q, i) => (
          <li key={q} className={i < 2 ? "border-b border-gray-100 dark:border-gray-800" : ""}>
            <button onClick={() => onSelect(q)} className={`w-full text-left flex items-start gap-2 px-3 py-2.5 text-[13px] text-gray-600 dark:text-gray-400 transition-all ${colors.card}`}>
              <span className={`mt-1.5 size-1.5 rounded-full shrink-0 ${colors.dot}`} />
              <span className="line-clamp-2">{q}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Message types ─────────────────────────────────────────────────────────────
type Message =
  | { role: "user"; text: string; time: string }
  | { role: "ai"; answer: typeof demoAnswers[string]; time: string };

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ onSelect }: { onSelect: (q: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
      <div className="size-14 rounded-2xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-4">
        <BrainCircuit size={24} className="text-violet-500" />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-700 dark:text-gray-200 mb-1">Bắt đầu phân tích với AI</h3>
      <p className="text-[13px] text-gray-400 mb-6 max-w-xs">Đặt câu hỏi hoặc chọn gợi ý bên dưới để bắt đầu phân tích dữ liệu chuỗi cung ứng</p>
      <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
        {["Phân tích tổng hợp vi phạm chuỗi cung ứng Q1/2026 theo từng tháng", "Danh sách doanh nghiệp có điểm rủi ro cao cần ưu tiên xử lý tháng 4", "Xu hướng tăng trưởng xuất khẩu thủy sản sang EU trong Q1/2026"].map((q) => (
          <button key={q} onClick={() => onSelect(q)} className="text-left px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-700 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 text-[13px] text-gray-600 dark:text-gray-400 transition-all flex items-center gap-2">
            <Sparkles size={13} className="text-violet-400 shrink-0" />{q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BaoCaoAIPage() {
  const [activeHistoryId, setActiveHistoryId] = useState(1);
  const [chatTitle, setChatTitle] = useState("Phân tích vi phạm chuỗi cung ứng Q1/2026");
  const [isNewChat, setIsNewChat] = useState(false);
  const [input, setInput] = useState("");
  const [extraMessages, setExtraMessages] = useState<Message[]>([]);
  const [toast, setToast] = useState("");
  const [savedReports, setSavedReports] = useState<SavedReport[]>(initialSavedReports);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [viewReport, setViewReport] = useState<SavedReport | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [activeGroup, setActiveGroup] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [mobilePanelTab, setMobilePanelTab] = useState<"history" | "saved">("history");
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const handleNewChat = () => {
    setIsNewChat(true);
    setExtraMessages([]);
    setActiveHistoryId(-1);
    setChatTitle("Cuộc hội thoại mới");
  };

  const handleSelectHistory = (id: number) => {
    setActiveHistoryId(id);
    setIsNewChat(false);
    setExtraMessages([]);
    const allItems = historyGroups.flatMap((g) => g.items);
    const item = allItems.find((i) => i.id === id);
    if (item) setChatTitle(item.title);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    if (isNewChat) setIsNewChat(false);
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} · 20/03/2026`;
    const userMsg: Message = { role: "user", text, time: timeStr };
    const answer = demoAnswers[text] ?? {
      thinking: ["Bước 1 — Phân tích câu hỏi và xác định phạm vi dữ liệu", "Bước 2 — Truy vấn dữ liệu liên quan từ hệ thống NDATrace", "Bước 3 — Tổng hợp và trình bày kết quả"],
      text: `Đã nhận câu hỏi: **"${text}"**. Trong môi trường demo, vui lòng chọn câu hỏi gợi ý để xem kết quả mẫu đầy đủ.`,
    };
    const aiMsg: Message = { role: "ai", answer, time: timeStr };
    setExtraMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const handleSaveReport = (r: SavedReport) => {
    setSavedReports((prev) => [r, ...prev]);
    showToast("Đã lưu báo cáo thành công!");
  };

  const handleDeleteReport = (id: number) => {
    setSavedReports((prev) => prev.filter((r) => r.id !== id));
    showToast("Đã xoá báo cáo.");
  };

  return (
    <DashboardLayout>
      <div className="flex gap-0 -m-3 sm:-m-5 lg:-m-6 h-[calc(100dvh-4rem)] overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">

        {/* Left: History + Saved — hidden on mobile, always shown on desktop */}
        <div className="hidden xs:flex flex-col shrink-0 w-[300px] border-r border-gray-100 dark:border-gray-800 overflow-hidden">
          <SidePanel
            activeId={activeHistoryId} onSelect={handleSelectHistory} onNew={handleNewChat}
            reports={savedReports} onNewReport={() => setShowSaveModal(true)} onView={setViewReport} onDelete={handleDeleteReport}
          />
        </div>

        {/* Center: Chat — always full width on mobile */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden bg-[#f9fafb] dark:bg-gray-950">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <BrainCircuit size={16} className="text-violet-500 shrink-0" />
              <span className="text-[14px] font-semibold text-gray-800 dark:text-gray-100 truncate">{chatTitle}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={handleNewChat} className="flex items-center gap-1.5 text-[13px] font-medium text-white bg-brand-600 hover:bg-brand-700 px-3 py-1.5 rounded-lg transition-colors">
                <Plus size={14} /> <span>Tạo chat mới</span>
              </button>
              {/* More menu — mobile only */}
              <div className="relative xs:hidden">
                <button
                  onClick={() => setShowMoreMenu((v) => !v)}
                  className="flex items-center justify-center size-8 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <MoreHorizontal size={16} />
                </button>
                {showMoreMenu && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowMoreMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg z-40 overflow-hidden">
                      <button
                        onClick={() => { setMobilePanelTab("history"); setShowMobilePanel(true); setShowMoreMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Clock size={14} className="text-gray-400 shrink-0" /> Lịch sử
                      </button>
                      <button
                        onClick={() => { setMobilePanelTab("saved"); setShowMobilePanel(true); setShowMoreMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-50 dark:border-gray-800 transition-colors"
                      >
                        <BookmarkPlus size={14} className="text-gray-400 shrink-0" /> Đã lưu
                      </button>
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => showToast("Đã sao chép liên kết!")} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Share2 size={13} /> <span className="hidden sm:inline">Chia sẻ</span>
              </button>
            </div>
          </div>

          {/* Messages area */}
          {isNewChat ? (
            <EmptyState onSelect={(q) => { setIsNewChat(false); handleSend(q); }} />
          ) : (
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Pre-loaded conversation (history id 1) */}
              {activeHistoryId === 1 && (
                <>
                  <div className="flex justify-end">
                    <div className="max-w-lg bg-brand-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed">
                      Phân tích tổng hợp vi phạm chuỗi cung ứng trong Q1/2026, phân loại theo nhóm và so sánh xu hướng theo tháng.
                      <p className="text-[11px] text-brand-200 mt-1.5 text-right">10:32 · 20/03/2026</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 max-w-3xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="size-7 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center"><BrainCircuit size={14} className="text-violet-600 dark:text-violet-400" /></div>
                      <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">NDATrace AI</span>
                      <span className="text-[11px] text-gray-400">10:32 · 20/03/2026</span>
                    </div>
                    <div className="bg-white dark:bg-gray-900 border border-[#e5e7eb] dark:border-gray-800 rounded-2xl p-4">
                      <ThinkingBlock steps={["Bước 1 — Xác định phạm vi dữ liệu: Q1/2026, toàn bộ doanh nghiệp đang hoạt động", "Bước 2 — Phân loại vi phạm theo 5 nhóm chính của hệ thống NDATrace", "Bước 3 — Phân tích xu hướng tháng và tính toán KPI tổng hợp"]} />
                      <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        Đã phân tích <strong>2,661 sự kiện vi phạm</strong> trong Q1/2026 từ toàn bộ 1,284 doanh nghiệp. Vi phạm về <strong>truy xuất nguồn gốc</strong> chiếm tỷ lệ cao nhất (38.7%), với đỉnh điểm vào tháng 2. Tỷ lệ xử lý đạt <strong>87.4%</strong>, cải thiện 2.8% so với Q4/2025.
                      </p>
                      <ResultCard showToast={showToast} onSaveReport={() => setShowSaveModal(true)} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-lg bg-brand-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed">
                      Cho tôi xem chi tiết các doanh nghiệp có rủi ro cao và đề xuất biện pháp xử lý cụ thể.
                      <p className="text-[11px] text-brand-200 mt-1.5 text-right">10:38 · 20/03/2026</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 max-w-3xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="size-7 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center"><BrainCircuit size={14} className="text-violet-600 dark:text-violet-400" /></div>
                      <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">NDATrace AI</span>
                      <span className="text-[11px] text-gray-400">10:38 · 20/03/2026</span>
                    </div>
                    <div className="bg-white dark:bg-gray-900 border border-[#e5e7eb] dark:border-gray-800 rounded-2xl p-4">
                    <ThinkingBlock steps={["Bước 1 — Lọc doanh nghiệp có điểm rủi ro ≥ 70 trong Q1/2026", "Bước 2 — Phân tích lịch sử vi phạm và xu hướng tái phạm", "Bước 3 — Đề xuất biện pháp theo quy trình kiểm soát NDATrace"]} />
                    <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">Đã xác định được <strong>6 doanh nghiệp rủi ro cao</strong> (điểm rủi ro ≥ 70) cần ưu tiên xử lý ngay trong tháng 4/2026.</p>
                    <div className="rounded-2xl border border-[#e5e7eb] dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <AlertTriangle size={14} className="text-amber-500" />
                        <span className="text-[14px] font-semibold text-gray-800 dark:text-gray-100">Doanh nghiệp rủi ro cao — Q1/2026</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[13px]">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/60">
                              <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">Doanh nghiệp</th>
                              <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">Vi phạm</th>
                              <th className="text-center px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">Điểm RR</th>
                              <th className="text-center px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">Xu hướng</th>
                              <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold uppercase text-[11px]">Biện pháp</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { ten: "Vinafood Corp",    vi_pham: 178, diem: 84, xu: "Tăng",    bp: "Kiểm tra đột xuất + cảnh báo chính thức",    rowColor: "#FEF2F2" },
                              { ten: "SeaFood Mekong",   vi_pham: 156, diem: 79, xu: "Ổn định", bp: "Yêu cầu báo cáo khắc phục trong 15 ngày",     rowColor: "#FFFBEB" },
                              { ten: "GreenFarm VN",     vi_pham: 143, diem: 76, xu: "Giảm",    bp: "Theo dõi sát — đang có cải thiện",             rowColor: "#F0FDF4" },
                              { ten: "LogiPro Việt Nam", vi_pham: 139, diem: 74, xu: "Tăng",    bp: "Tạm dừng cấp mới chứng nhận xuất khẩu",       rowColor: "#FEF2F2" },
                              { ten: "PharmaViet",       vi_pham: 121, diem: 72, xu: "Ổn định", bp: "Đưa vào danh sách giám sát tăng cường",        rowColor: "#FFFBEB" },
                              { ten: "ColdChain Plus",   vi_pham: 114, diem: 70, xu: "Tăng",    bp: "Kiểm tra hệ thống kho lạnh & quy trình",      rowColor: "#FEF2F2" },
                            ].map((r, i) => (
                              <tr key={i} className="border-t border-gray-100 dark:border-gray-800 hover:brightness-95 dark:hover:bg-gray-800/50 transition-all" style={{ background: r.rowColor }}>
                                <td className="px-4 py-2.5 font-semibold text-gray-900 dark:text-gray-100 dark:bg-transparent" style={{ background: "transparent" }}>{r.ten}</td>
                                <td className="px-4 py-2.5 text-right font-bold text-gray-900 dark:text-white dark:bg-transparent" style={{ background: "transparent" }}>{r.vi_pham}</td>
                                <td className="px-4 py-2.5 text-center dark:bg-transparent" style={{ background: "transparent" }}>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${r.diem >= 80 ? "bg-red-100 text-red-800 border-red-300" : r.diem >= 75 ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-yellow-100 text-yellow-800 border-yellow-300"}`}>{r.diem}</span>
                                </td>
                                <td className="px-4 py-2.5 text-center dark:bg-transparent" style={{ background: "transparent" }}>
                                  <span className={`text-[13px] font-bold ${r.xu === "Tăng" ? "text-red-600" : r.xu === "Giảm" ? "text-green-600" : "text-gray-500 dark:text-gray-400"}`}>{r.xu === "Tăng" ? "↑" : r.xu === "Giảm" ? "↓" : "→"} {r.xu}</span>
                                </td>
                                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 dark:bg-transparent text-[12px]" style={{ background: "transparent" }}>{r.bp}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-800">
                        <button onClick={() => showToast("Đã sao chép!")} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Copy size={13} /> Sao chép</button>
                        <button onClick={() => setShowSaveModal(true)} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><BookmarkPlus size={13} /> Lưu</button>
                        <button onClick={() => showToast("Đang xuất Excel...")} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ml-auto"><Download size={13} /> Xuất Excel</button>
                      </div>
                    </div>
                    <AINotice />
                    </div>
                  </div>
                </>
              )}

              {/* Other history items: show a placeholder summary */}
              {activeHistoryId > 1 && activeHistoryId <= 12 && extraMessages.length === 0 && (() => {
                const allItems = historyGroups.flatMap((g) => g.items);
                const item = allItems.find((i) => i.id === activeHistoryId);
                return item ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="size-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-3">
                      <FileText size={18} className="text-gray-400" />
                    </div>
                    <p className="text-[14px] font-medium text-gray-700 dark:text-gray-200 mb-1">{item.title}</p>
                    <p className="text-[13px] text-gray-400 mb-4">{item.preview} · {item.msgs} tin nhắn</p>
                    <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                      {item.tags.map((t) => <span key={t} className="text-[12px] px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg">{t}</span>)}
                    </div>
                    <p className="text-[13px] text-gray-400">Đặt câu hỏi tiếp theo để tiếp tục hội thoại này.</p>
                  </div>
                ) : null;
              })()}

              {/* Dynamic messages */}
              {extraMessages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-lg bg-brand-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed">
                      {msg.text}<p className="text-[11px] text-brand-200 mt-1.5 text-right">{msg.time}</p>
                    </div>
                  </div>
                ) : (
                  <SimpleAIMessage key={i} answer={msg.answer} time={msg.time} onSaveReport={() => setShowSaveModal(true)} />
                )
              )}
            </div>
          )}

          {/* Input area */}
          <div className="px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2 mb-2 h-[50px]">
              <button onClick={() => setShowSuggestions((v) => !v)} className="flex items-center gap-1.5 shrink-0">
                <Sparkles size={13} className="text-violet-500" />
                <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Gợi ý câu hỏi</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${showSuggestions ? "" : "-rotate-90"}`} />
              </button>
              {showSuggestions && (
                <div className="flex-1 flex justify-end">
                  <div className="flex p-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {questionGroups.map((g, i) => (
                      <button
                        key={g.label}
                        onClick={() => setActiveGroup(i)}
                        className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-all ${activeGroup === i ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {showSuggestions && <QuestionSuggestions onSelect={(q) => setInput(q)} activeGroup={activeGroup} />}
            {/* Attached files chips */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {attachedFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 text-[12px] text-brand-700 dark:text-brand-300 max-w-[180px]">
                    <Paperclip size={11} className="shrink-0" />
                    <span className="truncate">{f.name}</span>
                    <button onClick={() => setAttachedFiles((prev) => prev.filter((_, j) => j !== i))} className="shrink-0 text-brand-400 hover:text-brand-600 transition-colors ml-0.5">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center h-14 rounded-[1000px] border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus-within:border-brand-400 dark:focus-within:border-brand-500 transition-colors px-2 gap-1">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Đính kèm tệp"
                className="shrink-0 size-9 rounded-full text-gray-400 hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Paperclip size={17} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSend(input); } }}
                placeholder="Bạn cần tôi giúp đỡ điều gì?"
                className="flex-1 h-full bg-transparent text-[15px] text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none"
              />
              {input && (
                <button onClick={() => setInput("")} className="shrink-0 size-6 rounded-full text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors">
                  <X size={13} />
                </button>
              )}
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() && attachedFiles.length === 0}
                className="shrink-0 size-9 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile panel drawer (Xem thêm) ── */}
        {showMobilePanel && (
          <div className="xs:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobilePanel(false)} />
            {/* Panel */}
            <div className="relative w-[300px] max-w-[85vw] h-full bg-white dark:bg-gray-900 flex flex-col shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
                <span className="text-[14px] font-semibold text-gray-800 dark:text-gray-100">Xem thêm</span>
                <button onClick={() => setShowMobilePanel(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <X size={15} />
                </button>
              </div>
              {/* SidePanel content */}
              <div className="flex-1 overflow-hidden">
                <SidePanel
                  activeId={activeHistoryId}
                  onSelect={(id) => { handleSelectHistory(id); setShowMobilePanel(false); }}
                  onNew={() => { handleNewChat(); setShowMobilePanel(false); }}
                  reports={savedReports} onNewReport={() => setShowSaveModal(true)} onView={setViewReport} onDelete={handleDeleteReport}
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      {showAdvanced && <AdvancedModal onClose={() => setShowAdvanced(false)} />}
      {showSaveModal && <SaveReportModal onClose={() => setShowSaveModal(false)} onSave={handleSaveReport} />}
      {viewReport && <ViewReportModal report={viewReport} onClose={() => setViewReport(null)} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-[13px] px-4 py-2.5 rounded-xl shadow-lg z-50 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-green-400" /> {toast}
        </div>
      )}
    </DashboardLayout>
  );
}
