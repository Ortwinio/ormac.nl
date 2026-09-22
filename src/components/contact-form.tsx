"use client";

import { FormEvent, type ReactNode, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { copy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  description: string;
  focus: string;
  stage: string;
  round: string;
  amount: string;
  use: string;
  investors: string;
  urgency: boolean;
  urgencyWhy: string;
  privacy: boolean;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  role: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  description: "",
  focus: "",
  stage: "",
  round: "",
  amount: "",
  use: "",
  investors: "",
  urgency: false,
  urgencyWhy: "",
  privacy: false,
};

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale].contact;
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(next: FormState): FieldErrors {
    const nextErrors: FieldErrors = {};
    if (!next.name.trim()) nextErrors.name = t.errors.name;
    if (!next.email.trim()) nextErrors.email = t.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) {
      nextErrors.email = t.errors.emailInvalid;
    }
    if (!next.company.trim()) nextErrors.company = t.errors.company;
    if (next.description.trim().length < 24) {
      nextErrors.description = t.errors.description;
    }
    if (!next.focus) nextErrors.focus = t.errors.focus;
    if (!next.stage) nextErrors.stage = t.errors.stage;
    if (!next.privacy) nextErrors.privacy = t.errors.privacy;
    if (next.urgency && !next.urgencyWhy.trim()) {
      nextErrors.urgencyWhy = t.errors.urgency;
    }
    return nextErrors;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStatus("submitting");
    window.setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-card px-6 py-10 text-center sm:px-10">
        <CheckCircle2 className="mx-auto size-8 text-[var(--gold)]" aria-hidden />
        <h3 className="font-heading mt-4 text-2xl tracking-tight">
          {t.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t.success}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm font-medium text-foreground">
          {t.successLang}
        </p>
        <p className="mt-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
          taal: {locale}
        </p>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-6 h-10 rounded-full px-5 tracking-[0.12em] uppercase"
          )}
          onClick={() => {
            setValues(initial);
            setErrors({});
            setStatus("idle");
          }}
        >
          {t.another}
        </button>
      </div>
    );
  }

  const privacyHref = locale === "en" ? "/en/privacy/" : "/privacy/";

  return (
    <form onSubmit={onSubmit} noValidate action="#" className="grid gap-5">
      <input type="hidden" name="taal" value={locale} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.fields.name} error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            className="h-11 bg-background"
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>
        <Field id="role" label={t.fields.role} optional optionalLabel={t.optional}>
          <Input
            id="role"
            name="role"
            autoComplete="organization-title"
            value={values.role}
            className="h-11 bg-background"
            onChange={(event) => update("role", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label={t.fields.email} error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            className="h-11 bg-background"
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>
        <Field id="phone" label={t.fields.phone} optional optionalLabel={t.optional}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            className="h-11 bg-background"
            onChange={(event) => update("phone", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="company" label={t.fields.company} error={errors.company}>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            aria-invalid={Boolean(errors.company)}
            className="h-11 bg-background"
            onChange={(event) => update("company", event.target.value)}
          />
        </Field>
        <Field
          id="website"
          label={t.fields.website}
          optional
          optionalLabel={t.optional}
        >
          <Input
            id="website"
            name="website"
            type="url"
            autoComplete="url"
            value={values.website}
            className="h-11 bg-background"
            onChange={(event) => update("website", event.target.value)}
          />
        </Field>
      </div>

      <Field id="description" label={t.fields.description} error={errors.description}>
        <Textarea
          id="description"
          name="description"
          maxLength={500}
          rows={5}
          value={values.description}
          aria-invalid={Boolean(errors.description)}
          className="min-h-28 bg-background"
          onChange={(event) => update("description", event.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="focus" label={t.fields.focus} error={errors.focus}>
          <Select
            name="focus"
            value={values.focus || null}
            onValueChange={(value) => update("focus", value ?? "")}
          >
            <SelectTrigger
              id="focus"
              aria-invalid={Boolean(errors.focus)}
              className="h-11 w-full bg-background"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              {t.focusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field id="stage" label={t.fields.stage} error={errors.stage}>
          <Select
            name="stage"
            value={values.stage || null}
            onValueChange={(value) => update("stage", value ?? "")}
          >
            <SelectTrigger
              id="stage"
              aria-invalid={Boolean(errors.stage)}
              className="h-11 w-full bg-background"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              {t.stageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="round" label={t.fields.round} optional optionalLabel={t.optional}>
          <Input
            id="round"
            name="round"
            inputMode="numeric"
            value={values.round}
            className="h-11 bg-background"
            onChange={(event) => update("round", event.target.value)}
          />
        </Field>
        <Field
          id="amount"
          label={t.fields.amount}
          optional
          optionalLabel={t.optional}
        >
          <Input
            id="amount"
            name="amount"
            inputMode="numeric"
            value={values.amount}
            className="h-11 bg-background"
            onChange={(event) => update("amount", event.target.value)}
          />
        </Field>
      </div>

      <Field id="use" label={t.fields.use} optional optionalLabel={t.optional}>
        <Textarea
          id="use"
          name="use"
          rows={4}
          value={values.use}
          className="min-h-24 bg-background"
          onChange={(event) => update("use", event.target.value)}
        />
      </Field>

      <Field
        id="investors"
        label={t.fields.investors}
        optional
        optionalLabel={t.optional}
      >
        <Textarea
          id="investors"
          name="investors"
          rows={3}
          value={values.investors}
          className="min-h-20 bg-background"
          onChange={(event) => update("investors", event.target.value)}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          name="urgency"
          checked={values.urgency}
          className="mt-1 size-4 accent-[#123C39]"
          onChange={(event) => update("urgency", event.target.checked)}
        />
        <span>{t.fields.urgency}</span>
      </label>

      {values.urgency ? (
        <Field id="urgencyWhy" label={t.fields.urgencyWhy} error={errors.urgencyWhy}>
          <Input
            id="urgencyWhy"
            name="urgencyWhy"
            value={values.urgencyWhy}
            aria-invalid={Boolean(errors.urgencyWhy)}
            className="h-11 bg-background"
            onChange={(event) => update("urgencyWhy", event.target.value)}
          />
        </Field>
      ) : null}

      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          name="privacy"
          checked={values.privacy}
          aria-invalid={Boolean(errors.privacy)}
          className="mt-1 size-4 accent-[#123C39]"
          onChange={(event) => update("privacy", event.target.checked)}
        />
        <span>
          {t.fields.privacy}{" "}
          <Link href={privacyHref} className="underline underline-offset-2">
            {copy[locale].footer.privacy}
          </Link>
          .
        </span>
      </label>
      {errors.privacy ? (
        <p role="alert" className="text-xs text-destructive">
          {errors.privacy}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t.emailHint}
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            buttonVariants(),
            "h-11 rounded-full px-6 tracking-[0.14em] uppercase disabled:opacity-50"
          )}
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  optionalLabel,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  optionalLabel?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[0.7rem] tracking-[0.16em] uppercase">
        {label}
        {optional ? (
          <span className="font-normal tracking-normal text-muted-foreground normal-case">
            {optionalLabel}
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
