import { PageShell, PageTitle } from "@/components/layout";
import { PhoneCard } from "@/components/phone-card";
import { CatalogClient } from "@/components/catalog-client";
import { units } from "@/lib/data";
import { getUnitMedia } from "@/lib/media";

export default function CatalogPage() {
  const items = units.map((unit) => ({
    unit,
    media: getUnitMedia(unit.id),
  }));

  const available = units.filter((u) => u.status === "available").length;

  return (
    <PageShell>
      <PageTitle
        title="Comprar un iPhone"
        subtitle={`${available} unidades disponibles ahora · cada iPhone es una unidad única`}
      />
      <CatalogClient items={items} />
    </PageShell>
  );
}
