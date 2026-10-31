import { HomePage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { localeMetadata } from "@/lib/metadata";

export const metadata = localeMetadata("nl");

export default function DutchHomePage() {
  return (
    <SiteShell locale="nl">
      <HomePage locale="nl" />
    </SiteShell>
  );
}
