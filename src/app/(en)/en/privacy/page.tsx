import PrivacyPage from "@/components/privacy-page";
import { privacyPageMetadata } from "@/lib/metadata";

export const metadata = privacyPageMetadata("en");

export default function EnglishPrivacyPage() {
  return <PrivacyPage locale="en" />;
}
