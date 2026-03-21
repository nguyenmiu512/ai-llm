"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";

interface Step {
  label: string;
  status: "done" | "running" | "pending";
}

interface AIAnalysisStepsProps {
  steps: Step[];
  defaultOpen?: boolean;
}

export default function AIAnalysisSteps({ steps, defaultOpen = false }: AIAnalysisStepsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const doneCount = steps.filter((s) => s.status === "done").length;

  return (
    <div className="bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-brand-700 dark:text-brand-400 hover:bg-brand-100/50 dark:hover:bg-brand-900/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {steps.slice(0, 3).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-brand-400 border border-white dark:border-gray-900" />
            ))}
          </div>
          <span>AI đã phân tích ({steps.length} bước)</span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 space-y-2.5">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              {step.status === "done" ? (
                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              ) : step.status === "running" ? (
                <Loader2 size={16} className="text-brand-500 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
              )}
              <span className={step.status === "done" ? "text-gray-600 dark:text-gray-400" : "text-gray-900 dark:text-gray-100 font-medium"}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
