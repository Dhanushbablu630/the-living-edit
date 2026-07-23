-- The Living Edit CMS foundation. Run after schema.sql in Supabase SQL Editor.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null default 'Residential',
  city text,
  year integer,
  area text,
  client_name text,
  description text,
  services text[] not null default '{}',
  thumbnail_url text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  thumbnail_url text,
  alt_text text,
  image_type text not null default 'completed' check (image_type in ('before','after','plan_2d','render_3d','construction','completed','gallery')),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.capabilities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  long_description text,
  icon text,
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  content jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  quote text not null,
  role_or_project text,
  image_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists projects_featured_published_idx on public.projects(featured, status, display_order);
create index if not exists project_images_project_idx on public.project_images(project_id, image_type, display_order);
create index if not exists capabilities_active_idx on public.capabilities(is_active, display_order);

alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.capabilities enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.testimonials enable row level security;
alter table public.settings enable row level security;

-- Public pages may read only published/active content. Dashboard writes use the server-side secret key.
drop policy if exists "published projects are public" on public.projects;
drop policy if exists "project images are public" on public.project_images;
drop policy if exists "active capabilities are public" on public.capabilities;
drop policy if exists "active testimonials are public" on public.testimonials;
drop policy if exists "active homepage sections are public" on public.homepage_sections;
create policy "published projects are public" on public.projects for select using (status = 'published');
create policy "project images are public" on public.project_images for select using (exists (select 1 from public.projects where projects.id = project_images.project_id and projects.status = 'published'));
create policy "active capabilities are public" on public.capabilities for select using (is_active = true);
create policy "active testimonials are public" on public.testimonials for select using (is_active = true);
create policy "active homepage sections are public" on public.homepage_sections for select using (is_active = true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('studio-media', 'studio-media', true, 10485760, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- Files are uploaded by the protected server route. Public reads make portfolio images available to the website.
drop policy if exists "studio media is public" on storage.objects;
create policy "studio media is public" on storage.objects for select using (bucket_id = 'studio-media');
