import { isSupabaseConfigured, supabase } from "./supabase";

export type StockEntry = { stock: number | null; restockedAt: string | null };

export async function getAllStock(): Promise<{ data: Record<string, StockEntry> } | { error: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: {} };
  const { data, error } = await supabase.from("product_stock").select("slug, stock, restocked_at");
  if (error) return { error: error.message };
  return {
    data: Object.fromEntries((data ?? []).map((row) => [row.slug, { stock: row.stock, restockedAt: row.restocked_at }])),
  };
}

export async function getStockForSlug(slug: string): Promise<{ data: StockEntry } | { error: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: { stock: null, restockedAt: null } };
  const { data, error } = await supabase.from("product_stock").select("stock, restocked_at").eq("slug", slug).maybeSingle();
  if (error) return { error: error.message };
  return { data: { stock: data?.stock ?? null, restockedAt: data?.restocked_at ?? null } };
}
