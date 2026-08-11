/**
 * The single source of truth for motion values.
 *
 * Before this existed the same intent was expressed six different ways —
 * `duration: 0.6` in four files, two near-identical easing curves
 * (`[0.16, 1, 0.3, 1]` and `[0.23, 1, 0.32, 1]`), and springs that differed by
 * a damping value for no reason. Import from here instead of writing a number.
 */

/** Seconds, matching Motion's default time unit. */
export const duration = {
  /** Hover, focus and press feedback. Must feel instant. */
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  /** Entrances and reveals. */
  slow: 0.6,
  /** Ambient, long-running effects only. */
  ambient: 1.2,
} as const;

export const ease = {
  /** Decelerating exit curve — the default for anything entering the viewport. */
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  /** Slight overshoot, for playful accents rather than layout. */
  overshoot: [0.34, 1.56, 0.64, 1],
} as const;

export const spring = {
  /** Pointer-following surfaces: glow, magnetic buttons, parallax. */
  pointer: { type: "spring", stiffness: 150, damping: 18, mass: 0.6 },
  /** UI settling into place. */
  settle: { type: "spring", stiffness: 380, damping: 30 },
  /** Accents that should feel alive. Not for anything affecting layout. */
  bouncy: { type: "spring", stiffness: 220, damping: 14 },
} as const;

/**
 * Enter/exit presets for content that mounts and unmounts on the client, such
 * as tooltips and the pointer companion. Transform and opacity only — never
 * width, height, top or left, which force layout.
 *
 * Note there is deliberately no scroll-triggered "reveal on enter viewport"
 * preset. Doing that server-side means shipping HTML with `opacity: 0` inline,
 * which delays the largest paint and strands the content invisible if
 * JavaScript fails or the viewport observer never fires. Entrances are reserved
 * for elements that only ever exist client-side.
 */
export const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeTransition = {
  duration: duration.base,
  ease: ease.out,
} as const;
