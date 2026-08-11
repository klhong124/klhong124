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
 * Reveal presets. Transform and opacity only — never width, height, top or
 * left, which force layout and were the cause of the hero's layout shift.
 */
export const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const revealTransition = {
  duration: duration.slow,
  ease: ease.out,
} as const;

/**
 * Staggered container. Deliberately short: the previous hero delayed its own
 * LCP text by well over a second, which read as slowness rather than polish.
 */
export const stagger = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  },
  item: {
    hidden: reveal.hidden,
    visible: { ...reveal.visible, transition: revealTransition },
  },
} as const;

/**
 * Cap on how many elements may animate at once on small screens. Used by
 * list-style reveals to stop long lists queueing dozens of simultaneous
 * transitions on a mid-range phone.
 */
export const MAX_CONCURRENT_ANIMATIONS_MOBILE = 6;
