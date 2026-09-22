export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";
export const localeCookie = "ormac-lang";
export const siteUrl = "https://ormac.nl";

export const sectionIds = [
  "home",
  "founders",
  "approach",
  "network",
  "portfolio",
  "about",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

export function localePath(locale: Locale, hash?: string) {
  const base = locale === "en" ? "/en/" : "/";
  if (!hash) return base;
  const id = hash.replace(/^#/, "");
  return `${base}#${id}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "nl" : "en";
}

export function isLocale(value: string | undefined): value is Locale {
  return value === "nl" || value === "en";
}

export function hreflangUrls(locale: Locale, path = "") {
  const suffix = path.replace(/^\/|\/$/g, "");
  const nl = suffix ? `${siteUrl}/${suffix}/` : `${siteUrl}/`;
  const en = suffix ? `${siteUrl}/en/${suffix}/` : `${siteUrl}/en/`;
  return {
    canonical: locale === "en" ? en : nl,
    languages: {
      nl,
      en,
      "x-default": nl,
    } as Record<string, string>,
  };
}
