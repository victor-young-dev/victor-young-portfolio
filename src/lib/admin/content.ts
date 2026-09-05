import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import type {
  Achievement,
  Capability,
  Collaboration,
  Education,
  Ecosystem,
  Experience,
  GalleryItem,
  Leadership,
  Service,
  SiteContent,
  SiteSettings,
  StoryStep,
  VentureItem,
  WorkItem,
} from "@/lib/site-content";

/** jsonb round-trips as a parsed array on both Neon and PGLite — this just guards the edge cases. */
function asArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

type GalleryRow = {
  id: number;
  work_item_id: number;
  kind: "image" | "video" | "document";
  src: string | null;
  youtube_id: string | null;
  title: string | null;
  sort_order: number;
};

function toGalleryItem(row: GalleryRow): GalleryItem {
  if (row.kind === "video") {
    return { id: row.id, kind: "video", youtubeId: row.youtube_id ?? "", title: row.title };
  }
  if (row.kind === "document") {
    return { id: row.id, kind: "document", src: row.src ?? "", title: row.title ?? "" };
  }
  return { id: row.id, kind: "image", src: row.src ?? "" };
}

/** Everything the public site reads, in one round trip. Server-only — call via the RPC below. */
async function loadSiteContent(): Promise<SiteContent> {
  const sql = await getSql();

  const [siteRows, workRows, galleryRows, ventureRows, leadershipRows, collabRows, expRows, capRows, serviceRows, storyRows, eduRows, achRows] =
    await Promise.all([
      sql`select * from site_settings where id = 1`,
      sql`select * from work_items order by kind, sort_order, id`,
      sql`select * from gallery_items order by sort_order, id`,
      sql`select * from ventures order by sort_order, id`,
      sql`select * from leadership order by sort_order, id`,
      sql`select * from collaborations order by sort_order, id`,
      sql`select * from experience order by sort_order, id`,
      sql`select * from capabilities order by sort_order, id`,
      sql`select * from services order by sort_order, id`,
      sql`select * from story_steps order by sort_order, id`,
      sql`select * from education where id = 1`,
      sql`select * from achievements order by sort_order, id`,
    ]);

  const siteRow = siteRows[0] as Record<string, unknown> | undefined;
  const site: SiteSettings = {
    name: (siteRow?.name as string) ?? "",
    legal: (siteRow?.legal as string) ?? "",
    role: (siteRow?.role as string) ?? "",
    roles: (siteRow?.roles as string) ?? "",
    tagline: (siteRow?.tagline as string) ?? "",
    email: (siteRow?.email as string) ?? "",
    phones: asArray(siteRow?.phones),
    whatsapp: (siteRow?.whatsapp as string) ?? "",
    cv: (siteRow?.cv as string) ?? "",
    location: (siteRow?.location as string) ?? "",
    market: (siteRow?.market as string) ?? "",
    availability: (siteRow?.availability as string) ?? "",
    linkedin: (siteRow?.linkedin as string) ?? "",
    github: (siteRow?.github as string) ?? "",
    instagram: (siteRow?.instagram as string) ?? "",
    x: (siteRow?.x as string) ?? "",
    philosophy: (siteRow?.philosophy as string) ?? "",
  };

  const galleriesByWorkId = new Map<number, GalleryItem[]>();
  for (const row of galleryRows as GalleryRow[]) {
    const list = galleriesByWorkId.get(row.work_item_id) ?? [];
    list.push(toGalleryItem(row));
    galleriesByWorkId.set(row.work_item_id, list);
  }

  const allWork: WorkItem[] = (workRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    kind: r.kind as "product" | "client",
    slug: r.slug as string,
    title: r.title as string,
    year: r.year as string,
    status: r.status as string,
    arm: r.arm as string,
    summary: r.summary as string,
    body: r.body as string,
    image: (r.image as string | null) ?? null,
    tags: asArray(r.tags),
    href: (r.href as string | null) ?? null,
    gallery: galleriesByWorkId.get(r.id as number) ?? [],
  }));
  const work = allWork.filter((w) => w.kind === "product");
  const clientWork = allWork.filter((w) => w.kind === "client");

  const ventures: VentureItem[] = (ventureRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    slug: r.slug as string,
    title: r.title as string,
    year: r.year as string,
    role: r.role as string,
    image: r.image as string,
    copy: r.copy as string,
    href: (r.href as string | null) ?? null,
  }));

  const ecosystem: Ecosystem = {
    root: "RayzorVerse",
    branches: ventures.map((v) => ({
      title: v.title,
      note: v.role,
      children: v.slug === "labs" ? work.map((w) => w.title) : [],
    })),
  };

  const leadership: Leadership[] = (leadershipRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    slug: r.slug as string,
    title: r.title as string,
    year: r.year as string,
    role: r.role as string,
    image: r.image as string,
    copy: r.copy as string,
  }));

  const collaborations: Collaboration[] = (collabRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    title: r.title as string,
    role: r.role as string,
    copy: r.copy as string,
  }));

  const experience: Experience[] = (expRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    title: r.title as string,
    org: r.org as string,
    dates: r.dates as string,
    copy: r.copy as string,
  }));

  const capabilities: Capability[] = (capRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    title: r.title as string,
    items: asArray(r.items),
  }));

  const services: Service[] = (serviceRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    title: r.title as string,
    copy: r.copy as string,
    items: asArray(r.items),
  }));

  const story: StoryStep[] = (storyRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    step: r.step as string,
    copy: r.copy as string,
  }));

  const eduRow = eduRows[0] as Record<string, unknown> | undefined;
  const education: Education = {
    degree: (eduRow?.degree as string) ?? "",
    school: (eduRow?.school as string) ?? "",
    dates: (eduRow?.dates as string) ?? "",
    note: (eduRow?.note as string) ?? "",
    secondary: (eduRow?.secondary as string) ?? "",
  };

  const achievements: Achievement[] = (achRows as Record<string, unknown>[]).map((r) => ({
    id: r.id as number,
    title: r.title as string,
    issuer: r.issuer as string,
    date: r.date as string,
    image: (r.image as string | null) ?? null,
  }));

  return {
    site,
    work,
    clientWork,
    allWork,
    ventures,
    ecosystem,
    leadership,
    collaborations,
    experience,
    capabilities,
    services,
    story,
    education,
    achievements,
  };
}

export const getSiteContent = createServerFn({ method: "GET" }).handler(loadSiteContent);
