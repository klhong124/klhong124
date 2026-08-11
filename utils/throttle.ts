export const limit = 100;

/**
 * Trailing-edge throttle. Guarantees the final call runs, which matters for
 * pointer and scroll handlers where dropping the last event leaves the UI
 * mid-gesture.
 */
export default function throttle<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number = limit,
) {
  let trailing: ReturnType<typeof setTimeout>;
  let lastRan = 0;

  return function throttled(...args: Args) {
    const now = Date.now();

    if (!lastRan) {
      func(...args);
      lastRan = now;
      return;
    }

    clearTimeout(trailing);
    trailing = setTimeout(
      () => {
        if (Date.now() - lastRan >= wait) {
          func(...args);
          lastRan = Date.now();
        }
      },
      wait - (now - lastRan),
    );
  };
}

/**
 * Coalesces bursts of events into one callback per animation frame. Preferred
 * over `throttle` for anything that writes to style, since it lines the write
 * up with the browser's paint instead of an arbitrary 100ms timer.
 */
export function rafThrottle<Args extends unknown[]>(func: (...args: Args) => void) {
  let frame: number | null = null;
  let latest: Args;

  const throttled = (...args: Args) => {
    latest = args;
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      func(...latest);
    });
  };

  throttled.cancel = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  };

  return throttled;
}
