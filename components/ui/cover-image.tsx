import Image from "next/image";
import { cn } from "@/utils/cn";

type CoverImageProps = {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  /** `cover` crops to fill; `contain` letterboxes so nothing is cut off. */
  fit?: "cover" | "contain";
  /** Wrapper classes — aspect ratio, margins, rounding. */
  className?: string;
  imageClassName?: string;
  /** Overlaid content (badges, captions) rendered above the scrim. */
  children?: React.ReactNode;
};

/**
 * The shared treatment for every screenshot on the site: slightly desaturated
 * at rest, then on hover (of the nearest `group` ancestor) the image scales up,
 * regains full colour and a light sweep passes across it. A bottom scrim keeps
 * overlaid text readable and grounds the image against the dark page.
 *
 * All effects are compositor-only (transform, opacity, filter) and CSS-driven,
 * so this stays a server component and costs nothing while off-screen.
 */
export function CoverImage({
  src,
  alt = "",
  sizes,
  priority = false,
  fit = "cover",
  className,
  imageClassName,
  children,
}: CoverImageProps) {
  return (
    <div
      className={cn(
        "group/cover relative isolate overflow-hidden border border-white/10 bg-surface",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          fit === "contain" ? "object-contain " : "object-cover ",
          "saturate-[0.88] transition-[transform,filter] duration-700 ease-out",
          "group-hover:scale-[1.01] group-hover:saturate-100 group-hover/cover:scale-[1.01] group-hover/cover:saturate-100",
          imageClassName,
        )}
      />
      {/* Bottom scrim so the image melts into the card instead of ending at a hard edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent"
      />
      {/* Light sweep on hover. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 -left-3/4 w-1/2 -skew-x-12",
          "bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "transition-transform duration-1000 ease-out",
          "group-hover:translate-x-[350%] group-hover/cover:translate-x-[350%]",
        )}
      />
      {children}
    </div>
  );
}
