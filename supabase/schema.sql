create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create type public.user_role as enum ('buyer', 'private_seller', 'dealer', 'admin');
create type public.dealer_verified_status as enum ('pending', 'verified', 'rejected');
create type public.inventory_status as enum ('active', 'sold', 'hidden', 'draft');
create type public.wanted_card_status as enum ('open', 'paused', 'closed');
create type public.dealer_match_status as enum ('draft', 'published', 'paused', 'archived');
create type public.buyer_interest_status as enum ('new', 'contacted', 'converted', 'closed');
create type public.dealer_response_status as enum ('submitted', 'viewed', 'accepted', 'rejected', 'withdrawn');
create type public.report_status as enum ('open', 'reviewed', 'resolved', 'dismissed');
create type public.saved_search_type as enum ('buyer_search', 'dealer_search');

create table public.users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'buyer',
  name text not null,
  email text not null,
  phone text,
  location text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dealer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users_profile(id) on delete cascade,
  business_name text not null,
  dealer_license text,
  abn text,
  address text,
  website text,
  phone text,
  location text,
  region text,
  verified_status public.dealer_verified_status not null default 'pending',
  subscription_tier text not null default 'founding',
  subscription_status text not null default 'pilot',
  founding_dealer boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  dealer_id uuid not null references public.dealer_profiles(id) on delete cascade,
  make text not null,
  model text not null,
  badge text,
  year int,
  price numeric,
  kilometres int,
  body_type text,
  fuel_type text,
  transmission text,
  drivetrain text,
  colour text,
  location text,
  rego_status text,
  vin_optional text,
  stock_number text,
  service_history text,
  warranty_details text,
  description text,
  photo_urls jsonb not null default '[]'::jsonb,
  status public.inventory_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.buyer_wanted_cards (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.users_profile(id) on delete cascade,
  title text not null,
  natural_language_request text,
  make text,
  model text,
  body_type text,
  fuel_type text,
  transmission text,
  min_year int,
  max_year int,
  max_kilometres int,
  budget_min numeric,
  budget_max numeric,
  location text,
  radius_km int,
  seller_type_preference text not null default 'both',
  must_haves jsonb not null default '[]'::jsonb,
  dealbreakers jsonb not null default '[]'::jsonb,
  buying_timeframe text,
  contact_preference text,
  max_seller_responses int,
  public_visibility boolean not null default true,
  status public.wanted_card_status not null default 'open',
  ai_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dealer_match_cards (
  id uuid primary key default gen_random_uuid(),
  dealer_id uuid not null references public.dealer_profiles(id) on delete cascade,
  title text not null,
  card_type text not null default 'dealer_match' check (card_type = 'dealer_match'),
  generated_from_inventory_ids jsonb not null default '[]'::jsonb,
  make text,
  model text,
  body_type text,
  fuel_type text,
  transmission text,
  price_min numeric,
  price_max numeric,
  year_min int,
  year_max int,
  km_min int,
  km_max int,
  location text,
  radius_km int,
  buyer_use_case text,
  description text,
  possible_matches jsonb not null default '[]'::jsonb,
  cta_text text not null default 'Yes, I''m looking for this',
  status public.dealer_match_status not null default 'draft',
  visibility text not null default 'public',
  views_count int not null default 0,
  interests_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.buyer_interests (
  id uuid primary key default gen_random_uuid(),
  dealer_match_card_id uuid not null references public.dealer_match_cards(id) on delete cascade,
  buyer_id uuid references public.users_profile(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  location text,
  budget numeric,
  timeframe text,
  requirements text,
  permission_to_contact boolean not null default false,
  create_wanted_card boolean not null default false,
  generated_wanted_card_id uuid references public.buyer_wanted_cards(id) on delete set null,
  status public.buyer_interest_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dealer_responses (
  id uuid primary key default gen_random_uuid(),
  buyer_wanted_card_id uuid not null references public.buyer_wanted_cards(id) on delete cascade,
  dealer_id uuid not null references public.dealer_profiles(id) on delete cascade,
  inventory_item_id uuid references public.inventory_items(id) on delete set null,
  price numeric,
  message text,
  availability text,
  warranty_details text,
  service_history text,
  inspection_available boolean not null default false,
  match_score text,
  match_summary text,
  warnings jsonb not null default '[]'::jsonb,
  status public.dealer_response_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.users_profile(id) on delete cascade,
  receiver_id uuid not null references public.users_profile(id) on delete cascade,
  buyer_wanted_card_id uuid references public.buyer_wanted_cards(id) on delete set null,
  dealer_response_id uuid references public.dealer_responses(id) on delete set null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.users_profile(id) on delete cascade,
  reported_user_id uuid references public.users_profile(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  reason text not null,
  status public.report_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  dealer_id uuid not null references public.dealer_profiles(id) on delete cascade,
  tier text not null,
  status text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users_profile(id) on delete cascade,
  search_type public.saved_search_type not null,
  query text not null,
  filters jsonb not null default '{}'::jsonb,
  alert_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id) on delete set null,
  event_type text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index dealer_profiles_user_id_idx on public.dealer_profiles(user_id);
create index inventory_items_dealer_id_idx on public.inventory_items(dealer_id);
create index buyer_wanted_cards_buyer_id_idx on public.buyer_wanted_cards(buyer_id);
create index buyer_wanted_cards_public_idx on public.buyer_wanted_cards(public_visibility, status);
create index dealer_match_cards_dealer_id_idx on public.dealer_match_cards(dealer_id);
create index dealer_match_cards_public_idx on public.dealer_match_cards(visibility, status);
create index buyer_interests_card_idx on public.buyer_interests(dealer_match_card_id);
create index dealer_responses_wanted_idx on public.dealer_responses(buyer_wanted_card_id);
create index analytics_events_type_idx on public.analytics_events(event_type, created_at);

create trigger users_profile_updated_at before update on public.users_profile for each row execute function public.set_updated_at();
create trigger dealer_profiles_updated_at before update on public.dealer_profiles for each row execute function public.set_updated_at();
create trigger inventory_items_updated_at before update on public.inventory_items for each row execute function public.set_updated_at();
create trigger buyer_wanted_cards_updated_at before update on public.buyer_wanted_cards for each row execute function public.set_updated_at();
create trigger dealer_match_cards_updated_at before update on public.dealer_match_cards for each row execute function public.set_updated_at();
create trigger buyer_interests_updated_at before update on public.buyer_interests for each row execute function public.set_updated_at();
create trigger dealer_responses_updated_at before update on public.dealer_responses for each row execute function public.set_updated_at();
create trigger reports_updated_at before update on public.reports for each row execute function public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role::text from public.users_profile where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() = 'admin'
$$;

alter table public.users_profile enable row level security;
alter table public.dealer_profiles enable row level security;
alter table public.inventory_items enable row level security;
alter table public.buyer_wanted_cards enable row level security;
alter table public.dealer_match_cards enable row level security;
alter table public.buyer_interests enable row level security;
alter table public.dealer_responses enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;
alter table public.subscriptions enable row level security;
alter table public.saved_searches enable row level security;
alter table public.analytics_events enable row level security;

create policy "profiles select own or admin" on public.users_profile for select using (id = auth.uid() or public.is_admin());
create policy "profiles insert own" on public.users_profile for insert with check (id = auth.uid());
create policy "profiles update own or admin" on public.users_profile for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

create policy "public can view verified dealers" on public.dealer_profiles for select using (verified_status = 'verified' or user_id = auth.uid() or public.is_admin());
create policy "dealers create their profile" on public.dealer_profiles for insert with check (user_id = auth.uid() or public.is_admin());
create policy "dealers update their profile" on public.dealer_profiles for update using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "admins delete dealer profiles" on public.dealer_profiles for delete using (public.is_admin());

create policy "dealers view own inventory and admin all" on public.inventory_items for select using (
  public.is_admin()
  or exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid())
);
create policy "dealers manage own inventory" on public.inventory_items for all using (
  exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid()) or public.is_admin()
) with check (
  exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid()) or public.is_admin()
);

create policy "public view open public wanted cards" on public.buyer_wanted_cards for select using (
  (public_visibility = true and status = 'open')
  or buyer_id = auth.uid()
  or public.is_admin()
  or public.current_user_role() in ('dealer', 'private_seller')
);
create policy "buyers manage own wanted cards" on public.buyer_wanted_cards for all using (buyer_id = auth.uid() or public.is_admin()) with check (buyer_id = auth.uid() or public.is_admin());

create policy "public view published dealer match cards" on public.dealer_match_cards for select using (
  (visibility = 'public' and status = 'published')
  or public.is_admin()
  or exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid())
);
create policy "dealers manage own dealer match cards" on public.dealer_match_cards for all using (
  exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid()) or public.is_admin()
) with check (
  exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid()) or public.is_admin()
);

create policy "buyers create interest and dealers view their leads" on public.buyer_interests for select using (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (
    select 1
    from public.dealer_match_cards c
    join public.dealer_profiles d on d.id = c.dealer_id
    where c.id = dealer_match_card_id and d.user_id = auth.uid()
  )
);
create policy "anyone can create buyer interest" on public.buyer_interests for insert with check (permission_to_contact = true or buyer_id = auth.uid() or public.is_admin());
create policy "lead owner parties can update interest" on public.buyer_interests for update using (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (
    select 1
    from public.dealer_match_cards c
    join public.dealer_profiles d on d.id = c.dealer_id
    where c.id = dealer_match_card_id and d.user_id = auth.uid()
  )
);

create policy "buyers and responding dealers view responses" on public.dealer_responses for select using (
  public.is_admin()
  or exists (select 1 from public.buyer_wanted_cards w where w.id = buyer_wanted_card_id and w.buyer_id = auth.uid())
  or exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid())
);
create policy "dealers submit responses" on public.dealer_responses for insert with check (
  exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid()) or public.is_admin()
);
create policy "buyers and dealers update response status" on public.dealer_responses for update using (
  public.is_admin()
  or exists (select 1 from public.buyer_wanted_cards w where w.id = buyer_wanted_card_id and w.buyer_id = auth.uid())
  or exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid())
);

create policy "message participants can view" on public.messages for select using (sender_id = auth.uid() or receiver_id = auth.uid() or public.is_admin());
create policy "message sender can insert" on public.messages for insert with check (sender_id = auth.uid() or public.is_admin());
create policy "message receiver can mark read" on public.messages for update using (receiver_id = auth.uid() or public.is_admin());

create policy "users create reports" on public.reports for insert with check (reporter_id = auth.uid() or public.is_admin());
create policy "reporters and admins view reports" on public.reports for select using (reporter_id = auth.uid() or public.is_admin());
create policy "admins manage reports" on public.reports for update using (public.is_admin());

create policy "dealers view own subscriptions" on public.subscriptions for select using (
  public.is_admin()
  or exists (select 1 from public.dealer_profiles d where d.id = dealer_id and d.user_id = auth.uid())
);
create policy "admins manage subscriptions" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());

create policy "users manage own saved searches" on public.saved_searches for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

create policy "users insert analytics events" on public.analytics_events for insert with check (user_id is null or user_id = auth.uid() or public.is_admin());
create policy "admins view analytics events" on public.analytics_events for select using (public.is_admin());
