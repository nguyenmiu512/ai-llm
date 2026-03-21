"use client";

import { useState } from "react";
import { Database, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  description: string;
  rowCount: number;
  columns: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function DatasetsPage() {
  const [datasets] = useState<Dataset[]>([
    { id: "1", name: "Customer Data", description: "Thông tin khách hàng và lịch sử mua hàng", rowCount: 15420, columns: 12, createdAt: new Date(Date.now() - 86400000), updatedAt: new Date(Date.now() - 3600000) },
    { id: "2", name: "Product Catalog", description: "Danh sách sản phẩm và thông tin kho", rowCount: 8560, columns: 8, createdAt: new Date(Date.now() - 172800000), updatedAt: new Date(Date.now() - 7200000) },
    { id: "3", name: "Sales Transactions", description: "Giao dịch bán hàng hàng tháng", rowCount: 45230, columns: 15, createdAt: new Date(Date.now() - 259200000), updatedAt: new Date(Date.now() - 10800000) },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDatasets = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Bộ dữ liệu</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quản lý các bộ dữ liệu của bạn</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all duration-200 font-medium text-sm">
          <Plus size={18} />
          <span>Tạo mới</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bộ dữ liệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDatasets.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
            <Database size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Không có bộ dữ liệu nào</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Tạo bộ dữ liệu mới để bắt đầu</p>
          </div>
        ) : (
          filteredDatasets.map((dataset) => (
            <div
              key={dataset.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2.5 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                  <Database size={20} className="text-brand-600 dark:text-brand-400" />
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all duration-200">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all duration-200">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{dataset.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{dataset.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Database size={14} className="text-brand-600 dark:text-brand-400" />
                  {dataset.rowCount.toLocaleString()} hàng
                </span>
                <span>{dataset.columns} cột</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-500">Cập nhật: {dataset.updatedAt.toLocaleDateString("vi-VN")}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
