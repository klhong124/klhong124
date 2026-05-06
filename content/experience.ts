export type ExperienceItem = {
  year: number;
  name: string;
  title?: string;
  desc: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    year: 2026,
    name: "BuiltByPixel",
    title: "Frontend Engineer",
    desc: "Developing high-performance frontend applications across multiple client projects while shaping reusable UI architecture and delivery standards.",
    tags: ["Next.js", "React", "GraphQL", "Algolia InstantSearch", "Storybook", "TypeScript"],
  },
  {
    year: 2024,
    name: "Executives Place Limited",
    title: "Web Applications Developer",
    desc: "Built frontend experiences for executive search software using Vue.js and Laravel.",
    tags: ["Vue", "Laravel", "MySQL", "JavaScript"],
  },
  {
    year: 2022,
    name: "Kubrick Group Limited",
    title: "Full-stack Developer",
    desc: "Contributed to e-learning platform, CMS, and Storybook-driven design system workflows.",
    tags: ["React", "Next.js", "Storybook", "GraphQL"],
  },
  {
    year: 2021,
    name: "Gymism Club",
    title: "Full-stack Developer",
    desc: "Designed and built a coach-matching platform with Nuxt.js and Firebase.",
    tags: ["Nuxt", "Firebase", "Apollo GraphQL", "Cloud Run"],
  },
];
