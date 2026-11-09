import type { MetadataRoute } from "next";

import { isPublicReady, publicSiteUrl } from "@/lib/site-config";
import { locales, localePath, privacyPath } from "@/lib/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicReady || !publicSiteUrl) return [];
  const siteUrl = publicSiteUrl;

  return [localePath, privacyPath].flatMap((paths) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, new URL(paths[locale], siteUrl).toString()]));
    return locales.map((locale) => ({ url: languages[locale], alternates: { languages } }));
  });
}
