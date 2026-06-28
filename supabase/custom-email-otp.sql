create table if not exists public.pending_registrations (
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

create index if not exists pending_registrations_expires_idx
on public.pending_registrations (otp_expires_at);

alter table public.pending_registrations enable row level security;

drop trigger if exists pending_registrations_touch_updated_at on public.pending_registrations;
create trigger pending_registrations_touch_updated_at
before update on public.pending_registrations
for each row execute function public.touch_updated_at();
