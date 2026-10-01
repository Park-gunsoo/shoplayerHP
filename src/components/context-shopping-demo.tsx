"use client";

import Image from "next/image";
import {
  ArrowLeft, ArrowRight, Check, FileText, Image as ImageIcon,
  RotateCcw, Sparkles, Star, Store, Tag, UserRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import type { Locale } from "@/content/site-content";
import DemoMotionButton from "./demo-motion-button";
import { useVisualLoop } from "./use-visual-loop";
import { DEMO_HOLD_MS, demoDuration } from "./demo-timing";
import styles from "./context-shopping-demo.module.css";

const products = [
  { id: "cream", name: { ko: "크림 와이드 팬츠", ja: "クリーム ワイドパンツ" }, image: "/images/demo-trousers-cream.png", price: "₩47,900", rating: "4.9" },
  { id: "sand", name: { ko: "샌드 스트레이트 팬츠", ja: "サンド ストレートパンツ" }, image: "/images/demo-trousers-sand.png", price: "₩49,500", rating: "4.8" },
  { id: "oatmeal", name: { ko: "오트밀 밴딩 팬츠", ja: "オートミール イージーパンツ" }, image: "/images/demo-trousers-oatmeal.png", price: "₩39,800", rating: "4.7" },
] as const;

const copy = {
  ko: {
    badge: "AI 추천 시연", replay: "정보 수집부터 다시 보기",
    sources: [
      ["상품 설명", "핏·색상·특징"], ["가격 정보", "가격·판매 상태"],
      ["상품 이미지", "형태·디테일"], ["리뷰 정보", "평점·구매 경험"],
    ],
    stages: ["수집", "비교", "추천"],
    messages: ["흩어진 상품 정보를 모으고 있어요.", "사용자 조건과 상품 정보를 비교하고 있어요.", "사용자의 상황에 맞는 상품을 골랐어요."],
    context: "나의 쇼핑 상황", result: "조건에 맞는 상품", matched: "추천 상품",
    previous: "이전 상품", next: "다음 상품", select: "상품 보기",
    carousel: "맞춤 추천 상품 시연. 가격과 별점은 화면 시연값입니다.",
    scenarios: [
      { name: "출근", criteria: ["여름 출근", "5만 원 이하", "단정한 핏"], order: [1, 0, 2], reasons: ["여유로운 출근 스타일", "단정한 스트레이트핏", "편안한 밴딩 스타일"] },
      { name: "주말", criteria: ["주말 산책", "편안한 스타일", "여유로운 핏"], order: [2, 0, 1], reasons: ["여유로운 실루엣", "가볍게 맞추는 데일리 룩", "편안한 주말 스타일"] },
      { name: "여행", criteria: ["여행", "편안한 이동", "밴딩 선호"], order: [2, 1, 0], reasons: ["여유롭게 입는 여행 룩", "여러 코디에 맞추기 쉬운 핏", "이동할 때 편안한 밴딩"] },
    ],
  },
  ja: {
    badge: "AIおすすめデモ", replay: "情報の収集からもう一度見る",
    sources: [
      ["商品説明", "形・色・特徴"], ["価格情報", "価格・販売状況"],
      ["商品画像", "形状・詳細"], ["レビュー", "評価・購入体験"],
    ],
    stages: ["収集", "比較", "おすすめ"],
    messages: ["散らばった商品情報を集めています。", "利用者の条件と商品情報を比較しています。", "買い物の状況に合う商品を選びました。"],
    context: "買い物のシーン", result: "条件に合う商品", matched: "おすすめ商品",
    previous: "前の商品", next: "次の商品", select: "商品を見る",
    carousel: "おすすめ商品のデモ。価格と評価は画面デモの値です。",
    scenarios: [
      { name: "通勤", criteria: ["夏の通勤", "5万ウォン以下", "すっきりした形"], order: [1, 0, 2], reasons: ["ゆとりのある通勤スタイル", "すっきりしたストレート", "楽なウエストゴム"] },
      { name: "週末", criteria: ["週末の散歩", "楽なスタイル", "ゆとりのある形"], order: [2, 0, 1], reasons: ["ゆとりのあるシルエット", "合わせやすいデイリールック", "楽な週末スタイル"] },
      { name: "旅行", criteria: ["旅行", "楽な移動", "ウエストゴム"], order: [2, 1, 0], reasons: ["ゆったりした旅行スタイル", "着回しやすいシルエット", "移動に楽なウエストゴム"] },
    ],
  },
} as const;

const sourceIcons = [FileText, Tag, ImageIcon, Star];

export default function ContextShoppingDemo({ locale, label, description }: { locale: Locale; label: string; description: string }) {
  const t = copy[locale];
  const [phase, setPhase] = useState(2);
  const [scenario, setScenario] = useState(0);
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const loop = useVisualLoop(panelRef, null);
  const trackRef = useRef<HTMLOListElement>(null);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const scrollFrame = useRef<number | null>(null);
  const chosen = t.scenarios[scenario];
  const recommended = useMemo(() => chosen.order.map((index) => ({ ...products[index], reason: chosen.reasons[index] })), [chosen]);

  const runSequence = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActive(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
    if (loop.paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(2);
      return;
    }
    setPhase(0);
    timers.current = [
      setTimeout(() => setPhase(1), demoDuration(900)),
      setTimeout(() => setPhase(2), demoDuration(2100)),
    ];
  }, [loop.paused]);

  useEffect(() => {
    if (loop.reducedMotion) {
      const frame = requestAnimationFrame(() => setPhase(2));
      return () => cancelAnimationFrame(frame);
    }
    if (!loop.running) {
      timers.current.forEach(clearTimeout);
      return;
    }
    const frame = requestAnimationFrame(runSequence);
    return () => {
      cancelAnimationFrame(frame);
      timers.current.forEach(clearTimeout);
    };
  }, [loop.running, loop.reducedMotion, loop.cycle, runSequence]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const next = Math.max(0, Math.min(products.length - 1, index));
    const card = track?.children.item(next) as HTMLElement | null;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !card || !first) return;
    setActive(next);
    track.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, []);

  useEffect(() => {
    if (!loop.running || phase !== 2) return;
    const timer = window.setTimeout(() => active === products.length - 1 ? loop.restart() : goTo(active + 1), DEMO_HOLD_MS + demoDuration(active === 0 ? 450 : 600));
    return () => window.clearTimeout(timer);
  }, [loop.running, loop.restart, phase, active, goTo]);

  const syncActive = () => {
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      if (!track || !first) return;
      const slides = Array.from(track.children) as HTMLElement[];
      const nearest = slides.reduce((best, card, index) => {
        const distance = Math.abs(card.offsetLeft - first.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity });
      setActive(nearest.index);
      scrollFrame.current = null;
    });
  };

  const chooseScenario = (index: number) => {
    setScenario(index);
    setActive(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
    loop.restart();
    runSequence();
  };

  const handleKey = (event: KeyboardEvent<HTMLOListElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(active + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <div className={styles.panel} ref={panelRef} data-phase={phase} data-scenario={scenario} data-paused={!loop.running} data-cycle={loop.cycle} data-testid="context-shopping-demo">
      <div className={styles.heading}>
        <div className={styles.headingCopy}><span className={styles.label}><Sparkles size={18} aria-hidden="true" />{label}</span><span className={styles.demoBadge}>{t.badge}</span></div>
        <DemoMotionButton locale={locale} paused={loop.paused} onToggle={loop.togglePause} />
        <button className={styles.replay} type="button" onClick={() => { loop.restart(); runSequence(); }} aria-label={t.replay} title={t.replay}><RotateCcw size={17} aria-hidden="true" /></button>
      </div>
      <p className={styles.description}>{description}</p>

      <div className={styles.gathering} aria-label={locale === "ko" ? "상품 설명·가격·이미지·리뷰를 모아 분석하는 ShopLayer AI" : "商品説明・価格・画像・レビューを集めて分析するShopLayer AI"}>
        <svg className={styles.streams} viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M150 40 C210 40 235 90 300 90" /><path d="M450 40 C390 40 365 90 300 90" />
          <path d="M150 140 C210 140 235 90 300 90" /><path d="M450 140 C390 140 365 90 300 90" />
          <circle className={styles.packetOne} cx="170" cy="40" r="4" /><circle className={styles.packetTwo} cx="430" cy="40" r="4" />
          <circle className={styles.packetThree} cx="170" cy="140" r="4" /><circle className={styles.packetFour} cx="430" cy="140" r="4" />
        </svg>
        {t.sources.map(([name, detail], index) => {
          const Icon = sourceIcons[index];
          return <div key={name} className={[styles.source, styles["source" + index]].join(" ")} style={{ "--delay": demoDuration(index * 100) + "ms" } as CSSProperties}><Icon size={16} aria-hidden="true" /><div><span>{name}</span><strong>{detail}</strong></div>{phase === 2 && <Check className={styles.sourceCheck} size={12} aria-hidden="true" />}</div>;
        })}
        <div className={styles.hub}><span className={styles.hubIcon}>{phase === 2 ? <Check size={23} aria-hidden="true" /> : <Sparkles size={23} aria-hidden="true" />}</span><strong>ShopLayer AI</strong><small>{t.stages[phase]}</small></div>
      </div>
      <p className={styles.status} role="status"><span aria-hidden="true" />{t.messages[phase]}</p>

      <div className={styles.context}>
        <div className={styles.contextTop}><span><UserRound size={15} aria-hidden="true" />{t.context}</span><div className={styles.scenarios} role="group" aria-label={t.context}>{t.scenarios.map((item, index) => <button type="button" key={item.name} aria-pressed={scenario === index} onClick={() => chooseScenario(index)}>{item.name}</button>)}</div></div>
        <div className={styles.criteria}>{chosen.criteria.map((criterion) => <span key={criterion}><Check size={11} aria-hidden="true" />{criterion}</span>)}</div>
      </div>

      <div className={styles.results} role="region" aria-roledescription={locale === "ko" ? "캐러셀" : "カルーセル"} aria-label={t.carousel} aria-busy={phase !== 2}>
        <div className={styles.resultsHead}><strong><Sparkles size={15} aria-hidden="true" />{t.result}</strong><div className={styles.arrows}><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={t.previous}><ArrowLeft size={17} aria-hidden="true" /></button><button type="button" onClick={() => goTo(active + 1)} disabled={active === products.length - 1} aria-label={t.next}><ArrowRight size={17} aria-hidden="true" /></button></div></div>
        <ol className={styles.track} ref={trackRef} onScroll={syncActive} onFocusCapture={loop.pause} onKeyDown={handleKey} tabIndex={0} aria-label={t.matched}>
          {recommended.map((product, index) => (
            <li className={styles.slide} key={product.id}>
              <article className={styles.product}>
                <div className={styles.productImage}><Image src={product.image} alt={product.name[locale]} fill sizes="(max-width: 680px) 60vw, (max-width: 900px) 35vw, 240px" /><span className={styles.rank}>{String(index + 1).padStart(2, "0")}</span></div>
                <div className={styles.productBody}><span className={styles.mall}><Store size={12} aria-hidden="true" />ShopLayer</span><h3>{product.name[locale]}</h3><div className={styles.priceRow}><strong>{product.price}</strong><span className={styles.rating} aria-label={(locale === "ko" ? "5점 만점에 " : "5点満点中 ") + product.rating}><Star size={13} fill="currentColor" aria-hidden="true" />{product.rating}</span></div><p className={styles.reason}><Check size={12} aria-hidden="true" />{product.reason}</p></div>
              </article>
            </li>
          ))}
        </ol>
        <div className={styles.carouselFoot}><div className={styles.dots} role="group" aria-label={t.select}>{recommended.map((product, index) => <button type="button" key={product.id} aria-label={(index + 1) + ". " + product.name[locale]} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)}><span /></button>)}</div><span className={styles.counter} aria-live="polite">{String(active + 1).padStart(2, "0")} / 03</span></div>
      </div>
    </div>
  );
}
