-- Run STEP 1 first. After it succeeds, run STEP 2.
-- PostgreSQL enum values often cannot be added and used in the same transaction.

-- STEP 1: add new role options to the live Supabase enum.
alter type public.user_role add value if not exists 'teacher';
alter type public.user_role add value if not exists 'developer';

-- STEP 2: update admin policy helper and promote one account to Developer.
-- Replace developer@example.com with the account that signed up through /auth/sign-up.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'developer')
  );
$$;

update public.profiles
set role = 'developer'
where id = (
  select id
  from auth.users
  where email = 'developer@example.com'
  limit 1
);
