import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Styles for MDX content (the case-study notes in content/notes).
 *
 * The notes were wrapped in `prose` classes, but the typography plugin was never
 * installed, so they rendered as unstyled 16px text with no spacing. Mapping the
 * elements here needs no dependency and matches the structured sections above
 * the notes. Internal links go through next/link; external ones open in a new tab.
 */
const components = {
  h2: ({ children }) => (
    <h2 className="mt-12 text-balance text-fluid-xl font-semibold text-fg first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 text-fluid-lg font-semibold text-fg">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-pretty text-muted">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 space-y-3">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 text-muted">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
      <span className="text-pretty">{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  code: ({ children }) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-fg">{children}</code>
  ),
  a: ({ href = "", children }) => {
    const className = "text-fg underline decoration-accent/60 underline-offset-4 hover:decoration-accent";
    return href.startsWith("/") ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  },
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
