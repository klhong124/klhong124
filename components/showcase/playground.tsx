"use client";

import { useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const TABS = ["Preview", "Code", "Prompt"] as const;
type Tab = (typeof TABS)[number];

type PlaygroundProps = {
  /** The live demo. */
  children: ReactNode;
  source: string;
  fileName: string;
  prompt: string;
  className?: string;
};

/**
 * Preview / Code / Prompt tabs with copy buttons that are always in reach, so a
 * visitor can grab the code or prompt straight from the preview.
 *
 * Tabs follow the WAI-ARIA pattern: one tab stop, arrow keys move and select.
 * Switching away from Preview unmounts the demo, which also stops its animation.
 */
export function Playground({ children, source, fileName, prompt, className }: PlaygroundProps) {
  const [tab, setTab] = useState<Tab>("Preview");
  const id = useId();
  const tabId = (name: Tab) => `${id}-tab-${name}`;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = TABS[(TABS.indexOf(tab) + step + TABS.length) % TABS.length];
    setTab(next);
    document.getElementById(tabId(next))?.focus();
  };

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/10 bg-surface/60", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 p-1.5">
        <div role="tablist" aria-label="View" className="flex gap-1">
          {TABS.map((name) => (
            <button
              key={name}
              id={tabId(name)}
              type="button"
              role="tab"
              aria-selected={tab === name}
              aria-controls={`${id}-panel`}
              tabIndex={tab === name ? 0 : -1}
              onClick={() => setTab(name)}
              onKeyDown={onKeyDown}
              className={cn(
                "min-h-11 rounded-lg px-4 text-fluid-sm transition-colors",
                tab === name ? "bg-white/10 text-fg" : "text-muted hover:text-fg",
              )}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <CopyButton text={prompt} label="Copy prompt" />
          <CopyButton text={source} label="Copy code" />
        </div>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={tabId(tab)}>
        {tab === "Preview" && (
          <div className="flex min-h-[26rem] items-center justify-center p-6 md:p-10">{children}</div>
        )}
        {tab === "Code" && <Listing caption={fileName} text={source} />}
        {tab === "Prompt" && <Listing caption="Paste into your AI coding agent" text={prompt} wrap />}
      </div>
    </div>
  );
}

function Listing({ caption, text, wrap }: { caption: string; text: string; wrap?: boolean }) {
  return (
    <figure>
      <figcaption className="border-b border-white/10 px-4 py-2 font-mono text-xs text-muted">
        {caption}
      </figcaption>
      {/* Focusable so keyboard users can scroll the listing. */}
      <pre
        tabIndex={0}
        className={cn(
          "max-h-[36rem] overflow-auto p-4 font-mono text-sm leading-relaxed text-fg/90",
          wrap && "whitespace-pre-wrap",
        )}
      >
        <code>{text}</code>
      </pre>
    </figure>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard access can be refused (permissions, insecure origin). The
      // Code and Prompt tabs still show the text, so selecting it by hand works.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="min-h-11 rounded-lg border border-white/15 px-4 text-fluid-sm text-fg transition-colors hover:border-white/40 hover:bg-white/5"
      >
        {copied ? "Copied" : label}
      </button>
      <span role="status" className="sr-only">
        {copied ? `Copied ${label.replace("Copy ", "")} to clipboard` : ""}
      </span>
    </>
  );
}
