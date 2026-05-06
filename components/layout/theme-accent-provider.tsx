"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Accent = "cyan" | "violet" | "amber";
const AccentContext = createContext<{ accent: Accent; setAccent: (accent: Accent) => void } | null>(null);

export function ThemeAccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = useState<Accent>("cyan");
  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);
  return <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>;
}

export function useAccentTheme() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccentTheme must be used within ThemeAccentProvider");
  return ctx;
}
