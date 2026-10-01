"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { newsCases } from "@/content/news-cases";
import type { Locale } from "@/content/site-content";
import DemoMotionButton from "./demo-motion-button";
import { useVisualLoop } from "./use-visual-loop";

import styles from "./news-carousel.module.css";

const caseLogos: Record<string, { src: string; width: number; height: number }> = {
  "cj-onstyle": { src: "/logos/cases/cj-onstyle.svg", width: 202, height: 40 },
  osulloc: { src: "/logos/cases/osulloc.png", width: 200, height: 30 },
  honeys: { src: "/logos/cases/honeys.png", width: 126, height: 42 },
  sakazen: { src: "/logos/cases/sakazen.png", width: 150, height: 112 },
  michaels: { src: "/logos/cases/michaels.jpg", width: 190, height: 40 },
  "mars-wrigley": { src: "/logos/cases/mars.svg", width: 138, height: 40 },
};

function countMetric(value: string, progress: number) {
  return value.replace(/\d+(?:\.\d+)?/g, (number) => {
    const digits = number.includes(".") ? number.split(".")[1].length : 0;
    return (Number(number) * progress).toFixed(digits);
  });
}

export default function NewsCarousel({ locale }: { locale: Locale }) {
  const items = newsCases[locale];
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const loop = useVisualLoop(panelRef, 7000);
  const inView = loop.running;
  const [progress, setProgress] = useState(1);
  const trackRef = useRef<HTMLOListElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const ja = locale === "ja";

  useEffect(() => () => {
    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(frame);
    }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / 1300);
      setProgress(next);
      if (next < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, inView, loop.cycle]);

  const goTo = useCallback((index: number, instant = false) => {
    const track = trackRef.current;
    const item = track?.children.item(index) as HTMLElement | null;
    if (!track || !item) return;
    setActive(index);
    const behavior = instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior });
  }, []);

  useEffect(() => {
    if (!loop.running) return;
    const timer = window.setInterval(() => goTo((active + 1) % items.length, active === items.length - 1), 7000);
    return () => window.clearInterval(timer);
  }, [loop.running, active, items.length, goTo]);

  const syncActive = () => {
    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const slides = Array.from(track.children) as HTMLElement[];
      const nearest = slides.reduce(
        (best, slide, index) => {
          const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setActive(nearest.index);
    });
  };

  return (
    <div className={styles.carousel} ref={panelRef} role="region" aria-roledescription={ja ? "カルーセル" : "슬라이드"} aria-label={ja ? "韓国・日本・米国の報道事例6件" : "국내·일본·미국 보도 사례 6건"}>
      <div className={styles.toolbar}>
        <div className={styles.counter} aria-live="polite"><strong>{String(active + 1).padStart(2, "0")}</strong><span>/ {String(items.length).padStart(2, "0")}</span></div>
        <div className={styles.toolbarNote}>{ja ? "左右にスワイプして事例を見る" : "좌우로 넘겨 사례 보기"}</div>
        <div className={styles.arrows}>
          <DemoMotionButton locale={locale} paused={loop.paused} onToggle={loop.togglePause} />
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={ja ? "前の事例" : "이전 사례"}><ArrowLeft size={19} /></button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === items.length - 1} aria-label={ja ? "次の事例" : "다음 사례"}><ArrowRight size={19} /></button>
        </div>
      </div>

      <ol className={styles.track} ref={trackRef} onScroll={syncActive} onFocusCapture={loop.pause}>
        {items.map((item, index) => {
          const max = Math.max(item.graph.baseline, item.graph.result);
          const slideProgress = inView && index === active ? progress : 1;
          const baselinePercent = (item.graph.baseline / max) * 100 * slideProgress;
          const resultPercent = (item.graph.result / max) * 100 * slideProgress;
          const logo = caseLogos[item.id];
          return (
            <li className={styles.slide} key={item.id}>
              <article className={styles.card} aria-label={`${index + 1}. ${item.brand}`}>
                <div className={styles.story}>
                  <div className={styles.meta}><span className={styles.country}>{item.countryLabel}</span><span>{item.media} · {item.date}</span></div>
                  {logo ? <div className={styles.logo}><Image src={logo.src} alt={ja ? `${item.brand}のロゴ` : `${item.brand} 로고`} width={logo.width} height={logo.height} unoptimized /></div> : null}
                  <h3>{item.brand}</h3>
                  <p className={styles.summary}>{item.summary}</p>
                  <p className={styles.comparison}><strong>{ja ? "比較基準" : "비교 기준"}</strong>{item.comparison}</p>
                  <p className={styles.caveat}>{item.caveat}</p>
                  <a className={styles.source} href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{ja ? "元記事を見る" : "기사 원문 보기"}<ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>

                <div className={styles.evidence}>
                  <span className={styles.evidenceLabel}>{ja ? "記事で報じられた指標" : "기사에 보도된 지표"}</span>
                  <div className={styles.metric}><strong>{countMetric(item.metric.value, slideProgress)}</strong><span>{item.metric.label}</span></div>
                  <div className={styles.chart} role="img" aria-label={`${item.graph.axisLabel}: ${item.graph.baselineLabel}, ${item.graph.resultLabel}`}>
                    <div className={styles.chartRow}><span>{item.graph.baselineLabel}</span><div className={styles.trackBar}><i style={{ width: `${baselinePercent}%` }} /></div></div>
                    <div className={`${styles.chartRow} ${styles.chartRowResult}`}><span>{item.graph.resultLabel}</span><div className={styles.trackBar}><i style={{ width: `${resultPercent}%` }} /></div></div>
                  </div>
                  <p className={styles.axis}>{item.graph.axisLabel}</p>
                  <p className={styles.notOurMetric}>{ja ? "報道記事から抜粋 · 数値は各記事に基づく" : "언론 기사 발췌 · 수치는 각 기사 기준"}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className={styles.dots} role="group" aria-label={ja ? "事例を選択" : "사례 선택"}>
        {items.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={active === index ? styles.activeDot : ""}
            onClick={() => goTo(index)}
            aria-label={ja ? `${index + 1}番目の事例: ${item.brand}` : `${index + 1}번 사례: ${item.brand}`}
            aria-current={active === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
