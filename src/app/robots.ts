import type { MetadataRoute } from "next";

import { isPublicReady, publicSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!isPublicReady || !publicSiteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", publicSiteUrl).toString(),
  };
}
