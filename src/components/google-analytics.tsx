"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAnalytics } from "@/lib/analytics";
import { subscribeConsent } from "@/lib/cookie-notice";

export function GoogleAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const sync = () => getAnalytics()?.pageView(window.location.pathname);
    return subscribeConsent(sync);
  }, []);
  useEffect(() => { getAnalytics()?.pageView(pathname); }, [pathname]);
  return null;
}
