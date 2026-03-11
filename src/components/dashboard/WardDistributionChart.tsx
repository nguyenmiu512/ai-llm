"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { phuong: "P. Bến Nghé", coSo: 87 },
  { phuong: "P. Bến Thành", coSo: 73 },
  { phuong: "P. Phạm Ngũ Lão", coSo: 91 },
  { phuong: "P. Đa Kao", coSo: 64 },
  { phuong: "P. Cầu Ông Lãnh", coSo: 56 },
  { phuong: "P. Nguyễn Thái Bình", coSo: 48 },
  { phuong: "P. Tân Định", coSo: 45 },
  { phuong: "P. Cô Giang", coSo: 38 },
];

export default function WardDistributionChart() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">Phân bổ cơ sở theo phường/xã</h3>
          <p className="text-[13px] text-gray-400 mt-0.5">Top 8 phường/xã có nhiều cơ sở nhất</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="phuong"
            tick={{ fontSize: 9, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={45}
          />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }}
            cursor={{ fill: "#f3f4f6" }}
            formatter={(value: any) => [`${value} cơ sở`, "Số cơ sở"]}
          />
          <Bar dataKey="coSo" name="Cơ sở" fill="#1570ef" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
