"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  CheckCircle2,
  Inbox,
  LogOut,
  ShieldCheck,
  X,
  ImageIcon,
  Undo2,
  Archive,
  RotateCcw,
} from "lucide-react";
import { adminLogout } from "@/app/admin/actions";
import { Card, PrimaryButton } from "@/components/layout";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { iPhoneUnit, SellRequest, UnitStatus } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import {
  getSoldIdsFromStorage,
  markUnitSoldInStore,
  unmarkUnitSoldInStore,
} from "@/lib/inventory-store";

type AdminPanelProps = {
  initialUnits: iPhoneUnit[];
  initialRequests: SellRequest[];
};

type ModalKind = "add" | "edit" | "photos" | null;
type AdminTab = "activo" | "archivadas";

export function AdminPanel({ initialUnits, initialRequests }: AdminPanelProps) {
  const [inventory, setInventory] = useState(initialUnits);
  const [requests, setRequests] = useState(initialRequests);
  const [archivedRequests, setArchivedRequests] = useState<SellRequest[]>([]);
  const [tab, setTab] = useState<AdminTab>("activo");
  const [modal, setModal] = useState<ModalKind>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [photoRequest, setPhotoRequest] = useState<SellRequest | null>(null);
  const [toast, setToast] = useState<{ message: string; undo?: () => void } | null>(null);

  const [form, setForm] = useState({
    model: "",
    condition: "Usado",
    storage: "128 GB",
    battery: "90",
    color: "",
    price: "",
  });

  useEffect(() => {
    const soldIds = getSoldIdsFromStorage();
    if (soldIds.size === 0) return;
    setInventory((prev) =>
      prev.map((u) =>
        soldIds.has(u.id) ? { ...u, status: "sold" as UnitStatus } : u,
      ),
    );
  }, []);

  const activeInventory = inventory.filter((u) => u.status !== "sold");
  const soldInventory = inventory.filter((u) => u.status === "sold");
  const archivedCount = soldInventory.length + archivedRequests.length;

  function notify(message: string, undo?: () => void) {
    setToast({ message, undo });
    window.setTimeout(() => setToast(null), undo ? 5000 : 2800);
  }

  function openAdd() {
    setForm({
      model: "",
      condition: "Usado",
      storage: "128 GB",
      battery: "90",
      color: "",
      price: "",
    });
    setModal("add");
  }

  function openEdit(unit: iPhoneUnit) {
    setEditingId(unit.id);
    setForm({
      model: unit.model,
      condition: unit.condition,
      storage: unit.storage,
      battery: String(unit.battery),
      color: unit.color,
      price: String(unit.price),
    });
    setModal("edit");
  }

  function markSold(id: string) {
    const unit = inventory.find((u) => u.id === id);
    if (!unit || unit.status === "sold") return;

    setInventory((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "sold" as UnitStatus } : u)),
    );
    markUnitSoldInStore(id);

    notify(`"${unit.model}" movido a archivadas`, () => {
      setInventory((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "available" as UnitStatus } : u)),
      );
      unmarkUnitSoldInStore(id);
      setTab("activo");
      notify("Venta deshecha — de vuelta en inventario");
    });
  }

  function restoreSold(id: string) {
    setInventory((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "available" as UnitStatus } : u)),
    );
    unmarkUnitSoldInStore(id);
    setTab("activo");
    notify("iPhone restaurado al inventario activo");
  }

  function saveUnit() {
    const price = Number(form.price);
    const battery = Number(form.battery);
    if (!form.model.trim() || !form.color.trim() || !price || battery < 0 || battery > 100) {
      notify("Completa modelo, color, precio y batería válida");
      return;
    }

    if (modal === "edit" && editingId) {
      setInventory((prev) =>
        prev.map((u) =>
          u.id === editingId
            ? {
                ...u,
                model: form.model.trim(),
                condition: form.condition,
                storage: form.storage,
                battery,
                color: form.color.trim(),
                price,
              }
            : u,
        ),
      );
      notify("Cambios guardados");
    } else {
      const id = `nuevo-${Date.now()}`;
      const unit: iPhoneUnit = {
        id,
        model: form.model.trim(),
        condition: form.condition,
        battery,
        storage: form.storage,
        color: form.color.trim(),
        original: "100% original",
        unlock: "Libre de iCloud y SIM",
        includes: "A confirmar con cliente",
        estado: form.condition,
        price,
        status: "available",
      };
      setInventory((prev) => [unit, ...prev]);
      notify("iPhone añadido al inventario (demo)");
    }

    setModal(null);
    setEditingId(null);
  }

  function respondWhatsApp(req: SellRequest) {
    const text = encodeURIComponent(
      `Hola, soy AdriiPhones. He recibido tu solicitud de venta del ${req.model} ${req.storage} (${req.condition}, batería ${req.battery}%). ¿Podemos continuar por aquí?`,
    );
    window.open(`https://wa.me/34600000000?text=${text}`, "_blank", "noopener,noreferrer");
    notify("Abriendo WhatsApp para responder");
  }

  function archiveRequest(req: SellRequest) {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setArchivedRequests((prev) => [req, ...prev]);
    notify(`Solicitud archivada`, () => {
      setArchivedRequests((prev) => prev.filter((r) => r.id !== req.id));
      setRequests((prev) => [req, ...prev]);
      setTab("activo");
      notify("Solicitud restaurada");
    });
  }

  function restoreRequest(req: SellRequest) {
    setArchivedRequests((prev) => prev.filter((r) => r.id !== req.id));
    setRequests((prev) => [req, ...prev]);
    setTab("activo");
    notify("Solicitud devuelta a pendientes");
  }

  return (
    <>
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
        <Stat value={activeInventory.length} label="En stock" accent="emerald" />
        <Stat value={soldInventory.length} label="Vendidos" accent="red" />
        <Stat value={requests.length} label="Solicitudes" accent="amber" />
      </div>

      <div className="mb-6 flex gap-2 rounded-xl border border-border bg-card p-1">
        <TabButton active={tab === "activo"} onClick={() => setTab("activo")}>
          Activo
        </TabButton>
        <TabButton active={tab === "archivadas"} onClick={() => setTab("archivadas")}>
          Archivadas
          {archivedCount > 0 && (
            <span className="ml-1.5 rounded-full bg-muted/20 px-1.5 py-0.5 text-[10px]">
              {archivedCount}
            </span>
          )}
        </TabButton>
      </div>

      {tab === "activo" ? (
        <>
          <PrimaryButton
            type="button"
            onClick={openAdd}
            className="mb-6 inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir iPhone
          </PrimaryButton>

          <section className="mb-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
              Inventario activo
            </h2>
            <Card className="!p-0 divide-y divide-border">
              {activeInventory.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted">No hay unidades en stock</p>
              ) : (
                activeInventory.map((unit) => (
                  <InventoryRow
                    key={unit.id}
                    unit={unit}
                    onEdit={() => openEdit(unit)}
                    onMarkSold={() => markSold(unit.id)}
                  />
                ))
              )}
            </Card>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
              Solicitudes de venta
            </h2>
            <div className="space-y-3">
              {requests.length === 0 ? (
                <Card className="!p-6 text-center text-sm text-muted">
                  No hay solicitudes pendientes
                </Card>
              ) : (
                requests.map((req) => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    onPhotos={() => {
                      setPhotoRequest(req);
                      setModal("photos");
                    }}
                    onRespond={() => respondWhatsApp(req)}
                    onArchive={() => archiveRequest(req)}
                  />
                ))
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="space-y-8">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted">
              <Archive className="h-4 w-4" />
              iPhones vendidos
            </h2>
            <Card className="!p-0 divide-y divide-border">
              {soldInventory.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted">No hay unidades vendidas</p>
              ) : (
                soldInventory.map((unit) => (
                  <div key={unit.id} className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="font-semibold">
                        {unit.model} · {unit.condition}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {unit.storage} · Bat. {unit.battery}% · {formatPrice(unit.price)}
                      </p>
                      <div className="mt-3">
                        <Action
                          icon={Undo2}
                          label="Deshacer venta"
                          primary
                          onClick={() => restoreSold(unit.id)}
                        />
                      </div>
                    </div>
                    <StatusBadge status="sold" />
                  </div>
                ))
              )}
            </Card>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
              Solicitudes archivadas
            </h2>
            <div className="space-y-3">
              {archivedRequests.length === 0 ? (
                <Card className="!p-6 text-center text-sm text-muted">
                  No hay solicitudes archivadas
                </Card>
              ) : (
                archivedRequests.map((req) => (
                  <Card key={req.id} className="!p-5 opacity-90">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">
                          {req.model} · {req.storage}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          Bat. {req.battery}% · {req.condition}
                        </p>
                        <p className="mt-1 text-xs text-muted">{req.time}</p>
                      </div>
                      <Archive className="h-4 w-4 shrink-0 text-muted" />
                    </div>
                    <div className="mt-3">
                      <Action
                        icon={RotateCcw}
                        label="Restaurar"
                        primary
                        onClick={() => restoreRequest(req)}
                      />
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {(modal === "add" || modal === "edit") && (
        <Modal
          title={modal === "add" ? "Añadir iPhone" : "Editar iPhone"}
          onClose={() => {
            setModal(null);
            setEditingId(null);
          }}
        >
          <div className="space-y-3">
            <Field label="Modelo">
              <input
                value={form.model}
                onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                placeholder="iPhone 15 Pro"
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Estado">
                <select
                  value={form.condition}
                  onChange={(e) => setForm((f) => ({ ...f, condition: e.target.value }))}
                  className={inputClass}
                >
                  <option>Precintado</option>
                  <option>Usado</option>
                  <option>Como nuevo</option>
                </select>
              </Field>
              <Field label="Almacenamiento">
                <select
                  value={form.storage}
                  onChange={(e) => setForm((f) => ({ ...f, storage: e.target.value }))}
                  className={inputClass}
                >
                  <option>128 GB</option>
                  <option>256 GB</option>
                  <option>512 GB</option>
                  <option>1 TB</option>
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Batería %">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.battery}
                  onChange={(e) => setForm((f) => ({ ...f, battery: e.target.value }))}
                  className={inputClass}
                />
              </Field>
              <Field label="Precio €">
                <input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Color">
              <input
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                placeholder="Negro, Blanco..."
                className={inputClass}
              />
            </Field>
            <PrimaryButton type="button" onClick={saveUnit} className="mt-2 w-full">
              {modal === "add" ? "Añadir al inventario" : "Guardar cambios"}
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {modal === "photos" && photoRequest && (
        <Modal title="Fotos del cliente" onClose={() => setModal(null)}>
          <p className="mb-4 text-sm text-muted">
            {photoRequest.model} · {photoRequest.storage} · {photoRequest.condition}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border bg-background text-xs text-muted"
              >
                Foto {n}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            En la V1 real las fotos del formulario de venta se guardan aquí automáticamente.
          </p>
          <button
            type="button"
            onClick={() => respondWhatsApp(photoRequest)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Responder por WhatsApp
          </button>
        </Modal>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-lg">
          <span>{toast.message}</span>
          {toast.undo && (
            <button
              type="button"
              onClick={() => {
                toast.undo?.();
                setToast(null);
              }}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
            >
              <Undo2 className="h-3 w-3" />
              Deshacer
            </button>
          )}
        </div>
      )}
    </>
  );
}

function InventoryRow({
  unit,
  onEdit,
  onMarkSold,
}: {
  unit: iPhoneUnit;
  onEdit: () => void;
  onMarkSold: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-5">
      <div>
        <p className="font-semibold">
          {unit.model} · {unit.condition}
        </p>
        <p className="mt-1 text-sm text-muted">
          {unit.storage} · Bat. {unit.battery}% · {formatPrice(unit.price)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Action icon={Pencil} label="Editar" onClick={onEdit} />
          <Action icon={CheckCircle2} label="Marcar vendido" primary onClick={onMarkSold} />
        </div>
      </div>
      <StatusBadge status={unit.status} />
    </div>
  );
}

function RequestCard({
  req,
  onPhotos,
  onRespond,
  onArchive,
}: {
  req: SellRequest;
  onPhotos: () => void;
  onRespond: () => void;
  onArchive: () => void;
}) {
  return (
    <Card className="!p-5">
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
      <div className="mt-3 flex flex-wrap gap-2">
        <Action icon={ImageIcon} label="Ver fotos" onClick={onPhotos} />
        <Action icon={Pencil} label="Responder" primary onClick={onRespond} />
        <Action icon={Archive} label="Archivar" onClick={onArchive} />
      </div>
    </Card>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
        active ? "bg-accent text-white shadow-md" : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

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

function StatusBadge({ status }: { status: UnitStatus }) {
  const styles =
    status === "available"
      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
      : status === "sold"
        ? "bg-red-500/15 text-red-600 dark:text-red-400"
        : "bg-amber-500/15 text-amber-600 dark:text-amber-400";

  const label =
    status === "available" ? "Disponible" : status === "sold" ? "Vendido" : "Reservado";

  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${styles}`}>
      {label}
    </span>
  );
}

function Action({
  icon: Icon,
  label,
  primary,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
        primary
          ? "bg-accent/10 text-accent hover:bg-accent/20"
          : "bg-background text-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <button type="button" className="absolute inset-0" aria-label="Cerrar" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted transition hover:bg-background hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
