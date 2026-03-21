"use client";

import { ReactNode } from "react";
import { Plus } from "lucide-react";

interface SectionPageProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

export default function SectionPage({ title, children, actionButton }: SectionPageProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Minimal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-[19px] font-semibold text-gray-900 dark:text-white">{title}</h1>
        <div className="flex items-center gap-2">
          {actionButton}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
