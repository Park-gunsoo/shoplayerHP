"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/content/site-content";
import { privacyPath } from "@/lib/locales";
import { applicationLimits, PRIVACY_VERSION, STORE_URL_PATTERN } from "@/lib/application";
import styles from "./application-form.module.css";

const copy = {
  ko: {
    title: "ShopLayer 도입 신청", description: "쇼핑몰 정보와 필요한 작업을 남겨 주시면 이메일로 연락드리겠습니다.",
    name: "담당자 이름", email: "연락받을 이메일", store: "쇼핑몰 또는 브랜드명", url: "쇼핑몰 URL (선택)", note: "현재 필요한 작업 (선택)",
    urlHint: "example.com, shop.kr, shop.co.jp처럼 도메인을 입력해 주세요. www나 http는 없어도 됩니다.",
    notePlaceholder: "쇼핑몰 진단, 상품 최적화, 이미지 정보, 멀티 채널 피드 중 필요한 내용을 적어 주세요.",
    consent: "[필수] 개인정보 수집·이용에 동의합니다.", privacy: "개인정보 처리방침 보기",
    summary: [
      "수집 항목: 담당자 이름, 이메일, 쇼핑몰·브랜드명 (선택: URL, 문의 내용)",
      "이용 목적: 신청 확인, 도입 상담 및 답변",
      "보유 기간: 상담·문의 처리 완료 시까지. 완료 후 지체 없이 삭제합니다.",
    ],
    refusal: "동의를 거부할 수 있으나, 미동의 시 온라인 신청이 어렵습니다.",
    processing: "신청은 후이즈메일을 통해 전달되어 Gmail로 접수됩니다. 국외 처리 및 업체별 보관 정보는 처리방침에서 확인할 수 있습니다.",
    submit: "ShopLayer 신청하기", sending: "신청 보내는 중…",
    successTitle: "정상적으로 접수되었습니다.", confirm: "확인",
    success: "담당자가 내용을 확인한 후 입력하신 이메일로 연락드리겠습니다.",
    failure: "전송 완료를 확인하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도하거나 아래 이메일로 문의해 주세요.",
    invalid: "입력한 내용과 개인정보 동의를 확인해 주세요.", limited: "요청이 많습니다. 잠시 후 다시 시도해 주세요.",
    direct: "문의 이메일", privacyNote: "상담에 필요한 정보만 입력해 주세요. 주민등록번호 등 민감한 정보는 적지 마세요.",
  },
  ja: {
    title: "ShopLayer導入のお申し込み", description: "サイト情報とご希望の内容をお送りください。メールでご連絡します。",
    name: "ご担当者名", email: "返信先メールアドレス", store: "ECサイト・ブランド名", url: "ECサイトURL（任意）", note: "ご希望の内容（任意）",
    urlHint: "example.com、shop.kr、shop.co.jpなどのドメインを入力してください。wwwやhttpは不要です。",
    notePlaceholder: "サイト診断、商品最適化、画像情報、複数チャネルのフィードなど、ご希望をご記入ください。",
    consent: "【必須】個人情報の取得・利用に同意します。", privacy: "プライバシーポリシーを見る",
    summary: ["項目：担当者名、メール、サイト・ブランド名（任意：URL、相談内容）", "目的：申込確認、導入相談と回答", "保存期間：相談への対応完了まで。完了後、速やかに削除します。"],
    refusal: "同意を拒否できますが、同意がない場合はオンライン申込をご利用いただけません。",
    processing: "申込内容はフーイズメール経由でGmailへ届きます。国外での処理と各社の保存期間はポリシーをご確認ください。",
    successTitle: "お申し込みを受け付けました。", confirm: "確認",
    submit: "ShopLayerに申し込む", sending: "送信中…", success: "担当者が内容を確認し、ご入力のメールアドレスへご連絡します。",
    failure: "送信完了を確認できませんでした。入力内容は保持されています。時間をおいて再試行するか、下記のメールへお問い合わせください。",
    invalid: "入力内容と個人情報への同意をご確認ください。", limited: "リクエストが多いため、しばらくしてから再試行してください。",
    direct: "お問い合わせメール", privacyNote: "相談に必要な情報のみご入力ください。個人識別番号などの機密情報は記入しないでください。",
  },
  en: {
    title: "Apply for ShopLayer", description: "Tell us about your store and the support you need. We will reply by email.",
    name: "Your name", email: "Reply email", store: "Store or brand name", url: "Store URL (optional)", note: "What do you need help with? (optional)",
    urlHint: "Enter a domain such as example.com, shop.kr or shop.co.jp. www and http are optional.",
    notePlaceholder: "Store diagnostics, product optimization, image information or multi-channel feeds…",
    consent: "[Required] I agree to the collection and use of my information.", privacy: "Read the privacy policy",
    summary: ["Information: name, email and store or brand name (optional: URL and inquiry details)", "Purpose: application review, onboarding consultation and replies", "Retention: until the inquiry is resolved, followed by prompt deletion."],
    refusal: "You may decline consent, but the online application requires it.",
    processing: "Applications are sent through WHOIS Mail to Gmail. See the privacy policy for international processing and provider retention details.",
    successTitle: "Your application has been received.", confirm: "OK",
    submit: "Apply for ShopLayer", sending: "Sending application…", success: "Our team will review your application and contact you at the email address you provided.",
    failure: "We could not confirm that your application was sent. Your details have been kept in this form. Please try again shortly or contact the email below.",
    invalid: "Please check your details and privacy consent.", limited: "Too many requests. Please try again later.",
    direct: "Contact email", privacyNote: "Provide only the information needed for your inquiry. Do not include sensitive identifiers or other confidential information.",
  },
} as const;

export default function ApplicationForm({ locale, recipient }: { locale: Locale; recipient: string | null }) {
  const t = copy[locale];
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inFlight = useRef(false);
  const previousRequest = useRef<{ fingerprint: string; id: string } | null>(null);
  const successDialog = useRef<HTMLDialogElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (inFlight.current || !form.reportValidity()) return;
    const values = new FormData(form);
    const payload = {
      name: String(values.get("name") ?? "").trim(), email: String(values.get("email") ?? "").trim(),
      store: String(values.get("store") ?? "").trim(), url: String(values.get("url") ?? "").trim(), note: String(values.get("note") ?? "").trim(),
      website: String(values.get("website") ?? ""), privacyConsent: values.get("privacyConsent") === "on", privacyVersion: PRIVACY_VERSION, locale,
    };
    const fingerprint = JSON.stringify(payload);
    if (previousRequest.current?.fingerprint !== fingerprint) previousRequest.current = { fingerprint, id: crypto.randomUUID() };
    inFlight.current = true;
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, requestId: previousRequest.current.id }),
        signal: AbortSignal.timeout(25_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setState("error");
        setMessage(result.code === "invalid_fields" ? t.invalid : response.status === 429 ? t.limited : t.failure);
        return;
      }
      setState("success");
      setMessage(`${t.successTitle} ${t.success}`);
      previousRequest.current = null;
      form.reset();
      successDialog.current?.showModal();
    } catch {
      setState("error");
      setMessage(t.failure);
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} id="application-form" aria-busy={state === "sending"}>
      <div className={styles.intro}><h3>{t.title}</h3><p>{t.description}</p></div>
      <fieldset className={styles.fieldset} disabled={state === "sending"}>
        <div className={styles.fields}>
          <label><span>{t.name}</span><input name="name" autoComplete="name" maxLength={applicationLimits.name} required /></label>
          <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" maxLength={applicationLimits.email} required /></label>
          <label><span>{t.store}</span><input name="store" maxLength={applicationLimits.store} required /></label>
          <label><span>{t.url}</span><input name="url" type="text" inputMode="url" pattern={STORE_URL_PATTERN} maxLength={applicationLimits.url} placeholder="example.com" title={t.urlHint} /></label>
          <label className={styles.full}><span>{t.note}</span><textarea name="note" rows={3} maxLength={applicationLimits.note} placeholder={t.notePlaceholder} /></label>
        </div>
        <div className={styles.honeypot} aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className={styles.consentBox}>
          <label className={styles.consentLabel}><input type="checkbox" name="privacyConsent" required aria-describedby="application-privacy-summary" /><span>{t.consent}</span></label>
          <div id="application-privacy-summary" className={styles.consentSummary}>
            <ul>{t.summary.map((line) => <li key={line}>{line}</li>)}</ul>
            <p>{t.refusal}</p><p>{t.processing}</p>
          </div>
          <Link className={styles.policyLink} href={privacyPath[locale]} target="_blank" rel="noopener noreferrer">{t.privacy}<ArrowUpRight size={13} aria-hidden="true" /></Link>
        </div>
        <button type="submit" className={styles.submit}>{state === "sending" ? t.sending : t.submit}<ArrowUpRight size={18} aria-hidden="true" /></button>
      </fieldset>
      {message ? <p className={styles.status} data-state={state} role={state === "error" ? "alert" : "status"}>{message}</p> : null}
      {recipient ? <p className={styles.directContact}>{t.direct}: <a href={`mailto:${recipient}`}>{recipient}</a></p> : null}
      <p className={styles.privacy}>{t.privacyNote}</p>
      <dialog ref={successDialog} className={styles.successDialog} aria-labelledby="application-success-title" aria-describedby="application-success-description">
        <h2 id="application-success-title">{t.successTitle}</h2>
        <p id="application-success-description">{t.success}</p>
        <button type="button" className={`${styles.submit} ${styles.dialogButton}`} onClick={() => successDialog.current?.close()}>{t.confirm}</button>
      </dialog>
    </form>
  );
}
