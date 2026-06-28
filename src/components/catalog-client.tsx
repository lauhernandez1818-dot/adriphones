"use client";

import { useState } from "react";
import { PhoneCard } from "@/components/phone-card";
import { catalogFilters } from "@/lib/data";
import type { iPhoneUnit } from "@/lib/data";
import type { UnitMedia } from "@/lib/media";

type Item = { unit: iPhoneUnit; media: UnitMedia };

export function CatalogClient({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState("Todos");

  const filtered = items.filter(({ unit }) => {
    if (filter === "Todos") return true;
    if (filter === "Precintados") {
      return unit.condition.toLowerCase().includes("precintado");
    }
    return unit.model === filter;
  });

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {catalogFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "bg-foreground text-background shadow-md"
                : "bg-card text-muted ring-1 ring-border hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ unit, media }) => (
          <PhoneCard key={unit.id} unit={unit} media={media} />
        ))}
      </div>
    </>
  );
}
