import WindowControl from "@/ui/windowControl";
import TextHoverEffect from "@/ui/textHoverEffect";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import Timeline from "@/ui/timeline";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work & Experience",
  description:
    "Timeline of roles and projects: frontend architecture, Storybook, React & Vue, GraphQL, e-learning, CMS, and marketplace platforms — Ryan Kwan.",
  openGraph: {
    title: `Work & Experience | ${SITE.name}`,
    description:
      "Professional timeline: Kubrick Group, Ezekia, BuiltByPixel, Car8, and more — engineering impact across product and design systems.",
    url: `${SITE_URL}/work`,
  },
  twitter: {
    title: `Work & Experience | ${SITE.name}`,
    description:
      "Professional timeline and shipped work across frontend architecture, motion, and scalable UI.",
  },
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
};


const WorkPage = () => {
    return (
        <div className="flex-center">

            <div
                className={cn("glass max-w-5xl py-24 px-6 md:px-24 my-24 mx-6 md:mx-24")}
            >
                <TextHoverEffect>WORK</TextHoverEffect>
                <Timeline />
                <WindowControl />
            </div>
        </div>

    )
}

export default WorkPage;