import { ApproachPage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("nl", "approach");

export default function Page() {
  return (
    <SiteShell locale="nl">
      <ApproachPage locale="nl" />
    </SiteShell>
  );
}
