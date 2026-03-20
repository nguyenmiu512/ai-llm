"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <InnerLayout children={children} />
    </SidebarProvider>
  );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Sidebar />
      <Header />
      <main className={`pt-16 transition-all duration-300 ${isCollapsed ? "ml-0" : "ml-0 lg:ml-60"}`}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
