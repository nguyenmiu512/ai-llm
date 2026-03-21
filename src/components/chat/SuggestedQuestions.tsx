"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const categories = [
  { id: "analyze", label: "Phân tích" },
  { id: "compare", label: "So sánh" },
  { id: "risk", label: "Rủi ro" },
  { id: "export", label: "Xuất khẩu" },
];

export const suggestions = [
  {
    id: "q-monthly-violations",
    category: "analyze",
    text: "Phân tích tổng hợp vi phạm chuỗi cung ứng Q1/2026 theo từng tháng",
  },
  {
    id: "q-label-compliance",
    category: "analyze",
    text: "Tỷ lệ tuân thủ tem nhãn của các doanh nghiệp xuất khẩu hiện tại là bao nhiêu?",
  },
  {
    id: "q-traceability-march",
    category: "analyze",
    text: "Thống kê số lượng sự kiện truy xuất nguồn gốc được ghi nhận trong tháng 3",
  },
  {
    id: "q-compare-quarters",
    category: "compare",
    text: "So sánh hiệu suất xử lý vi phạm giữa Q4/2025 và Q1/2026",
  },
  {
    id: "q-risk-by-region",
    category: "risk",
    text: "Phân bổ cơ sở có mức độ rủi ro cao theo từng phường/xã trong quận 1",
  },
  {
    id: "q-export-compliance",
    category: "export",
    text: "Tỷ lệ lô hàng xuất khẩu đạt chuẩn chứng nhận ATTP trong 6 tháng gần nhất",
  },
];

export default function SuggestedQuestions({
  onSelect,
}: {
  onSelect: (text: string, id: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("analyze");

  return (
    <div className="mt-4 sm:mt-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <Sparkles size={16} className="text-brand-500" />
          <span>Gợi ý câu hỏi</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
        <div className="flex items-center gap-1.5 bg-gray-100/80 dark:bg-gray-800/80 p-1 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeCategory === cat.id
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {suggestions
          .filter((s) => s.category === activeCategory)
          .map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.text, s.id)}
              className="group text-left p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-md hover:shadow-brand-500/5 transition-all flex items-start gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400 dark:bg-brand-500 group-hover:scale-125 transition-transform mt-1.5 shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {s.text}
              </p>
            </button>
          ))}
      </div>
    </div>
  );
}
