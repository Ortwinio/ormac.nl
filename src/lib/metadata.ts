import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { hreflangUrls, type Locale } from "@/lib/i18n";

export function localeMetadata(locale: Locale, path = ""): Metadata {
  const t = copy[locale];
  const urls = hreflangUrls(locale, path);
  const isPrivacy = path === "privacy";
  return {
    title: isPrivacy ? `${t.privacy.title} — Ormac` : t.meta.title,
    description: isPrivacy ? t.privacy.lead : t.meta.description,
    metadataBase: new URL("https://ormac.nl"),
    alternates: {
      canonical: urls.canonical,
      languages: urls.languages,
    },
    openGraph: {
      title: isPrivacy ? t.privacy.title : t.meta.title,
      description: isPrivacy ? t.privacy.lead : t.meta.description,
      url: urls.canonical,
      siteName: "Ormac",
      locale: locale === "en" ? "en_GB" : "nl_NL",
      alternateLocale: locale === "en" ? ["nl_NL"] : ["en_GB"],
      type: "website",
      images: [{ url: "/images/hero.jpg", width: 1600, height: 1200 }],
    },
  };
}
