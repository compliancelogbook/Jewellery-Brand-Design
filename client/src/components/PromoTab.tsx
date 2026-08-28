/** A discreet, always-visible tab that opens an email-capture form for the WELCOME10 code — replaces the earlier scratch-to-reveal popup. */
import { Percent, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISSED_KEY = "cbj-promo-tab-dismissed";
const CLAIMED_KEY = "cbj-promo-claimed";

export default function PromoTab() {
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    const claimed = localStorage.getItem(CLAIMED_KEY);
    if (!dismissed && !claimed) setHidden(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const dismissTab = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setHidden(true);
  };

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error || "Something went wrong — please try again.");
      localStorage.setItem(CLAIMED_KEY, "1");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
      setStatus("error");
    }
  };

  if (hidden) return null;

  return <>
    <button className="promo-tab" onClick={() => setOpen(true)}>
      <Percent size={15} strokeWidth={1.5} />
      Get 10% off
      <span className="promo-tab__dismiss" role="button" aria-label="Dismiss" onClick={(event) => { event.stopPropagation(); dismissTab(); }}>
        <X size={14} strokeWidth={1.5} />
      </span>
    </button>

    {open && <div className="promo-popup-layer">
      <button className="promo-popup-backdrop" aria-label="Close" onClick={() => setOpen(false)} />
      <div className="promo-popup" role="dialog" aria-modal="true" aria-label="Get 10% off">
        <button className="promo-popup__close" onClick={() => setOpen(false)} aria-label="Close"><X size={18} strokeWidth={1.5} /></button>
        {status === "success" ? <div className="promo-popup__success">
          <span className="eyebrow">Check your inbox</span>
          <h2>On its way</h2>
          <p>We've sent your code to {email}. It should land within a few minutes.</p>
        </div> : <>
          <span className="eyebrow">An invitation</span>
          <h2>10% off your<br />first order</h2>
          <p>Leave your email and we'll send the code straight across.</p>
          <form onSubmit={submit}>
            {error && <p className="promo-popup__error">{error}</p>}
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
            />
            <button className="button button--ink promo-popup__cta" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send my code"}
            </button>
          </form>
          <p className="promo-popup__fineprint">One code per customer. Unsubscribe any time.</p>
        </>}
      </div>
    </div>}
  </>;
}
