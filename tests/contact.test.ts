import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { contactConfig, handleContact, type ContactConfig } from "../src/lib/contact-handler.ts";
import { contactLimits } from "../src/lib/contact-settings.ts";

const config: ContactConfig = { apiKey: "mock-key", from: "Ormac <plan@ormac.nl>", siteKey: "mock-site", secret: "mock-secret", origins: ["https://ormac.nl"] };
function application() {
  const data = new FormData();
  const fields = { taal: "nl", name: "Test applicant", company: "Test company", email: `${randomUUID()}@example.com`, stage: "seed", focus: "services", description: "Synthetic test application", round: "100000", amount: "25000", use: "Test milestone", investors: "No investors yet", board: "1", privacy: "on", "cf-turnstile-response": "mock-token", submissionId: randomUUID() };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  for (let i = 0; i < 6; i++) data.set(`criterion-${i}`, "0");
  for (const key of ["deck", "financial"]) data.set(key, new File(["%PDF-1.4\nTest fixture only"], `${key}.pdf`, { type: "application/pdf" }));
  return data;
}
function request(data = application(), origin = "https://ormac.nl") {
  return new Request("https://ormac.nl/api/contact/", { method: "POST", headers: { origin }, body: data });
}
function providers(verification: object = { success: true, hostname: "ormac.nl", action: "contact" }, emailStatus = 200) {
  const calls: { url: string; body: Record<string, unknown>; headers: Headers }[] = [];
  const fetcher: typeof fetch = async (input, init) => {
    const url = String(input);
    calls.push({ url, body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) });
    return url.includes("siteverify") ? Response.json(verification) : Response.json(emailStatus === 200 ? { id: "mock-receipt" } : { message: "PRIVATE PROVIDER DETAILS" }, { status: emailStatus });
  };
  return { calls, fetcher };
}

test("valid application verifies first, then sends all fields and attachments to plan@ormac.nl", async () => {
  const data = application(); data.set("taal", "en"); data.set("urgent", "on"); data.set("urgentWhy", "Synthetic urgency"); data.set("urgentDate", "2026-12-01");
  data.set("to", "unapproved@example.com");
  const { calls, fetcher } = providers();
  const response = await handleContact(request(data), config, fetcher);
  assert.equal(response.status, 200); assert.equal((await response.json()).ok, true);
  assert.equal(calls.length, 2); assert.match(calls[0].url, /siteverify$/);
  assert.deepEqual(calls[1].body.to, ["plan@ormac.nl"]);
  assert.equal(calls[1].body.reply_to, data.get("email"));
  assert.match(String(calls[1].body.text), /Language:\nen/);
  assert.match(String(calls[1].body.text), /Synthetic urgency/);
  assert.match(String(calls[1].body.subject), /^\[URGENT\]/);
  const attachments = calls[1].body.attachments as { filename: string; content: string }[];
  assert.equal(attachments.length, 2);
  assert.match(Buffer.from(attachments[0].content, "base64").toString(), /^%PDF-1.4/);
  assert.equal(calls[0].body.secret, config.secret);
  assert.equal(Object.hasOwn(calls[0].body, "email"), false);
});

for (const [name, verification] of Object.entries({
  rejected: { success: false }, expired: { success: false, "error-codes": ["timeout-or-duplicate"] },
  wrongHostname: { success: true, hostname: "evil.example", action: "contact" },
  wrongAction: { success: true, hostname: "ormac.nl", action: "login" },
})) test(`${name} human check never sends email`, async () => {
  const { calls, fetcher } = providers(verification);
  const response = await handleContact(request(), config, fetcher);
  assert.equal(response.status, 403); assert.equal((await response.json()).error, "human");
  assert.equal(calls.length, 1);
});

for (const field of ["cf-turnstile-response", "email", "name", "company", "round", "amount", "privacy", "criterion-5", "deck", "financial"]) {
  test(`missing ${field} is rejected before provider calls`, async () => {
    const data = application(); data.delete(field);
    const { calls, fetcher } = providers();
    const response = await handleContact(request(data), config, fetcher);
    assert.equal(response.ok, false); assert.equal(calls.length, 0);
  });
}

test("unknown origin, honeypot, invalid enum, malformed email and invalid urgent date are rejected", async () => {
  for (const [key, value] of [["companyFax", "spam"], ["stage", "fake"], ["email", "a@b\r\nBcc:evil@example.com"], ["criterion-1", "99"], ["urgent", "on"]]) {
    const data = application(); data.set(key, value);
    const { calls, fetcher } = providers();
    assert.equal((await handleContact(request(data), config, fetcher)).ok, false);
    assert.equal(calls.length, 0);
  }
  const { calls, fetcher } = providers();
  assert.equal((await handleContact(request(application(), "https://evil.example"), config, fetcher)).status, 403);
  assert.equal(calls.length, 0);
});

test("unsafe, disguised, empty and too many attachments never reach email provider", async () => {
  for (const file of [new File(["executable"], "script.exe"), new File(["not pdf"], "deck.pdf"), new File([], "deck.pdf")]) {
    const data = application(); data.set("deck", file);
    const { calls, fetcher } = providers();
    assert.equal((await handleContact(request(data), config, fetcher)).status, 400);
    assert.equal(calls.length, 0);
  }
  const data = application();
  for (let i = 0; i < 4; i++) data.append("otherFiles", new File(["%PDF-1.4"], `extra${i}.pdf`));
  const { calls, fetcher } = providers();
  assert.equal((await handleContact(request(data), config, fetcher)).status, 413); assert.equal(calls.length, 0);
});

test("oversized request is rejected even when content-length is absent", async () => {
  const { calls, fetcher } = providers();
  const oversized = new Request("https://ormac.nl/api/contact/", { method: "POST", headers: { origin: "https://ormac.nl", "Content-Type": "multipart/form-data; boundary=test" }, body: new Uint8Array(contactLimits.requestBytes + 1) });
  assert.equal((await handleContact(oversized, config, fetcher)).status, 413);
  assert.equal(calls.length, 0);
});

test("4 MB of attachments fits the Vercel request budget and one extra byte is rejected", async () => {
  const data = application();
  const financial = data.get("financial") as File;
  const deck = new Uint8Array(contactLimits.totalFileBytes - financial.size);
  deck.set(new TextEncoder().encode("%PDF-1.4\n"));
  data.set("deck", new File([deck], "deck.pdf", { type: "application/pdf" }));
  const validRequest = request(data);
  const requestSize = (await validRequest.clone().arrayBuffer()).byteLength;
  assert.ok(requestSize < contactLimits.requestBytes);
  assert.ok(contactLimits.requestBytes < 4_500_000);
  const accepted = providers();
  assert.equal((await handleContact(validRequest, config, accepted.fetcher)).status, 200);
  assert.equal(accepted.calls.length, 2);

  data.append("otherFiles", new File(["x"], "extra.pdf"));
  const rejected = providers();
  assert.equal((await handleContact(request(data), config, rejected.fetcher)).status, 413);
  assert.equal(rejected.calls.length, 0);
});

test("production configuration allows exact public origins without localhost", () => {
  const env = { NODE_ENV: "production", RESEND_API_KEY: "mock", CONTACT_FROM_EMAIL: "plan@ormac.nl", TURNSTILE_SITE_KEY: "mock-site", TURNSTILE_SECRET_KEY: "mock-secret" };
  assert.deepEqual(contactConfig(env)?.origins, ["https://ormac.nl", "https://www.ormac.nl"]);
  assert.deepEqual(contactConfig({ ...env, CONTACT_ALLOWED_ORIGINS: " https://preview.example.com " })?.origins, ["https://preview.example.com"]);
});

test("provider failures cannot become success or expose details", async () => {
  const { fetcher } = providers(undefined, 500);
  const response = await handleContact(request(), config, fetcher);
  assert.equal(response.status, 502); assert.deepEqual(await response.json(), { ok: false, error: "delivery" });
  const networkFailure: typeof fetch = async () => { throw new Error("secret connection details"); };
  const failed = await handleContact(request(), config, networkFailure);
  assert.equal(failed.ok, false); assert.doesNotMatch(await failed.text(), /secret/);
});

test("malformed multipart and duplicate required fields fail before provider calls", async () => {
  const { calls, fetcher } = providers();
  const malformed = new Request("https://ormac.nl/api/contact/", { method: "POST", headers: { origin: "https://ormac.nl", "Content-Type": "multipart/form-data; boundary=broken" }, body: "broken" });
  assert.equal((await handleContact(malformed, config, fetcher)).status, 400);
  const data = application(); data.append("email", "second@example.com");
  assert.equal((await handleContact(request(data), config, fetcher)).status, 400);
  assert.equal(calls.length, 0);
});

test("retry of unchanged submission uses the same Resend idempotency key", async () => {
  const data = application(); const { calls, fetcher } = providers();
  assert.equal((await handleContact(request(data), config, fetcher)).ok, true);
  data.set("cf-turnstile-response", "fresh-token");
  assert.equal((await handleContact(request(data), config, fetcher)).ok, true);
  assert.equal(calls[1].headers.get("Idempotency-Key"), calls[3].headers.get("Idempotency-Key"));
});

test("repeated verified attempts are rate limited", async () => {
  const data = application(); const { calls, fetcher } = providers();
  for (let i = 0; i < 5; i++) assert.equal((await handleContact(request(data), config, fetcher)).ok, true);
  assert.equal((await handleContact(request(data), config, fetcher)).status, 429);
  assert.equal(calls.filter(call => call.url.includes("resend")).length, 5);
});

test("missing configuration fails closed and public test keys cannot enable live sending", async () => {
  assert.equal(contactConfig({}), null);
  assert.equal(contactConfig({ RESEND_API_KEY: "mock", CONTACT_FROM_EMAIL: "plan@ormac.nl", TURNSTILE_SITE_KEY: "1x00000000000000000000AA", TURNSTILE_SECRET_KEY: "mock" }), null);
  const { calls, fetcher } = providers();
  assert.equal((await handleContact(request(), null, fetcher)).status, 503); assert.equal(calls.length, 0);
});
