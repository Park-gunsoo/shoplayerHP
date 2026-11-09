import nodemailer from "nodemailer";
import { DEFAULT_CIPHERS } from "node:tls";
import { applicationEmailText, type Application } from "./application";

export const SMTP_SENDER = "master@shoplayer.co.kr";

export async function sendApplicationMail(data: Application, recipient: string) {
  const transport = nodemailer.createTransport({
    host: "smtp.whoisworks.com", port: 587, secure: false, requireTLS: true,
    // WHOIS advertises undersized finite-field DH parameters. Exclude DHE
    // suites while retaining Node's cipher policy and certificate validation.
    tls: { minVersion: "TLSv1.2", ciphers: `${DEFAULT_CIPHERS}:!DHE` },
    auth: { user: SMTP_SENDER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const sent = await transport.sendMail({
      from: { name: "ShopLayer", address: SMTP_SENDER }, to: recipient, replyTo: data.email,
      subject: "[ShopLayer] 새로운 도입 신청 / New application",
      text: applicationEmailText(data), messageId: `<application-${data.requestId}@shoplayer.co.kr>`,
    });
    return sent.accepted?.some((address) => String(address).toLowerCase() === recipient.toLowerCase()) === true;
  } finally { transport.close(); }
}
