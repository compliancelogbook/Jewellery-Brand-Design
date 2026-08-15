/** Golden Hour visual system: theatrical collection hero, compact filter row, image-led four-up merchandise grid. */
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";
import ProductCard from "@/components/ProductCard";
import { pieces } from "../data/catalog";

function CollectionView({ occasion = false }: { occasion?: boolean }) {
  const title = occasion ? "The Occasion Edit" : "Sola / Solstice";
  const subtitle = occasion ? "Small gestures for an unforgettable yes — and every other kind of beginning." : "A study in sun, stone and the calm after a long lunch.";
  const image = occasion ? "/manus-storage/oriele-editorial-sunroom_794fa073.jpg" : "/manus-storage/oriele-hero-mediterranean-tide_8af5f0e5.jpg";
  return <><section className={`collection-hero ${occasion ? "collection-hero--occasion" : ""}`}><img src={image} alt="" /><div className="collection-hero__overlay" /><div className="collection-hero__breadcrumb"><Link href="/">Home</Link><span>/</span><span>{title}</span></div><div className="collection-hero__copy"><span className="eyebrow">Golden Hour / 2026</span><h1>{title}</h1><p>{subtitle}</p></div></section><section className="collection-grid-section"><div className="collection-grid__bar"><button><SlidersHorizontal size={16} strokeWidth={1.4} /> Filter</button><span>{pieces.length} pieces</span><button>Sort: Featured <ChevronDown size={16} strokeWidth={1.4} /></button></div><div className="collection-grid">{pieces.map((piece) => <ProductCard piece={piece} key={piece.slug} />)}</div><p className="collection-grid__end">You are viewing all {pieces.length} pieces from this small edition.</p></section><section className="collection-faq"><div><span className="eyebrow">A few practical things</span><h2>Made for moving through a day.</h2></div><div className="accordion-list"><details><summary>Can I see a piece in person?<span>+</span></summary><p>Private studio appointments are arranged by request. Write to our studio with the piece you would like to meet.</p></details><details><summary>How should I care for my piece?<span>+</span></summary><p>Keep it dry between wears and use a soft, lint-free cloth. Each order comes with a simple care card.</p></details><details><summary>Is a gift note available?<span>+</span></summary><p>Yes. Add a note at checkout and we will wrap it with the same quiet attention as the jewellery itself.</p></details></div></section></>;
}

export default function Collection() {
  return <CollectionView />;
}

export function OccasionCollection() {
  return <CollectionView occasion />;
}
