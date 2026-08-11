"use server";

import { Resend } from "resend";
import { z } from "zod";
import { profile } from "@/data/portfolio-content";
import {
  CONTACT_SUCCESS_MESSAGE,
  type ContactState,
} from "@/lib/contact/state";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter an email address we can reply to."),
  message: z
    .string()
    .trim()
    .min(20, "Please give me a little more detail — at least 20 characters.")
    .max(5000, "That is longer than 5000 characters. Please trim it down."),
  /** Honeypot. Real people leave it empty; most bots fill every field they find. */
  company: z.string().max(0).optional(),
});

/**
 * Handles the contact form.
 *
 * Replaces app/api/contact/route.ts, which validated two fields and then
 * returned `{ ok: true }` without sending anything — every message submitted
 * through the site was silently discarded.
 *
 * Implemented as a server action rather than a fetch handler so the form works
 * with JavaScript disabled: the browser posts the form natively and React
 * re-renders with the returned state.
 */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
  };

  const values = { name: raw.name, email: raw.email, message: raw.message };
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      // A filled honeypot is reported as success so bots get no signal.
      if (field === "company") return { status: "success", message: CONTACT_SUCCESS_MESSAGE };
      if (field === "name" || field === "email" || field === "message") {
        fieldErrors[field] ??= issue.message;
      }
    }

    return {
      status: "error",
      message: "Some details need fixing before this can send.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; contact form cannot send.");
    return {
      status: "error",
      message: `Sorry — the form cannot send right now. Please email me directly at ${profile.email}.`,
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Must be an address on a domain verified in Resend (ryankwan.dev is).
      // The mailbox does not need to exist; replies go to the visitor via replyTo.
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <inbox@ryankwan.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? profile.email],
      replyTo: parsed.data.email,
      subject: `Portfolio enquiry from ${parsed.data.name}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend rejected the contact message:", error);
      return {
        status: "error",
        message: `Sorry — that did not send. Please email me directly at ${profile.email}.`,
        values,
      };
    }

    return { status: "success", message: CONTACT_SUCCESS_MESSAGE };
  } catch (error) {
    console.error("Unexpected error sending contact message:", error);
    return {
      status: "error",
      message: `Sorry — something went wrong. Please email me directly at ${profile.email}.`,
      values,
    };
  }
}
