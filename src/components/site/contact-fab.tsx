import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquareText, X } from "lucide-react";
import { CONTACT_CHANNELS } from "@/lib/personal-contact";
import { CHANNEL_ICONS, CHANNEL_TINTS } from "@/components/site/contact-channel-ui";
import { Magnetic } from "@/components/site/magnetic";

/** Site-wide floating action button — a fast path to WhatsApp/call/text/email. */
export function ContactFab() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Magnetic className="fixed right-5 bottom-6 z-30 sm:right-8 sm:bottom-8">
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label="Contact Victor"
            className="grid size-14 place-items-center rounded-full bg-accent text-accent-fg shadow-[0_8px_30px_-8px_var(--vy-accent)] transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <MessageSquareText className="size-6" />
          </button>
        </Dialog.Trigger>
      </Magnetic>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-[100] bg-navy-deep/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-5">
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-sm rounded-3xl border border-border bg-bg-elevated/70 p-5 shadow-[var(--shadow-border-hover)] backdrop-blur-2xl sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="font-display text-2xl tracking-tight">
                        Let's connect
                      </Dialog.Title>
                      <Dialog.Description className="text-muted mt-1 text-sm">
                        Pick whatever's easiest — I'll see it either way.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close"
                        className="text-subtle hover:text-fg grid size-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-fg/6"
                      >
                        <X className="size-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="mt-5 flex flex-col gap-1.5">
                    {CONTACT_CHANNELS.map((c) => (
                      <a
                        key={c.id}
                        href={c.href}
                        target={c.id === "whatsapp" ? "_blank" : undefined}
                        rel={c.id === "whatsapp" ? "noreferrer" : undefined}
                        className="group flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-fg/6"
                      >
                        <span className={`grid size-11 shrink-0 place-items-center rounded-full ${CHANNEL_TINTS[c.id]}`}>
                          {CHANNEL_ICONS[c.id]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{c.label}</span>
                          <span className="text-subtle block truncate text-xs">{c.actionLabel}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
