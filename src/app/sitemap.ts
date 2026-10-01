import type { MetadataRoute } from "next";

import { isPublicReady, publicSiteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicReady || !publicSiteUrl) return [];

  const ko = new URL("/", publicSiteUrl).toString();
  const ja = new URL("/ja", publicSiteUrl).toString();
  const languages = { ko, ja };
  const privacyKo = new URL("/privacy", publicSiteUrl).toString();
  const privacyJa = new URL("/ja/privacy", publicSiteUrl).toString();

  return [
    { url: ko, alternates: { languages } },
    { url: ja, alternates: { languages } },
    { url: privacyKo, alternates: { languages: { ko: privacyKo, ja: privacyJa } } },
    { url: privacyJa, alternates: { languages: { ko: privacyKo, ja: privacyJa } } },
  ];
}
