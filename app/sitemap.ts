import type { MetadataRoute } from "next";
import { getPublishedCaseStudySlugs } from "@/data/portfolio-content";

export const SITE_URL = "https://ryankwan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, priority: 1, lastModified },
    ...getPublishedCaseStudySlugs().map((slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      priority: 0.6,
      lastModified,
    })),
  ];
}
