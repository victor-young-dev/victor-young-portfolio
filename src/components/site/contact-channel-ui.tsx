import { Mail, MessageSquareText, Phone } from "lucide-react";
import type { ContactChannel } from "@/lib/personal-contact";
import { WhatsAppIcon } from "@/components/site/brand-icons";

export const CHANNEL_ICONS: Record<ContactChannel["id"], React.ReactNode> = {
  whatsapp: <WhatsAppIcon className="size-5" />,
  call: <Phone className="size-5" />,
  sms: <MessageSquareText className="size-5" />,
  email: <Mail className="size-5" />,
};

export const CHANNEL_TINTS: Record<ContactChannel["id"], string> = {
  whatsapp: "bg-[#25D366]/15 text-[#25D366]",
  call: "bg-accent/15 text-accent",
  sms: "bg-fg/10 text-fg",
  email: "bg-danger/15 text-danger",
};
