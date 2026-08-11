"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { useMouse } from "@/hooks/useMouse";
import { useAmbientEnabled } from "./use-motion-enabled";
import { subscribeToScroll } from "./shared-scroll";
import { duration, ease } from "./tokens";

/**
 * Pointer-tracked border glow, shared by GlassCard and the hero's GlowingCard.
 *
 * The two components previously carried near-identical copies of this logic
 * that had drifted apart — different durations and different easing for the same
 * effect. It now reads the shared pointer motion values and the shared scroll
 * subscription rather than attaching listeners per instance, and writes only to
 * CSS custom properties so nothing triggers layout.
 */
export function useGlow({ proximity = 72 }: { proximity?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const ambientEnabled = useAmbientEnabled();
  const { x, y } = useMouse();

  useEffect(() => {
    const el = ref.current;
    if (!el || !ambientEnabled) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const { left, top, width, height } = el.getBoundingClientRect();
      const { x: pointerX, y: pointerY } = lastPosition.current;

      const centerX = left + width * 0.5;
      const centerY = top + height * 0.5;

      const isActive =
        pointerX > left - proximity &&
        pointerX < left + width + proximity &&
        pointerY > top - proximity &&
        pointerY < top + height + proximity;

      el.style.setProperty("--active", isActive ? "1" : "0");
      if (!isActive) return;

      const currentAngle = Number.parseFloat(el.style.getPropertyValue("--start")) || 0;
      const targetAngle =
        (180 * Math.atan2(pointerY - centerY, pointerX - centerX)) / Math.PI + 90;
      // Take the shorter way round so the glow never spins the long way.
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;

      animate(currentAngle, currentAngle + angleDiff, {
        duration: duration.ambient,
        ease: ease.out,
        onUpdate: (value) => el.style.setProperty("--start", String(value)),
      });
    };

    const schedule = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    const unsubscribeX = x.on("change", (value) => {
      lastPosition.current.x = value;
      schedule();
    });
    const unsubscribeY = y.on("change", (value) => {
      lastPosition.current.y = value;
      schedule();
    });
    const unsubscribeScroll = subscribeToScroll(schedule);

    return () => {
      unsubscribeX();
      unsubscribeY();
      unsubscribeScroll();
      if (frame !== null) cancelAnimationFrame(frame);
      el.style.setProperty("--active", "0");
    };
  }, [ambientEnabled, proximity, x, y]);

  return ref;
}
