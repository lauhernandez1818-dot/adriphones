import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { iPhoneUnit } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { StatusBadge } from "./status-badge";

export function PhoneCard({ unit }: { unit: iPhoneUnit }) {
  const sold = unit.status === "sold";

  return (
    <Link
      href={`/iphone/${unit.id}`}
      className={`group block overflow-hidden rounded-2xl border border-white/8 bg-zinc-950 transition hover:border-white/15 hover:bg-zinc-900/80 ${sold ? "opacity-50" : ""}`}
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12)_0%,_transparent_70%)]" />
        <PhoneSilhouette color={unit.color} />
        {unit.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
            Nuevo
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-bold tracking-tight">{unit.model}</h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              {unit.condition} · {unit.storage} · {unit.color}
            </p>
            <p className="mt-1 text-xs text-zinc-600">Bat. {unit.battery}%</p>
          </div>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-white" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <StatusBadge status={unit.status} />
          <span className="text-lg font-black tracking-tight">{formatPrice(unit.price)}</span>
        </div>
      </div>
    </Link>
  );
}

function PhoneSilhouette({ color }: { color: string }) {
  const fill =
    color.toLowerCase().includes("blanco") || color.toLowerCase().includes("white")
      ? "#f4f4f5"
      : color.toLowerCase().includes("titanio")
        ? "#a1a1aa"
        : color.toLowerCase().includes("medianoche") || color.toLowerCase().includes("negro")
          ? "#27272a"
          : "#71717a";

  return (
    <div
      className="relative h-32 w-16 rounded-[1.4rem] border border-white/10 shadow-2xl shadow-black/50"
      style={{ background: `linear-gradient(145deg, ${fill}, ${fill}dd)` }}
    >
      <div className="absolute left-1/2 top-2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-black/20" />
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
        <div className="h-2.5 w-2.5 rounded-full bg-black/25" />
        <div className="h-2.5 w-2.5 rounded-full bg-black/25" />
        <div className="h-2.5 w-2.5 rounded-full bg-black/25" />
      </div>
    </div>
  );
}
