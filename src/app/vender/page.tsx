"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import {
  PageShell,
  PageTitle,
  Card,
  PrimaryButton,
  GhostButton,
  Chip,
} from "@/components/layout";
import { StepWizard } from "@/components/step-wizard";
import {
  sellModels,
  getStorageOptionsForModel,
  conditionOptions,
  extrasOptions,
  estimatePriceRange,
  formatPrice,
  batteryLabel,
  type SellExtras,
} from "@/lib/data";

const steps = [
  { id: "model", label: "Modelo" },
  { id: "storage", label: "Capacidad" },
  { id: "battery", label: "Batería" },
  { id: "extras", label: "Extras" },
];

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState<string | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [battery, setBattery] = useState(91);
  const [condition, setCondition] = useState<string | null>(null);
  const [extras, setExtras] = useState<SellExtras>({
    box: false,
    charger: false,
    invoice: false,
  });
  const [showResult, setShowResult] = useState(false);

  const storageOptions = getStorageOptionsForModel(model);

  const range = useMemo(() => {
    if (!model || !storage || !condition) return { min: 0, max: 0 };
    return estimatePriceRange(model, storage, battery, condition, extras);
  }, [model, storage, battery, condition, extras]);

  function selectModel(m: string) {
    setModel(m);
    const valid = getStorageOptionsForModel(m);
    setStorage(valid[0] ?? null);
  }

  function toggleExtra(key: keyof SellExtras) {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
    setShowResult(false);
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else setShowResult(true);
  }

  function back() {
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (step > 0) setStep(step - 1);
  }

  const canNext =
    (step === 0 && model) ||
    (step === 1 && storage) ||
    step === 2 ||
    step === 3;

  return (
    <PageShell>
      <PageTitle
        title="Vende tu iPhone"
        subtitle="Te lo compramos al mejor precio. Sin complicaciones."
      />

      <Card className="mx-auto max-w-xl">
        {!showResult && <StepWizard steps={steps} current={step} />}

        {showResult ? (
          <ResultView range={range} model={model!} onBack={back} />
        ) : (
          <>
            {step === 0 && (
              <div>
                <h2 className="mb-5 text-center text-lg font-semibold">
                  ¿Qué modelo tienes?
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {sellModels.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => selectModel(m)}
                      className={`rounded-xl border px-3 py-3.5 text-sm font-medium transition ${
                        model === m
                          ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/25"
                          : "border-border bg-card hover:border-accent/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="mb-5 text-center text-lg font-semibold">
                  ¿Cuánta capacidad tiene?
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {storageOptions.map((s) => (
                    <Chip key={s} active={storage === s} onClick={() => setStorage(s)}>
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="text-center">
                <h2 className="mb-6 text-lg font-semibold">
                  ¿Qué salud de batería tiene?
                </h2>
                <p className="text-5xl font-black text-emerald-500">{battery}%</p>
                <input
                  type="range"
                  min={70}
                  max={100}
                  value={battery}
                  onChange={(e) => setBattery(Number(e.target.value))}
                  className="mx-auto mt-8 w-full max-w-sm"
                />
                <p className="mt-4 text-sm text-muted">{batteryLabel(battery)}</p>

                <div className="mt-8 text-left">
                  <h3 className="mb-3 text-sm font-semibold text-muted">Estado estético</h3>
                  <div className="space-y-2">
                    {conditionOptions.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCondition(c.id)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                          condition === c.id
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/40"
                        }`}
                      >
                        <span className="text-sm font-medium">{c.label}</span>
                        <span className="text-xs text-muted">{c.hint}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-5 text-center text-lg font-semibold">
                  ¿Qué incluyes con el iPhone?
                </h2>
                <div className="space-y-3">
                  {extrasOptions.map((item) => {
                    const key = item.id as keyof SellExtras;
                    const checked = extras[key];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleExtra(key)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left transition ${
                          checked
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded border ${
                              checked ? "border-accent bg-accent" : "border-border"
                            }`}
                          >
                            {checked && (
                              <span className="text-[10px] font-bold text-white">✓</span>
                            )}
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <span className="text-xs text-muted">{item.note}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <GhostButton onClick={back} className="inline-flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Atrás
                </GhostButton>
              ) : (
                <span />
              )}
              <PrimaryButton
                onClick={next}
                disabled={!canNext || (step === 2 && !condition)}
                className="inline-flex items-center gap-2"
              >
                {step === steps.length - 1 ? "Ver mi tasación" : "Siguiente"}
                {step < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
              </PrimaryButton>
            </div>
          </>
        )}
      </Card>
    </PageShell>
  );
}

function ResultView({
  range,
  model,
  onBack,
}: {
  range: { min: number; max: number };
  model: string;
  onBack: () => void;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
        <Sparkles className="h-6 w-6 text-accent" />
      </div>
      <p className="text-sm font-medium text-muted">Tu tasación orientativa</p>
      <p className="price-glow mt-3 text-4xl font-black sm:text-5xl">
        {formatPrice(range.min)} — {formatPrice(range.max)}
      </p>
      <p className="mt-3 text-sm text-muted">
        {model} · Orientativa, no vinculante · sujeta a revisión
      </p>
      <div className="mt-8 space-y-3">
        <PrimaryButton className="w-full">Aceptar oferta y continuar</PrimaryButton>
        <GhostButton onClick={onBack} className="w-full">
          Modificar datos
        </GhostButton>
      </div>
      <p className="mt-6 text-xs text-muted">
        Te contactaremos por WhatsApp para confirmar el estado del dispositivo
      </p>
    </div>
  );
}
