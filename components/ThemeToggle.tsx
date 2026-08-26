"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full border rule text-ink-soft transition-colors duration-300 hover:border-ink-faint dark:text-cream-soft dark:hover:border-cream-soft"
    >
      {theme === "light" ? <Moon size={14} strokeWidth={1.75} /> : <Sun size={14} strokeWidth={1.75} />}
    </button>
  );
}
