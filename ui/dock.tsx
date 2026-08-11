"use client";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { spring, duration } from "@/lib/motion/tokens";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";

export type DockItem = {
  /** Used for the icon filename, the tooltip and the accessible name. */
  title: string;
  href: string;
  /** Spelled out for assistive technology, e.g. "LinkedIn profile". */
  label: string;
};

/**
 * macOS-style magnifying dock for social links.
 *
 * Magnification now uses `scale` rather than animated `width`/`height`, so it
 * runs on the compositor instead of forcing layout on every pointer move. Each
 * link has a 44px hit area and an explicit accessible name — previously they
 * relied on the inner image's alt text, which read as "Linkedin" and "Whatsapp".
 *
 * Items are passed in rather than read from the content module. Importing that
 * module here made this client component pull Zod and every case study into the
 * browser bundle, for the sake of one email address.
 */
const Dock = ({ items, className }: { items: DockItem[]; className?: string }) => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const motionEnabled = useMotionEnabled();

  return (
    <nav aria-label="Social links" className={cn("mt-12", className)}>
      <ul
        onMouseMove={(event) => motionEnabled && mouseX.set(event.pageX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="flex items-center justify-center gap-3"
      >
        {items.map((item) => (
          <li key={item.title}>
            <DockIcon mouseX={mouseX} magnify={motionEnabled} {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

function DockIcon({
  mouseX,
  title,
  href,
  label,
  magnify,
}: DockItem & { mouseX: MotionValue<number>; magnify: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  const scale = useSpring(useTransform(distance, [-150, 0, 150], [1, 1.35, 1]), spring.pointer);
  const isExternal = href.startsWith("http");

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative flex size-11 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20"
    >
      <motion.span
        style={magnify ? { scale } : undefined}
        className="flex items-center justify-center"
      >
        <Image
          src={`/svg/${title}.svg`}
          alt=""
          aria-hidden="true"
          width={22}
          height={22}
          className="invert"
        />
      </motion.span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: duration.fast }}
            className={cn(
              "pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-pre rounded-md px-2 py-0.5",
              "border border-white/10 bg-neutral-900 text-sm text-neutral-100",
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default Dock;
