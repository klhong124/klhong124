"use client";

import dynamic from "next/dynamic";
import { useAmbientEnabled } from "@/lib/motion/use-motion-enabled";

/**
 * The React Three Fiber backdrop, loaded as a lazy client island.
 *
 * Three points worth knowing:
 *  - `ssr: false` is required, not just an optimisation: R3F uses its own
 *    reconciler and throws on the server.
 *  - The module was previously imported by the hero and calling
 *    `useGLTF.preload` at module scope, which fired 16 GLTF requests even
 *    though the <Canvas> itself was commented out. It is now only imported once
 *    this device has opted in.
 *  - The wrapper is absolutely positioned with fixed inset, so the fallback and
 *    the loaded scene occupy identical space and nothing shifts on arrival.
 */
const TechStack = dynamic(() => import("@/ui/tech-stack"), {
  ssr: false,
  loading: () => null,
});

export function TechStackScene() {
  const ambientEnabled = useAmbientEnabled();
  if (!ambientEnabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-40">
      <TechStack />
    </div>
  );
}
