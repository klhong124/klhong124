import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudy, getPublishedCaseStudySlugs } from "@/data/portfolio-content";
import type { CaseStudy } from "@/lib/content/schema";
import { ExternalLinkList } from "@/components/ui/external-link-list";
import { Pills } from "@/components/ui/pills";

/**
 * Optional long-form prose, appended after the structured sections. Only a few
 * case studies have more to say than the sections cover, so this map is sparse
 * on purpose and kept explicit rather than resolved from the filesystem.
 */
const notes: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  immich: () => import("@/content/notes/immich.mdx"),
};

/**
 * Published slugs only. A draft is unfinished writing, and an unfinished case
 * study reachable by URL is worse than no case study — `noindex` alone still
 * leaves it one guessed URL away from a reader.
 */
export function generateStaticParams() {
  return getPublishedCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || study.status === "draft") return {};

  return {
    title: study.title,
    description: study.subtitle,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} | Ryan Kwan`,
      description: study.subtitle,
      type: "article",
    },
  };
}

const detailSections = [
  { key: "architecture", heading: "Architecture moves" },
  { key: "performance", heading: "Performance levers" },
  { key: "impact", heading: "Engineering impact" },
  { key: "challenges", heading: "Challenges conquered" },
] as const satisfies ReadonlyArray<{ key: keyof CaseStudy; heading: string }>;

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || study.status === "draft") notFound();

  const loadNotes = notes[study.slug];
  const Notes = loadNotes ? (await loadNotes()).default : null;

  return (
    <article className="section-wrap py-16 md:py-24">
      <Link
        href="/#work"
        className="inline-flex min-h-11 items-center gap-2 text-fluid-sm text-muted transition-colors hover:text-fg"
      >
        <span aria-hidden="true">&larr;</span> Back to work
      </Link>

      <header className="mt-8 max-w-prose">
        <p className="text-sm uppercase tracking-[0.14em] text-muted">
          {study.kind === "client" ? "Client work" : "Personal project"} · {study.period}
        </p>
        <h1 className="mt-3 text-balance text-fluid-3xl font-semibold text-fg">{study.title}</h1>
        <p className="mt-3 text-fluid-lg text-muted">{study.subtitle}</p>
        <Pills className="mt-6" items={study.stack} label={`Technologies used on ${study.title}`} />
        {study.links.length > 0 && (
          <ExternalLinkList className="mt-6" links={study.links} />
        )}
      </header>

      {study.coverImage && (
        <div className="relative mt-10 aspect-[16/10] max-w-4xl overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={study.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover object-top"
          />
        </div>
      )}

      {/* Problem / approach / outcome sits above the detail so the whole story is
          readable without scrolling into the bullets. */}
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {(
          [
            ["The problem", study.problem],
            ["The approach", study.approach],
            ["The outcome", study.outcome],
          ] as const
        ).map(([heading, body]) => (
          <section key={heading}>
            <h2 className="text-sm uppercase tracking-[0.14em] text-accent">{heading}</h2>
            <p className="mt-3 text-pretty text-muted">{body}</p>
          </section>
        ))}
      </div>

      <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
        {detailSections.map(({ key, heading }) => (
          <section key={key}>
            <h2 className="text-fluid-xl font-semibold text-fg">{heading}</h2>
            <ul className="mt-4 space-y-3">
              {(study[key] as string[]).map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {Notes && (
        <div className="prose prose-invert mt-16 max-w-prose prose-headings:text-fg prose-p:text-muted">
          <Notes />
        </div>
      )}

      <footer className="mt-20 border-t border-white/10 pt-8">
        <Link
          href="/#contact"
          className="inline-flex min-h-11 items-center text-fg underline decoration-accent/60 underline-offset-4"
        >
          Get in touch about work like this
        </Link>
      </footer>
    </article>
  );
}
