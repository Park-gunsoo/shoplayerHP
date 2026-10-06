import Image from "next/image";
import { BrandLogo } from "./brand-logo";

export type SectionConcept = "market" | "feed" | "process";

const images: Record<SectionConcept, string> = {
  market: "/images/market-discovery-concept.png",
  feed: "/images/multichannel-creative-concept.png",
  process: "/images/human-ai-operation-concept.png",
};

export default function SectionConceptArt({ concept }: { concept: SectionConcept }) {
  return (
    <div className={"section-concept-art section-concept-art--" + concept} aria-hidden="true">
      <Image src={images[concept]} alt="" fill sizes="(max-width: 900px) 1px, (max-width: 1100px) 280px, 360px" />
      {concept === "market" ? <>
        <span className="concept-platform concept-platform--google"><BrandLogo brand="google" variant="symbol" size={43} decorative /></span>
        <span className="concept-platform concept-platform--naver"><BrandLogo brand="naver" variant="symbol" size={43} decorative /></span>
      </> : null}
    </div>
  );
}
