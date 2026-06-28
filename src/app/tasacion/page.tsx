"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout";
import {
  models,
  storageOptions,
  aestheticOptions,
  accessoryOptions,
  estimatePrice,
  formatPrice,
} from "@/lib/data";

export default function TasacionPage() {
  const [model, setModel] = useState(models[0]);
  const [storage, setStorage] = useState("256 GB");
  const [battery, setBattery] = useState(92);
  const [aesthetic, setAesthetic] = useState("Buen estado");
  const [hasBox, setHasBox] = useState(true);
  const [accessories, setAccessories] = useState("Caja + cable");
  const [calculated, setCalculated] = useState(false);

  const estimate = useMemo(
    () => estimatePrice(model, storage, battery, aesthetic, hasBox, accessories),
    [model, storage, battery, aesthetic, hasBox, accessories],
  );

  return (
    <PageShell>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Valoración</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight">Calculadora de tasación</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Selecciona las características y obtén una valoración orientativa
        </p>
      </header>

      <div className="space-y-4">
        <Field label="Modelo">
          <select
            className={inputClass}
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              setCalculated(false);
            }}
          >
            {models.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>
        <Field label="Capacidad">
          <select
            className={inputClass}
            value={storage}
            onChange={(e) => {
              setStorage(e.target.value);
              setCalculated(false);
            }}
          >
            {storageOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label={`Batería — ${battery}%`}>
          <input
            type="range"
            min={70}
            max={100}
            value={battery}
            className="w-full accent-white"
            onChange={(e) => {
              setBattery(Number(e.target.value));
              setCalculated(false);
            }}
          />
        </Field>
        <Field label="Estado estético">
          <select
            className={inputClass}
            value={aesthetic}
            onChange={(e) => {
              setAesthetic(e.target.value);
              setCalculated(false);
            }}
          >
            {aestheticOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Caja original">
          <select
            className={inputClass}
            value={hasBox ? "yes" : "no"}
            onChange={(e) => {
              setHasBox(e.target.value === "yes");
              setCalculated(false);
            }}
          >
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </Field>
        <Field label="Accesorios">
          <select
            className={inputClass}
            value={accessories}
            onChange={(e) => {
              setAccessories(e.target.value);
              setCalculated(false);
            }}
          >
            {accessoryOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>

        <button
          type="button"
          onClick={() => setCalculated(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-black transition hover:bg-zinc-100"
        >
          <Calculator className="h-4 w-4" />
          Calcular tasación
        </button>

        {calculated && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400/80">
              Valoración aproximada
            </p>
            <p className="mt-2 text-3xl font-black text-emerald-400">
              {formatPrice(estimate.min)} — {formatPrice(estimate.max)}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Orientativa · no vinculante · sujeta a revisión física
            </p>
            <Link
              href="/vender"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
            >
              Vender mi iPhone
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-500">{label}</label>
      {children}
    </div>
  );
}
