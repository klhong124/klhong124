import type { Metadata } from "next";
import { cn } from "@/utils/cn";
import "@/styles/globals.scss";
import { MouseContextProvider } from "@/hooks/useMouse";

export const metadata: Metadata = {
  title: "Ryan Kwan - Portfolio",
  description: "Experienced Full-Stack Developer in London 🇬🇧 with a strong track record of delivering innovative solutions. Specializing in enhancing user experiences and driving business success through cutting-edge design and robust development. Explore my portfolio to see how I can bring measurable value to your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <MouseContextProvider>

        <body className={cn('dark')}>
          {children}
        </body>

      </MouseContextProvider>
    </html>
  );
}
