"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

const strength = 0.22;

/** Subtle Cursor-style magnetic pull scoped to translated button surface. */
export function MagneticLink({ href, children, className, external }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const animateTo = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    setPos({
      x: x * strength,
      y: y * strength,
    });
  };

  const reset = () => {
    setPos({ x: 0, y: 0 });
  };

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => animateTo(relX, relY));
  };

  const commonClasses = cn(
    "relative inline-flex items-center justify-center overflow-hidden rounded-2xl",
    "border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white",
    "shadow-[0_20px_60px_-40px_rgba(15,23,42,0.9)] transition-[box-shadow,transform]",
    "hover:border-indigo-300/40 hover:shadow-[0_25px_80px_-45px_rgba(99,102,241,0.55)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300/80",
    className,
  );

  const style = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    willChange: "transform",
  } as const;

  if (href.startsWith("mailto:")) {
    return (
      <a
        ref={ref}
        href={href}
        className={commonClasses}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onBlur={reset}
      >
        <span>{children}</span>
      </a>
    );
  }

  if (href.startsWith("http") || external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={commonClasses}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onBlur={reset}
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={commonClasses}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      <span>{children}</span>
    </Link>
  );
}
