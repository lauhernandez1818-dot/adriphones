export type UnitStatus = "available" | "reserved" | "sold";

export type iPhoneUnit = {
  id: string;
  model: string;
  condition: string;
  warranty?: string;
  battery: number;
  storage: string;
  color: string;
  original: string;
  unlock: string;
  includes: string;
  estado: string;
  price: number;
  status: UnitStatus;
  featured?: boolean;
  imageTone?: "light" | "dark" | "gold" | "blue";
};

export const units: iPhoneUnit[] = [
  {
    id: "17-pro-max-precintado",
    model: "iPhone 17 Pro Max",
    condition: "Precintado",
    warranty: "1 año garantía cuando se active",
    battery: 100,
    storage: "256 GB",
    color: "Blanco",
    original: "Sin cambios ni reparaciones",
    unlock: "Listo para usar con cualquier operador",
    includes: "Caja original y cable de carga",
    estado: "Nuevo — Precintado",
    price: 1200,
    status: "available",
    featured: true,
    imageTone: "light",
  },
  {
    id: "15-pro-max",
    model: "iPhone 15 Pro Max",
    condition: "Usado",
    battery: 91,
    storage: "256 GB",
    color: "Titanio natural",
    original: "100% original",
    unlock: "Libre de iCloud y SIM",
    includes: "Caja original y cable",
    estado: "Como nuevo",
    price: 899,
    status: "available",
    imageTone: "gold",
  },
  {
    id: "iphone-air",
    model: "iPhone Air",
    condition: "Usado",
    battery: 98,
    storage: "256 GB",
    color: "Blanco",
    original: "100% original",
    unlock: "Libre de iCloud y SIM",
    includes: "Caja + cable",
    estado: "Como nuevo",
    price: 950,
    status: "available",
    imageTone: "light",
  },
  {
    id: "iphone-13",
    model: "iPhone 13",
    condition: "Usado",
    battery: 86,
    storage: "128 GB",
    color: "Azul",
    original: "100% original",
    unlock: "Libre de iCloud y SIM",
    includes: "Solo cable",
    estado: "Buen estado",
    price: 380,
    status: "available",
    imageTone: "blue",
  },
];

export type SellRequest = {
  id: string;
  model: string;
  storage: string;
  battery: number;
  condition: string;
  box: boolean;
  charger: boolean;
  invoice: boolean;
  time: string;
};

export const sellRequests: SellRequest[] = [
  {
    id: "req-1",
    model: "iPhone 14",
    storage: "256 GB",
    battery: 84,
    condition: "Buen estado",
    box: false,
    charger: true,
    invoice: false,
    time: "Hace 2 horas",
  },
  {
    id: "req-2",
    model: "iPhone 13 Pro",
    storage: "128 GB",
    battery: 78,
    condition: "Marcas visibles",
    box: true,
    charger: false,
    invoice: true,
    time: "Hace 5 horas",
  },
];

export const sellModels = [
  "iPhone 12",
  "iPhone 13",
  "iPhone 14",
  "iPhone 15",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Pro",
  "iPhone 17 Pro Max",
];

export const storageOptions = ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"];

export const conditionOptions = [
  { id: "como-nuevo", label: "Como nuevo", hint: "Sin marcas visibles" },
  { id: "buen-estado", label: "Buen estado", hint: "Pequeños signos de uso" },
  { id: "marcas", label: "Marcas visibles", hint: "Rayones o golpes leves" },
  { id: "muy-usado", label: "Muy usado", hint: "Desgaste notable" },
];

export const extrasOptions = [
  {
    id: "box",
    label: "Caja original de Apple",
    bonus: 20,
    note: "+20€",
  },
  {
    id: "charger",
    label: "Cargador original",
    bonus: 0,
    note: "+0€, lo valoramos positivamente",
  },
  {
    id: "invoice",
    label: "Factura de compra",
    bonus: 10,
    note: "+10€",
  },
] as const;

export type SellExtras = {
  box: boolean;
  charger: boolean;
  invoice: boolean;
};

export function batteryLabel(pct: number) {
  if (pct >= 90) return "Batería en excelente estado :)";
  if (pct >= 80) return "Batería en buen estado";
  if (pct >= 70) return "Batería aceptable";
  return "Batería baja — puede afectar la tasación";
}

export function estimatePrice(
  model: string,
  storage: string,
  battery: number,
  conditionId: string,
  extras: SellExtras,
): number {
  const base: Record<string, number> = {
    "iPhone 17 Pro Max": 1100,
    "iPhone 17 Pro": 950,
    "iPhone 16 Pro": 850,
    "iPhone 16": 650,
    "iPhone 15 Pro Max": 780,
    "iPhone 15 Pro": 700,
    "iPhone 15": 520,
    "iPhone 14": 400,
    "iPhone 13": 320,
    "iPhone 12": 260,
  };

  let price = base[model] ?? 350;

  if (storage === "512 GB") price += 80;
  if (storage === "1 TB") price += 150;
  if (storage === "64 GB") price -= 30;
  if (storage === "128 GB") price -= 15;

  if (battery >= 95) price += 30;
  else if (battery >= 85) price += 10;
  else if (battery < 80) price -= 40;

  const conditionAdj: Record<string, number> = {
    "como-nuevo": 40,
    "buen-estado": 0,
    marcas: -60,
    "muy-usado": -120,
  };
  price += conditionAdj[conditionId] ?? 0;

  if (extras.box) price += 20;
  if (extras.charger) price += 5;
  if (extras.invoice) price += 10;

  return Math.max(120, Math.round(price));
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getUnit(id: string) {
  return units.find((u) => u.id === id);
}

export function modelFilterKey(model: string) {
  const match = model.match(/iPhone (\d+)/);
  return match ? `iPhone ${match[1]}` : model;
}

export const catalogFilters = ["Todos", "iPhone 17", "iPhone 15", "iPhone Air", "iPhone 13"];
