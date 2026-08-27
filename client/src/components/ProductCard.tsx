/** Golden Hour visual system: restrained product cards, ink-backed jewellery photography, centred information hierarchy. */
import { Heart } from "lucide-react";
import { Link } from "wouter";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useStock } from "@/contexts/StockContext";
import { getStockLabel, getStockStatus } from "@/lib/stock";
import type { Piece } from "../data/catalog";

export default function ProductCard({ piece }: { piece: Piece }) {
  const { isSaved, togglePiece } = useFavourites();
  const saved = isSaved(piece.slug);
  const { stock, restockedAt } = useStock(piece.slug);
  const stockStatus = getStockStatus(stock, restockedAt);
  const stockLabel = getStockLabel(stockStatus, stock);
  return (
    <article className="product-card">
      <Link href={`/products/${piece.slug}`} className="product-card__image-link" aria-label={`View ${piece.name}`}>
        <div className="product-card__image-wrap" data-slug={piece.slug}>
          {piece.badge && <span className="product-card__badge">{piece.badge}</span>}
          <button className={`product-card__favourite ${saved ? "is-saved" : ""}`} onClick={(event) => { event.preventDefault(); togglePiece(piece); }} aria-label={saved ? `Remove ${piece.name} from saved pieces` : `Save ${piece.name}`}><Heart size={18} fill={saved ? "currentColor" : "none"} strokeWidth={1.35} /></button>
          <img src={piece.image} alt="" className="product-card__image product-card__image--primary" />
          <img src={piece.alternateImage} alt="" className="product-card__image product-card__image--alt" />
          <span className="product-card__view">View piece</span>
        </div>
      </Link>
      <div className="product-card__detail">
        <Link href={`/products/${piece.slug}`} className="product-card__name">{piece.name}</Link>
        <p>{piece.material}</p>
        <strong>{piece.price}</strong>
        {stockLabel && <span className={`product-card__stock product-card__stock--${stockStatus}`}>{stockLabel}</span>}
      </div>
    </article>
  );
}
