import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type StockEntry = { stock: number | null; restockedAt: string | null };
type StockMap = Record<string, StockEntry>;

const StockContext = createContext<StockMap>({});

export function StockProvider({ children }: { children: ReactNode }) {
  const [stockMap, setStockMap] = useState<StockMap>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/stock")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: StockMap) => {
        if (!cancelled) setStockMap(data ?? {});
      })
      .catch(() => {
        /* stock is a progressive enhancement — the site works fine without it */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <StockContext.Provider value={stockMap}>{children}</StockContext.Provider>;
}

export function useStock(slug: string): StockEntry {
  const map = useContext(StockContext);
  return map[slug] ?? { stock: null, restockedAt: null };
}
