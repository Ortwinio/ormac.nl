import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
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

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Early-stage investing`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://ormac.nl"),
  openGraph: {
    title: `${site.name} — Early-stage investing`,
    description: site.description,
    url: "https://ormac.nl",
    siteName: site.name,
    images: [{ url: "/images/hero.jpg", width: 1280, height: 720 }],
    locale: "en_NL",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
