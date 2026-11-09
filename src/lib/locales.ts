import type { Locale } from "@/content/site-content";

export const locales: Locale[] = ["ko", "ja", "en"];
export const localePath: Record<Locale, string> = { ko: "/", ja: "/ja", en: "/en" };
export const privacyPath: Record<Locale, string> = { ko: "/privacy", ja: "/ja/privacy", en: "/en/privacy" };
export const openGraphLocale: Record<Locale, string> = { ko: "ko_KR", ja: "ja_JP", en: "en_US" };
