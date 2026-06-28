import Link from "next/link";
import { LayoutGrid, Smartphone, Calculator, ClipboardList, Shield } from "lucide-react";

const links = [
  { href: "/", label: "Catálogo", icon: LayoutGrid },
  { href: "/vender", label: "Vender", icon: Smartphone },
  { href: "/tasacion", label: "Tasación", icon: Calculator },
  { href: "/admin", label: "Admin", icon: ClipboardList },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-medium text-zinc-500 transition hover:text-white"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function DemoBanner() {
  return (
    <div className="border-b border-blue-500/20 bg-blue-950/30 px-4 py-2.5">
      <div className="mx-auto flex max-w-lg items-center gap-2 text-xs text-blue-200/90">
        <Shield className="h-3.5 w-3.5 shrink-0" />
        <p>
          <span className="font-semibold text-blue-100">Boceto V1</span> · Next.js + Supabase + Stripe · por Albert
        </p>
      </div>
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <DemoBanner />
      <main className="mx-auto max-w-lg px-4 pb-28 pt-5">{children}</main>
      <BottomNav />
    </div>
  );
}
