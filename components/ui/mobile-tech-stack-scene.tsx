"use client";

import dynamic from "next/dynamic";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";

const MobileTechStack = dynamic(() => import("@/ui/mobile-tech-stack"), {
  ssr: false,
  loading: () => null,
});

/**
 * Mobile-only 3D backdrop. Allowed on touch devices as long as reduced motion
 * is off — unlike the desktop scene, which also requires a fine pointer.
 */
export function MobileTechStackScene() {
  const motionEnabled = useMotionEnabled();
  if (!motionEnabled) return null;

  return <MobileTechStack />;
}
