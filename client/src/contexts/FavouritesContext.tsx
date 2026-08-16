/** Golden Hour saved pieces: browser-persistent favourites with an optional path to future account sync. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Piece } from "@/data/catalog";

type FavouritesContextValue = {
  items: Piece[];
  itemCount: number;
  isOpen: boolean;
  isSaved: (slug: string) => boolean;
  togglePiece: (piece: Piece) => void;
  removePiece: (slug: string) => void;
  openFavourites: () => void;
  closeFavourites: () => void;
};

const FavouritesContext = createContext<FavouritesContextValue | null>(null);
const storageKey = "golden-hour-saved-pieces";

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Piece[]>(() => {
    try { return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as Piece[]; } catch { return []; }
  });
  const [isOpen, setOpen] = useState(false);
  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify(items)); }, [items]);

  const value = useMemo<FavouritesContextValue>(() => ({
    items,
    itemCount: items.length,
    isOpen,
    isSaved: (slug) => items.some((piece) => piece.slug === slug),
    togglePiece: (piece) => setItems((current) => current.some((item) => item.slug === piece.slug) ? current.filter((item) => item.slug !== piece.slug) : [...current, piece]),
    removePiece: (slug) => setItems((current) => current.filter((piece) => piece.slug !== slug)),
    openFavourites: () => setOpen(true),
    closeFavourites: () => setOpen(false),
  }), [items, isOpen]);

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error("useFavourites must be used inside FavouritesProvider");
  return context;
}
