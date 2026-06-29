create extension if not exists "pgcrypto";

create type public.user_role as enum ('student', 'teacher', 'instructor', 'admin', 'developer');
create type public.enrollment_status as enum ('active', 'refunded', 'cancelled');
create type public.order_status as enum ('pending', 'paid', 'failed', 'expired', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role public.user_role not null default 'student',
  created_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  cover_image_url text,
  price integer not null check (price >= 0),
  currency text not null default 'IDR',
  is_published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  slug text not null,
  description text,
  video_url text,
  duration_seconds integer not null default 0,
  position integer not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now(),
  unique (module_id, slug)
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status public.enrollment_status not null default 'active',
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table public.lesson_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  is_completed boolean not null default false,
  watched_seconds integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete restrict,
  amount integer not null check (amount >= 0),
  currency text not null default 'IDR',
  status public.order_status not null default 'pending',
  midtrans_order_id text not null unique,
  midtrans_transaction_id text,
  payment_type text,
  raw_notification jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_active boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pending_registrations (
  email text primary key,
  full_name text not null,
  encrypted_password text not null,
  otp_hash text not null,
  otp_expires_at timestamptz not null,
  attempts integer not null default 0,
  last_sent_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index courses_published_idx on public.courses (is_published, slug);
create index modules_course_position_idx on public.modules (course_id, position);
create index lessons_module_position_idx on public.lessons (module_id, position);
create index enrollments_user_idx on public.enrollments (user_id);
create index orders_midtrans_idx on public.orders (midtrans_order_id);
create index client_brands_active_position_idx on public.client_brands (is_active, position);
create index pending_registrations_expires_idx on public.pending_registrations (otp_expires_at);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger courses_touch_updated_at
before update on public.courses
for each row execute function public.touch_updated_at();

create trigger orders_touch_updated_at
before update on public.orders
for each row execute function public.touch_updated_at();

create trigger client_brands_touch_updated_at
before update on public.client_brands
for each row execute function public.touch_updated_at();

create trigger pending_registrations_touch_updated_at
before update on public.pending_registrations
for each row execute function public.touch_updated_at();

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

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

create or replace function public.is_enrolled(course_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.enrollments
    where user_id = auth.uid()
      and course_id = course_uuid
      and status = 'active'
  );
$$;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.orders enable row level security;
alter table public.client_brands enable row level security;
alter table public.pending_registrations enable row level security;

create policy "Users can read their own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "Users can update their own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Admins manage profiles"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

create policy "Anyone can read published courses"
on public.courses for select
using (is_published = true or public.is_admin());

create policy "Admins manage courses"
on public.courses for all
using (public.is_admin())
with check (public.is_admin());

create policy "Anyone can read modules for published courses"
on public.modules for select
using (
  public.is_admin()
  or exists (
    select 1 from public.courses
    where courses.id = modules.course_id and courses.is_published = true
  )
);

create policy "Admins manage modules"
on public.modules for all
using (public.is_admin())
with check (public.is_admin());

create policy "Users can read preview or enrolled lessons"
on public.lessons for select
using (
  public.is_admin()
  or is_preview = true
  or exists (
    select 1
    from public.modules m
    join public.courses c on c.id = m.course_id
    where m.id = lessons.module_id
      and c.is_published = true
      and public.is_enrolled(c.id)
  )
);

create policy "Admins manage lessons"
on public.lessons for all
using (public.is_admin())
with check (public.is_admin());

create policy "Users read their own enrollments"
on public.enrollments for select
using (user_id = auth.uid() or public.is_admin());

create policy "Admins manage enrollments"
on public.enrollments for all
using (public.is_admin())
with check (public.is_admin());

create policy "Users manage their own progress"
on public.lesson_progress for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Admins read progress"
on public.lesson_progress for select
using (public.is_admin());

create policy "Users read their own orders"
on public.orders for select
using (user_id = auth.uid() or public.is_admin());

create policy "Users create their own pending orders"
on public.orders for insert
with check (user_id = auth.uid() and status = 'pending');

create policy "Admins manage orders"
on public.orders for all
using (public.is_admin())
with check (public.is_admin());

create policy "Anyone can read active client brands"
on public.client_brands for select
using (is_active = true or public.is_admin());

create policy "Admins manage client brands"
on public.client_brands for all
using (public.is_admin())
with check (public.is_admin());
