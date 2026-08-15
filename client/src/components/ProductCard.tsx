/** Orielé visual system: restrained product cards, ink-backed object photography, centred information hierarchy. */
import { Link } from "wouter";
import type { Piece } from "../data/catalog";

export default function ProductCard({ piece }: { piece: Piece }) {
  return (
    <article className="product-card">
      <Link href={`/products/${piece.slug}`} className="product-card__image-link" aria-label={`View ${piece.name}`}>
        <div className="product-card__image-wrap">
          {piece.badge && <span className="product-card__badge">{piece.badge}</span>}
          <img src={piece.image} alt="" className="product-card__image product-card__image--primary" />
          <img src={piece.alternateImage} alt="" className="product-card__image product-card__image--alt" />
          <span className="product-card__view">View piece</span>
        </div>
      </Link>
      <div className="product-card__detail">
        <Link href={`/products/${piece.slug}`} className="product-card__name">{piece.name}</Link>
        <p>{piece.material}</p>
        <strong>{piece.price}</strong>
      </div>
    </article>
  );
}
