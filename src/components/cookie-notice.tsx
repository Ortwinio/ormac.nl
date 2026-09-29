"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { readConsent, saveConsent, subscribeConsent } from "@/lib/cookie-notice";
import type { Locale } from "@/lib/i18n";
import styles from "./privacy.module.css";

const text = {
  nl: {
    title: "Jouw privacy, jouw keuze",
    body: "Functionele cookies onthouden je taal en cookiekeuze. Met jouw toestemming gebruiken we Google Analytics om het websitegebruik en het aantal verstuurde plannen te meten. Zonder toestemming laden we Google Analytics niet. Je kunt je keuze altijd wijzigen via de footer.",
    privacy: "Lees onze privacyverklaring", accept: "Analytics toestaan", reject: "Alleen noodzakelijk", reopen: "Cookie-instellingen",
    settings: "Voorkeuren aanpassen", save: "Voorkeuren opslaan", close: "Sluiten",
    required: "Noodzakelijk · altijd actief", requiredNote: "Voor je taalvoorkeur en het onthouden van je cookiekeuze.",
    analytics: "Google Analytics", analyticsNote: "Helpt ons begrijpen welke pagina’s worden bezocht en hoe vaak een plan wordt verstuurd. Geen advertentietracking. Formulierinhoud en bijlagen worden niet meegestuurd.",
    error: "Je browser kon de cookiekeuze niet opslaan. Analytics blijft uitgeschakeld. Je kunt de website gewoon gebruiken.",
  },
  en: {
    title: "Your privacy, your choice",
    body: "Necessary cookies remember your language and cookie choice. With your permission, we use Google Analytics to measure website use and the number of submitted plans. Without permission, we do not load Google Analytics. You can change your choice in the footer at any time.",
    privacy: "Read our privacy statement", accept: "Allow analytics", reject: "Necessary only", reopen: "Cookie settings",
    settings: "Manage preferences", save: "Save preferences", close: "Close",
    required: "Necessary · always active", requiredNote: "For your language preference and remembering your cookie choice.",
    analytics: "Google Analytics", analyticsNote: "Helps us understand which pages are visited and how often a plan is submitted. No advertising tracking. Form contents and attachments are not included.",
    error: "Your browser could not save your cookie choice. Analytics remains disabled. You can still use the website.",
  },
};

export function CookieNotice({ locale }: { locale: Locale }) {
  const t = text[locale];
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "denied");
  const [reopened, setReopened] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [error, setError] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const visible = reopened || consent === "unset";

  useEffect(() => { if (reopened) heading.current?.focus(); }, [reopened]);

  function choose(allow: boolean) {
    if (!saveConsent(allow ? "granted" : "denied")) { setError(true); return; }
    setError(false);
    setReopened(false);
    setDetails(false);
    if (reopened) trigger.current?.focus();
  }

  return <>
    <button ref={trigger} type="button" className={styles.reopen} onClick={() => { setAnalytics(consent === "granted"); setDetails(true); setReopened(true); }} aria-expanded={visible} aria-controls={visible ? "cookie-notice" : undefined}>{t.reopen}</button>
    {visible && <section id="cookie-notice" className={styles.banner} aria-labelledby="cookie-notice-title" onKeyDown={event => {
      if (event.key === "Escape" && reopened && consent !== "unset") { setReopened(false); trigger.current?.focus(); }
    }}>
      <div className={styles.bannerIntro}>
        <div className={styles.bannerHeading}>
          <h2 ref={heading} tabIndex={-1} id="cookie-notice-title">{t.title}</h2>
          {reopened && consent !== "unset" && <button type="button" className={styles.reopen} onClick={() => { setReopened(false); trigger.current?.focus(); }}>{t.close}</button>}
        </div>
        <p>{t.body}</p>
        <Link href={locale === "nl" ? "/privacy/#cookies" : "/en/privacy/#cookies"} className={styles.privacyLink}>{t.privacy}</Link>
      </div>
      {details && <div id="cookie-preferences" className={styles.preferences}>
        <div><strong>{t.required}</strong><p>{t.requiredNote}</p></div>
        <label className={styles.analyticsChoice}><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /><span><strong>{t.analytics}</strong><span>{t.analyticsNote}</span></span></label>
      </div>}
      {error && <p role="alert">{t.error}</p>}
      <div className={styles.bannerActions}>
        <button type="button" onClick={() => choose(false)} className={styles.choice}>{t.reject}</button>
        <button type="button" onClick={() => choose(true)} className={styles.choice}>{t.accept}</button>
        {details ? <button type="button" onClick={() => choose(analytics)} className={styles.preferencesButton}>{t.save}</button> : <button type="button" className={styles.preferencesButton} aria-expanded={details} aria-controls="cookie-preferences" onClick={() => { setAnalytics(consent === "granted"); setDetails(true); }}>{t.settings}</button>}
      </div>
    </section>}
  </>;
}
