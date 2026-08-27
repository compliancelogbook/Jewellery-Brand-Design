/** Golden Hour shopping bag: a quiet, editorial drawer with line-item management and a live order total. */
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const formatPrice = (price: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(price);
const unitPrice = (price: string) => Number(price.replace(/[£,]/g, ""));

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, giftNote, setGiftNote, promoCode, promoError, applyPromoCode, removePromoCode } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const subtotal = items.reduce((total, item) => total + unitPrice(item.piece.price) * item.quantity, 0);
  const discount = promoCode ? subtotal * (promoCode.percentOff / 100) : 0;
  const total = subtotal - discount;

  const submitPromo = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput("");
  };

  useEffect(() => {
    if (!isCartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isCartOpen]);

  return <div className={`cart-layer ${isCartOpen ? "cart-layer--open" : ""}`} aria-hidden={!isCartOpen}>
    <button className="cart-backdrop" aria-label="Close shopping bag" onClick={closeCart} tabIndex={isCartOpen ? 0 : -1} />
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <header className="cart-drawer__header"><div><span className="eyebrow">Cherished / by Jade</span><h2>Your bag</h2></div><button onClick={closeCart} aria-label="Close shopping bag"><X size={22} strokeWidth={1.35} /></button></header>
      {items.length === 0 ? <div className="cart-empty"><span className="cart-empty__mark">◌</span><h3>Nothing held<br />close yet</h3><p>Your chosen pieces will wait here.</p><button className="button button--ink" onClick={closeCart}>Continue browsing <ArrowRight size={15} strokeWidth={1.4} /></button></div> : <>
        <div className="cart-lines">{items.map((item) => <article className="cart-line" key={item.key}><img src={item.piece.image} alt={item.piece.name} /><div className="cart-line__detail"><div><Link href={`/products/${item.piece.slug}`} onClick={closeCart}>{item.piece.name}</Link><button onClick={() => removeItem(item.key)} aria-label={`Remove ${item.piece.name}`}>Remove</button></div><p>{item.piece.material}{item.finish && <><span> / </span>{item.finish}</>}{item.size && <><span> / </span>Size {item.size}</>}</p><div className="cart-line__bottom"><div className="cart-quantity"><button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label={`Decrease ${item.piece.name} quantity`}><Minus size={13} /></button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label={`Increase ${item.piece.name} quantity`}><Plus size={13} /></button></div><strong>{formatPrice(unitPrice(item.piece.price) * item.quantity)}</strong></div></div></article>)}</div>
        <details className="cart-gift-note"><summary>Add a gift note <span>{giftNote ? "Edit" : "+"}</span></summary><textarea value={giftNote} onChange={(event) => setGiftNote(event.target.value)} maxLength={300} placeholder="Write a short note to include with this order — we'll pack it in by hand." /><span className="cart-gift-note__count">{giftNote.length}/300</span></details>
        <div className="cart-promo">{promoCode ? <div className="cart-promo__applied"><span><Tag size={13} strokeWidth={1.6} /> {promoCode.code} applied — {promoCode.label}</span><button onClick={removePromoCode} aria-label="Remove promo code">Remove</button></div> : <form onSubmit={submitPromo}><input value={promoInput} onChange={(event) => setPromoInput(event.target.value)} placeholder="Promo code" aria-label="Promo code" /><button type="submit">Apply</button></form>}{promoError && !promoCode && <p className="cart-promo__error">{promoError}</p>}</div>
        <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>{promoCode && <div className="cart-summary__discount"><span>{promoCode.code}</span><strong>−{formatPrice(discount)}</strong></div>}<div className="cart-summary__total"><span>Total</span><strong>{formatPrice(total)}</strong></div><p>Delivery is calculated at checkout. UK delivery is complimentary above £50.</p><button className="button button--ink cart-checkout" onClick={() => toast("Checkout is being prepared", { description: "Payment integration will be available once Stripe is connected." })}>Checkout <ArrowRight size={15} strokeWidth={1.4} /></button><button className="cart-continue" onClick={closeCart}><ShoppingBag size={15} strokeWidth={1.4} /> Continue browsing</button></div>
      </>}
    </aside>
  </div>;
}
