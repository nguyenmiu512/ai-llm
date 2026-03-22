"use client";

import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LabelList, Legend,
  // Legend kept for line chart comparison
} from "recharts";
import {
  BarChart2, TrendingUp as LineIcon, PieChart as PieIcon, AlignLeft,
  ChevronDown, TrendingUp, TrendingDown,
  Bookmark, Share2, MoreHorizontal, ArrowRight,
} from "lucide-react";
import Link from "next/link";

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
  sessionId?: string;
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

// ── Number formatter ──────────────────────────────────────────────────────────
function formatValue(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " tỷ";
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
  if (n >= 10_000)        return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  if (!Number.isInteger(n)) return n.toFixed(1); // keep decimal point (not Vietnamese comma)
  return n.toLocaleString("vi-VN");
}

// ── Bar top label — only renders when bar is wide enough ─────────────────────
function BarTopLabel(props: any) {
  const { x, y, width, value } = props;
  if (width < 28) return null; // skip label when bar too narrow
  return (
    <text x={x + width / 2} y={y - 4} fill="#6b7280" fontSize={10} textAnchor="middle" fontWeight={500}>
      {formatValue(Number(value))}
    </text>
  );
}

// ── Chart panel ───────────────────────────────────────────────────────────────
function ChartPanel({ type, height = 200, data }: { type: ChartType; height?: number; data: DataPoint[] }) {
  const hasComparison = data.some((d) => d.prev !== undefined && d.prev !== 0);
  const manyBars = data.length > 7;

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: manyBars ? 6 : 20, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: manyBars ? 9 : 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={manyBars ? -30 : 0}
            textAnchor={manyBars ? "end" : "middle"}
            height={manyBars ? 36 : 20}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatValue(v)}
            width={manyBars ? 40 : 32}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#f3f4f6" }} formatter={(v: any) => [formatValue(Number(v)), "Giá trị"]} />
          <Bar dataKey="value" name="Giá trị" fill="#1570ef" radius={[4, 4, 0, 0]}>
            {!manyBars && <LabelList content={<BarTopLabel />} />}
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
          <XAxis
            dataKey="label"
            tick={{ fontSize: data.length > 9 ? 9 : 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            interval={data.length > 12 ? 1 : 0}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatValue(v)}
            width={40}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: "#e5e7eb" }} formatter={(v: any) => [formatValue(Number(v))]} />
          {hasComparison && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />}
          <Line type="monotone" dataKey="value" name="Kỳ này" stroke="#1570ef" strokeWidth={2.5}
            dot={data.length > 12 ? false : { r: 3, fill: "#1570ef" }} activeDot={{ r: 5 }} />
          {hasComparison && (
            <Line type="monotone" dataKey="prev" name="Kỳ trước" stroke="#93c5fd" strokeWidth={2}
              strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "pie") {
    const total = data.reduce((s, d) => s + d.value, 0);
    const pieData = data.map((d) => ({ name: d.label, value: d.value }));
    const manySlices = pieData.length > 5;
    return (
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <ResponsiveContainer width="100%" height={manySlices ? 160 : height}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={manySlices ? 65 : height / 2 - 30}
              dataKey="value"
              labelLine={false}
            >
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(v: any, name: any) => [
                `${formatValue(Number(v))} (${total > 0 ? ((Number(v) / total) * 100).toFixed(1) : 0}%)`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Legend list — always readable, no overlap */}
        <div className={`w-full sm:w-auto space-y-1.5 ${manySlices ? "sm:max-w-[160px]" : ""}`}>
          {pieData.map((item, i) => {
            const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
            return (
              <div key={i} className="flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-white shrink-0">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // horizontal
  const rowH = Math.max(32, Math.min(48, Math.floor((height * 1.4) / data.length)));
  const maxLabelLen = Math.max(...data.map((d) => d.label.length));
  const yAxisW = Math.min(120, Math.max(70, maxLabelLen * 6));
  return (
    <ResponsiveContainer width="100%" height={Math.max(height, data.length * rowH)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 48, left: 4, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => formatValue(v)}
        />
        <YAxis
          dataKey="label"
          type="category"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          width={yAxisW}
        />
        <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#f3f4f6" }} formatter={(v: any) => [formatValue(Number(v)), "Giá trị"]} />
        <Bar dataKey="value" name="Giá trị" fill="#1570ef" radius={[0, 4, 4, 0]}>
          <LabelList dataKey="value" position="right" formatter={(v: any) => formatValue(Number(v))} style={{ fontSize: 11, fill: "#6b7280", fontWeight: 500 }} />
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
export default function ResultCard({ title, stats, defaultChartType = "bar", chartData, sessionId }: ResultCardProps) {
  const [chartType, setChartType] = useState<ChartType>(defaultChartType);

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
            {sessionId && (
              <Link
                href={`/bao-cao-ai/chi-tiet/${sessionId}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 rounded-lg text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
              >
                <span>Báo cáo nâng cao</span>
                <ArrowRight size={12} />
              </Link>
            )}
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
          {/* KPI — stacked rows on mobile, grid on sm+ */}
          <div className="mb-4 sm:mb-6">
            {/* Mobile: label left / value+change right */}
            <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800 sm:hidden">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-tight leading-snug">{stat.label}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{stat.value}</span>
                    {stat.change && (
                      <span className={`flex items-center text-xs font-bold ${stat.isUp ? "text-green-600 dark:text-green-400" : stat.isUp === false ? "text-red-500 dark:text-red-400" : "text-gray-400"}`}>
                        {stat.isUp === true && <TrendingUp size={10} className="mr-0.5" />}
                        {stat.isUp === false && <TrendingDown size={10} className="mr-0.5" />}
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: grid */}
            <div className={`hidden sm:grid gap-6 ${stats.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-0.5 truncate">{stat.label}</span>
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{stat.value}</span>
                    {stat.change && (
                      <span className={`flex items-center text-xs font-bold ${stat.isUp ? "text-green-600 dark:text-green-400" : stat.isUp === false ? "text-red-500 dark:text-red-400" : "text-gray-400"}`}>
                        {stat.isUp === true && <TrendingUp size={10} className="mr-0.5" />}
                        {stat.isUp === false && <TrendingDown size={10} className="mr-0.5" />}
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

          <ChartPanel type={chartType} height={chartType === "pie" ? 180 : 200} data={data} />
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-1 px-3 sm:px-4 pb-3 sm:pb-4">
          <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Bookmark size={14} className="text-gray-400" /></button>
          <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Share2 size={14} className="text-gray-400" /></button>
          <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><MoreHorizontal size={14} className="text-gray-400" /></button>
        </div>
      </div>

    </>
  );
}
