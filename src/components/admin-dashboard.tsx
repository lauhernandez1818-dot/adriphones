import { Plus, Pencil, CheckCircle2, Inbox, LogOut, ShieldCheck } from "lucide-react";
import { adminLogout } from "@/app/admin/actions";
import { PageShell, Card, PrimaryButton } from "@/components/layout";
import { units, sellRequests, formatPrice } from "@/lib/data";

export function AdminDashboard() {
  const available = units.filter((u) => u.status === "available").length;
  const sold = units.filter((u) => u.status === "sold").length;

  return (
    <PageShell admin>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Panel admin</h1>
          <p className="mt-2 text-sm text-muted">Gestiona stock y solicitudes de venta</p>
        </div>
        <form action={adminLogout}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted transition hover:border-red-500/40 hover:text-red-500"
          >
            <LogOut className="h-3.5 w-3.5" />
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        Sesión protegida · Solo personal autorizado
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <Stat value={available} label="En stock" accent="emerald" />
        <Stat value={sold} label="Vendidos" accent="red" />
        <Stat value={sellRequests.length} label="Solicitudes" accent="amber" />
      </div>

      <PrimaryButton className="mb-6 inline-flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Añadir iPhone
      </PrimaryButton>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
          Inventario
        </h2>
        <Card className="!p-0 divide-y divide-border">
          {units.map((unit) => (
            <div key={unit.id} className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="font-semibold">
                  {unit.model} · {unit.condition}
                </p>
                <p className="mt-1 text-sm text-muted">
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
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : unit.status === "sold"
                      ? "bg-red-500/15 text-red-600 dark:text-red-400"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}
              >
                {unit.status === "available" ? "Disponible" : unit.status === "sold" ? "Vendido" : "Reservado"}
              </span>
            </div>
          ))}
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
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
                  <p className="mt-1 text-sm text-muted">
                    Bat. {req.battery}% · {req.condition}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {req.box ? "Con caja" : "Sin caja"} ·{" "}
                    {req.charger ? "Con cargador" : "Sin cargador"} ·{" "}
                    {req.invoice ? "Con factura" : "Sin factura"} · {req.time}
                  </p>
                </div>
                <Inbox className="h-4 w-4 shrink-0 text-muted" />
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

function Stat({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent: "emerald" | "red" | "amber";
}) {
  const colors = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    red: "text-red-600 dark:text-red-400",
    amber: "text-amber-600 dark:text-amber-400",
  };

  return (
    <Card className="!p-4 text-center">
      <p className={`text-2xl font-bold ${colors[accent]}`}>{value}</p>
      <p className="mt-1 text-xs font-medium text-muted">{label}</p>
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
          ? "bg-accent/10 text-accent"
          : "bg-background text-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}
