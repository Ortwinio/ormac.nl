import { ApproachPage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "approach");

export default function Page() {
  return (
    <SiteShell locale="en">
      <ApproachPage locale="en" />
    </SiteShell>
  );
}
