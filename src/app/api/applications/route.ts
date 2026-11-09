import { createHash, randomUUID } from "node:crypto";
import { sendApplicationMail } from "@/lib/application-mail";
import { validateApplication } from "@/lib/application";
import { publicContactEmail } from "@/lib/site-config";

export const runtime = "nodejs";

// A small per-instance guard supplements origin checks and provider idempotency.
// This is deliberately not presented as a distributed/global rate limit.
const attempts = new Map<string, { count: number; resetAt: number }>();
const salt = randomUUID();
const deliveries = new Map<string, { fingerprint: string; expires: number; result: Promise<boolean> }>();
const windowMs = 10 * 60 * 1000;
const maxBodyBytes = 16_000;

function response(code: string, status: number) {
  return Response.json({ ok: false, code }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const allowedOrigins = new Set([
    "https://shoplayer.kr", "https://www.shoplayer.kr",
    "https://shoplayer.co.kr", "https://www.shoplayer.co.kr",
    "https://shoplayerhp.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ]);
  if (process.env.NODE_ENV !== "production") allowedOrigins.add(new URL(request.url).origin);
  if (!allowedOrigins.has(request.headers.get("origin") ?? "")) return response("invalid_origin", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return response("invalid_request", 415);
  if (Number(request.headers.get("content-length") ?? 0) > maxBodyBytes) return response("invalid_request", 413);

  let input: unknown;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > maxBodyBytes) return response("invalid_request", 413);
    input = JSON.parse(raw);
  } catch {
    return response("invalid_request", 400);
  }
  const data = validateApplication(input);
  if (!data) return response("invalid_fields", 400);

  if (!process.env.SMTP_PASSWORD) return response("unavailable", 503);

  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.resetAt <= now) attempts.delete(key);
  const ip = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const clientKey = createHash("sha256").update(salt + ip.split(",")[0].trim()).digest("hex");
  const entry = attempts.get(clientKey) ?? { count: 0, resetAt: now + windowMs };
  if (entry.count >= 5) return response("rate_limited", 429);
  if (attempts.size >= 1000 && !attempts.has(clientKey)) return response("rate_limited", 429);
  attempts.set(clientKey, { ...entry, count: entry.count + 1 });

  const fingerprint = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  for (const [id, delivery] of deliveries) if (delivery.expires <= now) deliveries.delete(id);
  const prior = deliveries.get(data.requestId);
  if (prior && prior.fingerprint !== fingerprint) return response("invalid_fields", 409);
  if (!prior && deliveries.size >= 1000) return response("rate_limited", 429);
  const delivery = prior ?? { fingerprint, expires: now + windowMs, result: sendApplicationMail(data, publicContactEmail) };
  deliveries.set(data.requestId, delivery);
  try {
    if (!await delivery.result) {
      deliveries.delete(data.requestId);
      return response("send_failed", 502);
    }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    deliveries.delete(data.requestId);
    const failure = error as { code?: string; responseCode?: number; message?: string };
    const knownCodes = ["EAUTH", "ECONNECTION", "ETIMEDOUT", "ESOCKET", "ETLS", "EDNS", "EENVELOPE", "EMESSAGE"];
    console.error("Application SMTP transport failed", {
      code: knownCodes.includes(failure?.code ?? "") ? failure.code : "unknown",
      responseCode: typeof failure?.responseCode === "number" ? failure.responseCode : undefined,
      connectionDetail: failure?.code === "ESOCKET" ? failure.message?.replace(/[^\s]+@[^\s]+/g, "[redacted]").slice(0, 200) : undefined,
    });
    return response("send_failed", 502);
  }
}
