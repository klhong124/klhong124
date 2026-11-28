import { cn } from "@/utils/cn";

const SYSTEM_SRC = "/diagrams/maria/system.html?theme=dark";
const SESSION_SRC = "/diagrams/maria/session.html?theme=dark";

/**
 * Interactive replacement for the static Maria architecture image.
 * The viewers are finalized Archify HTML (pan, zoom, click-to-inspect,
 * live/still). The orange frame echoes the source diagram's highlight;
 * node colours stay Archify's semantic palette.
 */
export function MariaSystem() {
  return (
    <section className="mt-12" aria-labelledby="maria-system-heading">
      <h2 id="maria-system-heading" className="text-fluid-xl font-semibold text-fg">
        How it works
      </h2>
      <p className="mt-3 max-w-prose text-pretty text-muted">
        Slack is the chat layer, the Obsidian vault is durable memory, and Maria reads, writes, and
        asks before she acts. Pan and zoom the map, click a node to inspect it, and open Maria for
        the session flow.
      </p>

      <DiagramFrame
        src={SYSTEM_SRC}
        title="How Maria works: Ryan messages Slack, Maria reads the vault and replies, and calendar or git changes wait for an OK."
        className="mt-8 h-[72vh] min-h-[560px] lg:h-[980px]"
      />

      <h3 className="mt-14 text-fluid-xl font-semibold text-fg">Session flow</h3>
      <p className="mt-3 max-w-prose text-pretty text-muted">
        One session, in order. A capture only happens when something should outlive the chat, and
        external actions wait for Ryan.
      </p>

      <DiagramFrame
        src={SESSION_SRC}
        title="Maria session flow: message, read the vault, answer, capture to main when it should last, and ask before external actions."
        className="mt-8 h-[78vh] min-h-[640px] lg:h-[1040px]"
        loading="lazy"
      />
    </section>
  );
}

function DiagramFrame({
  src,
  title,
  className,
  loading,
}: {
  src: string;
  title: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -inset-y-8 -z-10 rounded-[3rem] bg-[#fb923c]/10 blur-3xl"
      />
      <iframe
        src={src}
        title={title}
        loading={loading}
        className="h-full w-full rounded-3xl border border-[#fb923c]/40 bg-[#020617] shadow-glow"
      />
    </div>
  );
}
