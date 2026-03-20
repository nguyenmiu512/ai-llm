"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "T1", keHoach: 48, thucHien: 45, viPham: 8 },
  { month: "T2", keHoach: 52, thucHien: 50, viPham: 12 },
  { month: "T3", keHoach: 60, thucHien: 58, viPham: 9 },
  { month: "T4", keHoach: 55, thucHien: 53, viPham: 7 },
  { month: "T5", keHoach: 65, thucHien: 62, viPham: 11 },
  { month: "T6", keHoach: 70, thucHien: 68, viPham: 14 },
  { month: "T7", keHoach: 58, thucHien: 55, viPham: 10 },
  { month: "T8", keHoach: 72, thucHien: 70, viPham: 13 },
  { month: "T9", keHoach: 75, thucHien: 74, viPham: 15 },
  { month: "T10", keHoach: 68, thucHien: 65, viPham: 11 },
  { month: "T11", keHoach: 80, thucHien: 78, viPham: 16 },
  { month: "T12", keHoach: 90, thucHien: 88, viPham: 18 },
];

export default function InspectionPerformanceChart() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">Hiệu suất kiểm tra ATTP theo tháng</h3>
          <p className="text-[13px] text-gray-400 mt-0.5">01 Jan – 31 Dec 2025</p>
        </div>
        <select className="text-[13px] border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 outline-none focus:border-brand-400">
          <option>Năm 2025</option>
          <option>Năm 2024</option>
        </select>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
          <span className="size-2.5 rounded-full bg-brand-500 inline-block" />
          Kế hoạch
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
          <span className="size-2.5 rounded-full bg-green-500 inline-block" />
          Thực hiện
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
          <span className="size-2.5 rounded-full bg-red-400 inline-block" />
          Vi phạm
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }}
            cursor={{ stroke: "#e5e7eb" }}
          />
          <Line type="monotone" dataKey="keHoach" name="Kế hoạch" stroke="#1570ef" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="thucHien" name="Thực hiện" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="viPham" name="Vi phạm" stroke="#f87171" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
