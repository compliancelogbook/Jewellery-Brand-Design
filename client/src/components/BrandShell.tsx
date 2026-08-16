/** Golden Hour visual system: translucent editorial header, precise utility navigation, deep-ink footer. */
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";

const nav = [
  { label: "New: Solstice", href: "/collections/sola" },
  { label: "The Bridal Edit", href: "/collections/bridal" },
  { label: "Chic Happens", href: "/collections/chic-happens" },
  { label: "Old Money", href: "/collections/old-money-minimalist" },
  { label: "The studio", href: "/pages/our-story" },
];

function OrbitMark() {
  return <img className="mark" src="/manus-storage/oriele-orbit-mark_948ea730.png" alt="" />;
}

function BrandLockup() {
  return <><OrbitMark /><span className="wordmark__lockup"><span className="wordmark__name">Golden Hour</span><em>London</em></span></>;
}

export default function BrandShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const isHome = location === "/";
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [location]);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <div className="site-shell">
      <div className="shipping-ticker" role="note">
        <div className="shipping-ticker__track"><span>Complimentary UK delivery over £100</span><i /> <span>Jewellery made in small, considered runs</span><i /> <span>Complimentary UK delivery over £100</span></div>
      </div>
      <header className={`site-header ${isHome && !isScrolled ? "site-header--over" : "site-header--solid"}`}>
        <Link href="/" className="wordmark" aria-label="Golden Hour home"><BrandLockup /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-tools">
          <button aria-label="Search the collection"><Search size={18} strokeWidth={1.4} /></button>
          <Link href="/account" aria-label="Account"><UserRound size={18} strokeWidth={1.4} /></Link>
          <button className="shopping-bag-trigger" onClick={openCart} aria-label={`Shopping bag, ${itemCount} items`}><ShoppingBag size={18} strokeWidth={1.4} /><sup>{itemCount}</sup></button>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} strokeWidth={1.4} /></button>
        </div>
      </header>
      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-menu__top"><Link href="/" className="wordmark"><BrandLockup /></Link><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={23} strokeWidth={1.3} /></button></div>
        <nav aria-label="Mobile navigation">{nav.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}<Link href="/account">My account</Link></nav>
        <p>Jewellery for a well-kept summer.</p>
      </div>
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__identity"><Link href="/" className="wordmark"><BrandLockup /></Link><p>Jewellery for the way you mark a day.</p></div>
      <form className="footer-newsletter" onSubmit={(event) => event.preventDefault()}><label htmlFor="footer-email">Studio letter</label><div><input id="footer-email" type="email" placeholder="Email address" /><button type="submit">Join</button></div></form>
      <div className="site-footer__links"><div><span>Visit</span><Link href="/collections/sola">The collection</Link><Link href="/collections/bridal">Occasion pieces</Link><Link href="/pages/our-story">The studio</Link></div><div><span>Assistance</span><a href="mailto:studio@goldenhour.example">Contact</a><a href="#care">Care guide</a><a href="#delivery">Delivery & returns</a></div></div>
      <div className="site-footer__fineprint"><span>© 2026 Golden Hour London</span><span>Made with care in the United Kingdom</span><span>Terms · Privacy</span></div>
    </footer>
  );
}
