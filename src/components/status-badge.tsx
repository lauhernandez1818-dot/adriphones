import type { UnitStatus } from "@/lib/data";

const styles: Record<UnitStatus, string> = {
  available: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  reserved: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  sold: "border-red-500/40 bg-red-500/10 text-red-400",
};

const labels: Record<UnitStatus, string> = {
  available: "Disponible",
  reserved: "Reservado",
  sold: "Vendido",
};

export function StatusBadge({ status }: { status: UnitStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}
