"use client";

import { Pause, Play } from "lucide-react";
import type { Locale } from "@/content/site-content";

export default function DemoMotionButton({ locale, paused, onToggle, className = "" }: { locale: Locale; paused: boolean; onToggle: () => void; className?: string }) {
  const label = locale === "ko" ? (paused ? "시연 계속 재생" : "시연 일시 정지") : (paused ? "デモを再生" : "デモを一時停止");
  return <button type="button" className={["demo-motion-button", className].join(" ")} onClick={onToggle} aria-label={label} aria-pressed={paused} title={label}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>;
}
