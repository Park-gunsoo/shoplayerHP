"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  Database,
  Fingerprint,
  Image as ImageIcon,
  Layers3,
  MousePointer2,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

import type { Locale } from "@/content/site-content";
import { BrandLogo, type BrandId } from "./brand-logo";
import DemoMotionButton from "./demo-motion-button";
import { useVisualLoop } from "./use-visual-loop";
import { demoCycle, demoDuration } from "./demo-timing";
import styles from "./capability-demo.module.css";

type CapabilityId = "store" | "product" | "image" | "feed" | "report" | "operations";

function useCountUp(active: boolean, target: number, duration = 1050) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setValue(target));
      return () => window.cancelAnimationFrame(frame);
    }

    let frame = 0;
    let startedAt = 0;
    const tick = (time: number) => {
      if (!startedAt) startedAt = time;
      const progress = Math.min(1, (time - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function WindowHeader({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className={`${styles.windowHeader} ${dark ? styles.windowHeaderDark : ""}`}>
      <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
      <span>{title}</span>
      <span className={styles.windowHeaderMark} aria-hidden="true"><Layers3 size={14} strokeWidth={2.2} /></span>
    </div>
  );
}

function StoreDemo({ ja }: { ja: boolean }) {
  const checks = ja
    ? [
        { name: "robots.txt", detail: "クロール経路", width: "86%" },
        { name: "Schema", detail: "構造化データ", width: "72%" },
        { name: "Meta", detail: "検索用情報", width: "92%" },
        { name: "Brand", detail: "運用方針との比較", width: "80%" },
      ]
    : [
        { name: "robots.txt", detail: "수집 경로", width: "86%" },
        { name: "Schema", detail: "구조화 데이터", width: "72%" },
        { name: "Meta", detail: "검색 정보", width: "92%" },
        { name: "Brand", detail: "브랜드 정의 비교", width: "80%" },
      ];

  return (
    <div className={styles.storeScene}>
      <WindowHeader title={ja ? "ECサイトの診断" : "쇼핑몰 AI 진단"} />
      <div className={styles.storeContent}>
        <div className={styles.storeUrl}><Store size={15} aria-hidden="true" /><span>{ja ? "ECサイトURL · ブランド情報" : "쇼핑몰 URL · 브랜드 정보"}</span><ArrowRight size={15} aria-hidden="true" /></div>
        <div className={styles.storeDashboard}>
          <div className={styles.storeGauge}>
            <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <circle className={styles.gaugeTrack} cx="50" cy="50" r="39" />
              <circle className={styles.gaugeFill} cx="50" cy="50" r="39" />
            </svg>
            <div className={styles.gaugeCopy}><strong>04<span>/05</span></strong><small>{ja ? "診断ステップ" : "진단 단계"}</small></div>
          </div>
          <div className={styles.storeChecks}>
            {checks.map((check, index) => (
              <div className={styles.storeCheck} key={check.name} style={{ "--item-delay": `${demoDuration(index * 110)}ms` } as CSSProperties}>
                <div className={styles.checkTop}><span>{check.name}</span><small>{check.detail}</small><Check size={13} aria-hidden="true" /></div>
                <div className={styles.checkTrack}><span style={{ "--bar-width": check.width } as CSSProperties} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.storeFooter}><Fingerprint size={14} aria-hidden="true" />{ja ? "観察した情報とブランドの意図を照合" : "공개 정보와 브랜드 의도를 비교"}<span>{ja ? "改善案へ" : "개선안 도출"}<ArrowRight size={13} aria-hidden="true" /></span></div>
      </div>
    </div>
  );
}

function ProductDemo({ ja }: { ja: boolean }) {
  const fields = ja
    ? [
        ["カテゴリ", "ワイドパンツ"],
        ["カラー", "クリームベージュ"],
        ["形状", "ゆとりのあるシルエット"],
      ]
    : [
        ["카테고리", "와이드 팬츠"],
        ["색상", "크림 베이지"],
        ["형태", "여유로운 실루엣"],
      ];

  return (
    <div className={styles.productScene}>
      <WindowHeader title={ja ? "商品の情報を整理" : "상품 정보 추출"} />
      <div className={styles.productPhoto}>
        <Image src="/images/demo-trousers-cream.png" alt={ja ? "クリーム色のワイドパンツ" : "크림색 와이드 팬츠"} fill sizes="(max-width: 900px) 65vw, 320px" />
        <span className={styles.scanLine} aria-hidden="true"><ScanLine size={18} /></span>
        <span className={styles.scanFrame} aria-hidden="true" />
      </div>
      <div className={styles.productPanel}>
        <div className={styles.panelEyebrow}><Sparkles size={15} aria-hidden="true" />ShopLayer AI</div>
        <h4>{ja ? "商品を理解するための情報" : "상품을 설명하는 핵심 정보"}</h4>
        <div className={styles.extractedFields}>
          {fields.map(([name, value], index) => (
            <div className={styles.extractedField} key={name} style={{ "--item-delay": `${demoDuration(250 + index * 170)}ms` } as CSSProperties}>
              <span>{name}</span><strong>{value}</strong><Check size={13} aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className={styles.productPanelFoot}><ShieldCheck size={14} aria-hidden="true" />{ja ? "根拠を確認して確定" : "근거 확인 후 최종 확정"}</div>
      </div>
    </div>
  );
}

function ImageDemo({ ja }: { ja: boolean }) {
  const regions = [
    { src: "/images/demo-trousers-cream.png", position: "center 8%", number: "01" },
    { src: "/images/fabric-detail.png", position: "center 38%", number: "02" },
    { src: "/images/demo-trousers-sand.png", position: "center 92%", number: "03" },
  ];
  return (
    <div className={styles.imageScene}>
      <WindowHeader title={ja ? "画像情報の分析" : "상세 이미지 분석"} />
      <div className={styles.imageContent}>
        <div className={styles.longImage}>
          {regions.map((region) => (
            <div className={styles.imageRegion} key={region.number}>
              <Image src={region.src} alt="" fill sizes="(max-width: 900px) 38vw, 210px" style={{ objectPosition: region.position }} />
              <span>{region.number}</span>
            </div>
          ))}
          <span className={styles.imageSweep} aria-hidden="true" />
        </div>
        <div className={styles.imageFindings}>
          <span className={styles.findingKicker}><ImageIcon size={14} aria-hidden="true" />{ja ? "選択画像から読み取る" : "선택 이미지에서 파악"}</span>
          <div className={styles.findingChip} style={{ "--item-delay": demoDuration(150) + "ms" } as CSSProperties}><span>{ja ? "色" : "색상"}</span><strong>{ja ? "クリームベージュ" : "크림 베이지"}</strong></div>
          <div className={styles.findingChip} style={{ "--item-delay": demoDuration(340) + "ms" } as CSSProperties}><span>{ja ? "特徴" : "특징"}</span><strong>{ja ? "ウエストのディテール" : "허리 디테일"}</strong></div>
          <div className={styles.altResult} style={{ "--item-delay": demoDuration(530) + "ms" } as CSSProperties}>
            <span>ALT</span>
            <p>{ja ? "クリーム色のワイドパンツとウエストの生地ディテール" : "크림색 와이드 팬츠와 허리 원단 디테일"}</p>
          </div>
          <div className={styles.imageConfirm}><Check size={13} aria-hidden="true" />{ja ? "担当者が確認・確定" : "운영자가 확인·확정"}</div>
        </div>
      </div>
    </div>
  );
}

const feedChannels: Array<{ brand: BrandId; name: string }> = [
  { brand: "gpt", name: "GPT Ads" },
  { brand: "naver", name: "NAVER" },
  { brand: "google", name: "Google" },
  { brand: "meta", name: "Meta" },
  { brand: "tiktok", name: "TikTok" },
  { brand: "kakao", name: "Kakao" },
];

function FeedDemo({ ja }: { ja: boolean }) {
  return (
    <div className={styles.feedScene}>
      <WindowHeader title={ja ? "統合商品フィード" : "통합 상품 피드"} />
      <div className={styles.feedFlow}>
        <div className={styles.feedOrigin}>
          <span className={styles.feedTinyLabel}>{ja ? "一つの入力" : "하나의 입력"}</span>
          <Database size={23} aria-hidden="true" />
          <strong>{ja ? "商品フィード" : "상품 피드 링크"}</strong>
          <small>URL</small>
        </div>
        <div className={styles.flowConnector} aria-hidden="true"><span /><ArrowRight size={16} /></div>
        <div className={styles.feedCore}>
          <div className={styles.feedCorePhoto}><Image src="/images/demo-trousers-oatmeal.png" alt="" fill sizes="72px" /></div>
          <span className={styles.feedTinyLabel}>ShopLayer</span>
          <strong>{ja ? "共通商品データ" : "공통 상품 데이터"}</strong>
          <small>{ja ? "情報を確認・整理" : "정보 수집·검토·최적화"}</small>
        </div>
        <div className={styles.flowConnector} aria-hidden="true"><span /><ArrowRight size={16} /></div>
        <div className={styles.feedTargets}>
          {feedChannels.map((channel, index) => (
            <div className={styles.feedTarget} key={channel.brand} style={{ "--item-delay": `${demoDuration(200 + index * 85)}ms` } as CSSProperties}>
              <BrandLogo brand={channel.brand} variant="symbol" decorative size={17} />
              <span>{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.feedFooter}><Clock3 size={14} aria-hidden="true" />{ja ? "チャネル別生成 · 予定更新 · 実行履歴" : "채널별 생성 · 예약 갱신 · 실행 이력"}</div>
    </div>
  );
}

function ReportDemo({ ja, active }: { ja: boolean; active: boolean }) {
  const impressions = useCountUp(active, 18420);
  const clicks = useCountUp(active, 1840);
  const impressionsSeries = [32, 46, 39, 58, 67, 75, 89];
  const clicksSeries = [18, 27, 22, 36, 42, 52, 66];

  return (
    <div className={styles.reportScene}>
      <WindowHeader title={ja ? "レポート・分析" : "리포트 및 분석"} />
      <div className={styles.reportContent}>
        <div className={styles.reportMetrics}>
          <div className={styles.reportMetric}><span>{ja ? "表示" : "노출"}</span><strong aria-hidden="true">{impressions.toLocaleString()}</strong><span className={styles.srOnly}>{ja ? "画面例 18,420" : "시연 수치 18,420"}</span><small><span className={styles.legendBlue} />{ja ? "検索の到達" : "검색 도달"}</small></div>
          <div className={styles.reportMetric}><span>{ja ? "クリック" : "클릭"}</span><strong aria-hidden="true">{clicks.toLocaleString()}</strong><span className={styles.srOnly}>{ja ? "画面例 1,840" : "시연 수치 1,840"}</span><small><span className={styles.legendOrange} />{ja ? "商品への移動" : "상품 이동"}</small></div>
        </div>
        <div className={styles.reportChart} role="img" aria-label={ja ? "7期間の表示とクリックの推移を示す画面例" : "7개 기간의 노출과 클릭 추이를 보여주는 기능 시연 그래프"}>
          <div className={styles.chartGrid} aria-hidden="true"><i /><i /><i /></div>
          {impressionsSeries.map((height, index) => (
            <div className={styles.chartGroup} key={index} style={{ "--item-delay": `${demoDuration(index * 85)}ms` } as CSSProperties}>
              <div className={styles.chartBars}>
                <span className={styles.chartBarBlue} style={{ "--bar-height": `${height}%` } as CSSProperties} />
                <span className={styles.chartBarOrange} style={{ "--bar-height": `${clicksSeries[index]}%` } as CSSProperties} />
              </div>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </div>
          ))}
        </div>
        <div className={styles.reportTimeline}><span><Check size={13} aria-hidden="true" />{ja ? "診断" : "진단"}</span><span><Check size={13} aria-hidden="true" />{ja ? "データ更新" : "데이터 갱신"}</span><span><MousePointer2 size={13} aria-hidden="true" />{ja ? "成果を確認" : "변화 확인"}</span></div>
      </div>
    </div>
  );
}

function OperationsDemo({ ja }: { ja: boolean }) {
  const cards = ja
    ? [
        { code: "01", title: "導入準備", detail: "ECサイト・商品データ", icon: Store, kind: "blue" },
        { code: "02", title: "人が承認", detail: "AI案を確認・確定", icon: ShieldCheck, kind: "orange" },
        { code: "03", title: "予定運用", detail: "収集・フィード更新", icon: Clock3, kind: "blue" },
        { code: "04", title: "障害対応", detail: "再試行・正常版を維持", icon: CircleAlert, kind: "mint" },
      ]
    : [
        { code: "01", title: "도입 준비", detail: "쇼핑몰·상품 데이터", icon: Store, kind: "blue" },
        { code: "02", title: "사람이 승인", detail: "AI 제안 검토·확정", icon: ShieldCheck, kind: "orange" },
        { code: "03", title: "예약 운영", detail: "수집·피드 갱신", icon: Clock3, kind: "blue" },
        { code: "04", title: "오류 대응", detail: "재시도·정상본 유지", icon: CircleAlert, kind: "mint" },
      ];

  return (
    <div className={styles.opsScene}>
      <WindowHeader title={ja ? "ShopLayer 運用ワークスペース" : "ShopLayer 운영 워크스페이스"} dark />
      <div className={styles.opsContent}>
        <div className={styles.opsHeading}><span className={styles.opsPulse} />{ja ? "一つの流れで管理" : "하나의 운영 흐름으로 관리"}<span>{ja ? "運用フロー" : "운영 플로우"}</span></div>
        <div className={styles.opsBoard}>
          {cards.map((card, index) => {
            const Icon = card.icon;
            const kindClass = card.kind === "orange" ? styles.opsCardOrange : card.kind === "mint" ? styles.opsCardMint : "";
            return (
              <div className={`${styles.opsCard} ${kindClass}`} key={card.code} style={{ "--item-delay": `${demoDuration(index * 145)}ms` } as CSSProperties}>
                <div className={styles.opsCardTop}><span>{card.code}</span><Icon size={17} aria-hidden="true" /></div>
                <strong>{card.title}</strong><small>{card.detail}</small>
              </div>
            );
          })}
        </div>
        <div className={styles.opsTimeline} aria-hidden="true"><span /><i /><span /><i /><span /><i /><span /></div>
        <div className={styles.opsFoot}><Check size={14} aria-hidden="true" />{ja ? "履歴と担当者の判断をひとつの画面で" : "작업 이력과 사람의 결정을 함께 추적"}</div>
      </div>
    </div>
  );
}

export default function CapabilityDemo({ id, locale }: { id: string; locale: Locale }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const loop = useVisualLoop(panelRef, demoCycle(id === "store" ? 1450 : id === "product" ? 1600 : 1750));
  const active = loop.inView || loop.reducedMotion;
  const ja = locale === "ja";

  if (!["store", "product", "image", "feed", "report", "operations"].includes(id)) return null;

  return (
    <div ref={panelRef} className={["feature-visual", styles.visual, styles[id as CapabilityId]].join(" ")} data-active={active ? "true" : "false"} data-paused={!loop.running} data-cycle={loop.cycle} data-testid={"capability-" + id}>
      <div className={styles.sceneContainer} key={loop.cycle}>
        {id === "store" && <StoreDemo ja={ja} />}
        {id === "product" && <ProductDemo ja={ja} />}
        {id === "image" && <ImageDemo ja={ja} />}
        {id === "feed" && <FeedDemo ja={ja} />}
        {id === "report" && <ReportDemo ja={ja} active={active} />}
        {id === "operations" && <OperationsDemo ja={ja} />}
      </div>
      <DemoMotionButton locale={locale} paused={loop.paused} onToggle={loop.togglePause} className="feature-demo-motion" />
    </div>
  );
}
