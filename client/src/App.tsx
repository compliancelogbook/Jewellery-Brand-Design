/** Golden Hour visual system: original luxury storefront routes, built around a translucent editorial header and commerce-first pacing. */
import { Route, Switch } from "wouter";
import { Toaster } from "sonner";
import BrandShell from "@/components/BrandShell";
import SmoothMotion from "@/components/SmoothMotion";
import { CartProvider } from "@/contexts/CartContext";
import { FavouritesProvider } from "@/contexts/FavouritesContext";
import { StockProvider } from "@/contexts/StockContext";
import Collection from "@/pages/Collection";
import Account from "@/pages/Account";
import CareGuide from "@/pages/CareGuide";
import DeliveryReturns from "@/pages/DeliveryReturns";
import SizeGuide from "@/pages/SizeGuide";
import Category from "@/pages/Category";
import Home from "@/pages/Home";
import Journal from "@/pages/Journal";
import Privacy from "@/pages/Privacy";
import Product from "@/pages/Product";
import PromoPopup from "@/components/PromoPopup";
import Terms from "@/pages/Terms";

function App() {
  return <StockProvider><CartProvider><FavouritesProvider><SmoothMotion><BrandShell><Switch><Route path="/" component={Home} /><Route path="/account" component={Account} /><Route path="/help/size-guide" component={SizeGuide} /><Route path="/help/delivery-returns" component={DeliveryReturns} /><Route path="/help/care-guide" component={CareGuide} /><Route path="/pages/terms" component={Terms} /><Route path="/pages/privacy" component={Privacy} /><Route path="/journal" component={Journal} /><Route path="/shop/:category" component={Category} /><Route path="/collections/:edit" component={Collection} /><Route path="/products/:slug" component={Product} /><Route component={Home} /></Switch></BrandShell><Toaster position="bottom-center" toastOptions={{ style: { background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--line)", fontSize: "12px" } }} /><PromoPopup /></SmoothMotion></FavouritesProvider></CartProvider></StockProvider>;
}

export default App;
