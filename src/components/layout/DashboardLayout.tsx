"use client";

import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />
      <main className="md:ml-64 min-h-screen pt-0">
        <div className="px-6 py-4">{children}</div>
      </main>
    </div>
  );
}
