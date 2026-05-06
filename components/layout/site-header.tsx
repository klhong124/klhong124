"use client";
import { useAccentTheme } from "./theme-accent-provider";

export function SiteHeader() {
  const { accent, setAccent } = useAccentTheme();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="section-wrap flex items-center justify-between py-4">
        <a href="#hero" className="font-display text-sm tracking-[0.2em] text-fg">RYAN_KWAN</a>
        <nav className="hidden gap-5 text-sm text-muted md:flex">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#contact">Contact</a>
        </nav>
        <select className="rounded-md border border-white/20 bg-transparent px-2 py-1 text-xs" value={accent} onChange={(e) => setAccent(e.target.value as "cyan" | "violet" | "amber")}>
          <option value="cyan">Cyan</option>
          <option value="violet">Violet</option>
          <option value="amber">Amber</option>
        </select>
      </div>
    </header>
  );
}
