# ShopLayer Website

ShopLayer를 **쇼핑몰 AI 최적화 커머스 에이전트**로 소개하는 한국어·일본어 1페이지 사이트입니다. 기존 내부 운영 앱과 별도 프로젝트이며 제품 DB에 연결하지 않습니다.

## 로컬 미리보기

Node.js 22 이상에서:

```powershell
npm install
npm run dev
```

- 한국어: `http://localhost:3000/`
- 일본어: `http://localhost:3000/ja`

페이지 문구는 `src/content/site-content.ts`, 언론 사례와 수치·비교 기준은 `src/content/news-cases.ts`에서 관리합니다. 제품·페이지·디자인 지침은 `PRODUCT_FLOW.md`, `PAGE_RULES.md`, `DESIGN_RULES.md`를 참고하세요. 이미지 생성 기록은 `IMAGE_ASSETS.md`에 있습니다.

운영 프로세스는 사이트 관리와 상품·채널 운영의 두 흐름으로 소개합니다. 시연은 보이는 동안 반복하고 일시 정지를 지원합니다. ShopLayer FAQ는 `src/content/shoplayer-faq.ts`, 개인정보 처리방침 초안은 `src/content/privacy-content.ts`에서 관리합니다. /privacy와 /ja/privacy를 공개하기 전 `PRIVACY_POLICY_NOTES.md`에 기록한 실제 사업자·문의처·위탁/국외 이전 현황을 확정하세요.

## 공개 준비

GitHub: https://github.com/Park-gunsoo/shoplayerHP

Vercel 프로젝트는 parkgunsoo-s-projects/shoplayerhp이며 저장소 main 브랜치와 연결했습니다. 변경을 main에 올리면 운영 배포가 생성됩니다. 실제 배포 상태와 주소는 Vercel 대시보드에서 확인할 수 있습니다.

`.env.example`의 `SITE_URL`에 최종 공개 도메인, `CONTACT_EMAIL`에 실제 수신 가능한 공개 이메일을 설정한 뒤 다시 빌드합니다. 이메일이 없으면 신청 폼은 작성 내용을 복사하며 자동 접수하지 않습니다. 도메인과 이메일이 모두 설정되기 전에는 검색 색인을 허용하지 않습니다.

단일 **상품 피드 링크**가 사이트의 고객 설명입니다. 현재 내부 앱의 확인된 입력 형식은 **Cafe24 Meta TSV 링크**입니다. 다른 피드 형식의 즉시 연결을 약속하지 않습니다. 여섯 채널용 피드 게시와 해당 플랫폼의 수신·승인·노출은 별도 단계입니다.

사례의 수치는 각 언론 기사의 비교 기준을 따릅니다. 운영 프로세스는 사용자가 확정한 운영팀 서비스 범위를 설명하며, 홈페이지가 광고 계정이나 성과 데이터와 연결된 것은 아닙니다. 사이트와 내부 ShopLayer 앱은 데이터로 연결되지 않았습니다. 공개 전 로고 사용 조건, 기사 링크, 모바일 화면, 신청 메일, canonical·`hreflang`·사이트맵을 최종 주소에서 확인해야 합니다.

## 확인 명령

```powershell
npm run typecheck
npm run lint
npm run build
```
