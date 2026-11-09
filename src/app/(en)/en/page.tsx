import LandingPage from "@/components/landing-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en");

export default function EnglishHomePage() {
  return <LandingPage locale="en" />;
}
