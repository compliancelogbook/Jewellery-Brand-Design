/** Golden Hour visual system: translucent editorial header, precise utility navigation, deep-ink footer. */
import { ArrowRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import FavouritesDrawer from "@/components/FavouritesDrawer";
import { useFavourites } from "@/contexts/FavouritesContext";
import { categoryCollections } from "@/data/catalog";

const nav = [
  { label: "New In", href: "/collections/new-in" },
  { label: "The Personal Edit", href: "/collections/personal" },
  { label: "Golden Hour", href: "/collections/sola" },
  { label: "The Bridal Edit", href: "/collections/bridal" },
  { label: "Chic Happens", href: "/collections/chic-happens" },
  { label: "Old Money", href: "/collections/old-money-minimalist" },
  { label: "The Christmas Edit", href: "/collections/christmas" },
];

function BrandLockup() {
  return <span className="wordmark__lockup"><span className="wordmark__name">Cherished</span><em>by Jade</em></span>;
}

export default function BrandShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isShopOpen, setShopOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const isHome = location === "/";
  const { itemCount, openCart } = useCart();
  const { itemCount: savedCount, openFavourites } = useFavourites();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [location]);

  useEffect(() => { setMenuOpen(false); setShopOpen(false); }, [location]);

  return (
    <div className="site-shell">
      <div className="shipping-ticker" role="note">
        <span>Free delivery to United Kingdom for orders over £50</span>
      </div>
      <header className={`site-header ${isShopOpen ? "site-header--menu-open" : isHome && !isScrolled ? "site-header--over" : "site-header--solid"}`}>
        <Link href="/" className="wordmark" aria-label="Cherished by Jade home"><BrandLockup /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="shop-nav-item" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setShopOpen(false); }}>
            <button className="shop-nav-trigger" aria-expanded={isShopOpen} aria-haspopup="true" onClick={() => setShopOpen(true)} onFocus={() => setShopOpen(true)}>Shop <span>+</span></button>
            <div className={`shop-mega ${isShopOpen ? "shop-mega--open" : ""}`} aria-hidden={!isShopOpen}><div className="shop-mega__inner"><div className="shop-mega__intro"><span className="eyebrow">Shop by category</span><h2>Find the piece<br />that stays close</h2><p>Browse the collection by the way you wear it.</p></div><div className="shop-mega__links"><span className="eyebrow">The categories</span>{categoryCollections.map((category) => <Link key={category.slug} href={`/shop/${category.slug}`}>{category.title} <span>↗</span></Link>)}<Link className="shop-mega__all" href="/collections/sola">Shop the latest <ArrowRight size={14} strokeWidth={1.4} /></Link></div><Link href="/shop/bridal-accessories" className="shop-mega__feature"><img src="https://res.cloudinary.com/dnp0sgoad/image/upload/v1787388121/pear-pearl-studs-house-model-02-approved-v1_pcbl74.png" alt="Pearl bridal accessory" /><div><span>For the occasion</span><strong>Bridal Accessories</strong><em>Explore now</em></div></Link></div></div>
          </div>
          {nav.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-tools">
          <button aria-label="Search the collection"><Search size={18} strokeWidth={1.4} /></button>
          <Link href="/account" aria-label="Account"><UserRound size={18} strokeWidth={1.4} /></Link>
          <button className="favourites-trigger" onClick={openFavourites} aria-label={`Saved pieces, ${savedCount} items`}><Heart size={19} strokeWidth={1.35} /><sup>{savedCount}</sup></button>
          <button className="shopping-bag-trigger" onClick={openCart} aria-label={`Shopping bag, ${itemCount} items`}><ShoppingBag size={18} strokeWidth={1.4} /><sup>{itemCount}</sup></button>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} strokeWidth={1.4} /></button>
        </div>
      </header>
      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-menu__top"><Link href="/" className="wordmark"><BrandLockup /></Link><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={23} strokeWidth={1.3} /></button></div>
        <nav aria-label="Mobile navigation"><span className="mobile-menu__label">Shop by category</span>{categoryCollections.map((category) => <Link key={category.slug} className="mobile-menu__category" href={`/shop/${category.slug}`}>{category.title}</Link>)}<span className="mobile-menu__label mobile-menu__label--edits">The edits</span>{nav.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}<Link href="/account">My account</Link></nav><button className="mobile-menu__favourites" onClick={openFavourites}><Heart size={19} strokeWidth={1.35} /> Saved pieces <span>{savedCount}</span></button>
        <p>Jewellery for a well-kept summer.</p>
      </div>
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <FavouritesDrawer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__identity"><Link href="/" className="wordmark"><BrandLockup /></Link><p>Jewellery for the way you mark a day.</p></div>
      <form className="footer-newsletter" onSubmit={(event) => event.preventDefault()}><label htmlFor="footer-email">Studio letter</label><div><input id="footer-email" type="email" placeholder="Email address" /><button type="submit">Join</button></div></form>
      <div className="site-footer__links"><div><span>Visit</span><Link href="/collections/sola">The collection</Link><Link href="/collections/bridal">Occasion pieces</Link><Link href="/journal">The journal</Link></div><div><span>Help</span><Link href="/help/size-guide">Size guide</Link><Link href="/help/delivery-returns">Delivery & returns</Link><Link href="/help/care-guide">Care guide</Link><a href="mailto:hello@cherishedbyjade.co.uk">Contact us</a></div></div>
      <div className="site-footer__fineprint"><span>© 2026 Cherished by Jade</span><span>Made with care in the United Kingdom</span><span><Link href="/pages/terms">Terms</Link> · <Link href="/pages/privacy">Privacy</Link></span></div>
    </footer>
  );
}
