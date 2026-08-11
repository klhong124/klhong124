import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Pills } from "@/components/ui/pills";
import { publishedCaseStudies } from "@/data/portfolio-content";
import { WorkWordmark } from "./work-wordmark";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Ryan Kwan — the Parfetts Cash & Carry platform, a self-hosted photo server, design systems, and interaction experiments.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const client = publishedCaseStudies.filter((study) => study.kind === "client");
  const personal = publishedCaseStudies.filter((study) => study.kind === "personal");

  return (
    <div className="section-wrap py-section">
      <header className="max-w-measure">
        {/* <WorkWordmark /> */}
        <h1 className="text-balance font-display text-fluid-4xl font-semibold text-fg">Work</h1>
        <p className="mt-4 text-pretty text-fluid-lg text-muted">
          Client projects and things I build for myself. Every case study opens with the problem, the
          approach and the outcome, so you can skim first and read only what interests you.
        </p>
      </header>

      <CaseStudyGroup
        id="client-work"
        heading="Client work"
        studies={client}
        className="mt-section"
      />
      <CaseStudyGroup
        id="personal-projects"
        heading="Personal projects"
        studies={personal}
        className="mt-section-tight"
      />
    </div>
  );
}

function CaseStudyGroup({
  id,
  heading,
  studies,
  className,
}: {
  id: string;
  heading: string;
  studies: typeof publishedCaseStudies;
  className?: string;
}) {
  if (studies.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <h2 id={`${id}-heading`} className="text-fluid-2xl font-semibold text-fg">
        {heading}
      </h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {studies.map((study) => (
          <li key={study.slug}>
            <Link href={`/work/${study.slug}`} className="group block h-full">
              <GlassCard className="h-full" round="2xl" innerClassName="flex h-full flex-col p-6">
                <p className="text-fluid-sm uppercase tracking-[0.14em] text-muted">
                  {study.period}
                </p>
                <h3 className="mt-2 text-fluid-xl font-semibold text-fg">{study.title}</h3>
                <p className="mt-1 text-pretty text-muted">{study.subtitle}</p>
                <Pills
                  className="mt-5"
                  items={study.stack.slice(0, 5)}
                  label={`Key technologies for ${study.title}`}
                />
                <p className="mt-6 text-fg">
                  <span className="underline decoration-accent/50 underline-offset-4 transition-colors group-hover:decoration-accent">
                    Read the case study
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block text-accent transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </p>
              </GlassCard>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
