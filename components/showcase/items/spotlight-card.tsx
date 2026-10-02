"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  /** Colour of the light. The border uses it at full strength. */
  color?: string;
  /** Strength of the soft glow inside the card, from 0 to 1. */
  glowOpacity?: number;
  /** Radius of the border light in pixels. The inner glow is half as wide again. */
  size?: number;
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
  glowOpacity = 0.14,
  size = 220,
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

  const glow = `color-mix(in srgb, ${color} ${Math.round(glowOpacity * 100)}%, transparent)`;

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
        style={{ background: `radial-gradient(${size}px circle at var(--x) var(--y), ${color}, transparent 70%)` }}
      />
      <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-neutral-950 p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300"
          style={{ background: `radial-gradient(${size * 1.5}px circle at var(--x) var(--y), ${glow}, transparent 70%)` }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
