"use client";

import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LabelList, Legend,
} from "recharts";
import {
  BarChart2, TrendingUp as LineIcon, PieChart as PieIcon, AlignLeft,
  Maximize2, X, ChevronDown, TrendingUp, TrendingDown,
  Bookmark, Share2, MoreHorizontal, Download, Filter, CalendarDays,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface StatItem {
  label: string;
  value: string;
  change?: string;
  isUp?: boolean;
}

export interface DataPoint {
  label: string;
  value: number;
  prev?: number;
}

export type ChartType = "bar" | "line" | "pie" | "horizontal";

interface ResultCardProps {
  title: string;
  stats: StatItem[];
  defaultChartType?: ChartType;
  chartData?: DataPoint[];
}

// ── Default fallback data ─────────────────────────────────────────────────────
const FALLBACK_DATA: DataPoint[] = [
  { label: "T1", value: 45, prev: 38 }, { label: "T2", value: 62, prev: 54 },
  { label: "T3", value: 38, prev: 42 }, { label: "T4", value: 80, prev: 66 },
  { label: "T5", value: 55, prev: 48 }, { label: "T6", value: 70, prev: 61 },
];

const PIE_COLORS = ["#1570ef", "#60a5fa", "#93c5fd", "#bfdbfe", "#1d4ed8", "#a5b4fc"];

const TOOLTIP_STYLE = {
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: 12,
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
};

// ── Bar top label ─────────────────────────────────────────────────────────────
function BarTopLabel(props: any) {
  const { x, y, width, value } = props;
  return (
    <text x={x + width / 2} y={y - 4} fill="#6b7280" fontSize={11} textAnchor="middle" fontWeight={500}>
      {value}
    </text>
  );
}

// ── Chart panel ───────────────────────────────────────────────────────────────
function ChartPanel({ type, height = 200, data }: { type: ChartType; height?: number; data: DataPoint[] }) {
  const hasComparison = data.some((d) => d.prev !== undefined && d.prev !== 0);

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#f3f4f6" }} />
          <Bar dataKey="value" name="Giá trị" fill="#1570ef" radius={[4, 4, 0, 0]}>
            <LabelList content={<BarTopLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: "#e5e7eb" }} />
          {hasComparison && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />}
          <Line type="monotone" dataKey="value" name="Kỳ này" stroke="#1570ef" strokeWidth={2.5}
            dot={{ r: 3, fill: "#1570ef" }} activeDot={{ r: 5 }} />
          {hasComparison && (
            <Line type="monotone" dataKey="prev" name="Kỳ trước" stroke="#93c5fd" strokeWidth={2}
              strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "pie") {
    const pieData = data.map((d) => ({ name: d.label, value: d.value }));
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="45%"
            outerRadius={height / 2 - 36}
            dataKey="value"
            labelLine={false}
          >
            {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any, name: any) => [v, name]} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
            formatter={(value, entry: any) =>
              `${value} (${entry.payload?.percent !== undefined ? (entry.payload.percent * 100).toFixed(1) : ""}%)`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // horizontal
  return (
    <ResponsiveContainer width="100%" height={Math.max(height, data.length * 38)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 40, left: 4, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
        <YAxis
          dataKey="label"
          type="category"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          width={80}
        />
        <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#f3f4f6" }} />
        <Bar dataKey="value" name="Giá trị" fill="#1570ef" radius={[0, 4, 4, 0]}>
          <LabelList dataKey="value" position="right" style={{ fontSize: 11, fill: "#6b7280", fontWeight: 500 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Chart type tabs ───────────────────────────────────────────────────────────
const CHART_TABS: { type: ChartType; icon: any; label: string }[] = [
  { type: "bar",        icon: BarChart2, label: "Cột" },
  { type: "line",       icon: LineIcon,  label: "Đường" },
  { type: "pie",        icon: PieIcon,   label: "Vòng" },
  { type: "horizontal", icon: AlignLeft, label: "Ngang" },
];

// ── ResultCard ────────────────────────────────────────────────────────────────
export default function ResultCard({ title, stats, defaultChartType = "bar", chartData }: ResultCardProps) {
  const [chartType, setChartType] = useState<ChartType>(defaultChartType);
  const [advanced, setAdvanced] = useState(false);

  const data = chartData ?? FALLBACK_DATA;

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">

        {/* Header — wraps to two rows on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setAdvanced(true)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-md transition-colors"
            >
              <Maximize2 size={13} /><span>Mở rộng</span>
            </button>
            <div className="flex rounded-md overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ml-1">
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors border-r border-gray-100 dark:border-gray-700">
                Lưu báo cáo
              </button>
              <button className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-5">
          {/* KPI Grid — 2 cols on mobile if 3 stats, else 3 */}
          <div className={`grid gap-2 sm:gap-6 mb-4 sm:mb-6 ${stats.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-0.5 truncate">{stat.label}</span>
                <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                  <span className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{stat.value}</span>
                  {stat.change && (
                    <span className={`flex items-center text-xs font-bold ${stat.isUp ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                      {stat.isUp ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Type Toggle — wraps on mobile */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
            {CHART_TABS.map(({ type, icon: Icon, label }) => (
              <button key={type} onClick={() => setChartType(type)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all ${
                  chartType === type
                    ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                }`}>
                <Icon size={13} /><span>{label}</span>
              </button>
            ))}
          </div>

          <ChartPanel type={chartType} height={200} data={data} />
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-1 px-3 sm:px-4 pb-3 sm:pb-4">
          <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Bookmark size={14} className="text-gray-400" /></button>
          <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Share2 size={14} className="text-gray-400" /></button>
          <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><MoreHorizontal size={14} className="text-gray-400" /></button>
        </div>
      </div>

      {/* Advanced View Modal */}
      {advanced && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAdvanced(false)} />
          <div className="relative w-full sm:max-w-5xl max-h-[92dvh] sm:max-h-[90vh] bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-start justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
              <div className="flex items-center gap-2 min-w-0 mr-2">
                <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">{title}</h2>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <CalendarDays size={13} /> Q1/2026
                </button>
                <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Filter size={13} /> Bộ lọc
                </button>
                <button className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20 rounded-lg hover:bg-brand-100 transition-colors">
                  <Download size={13} />
                  <span className="hidden sm:inline">Xuất PNG</span>
                </button>
                <button onClick={() => setAdvanced(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-4 sm:p-6">
              {/* KPI row */}
              <div className={`grid gap-3 sm:gap-8 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100 dark:border-gray-800 ${stats.length <= 2 ? "grid-cols-2" : "grid-cols-3 sm:flex sm:items-center"}`}>
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-tight mb-0.5 truncate">{stat.label}</span>
                    <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5">
                      <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                      {stat.change && (
                        <span className={`flex items-center text-xs font-bold ${stat.isUp ? "text-green-600" : "text-red-500"}`}>
                          {stat.isUp ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart type tabs */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-4 sm:mb-5">
                {CHART_TABS.map(({ type, icon: Icon, label }) => (
                  <button key={type} onClick={() => setChartType(type)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all ${
                      chartType === type
                        ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                    }`}>
                    <Icon size={13} /><span>{label}</span>
                  </button>
                ))}
              </div>

              <ChartPanel type={chartType} height={280} data={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
