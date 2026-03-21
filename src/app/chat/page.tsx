"use client";

import { useState } from "react";
import { Send, User, Bot, MoreVertical, Copy, ThumbsUp, ThumbsDown, BarChart2, Loader2, CheckCircle2 } from "lucide-react";

type TextEvent = {
  id: string;
  type: "text";
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

type ProgressEvent = {
  id: string;
  type: "progress";
  label: string;
  status: "running" | "done";
  createdAt: Date;
};

type ChartEvent = {
  id: string;
  type: "chart";
  title: string;
  description?: string;
  createdAt: Date;
};

type MessageEvent = TextEvent | ProgressEvent | ChartEvent;

const initialEvents: MessageEvent[] = [
  {
    id: "1",
    type: "text",
    role: "assistant",
    content: "Xin chào! Tôi là trợ lý AI LLM. Tôi có thể giúp bạn với các tác vụ như trả lời câu hỏi, tạo nội dung, phân tích dữ liệu, và rất nhiều khả năng khác. Bạn muốn bắt đầu từ đâu?",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    type: "text",
    role: "user",
    content: "Phân tích dữ liệu doanh thu tháng 3 cho tôi.",
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: "3",
    type: "progress",
    label: "Đang truy xuất dữ liệu doanh thu...",
    status: "done",
    createdAt: new Date(Date.now() - 1799000),
  },
  {
    id: "4",
    type: "progress",
    label: "Đang phân tích xu hướng...",
    status: "done",
    createdAt: new Date(Date.now() - 1798000),
  },
  {
    id: "5",
    type: "text",
    role: "assistant",
    content: "Doanh thu tháng 3 đạt **2.4 tỷ VNĐ**, tăng 18% so với tháng trước. Phân khúc doanh nghiệp đóng góp 67% tổng doanh thu. Biểu đồ chi tiết theo từng đối tác bên dưới.",
    createdAt: new Date(Date.now() - 1797000),
  },
  {
    id: "6",
    type: "chart",
    title: "Doanh thu theo đối tác – Tháng 3/2026",
    description: "Xem báo cáo đầy đủ tại trang Báo cáo & Insights",
    createdAt: new Date(Date.now() - 1796000),
  },
];

function ProgressRow({ event }: { event: ProgressEvent }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
      {event.status === "running" ? (
        <Loader2 size={14} className="animate-spin text-brand-500 shrink-0" />
      ) : (
        <CheckCircle2 size={14} className="text-green-500 shrink-0" />
      )}
      <span className={event.status === "done" ? "line-through opacity-60" : ""}>{event.label}</span>
    </div>
  );
}

function ChartCard({ event }: { event: ChartEvent }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <BarChart2 size={16} className="text-brand-500 shrink-0" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{event.title}</span>
      </div>
      {/* Chart placeholder */}
      <div className="px-4 py-8 flex flex-col items-center justify-center gap-3">
        <div className="flex items-end gap-2 h-20">
          {[55, 80, 45, 95, 60, 75, 40].map((h, i) => (
            <div
              key={i}
              className="w-6 rounded-t bg-brand-400 dark:bg-brand-500 opacity-80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">{event.description}</p>
      </div>
    </div>
  );
}

function TextBubble({ event }: { event: TextEvent }) {
  const isUser = event.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white">
            <Bot size={18} />
          </div>
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "order-1" : ""}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? "bg-brand-600 text-white rounded-br-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
          }`}
        >
          {event.content}
        </div>
        {!isUser && (
          <div className="flex items-center gap-1 mt-1.5">
            {[Copy, ThumbsUp, ThumbsDown, MoreVertical].map((Icon, i) => (
              <button
                key={i}
                className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
              >
                <Icon size={13} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </button>
            ))}
          </div>
        )}
        <p className={`text-xs text-gray-400 mt-1 ${isUser ? "text-right" : "text-left"}`}>
          {event.createdAt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 order-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white">
            <User size={18} />
          </div>
        </div>
      )}
    </div>
  );
}

function EventRenderer({ event }: { event: MessageEvent }) {
  if (event.type === "progress") return <ProgressRow event={event} />;
  if (event.type === "chart") return <ChartCard event={event} />;
  return <TextBubble event={event} />;
}

export default function Page() {
  const [events, setEvents] = useState<MessageEvent[]>(initialEvents);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userEvent: TextEvent = {
      id: String(Date.now()),
      type: "text",
      role: "user",
      content: inputValue,
      createdAt: new Date(),
    };
    setEvents((prev) => [...prev, userEvent]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Chats</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Đang sử dụng GPT-4</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors">
          Xóa lịch sử
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        {/* Events List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {events.map((event) => (
            <EventRenderer key={event.id} event={event} />
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Nhập tin nhắn... (Shift+Enter để xuống dòng)"
                rows={1}
                className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors placeholder-gray-500 dark:placeholder-gray-400 border border-transparent focus:border-brand-300 dark:focus:border-brand-700 resize-none min-h-[44px] max-h-32"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            >
              <Send size={16} />
              <span>Gửi</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AI LLM có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
          </p>
        </div>
      </div>
    </div>
  );
}
