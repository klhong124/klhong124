"use client";

import { cn } from "@/utils/cn";

type SectionProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("section-wrap py-20 md:py-28", className)}>
      {children}
    </section>
  );
}
