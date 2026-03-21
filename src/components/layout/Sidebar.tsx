"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Plus,
  Settings,
  Database,
  LogOut,
  LayoutDashboard,
  Sparkles,
  FileText,
  Key,
  Palette,
  Bookmark,
  BarChart2
} from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children?: SectionItem[];
}

interface SectionItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  children?: SectionItem[];
}

const sections: Section[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { id: "dashboard", label: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    id: "chats",
    label: "Chats",
    icon: MessageSquare,
    children: [
      { id: "chat", label: "Chat", href: "/chat", icon: MessageSquare },
      { id: "new-chat", label: "Mới", href: "/chat/new", icon: Plus },
      { id: "saved-chats", label: "Đã lưu", href: "/chat/saved", icon: Bookmark },
    ],
  },
  {
    id: "data",
    label: "Dữ liệu",
    icon: Database,
    children: [
      { id: "documents", label: "Tài liệu", href: "/data/documents", icon: FileText },
      { id: "datasets", label: "Bộ dữ liệu", href: "/data/datasets", icon: Database },
    ],
  },
  {
    id: "analytics",
    label: "Phân tích",
    icon: BarChart2,
    children: [
      { id: "bao-cao", label: "Báo cáo & Insights", href: "/bao-cao", icon: BarChart2 },
    ],
  },
  {
    id: "settings",
    label: "Cài đặt",
    icon: Settings,
    children: [
      { id: "api-keys", label: "API Keys", href: "/settings/api-keys", icon: Key },
      { id: "theme", label: "Giao diện", href: "/settings/theme", icon: Palette },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = (id: string) => {
    // Section toggle functionality can be added later if needed
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col transition-all duration-200 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold">
            <Sparkles size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white text-base">AI LLM</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Hệ thống quản lý</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        >
          <div className="flex flex-col gap-1.5 items-center">
            <div className={`w-4 h-0.5 bg-gray-400 rounded-full transition-all ${isCollapsed ? "rotate-90" : ""} group-hover:bg-gray-500 dark:group-hover:bg-gray-300`} />
            <div className={`w-4 h-0.5 bg-gray-400 rounded-full transition-all ${isCollapsed ? "opacity-0" : ""} group-hover:bg-gray-500 dark:group-hover:bg-gray-300`} />
          </div>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {sections.map((section) => (
          <div key={section.id} className="mb-1">
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.children?.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href === "/chat" && pathname.startsWith("/chat")) ||
                  (item.href === "/dashboard" && pathname === "/") ||
                  (item.href === "/dashboard" && pathname === "/dashboard");
                return (
                  <Link
                    key={item.id}
                    href={item.href || "#"}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon && <item.icon size={18} className="shrink-0" />}
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            A
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@ai-llm.vn</p>
            </div>
          )}
        </div>
        <button
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        >
          <LogOut size={18} className="shrink-0 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
          {!isCollapsed && <span className="text-sm font-medium">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
