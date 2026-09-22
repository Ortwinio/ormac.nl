"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { copy } from "@/lib/copy";
import { planFormCopy } from "@/lib/copy/plan-form";
import type { Locale } from "@/lib/i18n";
import { HumanCheck } from "./human-check";
import { contactLimits, documentExtensions } from "@/lib/contact-settings";
import s from "./ormac.module.css";

type Validatable = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function ContactForm({ locale }: { locale: Locale }) {
  const t = planFormCopy[locale];
  const fields = t.fields;
  const [step, setStep] = useState(0);
  const [description, setDescription] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<keyof typeof t.errors | null>(null);
  const [service, setService] = useState<{ ready: boolean; siteKey: string | null } | null>(null);
  const [token, setToken] = useState("");
  const [checkAttempt, setCheckAttempt] = useState(0);
  const submissionId = useRef("");
  const inFlight = useRef(false);
  const invalidField = useRef<Validatable | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const focusAfterChange = useRef(false);

  useEffect(() => {
    let active = true;
    fetch("/api/contact/", { cache: "no-store" })
      .then(async response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(data => { if (active) setService({ ready: data.ready === true, siteKey: typeof data.siteKey === "string" ? data.siteKey : null }); })
      .catch(() => { if (active) setService({ ready: false, siteKey: null }); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!focusAfterChange.current) return;
    focusAfterChange.current = false;
    formRef.current?.querySelector<HTMLElement>(success ? '[data-success]' : `[data-step="${step}"] legend`)?.focus();
    invalidField.current?.reportValidity();
    invalidField.current = null;
  }, [step, success]);

  function go(next: number) {
    setError(null);
    setToken("");
    focusAfterChange.current = true;
    setStep(next);
  }

  function validate(all = false) {
    const controls = formRef.current?.querySelectorAll<Validatable>(all ? "[data-step] input, [data-step] select, [data-step] textarea" : `[data-step="${step}"] input, [data-step="${step}"] select, [data-step="${step}"] textarea`);
    for (const field of controls ?? []) {
      if (!field.checkValidity()) {
        const fieldStep = Number(field.closest("[data-step]")?.getAttribute("data-step"));
        if (fieldStep !== step) { invalidField.current = field; go(fieldStep); }
        else field.reportValidity();
        return false;
      }
    }
    return true;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    if (!validate(step === 3)) return;
    if (step < 3) { go(step + 1); return; }
    if (!service?.ready) { setError("unavailable"); return; }
    if (!token) { setError("human"); return; }
    const form = formRef.current;
    if (!form || !validateFiles()) return;
    if (!submissionId.current) submissionId.current = crypto.randomUUID();
    const body = new FormData(form);
    body.set("cf-turnstile-response", token);
    body.set("submissionId", submissionId.current);
    inFlight.current = true;
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/contact/", { method: "POST", body, signal: AbortSignal.timeout(60_000) });
      // Hosting platforms can reject a large request before our JSON handler runs.
      if (response.status === 413) { setError("files"); return; }
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setError(Object.hasOwn(t.errors, result.error) ? result.error : "delivery");
        return;
      }
      focusAfterChange.current = true;
      setReference(submissionId.current);
      setSuccess(true);
    } catch { setError("delivery"); }
    finally {
      inFlight.current = false;
      setSending(false);
      setToken("");
      setCheckAttempt(attempt => attempt + 1);
    }
  }

  function validateFiles() {
    const inputs = Array.from(formRef.current?.querySelectorAll<HTMLInputElement>('input[type="file"]') ?? []);
    const files = inputs.flatMap(input => Array.from(input.files ?? []));
    const tooLarge = files.length > contactLimits.files || files.reduce((sum, file) => sum + file.size, 0) > contactLimits.totalFileBytes;
    let valid = true;
    for (const input of inputs) {
      const extensions = input.name === "deck" ? [".pdf"] : documentExtensions;
      const invalid = tooLarge || Array.from(input.files ?? []).some(file => !file.size || !extensions.some(ext => file.name.toLowerCase().endsWith(ext)));
      input.setCustomValidity(invalid ? t.fileError : "");
      if (invalid) valid = false;
    }
    if (!valid) setError("files");
    else setError(null);
    return valid;
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className={s.planForm} aria-busy={sending}>
      <input type="hidden" name="taal" value={locale} />
      <div className={s.honeypot} aria-hidden="true"><label>Company fax<input name="companyFax" tabIndex={-1} autoComplete="off" /></label></div>
      {!success && service && !service.ready && <p role="status" className={s.formError}>{t.errors.unavailable}</p>}
      <ol className={s.stepper} aria-label={locale === "nl" ? "Stappen" : "Steps"} hidden={success}>
        {t.steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className={index < step ? s.stepDone : undefined}>{index + 1} {label}</li>)}
      </ol>

      <fieldset data-step="0" className={s.formStep} disabled={sending} hidden={step !== 0 || success}>
        <legend tabIndex={-1}>{t.titles[0]}</legend>
        <div className={s.formGrid}>
          <Field label={fields.name}><input name="name" required autoComplete="name" /></Field>
          <Field label={fields.role}><input name="role" autoComplete="organization-title" /></Field>
          <Field label={fields.email}><input name="email" type="email" required autoComplete="email" /></Field>
          <Field label={fields.phone}><input name="phone" type="tel" autoComplete="tel" /></Field>
          <Field label={fields.company}><input name="company" required autoComplete="organization" /></Field>
          <Field label={fields.website}><input name="website" type="url" placeholder="https://" /></Field>
          <Field label={fields.city}><input name="city" autoComplete="address-level2" /></Field>
          <Field label={fields.year}><input name="year" type="number" min="1950" max="2030" inputMode="numeric" /></Field>
          <Field label={fields.fte}><input name="fte" type="number" min="0" step="0.1" inputMode="decimal" /></Field>
          <Field label={fields.stage}><select name="stage" required defaultValue=""><option value="">{t.choose}</option>{copy[locale].contact.stageOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
          <Field label={fields.focus}><select name="focus" required defaultValue=""><option value="">{t.choose}</option>{copy[locale].contact.focusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
          <Field label={fields.market}><select name="market" defaultValue=""><option value="">{t.choose}</option>{t.marketOptions.map(option => <option key={option}>{option}</option>)}</select></Field>
        </div>
        <Field label={fields.description}><textarea name="description" maxLength={500} required value={description} onChange={event => setDescription(event.target.value)} /><span className={s.counter} aria-live="polite">{description.length}/500</span></Field>
      </fieldset>

      <fieldset data-step="1" className={s.formStep} disabled={sending} hidden={step !== 1 || success}>
        <legend tabIndex={-1}>{t.titles[1]}</legend>
        <p className={s.formNote}>{t.roundNote}</p>
        <div className={s.formGrid}>
          <Field label={fields.revenue}><input name="revenue" type="number" min="0" inputMode="numeric" /></Field>
          <Field label={fields.mrr}><input name="mrr" type="number" min="0" inputMode="numeric" /></Field>
          <Field label={fields.customers}><input name="customers" type="number" min="0" inputMode="numeric" /></Field>
          <Field label={fields.round}><input name="round" type="number" min="0" required inputMode="numeric" /></Field>
        </div>
        <Field label={fields.amount}><input name="amount" type="number" min="0" required inputMode="numeric" /><span className={s.formNote}>{t.amountHint}</span></Field>
        <Field label={fields.use}><textarea name="use" required /></Field>
        <Field label={fields.investors}><textarea name="investors" required placeholder={t.investorsPlaceholder} /></Field>
        <fieldset className={s.radios}><legend>{t.board}</legend>{t.boardOptions.map((option, index) => <label key={option}><input type="radio" name="board" value={index} required />{option}</label>)}</fieldset>
      </fieldset>

      <fieldset data-step="2" className={s.formStep} disabled={sending} hidden={step !== 2 || success}>
        <legend tabIndex={-1}>{t.titles[2]}</legend>
        <p className={s.formNote}>{t.criteriaNote}</p>
        {copy[locale].founders.criteria.map((criterion, index) => <fieldset key={criterion.title} className={s.criterionQuestion}>
          <legend>{criterion.title}</legend><p className={s.formNote}>{t.criteriaQuestions[index]}</p>
          <div className={`${s.radios} ${s.inlineRadios}`}>{t.answers.map((answer, value) => <label key={answer}><input type="radio" name={`criterion-${index}`} value={value} required />{answer}</label>)}</div>
          <Field label={t.explanation}><textarea name={`explanation-${index}`} rows={2} /></Field>
        </fieldset>)}
      </fieldset>

      <fieldset data-step="3" className={s.formStep} disabled={sending} hidden={step !== 3 || success}>
        <legend tabIndex={-1}>{t.titles[3]}</legend>
        <p className={s.formNote}>{t.fileLimits}</p>
        <Field label={t.deck} upload><input name="deck" type="file" required accept=".pdf,application/pdf" onChange={validateFiles} /></Field>
        <Field label={t.financial} upload><input name="financial" type="file" required accept=".pdf,.xls,.xlsx,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={validateFiles} /></Field>
        <Field label={t.otherFiles} upload><input name="otherFiles" type="file" multiple accept=".pdf,.xls,.xlsx" onChange={validateFiles} /></Field>
        <label className={`${s.formCheck} ${s.urgent}`}><input name="urgent" type="checkbox" checked={urgent} onChange={event => setUrgent(event.target.checked)} /><span><strong>{t.urgent}</strong><br />{t.urgentNote}</span></label>
        <div className={s.formGrid} hidden={!urgent}>
          <Field label={t.urgentWhy}><input name="urgentWhy" required={urgent} disabled={!urgent} /></Field>
          <Field label={t.urgentDate}><input name="urgentDate" type="date" required={urgent} disabled={!urgent} /></Field>
        </div>
        <Field label={t.source}><select name="source" defaultValue=""><option value="">{t.choose}</option>{t.sources.map(option => <option key={option}>{option}</option>)}</select></Field>
        <label className={s.formCheck}><input name="privacy" type="checkbox" required /><span>{t.privacy} * <Link href={locale === 'nl' ? '/privacy/#privacy-top' : '/en/privacy/#privacy-top'}>{copy[locale].footer.privacy}</Link></span></label>
        {step === 3 && !success && <div className={s.humanCheck}>
          <h3>{t.humanTitle}</h3><p className={s.formNote}>{t.humanNote}</p>
          {!service ? <p role="status">{t.checking}</p> : service.ready && service.siteKey ? <>
            <HumanCheck key={checkAttempt} locale={locale} siteKey={service.siteKey} onToken={setToken} />
            <button type="button" className={s.checkRetry} disabled={sending} onClick={() => { setToken(""); setCheckAttempt(attempt => attempt + 1); }}>{t.retryHuman}</button>
          </> : <p>{t.errors.unavailable}</p>}
        </div>}
      </fieldset>

      {error && <p role="alert" className={s.formError}>{t.errors[error]}</p>}
      <div hidden={!success} className={s.formPreview} data-success tabIndex={-1}>
        <h3>{t.successTitle}</h3><p className={s.previewNote}>{t.successNote}</p>
        <p>{t.reference}: <strong>{reference}</strong></p>
      </div>
      <div className={s.formNav} hidden={success}>
        <span className={s.formNote}>{t.confidential}</span>
        <div>
          {step > 0 && <button type="button" disabled={sending} className={`${s.button} ${s.outline}`} onClick={() => go(step - 1)}>{t.previous}</button>}
          <button type="submit" disabled={sending || (step === 3 && (!token || !service?.ready))} className={s.button}>{sending ? t.sending : step === 3 ? t.send : t.next}</button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children, upload }: { label: string; children: ReactNode; upload?: boolean }) {
  return <label className={`${s.field} ${upload ? s.upload : ''}`}><span>{label}</span>{children}</label>;
}
