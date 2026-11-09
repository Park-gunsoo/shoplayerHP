export const PRIVACY_VERSION = "2026-11-09";
export const STORE_URL_PATTERN = String.raw`(?:[hH][tT][tT][pP][sS]?://)?(?:[^\s.\/:?#@]+\.)+[^\s.\/:?#@]+(?::[0-9]+)?(?:[\/?#]\S*)?`;
export const applicationLimits = { name: 100, email: 254, store: 200, url: 1000, note: 3000 } as const;

export type Application = {
  name: string;
  email: string;
  store: string;
  url: string;
  note: string;
  locale: "ko" | "ja" | "en";
  privacyConsent: true;
  requestId: string;
};

export function validateApplication(value: unknown): Application | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (input.privacyConsent !== true || input.privacyVersion !== PRIVACY_VERSION) return null;
  if (input.website !== undefined && input.website !== "") return null;
  if (!["ko", "ja", "en"].includes(String(input.locale))) return null;
  if (typeof input.requestId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.requestId)) return null;

  const fields = {} as Record<keyof typeof applicationLimits, string>;
  for (const [key, max] of Object.entries(applicationLimits)) {
    const raw = input[key];
    if (typeof raw !== "string" || raw.length > max) return null;
    fields[key as keyof typeof applicationLimits] = raw.trim();
  }
  if (!fields.name || !fields.store || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return null;
  if (/[\r\n\x00-\x1f]/.test(fields.name + fields.email + fields.store + fields.url)) return null;
  if (fields.url && !new RegExp(`^(?:${STORE_URL_PATTERN})$`, "u").test(fields.url)) return null;
  return { ...fields, locale: input.locale as Application["locale"], privacyConsent: true, requestId: input.requestId };
}

export function applicationEmailText(data: Application): string {
  return [
    "ShopLayer 홈페이지 도입 신청",
    "",
    `담당자 / Name: ${data.name}`,
    `답장 이메일 / Reply email: ${data.email}`,
    `쇼핑몰·브랜드 / Store: ${data.store}`,
    `쇼핑몰 URL / Store URL: ${data.url || "-"}`,
    `언어 / Language: ${data.locale}`,
    "",
    "문의 내용 / Message:",
    data.note || "-",
    "",
    `개인정보 수집·이용 동의 / Privacy consent: 동의함 (version ${PRIVACY_VERSION})`,
    `접수 번호 / Reference: ${data.requestId}`,
  ].join("\n");
}
