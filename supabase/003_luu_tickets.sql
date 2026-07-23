-- Run this in Supabase SQL Editor after 002_cms.sql.
create table if not exists public.client_tickets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  conversation_summary text,
  budget text,
  timeline text,
  project_type text,
  style text,
  city text,
  services_requested text[] not null default '{}',
  conversation jsonb not null default '[]'::jsonb,
  status text not null default 'New' check (status in ('New','Contacted','Meeting Scheduled','Closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_tickets_created_idx on public.client_tickets(created_at desc);
create index if not exists client_tickets_status_idx on public.client_tickets(status);
alter table public.client_tickets enable row level security;
