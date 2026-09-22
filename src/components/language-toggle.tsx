"use client";

import { localeCookie, localePath, type Locale } from "@/lib/i18n";
import { copy } from "@/lib/copy";
import styles from "./ormac.module.css";

function remember(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const t = copy[locale].language;

  function go(next: Locale) {
    remember(next);
    const hash = window.location.hash;
    const privacy = window.location.pathname.replace(/\/$/, "").endsWith("/privacy");
    window.location.assign(localePath(next) + (privacy ? "privacy/" : "") + hash);
  }

  return (
    <div
      className={styles.language}
      role="group"
      aria-label={t.switchTo}
    >
      <button
        type="button"
        aria-pressed={locale === "nl"}
        aria-current={locale === "nl" ? "true" : undefined}
        onClick={() => go("nl")}
      >
        {t.nl}
      </button>
      <button
        type="button"
        aria-pressed={locale === "en"}
        aria-current={locale === "en" ? "true" : undefined}
        onClick={() => go("en")}
      >
        {t.en}
      </button>
    </div>
  );
}

export function rememberLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  remember(locale);
}
