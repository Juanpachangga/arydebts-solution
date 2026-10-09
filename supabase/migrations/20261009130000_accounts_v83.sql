-- Apply in a Supabase project. No secrets or test accounts are included.
begin;
create table public.ary_account_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  revision bigint not null default 1 check (revision between 1 and 9007199254740991),
  constraint ary_payload_object check (jsonb_typeof(payload) = 'object'),
  constraint ary_state_object check ((jsonb_typeof(payload->'state') = 'object') is true),
  constraint ary_profile_object check ((jsonb_typeof(payload->'profile') = 'object') is true),
  constraint ary_debts_array check ((jsonb_typeof(payload->'state'->'debts') = 'array') is true),
  constraint ary_expenses_array check ((jsonb_typeof(payload->'state'->'expenses') = 'array') is true),
  constraint ary_payments_array check ((jsonb_typeof(payload->'state'->'payments') = 'array') is true),
  constraint ary_calendarEvents_array check ((jsonb_typeof(payload->'state'->'calendarEvents') = 'array') is true),
  constraint ary_payload_limit check (octet_length(payload::text) <= 262144)
);
alter table public.ary_account_data enable row level security;
alter table public.ary_account_data force row level security;
revoke all on public.ary_account_data from anon, authenticated;
grant select, insert, update, delete on public.ary_account_data to authenticated;
create policy ary_read_own on public.ary_account_data for select to authenticated
  using ((select auth.uid()) = user_id and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false');
create policy ary_insert_own on public.ary_account_data for insert to authenticated
  with check ((select auth.uid()) = user_id and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false');
create policy ary_update_own on public.ary_account_data for update to authenticated
  using ((select auth.uid()) = user_id and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false')
  with check ((select auth.uid()) = user_id and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false');
create policy ary_delete_own on public.ary_account_data for delete to authenticated
  using ((select auth.uid()) = user_id and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false');
commit;
