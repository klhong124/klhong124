"use client";

import { Fragment, useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/utils/cn";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";

const emptySubscribe = () => () => {};

/** Trim punctuation so "TypeScript." and "Next.js," still match their highlight entries. */
function bareWord(word: string) {
  return word.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");
}

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  /** When false the word renders at full opacity with no scroll behaviour. */
  active: boolean;
  highlighted: boolean;
};

function Word({ word, progress, range, active, highlighted }: WordProps) {
  const opacity = useTransform(progress, range, [0.12, 1]);

  return (
    <motion.span
      style={{ opacity: active ? opacity : 1 }}
      className={cn("inline-block", highlighted && "text-accent")}
    >
      {word}
    </motion.span>
  );
}

type ScrollRevealTextProps = {
  text: string;
  /** Words to render in the accent colour, matched case-insensitively without punctuation. */
  highlights?: string[];
  className?: string;
};

/**
 * Scroll-scrubbed statement text: each word fades from a ghost of itself to
 * full strength as the paragraph moves through the viewport, so reading pace
 * and scroll pace become the same thing. The effect is tied to scroll position,
 * not to entering the viewport — scrolling back re-dims it, which is what makes
 * it feel mechanical-in-a-good-way rather than a one-shot entrance.
 *
 * Progressive enhancement, deliberately inverted from the obvious
 * implementation: the server renders every word at full opacity and the
 * dimming only switches on after hydration (`active`). Wiring the motion value
 * straight into SSR would ship HTML where most of the paragraph sits at 12%
 * opacity — unreadable if JavaScript fails, and a flash of missing content if
 * it succeeds. This section is the only place the self-intro lives now, so it
 * is content, not decoration. Reduced-motion visitors get the static paragraph
 * for the same reason.
 */
export function ScrollRevealText({ text, highlights = [], className }: ScrollRevealTextProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const motionEnabled = useMotionEnabled();
  // False during SSR and the hydration render, true immediately after —
  // exactly the boundary at which it becomes safe to hand opacity over to the
  // scroll value. The empty subscribe is correct: hydration happens once.
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const { scrollYProgress } = useScroll({
    target: container,
    // Start revealing once the paragraph's top clears the bottom sixth of the
    // viewport; finish while it is still comfortably above centre, so nobody
    // has to scroll it off-screen to read the end.
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");
  const highlightSet = new Set(highlights.map((h) => h.toLowerCase()));

  return (
    <p ref={container} className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <Word
            word={word}
            progress={scrollYProgress}
            range={[index / words.length, (index + 1) / words.length]}
            active={hydrated && motionEnabled}
            highlighted={highlightSet.has(bareWord(word))}
          />{" "}
        </Fragment>
      ))}
    </p>
  );
}
