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

/** Separate pages next to the home page. Each has its own slug per language. */
export const pageIds = ["founders", "approach", "portfolio", "about"] as const;
export type PageId = (typeof pageIds)[number];

export const pageSlugs: Record<Locale, Record<PageId, string>> = {
  nl: { founders: "voor-ondernemers", approach: "aanpak", portfolio: "portfolio", about: "over-ormac" },
  en: { founders: "founders", approach: "approach", portfolio: "portfolio", about: "about" },
};

export function pagePath(locale: Locale, page: PageId, hash?: string) {
  const path = `${localePath(locale)}${pageSlugs[locale][page]}/`;
  return hash ? `${path}#${hash.replace(/^#/, "")}` : path;
}

export function pageAlternates(locale: Locale, page: PageId) {
  const nl = `${siteUrl}${pagePath("nl", page)}`;
  const en = `${siteUrl}${pagePath("en", page)}`;
  return {
    canonical: locale === "en" ? en : nl,
    languages: { nl, en, "x-default": nl } as Record<string, string>,
  };
}

/** Where a navigation item lives: on its own page, or as a section of the home page. */
export function sectionHref(locale: Locale, id: SectionId) {
  switch (id) {
    case "founders": return pagePath(locale, "founders");
    case "approach": return pagePath(locale, "approach");
    case "network": return pagePath(locale, "approach", "network");
    case "portfolio": return pagePath(locale, "portfolio");
    case "about": return pagePath(locale, "about");
    case "contact": return localePath(locale, "contact");
    default: return localePath(locale, "home");
  }
}

/** The same page in the other language, for the language toggle. */
export function counterpartPath(pathname: string, next: Locale) {
  const clean = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const from: Locale = clean === "/en/" || clean.startsWith("/en/") ? "en" : "nl";
  if (clean.endsWith("/privacy/")) return `${localePath(next)}privacy/`;
  for (const page of pageIds) {
    if (clean === pagePath(from, page)) return pagePath(next, page);
  }
  return localePath(next);
}
