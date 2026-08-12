import { z } from "zod";

/**
 * Content is authored by hand in `data/portfolio-content.ts`, so these schemas
 * run at module load and throw on a bad shape. A typo fails the build rather
 * than rendering an empty section in production.
 */

const nonEmpty = z.string().trim().min(1);

export const linkSchema = z.object({
  label: nonEmpty,
  href: z.url(),
});

export type Link = z.infer<typeof linkSchema>;

export const timelineEntrySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id must be kebab-case"),
  /** Display string, e.g. "2025 — Present". Kept separate from `startYear` so copy stays editable. */
  period: nonEmpty,
  /** Sort key only; never rendered. */
  startYear: z.number().int().min(2000).max(2100),
  company: nonEmpty,
  role: nonEmpty,
  location: nonEmpty.optional(),
  summary: nonEmpty,
  achievements: z.array(nonEmpty).min(1),
  stack: z.array(nonEmpty).min(1),
  links: z.array(linkSchema).default([]),
  /** Optional screenshot shown in the experience timeline. */
  image: z.string().regex(/^\//, "image must be a site-relative path").optional(),
});

export type TimelineEntry = z.infer<typeof timelineEntrySchema>;

export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: nonEmpty,
  subtitle: nonEmpty,
  kind: z.enum(["client", "personal"]),
  period: nonEmpty,
  /** Drafts stay reachable by URL but are kept out of the grid and the sitemap. */
  status: z.enum(["published", "draft"]).default("published"),
  featured: z.boolean().default(false),
  /** Short pills shown on the card and at the top of the case study. */
  stack: z.array(nonEmpty).min(1),
  /**
   * Problem / approach / outcome exist so a reader gets the whole story from the
   * card and the top of the page, without expanding anything.
   */
  problem: nonEmpty,
  approach: nonEmpty,
  outcome: nonEmpty,
  architecture: z.array(nonEmpty).min(1),
  performance: z.array(nonEmpty).min(1),
  impact: z.array(nonEmpty).min(1),
  challenges: z.array(nonEmpty).min(1),
  links: z.array(linkSchema).default([]),
  /** Optional cover image for cards and the case study header. */
  coverImage: z.string().regex(/^\//, "coverImage must be a site-relative path").optional(),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;

export const principleSchema = z.object({
  title: nonEmpty,
  detail: nonEmpty,
});

export const profileSchema = z.object({
  name: nonEmpty,
  /** Plain-English role line. Shown above the fold, so it must stand alone. */
  role: nonEmpty,
  location: nonEmpty,
  currently: nonEmpty,
  /** Opening statement — the big scroll-reveal line in About Me, also the meta description. */
  intro: nonEmpty,
  /** Supporting paragraphs rendered under the intro in About Me. */
  introDetail: z.array(nonEmpty).default([]),
  email: z.email(),
  links: z.array(linkSchema).min(1),
});

export const portfolioContentSchema = z.object({
  profile: profileSchema,
  principles: z.array(principleSchema).min(1),
  timeline: z.array(timelineEntrySchema).min(1),
  caseStudies: z.array(caseStudySchema).min(1),
  stackGroups: z
    .array(
      z.object({
        label: nonEmpty,
        items: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
});

export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
