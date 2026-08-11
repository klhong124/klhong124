"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/utils/cn";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { sendContactMessage } from "@/app/actions/contact";
import { initialContactState, type ContactState } from "@/lib/contact/state";

/**
 * Every field has a real <label>. The previous version used placeholders as
 * labels, which vanish the moment you start typing, had no email input type, no
 * autocomplete, no error states, and no way to announce the result.
 *
 * Progressive enhancement is genuine: `action` points at a server action, so
 * with JavaScript disabled the browser posts the form natively and the server
 * re-renders this component with validation errors and the typed values intact.
 */
export function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    sendContactMessage,
    initialContactState,
  );

  return (
    <form action={formAction} noValidate className="space-y-6">
      <Field
        name="name"
        label="Your name"
        autoComplete="name"
        defaultValue={state.values?.name}
        error={state.fieldErrors?.name}
      />
      <Field
        name="email"
        type="email"
        label="Email address"
        hint="So I can reply."
        autoComplete="email"
        inputMode="email"
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
      />
      <Field
        name="message"
        label="Message"
        hint="A sentence or two about the role or project is plenty."
        multiline
        defaultValue={state.values?.message}
        error={state.fieldErrors?.message}
      />

      {/* Honeypot: hidden from sight and from assistive technology, but a real
          field as far as a bot is concerned. Not `display: none`, which some
          bots detect and skip. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
      </div>

      {/* Announced on change, so the outcome reaches a screen reader without
          the user having to hunt for it. */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-fluid-sm",
          state.status === "success" && "text-accent",
          state.status === "error" && "text-red-300",
        )}
      >
        {state.message}
      </p>
    </form>
  );
}

function SubmitButton() {
  // Reflects the real pending state of the action, including without JavaScript
  // where it simply never renders as pending.
  const { pending } = useFormStatus();

  return (
    <MagneticButton type="submit" variant="primary" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </MagneticButton>
  );
}

type FieldProps = {
  name: string;
  label: string;
  hint?: string;
  type?: "text" | "email";
  multiline?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "text";
  defaultValue?: string;
  error?: string;
};

function Field({
  name,
  label,
  hint,
  type = "text",
  multiline,
  autoComplete,
  inputMode,
  defaultValue,
  error,
}: FieldProps) {
  const id = `contact-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id,
    name,
    required: true,
    defaultValue,
    autoComplete,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    className: cn(
      "w-full rounded-lg border bg-black/30 p-3 text-fg",
      error ? "border-red-400/70" : "border-white/20",
    ),
  };

  return (
    <div>
      <label htmlFor={id} className="block text-fluid-sm font-medium text-fg">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-fluid-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {multiline ? (
          <textarea {...shared} rows={6} className={cn(shared.className, "min-h-36 resize-y")} />
        ) : (
          <input {...shared} type={type} inputMode={inputMode} />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-fluid-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
