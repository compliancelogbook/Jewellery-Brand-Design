/** Golden Hour visual system: original luxury storefront routes, built around a translucent editorial header and commerce-first pacing. */
import { Route, Switch } from "wouter";
import BrandShell from "@/components/BrandShell";
import SmoothMotion from "@/components/SmoothMotion";
import { CartProvider } from "@/contexts/CartContext";
import { FavouritesProvider } from "@/contexts/FavouritesContext";
import { StockProvider } from "@/contexts/StockContext";
import Collection from "@/pages/Collection";
import Account from "@/pages/Account";
import SizeGuide from "@/pages/SizeGuide";
import Category from "@/pages/Category";
import Home from "@/pages/Home";
import Journal from "@/pages/Journal";
import Product from "@/pages/Product";
import Story from "@/pages/Story";

function App() {
  return <StockProvider><CartProvider><FavouritesProvider><SmoothMotion><BrandShell><Switch><Route path="/" component={Home} /><Route path="/account" component={Account} /><Route path="/help/size-guide" component={SizeGuide} /><Route path="/journal" component={Journal} /><Route path="/shop/:category" component={Category} /><Route path="/collections/:edit" component={Collection} /><Route path="/products/:slug" component={Product} /><Route path="/pages/our-story" component={Story} /><Route component={Home} /></Switch></BrandShell></SmoothMotion></FavouritesProvider></CartProvider></StockProvider>;
}

export default App;
