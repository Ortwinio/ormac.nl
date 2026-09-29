export const cookieNotice = {
  name: "ormac-cookie-consent",
  version: "1",
  maxAge: 60 * 60 * 24 * 180,
  event: "ormac:cookie-consent",
} as const;

export type Consent = "granted" | "denied" | "unset";

export function parseConsent(cookies: string, now = Date.now()): { choice: Consent; expires: number } {
  const value = cookies.split(";").map(part => part.trim()).find(part => part.startsWith(`${cookieNotice.name}=`))?.split("=")[1];
  const [version, choice, timestamp] = value?.split(":") ?? [];
  const saved = Number(timestamp);
  const expires = saved + cookieNotice.maxAge * 1000;
  if (version !== cookieNotice.version || (choice !== "granted" && choice !== "denied") || !Number.isFinite(saved) || saved <= 0 || saved > now || expires <= now) return { choice: "unset", expires: 0 };
  return { choice, expires };
}

export function readConsent(): Consent {
  return typeof document === "undefined" ? "unset" : parseConsent(document.cookie).choice;
}

export function subscribeConsent(callback: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  function changed() {
    clearTimeout(timer);
    callback();
    const { expires } = parseConsent(document.cookie);
    // Recheck at expiry, even if the visitor leaves a tab open for a long time.
    if (expires) timer = setTimeout(changed, Math.min(expires - Date.now() + 1, 2_147_483_647));
  }
  window.addEventListener(cookieNotice.event, changed);
  window.addEventListener("storage", changed);
  window.addEventListener("focus", changed);
  window.addEventListener("pageshow", changed);
  document.addEventListener("visibilitychange", changed);
  changed();
  return () => {
    clearTimeout(timer);
    window.removeEventListener(cookieNotice.event, changed);
    window.removeEventListener("storage", changed);
    window.removeEventListener("focus", changed);
    window.removeEventListener("pageshow", changed);
    document.removeEventListener("visibilitychange", changed);
  };
}

export function saveConsent(choice: Exclude<Consent, "unset">) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${cookieNotice.name}=${cookieNotice.version}:${choice}:${Date.now()}; Path=/; Max-Age=${cookieNotice.maxAge}; SameSite=Lax${secure}`;
  document.cookie = `ormac-cookie-notice=; Path=/; Max-Age=0${secure}`;
  // Synchronous listeners stop Analytics before returning to the page.
  window.dispatchEvent(new Event(cookieNotice.event));
  try { localStorage.setItem(cookieNotice.event, String(Date.now())); } catch { /* Cookies still work when localStorage is unavailable. */ }
  return readConsent() === choice;
}
