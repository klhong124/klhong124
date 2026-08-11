import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/mdx";

export const SITE_URL = "https://ryankwan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, priority: 1, lastModified },
    { url: `${SITE_URL}/work`, priority: 0.8, lastModified },
    ...getAllProjectSlugs().map((slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      priority: 0.6,
      lastModified,
    })),
  ];
}
