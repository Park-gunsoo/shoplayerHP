"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import styles from "./application-form.module.css";

type Locale = "ko" | "ja";

const copy = {
  ko: {
    title: "ShopLayer 도입 신청",
    description: "쇼핑몰 정보와 필요한 작업을 입력해 도입 신청 내용을 준비해 주세요.",
    name: "담당자 이름",
    email: "연락받을 이메일",
    store: "쇼핑몰 또는 브랜드명",
    url: "쇼핑몰 URL",
    note: "현재 필요한 작업",
    notePlaceholder: "쇼핑몰 진단, 상품 최적화, 이미지 정보, 멀티 채널 피드 중 필요한 내용을 적어 주세요.",
    submit: "ShopLayer 신청하기",
    prepare: "신청 내용 복사",
    copied: "신청 내용이 복사되었습니다. 수신 이메일 연결 전에는 자동 접수되지 않습니다.",
    copyFailed: "현재 자동 접수가 연결되지 않았습니다. 입력 내용을 따로 보관해 주세요.",
    mailOpened: "메일 앱에서 내용을 확인한 뒤 전송해 주세요.",
  },
  ja: {
    title: "ShopLayer導入のお申し込み",
    description: "ECサイトの情報とご希望の内容を入力し、導入申込の内容を準備してください。",
    name: "ご担当者名",
    email: "返信先メールアドレス",
    store: "ECサイト・ブランド名",
    url: "ECサイトURL",
    note: "ご希望の内容",
    notePlaceholder: "サイト診断、商品最適化、画像情報、複数チャネルのフィードなど、ご希望の内容をご記入ください。",
    submit: "ShopLayerに申し込む",
    prepare: "申込内容をコピー",
    copied: "申込内容をコピーしました。受信先メールの設定前は自動送信されません。",
    copyFailed: "現在、自動受付は接続されていません。入力内容を別途保存してください。",
    mailOpened: "メールアプリで内容を確認して送信してください。",
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

    if (recipient) {
      const subject = locale === "ko" ? "ShopLayer 도입 신청" : "ShopLayer導入のお申し込み";
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus(t.mailOpened);
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setStatus(t.copied);
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
        <label><span>{t.url}</span><input name="url" type="url" inputMode="url" placeholder="https://" /></label>
        <label className={styles.full}><span>{t.note}</span><textarea name="note" rows={3} placeholder={t.notePlaceholder} /></label>
      </div>
      <button type="submit" className={styles.submit}>{recipient ? t.submit : t.prepare}<ArrowUpRight size={18} aria-hidden="true" /></button>
      <p className={styles.privacy}>{locale === "ko" ? "도입 상담에 필요한 정보만 입력해 주세요." : "導入相談に必要な情報をご入力ください。"} <Link href={locale === "ko" ? "/privacy" : "/ja/privacy"}>{locale === "ko" ? "개인정보 처리방침" : "プライバシーポリシー"}</Link></p>
      {status ? <p className={styles.status} role="status">{status}</p> : null}
    </form>
  );
}
