import { NextRequest, NextResponse } from "next/server";
import { localeCookie } from "@/lib/i18n";

const BOT =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|twitterbot|whatsapp|slack|preview/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ormac-path", pathname);

  const isBot = BOT.test(request.headers.get("user-agent") ?? "");
  const choice = request.cookies.get(localeCookie)?.value;

  // Remember an explicit language choice on the Dutch root only.
  // Never inspect Accept-Language or geo. Crawlers always see `/` as Dutch.
  if (!isBot && pathname === "/" && choice === "en") {
    const url = request.nextUrl.clone();
    url.pathname = "/en/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
