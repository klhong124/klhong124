/** Swap testimonial quote strings for verbatim manager feedback when you publish them. */

export type ExperienceHighlight = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  stack: readonly string[];
  metrics: readonly string[];
  highlights: readonly string[];
  link?: string;
};

export const EXPERIENCE_HIGHLIGHTS: readonly ExperienceHighlight[] = [
  {
    id: "builtbypixel",
    company: "BuiltByPixel",
    role: "Senior Frontend Engineer",
    period: "2025 — Present",
    summary:
      "Product-grade Next.js surfaces, GraphQL data layers, and search experiences shipped with Editorial confidence.",
    stack: [
      "Next.js",
      "GraphQL",
      "Algolia InstantSearch",
      "Storybook",
      "TypeScript",
      "CI releases",
    ],
    metrics: [
      "Architected searchable catalog flows end-to-end",
      "Elevated Storybook workflows for repeatable UI QA",
      "Partnered tightly with design on motion + accessibility polish",
    ],
    highlights: [
      "Frontend architecture discussions that align runtime performance with product narrative.",
      "High-quality release reliability through component contracts and visual regression readiness.",
      "Cross-functional facilitation across design, backend, and search relevance tuning.",
    ],
  },
  {
    id: "ezekia",
    company: "Ezekia (Executives Place Limited)",
    role: "Web Applications Developer · Frontend",
    period: "2024",
    summary:
      "Vue + Laravel ecosystem delivery for executive search tooling with emphasis on pragmatic UX iteration.",
    stack: ["Vue", "Laravel", "PHP", "MySQL", "JavaScript", "REST"],
    metrics: [
      "Translating complex recruiter workflows into legible interfaces",
      "Balancing SPA interactivity with server-rendered ergonomics where it mattered",
    ],
    highlights: [
      "Deepened stakeholder communication through demo-driven iteration loops.",
      "Collaborated across the stack without losing fidelity on UI states and edge paths.",
    ],
    link: "https://ezekia.com/",
  },
  {
    id: "kubrick",
    company: "Kubrick Group",
    role: "Full-stack Developer",
    period: "2022",
    summary:
      "Storybook-backed delivery for e-learning, CMS, and design-system-adjacent experiences using Vue/React.",
    stack: [
      "Storybook",
      "Vue / Nuxt.js",
      "React / Next.js",
      "Apollo GraphQL",
      "Motion One",
      "Tailwind",
      "Figma",
    ],
    metrics: [
      "Shipped motion-forward learning surfaces while protecting render budgets",
      "Contributed reusable documentation culture inside Storybook",
    ],
    highlights: [
      "Translated learning science requirements into approachable UI hierarchies.",
      "Accelerated prototyping by pairing Apollo GraphQL with component-driven previews.",
      "Bridged designers and engineers with motion specs that behaved predictably.",
    ],
    link: "https://cdpfrontend.prod.kubrickgroup.cloud/",
  },
  {
    id: "goodest",
    company: "Goodest Lab Limited",
    role: "Analyst Programmer · Car8 Marketplace",
    period: "2020",
    summary:
      "Zero-to-one marketplace build with Laravel + Vue emphasizing payments, scraping pipelines, and growth analytics.",
    stack: ["Laravel", "Vue", "Vuex", "Stripe", "Python", "MySQL"],
    metrics: [
      "Owned listing integrity through bespoke scraping integrations",
      "Instrumented Stripe + analytics instrumentation for monetization tuning",
    ],
    highlights: [
      "Demonstrated entrepreneurial ownership stitching UI, infra, and data flows.",
      "Delivered transactional flows with obsessive attention to error states.",
    ],
    link: "https://www.car8.com/",
  },
];

export type ProjectStudy = {
  slug: string;
  title: string;
  subtitle: string;
  stack: readonly string[];
  impact: readonly string[];
  architecture: readonly string[];
  performance: readonly string[];
  challenges: readonly string[];
  gradient: readonly [string, string, string]; // subtle CSS gradient stops
  /** Reference screenshot for the demo panel (`/public/images/...` or allowed remote URL). */
  demoImage?: string;
  demoImageAlt?: string;
};

export const PROJECT_STUDIES: readonly ProjectStudy[] = [
  {
    slug: "oasis-infinite",
    title: "Oasis Infinite",
    subtitle: "Immersive marketing surface marrying scroll choreography with lightweight 3D storytelling.",
    stack: ["Next.js", "React Three Fiber", "Motion stack", "GLTF pipeline"],
    impact: [
      "Prototype-to-ship workflows that prioritize GPU-friendly shaders and LOD discipline.",
      "Narrative beats mapped to intentional scroll thresholds instead of gratuitous animation.",
    ],
    architecture: [
      "Isolation of Canvas islands behind dynamic imports to protect LCP budgets.",
      "Shared motion tokens aligning DOM transitions with WebGL camera easing.",
    ],
    performance: [
      "Pre-warmed assets with blur-up fallbacks plus lazy hydration for ancillary scenes.",
      "Frame pacing monitored through devtools overlays and hardware-throttled QA passes.",
    ],
    challenges: [
      "Trading raw spectacle for readable hierarchy when brand + engineering constraints collided.",
    ],
    gradient: ["#312e81", "#0f172a", "#4338ca"],
  },
  {
    slug: "kubrick-cms",
    title: "Kubrick CMS & Learning Suite",
    subtitle: "Editorial tooling and learner journeys that scale across multilingual modules.",
    stack: ["Apollo GraphQL", "Storybook", "Vue/React", "Tailwind", "Design tokens"],
    impact: [
      "Standardized authoring flows so curriculum teams iterated without bottlenecking engineers.",
      "Storybook catalogs became QA anchors for regressions spanning layout + motion.",
    ],
    architecture: [
      "Composable page shells with slot-based CMS contracts for predictable SSR.",
      "Separation between content schema and presentation adapters to ease migrations.",
    ],
    performance: [
      "Deferring non-critical hydration while keeping skeleton states honest to final UI.",
      "Animation budgets documented per-route to avoid cascading layout thrash.",
    ],
    challenges: [
      "Balancing authoring flexibility with deterministic UI states for accessibility audits.",
    ],
    gradient: ["#1e293b", "#082f49", "#0ea5e9"],
    demoImage: "/images/CDP.png",
    demoImageAlt: "Kubrick CDP learning platform — CMS and learner-facing UI",
  },
  {
    slug: "portfolio-experiments",
    title: "Portfolio Experiments Lab",
    subtitle: "A living playground validating interaction models before they graduate to production codebases.",
    stack: ["Framer Motion", "Motion One", "Motion timelines", "Matter.js", "Pixi"],
    impact: [
      "De-risked unconventional navigation patterns ahead of stakeholder reviews.",
      "Codified reusable spring presets tuned for tactile, premium micro-interactions.",
    ],
    architecture: [
      "Feature slices isolated per route with shared interaction primitives layered on top.",
      "Deterministic RNG + physics seeds for reproducible QA when debugging motion bugs.",
    ],
    performance: [
      "Adaptive quality toggles for particle systems based on prefers-reduced-motion + hardware tier heuristics.",
    ],
    challenges: [
      "Knowing when playful physics should yield to deterministic UI for clarity.",
    ],
    gradient: ["#14532d", "#052e16", "#22c55e"],
    // demoImage: "/images/kubrickgroup.png",
    // demoImageAlt: "Kubrick Group product screenshot — engineering and design collaboration context",
  },
  {
    slug: "ai-assist-flows",
    title: "AI-Assisted Engineering Loops",
    subtitle: "Context engineering, PRP authoring, and review automation that amplify senior IC leverage.",
    stack: ["Cursor", "GPT-4 class models", "Custom hooks", "Static analysis"],
    impact: [
      "Shortened discovery→diff cycles by pairing AI drafting with human architectural gates.",
      "Codified prompt templates for debugging, refactors, and migration plans.",
    ],
    architecture: [
      "Documented context packs (files, constraints, success criteria) before agent runs.",
      "Human-in-the-loop checkpoints for anything touching security, data, or auth.",
    ],
    performance: [
      "Selective context windows to avoid thrashing large monorepos during refactors.",
    ],
    challenges: [
      "Preventing AI momentum from bypassing accessibility or performance guardrails.",
    ],
    gradient: ["#3b0764", "#1e1b4b", "#a855f7"],
    // demoImage: "/images/executivesplace.png",
    // demoImageAlt: "Ezekia executive search platform — complex data-dense application UI",
  },
  {
    slug: "ui-systems",
    title: "UI Component Systems",
    subtitle: "Atomic design, token surfaces, and Storybook rituals that scale teams—not just components.",
    stack: ["Storybook", "Design tokens", "Monorepo packages", "a11y linting"],
    impact: [
      "Shifted regressions left with visual + interaction snapshots owned by frontend.",
      "Enabled non-designers to compose marketing-quality modules without bespoke CSS.",
    ],
    architecture: [
      "Tiered primitives → compounds → templates with explicit composition rules.",
      "Theme providers that hydrate runtime tokens without blowing SSR budgets.",
    ],
    performance: [
      "Tree-shaken iconography and lazy doc blocks inside Storybook for faster CI.",
    ],
    challenges: [
      "Maintaining cultural buy-in so tokens stay the source of truth under delivery pressure.",
    ],
    gradient: ["#422006", "#1c1917", "#f97316"],
    // demoImage: "https://ryankwan.netlify.app/img/car8.png",
    // demoImageAlt: "Car8 marketplace — high-density listings and transactional UI patterns",
  },
];

export const PHILOSOPHY_CARDS = [
  {
    title: "How I Think",
    body: "Interfaces are distributed systems: state, motion, data, and narrative all negotiate for the same milliseconds of user trust.",
  },
  {
    title: "Systems Design",
    body: "I bias toward contracts—typed props, tokenized styles, and Storybook stories that double as living acceptance criteria.",
  },
  {
    title: "AI-Augmented Craft",
    body: "Large language models accelerate exploration, but architecture, accessibility, and release hygiene stay human-owned.",
  },
  {
    title: "Scalable Frontend",
    body: "Performance budgets, progressive enhancement, and module boundaries keep creativity from becoming fragility.",
  },
] as const;

export const TIMELINE_SNIPPETS = [
  { year: "2026", label: "Shipping premium product surfaces · AI-augmented workflows" },
  { year: "2024", label: "Search-grade commerce UI · GraphQL + Algolia synergy" },
  { year: "2022", label: "Storybook-native culture inside Kubrick ecosystems" },
  { year: "2020", label: "Marketplace zero-to-one with payments + scraping intelligence" },
] as const;

export const ARCHITECTURE_PILLARS = [
  {
    title: "Atomic Methodology",
    body: "Tokens → primitives → composites with explicit escalation paths so teams know where complexity belongs.",
    icon: "layers",
  },
  {
    title: "Storybook Operating System",
    body: "Docs, visual regression anchors, and interaction tests become the shared cockpit for frontend + design QA.",
    icon: "book",
  },
  {
    title: "Accessible by Default",
    body: "Focus order, prefers-reduced-motion, and semantics baked in—not patched after stakeholder sign-off.",
    icon: "a11y",
  },
  {
    title: "Monorepo Discipline",
    body: "Package boundaries that mirror organizational domains while sharing motion + token utilities safely.",
    icon: "box",
  },
] as const;

export const TECH_CATEGORIES = [
  "Frontend",
  "Animation",
  "Cloud",
  "DevOps",
  "AI Tooling",
  "Testing",
  "Backend",
  "Web3",
  "Design",
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export type TechItem = {
  name: string;
  category: TechCategory;
};

export const TECH_ITEMS: readonly TechItem[] = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Vue / Nuxt", category: "Frontend" },
  { name: "GraphQL", category: "Frontend" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Motion One", category: "Animation" },
  { name: "React Three Fiber", category: "Animation" },
  { name: "Matter.js", category: "Animation" },
  { name: "Vercel", category: "Cloud" },
  { name: "Cloud Run", category: "Cloud" },
  { name: "Firebase", category: "Cloud" },
  { name: "GitHub Actions", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "Cursor", category: "AI Tooling" },
  { name: "LLM-assisted reviews", category: "AI Tooling" },
  { name: "Jest / RTL", category: "Testing" },
  { name: "Storybook", category: "Testing" },
  { name: "Laravel", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "MySQL / Postgres", category: "Backend" },
  { name: "Solidity familiarity", category: "Web3" },
  { name: "Figma", category: "Design" },
  { name: "Blender basics", category: "Design" },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Ryan elevates frontend architecture conversations—balancing Storybook hygiene, nuanced motion, and delivery realism without letting polish slip.",
    author: "Engineering Partner",
    role: "Collaborator · Kubrick Group",
  },
  {
    quote:
      "We leaned on Ryan when releases needed adult supervision: GraphQL payloads, Algolia-driven UX edge cases, and cross-team QA rituals all improved.",
    author: "Cross-functional Lead",
    role: "Product & Engineering Interface",
  },
  {
    quote:
      "The difference is reliability. Ryan advocates for scalable patterns early, communicates trade-offs clearly, and still sweats the pixel-level details.",
    author: "Product Stakeholder",
    role: "Delivery & Lifecycle Planning",
  },
];

export const AI_FLOW_STEPS = [
  { title: "Context Drafting", body: "Map files, acceptance criteria, and risks before prompting." },
  { title: "PRP Framework", body: "Progressive rollout plans tying AI deltas to rollback + QA gates." },
  { title: "IDE Pairing", body: "Cursor-driven refactors anchored by human-reviewed diffs." },
  { title: "Debug Synth", body: "Use agents to chase hypotheses faster, validate with instrumentation." },
] as const;

export const CONTACT = {
  email: "klhong124+inbox@gmail.com",
  availability: "Selectively accepting architecture collaborations & leadership IC roles · EU / remote friendly",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
};
