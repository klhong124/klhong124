import type { Metadata } from "next";
import { cn } from "@/utils/cn";
import "@/styles/globals.scss";
export const metadata: Metadata = {
  title: "Ryan Kwan - Portfolio",
  description: "I am an accomplished Full-Stack Developer located in London 🇬🇧, driven by a relentless pursuit of excellence in the Information Technology sector. With a track record of delivering impactful solutions, I am dedicated to enhancing user experiences and driving business success through innovative design and robust development. I am eager to bring my extensive skill set to your team, contributing to the advancement of your projects and delivering tangible value to your organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className={cn('dark')}>{children}</body>
    </html>
  );
}
