-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- This only tracks stock counts, keyed by the same product slug already used in
-- client/src/data/catalog.ts. All other product content (name, price, images,
-- description) stays in the codebase — this table is just the live, changeable number.

create table if not exists product_stock (
  slug text primary key,
  stock integer not null default 0,
  restocked_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Safe to re-run: adds the column if this table already existed without it.
alter table product_stock add column if not exists restocked_at timestamptz;

-- restocked_at drives the "Back in stock" marketing label (see client/src/lib/stock.ts).
-- Set it to the current time whenever you top up a product that had hit zero, e.g.:
--   update product_stock set stock = 20, restocked_at = now() where slug = 'reindeer-red-nose-studs';
-- Leave it alone for ordinary stock edits — it's only meant to mark a genuine restock.

-- Seed starting stock for the products that exist today.
-- Edit the numbers to whatever you actually have on hand, then run this.
insert into product_stock (slug, stock) values
  ('aurora-disc-pendant', 12),
  ('vesper-pearl-drops', 8),
  ('pearl-orbit-drop', 15),
  ('solis-ridge-ring', 10),
  ('tide-thread-chain', 9),
  ('lumen-pearl-collar', 6),
  ('citrus-stud-set', 20),
  ('rivulet-cuff', 11),
  ('marea-chainlet', 14),
  ('cerulean-vow-drop', 7),
  ('maris-pearl-pendant', 5),
  ('ivory-arc-studs', 13),
  ('promise-pave-ring', 9),
  ('heirloom-signature-ring', 4),
  ('midnight-gala-hoops', 10),
  ('meridian-link-chain', 6),
  ('pearl-comet-hair-pin', 16),
  ('marlowe-halo-headband', 3),
  ('luna-drop-earrings', 12),
  ('nocturne-pearl-drops', 8),
  ('reindeer-red-nose-studs', 25)
on conflict (slug) do nothing;
