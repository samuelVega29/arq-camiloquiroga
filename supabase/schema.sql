create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

revoke all on table public.admins from anon, authenticated;
grant select on table public.admins to authenticated;

drop policy if exists "Admins can read their own row" on public.admins;
create policy "Admins can read their own row"
on public.admins
for select
to authenticated
using (user_id = auth.uid());

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null default '',
  location text not null default '',
  client text not null default '',
  year text not null default '',
  value text not null default '',
  images text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint publications_title_length check (char_length(title) between 1 and 90),
  constraint publications_category_check check (
    category in (
      'Obras dirigidas',
      'Obras contratadas',
      'Obras diseñadas',
      'Residencias',
      'Remodelación'
    )
  ),
  constraint publications_description_length check (char_length(description) <= 2500),
  constraint publications_location_length check (char_length(location) <= 90),
  constraint publications_client_length check (char_length(client) <= 90),
  constraint publications_year_length check (char_length(year) <= 40),
  constraint publications_value_length check (char_length(value) <= 60),
  constraint publications_images_count check (
    coalesce(array_length(images, 1), 0) between 1 and 6
  )
);

alter table public.publications
drop constraint if exists publications_category_check;

alter table public.publications
add constraint publications_category_check check (
  category in (
    'Obras dirigidas',
    'Obras contratadas',
    'Obras diseñadas',
    'Residencias',
    'Remodelación'
  )
);

create index if not exists publications_created_at_idx
on public.publications (created_at desc);

alter table public.publications enable row level security;

revoke all on table public.publications from anon, authenticated;
grant select on table public.publications to anon, authenticated;
grant insert, update, delete on table public.publications to authenticated;

drop policy if exists "Public read publications" on public.publications;
create policy "Public read publications"
on public.publications
for select
to anon, authenticated
using (true);

drop policy if exists "Admins insert publications" on public.publications;
create policy "Admins insert publications"
on public.publications
for insert
to authenticated
with check (
  exists (select 1 from public.admins where user_id = auth.uid())
);

drop policy if exists "Admins update publications" on public.publications;
create policy "Admins update publications"
on public.publications
for update
to authenticated
using (
  exists (select 1 from public.admins where user_id = auth.uid())
)
with check (
  exists (select 1 from public.admins where user_id = auth.uid())
);

drop policy if exists "Admins delete publications" on public.publications;
create policy "Admins delete publications"
on public.publications
for delete
to authenticated
using (
  exists (select 1 from public.admins where user_id = auth.uid())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists publications_set_updated_at on public.publications;
create trigger publications_set_updated_at
before update on public.publications
for each row
execute function public.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'publication-images',
  'publication-images',
  true,
  20971520,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read publication images" on storage.objects;
create policy "Public read publication images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'publication-images');

drop policy if exists "Admins upload publication images" on storage.objects;
create policy "Admins upload publication images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'publication-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
);

drop policy if exists "Admins update publication images" on storage.objects;
create policy "Admins update publication images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'publication-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
)
with check (
  bucket_id = 'publication-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
);

drop policy if exists "Admins delete publication images" on storage.objects;
create policy "Admins delete publication images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'publication-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
);
