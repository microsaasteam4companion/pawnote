-- Create a table for newsletter subscribers
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for user profiles and streaks
create table public.profiles (
  id uuid references auth.users not null primary key,
  streak integer default 0,
  last_completed_date date,
  daily_completion jsonb default '{}'::jsonb,
  daily_behavior jsonb default '{}'::jsonb,
  is_pro boolean default false,
  notes_remaining integer default 5,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Turn on Row Level Security
alter table public.subscribers enable row level security;
alter table public.profiles enable row level security;

-- Policies for subscribers
create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  with check (true);

-- Policies for profiles
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);
