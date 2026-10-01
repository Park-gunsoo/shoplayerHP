# 사례 기업 로고 자산

확인일: 2026-09-30. 아래 파일은 각 기업의 공식 사이트 또는 공식 뉴스룸에서 가져온 원본입니다. 현재 로컬 내부 미리보기의 사례 슬라이드용으로 준비했으며 표식 자체는 수정하지 않았습니다. 파일을 내려받을 수 있다는 사실이 공개 상업 사이트에서 재사용할 권리를 뜻하지는 않습니다.

| 사례 기업 | 로컬 파일 | 원본 URL | 원본 크기 |
| --- | --- | --- | --- |
| CJ온스타일 | `public/logos/cases/cj-onstyle.svg` | [CJ온스타일 기업 사이트 자산](https://image.cjonstyle.net/public/confirm/static/deploy/cjenm-commerce-home-next-frontweb/dist/prd/26/public/icons/logo_cjonstyle.svg) | SVG `81 × 16` |
| 오설록 | `public/logos/cases/osulloc.png` | [오설록 공식 사이트 자산](https://image.osulloc.com/kr/ko/static/v2/images/common/logo.png) | PNG `460 × 69` |
| Honeys | `public/logos/cases/honeys.png` | [Honeys 기업 사이트 자산](https://www.honeys.co.jp/cms/hny_images/common/logo.png) | PNG `114 × 38` |
| Sakazen | `public/logos/cases/sakazen.png` · 원본 래퍼 `public/logos/cases/sakazen.svg` | [Sakazen 공식 쇼핑몰 자산](https://sakazen-online-cdn.cbpaas.net/w/assets/system/images/logo.svg) | 내장 PNG `2270 × 1725` · SVG `viewBox 8293 × 1771` |
| Michaels | `public/logos/cases/michaels.jpg` | [Michaels 공식 뉴스룸 자산](https://d1io3yog0oux5.cloudfront.net/_454b3b8bce136029182c3843a23f33df/michaelsnewsroom/db/446/4893/asset_file/Michaels_2023_LogoLockup_HORIZ_Red_US.jpg) · [브랜딩 자산 목록](https://www.michaelspressroom.com/media-assets) | JPEG `1071 × 223` |
| Mars | `public/logos/cases/mars.svg` | [Mars 공식 사이트 자산](https://www.mars.com/themes/custom/mars_acss/logo.svg) | SVG `138 × 40` |

## 사용 시 확인할 사항

- **CJ온스타일:** 기업 사이트의 로고를 받았습니다. 별도의 [CJ Newsroom 미디어 라이브러리](https://cjnews.cj.net/medialibrary/cj-enm-%EC%BB%A4%EB%A8%B8%EC%8A%A4%EB%B6%80%EB%AC%B8/cj%EC%98%A8%EC%8A%A4%ED%83%80%EC%9D%BC-cj%EC%98%A8%EC%8A%A4%ED%83%80%EC%9D%BC-%EB%A1%9C%EA%B3%A0/)에는 모든 이미지가 보도용이며 상업적 사용은 불가하다고 명시되어 있습니다. 기업 사이트의 동일 표식을 홍보 사이트에 재사용할 권한이 자동으로 생기는 것은 아닙니다.
- **Michaels:** 공식 뉴스룸은 로고를 다운로드 가능한 브랜딩 자산으로 제공하지만 ShopLayer 홍보 사이트에서의 사용 허가는 명시하지 않습니다. [셀러 마케팅 정책](https://www.michaels.com/marketplace/seller-support/policies/seller-marketing-policy)의 로고 사용 허용은 Michaels 판매자가 자기 스토어를 홍보하는 경우로 한정됩니다.
- **Mars:** 사례명은 *Mars Wrigley*이지만 확보된 파일은 **Mars 모회사 로고**입니다. [Mars 사이트 약관](https://www.mars.com/legal-canada)은 로고를 다른 웹사이트나 상업적 목적으로 쓰려면 서면 허가가 필요하다고 명시합니다. 공개 전에는 정확한 Mars Wrigley 자산과 사용 가능 여부를 확인하거나 기업명 텍스트로 대체해야 합니다.
- **오설록·Honeys·Sakazen:** 공식 웹사이트의 표식입니다. 이 자산을 ShopLayer의 공개 홍보에 재사용하도록 허용하는 라이선스는 확인되지 않았습니다. Honeys PNG는 `114 × 38`로 낮은 해상도이므로 크게 확대하지 않습니다. Sakazen SVG는 좌우에 큰 빈 공간이 있어, 내부에 원본 그대로 들어 있는 PNG를 별도로 추출했습니다. 로고 자체는 편집하지 않았습니다.
- 모든 사례 기업은 기사 속 주체로만 소개하고 ShopLayer 고객·제휴사처럼 보이는 배치나 문구는 피합니다.

SVG 3개는 XML을 파싱하여 `script`, `foreignObject`, 이벤트 핸들러, JavaScript URL, 외부 참조가 없음을 확인했습니다. Sakazen SVG에는 공식 원본에 포함된 PNG 데이터 URI가 있으며, 해당 PNG도 정상 이미지로 검증했습니다. PNG 3개와 JPEG 1개는 이미지 디코더로 형식을 확인했습니다.
