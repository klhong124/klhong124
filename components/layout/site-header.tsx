"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { href: "/#about", label: "Approach" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * Sticky header that is transparent while sitting in its natural position
 * (below the hero on the homepage) and only gains its dark blurred background
 * once it actually pins to the top of the viewport.
 *
 * There is no CSS `:stuck` selector, so a 1px sentinel rendered just above the
 * header is watched with an IntersectionObserver: the moment the sentinel
 * scrolls out of the viewport, the header is stuck. Without JavaScript the
 * header simply stays transparent, which is the correct resting state.
 *
 * Below `md` the inline links are replaced by a burger button that toggles a
 * dropdown panel with the same links.
 */
export function SiteHeader() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStuck(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* -mb-px cancels the sentinel's 1px height so layout is unchanged. */}
      <div ref={sentinelRef} aria-hidden="true" className="h-px -mb-px" />
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          // The open menu needs the solid backdrop even while the header sits
          // in its transparent resting position, or the panel is unreadable
          // over the page content.
          stuck || menuOpen
            ? "border-white/10 bg-black/60 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="section-wrap flex items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="flex min-h-11 items-center font-display text-fluid-sm tracking-[0.2em] text-fg"
          >
          / ryankwan.dev
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

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-md text-fg md:hidden"
          >
            {/* Three bars that fold into a cross; only transform and opacity
                animate, so the toggle stays on the compositor. */}
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 top-[3px] h-0.5 w-full rounded-full bg-current transition-transform duration-300",
                  menuOpen && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[8px] h-0.5 w-full rounded-full bg-current transition-opacity duration-300",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[13px] h-0.5 w-full rounded-full bg-current transition-transform duration-300",
                  menuOpen && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Main"
              className="overflow-hidden md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <ul className="section-wrap flex flex-col pb-4 text-fluid-sm text-muted">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
