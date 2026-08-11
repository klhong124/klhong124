"use client";
import Link from "next/link";
import { useAccentTheme } from "./theme-accent-provider";

const NAV_LINKS = [
  { href: "/#about", label: "Approach" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { accent, setAccent } = useAccentTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="section-wrap flex items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex min-h-11 items-center font-display text-fluid-sm tracking-[0.2em] text-fg"
        >
          RYAN_KWAN
        </Link>

        {/* Anchors point at real sections. "Systems" previously linked to
            #systems, a section that no longer exists. */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-6 text-fluid-sm text-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <label htmlFor="accent-select" className="sr-only">
            Accent colour
          </label>
          <select
            id="accent-select"
            className="min-h-11 rounded-md border border-white/20 bg-transparent px-2 py-1 text-fluid-sm text-fg"
            value={accent}
            onChange={(event) => setAccent(event.target.value as "cyan" | "violet" | "amber")}
          >
            <option value="cyan">Cyan</option>
            <option value="violet">Violet</option>
            <option value="amber">Amber</option>
          </select>
        </div>
      </div>
    </header>
  );
}
