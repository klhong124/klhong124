import type { Metadata } from "next";
import { cn } from "@/utils/cn";
import "@/styles/globals.scss";
import { MouseContextProvider } from "@/hooks/useMouse";

const title = "Ryan Kwan - Portfolio"
const description = "Experienced full-stack developer with a diverse background in designing and building web applications, marketplaces, and platforms. Proficient in modern frameworks like Vue.js, Laravel, React, and Apollo GraphQL, with expertise in front-end and back-end development, data integration, and creating seamless user experiences. Strong foundation in web design, animation, and software maintenance, complemented by experience in programming education and multimedia technology. Passionate about delivering innovative, user-centric, and scalable solutions across various industries"

export const metadata: Metadata = {
  title,
  description,
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
