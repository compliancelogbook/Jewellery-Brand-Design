/** Golden Hour account foundation: editorial customer entry interface, ready for future authentication integration. */
import { ArrowRight, Check, Eye, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

type Mode = "sign-in" | "create-account";

export default function Account() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [showPassword, setShowPassword] = useState(false);
  const isCreating = mode === "create-account";
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast(isCreating ? "Your account foundation is ready" : "Sign-in is awaiting activation", { description: "Customer authentication will be connected in the next implementation phase." });
  };

  return <section className="account-page">
    <aside className="account-page__aside"><div className="account-page__aside-top"><span className="eyebrow">Cherished / by Jade</span><span>Customer account</span></div><div className="account-page__aside-copy"><span className="account-page__mark">◌</span><h1>Keep your<br /><em>favourites</em> close</h1><p>A personal place for orders, saved pieces and little moments of inspiration from the studio.</p></div><div className="account-page__aside-note"><span>01</span><p>Your account is a quiet space for the pieces that become part of your story.</p></div></aside>
    <main className="account-page__form-shell"><Link href="/" className="account-page__back">← Back to the collection</Link><div className="account-page__form-wrap"><div className="account-page__intro"><span className="eyebrow">{isCreating ? "A personal account" : "Welcome back"}</span><h2>{isCreating ? <>Begin<br /><em>your collection.</em></> : <>A familiar<br /><em>place to return.</em></>}</h2><p>{isCreating ? "Create an account to keep your favourite pieces and future orders beautifully organised." : "Sign in to see your saved pieces and any orders held close."}</p></div><div className="account-page__toggle" role="tablist" aria-label="Account access"><button role="tab" aria-selected={!isCreating} className={!isCreating ? "is-active" : ""} onClick={() => setMode("sign-in")}>Sign in</button><button role="tab" aria-selected={isCreating} className={isCreating ? "is-active" : ""} onClick={() => setMode("create-account")}>Create account</button></div><form className="account-form" onSubmit={submit}>{isCreating && <label>Full name<div className="account-form__field"><UserRound size={16} strokeWidth={1.35} /><input required name="name" autoComplete="name" placeholder="Your full name" /></div></label>}<label>Email address<div className="account-form__field"><Mail size={16} strokeWidth={1.35} /><input required name="email" autoComplete="email" type="email" placeholder="you@example.com" /></div></label><label>Password<div className="account-form__field"><LockKeyhole size={16} strokeWidth={1.35} /><input required name="password" autoComplete={isCreating ? "new-password" : "current-password"} type={showPassword ? "text" : "password"} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}><Eye size={16} strokeWidth={1.35} /></button></div></label>{isCreating ? <label className="account-form__check"><input type="checkbox" name="studio-letter" /><span><Check size={11} strokeWidth={2} /></span>Keep me close with studio notes and early access.</label> : <button type="button" className="account-form__forgot" onClick={() => toast("Password recovery is coming soon", { description: "This customer-account foundation is ready for authentication setup." })}>Forgotten your password?</button>}<button className="button button--ink account-form__submit" type="submit">{isCreating ? "Create account" : "Sign in"} <ArrowRight size={16} strokeWidth={1.4} /></button></form><p className="account-page__fineprint">This is a customer account foundation. Secure authentication and account data will be connected separately.</p></div></main>
  </section>;
}
