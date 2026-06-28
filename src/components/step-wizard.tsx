"use client";

import { Check } from "lucide-react";

type Step = { id: string; label: string };

export function StepWizard({
  steps,
  current,
}: {
  steps: Step[];
  current: number;
}) {
  return (
    <div className="mb-8 flex items-center justify-between px-2">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <div key={step.id} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {index > 0 && (
                <div
                  className={`h-0.5 flex-1 ${done || active ? "bg-[#0071e3]" : "bg-[#d2d2d7]"}`}
                />
              )}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  done
                    ? "bg-[#0071e3] text-white"
                    : active
                      ? "bg-[#0071e3] text-white"
                      : "bg-[#e8e8ed] text-[#86868b]"
                }`}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${done ? "bg-[#0071e3]" : "bg-[#d2d2d7]"}`}
                />
              )}
            </div>
            <span
              className={`mt-2 hidden text-[11px] font-medium sm:block ${
                active || done ? "text-[#0071e3]" : "text-[#86868b]"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
