"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { cn } from "@/utils/cn";
import { demos, type Control, type Value, type Values } from "@/components/showcase/demos";

const TABS = ["Preview", "Code", "Prompt"] as const;
type Tab = (typeof TABS)[number];

type PlaygroundProps = {
  /** Picks the demo, its controls and its usage line from `demos`. */
  slug: string;
  source: string;
  fileName: string;
  prompt: string;
  className?: string;
};

const initialValues = (controls: Control[]): Values =>
  Object.fromEntries(controls.map((control) => [control.name, control.initial]));

/**
 * Preview / Code / Prompt tabs, plus a props panel beside the preview that
 * drives the demo live. Copying the prompt or code lives in `CopyMenu`, next to
 * the item's title.
 *
 * Tabs follow the WAI-ARIA pattern: one tab stop, arrow keys move and select.
 * Switching away from Preview unmounts the demo, which also stops its
 * animation; the props survive because they live here.
 */
export function Playground({ slug, source, fileName, prompt, className }: PlaygroundProps) {
  const demo = demos[slug];
  const [tab, setTab] = useState<Tab>("Preview");
  const [values, setValues] = useState(() => initialValues(demo.controls));
  const id = useId();
  const tabId = (name: Tab) => `${id}-tab-${name}`;

  const set = (name: string, value: Value) => setValues((current) => ({ ...current, [name]: value }));
  const usage = demo.usage(values);

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
      <div className="border-b border-white/10 p-1.5">
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
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={tabId(tab)}>
        {tab === "Preview" && (
          <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="flex min-h-[26rem] items-center justify-center p-6 md:p-10">
              {demo.render(values, set)}
            </div>
            <section
              aria-labelledby={`${id}-props`}
              className="border-t border-white/10 p-4 lg:border-l lg:border-t-0"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 id={`${id}-props`} className="text-sm uppercase tracking-[0.14em] text-muted">
                  Props
                </h2>
                <button
                  type="button"
                  onClick={() => setValues(initialValues(demo.controls))}
                  className="min-h-11 rounded-lg px-3 text-fluid-sm text-muted transition-colors hover:text-fg"
                >
                  Reset
                </button>
              </div>
              <div className="mt-2 space-y-4">
                {demo.controls.map((control) => (
                  <ControlField
                    key={control.name}
                    control={control}
                    value={values[control.name]}
                    onChange={(value) => set(control.name, value)}
                  />
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pl-3">
                  <span className="font-mono text-xs text-muted">Usage</span>
                  <CopyButton text={usage} label="Copy usage" className="border-0" />
                </div>
                <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-fg/90">
                  <code>{usage}</code>
                </pre>
              </div>
            </section>
          </div>
        )}
        {tab === "Code" && <Listing caption={fileName} text={source} />}
        {tab === "Prompt" && <Listing caption="Paste into your AI coding agent" text={prompt} wrap />}
      </div>
    </div>
  );
}

/** One native input per control type, labelled and showing its current value. */
function ControlField({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: Value;
  onChange: (value: Value) => void;
}) {
  const id = useId();
  const label = (
    <label htmlFor={id} className="text-fluid-sm text-fg">
      {control.label}
    </label>
  );

  switch (control.type) {
    case "range":
      return (
        <div>
          <div className="flex items-center justify-between gap-2">
            {label}
            <output htmlFor={id} className="font-mono text-xs text-muted">
              {String(value)}
            </output>
          </div>
          <input
            id={id}
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={Number(value)}
            onChange={(event) => onChange(Number(event.target.value))}
            className="mt-2 w-full accent-accent"
          />
        </div>
      );
    case "color":
      return (
        <div className="flex items-center justify-between gap-2">
          {label}
          <input
            id={id}
            type="color"
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
            className="h-9 w-14 cursor-pointer rounded-md border border-white/15 bg-transparent p-1"
          />
        </div>
      );
    case "text":
      return (
        <div>
          {label}
          <input
            id={id}
            type="text"
            value={String(value)}
            maxLength={control.maxLength}
            onChange={(event) => onChange(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-fluid-sm text-fg"
          />
        </div>
      );
    case "toggle":
      return (
        <div className="flex min-h-11 items-center justify-between gap-2">
          {label}
          <input
            id={id}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
            className="size-5 accent-accent"
          />
        </div>
      );
  }
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

type CopyTarget = "prompt" | "code";

/**
 * One copy icon with a two-item menu: the prompt for an AI agent, or the code.
 * Closes on Escape, on a pick and on a click outside; arrow keys move between
 * items, and focus returns to the trigger.
 */
export function CopyMenu({ prompt, source }: { prompt: string; source: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<CopyTarget | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector("button")?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async (target: CopyTarget) => {
    setOpen(false);
    triggerRef.current?.focus();
    try {
      await navigator.clipboard.writeText(target === "prompt" ? prompt : source);
      setCopied(target);
    } catch {
      // Clipboard access can be refused (permissions, insecure origin). The
      // Code and Prompt tabs still show the text, so selecting it by hand works.
    }
  };

  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const items = [...(menuRef.current?.querySelectorAll("button") ?? [])];
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    items[(index + step + items.length) % items.length]?.focus();
  };

  const Icon = copied ? Check : Copy;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Copy"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex min-h-11 items-center gap-1.5 rounded-xl border border-white/15 px-3 text-fg transition-colors hover:border-white/40 hover:bg-white/5"
      >
        <Icon aria-hidden="true" className="size-4" />
        <ChevronDown aria-hidden="true" className={cn("size-3.5 text-muted transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Copy"
          onKeyDown={moveFocus}
          className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-white/15 bg-surface p-1 shadow-2xl"
        >
          {(
            [
              ["prompt", "Copy prompt", "For your AI coding agent"],
              ["code", "Copy code", "The component file"],
            ] as const
          ).map(([target, label, hint]) => (
            <button
              key={target}
              type="button"
              role="menuitem"
              onClick={() => copy(target)}
              className="flex min-h-11 w-full flex-col items-start justify-center rounded-lg px-3 py-2 text-left hover:bg-white/10 focus-visible:bg-white/10"
            >
              <span className="text-fluid-sm text-fg">{label}</span>
              <span className="text-xs text-muted">{hint}</span>
            </button>
          ))}
        </div>
      )}

      <span role="status" className="sr-only">
        {copied ? `Copied ${copied} to clipboard` : ""}
      </span>
    </div>
  );
}

function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
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
      // text is still on screen, so selecting it by hand works.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "min-h-11 rounded-lg border border-white/15 px-4 text-fluid-sm text-fg transition-colors hover:border-white/40 hover:bg-white/5",
          className,
        )}
      >
        {copied ? "Copied" : label}
      </button>
      <span role="status" className="sr-only">
        {copied ? `Copied ${label.replace("Copy ", "")} to clipboard` : ""}
      </span>
    </>
  );
}
