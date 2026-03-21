"use client";

import { Bell, Search, HelpCircle } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end px-6 z-20 transition-colors">
      {/* Left - Search */}
      <div className="absolute left-6 flex items-center gap-3">
        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-64 pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-transparent focus:border-brand-300 dark:focus:border-brand-700 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-brand-500/20 transition-all outline-none placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Help */}
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
          <HelpCircle size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
        </button>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
          <Bell size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-error-500 rounded-full border-2 border-white dark:border-gray-950" />
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

        <UserMenu />
      </div>
    </header>
  );
}
