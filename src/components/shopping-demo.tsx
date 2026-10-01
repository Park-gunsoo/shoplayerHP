"use client";

import Image from "next/image";
import { ArrowUp, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import styles from "./shopping-demo.module.css";
import { demoCycle, demoDuration } from "./demo-timing";

type Locale = "ko" | "ja";

const LOOP_MS = demoCycle(4300);
const INITIAL_FRAME_MS = demoDuration(4300) + 100;

const demo = {
  ko: {
    windowTitle: "AI 쇼핑 대화",
    badge: "쇼핑 AI 시연",
    greeting: "어떤 상품을 찾고 계신가요?",
    query: "여름 출근길에 편한 베이지 팬츠, 5만 원 이하로 보여줘.",
    thinking: "조건을 읽고 상품 정보를 살펴보고 있어요",
    answer: "조건에 맞는 상품을 정리했어요.",
    hint: "베이지 · 여름 · 5만 원 이하",
    placeholder: "쇼핑 조건을 이야기해 보세요",
    previewLabel: "추천 상품",
    disclaimer: "ShopLayer 쇼핑 AI 화면 시연",
    pause: "애니메이션 일시 정지",
    play: "애니메이션 재생",
    replay: "처음부터 다시 보기",
    products: [
      { name: "크림 와이드 팬츠", price: "₩47,900", detail: "크림 베이지 · 와이드핏", image: "/images/demo-trousers-cream.png" },
      { name: "샌드 스트레이트 팬츠", price: "₩49,500", detail: "샌드 베이지 · 스트레이트핏", image: "/images/demo-trousers-sand.png" },
      { name: "오트밀 밴딩 팬츠", price: "₩39,800", detail: "오트밀 · 밴딩", image: "/images/demo-trousers-oatmeal.png" },
    ],
  },
  ja: {
    windowTitle: "AIショッピングの会話",
    badge: "ショッピングAIデモ",
    greeting: "どんな商品をお探しですか？",
    query: "夏の通勤に楽なベージュのパンツを、5万ウォン以下で見せて。",
    thinking: "条件を読み、商品情報を確認しています",
    answer: "条件に合う商品をまとめました。",
    hint: "ベージュ · 夏 · 5万ウォン以下",
    placeholder: "探している条件を入力してください",
    previewLabel: "おすすめ商品",
    disclaimer: "ShopLayerショッピングAIの画面デモ",
    pause: "アニメーションを一時停止",
    play: "アニメーションを再生",
    replay: "最初から再生",
    products: [
      { name: "クリーム ワイドパンツ", price: "₩47,900", detail: "クリームベージュ · ワイド", image: "/images/demo-trousers-cream.png" },
      { name: "サンド ストレートパンツ", price: "₩49,500", detail: "サンドベージュ · ストレート", image: "/images/demo-trousers-sand.png" },
      { name: "オートミール イージーパンツ", price: "₩39,800", detail: "オートミール · ウエストゴム", image: "/images/demo-trousers-oatmeal.png" },
    ],
  },
} as const;

export default function ShoppingDemo({ locale }: { locale: Locale }) {
  const copy = demo[locale];
  const [elapsed, setElapsed] = useState(INITIAL_FRAME_MS);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const elapsedRef = useRef(INITIAL_FRAME_MS);
  const panelRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      if (media.matches) {
        elapsedRef.current = INITIAL_FRAME_MS;
        setElapsed(INITIAL_FRAME_MS);
      }
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!panelRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      elapsedRef.current = (elapsedRef.current + now - previous) % LOOP_MS;
      previous = now;
      setElapsed(elapsedRef.current);
    }, 80);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, inView]);

  const typing = !reducedMotion && elapsed < demoDuration(2100);
  const thinking = !reducedMotion && elapsed >= demoDuration(2100) && elapsed < demoDuration(3000);
  const hasQuestion = reducedMotion || elapsed >= demoDuration(2100);
  const hasAnswer = reducedMotion || elapsed >= demoDuration(3000);
  const visibleCards = reducedMotion ? 3 : elapsed >= demoDuration(4300) ? 3 : elapsed >= demoDuration(3800) ? 2 : elapsed >= demoDuration(3300) ? 1 : 0;
  const typedLength = typing ? Math.min(copy.query.length, Math.ceil((elapsed / demoDuration(1950)) * copy.query.length)) : 0;
  const atStart = elapsed < demoDuration(500);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({ top: atStart ? 0 : viewport.scrollHeight, behavior: reducedMotion ? "instant" : "smooth" });
  }, [hasQuestion, hasAnswer, visibleCards, reducedMotion, atStart]);

  const replay = () => {
    elapsedRef.current = 0;
    setElapsed(0);
    setPaused(false);
  };

  return (
    <div className={styles.demo} ref={panelRef}>
      <div className={styles.windowBar}>
        <div className={styles.windowIdentity}>
          <span className={styles.symbol} aria-hidden="true"><Sparkles size={17} strokeWidth={2.2} /></span>
          <strong>{copy.windowTitle}</strong>
        </div>
        <span className={styles.demoBadge}>{copy.badge}</span>
      </div>

      <div
        className={styles.viewport}
        ref={viewportRef}
        role="img"
        aria-label={`${copy.disclaimer} ${copy.query} ${copy.products.map((product) => `${product.name} ${product.price}`).join(", ")}`}
      >
        <div className={styles.greeting} aria-hidden="true">
          <span className={styles.greetingIcon}><Sparkles size={20} /></span>
          <span>{copy.greeting}</span>
        </div>

        {!hasAnswer ? (
          <div className={styles.previewShelf} aria-hidden="true">
            <span>{copy.previewLabel}</span>
            <div>
              {copy.products.map((product) => (
                <Image key={product.image} src={product.image} alt="" width={118} height={118} sizes="(max-width: 620px) 25vw, 118px" quality={75} />
              ))}
            </div>
          </div>
        ) : null}

        {hasQuestion ? <div className={styles.userMessage}>{copy.query}</div> : null}

        {thinking || hasAnswer ? (
          <div className={styles.assistantRow}>
            <span className={styles.assistantIcon}><Sparkles size={15} /></span>
            <div className={styles.assistantContent}>
              {thinking ? (
                <div className={styles.thinking}>
                  <span>{copy.thinking}</span><span className={styles.dots}><i /><i /><i /></span>
                </div>
              ) : (
                <>
                  <p className={styles.answer}>{copy.answer}</p>
                  <p className={styles.intent}>{copy.hint}</p>
                  <div className={styles.resultList}>
                    {copy.products.slice(0, visibleCards).map((product) => (
                      <article className={styles.productCard} key={product.image}>
                        <div className={styles.productImage}>
                          <Image src={product.image} alt="" width={310} height={310} sizes="(max-width: 620px) 44vw, 155px" quality={75} />
                        </div>
                        <div className={styles.productInfo}>
                          <strong>{product.name}</strong>
                          <span className={styles.detail}>{product.detail}</span>
                          <b>{product.price}</b>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.composer} aria-hidden="true">
        <span className={typing ? styles.typed : styles.placeholder}>{typing ? copy.query.slice(0, typedLength) : copy.placeholder}</span>
        <span className={styles.sendIcon}><ArrowUp size={16} strokeWidth={2.5} /></span>
      </div>
      <div className={styles.demoFooter}>
        {!reducedMotion ? (
          <div className={styles.controls}>
            <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? copy.play : copy.pause} title={paused ? copy.play : copy.pause}>
              {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
            </button>
            <button type="button" onClick={replay} aria-label={copy.replay} title={copy.replay}>
              <RotateCcw size={14} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
