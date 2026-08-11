"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
 */
export function SiteHeader() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStuck(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* -mb-px cancels the sentinel's 1px height so layout is unchanged. */}
      <div ref={sentinelRef} aria-hidden="true" className="h-px -mb-px" />
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          stuck
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
              #systems, a section that no longer exists.

              Below `md` the four links do not fit, and removing the accent picker
              left the mobile header with nothing but the wordmark. Rather than
              build a burger menu for a single-page site, mobile gets the one link
              that matters; the page itself is the navigation. */}
          <nav aria-label="Main">
            <ul className="hidden gap-6 text-fluid-sm text-muted md:flex">
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
            <Link
              href="/#contact"
              className="flex min-h-11 items-center text-fluid-sm text-muted transition-colors hover:text-fg md:hidden"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
