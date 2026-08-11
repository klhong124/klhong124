import { describe, expect, it } from "vitest";
import {
  caseStudies,
  featuredCaseStudies,
  getCaseStudy,
  getPublishedCaseStudySlugs,
  portfolioContent,
  timeline,
} from "./portfolio-content";

/**
 * These guard the things that actually broke before: dead internal links, drafts
 * leaking into the sitemap, and a timeline that disagreed with itself about which
 * role was current.
 */
describe("portfolio content", () => {
  it("parses against the schema", () => {
    expect(portfolioContent.caseStudies.length).toBeGreaterThan(0);
    expect(portfolioContent.timeline.length).toBeGreaterThan(0);
  });

  it("has unique case study slugs", () => {
    const slugs = caseStudies.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has unique timeline ids", () => {
    const ids = timeline.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("orders the timeline newest first", () => {
    const years = timeline.map((entry) => entry.startYear);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("resolves every case study by slug", () => {
    for (const study of caseStudies) {
      expect(getCaseStudy(study.slug)?.title).toBe(study.title);
    }
    expect(getCaseStudy("oasis-infinite")).toBeUndefined();
  });

  it("keeps drafts out of the sitemap and the featured grid", () => {
    const drafts = caseStudies.filter((study) => study.status === "draft").map((s) => s.slug);
    const published = getPublishedCaseStudySlugs();
    const featured = featuredCaseStudies.map((study) => study.slug);

    for (const draft of drafts) {
      expect(published).not.toContain(draft);
      expect(featured).not.toContain(draft);
    }
  });

  it("only features published case studies", () => {
    for (const study of featuredCaseStudies) {
      expect(study.status).toBe("published");
    }
  });

  it("uses https for every external link", () => {
    const links = [
      ...portfolioContent.profile.links,
      ...timeline.flatMap((entry) => entry.links),
      ...caseStudies.flatMap((study) => study.links),
    ];

    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.href.startsWith("https://"), `${link.href} should use https`).toBe(true);
    }
  });

  it("keeps the current role first in the timeline", () => {
    expect(timeline[0].period).toMatch(/Present$/);
  });
});
