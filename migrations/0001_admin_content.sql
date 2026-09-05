-- Content tables for the admin panel. One row of site_settings/education;
-- everything else is an ordered list edited via /admin.

create table if not exists site_settings (
  id int primary key default 1,
  name text not null,
  legal text not null,
  role text not null,
  roles text not null,
  tagline text not null,
  email text not null,
  phones jsonb not null default '[]'::jsonb,
  whatsapp text not null,
  cv text not null,
  location text not null,
  market text not null,
  availability text not null,
  linkedin text not null,
  github text not null,
  instagram text not null,
  x text not null,
  philosophy text not null,
  constraint site_settings_singleton check (id = 1)
);

create table if not exists work_items (
  id serial primary key,
  kind text not null check (kind in ('product', 'client')),
  slug text not null unique,
  title text not null,
  year text not null,
  status text not null,
  arm text not null,
  summary text not null,
  body text not null,
  image text,
  tags jsonb not null default '[]'::jsonb,
  href text,
  sort_order int not null default 0
);

create table if not exists gallery_items (
  id serial primary key,
  work_item_id int not null references work_items(id) on delete cascade,
  kind text not null check (kind in ('image', 'video', 'document')),
  src text,
  youtube_id text,
  title text,
  sort_order int not null default 0
);

create table if not exists ventures (
  id serial primary key,
  slug text not null unique,
  title text not null,
  year text not null,
  role text not null,
  image text not null,
  copy text not null,
  href text,
  sort_order int not null default 0
);

create table if not exists leadership (
  id serial primary key,
  slug text not null unique,
  title text not null,
  year text not null,
  role text not null,
  image text not null,
  copy text not null,
  sort_order int not null default 0
);

create table if not exists collaborations (
  id serial primary key,
  title text not null,
  role text not null,
  copy text not null,
  sort_order int not null default 0
);

create table if not exists experience (
  id serial primary key,
  title text not null,
  org text not null,
  dates text not null,
  copy text not null,
  sort_order int not null default 0
);

create table if not exists capabilities (
  id serial primary key,
  title text not null,
  items jsonb not null default '[]'::jsonb,
  sort_order int not null default 0
);

create table if not exists services (
  id serial primary key,
  title text not null,
  copy text not null,
  items jsonb not null default '[]'::jsonb,
  sort_order int not null default 0
);

create table if not exists story_steps (
  id serial primary key,
  step text not null,
  copy text not null,
  sort_order int not null default 0
);

create table if not exists education (
  id int primary key default 1,
  degree text not null,
  school text not null,
  dates text not null,
  note text not null,
  secondary text not null,
  constraint education_singleton check (id = 1)
);

create table if not exists achievements (
  id serial primary key,
  title text not null,
  issuer text not null,
  date text not null,
  image text,
  sort_order int not null default 0
);
