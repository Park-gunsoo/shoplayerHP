import type { Metadata } from "next";

import { siteContent, type Locale } from "@/content/site-content";
import { isPublicReady, publicSiteUrl } from "@/lib/site-config";
import { locales, localePath, privacyPath, openGraphLocale } from "@/lib/locales";

export const siteMetadataBase = publicSiteUrl
  ? new URL(publicSiteUrl)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000");

export function pageMetadata(locale: Locale): Metadata {
  const { title, description } = siteContent[locale].meta;
  const path = localePath[locale];
  const canonical = publicSiteUrl ? new URL(path, publicSiteUrl).toString() : undefined;
  const languages = publicSiteUrl
    ? {
        ko: new URL("/", publicSiteUrl).toString(),
        ja: new URL("/ja", publicSiteUrl).toString(),
        en: new URL("/en", publicSiteUrl).toString(),
      }
    : undefined;
  const image = publicSiteUrl
    ? new URL("/opengraph-image", publicSiteUrl).toString()
    : undefined;

  return {
    title,
    description,
    applicationName: "ShopLayer",
    metadataBase: siteMetadataBase,
    alternates: canonical ? { canonical, languages } : undefined,
    robots: {
      index: isPublicReady,
      follow: isPublicReady,
    },
    openGraph: {
      type: "website",
      siteName: "ShopLayer",
      locale: openGraphLocale[locale],
      alternateLocale: locales.filter((language) => language !== locale).map((language) => openGraphLocale[language]),
      title,
      description,
      url: canonical,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function privacyPageMetadata(locale: Locale): Metadata {
  const base = pageMetadata(locale);
  const siteUrl = publicSiteUrl;
  const title = locale === "en" ? "Privacy Policy | ShopLayer" : locale === "ko" ? "개인정보 처리방침 | ShopLayer" : "プライバシーポリシー | ShopLayer";
  const description = locale === "en" ? "How ShopLayer handles inquiry information, retention and your privacy rights." : locale === "ko" ? "ShopLayer 홈페이지의 개인정보 처리 목적, 항목, 보유 기간과 이용자의 권리를 안내합니다." : "ShopLayerサイトの個人情報の目的、項目、保存期間、利用者の権利をご案内します。";
  const canonical = publicSiteUrl ? new URL(privacyPath[locale], publicSiteUrl).toString() : undefined;
  return { ...base, title, description, alternates: canonical && siteUrl ? { canonical, languages: Object.fromEntries(locales.map((language) => [language, new URL(privacyPath[language], siteUrl).toString()])) } : undefined, openGraph: { ...base.openGraph, title, description, url: canonical }, twitter: { ...base.twitter, title, description } };
}
