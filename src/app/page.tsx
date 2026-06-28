import { PageShell, PageTitle } from "@/components/layout";
import { CatalogClient } from "@/components/catalog-client";
import { units } from "@/lib/data";
import { getUnitMedia } from "@/lib/media";

export default function CatalogPage() {
  const items = units.map((unit) => ({
    unit,
    media: getUnitMedia(unit.id),
  }));

  return (
    <PageShell>
      <PageTitle title="Comprar un iPhone" />
      <CatalogClient items={items} />
    </PageShell>
  );
}
