import { createHash } from "node:crypto";
import { contactLimits } from "./contact-settings.ts";

export type ContactConfig = {
  apiKey: string;
  from: string;
  siteKey: string;
  secret: string;
  origins: string[];
};

export function contactConfig(env: Record<string, string | undefined> = process.env): ContactConfig | null {
  const { RESEND_API_KEY: apiKey, CONTACT_FROM_EMAIL: from, TURNSTILE_SITE_KEY: siteKey, TURNSTILE_SECRET_KEY: secret } = env;
  // Never permit the public, always-pass Turnstile test keys to send real emails.
  if (!apiKey || !from || !siteKey || !secret || /[\r\n]/.test(from) || [siteKey, secret].some(key => /^[123]x0{10}/.test(key))) return null;
  const origins = (env.CONTACT_ALLOWED_ORIGINS || "https://ormac.nl,https://www.ormac.nl").split(",").map(s => s.trim()).filter(Boolean);
  if (env.NODE_ENV !== "production") origins.push("http://localhost:43129", "http://127.0.0.1:43129", "http://localhost:43127", "http://127.0.0.1:43127");
  return { apiKey, from, siteKey, secret, origins };
}

class ContactError extends Error {
  code: string;
  status: number;
  constructor(code: string, status = 400) { super(code); this.code = code; this.status = status; }
}

const reply = (data: object, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
function fail(code: string, status = 400): never { throw new ContactError(code, status); }

async function boundedFormData(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) fail("invalid");
  if (Number(request.headers.get("content-length")) > contactLimits.requestBytes) fail("files", 413);
  const reader = request.body?.getReader();
  if (!reader) fail("invalid");
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > contactLimits.requestBytes) { await reader.cancel(); fail("files", 413); }
      chunks.push(value);
    }
    try {
      return await new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData();
    } catch { fail("invalid"); }
  } finally { reader.releaseLock(); }
}

function readFields(form: FormData) {
  const fields: Record<string, string> = {};
  const text = (key: string, required = false, max = 3000) => {
    const values = form.getAll(key);
    if (values.length > 1 || values.some(v => typeof v !== "string")) fail("invalid");
    const value = (values[0] as string | undefined)?.trim() ?? "";
    if ((required && !value) || value.length > max || /\u0000/.test(value)) fail("invalid");
    fields[key] = value;
    return value;
  };
  const choice = (key: string, values: string[], required = true) => {
    const value = text(key, required, 100);
    if ((value || required) && !values.includes(value)) fail("invalid");
  };
  choice("taal", ["nl", "en"]);
  text("name", true, 160); text("company", true, 200);
  const email = text("email", true, 254);
  if (!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email)) fail("invalid");
  for (const key of ["role", "phone", "city"]) text(key, false, 160);
  const website = text("website", false, 500);
  if (website) { try { if (!["http:", "https:"].includes(new URL(website).protocol)) fail("invalid"); } catch { fail("invalid"); } }
  choice("stage", ["seed", "early-growth", "scale-up"]);
  choice("focus", ["health", "learning", "marketing", "services", "other"]);
  choice("market", ["B2C", "B2B (MKB)", "B2B (SME)", "B2B (enterprise)", "Combinatie", "Combination"], false);
  text("description", true, 500); text("use", true); text("investors", true);
  for (const key of ["year", "fte", "revenue", "mrr", "customers", "round", "amount"]) {
    const value = text(key, ["round", "amount"].includes(key), 20);
    if (value && (!/^\d+(\.\d+)?$/.test(value) || !Number.isFinite(Number(value)) || Number(value) > 1e12)) fail("invalid");
    if (value && key !== "fte" && !Number.isInteger(Number(value))) fail("invalid");
    if (value && key === "year" && (Number(value) < 1950 || Number(value) > 2030)) fail("invalid");
  }
  choice("board", ["0", "1", "2"]);
  for (let i = 0; i < 6; i++) { choice(`criterion-${i}`, ["0", "1", "2"]); text(`explanation-${i}`); }
  choice("urgent", ["on"], false);
  if (fields.urgent) {
    text("urgentWhy", true, 500);
    const date = text("urgentDate", true, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) fail("invalid");
  }
  text("source", false, 160);
  choice("privacy", ["on"]);
  return fields;
}

async function readAttachments(form: FormData) {
  const attachments: { filename: string; content: string }[] = [];
  let total = 0;
  for (const key of ["deck", "financial", "otherFiles"]) {
    const entries = form.getAll(key).filter(v => !(v instanceof File && !v.name && v.size === 0));
    if (key !== "otherFiles" && entries.length !== 1) fail("files");
    for (const entry of entries) {
      if (!(entry instanceof File) || !entry.size) fail("files");
      total += entry.size;
      if (total > contactLimits.totalFileBytes || attachments.length >= contactLimits.files) fail("files", 413);
      const ext = entry.name.toLowerCase().match(/\.(pdf|xls|xlsx)$/)?.[1];
      if (!ext || (key === "deck" && ext !== "pdf")) fail("files");
      const buffer = Buffer.from(await entry.arrayBuffer());
      const valid = ext === "pdf" ? buffer.subarray(0, 5).toString() === "%PDF-"
        : ext === "xls" ? buffer.subarray(0, 8).equals(Buffer.from("d0cf11e0a1b11ae1", "hex"))
        : buffer.subarray(0, 4).equals(Buffer.from("504b0304", "hex"));
      if (!valid) fail("files");
      const filename = `${attachments.length + 1}-${entry.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-160)}`;
      attachments.push({ filename, content: buffer.toString("base64") });
    }
  }
  return attachments;
}

const labels: Record<string, string> = {
  taal: "Language", name: "Name", role: "Role", email: "Email", phone: "Phone", company: "Company", website: "Website", city: "Location", year: "Year founded", fte: "FTE", stage: "Stage", focus: "Focus", market: "Market", description: "Company description", revenue: "Revenue (EUR)", mrr: "MRR (EUR)", customers: "Paying customers", round: "Round (EUR)", amount: "Requested from Ormac (EUR)", use: "Use of funds and milestones", investors: "Other investors", board: "Advisory board", urgent: "Urgent", urgentWhy: "Urgency reason", urgentDate: "Deadline", source: "Referral source", privacy: "Privacy statement acknowledged",
};

function emailText(fields: Record<string, string>, id: string) {
  const criteria = ["Working product", "First paying customers", "Market urgency", "Complementary team", "Scalable model", "Clear investment goal"];
  return `New Ormac investment proposal\nReference: ${id}\n\n` + Object.entries(fields).map(([key, value]) => {
    let display = value || "—";
    if (key === "board") display = ["Already has a board", "Open to a board", "Would like more information"][Number(value)];
    if (key.startsWith("criterion-")) display = ["Yes", "Partly", "Not yet"][Number(value)];
    if (["urgent", "privacy"].includes(key)) display = value === "on" ? "Yes" : "No";
    const criterion = key.match(/^(criterion|explanation)-(\d)$/);
    const label = labels[key] ?? (criterion ? `${Number(criterion[2]) + 1}. ${criteria[Number(criterion[2])]}${criterion[1] === "explanation" ? " — explanation" : ""}` : key);
    return `${label}:\n${display}`;
  }).join("\n\n");
}

// A supplementary, bounded per-process limit. Turnstile remains the primary abuse check.
const attempts = new Map<string, { count: number; until: number }>();
function limited(email: string) {
  const now = Date.now();
  for (const [key, item] of attempts) if (item.until <= now) attempts.delete(key);
  const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const item = attempts.get(key) ?? { count: 0, until: now + 15 * 60_000 };
  if (item.count >= 5 || (!attempts.has(key) && attempts.size >= 2000)) return true;
  if (!attempts.has(key)) setTimeout(() => { if (attempts.get(key) === item) attempts.delete(key); }, 15 * 60_000).unref();
  item.count++; attempts.set(key, item); return false;
}

export async function handleContact(request: Request, config: ContactConfig | null, sendRequest: typeof fetch = fetch) {
  try {
    if (!config) fail("unavailable", 503);
    const origin = request.headers.get("origin");
    if (!origin || !config.origins.includes(origin)) fail("invalid", 403);
    const form = await boundedFormData(request);
    if (form.get("companyFax")) fail("invalid");
    const token = form.get("cf-turnstile-response");
    if (typeof token !== "string" || !token || token.length > 2048) fail("human", 403);
    const id = form.get("submissionId");
    if (typeof id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) fail("invalid");
    const fields = readFields(form);
    const attachments = await readAttachments(form);
    const verification = await sendRequest("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: config.secret, response: token }), signal: AbortSignal.timeout(10_000),
    });
    if (!verification.ok) fail("human", 503);
    const result = await verification.json();
    if (result.success !== true || result.action !== "contact" || result.hostname !== new URL(origin).hostname) fail("human", 403);
    if (limited(fields.email)) fail("rate", 429);
    const payload = {
      from: config.from, to: ["plan@ormac.nl"], reply_to: fields.email,
      subject: `${fields.urgent ? "[URGENT] " : ""}Ormac plan: ${fields.company.replace(/[\r\n]/g, " ")}`,
      text: emailText(fields, id), attachments,
    };
    const serialized = JSON.stringify(payload);
    const digest = createHash("sha256").update(serialized).digest("hex");
    const sent = await sendRequest("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact-${id}-${digest}` },
      body: serialized, signal: AbortSignal.timeout(20_000),
    });
    if (!sent.ok) fail("delivery", 502);
    const receipt = await sent.json();
    if (typeof receipt.id !== "string" || !receipt.id) fail("delivery", 502);
    return reply({ ok: true, reference: id });
  } catch (error) {
    if (error instanceof ContactError) return reply({ ok: false, error: error.code }, error.status);
    // Never return provider responses, credentials, form data or file contents.
    return reply({ ok: false, error: "delivery" }, 502);
  }
}
