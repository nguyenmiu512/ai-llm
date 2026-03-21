"use client";

import { useState } from "react";
import { BarChart, LineChart, PieChart, BarChartHorizontal, Maximize2, Save, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change?: string;
  isUp?: boolean;
}

interface AnalysisCardProps {
  title: string;
  stats: StatItem[];
  chartData: any; // Simplified for this prototype
}

export default function AnalysisCard({ title, stats, chartData }: AnalysisCardProps) {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "horizontal">("bar");

  const chartIconMap = [
    { type: "bar", icon: BarChart, label: "Cột" },
    { type: "line", icon: LineChart, label: "Đường" },
    { type: "pie", icon: PieChart, label: "Vòng" },
    { type: "horizontal", icon: BarChartHorizontal, label: "Ngang" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-500" />
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <Maximize2 size={13} />
            <span>Mở rộng</span>
          </button>
          <div className="flex rounded-md overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ml-1">
             <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors border-r border-gray-100 dark:border-gray-700">
               Lưu báo cáo
             </button>
             <button className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
               <ChevronDown size={14} className="text-gray-400" />
             </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Stat Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-1">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                {stat.change && (
                  <span className={`flex items-center text-[10px] font-bold ${stat.isUp ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {stat.isUp ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
                    {stat.change}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5">Toàn bộ</span>
            </div>
          ))}
        </div>

        {/* Chart View */}
        <div>
          {/* Toggles */}
          <div className="flex items-center gap-2 mb-6">
            {chartIconMap.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setChartType(type as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  chartType === type
                    ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 pointer-events-none"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                }`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Actual Chart Placeholder */}
          <div className="h-44 flex items-end justify-between px-2 gap-1.5">
            {[45, 62, 38, 80, 55, 70, 42, 90, 65, 72, 58, 85].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end group">
                <div
                  className={`w-full rounded-t-sm transition-all duration-300 ${
                    chartType === "horizontal" 
                      ? "bg-gray-100 dark:bg-gray-800" 
                      : chartType === "pie" 
                        ? `bg-brand-${(i % 3 + 4)*100} dark:bg-brand-${(i % 3 + 4)*100}/80` 
                        : "bg-brand-500 dark:bg-brand-400"
                  }`}
                  style={{ height: chartType === "pie" ? "30px" : `${h}%` }}
                />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-brand-300 transition-colors" />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 px-2">
            {["T4", "T8", "T12", "T3"].map(m => (
              <span key={m} className="text-[10px] text-gray-400 font-medium">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
