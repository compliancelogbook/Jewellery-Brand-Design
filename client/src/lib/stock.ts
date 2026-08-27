export const LOW_STOCK_THRESHOLD = 5;
export const RESTOCK_WINDOW_DAYS = 7;

export type StockStatus = "unknown" | "in-stock" | "low-stock" | "out-of-stock" | "back-in-stock";

export function getStockStatus(stock: number | null, restockedAt: string | null): StockStatus {
  if (stock === null) return "unknown";
  if (stock <= 0) return "out-of-stock";
  if (restockedAt) {
    const daysSinceRestock = (Date.now() - new Date(restockedAt).getTime()) / 86_400_000;
    if (daysSinceRestock >= 0 && daysSinceRestock <= RESTOCK_WINDOW_DAYS) return "back-in-stock";
  }
  if (stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

export function getStockLabel(status: StockStatus, stock: number | null): string | null {
  switch (status) {
    case "out-of-stock":
      return "Out of stock";
    case "back-in-stock":
      return "Back in stock";
    case "low-stock":
      return stock === 1 ? "Only 1 left" : `Only ${stock} left`;
    default:
      return null;
  }
}
