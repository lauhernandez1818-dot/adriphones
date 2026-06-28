"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Modo noche" : "Modo día"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:scale-105 hover:shadow-md"
    >
      <Sun
        className={`h-4 w-4 transition-all ${theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      />
    </button>
  );
}
