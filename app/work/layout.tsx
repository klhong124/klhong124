import { SiteHeader } from "@/components/layout/site-header";

/**
 * The root layout no longer renders the header (the homepage places it below
 * the full-screen hero), so the work pages mount it themselves, at the top as
 * before.
 */
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
