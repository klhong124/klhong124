import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { Pills } from "@/components/ui/pills";
import { CopyMenu, Playground } from "@/components/showcase/playground";
import { ShowcaseDrawer } from "@/components/showcase/showcase-nav";
import { getShowcaseItem, showcaseItems, showcaseLinks } from "@/data/showcase";

export function generateStaticParams() {
  return showcaseItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getShowcaseItem(slug);
  if (!item) return {};

  return {
    title: `${item.title} · Showcase`,
    description: item.summary,
    alternates: { canonical: `/showcase/${item.slug}` },
    openGraph: {
      title: `${item.title} · Showcase | Ryan Kwan`,
      description: item.summary,
    },
  };
}

export default async function ShowcaseItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getShowcaseItem(slug);
  if (!item) notFound();

  // Read at build time, so the Code tab is always the file that renders the
  // preview. The slug has already matched a registry entry, so it is never raw
  // URL input, and the folder is a literal so the build only traces that folder.
  const fileName = `${item.slug}.tsx`;
  const source = await readFile(
    path.join(process.cwd(), "components/showcase/items", fileName),
    "utf8",
  );

  // Switching items scrolls this article into view; the margin keeps its
  // heading clear of the sticky header.
  return (
    <article className="scroll-mt-24">
      <header>
        <div className="flex items-center gap-3">
          <ShowcaseDrawer items={showcaseLinks} />
          <h1 className="min-w-0 flex-1 text-balance text-fluid-3xl font-semibold text-fg">{item.title}</h1>
          <CopyMenu prompt={item.prompt} source={source} />
        </div>
        <p className="mt-3 max-w-prose text-pretty text-fluid-lg text-muted">{item.summary}</p>
        <Pills className="mt-5" items={item.deps} label={`Dependencies for ${item.title}`} />
      </header>

      <Playground
        className="mt-8"
        slug={item.slug}
        fileName={fileName}
        source={source}
        prompt={item.prompt}
      />
    </article>
  );
}
