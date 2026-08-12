"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/utils/cn";
import { GlassCard } from "@/components/ui/glass-card";
import { CoverImage } from "@/components/ui/cover-image";
import { Pills } from "@/components/ui/pills";
import { ExternalLinkList } from "@/components/ui/external-link-list";
import type { TimelineEntry } from "@/lib/content/schema";

/**
 * One "Where I have worked" entry as a disclosure: the collapsed card is a
 * compact header row (period, company, role, summary, thumbnail), and clicking
 * it expands the full story — screenshot, achievements, links, stack.
 *
 * The header is a real button with aria-expanded/aria-controls, so it works
 * from the keyboard and announces its state.
 */
export function ExperienceCard({ item }: { item: TimelineEntry }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `experience-panel-${item.id}`;

  return (
    <GlassCard round="xl" innerClassName="p-0">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((open) => !open)}
        className="group flex w-full items-center gap-4 p-6 text-left md:gap-6"
      >
        {/* The thumbnail only shows while collapsed — expanding replaces it
            with the full-size screenshot inside the panel. */}
        {item.image && !expanded && (
          <CoverImage
            src={item.image}
            alt=""
            sizes="128px"
            className="hidden aspect-[16/10] w-28 shrink-0 rounded-lg sm:block md:w-32"
          />
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-fluid-sm uppercase tracking-[0.2em] text-muted">
            {item.period}
          </span>
          <span className="mt-1 block text-fluid-xl font-semibold text-fg">{item.company}</span>
          <span className="block text-fluid-base text-accent">
            {item.role}
            {item.location && <span className="text-muted"> · {item.location}</span>}
          </span>
          <span className="mt-2 block max-w-measure text-pretty text-muted">{item.summary}</span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-muted transition-transform duration-300 group-hover:text-fg",
            expanded && "rotate-180",
          )}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 6l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-6 pb-6">
              {item.image && (
                <CoverImage
                  src={item.image}
                  alt={`Screenshot from work at ${item.company}`}
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="aspect-[16/10] rounded-xl md:w-1/2"
                />
              )}

              <ul className="mt-4 space-y-2">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                    />
                    <span className="text-pretty">{achievement}</span>
                  </li>
                ))}
              </ul>

              {item.links.length > 0 && <ExternalLinkList className="mt-4" links={item.links} />}

              <Pills
                className="mt-5"
                items={item.stack}
                label={`Technologies used at ${item.company}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
