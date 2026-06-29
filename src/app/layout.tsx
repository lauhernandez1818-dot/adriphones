import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adriiphones-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AdriiPhones — Compra y vende tu iPhone",
  description:
    "Plataforma para comprar y vender iPhones originales. Unidades únicas, tasación orientativa y gestión sencilla.",
  icons: {
    icon: [{ url: "/media/LOGOADRI.jpg", type: "image/jpeg" }],
    apple: [{ url: "/media/LOGOADRI.jpg", type: "image/jpeg" }],
    shortcut: ["/media/LOGOADRI.jpg"],
  },
  openGraph: {
    title: "AdriiPhones — Compra y vende tu iPhone",
    description:
      "Plataforma para comprar y vender iPhones originales. Unidades únicas, tasación orientativa y gestión sencilla.",
    url: siteUrl,
    siteName: "AdriiPhones",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/media/LOGOADRI.jpg",
        width: 512,
        height: 512,
        alt: "AdriiPhones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdriiPhones — Compra y vende tu iPhone",
    description:
      "Plataforma para comprar y vender iPhones originales. Unidades únicas, tasación orientativa y gestión sencilla.",
    images: ["/media/LOGOADRI.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f4ff" },
    { media: "(prefers-color-scheme: dark)", color: "#07070a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
