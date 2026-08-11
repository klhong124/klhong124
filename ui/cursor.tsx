'use client'
import { AnimatePresence, motion } from "motion/react";
import { useMouse } from '@/hooks/useMouse'
import { cn } from "@/utils/cn";

/**
 * Decorative pointer companion.
 *
 * Reads position straight from motion values, so moving the mouse updates the
 * transform without re-rendering. Positioned with `translate` rather than
 * `top`/`left` so it stays on the compositor. `useMouse` only reports activity
 * when ambient motion is enabled, so this is inert for reduced-motion, touch and
 * low-powered devices.
 */
export default function Cursor({
  title = "You",
}: Readonly<{
  title?: string | React.ReactNode;
}>) {
  const { x, y, isActive } = useMouse();

  return (
    <AnimatePresence>
      {isActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
          <motion.div
            className="pointer-events-none absolute left-0 top-0 size-4 rounded-full"
            style={{ x, y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Tag>{title}</Tag>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "ml-3 mt-5",
        "min-w-max whitespace-nowrap rounded-xl rounded-tl-none bg-emerald-700 px-2 py-2 text-xs text-white",
      )}
    >
      {children}
    </div>
  );
};
