import { portfolioContentSchema, type PortfolioContent } from "@/lib/content/schema";

/**
 * Single source of truth for every piece of portfolio copy.
 *
 * Rules of the road:
 *  - Claims must be verifiable. No invented metrics, no client-confidential
 *    numbers, and no Lighthouse scores we are not prepared to have checked.
 *  - Where a specific claim needs Ryan's confirmation it is marked TODO(ryan)
 *    and written as scope rather than as a result.
 *  - UK English throughout.
 */
const content = {
  profile: {
    name: "Ryan Kwan",
    role: "Frontend Engineer",
    location: "London, UK",
    currently: "BuiltByPixel",
    intro:
      "I build fast, accessible interfaces for the web with Next.js, React and TypeScript. I care about design systems that stay consistent, data that is typed at the boundary, and motion that earns its place — and I like the unglamorous parts: the shared primitives, the edge cases, the second release.",
    email: "hello@ryankwan.dev",
    links: [
      { label: "GitHub", href: "https://github.com/klhong124" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ryankwandev/" },
      { label: "Photo gallery", href: "https://gallery.ryankwan.dev/" },
    ],
  },

  principles: [
    {
      title: "Build the primitives first",
      detail:
        "Shared components and tokens before features. It costs more on day one and far less every day after, because the next screen becomes assembly rather than invention.",
    },
    {
      title: "Motion is information",
      detail:
        "Animation should tell you where you are, what changed, and what is loading. If it does none of those, it is decoration — and decoration gets a reduced-motion switch.",
    },
    {
      title: "Types at the edges",
      detail:
        "Validate API responses and authored content at the boundary so the rest of the app can trust its data. Most UI bugs I have chased turned out to be shape bugs in disguise.",
    },
    {
      title: "Optimise for the next maintainer",
      detail:
        "Fast to ship and fast to change are the same goal at different timescales. I keep the code boring and obvious, and save the cleverness for the interaction design.",
    },
  ],

  timeline: [
    {
      id: "builtbypixel",
      period: "2025 — Present",
      startYear: 2025,
      company: "BuiltByPixel",
      role: "Mid-level Frontend Engineer",
      location: "London, UK",
      summary:
        "Build and maintain parfetts.co.uk and online.parfetts.co.uk for Parfetts, an employee-owned UK Cash & Carry wholesaler that supplies independent retailers.",
      // TODO(ryan): these describe the scope and stack you confirmed. If you want
      // named shipped features or delivery outcomes here, send them over and I
      // will swap them in — I have deliberately not guessed at specifics.
      achievements: [
        "Work across two public properties in parallel — a marketing site and a trade ordering platform — keeping them recognisably one brand while their jobs differ.",
        "Maintain a shared Chakra UI 3 design system driven by semantic tokens, so theming and spacing decisions are made once rather than per page.",
        "Consume the Parfetts REST API through a typed fetch client, with Zod validating responses at the boundary so bad payloads surface immediately instead of halfway down a component tree.",
        "Build ordering and enquiry forms on react-hook-form with Zod schemas shared between client validation and API contracts.",
        "Integrate Algolia to make the product catalogue searchable on the routes that need it, keeping the index work off the pages that do not.",
        "Instrument the platform with PostHog for product analytics and Pusher for real-time updates.",
        "Keep the codebase enforceable rather than aspirational: Biome for lint and format, Vitest for unit tests, Storybook for component review, and Lefthook to run all of it before anything lands.",
      ],
      stack: [
        "Next.js 16 (App Router, Turbopack)",
        "React 19",
        "TypeScript",
        "Chakra UI 3",
        "Zod",
        "react-hook-form",
        "Zustand",
        "Algolia",
        "PostHog",
        "Pusher",
        "Motion",
        "Bun",
        "Biome",
        "Vitest",
        "Storybook",
        "Lefthook",
      ],
      links: [
        { label: "parfetts.co.uk", href: "https://parfetts.co.uk" },
        { label: "online.parfetts.co.uk", href: "https://online.parfetts.co.uk" },
      ],
    },
    {
      id: "executives-place",
      period: "2024 — 2025",
      startYear: 2024,
      company: "Executives Place Limited",
      role: "Web Applications Developer",
      location: "London, UK",
      summary:
        "Frontend development on Ezekia, a software platform used by executive search firms to run their assignments and candidate pipelines.",
      achievements: [
        "Built and maintained frontend features in a large existing Vue.js application backed by Laravel.",
        "Worked across the stack where the boundary demanded it, touching Laravel and MySQL to get features shipped end to end.",
      ],
      stack: ["Vue", "Laravel", "MySQL", "JavaScript"],
      links: [{ label: "ezekia.com", href: "https://ezekia.com/" }],
    },
    {
      id: "kubrick",
      period: "2022 — 2024",
      startYear: 2022,
      company: "Kubrick Group Limited",
      role: "Full-stack Developer",
      location: "London, UK",
      summary:
        "First role after moving to London. Contributed to an e-learning platform, an internal CMS, and the Storybook-driven component library shared between them.",
      achievements: [
        "Developed features across an e-learning platform and a CMS application using React/Next.js and Vue/Nuxt.",
        "Built and documented shared components in Storybook so design and engineering could review UI in isolation before it reached a page.",
        "Handled the interaction and animation work with GSAP, which is where my interest in motion as part of the interface started.",
      ],
      stack: ["React", "Next.js", "Vue", "Storybook", "Apollo GraphQL", "GSAP", "Tailwind", "Figma"],
      links: [],
    },
    {
      id: "gymism",
      period: "2021 — 2022",
      startYear: 2021,
      company: "Gymism Club",
      role: "Full-stack Developer",
      location: "Remote",
      summary:
        "A coach-matching platform built solo during COVID, connecting people with personal trainers across a range of sports.",
      achievements: [
        "Designed, built and shipped the whole product alone — frontend, backend and deployment.",
        "Built the frontend as a Nuxt.js PWA with Firebase and Apollo GraphQL behind it, deployed on Google Cloud Run.",
        "Integrated Stripe for payments.",
      ],
      stack: ["Nuxt", "Vue", "Firebase", "Apollo GraphQL", "Stripe", "Cloud Run", "PWA"],
      links: [],
    },
  ],

  caseStudies: [
    {
      slug: "parfetts",
      title: "Parfetts",
      subtitle: "Cash & Carry digital platform for independent retailers",
      kind: "client",
      period: "2025 — Present",
      status: "published",
      featured: true,
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Chakra UI 3",
        "Zod",
        "Zustand",
        "Algolia",
        "PostHog",
        "Pusher",
        "Bun",
      ],
      problem:
        "Parfetts is an employee-owned Cash & Carry wholesaler whose customers are independent retailers — corner shops and forecourts running on thin margins and thinner time. That means two very different jobs on the web: a marketing site that explains the business to prospective retailers and members, and an ordering platform those retailers use to actually place trade orders. Treated as separate projects they drift apart; treated as one project the ordering flows get buried under brochure pages.",
      approach:
        "Two Next.js App Router applications sharing one design system. Chakra UI 3 semantic tokens mean a colour or spacing decision is made once and inherited by both, so the two sites stay recognisably Parfetts without being forced into the same layouts. Everything crossing the network boundary is typed: a REST fetch client with Zod schemas validating responses, and the same schemas backing react-hook-form on the way in.",
      outcome:
        "Both properties are live and maintained in parallel — the marketing site at parfetts.co.uk and the ordering platform at online.parfetts.co.uk — on a shared component and token layer, with lint, formatting, unit tests and component review enforced on every commit rather than left to good intentions.",
      architecture: [
        "Next.js App Router across both properties, so routing, layouts and data loading follow one set of conventions.",
        "REST consumed through a single typed fetch client (src/utils/api) — deliberately not GraphQL, because the API surface did not justify the extra layer.",
        "Chakra UI 3 with semantic tokens in src/theme as the shared design system between the marketing site and the ordering platform.",
        "Zod DTOs validate API responses at the boundary, and the same schemas drive react-hook-form validation so client and server agree on shape.",
        "Zustand for the client state that genuinely needs to be shared across routes, rather than lifting everything into a global store.",
        "Algolia powers catalogue search, wired in per route so pages that do not search do not pay for it.",
        "PostHog for product analytics and Pusher for real-time updates.",
      ],
      performance: [
        "Turbopack for local development and builds, which keeps the feedback loop fast on a codebase this size.",
        "Client components kept as islands around the interactive parts, so static and server-rendered content is not dragged into the browser bundle unnecessarily.",
        "Motion restricted to transform and opacity, which the compositor can handle without triggering layout.",
        "Search indexing scoped to the routes that use it rather than loaded globally.",
      ],
      impact: [
        "Marketing and ordering flows are reliable across two public properties maintained side by side.",
        "One shared token and component layer means brand changes land in both sites without a manual sweep.",
        "Typed boundaries mean malformed API responses fail loudly at the edge instead of quietly rendering empty UI.",
        "Biome, Vitest, Storybook and Lefthook make the quality bar automatic rather than a review-time argument.",
      ],
      challenges: [
        "Balancing two different UX jobs — persuasion on the marketing site, speed and accuracy on the ordering platform — without letting either dictate the other's layout.",
        "Keeping design system consistency across two codebases, which is where semantic tokens earn their keep over hard-coded values.",
        "Deciding where search belongs, since making an entire catalogue searchable everywhere costs more than it returns.",
      ],
      links: [
        { label: "parfetts.co.uk", href: "https://parfetts.co.uk" },
        { label: "online.parfetts.co.uk", href: "https://online.parfetts.co.uk" },
      ],
    },
    {
      slug: "immich",
      title: "Immich — self-hosted image server",
      subtitle: "Private family photo platform on always-on home hardware",
      kind: "personal",
      period: "2026 — Present",
      status: "published",
      featured: true,
      stack: ["Docker", "Immich", "cloudflared", "Cloudflare DNS", "Tailscale", "macOS"],
      problem:
        "Family photos were spread across Google Photos and iCloud, with storage costs rising and no real control over where any of it lived. I wanted the convenience of a hosted gallery — apps, sharing, search — without handing the whole archive to a subscription I do not control.",
      approach:
        "Run Immich in Docker on a Mac mini that is already on at home, and expose it properly rather than by poking holes in the router. A Cloudflare Tunnel gives it real HTTPS on a public hostname with no inbound ports open, and Tailscale keeps the admin surface on a private network where only I can reach it.",
      outcome:
        "A production-grade self-hosted alternative to Google and Apple Photos, running on hardware I own, reachable at gallery.ryankwan.dev. It is also the part of my work that is furthest from the day job — the networking, DNS and container operations that make a frontend engineer better at reasoning about what happens before the browser gets involved.",
      architecture: [
        "Immich running under Docker on an always-on Mac mini.",
        "Public HTTPS via a Cloudflare Tunnel (cloudflared), so there are no inbound ports open on the home network.",
        "Cloudflare DNS with a vanity redirect at gallery.ryankwan.dev.",
        "Tailscale for private administrative access only — the admin surface is never exposed publicly.",
      ],
      performance: [
        "Runs on hardware that was already powered on, so the marginal energy cost is close to nothing.",
        "Cloudflare sits in front of the origin, absorbing TLS termination and edge caching.",
        "Transcoding and thumbnail generation are left to Immich's own background workers rather than being triggered on request.",
      ],
      impact: [
        "Replaced two paid consumer photo subscriptions with infrastructure I control.",
        "Gave me hands-on operational experience with containers, tunnels, DNS and private networking — skills that sit outside a frontend remit but make me better at debugging across the boundary.",
        "Doubles as a live demo of something I actually run, rather than a screenshot.",
      ],
      challenges: [
        "Exposing a home service to the internet safely, which ruled out port forwarding and led to the tunnel-plus-Tailscale split between public and admin access.",
        "Keeping a consumer-grade machine reliable enough that family members treat it as a real service and not a hobby project.",
      ],
      links: [{ label: "gallery.ryankwan.dev", href: "https://gallery.ryankwan.dev/" }],
    },
    {
      slug: "kubrick-cms",
      title: "Kubrick CMS & component library",
      subtitle: "E-learning platform, internal CMS, and the Storybook library between them",
      kind: "client",
      period: "2022 — 2024",
      status: "published",
      featured: true,
      stack: ["React", "Next.js", "Vue", "Nuxt", "Storybook", "Apollo GraphQL", "GSAP", "Tailwind"],
      problem:
        "Kubrick ran an e-learning platform and an internal CMS that were built by different people at different times, in different frameworks. The same button existed several times over, slightly wrong each time, and every new screen restarted that argument.",
      approach:
        "Treat the shared UI as its own deliverable. Components were built and documented in Storybook first, reviewed there by design, and only then composed into pages — which meant the conversation about a component happened once, in isolation, rather than repeatedly inside feature reviews.",
      outcome:
        "A component library both applications could draw on, with Storybook as the place design and engineering met. This is also where I started treating motion as part of the interface rather than a finishing touch, doing the interaction work in GSAP.",
      architecture: [
        "Shared component library documented in Storybook as the review surface for design and engineering.",
        "Features built across React/Next.js and Vue/Nuxt, depending on which application they landed in.",
        "Apollo GraphQL for data fetching in the platform.",
        "Tailwind for styling, with the component library owning the patterns rather than each page reinventing them.",
      ],
      performance: [
        "Reusing reviewed components removed a category of layout and styling bugs before it reached QA.",
        "Storybook made it possible to check a component's states in isolation instead of hunting for the page that reproduces them.",
      ],
      impact: [
        "Design handover became a conversation about a documented component instead of a screenshot.",
        "Two applications converged on shared UI rather than drifting further apart.",
        "Established the Storybook-driven workflow I have carried into every role since.",
      ],
      challenges: [
        "Building shared components for two different frameworks without letting the abstraction become the problem.",
        "Retrofitting consistency into applications that already existed, which is mostly a negotiation exercise rather than a technical one.",
      ],
      links: [],
    },
    {
      slug: "experiments-lab",
      title: "Portfolio experiments lab",
      subtitle: "Where interaction ideas get tested before they reach client work",
      kind: "personal",
      period: "2023 — Present",
      status: "published",
      featured: true,
      stack: ["Next.js", "React Three Fiber", "three.js", "Motion", "Canvas 2D", "TypeScript"],
      problem:
        "Interaction ideas are cheap to describe and expensive to discover halfway through a client build. I needed somewhere to find out what a technique actually costs — in frame budget, in bundle size, in accessibility debt — before proposing it to anyone paying for it.",
      approach:
        "This site is the lab. A React Three Fiber scene with GLTF models, a full-viewport Canvas 2D glitch effect, pointer-tracked glow surfaces and scroll-linked timelines all exist here first, which is how I learned which of them survive contact with a mid-range phone and which do not.",
      outcome:
        "A working set of judgements rather than opinions: which effects are worth their cost, which need capability gating, and which need to be switched off entirely when someone has asked for reduced motion. The refresh documented in docs/portfolio-refresh-audit.md is the result of turning that lens on my own code.",
      architecture: [
        "React Three Fiber scenes loaded as lazy client islands via next/dynamic, kept out of the initial bundle.",
        "Motion tokens centralised in lib/motion so durations, easings and springs are shared values rather than magic numbers.",
        "Capability and reduced-motion gating handled at the provider level, so individual components do not each reimplement the check.",
        "Canvas effects driven by a single requestAnimationFrame loop rather than per-component intervals.",
      ],
      performance: [
        "Heavy 3D and canvas work is dynamically imported, so the first paint does not wait for it.",
        "Animation restricted to transform and opacity wherever the effect allows.",
        "Scroll and pointer listeners throttled and passive, and the number of simultaneously animating elements capped on small screens.",
        "Effects disabled outright on touch and low-power devices instead of merely slowed down.",
      ],
      impact: [
        "Turned a portfolio into a test bed, which makes the technique choices in client work evidence-based.",
        "Produced the reusable motion and gating primitives this site now runs on.",
        "Gave me a documented audit of my own animation defects — including the ones I had shipped.",
      ],
      challenges: [
        "Wanting a cinematic feel while keeping first paint fast, which is mostly a fight about what is allowed to block rendering.",
        "Making reduced motion a genuine alternative rather than the same animation played slowly.",
        "Accepting that some effects I liked were not worth their cost on a mid-range Android.",
      ],
      links: [{ label: "Source on GitHub", href: "https://github.com/klhong124" }],
    },
    {
      slug: "ai-engineering-loops",
      title: "AI-assisted engineering loops",
      subtitle: "Using coding agents without losing the plot",
      kind: "personal",
      period: "2026 — Present",
      status: "published",
      featured: true,
      stack: ["Cursor", "Project rules", "Structured prompts", "Code review", "TypeScript"],
      problem:
        "Coding agents are fast at producing plausible code and indifferent to whether it matches your conventions. Used carelessly they generate work that reviews badly and has to be redone, which is slower than not using them.",
      approach:
        "Put the constraints in the repository rather than in the prompt. Committed project rules encode the conventions an agent must follow — how feature flags are named, where analytics properties live, when to ask a human instead of guessing. Work is scoped into an explicit research, plan, then change loop, so the expensive thinking happens before any code is written.",
      outcome:
        "Agents do the mechanical work — audits, migrations, repetitive refactors — while architectural decisions stay with me. This refresh is a worked example: a read-only audit first, decisions confirmed with a human, then incremental commits against an agreed plan.",
      architecture: [
        "Project rules committed alongside the code, so conventions travel with the repository instead of living in someone's prompt history.",
        "Research and audit passes kept strictly read-only, separating diagnosis from change.",
        "Work sliced into reviewable commits rather than one large diff.",
        "Explicit escalation points where the agent must ask rather than assume — dates, titles, metrics, anything unverifiable.",
      ],
      performance: [
        "Parallel read-only exploration makes auditing a large codebase quick without risking changes to it.",
        "Verification is automated — typecheck, lint and build after each slice — so regressions surface immediately.",
      ],
      impact: [
        "Mechanical work gets faster without the review burden that usually comes with generated code.",
        "Findings are written down, so an audit becomes a durable document rather than a chat log.",
        "Decisions that need a human stay with a human, which is the whole point.",
      ],
      challenges: [
        "Resisting plausible-looking output that is subtly wrong, particularly invented metrics and confidently misremembered APIs.",
        "Keeping diffs small enough to review honestly when the tooling is happy to produce enormous ones.",
        "Knowing when the loop is not worth it and writing the code directly.",
      ],
      links: [],
    },
    {
      slug: "ui-component-systems",
      title: "UI component systems",
      subtitle: "Design systems that survive contact with more than one product",
      kind: "client",
      period: "2022 — Present",
      status: "draft",
      featured: false,
      stack: ["Storybook", "Chakra UI 3", "Design tokens", "TypeScript", "React"],
      problem:
        "A component library is easy to start and hard to keep. The failure mode is always the same: the library covers the first product well, a second product needs something slightly different, and the divergence gets solved by copy-paste.",
      approach:
        "Semantic tokens instead of literal values, so a component asks for its role — surface, muted text, accent — rather than a specific colour. Storybook as the review surface, so a component's states are agreed in isolation before any page depends on them.",
      outcome:
        "This is a thread that runs through the Kubrick component library and the shared Chakra UI 3 system across the two Parfetts properties, rather than a single project.",
      // TODO(ryan): this one is a synthesis of the Kubrick and Parfetts work rather
      // than a distinct project, so it is marked `draft` and kept out of the grid
      // and sitemap. Either give me a specific project to anchor it to, or say the
      // word and I will delete it — the material is already covered by the Kubrick
      // and Parfetts case studies.
      architecture: [
        "Semantic tokens as the contract between design and implementation.",
        "Storybook as the place component states are reviewed and documented.",
        "Components typed so misuse is a compile error rather than a visual bug.",
      ],
      performance: [
        "Reviewed, reused components remove whole categories of layout bug before QA sees them.",
      ],
      impact: [
        "Brand and spacing changes land in one place rather than being swept across a codebase by hand.",
      ],
      challenges: [
        "Keeping a shared system genuinely shared once a second product has different needs.",
      ],
      links: [],
    },
  ],

  stackGroups: [
    {
      label: "Core",
      items: ["Next.js", "React", "TypeScript", "App Router"],
    },
    {
      label: "Styling & design systems",
      items: ["Chakra UI 3", "Tailwind CSS", "Semantic tokens", "Storybook", "Figma"],
    },
    {
      label: "Data & state",
      items: ["Typed REST clients", "Zod", "react-hook-form", "Zustand", "Apollo GraphQL"],
    },
    {
      label: "Motion",
      items: ["Motion", "GSAP", "React Three Fiber", "three.js"],
    },
    {
      label: "Search & product analytics",
      items: ["Algolia", "PostHog", "Pusher"],
    },
    {
      label: "Tooling & quality",
      items: ["Bun", "Biome", "Vitest", "Lefthook", "ESLint", "GitHub Actions"],
    },
    {
      label: "Infrastructure",
      items: ["Vercel", "Docker", "Cloudflare Tunnel", "Firebase", "Cloud Run"],
    },
  ],
} satisfies PortfolioContent;

export const portfolioContent = portfolioContentSchema.parse(content);

export const { profile, principles, stackGroups } = portfolioContent;

export const timeline = [...portfolioContent.timeline].sort((a, b) => b.startYear - a.startYear);

export const caseStudies = portfolioContent.caseStudies;

export const publishedCaseStudies = caseStudies.filter((study) => study.status === "published");

export const featuredCaseStudies = publishedCaseStudies.filter((study) => study.featured);

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getPublishedCaseStudySlugs() {
  return publishedCaseStudies.map((study) => study.slug);
}
