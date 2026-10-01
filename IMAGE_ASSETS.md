# 생성 이미지 기록

이 사이트의 아래 이미지는 내장 `image_gen` 도구로 새로 생성했습니다. 모두 가상 상품 또는 연출 장면이며 실제 쇼핑몰 상품·가격·고객 사례가 아닙니다. 생성 원본은 Codex의 `generated_images`에 보관하고, 사이트에서 쓰는 최종 파일을 `public/images/`에 복사했습니다.

| 파일 | 사용 위치 | 최종 생성 프롬프트의 핵심 |
| --- | --- | --- |
| `public/images/demo-trousers-cream.png` | 쇼핑 대화 예시 상품 1 | `product-mockup`: 크림 베이지 여성 여름 와이드 팬츠 한 벌의 프리미엄 정사각형 이커머스 스튜디오 사진. 투명 마네킹 형태, 따뜻한 흰 배경·자연광·충분한 여백. 인물·상표·글자·가격표·워터마크 없음. |
| `public/images/demo-trousers-sand.png` | 쇼핑 대화 예시 상품 2 | `product-mockup`: 샌드 베이지 여성 스트레이트 앵클 팬츠 한 벌. 절제된 테일러링과 가벼운 주름, 동일한 스튜디오 조명·배경·정사각형 구도. 인물·상표·글자·가격표·워터마크 없음. |
| `public/images/demo-trousers-oatmeal.png` | 쇼핑 대화 예시 상품 3 | `product-mockup`: 오트밀 톤 여성 밴딩 여름 팬츠 한 벌. 부드러운 직물 질감과 여유 있는 실루엣, 동일한 스튜디오 스타일. 인물·상표·글자·가격표·워터마크 없음. |
| `public/images/shopping-context.png` | 쇼핑 방식 변화 | `photorealistic-natural`: 밝은 책상에서 베이지 팬츠와 원단 샘플을 살펴보며 스마트폰을 든 쇼핑객의 손. 화면은 빈 상태, 자연광, 여백 있는 에디토리얼 사진. 상표·UI·글자·가격·워터마크 없음. |
| `public/images/fabric-detail.png` | 이미지 정보 최적화 | `product-mockup`: 가상의 베이지 팬츠 허리선·솔기·직물 질감을 한 손으로 가볍게 잡아 보여주는 정사각형 상품 상세 사진. 실제 소재 성분에 관한 단정, 상표·글자·가격·워터마크 없음. |
| `public/images/platform-google-editorial.png` | Google 시장 동향 | `photorealistic-natural`: 빈 화면의 노트북과 상품 원단·포장을 놓고 비교하는 쇼핑 장면. 푸른 자연광, 텍스트를 얹을 왼쪽 여백. 실제 Google UI·로고·글자·수치 없음. |
| `public/images/platform-naver-editorial.png` | NAVER 시장 동향 | `photorealistic-natural`: 한국 쇼핑객이 스마트폰의 빈 화면을 보며 생활용품과 배송 상자를 살펴보는 장면. 따뜻한 자연광과 연한 녹색 식물. 실제 NAVER UI·로고·글자·수치 없음. |
| `public/images/platform-merchant-editorial.png` | Google Merchant Center 시장 동향 | `product-mockup`: 조명·직물·스킨케어·헤드폰을 빈 속성 카드와 함께 정리한 스튜디오 상품 사진. 실제 Google UI·로고·글자·가격 없음. |
| `public/images/feed-catalog-mosaic.png` | 통합 피드의 카탈로그 | `product-mockup`: 가상 팬츠·조명·화장품·헤드폰·운동화·토트백을 동일한 스튜디오 조건의 상품 그리드로 촬영. 3×2 구도를 요청했고 결과는 3×3 가상 상품 이미지로 생성됨. 브랜드·글자·가격·플랫폼 UI 없음. |
| `public/images/feed-flow-illustration.png` | 상품 피드 설명 | `infographic-diagram`: 상품 카드 묶음에서 정리 영역을 거쳐 여섯 개의 빈 파일 카드로 갈라지는 평면 2D 편집형 그림. 남색·파랑·흰색·주황, 로고·글자·수치·가짜 UI 없음. |
| `public/images/closing-still-life.png` | 마지막 신청 섹션 | `ads-marketing`: 오른쪽에 의류·조명·토트·스킨케어·헤드폰·신발을 놓고 왼쪽은 제목을 위한 짙은 남색 여백으로 둔 넓은 실사 제품 사진. 텍스트·로고·가격·차트 없음. |

상품 카드의 이름·가격·속성 텍스트는 이미지에 넣지 않고 사이트 HTML에서 표시합니다. 히어로의 `쇼핑 AI 시연` 표지가 이 장면의 성격을 알리며, 실제 GPT 검색 결과나 ShopLayer 고객 상품으로 소개하지 않습니다.

2026-10-01: 같은 팬츠 이미지 3종을 트렌드 추천 캐러셀에도 재사용했습니다. 가격·별점·추천 이유는 화면 시연값이며 쇼핑몰명은 ShopLayer입니다. 해당 패널의 `AI 추천 시연` 표지를 유지합니다.
