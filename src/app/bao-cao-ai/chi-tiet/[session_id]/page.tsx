"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend,
} from "recharts";
import {
  ArrowLeft, Download, TrendingUp, TrendingDown, RefreshCw, X, Filter,
  LayoutDashboard, BarChart2, Table2, Sparkles, Search,
  AlertTriangle, CheckCircle2, Lightbulb, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { getSession, ReportSession } from "@/lib/report-store";

// ── Mock data ──────────────────────────────────────────────────────────────────
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
const LOAI_HINH_DATA = [
  { name: "Nhà hàng / quán ăn", value: 34 },
  { name: "Cơ sở sản xuất", value: 28 },
  { name: "Cửa hàng bán lẻ", value: 19 },
  { name: "Siêu thị / chợ", value: 12 },
  { name: "Khác", value: 7 },
];
const TABLE_DATA = [
  { id: "VP001", coSo: "Nhà hàng Phở Việt", loaiHinh: "Nhà hàng", loai: "Truy xuất nguồn gốc", quan: "Quận 1", phuong: "P. Bến Nghé", muc: "Cao", ngay: "15/01/2026", trangThai: "Đã xử lý" },
  { id: "VP002", coSo: "Cơ sở sản xuất Minh Tâm", loaiHinh: "Cơ sở SX", loai: "Tem nhãn", quan: "Quận 1", phuong: "P. Bến Thành", muc: "Trung bình", ngay: "18/01/2026", trangThai: "Đang xử lý" },
  { id: "VP003", coSo: "Siêu thị Mini Hoa Sen", loaiHinh: "Siêu thị", loai: "An toàn thực phẩm", quan: "Quận 1", phuong: "P. Đa Kao", muc: "Cao", ngay: "22/01/2026", trangThai: "Đã xử lý" },
  { id: "VP004", coSo: "Quán ăn Bà Năm", loaiHinh: "Nhà hàng", loai: "Truy xuất nguồn gốc", quan: "Quận 1", phuong: "P. Tân Định", muc: "Thấp", ngay: "03/02/2026", trangThai: "Chờ xử lý" },
  { id: "VP005", coSo: "Cửa hàng Thực phẩm Xanh", loaiHinh: "Cửa hàng", loai: "Tem nhãn", quan: "Quận 1", phuong: "P. Cô Giang", muc: "Trung bình", ngay: "07/02/2026", trangThai: "Đã xử lý" },
  { id: "VP006", coSo: "Nhà máy Rau sạch ABC", loaiHinh: "Cơ sở SX", loai: "An toàn thực phẩm", quan: "Quận 1", phuong: "P. Phạm Ngũ Lão", muc: "Cao", ngay: "12/02/2026", trangThai: "Đang xử lý" },
  { id: "VP007", coSo: "Lò bánh mì Hoàng Yến", loaiHinh: "Cơ sở SX", loai: "Truy xuất nguồn gốc", quan: "Quận 1", phuong: "P. Bến Nghé", muc: "Thấp", ngay: "19/02/2026", trangThai: "Đã xử lý" },
  { id: "VP008", coSo: "Quán cà phê Sài Gòn Xưa", loaiHinh: "Nhà hàng", loai: "Khác", quan: "Quận 1", phuong: "P. Cầu Ông Lãnh", muc: "Thấp", ngay: "25/02/2026", trangThai: "Đã xử lý" },
  { id: "VP009", coSo: "Xưởng chế biến Mỹ Hương", loaiHinh: "Cơ sở SX", loai: "An toàn thực phẩm", quan: "Quận 1", phuong: "P. Nguyễn Thái Bình", muc: "Cao", ngay: "02/03/2026", trangThai: "Đang xử lý" },
  { id: "VP010", coSo: "Đại lý thực phẩm Bình An", loaiHinh: "Cửa hàng", loai: "Tem nhãn", quan: "Quận 1", phuong: "P. Đa Kao", muc: "Trung bình", ngay: "08/03/2026", trangThai: "Chờ xử lý" },
];

const TOOLTIP_STYLE = { borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: 12 };

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

function BarTopLabel(props: any) {
  const { x, y, width, value } = props;
  return (
    <text x={x + width / 2} y={y - 4} fill="#6b7280" fontSize={11} textAnchor="middle" fontWeight={500}>{value}</text>
  );
}

function exportCSV() {
  const header = ["ID", "Cơ sở", "Loại hình", "Loại vi phạm", "Quận", "Phường/Xã", "Mức độ", "Ngày", "Trạng thái"];
  const rows = TABLE_DATA.map((r) => [r.id, r.coSo, r.loaiHinh, r.loai, r.quan, r.phuong, r.muc, r.ngay, r.trangThai]);
  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "bao-cao-vi-pham.csv"; a.click();
  URL.revokeObjectURL(url);
}

// ── Filter Group ───────────────────────────────────────────────────────────────
function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      {children}
    </div>
  );
}

// ── Filter Panel ───────────────────────────────────────────────────────────────
function FilterPanel({ onReset, onClose }: { onReset: () => void; onClose?: () => void }) {
  return (
    <aside className="w-full sm:w-[300px] shrink-0 h-full overflow-y-auto bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 shrink-0">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-brand-500" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Bộ lọc</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
            <RefreshCw size={10} /> Đặt lại
          </button>
          {onClose && (
            <button onClick={onClose} className="sm:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">

        {/* Time range */}
        <FilterGroup label="Thời gian">
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Từ ngày</label>
              <input type="date" defaultValue="2026-01-01"
                className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Đến ngày</label>
              <input type="date" defaultValue="2026-03-31"
                className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors" />
            </div>
          </div>
        </FilterGroup>

        {/* Quận/huyện */}
        <FilterGroup label="Quận/huyện">
          <select className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors">
            <option>Tất cả quận/huyện</option>
            <option>Quận 1</option>
            <option>Quận 3</option>
            <option>Quận 5</option>
            <option>Quận 10</option>
            <option>Bình Thạnh</option>
            <option>Tân Bình</option>
          </select>
        </FilterGroup>

        {/* Loại vi phạm */}
        <FilterGroup label="Loại vi phạm">
          <div className="space-y-2">
            {["Truy xuất nguồn gốc", "Tem nhãn", "An toàn thực phẩm", "Giấy phép kinh doanh", "Khác"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-brand-600 w-3.5 h-3.5 rounded" />
                <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Mức độ vi phạm */}
        <FilterGroup label="Mức độ vi phạm">
          <div className="space-y-2">
            {[
              { label: "Cao", color: "bg-red-400" },
              { label: "Trung bình", color: "bg-amber-400" },
              { label: "Thấp", color: "bg-blue-400" },
            ].map(({ label, color }) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-brand-600 w-3.5 h-3.5 rounded" />
                <span className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Trạng thái xử lý */}
        <FilterGroup label="Trạng thái xử lý">
          <div className="space-y-2">
            {["Đã xử lý", "Đang xử lý", "Chờ xử lý"].map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-brand-600 w-3.5 h-3.5 rounded" />
                <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">{s}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Loại hình cơ sở */}
        <FilterGroup label="Loại hình cơ sở">
          <div className="space-y-2">
            {["Nhà hàng / quán ăn", "Cơ sở sản xuất", "Cửa hàng bán lẻ", "Siêu thị / chợ", "Khác"].map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-brand-600 w-3.5 h-3.5 rounded" />
                <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">{s}</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      </div>

      {/* Apply */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
        <button className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-brand-600/20">
          Áp dụng bộ lọc
        </button>
      </div>
    </aside>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────────
type TabId = "overview" | "detail" | "table" | "insight";
const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "overview", label: "Tổng quan",          icon: LayoutDashboard },
  { id: "detail",   label: "Phân tích chi tiết", icon: BarChart2 },
  { id: "table",    label: "Bảng dữ liệu",       icon: Table2 },
  { id: "insight",  label: "Insight AI",         icon: Sparkles },
];

// ── Tab: Tổng quan ─────────────────────────────────────────────────────────────
function TabOverview({ session }: { session: ReportSession }) {
  return (
    <div className="space-y-5">
      {/* Query banner */}
      <div className="bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30 rounded-xl px-4 py-3">
        <p className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide mb-0.5">Câu hỏi phân tích</p>
        <p className="text-xs sm:text-sm text-brand-800 dark:text-brand-300 font-medium">{session.query}</p>
      </div>

      {/* KPI grid */}
      <div className={`grid gap-px bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden ${session.stats.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {session.stats.map((stat, i) => (
          <div key={i} className="flex flex-col p-4 sm:p-5 bg-white dark:bg-gray-900">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-1 truncate">{stat.label}</span>
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{stat.value}</span>
              {stat.change && (
                <span className={`flex items-center text-xs font-bold ${stat.isUp ? "text-green-600" : "text-red-500"}`}>
                  {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400 mt-1">So với cùng kỳ</span>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line trend */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Xu hướng vi phạm theo tháng</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
              <Line type="monotone" dataKey="value" name="Năm nay" stroke="#1570ef" strokeWidth={2.5} dot={{ r: 3, fill: "#1570ef" }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="prev" name="Năm trước" stroke="#93c5fd" strokeWidth={2} strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Phân loại theo nhóm vi phạm</p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={65} dataKey="value" labelLine={false}>
                    {PIE_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => [`${v}%`, "Tỷ lệ"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full space-y-2">
              {PIE_DATA.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-white shrink-0">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Phân tích chi tiết ────────────────────────────────────────────────────
function TabDetail() {
  return (
    <div className="space-y-5">
      {/* Bar by ward */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Phân bổ vi phạm theo phường/xã</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={WARD_DATA} margin={{ top: 20, right: 8, left: -24, bottom: 44 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="phuong" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={52} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#f3f4f6" }} formatter={(v: any) => [v, "Vi phạm"]} />
            <Bar dataKey="value" name="Vi phạm" fill="#1570ef" radius={[4, 4, 0, 0]}>
              <LabelList content={<BarTopLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Two charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Horizontal bar by loại hình */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Vi phạm theo loại hình cơ sở</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={LOAI_HINH_DATA} layout="vertical" margin={{ top: 4, right: 40, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} width={90} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#f3f4f6" }} />
              <Bar dataKey="value" name="Vi phạm" fill="#60a5fa" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="value" position="right" style={{ fontSize: 11, fill: "#6b7280", fontWeight: 500 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie by loại hình */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">Tỷ lệ xử lý vi phạm</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={[{ name: "Đã xử lý", value: 68 }, { name: "Đang xử lý", value: 19 }, { name: "Chờ xử lý", value: 13 }]}
                  cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                  dataKey="value" labelLine={false}
                >
                  {["#22c55e", "#f59e0b", "#d1d5db"].map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {[
                { label: "Đã xử lý", value: "68%", color: "bg-green-500" },
                { label: "Đang xử lý", value: "19%", color: "bg-amber-400" },
                { label: "Chờ xử lý", value: "13%", color: "bg-gray-300" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">So sánh theo quý</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Chỉ số", "Q1/2025", "Q4/2025", "Q1/2026", "Thay đổi"].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { chi: "Tổng vi phạm", q1_25: "2,315", q4_25: "2,489", q1_26: "2,661", up: true, change: "+6.9%" },
                { chi: "Tỷ lệ xử lý", q1_25: "83.1%", q4_25: "84.6%", q1_26: "87.4%", up: true, change: "+2.8%" },
                { chi: "Thời gian TB (ngày)", q1_25: "6.2", q4_25: "5.2", q1_26: "4.1", up: true, change: "-1.1" },
                { chi: "Cơ sở bị đình chỉ", q1_25: "18", q4_25: "22", q1_26: "12", up: false, change: "-45.5%" },
              ].map((row) => (
                <tr key={row.chi} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20">
                  <td className="px-3 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-300">{row.chi}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{row.q1_25}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{row.q4_25}</td>
                  <td className="px-3 py-2.5 text-xs font-semibold text-gray-800 dark:text-gray-200">{row.q1_26}</td>
                  <td className="px-3 py-2.5">
                    <span className={`flex items-center gap-0.5 text-xs font-bold ${row.up ? "text-green-600" : "text-red-500"}`}>
                      {row.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Bảng dữ liệu ─────────────────────────────────────────────────────────
function TabTable() {
  const [search, setSearch] = useState("");
  const filtered = TABLE_DATA.filter((r) =>
    [r.coSo, r.loai, r.phuong, r.muc, r.trangThai].some((v) =>
      v.toLowerCase().includes(search.toLowerCase())
    )
  );
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
      {/* Table toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm vi phạm..."
            className="pl-8 pr-4 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-brand-400 transition-colors w-full sm:w-56"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{filtered.length} kết quả</span>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
            <Download size={13} /> Xuất CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[620px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              {["ID", "Cơ sở", "Loại hình", "Loại vi phạm", "Phường/Xã", "Mức độ", "Ngày", "Trạng thái"].map((h) => (
                <th key={h} className="text-left px-3 sm:px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id} className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30 dark:bg-gray-900/20" : ""}`}>
                <td className="px-3 sm:px-4 py-2.5 text-xs font-mono text-gray-400">{row.id}</td>
                <td className="px-3 sm:px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-gray-200 max-w-[150px] truncate">{row.coSo}</td>
                <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-500 whitespace-nowrap">{row.loaiHinh}</td>
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
        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-gray-400">Không tìm thấy kết quả phù hợp</div>
        )}
      </div>
    </div>
  );
}

// ── Tab: Insight AI ────────────────────────────────────────────────────────────
function TabInsight({ session }: { session: ReportSession }) {
  return (
    <div className="space-y-4">
      {/* AI summary */}
      <div className="bg-gradient-to-br from-brand-50 to-violet-50 dark:from-brand-900/10 dark:to-violet-900/10 border border-brand-100 dark:border-brand-900/30 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center shrink-0 shadow-lg shadow-brand-600/20">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wide mb-1.5">Tóm tắt từ AI</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{session.summary}</p>
          </div>
        </div>
      </div>

      {/* Key findings */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={15} className="text-amber-500" />
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Phát hiện chính</p>
        </div>
        <div className="space-y-3">
          {[
            { text: "Vi phạm truy xuất nguồn gốc chiếm tỷ lệ cao nhất (38.7%), tập trung chủ yếu vào tháng 2. Xu hướng này lặp lại so với cùng kỳ năm 2025.", type: "warning" },
            { text: "Tỷ lệ xử lý vi phạm đạt 87.4%, cải thiện 2.8% so với Q4/2025. Thời gian xử lý trung bình giảm xuống còn 4.1 ngày.", type: "success" },
            { text: "P. Phạm Ngũ Lão ghi nhận số vi phạm cao nhất (91 trường hợp), vượt 23.5% so với mức trung bình toàn quận.", type: "warning" },
            { text: "Nhóm nhà hàng/quán ăn chiếm 34% tổng vi phạm — nhóm có tỷ lệ tái phạm cao nhất trong 3 quý liên tiếp.", type: "info" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              {item.type === "warning" && <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />}
              {item.type === "success" && <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />}
              {item.type === "info" && <Lightbulb size={14} className="text-blue-500 shrink-0 mt-0.5" />}
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk alerts */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={15} className="text-red-500" />
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Cảnh báo rủi ro</p>
        </div>
        <div className="space-y-2.5">
          {[
            { coSo: "Cơ sở sản xuất Minh Tâm", risk: "Cao", reason: "Vi phạm tem nhãn lần 2 trong 6 tháng" },
            { coSo: "Nhà máy Rau sạch ABC", risk: "Cao", reason: "Chưa cập nhật chứng nhận ATTP — hết hạn 28/03/2026" },
            { coSo: "Xưởng chế biến Mỹ Hương", risk: "Cao", reason: "Đang xử lý vi phạm ATTP, chưa khắc phục sau 21 ngày" },
          ].map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-3 px-3 py-2.5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{item.coSo}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.reason}</p>
              </div>
              <span className="shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">{item.risk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 size={15} className="text-brand-500" />
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Khuyến nghị</p>
        </div>
        <ol className="space-y-2.5">
          {[
            "Tăng tần suất kiểm tra tại P. Phạm Ngũ Lão và P. Bến Nghé — hai phường có số vi phạm cao nhất.",
            "Tổ chức tập huấn chuyên đề về truy xuất nguồn gốc cho nhóm nhà hàng/quán ăn trong tháng 4/2026.",
            "Ưu tiên xử lý dứt điểm 3 cơ sở rủi ro cao chưa khắc phục để giảm nguy cơ tái phạm.",
            "Triển khai hệ thống cảnh báo tự động khi chứng nhận ATTP sắp hết hạn (trước 30 ngày).",
          ].map((rec, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{rec}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params?.session_id as string;
  const [session, setSession] = useState<ReportSession | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [filterOpen, setFilterOpen] = useState(false);

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
        <header className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shrink-0 z-10">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button onClick={() => router.back()} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0">
              <ArrowLeft size={16} className="text-gray-500" />
            </button>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight truncate">{session.title}</h1>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{session.timestamp} · ID: {session.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterOpen(true)}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"
            >
              <Filter size={13} /> Lọc
            </button>
            <button onClick={exportCSV} className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-sm">
              <Download size={13} />
              <span className="hidden sm:inline">Xuất tất cả</span>
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* Mobile backdrop */}
          {filterOpen && (
            <div className="fixed inset-0 bg-black/40 z-30 sm:hidden" onClick={() => setFilterOpen(false)} />
          )}

          {/* Filter panel — always visible on desktop, drawer on mobile */}
          <div className={`
            fixed sm:relative inset-y-0 left-0 z-40 sm:z-auto
            sm:flex sm:translate-x-0
            transition-transform duration-300
            ${filterOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          `}>
            <FilterPanel onReset={() => {}} onClose={() => setFilterOpen(false)} />
          </div>

          {/* Right: tabs + content */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50 dark:bg-gray-950 overflow-hidden">

            {/* Tab bar */}
            <div className="flex items-center gap-1 px-3 sm:px-5 pt-3 sm:pt-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0 overflow-x-auto">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold rounded-t-lg whitespace-nowrap border-b-2 transition-all -mb-px ${
                    activeTab === id
                      ? "border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-900/10"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5">
              {activeTab === "overview"  && <TabOverview session={session} />}
              {activeTab === "detail"    && <TabDetail />}
              {activeTab === "table"     && <TabTable />}
              {activeTab === "insight"   && <TabInsight session={session} />}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
