/** Golden Hour help page: a full, editorial ring-size guide and a considered route to customer care. */
import { ArrowRight, Mail, Ruler } from "lucide-react";
import { Link } from "wouter";
import RingSizeGuide from "@/components/RingSizeGuide";

export default function SizeGuide() {
  return <>
    <section className="size-guide-hero"><div className="size-guide-hero__crumb"><Link href="/">Home</Link><span>/</span><span>Help</span><span>/</span><span>Size guide</span></div><div><span className="eyebrow">Golden Hour help</span><h1>Find the fit<br /><em>that feels like yours.</em></h1><p>Our guide is here to help you choose a ring that sits easily, stays close, and becomes part of your day.</p></div><span className="size-guide-hero__mark"><Ruler size={26} strokeWidth={1.1} /></span></section>
    <section className="size-guide-content"><div className="size-guide-content__intro"><span className="eyebrow">Ring sizing</span><h2>Measured<br />with care.</h2><p>Use the inside diameter of a ring you already wear comfortably, or follow the three small steps in the guide. Every Golden Hour ring is measured with the same considered attention as the piece itself.</p><div className="size-guide-content__note"><span>01</span><p>If your measurement sits between sizes, choose the larger size for a more comfortable fit.</p></div></div><div className="size-guide-content__guide"><RingSizeGuide expanded standalone /></div></section>
    <section className="size-guide-support"><div className="size-guide-support__image"><img src="/manus-storage/golden-hour-bridal-earring-closeup_19c54fe5.jpg" alt="Golden Hour jewellery detail on an adult model" /></div><div className="size-guide-support__copy"><span className="eyebrow">Still unsure?</span><h2>Let us help you<br /><em>choose with ease.</em></h2><p>If you are still deciding, the studio is here to help with fit, gifting, and the little details that make a piece feel entirely right.</p><a href="mailto:studio@goldenhour.example" className="text-link">Get in touch <Mail size={15} strokeWidth={1.4} /></a><Link href="/collections/sola" className="size-guide-support__browse">Continue to the collection <ArrowRight size={15} strokeWidth={1.4} /></Link></div></section>
  </>;
}
