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
