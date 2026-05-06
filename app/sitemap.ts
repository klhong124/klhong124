import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ryankwan.vercel.app";
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/work/builtbypixel` },
    { url: `${base}/work/oasis-infinite` },
    { url: `${base}/work/three-d-experiments` },
    { url: `${base}/work/ai-workflows` },
  ];
}
