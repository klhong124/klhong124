"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";

type Dab = { id: number; x: number; y: number; life: number };

type InkTextProps = {
  text?: string;
  /** Gradient stops for the ink, left to right. */
  colors?: string[];
  /** Outline colour of the unpainted text. */
  outline?: string;
  /** Brush radius in viewBox units. */
  brush?: number;
  /** How long a stroke takes to fade, in milliseconds. */
  fade?: number;
  /** Tune to the text: wider for long words. */
  viewBox?: string;
  className?: string;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * Outlined text you paint with the cursor. Each stroke leaves a dab of gradient
 * ink in the fill that fades out over `fade` milliseconds.
 */
export function InkText({
  text = "INK",
  colors = ["#c4b5fd", "#a78bfa", "#38bdf8"],
  outline = "rgba(255, 255, 255, 0.35)",
  brush = 16,
  fade = 1000,
  viewBox = "0 0 300 100",
  className = "",
}: InkTextProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const nextId = useRef(0);
  const [dabs, setDabs] = useState<Dab[]>([]);
  const reduced = useReducedMotion();

  // SVG ids are document-global, so each instance needs its own.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const inkId = `ink-${uid}`;
  const dabId = `ink-dab-${uid}`;
  const maskId = `ink-mask-${uid}`;

  // Age the dabs only while there is ink on the page.
  const painting = dabs.length > 0;
  useEffect(() => {
    if (!painting) return;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = now - last;
      last = now;
      setDabs((current) =>
        current
          .map((dab) => ({ ...dab, life: dab.life - elapsed / fade }))
          .filter((dab) => dab.life > 0),
      );
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [painting, fade]);

  const paint = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (reduced || !matrix) return;
    // Screen pixels to viewBox units, whatever size the SVG is drawn at.
    const { x, y } = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    const id = nextId.current++;
    setDabs((current) => {
      const previous = current[current.length - 1];
      // Skip dabs that would land on top of the last one.
      if (previous && Math.hypot(previous.x - x, previous.y - y) < brush * 0.3) return current;
      return [...current.slice(-80), { id, x, y, life: 1 }];
    });
  };

  const textProps = {
    x: "50%",
    y: "50%",
    textAnchor: "middle",
    dominantBaseline: "middle",
    fontSize: 72,
    fontWeight: 800,
  } as const;

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      role="img"
      aria-label={text}
      onPointerMove={paint}
      className={`block w-full select-none ${className}`}
    >
      <defs>
        <linearGradient id={inkId} x1="0" x2="1" y1="0" y2="0">
          {colors.map((stop, index) => (
            <stop
              key={`${stop}-${index}`}
              offset={`${(index / Math.max(colors.length - 1, 1)) * 100}%`}
              stopColor={stop}
            />
          ))}
        </linearGradient>
        <radialGradient id={dabId}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          {reduced ? (
            // No painting under reduced motion: show the ink fill as it would look finished.
            <rect width="100%" height="100%" fill="white" />
          ) : (
            dabs.map((dab) => (
              <circle
                key={dab.id}
                cx={dab.x}
                cy={dab.y}
                r={brush}
                fill={`url(#${dabId})`}
                opacity={dab.life}
              />
            ))
          )}
        </mask>
        {/* CSS rather than JS, so the outline is drawn even before hydration. */}
        <style>{`
          @keyframes ink-text-draw { from { stroke-dashoffset: 1000; } }
          @media (prefers-reduced-motion: reduce) { .ink-text-outline { animation: none !important; } }
        `}</style>
      </defs>

      <text
        {...textProps}
        className="ink-text-outline"
        fill="transparent"
        stroke={outline}
        strokeWidth={0.6}
        style={{ strokeDasharray: 1000, animation: "ink-text-draw 2.4s ease-out" }}
      >
        {text}
      </text>
      <text {...textProps} fill={`url(#${inkId})`} mask={`url(#${maskId})`} aria-hidden="true">
        {text}
      </text>
    </svg>
  );
}
