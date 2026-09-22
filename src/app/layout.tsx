import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Newsreader } from "next/font/google";
import { hreflangUrls } from "@/lib/i18n";
import { localeMetadata } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = localeMetadata("nl");

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headerList = await headers();
  const path = headerList.get("x-ormac-path") ?? "/";
  const locale = path === "/en" || path.startsWith("/en/") ? "en" : "nl";
  const urls = hreflangUrls(locale, path.includes("privacy") ? "privacy" : "");

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" hrefLang="nl" href={urls.languages.nl} />
        <link rel="alternate" hrefLang="en" href={urls.languages.en} />
        <link rel="alternate" hrefLang="x-default" href={urls.languages["x-default"]} />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
