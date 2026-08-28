/** Cherished help page: everyday care, storage and cleaning for vermeil, pearl and silver pieces. */
import { Droplet, Mail } from "lucide-react";
import { Link } from "wouter";

export default function CareGuide() {
  return <>
    <section className="size-guide-hero"><div className="size-guide-hero__crumb"><Link href="/">Home</Link><span>/</span><span>Help</span><span>/</span><span>Care guide</span></div><div><span className="eyebrow">Cherished help</span><h1>Made to last,<br /><em>with a little care</em></h1><p>Simple habits that keep a piece looking the way it did the day it arrived.</p></div><span className="size-guide-hero__mark"><Droplet size={26} strokeWidth={1.1} /></span></section>
    <section className="collection-faq"><div><span className="eyebrow">A few practical things</span><h2>Keeping your<br />pieces close</h2></div><div className="accordion-list">
      <details open><summary>Everyday wear<span>+</span></summary><p>Put jewellery on last, after perfume, hairspray and lotion, and take it off first when you undress. This alone prevents most of the dulling we see in vermeil and plated pieces.</p></details>
      <details><summary>Water &amp; swimming<span>+</span></summary><p>Remove pieces before showering, swimming or washing up. Chlorine and prolonged water exposure can affect plating and loosen pearl settings over time.</p></details>
      <details><summary>Cleaning<span>+</span></summary><p>Wipe gently with the soft cloth included with your order. Avoid jewellery cleaning dips and ultrasonic cleaners on vermeil, plated or pearl pieces — they can strip the finish.</p></details>
      <details><summary>Storage<span>+</span></summary><p>Store each piece separately in its pouch to prevent scratching and tangling, somewhere dry and out of direct sunlight.</p></details>
    </div></section>
    <section className="size-guide-support"><div className="size-guide-support__image"><img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90" alt="Cherished by Jade jewellery detail on an adult model" /></div><div className="size-guide-support__copy"><span className="eyebrow">Still have a question?</span><h2>Get in touch<br /><em>with the studio</em></h2><p>If a piece needs attention beyond everyday care, write to us and we'll help directly.</p><a href="mailto:hello@cherishedbyjade.com" className="text-link">Get in touch <Mail size={15} strokeWidth={1.4} /></a></div></section>
  </>;
}
