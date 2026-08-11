import { cn } from "@/utils/cn";

const DOT_COLORS = ["bg-red-400", "bg-yellow-400", "bg-green-400"];

/**
 * The traffic-light dots on the hero card.
 *
 * These were <button>s with an empty click handler, which put three unlabelled
 * 12px focus stops at the very start of the tab order. They are decoration, so
 * they are now non-interactive and hidden from assistive technology.
 *
 * Rendered statically rather than springing in on mount: an animated entrance on
 * purely decorative content is a way for it to end up stuck invisible, and
 * keeping this a server component keeps the hero's JavaScript down.
 */
const WindowControl = () => (
  <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-0">
    <div className="flex gap-3 p-4 xl:p-6">
      {DOT_COLORS.map((color) => (
        <span key={color} className={cn("block size-3 rounded-full", color)} />
      ))}
    </div>
  </div>
);

export default WindowControl;
