import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { ShowcaseNav } from "@/components/showcase/showcase-nav";
import { showcaseLinks } from "@/data/showcase";

export const metadata: Metadata = {
  title: "Showcase",
  description: "A library of original UI effects. Preview them live, then copy the code or a prompt for your AI agent.",
};

/**
 * Header on top, then the library list on the left and the selected item on the
 * right. Below `md` the list is hidden here and opens as a drawer from the
 * button beside each item's title.
 */
export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  // The explicit single column matters on mobile: an implicit track can grow to
  // fit wide content (the code listings) and push the page sideways.
  return (
    <>
      <SiteHeader />
      <div className="section-wrap grid grid-cols-[minmax(0,1fr)] gap-8 py-10 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12 md:py-16">
        <ShowcaseNav items={showcaseLinks} />
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
