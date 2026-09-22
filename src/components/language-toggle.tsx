"use client";

import { localeCookie, localePath, type Locale } from "@/lib/i18n";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

function remember(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const t = copy[locale].language;

  function go(next: Locale) {
    remember(next);
    const hash = window.location.hash;
    window.location.assign(localePath(next) + hash);
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-current/20 p-0.5 text-[0.7rem] tracking-[0.16em]"
      role="group"
      aria-label={t.switchTo}
    >
      <button
        type="button"
        className={cn(
          "rounded-full px-2.5 py-1 uppercase transition-colors",
          locale === "nl"
            ? "bg-current/15 font-medium"
            : "opacity-60 hover:opacity-100"
        )}
        aria-current={locale === "nl" ? "true" : undefined}
        onClick={() => go("nl")}
      >
        {t.nl}
      </button>
      <button
        type="button"
        className={cn(
          "rounded-full px-2.5 py-1 uppercase transition-colors",
          locale === "en"
            ? "bg-current/15 font-medium"
            : "opacity-60 hover:opacity-100"
        )}
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
