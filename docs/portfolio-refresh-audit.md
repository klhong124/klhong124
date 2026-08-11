# ryankwan.dev — Refresh Audit (Phase 0)

**Date:** 11 August 2026
**Branch:** `claude`
**Baseline:** `next build` passes clean. `/` = **216 kB** First Load JS, `/work` = 164 kB, `/work/[slug]` = 106 kB. Shared chunk 102 kB.
**Method:** static code review of the whole repo plus a production build. No browser, Lighthouse, or assistive-technology testing yet — those land in Phase 4.

---

## 1. Versions: installed vs latest stable

| Package | Installed | Latest stable | Gap |
| --- | --- | --- | --- |
| `next` | 15.5.15 | **16.3.0** | 1 major |
| `react` / `react-dom` | 18.3.1 | **19.2.8** | 1 major |
| `motion` | 11.14.3 | **13.1.0** | 2 majors |
| `three` | 0.166.1 | 0.185.1 | 19 minors |
| `@react-three/fiber` | 8.16.8 | **9.7.0** | 1 major (R3F 9 requires React 19) |
| `@react-three/drei` | 9.109.5 | **10.7.8** | 1 major |
| `tailwindcss` | 3.4.9 | **4.3.3** | 1 major (CSS-first config rewrite) |
| `typescript` | 5.5.4 | **7.0.2** | 2 majors |
| `eslint` | 9.39.4 | **10.8.1** | 1 major |
| `eslint-config-next` | 15.5.15 | 16.3.0 | 1 major |
| `gsap` | 3.15.0 | 3.15.0 | current |
| `lenis` | 1.3.23 | 1.3.26 | patch |
| `@next/mdx` | **^16.2.4** | 16.3.0 | **already on 16 while `next` is 15 — mismatched** |
| `@next/third-parties` | ^15.1.2 | 16.3.0 | 1 major |

Next 16 requires Node `>=20.9.0`; local Node is v24.6.0, so the runtime is fine.

**Notes on upgrade risk.** Next 16 + React 19 + Motion 13 is the core ask and they move together — R3F 9 / drei 10 also need React 19, so that whole cluster is one coordinated step. Three separate majors are *not* required by the brief and each carries real risk:

- **Tailwind 4** replaces `tailwind.config.ts` with CSS-first `@theme` config. The two custom plugins in `utils/colors.ts` and `utils/background.ts` would need rewriting, and Tailwind 4 changes how it interacts with Sass — this repo is Sass-based.
- **TypeScript 7** is the native/Go compiler rewrite. Type-checking behaviour is intentionally close to 5.x but the toolchain around it (`ts-node`, Jest transform, `eslint`) is not all ready.
- **ESLint 10** pushes toward flat config; `.eslintrc.json` is legacy format.

Recommendation is to do the Next/React/Motion/R3F cluster now and treat Tailwind 4, TS 7, and ESLint 10 as separate follow-up decisions. Flagged for Ryan.

### Dependencies installed but never imported

`@gsap/react`, `cmdk`, `@vercel/blob`, `class-variance-authority`, `rehype-pretty-code` (the last is a dependency but never wired into `next.config.mjs`, so MDX code blocks are unstyled).

### Duplicate lockfiles

Both `bun.lockb` (476 kB) and `package-lock.json` (432 kB) are committed. Package manager is ambiguous, installs are non-reproducible, and the two files disagree. Pick one.

Also: `package.json` still declares `"name": "aceternity"` — the leftover template name.

---

## 2. Animation issues

### 2.1 `prefers-reduced-motion` is entirely absent — highest-priority finding

Zero occurrences of `prefers-reduced-motion`, `useReducedMotion`, or any motion-related `matchMedia` anywhere in the repo. Every animated surface runs unconditionally, including several that never stop:

| Always-on, every route (via `app/layout.tsx`) | Cost |
| --- | --- |
| `LenisProvider` (`components/layout/lenis-provider.tsx:7`) | Hijacks native scroll; perpetual `requestAnimationFrame` loop |
| `Background` → `LetterGlitch` (`ui/letter-glitch.tsx`) | Full-viewport `<canvas>`, perpetual rAF, ~5% of cells repainted every 20 ms. At 390×844 that is ~1,020 cells and ~51 redraws per tick |
| `Cursor` (`ui/cursor.tsx`) | Follows pointer |
| `MouseContextProvider` (`hooks/useMouse.tsx`) | Global `mousemove` → React `setState` on every event, unthrottled |

Plus, on `/`: hero stagger + six infinite loops (wave, sparkles), `GlowingCard`, `Dock` springs, ~15 `GlassCard` instances, GSAP scroll animation, `MagneticButton`. On `/work`: `TextHoverEffect`, scroll-linked `Timeline`.

This is a WCAG 2.3.3 / 2.2.2 problem and also the single biggest CPU win available.

### 2.2 Scroll handling and main-thread thrash

`ui/glowing-card.tsx:103` and `components/shared/glass-card.tsx:93` each register a **non-throttled** `window` `scroll` listener plus a `document.body` `pointermove` listener. `GlassCard` is instantiated roughly 15 times on the homepage, so that is ~15 scroll listeners and ~15 pointermove listeners competing on every event. The glow update inside is rAF-batched, but the listener itself is not throttled or passive.

A trailing-edge throttle already exists at `utils/throttle.ts` and is used for `mousemove`/`resize` elsewhere — it is simply not applied to these scroll paths.

`Lenis`, GSAP `ScrollTrigger` (`components/sections/featured-work.tsx:26`), and Motion's `useScroll` (`ui/timeline.tsx:31`) all read scroll independently with **no integration between them**. Under Lenis's virtual scroll, ScrollTrigger and `useScroll` can desync from the actual rendered position.

`components/sections/featured-work.tsx:22-27` creates a `ScrollTrigger` with **no cleanup** — the `useEffect` returns nothing, so triggers leak across client navigations.

### 2.3 LCP and CLS damage

The hero's LCP text is deliberately invisible for around a second:

- Container starts `opacity: 0` with `delayChildren: 0.3`, `staggerChildren: 0.2` (`components/heroSection.tsx:121-128`)
- `<h1>` is split per character, `opacity: 0, y: 30`, delays up to ~1.0 s (lines 206-218)
- Intro paragraph `delay: 1.4` (line 299); sparkles `delay: 2`; `Highlight` `delay: 2.5`
- Enter animation also animates `filter: blur(4px) → blur(0)` (lines 138-144), which is expensive during the critical window

Layout-affecting properties being animated:

| Location | Property | Impact |
| --- | --- | --- |
| `ui/glowing-card.tsx:164-170` | `width` / `height` (500→580, 400→500) | Real hero CLS on click |
| `ui/dock.tsx:84-85,129` | `width` / `height` via springs | Local reflow every pointer move |
| `ui/textHoverEffect.tsx:58-63` | `bottom` (-20→-5) | Layout shift on hover |
| `ui/timeline.tsx:129` | `height` | Absolutely positioned, so low page-level cost |

`components/sections/featured-work.tsx:26` starts cards at `opacity: 0.4`, so they are visibly dim until the scroll trigger fires — a flash of half-styled content.

### 2.4 R3F / Three.js

Only one `<Canvas>` exists, at `ui/tech-stack.tsx:123`. It is dynamically imported with `ssr: false` — but `loading: () => null` (`components/heroSection.tsx:16`) reserves **no space**, so it would shift layout when it arrives.

It is currently **commented out** at `components/heroSection.tsx:103`, yet the module-scope preload still runs on import:

```ts
// ui/tech-stack.tsx:170-172
ICONS.forEach((c) => {
  useGLTF.preload(`/model/${c.gltf}.gltf`);
});
```

So 16 GLTF fetches can fire for a scene that never renders. If re-enabled, the scene costs 16 cloned scenes + 16 `pointLight`s + a `useFrame` per icon at `dpr={[1, 2]}`.

**7 of 23 GLTF models are orphaned:** `react`, `nodejs`, `graphql`, `laravel`, `jest`, `photoshop`, `davinci-resolve`.

### 2.5 Mobile / low-power cost

Nothing is gated on touch, pointer coarseness, or device capability. `LetterGlitch` and Lenis run identically on a phone and a desktop. `useMouse` attaches its listener regardless. The hero's six infinite loops never pause. On the plus side, `styles/cursor.scss` (which sets `cursor: none` globally) is **commented out** at `ui/cursor.tsx:1`, so the native cursor survives.

### 2.6 Horizontal scroll sections

**None exist.** Searches for `overflow-x`, `scroll-snap`, and `scrollLeft` return nothing. `ui/timeline.tsx` is a *vertical* scroll-linked timeline and `featured-work.tsx` is a responsive grid. The brief's horizontal-scroll accessibility items therefore have no current subject — if we introduce a horizontal rail in Phase 2 it must ship with keyboard support and visible affordances from the start.

### 2.7 Duplicated motion values

No shared motion tokens module. Notable repeats:

| Value | Count | Where |
| --- | --- | --- |
| `duration: 0.6` | 6 | `heroSection.tsx` ×2, `workSection.tsx` ×4 |
| `ease: [0.16, 1, 0.3, 1]` | 2 | `glowing-card.tsx:88`, `glass-card.tsx:82` |
| `ease: [0.23, 1, 0.32, 1]` | 1 | `heroSection.tsx:147` — a near-identical curve, needlessly different |
| `stiffness: 150, damping: 12` | 4 | `dock.tsx` (four copies of the same spring) |
| `stiffness: 400/380, damping: 28` | 2 | `bento/grid.tsx:130` vs `glass-card.tsx:144` — accidental divergence |
| `type: "spring"` | 7 files | ad hoc each time |

The glow gradient logic in `ui/glowing-card.tsx:117-143` and `components/shared/glass-card.tsx:102-126` is ~90% identical but with different durations (1 s vs 0.85 s) and different springs. This is the clearest case for a single `lib/motion` source.

### 2.8 Bugs found

1. **Listener leak** — `hooks/useMouse.tsx:33-54` passes a *new* inline function to `removeEventListener`, so the `mousemove` listener is never removed.
2. **No ScrollTrigger cleanup** — `featured-work.tsx:22-27`.
3. **`ui/bento/items/about.tsx` exports the wrong component** — it exports `Optimization`, a duplicate of `optimization.tsx`.
4. **`ui/bento/items/pixel-perfect.tsx:66-68`** — `onMouseEnter` is commented out, so `isHover` never becomes `true`; the hover effect is dead.

(3) and (4) are inside the dead bento tree, so they are cosmetic today, but they show the tree was abandoned mid-edit.

---

## 3. UK UX review

### 3.1 The above-the-fold test fails

The live hero (`components/heroSection.tsx`) shows, in order: "Say hello to", the `<h1>` `/ryankwan.dev`, and a "Click to Explore" prompt. The actual positioning copy is **hidden behind a click** (`heroSection.tsx:302-303`):

> "My name is Ryan, a Front-end Developer with a passion for crafting visually engaging, animation-rich, and stunning applications. Specializing in design-focused projects using React/Next.js, and Typescript."

A UK hiring manager landing on mobile cannot learn, within five seconds: that Ryan is **senior**, that he is at **BuiltByPixel**, that he is in the **UK**, or what he does beyond "animation-rich". The `<h1>` is a social handle, not a name and role. "Front-end Developer" also undersells against the senior framing used in the metadata.

Better copy already exists in `components/sections/hero.tsx` (`HeroSectionV2`, which mentions "Currently @ BuiltByPixel") — but **that component is not mounted anywhere**. Two hero implementations exist and the weaker one is live.

### 3.2 Broken and missing navigation

- `components/layout/site-header.tsx:10` — the nav is `hidden md:flex` with **no mobile menu at all**. The only mobile route to another section is the ⌘K palette, which is undiscoverable and keyboard-only.
- The header logo and the palette both link to `#hero`, but **no element has `id="hero"`** on the live homepage (only the unmounted `HeroSectionV2` defines it). The link does nothing.
- `app/work/page.tsx` is missing from `app/sitemap.ts`.

### 3.3 Three featured projects 404

`components/sections/featured-work.tsx:10-18` lists seven projects, but `mdxMap` in `app/work/[slug]/page.tsx:5-10` only knows four slugs. **`/work/kubrick`, `/work/gymism`, and `/work/car8` are dead links** rendered prominently on the homepage. This is the most damaging trust bug on the site.

### 3.4 Case studies are not scannable

Only `builtbypixel.mdx` has real content, and it is structured Role → Architecture → Search → Quality — not problem → approach → outcome. Outcomes are buried at the bottom. The other three MDX files still contain `{/* TODO: review */}` and read as drafts.

The `/work` grid shows only a title and "Case study ->" — no summary, role, or outcome. Frontmatter `title`/`summary` **is never read at render time**, so it contributes nothing.

### 3.5 Contact affordances are broken

`components/sections/contact.tsx` is the primary conversion point and it does not work:

- The form `preventDefault()`s and `fetch`es, with no `action`/`method` — **it requires JavaScript**.
- The `fetch` sends a JSON body with **no `Content-Type` header**, which can break `req.json()` server-side.
- `app/api/contact/route.ts` is a **stub that returns `{ ok: true }` without sending anything**. Messages are silently discarded while the UI says "Message sent". This is the worst bug on the site.
- "Book a Call" points at bare `https://calendly.com`, not Ryan's booking page.

### 3.6 Trust signals

- **Conflicting email addresses:** `ryankwan.dev@gmail.com` (`command-palette.tsx:46`) vs `klhong124+inbox@gmail.com` (`dock.tsx:31`).
- **`content/stats.ts` is unverifiable** — "140 reusable components", "Average Lighthouse score 95", "20 client projects", with no source or methodology. Recruiters discount unsourced numbers, and a wrong Lighthouse claim is trivially disproved by opening DevTools. Recommend cutting or grounding these.
- **`content/testimonials.ts` is never rendered**, and its authors are anonymous ("Product Lead", "Design Manager") — low value even if mounted.
- **No CV in the repo.** `/Ryan-Kwan-CV.pdf` is referenced only from the unmounted `HeroSectionV2`.
- **Two contradictory work histories:** `content/experience.ts` (4 entries, typed, drives the homepage) and `utils/jobs.ts` (9 entries, untyped, drives `/work`). `utils/jobs.ts` **omits BuiltByPixel entirely**, so the `/work` timeline shows Ryan's current role as Executives Place in 2024.
- `content/experience.ts:11` dates BuiltByPixel as **2026**, but the brief says **2025 — Present**. Needs confirming.

### 3.7 Copy issues

Jargon that will not land with recruiters or engineering managers: "Creative Operating System" (`ai-augmented.tsx:8`), "Projects as Product Launches" (`featured-work.tsx:31`), "Plan -> Research -> Patch loops" (`ai-augmented.tsx:12`), "DX-focused refactor templates" (`ai-augmented.tsx:15`), "PRP" / "Context Engineering" (`content/stack.ts:7`).

US spellings in user-facing prose: "Optimize" (`content/bio.ts:7`), "Specializing" (`heroSection.tsx:303`), "analyzing" (`utils/jobs.ts:66`), "organizations" (`ui/bento/items/about.tsx:14`), "Standardized" (`builtbypixel.mdx`).

Inconsistent self-description: "Front-end", "Frontend", and "front-end" all appear in live copy.

### 3.8 Mobile thumb zones

There is **no persistent primary CTA**. The live hero's only action is the click-to-reveal. Contact is the last section on a long page. The dock sits at `bottom-8` which is good thumb reach, but it is social links rather than "hire me" / "CV".

---

## 4. Accessibility (WCAG 2.2 AA)

### Passing already

A skip link exists (`app/layout.tsx:48`, targets `#content`), there is exactly one `<main>` landmark, `lang` is set, and `styles/cursor.scss` (global `cursor: none`) is disabled.

### Failures

| # | Issue | Location | Criterion |
| --- | --- | --- | --- |
| 1 | Hero reveal is a `div` with `onClick` — no `role`, `tabIndex`, or key handler. Keyboard and screen-reader users **cannot reach the intro copy at all**. | `heroSection.tsx:153-156` | 2.1.1 |
| 2 | Form fields have **no `<label>`** — placeholder-as-label only. No `type="email"`, no `autocomplete`, no error states, no `aria-invalid`/`aria-describedby`, and the status message is not an `aria-live` region. | `contact.tsx:22-31` | 1.3.1, 3.3.2, 4.1.3 |
| 3 | Command palette has no `role="dialog"`, no `aria-modal`, no focus trap, no initial focus, and **no Escape to close**. The backdrop is a click-only `div`. | `command-palette.tsx:20-51` | 2.1.2, 4.1.2 |
| 4 | No `prefers-reduced-motion` support anywhere. | site-wide | 2.3.3 |
| 5 | No custom `:focus-visible` styling. Browser defaults on a dark glass UI are very hard to see. | `styles/*.scss` | 2.4.7, 2.4.11 |
| 6 | `TextHoverEffect` renders the `/work` page's "WORK" wordmark at `opacity: 0` until hover — **content only exists on hover**, and it is an SVG, not a heading. | `textHoverEffect.tsx:128` | 1.4.13, 1.3.1 |
| 7 | Case study pages have **no `<h1>`** — MDX starts at `##`. `/work` also has no `h1`. | `[slug]/page.tsx`, `work-page-inner.tsx` | 1.3.1, 2.4.6 |
| 8 | `<button>` nested inside `<a>` on "Book a Call". | `contact.tsx:27-29` | 4.1.1 |
| 9 | Window control dots are 12×12 px, have **no accessible name**, and their `onClick` is an empty no-op — three focus stops that do nothing, early in tab order. | `windowControl.tsx:26-47` | 2.5.8, 4.1.2 |
| 10 | Low contrast: `text-gray-400` hero intro ≈ **2.8:1**; `text-gray-500` indicator ≈ **2.0:1**; `.text-secondary` gradient ends at slate-400 ≈ **4.2:1**; `text-neutral-400` timeline tags ≈ **3.3:1**. All fail 4.5:1 for normal text. | `heroSection.tsx:295`, `indicatorText.tsx:21`, `text.scss:6-9`, `timeline.tsx:74` | 1.4.3 |
| 11 | Decorative `LetterGlitch` canvas is not `aria-hidden`; the wave emoji and sparkle dots are not hidden either. | `background.tsx:44`, `heroSection.tsx:185,237` | 1.1.1 |
| 12 | Decorative background renders as a `<section>` **outside `<main>`**, polluting landmark navigation. | `ui/background.tsx:23` | 1.3.1 |
| 13 | Icon-only dock links rely on inner `Image` `alt` with no `aria-label`; alt casing is wrong ("Linkedin", "Github", "Whatsapp"). Dock targets are 40 px (passes 24×24, below the 44×44 guideline). | `dock.tsx:117-165` | 2.4.4, 2.5.8 |
| 14 | `lang="en"` rather than `en-GB` for a UK-targeted site. | `layout.tsx:42` | 3.1.1 (advisory) |
| 15 | Skip link has no visible focus ring beyond a background swap. | `layout.tsx:48` | 2.4.7 |

`text-muted` (`#8C8C98` on `#08080A`) computes to about **4.7:1** — it passes, but only just, and it is the site's default body colour. Worth nudging brighter.

---

## 5. Code health

### 5.1 Two parallel component systems

| | Location | Live? |
| --- | --- | --- |
| **v2** | `components/sections/*`, `components/shared/*`, `components/layout/*` | Yes — every homepage section except the hero |
| **Legacy (aceternity)** | `components/heroSection.tsx` + `ui/*` | Yes — hero only, pulling in `glowing-card`, `dock`, `windowControl`, `highlight`, `indicatorText` |

Four duplicated implementations, where the *newer* version is the unused one in three cases:

| Newer (unused) | Legacy (rendered) |
| --- | --- |
| `components/sections/hero.tsx` | `components/heroSection.tsx` |
| `components/sections/experience.tsx` + `content/experience.ts` | `ui/timeline.tsx` + `utils/jobs.ts` |
| `components/workSection.tsx` | `app/work/work-page-inner.tsx` |
| `components/shared/glass-card.tsx` | `ui/glowing-card.tsx` |

### 5.2 Dead code

**Orphans (zero importers):** `components/bentoSection.tsx`, `components/workSection.tsx`, `components/sections/hero.tsx`, `components/shared/reveal.tsx`, `components/shared/scramble-text.tsx`, `ui/backdrop.tsx`, `ui/loading.tsx`, `content/testimonials.ts`, `posthog.ts`, `app/api/spotify.ts`, and `getProjectBySlug` in `lib/mdx.ts`.

**The entire `ui/bento/` tree** (13 files) is reachable only through the orphaned `bentoSection.tsx`. Note `ui/bento/items/profile.tsx` calls `utils/github.ts` (Octokit, `GITHUB_TOKEN`) from a **client** component — if it were ever mounted it would leak a token into the client bundle. Dormant, but worth deleting rather than leaving armed.

`styles/loading.scss` is only reachable via the orphaned `ui/loading.tsx`.

### 5.3 Server vs client boundaries

`app/page.tsx` is marked `"use client"`, which makes **the entire homepage a client tree**. Only `heroSection`, `FeaturedWorkSection` (GSAP), and `ContactSectionV2` (form state) genuinely need it. `AboutSection`, `ExperienceSectionV2`, `SystemsDesignSection`, and `AiAugmentedSection` are static renders over local data.

`components/sections/tech-stack.tsx:1` and `components/shared/section.tsx` declare `"use client"` but **use no client APIs at all**.

`app/layout.tsx` wraps every route — including MDX case studies — in `ThemeAccentProvider`, `LenisProvider`, `MouseContextProvider`, `SiteHeader`, `CommandPalette`, `NoiseOverlay`, `Cursor`, and `Background`. That is the 102 kB shared baseline.

`PostHogProvider` is **commented out** (`layout.tsx:44,64`) while `posthog-js`/`posthog-node` remain installed and `posthog.ts` is orphaned. Analytics is currently Vercel + GA only. Per the repo's PostHog rules, if it is coming back it should use the key from `.env` — no `.env` or `.env.example` is committed today (`.gitignore` excludes them). Referenced vars: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `GITHUB_TOKEN`, `NODE_ENV`.

### 5.4 Token systems: three of them, no single source of truth

1. **`styles/tokens.scss`** — semantic RGB triplets (`--bg`, `--surface`, `--fg`, `--muted`, `--accent`) plus three radii, with `[data-accent]` themes. This is the closest thing to canonical.
2. **`tailwind.config.ts:29-35`** — aliases those same names into Tailwind.
3. **`utils/colors.ts`** — a plugin that flattens the *entire* Tailwind palette into `:root` CSS variables (`--slate-200`, `--neutral-400`, …), which are then used directly in `ui/*`.

Consequences: `.text-primary`/`.text-secondary` gradients in `styles/text.scss` compete with `text-fg`/`text-muted`; hardcoded values like `text-cyan-300` and `bg-stone-950` bypass the accent token entirely, so the accent switcher only half-works; glass styling is defined three times (`globals.scss` `.glass`, `glass-card.tsx`, `glowing-card.tsx`).

**There are no spacing or typography tokens at all** — no fluid type scale, no measure constraint. The brief's 65–75ch body target has nothing to hang off.

**Fonts are a real perf issue.** `styles/fonts.scss` loads three **`.ttf`** files by `@font-face` with no `font-display` and no `woff2`: `space-grotesk.ttf` (137 kB), `quicksand.ttf` (124 kB), `matrix.ttf` (50 kB). Meanwhile `app/layout.tsx:18` *also* loads Inter Tight via `next/font`. So `body` is set to `font-spaceGrotesk` from a raw TTF while a properly optimised font sits unused. (Note: both the font files and `public/images/*` **do exist** — worth stating because they are easy to assume missing.)

### 5.5 Images are unoptimised

`public/images/` holds 7.4 MB of PNGs, all served through `ui/timeline.tsx` on `/work`: `CDP.png` is **3.3 MB**, `memoplus.png` 1.7 MB, `executivesplace.png` 1.0 MB. These should be WebP/AVIF at sensible dimensions. `utils/jobs.ts:61` also hotlinks an image from `ryankwan.netlify.app`, an old deployment — a fragile external dependency.

### 5.6 Config

- `tsconfig.json` has `strict: true` (good) but `include`s **`app/explore` and `middleware.ts`, neither of which exists**.
- `tailwind.config.ts` scans `pages/**` — there is no `pages/` directory.
- `next.config.mjs` calls `createMDX({})` with no `rehype-pretty-code`, despite the dependency.
- `.eslintrc.json` extends only `next/core-web-vitals` — legacy format, minimal rule coverage.
- `app/api/spotify.ts` is a **Pages Router** handler sitting in the App Router tree. Non-functional.

### 5.7 Tests and Storybook

**Zero tests exist.** No `*.test.*`, no `*.spec.*`, no `__tests__/`. `jest.config.ts` is configured and `npm test` runs nothing.

**Storybook is not installed** — no `.storybook/`, no `*.stories.*`. (`public/model/storybook.gltf` is a 3D logo, not the tool.) The brief says "ensure Storybook still runs if present" — it is not present, so there is nothing to preserve. `content/stack.ts` and `builtbypixel.mdx` both advertise Storybook expertise, which is credible from Ryan's Kubrick/BuiltByPixel work but is not demonstrated in this repo.

### 5.8 TypeScript

`strict: true` is on and there are no `@ts-ignore`s. Weak spots: `any` in `utils/throttle.ts:6`, `utils/colors.ts:4`, `utils/background.ts` (×4), `ui/dock.tsx:46`, `ui/bento/grid.tsx:25-27`, `heroSection.tsx:39`. Non-null assertions in `posthog.ts:5`, `PostHogProvider.tsx:10`.

Most importantly, **the content layer is barely typed**: only `experience.ts` exports a type. `bio`, `stack`, `stats`, and `testimonials` are inferred object literals; `utils/jobs.ts` is fully untyped with inconsistent optional fields; and `lib/mdx.ts:14` returns gray-matter's `data` as untyped `any`. There is no runtime validation and **Zod is not installed**.

### 5.9 Bundle

`gsap` + `ScrollTrigger` (`featured-work.tsx:3-4`) and `lenis` (`lenis-provider.tsx:3`) are **static imports**, so both sit in the shared/homepage bundle. `motion` is statically imported across 20+ files. `three`/`fiber`/`drei` are behind `next/dynamic` but the module-scope `useGLTF.preload` undermines that.

---

## 6. Oasis Infinite — exhaustive removal list

Four code/content references plus the file itself:

1. `content/projects/oasis-infinite.mdx` — delete the file
2. `app/work/[slug]/page.tsx:7` — `mdxMap` entry
3. `app/sitemap.ts:8` — sitemap URL
4. `components/sections/featured-work.tsx:15` — grid entry

No Oasis assets exist under `public/`, and no redirects reference it. Since `/work/oasis-infinite` is currently in the live sitemap, a redirect to `/work` would be tidier than a bare 404.

**False positives — do not touch:** `repeat: Infinity` in `heroSection.tsx:181,251` and `bento/items/code-pattern.tsx:71,128`; `useMotionValue(Infinity)` / `mouseX.set(Infinity)` in `ui/dock.tsx:47,52`; `animation: loading 2s infinite` in `styles/loading.scss:3`.

---

## 7. Content-schema note for Phase 1

The brief asks for changes to `data/portfolio-content.ts` and for case studies with **"Architecture moves", "Performance levers", "Engineering impact", "Challenges conquered"**.

Neither exists. There is no `data/` directory, and no MDX file uses those headings. Actual state:

- Timeline lives in `content/experience.ts` as `ExperienceItem[]` — `{ year: number; name: string; title?: string; desc: string; tags: string[] }`. It has **no fields for URLs, no date range, and no summary/bullets split**, so the requested Parfetts entry (live URLs, "2025 — Present", stack bullets) does not fit the current type.
- Case studies are MDX with only `title` and `summary` frontmatter, ad hoc `##` headings per file, and frontmatter that is never read.

So Phase 1 needs a schema decision before content can be written. My recommendation: introduce a typed, Zod-validated content module (the brief's `data/portfolio-content.ts` in spirit) with an explicit case-study shape matching the requested section names, and have the MDX body carry only long-form prose. That also fixes §5.8 and §3.4 at once. Confirming with Ryan before writing.

---

## 8. Placeholders requiring Ryan's confirmation

Per the brief, nothing about Parfetts is invented. These need confirming before they ship:

1. **Parfetts shipped features** — the brief gives a confirmed *stack* but no specific shipped features. Achievement bullets will be written as capability/scope statements from the confirmed stack, marked `TODO(ryan)` where a specific feature claim would otherwise be needed.
2. **BuiltByPixel dates** — brief says "2025 — Present"; `content/experience.ts:11` says 2026.
3. **Job title at BuiltByPixel** — currently "Frontend Engineer"; the site's metadata claims "Senior frontend engineer".
4. **`content/stats.ts` numbers** — 140 components / Lighthouse 95 / 20 projects are unsourced. Recommend removing.
5. **Which email is canonical** — `ryankwan.dev@gmail.com` or `klhong124+inbox@gmail.com`.
6. **Calendly URL** — currently a bare `https://calendly.com`.
7. **Kubrick / Gymism / Car8 case studies** — keep and write, or drop from the grid? They 404 today.
8. **CV** — no PDF in the repo; is one coming?
9. **Testimonials** — attributable to named people, or cut?
10. **Existing Algolia/GraphQL claims** — `content/experience.ts:15` and `builtbypixel.mdx` credit BuiltByPixel with GraphQL, but the brief states Parfetts is REST-only, no GraphQL. Was GraphQL another BuiltByPixel client, or should this be corrected?

---

## 9. Suggested order of work

1. **Trust and correctness first** (cheap, high impact): remove Oasis, fix the three 404 links, make the contact form actually send and work without JS, fix `#hero`, reconcile the two work histories, unify the email address.
2. **Content schema + Phase 1 content**: typed Zod content module, Parfetts timeline entry and case study, Immich case study.
3. **Accessibility**: labels, focus-visible, dialog semantics, contrast, keyboard path to hero copy, heading structure and per-slug metadata.
4. **Motion**: `lib/motion` token module, a reduced-motion gate at the provider level, throttle/passive scroll listeners, drop `width`/`height` animation, unblock hero LCP, clean up ScrollTrigger.
5. **Next 16 / React 19 / Motion 13 upgrade**, then re-verify.
6. **Hygiene**: delete dead trees, single lockfile, one token system, `woff2` fonts, compress images, split server/client.
7. **Phase 4 verification**: build, lint, Lighthouse, keyboard-only, reduced-motion, 390 px viewport, throttled network.

Deliberately deferred and flagged rather than assumed: Tailwind 4, TypeScript 7, ESLint 10 (§1), and any removal of the site's visual identity (LetterGlitch background, custom cursor, glowing hero card, dock, Lenis smooth scroll) — the brief says to ask first.
