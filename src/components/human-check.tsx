"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Turnstile = {
  render: (element: HTMLElement, options: {
    sitekey: string; action: string; language: string; theme: string; size: string;
    callback: (token: string) => void;
    "expired-callback": () => void; "error-callback": () => void; "timeout-callback": () => void;
  }) => string;
  remove: (id: string) => void;
};

declare global { interface Window { turnstile?: Turnstile } }

export function HumanCheck({ siteKey, locale, onToken }: { siteKey: string; locale: Locale; onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!ready || !container.current || !window.turnstile) return;
    const api = window.turnstile;
    const id = api.render(container.current, {
      sitekey: siteKey, action: "contact", language: locale, theme: "auto", size: "flexible",
      callback: token => { setFailed(false); onToken(token); },
      "expired-callback": () => onToken(""),
      "error-callback": () => { onToken(""); setFailed(true); },
      "timeout-callback": () => { onToken(""); setFailed(true); },
    });
    return () => { api.remove(id); onToken(""); };
  }, [ready, siteKey, locale, onToken]);

  return <div>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setReady(true)} onError={() => { setFailed(true); onToken(""); }} />
    <div ref={container} />
    {failed && <p role="alert">{locale === "nl" ? "De menscontrole is niet beschikbaar. Probeer het opnieuw." : "The human check is unavailable. Please try again."}</p>}
  </div>;
}
