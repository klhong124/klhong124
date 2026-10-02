import type { MetadataRoute } from "next";
import { getPublishedCaseStudySlugs } from "@/data/portfolio-content";
import { showcaseItems } from "@/data/showcase";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, priority: 1, lastModified },
    ...getPublishedCaseStudySlugs().map((slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      priority: 0.6,
      lastModified,
    })),
    ...showcaseItems.map(({ slug }) => ({
      url: `${SITE_URL}/showcase/${slug}`,
      priority: 0.5,
      lastModified,
    })),
  ];
}
