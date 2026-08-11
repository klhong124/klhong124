import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Pills } from "@/components/ui/pills";
import { featuredCaseStudies } from "@/data/portfolio-content";

export function FeaturedWorkSection() {
  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow="Selected work"
        title="What I have built"
        description="Each case study leads with the problem, the approach and the outcome, so you can decide in a few seconds whether it is worth reading."
      />
      <ul className="grid gap-5 md:grid-cols-2">
        {featuredCaseStudies.map((study) => (
          <li key={study.slug}>
            {/* The whole card is one link, so there is a single tab stop per project
                and no nested interactive elements. */}
            <Link href={`/work/${study.slug}`} className="group block h-full">
              <GlassCard className="h-full" round="2xl" innerClassName="flex h-full flex-col p-6">
                <p className="text-fluid-sm uppercase tracking-[0.14em] text-muted">
                  {study.kind === "client" ? "Client work" : "Personal project"} · {study.period}
                </p>
                <h3 className="mt-2 text-fluid-xl font-semibold text-fg">{study.title}</h3>
                <p className="mt-1 text-pretty text-muted">{study.subtitle}</p>

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
    </Section>
  );
}

/** Cards show the opening sentence; the full text lives on the case study page. */
function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
}
