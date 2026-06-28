import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdriiPhones — Compra y vende tu iPhone",
  description:
    "Plataforma para comprar y vender iPhones originales. Unidades únicas, tasación orientativa y gestión sencilla.",
  icons: {
    icon: [{ url: "/media/LOGOADRI.jpg", type: "image/jpeg" }],
    apple: [{ url: "/media/LOGOADRI.jpg", type: "image/jpeg" }],
    shortcut: ["/media/LOGOADRI.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-[#f5f5f7] font-sans text-[#1d1d1f] antialiased">
        {children}
      </body>
    </html>
  );
}
