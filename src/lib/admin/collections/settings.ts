import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import type { JsonRow } from "@/lib/admin/sql-helpers";

type SiteSettingsInput = {
  name: string;
  legal: string;
  role: string;
  roles: string;
  tagline: string;
  email: string;
  phones: string[];
  whatsapp: string;
  cv: string;
  location: string;
  market: string;
  availability: string;
  linkedin: string;
  github: string;
  instagram: string;
  x: string;
  philosophy: string;
};

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<JsonRow>`select * from site_settings where id = 1`;
  return rows[0];
});

export const updateSiteSettings = createServerFn({ method: "POST" })
  .validator((data: SiteSettingsInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const sql = await getSql();
    await sql`
      update site_settings set
        name = ${data.name}, legal = ${data.legal}, role = ${data.role}, roles = ${data.roles},
        tagline = ${data.tagline}, email = ${data.email}, phones = ${JSON.stringify(data.phones)}::jsonb,
        whatsapp = ${data.whatsapp}, cv = ${data.cv}, location = ${data.location}, market = ${data.market},
        availability = ${data.availability}, linkedin = ${data.linkedin}, github = ${data.github},
        instagram = ${data.instagram}, x = ${data.x}, philosophy = ${data.philosophy}
      where id = 1
    `;
  });

type EducationInput = { degree: string; school: string; dates: string; note: string; secondary: string };

export const getEducation = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<JsonRow>`select * from education where id = 1`;
  return rows[0];
});

export const updateEducation = createServerFn({ method: "POST" })
  .validator((data: EducationInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const sql = await getSql();
    await sql`
      update education set degree = ${data.degree}, school = ${data.school}, dates = ${data.dates},
        note = ${data.note}, secondary = ${data.secondary}
      where id = 1
    `;
  });
