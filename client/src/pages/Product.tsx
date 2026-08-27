/** Golden Hour visual system: asymmetric media mosaic paired with a calm, sticky purchase-panel hierarchy. */
import { Check, Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import ProductCard from "@/components/ProductCard";
import RingSizeGuide from "@/components/RingSizeGuide";
import { useCart } from "@/contexts/CartContext";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useStock } from "@/contexts/StockContext";
import { getStockLabel, getStockStatus } from "@/lib/stock";
import { finishLabels, findPiece, getEdit, getFinishes, pieces } from "../data/catalog";
import { ringSizes } from "@/lib/ringSizes";

export default function Product() {
  const params = useParams<{ slug: string }>();
  const piece = findPiece(params.slug);
  const availableFinishes = getFinishes(piece);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedFinish, setSelectedFinish] = useState(availableFinishes[0]);
  const { addItem, openCart } = useCart();
  const { isSaved, togglePiece } = useFavourites();
  const { stock, restockedAt } = useStock(piece.slug);
  const stockStatus = getStockStatus(stock, restockedAt);
  const stockLabel = getStockLabel(stockStatus, stock);
  const isOutOfStock = stockStatus === "out-of-stock";
  const isRing = piece.category === "ring";
  const isEarrings = piece.category === "earrings";
  const primaryEdit = getEdit(piece.edits[0]);
  const addToBag = () => { addItem(piece, 1, isRing ? selectedSize : undefined, finishLabels[selectedFinish]); openCart(); };
  const [sizeStock, setSizeStock] = useState<Record<string, number> | null>(null);

  useEffect(() => { setSelectedFinish(getFinishes(piece)[0]); }, [piece.slug]);

  useEffect(() => {
    setSizeStock(null);
    if (!isRing) return;
    let cancelled = false;
    fetch(`/api/size-stock/${piece.slug}`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, number>) => { if (!cancelled) setSizeStock(data ?? {}); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [piece.slug, isRing]);

  useEffect(() => {
    if (!sizeStock || Object.keys(sizeStock).length === 0) return;
    if ((sizeStock[selectedSize] ?? 0) > 0) return;
    const firstAvailable = ringSizes.find((row) => (sizeStock[row.size] ?? 0) > 0);
    if (firstAvailable) setSelectedSize(firstAvailable.size);
  }, [sizeStock]);

  return <>
    <section className="product-page">
      <div className="product-page__crumb"><Link href="/">Home</Link><span>/</span><Link href={`/collections/${primaryEdit.slug}`}>{primaryEdit.title}</Link><span>/</span><span>{piece.name}</span></div>
      <div className="product-page__layout">
        <div className="product-media" data-slug={piece.slug}>
          <img src={piece.image} alt={piece.name} />
          <img src={piece.alternateImage} alt={`${piece.name} alternate view`} />
          <img src={piece.tertiaryImage ?? "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=90"} alt={piece.tertiaryImage ? `${piece.name} styled view` : "Jewellery styled in a quiet limestone sunroom"} />
          <div className="product-media__video"><span>Studio material study</span><i>◌</i></div>
        </div>
        <aside className="product-buy">
          <span className="product-card__badge">{piece.badge ?? "Studio piece"}</span>
          <h1>{piece.name}</h1><p className="product-buy__material">{piece.material}</p><strong className="product-buy__price">{piece.price}</strong>
          {stockLabel && <span className={`product-buy__stock product-buy__stock--${stockStatus}`}>{stockLabel}</span>}
          <p className="product-buy__intro">{piece.description ?? (isRing ? "A softly sculpted ring, designed for everyday light and an easy, tactile fit." : "A sun-shaped pendant, designed in the studio to catch light without asking for it.")}</p>
          <fieldset className="product-buy__options"><legend>Finish: <b>{finishLabels[selectedFinish]}</b></legend><div className="finish-swatches">{availableFinishes.map((finish) => <button type="button" key={finish} className={`finish-swatch finish-swatch--${finish} ${finish === selectedFinish ? "finish-swatch--selected" : ""}`} aria-label={`${finishLabels[finish]} finish`} aria-pressed={finish === selectedFinish} onClick={() => setSelectedFinish(finish)} />)}</div></fieldset>
          {isRing && <fieldset className="product-buy__sizes"><div className="product-buy__sizes-head"><legend>Size</legend><Link href="/help/size-guide">Size guide</Link></div><div>{ringSizes.map((row) => { const sizeOutOfStock = sizeStock ? (sizeStock[row.size] ?? 0) <= 0 : false; return <button type="button" key={row.size} disabled={isOutOfStock || sizeOutOfStock} aria-pressed={row.size === selectedSize} className={row.size === selectedSize ? "is-selected" : ""} onClick={() => setSelectedSize(row.size)}>{row.size} / {row.uk}</button>; })}</div></fieldset>}
          <button className="button button--ink product-buy__add" data-magnetic disabled={isOutOfStock} onClick={addToBag}>{isOutOfStock ? "Out of stock" : <>Add to bag <Check size={15} strokeWidth={1.5} /></>}</button>
          <button className={`product-buy__wish ${isSaved(piece.slug) ? "is-saved" : ""}`} data-magnetic onClick={() => togglePiece(piece)}><Heart size={18} fill={isSaved(piece.slug) ? "currentColor" : "none"} strokeWidth={1.4} /> {isSaved(piece.slug) ? "Saved to your pieces" : "Save for later"}</button>
          <ul className="product-buy__notes"><li><Check size={15} strokeWidth={1.5} />Finished in a considered small run</li><li><Check size={15} strokeWidth={1.5} />Packed simply, ready to give</li><li><Check size={15} strokeWidth={1.5} />{isEarrings ? "Full refund on faulty items" : "30-day returns on unworn pieces"}</li></ul>
          <div className="product-buy__accordions">
            <details open><summary>Details <span>+</span></summary><p>Designed as easy everyday jewellery with a tactile, slightly irregular surface. Finished and packed by hand.</p></details>
            {isRing && <RingSizeGuide />}
            <details><summary>Delivery & returns <span>+</span></summary><p>Standard UK delivery (Royal Mail 48, 2–3 working days) is £2.99, free above £50. Express delivery (Royal Mail 24, 1–2 working days) is £3.99. {isEarrings ? "For hygiene reasons, earrings cannot be returned or exchanged unless faulty — faulty items are eligible for a full refund or replacement." : "Pieces may be returned unworn within 30 days of receipt."}</p></details>
            <details><summary>Care <span>+</span></summary><p>Store in the pouch provided and clean gently with a dry cloth.</p></details>
          </div>
          <button className="product-buy__share"><Share2 size={15} strokeWidth={1.4} /> Share this piece</button>
        </aside>
      </div>
    </section>
    <section className="related"><div><span className="eyebrow">You may also keep</span><h2>Discover More From This Collection</h2></div><div className="related__grid">{pieces.filter((item) => item.slug !== piece.slug).slice(0, 4).map((item) => <ProductCard key={item.slug} piece={item} />)}</div></section>
  </>;
}
