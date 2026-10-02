# Showcase library — design

Date: 2026-10-01
Status: implemented (uncommitted)

## Goal

A `/showcase` page that works as a library of original UI demos, in the spirit of
React Bits / Skillry: pick an item from a list on the left, see it running on the
right, and copy it either as code or as an AI prompt.

## Scope

In:

- `/showcase` route with a left list and a detail body.
- Four original, self-contained demo components written for the showcase.
- Per item: live preview, source code, hand-written prompt, copy buttons.
- `Showcase` button in the site header, pinned right.
- Sitemap entries and a registry test.

Out (add later when needed):

- Prop controls / live tweaking (decided: preview + copy only).
- Syntax highlighting (plain monospace `<pre>`; `shiki` would be a new dependency).
- Search / filtering (worth it past ~15 items).
- Swapping the homepage over to the new components (site components stay untouched).

## Items

Each item is one `.tsx` file in `components/showcase/items/`, with no `@/` imports,
styled with Tailwind, using `motion` only where springs genuinely help. Every item
honours `prefers-reduced-motion` by rendering a static final state. They are fresh
implementations, not restructured copies of the site's existing components.

| Slug | Title | Concept | Deps |
|---|---|---|---|
| `glyph-field` | Glyph Field | Canvas glyph grid. Glyphs near the cursor decode into a hidden word (prop) and the effect ripples outward; low idle flicker. | react |
| `ink-text` | Ink Text | Outlined SVG text; the cursor paints a fading gradient-ink trail into the fill (~1s decay); stroke draws in on mount. | react |
| `magnetic-button` | Magnetic Button | Spring-follow pill whose label moves further than the pill (parallax depth). Plain `<button>` or `<a>`. | react, motion |
| `spotlight-card` | Spotlight Card | Card tracks its own pointer: radial highlight under the cursor plus a border lit through a 1px gap around the inner panel. No global context. | react |

## Architecture

Route-per-item, mirroring `app/work/[slug]`.

```
data/showcase.tsx                     registry (single source of truth)
data/showcase.test.ts                 registry check
app/showcase/layout.tsx               SiteHeader + sidebar + body grid
app/showcase/page.tsx                 redirects to the first item
app/showcase/[slug]/page.tsx          server: reads source file, renders Playground
components/showcase/showcase-nav.tsx  client: list with active state
components/showcase/playground.tsx    client: Preview / Code / Prompt tabs + copy
components/showcase/items/*.tsx       the four demos
```

### Registry entry

```ts
type ShowcaseItem = {
  slug: string;
  title: string;
  summary: string;        // one line, shown in the detail header
  deps: string[];         // npm packages the copied file needs
  prompt: string;         // hand-written, code-free spec for an AI agent
  demo: React.ReactNode;  // the preview, rendered by the server page
};
```

Keeping `demo` JSX in the same entry means list, preview, code and prompt cannot
drift apart. The client nav only receives `{ slug, title }` via props, so the
registry (and its prompt strings) never enters the client bundle through it.

### Data flow

1. `[slug]/page.tsx` runs at build time (`generateStaticParams`, unknown slugs 404).
2. It reads `components/showcase/items/<slug>.tsx` with `fs.readFile`, so the Code
   tab always shows the real source. The slug must match a registry entry first, and
   the folder is a literal so the build only traces that folder.
3. It renders `<Playground source prompt>{item.demo}</Playground>`.
4. `Playground` holds tab state and copies with `navigator.clipboard.writeText`,
   showing "Copied" for 2s (same pattern as the command palette).

### Layout

- md and up: two columns. Left: sticky list. Right: detail.
- Below md: the list becomes a horizontally scrollable chip row above the detail.
- Active item uses `aria-current="page"`.
- `/showcase` redirects to the first item so the body is never empty.

### Detail body

Header: title, summary, deps pills (reuse `Pills`). Then a tab bar
(Preview / Code / Prompt) and a panel. Preview is a bordered stage with a min
height. Code and Prompt show `<pre>` content with a Copy button in the panel corner.
Tabs follow the WAI-ARIA tabs pattern (`role="tablist"`, arrow keys).

### Header button

A `Showcase` link using the existing `MagneticButton` (secondary pill as the
wrapper), pinned to the far right of `SiteHeader`. Below md it sits beside the
burger. Visible at all breakpoints.

### Metadata and sitemap

`generateMetadata` per item (title, summary, canonical). `app/sitemap.ts` gains
`/showcase/<slug>` entries.

### Supporting changes

- `tailwind.config.ts` content globs gain `./data/**/*.tsx`, because the registry
  holds each preview's JSX and its classes would otherwise be purged.
- `SITE_URL` moves from `app/sitemap.ts` to `lib/site.ts`. The root layout imported
  it from the sitemap route, so once the sitemap imports the registry, every
  showcase demo would have landed in every page's client bundle.

## Testing

`data/showcase.test.ts`, following `data/portfolio-content.test.ts`:

- slugs are unique;
- every slug has a matching `components/showcase/items/<slug>.tsx`;
- every item has a non-empty prompt and summary;
- no item file imports from `@/` (keeps "copy code" honest);
- each item's `deps` match the packages its file imports.

Plus `typecheck`, `lint`, `build`, and a manual browser pass on desktop and mobile.

## Risks and flags

- No new dependencies. No breaking changes to existing routes or components.
- Clipboard API needs a secure context (fine on https and localhost).
- Source files become public on the site by design; only the four new item files
  are exposed.

## Revision 2 (2026-10-02)

Changes requested after the first round:

- **Props panel per item.** Reverses "preview + copy only". Each item's controls,
  preview render and usage line live in `components/showcase/demos.tsx` (client),
  because the preview must re-render in the browser from the current values. The
  registry (`data/showcase.ts`) is plain data again. Controls are native inputs
  (range, color, text, toggle) with Reset and a copyable usage line. Every demo
  ships with every item page; switch to per-slug `next/dynamic` when the library grows.
- **Glyph Field** takes `path` + `pathViewBox` (rasterised with `Path2D`); the demo
  hides the `/r` logo from `public/logo.svg`. Colours and radius are read from a ref
  so sliders restyle the running field.
- **Odometer** added: a fresh, Tailwind-only rewrite of a per-digit rolling number.
- **Prop changes for colour pickers:** Glyph Field `noiseColor` is hex; Spotlight Card
  `glow` became `glowOpacity` (mixed from `color`) and gained `size`.
- **Magnetic Button:** `className` replaces the default look instead of appending;
  new `field` prop for the magnetic padding.
- **Copy:** one copy icon with a Prompt / Code menu, right of the item title.
- **Mobile nav:** a menu button left of the title opens the list in a native modal
  `<dialog>` drawer.
- **Homepage reuse:** "How I work" uses `SpotlightCard` (now `h-full`, fixing uneven
  card heights) and `InkText` numerals (now paintable; the old `-z-10` blocked pointer
  events). The header groups the nav links with a purple, 12px-radius Showcase
  `MagneticButton` on the right.
- The `SITE_URL` move and the Tailwind `data/` glob were reverted: no longer needed
  once the registry stopped importing client components.

## Revision 3 (2026-10-02)

- Mobile list button shows `<` and the drawer slides in and out (`.showcase-drawer`
  in `styles/globals.scss`; the close animates where `display`/`overlay` can transition).
- Glow rings are concentric with their cards. `GlassCard` panel radius R, wrapper
  R + bw, ring R + bw to R + 2bw; the hero `GlowingCard` ring is 24px + bw. Previously
  every layer took the same radius, so the ring's corners were tighter than the card's.
- Odometer strip items carry the window's padding, so neighbouring digits sit just
  outside the window at rest instead of peeking into the fade band.
