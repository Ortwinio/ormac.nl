import { FoundersPage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("nl", "founders");

export default function Page() {
  return (
    <SiteShell locale="nl">
      <FoundersPage locale="nl" />
    </SiteShell>
  );
}
