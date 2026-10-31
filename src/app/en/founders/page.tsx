import { FoundersPage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "founders");

export default function Page() {
  return (
    <SiteShell locale="en">
      <FoundersPage locale="en" />
    </SiteShell>
  );
}
