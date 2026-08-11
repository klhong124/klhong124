"use client";
import { motion, useMotionTemplate } from "motion/react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useMouse } from "@/hooks/useMouse";
import { cn } from "@/utils/cn";
import { useAmbientEnabled } from "@/lib/motion/use-motion-enabled";
import { duration } from "@/lib/motion/tokens";

/**
 * The canvas is a per-frame effect behind every route, so it is code-split and
 * only requested once we know this device should have it at all.
 */
const LetterGlitch = dynamic(() => import("@/ui/letter-glitch"), { ssr: false });

export const Background = () => {
  const { x, y } = useMouse();
  const pathname = usePathname();
  const ambientEnabled = useAmbientEnabled();

  // Follows the pointer via motion values, so this template updates without
  // re-rendering the component.
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${x}px ${y}px, black 0%, transparent 100%)`;

  return (
    // A plain div, not a <section>: this is decoration and was previously
    // showing up as an unnamed landmark outside <main>.
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 -z-50 h-screen w-screen bg-stone-950"
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-dot-thick-neutral-800")} />

      {ambientEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ WebkitMaskImage: maskImage, maskImage }}
          initial={{ opacity: 0 }}
          animate={{ opacity: pathname === "/" ? 1 : 0.3 }}
          transition={{ duration: duration.ambient }}
        >
          <LetterGlitch
            glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
            glitchSpeed={20}
            centerVignette
            outerVignette={false}
            smooth
          />
        </motion.div>
      )}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-stone-950 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]",
        )}
      />
    </div>
  );
};

export default Background;
