import { PortfolioPage } from "@/components/ormac-page";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "portfolio");

export default function Page() {
  return (
    <SiteShell locale="en">
      <PortfolioPage locale="en" />
    </SiteShell>
  );
}
