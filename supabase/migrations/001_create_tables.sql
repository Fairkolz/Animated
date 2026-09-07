-- =============================================
-- AUVERER Database Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- Products table
create table public.products (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  price numeric(10,2) not null,
  category text not null check (category in ('Face', 'Eyes', 'Lips', 'Rituals')),
  size text not null,
  tagline text not null,
  is_new boolean default false,
  description text[] not null default '{}',
  key_ingredients jsonb not null default '[]',
  how_to_use text[] not null default '{}',
  full_ingredients text not null default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for category filtering
create index idx_products_category on public.products(category);
create index idx_products_slug on public.products(slug);

-- Articles table
create table public.articles (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Ritual', 'Ingredients', 'Science', 'Living')),
  excerpt text not null,
  author text not null,
  role text not null,
  date text not null,
  read_time text not null,
  body jsonb not null default '[]',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for category filtering
create index idx_articles_category on public.articles(category);
create index idx_articles_slug on public.articles(slug);

-- Stockists table
create table public.stockists (
  id bigint generated always as identity primary key,
  name text not null,
  city text not null,
  region text not null check (region in ('Europe', 'North America', 'Asia-Pacific')),
  address text not null,
  created_at timestamptz default now() not null
);

-- Index for region filtering
create index idx_stockists_region on public.stockists(region);

-- Newsletter subscribers table
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  unsubscribed_at timestamptz
);

-- Prevent duplicate subscriptions
create unique index idx_subscribers_email on public.subscribers(email);

-- Profiles table (backs the admin-role checks in RLS policies). Created here
-- so the is_admin() helper in 002 can reference it. Users are auto-provisioned
-- a row via a trigger in 005.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'member'
    check (role in ('member', 'admin')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at trigger to products and articles
create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

create trigger set_articles_updated_at
  before update on public.articles
  for each row execute function public.handle_updated_at();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();
