import { shopLayerFaq } from "./shoplayer-faq";

export type Locale = 'ko' | 'ja';

export type SectionId = 'trend' | 'platforms' | 'cases' | 'definition' | 'features' | 'feed' | 'faq' | 'closing';

export type SourceCard = {
  id: string;
  title: string;
  date: string;
  scope: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
  takeaway?: string;
  disclaimer?: string;
};

export type FeatureCard = {
  id: string;
  number: string;
  title: string;
  status: string;
  input: string;
  work: string;
  result: string;
  note?: string;
  planned?: string;
};

export type SiteContent = {
  meta: { title: string; description: string };
  nav: {
    items: { id: SectionId; label: string }[];
    languageLabel: string;
    contactLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    serviceNote: string;
    primaryLabel: string;
    secondaryLabel: string;
    visualLabel: string;
    visualSteps: string[];
    visualNote: string;
  };
  trend: {
    eyebrow: string;
    title: string;
    description: string;
    beforeLabel: string;
    beforeExample: string;
    afterLabel: string;
    afterExample: string;
    conclusion: string;
  };
  platforms: {
    eyebrow: string;
    title: string;
    description: string;
    cards: SourceCard[];
    note: string;
  };
  cases: {
    eyebrow: string;
    title: string;
    description: string;
    disclaimer: string;
    cards: SourceCard[];
  };
  definition: {
    eyebrow: string;
    title: string;
    description: string;
    flowLabel: string;
    flows: {
      id: string;
      title: string;
      description: string;
      steps: string[];
      result: string;
      note: string;
    }[];
    exampleLabel: string;
    exampleStages: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    labels: { input: string; work: string; result: string; planned: string };
    cards: FeatureCard[];
  };
  feed: {
    eyebrow: string;
    title: string;
    description: string;
    sourceLabel: string;
    sourceDescription: string;
    lifecycleLabel: string;
    steps: { number: string; title: string; description: string }[];
    channelsLabel: string;
    channels: { id: string; name: string; description: string }[];
    outputLabel: string;
    outputDescription: string;
    boundaryLabel: string;
    boundaryDescription: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    contactStatus: string;
    note: string;
  };
  footer: {
    description: string;
  };
};

export const siteContent: Record<Locale, SiteContent> = {
  ko: {
    meta: {
      title: 'ShopLayer | 쇼핑몰 AI 최적화 커머스 에이전트',
      description:
        'ShopLayer는 쇼핑몰 AI 최적화 커머스 에이전트입니다. 쇼핑몰과 상품·이미지 데이터를 분석하고, 단일 상품 피드를 바탕으로 GPT Ads·Google·네이버·Meta·TikTok·카카오 채널을 운영합니다.',
    },
    nav: {
      items: [
        { id: 'trend', label: '쇼핑의 변화' },
        { id: 'platforms', label: '시장 동향' },
        { id: 'cases', label: 'AI 커머스 사례' },
        { id: 'definition', label: 'ShopLayer' },
        { id: 'features', label: '기능' },
        { id: 'feed', label: '통합 피드' },
        { id: 'faq', label: 'FAQ' },
        { id: 'closing', label: '문의' },
      ],
      languageLabel: '언어',
      contactLabel: 'ShopLayer 신청하기',
    },
    hero: {
      eyebrow: 'SHOPLAYER · COMMERCE AI AGENT',
      title: 'ShopLayer는 쇼핑몰 AI 최적화 커머스 에이전트입니다.',
      description:
        'ShopLayer는 쇼핑몰과 상품의 정보를 분석해 AI가 이해하기 쉬운 구조로 최적화합니다. 사람이 근거를 확인해 개선안을 확정하고, 단일 피드에서 수집한 상품 정보를 여러 마케팅 채널에 맞춰 생성·갱신합니다.',
      serviceNote: '커머스 AI 최적화 에이전트 ShopLayer',
      primaryLabel: 'ShopLayer 신청하기',
      secondaryLabel: '',
      visualLabel: 'AI 쇼핑 경험',
      visualSteps: ['쇼핑 질문', '상품 정보 비교', '상품 카드'],
      visualNote: '',
    },
    trend: {
      eyebrow: 'THE SHIFT',
      title: '짧은 검색어에도, AI는 쇼핑의 맥락을 읽습니다.',
      description:
        '쇼핑객은 여전히 상품명을 검색합니다. AI 쇼핑은 여기에 대화에서 드러난 취향·예산·사용 상황을 더해 상품을 비교합니다. 같은 “베이지 바지”라도 누구에게, 언제 필요한지에 따라 어울리는 상품은 달라집니다. 소재·핏·색상·활용 장면까지 정확하게 설명하는 상품 데이터가 중요해지는 이유입니다.',
      beforeLabel: '짧은 검색어',
      beforeExample: '“베이지 바지”를 검색해 상품을 살펴봅니다.',
      afterLabel: '맥락에 맞춘 탐색',
      afterExample: '흩어진 상품 설명과 이미지, 가격, 리뷰를 AI가 모아 이해하고, 사용자의 상황과 취향에 맞는 상품을 추천합니다.',
      conclusion: 'ShopLayer는 AI가 상품을 비교하고 추천할 때 참고할 정보를 더 정확하고 풍부하게 만듭니다.',
    },
    platforms: {
      eyebrow: 'MARKET SIGNALS',
      title: '구글과 네이버도 쇼핑 탐색 방식을 바꾸고 있습니다.',
      description:
        '대화형 탐색과 상품 정보의 활용이 확대되고 있습니다. 각 회사의 발표 범위와 시점을 구분해 보고, 왜 정확한 커머스 데이터가 필요한지 살펴봅니다.',
      cards: [
        {
          id: 'google-ai-mode',
          title: 'Google Search AI Mode',
          date: '2025.11.13 발표',
          scope: '대화형 쇼핑 탐색 발표 · 일부 구매 기능은 당시 미국의 적격 판매자 대상',
          description:
            '고객이 원하는 것을 자연어로 설명하면 이미지와 가격, 리뷰, 재고 등의 정보를 함께 보여주고 비교를 돕는 쇼핑 경험을 소개했습니다.',
          sourceLabel: 'Google 공식 발표',
          sourceUrl:
            'https://blog.google/products-and-platforms/products/shopping/agentic-checkout-holiday-ai-shopping/',
        },
        {
          id: 'google-merchant-center',
          title: 'Google Merchant Center',
          date: '2026.01.11 발표',
          scope: '새 상품 속성 예고 · 당시 소수 판매자부터 순차 도입 계획',
          description:
            '일반적인 상품 정보에 더해 자주 묻는 질문의 답, 호환 액세서리와 대체 상품 등 대화형 탐색에 도움이 되는 속성을 발표했습니다.',
          sourceLabel: 'Google 공식 발표',
          sourceUrl:
            'https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/',
        },
        {
          id: 'naver-shopping-agent',
          title: '네이버 쇼핑 AI 에이전트',
          date: '2026.02.26 베타 발표',
          scope: '네이버플러스 스토어 앱 · 초기 디지털·리빙·생활 카테고리 중심',
          description:
            '상품 정보 요약과 비교, 리뷰 분석을 바탕으로 탐색을 돕는 베타 기능을 공개했습니다. 적용 카테고리와 기능은 단계적 확대 계획으로 발표됐습니다.',
          sourceLabel: 'NAVER 공식 보도자료',
          sourceUrl: 'https://navercorp.com/media/pressReleasesDetail?seq=34353',
        },
      ],
      note: '',
    },
    cases: {
      eyebrow: 'AI COMMERCE IN PRACTICE',
      title: 'AI 커머스의 변화, 국내와 글로벌 시장이 빠르게 대응하고 있습니다.',
      description:
        'AI를 활용한 상품 탐색과 추천은 일상적인 쇼핑 경험으로 자리 잡고 있습니다. 한국·일본·미국의 실제 보도를 통해 적용 방식과 확인된 변화를 살펴보세요.',
      disclaimer: '언론 보도 발췌 · 수치는 각 기사 기준',
      cards: [],
    },
    definition: {
      eyebrow: 'WHAT SHOPLAYER DOES',
      title: 'ShopLayer는 쇼핑몰과 상품·이미지 데이터를 깊이 분석하고 개선합니다.',
      description:
        'ShopLayer 에이전트는 사이트의 검색 접근성과 브랜드 메시지, 상품 상세와 이미지에 담긴 정보를 함께 살핍니다. 분석 결과와 AI 제안을 사람이 검토·확정해 쇼핑몰과 상품의 정보 품질을 높이고, 상품 피드는 각 채널의 규격에 맞춰 운영합니다.',
      flowLabel: '분석부터 멀티 채널 운영까지',
      flows: [
        {
          id: 'selected-optimization',
          title: '사이트와 상품을 이해하고 개선',
          description: '쇼핑몰의 공개 정보와 선택한 상품·이미지를 함께 분석해 AI가 이해하는 내용과 브랜드가 전달하려는 내용을 비교합니다.',
          steps: ['쇼핑몰 URL·기본정보 등록', '사이트 구조·브랜드 진단', '상품·이미지 정보 분석', '운영자 검토·최종 확정'],
          result: '근거와 함께 확정한 상품 정보를 ShopLayer에 저장하고, 쇼핑몰 개선 작업에 활용합니다.',
          note: '',
        },
        {
          id: 'catalog-feed',
          title: '하나의 피드로 채널 운영을 확장',
          description: '단일 상품 피드 링크에서 카탈로그를 동기화하고, 공통 상품 정보를 마케팅 채널별 형식에 맞춰 운영합니다.',
          steps: ['상품 피드 링크 연결', '상품 데이터 수집·정리', '여섯 채널용 피드 생성', '예약 갱신·운영 현황 확인'],
          result: '채널별 게시 상품과 갱신 상태, 오류 이력을 한곳에서 관리합니다.',
          note: '',
        },
      ],
      exampleLabel: '',
      exampleStages: [],
    },
    features: {
      eyebrow: 'CAPABILITIES',
      title: '쇼핑몰부터 상품 이미지까지, 이해할 수 있는 데이터로 바꿉니다.',
      description: 'ShopLayer 에이전트는 사이트와 상품을 파악·분석합니다. 사람이 근거를 검토해 확정한 정보로 쇼핑몰과 상품을 개선하는 과정을 살펴보세요.',
      labels: { input: '분석 대상', work: 'ShopLayer 분석', result: '활용 결과', planned: '확장 기능' },
      cards: [
        {
          id: 'store',
          number: '01',
          title: '쇼핑몰 최적화',
          status: '사이트 진단',
          input: '쇼핑몰 URL과 브랜드 기본 정보',
          work: '공개 페이지의 메타 정보·구조화 데이터·robots.txt·사이트맵을 점검하고, AI가 파악한 브랜드 모습과 운영 의도를 비교합니다.',
          result: '검색 접근 환경과 브랜드 전달의 차이를 근거별로 정리해 개선 우선순위를 제안합니다.',
        },
        {
          id: 'product',
          number: '02',
          title: '상품 최적화',
          status: '상품 정보 개선',
          input: '분석할 쇼핑몰·카테고리·상품 URL과 상품 기본 정보',
          work: '선택한 상품의 상세 정보와 이미지·옵션을 살펴 확인된 사실을 추출하고, 상품명·설명·검색 문구의 개선안을 제안합니다.',
          result: '사람이 검토·확정한 정보는 ShopLayer에 버전별로 저장하고, 쇼핑몰 개선과 채널별 피드 최적화에 검토 후 활용합니다.',
        },
        {
          id: 'image',
          number: '03',
          title: '이미지 정보 최적화',
          status: '이미지 정보 분석',
          input: '선택한 대표·추가·옵션·상세 상품 이미지',
          work: '이미지에 실제 보이는 색상·형태·문구와 상품 특징을 살펴 ALT 문구와 상품 정보 후보를 제안합니다. 긴 상세 이미지는 구간별로 확인합니다.',
          result: '검토·확정한 이미지별 ALT와 상품 특징을 상품 개선의 근거로 축적합니다.',
        },
        {
          id: 'feed',
          number: '04',
          title: '통합 피드 최적화',
          status: '멀티 채널 운영',
          input: '하나의 상품 피드 링크와 선택 카테고리·채널',
          work: '상품 데이터를 한곳에 수집·정리하고, GPT Ads·Google·네이버·Meta·TikTok·카카오의 규격에 맞는 피드를 생성·갱신합니다.',
          result: '채널별 게시 상품·Hosted URL·갱신 일정과 오류 이력을 하나의 화면에서 관리합니다.',
        },
        {
          id: 'report',
          number: '05',
          title: '리포트 및 분석',
          status: '운영 인사이트',
          input: '사이트 진단·상품 수집·채널별 피드 실행 데이터',
          work: '쇼핑몰별 진단 현황과 신규·변경 상품, 채널별 게시·제외·오류 상태를 모아 변화의 흐름을 보여줍니다.',
          result: '운영 현황과 작업 이력을 바탕으로 확인이 필요한 상품과 다음 개선 작업을 찾습니다.',
        },
        {
          id: 'operations',
          number: '06',
          title: '운영관리',
          status: '운영 워크플로',
          input: '여러 쇼핑몰의 진단 작업·확정 상품·채널별 일정',
          work: 'ShopLayer 팀이 쇼핑몰별 분석 범위, 검토·확정 단계, 프롬프트 버전과 수집·게시 일정을 한 흐름으로 관리합니다.',
          result: '원본 변경과 작업 진행, 예약 갱신·실패 대응 이력을 연결해 반복 업무를 안정적으로 운영합니다.',
        },
      ],
    },
    feed: {
      eyebrow: 'UNIFIED FEED MANAGER',
      title: '하나의 상품 피드로, 멀티 플랫폼 마케팅 채널 운영이 가능합니다.',
      description:
        '상품 피드 링크 하나를 연결하면 ShopLayer가 상품 정보를 수집·정리하고 GPT Ads·Google·네이버·Meta·TikTok·카카오에 맞는 피드를 생성합니다. 정해진 일정에 따라 신규·변경 상품을 갱신하고, 게시 상태와 오류 이력을 한곳에서 관리합니다.',
      sourceLabel: '하나의 상품 피드 링크',
      sourceDescription:
        '상품번호·상품명·가격·판매 상태·이미지 등 핵심 정보를 공통 상품 데이터로 정리합니다. 필요한 상세 정보는 공개 상품 페이지에서 보충하고, 확정된 최적화 정보는 채널별 기준에 맞춰 반영합니다.',
      lifecycleLabel: '한 번 연결하고, 채널별로 운영합니다',
      steps: [
        { number: '01', title: '상품 피드 연결', description: '하나의 상품 피드 링크에서 전체 상품 정보를 수집해 공통 데이터로 정리합니다.' },
        { number: '02', title: '채널별 피드 생성', description: '전체 상품 또는 선택 카테고리를 각 마케팅 채널의 규격에 맞춰 검증·생성합니다.' },
        { number: '03', title: '예약 시간에 갱신', description: '수집과 게시 일정을 설정해 최신 상품 정보를 정해진 시간에 반영합니다.' },
        { number: '04', title: '변경 사항 추적', description: '새 상품과 가격·재고·설명 변경을 비교하고, 수집·생성·오류 이력을 남깁니다.' },
      ],
      channelsLabel: '하나의 데이터로 연결하는 다양한 마케팅 채널',
      channels: [
        { id: 'gpt', name: 'GPT Ads', description: 'GPT Ads 상품 피드' },
        { id: 'naver', name: '네이버쇼핑', description: '네이버쇼핑 EP' },
        { id: 'google', name: 'Google Merchant', description: 'Google 상품 피드' },
        { id: 'meta', name: 'Meta Catalog', description: 'Meta 상품 카탈로그' },
        { id: 'tiktok', name: 'TikTok Catalog', description: 'TikTok 상품 카탈로그' },
        { id: 'kakao', name: '카카오모먼트', description: '카카오 상품 피드' },
      ],
      outputLabel: '채널 운영을 한눈에',
      outputDescription: '채널별 게시 상품, Hosted URL, 최근 갱신과 제외·오류 항목을 한곳에서 확인합니다.',
      boundaryLabel: '변경을 놓치지 않는 일정 관리',
      boundaryDescription: '원본에서 달라진 상품을 확인하고, 예약한 시간에 채널별 피드를 갱신합니다.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'ShopLayer에 대해 자주 묻는 질문',
      description: 'ShopLayer의 최적화, 피드 운영, 사람의 검수, 캠페인과 모니터링을 구체적으로 소개합니다.',
      items: shopLayerFaq.ko,
    },
    closing: {
      eyebrow: 'SHOPLAYER · THE NEXT COMMERCE DATA',
      title: 'AI 쇼핑의 다음 선택은, 더 정확한 상품 데이터에서 시작됩니다.',
      description: '쇼핑몰 진단부터 상품 정보 개선, 멀티 채널 피드 운영까지. ShopLayer와 함께 고객과 AI가 모두 이해할 수 있는 커머스 데이터를 만드세요.',
      contactStatus: '',
      note: '',
    },
    footer: {
      description: 'ShopLayer는 AI와 사람이 함께 커머스 데이터를 최적화하고 멀티 플랫폼 운영을 돕는 에이전트입니다.',
    },
  },
  ja: {
    meta: {
      title: 'ShopLayer | ECサイトのAI最適化コマースエージェント',
      description:
        'ShopLayerはECサイトのAI最適化を支えるコマースエージェントです。サイト・商品・画像のデータを分析し、一つの商品フィードからGPT Ads・Google・NAVER・Meta・TikTok・Kakao向けの運用につなげます。',
    },
    nav: {
      items: [
        { id: 'trend', label: '買い物の変化' },
        { id: 'platforms', label: '市場動向' },
        { id: 'cases', label: 'AIコマース事例' },
        { id: 'definition', label: 'ShopLayer' },
        { id: 'features', label: '機能' },
        { id: 'feed', label: '統合フィード' },
        { id: 'faq', label: 'FAQ' },
        { id: 'closing', label: 'お問い合わせ' },
      ],
      languageLabel: '言語',
      contactLabel: 'ShopLayerに申し込む',
    },
    hero: {
      eyebrow: 'SHOPLAYER · COMMERCE AI AGENT',
      title: 'ShopLayerは、ECサイトのAI最適化を支えるコマースエージェントです。',
      description:
        'ShopLayerはECサイトと商品の情報を分析し、AIが理解しやすい構造へ整えます。根拠を人が確認して改善案を確定し、一つの商品フィードから取得した情報を複数のマーケティングチャネル向けに作成・更新します。',
      serviceNote: 'コマースAI最適化エージェント ShopLayer',
      primaryLabel: 'ShopLayerに申し込む',
      secondaryLabel: '',
      visualLabel: 'AIショッピング体験',
      visualSteps: ['買い物の相談', '商品情報の比較', '商品カード'],
      visualNote: '',
    },
    trend: {
      eyebrow: 'THE SHIFT',
      title: '短い検索語でも、AIは買い物の文脈を読み取ります。',
      description:
        '商品名による検索は、これからも買い物の入口です。AIショッピングでは、会話から分かる好み・予算・用途も踏まえて商品を比較できます。同じ「ベージュのパンツ」でも、使う人や場面によって適した商品は変わります。素材・シルエット・色・着用シーンまで正確に伝える商品データが重要です。',
      beforeLabel: '短い検索語',
      beforeExample: '「ベージュのパンツ」を検索して商品を探します。',
      afterLabel: '文脈に合う商品探し',
      afterExample: '散らばった商品説明・画像・価格・レビューをAIが集めて理解し、買い物の状況や好みに合う商品をおすすめします。',
      conclusion: 'ShopLayerは、AIが商品を比較・推薦するときに参照する情報を、より正確で豊かに整えます。',
    },
    platforms: {
      eyebrow: 'MARKET SIGNALS',
      title: 'GoogleとNAVERも、商品の探し方を変えています。',
      description:
        '対話型の商品探索と商品情報の活用が広がっています。各社の発表時点と提供範囲を分け、正確なコマースデータがなぜ必要かを見ていきます。',
      cards: [
        {
          id: 'google-ai-mode',
          title: 'Google Search AI Mode',
          date: '2025.11.13 発表',
          scope: '対話型の商品探索を発表 · 一部の購入機能は発表時点で米国の対象販売者向け',
          description:
            '探している商品を自然な言葉で伝えると、画像、価格、レビュー、在庫などの情報をまとめて表示し、比較を助ける買い物体験を紹介しました。',
          sourceLabel: 'Google公式発表',
          sourceUrl:
            'https://blog.google/products-and-platforms/products/shopping/agentic-checkout-holiday-ai-shopping/',
        },
        {
          id: 'google-merchant-center',
          title: 'Google Merchant Center',
          date: '2026.01.11 発表',
          scope: '新しい商品属性を予告 · 発表時点では少数の販売者から段階的に導入予定',
          description:
            '従来の商品情報に加え、よくある商品質問への回答、対応アクセサリー、代替商品など、対話型の探索に役立つ属性を発表しました。',
          sourceLabel: 'Google公式発表',
          sourceUrl:
            'https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/',
        },
        {
          id: 'naver-shopping-agent',
          title: 'NAVERショッピングAIエージェント',
          date: '2026.02.26 ベータ版発表',
          scope: '韓国のNAVER Plus Storeアプリ · 当初はデジタル・住まい・生活用品分野が中心',
          description:
            '商品情報の要約と比較、レビューの分析から探索を助けるベータ機能を公開しました。対象分野と機能は段階的に拡大する計画です。',
          sourceLabel: 'NAVER公式プレスリリース',
          sourceUrl: 'https://navercorp.com/media/pressReleasesDetail?seq=34353',
        },
      ],
      note: '',
    },
    cases: {
      eyebrow: 'AI COMMERCE IN PRACTICE',
      title: 'AIコマースへの対応は、韓国と世界で加速しています。',
      description:
        'AIによる商品探索と推薦は、日々の買い物に広がっています。韓国・日本・米国の報道から、実際の取り組みと確認された変化を見てみましょう。',
      disclaimer: '報道記事より抜粋 · 数値は各記事に基づく',
      cards: [],
    },
    definition: {
      eyebrow: 'WHAT SHOPLAYER DOES',
      title: 'ShopLayerはECサイト、商品、画像のデータを深く分析し、改善します。',
      description:
        'ShopLayerエージェントは、サイトの検索アクセスとブランドの伝わり方、商品ページと画像に含まれる情報を一緒に確認します。分析結果とAIの提案を人が検討・確定し、サイトと商品の情報品質を高めます。商品フィードは各チャネルの仕様に合わせて運用します。',
      flowLabel: '分析から複数チャネルの運用まで',
      flows: [
        {
          id: 'selected-optimization',
          title: 'サイトと商品の理解・改善',
          description: 'ECサイトの公開情報と選択した商品・画像を分析し、AIが読み取った内容とブランドの意図を照らし合わせます。',
          steps: ['ECサイトのURL・基本情報を登録', 'サイト構造とブランドを診断', '商品・画像情報を分析', '担当者が確認・最終確定'],
          result: '根拠に基づいて確定した商品情報をShopLayerに保存し、ECサイトの改善に活用します。',
          note: '',
        },
        {
          id: 'catalog-feed',
          title: '一つのフィードからチャネル運用へ',
          description: '一つの商品フィードリンクからカタログを同期し、共通の商品情報をマーケティングチャネル別の形式に合わせて運用します。',
          steps: ['商品フィードリンクを接続', '商品データを取得・整理', '6チャネル向けのフィードを作成', '予約更新と運用状況を確認'],
          result: 'チャネル別の公開商品、更新状況、エラー履歴を一か所で管理します。',
          note: '',
        },
      ],
      exampleLabel: '',
      exampleStages: [],
    },
    features: {
      eyebrow: 'CAPABILITIES',
      title: 'ECサイトから商品画像まで、伝わるデータに整えます。',
      description: 'ShopLayerエージェントはサイトと商品を把握・分析します。根拠を人が確認して確定した情報をもとに、サイトと商品を改善する流れをご覧ください。',
      labels: { input: '分析対象', work: 'ShopLayerの分析', result: '活用できる結果', planned: '拡張機能' },
      cards: [
        {
          id: 'store',
          number: '01',
          title: 'ECサイト最適化',
          status: 'サイト診断',
          input: 'ECサイトのURLとブランドの基本情報',
          work: '公開ページのメタ情報・構造化データ・robots.txt・サイトマップを点検し、AIが読み取ったブランド像と運用方針を比較します。',
          result: '検索からのアクセス環境とブランドの伝わり方の差を、根拠と改善の優先順位とともに整理します。',
        },
        {
          id: 'product',
          number: '02',
          title: '商品最適化',
          status: '商品情報の改善',
          input: '分析するECサイト・カテゴリ・商品のURLと基本情報',
          work: '選択した商品の詳細情報、画像、オプションを調べ、確認できた事実を抽出して商品名・説明・検索向け文言の改善案を作ります。',
          result: '人が検討・確定した情報をShopLayerに版ごとに保存し、サイトの改善やチャネル別フィードの最適化に確認のうえ活用します。',
        },
        {
          id: 'image',
          number: '03',
          title: '画像情報の最適化',
          status: '画像情報の分析',
          input: '選択したメイン・追加・オプション・詳細の商品画像',
          work: '画像に見える色・形・文字や商品の特徴を確認し、ALT文と商品情報の候補を提案します。縦長の詳細画像は区間ごとに確認します。',
          result: '確認・確定した画像別のALTと商品特徴を、商品改善の根拠として蓄積します。',
        },
        {
          id: 'feed',
          number: '04',
          title: '統合フィード最適化',
          status: '複数チャネルの運用',
          input: '一つの商品フィードリンクと選択したカテゴリ・チャネル',
          work: '商品データを一か所で取得・整理し、GPT Ads・Google・NAVER・Meta・TikTok・Kakaoの形式に合わせたフィードを作成・更新します。',
          result: 'チャネル別の公開商品・Hosted URL・更新予定とエラー履歴を一つの画面で管理します。',
        },
        {
          id: 'report',
          number: '05',
          title: 'レポート・分析',
          status: '運用インサイト',
          input: 'サイト診断・商品取得・チャネル別フィードの実行データ',
          work: 'ECサイトごとの診断状況と新規・変更商品、チャネル別の公開・除外・エラーを集約し、変化の流れを示します。',
          result: '運用状況と作業履歴から、確認が必要な商品と次の改善作業を見つけます。',
        },
        {
          id: 'operations',
          number: '06',
          title: '運用管理',
          status: '運用ワークフロー',
          input: '複数のECサイトの診断作業・確定した商品・チャネル別予定',
          work: 'ShopLayerチームがサイトごとの分析範囲、確認・確定の段階、プロンプトの版、取得・公開予定を一つの流れで管理します。',
          result: '原本の変更、作業の進捗、予約更新・失敗時の対応履歴をつなぎ、繰り返す業務を安定して運用します。',
        },
      ],
    },
    feed: {
      eyebrow: 'UNIFIED FEED MANAGER',
      title: '一つの商品フィードで、複数プラットフォームのマーケティングチャネルを運用できます。',
      description:
        '商品フィードのリンクを一つ接続すると、ShopLayerが商品情報を取得・整理し、GPT Ads・Google・NAVER・Meta・TikTok・Kakao向けのフィードを作成します。指定したスケジュールで新規・変更商品を更新し、公開状況とエラー履歴をまとめて管理します。',
      sourceLabel: '一つの商品フィードリンク',
      sourceDescription:
        '商品番号・商品名・価格・販売状況・画像などの基本情報を共通の商品データとして整理します。必要な詳細情報は公開商品ページから補い、確定した最適化情報をチャネル別の基準に合わせて反映します。',
      lifecycleLabel: '一度接続して、チャネル別に運用',
      steps: [
        { number: '01', title: '商品フィードを接続', description: '一つの商品フィードリンクから全商品の情報を取得し、共通データとして整理します。' },
        { number: '02', title: 'チャネル別フィードを作成', description: '全商品または選択したカテゴリを、各マーケティングチャネルの形式に合わせて検証・作成します。' },
        { number: '03', title: '予約した時刻に更新', description: '取得と公開の予定を設定し、最新の商品情報を指定時刻に反映します。' },
        { number: '04', title: '変更を追跡', description: '新商品や価格・在庫・説明の変更を比較し、取得・作成・エラーの履歴を残します。' },
      ],
      channelsLabel: '一つのデータからつながる多様なマーケティングチャネル',
      channels: [
        { id: 'gpt', name: 'GPT Ads', description: 'GPT Adsの商品フィード' },
        { id: 'naver', name: 'NAVER Shopping', description: 'NAVER Shopping EP' },
        { id: 'google', name: 'Google Merchant', description: 'Googleの商品フィード' },
        { id: 'meta', name: 'Meta Catalog', description: 'Metaの商品カタログ' },
        { id: 'tiktok', name: 'TikTok Catalog', description: 'TikTokの商品カタログ' },
        { id: 'kakao', name: 'Kakao Moment', description: 'Kakaoの商品フィード' },
      ],
      outputLabel: 'チャネル運用を一目で',
      outputDescription: 'チャネル別の公開商品、Hosted URL、最近の更新と除外・エラー項目を一か所で確認できます。',
      boundaryLabel: '変更を見逃さないスケジュール管理',
      boundaryDescription: '元データで変わった商品を確認し、予約した時刻にチャネル別フィードを更新します。',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'ShopLayerについてよくある質問',
      description: 'ShopLayerの最適化、フィード、担当者の確認、キャンペーンとモニタリングについてお答えします。',
      items: shopLayerFaq.ja,
    },
    closing: {
      eyebrow: 'SHOPLAYER · THE NEXT COMMERCE DATA',
      title: 'AIショッピングで選ばれる準備は、正確な商品データから。',
      description:
        'ECサイトの診断から商品情報の改善、複数チャネルのフィード運用まで。ShopLayerとともに、顧客にもAIにも伝わるコマースデータを整えましょう。',
      contactStatus: '',
      note: '',
    },
    footer: {
      description: 'ShopLayerはAIと人が商品データを整え、複数プラットフォームの運用を支えるコマースエージェントです。',
    },
  },
};
