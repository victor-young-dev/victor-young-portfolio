-- Seeds the admin-content tables with the site's current copy, so switching
-- the pages over to read from the database is a no-op the first time it runs.

insert into site_settings (id, name, legal, role, roles, tagline, email, phones, whatsapp, cv, location, market, availability, linkedin, github, instagram, x, philosophy)
values (
  1,
  $$Victor Young$$,
  $$Victor Uzor$$,
  $$Product Builder$$,
  $$Product Designer · Software Developer · Venture Builder$$,
  $$I build ideas into brands, products & digital experiences.$$,
  $$rayzorverse@gmail.com$$,
  '["+234 813 613 2727", "+234 901 112 2881"]'::jsonb,
  $$https://wa.me/2348136132727$$,
  $$/cv.pdf$$,
  $$Available worldwide$$,
  $$Design, technology, and ventures in motion$$,
  $$Open to collaboration, product roles, and venture partnerships$$,
  $$https://www.linkedin.com/in/victor-uzor-3601343a9$$,
  $$https://github.com/victor-young-dev$$,
  $$https://www.instagram.com/victor_young.tech$$,
  $$https://x.com/I_amVic_tor$$,
  $$I don’t like seeing good ideas remain ideas. Sometimes the problem is design. Sometimes it’s technology. Sometimes it’s strategy, structure, communication, or simply finding the right people to make it happen. My work increasingly sits in that gap between an idea and its execution.$$
)
on conflict (id) do nothing;

insert into work_items (kind, slug, title, year, status, arm, summary, body, image, tags, href, sort_order) values
('product', 'vendra', 'Vendra', '2026', 'In development', 'Rayzor Labs',
 $$Global social commerce built around vendor trust, community, and the actual workflow of selling.$$,
 $$Vendra is a social-commerce platform from Rayzor Labs, built around a simple idea: shopping should feel like following people, not browsing a catalogue. Vendors post into a feed, buyers follow the sellers they trust, and discovery, discounts, and checkout happen right inside that feed — no separate storefront to build or maintain. Currently piloting in Port Harcourt, with light and dark interfaces both built out. I’m leading product, interface, and the systems underneath as it grows toward wider markets.$$,
 '/work/vendra.png', '["Social commerce", "Trust", "Product"]'::jsonb, 'https://vendracommerce.netlify.app/', 0),
('product', 'kaabo', 'Kaabo', '2026', 'In development', 'Rayzor Labs',
 $$Nigeria-first social commerce — designed around local market realities, not imported templates.$$,
 $$Kaabo is the Nigeria-shaped counterpart to Vendra. Same family of ideas, different constraints: payments, trust, language, and how commerce actually happens on the ground. The waitlist and launch site are live now — the platform itself, with storefronts, a shoppable feed, wallet payments, and escrow, is being built phase by phase, sellers first.$$,
 '/work/kaabo.jpg', '["Nigeria", "Commerce", "Product"]'::jsonb, 'https://kaabonglaunch.netlify.app/', 1),
('product', 'resqnet', 'ResQNet', '2026', 'In development', 'Rayzor Labs',
 $$Emergency and security technology, born from final-year work and still evolving as a product.$$,
 $$ResQNet started as a final-year Computer Science project and is now a Rayzor Labs product. A mobile application already exists; the broader system — how people call for help, how responders see it, how the product stays calm under pressure — is still being built. It is the most serious thing I ship, and it is treated that way.$$,
 '/work/resqnet.jpg', '["Emergency", "Mobile", "Security"]'::jsonb, null, 2),
('client', 'brandilux', 'BrandiLux', '2025', 'Live', 'Brand & Creative',
 $$Branding and digital experience — BrandiLux’s own site, built as its flagship showcase.$$,
 $$BrandiLux is the creative and digital-services arm of RayzorVerse, and its own site is the clearest demonstration of the work: brand strategy, visual identity, and a premium digital experience built as one system rather than separate purchases. Delivered directly or with trusted collaborators, depending on scope.$$,
 '/work/brandilux.jpg', '["Brand identity", "Web design", "Creative"]'::jsonb, 'https://brandi-lux.netlify.app/', 0),
('client', 'mtx-resources', 'MTX Resources', '2025 – Present', 'Client work', 'IT / Digital & Creative',
 $$Six months inside an IT department, then ongoing virtual support — graphics, video, and digital workflows.$$,
 $$A six-month SIWES placement in MTX Resources’ IT department that turned into ongoing virtual support: social media, content creation, graphics, short-form video, AI-assisted media, documentation, and data entry. Paid work, on-site and remote.$$,
 '/work/mtx-hero.png', '["Digital operations", "Content", "Graphics"]'::jsonb, null, 1),
('client', 'apex-wright-lab', 'Apex Wright Lab', '2026', 'Live', 'Writing & Documentation',
 $$Writing, editing, and documentation support — from academic projects to business proposals.$$,
 $$Apex Wright Lab is the writing and documentation division of RayzorVerse: project writing, proofreading, formatting, presentations, and proposals for students, individuals, and organisations. 12+ students supported, over NGN 300,000 generated in 2026, and two summary books plus a colouring book published via Amazon KDP.$$,
 '/work/apex.jpg', '["Writing", "Editing", "Documentation"]'::jsonb, 'https://apex-wright-lab.vercel.app/', 2),
('client', 'favour-link', 'Favour Link', '2026', 'Client work', 'Marketing & Brand',
 $$Rebranding, digital marketing, and virtual assistance for a solar and electrical solutions business.$$,
 $$A paid engagement rebranding Favour Link Solar & Electrical Solutions: flyers, product catalogue visuals, WhatsApp marketing assets, short-form ads, customer messaging, and product organisation. Also covered virtual-assistant support — managing their Jiji and Jumia e-commerce accounts, sourcing ad placements, and producing text and visual content across both platforms.$$,
 '/work/favour-link.jpg', '["Branding", "Marketing", "Virtual assistance"]'::jsonb, 'https://favourlink.netlify.app', 3),
('client', 'dlovesoulclinic', 'DLoveSoulClinic', '2023 – 2025', 'Client work', 'Content & Video',
 $$Social video and brand-consistent visuals across a three-month intensive.$$,
 $$Paid monthly creative support for DLoveSoulClinic: social video content, visual consistency, and platform-adapted creative across a three-month intensive engagement between 2023 and 2025.$$,
 null, '["Video", "Social content"]'::jsonb, null, 4),
('client', 'gbch', 'GBCH', '2025', 'Volunteer', 'Graphics & Content',
 $$Volunteer graphics and digital content for a startup’s visual communication.$$,
 $$Volunteer creative support for God’s Beautiful Child Hub — graphics and digital content shaping the startup’s early visual communication.$$,
 null, '["Graphics", "Volunteer"]'::jsonb, null, 5);

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'video', null, 'vdAhjhit1Fo', 'Vendra — product walkthrough', 0 from work_items where slug = 'vendra'
union all
select id, 'image', '/work/vendra-light.png', null, null, 1 from work_items where slug = 'vendra'
union all
select id, 'image', '/work/mtx-safety-poster.png', null, null, 0 from work_items where slug = 'mtx-resources'
union all
select id, 'image', '/work/mtx-quote.png', null, null, 1 from work_items where slug = 'mtx-resources'
union all
select id, 'image', '/work/mtx-services.png', null, null, 2 from work_items where slug = 'mtx-resources'
union all
select id, 'image', '/work/mtx-partners.png', null, null, 3 from work_items where slug = 'mtx-resources'
union all
select id, 'image', '/work/mtx-footprint.png', null, null, 4 from work_items where slug = 'mtx-resources'
union all
select id, 'image', '/work/mtx-welcome-september.png', null, null, 5 from work_items where slug = 'mtx-resources';

insert into ventures (slug, title, year, role, image, copy, href, sort_order) values
('labs', 'Rayzor Labs', '2026', 'Technology & product', '/work/vendra.png',
 $$The software division. Home of Vendra, Kaabo, and ResQNet — products designed, prototyped, and shipped from inside the ecosystem.$$, null, 0),
('apex', 'Apex Wright Lab', '2026', 'Writing & documentation', '/work/apex.jpg',
 $$A commercial writing practice for students, individuals, and organisations: project writing, proofreading, formatting, presentations, and proposals. 12+ students supported. Over NGN 300,000 in 2026; about NGN 500,000 since Year 1. Two summary books and a colouring book via Amazon KDP.$$,
 'https://apex-wright-lab.vercel.app/', 1),
('brandilux', 'BrandiLux', '2025', 'Brand & creative', '/work/brandilux.jpg',
 $$Branding, graphics, social content, video, landing pages, and digital business setup — delivered directly or with trusted collaborators.$$,
 'https://brandi-lux.netlify.app/', 2);

insert into leadership (slug, title, year, role, image, copy, sort_order) values
('ferb', 'FERB Intelligence', '2026', 'CTO · Technology & strategic leadership', '/work/ferb.jpg',
 $$A cybersecurity and digital-forensics organisation where I lead technology direction, product structure, and planning — across FERB Shield, FERB Guard, and its training initiatives. Not a RayzorVerse venture: a leadership role I hold alongside it.$$, 0);

insert into collaborations (title, role, copy, sort_order) values
($$KEN AI Detector$$, $$Development collaboration$$, $$Contributed development support to Kenneth’s AI-detection tool. His product — I helped build it.$$, 0),
($$Automated Timetable System$$, $$Development collaboration$$, $$Helped Agu Victor write and build an automated timetabling system. His project — I contributed engineering.$$, 1);

insert into experience (title, org, dates, copy, sort_order) values
($$Chief Technology Officer$$, $$FERB Intelligence$$, $$2026 – Present$$, $$Technology, product, and strategic leadership in a cybersecurity / digital forensics organisation. Structure, product direction, documentation, design, and planning across FERB Shield, FERB Guard, LMS/training platforms, and related ventures.$$, 0),
($$Founder & Lead$$, $$RayzorVerse$$, $$2026 – Present$$, $$Building a multi-arm venture ecosystem across software, creative services, writing, and business systems. Presented at the 2026 National Enterprise Challenge and placed 1st at the South-East regional first stage.$$, 1),
($$IT / Digital Operations & Creative$$, $$MTX Resources$$, $$2025 – Present$$, $$Six-month SIWES placement in IT, then ongoing virtual support. Graphics, short-form video, AI-assisted media, documentation, and digital workflows. Paid social and content work through the placement and after.$$, 2),
($$Marketing & Brand Support$$, $$Favour Link Solar & Electrical Solutions$$, $$2026$$, $$Rebranding and digital marketing: flyers, catalogue visuals, WhatsApp assets, short-form ads, customer messaging, and product organisation. Paid short-term engagement.$$, 3),
($$Content, Video & Graphics$$, $$DLoveSoulClinic$$, $$2023 – 2025$$, $$Social video, brand consistency, and platform-adapted visuals. Paid monthly creative support during a three-month intensive.$$, 4),
($$Volunteer Graphics & Digital Content$$, $$God’s Beautiful Child Hub$$, $$2025$$, $$Graphics and digital content for a startup’s visual communication.$$, 5),
($$Site Supervisor / Assistant Project Manager$$, $$Coan / Cpan Constructions$$, $$2022$$, $$Supervised a 1 km drainage maintenance project for flood and erosion control — workers, materials, site operations, safety, and quality.$$, 6);

insert into capabilities (title, items, sort_order) values
($$Product & UI/UX$$, '["Figma", "Wireframing", "Prototyping", "Interface design", "Product thinking"]'::jsonb, 0),
($$Software & web$$, '["Flutter / Dart", "Web development", "Firebase", "Git / GitHub", "Integrations"]'::jsonb, 1),
($$Brand & creative$$, '["Brand identity", "Graphics", "Canva", "CapCut", "AI-assisted media"]'::jsonb, 2),
($$Business & ops$$, '["Digital marketing", "Documentation", "Proposals", "Team coordination"]'::jsonb, 3);

insert into services (title, copy, items, sort_order) values
($$Product$$, $$Taking an idea from ambiguity to something buildable.$$, '["Product design", "UI/UX", "Wireframing & prototyping", "Product strategy", "Design systems"]'::jsonb, 0),
($$Development$$, $$Turning the design into something that actually runs.$$, '["Web development", "Web applications", "Flutter / mobile", "Firebase & APIs", "Payment integration"]'::jsonb, 1),
($$Brand$$, $$Giving a product or business a visual voice.$$, '["Brand identity", "Visual design", "Marketing creative", "Social content", "Short-form video"]'::jsonb, 2),
($$Digital business$$, $$The structure around the product — docs, systems, setup.$$, '["Digital business setup", "Documentation", "Proposals & presentations", "Workflow systems"]'::jsonb, 3);

insert into story_steps (step, copy, sort_order) values
($$Start$$, $$Creative work, digital design, publishing, and experimentation.$$, 0),
($$Learn$$, $$Computer Science and technology.$$, 1),
($$Build$$, $$Websites, apps, digital products, and systems.$$, 2),
($$Serve$$, $$Client work, documentation, marketing, and branding.$$, 3),
($$Lead$$, $$Teams, projects, and technology initiatives at FERB Intelligence.$$, 4),
($$Build bigger$$, $$RayzorVerse and its product ecosystem.$$, 5);

insert into education (id, degree, school, dates, note, secondary) values
(1, $$B.Sc. Computer Science$$, $$Hezekiah University, Umudi, Imo State$$, $$2022 – 2026$$, $$Second Class Upper · Graduated August 2026$$, $$Federal Government College, Warri · 2015 – 2021$$)
on conflict (id) do nothing;

insert into achievements (title, issuer, date, image, sort_order) values
($$1st Place — South-East Regional Stage$$, $$National Enterprise Challenge 2026, for RayzorVerse$$, $$2026$$, null, 0),
($$Certificate of Completion$$, $$Creative Business Cup, Enterprise Development Centre (EDC), Enugu$$, $$2026$$, null, 1),
($$Amazon KDP Publisher$$, $$Two summary books and a colouring book$$, $$2026$$, null, 2);
