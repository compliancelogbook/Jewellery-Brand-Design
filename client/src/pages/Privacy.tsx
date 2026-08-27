/** Cherished help page: placeholder privacy notice — a real policy needs real data-handling detail before launch. */
import { Mail } from "lucide-react";
import { Link } from "wouter";

export default function Privacy() {
  return <>
    <section className="size-guide-hero"><div className="size-guide-hero__crumb"><Link href="/">Home</Link><span>/</span><span>Privacy</span></div><div><span className="eyebrow">Cherished</span><h1>Privacy<br /><em>policy.</em></h1><p>Our full privacy policy is being finalised. If you have any question about how your information is used, please contact us directly.</p></div></section>
    <section className="size-guide-support"><div className="size-guide-support__image"><img src="https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1200&q=90" alt="Cherished by Jade jewellery detail" /></div><div className="size-guide-support__copy"><span className="eyebrow">Any question?</span><h2>Get in touch<br /><em>with the studio.</em></h2><p>Write to us any time about your data or an existing order.</p><a href="mailto:hello@cherishedbyjade.co.uk" className="text-link">Get in touch <Mail size={15} strokeWidth={1.4} /></a></div></section>
  </>;
}
