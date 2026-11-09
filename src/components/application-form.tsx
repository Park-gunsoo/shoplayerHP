"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/content/site-content";
import { privacyPath } from "@/lib/locales";

import styles from "./application-form.module.css";

const copy = {
  en: {
    title: "Apply for ShopLayer", description: "Tell us about your store and the support you need.",
    name: "Your name", email: "Reply email", store: "Store or brand name", url: "Store URL", note: "What do you need help with?",
    urlHint: "Enter an address ending in co.kr. www and http are optional.",
    notePlaceholder: "Store diagnostics, product optimization, image information or multi-channel feeds…",
    submit: "Apply for ShopLayer", prepare: "Copy application", copied: "Application copied. It has not been submitted automatically.",
    copyFailed: "The application could not be copied. Please keep a separate copy of your details.",
    mailOpened: "Review the details in your email app and press Send. If it did not open, copy your application and email the address below.",
    copy: "Copy application details", copiedReady: "Application copied. Paste it into an email and send it to the address below.",
    mailHint: "This opens your email app. Review the details and press Send to submit your application.",
    privacyNote: "Please provide only the information needed for your inquiry.", privacy: "Privacy policy",
  },
  ko: {
    title: "ShopLayer 도입 신청",
    description: "쇼핑몰 정보와 필요한 작업을 입력해 도입 신청 내용을 준비해 주세요.",
    name: "담당자 이름",
    email: "연락받을 이메일",
    store: "쇼핑몰 또는 브랜드명",
    url: "쇼핑몰 URL",
    urlHint: "co.kr로 끝나는 주소를 입력해 주세요. www나 http는 없어도 됩니다.",
    note: "현재 필요한 작업",
    notePlaceholder: "쇼핑몰 진단, 상품 최적화, 이미지 정보, 멀티 채널 피드 중 필요한 내용을 적어 주세요.",
    submit: "ShopLayer 신청하기",
    prepare: "신청 내용 복사",
    copied: "신청 내용이 복사되었습니다. 수신 이메일 연결 전에는 자동 접수되지 않습니다.",
    copyFailed: "현재 자동 접수가 연결되지 않았습니다. 입력 내용을 따로 보관해 주세요.",
    mailOpened: "메일 앱에서 내용을 확인한 뒤 보내기를 눌러 주세요. 앱이 열리지 않으면 신청 내용을 복사해 아래 주소로 보내 주세요.",
    copy: "신청 내용 복사", copiedReady: "신청 내용이 복사되었습니다. 메일에 붙여넣고 아래 주소로 보내 주세요.",
    mailHint: "버튼을 누르면 메일 앱이 열립니다. 내용을 확인하고 보내기를 눌러야 신청이 전달됩니다.",
    privacyNote: "도입 상담에 필요한 정보만 입력해 주세요.", privacy: "개인정보 처리방침",
  },
  ja: {
    title: "ShopLayer導入のお申し込み",
    description: "ECサイトの情報とご希望の内容を入力し、導入申込の内容を準備してください。",
    name: "ご担当者名",
    email: "返信先メールアドレス",
    store: "ECサイト・ブランド名",
    url: "ECサイトURL",
    urlHint: "co.krで終わるアドレスを入力してください。wwwやhttpは不要です。",
    note: "ご希望の内容",
    notePlaceholder: "サイト診断、商品最適化、画像情報、複数チャネルのフィードなど、ご希望の内容をご記入ください。",
    submit: "ShopLayerに申し込む",
    prepare: "申込内容をコピー",
    copied: "申込内容をコピーしました。受信先メールの設定前は自動送信されません。",
    copyFailed: "現在、自動受付は接続されていません。入力内容を別途保存してください。",
    mailOpened: "メールアプリで内容を確認し、送信してください。開かない場合は内容をコピーし、下記のアドレスへお送りください。",
    copy: "申込内容をコピー", copiedReady: "申込内容をコピーしました。メールに貼り付け、下記のアドレスへ送信してください。",
    mailHint: "ボタンを押すとメールアプリが開きます。内容を確認し、送信すると申し込みが届きます。",
    privacyNote: "導入相談に必要な情報をご入力ください。", privacy: "プライバシーポリシー",
  },
} as const;

export default function ApplicationForm({ locale, recipient }: { locale: Locale; recipient: string | null }) {
  const t = copy[locale];
  const [status, setStatus] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      `${t.name}: ${data.get("name")}`,
      `${t.email}: ${data.get("email")}`,
      `${t.store}: ${data.get("store")}`,
      `${t.url}: ${data.get("url") || "-"}`,
      `${t.note}: ${data.get("note") || "-"}`,
    ];
    const body = lines.join("\n");

    const copyOnly = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("name") === "copy";
    if (recipient && !copyOnly) {
      const subject = t.title;
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus(t.mailOpened);
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setStatus(recipient ? t.copiedReady : t.copied);
    } catch {
      setStatus(t.copyFailed);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} id="application-form">
      <div className={styles.intro}><h3>{t.title}</h3><p>{t.description}</p></div>
      <div className={styles.fields}>
        <label><span>{t.name}</span><input name="name" autoComplete="name" required /></label>
        <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>{t.store}</span><input name="store" required /></label>
        <label><span>{t.url}</span><input name="url" type="text" inputMode="url" pattern=".*[cC][oO]\.[kK][rR]" placeholder="shoplayer.co.kr" title={t.urlHint} /></label>
        <label className={styles.full}><span>{t.note}</span><textarea name="note" rows={3} placeholder={t.notePlaceholder} /></label>
      </div>
      <button type="submit" className={styles.submit}>{t.submit}<ArrowUpRight size={18} aria-hidden="true" /></button>
      {recipient ? <div className={styles.mailHelp}><p>{t.mailHint}</p><div><a href={`mailto:${recipient}`}>{recipient}</a><button type="submit" name="copy">{t.copy}</button></div></div> : null}
      <p className={styles.privacy}>{t.privacyNote} <Link href={privacyPath[locale]}>{t.privacy}</Link></p>
      {status ? <p className={styles.status} role="status">{status}</p> : null}
    </form>
  );
}
