import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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
