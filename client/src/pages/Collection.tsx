/** Golden Hour visual system: editorial collection hero, focused sub-edit links, and image-led merchandise grids. */
import { ChevronDown, MoveUpRight, SlidersHorizontal } from "lucide-react";
import { Link, useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import { collectionEdits, getEdit, piecesForEdit } from "../data/catalog";

const collectionNotes: Record<string, { title: string; copy: string; image: string }> = {
  "something-blue": { title: "A little blue, held close.", copy: "The softest glint can be enough. Wear it as your quiet note, your borrowed colour, your own small piece of luck.", image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1200&q=90" },
  "say-i-do": { title: "For the hand you hold.", copy: "Thoughtfully finished jewellery for the promise you make, the photographs you keep, and the everyday after the ceremony.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90" },
  "bridal-accessories": { title: "The finishing touch.", copy: "Softly sculpted hair pieces and luminous pearl drops, designed to make the final detail feel entirely yours.", image: "/manus-storage/golden-hour-bridal-accessories-hero_fd3a30d3.jpg" },
};

export default function Collection() {
  const [location] = useLocation();
  const slug = location.split("/").pop() ?? "sola";
  const edit = getEdit(slug);
  const pieces = piecesForEdit(edit.slug);
  const childEdits = (edit.children ?? []).map((child) => getEdit(child));
  const note = collectionNotes[edit.slug];

  return <>
    <section className={`collection-hero collection-hero--${edit.slug}`}><img src={edit.image} alt="" /><div className="collection-hero__overlay" /><div className="collection-hero__breadcrumb"><Link href="/">Home</Link><span>/</span><span>{edit.title}</span></div><div className="collection-hero__copy"><span className="eyebrow">{edit.eyebrow}</span><h1>{edit.title}</h1>{edit.subtitle && <p>{edit.subtitle}</p>}</div></section>
    {childEdits.length > 0 && <section className="collection-chapters"><div><span className="eyebrow">Within this edit</span><h2>Find your part<br />of the story.</h2></div><div className="collection-chapters__grid">{childEdits.map((child) => <Link href={`/collections/${child.slug}`} className="collection-chapter" key={child.slug}><img src={child.image} alt="" /><div><span>{child.eyebrow}</span><h3>{child.title}</h3><MoveUpRight size={18} strokeWidth={1.4} /></div></Link>)}</div></section>}
    <section className="collection-grid-section"><div className="collection-grid__bar"><button><SlidersHorizontal size={16} strokeWidth={1.4} /> Filter</button><span>{pieces.length} pieces</span><button>Sort: Featured <ChevronDown size={16} strokeWidth={1.4} /></button></div><div className="collection-grid">{pieces.map((piece) => <ProductCard piece={piece} key={piece.slug} />)}</div><p className="collection-grid__end">You are viewing all {pieces.length} pieces from this edit.</p></section>
    {note && <section className="collection-afterword"><img src={note.image} alt="Jewellery detail from the collection" /><div><span className="eyebrow">A collection note</span><h2>{note.title}</h2><p>{note.copy}</p><Link className="text-link" href="/collections/bridal">Return to The Bridal Edit <MoveUpRight size={15} strokeWidth={1.4} /></Link></div></section>}
    <section className="collection-faq"><div><span className="eyebrow">A few practical things</span><h2>Made for moving through a day.</h2></div><div className="accordion-list"><details><summary>Can I see a piece in person?<span>+</span></summary><p>Private studio appointments are arranged by request. Write to our studio with the piece you would like to meet.</p></details><details><summary>How should I care for my piece?<span>+</span></summary><p>Keep it dry between wears and use a soft, lint-free cloth. Each order comes with a simple care card.</p></details><details><summary>Is a gift note available?<span>+</span></summary><p>Yes. Add a note at checkout and we will wrap it with the same quiet attention as the jewellery itself.</p></details></div></section>
  </>;
}
