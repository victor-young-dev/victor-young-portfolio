export const SITE = {
  name: "Victor Young",
  legal: "Victor Uzor",
  role: "Product Builder",
  roles: "Product Designer · Software Developer · Venture Builder",
  tagline: "I build ideas into brands, products & digital experiences.",
  email: "rayzorverse@gmail.com",
  phones: ["+234 813 613 2727", "+234 901 112 2881"],
  whatsapp: "https://wa.me/2348136132727",
  cv: "/cv.pdf",
  location: "Available worldwide",
  market: "Design, technology, and ventures in motion",
  availability: "Open to collaboration, product roles, and venture partnerships",
  linkedin: "https://www.linkedin.com/in/victor-uzor-3601343a9",
  github: "https://github.com/victor-young-dev",
  instagram: "https://www.instagram.com/victor_young.tech",
  x: "https://x.com/I_amVic_tor",
} as const;

/** One gallery entry — a screenshot, or a click-to-play YouTube video. */
export type GalleryItem =
  | { kind: "image"; src: string }
  | { kind: "video"; youtubeId: string; title?: string };

/** Shared shape for anything on the Work page — a Rayzor Labs product or a brand/client engagement. */
export type WorkItem = {
  slug: string;
  title: string;
  year: string;
  status: string;
  arm: string;
  summary: string;
  body: string;
  image?: string;
  tags: string[];
  href?: string;
  gallery: GalleryItem[];
};

/** Rayzor Labs — the software products. */
export const WORK: WorkItem[] = [
  {
    slug: "vendra",
    title: "Vendra",
    year: "2026",
    status: "In development",
    arm: "Rayzor Labs",
    summary:
      "Global social commerce built around vendor trust, community, and the actual workflow of selling.",
    body: "Vendra is a social-commerce platform from Rayzor Labs, built around a simple idea: shopping should feel like following people, not browsing a catalogue. Vendors post into a feed, buyers follow the sellers they trust, and discovery, discounts, and checkout happen right inside that feed — no separate storefront to build or maintain. Currently piloting in Port Harcourt, with light and dark interfaces both built out. I’m leading product, interface, and the systems underneath as it grows toward wider markets.",
    image: "/work/vendra.png",
    tags: ["Social commerce", "Trust", "Product"],
    gallery: [
      { kind: "video", youtubeId: "vdAhjhit1Fo", title: "Vendra — product walkthrough" },
      { kind: "image", src: "/work/vendra-light.png" },
    ],
  },
  {
    slug: "kaabo",
    title: "Kaabo",
    year: "2026",
    status: "In development",
    arm: "Rayzor Labs",
    summary:
      "Nigeria-first social commerce — designed around local market realities, not imported templates.",
    body: "Kaabo is the Nigeria-shaped counterpart to Vendra. Same family of ideas, different constraints: payments, trust, language, and how commerce actually happens on the ground. The waitlist and launch site are live now — the platform itself, with storefronts, a shoppable feed, wallet payments, and escrow, is being built phase by phase, sellers first.",
    image: "/work/kaabo.jpg",
    tags: ["Nigeria", "Commerce", "Product"],
    href: "https://kaabonglaunch.netlify.app/",
    gallery: [],
  },
  {
    slug: "resqnet",
    title: "ResQNet",
    year: "2026",
    status: "In development",
    arm: "Rayzor Labs",
    summary:
      "Emergency and security technology, born from final-year work and still evolving as a product.",
    body: "ResQNet started as a final-year Computer Science project and is now a Rayzor Labs product. A mobile application already exists; the broader system — how people call for help, how responders see it, how the product stays calm under pressure — is still being built. It is the most serious thing I ship, and it is treated that way.",
    image: "/work/resqnet.jpg",
    tags: ["Emergency", "Mobile", "Security"],
    gallery: [],
  },
];

/**
 * Brand & client work — BrandiLux's own showcase, plus everything delivered through it.
 * Every item without a real screenshot yet renders an InitialTile instead of a fabricated image.
 */
export const CLIENT_WORK: WorkItem[] = [
  {
    slug: "brandilux",
    title: "BrandiLux",
    year: "2025",
    status: "Live",
    arm: "Brand & Creative",
    summary: "Branding and digital experience — BrandiLux’s own site, built as its flagship showcase.",
    body: "BrandiLux is the creative and digital-services arm of RayzorVerse, and its own site is the clearest demonstration of the work: brand strategy, visual identity, and a premium digital experience built as one system rather than separate purchases. Delivered directly or with trusted collaborators, depending on scope.",
    image: "/work/brandilux.jpg",
    tags: ["Brand identity", "Web design", "Creative"],
    href: "https://brandi-lux.netlify.app/",
    gallery: [],
  },
  {
    slug: "mtx-resources",
    title: "MTX Resources",
    year: "2025 – Present",
    status: "Client work",
    arm: "IT / Digital & Creative",
    summary: "Six months inside an IT department, then ongoing virtual support — graphics, video, and digital workflows.",
    body: "A six-month SIWES placement in MTX Resources’ IT department that turned into ongoing virtual support: social media, content creation, graphics, short-form video, AI-assisted media, documentation, and data entry. Paid work, on-site and remote.",
    tags: ["Digital operations", "Content", "Graphics"],
    gallery: [],
  },
  {
    slug: "favour-link",
    title: "Favour Link",
    year: "2026",
    status: "Client work",
    arm: "Marketing & Brand",
    summary: "Rebranding and digital marketing for a solar and electrical solutions business.",
    body: "A short, paid engagement rebranding Favour Link Solar & Electrical Solutions: flyers, product catalogue visuals, WhatsApp marketing assets, short-form ads, customer messaging, and product organisation.",
    tags: ["Branding", "Marketing"],
    gallery: [],
  },
  {
    slug: "dlovesoulclinic",
    title: "DLoveSoulClinic",
    year: "2023 – 2025",
    status: "Client work",
    arm: "Content & Video",
    summary: "Social video and brand-consistent visuals across a three-month intensive.",
    body: "Paid monthly creative support for DLoveSoulClinic: social video content, visual consistency, and platform-adapted creative across a three-month intensive engagement between 2023 and 2025.",
    tags: ["Video", "Social content"],
    gallery: [],
  },
  {
    slug: "gbch",
    title: "GBCH",
    year: "2025",
    status: "Volunteer",
    arm: "Graphics & Content",
    summary: "Volunteer graphics and digital content for a startup’s visual communication.",
    body: "Volunteer creative support for God’s Beautiful Child Hub — graphics and digital content shaping the startup’s early visual communication.",
    tags: ["Graphics", "Volunteer"],
    gallery: [],
  },
];

/** Every card on the Work page, for slug lookups on the detail route. */
export const ALL_WORK: WorkItem[] = [...WORK, ...CLIENT_WORK];

export type VentureItem = {
  slug: string;
  title: string;
  year: string;
  role: string;
  image: string;
  copy: string;
  href?: string;
};

export const VENTURES: VentureItem[] = [
  {
    slug: "labs",
    title: "Rayzor Labs",
    year: "2026",
    role: "Technology & product",
    image: "/work/vendra.png",
    copy: "The software division. Home of Vendra, Kaabo, and ResQNet — products designed, prototyped, and shipped from inside the ecosystem.",
  },
  {
    slug: "apex",
    title: "Apex Wright Lab",
    year: "2026",
    role: "Writing & documentation",
    image: "/work/apex.jpg",
    copy: "A commercial writing practice for students, individuals, and organisations: project writing, proofreading, formatting, presentations, and proposals. 12+ students supported. Over NGN 300,000 in 2026; about NGN 500,000 since Year 1. Two summary books and a colouring book via Amazon KDP.",
    href: "https://apex-wright-lab.vercel.app/",
  },
  {
    slug: "brandilux",
    title: "BrandiLux",
    year: "2025",
    role: "Brand & creative",
    image: "/work/brandilux.jpg",
    copy: "Branding, graphics, social content, video, landing pages, and digital business setup — delivered directly or with trusted collaborators.",
    href: "https://brandi-lux.netlify.app/",
  },
];

/** The ecosystem tree — RayzorVerse's divisions and what sits under each. */
export const ECOSYSTEM = {
  root: "RayzorVerse",
  branches: [
    { title: "Rayzor Labs", note: "Technology & product", children: ["Vendra", "Kaabo", "ResQNet"] },
    { title: "Apex Wright Lab", note: "Writing & documentation", children: [] as string[] },
    { title: "BrandiLux", note: "Brand & creative", children: [] as string[] },
  ],
};

/**
 * Leadership roles held outside RayzorVerse — not owned, not a venture.
 * Kept separate from VENTURES so ownership never reads as ambiguous.
 */
export const LEADERSHIP = [
  {
    slug: "ferb",
    title: "FERB Intelligence",
    year: "2026",
    role: "CTO · Technology & strategic leadership",
    image: "/work/ferb.jpg",
    copy: "A cybersecurity and digital-forensics organisation where I lead technology direction, product structure, and planning — across FERB Shield, FERB Guard, and its training initiatives. Not a RayzorVerse venture: a leadership role I hold alongside it.",
  },
];

/** Work built for other people's products — never listed as mine. */
export const COLLABORATIONS = [
  {
    title: "KEN AI Detector",
    role: "Development collaboration",
    copy: "Contributed development support to Kenneth’s AI-detection tool. His product — I helped build it.",
  },
  {
    title: "Automated Timetable System",
    role: "Development collaboration",
    copy: "Helped Agu Victor write and build an automated timetabling system. His project — I contributed engineering.",
  },
];

export const EXPERIENCE = [
  {
    title: "Chief Technology Officer",
    org: "FERB Intelligence",
    dates: "2026 – Present",
    copy: "Technology, product, and strategic leadership in a cybersecurity / digital forensics organisation. Structure, product direction, documentation, design, and planning across FERB Shield, FERB Guard, LMS/training platforms, and related ventures.",
  },
  {
    title: "Founder & Lead",
    org: "RayzorVerse",
    dates: "2026 – Present",
    copy: "Building a multi-arm venture ecosystem across software, creative services, writing, and business systems. Presented at the 2026 National Enterprise Challenge and placed 1st at the South-East regional first stage.",
  },
  {
    title: "IT / Digital Operations & Creative",
    org: "MTX Resources",
    dates: "2025 – Present",
    copy: "Six-month SIWES placement in IT, then ongoing virtual support. Graphics, short-form video, AI-assisted media, documentation, and digital workflows. Paid social and content work through the placement and after.",
  },
  {
    title: "Marketing & Brand Support",
    org: "Favour Link Solar & Electrical Solutions",
    dates: "2026",
    copy: "Rebranding and digital marketing: flyers, catalogue visuals, WhatsApp assets, short-form ads, customer messaging, and product organisation. Paid short-term engagement.",
  },
  {
    title: "Content, Video & Graphics",
    org: "DLoveSoulClinic",
    dates: "2023 – 2025",
    copy: "Social video, brand consistency, and platform-adapted visuals. Paid monthly creative support during a three-month intensive.",
  },
  {
    title: "Volunteer Graphics & Digital Content",
    org: "God’s Beautiful Child Hub",
    dates: "2025",
    copy: "Graphics and digital content for a startup’s visual communication.",
  },
  {
    title: "Site Supervisor / Assistant Project Manager",
    org: "Coan / Cpan Constructions",
    dates: "2022",
    copy: "Supervised a 1 km drainage maintenance project for flood and erosion control — workers, materials, site operations, safety, and quality.",
  },
];

export const CAPABILITIES = [
  {
    title: "Product & UI/UX",
    items: ["Figma", "Wireframing", "Prototyping", "Interface design", "Product thinking"],
  },
  {
    title: "Software & web",
    items: ["Flutter / Dart", "Web development", "Firebase", "Git / GitHub", "Integrations"],
  },
  {
    title: "Brand & creative",
    items: ["Brand identity", "Graphics", "Canva", "CapCut", "AI-assisted media"],
  },
  {
    title: "Business & ops",
    items: ["Digital marketing", "Documentation", "Proposals", "Team coordination"],
  },
];

/** Ways I can help — framed by outcome, not tool. Reused as a compact band on the Work page. */
export const SERVICES = [
  {
    title: "Product",
    copy: "Taking an idea from ambiguity to something buildable.",
    items: ["Product design", "UI/UX", "Wireframing & prototyping", "Product strategy", "Design systems"],
  },
  {
    title: "Development",
    copy: "Turning the design into something that actually runs.",
    items: ["Web development", "Web applications", "Flutter / mobile", "Firebase & APIs", "Payment integration"],
  },
  {
    title: "Brand",
    copy: "Giving a product or business a visual voice.",
    items: ["Brand identity", "Visual design", "Marketing creative", "Social content", "Short-form video"],
  },
  {
    title: "Digital business",
    copy: "The structure around the product — docs, systems, setup.",
    items: ["Digital business setup", "Documentation", "Proposals & presentations", "Workflow systems"],
  },
];

/** The arc, not a resume — how design/tech/business/entrepreneurship actually connected. */
export const STORY = [
  { step: "Start", copy: "Creative work, digital design, publishing, and experimentation." },
  { step: "Learn", copy: "Computer Science and technology." },
  { step: "Build", copy: "Websites, apps, digital products, and systems." },
  { step: "Serve", copy: "Client work, documentation, marketing, and branding." },
  { step: "Lead", copy: "Teams, projects, and technology initiatives at FERB Intelligence." },
  { step: "Build bigger", copy: "RayzorVerse and its product ecosystem." },
];

export const PHILOSOPHY =
  "I don’t like seeing good ideas remain ideas. Sometimes the problem is design. Sometimes it’s technology. Sometimes it’s strategy, structure, communication, or simply finding the right people to make it happen. My work increasingly sits in that gap between an idea and its execution.";

export const EDUCATION = {
  degree: "B.Sc. Computer Science",
  school: "Hezekiah University, Umudi, Imo State",
  dates: "2022 – 2026",
  note: "Second Class Upper · Graduated August 2026",
  secondary: "Federal Government College, Warri · 2015 – 2021",
};

export const ACHIEVEMENTS = [
  "1st Place, South-East regional first stage — National Enterprise Challenge 2026 (RayzorVerse).",
  "Certificate of Completion — Creative Business Cup, Enterprise Development Centre (EDC), Enugu.",
  "Amazon Kindle Direct Publishing — two summary books and one colouring book.",
];

/**
 * "Home" stays in this list for the footer and the mobile menu, which both want the
 * full sitemap — the desktop bar filters it out itself since the logo already goes home.
 */
export const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/rayzorverse", label: "RayzorVerse" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
