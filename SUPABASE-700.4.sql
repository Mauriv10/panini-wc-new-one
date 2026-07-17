-- World Cup 2026 · Build 700.4
-- Ejecuta todo este archivo una sola vez en Supabase > SQL Editor.

create table if not exists public.wc_user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  revision bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.wc_user_state enable row level security;

drop policy if exists "wc_user_state_select_own" on public.wc_user_state;
create policy "wc_user_state_select_own"
on public.wc_user_state for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "wc_user_state_insert_own" on public.wc_user_state;
create policy "wc_user_state_insert_own"
on public.wc_user_state for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "wc_user_state_update_own" on public.wc_user_state;
create policy "wc_user_state_update_own"
on public.wc_user_state for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update on public.wc_user_state to authenticated;

-- Realtime para reflejar cambios entre dispositivos abiertos.
alter publication supabase_realtime add table public.wc_user_state;
