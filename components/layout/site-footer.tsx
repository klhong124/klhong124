import Link from "next/link";
import { profile } from "@/data/portfolio-content";

export function SiteFooter() {
  return (
    <footer className="section-wrap border-t border-white/10 py-10 text-fluid-sm text-muted">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <p>{`${profile.role} in ${profile.location}. Currently at ${profile.currently}.`}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/work" className="transition-colors hover:text-fg">
                Work
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="transition-colors hover:text-fg">
                Contact
              </Link>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
                {profile.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
