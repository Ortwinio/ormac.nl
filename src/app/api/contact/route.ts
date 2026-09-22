import { contactConfig, handleContact } from "@/lib/contact-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Allow the 10-second human check and 20-second email call, plus request parsing.
export const maxDuration = 60;

export function GET() {
  const config = contactConfig();
  return Response.json({ ready: !!config, siteKey: config?.siteKey ?? null }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  return handleContact(request, contactConfig());
}
