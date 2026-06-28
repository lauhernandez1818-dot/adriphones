"use client";

import { useState } from "react";
import { Send, Upload } from "lucide-react";
import { PageShell } from "@/components/layout";
import {
  models,
  storageOptions,
  aestheticOptions,
  accessoryOptions,
} from "@/lib/data";

export default function SellPage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <PageShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Send className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-xl font-bold">Solicitud enviada</h1>
          <p className="mt-2 max-w-xs text-sm text-zinc-500">
            AdriiPhones revisará tu iPhone y te responderá con una oferta desde el panel admin.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-6 text-sm font-semibold text-white underline-offset-4 hover:underline"
          >
            Enviar otra solicitud
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Compra</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight">Véndeme tu iPhone</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Cuéntame los detalles y te hago una oferta personalizada
        </p>
      </header>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <Field label="Modelo">
          <select className={inputClass} defaultValue={models[0]}>
            {models.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>
        <Field label="Capacidad">
          <select className={inputClass} defaultValue="256 GB">
            {storageOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Batería (%)">
          <input type="number" className={inputClass} defaultValue={92} min={0} max={100} />
        </Field>
        <Field label="Estado estético">
          <select className={inputClass} defaultValue="Buen estado">
            {aestheticOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="¿Caja original?">
          <select className={inputClass} defaultValue="Sí">
            <option>Sí</option>
            <option>No</option>
          </select>
        </Field>
        <Field label="Accesorios incluidos">
          <select className={inputClass} defaultValue="Caja + cable">
            {accessoryOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Fotos del móvil">
          <label className={`${inputClass} flex cursor-pointer items-center justify-center gap-2 border-dashed text-zinc-500`}>
            <Upload className="h-4 w-4" />
            Subir fotos
            <input type="file" className="hidden" accept="image/*" multiple />
          </label>
        </Field>
        <Field label="WhatsApp o email">
          <input type="text" className={inputClass} placeholder="+34 600 000 000" />
        </Field>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-black transition hover:bg-zinc-100"
        >
          <Send className="h-4 w-4" />
          Enviar solicitud
        </button>
      </form>
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
