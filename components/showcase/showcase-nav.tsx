"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

type ShowcaseNavProps = {
  /** Just what the list needs, so the registry and its prompts stay out of the client bundle. */
  items: ReadonlyArray<{ slug: string; title: string }>;
};

/**
 * The library list. A sticky column from `md` up; below that it becomes a
 * horizontally scrolling chip row above the detail.
 */
export function ShowcaseNav({ items }: ShowcaseNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Showcase" className="md:sticky md:top-24 md:self-start">
      <p className="hidden text-sm uppercase tracking-[0.14em] text-muted md:block">Library</p>
      <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-8 sm:px-8 md:mx-0 md:mt-4 md:flex-col md:gap-1 md:overflow-visible md:px-0">
        {items.map(({ slug, title }) => {
          const href = `/showcase/${slug}`;
          const active = pathname === href;
          return (
            <li key={slug} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center whitespace-nowrap rounded-full border px-4 text-fluid-sm transition-colors md:rounded-lg md:px-3",
                  active
                    ? "border-accent/40 bg-accent/10 text-fg"
                    : "border-white/10 text-muted hover:text-fg md:border-transparent md:hover:bg-white/5",
                )}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
