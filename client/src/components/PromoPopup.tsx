/** Golden Hour promo: a scroll-triggered scratch-to-reveal discount, shown once per visitor. */
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { promoCodes } from "@/lib/promoCodes";

const SCROLL_THRESHOLD = 480;
const REVEAL_STROKE_LENGTH = 1500;
const STORAGE_KEY = "golden-hour-promo-popup-shown";
const CANVAS_SIZE = 220;

export default function PromoPopup() {
  const { promoCode, applyPromoCode, openCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPointerDown = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const scratchedLength = useRef(0);
  const offer = promoCodes[0];

  useEffect(() => {
    if (promoCode) return;
    let alreadyShown = false;
    try {
      alreadyShown = window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      /* ignore */
    }
    if (alreadyShown) return;

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setVisible(true);
        try {
          window.localStorage.setItem(STORAGE_KEY, "true");
        } catch {
          /* ignore */
        }
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [promoCode]);

  useEffect(() => {
    if (!visible || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    gradient.addColorStop(0, "#d9ad4e");
    gradient.addColorStop(0.5, "#b8925a");
    gradient.addColorStop(1, "#8a6a2f");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(253,252,249,.94)";
    ctx.font = "700 12px Manrope, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH TO", CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 9);
    ctx.fillText("REVEAL", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 9);
  }, [visible, revealed]);

  if (!visible) return null;

  const completeReveal = () => {
    setRevealed(true);
    applyPromoCode(offer.code);
    toast(`${offer.code} applied to your bag`, { description: offer.label });
  };

  const scratchTo = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const point = { x: ((clientX - rect.left) / rect.width) * canvas.width, y: ((clientY - rect.top) / rect.height) * canvas.height };

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 42;

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      scratchedLength.current += Math.hypot(point.x - lastPoint.current.x, point.y - lastPoint.current.y);
    } else {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 21, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPoint.current = point;

    if (scratchedLength.current >= REVEAL_STROKE_LENGTH) completeReveal();
  };

  const close = () => setVisible(false);

  return (
    <div className="promo-popup-layer">
      <button className="promo-popup-backdrop" aria-label="Close offer" onClick={close} />
      <div className="promo-popup" role="dialog" aria-modal="true" aria-label="Discount offer">
        <button className="promo-popup__close" onClick={close} aria-label="Close"><X size={18} strokeWidth={1.5} /></button>
        <span className="eyebrow">A little something</span>
        <h2>Try your luck</h2>
        <p>Scratch below to reveal your discount.</p>
        <div className="promo-scratch">
          <div className="promo-scratch__reveal"><strong>{offer.code}</strong><span>{offer.label}</span></div>
          {!revealed && (
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="promo-scratch__canvas"
              onPointerDown={(event) => { isPointerDown.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratchTo(event.clientX, event.clientY); }}
              onPointerMove={(event) => { if (isPointerDown.current) scratchTo(event.clientX, event.clientY); }}
              onPointerUp={() => { isPointerDown.current = false; lastPoint.current = null; }}
              onPointerCancel={() => { isPointerDown.current = false; lastPoint.current = null; }}
            />
          )}
        </div>
        {revealed ? (
          <button className="button button--ink promo-popup__cta" onClick={() => { openCart(); close(); }}>View your bag <ArrowRight size={14} strokeWidth={1.5} /></button>
        ) : (
          <p className="promo-popup__fineprint">Drag your finger or cursor across the circle.</p>
        )}
      </div>
    </div>
  );
}
