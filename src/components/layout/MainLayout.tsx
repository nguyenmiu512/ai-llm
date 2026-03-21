"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <Sidebar />
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? "ml-0" : "ml-60"}`}>
        <Header />
        <div className="pt-16 px-4 py-4 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
