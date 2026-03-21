"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LabelList, Legend,
} from "recharts";
import {
  ArrowLeft, Download, Filter, CalendarDays, TrendingUp, TrendingDown,
  ChevronDown, ChevronUp, RefreshCw, X,
} from "lucide-react";
import { getSession, ReportSession } from "@/lib/report-store";

// ── Mock data ─────────────────────────────────────────────────────────────────
const MONTHLY = [
  { month: "T1", value: 45, prev: 38 }, { month: "T2", value: 62, prev: 54 },
  { month: "T3", value: 38, prev: 42 }, { month: "T4", value: 80, prev: 66 },
  { month: "T5", value: 55, prev: 48 }, { month: "T6", value: 70, prev: 61 },
  { month: "T7", value: 42, prev: 37 }, { month: "T8", value: 90, prev: 75 },
  { month: "T9", value: 65, prev: 58 }, { month: "T10", value: 72, prev: 64 },
  { month: "T11", value: 58, prev: 52 }, { month: "T12", value: 85, prev: 71 },
];

const PIE_DATA = [
  { name: "Truy xuất nguồn gốc", value: 38.7 },
  { name: "Tem nhãn", value: 24.3 },
  { name: "An toàn thực phẩm", value: 19.8 },
  { name: "Khác", value: 17.2 },
];
const PIE_COLORS = ["#1570ef", "#60a5fa", "#93c5fd", "#bfdbfe"];

const WARD_DATA = [
  { phuong: "P. Bến Nghé", value: 87 }, { phuong: "P. Bến Thành", value: 73 },
  { phuong: "P. Phạm Ngũ Lão", value: 91 }, { phuong: "P. Đa Kao", value: 64 },
  { phuong: "P. Cầu Ông Lãnh", value: 56 }, { phuong: "P. Nguyễn Thái Bình", value: 48 },
  { phuong: "P. Tân Định", value: 45 }, { phuong: "P. Cô Giang", value: 38 },
];

const TABLE_DATA = [
  { id: "VP001", coSo: "Nhà hàng Phở Việt", loai: "Truy xuất nguồn gốc", phuong: "P. Bến Nghé", muc: "Cao", ngay: "15/01/2026", trangThai: "Đã xử lý" },
  { id: "VP002", coSo: "Cơ sở sản xuất Minh Tâm", loai: "Tem nhãn", phuong: "P. Bến Thành", muc: "Trung bình", ngay: "18/01/2026", trangThai: "Đang xử lý" },
  { id: "VP003", coSo: "Siêu thị Mini Hoa Sen", loai: "An toàn thực phẩm", phuong: "P. Đa Kao", muc: "Cao", ngay: "22/01/2026", trangThai: "Đã xử lý" },
  { id: "VP004", coSo: "Quán ăn Bà Năm", loai: "Truy xuất nguồn gốc", phuong: "P. Tân Định", muc: "Thấp", ngay: "03/02/2026", trangThai: "Chờ xử lý" },
  { id: "VP005", coSo: "Cửa hàng Thực phẩm Xanh", loai: "Tem nhãn", phuong: "P. Cô Giang", muc: "Trung bình", ngay: "07/02/2026", trangThai: "Đã xử lý" },
  { id: "VP006", coSo: "Nhà máy Rau sạch ABC", loai: "An toàn thực phẩm", phuong: "P. Phạm Ngũ Lão", muc: "Cao", ngay: "12/02/2026", trangThai: "Đang xử lý" },
  { id: "VP007", coSo: "Lò bánh mì Hoàng Yến", loai: "Truy xuất nguồn gốc", phuong: "P. Bến Nghé", muc: "Thấp", ngay: "19/02/2026", trangThai: "Đã xử lý" },
  { id: "VP008", coSo: "Quán cà phê Sài Gòn Xưa", loai: "Khác", phuong: "P. Cầu Ông Lãnh", muc: "Thấp", ngay: "25/02/2026", trangThai: "Đã xử lý" },
  { id: "VP009", coSo: "Xưởng chế biến Mỹ Hương", loai: "An toàn thực phẩm", phuong: "P. Nguyễn Thái Bình", muc: "Cao", ngay: "02/03/2026", trangThai: "Đang xử lý" },
  { id: "VP010", coSo: "Đại lý thực phẩm Bình An", loai: "Tem nhãn", phuong: "P. Đa Kao", muc: "Trung bình", ngay: "08/03/2026", trangThai: "Chờ xử lý" },
];

const TOOLTIP_STYLE = { borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: 12 };

function BarTopLabel(props: any) {
  const { x, y, width, value } = props;
  return (
    <text x={x + width / 2} y={y - 4} fill="#6b7280" fontSize={11} textAnchor="middle" fontWeight={500}>
      {value}
    </text>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({
  title, children, onExport, defaultOpen = true,
}: {
  title: string; children: React.ReactNode; onExport?: () => void; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{title}</h3>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <Download size={12} />
              <span className="hidden sm:inline">Xuất</span>
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
          </button>
        </div>
      </div>
      {open && <div className="overflow-auto max-h-[420px]">{children}</div>}
    </div>
  );
}

// ── Filter Panel — sidebar on desktop, drawer on mobile ───────────────────────
function FilterPanel({ onReset, onClose }: { onReset: () => void; onClose: () => void }) {
  return (
    <aside className="w-full sm:w-60 lg:w-64 shrink-0 h-full overflow-y-auto bg-white sm:bg-gray-50/30 dark:bg-gray-900 sm:dark:bg-gray-900/20 border-r border-gray-100 dark:border-gray-800">
      <div className="p-4 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Bộ lọc</span>
          <div className="flex items-center gap-2">
            <button onClick={onReset} className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              <RefreshCw size={10} /> Đặt lại
            </button>
            <button onClick={onClose} className="sm:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
              <X size={14} />
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Khoảng thời gian</p>
          <select className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors">
            <option>Q1/2026 (01/01 – 31/03)</option>
            <option>Q4/2025 (01/10 – 31/12)</option>
            <option>Q3/2025 (01/07 – 30/09)</option>
            <option>Tùy chỉnh...</option>
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Loại vi phạm</p>
          <div className="space-y-2">
            {["Truy xuất nguồn gốc", "Tem nhãn", "An toàn thực phẩm", "Khác"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-brand-600 w-3.5 h-3.5" />
                <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Mức độ rủi ro</p>
          <div className="space-y-2">
            {["Cao", "Trung bình", "Thấp"].map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="risk" defaultChecked={level === "Cao"} className="accent-brand-600 w-3.5 h-3.5" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Khu vực</p>
          <select className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors">
            <option>Tất cả phường/xã</option>
            <option>P. Bến Nghé</option>
            <option>P. Bến Thành</option>
            <option>P. Phạm Ngũ Lão</option>
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Trạng thái</p>
          <div className="space-y-2">
            {["Đã xử lý", "Đang xử lý", "Chờ xử lý"].map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-brand-600 w-3.5 h-3.5" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{s}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors">
          Áp dụng bộ lọc
        </button>
      </div>
    </aside>
  );
}

// ── Status / Risk badges ───────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, string> = {
  "Đã xử lý": "bg-green-50 text-green-700 border-green-100",
  "Đang xử lý": "bg-amber-50 text-amber-700 border-amber-100",
  "Chờ xử lý": "bg-gray-100 text-gray-600 border-gray-200",
};
const RISK_STYLE: Record<string, string> = {
  "Cao": "bg-red-50 text-red-700 border-red-100",
  "Trung bình": "bg-amber-50 text-amber-700 border-amber-100",
  "Thấp": "bg-blue-50 text-blue-700 border-blue-100",
};

function exportCSV() {
  const header = ["ID", "Cơ sở", "Loại vi phạm", "Phường/Xã", "Mức độ", "Ngày", "Trạng thái"];
  const rows = TABLE_DATA.map((r) => [r.id, r.coSo, r.loai, r.phuong, r.muc, r.ngay, r.trangThai]);
  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "bao-cao-vi-pham.csv"; a.click();
  URL.revokeObjectURL(url);
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params?.session_id as string;
  const [session, setSession] = useState<ReportSession | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    setSession(getSession(sessionId));
  }, [sessionId]);

  if (!session) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p className="text-sm font-medium">Không tìm thấy báo cáo</p>
          <button onClick={() => router.back()} className="mt-3 text-xs text-brand-600 hover:underline">Quay lại</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="-m-3 sm:-m-5 lg:-m-6 flex flex-col h-[calc(100dvh-64px)]">

        {/* Page header */}
        <header className="flex items-center justify-between gap-2 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shrink-0 z-10">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => router.back()}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
            >
              <ArrowLeft size={16} className="text-gray-500" />
            </button>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight truncate">{session.title}</h1>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{session.timestamp} · ID: {session.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => setFilterVisible(!filterVisible)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
                filterVisible
                  ? "bg-brand-50 text-brand-600 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400"
                  : "text-gray-600 border-gray-200 hover:bg-gray-50 dark:text-gray-400 dark:border-gray-700"
              }`}
            >
              <Filter size={13} />
              <span className="hidden sm:inline">Bộ lọc</span>
            </button>
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <CalendarDays size={13} />
              Q1/2026
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-sm"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Xuất tất cả</span>
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* Mobile backdrop */}
          {filterVisible && (
            <div
              className="fixed inset-0 bg-black/40 z-30 sm:hidden"
              onClick={() => setFilterVisible(false)}
            />
          )}

          {/* Filter panel — drawer on mobile, sidebar on desktop */}
          {filterVisible && (
            <div className={`
              fixed sm:relative inset-y-0 left-0 z-40 sm:z-auto
              h-full
              transition-transform duration-300
            `}>
              <FilterPanel onReset={() => {}} onClose={() => setFilterVisible(false)} />
            </div>
          )}

          {/* Main scrollable content */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 bg-gray-50/50 dark:bg-gray-950">

            {/* Context query */}
            <div className="bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30 rounded-xl px-4 sm:px-5 py-3">
              <p className="text-xs font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wide mb-0.5">Câu hỏi phân tích</p>
              <p className="text-xs sm:text-sm text-brand-800 dark:text-brand-300 font-medium">{session.query}</p>
            </div>

            {/* KPI overview */}
            <Section title="Tổng quan chỉ số" onExport={() => {}}>
              <div className={`grid gap-px bg-gray-100 dark:bg-gray-800 ${session.stats.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                {session.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col p-3 sm:p-6 bg-white dark:bg-gray-900">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-1 truncate">{stat.label}</span>
                    <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                      <span className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{stat.value}</span>
                      {stat.change && (
                        <span className={`flex items-center text-xs font-bold ${stat.isUp ? "text-green-600" : "text-red-500"}`}>
                          {stat.isUp ? <TrendingUp size={11} className="mr-0.5" /> : <TrendingDown size={11} className="mr-0.5" />}
                          {stat.change}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 mt-1 hidden sm:block">So với cùng kỳ</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Line chart — trend */}
            <Section title="Xu hướng vi phạm theo tháng" onExport={() => {}}>
              <div className="p-3 sm:p-5">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={MONTHLY} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                    <Line type="monotone" dataKey="value" name="Năm nay" stroke="#1570ef" strokeWidth={2.5} dot={{ r: 3, fill: "#1570ef" }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="prev" name="Năm trước" stroke="#93c5fd" strokeWidth={2} strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Section>

            {/* Bar chart — by ward */}
            <Section title="Phân bổ vi phạm theo phường/xã" onExport={() => {}}>
              <div className="p-3 sm:p-5">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={WARD_DATA} margin={{ top: 20, right: 8, left: -24, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="phuong" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#f3f4f6" }} formatter={(v: any) => [v, "Vi phạm"]} />
                    <Bar dataKey="value" name="Vi phạm" fill="#1570ef" radius={[4, 4, 0, 0]}>
                      <LabelList content={<BarTopLabel />} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Section>

            {/* Pie chart — by type */}
            <Section title="Phân loại theo nhóm vi phạm" onExport={() => {}}>
              <div className="p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                  <div className="w-full sm:w-[55%]">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={80} dataKey="value" labelLine={false}>
                          {PIE_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                        </Pie>
                        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => [`${v}%`, "Tỷ lệ"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 w-full space-y-2 sm:space-y-3">
                    {PIE_DATA.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                          <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 w-16 sm:w-24 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: PIE_COLORS[i] }} />
                          </div>
                          <span className="text-xs font-bold text-gray-900 dark:text-white w-9 text-right">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Data table */}
            <Section title="Chi tiết vi phạm" onExport={exportCSV}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[580px]">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
                      {["ID", "Cơ sở", "Loại vi phạm", "Phường/Xã", "Mức độ", "Ngày", "Trạng thái"].map((h) => (
                        <th key={h} className="text-left px-3 sm:px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_DATA.map((row, i) => (
                      <tr key={row.id} className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30 dark:bg-gray-900/20" : ""}`}>
                        <td className="px-3 sm:px-4 py-2.5 text-xs font-mono text-gray-400">{row.id}</td>
                        <td className="px-3 sm:px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-gray-200 max-w-[140px] truncate">{row.coSo}</td>
                        <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{row.loai}</td>
                        <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{row.phuong}</td>
                        <td className="px-3 sm:px-4 py-2.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${RISK_STYLE[row.muc] ?? ""}`}>{row.muc}</span>
                        </td>
                        <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-500 whitespace-nowrap">{row.ngay}</td>
                        <td className="px-3 sm:px-4 py-2.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLE[row.trangThai] ?? ""}`}>{row.trangThai}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
