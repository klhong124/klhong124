"use client";

import { useMotionCapabilities } from "./motion-provider";

/**
 * True when the user has not asked for reduced motion.
 *
 * Use this to skip an animation entirely — pass `initial={enabled ? {...} : false}`
 * so the element renders in its final state rather than animating slowly to it.
 * Reduced motion means "do not move things", not "move them gently".
 */
export function useMotionEnabled() {
  return useMotionCapabilities().motionEnabled;
}

/** True only when expensive ambient effects are worth running on this device. */
export function useAmbientEnabled() {
  return useMotionCapabilities().ambientEnabled;
}
