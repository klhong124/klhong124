import Link from "next/link";

const NAV_LINKS = [
  { href: "/#about", label: "Approach" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * A server component again. It only became a client component to read the accent
 * from context for the colour picker; with the accent fixed in CSS there is no
 * state here, so the header ships no JavaScript.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="section-wrap flex items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex min-h-11 items-center font-display text-fluid-sm tracking-[0.2em] text-fg"
        >
          RYAN_KWAN
        </Link>

        {/* Anchors point at real sections. "Systems" previously linked to
            #systems, a section that no longer exists.

            Below `md` the four links do not fit, and removing the accent picker
            left the mobile header with nothing but the wordmark. Rather than
            build a burger menu for a single-page site, mobile gets the one link
            that matters; the page itself is the navigation. */}
        <nav aria-label="Main">
          <ul className="hidden gap-6 text-fluid-sm text-muted md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            className="flex min-h-11 items-center text-fluid-sm text-muted transition-colors hover:text-fg md:hidden"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
