import type { ReactNode } from "react";
import { GlyphField } from "@/components/showcase/items/glyph-field";
import { InkText } from "@/components/showcase/items/ink-text";
import { MagneticButton } from "@/components/showcase/items/magnetic-button";
import { SpotlightCard } from "@/components/showcase/items/spotlight-card";

export type ShowcaseItem = {
  slug: string;
  title: string;
  /** One line, shown under the title. */
  summary: string;
  /** npm packages the copied file needs. Checked against its imports by the test. */
  deps: string[];
  /** A code-free spec a visitor can paste into an AI agent to rebuild it in their own stack. */
  prompt: string;
  /** The live preview. Lives here so the list, preview, code and prompt cannot drift apart. */
  demo: ReactNode;
};

/**
 * The showcase library. Order here is the order of the list; the first item is
 * where `/showcase` lands.
 *
 * Each item's source lives at `components/showcase/items/<slug>.tsx` and is
 * self-contained (no `@/` imports), so "Copy code" hands over one file that
 * works on its own. The registry test enforces both.
 */
export const showcaseItems: ShowcaseItem[] = [
  {
    slug: "glyph-field",
    title: "Glyph Field",
    summary: "A flickering field of glyphs that decodes a hidden word around your cursor.",
    deps: ["react"],
    demo: (
      <div className="h-80 w-full overflow-hidden rounded-xl bg-black md:h-96">
        <GlyphField word="PIXEL" />
      </div>
    ),
    prompt: `Build a React component called GlyphField that fills its container with a <canvas> showing a grid of random monospace glyphs (A to Z, 0 to 9 and a few symbols), one per cell.

Props: word (default "PIXEL"), color (decoded glyph colour), noiseColor (background glyph colour), cellSize (default 16px), radius (default 140px), className.

Behaviour:
1. Hide the word in the grid. Rasterise it in a heavy sans-serif onto an offscreen canvas at grid resolution (one pixel per cell, about 75% of the grid height, capped at 85% of the width) and mark every cell whose pixel alpha is over 50% as part of the word.
2. Give every cell a heat value from 0 to 1. Each frame, cells within radius of the pointer move toward a heat of (1 - distance / radius). Heat rises fast (30% of the gap per frame) and decays slowly (3% per frame), so the reveal lingers behind the cursor.
3. Draw word cells in color at opacity equal to their heat, and dim the noise as heat rises, so the word surfaces out of the field near the cursor.
4. Cells with heat below 0.5 swap to a random glyph with a 2% chance per frame. Decoded cells hold still.
5. On pointer down, and once from the centre on mount, send out an expanding ring (6px per frame) that sets heat to 1 for every cell it crosses.

Engineering:
- Scale the canvas for devicePixelRatio and rebuild the grid with a ResizeObserver.
- Pause the animation loop with an IntersectionObserver while the canvas is offscreen.
- Clean up every listener, observer and animation frame on unmount.
- Respect prefers-reduced-motion: draw one static frame with the word fully revealed and start no loop.
- Give the canvas role="img" and an aria-label that names the hidden word.
- Use only React. No animation libraries.`,
  },
  {
    slug: "ink-text",
    title: "Ink Text",
    summary: "Outlined type you paint with the cursor, leaving gradient ink that fades as you go.",
    deps: ["react"],
    demo: (
      <InkText text="INK" className="max-w-xl font-display text-white" />
    ),
    prompt: `Build a React component called InkText: an inline SVG word drawn as an outline that the visitor paints with their cursor.

Props: text (default "INK"), colors (gradient stops, default three cool violets and blues), outline (outline colour), brush (brush radius in viewBox units, default 16), fade (milliseconds for a stroke to fade, default 1000), viewBox (default "0 0 300 100"), className.

Rendering:
1. Render the text twice, centred, at a large heavy weight. The first copy is the outline: transparent fill with a thin stroke in the outline colour. The second copy is filled with a horizontal linear gradient built from colors, and masked.
2. The mask holds one circle per "dab" of ink. Each circle uses a radial gradient from white to transparent, so the ink has soft edges, and its opacity equals the dab's remaining life.

Painting:
3. On pointer move, convert the pointer from screen pixels to viewBox units with the SVG's getScreenCTM().inverse(), then add a dab there. Skip a dab if it would land within 30% of the brush radius of the previous one, and keep at most about 80 dabs.
4. While any dabs exist, run a requestAnimationFrame loop that lowers each dab's life by elapsed / fade and removes dead ones. Stop the loop when the page is clean.

Details:
- Draw the outline in on mount with a CSS stroke-dashoffset keyframe animation (about 2.4s), defined in a <style> tag inside the SVG, so it works before hydration.
- Generate unique ids for the gradient and mask with useId, because SVG ids are global to the document.
- Respect prefers-reduced-motion: no painting, no draw-in, and the gradient fill shown in full.
- Give the SVG role="img" and an aria-label of the text, and hide the duplicate copy from assistive tech.
- Use only React. No animation libraries.`,
  },
  {
    slug: "magnetic-button",
    title: "Magnetic Button",
    summary: "A pill that leans toward the cursor on a spring, with a label that travels further for depth.",
    deps: ["react", "motion"],
    demo: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <MagneticButton>Hover me</MagneticButton>
        <MagneticButton strength={0.5}>Stronger pull</MagneticButton>
      </div>
    ),
    prompt: `Build a React component called MagneticButton: a rounded pill button that leans toward the mouse cursor on a spring.

Props: children, href (render an <a> when set, otherwise a <button type="button">), strength (default 0.3, the fraction of the cursor's offset the pill follows), className.

Behaviour:
1. Wrap the pill in a static inline-block span with about 16px of padding. That span is the magnetic field, so the pull starts just before the cursor reaches the button. Listen for pointer move and pointer leave on it.
2. On pointer move, measure the wrapper (not the moving pill, to avoid feedback) and take the cursor's offset from its centre. Move the pill by offset * strength.
3. Move the label inside the pill by a further offset * strength * 0.6, so the label travels further than the pill and reads as depth.
4. On pointer leave, spring everything back to zero.
5. Only react to mouse pointers, so touch taps do not make the button jump.

Details:
- Use the motion library (motion/react): useSpring for the four values (pill x and y, label x and y) with a soft spring around stiffness 170, damping 15, mass 0.5, and motion.a / motion.button / motion.span for the elements.
- Respect prefers-reduced-motion with motion's useReducedMotion: no movement at all.
- Keep a 44px minimum height for touch targets, a subtle translucent background and border, and a hover state that brightens both.
- The label should not capture pointer events.`,
  },
  {
    slug: "spotlight-card",
    title: "Spotlight Card",
    summary: "A card that follows its own pointer, with a soft inner glow and a border that lights up nearest the cursor.",
    deps: ["react"],
    demo: (
      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {[
          ["Edge rendering", "Pages render close to the visitor, so the first paint arrives fast."],
          ["Typed end to end", "One schema describes the data from the database to the button."],
          ["Accessible by default", "Keyboard paths, focus rings and reduced motion are built in."],
          ["Observable", "Every request carries a trace, so slow paths are easy to find."],
        ].map(([title, body]) => (
          <SpotlightCard key={title}>
            <h3 className="font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm text-white/60">{body}</p>
          </SpotlightCard>
        ))}
      </div>
    ),
    prompt: `Build a React component called SpotlightCard: a dark card with a soft glow that follows the pointer inside it and a border that lights up nearest the cursor.

Props: children, color (border light colour, default a soft violet), glow (inner glow colour, a low-opacity version of the same hue), className.

Structure:
1. An outer wrapper with a 1px padding, a faint translucent background and a 16px radius. That 1px gap around the inner panel is the border.
2. Inside the wrapper, behind the panel, an absolutely positioned layer filling the wrapper with a radial gradient of color (about 220px) centred on the pointer. This is the light that shows through the 1px gap.
3. The inner panel: solid near-black background, radius of 16px minus 1px, overflow hidden, padded. Inside it, a second absolutely positioned radial gradient of glow (about 320px) centred on the pointer, and then the children on top.

Behaviour:
4. On pointer move, write the pointer position relative to the card into two CSS custom properties (--x and --y) on the wrapper element. Do not use React state, so tracking never re-renders. Both gradients read the position with "at var(--x) var(--y)". Default both variables to 50%.
5. Both light layers are invisible at rest and fade in on hover and on focus-within, using CSS only (for example Tailwind group-hover and group-focus-within).

Details:
- Only animate opacity, and only when the visitor has not asked for reduced motion.
- Light layers are aria-hidden and ignore pointer events.
- Each card tracks its own pointer. No global mouse listeners or context.
- Use only React and CSS.`,
  },
];

export const getShowcaseItem = (slug: string) => showcaseItems.find((item) => item.slug === slug);
