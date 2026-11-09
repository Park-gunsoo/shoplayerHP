import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import nodemailer from "nodemailer";
import { randomUUID } from "node:crypto";
import { PRIVACY_VERSION, validateApplication } from "../src/lib/application";
import { POST } from "../src/app/api/applications/route";

const input = {
  name: "Test Applicant", email: "applicant@example.com", store: "Test Store",
  url: "shop.co.jp/products?id=1", note: "한글 & English\nLine two", locale: "ko",
  privacyConsent: true, privacyVersion: PRIVACY_VERSION, website: "",
  requestId: "936c78a9-39b7-46af-809f-377a4f1cb89d",
};
let ip = 0;
let calls: Array<{ payload: Record<string, unknown>; key: string | null }>;
const originalKey = process.env.SMTP_PASSWORD;


beforeEach(() => {
  ip++;
  calls = [];
  input.requestId = randomUUID();
  process.env.SMTP_PASSWORD = "test-only-password";
  mock.method(nodemailer, "createTransport", () => ({
    sendMail: async (payload: Record<string, unknown>) => {
      calls.push({payload, key: String(payload.messageId)});
      return { accepted: ["gundoll2.sj@gmail.com", "sjcho77331911@gmail.com"], messageId: "test-message" };
    }, close: () => {},
  }) as never);
});
afterEach(() => {
  mock.restoreAll();
  if (originalKey === undefined) delete process.env.SMTP_PASSWORD; else process.env.SMTP_PASSWORD = originalKey;
});

function request(value: unknown = input, headers: Record<string, string> = {}) {
  return new Request("https://www.shoplayer.kr/api/applications", { method: "POST", headers: {
    origin: "https://www.shoplayer.kr", "content-type": "application/json", "x-vercel-forwarded-for": `198.51.100.${ip}`, ...headers,
  }, body: JSON.stringify(value) });
}

test("accepts different domains, optional schemes, paths and empty optional values", () => {
  for (const url of ["example.com", "shop.kr", "shop.co.kr", "shop.co.jp", "shop.store", "쇼핑몰.한국", "www.example.com", "HTTPS://SHOP.CO.JP/products?a=1#details", ""]) {
    assert.ok(validateApplication({ ...input, url }), url);
  }
  const parsed = validateApplication({ ...input, name: " Test Applicant ", url: "", note: "" });
  assert.equal(parsed?.name, "Test Applicant");
});

test("requires explicit current consent and rejects invalid or oversized input", () => {
  for (const override of [
    { privacyConsent: false }, { privacyConsent: "true" }, { privacyConsent: undefined }, { privacyVersion: "old" },
    { name: " " }, { email: "broken" }, { store: "" }, { url: "shop..com" }, { name: "Name\r\nBcc: attacker@example.com" },
    { note: "x".repeat(3001) }, { website: "spam.example" }, { locale: "xx" }, { requestId: "bad-id" },
  ]) assert.equal(validateApplication({ ...input, ...override }), null, JSON.stringify(override).slice(0, 70));
  assert.equal(validateApplication(null), null);
});

test("rejects invalid consent at the server before calling the provider", async () => {
  const response = await POST(request({ ...input, privacyConsent: false }));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test("rejects cross-site requests, wrong media types and oversized bodies", async () => {
  assert.equal((await POST(request(input, { origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request(input, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await POST(request({ ...input, note: "x".repeat(17000) }))).status, 413);
  assert.equal(calls.length, 0);
});

test("sends only to the configured recipient and uses the applicant only as reply-to", async () => {
  const response = await POST(request({ ...input, to: "attacker@example.com", from: "attacker@example.com" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(calls[0].payload.to, ["gundoll2.sj@gmail.com", "sjcho77331911@gmail.com"]);
  assert.deepEqual(calls[0].payload.from, {name: "ShopLayer", address: "master@shoplayer.co.kr"});
  assert.equal(calls[0].payload.replyTo, input.email);
  assert.ok(String(calls[0].payload.text).includes(input.note));
  assert.ok(String(calls[0].payload.text).includes(PRIVACY_VERSION));
});

test("partial recipient rejection does not report complete success", async () => {
  mock.restoreAll();
  mock.method(nodemailer, "createTransport", () => ({sendMail: async () => ({accepted: ["gundoll2.sj@gmail.com"], rejected: ["sjcho77331911@gmail.com"]}), close: () => {}}) as never);
  const response = await POST(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {ok: false, code: "send_failed"});
});

test("same-instance retries reuse one send and a stable message ID", async () => {
  await POST(request());
  await POST(request());
  assert.equal(calls.length, 1);
  assert.equal(calls[0].key, `<application-${input.requestId}@shoplayer.co.kr>`);
});

test("provider rejection and missing configuration never return success", async () => {
  mock.restoreAll();
  mock.method(nodemailer, "createTransport", () => ({sendMail: async () => {throw new Error("SMTP unavailable");}, close: () => {}}) as never);
  const failure = await POST(request());
  assert.equal(failure.status, 502);
  assert.deepEqual(await failure.json(), { ok: false, code: "send_failed" });
  delete process.env.SMTP_PASSWORD;
  assert.equal((await POST(request())).status, 503);
});

test("limits repeated submissions on the same server instance", async () => {
  for (let count = 0; count < 5; count++) assert.equal((await POST(request({...input, requestId: randomUUID()}))).status, 200);
  assert.equal((await POST(request())).status, 429);
  assert.equal(calls.length, 5);
});
