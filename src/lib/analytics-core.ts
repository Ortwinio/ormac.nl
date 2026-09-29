import type { Consent } from "./cookie-notice.ts";

export const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-54FCVYT04J";
export const analyticsCookieSeconds = 60 * 60 * 24 * 180;
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };

export function analyticsAllowed(id: string, origin: string) {
  return /^G-[A-Z0-9]+$/.test(id) && ["https://ormac.nl", "https://www.ormac.nl"].includes(origin);
}

export function safePage(pathname: string) {
  const path = pathname.split(/[?#]/)[0];
  // Only report public routes. Unknown URLs could contain visitor information.
  return ["/", "/en", "/en/", "/privacy", "/privacy/", "/en/privacy", "/en/privacy/"].includes(path) ? path : "/not-found";
}

type AnalyticsEnvironment = {
  id: string;
  origin: string;
  consent: () => Consent;
  command: (...args: unknown[]) => void;
  load: () => void;
  disable: (value: boolean) => void;
  clearCookies: () => void;
  clearQueue: () => void;
};

/** Consent and event policy, independent of React and the Google network. */
export function createAnalytics(env: AnalyticsEnvironment) {
  let active = false;
  let initialized = false;
  let lastPage = "";
  function sync() {
    const allowed = analyticsAllowed(env.id, env.origin) && env.consent() === "granted";
    if (!allowed) {
      env.disable(true);
      if (active) {
        env.clearQueue();
        env.command("consent", "update", denied);
      }
      env.clearCookies();
      active = false;
      initialized = false;
      lastPage = "";
      return false;
    }
    if (!active) {
      env.disable(false);
      if (!initialized) env.command("consent", "default", denied);
      env.command("consent", "update", { ...denied, analytics_storage: "granted" });
      env.command("js", new Date());
      env.command("config", env.id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_expires: analyticsCookieSeconds,
        cookie_update: false,
        cookie_domain: "none",
        cookie_flags: "SameSite=Lax;Secure",
        page_location: `${env.origin}/`,
        page_referrer: "",
      });
      active = true;
      initialized = true;
      env.load();
    }
    return true;
  }
  function pageView(pathname: string) {
    if (!sync()) return;
    const page = safePage(pathname);
    if (lastPage === page) return;
    lastPage = page;
    const data = { page_location: `${env.origin}${page}`, page_referrer: "", page_title: page.includes("privacy") ? "Ormac — Privacy" : "Ormac" };
    env.command("set", data);
    env.command("event", "page_view", { ...data, send_to: env.id });
  }
  function lead(locale: "nl" | "en") {
    if (!sync()) return;
    // No application fields, email addresses, filenames or reference IDs.
    env.command("event", "generate_lead", { language: locale, form_name: "investment_plan", send_to: env.id });
  }
  return { sync, pageView, lead };
}
