import { isSupabaseConfigured, supabase } from "./supabase";

export async function getAllStock(): Promise<{ data: Record<string, number> } | { error: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: {} };
  const { data, error } = await supabase.from("product_stock").select("slug, stock");
  if (error) return { error: error.message };
  return { data: Object.fromEntries((data ?? []).map((row) => [row.slug, row.stock])) };
}

export async function getStockForSlug(slug: string): Promise<{ data: number | null } | { error: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: null };
  const { data, error } = await supabase.from("product_stock").select("stock").eq("slug", slug).maybeSingle();
  if (error) return { error: error.message };
  return { data: data?.stock ?? null };
}
