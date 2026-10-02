import type { Metadata } from "next";
import "@/styles/globals.scss";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Inter_Tight, Space_Grotesk } from "next/font/google";
import { MouseContextProvider } from "@/hooks/useMouse";
import { MotionProvider } from "@/lib/motion/motion-provider";
import { Background } from "@/ui/background";
import Cursor from "@/ui/cursor";
import { SiteFooter } from "@/components/layout/site-footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { profile } from "@/data/portfolio-content";
import { SITE_URL } from "@/app/sitemap";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

/**
 * Body font. Previously a raw `@font-face` pointing at a 63KB .ttf with no
 * `font-display`, so the browser held the text invisible until the font arrived
 * — Lighthouse flagged it, and it was the reason LCP lagged well behind the HTML.
 * Going through next/font gets a subset woff2, a preload hint and `swap`.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// The intro already opens with the role, so don't prefix it again.
const description = `${profile.intro} Based in ${profile.location}, currently at ${profile.currently}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Ryan Kwan",
    default: "Ryan Kwan — Creative Frontend Engineer, London",
  },
  description,
  applicationName: "Ryan Kwan",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Ryan Kwan",
    "Creative Frontend Engineer",
    "Frontend Engineer",
    "London",
    "Next.js",
    "React",
    "TypeScript",
    "GraphQL",
    "Tailwind CSS",
    "Storybook",
    "Design systems",
  ],
  creator: profile.name,
  authors: [{ name: profile.name, url: "https://github.com/klhong124" }],
  publisher: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Ryan Kwan",
    title: "Ryan Kwan — Creative Frontend Engineer, London",
    description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "ryankwan",
    title: "Ryan Kwan — Creative Frontend Engineer, London",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="dark">
      <body className={`${interTight.variable} ${spaceGrotesk.variable}`}>
        <MotionProvider>
          <MouseContextProvider>
            <a
              href="#content"
              className="sr-only rounded-md bg-fg px-4 py-3 font-medium text-bg focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100]"
            >
              Skip to content
            </a>
            {/* The header is rendered by each route rather than here: the
                homepage places it after the full-screen hero so it only sticks
                to the top once you scroll past the intro. */}
            <main id="content">{children}</main>
            <SiteFooter />
            <CommandPalette email={profile.email} />
            <NoiseOverlay />
            {/* <Cursor /> */}
            <Background />
          </MouseContextProvider>
        </MotionProvider>
        {/* Vercel's analytics only. GA4 was removed: it was 157KB — more than all
            first-party JavaScript on the page combined — and the largest remaining
            drag on LCP. It also set cookies with no consent mechanism, which is not
            a defensible default for a UK-facing site. */}
        <VercelSpeedInsights />
        <VercelAnalytics />
      </body>
    </html>
  );
}
