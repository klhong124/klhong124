import { cn } from "@/utils/cn";

type Props = {
  /** Must match the `labelledBy` passed to the parent `Section`. */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, className }: Props) {
  return (
    <div className={cn("mb-12 max-w-measure", className)}>
      {eyebrow && (
        <p className="mb-3 text-fluid-sm uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      )}
      <h2 id={id} className="text-balance font-display text-fluid-3xl font-semibold text-fg">
        {title}
      </h2>
      {description && <p className="mt-4 text-pretty text-fluid-lg text-muted">{description}</p>}
    </div>
  );
}
