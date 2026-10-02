"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
import { cn } from "@/utils/cn";

type NavItems = ReadonlyArray<{ slug: string; title: string }>;

function NavLinks({ items, onNavigate }: { items: NavItems; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {items.map(({ slug, title }) => {
        const href = `/showcase/${slug}`;
        const active = pathname === href;
        return (
          <li key={slug}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center rounded-lg border px-3 text-fluid-sm transition-colors",
                active
                  ? "border-accent/40 bg-accent/10 text-fg"
                  : "border-transparent text-muted hover:bg-white/5 hover:text-fg",
              )}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** The library list as a sticky sidebar, from `md` up. Below that, `ShowcaseDrawer` takes over. */
export function ShowcaseNav({ items }: { items: NavItems }) {
  return (
    <nav aria-label="Showcase" className="hidden md:sticky md:top-24 md:block md:self-start">
      <p className="text-sm uppercase tracking-[0.14em] text-muted">Library</p>
      <div className="mt-4">
        <NavLinks items={items} />
      </div>
    </nav>
  );
}

/**
 * Below `md`: a "<" button that opens the library in a drawer from the left.
 *
 * A native modal <dialog> brings the focus trap, Escape to close, an inert page
 * behind it and focus restored on close, with no code of our own. A click on
 * the backdrop lands on the dialog element itself, which is how it closes.
 */
export function ShowcaseDrawer({ items }: { items: NavItems }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Open the component list"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-fg transition-colors hover:border-white/40 md:hidden"
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Showcase"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        // Slide in and out: see .showcase-drawer in styles/globals.scss.
        className="showcase-drawer m-0 h-dvh max-h-none w-72 max-w-[85vw] border-r border-white/10 bg-surface p-0 text-fg"
      >
        <nav aria-label="Showcase" className="flex h-full flex-col p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.14em] text-muted">Library</p>
            <button
              type="button"
              aria-label="Close the component list"
              onClick={close}
              className="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-fg"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="mt-4">
            <NavLinks items={items} onNavigate={close} />
          </div>
        </nav>
      </dialog>
    </>
  );
}
