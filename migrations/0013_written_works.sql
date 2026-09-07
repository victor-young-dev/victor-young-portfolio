-- Apex Wright Lab's "library" — written works displayed as a shelf of book
-- covers. Covers are CSS-generated (color + title), not image uploads, so a
-- new title needs no cover artwork. Seeded with 3 placeholder entries so the
-- shelf/detail-sheet design can be evaluated before real titles go in.

create table if not exists written_works (
  id serial primary key,
  slug text not null unique,
  title text not null,
  category text not null,
  year text not null,
  cover_color text not null default '#16233d',
  cover_accent text not null default '#c9a54a',
  overview text not null,
  details jsonb not null default '[]'::jsonb,
  link text,
  link_label text not null default 'Read more',
  sort_order int not null default 0
);

insert into written_works (slug, title, category, year, cover_color, cover_accent, overview, details, link, link_label, sort_order) values
('project-writing-companion', 'The Project Writing Companion', 'Study Guide', '2026', '#16233d', '#c9a54a',
 $$A practical walkthrough for structuring, writing, and defending a final-year or postgraduate project — built from patterns seen across 12+ students supported through Apex Wright Lab.$$,
 '[{"label":"Format","value":"Digital guide (PDF)"},{"label":"Length","value":"~40 pages"},{"label":"Audience","value":"Final-year & postgraduate students"}]'::jsonb,
 null, 'Read more', 0),
('proposals-and-presentations', 'Proposals & Presentations, Simplified', 'Summary Book', '2026', '#3a1220', '#c9a54a',
 $$Proposal writing and presentation design distilled into one practical reference — the same approach used for paid client proposals, formatted for anyone to follow.$$,
 '[{"label":"Format","value":"Digital guide (PDF)"},{"label":"Length","value":"~35 pages"},{"label":"Audience","value":"Students & early professionals"}]'::jsonb,
 null, 'Read more', 1),
('colour-and-focus', 'Colour & Focus', 'Colouring Book', '2026', '#173327', '#c9a54a',
 $$A colouring book built for calm, focused breaks — published independently via Amazon KDP as part of Apex Wright Lab's small catalogue of self-published work.$$,
 '[{"label":"Format","value":"Print, via Amazon KDP"},{"label":"Length","value":"50 pages"},{"label":"Audience","value":"All ages"}]'::jsonb,
 null, 'Know more', 2);
