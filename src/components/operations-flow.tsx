"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowRight, BarChart3, Check, ClipboardCheck, FileChartColumn, Link2, Megaphone, PackageSearch, RefreshCw, ScanSearch, ShieldCheck, Sparkles, Store, Users, CalendarClock } from "lucide-react";
import type { Locale } from "@/content/site-content";
import DemoMotionButton from "./demo-motion-button";
import { useVisualLoop } from "./use-visual-loop";
import { DEMO_HOLD_MS, demoDuration } from "./demo-timing";
import styles from "./operations-flow.module.css";

const words = {
  ko: {
    title: "ShopLayer 운영 프로세스",
    start: "시작은 두 가지 연결에서", site: "쇼핑몰 사이트 등록", siteNote: "URL · 브랜드 기본 정보",
    feed: "상품 피드 링크 등록", feedNote: "상품 · 가격 · 이미지 데이터", connected: "ShopLayer 운영 시작",
    team: "AI와 ShopLayer 운영팀이 함께 관리합니다.", teamNote: "AI의 분석과 자동화에 사람의 판단을 더해 실제 운영으로 연결합니다.",
    teamJobs: ["검수", "승인", "예외 처리", "CS"],
    siteTrack: "사이트 관리", siteIntro: "사이트의 구조와 콘텐츠를 개선하고, 변화가 유지되는지 확인합니다.",
    productTrack: "상품·채널 운영", productIntro: "상품을 이해하고 채널에 맞게 준비해 캠페인과 모니터링으로 이어갑니다.",
    siteSteps: [
      { title: "사이트 진단", note: "구조·콘텐츠·브랜드 정보를 AI가 분석합니다.", badge: "AI 분석" },
      { title: "개선안·리포트", note: "운영팀이 근거를 검수하고 개선 우선순위를 정리합니다.", badge: "검수·승인" },
      { title: "정기 모니터링", note: "개선 적용 여부와 사이트 변화를 월 1회 점검합니다.", badge: "월 1회" },
    ],
    productSteps: [
      { title: "상품 진단", note: "상품 정보·이미지·카테고리·속성을 분석합니다.", badge: "AI 분석" },
      { title: "상품별 최적화", note: "상품명·설명·태그·이미지 정보를 검토해 확정합니다.", badge: "검수·승인" },
      { title: "채널별 피드 생성", note: "각 플랫폼의 형식에 맞춰 상품 피드를 생성·갱신합니다.", badge: "피드 운영" },
      { title: "캠페인 운영", note: "준비된 피드를 활용해 마케팅 캠페인과 성과를 관리합니다.", badge: "운영팀 관리" },
      { title: "상시 모니터링", note: "노출·클릭·전환과 피드 이슈를 일 1회 이상 점검합니다.", badge: "일 1회 이상" },
    ],
    loop: "모니터링에서 발견한 변화를 다음 분석과 개선에 반영합니다.",
    hint: "단계를 선택하면 해당 내용을 자세히 살펴볼 수 있습니다.",
    current: "현재 살펴보는 단계",
  },
  ja: {
    title: "ShopLayerの運用プロセス",
    start: "二つの接続からスタート", site: "ECサイトを登録", siteNote: "URL・ブランドの基本情報",
    feed: "商品フィードを登録", feedNote: "商品・価格・画像のデータ", connected: "ShopLayerの運用を開始",
    team: "AIとShopLayerの担当者が一緒に管理します。", teamNote: "AIによる分析と自動化に、人の判断を加えて日々の運用へつなげます。",
    teamJobs: ["確認", "承認", "例外対応", "CS"],
    siteTrack: "サイト管理", siteIntro: "構造とコンテンツを改善し、その後の変化を確認します。",
    productTrack: "商品・チャネル運用", productIntro: "商品情報を整え、キャンペーンと継続的な確認につなげます。",
    siteSteps: [
      { title: "サイト診断", note: "構造・コンテンツ・ブランド情報をAIが分析します。", badge: "AI分析" },
      { title: "改善案・レポート", note: "担当者が根拠を確認し、改善の優先順位を整理します。", badge: "確認・承認" },
      { title: "定期モニタリング", note: "改善の反映とサイトの変化を月1回確認します。", badge: "月1回" },
    ],
    productSteps: [
      { title: "商品診断", note: "商品情報・画像・カテゴリー・属性を分析します。", badge: "AI分析" },
      { title: "商品別の最適化", note: "商品名・説明・タグ・画像情報を確認して確定します。", badge: "確認・承認" },
      { title: "チャネル別フィード", note: "各プラットフォームの形式に作成・更新します。", badge: "フィード運用" },
      { title: "キャンペーン運用", note: "準備したフィードを活用し、広告と成果を管理します。", badge: "担当者が管理" },
      { title: "継続モニタリング", note: "表示・クリック・転換とフィードの問題を1日1回以上確認します。", badge: "1日1回以上" },
    ],
    loop: "モニタリングで見つけた変化を、次の分析と改善に反映します。",
    hint: "ステップを選ぶと、その内容を確認できます。",
    current: "確認しているステップ",
  },
} as const;

const siteIcons = [ScanSearch, FileChartColumn, CalendarClock];
const productIcons = [PackageSearch, Sparkles, Link2, Megaphone, BarChart3];
const processInterval = (cycle: number) => cycle % 8 === 7 ? DEMO_HOLD_MS : demoDuration(2600);

export default function OperationsFlow({ locale }: { locale: Locale }) {
  const t = words[locale];
  const panelRef = useRef<HTMLDivElement>(null);
  const loop = useVisualLoop(panelRef, processInterval);
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected ?? loop.cycle % 8;
  const currentStep = current < 3 ? t.siteSteps[current] : t.productSteps[current - 3];
  const humanStep = [1, 4, 6].includes(current);
  const selectStep = (index: number) => { setSelected(index); loop.pause(); };
  const toggle = () => { if (loop.paused) setSelected(null); loop.togglePause(); };

  return (
    <div className={styles.board} ref={panelRef} data-running={loop.running} data-step={current} data-cycle={loop.cycle} data-testid="operations-flow">
      <div className={styles.toolbar}><span><RefreshCw size={17} aria-hidden="true" /><strong>{t.title}</strong></span><DemoMotionButton locale={locale} paused={loop.paused} onToggle={toggle} /></div>
      <div className={styles.onboarding}>
        <div className={styles.startLabel}><span>01 / CONNECT</span><h3>{t.start}</h3></div>
        <div className={styles.inputs}>
          <div><Store size={19} aria-hidden="true" /><span><strong>{t.site}</strong><small>{t.siteNote}</small></span></div>
          <span className={styles.plus} aria-hidden="true">+</span>
          <div><Link2 size={19} aria-hidden="true" /><span><strong>{t.feed}</strong><small>{t.feedNote}</small></span></div>
          <ArrowRight className={styles.connectArrow} size={20} aria-hidden="true" />
          <span className={styles.ready}><Check size={16} aria-hidden="true" />{t.connected}</span>
        </div>
      </div>

      <div className={styles.team} data-active={humanStep}>
        <span className={styles.teamIcon}><Users size={25} aria-hidden="true" /></span>
        <div className={styles.teamCopy}><h3>{t.team}</h3><p>{t.teamNote}</p></div>
        <div className={styles.teamJobs}>{t.teamJobs.map((job, index) => <span key={job}>{index === 0 ? <ClipboardCheck size={13} aria-hidden="true" /> : index === 1 ? <ShieldCheck size={13} aria-hidden="true" /> : <Check size={13} aria-hidden="true" />}{job}</span>)}</div>
      </div>
      <div className={styles.branch} aria-hidden="true"><span /><ArrowDown size={17} /><span /></div>

      <div className={styles.tracks}>
        <section className={styles.siteTrack} aria-labelledby="site-track-title">
          <div className={styles.trackHead}><span>SITE TRACK</span><h3 id="site-track-title">{t.siteTrack}</h3><p>{t.siteIntro}</p></div>
          <ol className={styles.steps}>{t.siteSteps.map((step, index) => {
            const Icon = siteIcons[index];
            return <li key={step.title} data-active={current === index}><button type="button" onClick={() => selectStep(index)} aria-pressed={current === index}><span className={styles.node}><Icon size={20} aria-hidden="true" /></span><span className={styles.stepCopy}><span className={styles.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong><small>{step.badge}</small></span><span className={styles.stepNote}>{step.note}</span></span></button></li>;
          })}</ol>
        </section>
        <section className={styles.productTrack} aria-labelledby="product-track-title">
          <div className={styles.trackHead}><span>PRODUCT / CHANNEL TRACK</span><h3 id="product-track-title">{t.productTrack}</h3><p>{t.productIntro}</p></div>
          <ol className={styles.steps}>{t.productSteps.map((step, index) => {
            const Icon = productIcons[index];
            return <li key={step.title} data-active={current === index + 3}><button type="button" onClick={() => selectStep(index + 3)} aria-pressed={current === index + 3}><span className={styles.node}><Icon size={20} aria-hidden="true" /></span><span className={styles.stepCopy}><span className={styles.stepTitle}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong><small>{step.badge}</small></span><span className={styles.stepNote}>{step.note}</span></span></button></li>;
          })}</ol>
        </section>
      </div>
      <div className={styles.status}><span><Sparkles size={14} aria-hidden="true" />{t.current}<strong>{currentStep.title}</strong></span><small>{t.hint}</small></div>
      <div className={styles.returnLoop}><RefreshCw size={20} aria-hidden="true" /><p>{t.loop}</p><span aria-hidden="true"><i style={{ width: ((current + 1) / 8 * 100) + "%" }} /></span></div>
    </div>
  );
}
