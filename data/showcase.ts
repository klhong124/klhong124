export type ShowcaseItem = {
  slug: string;
  title: string;
  /** One line, shown under the title. */
  summary: string;
  /** npm packages the copied file needs. Checked against its imports by the test. */
  deps: string[];
  /** A code-free spec a visitor can paste into an AI agent to rebuild it in their own stack. */
  prompt: string;
};

/**
 * The showcase library. Order here is the order of the list; the first item is
 * where `/showcase` lands.
 *
 * Each item's source lives at `components/showcase/items/<slug>.tsx` and is
 * self-contained (no `@/` imports), so "Copy code" hands over one file that
 * works on its own. Its live preview and props panel live in
 * `components/showcase/demos.tsx`, because they render in the browser. The
 * registry test keeps all three in step.
 */
export const showcaseItems: ShowcaseItem[] = [
  {
    slug: "glyph-field",
    title: "Glyph Field",
    summary: "A flickering field of glyphs that decodes a hidden logo or word around your cursor.",
    deps: ["react"],
    prompt: `Build a React component called GlyphField that fills its container with a <canvas> showing a grid of random monospace glyphs (A to Z, 0 to 9 and a few symbols), one per cell.

Props: path (SVG path data for a shape such as a logo), pathViewBox (the path's "minX minY width height"), word (default "PIXEL", used when there is no path), color (decoded glyph colour), noiseColor (background glyph colour, hex), cellSize (default 16px), radius (default 140px), className.

Behaviour:
1. Hide the shape in the grid. Rasterise it onto an offscreen canvas at grid resolution (one pixel per cell) and mark every cell whose pixel alpha is over 50% as part of the shape. For a path, scale it to fit about 85% of the grid width and 80% of its height, centre it, and fill it with new Path2D(path). For a word, draw it centred in a heavy sans-serif at about 75% of the grid height, capped at 85% of the width.
2. Give every cell a heat value from 0 to 1. Each frame, cells within radius of the pointer move toward a heat of (1 - distance / radius). Heat rises fast (30% of the gap per frame) and decays slowly (3% per frame), so the reveal lingers behind the cursor.
3. Draw shape cells in color at opacity equal to their heat, and dim the noise by up to 90% as heat rises, so the shape surfaces out of the field near the cursor.
4. Cells with heat below 0.5 swap to a random glyph with a 2% chance per frame. Decoded cells hold still.
5. On pointer down, and once from the centre on mount, send out an expanding ring (6px per frame) that sets heat to 1 for every cell it crosses.

Engineering:
- Scale the canvas for devicePixelRatio and rebuild the grid with a ResizeObserver.
- Read color, noiseColor and radius from a ref each frame, so changing them restyles the running field instead of rebuilding the grid.
- Pause the animation loop with an IntersectionObserver while the canvas is offscreen.
- Clean up every listener, observer and animation frame on unmount.
- Respect prefers-reduced-motion: draw one static frame with the shape fully revealed and start no loop.
- Give the canvas role="img" and an aria-label that describes the hidden logo or word.
- Use only React. No animation libraries.`,
  },
  {
    slug: "ink-text",
    title: "Ink Text",
    summary: "Outlined type you paint with the cursor, leaving gradient ink that fades as you go.",
    deps: ["react"],
    prompt: `Build a React component called InkText: an inline SVG word drawn as an outline that the visitor paints with their cursor.

Props: text (default "INK"), colors (gradient stops, default three cool violets and blues), outline (outline colour), brush (brush radius in viewBox units, default 16), fade (milliseconds for a stroke to fade, default 1000), fontSize (in viewBox units, default 72), viewBox (default "0 0 300 100"), className.

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
    prompt: `Build a React component called MagneticButton: a rounded pill button that leans toward the mouse cursor on a spring.

Props: children, href (render an <a> when set, otherwise a <button type="button">), strength (default 0.3, the fraction of the cursor's offset the pill follows), field (default 16, pixels of magnetic padding around the button), className.

Behaviour:
1. Wrap the pill in a static inline-block span padded by field pixels. That span is the magnetic field, so the pull starts just before the cursor reaches the button. Listen for pointer move and pointer leave on it. field={0} keeps the button at its natural size, for tight spots like a header.
2. On pointer move, measure the wrapper (not the moving pill, to avoid feedback) and take the cursor's offset from its centre. Move the pill by offset * strength.
3. Move the label inside the pill by a further offset * strength * 0.6, so the label travels further than the pill and reads as depth.
4. On pointer leave, spring everything back to zero.
5. Only react to mouse pointers, so touch taps do not make the button jump.

Details:
- Use the motion library (motion/react): useSpring for the four values (pill x and y, label x and y) with a soft spring around stiffness 170, damping 15, mass 0.5, and motion.a / motion.button / motion.span for the elements.
- Respect prefers-reduced-motion with motion's useReducedMotion: no movement at all.
- Keep a 44px minimum height for touch targets, a subtle translucent background and border, and a hover state that brightens both.
- Split the classes in two: layout that always applies (inline-flex, centring, min height, text size, colour transition), and the look (radius, border, background, padding, text colour). className replaces the look instead of being appended, so an override never fights a built-in class.
- The label should not capture pointer events.`,
  },
  {
    slug: "spotlight-card",
    title: "Spotlight Card",
    summary: "A card that follows its own pointer, with a soft inner glow and a border that lights up nearest the cursor.",
    deps: ["react"],
    prompt: `Build a React component called SpotlightCard: a dark card with a soft glow that follows the pointer inside it and a border that lights up nearest the cursor.

Props: children, color (light colour, hex, default a soft violet), glowOpacity (inner glow strength from 0 to 1, default 0.14), size (border light radius in px, default 220), className.

Structure:
1. An outer wrapper with a 1px padding, a faint translucent background and a 16px radius. That 1px gap around the inner panel is the border.
2. Inside the wrapper, behind the panel, an absolutely positioned layer filling the wrapper with a radial gradient of color (size px) centred on the pointer. This is the light that shows through the 1px gap.
3. The inner panel: solid near-black background, radius of 16px minus 1px, overflow hidden, padded. Inside it, a second absolutely positioned radial gradient (size * 1.5 px) centred on the pointer, coloured with color-mix(in srgb, color glowOpacity%, transparent), and then the children on top.

Behaviour:
4. On pointer move, write the pointer position relative to the card into two CSS custom properties (--x and --y) on the wrapper element. Do not use React state, so tracking never re-renders. Both gradients read the position with "at var(--x) var(--y)". Default both variables to 50%.
5. Both light layers are invisible at rest and fade in on hover and on focus-within, using CSS only (for example Tailwind group-hover and group-focus-within).

Details:
- Only animate opacity, and only when the visitor has not asked for reduced motion.
- Light layers are aria-hidden and ignore pointer events.
- Each card tracks its own pointer. No global mouse listeners or context.
- Use only React and CSS.`,
  },
  {
    slug: "odometer",
    title: "Odometer",
    summary: "A mechanical-counter number: when the value changes, each digit rolls on its own to its new value.",
    deps: ["react", "motion"],
    prompt: `Build a React component called Odometer that shows a number like a mechanical counter. When the value changes, every digit rolls vertically to its new digit on its own. It does not count through the numbers in between.

Props: to (the number), from (optional start value), duration (seconds per roll, default 1.2), delay (seconds before the rightmost digit starts, default 0), stagger (extra seconds per digit counted from the right, default 0.06), separator (thousands separator, default ","), format (optional function from number to display text), prefix, suffix, className.

What it looks like:
1. Format the number to text. By default use Intl.NumberFormat with the same number of decimal places as \`to\`, and grouping only when separator is not empty.
2. Split the text into characters. Symbols and separators render as plain, still text. Each digit renders as its own column.
3. A column is a one-line window over a vertical strip of the digits 0 to 9. To show digit n, move the strip with translateY(-n * 10%), since each digit is 10% of the strip's height. Animate it with a CSS transition on transform (an ease-out curve such as cubic-bezier(0.22, 1, 0.36, 1)), so no JavaScript runs per frame.
4. The rightmost digit starts first, and each digit to its left starts stagger seconds later, so the change ripples right to left.
5. Let each window reach about 0.15em above and below its line, pulled back with an equal negative margin so the line does not grow, and fade that band with a top-to-bottom mask-image gradient. Give every strip item the same 0.15em vertical padding, so each item is exactly one window tall: at rest the neighbouring digits sit just outside the window and nothing peeks into the fade band. Digits fade softly as they pass the edges, and a digit at rest is never dimmed.

Layout details:
- Use tabular-nums so digits never change width mid-roll.
- Keep an invisible copy of the digit in flow so the column takes its width, height and text baseline, and lines up with the symbols around it.
- Clip the strip with clip-path: inset(0), not overflow: hidden, because overflow moves an inline-block's baseline.
- Key each column by its position from the right, so units stay over units when the figure gains or loses a digit. A column that did not exist before appears at its digit without rolling.

Modes and accessibility:
- Without from, the first render shows the value as it is and only later changes roll.
- With from, hold at from until about 10% of the element scrolls into view (motion's useInView, once), then roll to the value.
- Under reduced motion (motion's useReducedMotion), set the transition to none so the value just changes.
- Hide the rolling digits from assistive tech and add a visually hidden copy of the final formatted value, so screen readers never hear a half-rolled number.
- Known trade-off: the strip is linear, so 9 to 0 rolls back through every digit instead of wrapping forward. Mention this in a code comment.`,
  },
];

export const getShowcaseItem = (slug: string) => showcaseItems.find((item) => item.slug === slug);

/** Just what the list needs, so the prompts stay out of the client bundle. */
export const showcaseLinks = showcaseItems.map(({ slug, title }) => ({ slug, title }));
