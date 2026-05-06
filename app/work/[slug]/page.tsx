import { notFound } from "next/navigation";
import { getAllProjectSlugs } from "@/lib/mdx";
import Link from "next/link";

const mdxMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  builtbypixel: () => import("@/content/projects/builtbypixel.mdx"),
  "oasis-infinite": () => import("@/content/projects/oasis-infinite.mdx"),
  "three-d-experiments": () => import("@/content/projects/three-d-experiments.mdx"),
  "ai-workflows": () => import("@/content/projects/ai-workflows.mdx"),
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loader = mdxMap[slug];
  if (!loader) notFound();
  const { default: Content } = await loader();
  return (
    <article className="section-wrap py-20">
      <Link href="/#work" className="text-sm text-muted">← Back to work</Link>
      <div className="prose prose-invert mt-8 max-w-3xl">
        <Content />
      </div>
    </article>
  );
}
