-- Apply only after V83 accounts are active. Never applied automatically.
begin;
create table public.ary_push_preferences (
 user_id uuid primary key references auth.users(id) on delete cascade,
 preferences jsonb not null check(jsonb_typeof(preferences)='object' and octet_length(preferences::text)<4096)
);
create table public.ary_push_subscriptions (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 endpoint text not null unique check(length(endpoint) between 1 and 4096),
 subscription jsonb not null check(jsonb_typeof(subscription)='object' and octet_length(subscription::text)<8192),
 revision bigint not null default 1 check(revision>0), created_at timestamptz not null default now()
);
create table public.ary_push_jobs (
 id uuid primary key default gen_random_uuid(), subscription_id uuid not null references public.ary_push_subscriptions(id) on delete cascade,
 idempotency_key text not null check(length(idempotency_key)<180),
 status text not null default 'pending' check(status in ('pending','sending','accepted','cancelled','failed','expired_subscription')),
 attempts integer not null default 0 check(attempts between 0 and 5), subscription_revision bigint not null,
 available_at timestamptz not null default now(), expires_at timestamptz not null,
 lease_token uuid, lease_until timestamptz, unique(subscription_id,idempotency_key)
);
create index ary_push_jobs_due on public.ary_push_jobs(available_at) where status in ('pending','sending');
-- Only the trusted server may read transport keys or mutate queues.
alter table public.ary_push_preferences enable row level security;
alter table public.ary_push_preferences force row level security;
alter table public.ary_push_subscriptions enable row level security;
alter table public.ary_push_subscriptions force row level security;
alter table public.ary_push_jobs enable row level security;
alter table public.ary_push_jobs force row level security;
revoke all on public.ary_push_preferences,public.ary_push_subscriptions,public.ary_push_jobs from public,anon,authenticated;
grant select,insert,update,delete on public.ary_push_preferences,public.ary_push_subscriptions,public.ary_push_jobs to service_role;
grant select on public.ary_account_data to service_role;
commit;
