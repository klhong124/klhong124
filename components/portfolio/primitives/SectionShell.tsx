"use client";

import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  label: string;
  title: string;
  eyebrow?: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  label,
  title,
  eyebrow,
  subtitle,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("relative isolate scroll-mt-8 px-5 sm:px-8 lg:px-14", className)}
    >
      <div className="mx-auto max-w-6xl py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-200/85">
          {label}
        </p>
        {eyebrow && (
          <p className="mt-3 max-w-xl text-sm text-slate-400/95">{eyebrow}</p>
        )}
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id={`${id}-heading`}
            className="max-w-3xl text-4xl font-medium tracking-tight text-white sm:text-5xl"
          >
            {title}
          </h2>
          {subtitle && (
            <div className="max-w-md text-base leading-relaxed text-slate-400">{subtitle}</div>
          )}
        </div>
        <div className="mt-16 space-y-12">{children}</div>
      </div>
    </section>
  );
}
