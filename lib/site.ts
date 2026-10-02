/**
 * Lives here rather than in `app/sitemap.ts`: the root layout needs it, and
 * importing the sitemap route from the layout dragged everything the sitemap
 * imports (the showcase demos included) into every page's client bundle.
 */
export const SITE_URL = "https://ryankwan.dev";
