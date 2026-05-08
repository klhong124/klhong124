import type { Metadata } from "next";
import "@/styles/globals.scss";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import { MouseContextProvider } from "@/hooks/useMouse";
import { Background } from "@/ui/background";
import { PostHogProvider } from "@/components/PostHogProvider";
import Cursor from "@/ui/cursor";
import { SITE, SITE_KEYWORDS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: SITE.titleTemplate,
    default: SITE.titleDefault,
  },
  description: SITE.description,
  applicationName: `${SITE.name} — Portfolio`,
  referrer: "origin-when-cross-origin",
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE.name, url: "https://github.com/klhong124" }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: `${SITE.name} — Portfolio`,
    title: SITE.titleDefault,
    description: SITE.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.titleDefault,
    description: SITE.ogDescription,
    creator: SITE.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <PostHogProvider>
          <MouseContextProvider>

              {children}
            <Cursor />
            <Background />
          </MouseContextProvider>
          <VercelSpeedInsights />
          <VercelAnalytics />
          <GoogleAnalytics gaId="G-NK426M59VD" />

        </PostHogProvider>
      </body>
    </html>
  );
}