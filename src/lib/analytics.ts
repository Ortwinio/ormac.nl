import { analyticsId, createAnalytics } from "./analytics-core";
import { readConsent } from "./cookie-notice";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean;
  }
}

let analytics: ReturnType<typeof createAnalytics> | undefined;

function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map(part => part.trim().split("=")[0]).filter(name => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name.startsWith("_gat"));
  const hostname = window.location.hostname;
  const domains = ["", hostname, `.${hostname}`, "ormac.nl", ".ormac.nl"];
  for (const name of names) for (const domain of domains) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domain ? `; Domain=${domain}` : ""}; Secure`;
  }
}

export function getAnalytics() {
  if (typeof window === "undefined") return;
  if (!analytics) analytics = createAnalytics({
    id: analyticsId,
    origin: window.location.origin,
    consent: readConsent,
    command: (...args) => {
      window.dataLayer ??= [];
      // Google’s documented queue format uses an Arguments object for each command.
      // eslint-disable-next-line prefer-rest-params
      window.gtag ??= function () { window.dataLayer!.push(arguments); };
      window.gtag(...args);
    },
    disable: value => { window[`ga-disable-${analyticsId}`] = value; },
    clearCookies: clearAnalyticsCookies,
    clearQueue: () => { if (window.dataLayer) window.dataLayer.length = 0; },
    load: () => {
      if (document.getElementById("ormac-google-analytics")) return;
      const script = document.createElement("script");
      script.id = "ormac-google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      script.referrerPolicy = "no-referrer";
      script.onerror = () => script.remove();
      document.head.appendChild(script);
    },
  });
  return analytics;
}

export function trackPlanSent(locale: "nl" | "en") {
  // Analytics must never interfere with successful form delivery.
  try { getAnalytics()?.lead(locale); } catch { /* Analytics is optional. */ }
}
