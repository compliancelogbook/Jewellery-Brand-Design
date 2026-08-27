/** Golden Hour direct category page: product-first browsing alongside the existing editorial edits. */
import { ArrowLeft, ArrowRight, ChevronDown, MoveUpRight, SlidersHorizontal } from "lucide-react";
import { Link, useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import { getCategory, piecesForCategory, type CategorySlug } from "@/data/catalog";

export default function Category() {
  const [location] = useLocation();
  const slug = (location.split("/").pop() ?? "rings") as CategorySlug;
  const category = getCategory(slug);
  const pieces = piecesForCategory(category.slug);

  return <>
    <section className="category-hero"><img src={category.image} alt="" /><div className="category-hero__veil" /><div className="category-hero__crumb"><Link href="/">Home</Link><span>/</span><span>Shop</span><span>/</span><span>{category.title}</span></div><div className="category-hero__copy"><span className="eyebrow">{category.eyebrow}</span><h1>{category.title}</h1><p>{category.subtitle}</p></div></section>
    <section className="category-grid-section"><div className="collection-grid__bar"><button><SlidersHorizontal size={16} strokeWidth={1.4} /> Filter</button><span>{pieces.length} pieces</span><button>Sort: Featured <ChevronDown size={16} strokeWidth={1.4} /></button></div><div className="collection-grid">{pieces.map((piece) => <ProductCard key={piece.slug} piece={piece} />)}</div><p className="collection-grid__end">You are viewing all {pieces.length} {category.title.toLowerCase()} in this collection.</p></section>
    <section className="category-afterword"><div><span className="eyebrow">More to discover</span><h2>A collection<br />in its own light</h2><p>Explore the themed edits for pieces gathered around a particular mood, occasion or late-table invitation.</p><Link href="/collections/sola" className="text-link">Explore the edits <MoveUpRight size={15} strokeWidth={1.4} /></Link></div><img src={category.featureImage} alt="Jewellery detail from the collection" /></section>
  </>;
}
