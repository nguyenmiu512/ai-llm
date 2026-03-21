"use client";

import { useState } from "react";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import type { Theme } from "@/lib/theme-context";

export default function ThemePage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "light" as Theme, name: "Sáng", icon: Sun, description: "Giao diện sáng, dễ đọc" },
    { id: "dark" as Theme, name: "Tối", icon: Moon, description: "Giao diện tối, bảo vệ mắt" },
    { id: "system" as Theme, name: "Hệ thống", icon: Monitor, description: "Theo cài đặt hệ thống" },
  ];

  const accentColors = [
    { id: "brand", name: "Brand Blue", color: "bg-brand-500" },
    { id: "indigo", name: "Indigo", color: "bg-indigo-500" },
    { id: "purple", name: "Purple", color: "bg-purple-500" },
    { id: "rose", name: "Rose", color: "bg-rose-500" },
    { id: "emerald", name: "Emerald", color: "bg-emerald-500" },
  ];

  const [selectedColor, setSelectedColor] = useState("brand");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Giao diện</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tùy chỉnh giao diện theo sở thích của bạn</p>
      </div>

      {/* Theme Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chế độ giao diện</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-5 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon size={24} className={isSelected ? "text-brand-600 dark:text-brand-400" : "text-gray-400"} />
                  <span className={`font-semibold ${isSelected ? "text-brand-600 dark:text-brand-400" : "text-gray-900 dark:text-white"}`}>
                    {t.name}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Palette size={20} className="text-brand-600 dark:text-brand-400" />
          Màu chủ đạo
        </h2>
        <div className="flex flex-wrap gap-3">
          {accentColors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                selectedColor === color.id
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <div className={`w-6 h-6 rounded-full ${color.color} ring-2 ring-offset-2 ring-transparent group-hover:ring-gray-200 dark:group-hover:ring-gray-700 transition-all ${selectedColor === color.id ? "ring-brand-500" : ""}`} />
              <span className={`font-medium ${selectedColor === color.id ? "text-brand-600 dark:text-brand-400" : "text-gray-900 dark:text-white"}`}>
                {color.name}
              </span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Chọn màu sẽ áp dụng cho các thành phần chính như nút, liên kết và biểu tượng.
        </p>
      </div>

      {/* Preview Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Xem trước</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-all duration-200 font-medium text-sm">
              Nút chính
            </button>
            <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-sm">
              Nút phụ
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-brand-500" />
            <span>Dây dẫn màu chủ đạo</span>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Ví dụ văn bản trong hộp nền mờ hơn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
