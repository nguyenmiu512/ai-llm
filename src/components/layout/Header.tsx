"use client";

import { Bell, Menu } from "lucide-react";
import UserMenu from "./UserMenu";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Header() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <header className={`fixed top-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-end px-3 sm:px-6 z-20 transition-all duration-300 ${
      isCollapsed ? "left-0" : "left-0 lg:left-60"
    }`}>
      {/* Left - Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute left-2 sm:left-4 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        title={isCollapsed ? "Hiện menu" : "Ẩn menu"}
      >
        <Menu size={18} className="text-gray-500 dark:text-gray-400" />
      </button>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Bell size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
