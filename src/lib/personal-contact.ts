/**
 * The always-on-hand number/email for the contact FAB and the "Let's talk"
 * channel rows — deliberately separate from `site_settings` (SITE.email /
 * SITE.phones), which stays RayzorVerse's formal, admin-editable contact
 * info. This is Victor's own line, not meant to be edited from the admin.
 */
const PHONE_DIGITS = "2349123531899";
export const PERSONAL_PHONE_DISPLAY = "+234 912 353 1899";
export const PERSONAL_EMAIL = "uzorvictornweike@gmail.com";

const DEFAULT_MESSAGE =
  "Hi Victor — I came across your portfolio and I'd like to talk about working together.";

export function whatsappHref(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
}

export function callHref(): string {
  return `tel:+${PHONE_DIGITS}`;
}

export function smsHref(message: string = DEFAULT_MESSAGE): string {
  return `sms:+${PHONE_DIGITS}?&body=${encodeURIComponent(message)}`;
}

export function personalEmailHref(
  subject: string = "Let's work together",
  body: string = DEFAULT_MESSAGE,
): string {
  return `mailto:${PERSONAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export interface ContactChannel {
  id: "whatsapp" | "call" | "sms" | "email";
  label: string;
  /** The engaging line shown in the FAB and the "Let's talk" channel rows. */
  phrase: string;
  actionLabel: string;
  href: string;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    phrase: "Reach me on WhatsApp — quick replies, no formalities.",
    actionLabel: "Chat now",
    href: whatsappHref(),
  },
  {
    id: "call",
    label: "Call",
    phrase: "Rather talk it out? Call me directly.",
    actionLabel: "Call now",
    href: callHref(),
  },
  {
    id: "sms",
    label: "Text",
    phrase: "Prefer typing? A text works just as well.",
    actionLabel: "Text me",
    href: smsHref(),
  },
  {
    id: "email",
    label: "Email",
    phrase: "Something detailed? Put it in an email.",
    actionLabel: "Email me",
    href: personalEmailHref(),
  },
];
