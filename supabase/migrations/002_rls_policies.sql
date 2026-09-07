-- =============================================
-- AUVERER Row-Level Security Policies
-- Run this AFTER 001_create_tables.sql
-- =============================================

-- Enable RLS on all tables
alter table public.products enable row level security;
alter table public.articles enable row level security;
alter table public.stockists enable row level security;
alter table public.subscribers enable row level security;

-- Admin-guard helper. SECURITY DEFINER bypasses the profiles RLS (which would
-- otherwise recurse when checking the caller's own role), so admin checks are
-- both correct and safe. Defined here so every content policy can use it.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- =============================================
-- PRODUCTS: Public read, authenticated write
-- =============================================

-- Anyone can read products (public storefront)
create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

-- Only authenticated admin users can insert products
create policy "Admins can insert products"
  on public.products for insert
  to authenticated
  with check (public.is_admin());

-- Only authenticated admin users can update products
create policy "Admins can update products"
  on public.products for update
  to authenticated
  using (public.is_admin());

-- Only authenticated admin users can delete products
create policy "Admins can delete products"
  on public.products for delete
  to authenticated
  using (public.is_admin());

-- =============================================
-- ARTICLES: Public read, authenticated write
-- =============================================

-- Anyone can read articles (public journal)
create policy "Articles are viewable by everyone"
  on public.articles for select
  using (true);

-- Only authenticated admin users can insert articles
create policy "Admins can insert articles"
  on public.articles for insert
  to authenticated
  with check (public.is_admin());

-- Only authenticated admin users can update articles
create policy "Admins can update articles"
  on public.articles for update
  to authenticated
  using (public.is_admin());

-- Only authenticated admin users can delete articles
create policy "Admins can delete articles"
  on public.articles for delete
  to authenticated
  using (public.is_admin());

-- =============================================
-- STOCKISTS: Public read, authenticated write
-- =============================================

-- Anyone can read stockists (public store locator)
create policy "Stockists are viewable by everyone"
  on public.stockists for select
  using (true);

-- Only authenticated admin users can insert stockists
create policy "Admins can insert stockists"
  on public.stockists for insert
  to authenticated
  with check (public.is_admin());

-- Only authenticated admin users can update stockists
create policy "Admins can update stockists"
  on public.stockists for update
  to authenticated
  using (public.is_admin());

-- Only authenticated admin users can delete stockists
create policy "Admins can delete stockists"
  on public.stockists for delete
  to authenticated
  using (public.is_admin());

-- =============================================
-- SUBSCRIBERS: Insert for anyone, read/update own only
-- =============================================

-- Anyone can subscribe (insert)
create policy "Anyone can subscribe"
  on public.subscribers for insert
  with check (true);

-- Users can read their own subscription
create policy "Users can view own subscription"
  on public.subscribers for select
  to authenticated
  using (auth.uid() = id);

-- Users can unsubscribe (update)
create policy "Users can unsubscribe"
  on public.subscribers for update
  to authenticated
  using (auth.uid() = id);

-- Admins can view all subscribers
create policy "Admins can view all subscribers"
  on public.subscribers for select
  to authenticated
  using (public.is_admin());
