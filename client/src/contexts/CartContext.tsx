/** Golden Hour shopping bag: local, persistent product selection state for the static storefront. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Piece } from "@/data/catalog";

export type CartItem = { key: string; piece: Piece; quantity: number; size?: string };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isCartOpen: boolean;
  addItem: (piece: Piece, quantity: number, size?: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "golden-hour-shopping-bag";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as CartItem[]; } catch { return []; }
  });
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify(items)); }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    isCartOpen,
    addItem: (piece, quantity, size) => {
      const key = `${piece.slug}-${size ?? "standard"}`;
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        return existing ? current.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { key, piece, quantity, size }];
      });
    },
    updateQuantity: (key, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity } : item)),
    removeItem: (key) => setItems((current) => current.filter((item) => item.key !== key)),
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  }), [items, isCartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
