import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteMetadataBase } from "@/lib/metadata";

import "../globals.css";

export const metadata: Metadata = { metadataBase: siteMetadataBase };

export default function KoreanRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
