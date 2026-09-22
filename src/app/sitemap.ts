import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ormac.nl/",
      lastModified: new Date(),
      alternates: { languages: { nl: "https://ormac.nl/", en: "https://ormac.nl/en/" } },
    },
    {
      url: "https://ormac.nl/en/",
      lastModified: new Date(),
      alternates: { languages: { nl: "https://ormac.nl/", en: "https://ormac.nl/en/" } },
    },
    {
      url: "https://ormac.nl/privacy/",
      lastModified: new Date(),
      alternates: {
        languages: { nl: "https://ormac.nl/privacy/", en: "https://ormac.nl/en/privacy/" },
      },
    },
    {
      url: "https://ormac.nl/en/privacy/",
      lastModified: new Date(),
      alternates: {
        languages: { nl: "https://ormac.nl/privacy/", en: "https://ormac.nl/en/privacy/" },
      },
    },
  ];
}
