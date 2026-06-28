import { Plus, Pencil, CheckCircle2, Inbox } from "lucide-react";
import { PageShell, PageTitle, Card, PrimaryButton } from "@/components/layout";
import { units, sellRequests, formatPrice } from "@/lib/data";

export default function AdminPage() {
  const available = units.filter((u) => u.status === "available").length;
  const sold = units.filter((u) => u.status === "sold").length;

  return (
    <PageShell admin>
      <PageTitle title="Panel admin" subtitle="Gestiona stock y solicitudes" />

      <div className="mb-6 grid grid-cols-3 gap-3">
        <Stat value={available} label="En stock" />
        <Stat value={sold} label="Vendidos" />
        <Stat value={sellRequests.length} label="Solicitudes" />
      </div>

      <PrimaryButton className="mb-6 inline-flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Añadir iPhone
      </PrimaryButton>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#86868b]">
          Inventario
        </h2>
        <Card className="!p-0 divide-y divide-[#d2d2d7]/60">
          {units.map((unit) => (
            <div key={unit.id} className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="font-semibold">
                  {unit.model} · {unit.condition}
                </p>
                <p className="mt-1 text-sm text-[#86868b]">
                  {unit.storage} · Bat. {unit.battery}% · {formatPrice(unit.price)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Action icon={Pencil} label="Editar" />
                  {unit.status !== "sold" && (
                    <Action icon={CheckCircle2} label="Marcar vendido" primary />
                  )}
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                  unit.status === "available"
                    ? "bg-emerald-100 text-emerald-700"
                    : unit.status === "sold"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                }`}
              >
                {unit.status === "available" ? "Disponible" : unit.status === "sold" ? "Vendido" : "Reservado"}
              </span>
            </div>
          ))}
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#86868b]">
          Solicitudes de venta
        </h2>
        <div className="space-y-3">
          {sellRequests.map((req) => (
            <Card key={req.id} className="!p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {req.model} · {req.storage}
                  </p>
                  <p className="mt-1 text-sm text-[#86868b]">
                    Bat. {req.battery}% · {req.condition}
                  </p>
                  <p className="mt-1 text-xs text-[#86868b]">
                    {req.box ? "Con caja" : "Sin caja"} ·{" "}
                    {req.charger ? "Con cargador" : "Sin cargador"} ·{" "}
                    {req.invoice ? "Con factura" : "Sin factura"} · {req.time}
                  </p>
                </div>
                <Inbox className="h-4 w-4 shrink-0 text-[#86868b]" />
              </div>
              <div className="mt-3 flex gap-2">
                <Action icon={Inbox} label="Ver fotos" />
                <Action icon={Pencil} label="Responder" primary />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <Card className="!p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs font-medium text-[#86868b]">{label}</p>
    </Card>
  );
}

function Action({
  icon: Icon,
  label,
  primary,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold ${
        primary
          ? "bg-[#0071e3]/10 text-[#0071e3]"
          : "bg-[#f5f5f7] text-[#86868b] hover:text-[#1d1d1f]"
      }`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}
