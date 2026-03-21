"use client";

import { CheckCircle2, Loader2, Bot } from "lucide-react";

export type OverlayState = "thinking" | "streaming" | "done" | "hidden";

interface Step {
  label: string;
  status: "done" | "running" | "pending";
}

interface ProgressOverlayProps {
  state: OverlayState;
  steps: Step[];
}

export default function ProgressOverlay({ state, steps }: ProgressOverlayProps) {
  return (
    <div
      className={`flex gap-4 justify-start transition-all duration-400 ${
        state === "hidden" ? "opacity-0 translate-y-1 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-brand-600 shrink-0 mt-1">
        <Bot size={16} />
      </div>

      <div className="flex flex-col gap-2 max-w-[85%] items-start">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">NDATRACE AI</span>
        </div>

        <div className="bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30 rounded-xl px-5 py-3.5 min-w-[260px]">
          {state === "thinking" && (
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:100ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:200ms]" />
              </div>
              <span className="text-sm font-medium text-brand-700 dark:text-brand-400">Đang suy nghĩ...</span>
            </div>
          )}

          {(state === "streaming" || state === "done" || state === "hidden") && steps.length > 0 && (
            <div className="space-y-2.5">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {step.status === "done" ? (
                    <CheckCircle2 size={15} className="text-green-500 shrink-0" />
                  ) : step.status === "running" ? (
                    <Loader2 size={15} className="text-brand-500 animate-spin shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 dark:border-gray-600 shrink-0" />
                  )}
                  <span
                    className={
                      step.status === "done"
                        ? "text-gray-600 dark:text-gray-400"
                        : step.status === "running"
                        ? "text-brand-700 dark:text-brand-300 font-medium"
                        : "text-gray-400 dark:text-gray-600"
                    }
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
