import { Plus, Pencil, CheckCircle2, Inbox } from "lucide-react";
import { PageShell } from "@/components/layout";
import { StatusBadge } from "@/components/status-badge";
import { units, sellRequests, formatPrice } from "@/lib/data";

export default function AdminPage() {
  const available = units.filter((u) => u.status === "available").length;
  const sold = units.filter((u) => u.status === "sold").length;

  return (
    <PageShell>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Gestión</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight">Panel admin</h1>
        <p className="mt-2 text-sm text-zinc-500">Gestiona stock y solicitudes desde el móvil</p>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-2">
        <Stat value={available} label="En stock" />
        <Stat value={sold} label="Vendidos" />
        <Stat value={sellRequests.length} label="Solicitudes" />
      </div>

      <button
        type="button"
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-bold text-black"
      >
        <Plus className="h-4 w-4" />
        Añadir iPhone
      </button>

      <section className="mb-8">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Inventario</h2>
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-zinc-950">
          {units.map((unit, i) => (
            <div
              key={unit.id}
              className={`flex items-start justify-between gap-3 p-4 ${i > 0 ? "border-t border-white/5" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {unit.model} · {unit.condition}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {unit.storage} · Bat. {unit.battery}% · {formatPrice(unit.price)}
                </p>
                <div className="mt-3 flex gap-2">
                  <Action icon={Pencil} label="Editar" />
                  {unit.status !== "sold" && (
                    <Action icon={CheckCircle2} label="Marcar vendido" danger />
                  )}
                </div>
              </div>
              <StatusBadge status={unit.status} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Solicitudes de venta
        </h2>
        <div className="space-y-3">
          {sellRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl border border-white/8 bg-zinc-950 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {req.model} · {req.storage}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Bat. {req.battery}% · {req.condition} · {req.box ? "Con caja" : "Sin caja"} ·{" "}
                    {req.accessories}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">{req.time}</p>
                </div>
                <Inbox className="h-4 w-4 shrink-0 text-zinc-600" />
              </div>
              <div className="mt-3 flex gap-2">
                <Action icon={Inbox} label="Ver fotos" />
                <Action icon={Pencil} label="Responder" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-zinc-950 px-2 py-4 text-center">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-500">{label}</p>
    </div>
  );
}

function Action({
  icon: Icon,
  label,
  danger,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold ${
        danger
          ? "border-red-500/30 text-red-400"
          : "border-white/10 text-zinc-400 hover:text-white"
      }`}
    >
      <span className="inline-flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </span>
    </button>
  );
}
