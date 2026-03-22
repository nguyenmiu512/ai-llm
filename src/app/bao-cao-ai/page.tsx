"use client";

import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Send,
  Paperclip,
  Search,
  Plus,
  Share2,
  Clock,
  MessageSquare,
  Bot,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AIAnalysisSteps from "@/components/chat/AIAnalysisSteps";
import ResultCard, { DataPoint, ChartType, StatItem } from "@/components/chat/ResultCard";
import SuggestedQuestions from "@/components/chat/SuggestedQuestions";
import ProgressOverlay, { OverlayState } from "@/components/chat/ProgressOverlay";
import { saveSession, INITIAL_SESSION_ID, SESSION_HIGH_RISK_ID, SESSION_EXPORT_ATTP_ID } from "@/lib/report-store";

// ── Types ───────────────────────────────────────────────────────────────────
type AnalysisStep = { label: string; status: "done" | "running" | "pending" };

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sessionId?: string;
  steps?: { label: string; status: "done" | "running" | "pending" }[];
  analysis?: {
    title: string;
    stats: StatItem[];
    chartType?: ChartType;
    chartData?: DataPoint[];
  };
};

// ── Question Configs ─────────────────────────────────────────────────────────
type QuestionConfig = {
  title: string;
  summary: string;
  steps: string[];
  stats: StatItem[];
  chartType: ChartType;
  chartData: DataPoint[];
};

const QUESTION_CONFIGS: Record<string, QuestionConfig> = {
  "q-monthly-violations": {
    title: "Vi phạm chuỗi cung ứng Q1/2026 theo tháng",
    summary: "Trong Q1/2026, tổng cộng 2,661 vi phạm được ghi nhận. Tháng 2 là đỉnh điểm với 1,024 vi phạm — tăng 18.3% so với cùng kỳ năm 2025. Xu hướng giảm nhẹ trong tháng 3 cho thấy hiệu quả kiểm soát đang cải thiện.",
    steps: ["Truy xuất dữ liệu vi phạm Q1/2026 và Q1/2025", "Phân tích theo từng tháng và so sánh cùng kỳ", "Tổng hợp xu hướng và chỉ số biến động"],
    stats: [
      { label: "Tổng vi phạm Q1", value: "2,661", change: "+15.2%", isUp: true },
      { label: "Tháng đỉnh điểm", value: "T2/2026", change: "1,024 vi phạm" },
      { label: "So cùng kỳ 2025", value: "+346", change: "+14.9%", isUp: true },
    ],
    chartType: "line",
    chartData: [
      { label: "T1/2025", value: 712, prev: 0 },
      { label: "T2/2025", value: 865, prev: 0 },
      { label: "T3/2025", value: 738, prev: 0 },
      { label: "T1/2026", value: 821, prev: 712 },
      { label: "T2/2026", value: 1024, prev: 865 },
      { label: "T3/2026", value: 816, prev: 738 },
    ],
  },
  "q-label-compliance": {
    title: "Tuân thủ tem nhãn của doanh nghiệp xuất khẩu",
    summary: "Tỷ lệ tuân thủ tem nhãn của các doanh nghiệp xuất khẩu đạt 73.4% trong Q1/2026. Nhóm thủy sản đạt cao nhất (81.2%), trong khi nhóm rau củ quả còn thấp nhất (61.7%). Cần tăng cường tập huấn cho nhóm sản phẩm chưa đạt chuẩn.",
    steps: ["Rà soát hồ sơ tem nhãn của doanh nghiệp xuất khẩu", "Phân loại theo nhóm ngành hàng", "Tính tỷ lệ tuân thủ và xác định nhóm cần cải thiện"],
    stats: [
      { label: "Tuân thủ chung", value: "73.4%", change: "+3.1%", isUp: true },
      { label: "Cao nhất (Thủy sản)", value: "81.2%" },
      { label: "Thấp nhất (Rau củ)", value: "61.7%", change: "-1.4%", isUp: false },
    ],
    chartType: "pie",
    chartData: [
      { label: "Đạt chuẩn", value: 73.4 },
      { label: "Vi phạm nhỏ", value: 16.2 },
      { label: "Vi phạm nghiêm trọng", value: 6.8 },
      { label: "Chưa kiểm tra", value: 3.6 },
    ],
  },
  "q-traceability-march": {
    title: "Sự kiện truy xuất nguồn gốc – Tháng 3/2026",
    summary: "Tháng 3/2026 ghi nhận 4,218 sự kiện truy xuất nguồn gốc, tăng 22.4% so với tháng 2. Nhóm thủy sản dẫn đầu với 1,482 sự kiện. Hệ thống quét mã QR được triển khai rộng hơn là nguyên nhân chính khiến số lượng sự kiện tăng mạnh.",
    steps: ["Truy xuất log sự kiện tháng 3/2026 từ hệ thống", "Phân loại theo nhóm sản phẩm", "Thống kê và so sánh với tháng trước"],
    stats: [
      { label: "Tổng sự kiện T3", value: "4,218", change: "+22.4%", isUp: true },
      { label: "Nhóm cao nhất", value: "Thủy sản", change: "1,482 sự kiện" },
      { label: "Mã QR quét mới", value: "2,847", change: "+31.2%", isUp: true },
    ],
    chartType: "bar",
    chartData: [
      { label: "Thủy sản", value: 1482 },
      { label: "Rau củ quả", value: 978 },
      { label: "Thịt gia súc", value: 743 },
      { label: "Gia cầm", value: 612 },
      { label: "Chế biến", value: 403 },
    ],
  },
  "q-compare-quarters": {
    title: "So sánh hiệu suất xử lý vi phạm Q4/2025 – Q1/2026",
    summary: "Hiệu suất xử lý vi phạm Q1/2026 cải thiện đáng kể so với Q4/2025. Tỷ lệ xử lý tăng từ 84.6% lên 87.4%. Thời gian xử lý trung bình giảm từ 5.2 ngày xuống 4.1 ngày. Tháng 1/2026 có sự tăng đột biến do chuyển tiếp hồ sơ tồn đọng từ Q4.",
    steps: ["Tổng hợp dữ liệu xử lý vi phạm Q4/2025", "Tổng hợp dữ liệu Q1/2026 tương ứng", "Phân tích hiệu suất và chỉ số cải thiện"],
    stats: [
      { label: "Tỷ lệ xử lý Q1/2026", value: "87.4%", change: "+2.8%", isUp: true },
      { label: "Tỷ lệ xử lý Q4/2025", value: "84.6%" },
      { label: "Thời gian TB Q1", value: "4.1 ngày", change: "-1.1 ngày", isUp: true },
    ],
    chartType: "line",
    chartData: [
      { label: "T10/2025", value: 82.1, prev: 0 },
      { label: "T11/2025", value: 84.6, prev: 0 },
      { label: "T12/2025", value: 85.3, prev: 0 },
      { label: "T1/2026", value: 83.9, prev: 82.1 },
      { label: "T2/2026", value: 87.4, prev: 84.6 },
      { label: "T3/2026", value: 89.1, prev: 85.3 },
    ],
  },
  "q-risk-by-region": {
    title: "Phân bổ cơ sở rủi ro cao theo phường – Quận 1",
    summary: "Quận 1 hiện có 84 cơ sở xếp loại rủi ro cao, tập trung chủ yếu tại Phường Bến Nghé (28 cơ sở) và Phường Đa Kao (21 cơ sở). Đây là khu vực có mật độ kinh doanh thực phẩm cao và tần suất kiểm tra còn thấp so với mức độ rủi ro.",
    steps: ["Phân loại cơ sở kinh doanh theo mức độ rủi ro", "Lọc nhóm rủi ro cao trong quận 1", "Phân tích phân bổ theo phường/xã"],
    stats: [
      { label: "Cơ sở rủi ro cao", value: "84", change: "+12", isUp: true },
      { label: "Phường tập trung nhất", value: "Bến Nghé", change: "28 cơ sở" },
      { label: "Cần kiểm tra ngay", value: "31", change: "37% tổng số" },
    ],
    chartType: "horizontal",
    chartData: [
      { label: "Bến Nghé", value: 28 },
      { label: "Đa Kao", value: 21 },
      { label: "Nguyễn Thái Bình", value: 14 },
      { label: "Cô Giang", value: 11 },
      { label: "Phạm Ngũ Lão", value: 10 },
    ],
  },
  "q-export-compliance": {
    title: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn ATTP (6 tháng gần nhất)",
    summary: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn ATTP đạt 91.3% trong 6 tháng gần nhất (T10/2025–T3/2026). Tháng 1/2026 ghi nhận mức thấp nhất 88.7% do ảnh hưởng mùa vụ. Xu hướng phục hồi tích cực từ tháng 2 cho thấy các biện pháp cải thiện đang phát huy hiệu quả.",
    steps: ["Truy xuất dữ liệu kiểm định lô hàng xuất khẩu 6 tháng gần nhất", "Đối chiếu với tiêu chuẩn chứng nhận ATTP", "Tính tỷ lệ đạt và phân tích xu hướng"],
    stats: [
      { label: "Đạt chuẩn TB 6 tháng", value: "91.3%", change: "+1.8%", isUp: true },
      { label: "Tháng thấp nhất", value: "T1/2026", change: "88.7%" },
      { label: "Lô hàng kiểm tra", value: "3,847", change: "+9.2%", isUp: true },
    ],
    chartType: "line",
    chartData: [
      { label: "T10/2025", value: 90.2 },
      { label: "T11/2025", value: 91.8 },
      { label: "T12/2025", value: 92.4 },
      { label: "T1/2026", value: 88.7 },
      { label: "T2/2026", value: 91.1 },
      { label: "T3/2026", value: 93.6 },
    ],
  },
};

// ── Mock Data ───────────────────────────────────────────────────────────────
const historyItems = [
  { id: "h1", title: "Phân tích vi phạm chuỗi cung ứng Q1/2026", time: "10:32", messages: 4 },
  { id: "h2", title: "Doanh nghiệp rủi ro cao cần xử lý ngay", time: "09:15", messages: 6, preview: "47 cơ sở vượt ngưỡng rủi ro — 12 cần đình chỉ khẩn cấp, tập trung tại Q.1 và Q.5." },
  { id: "h3", title: "Xu hướng xuất khẩu thủy sản Q1/2026", time: "15:44", date: "Hôm qua", messages: 3 },
  { id: "h4", title: "Chứng nhận hết hạn tháng 3/2026", time: "11:20", date: "Hôm qua", messages: 2 },
];

const savedItems = [
  {
    id: "s1",
    title: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn ATTP — 6 tháng gần nhất",
    savedAt: "19/03/2026",
    stats: "91.3% đạt chuẩn · 3,847 lô kiểm tra",
    tag: "Xuất khẩu",
  },
];

const initialMessages: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "Phân tích tổng hợp vi phạm chuỗi cung ứng trong Q1/2026, phân loại theo nhóm và so sánh xu hướng theo tháng.",
    timestamp: "10:32 - 20/03/2026",
  },
  {
    id: "m2",
    role: "assistant",
    sessionId: INITIAL_SESSION_ID,
    content: "Đã phân tích 2,661 sự kiện vi phạm trong Q1/2026 từ 1,284 doanh nghiệp. Vi phạm truy xuất nguồn gốc chiếm tỷ lệ cao nhất (38.7%), đỉnh điểm tháng 2. Tỷ lệ xử lý đạt 87.4%, cải thiện 2.8% so với Q4/2025.",
    timestamp: "10:32 - 20/03/2026",
    steps: [
      { label: "Đang truy xuất dữ liệu vi phạm Q1/2026", status: "done" },
      { label: "Phân loại theo nhóm ngành hàng và địa điểm", status: "done" },
      { label: "Tổng hợp xu hướng và so sánh cùng kỳ", status: "done" },
    ],
    analysis: {
      title: "Kết quả phân tích — Vi phạm chuỗi cung ứng Q1/2026",
      stats: [
        { label: "Tổng vi phạm", value: "2,661", change: "+15.2%", isUp: true },
        { label: "Tỷ lệ xử lý", value: "87.4%", change: "+2.8%", isUp: true },
        { label: "Doanh nghiệp", value: "1,284" },
      ],
      chartType: "line" as ChartType,
      chartData: [
        { label: "T1/2025", value: 712, prev: 0 },
        { label: "T2/2025", value: 865, prev: 0 },
        { label: "T3/2025", value: 738, prev: 0 },
        { label: "T1/2026", value: 821, prev: 712 },
        { label: "T2/2026", value: 1024, prev: 865 },
        { label: "T3/2026", value: 816, prev: 738 },
      ] as DataPoint[],
    },
  },
];

const h2Messages: Message[] = [
  {
    id: "h2-m1",
    role: "user",
    content: "Liệt kê doanh nghiệp có mức độ rủi ro cao cần xử lý ngay trong tháng 3/2026",
    timestamp: "09:15 - 20/03/2026",
  },
  {
    id: "h2-m2",
    role: "assistant",
    sessionId: SESSION_HIGH_RISK_ID,
    content: "Xác định 47 cơ sở vượt ngưỡng rủi ro cao trong tháng 3/2026. Trong đó 12 cơ sở cần đình chỉ khẩn cấp, tập trung chủ yếu tại Quận 1 (18 cơ sở) và Quận 5 (14 cơ sở). Đề xuất ưu tiên kiểm tra nhóm kinh doanh thực phẩm tươi sống.",
    timestamp: "09:16 - 20/03/2026",
    steps: [
      { label: "Truy xuất hồ sơ đánh giá rủi ro tháng 3/2026", status: "done" },
      { label: "Lọc cơ sở vượt ngưỡng theo tiêu chí rủi ro cao", status: "done" },
      { label: "Phân loại theo quận và mức độ ưu tiên xử lý", status: "done" },
    ],
    analysis: {
      title: "Phân bổ cơ sở rủi ro cao — Tháng 3/2026",
      stats: [
        { label: "Cơ sở rủi ro cao", value: "47", change: "+12", isUp: true },
        { label: "Cần đình chỉ ngay", value: "12", change: "25.5%" },
        { label: "Quận tập trung nhất", value: "Quận 1", change: "18 cơ sở" },
      ],
      chartType: "horizontal" as ChartType,
      chartData: [
        { label: "Quận 1", value: 18 },
        { label: "Quận 5", value: 14 },
        { label: "Quận 3", value: 8 },
        { label: "Quận 10", value: 7 },
      ] as DataPoint[],
    },
  },
  {
    id: "h2-m3",
    role: "user",
    content: "Trong 47 cơ sở đó, bao nhiêu đang trong diện đình chỉ hoạt động?",
    timestamp: "09:20 - 20/03/2026",
  },
  {
    id: "h2-m4",
    role: "assistant",
    content: "Hiện tại 12 cơ sở đã nhận quyết định đình chỉ, 9 cơ sở đang trong quá trình hoàn thiện hồ sơ gia hạn kinh doanh và 26 cơ sở đang được theo dõi tăng cường. Dự kiến 5 cơ sở sẽ được cấp lại giấy phép sau khi khắc phục vi phạm vào cuối tháng 3.",
    timestamp: "09:21 - 20/03/2026",
    steps: [
      { label: "Tra cứu trạng thái xử lý theo từng cơ sở", status: "done" },
      { label: "Phân loại theo trạng thái đình chỉ / theo dõi", status: "done" },
      { label: "Dự báo tiến độ khắc phục vi phạm", status: "done" },
    ],
    analysis: {
      title: "Trạng thái xử lý cơ sở rủi ro cao",
      stats: [
        { label: "Đình chỉ hoạt động", value: "12", change: "25.5%" },
        { label: "Đang hoàn thiện hồ sơ", value: "9", change: "19.1%" },
        { label: "Theo dõi tăng cường", value: "26", change: "55.3%" },
      ],
      chartType: "pie" as ChartType,
      chartData: [
        { label: "Đình chỉ", value: 12 },
        { label: "Hoàn thiện hồ sơ", value: 9 },
        { label: "Theo dõi", value: 26 },
      ] as DataPoint[],
    },
  },
];

const h3Messages: Message[] = [
  {
    id: "h3-m1",
    role: "user",
    content: "Phân tích xu hướng xuất khẩu thủy sản Q1/2026, so sánh với cùng kỳ Q1/2025",
    timestamp: "15:44 - 19/03/2026",
  },
  {
    id: "h3-m2",
    role: "assistant",
    content: "Kim ngạch xuất khẩu thủy sản Q1/2026 đạt 2.34 tỷ USD, tăng 11.8% so với Q1/2025. Tháng 3/2026 ghi nhận mức cao nhất với 842 triệu USD. Thị trường Mỹ và EU tiếp tục dẫn đầu, chiếm 58.4% tổng giá trị xuất khẩu.",
    timestamp: "15:44 - 19/03/2026",
    steps: [
      { label: "Tổng hợp dữ liệu xuất khẩu thủy sản Q1/2026", status: "done" },
      { label: "So sánh với số liệu Q1/2025 cùng kỳ", status: "done" },
      { label: "Phân tích thị trường và xu hướng", status: "done" },
    ],
    analysis: {
      title: "Xu hướng xuất khẩu thủy sản — Q1/2026 vs Q1/2025",
      stats: [
        { label: "Kim ngạch Q1/2026", value: "2.34 tỷ USD", change: "+11.8%", isUp: true },
        { label: "Tháng cao nhất", value: "T3/2026", change: "842 triệu USD" },
        { label: "Thị phần Mỹ + EU", value: "58.4%" },
      ],
      chartType: "line" as ChartType,
      chartData: [
        { label: "T1/2025", value: 682, prev: 0 },
        { label: "T2/2025", value: 714, prev: 0 },
        { label: "T3/2025", value: 697, prev: 0 },
        { label: "T1/2026", value: 748, prev: 682 },
        { label: "T2/2026", value: 750, prev: 714 },
        { label: "T3/2026", value: 842, prev: 697 },
      ] as DataPoint[],
    },
  },
];

const h4Messages: Message[] = [
  {
    id: "h4-m1",
    role: "user",
    content: "Liệt kê và phân tích chứng nhận ATTP sắp hết hạn trong tháng 3/2026",
    timestamp: "11:20 - 19/03/2026",
  },
  {
    id: "h4-m2",
    role: "assistant",
    content: "Có 138 chứng nhận ATTP sẽ hết hạn trong tháng 3/2026. Nhóm kinh doanh thực phẩm chế biến chiếm 41 chứng nhận, tiếp theo là nhóm nhà hàng ăn uống với 38 chứng nhận. Cần thông báo gia hạn ngay cho 23 cơ sở chưa có phản hồi.",
    timestamp: "11:21 - 19/03/2026",
    steps: [
      { label: "Tra cứu danh sách chứng nhận theo ngày hết hạn", status: "done" },
      { label: "Phân loại theo nhóm ngành và trạng thái gia hạn", status: "done" },
      { label: "Xác định cơ sở ưu tiên cần thông báo khẩn", status: "done" },
    ],
    analysis: {
      title: "Chứng nhận ATTP hết hạn — Tháng 3/2026",
      stats: [
        { label: "Tổng hết hạn T3", value: "138", change: "+22 so T2" },
        { label: "Chưa phản hồi", value: "23", change: "16.7%" },
        { label: "Nhóm nhiều nhất", value: "Chế biến", change: "41 CN" },
      ],
      chartType: "bar" as ChartType,
      chartData: [
        { label: "Chế biến TP", value: 41 },
        { label: "Nhà hàng", value: 38 },
        { label: "Cơ sở SX", value: 29 },
        { label: "Siêu thị", value: 18 },
        { label: "Khác", value: 12 },
      ] as DataPoint[],
    },
  },
];

const s1Messages: Message[] = [
  {
    id: "s1-m1",
    role: "user",
    content: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn chứng nhận ATTP trong 6 tháng gần nhất",
    timestamp: "14:22 - 19/03/2026",
  },
  {
    id: "s1-m2",
    role: "assistant",
    sessionId: SESSION_EXPORT_ATTP_ID,
    content: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn ATTP đạt 91.3% trong 6 tháng gần nhất (T10/2025–T3/2026). Tháng 1/2026 ghi nhận mức thấp nhất 88.7% do ảnh hưởng mùa vụ. Xu hướng phục hồi tích cực từ tháng 2 cho thấy các biện pháp cải thiện đang phát huy hiệu quả.",
    timestamp: "14:23 - 19/03/2026",
    steps: [
      { label: "Truy xuất dữ liệu kiểm định lô hàng 6 tháng", status: "done" },
      { label: "Đối chiếu với tiêu chuẩn chứng nhận ATTP", status: "done" },
      { label: "Tính tỷ lệ đạt và phân tích xu hướng", status: "done" },
    ],
    analysis: {
      title: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn ATTP — 6 tháng gần nhất",
      stats: [
        { label: "Đạt chuẩn TB 6 tháng", value: "91.3%", change: "+1.8%", isUp: true },
        { label: "Tháng thấp nhất", value: "T1/2026", change: "88.7%" },
        { label: "Lô hàng kiểm tra", value: "3,847", change: "+9.2%", isUp: true },
      ],
      chartType: "line" as ChartType,
      chartData: [
        { label: "T10/2025", value: 90.2 },
        { label: "T11/2025", value: 91.8 },
        { label: "T12/2025", value: 92.4 },
        { label: "T1/2026", value: 88.7 },
        { label: "T2/2026", value: 91.1 },
        { label: "T3/2026", value: 93.6 },
      ] as DataPoint[],
    },
  },
];

const HISTORY_MESSAGES: Record<string, Message[]> = {
  h1: initialMessages,
  h2: h2Messages,
  h3: h3Messages,
  h4: h4Messages,
};

const SAVED_MESSAGES: Record<string, Message[]> = {
  s1: s1Messages,
};

export default function BaoCaoAIPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"history" | "saved">("history");
  const [activeHistoryId, setActiveHistoryId] = useState("h1");
  const [activeSavedId, setActiveSavedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [titleExpanded, setTitleExpanded] = useState(false);
  const [overlay, setOverlay] = useState<{ state: OverlayState; steps: AnalysisStep[] } | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectHistory = (id: string) => {
    setActiveHistoryId(id);
    setActiveSavedId(null);
    setOverlay(null);
    setMessages(HISTORY_MESSAGES[id] ?? initialMessages);
    setSidebarOpen(false);
  };

  const handleSelectSaved = (id: string) => {
    setActiveSavedId(id);
    setActiveHistoryId("");
    setActiveTab("saved");
    setOverlay(null);
    setMessages(SAVED_MESSAGES[id] ?? []);
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, overlay]);

  const handleSend = (text?: string, questionId?: string) => {
    const content = text || input;
    if (!content.trim() && attachedFiles.length === 0) return;

    const ts = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content, timestamp: ts }]);
    setInput("");
    setAttachedFiles([]);

    const cfg = questionId ? QUESTION_CONFIGS[questionId] : undefined;
    const stepLabels = cfg?.steps ?? ["Đang truy xuất dữ liệu...", "Phân tích và phân loại kết quả", "Tổng hợp báo cáo"];
    const mockSteps: AnalysisStep[] = stepLabels.map(label => ({ label, status: "pending" }));

    setOverlay({ state: "thinking", steps: [] });
    setTimeout(() => setOverlay({ state: "streaming", steps: [{ ...mockSteps[0], status: "running" } as AnalysisStep, ...mockSteps.slice(1)] }), 700);
    setTimeout(() => setOverlay({ state: "streaming", steps: [{ ...mockSteps[0], status: "done" } as AnalysisStep, { ...mockSteps[1], status: "running" } as AnalysisStep, ...mockSteps.slice(2)] }), 1400);
    setTimeout(() => setOverlay({ state: "streaming", steps: ([mockSteps[0], mockSteps[1], { ...mockSteps[2], status: "running" }] as AnalysisStep[]).map((s, i) => i < 2 ? { ...s, status: "done" } as AnalysisStep : s) }), 2100);
    setTimeout(() => setOverlay({ state: "done", steps: mockSteps.map(s => ({ ...s, status: "done" })) as AnalysisStep[] }), 2800);
    setTimeout(() => setOverlay(prev => prev ? { ...prev, state: "hidden" } : null), 3200);

    const sessionId = `session-${Date.now()}`;
    setTimeout(() => {
      const ts2 = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      const responseStats = cfg?.stats ?? [
        { label: "Tổng vi phạm", value: "2,661", change: "+15.2%", isUp: true },
        { label: "Tỷ lệ xử lý", value: "87.4%", change: "+2.8%", isUp: true },
        { label: "Doanh nghiệp", value: "1,284" },
      ];
      const responseSummary = cfg?.summary ?? "Đã hoàn thành phân tích. Dữ liệu đã được tổng hợp từ hệ thống.";
      const analysisTitle = cfg?.title ?? (content.length > 50 ? content.slice(0, 50) + "…" : content);
      saveSession({
        id: sessionId,
        title: analysisTitle,
        query: content,
        summary: responseSummary,
        timestamp: ts2,
        stats: responseStats,
      });
      setOverlay(null);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        sessionId,
        content: responseSummary,
        timestamp: ts2,
        analysis: {
          title: analysisTitle,
          stats: responseStats,
          chartType: cfg?.chartType,
          chartData: cfg?.chartData,
        },
      }]);
    }, 3700);
  };

  return (
    <DashboardLayout>
      <div className="ai-report flex h-[calc(100dvh-64px)] -m-3 sm:-m-5 lg:-m-6 bg-white dark:bg-gray-950 overflow-hidden">

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Inner Sidebar: History/Saved */}
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-40 md:z-auto
          w-72 md:w-64 lg:w-80
          flex flex-col bg-white md:bg-gray-50/30 dark:bg-gray-900 md:dark:bg-gray-900/20
          border-r border-gray-100 dark:border-gray-800
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            {/* Mobile close button */}
            <div className="flex items-center justify-between mb-3 md:hidden">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                <X size={16} />
              </button>
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-4">
              <button 
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "history" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Lịch sử
              </button>
              <button 
                onClick={() => setActiveTab("saved")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "saved" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Đã lưu
              </button>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                placeholder="Tìm lịch sử..." 
                className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-brand-500/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            {activeTab === "history" && (
              <>
                <div>
                  <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Hôm nay</p>
                  <div className="space-y-1">
                    {historyItems.filter(h => !h.date).map(item => {
                      const isActive = activeHistoryId === item.id;
                      return (
                        <button key={item.id} onClick={() => handleSelectHistory(item.id)} className={`w-full text-left p-3 rounded-xl transition-all group ${isActive ? 'bg-brand-50/50 dark:bg-brand-900/10 ring-1 ring-brand-100 dark:ring-brand-900/30' : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <p className={`text-xs font-bold leading-relaxed truncate pr-2 ${isActive ? 'text-brand-700 dark:text-brand-400' : 'text-gray-700 dark:text-gray-300'}`}>{item.title}</p>
                          </div>
                          {"preview" in item && item.preview && (
                            <p className="text-xs text-gray-400 leading-relaxed mb-2 line-clamp-2">{item.preview}</p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                            <span className="flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                            <span className="flex items-center gap-1"><MessageSquare size={10} /> {item.messages}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Hôm qua</p>
                  <div className="space-y-1">
                    {historyItems.filter(h => h.date === "Hôm qua").map(item => {
                      const isActive = activeHistoryId === item.id;
                      return (
                        <button key={item.id} onClick={() => handleSelectHistory(item.id)} className={`w-full text-left p-3 rounded-xl transition-all group ${isActive ? 'bg-brand-50/50 dark:bg-brand-900/10 ring-1 ring-brand-100 dark:ring-brand-900/30' : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <p className={`text-xs font-bold leading-relaxed truncate pr-2 ${isActive ? 'text-brand-700 dark:text-brand-400' : 'text-gray-700 dark:text-gray-300'}`}>{item.title}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                            <span className="flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                            <span className="flex items-center gap-1"><MessageSquare size={10} /> {item.messages}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activeTab === "saved" && (
              <div>
                <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Báo cáo đã lưu</p>
                <div className="space-y-1">
                  {savedItems.map(item => {
                    const isActive = activeSavedId === item.id;
                    return (
                      <button key={item.id} onClick={() => handleSelectSaved(item.id)} className={`w-full text-left p-3 rounded-xl transition-all group ${isActive ? 'bg-brand-50/50 dark:bg-brand-900/10 ring-1 ring-brand-100 dark:ring-brand-900/30' : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`}>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className={`text-xs font-bold leading-relaxed transition-colors ${isActive ? 'text-brand-700 dark:text-brand-400' : 'text-gray-700 dark:text-gray-300 group-hover:text-brand-600 dark:group-hover:text-brand-400'}`}>{item.title}</p>
                          <span className="shrink-0 px-1.5 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-semibold rounded-md border border-brand-100 dark:border-brand-800">{item.tag}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.stats}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <Clock size={10} />
                          <span>{item.savedAt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-950">
          {/* Top Bar inside Chat */}
          <header className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-800 shrink-0 gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white shrink-0">
                <Bot size={16} />
              </div>
              {/* Title — max 2 lines, click to expand */}
              <button
                onClick={() => setTitleExpanded(v => !v)}
                className="text-left min-w-0 flex-1"
                title={titleExpanded ? "Thu gọn" : "Xem đầy đủ"}
              >
                <h2 className={`text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 leading-snug ${titleExpanded ? "" : "line-clamp-2"}`}>
                  Phân tích vi phạm chuỗi cung ứng Q1/2026
                </h2>
              </button>
              {/* Mobile dropdown trigger */}
              <div className="relative md:hidden shrink-0 ml-8" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className={`p-1.5 rounded-lg transition-colors ${dropdownOpen ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"}`}
                >
                  <Menu size={18} />
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Tabs */}
                    <div className="flex bg-gray-50 dark:bg-gray-800/60 p-1.5 gap-1 border-b border-gray-100 dark:border-gray-800">
                      <button
                        onClick={() => setActiveTab("history")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "history" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        Lịch sử
                      </button>
                      <button
                        onClick={() => setActiveTab("saved")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "saved" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        Đã lưu
                      </button>
                    </div>

                    {/* Items */}
                    <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
                      {activeTab === "history" && historyItems.map(item => {
                        const isActive = activeHistoryId === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => { handleSelectHistory(item.id); setDropdownOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${isActive ? "bg-brand-50 dark:bg-brand-900/10 text-brand-700 dark:text-brand-400" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                          >
                            <p className="text-xs font-semibold line-clamp-2 leading-snug">{item.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                              <span className="flex items-center gap-1"><Clock size={9} />{item.time}</span>
                              <span className="flex items-center gap-1"><MessageSquare size={9} />{item.messages}</span>
                            </div>
                          </button>
                        );
                      })}
                      {activeTab === "saved" && savedItems.map(item => {
                        const isActive = activeSavedId === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => { handleSelectSaved(item.id); setDropdownOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${isActive ? "bg-brand-50 dark:bg-brand-900/10 text-brand-700 dark:text-brand-400" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs font-semibold line-clamp-2 leading-snug">{item.title}</p>
                              <span className="shrink-0 px-1.5 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 text-xs font-semibold rounded border border-brand-100">{item.tag}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{item.savedAt}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all">
                <Plus size={14} />
                <span>Tạo chat mới</span>
              </button>
              <button className="sm:hidden p-2 bg-brand-600 text-white rounded-lg">
                <Plus size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </header>

          {/* Messages List */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 scroll-smooth">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col gap-3 ${m.role === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}>

                {/* Bubble row */}
                <div className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"} w-full`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-brand-600 shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className={`flex flex-col gap-2 max-w-[88%] sm:max-w-[75%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                        {m.role === "user" ? "BẠN" : "NDATRACE AI"}
                      </span>
                      <span className="text-xs text-gray-400">{m.timestamp}</span>
                    </div>

                    {m.content && (
                      <div className={`px-5 py-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        m.role === "user"
                          ? "bg-brand-600 text-white rounded-tr-sm font-medium"
                          : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
                      }`}>
                        {m.content}

                        {/* Compact KPI strip inside bubble */}
                        {m.analysis && (
                          <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            {m.analysis.stats.map((stat, i) => (
                              <div key={i} className="flex flex-col">
                                <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">{stat.value}</span>
                                <span className="text-xs text-gray-400 mt-0.5">{stat.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Detail report chip */}
                        {m.sessionId && (
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <Link
                              href={`/bao-cao-ai/chi-tiet/${m.sessionId}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 rounded-lg text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
                            >
                              Xem báo cáo chi tiết
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {m.steps && <AIAnalysisSteps steps={m.steps} defaultOpen={true} />}
                  </div>

                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 shrink-0 mt-1">
                      <User size={16} />
                    </div>
                  )}
                </div>

                {/* ResultCard — outside bubble, full width, indented past avatar */}
                {m.analysis && (
                  <div className="w-full pl-9 sm:pl-12">
                    <ResultCard
                      title={m.analysis.title}
                      stats={m.analysis.stats}
                      defaultChartType={m.analysis.chartType}
                      chartData={m.analysis.chartData}
                      sessionId={m.sessionId}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* AI Progress Overlay */}
            {overlay && <ProgressOverlay state={overlay.state} steps={overlay.steps} />}

            {/* Suggested Questions at the end */}
            {!overlay && <SuggestedQuestions onSelect={(text, id) => handleSend(text, id)} />}
            <div className="h-4" />
          </div>

          {/* Input Area — flex child so it stays above iOS keyboard */}
          <div className="shrink-0 px-3 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-violet-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl shadow-black/5">
                {/* Attached files preview */}
                {attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 px-3 pt-3">
                    {attachedFiles.map((file, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 rounded-lg max-w-[180px]">
                        <Paperclip size={11} className="text-brand-500 shrink-0" />
                        <span className="text-xs font-medium text-brand-700 dark:text-brand-400 truncate">{file.name}</span>
                        <button
                          onClick={() => setAttachedFiles((prev) => prev.filter((_, j) => j !== i))}
                          className="shrink-0 text-brand-400 hover:text-red-500 transition-colors"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center sm:items-end gap-2 sm:gap-3 p-2 sm:p-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.png,.jpg,.jpeg"
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
                  className="p-2 sm:p-3 text-gray-400 hover:text-brand-500 transition-colors rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20"
                  title="Đính kèm tệp"
                >
                  <Paperclip size={18} />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Bạn cần tôi giúp đỡ điều gì?"
                  rows={1}
                  className="flex-1 bg-transparent py-2 sm:py-3 text-sm text-gray-800 dark:text-gray-200 outline-none resize-none font-medium placeholder-gray-400 min-h-[44px] max-h-32 sm:max-h-40"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() && attachedFiles.length === 0}
                  className="p-2 sm:p-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-brand-600/20"
                >
                  <Send size={18} />
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
