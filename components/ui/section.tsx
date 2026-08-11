import { cn } from "@/utils/cn";

type SectionProps = {
  id: string;
  /** Ties the section to its own heading so the landmark is named in a screen reader's list. */
  labelledBy?: string;
  space?: "tight" | "default" | "loose";
  className?: string;
  children: React.ReactNode;
};

const spacing = {
  tight: "py-section-tight",
  default: "py-section",
  loose: "py-section-loose",
} as const;

export function Section({ id, labelledBy, space = "default", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-wrap scroll-mt-24", spacing[space], className)}
    >
      {children}
    </section>
  );
}
