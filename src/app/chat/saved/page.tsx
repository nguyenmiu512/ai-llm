"use client";

import { useState } from "react";
import { Search, Trash2, Clock, MessageSquare } from "lucide-react";

interface SavedChat {
  id: string;
  title: string;
  model: string;
  createdAt: Date;
  messageCount: number;
}

export default function SavedChatsPage() {
  const [savedChats] = useState<SavedChat[]>([
    { id: "1", title: "Hỏi về React hooks", model: "GPT-4", createdAt: new Date(Date.now() - 86400000), messageCount: 12 },
    { id: "2", title: "Tài liệu phân tích dữ liệu", model: "Claude 3.5 Sonnet", createdAt: new Date(Date.now() - 172800000), messageCount: 8 },
    { id: "3", title: "Review code TypeScript", model: "GPT-4 Turbo", createdAt: new Date(Date.now() - 259200000), messageCount: 24 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = savedChats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cuộc hội thoại đã lưu</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quản lý các cuộc hội thoại đã lưu của bạn</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cuộc hội thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="space-y-3">
        {filteredChats.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
            <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Không tìm thấy cuộc hội thoại nào</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Thử tìm kiếm với từ khóa khác</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {chat.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-brand-600 dark:text-brand-400" />
                      {chat.createdAt.toLocaleDateString("vi-VN")}
                    </span>
                    <span className="px-2 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-md text-xs font-medium">
                      {chat.model}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {chat.messageCount} tin nhắn
                    </span>
                  </div>
                </div>
                <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
