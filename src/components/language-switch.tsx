"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

import type { Locale } from "@/content/site-content";

export default function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const preserveSection = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    const hash = window.location.hash;
    if (!hash) return;
    event.preventDefault();
    window.location.assign(`${path}${hash}`);
  };

  return (
    <nav className="lang-switch" aria-label={label}>
      <Link href="/" lang="ko" aria-current={locale === "ko" ? "page" : undefined} onClick={(event) => preserveSection(event, "/")}>KO</Link>
      <Link href="/ja" lang="ja" aria-current={locale === "ja" ? "page" : undefined} onClick={(event) => preserveSection(event, "/ja")}>JP</Link>
    </nav>
  );
}
