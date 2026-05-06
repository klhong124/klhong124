"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  const items = [
    ["Hero", "/#hero"],
    ["Featured Work", "/#work"],
    ["Contact", "/#contact"],
    ["BuiltByPixel Case Study", "/work/builtbypixel"],
  ] as const;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 pt-24 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-black/80 p-3" onClick={(e) => e.stopPropagation()}>
        {items.map(([label, href]) => (
          <button
            key={label}
            className="block w-full rounded-lg px-4 py-3 text-left text-sm text-fg hover:bg-white/10"
            onClick={() => {
              setOpen(false);
              router.push(href);
            }}
          >
            {label}
          </button>
        ))}
        <button
          className="mt-2 block w-full rounded-lg px-4 py-3 text-left text-sm text-amber-300 hover:bg-white/10"
          onClick={() => navigator.clipboard.writeText("ryankwan.dev@gmail.com")}
        >
          Copy Email
        </button>
      </div>
    </div>
  );
}
