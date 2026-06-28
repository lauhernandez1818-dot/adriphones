import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Battery,
  HardDrive,
  Palette,
  ShieldCheck,
  Unlock,
  Package,
  Sparkles,
  MessageCircle,
  CreditCard,
} from "lucide-react";
import { PageShell } from "@/components/layout";
import { SpecRow } from "@/components/spec-row";
import { StatusBadge } from "@/components/status-badge";
import { formatPrice, getUnit } from "@/lib/data";

export default async function iPhoneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const unit = getUnit(id);
  if (!unit) notFound();

  const canBuy = unit.status === "available";

  return (
    <PageShell>
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inventario
      </Link>

      <article className="overflow-hidden rounded-3xl border border-white/8 bg-zinc-950">
        <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-zinc-900 via-black to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(96,165,250,0.15)_0%,_transparent_65%)]" />
          <div
            className="relative h-40 w-20 rounded-[1.75rem] border border-white/10 shadow-2xl"
            style={{
              background:
                unit.color.toLowerCase().includes("blanco")
                  ? "linear-gradient(160deg, #fafafa, #d4d4d8)"
                  : "linear-gradient(160deg, #71717a, #3f3f46)",
            }}
          >
            <div className="absolute left-1/2 top-2.5 h-2 w-9 -translate-x-1/2 rounded-full bg-black/15" />
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-black/20" />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 pt-5 text-center">
          <h1 className="text-xl font-black tracking-tight">
            {unit.model} {unit.condition}
          </h1>
          {unit.warranty && (
            <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              ({unit.warranty})
            </p>
          )}
        </div>

        <div className="border-t border-white/5 px-5">
          <SpecRow icon={Battery} label="Batería" value={`${unit.battery}%`} accent="green" />
          <SpecRow icon={HardDrive} label="Almacenamiento" value={unit.storage} accent="blue" />
          <SpecRow icon={Palette} label="Color" value={unit.color} accent="purple" />
          <SpecRow
            icon={ShieldCheck}
            label="100% Original"
            value={unit.original}
          />
          <SpecRow icon={Unlock} label="Libre de iCloud y SIM" value={unit.unlock} />
          <SpecRow icon={Package} label="Incluye" value={unit.includes} />
          <SpecRow icon={Sparkles} label="Estado" value={unit.estado} accent="yellow" />
        </div>

        <div className="border-t border-white/5 px-5 py-5">
          <div className="flex items-center justify-center">
            <StatusBadge status={unit.status} />
          </div>
          <p className="mt-4 text-center text-3xl font-black tracking-tight">
            {formatPrice(unit.price)}
          </p>

          {canBuy ? (
            <>
              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-black transition hover:bg-zinc-100"
              >
                <CreditCard className="h-4 w-4" />
                Comprar / Reservar
              </button>
              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-4 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </button>
            </>
          ) : (
            <p className="mt-4 text-center text-sm text-zinc-500">
              Esta unidad ya no está disponible
            </p>
          )}
        </div>
      </article>
    </PageShell>
  );
}
