"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const DESTINATIONS = [
  { label: "Top", href: "/#hero" },
  { label: "Approach", href: "/#about" },
  { label: "Selected work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
  { label: "All case studies", href: "/work" },
] as const;

/**
 * Cmd/Ctrl+K jump list.
 *
 * It is opened from the keyboard, so it has to be usable from the keyboard: it
 * announces itself as a modal dialog, closes on Escape, moves focus to the first
 * option on open and hands focus back to whatever had it before. Previously it
 * was a plain div with a click handler and no way out except the mouse.
 *
 * The email arrives as a prop rather than being read from the content module,
 * because importing that here would pull the schema and every string in it into
 * the client bundle for the sake of one address.
 */
export function CommandPalette({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setCopied(false);
    restoreFocusTo.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((isOpen) => {
          if (!isOpen) restoreFocusTo.current = document.activeElement as HTMLElement;
          return !isOpen;
        });
        return;
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) firstItemRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be refused outright (permissions, insecure origin).
      // Showing the address is a working fallback, not an error state.
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 pt-24 backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Jump to"
        className="w-full max-w-xl rounded-2xl border border-white/15 bg-surface/95 p-3 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="px-4 pb-2 pt-1 text-fluid-xs uppercase tracking-[0.2em] text-muted">
          Jump to
        </p>

        {DESTINATIONS.map((item, index) => (
          <button
            key={item.href}
            ref={index === 0 ? firstItemRef : undefined}
            type="button"
            className="block w-full rounded-lg px-4 py-3 text-left text-fluid-sm text-fg hover:bg-white/10"
            onClick={() => go(item.href)}
          >
            {item.label}
          </button>
        ))}

        <button
          type="button"
          className="mt-2 block w-full rounded-lg border-t border-white/10 px-4 py-3 text-left text-fluid-sm text-accent hover:bg-white/10"
          onClick={copyEmail}
        >
          {copied ? "Email copied" : `Copy email — ${email}`}
        </button>

        <p role="status" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </p>

        <p className="px-4 pb-1 pt-2 text-fluid-xs text-muted">
          Escape to close
        </p>
      </div>
    </div>
  );
}
