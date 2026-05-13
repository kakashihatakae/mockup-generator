-- ============================================================
-- Nabber Advanced Hardened Schema (V2.1)
-- Optimized via Supabase Postgres Best Practices & Changelog
-- ============================================================

-- 1. User profiles table
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  credits integer not null default 20,
  created_at timestamptz not null default now()
);

-- Idempotent constraint adding for credit safety
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'users_credits_check') then
    alter table public.users add constraint users_credits_check check (credits >= 0);
  end if;
end $$;

comment on table public.users is 'Stores user profile data and credit balances.';

-- Enable RLS
alter table public.users enable row level security;

-- Optimization: Wrap auth.uid() in SELECT for performance (caching)
create policy "Users can view own profile"
  on public.users for select
  using ((select auth.uid()) = id);

-- 2. Projects table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Settings
  model_sex text not null default 'male',
  model_race text not null default 'asian',
  hair_color text not null default 'black',
  build_type text not null default 'athletic',
  pants_description text not null default '',
  clothing_type text not null default 'shirt',
  clothing_color text not null default '#000000',
  picture_type text not null default 'front',
  
  uploaded_graphic_url text,
  generated_images jsonb not null default '[]'::jsonb,
  generation_prompt text not null default '',
  status text not null default 'draft'
);

-- Enforce integrity via safe CHECK constraints
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'projects_status_check') then
    alter table public.projects add constraint projects_status_check check (status in ('draft', 'generating', 'completed', 'failed'));
    alter table public.projects add constraint projects_model_sex_check check (model_sex in ('male', 'female'));
    alter table public.projects add constraint projects_clothing_type_check check (clothing_type in ('shirt', 'hoodie'));
    alter table public.projects add constraint projects_picture_type_check check (picture_type in ('front', 'back', 'both'));
  end if;
end $$;

-- Performance Indices
-- Optimized for dashboard: user_id + newest first (prevents sorting overhead)
create index if not exists projects_user_id_created_at_idx on public.projects (user_id, created_at desc);

-- Enable RLS
alter table public.projects enable row level security;

-- Policies (Optimized with (select auth.uid()) for O(1) auth lookup per query)
create policy "Users can view own projects" 
  on public.projects for select 
  using ((select auth.uid()) = user_id);

create policy "Users can create own projects" 
  on public.projects for insert 
  with check ((select auth.uid()) = user_id);

create policy "Users can update own projects" 
  on public.projects for update 
  using ((select auth.uid()) = user_id);

create policy "Users can delete own projects" 
  on public.projects for delete 
  using ((select auth.uid()) = user_id);

-- 3. Data API Access (Required for projects created after April 2026)
-- As per Supabase Changelog: New tables are NOT exposed to the Data API by default.
grant usage on schema public to anon, authenticated;
grant all on table public.users to authenticated;
grant all on table public.projects to authenticated;
grant select on table public.users to anon;

-- 4. Functions & Triggers
-- Sync auth.users -> public.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, credits)
  values (new.id, new.email, 20);
  return new;
end;
$$;

-- Trigger: fires after a new auth user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at on project changes
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.projects;
create trigger set_updated_at
  before update on public.projects
  for each row execute procedure public.update_updated_at();
