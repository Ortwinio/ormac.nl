"use client";

import { FormEvent, type ReactNode, useState } from "react";
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
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  stage: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  stage: "",
  message: "",
};

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.email.trim()) {
    errors.email = "An email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That email does not look valid.";
  }
  if (!values.stage) errors.stage = "Choose the stage that fits best.";
  if (!values.message.trim()) {
    errors.message = "Tell us a little about the company.";
  } else if (values.message.trim().length < 24) {
    errors.message = "A few more sentences will help us prepare.";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit() {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("sent");
    }, 600);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-card px-6 py-10 text-center sm:px-10">
        <CheckCircle2 className="mx-auto size-8 text-[var(--gold)]" aria-hidden />
        <h2 className="font-heading mt-4 text-2xl tracking-tight">
          Message received.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you, {values.name.split(" ")[0]}. This preview does not send
          email, but in production we would follow up from {values.email} within
          a few working days.
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
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate action="#" className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={errors.name}
        >
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            className="h-11 bg-background"
            placeholder="Your name"
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            className="h-11 bg-background"
            placeholder="you@company.com"
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="company" label="Company" optional>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            className="h-11 bg-background"
            placeholder="Company name"
            onChange={(event) => update("company", event.target.value)}
          />
        </Field>
        <Field id="stage" label="Stage" error={errors.stage}>
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
              <SelectValue placeholder="Select a stage" />
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              <SelectItem value="pre-seed">Pre-seed</SelectItem>
              <SelectItem value="seed">Seed</SelectItem>
              <SelectItem value="partnership">Partnership or advisory</SelectItem>
              <SelectItem value="other">Something else</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="message" label="How can we help?" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          className="min-h-36 bg-background"
          placeholder="A short note on the product, traction, and what you are looking for."
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          This form is a working interface only. Nothing is stored or emailed.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            buttonVariants(),
            "h-11 rounded-full px-6 tracking-[0.14em] uppercase disabled:opacity-50"
          )}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[0.7rem] tracking-[0.16em] uppercase">
        {label}
        {optional ? (
          <span className="font-normal tracking-normal text-muted-foreground normal-case">
            Optional
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
