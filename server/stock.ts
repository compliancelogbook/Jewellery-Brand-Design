import { isSupabaseConfigured, supabase } from "./supabase";

export type StockEntry = { stock: number | null; restockedAt: string | null };

/** slug -> summed stock, for every slug that has per-size rows (rings). */
async function getSizeStockTotals(): Promise<Record<string, number> | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from("product_size_stock").select("slug, stock");
  if (error) return null;
  const totals: Record<string, number> = {};
  for (const row of data ?? []) totals[row.slug] = (totals[row.slug] ?? 0) + row.stock;
  return totals;
}

export async function getAllStock(): Promise<{ data: Record<string, StockEntry> } | { error: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: {} };
  const { data, error } = await supabase.from("product_stock").select("slug, stock, restocked_at");
  if (error) return { error: error.message };

  const result: Record<string, StockEntry> = Object.fromEntries(
    (data ?? []).map((row) => [row.slug, { stock: row.stock, restockedAt: row.restocked_at }]),
  );

  // Any slug with per-size rows uses their sum instead — that table is the source of
  // truth for rings, so a stray product_stock row for the same slug is overridden here.
  const sizeTotals = await getSizeStockTotals();
  if (sizeTotals) {
    for (const [slug, total] of Object.entries(sizeTotals)) {
      result[slug] = { stock: total, restockedAt: result[slug]?.restockedAt ?? null };
    }
  }

  return { data: result };
}

export async function getStockForSlug(slug: string): Promise<{ data: StockEntry } | { error: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: { stock: null, restockedAt: null } };

  const { data: sizeRows } = await supabase.from("product_size_stock").select("stock").eq("slug", slug);
  if (sizeRows && sizeRows.length > 0) {
    return { data: { stock: sizeRows.reduce((sum, row) => sum + row.stock, 0), restockedAt: null } };
  }

  const { data, error } = await supabase.from("product_stock").select("stock, restocked_at").eq("slug", slug).maybeSingle();
  if (error) return { error: error.message };
  return { data: { stock: data?.stock ?? null, restockedAt: data?.restocked_at ?? null } };
}

/** Per-size breakdown for one product — used to grey out individual ring sizes. */
export async function getSizeStockForSlug(slug: string): Promise<{ data: Record<string, number> } | { error: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: {} };
  const { data, error } = await supabase.from("product_size_stock").select("size, stock").eq("slug", slug);
  if (error) return { error: error.message };
  return { data: Object.fromEntries((data ?? []).map((row) => [row.size, row.stock])) };
}
