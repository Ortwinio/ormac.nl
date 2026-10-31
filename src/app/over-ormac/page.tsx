import { AboutPage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("nl", "about");

export default function Page() {
  return (
    <SiteShell locale="nl">
      <AboutPage locale="nl" />
    </SiteShell>
  );
}
