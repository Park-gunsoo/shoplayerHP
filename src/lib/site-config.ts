function parseSiteUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function parseContactEmail(value: string | undefined): string | null {
  const email = value?.trim() ?? "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

const configuredSiteUrl = parseSiteUrl(process.env.SITE_URL);
const configuredContactEmail = parseContactEmail(process.env.CONTACT_EMAIL);

// A preview must not advertise an unfinished contact path or indexable URLs.
export const isPublicReady = Boolean(configuredSiteUrl && configuredContactEmail);
export const publicSiteUrl = isPublicReady ? configuredSiteUrl : null;
// Public application address confirmed by the owner. Keep the existing search
// indexing gate independent of this fallback until publication is configured.
export const publicContactEmail = configuredContactEmail ?? "gundoll2.sj@gmail.com";
export const applicationRecipients = [...new Set([publicContactEmail, "sjcho77331911@gmail.com"])];
