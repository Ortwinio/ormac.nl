import { HomePage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { localeMetadata } from "@/lib/metadata";

export const metadata = localeMetadata("en");

export default function EnglishHomePage() {
  return (
    <SiteShell locale="en">
      <HomePage locale="en" />
    </SiteShell>
  );
}
