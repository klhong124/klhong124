"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMotionValue, type MotionValue } from "motion/react";
import { useAmbientEnabled } from "@/lib/motion/use-motion-enabled";
import { rafThrottle } from "@/utils/throttle";

export type MouseContextValue = {
  /**
   * Pointer position as motion values rather than React state.
   *
   * This provider wraps the entire application. Holding the coordinates in
   * state meant every single mousemove re-rendered the whole tree, which was
   * the most expensive thing on the site. Motion values update subscribed
   * elements directly, so nothing re-renders.
   */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Flips at most twice per session, so state is appropriate here. */
  isActive: boolean;
  setActive: (active: boolean) => void;
};

const MouseContext = createContext<MouseContextValue | undefined>(undefined);

export const useMouse = () => {
  const context = useContext(MouseContext);
  if (context === undefined) {
    throw new Error("useMouse must be used within a MouseContextProvider");
  }
  return context;
};

export const MouseContextProvider = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hasMoved, setHasMoved] = useState(false);
  const ambientEnabled = useAmbientEnabled();

  // Derived rather than stored, so a capability change cannot leave a stale
  // `true` behind and there is no need to reset state from an effect.
  const isActive = ambientEnabled && hasMoved;

  const setActive = useCallback((active: boolean) => setHasMoved(active), []);

  useEffect(() => {
    // No pointer tracking at all for reduced motion, touch or low-powered
    // devices — every consumer is decorative.
    if (!ambientEnabled) return;

    x.set(window.innerWidth / 2);
    y.set(window.innerHeight / 2);

    // Coalesced to one update per frame so a high-polling-rate mouse cannot
    // outrun the compositor.
    const handleMove = rafThrottle((event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHasMoved(true);
    });

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      handleMove.cancel();
      // Previously this passed a fresh inline function to removeEventListener,
      // so the listener was never actually removed.
      window.removeEventListener("mousemove", handleMove);
    };
  }, [ambientEnabled, x, y]);

  const value = useMemo(
    () => ({ x, y, isActive, setActive }),
    [x, y, isActive, setActive],
  );

  return <MouseContext.Provider value={value}>{children}</MouseContext.Provider>;
};

export default MouseContext;
