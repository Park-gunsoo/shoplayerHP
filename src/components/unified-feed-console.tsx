"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { CalendarClock, Database, History, Link2, RefreshCw } from "lucide-react";

import type { Locale, SiteContent } from "@/content/site-content";
import { BrandLogo, type BrandId } from "./brand-logo";
import DemoMotionButton from "./demo-motion-button";
import { useVisualLoop } from "./use-visual-loop";
import { demoCycle } from "./demo-timing";
import FeedConnections from "./feed-connections";
import styles from "./unified-feed-console.module.css";

type Props = {
  locale: Locale;
  feed: SiteContent["feed"];
};

const brandIds = new Set<BrandId>(["gpt", "google", "naver", "meta", "tiktok", "kakao"]);

function isBrandId(value: string): value is BrandId {
  return brandIds.has(value as BrandId);
}

export default function UnifiedFeedConsole({ locale, feed }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const loop = useVisualLoop(panelRef, demoCycle(2050));
  const ko = locale === "ko";

  return (
    <div ref={panelRef} className={[styles.console, loop.inView && !loop.reducedMotion ? styles.inView : ""].join(" ")} data-paused={!loop.running} data-cycle={loop.cycle} data-testid="unified-feed-console">
      <div className={styles.toolbar}>
        <div className={styles.productName}><span className={styles.productMark}><Database size={17} aria-hidden="true" /></span><strong>ShopLayer</strong><span>/ Feed Manager</span></div>
        <span className={styles.toolbarLabel}><RefreshCw size={14} aria-hidden="true" />{locale === "en" ? "One dataset, multiple channels" : ko ? "하나의 데이터, 여러 채널" : "一つのデータから複数チャネルへ"}</span>
        <DemoMotionButton locale={locale} paused={loop.paused} onToggle={loop.togglePause} />
      </div>

      <div className={styles.diagram} ref={diagramRef}>
        <FeedConnections diagramRef={diagramRef} running={loop.running} cycle={loop.cycle} />
        <div className={styles.source}>
          <div className={styles.stepLabel}><span>01</span>{locale === "en" ? "Connect product data" : ko ? "상품 데이터 연결" : "商品データの接続"}</div>
          <h3>{feed.sourceLabel}</h3>
          <div className={styles.sourceUrl}><Link2 size={17} aria-hidden="true" /><span>{locale === "en" ? "Product feed URL" : ko ? "상품 피드 URL" : "商品フィードURL"}</span><span className={styles.urlDots} aria-hidden="true">•••</span></div>
          <div className={styles.catalogImage} data-feed-part="source">
            <Image src="/images/feed-catalog-mosaic.png" alt={locale === "en" ? "Product catalog of clothing and everyday goods" : ko ? "의류와 생활 상품이 배열된 상품 카탈로그" : "衣類と生活用品を並べた商品カタログ"} fill sizes="(max-width: 980px) 100vw, 300px" />
            <span className={styles.catalogTag}>{locale === "en" ? "Full catalog" : ko ? "전체 상품 데이터" : "全商品データ"}</span>
          </div>
          <p>{locale === "en" ? "Collect product names, prices, availability and images together." : ko ? "상품명·가격·판매 상태·이미지를 한 번에 수집합니다." : "商品名・価格・販売状況・画像をまとめて取得します。"}</p>
        </div>

        <span className={styles.flowSpacer} aria-hidden="true" />

        <div className={styles.data}>
          <div className={styles.stepLabel}><span>02</span>{locale === "en" ? "ShopLayer shared product data" : ko ? "ShopLayer 공통 상품 데이터" : "ShopLayer共通商品データ"}</div>
          <h3>{locale === "en" ? "Collect. Organize. Optimize." : ko ? "수집하고, 정리하고, 최적화" : "取得・整理・最適化"}</h3>
          <div className={styles.dataSheet} data-feed-part="data">
            <div className={styles.dataTop}>
              <div className={styles.productThumb}><Image src="/images/demo-trousers-oatmeal.png" alt={locale === "en" ? "Example product image" : ko ? "상품 이미지 예시" : "商品画像の例"} fill sizes="72px" /></div>
              <div><span>{locale === "en" ? "Product information" : ko ? "상품 정보" : "商品情報"}</span><strong>{locale === "en" ? "Shared database" : ko ? "공통 데이터베이스" : "共通データベース"}</strong></div>
              <Database className={styles.databaseIcon} size={21} aria-hidden="true" />
            </div>
            <div className={styles.fieldGrid} key={loop.cycle}>
              {(locale === "en" ? ["Product name", "Price · Status", "Category", "Images · ALT", "Color · Material", "Channel attributes"] : ko ? ["상품명", "가격·상태", "카테고리", "이미지·ALT", "색상·소재", "채널별 속성"] : ["商品名", "価格・状態", "カテゴリー", "画像・ALT", "色・素材", "チャネル別属性"]).map((field) => (
                <span className={styles.field} key={field}><span className={styles.fieldDot} aria-hidden="true" />{field}</span>
              ))}
            </div>
          </div>
          <p>{locale === "en" ? "Prepare collected data and approved information for each channel’s requirements." : ko ? "수집 데이터와 운영자가 반영한 확정 정보를 채널별 규격에 맞춰 구성합니다." : "取得データと担当者が反映した確定情報をチャネル別の形式に整えます。"}</p>
        </div>

        <span className={styles.flowSpacer} aria-hidden="true" />

        <div className={styles.channels}>
          <div className={styles.stepLabel}><span>03</span>{locale === "en" ? "Multi-channel operations" : ko ? "멀티 채널 운영" : "マルチチャネル運用"}</div>
          <h3>{feed.channelsLabel}</h3>
          <ul className={styles.channelGrid} data-feed-part="channels">
            <Fragment key={loop.cycle}>
            {feed.channels.map((channel) => (
              <li className={styles.channel} key={channel.id}>
                <span className={styles.logo}>
                  {isBrandId(channel.id) && <BrandLogo brand={channel.id} variant="symbol" size={23} decorative />}
                </span>
                <span className={styles.channelText}><strong>{channel.name}</strong><small>{channel.description}</small></span>
              </li>
            ))}
            </Fragment>
          </ul>
          <p>{locale === "en" ? "Generate channel formats and update changed products." : ko ? "채널별 형식으로 생성하고, 변경된 상품을 갱신합니다." : "チャネル別の形式で作成し、変更商品を更新します。"}</p>
        </div>
      </div>

      <div className={styles.operations}>
        <div><CalendarClock size={19} aria-hidden="true" /><span><strong>{feed.steps[2].title}</strong><small>{locale === "en" ? "Collection and publication schedules" : ko ? "수집·게시 일정 관리" : "取得・公開の予定を管理"}</small></span></div>
        <div><History size={19} aria-hidden="true" /><span><strong>{feed.steps[3].title}</strong><small>{locale === "en" ? "New items, changes and errors" : ko ? "신규·변경·오류 이력" : "新規・変更・エラーの履歴"}</small></span></div>
        <div><Link2 size={19} aria-hidden="true" /><span><strong>Hosted URL</strong><small>{locale === "en" ? "Manage each channel’s feed URL" : ko ? "채널별 피드 주소 관리" : "チャネル別のフィードURLを管理"}</small></span></div>
      </div>
    </div>
  );
}
