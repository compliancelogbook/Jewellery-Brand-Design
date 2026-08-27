/** Cherished help page: placeholder terms notice — real terms need real business/legal detail before launch. */
import { Mail } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
  return <>
    <section className="size-guide-hero"><div className="size-guide-hero__crumb"><Link href="/">Home</Link><span>/</span><span>Terms</span></div><div><span className="eyebrow">Cherished</span><h1>Terms of<br /><em>service.</em></h1><p>Our full terms of service are being finalised. In the meantime, our delivery, returns and care policies are covered in the pages below.</p></div></section>
    <section className="size-guide-support"><div className="size-guide-support__image"><img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=90" alt="Cherished by Jade jewellery detail" /></div><div className="size-guide-support__copy"><span className="eyebrow">In the meantime</span><h2>Read our<br /><em>current policies.</em></h2><p>See <Link href="/help/delivery-returns">Delivery &amp; returns</Link> for how orders, refunds and exchanges work. For anything else, get in touch directly.</p><a href="mailto:hello@cherishedbyjade.co.uk" className="text-link">Get in touch <Mail size={15} strokeWidth={1.4} /></a></div></section>
  </>;
}
