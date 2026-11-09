import Image from "next/image";

/** Official vector outlines, with colors adapted to the website palette. */
export default function ShopLayerLogo({
  inverse = false,
  decorative = false,
  eager = false,
}: {
  inverse?: boolean;
  decorative?: boolean;
  eager?: boolean;
}) {
  return (
    <Image
      className="shoplayer-logo"
      src={inverse ? "/logos/shoplayer/logo-white.svg" : "/logos/shoplayer/logo.svg"}
      alt={decorative ? "" : "ShopLayer"}
      width={2445}
      height={480}
      loading={eager ? "eager" : "lazy"}
      unoptimized
    />
  );
}
