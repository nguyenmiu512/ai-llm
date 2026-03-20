"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextType {
  isCollapsed: boolean;
  isMobile: boolean;
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
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and set initial collapsed state
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-collapse on specific routes
  useEffect(() => {
    if (routesWithoutSidebar.some((route) => pathname.includes(route))) {
      setIsCollapsed(true);
    } else if (!isMobile) {
      setIsCollapsed(false);
    }
  }, [pathname, isMobile]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) setIsCollapsed(true);
  }, [pathname, isMobile]);

  const toggleSidebar = () => setIsCollapsed((v) => !v);

  return (
    <SidebarContext.Provider value={{ isCollapsed, isMobile, toggleSidebar }}>
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
