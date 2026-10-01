import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  FileText,
  Info,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

import { siteContent, type Locale, type SourceCard } from "@/content/site-content";
import { publicContactEmail } from "@/lib/site-config";
import ApplicationForm from "./application-form";
import { BrandLogo } from "./brand-logo";
import CapabilityDemo from "./capability-demo";
import ContextShoppingDemo from "./context-shopping-demo";
import LanguageSwitch from "./language-switch";
import NewsCarousel from "./news-carousel";
import OperationsFlow from "./operations-flow";
import ShoppingDemo from "./shopping-demo";
import UnifiedFeedConsole from "./unified-feed-console";

const aiSearchGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

function SectionHeading({
  eyebrow,
  title,
  description,
  number,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  number: string;
  id?: string;
}) {
  return (
    <div className="section-head">
      <span className="section-number" aria-hidden="true">{number}</span>
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="section-title" id={id}>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

function ExternalSource({ card }: { card: SourceCard }) {
  return (
    <a className="source-link" href={card.sourceUrl} target="_blank" rel="noopener noreferrer">
      {card.sourceLabel}<ArrowUpRight aria-hidden="true" />
    </a>
  );
}

export default function LandingPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const journey = locale === "ko"
    ? [
        { title: "쇼핑몰·상품 이해", detail: "사이트 구조와 브랜드, 상품·이미지의 사실을 함께 파악합니다." },
        { title: "AI 분석과 사람의 확정", detail: "근거를 검토하고 필요한 개선안을 ShopLayer 기준으로 확정합니다." },
        { title: "상품 데이터 정리", detail: "수집 원본과 확정 정보를 관리해 채널에서 활용할 기준을 만듭니다." },
        { title: "멀티 채널 운영", detail: "단일 상품 피드를 여섯 채널의 형식으로 생성·갱신합니다." },
      ]
    : [
        { title: "サイト・商品を理解", detail: "構造やブランド、商品・画像に含まれる事実を確認します。" },
        { title: "AI分析と人による確定", detail: "根拠を確認し、必要な改善案をShopLayerで確定します。" },
        { title: "商品データを整理", detail: "収集した原本と確定した情報を管理し、活用の基準を整えます。" },
        { title: "複数チャネルを運用", detail: "一つの商品フィードを6チャネル向けの形式に作成・更新します。" },
      ];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">{locale === "ko" ? "본문으로 이동" : "本文へ移動"}</a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href={locale === "ko" ? "/" : "/ja"} aria-label={locale === "ko" ? "ShopLayer 첫 화면" : "ShopLayerトップページ"}>
            <Layers3 className="brand-icon" aria-hidden="true" />
            <span>ShopLayer</span>
          </Link>
          <nav className="header-nav" aria-label={locale === "ko" ? "주요 메뉴" : "メインナビゲーション"}>
            {content.nav.items.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
          </nav>
          <div className="header-actions">
            <LanguageSwitch locale={locale} label={content.nav.languageLabel} />
            <a className="header-cta" href="#closing">{content.hero.primaryLabel}<ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 className="hero-title" id="hero-title">{content.hero.title}</h1>
              <p className="hero-description">{content.hero.description}</p>
              <div className="hero-actions">
                <a className="button-primary" href="#closing">{content.hero.primaryLabel}<ArrowRight aria-hidden="true" /></a>
              </div>
              <p className="hero-footnote"><ShieldCheck aria-hidden="true" />{content.hero.serviceNote}</p>
            </div>
            <div>
              <div className="hero-visual-frame">
                <ShoppingDemo locale={locale} />
              </div>
            </div>
          </div>
        </section>

        <section className="section trend-section" id="trend" aria-labelledby="trend-title">
          <div className="section-inner trend-layout">
            <SectionHeading number="01 / 08" eyebrow={content.trend.eyebrow} title={content.trend.title} description={content.trend.description} id="trend-title" />
            <div className="trend-cards">
              <figure className="trend-photo">
                <Image src="/images/shopping-context.png" alt={locale === "ko" ? "옷과 원단을 살펴보며 스마트폰으로 쇼핑 정보를 비교하는 장면" : "服と生地を見ながらスマートフォンで買い物情報を比較する場面"} fill sizes="(max-width: 900px) 90vw, 660px" />
                <figcaption>{locale === "ko" ? "상품보다 먼저, 고객의 상황을 이해하는 쇼핑" : "商品より先に、買い物の状況を理解する"}</figcaption>
              </figure>
              <div className="trend-card trend-card--before">
                <span className="trend-card-label"><Search aria-hidden="true" />{content.trend.beforeLabel}</span>
                <p>{content.trend.beforeExample}</p>
              </div>
              <div className="trend-shift"><ArrowRight size={16} aria-hidden="true" />{locale === "ko" ? "탐색 방식의 확장" : "探し方の広がり"}</div>
              <div className="trend-recommendation"><ContextShoppingDemo locale={locale} label={content.trend.afterLabel} description={content.trend.afterExample} /></div>
              <div className="trend-points"><p className="trend-point"><Check aria-hidden="true" />{content.trend.conclusion}</p></div>
            </div>
          </div>
        </section>

        <section className="section platform-section" id="platforms" aria-labelledby="platforms-title">
          <div className="section-inner">
            <SectionHeading number="02 / 08" eyebrow={content.platforms.eyebrow} title={content.platforms.title} description={content.platforms.description} id="platforms-title" />
            {content.platforms.note ? <p className="evidence-note"><Info aria-hidden="true" />{content.platforms.note}</p> : null}
            <div className="platform-grid">
              {content.platforms.cards.map((card, index) => (
                <article className="platform-card" key={card.id}>
                  <div className="platform-card-media">
                    <Image
                      src={card.id === "naver-shopping-agent" ? "/images/platform-naver-editorial.png" : card.id === "google-merchant-center" ? "/images/platform-merchant-editorial.png" : "/images/platform-google-editorial.png"}
                      alt={locale === "ko" ? `${card.title}의 쇼핑 데이터 변화를 나타낸 이미지` : `${card.title}の商品データの変化を表す画像`}
                      fill
                      sizes="(max-width: 680px) 90vw, (max-width: 900px) 46vw, 380px"
                    />
                    <span className="platform-card-logo"><BrandLogo brand={card.id === "naver-shopping-agent" ? "naver" : "google"} variant="lockup" size={23} decorative /></span>
                  </div>
                  <div className="platform-card-marker"><span>{String(index + 1).padStart(2, "0")}</span><ArrowUpRight aria-hidden="true" /></div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.takeaway && <p className="source-takeaway"><strong>{locale === "ko" ? "읽어야 할 변화" : "注目する変化"}</strong>{card.takeaway}</p>}
                  <div className="source-meta"><span>{card.date}</span><span>{card.scope}</span></div>
                  <ExternalSource card={card} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section case-section" id="cases" aria-labelledby="cases-title">
          <div className="section-inner">
            <SectionHeading number="03 / 08" eyebrow={content.cases.eyebrow} title={content.cases.title} description={content.cases.description} id="cases-title" />
            <NewsCarousel locale={locale} />
          </div>
        </section>

        <section className="section definition-section" id="definition" aria-labelledby="definition-title">
          <div className="section-inner">
            <div className="definition-head">
              <div>
                <span className="section-number" aria-hidden="true">04 / 08</span>
                <p className="section-kicker">{content.definition.eyebrow}</p>
                <h2 className="section-title" id="definition-title">{content.definition.title}</h2>
              </div>
              <p className="section-description">{content.definition.description}</p>
            </div>
            <p className="card-eyebrow">{content.definition.flowLabel}</p>
            <div className="definition-journey">
              {journey.map((step, index) => (
                <article className="journey-step" key={step.title}>
                  <div className="journey-step-top"><span>{String(index + 1).padStart(2, "0")}</span>{index === 0 ? <Store aria-hidden="true" /> : index === 1 ? <Sparkles aria-hidden="true" /> : index === 2 ? <Database aria-hidden="true" /> : <FileText aria-hidden="true" />}</div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section features-section" id="features" aria-labelledby="features-title">
          <div className="section-inner">
            <SectionHeading number="05 / 08" eyebrow={content.features.eyebrow} title={content.features.title} description={content.features.description} id="features-title" />
            <div className="feature-stack">
              {content.features.cards.filter((feature) => ["store", "product", "image"].includes(feature.id)).map((feature) => (
                <article className="feature-card" key={feature.id}>
                  <div className="feature-copy">
                    <div className="feature-top"><span className="feature-index">{feature.number}</span></div>
                    <h3>{feature.title}</h3>
                    <p className="feature-lead">{feature.work}</p>
                    <p className="feature-result"><Check size={18} aria-hidden="true" />{feature.result}</p>
                    <p className="feature-input">{feature.input}</p>
                  </div>
                  <CapabilityDemo id={feature.id} locale={locale} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section feed-section" id="feed" aria-labelledby="feed-title">
          <div className="section-inner">
            <SectionHeading number="06 / 08" eyebrow={content.feed.eyebrow} title={content.feed.title} description={content.feed.description} id="feed-title" />
            <UnifiedFeedConsole locale={locale} feed={content.feed} />
          </div>
        </section>

        <section className="section operations-section" id="process" aria-labelledby="operations-title">
          <div className="section-inner">
            <SectionHeading
              number="07 / 08"
              eyebrow="HOW SHOPLAYER WORKS"
              title={locale === "ko" ? "ShopLayer는 AI와 사람이 함께 운영합니다." : "ShopLayerは、AIと人が一緒に運用します。"}
              description={locale === "ko" ? "사이트와 상품 데이터를 연결하면 AI가 분석하고, ShopLayer 운영팀이 검수·승인합니다. 사이트 개선과 상품·채널 운영의 두 흐름을 정기 모니터링으로 이어가며, 발견한 변화를 다음 개선에 반영합니다." : "サイトと商品データを接続するとAIが分析し、ShopLayerの担当者が確認・承認します。サイト改善と商品・チャネル運用を定期モニタリングで支え、見つけた変化を次の改善へつなげます。"}
              id="operations-title"
            />
            <OperationsFlow locale={locale} />
          </div>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="section-inner faq-layout">
            <SectionHeading number="08 / 08" eyebrow={content.faq.eyebrow} title={content.faq.title} description={content.faq.description} id="faq-title" />
            <div className="faq-list">
              {content.faq.items.map((item, index) => (
                <details className="faq-item" key={item.question}>
                  <summary><span>{String(index + 1).padStart(2, "0")}. {item.question}</span></summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                    {index === 1 && <a className="source-link faq-source" href={aiSearchGuide} target="_blank" rel="noopener noreferrer">{locale === "ko" ? "Google 공식 AI 검색 가이드" : "Google公式 AI検索ガイド"}<ArrowUpRight aria-hidden="true" /></a>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section" id="closing" aria-labelledby="closing-title">
          <div className="closing-inner">
            <div className="closing-copy">
              {content.closing.eyebrow ? <p className="section-kicker">{content.closing.eyebrow}</p> : null}
              <h2 className="closing-title" id="closing-title">{content.closing.title}</h2>
              <p className="closing-description">{content.closing.description}</p>
            </div>
            <div className="closing-form"><ApplicationForm locale={locale} recipient={publicContactEmail} /></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner footer-minimal">
          <div className="footer-brand">
            <Link className="brand" href={locale === "ko" ? "/" : "/ja"}><Layers3 className="brand-icon" aria-hidden="true" /><span>ShopLayer</span></Link>
            <p>{content.footer.description}</p>
          </div>
          <div className="footer-legal">
            <Link className="footer-privacy" href={locale === "ko" ? "/privacy" : "/ja/privacy"}>{locale === "ko" ? "개인정보 처리방침" : "プライバシーポリシー"}</Link>
            <p className="footer-copyright">ShopLayer © All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
