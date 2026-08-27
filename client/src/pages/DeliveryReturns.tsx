/** Cherished help page: delivery, returns and the earrings hygiene exclusion, stated plainly and once. */
import { Mail, Truck } from "lucide-react";
import { Link } from "wouter";

export default function DeliveryReturns() {
  return <>
    <section className="size-guide-hero"><div className="size-guide-hero__crumb"><Link href="/">Home</Link><span>/</span><span>Help</span><span>/</span><span>Delivery &amp; returns</span></div><div><span className="eyebrow">Cherished help</span><h1>Delivery<br /><em>&amp; returns</em></h1><p>The practical details, stated plainly and in one place.</p></div><span className="size-guide-hero__mark"><Truck size={26} strokeWidth={1.1} /></span></section>
    <section className="collection-faq"><div><span className="eyebrow">A few practical things</span><h2>How your order<br />reaches you</h2></div><div className="accordion-list">
      <details open><summary>Delivery<span>+</span></summary><p><b>Standard delivery</b> — Royal Mail 48, 2–3 working days: £2.99, free on orders above £50.<br /><b>Express delivery</b> — Royal Mail 24, 1–2 working days: £3.99.</p></details>
      <details><summary>Returns &amp; exchanges<span>+</span></summary><p>Most pieces may be returned unworn, in their original packaging, within 30 days of receipt for a full refund or exchange.</p></details>
      <details><summary>Earrings<span>+</span></summary><p>For hygiene reasons, earrings cannot be returned or exchanged once received, unless the item is faulty. If you're unsure of a fit or finish before buying, get in touch and we're happy to help.</p></details>
      <details><summary>Faulty items<span>+</span></summary><p>If a piece arrives faulty or not as described, you're entitled to a full refund or replacement — this is separate from, and unaffected by, the returns policy above.</p></details>
    </div></section>
    <section className="size-guide-support"><div className="size-guide-support__image"><img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=90" alt="Cherished by Jade jewellery detail on an adult model" /></div><div className="size-guide-support__copy"><span className="eyebrow">Still have a question?</span><h2>Get in touch<br /><em>with the studio</em></h2><p>If anything here doesn't answer what you need, write to us and we'll help directly.</p><a href="mailto:hello@cherishedbyjade.co.uk" className="text-link">Get in touch <Mail size={15} strokeWidth={1.4} /></a></div></section>
  </>;
}
