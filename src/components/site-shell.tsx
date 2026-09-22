import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n";
import styles from "./ormac.module.css";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <a className={styles.skip} href="#main">{locale === "nl" ? "Ga naar inhoud" : "Skip to content"}</a>
      <SiteHeader locale={locale} />
      <main id="main" className="relative isolate z-0 flex-1">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
