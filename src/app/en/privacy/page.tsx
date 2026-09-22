import { PrivacyPageContent } from "@/components/privacy-page";
import { localeMetadata } from "@/lib/metadata";

export const metadata = localeMetadata("en", "privacy");

export default function EnglishPrivacyPage() {
  return <PrivacyPageContent locale="en" />;
}
