import Link from "next/link";
import { ArrowLeft, Layers3, ShieldCheck } from "lucide-react";
import { privacyContent } from "@/content/privacy-content";
import type { Locale } from "@/content/site-content";
import { publicContactEmail } from "@/lib/site-config";
import styles from "./privacy-page.module.css";

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const t = privacyContent[locale];
  return <main className={styles.page}>
    <header className={styles.header}><Link className={styles.brand} href={locale === "ko" ? "/" : "/ja"}><Layers3 size={28} aria-hidden="true" />ShopLayer</Link><Link className={styles.back} href={locale === "ko" ? "/#closing" : "/ja#closing"}><ArrowLeft size={15} aria-hidden="true" />{t.back}</Link></header>
    <article>
      <p className={styles.eyebrow}>PRIVACY POLICY</p><h1>{t.title}</h1><p className={styles.intro}>{t.intro}</p>
      <div className={styles.notice}><ShieldCheck size={19} aria-hidden="true" /><p>{t.draft}</p></div>
      <div className={styles.sections}>{t.sections.map(([title, body], index) => <section key={title}><h2><span>{String(index + 1).padStart(2, "0")}</span>{title}</h2><p>{body}</p></section>)}</div>
      <div className={styles.contact}><strong>{t.contact}</strong>{publicContactEmail ? <a href={"mailto:" + publicContactEmail}>{publicContactEmail}</a> : <span>{t.pending}</span>}</div>
      <div className={styles.references}>
        <a href="https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS217&mCode=I030010000&nttId=12018" target="_blank" rel="noopener noreferrer">{locale === "ko" ? "개인정보보호위원회 작성지침" : "韓国・個人情報保護委員会の作成指針"}</a>
        <a href="https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/" target="_blank" rel="noopener noreferrer">{locale === "ko" ? "일본 개인정보보호위원회 안내" : "日本・個人情報保護委員会のガイドライン"}</a>
        <a href={locale === "ko" ? "https://privacy.kisa.or.kr/" : "https://www.ppc.go.jp/personalinfo/pipldial/"} target="_blank" rel="noopener noreferrer">{locale === "ko" ? "개인정보 침해 상담" : "個人情報に関する相談窓口"}</a>
      </div>
    </article>
  </main>;
}
