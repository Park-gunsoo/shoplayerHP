import LandingPage from "@/components/landing-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ko");

export default function KoreanHomePage() {
  return <LandingPage locale="ko" />;
}
