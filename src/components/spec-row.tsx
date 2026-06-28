import type { LucideIcon } from "lucide-react";

type SpecRowProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  accent?: "green" | "blue" | "purple" | "yellow" | "default";
};

const accentClass: Record<NonNullable<SpecRowProps["accent"]>, string> = {
  green: "text-emerald-400",
  blue: "text-sky-400",
  purple: "text-violet-400",
  yellow: "text-amber-400",
  default: "text-zinc-400",
};

export function SpecRow({ icon: Icon, label, value, sub, accent = "default" }: SpecRowProps) {
  return (
    <div className="flex items-start gap-3 border-t border-white/5 px-1 py-3.5 first:border-t-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
        <Icon className="h-4 w-4 text-zinc-300" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-[10px] font-bold uppercase tracking-widest ${accentClass[accent]}`}>
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
      </div>
    </div>
  );
}
