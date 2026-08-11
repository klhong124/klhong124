'use client'
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { spring } from "@/lib/motion/tokens";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";

const DOT_COLORS = ["bg-red-400", "bg-yellow-400", "bg-green-400"];

/**
 * The traffic-light dots on the hero card.
 *
 * These were <button>s with an empty click handler, which put three unlabelled
 * 12px focus stops at the very start of the tab order. They are decoration, so
 * they are now non-interactive and hidden from assistive technology.
 */
const WindowControl = () => {
    const motionEnabled = useMotionEnabled();

    return (
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-0">
            <div className={cn("flex gap-3 p-4 xl:p-6")}>
                {DOT_COLORS.map((color, index) => (
                    <motion.span
                        key={color}
                        className={cn("block size-3 rounded-full", color)}
                        initial={motionEnabled ? { scale: 0 } : false}
                        animate={{ scale: 1 }}
                        transition={{ ...spring.bouncy, delay: index * 0.08 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default WindowControl;
