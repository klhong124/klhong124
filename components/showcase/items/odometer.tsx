"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

type OdometerProps = {
  /** The figure to show. Changing it rolls each digit to its new value. */
  to: number;
  /** When set, the first appearance rolls from this value, once, on scroll into view. */
  from?: number;
  /** Seconds each digit takes to roll. */
  duration?: number;
  /** Seconds before the rightmost digit starts. */
  delay?: number;
  /** Extra seconds per digit, counted from the right, for a right-to-left ripple. */
  stagger?: number;
  /** Thousands separator for the default format. Empty for none. */
  separator?: string;
  /** Turns the number into display text. Defaults to `to`'s own decimal places. */
  format?: (value: number) => string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  className?: string;
};

const STRIP = "0123456789";
// How far each digit's window reaches past its line. The fade lives in this
// band, so a digit at rest is never dimmed.
const BLEED = "0.15em";
const FADE = `linear-gradient(to bottom, transparent, #000 ${BLEED}, #000 calc(100% - ${BLEED}), transparent)`;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const isDigit = (char: string) => char >= "0" && char <= "9";

function defaultFormat(to: number, separator: string) {
  const places = (String(to).split(".")[1] ?? "").length;
  const formatter = new Intl.NumberFormat("en-US", {
    useGrouping: separator !== "",
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  });
  return (value: number) => formatter.format(value).replace(/,/g, separator);
}

/**
 * One rolling digit: a 0 to 9 strip behind a one-line window.
 *
 * An invisible copy of the digit stays in flow and gives the window its size
 * and its baseline, so it lines up with the static characters around it. The
 * strip is clipped with clip-path rather than overflow, because overflow would
 * move an inline-block's baseline. The window is padded by BLEED and pulled
 * back by the same negative margin, so the fade has room without the line
 * growing.
 *
 * Each strip item carries the same BLEED padding, so an item is exactly one
 * window tall: at rest the neighbouring digits start where the window ends and
 * nothing peeks into the fade band. They only pass through it while rolling.
 */
function Digit({ value, transition }: { value: number; transition: string }) {
  return (
    <span
      className="relative inline-block"
      style={{
        clipPath: "inset(0)",
        maskImage: FADE,
        WebkitMaskImage: FADE,
        paddingBlock: BLEED,
        marginBlock: `-${BLEED}`,
      }}
    >
      <span className="invisible">{value}</span>
      <span
        className="absolute inset-x-0 top-0 flex flex-col"
        // The strip is ten windows tall, so each step of 10% is one digit.
        style={{ transform: `translateY(${-value * 10}%)`, transition }}
      >
        {[...STRIP].map((digit) => (
          <span key={digit} style={{ paddingBlock: BLEED }}>
            {digit}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * A mechanical-counter number. When the value changes, every digit rolls on
 * its own to its new value; symbols and separators stay still.
 *
 * The roll is a CSS transition on transform, so nothing runs per frame and
 * React only renders when the value changes. Digits are keyed by position from
 * the right, so units stay over units when the figure gains or loses a digit,
 * and a digit that did not exist before simply appears.
 *
 * Known trade-off: each strip is linear, so 9 to 0 rolls back through every
 * digit rather than wrapping forward.
 */
export function Odometer({
  to,
  from,
  duration = 1.2,
  delay = 0,
  stagger = 0.06,
  separator = ",",
  format,
  prefix,
  suffix,
  className = "",
}: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const display = format ?? defaultFormat(to, separator);

  // Only a `from` figure waits to be seen; otherwise show the value right away.
  const chars = [...display(from !== undefined && !seen ? from : to)];
  // For each character, how many digits sit to its right. The rightmost digit
  // has none, so it starts first and each one to its left follows a beat later.
  const digitsToRight = chars.map((_, index) => chars.slice(index + 1).filter(isDigit).length);

  return (
    <span ref={ref} className={`whitespace-nowrap tabular-nums ${className}`}>
      {prefix}
      <span aria-hidden="true">
        {chars.map((char, index) => {
          const fromRight = chars.length - index;
          if (!isDigit(char)) return <span key={`s${fromRight}${char}`}>{char}</span>;
          const transition = reduced
            ? "none"
            : `transform ${duration}s ${EASE} ${delay + digitsToRight[index] * stagger}s`;
          return <Digit key={`d${fromRight}`} value={Number(char)} transition={transition} />;
        })}
      </span>
      {/* Screen readers get the final figure once, never a half-rolled one. */}
      <span className="sr-only">{display(to)}</span>
      {suffix}
    </span>
  );
}
