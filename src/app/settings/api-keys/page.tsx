"use client";

import { useState } from "react";
import { Key, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed: Date | null;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: "1", name: "Production API", key: "sk-proj-xxxxxxxxxxxxx", createdAt: new Date(Date.now() - 86400000 * 7), lastUsed: new Date(Date.now() - 3600000) },
    { id: "2", name: "Development API", key: "sk-proj-yyyyyyyyyyyyy", createdAt: new Date(Date.now() - 86400000 * 3), lastUsed: new Date(Date.now() - 7200000) },
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const deleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  const maskedKey = (key: string, show: boolean) => {
    if (show) return key;
    return `${key.slice(0, 9)}${"•".repeat(15)}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">API Keys</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quản lý các khóa API của bạn</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all duration-200 font-medium text-sm">
          <Plus size={18} />
          <span>Tạo khóa mới</span>
        </button>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
            <Key size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Chưa có khóa API nào</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Tạo khóa để bắt đầu sử dụng API</p>
          </div>
        ) : (
          apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2.5 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                      <Key size={20} className="text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{apiKey.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Đã tạo: {apiKey.createdAt.toLocaleDateString("vi-VN")}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between gap-3">
                    <code className="text-sm font-mono text-gray-900 dark:text-gray-100 truncate flex-1">
                      {maskedKey(apiKey.key, showKeys[apiKey.id] || false)}
                    </code>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => copyKey(apiKey.key, apiKey.id)}
                        className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all duration-200 group"
                        title={copiedKey === apiKey.id ? "Đã sao chép!" : "Sao chép"}
                      >
                        <Copy size={16} className="group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                        title={showKeys[apiKey.id] ? "Ẩn" : "Hiện"}
                      >
                        {showKeys[apiKey.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {apiKey.lastUsed && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Sử dụng lần cuối: {apiKey.lastUsed.toLocaleDateString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteKey(apiKey.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 shrink-0"
                  title="Xóa"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Warning Box */}
      <div className="mt-6 p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-xl">
        <p className="text-sm text-warning-800 dark:text-warning-300">
          <strong>Lưu ý:</strong> Không bao giờ chia sẻ API keys của bạn với người khác. Các key này cấp quyền truy cập vào tài khoản của bạn.
        </p>
      </div>
    </div>
  );
}
