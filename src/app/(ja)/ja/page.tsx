import LandingPage from "@/components/landing-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ja");

export default function JapaneseHomePage() {
  return <LandingPage locale="ja" />;
}
