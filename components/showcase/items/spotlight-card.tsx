"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  /** Colour of the border light under the cursor. */
  color?: string;
  /** Colour of the soft glow inside the card. */
  glow?: string;
  className?: string;
};

/**
 * A card that tracks its own pointer. A soft glow sits under the cursor inside
 * the card, and the border lights up where the cursor is nearest. The border is
 * a 1px gap around the inner panel, so the light behind it shows through.
 */
export function SpotlightCard({
  children,
  color = "#a78bfa",
  glow = "rgba(167, 139, 250, 0.14)",
  className = "",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // CSS variables instead of state, so tracking the pointer never re-renders.
  const track = (event: PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={track}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      className={`group relative rounded-2xl bg-white/10 p-px ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300"
        style={{ background: `radial-gradient(220px circle at var(--x) var(--y), ${color}, transparent 70%)` }}
      />
      <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-neutral-950 p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300"
          style={{ background: `radial-gradient(320px circle at var(--x) var(--y), ${glow}, transparent 70%)` }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
