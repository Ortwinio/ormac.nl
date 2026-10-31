import type { MetadataRoute } from "next";
import { hreflangUrls, pageAlternates, pageIds } from "@/lib/i18n";

/** Date of the last content change; update it when the copy changes. */
const lastModified = new Date("2026-10-31");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const pairs = [
    hreflangUrls("nl"),
    ...pageIds.map(page => pageAlternates("nl", page)),
    hreflangUrls("nl", "privacy"),
  ];
  for (const urls of pairs) {
    const languages = { nl: urls.languages.nl, en: urls.languages.en };
    entries.push({ url: languages.nl, lastModified, alternates: { languages } });
    entries.push({ url: languages.en, lastModified, alternates: { languages } });
  }
  return entries;
}
