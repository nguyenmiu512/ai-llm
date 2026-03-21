"use client";

import { useState } from "react";
import { FileText, Upload, Search, Trash2, Download, MoreVertical } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
  status: "ready" | "processing" | "error";
}

export default function DocumentsPage() {
  const [documents] = useState<Document[]>([
    { id: "1", name: "React Hooks Guide.pdf", type: "PDF", size: "2.4 MB", uploadedAt: new Date(Date.now() - 3600000), status: "ready" },
    { id: "2", name: "API Documentation.docx", type: "DOCX", size: "1.1 MB", uploadedAt: new Date(Date.now() - 7200000), status: "ready" },
    { id: "3", name: "Data Analysis.xlsx", type: "XLSX", size: "856 KB", uploadedAt: new Date(Date.now() - 10800000), status: "processing" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "ready":
        return <span className="px-2.5 py-1 text-xs font-medium bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 rounded-md">Sẵn sàng</span>;
      case "processing":
        return <span className="px-2.5 py-1 text-xs font-medium bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400 rounded-md">Đang xử lý</span>;
      case "error":
        return <span className="px-2.5 py-1 text-xs font-medium bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-400 rounded-md">Lỗi</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tài liệu</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quản lý các tài liệu của bạn</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all duration-200 font-medium text-sm">
          <Upload size={18} />
          <span>Tải lên</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Không có tài liệu nào</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Tải lên tài liệu để bắt đầu</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tên tài liệu</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kích thước</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ngày tải lên</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                        <FileText size={20} className="text-brand-600 dark:text-brand-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{doc.type}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{doc.size}</td>
                  <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {doc.uploadedAt.toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all duration-200">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
