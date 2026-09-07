/** Shared shape for the whole site's editable content — read by every page, written by /admin. */

export type SiteSettings = {
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

export type GalleryItem =
  | { id: number; kind: "image"; src: string; title?: string | null }
  | { id: number; kind: "video"; youtubeId: string; title?: string | null }
  | { id: number; kind: "document"; src: string; title: string };

export type WorkItem = {
  id: number;
  kind: "product" | "client";
  slug: string;
  title: string;
  year: string;
  status: string;
  arm: string;
  summary: string;
  body: string;
  image?: string | null;
  tags: string[];
  href?: string | null;
  gallery: GalleryItem[];
};

export type VentureItem = {
  id: number;
  slug: string;
  title: string;
  year: string;
  role: string;
  image: string;
  copy: string;
  href?: string | null;
};

export type Ecosystem = {
  root: string;
  branches: { title: string; note: string; children: string[] }[];
};

export type Leadership = {
  id: number;
  slug: string;
  title: string;
  year: string;
  role: string;
  image: string;
  copy: string;
};

export type Collaboration = {
  id: number;
  title: string;
  role: string;
  copy: string;
};

export type Experience = {
  id: number;
  title: string;
  org: string;
  dates: string;
  copy: string;
};

export type Capability = {
  id: number;
  title: string;
  items: string[];
};

export type Service = {
  id: number;
  title: string;
  copy: string;
  items: string[];
};

export type StoryStep = {
  id: number;
  step: string;
  copy: string;
};

export type Education = {
  degree: string;
  school: string;
  dates: string;
  note: string;
  secondary: string;
};

export type Achievement = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string | null;
};

export type WrittenWorkDetail = { label: string; value: string };

export type WrittenWork = {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  coverColor: string;
  coverAccent: string;
  overview: string;
  details: WrittenWorkDetail[];
  link?: string | null;
  linkLabel: string;
};

export type SiteContent = {
  site: SiteSettings;
  work: WorkItem[];
  clientWork: WorkItem[];
  allWork: WorkItem[];
  ventures: VentureItem[];
  ecosystem: Ecosystem;
  leadership: Leadership[];
  collaborations: Collaboration[];
  experience: Experience[];
  capabilities: Capability[];
  services: Service[];
  story: StoryStep[];
  education: Education;
  achievements: Achievement[];
  writtenWorks: WrittenWork[];
};

/**
 * "Home" stays in this list for the footer and the mobile menu, which both want
 * the full sitemap — the desktop bar filters it out itself since the logo
 * already goes home. Routing structure, not editable content — lives in code.
 */
export const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/rayzorverse", label: "RayzorVerse" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
