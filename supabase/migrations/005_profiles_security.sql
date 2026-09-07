-- =============================================
-- AUVERER Auto-profile provisioning + Admin role assignment
-- Run this AFTER 001_create_tables.sql and 002_rls_policies.sql
--
-- The profiles table is created in 001 (so 002's is_admin() can reference it).
-- This migration adds:
--   1. auto-create profile on auth signup
--   2. RLS policies on the profiles table
--   3. set_role() — the ONLY way to grant admin (service-role only)
-- =============================================

-- =============================================
-- 1. Auto-create a profile row on every new signup
-- =============================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Fire on both inserts and updates so Google OAuth (which often creates then
-- updates the auth user) still gets a profile row.
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute function public.handle_new_user();

-- =============================================
-- 2. RLS on profiles
-- =============================================
alter table public.profiles enable row level security;

-- A user can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- A user can update their own profile (but never escalate their own role)
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- prevent a user from granting themselves admin
    and role = 'member'
  );

-- Admins can read every profile. NOTE: the public.is_admin() helper that backs
-- this (and the content-write policies in 002) is defined in
-- 002_rls_policies.sql — do not redefine it here.

create policy "Admins can view all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

-- =============================================
-- 3. Granting admin: a SECURITY DEFINER function so the callers of the
--    function (an admin using the service key, or a trusted edge function)
--    can promote a profile. Never exposed to the anon key.
-- =============================================
create or replace function public.set_role(target_user uuid, new_role text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if new_role not in ('member', 'admin') then
    raise exception 'Role must be member or admin';
  end if;
  update public.profiles
    set role = new_role,
        updated_at = now()
  where id = target_user;
  if not found then
    raise exception 'No profile found for user %', target_user;
  end if;
end;
$$;

-- The only caller allowed is the service-role key (used by an admin tool or
-- edge function). The anon/authenticated keys cannot call it, so a member can
-- never promote themselves.
revoke all on function public.set_role(uuid, text) from anon, authenticated;
grant execute on function public.set_role(uuid, text) to service_role;
