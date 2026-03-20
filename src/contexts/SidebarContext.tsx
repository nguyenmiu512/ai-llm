"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const routesWithoutSidebar = [
  "/quan-tri/doi-tac",
  "/quan-tri/phan-quyen/chi-tiet",
  "/quan-tri/phan-quyen/them-moi",
];

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const shouldCollapse = routesWithoutSidebar.some((route) => pathname.includes(route));
    setIsCollapsed(shouldCollapse);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsCollapsed((v) => !v);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
