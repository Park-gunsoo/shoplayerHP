"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, Check, ClipboardCheck, Database, FileCheck2, Headphones, Link2, RefreshCw, ScanSearch, Settings2, ShieldCheck, Sparkles, Store, Users } from "lucide-react";
import type { Locale } from "@/content/site-content";
import { BrandLogo, type BrandId } from "./brand-logo";
import DemoMotionButton from "./demo-motion-button";
import { useVisualLoop } from "./use-visual-loop";
import { demoCycle } from "./demo-timing";
import styles from "./operations-flow.module.css";

const words = {
  ko: {
    title: "연결에서 시작해, 지속적인 개선으로", select: "단계를 눌러 살펴보세요",
    stages: [
      { title: "등록·연동", label: "CONNECT", note: "사이트와 상품 데이터를 연결해 운영의 기준을 만듭니다.", tasks: ["쇼핑몰 URL·기본정보 등록", "상품 피드 링크 연결"] },
      { title: "진단", label: "ANALYZE", note: "AI가 사이트와 상품을 분석해 개선이 필요한 지점을 찾습니다.", tasks: ["구조·SEO·브랜드 정보 진단", "상품·이미지·속성 분석"] },
      { title: "최적화·적용", label: "OPTIMIZE", note: "검수한 개선안을 바탕으로 사이트와 상품 정보를 정교하게 다듬습니다.", tasks: ["사이트 개선안·리포트 및 적용 지원", "상품별 최적화 정보 확정", "플랫폼 규격별 피드 생성"] },
      { title: "운영·모니터링", label: "OPERATE", note: "캠페인과 데이터를 지속적으로 살피고 다음 개선을 준비합니다.", tasks: ["피드 기반 캠페인 운영", "사이트 월 1회 모니터링", "상품·피드 일 1회 이상 점검"] },
    ],
    site: "쇼핑몰 사이트", feed: "상품 피드 링크", connected: "데이터 연결", siteCheck: "사이트 구조·브랜드", productCheck: "상품 정보·이미지", analyze: "개선 포인트 분석", verified: "운영팀 검수·확정", fields: ["상품명·설명", "색상·소재", "이미지·ALT"], channel: "채널별 피드", monitoring: "변화를 확인하고 개선",
    team: "전 과정에 함께하는", teamName: "ShopLayer 운영팀", teamNote: "AI의 분석과 자동화에 전문가의 판단을 더합니다.",
    support: [
      { title: "검수·승인", note: "근거와 변경 내용을 확인합니다." },
      { title: "예외 상품 대응", note: "판단이 필요한 상품을 검토합니다." },
      { title: "플랫폼 오류 대응", note: "채널·피드 이슈를 해결합니다." },
      { title: "CS 지원", note: "운영 중 문의를 함께 해결합니다." },
    ],
    loop: "운영에서 발견한 변화를 다음 진단과 개선에 반영합니다.", outcomes: ["신뢰할 수 있는 운영", "지속적인 데이터 개선", "다양한 채널로 확장"],
  },
  ja: {
    title: "接続から、継続的な改善へ", select: "ステップを選んで確認",
    stages: [
      { title: "登録・連携", label: "CONNECT", note: "サイトと商品データを接続し、運用の基準を整えます。", tasks: ["サイトURL・基本情報の登録", "商品フィードの接続"] },
      { title: "診断", label: "ANALYZE", note: "AIがサイトと商品を分析し、改善すべきポイントを見つけます。", tasks: ["構造・SEO・ブランド情報の診断", "商品・画像・属性の分析"] },
      { title: "最適化・反映", label: "OPTIMIZE", note: "確認した改善案をもとに、サイトと商品情報を整えます。", tasks: ["サイト改善案・レポートと反映支援", "商品別の最適化情報を確定", "各プラットフォーム向けフィード作成"] },
      { title: "運用・確認", label: "OPERATE", note: "キャンペーンとデータを継続的に確認し、次の改善につなげます。", tasks: ["フィードを活用した広告運用", "サイトを月1回モニタリング", "商品・フィードを1日1回以上確認"] },
    ],
    site: "ECサイト", feed: "商品フィード", connected: "データを接続", siteCheck: "サイト構造・ブランド", productCheck: "商品情報・画像", analyze: "改善ポイントを分析", verified: "担当者が確認・確定", fields: ["商品名・説明", "色・素材", "画像・ALT"], channel: "チャネル別フィード", monitoring: "変化を次の改善へ",
    team: "すべてのステップを支える", teamName: "ShopLayerの担当者", teamNote: "AIの分析と自動化に、専門家の判断を加えます。",
    support: [
      { title: "確認・承認", note: "根拠と変更内容を確認します。" },
      { title: "例外商品の対応", note: "判断が必要な商品を検討します。" },
      { title: "連携エラーの対応", note: "チャネルやフィードの問題を解決します。" },
      { title: "CSサポート", note: "運用中の疑問に対応します。" },
    ],
    loop: "運用で見つけた変化を、次の診断と改善に反映します。", outcomes: ["信頼できる運用", "継続的なデータ改善", "多様なチャネルへ展開"],
  },
} as const;

const supportIcons = [ClipboardCheck, Database, Settings2, Headphones];
const channels: BrandId[] = ["gpt", "google", "naver", "meta", "tiktok", "kakao"];
const processInterval = demoCycle(1200);

function StageScene({ index, locale }: { index: number; locale: Locale }) {
  const t = words[locale];
  if (index === 0) return (
    <div className={styles.connection}>
      <div className={styles.sources}><span><Store size={16} />{t.site}</span><span><Link2 size={16} />{t.feed}</span></div>
      <svg className={styles.joinLines} viewBox="0 0 70 120" fill="none"><path d="M0 28 C38 28 24 60 68 60M0 92 C38 92 24 60 68 60" /></svg>
      <div className={styles.dataHub}><Database size={24} /><span>ShopLayer</span><small>{t.connected}</small><i><Check size={12} /></i></div>
    </div>
  );
  if (index === 1) return (
    <div className={styles.diagnosis}>
      <div className={styles.windowTop}><span /><span /><span /><ScanSearch size={15} /></div>
      <div className={styles.scanRows}><span><Store size={17} /><b>{t.siteCheck}</b><Check size={15} /></span><span><Database size={17} /><b>{t.productCheck}</b><Check size={15} /></span></div>
      <div className={styles.scanLine} />
      <div className={styles.scanResult}><Sparkles size={13} />{t.analyze}<span /><span /><span /></div>
    </div>
  );
  if (index === 2) return (
    <div className={styles.optimization}>
      <div className={styles.product}><Image src="/images/demo-trousers-cream.png" alt="" width={100} height={124} sizes="100px" /><span><ShieldCheck size={13} />{t.verified}</span></div>
      <div className={styles.fields}>{t.fields.map(field => <span key={field}><Check size={12} />{field}</span>)}<small><FileCheck2 size={13} />{t.channel}<ArrowRight size={13} /></small></div>
    </div>
  );
  return (
    <div className={styles.monitor}>
      <div className={styles.channelMarks}>{channels.map(brand => <BrandLogo key={brand} brand={brand} variant="symbol" size={17} decorative />)}</div>
      <div className={styles.trend}><svg viewBox="0 0 250 75" fill="none"><path className={styles.chartGrid} d="M0 20H250M0 45H250M0 70H250" /><path className={styles.chartLine} d="M4 57L38 42L69 50L102 28L135 38L167 17L200 25L245 8" /><circle cx="245" cy="8" r="4" /></svg></div>
      <span className={styles.monitorNote}><RefreshCw size={13} />{t.monitoring}</span>
    </div>
  );
}

export default function OperationsFlow({ locale }: { locale: Locale }) {
  const t = words[locale];
  const panelRef = useRef<HTMLDivElement>(null);
  const loop = useVisualLoop(panelRef, processInterval);
  const [selected, setSelected] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const current = selected ?? (loop.cycle + offset) % 4;
  const selectStep = (index: number) => { setSelected(index); loop.pause(); };
  const toggle = () => {
    if (loop.paused) {
      if (selected !== null) setOffset((selected - loop.cycle % 4 + 4) % 4);
      setSelected(null);
    }
    loop.togglePause();
  };

  return (
    <div className={styles.board} ref={panelRef} data-running={loop.running} data-step={current} data-cycle={loop.cycle} data-testid="operations-flow">
      <div className={styles.toolbar}><span><span className={styles.liveDot} /><strong>{t.title}</strong></span><div><small>{t.select}</small><DemoMotionButton locale={locale} paused={loop.paused} onToggle={toggle} /></div></div>
      <ol className={styles.journey}>{t.stages.map((stage, index) => (
        <li key={stage.label} className={styles.stage} data-active={current === index} data-complete={index < current || loop.reducedMotion}>
          <h3 className={styles.stageHeading}><button type="button" onClick={() => selectStep(index)} aria-pressed={current === index}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><span><small>{stage.label}</small><strong>{stage.title}</strong></span>
          </button></h3>
          <p className={styles.description}>{stage.note}</p>
          <div className={styles.sceneWrap} aria-hidden="true">
            <div className={styles.scene}><StageScene index={index} locale={locale} /></div>
            {index < 3 && <span className={styles.nextArrow}><ArrowRight size={18} /></span>}
          </div>
          <ul className={styles.tasks}>{stage.tasks.map(task => <li key={task}><Check size={14} aria-hidden="true" /><span>{task}</span></li>)}</ul>
        </li>
      ))}</ol>
      <div className={styles.teamRail}>
        <div className={styles.teamHeading}><span className={styles.teamIcon}><Users size={24} aria-hidden="true" /></span><div><small>{t.team}</small><h3>{t.teamName}</h3></div><p>{t.teamNote}</p></div>
        <ul className={styles.support}>{t.support.map((job, index) => {
          const Icon = supportIcons[index];
          const active = index === 0 ? current === 1 || current === 2 : index === 1 ? current === 2 : current === 3;
          return <li key={job.title} data-active={active}><Icon size={20} aria-hidden="true" /><div><strong>{job.title}</strong><span>{job.note}</span></div></li>;
        })}</ul>
      </div>
      <div className={styles.feedback}><span><RefreshCw size={17} aria-hidden="true" />{t.loop}</span><ul>{t.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul></div>
    </div>
  );
}
