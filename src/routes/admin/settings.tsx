import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import { getEducation, getSiteSettings, updateEducation, updateSiteSettings } from "@/lib/admin/collections/settings";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { fieldLabelClass, inputClass, panelClass, textareaClass } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/settings")({
  beforeLoad: requireAdminOrRedirect,
  loader: async () => ({ site: await getSiteSettings(), education: await getEducation() }),
  component: SettingsAdmin,
});

const SITE_FIELDS = [
  ["name", "Name"],
  ["legal", "Legal name"],
  ["role", "Role (short)"],
  ["roles", "Roles (nav eyebrow)"],
  ["tagline", "Tagline"],
  ["email", "Email"],
  ["whatsapp", "WhatsApp link"],
  ["cv", "CV path/URL"],
  ["location", "Location"],
  ["market", "Market line"],
  ["availability", "Availability line"],
  ["linkedin", "LinkedIn"],
  ["github", "GitHub"],
  ["instagram", "Instagram"],
  ["x", "X"],
] as const;

const EDU_FIELDS = [
  ["degree", "Degree"],
  ["school", "School"],
  ["dates", "Dates"],
  ["note", "Note"],
  ["secondary", "Secondary school"],
] as const;

function SettingsAdmin() {
  const router = useRouter();
  const { site, education } = Route.useLoaderData() as {
    site: Record<string, unknown>;
    education: Record<string, unknown>;
  };
  const [siteValues, setSiteValues] = useState<Record<string, unknown>>(site);
  const [phones, setPhones] = useState((site.phones as string[]) ?? []);
  const [philosophy, setPhilosophy] = useState((site.philosophy as string) ?? "");
  const [eduValues, setEduValues] = useState<Record<string, unknown>>(education);
  const [savingSite, setSavingSite] = useState(false);
  const [savingEdu, setSavingEdu] = useState(false);

  const saveSite = async () => {
    setSavingSite(true);
    try {
      await updateSiteSettings({
        data: {
          name: String(siteValues.name ?? ""),
          legal: String(siteValues.legal ?? ""),
          role: String(siteValues.role ?? ""),
          roles: String(siteValues.roles ?? ""),
          tagline: String(siteValues.tagline ?? ""),
          email: String(siteValues.email ?? ""),
          phones,
          whatsapp: String(siteValues.whatsapp ?? ""),
          cv: String(siteValues.cv ?? ""),
          location: String(siteValues.location ?? ""),
          market: String(siteValues.market ?? ""),
          availability: String(siteValues.availability ?? ""),
          linkedin: String(siteValues.linkedin ?? ""),
          github: String(siteValues.github ?? ""),
          instagram: String(siteValues.instagram ?? ""),
          x: String(siteValues.x ?? ""),
          philosophy,
        },
      });
      await router.invalidate();
    } finally {
      setSavingSite(false);
    }
  };

  const saveEdu = async () => {
    setSavingEdu(true);
    try {
      await updateEducation({
        data: {
          degree: String(eduValues.degree ?? ""),
          school: String(eduValues.school ?? ""),
          dates: String(eduValues.dates ?? ""),
          note: String(eduValues.note ?? ""),
          secondary: String(eduValues.secondary ?? ""),
        },
      });
      await router.invalidate();
    } finally {
      setSavingEdu(false);
    }
  };

  return (
    <AdminShell title="Site settings">
      <div className="flex flex-col gap-6">
        <section className={panelClass}>
          <h2 className="font-display text-2xl tracking-tight">Profile & contact</h2>
          <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {SITE_FIELDS.map(([key, label]) => (
              <label key={key} className="block">
                <span className={fieldLabelClass}>{label}</span>
                <input
                  value={(siteValues[key] as string) ?? ""}
                  onChange={(e) => setSiteValues({ ...siteValues, [key]: e.target.value })}
                  className={inputClass}
                />
              </label>
            ))}
            <label className="block sm:col-span-2">
              <span className={fieldLabelClass}>Phone numbers (comma-separated)</span>
              <input
                value={phones.join(", ")}
                onChange={(e) => setPhones(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                className={inputClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={fieldLabelClass}>Philosophy quote (About page)</span>
              <textarea
                value={philosophy}
                onChange={(e) => setPhilosophy(e.target.value)}
                rows={4}
                className={textareaClass}
              />
            </label>
          </div>
          <div className="border-border mt-5 border-t pt-5">
            <Button size="sm" onClick={saveSite} disabled={savingSite}>
              {savingSite ? "Saving…" : "Save profile & contact"}
            </Button>
          </div>
        </section>

        <section className={panelClass}>
          <h2 className="font-display text-2xl tracking-tight">Education</h2>
          <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {EDU_FIELDS.map(([key, label]) => (
              <label key={key} className="block">
                <span className={fieldLabelClass}>{label}</span>
                <input
                  value={(eduValues[key] as string) ?? ""}
                  onChange={(e) => setEduValues({ ...eduValues, [key]: e.target.value })}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
          <div className="border-border mt-5 border-t pt-5">
            <Button size="sm" onClick={saveEdu} disabled={savingEdu}>
              {savingEdu ? "Saving…" : "Save education"}
            </Button>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
