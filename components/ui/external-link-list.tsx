import { cn } from "@/utils/cn";
import type { Link as ContentLink } from "@/lib/content/schema";

type ExternalLinkListProps = {
  links: readonly ContentLink[];
  className?: string;
};

/**
 * Live links are the strongest trust signal on the site, so they get real
 * affordance: a visible underline, an explicit new-tab hint for screen readers,
 * and a touch target that clears 44px.
 */
export function ExternalLinkList({ links, className }: ExternalLinkListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center gap-2 text-fg underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {link.label}
            <span aria-hidden="true" className="text-accent">
              &#8599;
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
