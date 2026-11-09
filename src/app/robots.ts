import type { MetadataRoute } from "next";

import { isPublicReady, publicSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!isPublicReady || !publicSiteUrl) {
    // The unlisted policy must remain readable by review crawlers; its page
    // metadata disables search indexing without blocking access to the text.
    return { rules: { userAgent: "*", disallow: "/", allow: "/returns" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", publicSiteUrl).toString(),
  };
}
