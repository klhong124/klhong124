import { cn } from "@/utils/cn";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: Props) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.28em] text-muted">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold text-fg md:text-5xl">{title}</h2>
      {description && <p className="mt-3 text-base text-muted md:text-lg">{description}</p>}
    </div>
  );
}
