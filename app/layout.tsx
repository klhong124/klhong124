import type { Metadata } from "next";
import "@/styles/globals.scss";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import { MouseContextProvider } from "@/hooks/useMouse";
import { Background } from "@/ui/background";
import { PostHogProvider } from "@/components/PostHogProvider";
import Cursor from "@/ui/cursor";
import { Inter_Tight } from "next/font/google";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { ThemeAccentProvider } from "@/components/layout/theme-accent-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { NoiseOverlay } from "@/components/shared/noise-overlay";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  metadataBase: new URL('https://ryankwan.vercel.app/'),
  title: {
    template: '%s | Ryan Kwan - Portfolio',
    default: 'Ryan Kwan - Portfolio', // a default is required when creating a template
  },
  description: "Senior frontend engineer focused on AI-augmented development, UI architecture, and systems design.",
  generator: 'Next.js',
  applicationName: 'Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Ryan Kwan', 'Portfolio', 'Frontend Engineer', 'UI Architect', 'Systems Designer', 'Next.js', 'React', 'TypeScript'],
  creator: 'Ryan Kwan',
  authors: [{ name: 'Ryan Kwan', url: 'https://github.com/klhong124' }],
  publisher: 'Ryan Kwan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={interTight.variable}>
        {/* <PostHogProvider> */}
          <ThemeAccentProvider>
            <LenisProvider>
              <MouseContextProvider>
                <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:bg-black focus:px-3 focus:py-2">
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
            </LenisProvider>
          </ThemeAccentProvider>
          <VercelSpeedInsights />
          <VercelAnalytics />
          <GoogleAnalytics gaId="G-NK426M59VD" />
        {/* </PostHogProvider> */}
      </body>
    </html>
  );
}