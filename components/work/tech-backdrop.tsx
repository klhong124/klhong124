"use client";

import dynamic from "next/dynamic";
import { useAmbientEnabled } from "@/lib/motion/use-motion-enabled";

/**
 * Decorative 3D icons of the case study's stack, floating in the top-right
 * corner of the page behind the header. Moving the mouse through them pushes
 * them aside; a spring pulls them back onto their drift path.
 *
 * Loaded lazily (R3F throws on the server) and only on devices that opted into
 * ambient motion, mirroring the hero scenes.
 */
const WorkTechBackdrop = dynamic(() => import("@/ui/work-tech-backdrop"), {
  ssr: false,
  loading: () => null,
});

/**
 * Stack pills are display strings ("Next.js 16", "React Three Fiber"), so this
 * table maps them onto the GLTF models that exist in /public/model. Anything
 * without a model is simply skipped.
 */
const MODEL_BY_STACK: Record<string, string> = {
  react: "react",
  "next.js": "next",
  typescript: "typescript",
  vue: "vue",
  nuxt: "nuxt",
  storybook: "storybook",
  graphql: "graphql",
  "apollo graphql": "graphql",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  tailwindcss: "tailwindcss",
  "three.js": "threejs",
  "react three fiber": "threejs",
  motion: "framer-motion",
  "framer motion": "framer-motion",
  laravel: "laravel",
  firebase: "firebase",
  mongodb: "mongodb",
  python: "python",
  jest: "jest",
  figma: "figma",
};

function modelsFor(stack: string[]): string[] {
  const models: string[] = [];
  for (const item of stack) {
    // "Next.js 16" → "next.js", "React 19" → "react".
    const normalized = item.toLowerCase().replace(/\s+\d+$/, "").trim();
    const model = MODEL_BY_STACK[normalized];
    if (model && !models.includes(model)) models.push(model);
  }
  return models;
}

export function TechBackdrop({ stack }: { stack: string[] }) {
  const ambientEnabled = useAmbientEnabled();
  const models = modelsFor(stack);
  if (!ambientEnabled || models.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 right-0 -z-10 aspect-square w-[min(90vw,640px)] opacity-35 lg:opacity-65"
    >
      <WorkTechBackdrop models={models} />
    </div>
  );
}
