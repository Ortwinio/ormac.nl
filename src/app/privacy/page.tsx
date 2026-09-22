import { PrivacyPageContent } from "@/components/privacy-page";
import { localeMetadata } from "@/lib/metadata";

export const metadata = localeMetadata("nl", "privacy");

export default function PrivacyPage() {
  return <PrivacyPageContent locale="nl" />;
}
