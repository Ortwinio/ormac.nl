import { AboutPage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "about");

export default function Page() {
  return (
    <SiteShell locale="en">
      <AboutPage locale="en" />
    </SiteShell>
  );
}
