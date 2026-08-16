/** Golden Hour Journal: Couture Correspondence uses folio margins, mineral neutrals, and original AW/26 jewellery editorials. */
import { ArrowRight, MoveUpRight } from "lucide-react";
import { Link } from "wouter";

const signals = [
  {
    folio: "01",
    title: "Silver, with intent.",
    copy: "The new statement is built in line, not volume. Let a cuff sit alone against a softened sleeve, or let a signet bring a little weight to an otherwise quiet hand.",
    image: "/manus-storage/golden-hour-journal-aw26-cuff_b3f6e569.jpg",
    alt: "Brushed silver cuff and signet ring worn with a charcoal jacket",
  },
  {
    folio: "02",
    title: "Pearls after dark.",
    copy: "Less debutante, more deliberate. This season’s pearls are irregular, layered, and held close to dark tailoring, sheer knits and bare skin.",
    image: "/manus-storage/golden-hour-journal-aw26-pearl_363f7573.jpg",
    alt: "Pearl choker and silver jewellery arranged with black silk",
  },
  {
    folio: "03",
    title: "A line of light.",
    copy: "Slender chains and small celestial stones make their point in motion. Consider the neckline an empty margin: leave space around what you choose.",
    image: "/manus-storage/golden-hour-journal-aw26-celestial_1a6cbd38.jpg",
    alt: "Celestial inspired silver lariat necklace arranged on black sheer fabric",
  },
];

export default function Journal() {
  return <article className="journal-page">
    <section className="journal-hero">
      <div className="journal-hero__folio"><span className="journal-hero__brand"><img src="/manus-storage/oriele-orbit-mark_948ea730.png" alt="" />Golden Hour London / Journal</span><i /><span>Issue 01 / AW 26</span></div>
      <div className="journal-hero__title"><span className="eyebrow">The AW/26 edit</span><h1>After the<br /><em>light.</em></h1><p>Three jewellery notes for the season of ink, texture and a little more intention.</p></div>
      <div className="journal-hero__visual"><img src="/manus-storage/golden-hour-journal-aw26-hero_6267ca4a.jpg" alt="Woman in a black silk jacket wearing sculptural silver earrings" /><span>Fashion note / 04 minute read</span></div>
      <p className="journal-hero__sidecopy">Not a forecast. More a way of looking: at metal, at proportion, at the small decisions that alter the whole mood of an outfit.</p>
    </section>

    <section className="journal-opening">
      <div className="journal-opening__marker">AW<br />26</div>
      <div><span className="eyebrow">A note on adornment</span><h2>What changes when<br />the <em>line</em> gets quieter?</h2><p>Autumn asks for a different kind of shine. The clothes become softer, darker, closer to the body. Jewellery follows suit—not with more, but with sharper choices: a curved silver cuff against wool, an irregular pearl at the throat, a chain that catches the light once and then disappears.</p><p>For this edit, we are drawn to pieces that do not shout across the room. They stay close, change the outline, and make an ordinary evening feel considered.</p></div>
      <aside><span>Editor’s margin</span><p>“Choose one piece with a point of view, then let the rest of the look breathe.”</p></aside>
    </section>

    <section className="journal-signals" aria-labelledby="signals-title">
      <div className="journal-signals__heading"><span className="eyebrow">The three signals</span><h2 id="signals-title">How we are wearing<br /><em>AW/26.</em></h2><p>Shape, softness and a restrained sense of occasion.</p></div>
      <div className="journal-signals__list">{signals.map((signal, index) => <article className={`journal-signal journal-signal--${index + 1}`} key={signal.folio}><div className="journal-signal__image"><img src={signal.image} alt={signal.alt} /><span>{signal.folio}</span></div><div className="journal-signal__copy"><span className="eyebrow">Folio {signal.folio}</span><h3>{signal.title}</h3><p>{signal.copy}</p></div></article>)}</div>
    </section>

    <section className="journal-close">
      <span className="eyebrow">The Golden Hour point of view</span><h2>For the pieces<br />that change the <em>whole story.</em></h2><p>Explore jewellery made for evenings that call for little more than a good coat, an open collar and something worth noticing.</p><Link href="/collections/sola" className="button button--light" data-magnetic>Shop the latest <ArrowRight size={17} strokeWidth={1.4} /></Link><Link href="/collections/bridal" className="journal-close__secondary">For the occasion <MoveUpRight size={16} strokeWidth={1.4} /></Link>
    </section>
  </article>;
}
