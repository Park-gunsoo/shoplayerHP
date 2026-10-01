import type { Locale } from "@/content/site-content";

export type NewsCase = {
  id: string;
  country: "KR" | "JP" | "US";
  countryLabel: string;
  brand: string;
  media: string;
  date: string;
  summary: string;
  metric: { value: string; label: string };
  comparison: string;
  caveat: string;
  sourceUrl: string;
  graph: {
    baseline: number;
    result: number;
    baselineLabel: string;
    resultLabel: string;
    axisLabel: string;
  };
};

// Each pair visualizes the precise comparison reported by its linked article.
// A numeric floor such as ">4×" is graphed at 4 and labelled as a lower bound.
export const newsCases: Record<Locale, NewsCase[]> = {
  ko: [
    {
      id: "cj-onstyle",
      country: "KR",
      countryLabel: "한국",
      brand: "CJ온스타일",
      media: "전자신문",
      date: "2026-07-01",
      summary:
        "상품명에 고객이 쓰는 표현을 반영하고 리뷰 정보를 AI 추천에 활용하도록 상품 데이터를 정비했습니다. 보도에 따르면 ChatGPT·Gemini를 통한 유입이 2026년 1월 대비 6월에 4배 이상 늘었습니다.",
      metric: { value: "4배 이상", label: "AI 경유 유입" },
      comparison: "2026년 6월 유입 vs 2026년 1월 유입",
      caveat: "전후 비교이며 대조군이 없어 상품 데이터 정비만의 효과로 단정할 수 없습니다.",
      sourceUrl: "https://www.etnews.com/20260701000357",
      graph: {
        baseline: 1,
        result: 4,
        baselineLabel: "1월 1",
        resultLabel: "6월 4 이상",
        axisLabel: "AI 경유 유입 상대 지수 · 1월=1, 6월은 기사상 하한",
      },
    },
    {
      id: "osulloc",
      country: "KR",
      countryLabel: "한국",
      brand: "오설록몰",
      media: "조선비즈",
      date: "2026-04-12",
      summary:
        "GEO 컨설팅과 시스템 변화를 진행한 사례입니다. 2025년 4분기 AI 경유 유입은 전년 동기 대비 602%, 구매전환율은 725% 증가했다고 보도됐습니다.",
      metric: { value: "+602%", label: "AI 경유 유입" },
      comparison: "2025년 4분기 vs 2024년 4분기",
      caveat: "기사에는 원래 유입량·전환율과 대조군이 없어 증가분 전체를 최적화의 인과 효과로 해석할 수 없습니다.",
      sourceUrl: "https://biz.chosun.com/distribution/channel/2026/04/12/CJGUFYQITNBYVDLUQDU7QASFLA/?outputType=amp",
      graph: {
        baseline: 100,
        result: 702,
        baselineLabel: "2024년 4분기 100",
        resultLabel: "2025년 4분기 702",
        axisLabel: "AI 경유 유입 상대 지수 · 전년 동기=100",
      },
    },
    {
      id: "honeys",
      country: "JP",
      countryLabel: "일본",
      brand: "하니즈",
      media: "ネットショップ担当者フォーラム",
      date: "2026-05-22",
      summary:
        "패션 상품 정보와 이용 행동을 바탕으로 AI가 탐색용 해시태그를 생성했습니다. 2026년 3월 해시태그 경유 방문자의 구매전환율은 비경유 방문자의 약 2.5배로 보도됐습니다.",
      metric: { value: "약 2.5배", label: "구매전환율" },
      comparison: "2026년 3월 해시태그 경유 방문자 vs 비경유 방문자",
      caveat: "같은 달의 서로 다른 방문자 집단 비교입니다. 도입 전후 개선율이나 AI의 인과 효과로 읽어서는 안 됩니다.",
      sourceUrl: "https://netshop.impress.co.jp/n/2026/05/22/16079",
      graph: {
        baseline: 1,
        result: 2.5,
        baselineLabel: "비경유 1",
        resultLabel: "경유 약 2.5",
        axisLabel: "방문자 집단별 구매전환율 상대 비율 · 비경유=1",
      },
    },
    {
      id: "sakazen",
      country: "JP",
      countryLabel: "일본",
      brand: "사카젠",
      media: "マイナビ TECH+",
      date: "2026-08-21",
      summary:
        "실제 착용 사진을 바탕으로 AI 모델의 코디 이미지를 만들고 상품과의 일치 여부를 사람이 확인했습니다. 직원 코디 경유 구매전환율이 도입 전 2.8%에서 도입 후 5.0%로 바뀌었다고 보도됐습니다.",
      metric: { value: "2.8% → 5.0%", label: "코디 경유 구매전환율" },
      comparison: "AI 모델 도입 전 vs 도입 후 · 기사에 정확한 전환율 측정 기간 미기재",
      caveat: "AI 착용 이미지 활용 사례입니다. 기사에서는 같은 기간의 다른 변화가 전환율에 준 영향을 분리하지 않았습니다.",
      sourceUrl: "https://news.mynavi.jp/techplus/article/20260821-4838624/",
      graph: {
        baseline: 2.8,
        result: 5.0,
        baselineLabel: "도입 전 2.8%",
        resultLabel: "도입 후 5.0%",
        axisLabel: "직원 코디 경유 구매전환율 (%)",
      },
    },
    {
      id: "michaels",
      country: "US",
      countryLabel: "미국",
      brand: "마이클스",
      media: "Digiday",
      date: "2026-07-27",
      summary:
        "공예용품 쇼핑몰에서 프로젝트와 예산을 묻는 AI 쇼핑 도우미를 운영했습니다. 도우미 이용자의 온라인 구매전환율이 기존 검색 이용자의 2배를 넘는다고 회사가 매체에 밝혔습니다.",
      metric: { value: "2배 초과", label: "구매전환율" },
      comparison: "AI 쇼핑 도우미 이용자 vs 기존 검색 이용자 · 2026년 7월 보도",
      caveat: "서로 다른 이용자 집단의 비교이며 절대 전환율·측정 기간은 기사에 공개되지 않았습니다.",
      sourceUrl: "https://digiday.com/marketing/michaels-claims-google-powered-ai-assistant-doubles-conversion-rate-of-traditional-search/",
      graph: {
        baseline: 1,
        result: 2,
        baselineLabel: "기존 검색 1",
        resultLabel: "AI 도우미 2 초과",
        axisLabel: "이용자 집단별 구매전환율 상대 비율 · 기존 검색=1, AI는 기사상 하한",
      },
    },
    {
      id: "mars-wrigley",
      country: "US",
      countryLabel: "미국",
      brand: "마스 리글리",
      media: "Modern Retail",
      date: "2025-12-18",
      summary:
        "미국 온라인 마켓플레이스의 상품 목록을 AI 검색에 맞게 정비하는 실험을 진행했습니다. 회사 담당자는 대상 6개 브랜드의 검색 가시성이 평균 8% 증가했다고 밝혔습니다.",
      metric: { value: "+8%", label: "검색 가시성" },
      comparison: "대상 6개 브랜드의 평균 검색 가시성 · 2025년 12월 보도",
      caveat: "기사에 측정 도구·기간·기준값이 공개되지 않았습니다. 검색 가시성 수치이며 매출 증가 수치가 아닙니다.",
      sourceUrl: "https://www.modernretail.co/technology/marketplace-briefing-how-amazon-sellers-are-rewriting-product-listings-to-show-up-in-ai-search/",
      graph: {
        baseline: 100,
        result: 108,
        baselineLabel: "기준 100",
        resultLabel: "보도 결과 108",
        axisLabel: "검색 가시성 상대 지수 · 기준=100, 기준 기간 미공개",
      },
    },
  ],
  ja: [
    {
      id: "cj-onstyle",
      country: "KR",
      countryLabel: "韓国",
      brand: "CJオンスタイル",
      media: "電子新聞",
      date: "2026-07-01",
      summary:
        "商品名に顧客が使う表現を取り入れ、レビュー情報をAIの推薦に活用できるよう商品データを整備しました。報道によると、ChatGPT・Geminiからの流入は2026年1月に比べて6月に4倍以上となりました。",
      metric: { value: "4倍以上", label: "AI経由の流入" },
      comparison: "2026年6月の流入と2026年1月の流入を比較",
      caveat: "導入前後の比較であり、対照群がないため商品データ整備だけの効果とは断定できません。",
      sourceUrl: "https://www.etnews.com/20260701000357",
      graph: {
        baseline: 1,
        result: 4,
        baselineLabel: "1月 1",
        resultLabel: "6月 4以上",
        axisLabel: "AI経由流入の相対指数 · 1月=1、6月は報道上の下限",
      },
    },
    {
      id: "osulloc",
      country: "KR",
      countryLabel: "韓国",
      brand: "オソルロクモール",
      media: "朝鮮ビズ",
      date: "2026-04-12",
      summary:
        "GEOに関するコンサルティングとシステムの変更を進めた事例です。2025年10～12月のAI経由流入は前年同期比602％増、購入転換率は725％増と報じられました。",
      metric: { value: "+602%", label: "AI経由の流入" },
      comparison: "2025年10～12月と2024年10～12月を比較",
      caveat: "記事には元の流入数・転換率と対照群が示されておらず、増加分すべてを最適化の因果効果とは解釈できません。",
      sourceUrl: "https://biz.chosun.com/distribution/channel/2026/04/12/CJGUFYQITNBYVDLUQDU7QASFLA/?outputType=amp",
      graph: {
        baseline: 100,
        result: 702,
        baselineLabel: "前年同期 100",
        resultLabel: "2025年10～12月 702",
        axisLabel: "AI経由流入の相対指数 · 前年同期=100",
      },
    },
    {
      id: "honeys",
      country: "JP",
      countryLabel: "日本",
      brand: "ハニーズ",
      media: "ネットショップ担当者フォーラム",
      date: "2026-05-22",
      summary:
        "商品情報と利用行動をもとに、AIが商品探索用のハッシュタグを生成しました。2026年3月にハッシュタグ経由で訪れた人の購入転換率は、非経由の人の約2.5倍と報じられました。",
      metric: { value: "約2.5倍", label: "購入転換率" },
      comparison: "2026年3月のハッシュタグ経由訪問者と非経由訪問者を比較",
      caveat: "同月の異なる訪問者群の比較です。導入前後の改善率やAIの因果効果を示すものではありません。",
      sourceUrl: "https://netshop.impress.co.jp/n/2026/05/22/16079",
      graph: {
        baseline: 1,
        result: 2.5,
        baselineLabel: "非経由 1",
        resultLabel: "経由 約2.5",
        axisLabel: "訪問者群別の購入転換率比 · 非経由=1",
      },
    },
    {
      id: "sakazen",
      country: "JP",
      countryLabel: "日本",
      brand: "サカゼン",
      media: "マイナビ TECH+",
      date: "2026-08-21",
      summary:
        "実際の着用写真をもとにAIモデルのコーディネート画像を作り、商品との整合性を人が確認しました。スタッフコーディネート経由の購入転換率は、導入前の2.8％から導入後の5.0％になったと報じられました。",
      metric: { value: "2.8% → 5.0%", label: "コーディネート経由の購入転換率" },
      comparison: "AIモデル導入前と導入後 · 転換率の詳しい計測期間は記事に記載なし",
      caveat: "AI着用画像を活用した事例です。記事では同時期の他の変化による影響は切り分けられていません。",
      sourceUrl: "https://news.mynavi.jp/techplus/article/20260821-4838624/",
      graph: {
        baseline: 2.8,
        result: 5.0,
        baselineLabel: "導入前 2.8%",
        resultLabel: "導入後 5.0%",
        axisLabel: "スタッフコーディネート経由の購入転換率 (%)",
      },
    },
    {
      id: "michaels",
      country: "US",
      countryLabel: "米国",
      brand: "マイケルズ",
      media: "Digiday",
      date: "2026-07-27",
      summary:
        "クラフト用品のECサイトで、用途や予算を尋ねるAIショッピングアシスタントを運用しました。アシスタント利用者のオンライン購入転換率は、従来の検索利用者の2倍を超えると、同社がメディアに説明しました。",
      metric: { value: "2倍超", label: "購入転換率" },
      comparison: "AIショッピングアシスタント利用者と従来の検索利用者を比較 · 2026年7月報道",
      caveat: "異なる利用者群の比較で、絶対転換率と計測期間は記事に公開されていません。",
      sourceUrl: "https://digiday.com/marketing/michaels-claims-google-powered-ai-assistant-doubles-conversion-rate-of-traditional-search/",
      graph: {
        baseline: 1,
        result: 2,
        baselineLabel: "従来検索 1",
        resultLabel: "AI利用 2超",
        axisLabel: "利用者群別の購入転換率比 · 従来検索=1、AIは報道上の下限",
      },
    },
    {
      id: "mars-wrigley",
      country: "US",
      countryLabel: "米国",
      brand: "マース・リグレー",
      media: "Modern Retail",
      date: "2025-12-18",
      summary:
        "米国のオンラインモールで、商品リスティングをAI検索に合わせて見直す実験を行いました。同社担当者によると、対象となった6ブランドの検索上の可視性は平均8％上昇しました。",
      metric: { value: "+8%", label: "検索上の可視性" },
      comparison: "対象6ブランドの検索可視性の平均 · 2025年12月報道",
      caveat: "記事には測定方法・期間・元の数値がありません。検索可視性の数値であり、売上増加を示すものではありません。",
      sourceUrl: "https://www.modernretail.co/technology/marketplace-briefing-how-amazon-sellers-are-rewriting-product-listings-to-show-up-in-ai-search/",
      graph: {
        baseline: 100,
        result: 108,
        baselineLabel: "基準 100",
        resultLabel: "報道結果 108",
        axisLabel: "検索可視性の相対指数 · 基準=100、基準期間は未公表",
      },
    },
  ],
};
