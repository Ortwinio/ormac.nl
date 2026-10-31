import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { hreflangUrls, pageAlternates, type Locale, type PageId } from "@/lib/i18n";

const ogImage = { url: "/images/og.jpg", width: 1200, height: 630, alt: "Ormac" };

function build(locale: Locale, title: string, description: string, urls: { canonical: string; languages: Record<string, string> }): Metadata {
  return {
    title,
    description,
    metadataBase: new URL("https://ormac.nl"),
    alternates: {
      canonical: urls.canonical,
      languages: urls.languages,
    },
    openGraph: {
      title,
      description,
      url: urls.canonical,
      siteName: "Ormac",
      locale: locale === "en" ? "en_GB" : "nl_NL",
      alternateLocale: locale === "en" ? ["nl_NL"] : ["en_GB"],
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export function localeMetadata(locale: Locale, path = ""): Metadata {
  const t = copy[locale];
  const urls = hreflangUrls(locale, path);
  if (path === "privacy") return build(locale, `${t.privacy.title} — Ormac`, t.privacy.lead, urls);
  return build(locale, t.meta.title, t.meta.description, urls);
}

export function pageMetadata(locale: Locale, page: PageId): Metadata {
  const p = copy[locale].pages[page];
  return build(locale, p.title, p.description, pageAlternates(locale, page));
}
