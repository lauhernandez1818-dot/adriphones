"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "adriiphones-sold-ids";
const UPDATE_EVENT = "adriiphones-inventory-updated";

function readSoldIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
}

function writeSoldIds(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function markUnitSoldInStore(id: string) {
  const ids = readSoldIds();
  ids.add(id);
  writeSoldIds(ids);
}

export function unmarkUnitSoldInStore(id: string) {
  const ids = readSoldIds();
  ids.delete(id);
  writeSoldIds(ids);
}

export function getSoldIdsFromStorage(): Set<string> {
  return readSoldIds();
}

export function useSoldIds() {
  const [soldIds, setSoldIds] = useState<Set<string>>(() => new Set());

  const sync = useCallback(() => {
    setSoldIds(readSoldIds());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(UPDATE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(UPDATE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return soldIds;
}

export function useIsUnitSold(id: string) {
  const soldIds = useSoldIds();
  return soldIds.has(id);
}
