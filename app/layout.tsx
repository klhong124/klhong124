import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
