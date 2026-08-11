/**
 * Shared shape for the contact form's action state.
 *
 * Deliberately not in the `"use server"` module: a file with that directive may
 * only export async functions, so exporting the type and the initial value from
 * there breaks the client bundle.
 */

export type ContactFieldName = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactFieldName, string>>;
  /** Echoed back so a failed submit does not wipe what was typed, with or without JS. */
  values?: Partial<Record<ContactFieldName, string>>;
};

export const initialContactState: ContactState = { status: "idle" };

export const CONTACT_SUCCESS_MESSAGE =
  "Thanks — your message is on its way. I usually reply within a day or two.";
