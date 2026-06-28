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
import { PageShell, PrimaryButton, Card } from "@/components/layout";
import { PhoneGallery } from "@/components/phone-card";
import { formatPrice, getUnit } from "@/lib/data";
import { getUnitMedia } from "@/lib/media";

export default async function iPhoneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const unit = getUnit(id);
  if (!unit) notFound();

  const media = getUnitMedia(id);

  const canBuy = unit.status === "available";

  const specs = [
    { icon: Battery, label: "Batería", value: `${unit.battery}%` },
    { icon: HardDrive, label: "Almacenamiento", value: unit.storage },
    { icon: Palette, label: "Color", value: unit.color },
    { icon: ShieldCheck, label: "100% original", value: unit.original },
    { icon: Unlock, label: "Libre de iCloud y SIM", value: unit.unlock },
    { icon: Package, label: "Incluye", value: unit.includes },
    { icon: Sparkles, label: "Estado", value: unit.estado },
  ];

  return (
    <PageShell>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#0071e3] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la tienda
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <PhoneGallery
          media={media}
          alt={`${unit.model} ${unit.condition}`}
        />

        <div>
          <p className="text-sm font-medium text-[#0071e3]">{unit.condition}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{unit.model}</h1>
          {unit.warranty && (
            <p className="mt-1 text-sm text-[#86868b]">{unit.warranty}</p>
          )}

          <p className="mt-6 text-4xl font-bold">{formatPrice(unit.price)}</p>

          <Card className="mt-6 !p-0">
            {specs.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 border-b border-[#d2d2d7]/60 px-5 py-4 last:border-0"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#86868b]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#86868b]">
                    {label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </Card>

          {canBuy ? (
            <div className="mt-6 space-y-3">
              <PrimaryButton className="flex w-full items-center justify-center gap-2">
                <CreditCard className="h-4 w-4" />
                Comprar / Reservar
              </PrimaryButton>
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d2d2d7] py-3 text-sm font-semibold text-[#1d1d1f] transition hover:bg-white"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-[#e8e8ed] px-4 py-3 text-center text-sm text-[#86868b]">
              Esta unidad ya no está disponible
            </p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
