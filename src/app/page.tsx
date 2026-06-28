"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout";
import { PhoneCard } from "@/components/phone-card";
import { units, type UnitStatus } from "@/lib/data";

type Filter = "all" | UnitStatus | "sealed" | "used";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "available", label: "Disponibles" },
  { id: "sealed", label: "Precintados" },
  { id: "used", label: "Usados" },
];

export default function CatalogPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = units.filter((u) => {
    if (filter === "all") return true;
    if (filter === "sealed") return u.condition.toLowerCase().includes("precintado");
    if (filter === "used") return u.condition.toLowerCase().includes("usado");
    return u.status === filter;
  });

  const availableCount = units.filter((u) => u.status === "available").length;

  return (
    <PageShell>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">AdriiPhones</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight">Inventario</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {availableCount} unidades disponibles · cada iPhone es único
        </p>
      </header>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
              filter === f.id
                ? "bg-white text-black"
                : "border border-white/10 bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((unit) => (
          <PhoneCard key={unit.id} unit={unit} />
        ))}
      </div>
    </PageShell>
  );
}
