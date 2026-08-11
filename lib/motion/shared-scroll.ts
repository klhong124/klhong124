/**
 * A single window scroll listener shared by every subscriber.
 *
 * The glass cards each registered their own `scroll` and `pointermove`
 * listeners. With around fifteen cards on the homepage that meant thirty
 * listeners competing on every scroll frame. This keeps one listener attached
 * for as long as anything is subscribed, coalesces bursts into one callback per
 * animation frame, and detaches entirely when the last subscriber leaves.
 */

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let frame: number | null = null;
let attached = false;

function flush() {
  frame = null;
  for (const subscriber of subscribers) subscriber();
}

function handleScroll() {
  if (frame !== null) return;
  frame = requestAnimationFrame(flush);
}

export function subscribeToScroll(subscriber: Subscriber) {
  subscribers.add(subscriber);

  if (!attached) {
    window.addEventListener("scroll", handleScroll, { passive: true });
    attached = true;
  }

  return () => {
    subscribers.delete(subscriber);

    if (subscribers.size === 0 && attached) {
      window.removeEventListener("scroll", handleScroll);
      attached = false;
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    }
  };
}
