"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type MotionCapabilities = {
  /** False when the user has asked for reduced motion. Gates all non-essential animation. */
  motionEnabled: boolean;
  /**
   * Gates the expensive always-on effects — the full-viewport canvas background
   * and the custom cursor. Off for reduced motion, coarse pointers and
   * low-powered devices.
   */
  ambientEnabled: boolean;
  /** True for touch-first devices, where hover-dependent affordances do not apply. */
  coarsePointer: boolean;
};

/**
 * Conservative defaults for the server render and first paint.
 *
 * `ambientEnabled` starts false on purpose: the background canvas and cursor are
 * decorative, so letting them start one frame late costs nothing visually and
 * keeps them off the critical path. Enabling them optimistically would mean
 * every visitor pays for a canvas that some of them should never have received.
 */
const DEFAULTS: MotionCapabilities = {
  motionEnabled: true,
  ambientEnabled: false,
  coarsePointer: false,
};

const MotionCapabilitiesContext = createContext<MotionCapabilities>(DEFAULTS);

/** Rough proxy for "this device will struggle with a per-frame canvas loop". */
function isLowPowered() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) return true;
  return false;
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [capabilities, setCapabilities] = useState<MotionCapabilities>(DEFAULTS);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const lowPowered = isLowPowered();

    const sync = () => {
      const motionEnabled = !reducedMotion.matches;
      setCapabilities({
        motionEnabled,
        ambientEnabled: motionEnabled && !coarse.matches && !lowPowered,
        coarsePointer: coarse.matches,
      });
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, []);

  const value = useMemo(() => capabilities, [capabilities]);

  return (
    <MotionCapabilitiesContext.Provider value={value}>
      {children}
    </MotionCapabilitiesContext.Provider>
  );
}

export function useMotionCapabilities() {
  return useContext(MotionCapabilitiesContext);
}
