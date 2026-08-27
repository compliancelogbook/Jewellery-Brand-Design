/** Golden Hour shopping bag: local, persistent product selection state for the static storefront. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Piece } from "@/data/catalog";
import { findPromoCode, type PromoCode } from "@/lib/promoCodes";

export type CartItem = { key: string; piece: Piece; quantity: number; size?: string; finish?: string };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isCartOpen: boolean;
  giftNote: string;
  setGiftNote: (note: string) => void;
  promoCode: PromoCode | null;
  promoError: string | null;
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  addItem: (piece: Piece, quantity: number, size?: string, finish?: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "golden-hour-shopping-bag";
const giftNoteStorageKey = "golden-hour-gift-note";
const promoStorageKey = "golden-hour-promo-code";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as CartItem[]; } catch { return []; }
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [giftNote, setGiftNoteState] = useState(() => {
    try { return window.localStorage.getItem(giftNoteStorageKey) ?? ""; } catch { return ""; }
  });
  const [promoCode, setPromoCode] = useState<PromoCode | null>(() => {
    try {
      const saved = window.localStorage.getItem(promoStorageKey);
      return saved ? (findPromoCode(saved) ?? null) : null;
    } catch { return null; }
  });
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify(items)); }, [items]);
  useEffect(() => { window.localStorage.setItem(giftNoteStorageKey, giftNote); }, [giftNote]);
  useEffect(() => {
    if (promoCode) window.localStorage.setItem(promoStorageKey, promoCode.code);
    else window.localStorage.removeItem(promoStorageKey);
  }, [promoCode]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    isCartOpen,
    giftNote,
    setGiftNote: setGiftNoteState,
    promoCode,
    promoError,
    applyPromoCode: (code) => {
      const match = findPromoCode(code);
      if (match) { setPromoCode(match); setPromoError(null); }
      else setPromoError("That code isn't valid — check for typos.");
    },
    removePromoCode: () => { setPromoCode(null); setPromoError(null); },
    addItem: (piece, quantity, size, finish) => {
      const key = `${piece.slug}-${size ?? "standard"}-${finish ?? "standard"}`;
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        return existing ? current.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { key, piece, quantity, size, finish }];
      });
    },
    updateQuantity: (key, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity } : item)),
    removeItem: (key) => setItems((current) => current.filter((item) => item.key !== key)),
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  }), [items, isCartOpen, giftNote, promoCode, promoError]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
