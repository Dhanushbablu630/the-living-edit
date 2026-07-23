-- Run this once in Supabase: SQL Editor → New query → paste → Run.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  city text not null,
  property text not null,
  budget text not null,
  timeline text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Leads are created only through the server route, which uses the service key.
revoke all on table public.leads from anon, authenticated;
