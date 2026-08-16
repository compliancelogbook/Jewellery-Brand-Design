/** Golden Hour saved pieces: a refined device-local collection with a clear account-sync invitation. */
import { ArrowRight, Heart, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { useFavourites } from "@/contexts/FavouritesContext";

export default function FavouritesDrawer() {
  const { items, isOpen, closeFavourites, removePiece } = useFavourites();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return <div className={`favourites-layer ${isOpen ? "favourites-layer--open" : ""}`} aria-hidden={!isOpen}>
    <button className="favourites-backdrop" aria-label="Close saved pieces" onClick={closeFavourites} tabIndex={isOpen ? 0 : -1} />
    <aside className="favourites-drawer" role="dialog" aria-modal="true" aria-label="Saved pieces">
      <header className="favourites-drawer__header"><div><span className="eyebrow">Golden Hour / London</span><h2>Saved<br /><em>pieces.</em></h2></div><button onClick={closeFavourites} aria-label="Close saved pieces"><X size={22} strokeWidth={1.35} /></button></header>
      {items.length === 0 ? <div className="favourites-empty"><span className="favourites-empty__heart"><Heart size={28} strokeWidth={1.25} /></span><h3>Keep a little<br /><em>beauty close.</em></h3><p>Tap the heart on any piece to save it here on this device.</p><button className="button button--ink" onClick={closeFavourites}>Explore the collection <ArrowRight size={15} strokeWidth={1.4} /></button></div> : <><div className="favourites-lines">{items.map((piece) => <article className="favourites-line" key={piece.slug}><img src={piece.image} alt={piece.name} /><div><div><Link href={`/products/${piece.slug}`} onClick={closeFavourites}>{piece.name}</Link><button onClick={() => removePiece(piece.slug)} aria-label={`Remove ${piece.name} from saved pieces`}><Heart size={17} fill="currentColor" strokeWidth={1.3} /></button></div><p>{piece.material}</p><strong>{piece.price}</strong><Link className="favourites-line__view" href={`/products/${piece.slug}`} onClick={closeFavourites}>View piece <ArrowRight size={13} strokeWidth={1.4} /></Link></div></article>)}</div><div className="favourites-account"><span className="eyebrow">Take them with you</span><h3>Save across<br /><em>every device.</em></h3><p>Create an account when you are ready to keep your favourites beyond this browser.</p><Link href="/account" className="button button--ink" onClick={closeFavourites}>Create an account <ArrowRight size={15} strokeWidth={1.4} /></Link><button onClick={closeFavourites}><ShoppingBag size={15} strokeWidth={1.4} /> Keep browsing</button></div></>}
    </aside>
  </div>;
}
