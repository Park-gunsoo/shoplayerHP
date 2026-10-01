import PrivacyPage from "@/components/privacy-page";
import { privacyPageMetadata } from "@/lib/metadata";

export const metadata = privacyPageMetadata("ko");
export default function Page() { return <PrivacyPage locale="ko" />; }
