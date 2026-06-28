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
  },
  {
    id: "16-pro-usado",
    model: "iPhone 16 Pro",
    condition: "Usado",
    battery: 94,
    storage: "256 GB",
    color: "Titanio natural",
    original: "Sin cambios ni reparaciones",
    unlock: "Libre de iCloud y SIM",
    includes: "Caja original y cable",
    estado: "Como nuevo",
    price: 980,
    status: "available",
  },
  {
    id: "15-pro-usado",
    model: "iPhone 15 Pro",
    condition: "Usado",
    battery: 89,
    storage: "128 GB",
    color: "Titanio azul",
    original: "100% original",
    unlock: "Libre de iCloud y SIM",
    includes: "Solo cable",
    estado: "Buen estado",
    price: 720,
    status: "sold",
  },
  {
    id: "14-usado",
    model: "iPhone 14",
    condition: "Usado",
    battery: 84,
    storage: "256 GB",
    color: "Medianoche",
    original: "100% original",
    unlock: "Libre de iCloud y SIM",
    includes: "Caja + cable",
    estado: "Buen estado",
    price: 480,
    status: "available",
  },
];

export type SellRequest = {
  id: string;
  model: string;
  storage: string;
  battery: number;
  condition: string;
  box: boolean;
  accessories: string;
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
    accessories: "Solo cable",
    time: "Hace 2 horas",
  },
  {
    id: "req-2",
    model: "iPhone 13 Pro",
    storage: "128 GB",
    battery: 78,
    condition: "Marcas visibles",
    box: true,
    accessories: "Caja + cable",
    time: "Hace 5 horas",
  },
];

export const models = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 16 Pro",
  "iPhone 16",
  "iPhone 15 Pro",
  "iPhone 15",
  "iPhone 14",
  "iPhone 13",
];

export const storageOptions = ["128 GB", "256 GB", "512 GB", "1 TB"];

export const aestheticOptions = [
  "Como nuevo",
  "Buen estado",
  "Marcas visibles",
  "Muy usado",
];

export const accessoryOptions = [
  "Caja + cable",
  "Solo cable",
  "Ninguno",
];

/** Tasación orientativa — reglas demo configurables en admin (V1 real) */
export function estimatePrice(
  model: string,
  storage: string,
  battery: number,
  aesthetic: string,
  hasBox: boolean,
  accessories: string,
): { min: number; max: number } {
  const base: Record<string, number> = {
    "iPhone 17 Pro Max": 1100,
    "iPhone 17 Pro": 950,
    "iPhone 16 Pro": 850,
    "iPhone 16": 650,
    "iPhone 15 Pro": 700,
    "iPhone 15": 520,
    "iPhone 14": 400,
    "iPhone 13": 320,
  };

  let price = base[model] ?? 400;

  if (storage === "512 GB") price += 80;
  if (storage === "1 TB") price += 150;
  if (storage === "128 GB") price -= 40;

  if (battery >= 95) price += 30;
  else if (battery >= 85) price += 10;
  else if (battery < 80) price -= 40;

  const aestheticAdj: Record<string, number> = {
    "Como nuevo": 40,
    "Buen estado": 0,
    "Marcas visibles": -60,
    "Muy usado": -120,
  };
  price += aestheticAdj[aesthetic] ?? 0;

  if (hasBox) price += 35;
  if (accessories === "Caja + cable") price += 15;
  else if (accessories === "Ninguno") price -= 20;

  const spread = Math.round(price * 0.05);
  return {
    min: Math.max(150, price - spread),
    max: price + spread,
  };
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
