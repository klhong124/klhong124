import type { Metadata } from "next";
import "@/styles/globals.scss";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import { MouseContextProvider } from "@/hooks/useMouse";
import Body from "@/ui/body";
import { PostHogProvider } from "@/components/PostHogProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://ryankwan.vercel.app/'),
  title: {
    template: '%s | Ryan Kwan - Portfolio',
    default: 'Ryan Kwan - Portfolio', // a default is required when creating a template
  },
  description: "Experienced full-stack developer with a diverse background in designing and building web applications, marketplaces, and platforms. Proficient in modern frameworks like Vue and React, with expertise in front-end and back-end development, data integration, and creating seamless user experiences. Strong foundation in web design, animation, and software maintenance, complemented by experience in programming education and multimedia technology. Passionate about delivering innovative, user-centric, and scalable solutions across various industries",
  generator: 'Next.js',
  applicationName: 'Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Ryan Kwan', 'Portfolio', 'Full-stack Developer', 'Web Developer', 'Three.js', 'Motion Developer', 'Vue', 'React', 'Next.js', 'Nuxt.js'],
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
    <html lang="en" >
      <PostHogProvider>
        <VercelSpeedInsights />
        <VercelAnalytics />
        <GoogleAnalytics gaId="G-NK426M59VD" />

        <MouseContextProvider>
          <Body >
            {children}
          </Body>
        </MouseContextProvider>
      </PostHogProvider>
    </html>
  );
}