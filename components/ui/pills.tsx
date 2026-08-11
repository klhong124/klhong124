import { cn } from "@/utils/cn";

type PillsProps = {
  items: readonly string[];
  /** Accessible name for the list, since the pills carry no heading of their own. */
  label: string;
  className?: string;
};

export function Pills({ items, label, className }: PillsProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-sm text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
