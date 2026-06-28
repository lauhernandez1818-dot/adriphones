import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const LOGO = "/media/LOGOADRI.jpg";

const nav = [
  { href: "/", label: "Tienda" },
  { href: "/vender", label: "Vende tu iPhone" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/faqs", label: "FAQs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={LOGO}
            alt="AdriiPhones"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-border"
            priority
          />
          <span className="hidden text-sm font-bold tracking-tight sm:inline sm:text-base">
            AdriiPhones
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-border/40 px-4 py-2 text-xs text-muted md:hidden scrollbar-none">
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
    <div className="page-bg min-h-screen">
      <SiteHeader />
      {admin && (
        <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-600 dark:text-amber-300">
          Panel de administración · Boceto V1
        </div>
      )}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted">
        <Link href="/admin" className="transition hover:text-accent">
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
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted sm:text-base">{subtitle}</p>
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
    <div className={`glass-card rounded-2xl p-6 sm:p-8 ${className}`}>{children}</div>
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
      className={`btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
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
      className={`text-sm font-medium text-accent transition hover:underline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active
          ? "border-accent bg-accent text-white shadow-md shadow-accent/25"
          : "border-border bg-card text-foreground hover:border-accent/50"
      }`}
    >
      {children}
    </button>
  );
}
