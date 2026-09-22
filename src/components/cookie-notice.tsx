"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cookieNotice } from "@/lib/cookie-notice";
import type { Locale } from "@/lib/i18n";
import styles from "./privacy.module.css";

const text = {
  nl: {
    title: "Alleen functionele cookies",
    body: "We gebruiken cookies om je taalvoorkeur te onthouden en deze melding niet steeds te tonen. We gebruiken geen analytische cookies of advertentietrackers.",
    privacy: "Lees onze privacyverklaring", acknowledge: "Begrepen", reopen: "Cookie-informatie",
  },
  en: {
    title: "Only functional cookies",
    body: "We use cookies to remember your language and avoid showing this notice repeatedly. We do not use analytics cookies or advertising trackers.",
    privacy: "Read our privacy statement", acknowledge: "Got it", reopen: "Cookie information",
  },
};

function isAcknowledged() {
  return document.cookie.split(";").some(part => part.trim() === `${cookieNotice.name}=${cookieNotice.version}`);
}

function subscribe(callback: () => void) {
  window.addEventListener(cookieNotice.event, callback);
  window.addEventListener("focus", callback);
  window.addEventListener("pageshow", callback);
  return () => {
    window.removeEventListener(cookieNotice.event, callback);
    window.removeEventListener("focus", callback);
    window.removeEventListener("pageshow", callback);
  };
}

export function CookieNotice({ locale }: { locale: Locale }) {
  const t = text[locale];
  // Hide on the server; read the real browser cookie immediately after hydration.
  const acknowledged = useSyncExternalStore(subscribe, isAcknowledged, () => true);
  const [reopened, setReopened] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const visible = reopened || (!acknowledged && !dismissed);

  useEffect(() => {
    if (reopened) heading.current?.focus();
  }, [reopened]);

  function dismiss() {
    document.cookie = `${cookieNotice.name}=${cookieNotice.version}; Path=/; Max-Age=${cookieNotice.maxAge}; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    setDismissed(true);
    setReopened(false);
    window.dispatchEvent(new Event(cookieNotice.event));
    if (reopened) trigger.current?.focus();
  }

  return (
    <>
      <button ref={trigger} type="button" className={styles.reopen} onClick={() => setReopened(true)} aria-expanded={visible} aria-controls={visible ? "cookie-notice" : undefined}>
        {t.reopen}
      </button>
      {visible && (
        <section id="cookie-notice" className={styles.banner} aria-labelledby="cookie-notice-title">
          <div>
            <h2 ref={heading} tabIndex={-1} id="cookie-notice-title">{t.title}</h2>
            <p>{t.body}</p>
            <Link href={locale === "nl" ? "/privacy/#cookies" : "/en/privacy/#cookies"} className={styles.privacyLink}>{t.privacy}</Link>
          </div>
          <button type="button" onClick={dismiss} className={styles.acknowledge}>{t.acknowledge}</button>
        </section>
      )}
    </>
  );
}
