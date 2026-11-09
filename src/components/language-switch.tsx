"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

import type { Locale } from "@/content/site-content";
import { locales, localePath } from "@/lib/locales";

export default function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const preserveSection = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    const hash = window.location.hash;
    if (!hash || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.assign(`${path}${hash}`);
  };

  return (
    <nav className="lang-switch" aria-label={label}>
      {locales.map((language) => <Link key={language} href={localePath[language]} lang={language} hrefLang={language} aria-current={locale === language ? "page" : undefined} aria-label={{ ko: "한국어", ja: "日本語", en: "English" }[language]} onClick={(event) => preserveSection(event, localePath[language])}>{{ ko: "KO", ja: "JP", en: "EN" }[language]}</Link>)}
    </nav>
  );
}
