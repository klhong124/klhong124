import type { Metadata } from "next";
import "@/styles/globals.scss";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter_Tight, Space_Grotesk } from "next/font/google";
import { MouseContextProvider } from "@/hooks/useMouse";
import { MotionProvider } from "@/lib/motion/motion-provider";
import { Background } from "@/ui/background";
import Cursor from "@/ui/cursor";
import { ThemeAccentProvider } from "@/components/layout/theme-accent-provider";
import { SiteHeader } from "@/components/layout/site-header";
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

const description = `${profile.role} in ${profile.location}. ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Ryan Kwan",
    default: "Ryan Kwan — Frontend Engineer, London",
  },
  description,
  applicationName: "Ryan Kwan",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Ryan Kwan",
    "Frontend Engineer",
    "London",
    "Next.js",
    "React",
    "TypeScript",
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
    title: "Ryan Kwan — Frontend Engineer, London",
    description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ryankwandev",
    title: "Ryan Kwan — Frontend Engineer, London",
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
          <ThemeAccentProvider>
            <MouseContextProvider>
              <a
                href="#content"
                className="sr-only rounded-md bg-fg px-4 py-3 font-medium text-bg focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100]"
              >
                Skip to content
              </a>
              <SiteHeader />
              <main id="content">{children}</main>
              <SiteFooter />
              <CommandPalette />
              <NoiseOverlay />
              <Cursor />
              <Background />
            </MouseContextProvider>
          </ThemeAccentProvider>
        </MotionProvider>
        <VercelSpeedInsights />
        <VercelAnalytics />
        <GoogleAnalytics gaId="G-NK426M59VD" />
      </body>
    </html>
  );
}
