"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Header() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <header className={`fixed top-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-end px-3 sm:px-6 z-20 transition-all duration-300 ${
      isCollapsed ? "left-0" : "left-0 lg:left-60"
    }`}>
      {/* Left - Mobile Logo only */}
      <div className="absolute left-2 sm:left-4 flex items-center">
        <Link href="/dashboard" className="lg:hidden">
          <Image src="/media/logo.svg" alt="NDATrace" width={100} height={28} priority />
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Sidebar Toggle — right side, with "Danh mục" label on mobile */}
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-1.5 px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          title={isCollapsed ? "Hiện menu" : "Ẩn menu"}
        >
          <Menu size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="lg:hidden text-xs font-semibold text-gray-500 dark:text-gray-400">Danh mục</span>
        </button>

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
