"use client";

import TextHoverEffect from "@/ui/textHoverEffect";

/**
 * The hover-revealed "WORK" wordmark, kept as decoration only.
 *
 * The effect renders its text at zero opacity until the pointer is over it, so
 * it cannot carry the page heading — the real <h1> sits beneath it and is always
 * visible. Hidden from assistive technology to avoid announcing "WORK" twice,
 * and hidden on small screens where there is no pointer to reveal it with.
 */
export function WorkWordmark() {
  return (
    <div aria-hidden="true" className="pointer-events-auto mb-2 hidden h-24 md:block">
      <TextHoverEffect>WORK</TextHoverEffect>
    </div>
  );
}
