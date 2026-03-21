"use client";

import { useState } from "react";
import { BarChart2, TrendingUp, TrendingDown, Users, Download, Filter, Calendar } from "lucide-react";

const statCards = [
  { label: "Tổng doanh thu", value: "2.4 tỷ", unit: "VNĐ", change: "+18%", up: true },
  { label: "Đối tác hoạt động", value: "47", unit: "đối tác", change: "+3", up: true },
  { label: "Yêu cầu API", value: "1.2M", unit: "lượt", change: "+24%", up: true },
  { label: "Chi phí vận hành", value: "340M", unit: "VNĐ", change: "+5%", up: false },
];

const reportRows = [
  { name: "Công ty Alpha", type: "Doanh nghiệp", requests: "328,400", revenue: "680,000,000", status: "Hoạt động" },
  { name: "Beta Corp", type: "Doanh nghiệp", requests: "245,100", revenue: "490,200,000", status: "Hoạt động" },
  { name: "Startup Gamma", type: "Startup", requests: "102,300", revenue: "204,600,000", status: "Hoạt động" },
  { name: "Delta Solutions", type: "Doanh nghiệp", requests: "98,700", revenue: "197,400,000", status: "Tạm dừng" },
  { name: "Epsilon AI", type: "Startup", requests: "76,500", revenue: "153,000,000", status: "Hoạt động" },
  { name: "Zeta Tech", type: "SME", requests: "54,200", revenue: "108,400,000", status: "Hoạt động" },
  { name: "Eta Systems", type: "SME", requests: "43,800", revenue: "87,600,000", status: "Hoạt động" },
];

const BAR_HEIGHTS = [45, 62, 38, 80, 55, 70, 42, 90, 65, 72, 58, 85];
const BAR_MONTHS = ["T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T1", "T2", "T3"];

export default function BaoCaoPage() {
  const [period, setPeriod] = useState("month");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = typeFilter === "all"
    ? reportRows
    : reportRows.filter((r) => r.type === typeFilter);

  return (
    <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Báo cáo & Insights</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Dữ liệu cập nhật lần cuối: 21/03/2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
          <Download size={15} />
          Xuất báo cáo
        </button>
      </div>

      {/* Period Filter */}
      <div className="flex items-center gap-2">
        <Calendar size={15} className="text-gray-400 shrink-0" />
        {[
          { key: "week", label: "7 ngày" },
          { key: "month", label: "Tháng này" },
          { key: "quarter", label: "Quý này" },
          { key: "year", label: "Năm nay" },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              period === p.key
                ? "bg-brand-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{card.unit}</p>
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                card.up
                  ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  : "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400"
              }`}
            >
              {card.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {card.change}
            </span>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 size={17} className="text-brand-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Doanh thu theo tháng</span>
          </div>
          <span className="text-xs text-gray-400">T4/2025 – T3/2026</span>
        </div>
        {/* Bar chart */}
        <div className="flex items-end justify-between gap-1 h-40 px-2">
          {BAR_HEIGHTS.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full rounded-t-md bg-brand-500 dark:bg-brand-400 opacity-85 hover:opacity-100 transition-opacity"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-gray-400">{BAR_MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Chi tiết theo đối tác</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">({filtered.length} đối tác)</span>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400 shrink-0" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="all">Tất cả loại</option>
              <option value="Doanh nghiệp">Doanh nghiệp</option>
              <option value="Startup">Startup</option>
              <option value="SME">SME</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                {["Đối tác", "Loại", "Yêu cầu API", "Doanh thu (VNĐ)", "Trạng thái"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((row) => (
                <tr key={row.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900 dark:text-white">{row.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-400 tabular-nums">{row.requests}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900 dark:text-white tabular-nums">{row.revenue}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        row.status === "Hoạt động"
                          ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {row.status}
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
