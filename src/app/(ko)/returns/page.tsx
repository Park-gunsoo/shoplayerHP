import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import ShopLayerLogo from "@/components/shoplayer-logo";

import styles from "./returns.module.css";

const contactEmail = "gundoll2.sj@gmail.com";
const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent("[샵레이어] 반품·환불 문의")}`;

export const metadata: Metadata = {
  title: "반품 및 환불 정책 | 샵레이어",
  description: "샵레이어 의류 상품의 배송비, 반품 신청 기간과 방법, 반품 비용 및 환불 기준을 안내합니다.",
  alternates: { canonical: "https://www.shoplayer.co.kr/returns" },
  robots: { index: false, follow: false },
};

export default function ReturnsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="ShopLayer 홈페이지">
          <ShopLayerLogo decorative eager />
        </Link>
        <Link className={styles.back} href="/"><ArrowLeft size={16} aria-hidden="true" />홈페이지로</Link>
      </header>

      <article>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>SHIPPING &amp; RETURNS</p>
          <h1>반품 및 환불 정책</h1>
          <p className={styles.intro}>샵레이어에서 판매하는 의류 상품의 국내 배송, 반품 및 환불 기준을 안내합니다.</p>
          <p className={styles.updated}>시행일 <time dateTime="2026-11-09">2026년 11월 9일</time></p>
        </div>

        <dl className={styles.summary} aria-label="반품·환불 주요 기준">
          <div><dt>단순 변심 신청</dt><dd>수령 후 <strong>7일 이내</strong></dd></div>
          <div><dt>기본 반품 배송비</dt><dd>편도 <strong>3,000원</strong></dd></div>
          <div><dt>환불 처리</dt><dd>반품 수령 후 <strong>3영업일 이내</strong></dd></div>
        </dl>
        <p className={styles.summaryNote}>불량·오배송의 신청 기간과 비용은 아래 별도 기준을 적용합니다.</p>

        <div className={styles.sections}>
          <section aria-labelledby="shipping">
            <h2 id="shipping"><span>01</span>배송비 안내</h2>
            <ul>
              <li>주문 상품 금액이 <strong>50,000원 이상이면 무료배송</strong>입니다.</li>
              <li>50,000원 미만인 주문의 배송비는 <strong>3,000원</strong>입니다.</li>
              <li>본 정책은 대한민국 내 배송되는 의류 상품에 적용됩니다.</li>
            </ul>
          </section>

          <section aria-labelledby="window">
            <h2 id="window"><span>02</span>반품 신청 기간</h2>
            <h3>단순 변심 · 사이즈 · 색상 변경</h3>
            <p>원칙적으로 상품을 받은 날부터 7일 이내 반품을 신청할 수 있습니다. 계약내용에 관한 서면을 상품보다 늦게 받은 경우에는 그 서면을 받은 날부터 계산합니다. 판매자 정보 미제공이나 청약철회 방해 등 법에서 별도로 정한 사유가 있는 경우에는 해당 법정 기간을 적용합니다.</p>
            <h3>상품 불량 · 오배송 · 표시된 내용과 다른 상품</h3>
            <p>상품을 받은 날부터 3개월 이내이면서, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 반품을 요청할 수 있습니다. 이 경우 반품에 필요한 배송비는 샵레이어가 부담합니다.</p>
          </section>

          <section aria-labelledby="process">
            <h2 id="process"><span>03</span>반품 신청 방법</h2>
            <ol>
              <li><a href={contactHref}>{contactEmail}</a>로 주문번호, 주문자명, 반품할 상품·수량, 반품 사유를 보내주세요. 주문번호를 모르는 경우 주문 확인에 필요한 정보를 알려주시면 안내합니다.</li>
              <li>불량이나 오배송은 사진을 첨부하면 확인에 도움이 됩니다. 사진 제출이 법정 청약철회의 필수 조건은 아닙니다.</li>
              <li>이메일로 안내받은 상세 반품 주소와 수거 방법을 확인하고, 상품과 구성품을 안전하게 포장해 보내주세요.</li>
              <li>샵레이어는 상품을 반환받은 날부터 3영업일 이내 환불을 처리합니다.</li>
            </ol>
            <p className={styles.note}>신청 안내와 회수 절차는 소비자의 법정 청약철회 기간이나 권리를 제한하지 않습니다. 교환을 원하시면 같은 이메일로 문의해 주세요. 교환 가능 여부와 방법은 상품 재고를 확인한 뒤 안내합니다.</p>
          </section>

          <section aria-labelledby="fees">
            <h2 id="fees"><span>04</span>반품 배송비</h2>
            <div className={styles.tableWrap}>
              <table>
                <caption>반품 사유와 배송 조건에 따른 고객 부담액</caption>
                <thead><tr><th scope="col">반품 조건</th><th scope="col">고객 부담</th></tr></thead>
                <tbody>
                  <tr><th scope="row">불량·오배송·계약내용과 다른 상품</th><td><strong>0원</strong><span>샵레이어 부담</span></td></tr>
                  <tr><th scope="row">단순 변심 · 최초 배송비를 이미 낸 주문</th><td><strong>3,000원</strong><span>반품 편도 배송비</span></td></tr>
                  <tr><th scope="row">단순 변심 · 무료배송 주문 전체 반품</th><td><strong>6,000원</strong><span>최초 배송비 3,000원 + 반품 배송비 3,000원</span></td></tr>
                  <tr><th scope="row">단순 변심 · 무료배송 주문 일부 반품 후 남은 상품 금액이 50,000원 이상</th><td><strong>3,000원</strong><span>무료배송 조건 유지</span></td></tr>
                  <tr><th scope="row">단순 변심 · 무료배송 주문 일부 반품 후 남은 상품 금액이 50,000원 미만</th><td><strong>6,000원</strong><span>무료배송 조건 미충족 · 최초 배송비 포함</span></td></tr>
                </tbody>
              </table>
            </div>
            <p className={styles.note}>이미 납부한 배송비는 중복 청구하지 않습니다. 반품 비용과 정산 방법은 접수 시 안내하며, 반품을 이유로 별도의 위약금이나 재입고 수수료를 부과하지 않습니다.</p>
          </section>

          <section aria-labelledby="conditions">
            <h2 id="conditions"><span>05</span>반품이 제한될 수 있는 경우</h2>
            <p>다음과 같이 법령에서 인정하는 사유가 있는 경우에 한해 단순 변심 반품이 제한될 수 있습니다. 사전 고지 등 법에서 요구하는 요건을 갖춘 경우에 적용합니다.</p>
            <ul>
              <li>소비자에게 책임이 있는 사유로 상품이 분실되거나 훼손된 경우</li>
              <li>착용·세탁·수선·오염 등으로 상품 가치가 현저히 감소한 경우</li>
              <li>시간이 지나 재판매가 곤란할 정도로 상품 가치가 현저히 감소한 경우</li>
            </ul>
            <p>상품 확인을 위한 포장 개봉이나 단순한 상태·사이즈 확인만으로 반품을 제한하지 않습니다. 세일 상품, 흰색 의류 또는 택 제거 등의 사유만으로 일률적으로 반품을 거절하지 않으며, 상품 상태와 관계 법령에 따라 판단합니다. 불량·오배송 등의 법정 청약철회 권리는 별도로 보장합니다.</p>
          </section>

          <section aria-labelledby="refund">
            <h2 id="refund"><span>06</span>환불 방법과 처리 시기</h2>
            <ul>
              <li>반품 상품을 반환받은 날부터 <strong>3영업일 이내</strong> 대금을 환급합니다. 내부 검수 완료일을 기준으로 환불 기한을 늦추지 않습니다.</li>
              <li>신용카드 등으로 결제한 경우 지체 없이 결제 취소 또는 환급에 필요한 조치를 진행합니다. 카드사·결제기관의 명세서 반영 시점은 해당 기관의 처리 일정에 따라 달라질 수 있습니다.</li>
              <li>아직 상품을 공급하지 않은 주문은 청약철회한 날부터 3영업일 이내 환불합니다. 이미 발송된 상품은 반품 절차에 따라 처리합니다.</li>
              <li>구매자가 부담할 반품 배송비가 있으면 금액과 정산 방법을 안내한 뒤 처리합니다.</li>
            </ul>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact"><span>07</span>반품 접수 및 문의</h2>
            <div className={styles.contactCard}>
              <dl>
                <div><dt>판매자</dt><dd>샵레이어 (ShopLayer)</dd></div>
                <div><dt>문의 이메일</dt><dd><a href={contactHref}>{contactEmail}</a></dd></div>
                <div><dt>반품 주소 안내</dt><dd>강남구 신사동 블루마운틴 빌딩 2층</dd></div>
              </dl>
              <p>반품 접수 후 상세 도로명 주소와 수거 방법을 이메일로 안내합니다. 오배송을 방지할 수 있도록 발송 전에 상세 주소를 확인해 주세요.</p>
              <a className={styles.contactButton} href={contactHref}><Mail size={18} aria-hidden="true" />이메일로 반품 문의<ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <p>본 정책은 「전자상거래 등에서의 소비자보호에 관한 법률」에 따른 소비자의 권리를 제한하지 않습니다. 법령 또는 개별 약정에 소비자에게 더 유리한 기준이 있는 경우 그 기준을 적용합니다.</p>
          <a href="https://law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsId=009318&lsJoLnkSeq=1000527255&print=print" target="_blank" rel="noopener noreferrer">관련 법령 확인 (새 창)<ArrowUpRight size={14} aria-hidden="true" /></a>
          <p className={styles.copyright}>ShopLayer © All rights reserved</p>
        </footer>
      </article>
    </main>
  );
}
