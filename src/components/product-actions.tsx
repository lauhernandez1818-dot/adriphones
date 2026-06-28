"use client";

import { CreditCard } from "lucide-react";
import { PrimaryButton, WhatsAppButton } from "@/components/layout";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useIsUnitSold } from "@/lib/inventory-store";

export function ProductActions({ unitId }: { unitId: string }) {
  const sold = useIsUnitSold(unitId);

  if (sold) {
    return (
      <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-600 dark:text-red-400">
        Esta unidad ya no está disponible — vendida
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <PrimaryButton className="flex w-full items-center justify-center gap-2">
        <CreditCard className="h-4 w-4" />
        Comprar / Reservar
      </PrimaryButton>
      <WhatsAppButton href="https://wa.me/34600000000">
        <WhatsAppIcon className="h-5 w-5" />
        Consultar por WhatsApp
      </WhatsAppButton>
    </div>
  );
}
