import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const LOGO = "/media/LOGOADRI.jpg";

const nav = [
  { href: "/", label: "Tienda" },
  { href: "/vender", label: "Vende tu iPhone" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/faqs", label: "FAQs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d2d2d7]/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={LOGO}
            alt="AdriiPhones"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-cover"
            priority
          />
          <span className="hidden text-sm font-bold tracking-tight sm:inline sm:text-base">
            AdriiPhones
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#86868b] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#1d1d1f]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://wa.me/34600000000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#0077ed] sm:text-sm"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-[#d2d2d7]/40 px-4 py-2 text-xs text-[#86868b] md:hidden scrollbar-none">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function PageShell({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      {admin && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-800">
          Panel de administración · Boceto V1
        </div>
      )}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <footer className="border-t border-[#d2d2d7]/60 py-6 text-center text-xs text-[#86868b]">
        <Link href="/admin" className="hover:text-[#0071e3]">
          Admin
        </Link>
        {" · "}
        Boceto V1 · Albert
      </footer>
    </div>
  );
}

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#86868b] sm:text-base">
          {subtitle}
        </p>
      )}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#d2d2d7]/80 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`text-sm font-medium text-[#0071e3] transition hover:underline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
