import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { CoverImage } from "@/components/ui/cover-image";
import { Pills } from "@/components/ui/pills";
import { ExperienceCard } from "@/components/sections/experience-card";
import { publishedCaseStudies, timeline } from "@/data/portfolio-content";

/**
 * The single work section: every published case study grouped like the old
 * /work index (client work, then personal projects), followed by the
 * employment timeline. All three blocks sort newest first.
 */
export function WorkSection() {
  const client = sortByRecency(publishedCaseStudies.filter((study) => study.kind === "client"));
  const personal = sortByRecency(
    publishedCaseStudies.filter((study) => study.kind === "personal"),
  );

  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow="Work & experience"
        title="What I have built"
        description="Client platforms, personal infra, side projects, and the roles behind them — newest first, each case study leading with the problem, approach, and outcome."
      />

      <CaseStudyGroup id="client-work" heading="Client work" studies={client} />
      <CaseStudyGroup
        id="personal-projects"
        heading="Personal projects"
        studies={personal}
        className="mt-16"
      />

      {/* Keeps the #experience anchor working for the header nav and palette. */}
      <div id="experience" className="mt-16 scroll-mt-24">
        <h3 className="text-fluid-2xl font-semibold text-fg">Where I have worked</h3>
        <p className="mt-2 text-muted">Most recent first. Live links where the work is public.</p>
        <ol className="mt-8 space-y-6 border-l border-white/15 pl-6 md:pl-8">
          {timeline.map((item) => (
            <li key={item.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-7 size-3 rounded-full bg-accent md:-left-[39px]"
              />
              <ExperienceCard item={item} />
            </li>
          ))}
        </ol>
      </div>
    </Section>
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
    <div id={id} className={className}>
      <h3 className="text-fluid-2xl font-semibold text-fg">{heading}</h3>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {studies.map((study) => (
          <li key={study.slug}>
            {/* The whole card is one link, so there is a single tab stop per project
                and no nested interactive elements. */}
            <Link href={`/work/${study.slug}`} className="group block h-full">
              <GlassCard className="h-full" round="2xl" innerClassName="flex h-full flex-col p-6">
                {/* On md+ the cover takes only half the width, beside the header;
                    on mobile it stays a full-bleed banner above it. */}
                <div className="md:flex md:items-start md:gap-6">
                  {study.coverImage && (
                    <CoverImage
                      src={study.coverImage}
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="-mx-6 -mt-6 mb-5 aspect-[16/10] rounded-t-2xl border-x-0 border-t-0 md:order-2 md:mx-0 md:my-0 md:w-1/2 md:shrink-0 md:rounded-xl md:border"
                    />
                  )}
                  <div className="md:flex-1">
                    <p className="text-fluid-sm uppercase tracking-[0.14em] text-muted">
                      {study.period}
                    </p>
                    <h4 className="mt-2 text-fluid-xl font-semibold text-fg">{study.title}</h4>
                    <p className="mt-1 text-pretty text-muted">{study.subtitle}</p>
                  </div>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="text-accent">Problem</dt>
                    <dd className="mt-1 text-pretty text-muted">{firstSentence(study.problem)}</dd>
                  </div>
                  <div>
                    <dt className="text-accent">Outcome</dt>
                    <dd className="mt-1 text-pretty text-muted">{firstSentence(study.outcome)}</dd>
                  </div>
                </dl>

                <Pills
                  className="mt-5"
                  items={study.stack.slice(0, 5)}
                  label={`Key technologies for ${study.title}`}
                />

                <p className="mt-6 pt-1 text-fg">
                  <span className="underline decoration-accent/50 underline-offset-4 transition-colors group-hover:decoration-accent">
                    Read the case study
                  </span>
                  <span aria-hidden="true" className="ml-2 inline-block text-accent transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </p>
              </GlassCard>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Newest first, keyed on the first year in the display period ("2025 — Present" → 2025). */
function sortByRecency(studies: typeof publishedCaseStudies) {
  return [...studies].sort((a, b) => firstYear(b.period) - firstYear(a.period));
}

function firstYear(period: string) {
  return Number(period.match(/\d{4}/)?.[0] ?? 0);
}

/** Cards show the opening sentence; the full text lives on the case study page. */
function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
}
